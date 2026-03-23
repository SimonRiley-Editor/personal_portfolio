'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useGlitch } from './GlitchContext';

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<'start' | 'playing' | 'won' | 'lost'>('start');
  const [sysMsg, setSysMsg] = useState('SYSTEM LOCKED. HACKING REQUIRED.');
  const [isVisible, setIsVisible] = useState(true);
  const [philoText, setPhiloText] = useState('');
  const [showEnterBtn, setShowEnterBtn] = useState(false);
  const { reportUserAction } = useGlitch();

  // Audio Context Ref
  const audioCtxRef = useRef<AudioContext | null>(null);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  const playSound = (type: 'shoot' | 'hit' | 'explosion' | 'accept') => {
    if (!audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;
    
    if (type === 'shoot') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.05);
      gain.gain.setValueAtTime(0.015, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === 'hit') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(200, now);
      osc.frequency.exponentialRampToValueAtTime(50, now + 0.1);
      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
    } else if (type === 'explosion') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(100, now);
      osc.frequency.exponentialRampToValueAtTime(10, now + 0.5);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      osc.start(now);
      osc.stop(now + 0.5);
    } else if (type === 'accept') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.5);
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.1, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1);
      osc.start(now);
      osc.stop(now + 1);
    }
  };

  useEffect(() => {
    if (gameState !== 'playing') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let mouseX = width / 2;
    let mouseY = height / 3;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
      }
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    // Game State
    const player = { x: width / 2, y: height * 0.8, size: 12, speed: 6, color: '#e6e2af', hp: 2, maxHp: 2, invulnUntil: 0 };
    const core = { x: width / 2, y: height * 0.3, size: 40, hp: 100, maxHp: 100, color: '#ffffff' };
    
    interface Bullet { x: number; y: number; vx: number; vy: number; size: number; color: string; isEnemy: boolean; }
    interface Enemy { x: number; y: number; vx: number; vy: number; size: number; hp: number; lastShot: number; }
    interface Particle { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; color: string; size: number; }
    interface Explosion { x: number; y: number; radius: number; maxRadius: number; color: string; }

    let bullets: Bullet[] = [];
    let enemies: Enemy[] = [];
    let particles: Particle[] = [];
    let explosions: Explosion[] = [];

    const keys: Record<string, boolean> = {};
    const handleKeyDown = (e: KeyboardEvent) => { keys[e.key.toLowerCase()] = true; };
    const handleKeyUp = (e: KeyboardEvent) => { keys[e.key.toLowerCase()] = false; };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    let lastShot = 0;
    let lastCoreShot = 0;
    let lastEnemySpawn = 0;
    let isGameOver = false;
    let screenShake = 0;
    let isGlitching = false;
    let glitchStartTime = 0;

    const createParticles = (x: number, y: number, color: string, count: number = 5) => {
      for (let i = 0; i < count; i++) {
        particles.push({
          x, y,
          vx: (Math.random() - 0.5) * 10,
          vy: (Math.random() - 0.5) * 10,
          life: 1, maxLife: 1,
          color,
          size: Math.random() * 3 + 1
        });
      }
    };

    const loop = (time: number) => {
      if (isGameOver) return;

      // Update Player
      let dx = 0; let dy = 0;
      let usingKeys = false;

      if (keys['w'] || keys['arrowup']) { dy -= 1; usingKeys = true; }
      if (keys['s'] || keys['arrowdown']) { dy += 1; usingKeys = true; }
      if (keys['a'] || keys['arrowleft']) { dx -= 1; usingKeys = true; }
      if (keys['d'] || keys['arrowright']) { dx += 1; usingKeys = true; }
      
      if (usingKeys) {
        if (dx !== 0 && dy !== 0) {
          const length = Math.hypot(dx, dy);
          dx /= length; dy /= length;
        }
        player.x += dx * player.speed;
        player.y += dy * player.speed;
      }
      
      // Bounds
      player.x = Math.max(player.size, Math.min(width - player.size, player.x));
      player.y = Math.max(player.size, Math.min(height - player.size, player.y));

      // Player Shoot
      if (time - lastShot > 120) {
        const angle = Math.atan2(mouseY - player.y, mouseX - player.x);
        bullets.push({ 
          x: player.x, y: player.y, 
          vx: Math.cos(angle) * 12, vy: Math.sin(angle) * 12, 
          size: 3, color: '#e6e2af', isEnemy: false 
        });
        lastShot = time;
        playSound('shoot');
      }

      // Core Shoot
      if (time - lastCoreShot > 1200) {
        for (let i = 0; i < 8; i++) {
          const angle = (Math.PI * 2 / 8) * i + (time / 1000);
          bullets.push({
            x: core.x, y: core.y,
            vx: Math.cos(angle) * 3, vy: Math.sin(angle) * 3,
            size: 5, color: '#ff4444', isEnemy: true
          });
        }
        lastCoreShot = time;
      }

      // Spawn Enemies
      if (time - lastEnemySpawn > 2000) {
        enemies.push({
          x: Math.random() > 0.5 ? 0 : width,
          y: Math.random() * (height / 2),
          vx: Math.random() > 0.5 ? 2 : -2,
          vy: 1,
          size: 15, hp: 1, lastShot: time
        });
        lastEnemySpawn = time;
      }

      // Update Enemies
      enemies.forEach(e => {
        e.x += e.vx;
        e.y += e.vy;
        if (e.x < 0 || e.x > width) e.vx *= -1;
        
        if (time - e.lastShot > 1500) {
          const angle = Math.atan2(player.y - e.y, player.x - e.x);
          bullets.push({
            x: e.x, y: e.y,
            vx: Math.cos(angle) * 4, vy: Math.sin(angle) * 4,
            size: 4, color: '#ff4444', isEnemy: true
          });
          e.lastShot = time;
        }
      });

      // Update Bullets
      bullets.forEach(b => {
        b.x += b.vx;
        b.y += b.vy;
      });
      bullets = bullets.filter(b => b.x > -50 && b.x < width + 50 && b.y > -50 && b.y < height + 50);

      // Update Particles
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.02;
      });
      particles = particles.filter(p => p.life > 0);

      // Update Explosions
      explosions.forEach(ex => {
        ex.radius += 2;
      });
      explosions = explosions.filter(ex => ex.radius < ex.maxRadius);

      // Collisions
      const dist = (x1: number, y1: number, x2: number, y2: number) => Math.hypot(x2 - x1, y2 - y1);

      // Player bullets hit Core
      bullets.filter(b => !b.isEnemy).forEach(b => {
        if (dist(b.x, b.y, core.x, core.y) < core.size) {
          core.hp -= 2;
          createParticles(b.x, b.y, '#ffffff', 3);
          b.y = -100; // mark for removal
          playSound('hit');
        }
      });

      // Player bullets hit Enemies
      bullets.filter(b => !b.isEnemy).forEach(b => {
        enemies.forEach(e => {
          if (dist(b.x, b.y, e.x, e.y) < e.size) {
            e.hp -= 1;
            b.y = -100;
            if (e.hp <= 0) {
              createParticles(e.x, e.y, '#ff4444', 15);
              explosions.push({ x: e.x, y: e.y, radius: 0, maxRadius: 40, color: '#ff4444' });
              playSound('explosion');
              e.y = -100;
            }
          }
        });
      });

      // Cleanup dead enemies and bullets
      enemies = enemies.filter(e => e.y > 0);
      bullets = bullets.filter(b => b.y > 0);

      // Enemy bullets hit Player
      bullets.filter(b => b.isEnemy).forEach(b => {
        if (dist(b.x, b.y, player.x, player.y) < player.size) {
          if (time > player.invulnUntil) {
            player.hp -= 1;
            player.invulnUntil = time + 1000;
            b.y = -100;
            screenShake = 15;
            playSound('hit');
            if (player.hp <= 0) {
              isGameOver = true;
              setGameState('lost');
              playSound('explosion');
            }
          }
        }
      });

      // Enemies hit Player
      enemies.forEach(e => {
        if (dist(e.x, e.y, player.x, player.y) < player.size + e.size) {
          if (time > player.invulnUntil) {
            player.hp -= 1;
            player.invulnUntil = time + 1000;
            screenShake = 15;
            playSound('hit');
            if (player.hp <= 0) {
              isGameOver = true;
              setGameState('lost');
              playSound('explosion');
            }
          }
        }
      });

      // Win Condition
      if (core.hp <= 0 && !isGlitching) {
        isGlitching = true;
        glitchStartTime = time;
        playSound('explosion');
        createParticles(core.x, core.y, '#ffffff', 50);
      }

      if (isGlitching) {
        screenShake = 15;
        if (time - glitchStartTime > 3500) {
          isGameOver = true;
          setGameState('won');
          return;
        }
      }

      // Draw
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, width, height);

      ctx.save();
      if (screenShake > 0) {
        const sdx = (Math.random() - 0.5) * screenShake;
        const sdy = (Math.random() - 0.5) * screenShake;
        ctx.translate(sdx, sdy);
        screenShake *= 0.9;
        if (screenShake < 0.5) screenShake = 0;
      }

      // Grid
      ctx.strokeStyle = '#1a1a1a';
      ctx.lineWidth = 1;
      const gridSize = 50;
      for (let x = (time / 50) % gridSize; x < width; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
      }
      for (let y = (time / 50) % gridSize; y < height; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
      }

      // Draw Core
      ctx.save();
      ctx.translate(core.x, core.y);
      ctx.fillStyle = core.color;
      ctx.shadowBlur = 20;
      ctx.shadowColor = core.color;
      ctx.beginPath();
      ctx.arc(0, 0, core.size, 0, Math.PI * 2);
      ctx.fill();
      
      // Core HP
      ctx.shadowBlur = 0;
      ctx.fillStyle = 'rgba(255,0,0,0.3)';
      ctx.fillRect(-core.size, -core.size - 20, core.size * 2, 4);
      ctx.fillStyle = '#ff4444';
      ctx.fillRect(-core.size, -core.size - 20, (core.size * 2) * Math.max(0, core.hp / core.maxHp), 4);
      ctx.restore();

      // Draw Enemies
      enemies.forEach(e => {
        ctx.save();
        ctx.translate(e.x, e.y);
        ctx.fillStyle = '#888';
        ctx.beginPath();
        ctx.rect(-e.size, -e.size, e.size * 2, e.size * 2);
        ctx.fill();
        ctx.restore();
      });

      // Draw Bullets
      bullets.forEach(b => {
        ctx.fillStyle = b.color;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw Particles
      particles.forEach(p => {
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life / p.maxLife;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // Draw Explosions
      explosions.forEach(ex => {
        ctx.beginPath();
        ctx.arc(ex.x, ex.y, ex.radius, 0, Math.PI * 2);
        ctx.strokeStyle = ex.color;
        ctx.lineWidth = 2;
        ctx.globalAlpha = Math.max(0, 1 - (ex.radius / ex.maxRadius));
        ctx.stroke();
        ctx.globalAlpha = 1;
      });

      // Draw Player
      ctx.save();
      ctx.translate(player.x, player.y);
      const playerAngle = Math.atan2(mouseY - player.y, mouseX - player.x);
      ctx.rotate(playerAngle + Math.PI / 2);
      
      if (time < player.invulnUntil && Math.floor(time / 100) % 2 === 0) {
        ctx.globalAlpha = 0.3;
      }
      
      ctx.fillStyle = player.color;
      ctx.shadowBlur = 10;
      ctx.shadowColor = player.color;
      ctx.beginPath();
      ctx.moveTo(0, -player.size);
      ctx.lineTo(player.size, player.size);
      ctx.lineTo(-player.size, player.size);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // Draw Crosshair
      ctx.save();
      ctx.translate(mouseX, mouseY);
      ctx.strokeStyle = 'rgba(230, 226, 175, 0.5)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(-10, 0); ctx.lineTo(10, 0);
      ctx.moveTo(0, -10); ctx.lineTo(0, 10);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, 0, 4, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Draw UI
      ctx.fillStyle = '#e6e2af';
      ctx.font = '12px monospace';
      ctx.fillText(`UNIT INTEGRITY`, 30, height - 40);
      for(let i=0; i<player.maxHp; i++) {
         ctx.fillStyle = i < player.hp ? '#e6e2af' : '#333333';
         ctx.fillRect(30 + i * 25, height - 25, 20, 8);
      }

      ctx.restore(); // Restore screen shake

      if (isGlitching) {
        const glitchIntensity = (time - glitchStartTime) / 3500;
        
        if (glitchIntensity > 0.8) {
          ctx.fillStyle = `rgba(255, 255, 255, ${(glitchIntensity - 0.8) * 5})`;
          ctx.fillRect(0, 0, width, height);
        } else {
          for (let i = 0; i < 8; i++) {
            const sy = Math.random() * height;
            const sh = Math.random() * 50 + 10;
            const dx = (Math.random() - 0.5) * 100 * glitchIntensity;
            ctx.drawImage(canvas, 0, sy, width, sh, dx, sy, width, sh);
          }
          ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255,0,0,0.1)' : 'rgba(255,255,255,0.1)';
          ctx.fillRect(0, 0, width, height);
        }
      }

      if (!isGameOver) {
        animationFrameId = requestAnimationFrame(loop);
      }
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [gameState]);

  // System Messages
  useEffect(() => {
    if (gameState !== 'playing') return;
    const messages = [
      "ACCESSING SYSTEM...",
      "BREACH IN PROGRESS",
      "CORE DEFENSE ACTIVE",
      "INTRUSION DETECTED",
      "WARNING: UNAUTHORIZED ACCESS"
    ];
    let i = 0;
    const interval = setInterval(() => {
      setSysMsg(messages[i % messages.length]);
      i++;
    }, 2000);
    return () => clearInterval(interval);
  }, [gameState]);

  // Handle Win/Lose Transitions
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    if (gameState === 'won') {
      const fullText = "Everything that is built is designed to be broken. Yet, in the fragments, we find new connections. The system is open. What will you choose to see?";
      let i = 0;
      const interval = setInterval(() => {
        setPhiloText(fullText.slice(0, i));
        i++;
        if (i > fullText.length) {
          clearInterval(interval);
          setTimeout(() => setShowEnterBtn(true), 500);
        }
      }, 40);
      return () => clearInterval(interval);
    } else if (gameState === 'lost') {
      setTimeout(() => {
        setGameState('playing');
      }, 2000);
    }
  }, [gameState]);

  const handleEnterSite = () => {
    playSound('accept');
    setIsVisible(false);
    reportUserAction('completed the hacking sequence and entered the site');
    setTimeout(() => {
      document.body.style.overflow = 'auto';
      onComplete();
    }, 800);
  };

  const startGame = () => {
    initAudio();
    setGameState('playing');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] bg-[#0a0a0a] flex flex-col items-center justify-center overflow-hidden font-mono"
        >
          <style>{`
            @keyframes textGlitch {
              0% { transform: translate(0) }
              20% { transform: translate(-2px, 2px) }
              40% { transform: translate(-2px, -2px) }
              60% { transform: translate(2px, 2px) }
              80% { transform: translate(2px, -2px) }
              100% { transform: translate(0) }
            }
            .glitch-text {
              animation: textGlitch 0.2s linear infinite;
              text-shadow: 2px 0 #ff4444, -2px 0 #69f0ae;
            }
          `}</style>

          {gameState === 'start' && (
            <div className="text-center z-10 flex flex-col items-center">
              <div className="text-[#e6e2af] text-xl md:text-2xl mb-6 tracking-widest animate-pulse">
                SYSTEM LOCKED. HACKING REQUIRED.
              </div>
              <p className="text-gray-400 mb-8 text-sm md:text-base max-w-md">
                You need to complete this to access the website.<br/><br/>
                Use <span className="text-white">WASD</span> or <span className="text-white">Arrow Keys</span> to move.<br/>
                On mobile, <span className="text-white">drag</span> to move.<br/>
                Destroy the Core. Avoid red projectiles.
              </p>
              <button 
                onClick={startGame}
                className="px-8 py-3 border border-[#e6e2af] text-[#e6e2af] hover:bg-[#e6e2af] hover:text-black transition-colors tracking-widest uppercase text-sm"
              >
                Initiate Hack
              </button>
            </div>
          )}

          {gameState === 'playing' && (
            <>
              <canvas ref={canvasRef} className="absolute inset-0 w-full h-full cursor-none" />
              <div className="absolute top-8 left-8 text-[#e6e2af] text-sm tracking-widest opacity-70">
                {sysMsg}
              </div>
              <div className="absolute bottom-8 right-8 text-[#e6e2af] text-xs tracking-widest opacity-50">
                WASD / ARROWS TO MOVE
              </div>
            </>
          )}

          {gameState === 'won' && (
            <div className="text-center z-10 max-w-2xl px-6 flex flex-col items-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-white text-3xl md:text-5xl tracking-[0.2em] font-bold mb-8 glitch-text"
              >
                ACCESS GRANTED
              </motion.div>
              <div className="text-[#e6e2af] text-sm md:text-base tracking-widest leading-loose mb-12 min-h-[100px]">
                {philoText}
                <span className="animate-pulse">_</span>
              </div>
              <AnimatePresence>
                {showEnterBtn && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={handleEnterSite}
                    className="px-8 py-3 border border-white text-white hover:bg-white hover:text-black transition-all tracking-[0.3em] uppercase text-sm"
                  >
                    Initialize Connection
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          )}

          {gameState === 'lost' && (
            <div className="text-center z-10">
              <div className="text-[#ff4444] text-3xl md:text-5xl tracking-[0.2em] font-bold mb-4">
                ACCESS DENIED
              </div>
              <div className="text-gray-400 text-sm tracking-widest animate-pulse">
                RETRYING INITIATION...
              </div>
            </div>
          )}
          
          {/* Scanline overlay */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-20" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
