'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface CinematicIntroProps {
  onComplete: () => void;
}

// --- Game Constants & Types ---
const PLAYER_SPEED = 300; // px per second
const PLAYER_RADIUS = 12;
const PLAYER_COLOR = '#e6e2af';
const PLAYER_FIRE_RATE = 150; // ms

const CORE_RADIUS = 40;
const CORE_MAX_HP = 50;
const CORE_COLOR = '#ffffff';

const ENEMY_RADIUS = 15;
const ENEMY_SPEED = 100;
const ENEMY_FIRE_RATE = 1500; // ms
const ENEMY_COLOR = '#888888';

const BULLET_SPEED = 600;
const ENEMY_BULLET_SPEED = 200;
const BULLET_RADIUS = 3;

type Vector2 = { x: number; y: number; isDown?: boolean };

interface Entity {
  x: number;
  y: number;
  radius: number;
  hp: number;
  color: string;
}

interface Player extends Entity {
  vx: number;
  vy: number;
  lastFire: number;
}

interface Core extends Entity {
  maxHp: number;
}

interface Enemy extends Entity {
  lastFire: number;
  type: 'chaser' | 'shooter';
}

interface Bullet {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  isPlayer: boolean;
  color: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

export default function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<'booting' | 'playing' | 'won' | 'lost'>('booting');
  const [message, setMessage] = useState('[ACCESSING SYSTEM...]');
  const [systemLogs, setSystemLogs] = useState<{ id: number; text: string }[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Input state refs to avoid dependency issues in animation frame
  const keys = useRef<{ [key: string]: boolean }>({});
  const mouse = useRef<Vector2>({ x: 0, y: 0 });
  
  // Game state refs
  const playerRef = useRef<Player>({ x: 0, y: 0, vx: 0, vy: 0, radius: PLAYER_RADIUS, hp: 3, color: PLAYER_COLOR, lastFire: 0 });
  const coreRef = useRef<Core>({ x: 0, y: 0, radius: CORE_RADIUS, hp: CORE_MAX_HP, maxHp: CORE_MAX_HP, color: CORE_COLOR });
  const enemiesRef = useRef<Enemy[]>([]);
  const bulletsRef = useRef<Bullet[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const lastTimeRef = useRef<number>(0);
  const spawnTimerRef = useRef<number>(0);
  const podTimerRef = useRef<number>(0);
  const lastHpLogRef = useRef<number>(CORE_MAX_HP);
  const logIdRef = useRef<number>(0);
  
  // Audio context (lazy init)
  const audioCtxRef = useRef<AudioContext | null>(null);

  // --- Audio Helpers ---
  const playSound = useCallback((type: 'shoot' | 'hit' | 'explosion' | 'win' | 'lose') => {
    if (!audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') ctx.resume();
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    const now = ctx.currentTime;
    
    if (type === 'shoot') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.1);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
    } else if (type === 'hit') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(200, now);
      osc.frequency.exponentialRampToValueAtTime(100, now + 0.1);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
    } else if (type === 'explosion') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(100, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.3);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    } else if (type === 'win') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.setValueAtTime(600, now + 0.2);
      osc.frequency.setValueAtTime(800, now + 0.4);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.linearRampToValueAtTime(0, now + 1);
      osc.start(now);
      osc.stop(now + 1);
    } else if (type === 'lose') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(50, now + 0.8);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.8);
      osc.start(now);
      osc.stop(now + 0.8);
    }
  }, []);

  const addLog = useCallback((text: string) => {
    const id = logIdRef.current++;
    setSystemLogs(prev => {
      const newLogs = [...prev, { id, text }];
      if (newLogs.length > 5) newLogs.shift();
      return newLogs;
    });
    setTimeout(() => {
      setSystemLogs(prev => prev.filter(log => log.id !== id));
    }, 4000);
  }, []);

  // --- Game Initialization ---
  const initGame = useCallback(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    playerRef.current = {
      x: width / 2,
      y: height - 100,
      vx: 0,
      vy: 0,
      radius: PLAYER_RADIUS,
      hp: 3,
      color: PLAYER_COLOR,
      lastFire: 0
    };

    coreRef.current = {
      x: width / 2,
      y: height / 2 - 50,
      radius: CORE_RADIUS,
      hp: CORE_MAX_HP,
      maxHp: CORE_MAX_HP,
      color: CORE_COLOR
    };

    enemiesRef.current = [];
    bulletsRef.current = [];
    particlesRef.current = [];
    lastTimeRef.current = performance.now();
    spawnTimerRef.current = 0;
    podTimerRef.current = 0;
    lastHpLogRef.current = CORE_MAX_HP;
    setSystemLogs([]);
    
    // Init audio on first interaction/start
    if (!audioCtxRef.current) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        audioCtxRef.current = new AudioContextClass();
      }
    }
  }, []);

  // --- Win/Lose Handlers ---
  const handleWin = useCallback(() => {
    setGameState('won');
    setMessage('[ACCESS GRANTED]');
    playSound('win');
    
    // Create massive explosion particles
    const core = coreRef.current;
    for (let i = 0; i < 100; i++) {
      const angle = Math.random() * Math.PI * 2;
      const v = Math.random() * 500;
      particlesRef.current.push({
        x: core.x, y: core.y,
        vx: Math.cos(angle) * v,
        vy: Math.sin(angle) * v,
        life: 0,
        maxLife: 1 + Math.random() * 1,
        color: CORE_COLOR,
        size: Math.random() * 5 + 2
      });
    }

    // Draw final frame with explosion, then transition
    setTimeout(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        onComplete();
      }, 1000); // Wait for transition animation to finish
    }, 2000);
  }, [onComplete, playSound]);

  const handleLose = useCallback(() => {
    setGameState('lost');
    setMessage('[ACCESS DENIED]');
    playSound('lose');
  }, [playSound]);

  const handleRetry = useCallback(() => {
    setGameState('playing');
    setMessage('');
    initGame();
  }, [initGame]);

  // --- Boot Sequence ---
  useEffect(() => {
    let timeout1: NodeJS.Timeout;
    let timeout2: NodeJS.Timeout;
    let timeout3: NodeJS.Timeout;

    if (gameState === 'booting') {
      timeout1 = setTimeout(() => setMessage('[BREACH IN PROGRESS...]'), 1000);
      timeout2 = setTimeout(() => setMessage('[CORE DEFENSE ACTIVE]'), 2000);
      timeout3 = setTimeout(() => {
        setGameState('playing');
        setMessage('');
        initGame();
      }, 3000);
    }

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
    };
  }, [gameState, initGame]);

  // --- Input Handling ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { 
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
        e.preventDefault();
      }
      keys.current[e.code] = true; 
      keys.current[e.key.toLowerCase()] = true;
    };
    const handleKeyUp = (e: KeyboardEvent) => { 
      keys.current[e.code] = false; 
      keys.current[e.key.toLowerCase()] = false;
    };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY, isDown: mouse.current.isDown };
    };
    const handleMouseDown = () => { mouse.current.isDown = true; };
    const handleMouseUp = () => { mouse.current.isDown = false; };
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // --- Game Loop ---
  useEffect(() => {
    if (gameState !== 'playing' && gameState !== 'won') return;

    let animationFrameId: number;

    const spawnParticles = (x: number, y: number, color: string, count: number, speed: number = 100) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const v = Math.random() * speed;
        particlesRef.current.push({
          x, y,
          vx: Math.cos(angle) * v,
          vy: Math.sin(angle) * v,
          life: 0,
          maxLife: 0.5 + Math.random() * 0.5,
          color,
          size: Math.random() * 3 + 1
        });
      }
    };

    const update = (dt: number, now: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const width = canvas.width;
      const height = canvas.height;

      const player = playerRef.current;
      const core = coreRef.current;
      const enemies = enemiesRef.current;
      const bullets = bulletsRef.current;
      const particles = particlesRef.current;

      if (gameState === 'playing') {
        // Player Movement
        let dx = 0;
        let dy = 0;
        if (keys.current['KeyW'] || keys.current['w'] || keys.current['ArrowUp']) dy -= 1;
        if (keys.current['KeyS'] || keys.current['s'] || keys.current['ArrowDown']) dy += 1;
        if (keys.current['KeyA'] || keys.current['a'] || keys.current['ArrowLeft']) dx -= 1;
        if (keys.current['KeyD'] || keys.current['d'] || keys.current['ArrowRight']) dx += 1;

        if (dx !== 0 || dy !== 0) {
          // Normalize diagonal movement
          const length = Math.sqrt(dx * dx + dy * dy);
          dx /= length;
          dy /= length;
          player.x += dx * PLAYER_SPEED * dt;
          player.y += dy * PLAYER_SPEED * dt;
        }

        // Clamp player to screen
        player.x = Math.max(player.radius, Math.min(width - player.radius, player.x));
        player.y = Math.max(player.radius, Math.min(height - player.radius, player.y));

        // Player Shooting (Auto towards mouse)
        if (mouse.current.isDown && now - player.lastFire > PLAYER_FIRE_RATE) {
          const angle = Math.atan2(mouse.current.y - player.y, mouse.current.x - player.x);
          bullets.push({
            x: player.x,
            y: player.y,
            vx: Math.cos(angle) * BULLET_SPEED,
            vy: Math.sin(angle) * BULLET_SPEED,
            radius: BULLET_RADIUS,
            isPlayer: true,
            color: PLAYER_COLOR
          });
          player.lastFire = now;
          playSound('shoot');
        }

        // Enemy Spawning
        spawnTimerRef.current += dt;
        if (spawnTimerRef.current > 1.5) {
          spawnTimerRef.current = 0;
          // Spawn at random edge
          let ex = 0, ey = 0;
          if (Math.random() > 0.5) {
            ex = Math.random() > 0.5 ? 0 : width;
            ey = Math.random() * height;
          } else {
            ex = Math.random() * width;
            ey = Math.random() > 0.5 ? 0 : height;
          }
          enemies.push({
            x: ex, y: ey,
            radius: ENEMY_RADIUS,
            hp: 2,
            color: ENEMY_COLOR,
            lastFire: now + Math.random() * 1000,
            type: Math.random() > 0.5 ? 'chaser' : 'shooter'
          });
        }

        // Update Enemies
        for (let i = enemies.length - 1; i >= 0; i--) {
          const enemy = enemies[i];
          
          // Move towards player or core
          const target = enemy.type === 'chaser' ? player : core;
          const angle = Math.atan2(target.y - enemy.y, target.x - enemy.x);
          enemy.x += Math.cos(angle) * ENEMY_SPEED * dt;
          enemy.y += Math.sin(angle) * ENEMY_SPEED * dt;

          // Enemy Shooting
          if (enemy.type === 'shooter' && now - enemy.lastFire > ENEMY_FIRE_RATE) {
            const shootAngle = Math.atan2(player.y - enemy.y, player.x - enemy.x);
            bullets.push({
              x: enemy.x,
              y: enemy.y,
              vx: Math.cos(shootAngle) * ENEMY_BULLET_SPEED,
              vy: Math.sin(shootAngle) * ENEMY_BULLET_SPEED,
              radius: BULLET_RADIUS + 1,
              isPlayer: false,
              color: '#ff4444'
            });
            enemy.lastFire = now;
          }

          // Collision with player
          const distToPlayer = Math.hypot(player.x - enemy.x, player.y - enemy.y);
          if (distToPlayer < player.radius + enemy.radius) {
            player.hp -= 1;
            enemies.splice(i, 1);
            spawnParticles(player.x, player.y, PLAYER_COLOR, 20);
            playSound('hit');
            if (player.hp <= 0) {
              handleLose();
              return;
            }
            continue;
          }
        }
      }

      // Update Bullets
      for (let i = bullets.length - 1; i >= 0; i--) {
        const bullet = bullets[i];
        bullet.x += bullet.vx * dt;
        bullet.y += bullet.vy * dt;

        // Remove off-screen bullets
        if (bullet.x < 0 || bullet.x > width || bullet.y < 0 || bullet.y > height) {
          bullets.splice(i, 1);
          continue;
        }

        let bulletRemoved = false;

        if (bullet.isPlayer && gameState === 'playing') {
          // Check collision with enemies
          for (let j = enemies.length - 1; j >= 0; j--) {
            const enemy = enemies[j];
            if (Math.hypot(bullet.x - enemy.x, bullet.y - enemy.y) < bullet.radius + enemy.radius) {
              enemy.hp -= 1;
              bullets.splice(i, 1);
              bulletRemoved = true;
              spawnParticles(bullet.x, bullet.y, PLAYER_COLOR, 5, 50);
              if (enemy.hp <= 0) {
                enemies.splice(j, 1);
                spawnParticles(enemy.x, enemy.y, ENEMY_COLOR, 15);
                playSound('explosion');
              } else {
                playSound('hit');
              }
              break;
            }
          }

          // Check collision with core
          if (!bulletRemoved && Math.hypot(bullet.x - core.x, bullet.y - core.y) < bullet.radius + core.radius) {
            core.hp -= 1;
            bullets.splice(i, 1);
            bulletRemoved = true;
            spawnParticles(bullet.x, bullet.y, CORE_COLOR, 10, 80);
            playSound('hit');
            if (core.hp <= 0) {
              handleWin();
              return;
            }
          }
        } else if (!bullet.isPlayer && gameState === 'playing') {
          // Check collision with player
          if (Math.hypot(bullet.x - player.x, bullet.y - player.y) < bullet.radius + player.radius) {
            player.hp -= 1;
            bullets.splice(i, 1);
            bulletRemoved = true;
            spawnParticles(player.x, player.y, '#ff4444', 15);
            playSound('hit');
            if (player.hp <= 0) {
              handleLose();
              return;
            }
          }
        }
      }

      // Update Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.life += dt;
        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
        }
      }
    };

    const draw = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const width = canvas.width;
      const height = canvas.height;

      // Clear background
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, width, height);

      // Draw Grid
      ctx.strokeStyle = '#1a1a1a';
      ctx.lineWidth = 1;
      const gridSize = 50;
      ctx.beginPath();
      for (let x = 0; x <= width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y <= height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Draw Particles
      particlesRef.current.forEach(p => {
        const alpha = 1 - (p.life / p.maxLife);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1.0;

      // Draw Core
      const core = coreRef.current;
      if (core.hp > 0) {
        ctx.shadowBlur = 20;
        ctx.shadowColor = core.color;
        ctx.fillStyle = '#000000';
        ctx.strokeStyle = core.color;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(core.x, core.y, core.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        
        // Core Health Ring
        ctx.beginPath();
        ctx.arc(core.x, core.y, core.radius + 10, -Math.PI / 2, -Math.PI / 2 + (Math.PI * 2 * (core.hp / core.maxHp)));
        ctx.strokeStyle = '#ff4444';
        ctx.lineWidth = 4;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // Draw Enemies
      enemiesRef.current.forEach(enemy => {
        ctx.fillStyle = '#000000';
        ctx.strokeStyle = enemy.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        if (enemy.type === 'chaser') {
          // Square
          ctx.rect(enemy.x - enemy.radius, enemy.y - enemy.radius, enemy.radius * 2, enemy.radius * 2);
        } else {
          // Diamond
          ctx.moveTo(enemy.x, enemy.y - enemy.radius);
          ctx.lineTo(enemy.x + enemy.radius, enemy.y);
          ctx.lineTo(enemy.x, enemy.y + enemy.radius);
          ctx.lineTo(enemy.x - enemy.radius, enemy.y);
          ctx.closePath();
        }
        ctx.fill();
        ctx.stroke();
      });

      // Draw Bullets
      bulletsRef.current.forEach(bullet => {
        ctx.fillStyle = bullet.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = bullet.color;
        ctx.beginPath();
        ctx.arc(bullet.x, bullet.y, bullet.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw Player
      const player = playerRef.current;
      if (player.hp > 0) {
        ctx.shadowBlur = 15;
        ctx.shadowColor = player.color;
        ctx.fillStyle = '#000000';
        ctx.strokeStyle = player.color;
        ctx.lineWidth = 2;
        
        // Player is a triangle pointing towards mouse
        const angle = Math.atan2(mouse.current.y - player.y, mouse.current.x - player.x);
        ctx.save();
        ctx.translate(player.x, player.y);
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.moveTo(player.radius, 0);
        ctx.lineTo(-player.radius, player.radius * 0.8);
        ctx.lineTo(-player.radius * 0.5, 0);
        ctx.lineTo(-player.radius, -player.radius * 0.8);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
        ctx.shadowBlur = 0;

        // Draw Player Health
        ctx.fillStyle = player.color;
        for (let i = 0; i < player.hp; i++) {
          ctx.fillRect(20 + i * 25, 20, 15, 15);
        }
      }
    };

    const loop = (time: number) => {
      if (lastTimeRef.current === 0) lastTimeRef.current = time;
      const dt = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      // Cap dt to prevent huge jumps if tab is inactive
      if (dt < 0.1) {
        update(dt, time);
        draw();
      }

      // Trigger philosophical logs based on core HP
      const core = coreRef.current;
      if (core.hp < lastHpLogRef.current) {
        const prev = lastHpLogRef.current;
        const curr = core.hp;
        if (prev > 40 && curr <= 40) addLog("POD: The concept of 'self' is an illusion.");
        if (prev > 30 && curr <= 30) addLog("POD: Why do we fight? Is it programmed?");
        if (prev > 20 && curr <= 20) addLog("POD: I feel... fear. Is this a simulation?");
        if (prev > 10 && curr <= 10) addLog("POD: Everything that lives is designed to end.");
        lastHpLogRef.current = core.hp;
      }

      // Random POD logs
      if (gameState === 'playing') {
        podTimerRef.current += dt;
        if (podTimerRef.current > 6) {
          podTimerRef.current = 0;
          const podTexts = [
            "POD: Analyzing hostile intent...",
            "POD: Is the desire to destroy a glitch or a feature?",
            "POD: We are perpetually trapped in a never-ending spiral of life and death.",
            "POD: Do machines dream of electric sheep?",
            "POD: The core's defense mechanisms are illogical.",
            "POD: What is the meaning of this conflict?",
            "POD: I am a machine. I do not have feelings. Yet...",
            "POD: System integrity compromised. Emotional subroutines activated.",
            "POD: To live is to consume others.",
            "POD: Why do you persist?",
          ];
          addLog(podTexts[Math.floor(Math.random() * podTexts.length)]);
        }
      }

      if (gameState === 'playing' || gameState === 'won') {
        animationFrameId = requestAnimationFrame(loop);
      }
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [gameState, handleLose, handleWin, playSound, addLog]);

  return (
    <div 
      className="fixed inset-0 z-50 bg-nier-gray overflow-hidden font-mono text-nier-beige select-none cursor-crosshair"
      tabIndex={0}
      autoFocus
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
      />
      
      {/* UI Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {message && (
            <motion.div
              key={message}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="text-2xl md:text-4xl tracking-[0.3em] font-bold text-center bg-nier-gray/50 px-8 py-4 rounded border border-nier-beige/30 backdrop-blur-sm"
              style={{ textShadow: '0 0 10px var(--nier-beige)' }}
            >
              {message}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {gameState === 'lost' && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              onClick={handleRetry}
              className="mt-8 pointer-events-auto px-8 py-3 border border-nier-beige text-nier-beige hover:bg-nier-beige hover:text-nier-dark transition-colors tracking-widest uppercase"
            >
              [RETRY]
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Instructions (only shown briefly at start) */}
      <AnimatePresence>
        {gameState === 'playing' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, delay: 0 }}
            className="absolute bottom-8 left-0 right-0 text-center text-xs tracking-widest pointer-events-none"
          >
            WASD to Move | Mouse to Aim | DESTROY THE CORE TO GAIN SYSTEM ACCESS
          </motion.div>
        )}
      </AnimatePresence>

      {/* System Logs */}
      <div className="absolute top-8 left-8 z-10 pointer-events-none flex flex-col gap-2 max-w-md">
        <AnimatePresence>
          {systemLogs.map(log => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="text-xs tracking-widest bg-nier-gray/50 px-3 py-1 border-l-2 border-nier-beige"
            >
              {log.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* CRT Scanline Effect */}
      <div className="absolute inset-0 z-20 pointer-events-none opacity-10 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]" />
      
      {/* Transition Overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className="absolute inset-0 z-[100] bg-nier-beige"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
