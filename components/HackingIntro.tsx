'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface HackingIntroProps {
  onComplete: () => void;
}

export default function HackingIntro({ onComplete }: HackingIntroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'won' | 'lost'>('intro');
  const [messages, setMessages] = useState<string[]>([]);
  const [showRetry, setShowRetry] = useState(false);

  // Game constants (adjusted for per-second movement)
  const PLAYER_SIZE = 12;
  const PLAYER_SPEED = 240; // px per second
  const BULLET_SPEED = 420; // px per second
  const ENEMY_SPEED = 90; // px per second
  const CORE_HP = 50;
  const PLAYER_COLOR = '#e6e2af';
  const ENEMY_COLOR = '#888888';
  const BULLET_COLOR = '#ffffff';

  const gameStateRef = useRef({
    player: { x: 0, y: 0, vx: 0, vy: 0, angle: 0 },
    bullets: [] as any[],
    enemies: [] as any[],
    enemyBullets: [] as any[],
    core: { x: 0, y: 0, hp: CORE_HP, radius: 40 },
    keys: {} as Record<string, boolean>,
    mouse: { x: 0, y: 0, isDown: false },
    lastSpawn: 0,
    lastShoot: 0,
    frame: 0,
    won: false,
    lost: false,
    lastTime: 0,
  });

  const addMessage = (msg: string) => {
    setMessages(prev => [...prev.slice(-3), msg]);
  };

  useEffect(() => {
    if (gameState === 'intro') {
      const introMessages = [
        '[ACCESSING SYSTEM...]',
        '[BREACH IN PROGRESS]',
        '[CORE DEFENSE ACTIVE]',
        '[INTRUSION DETECTED]'
      ];
      let i = 0;
      const interval = setInterval(() => {
        if (i < introMessages.length) {
          addMessage(introMessages[i]);
          i++;
        } else {
          clearInterval(interval);
          setTimeout(() => setGameState('playing'), 1000);
        }
      }, 600);
      return () => clearInterval(interval);
    }
  }, [gameState]);

  useEffect(() => {
    if (gameState !== 'playing') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gameStateRef.current.player.x = canvas.width / 2;
      gameStateRef.current.player.y = canvas.height - 100;
      gameStateRef.current.core.x = canvas.width / 2;
      gameStateRef.current.core.y = canvas.height / 2;
    };

    window.addEventListener('resize', resize);
    resize();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
        e.preventDefault();
      }
      gameStateRef.current.keys[e.code] = true;
      gameStateRef.current.keys[e.key.toLowerCase()] = true;
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      gameStateRef.current.keys[e.code] = false;
      gameStateRef.current.keys[e.key.toLowerCase()] = false;
    };
    const handleMouseMove = (e: MouseEvent) => {
      gameStateRef.current.mouse.x = e.clientX;
      gameStateRef.current.mouse.y = e.clientY;
    };

    const handleMouseDown = () => {
      gameStateRef.current.mouse.isDown = true;
    };
    const handleMouseUp = () => {
      gameStateRef.current.mouse.isDown = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    let animationFrame: number;

    const loop = (time: number) => {
      const g = gameStateRef.current;
      if (g.lastTime === 0) g.lastTime = time;
      const dt = (time - g.lastTime) / 1000;
      g.lastTime = time;

      // Cap dt to prevent huge jumps if tab is inactive
      if (dt > 0.1) {
        animationFrame = requestAnimationFrame(loop);
        return;
      }

      const { player, keys, mouse, core } = g;

      // Update Player
      let dx = 0;
      let dy = 0;
      if (keys['KeyW'] || keys['w'] || keys['ArrowUp']) dy -= 1;
      if (keys['KeyS'] || keys['s'] || keys['ArrowDown']) dy += 1;
      if (keys['KeyA'] || keys['a'] || keys['ArrowLeft']) dx -= 1;
      if (keys['KeyD'] || keys['d'] || keys['ArrowRight']) dx += 1;

      if (dx !== 0 || dy !== 0) {
        const mag = Math.sqrt(dx * dx + dy * dy);
        player.x += (dx / mag) * PLAYER_SPEED * dt;
        player.y += (dy / mag) * PLAYER_SPEED * dt;
      }

      // Keep in bounds
      player.x = Math.max(PLAYER_SIZE, Math.min(canvas.width - PLAYER_SIZE, player.x));
      player.y = Math.max(PLAYER_SIZE, Math.min(canvas.height - PLAYER_SIZE, player.y));

      // Player Angle towards mouse
      player.angle = Math.atan2(mouse.y - player.y, mouse.x - player.x);

      // Shooting
      if (mouse.isDown && time - g.lastShoot > 150) {
        g.bullets.push({
          x: player.x,
          y: player.y,
          vx: Math.cos(player.angle) * BULLET_SPEED,
          vy: Math.sin(player.angle) * BULLET_SPEED,
        });
        g.lastShoot = time;
      }

      // Spawning
      if (time - g.lastSpawn > 1500) {
        const side = Math.floor(Math.random() * 4);
        let ex, ey;
        if (side === 0) { ex = Math.random() * canvas.width; ey = -20; }
        else if (side === 1) { ex = canvas.width + 20; ey = Math.random() * canvas.height; }
        else if (side === 2) { ex = Math.random() * canvas.width; ey = canvas.height + 20; }
        else { ex = -20; ey = Math.random() * canvas.height; }

        g.enemies.push({
          x: ex,
          y: ey,
          hp: 3,
          type: Math.random() > 0.5 ? 'circle' : 'square',
          lastShoot: time + Math.random() * 1000,
        });
        g.lastSpawn = time;
      }

      // Update Bullets
      g.bullets = g.bullets.filter(b => {
        b.x += b.vx * dt;
        b.y += b.vy * dt;
        
        // Core collision
        const distToCore = Math.sqrt((b.x - core.x)**2 + (b.y - core.y)**2);
        if (distToCore < core.radius) {
          core.hp -= 1;
          return false;
        }

        // Enemy collision
        for (let e of g.enemies) {
          const distToEnemy = Math.sqrt((b.x - e.x)**2 + (b.y - e.y)**2);
          if (distToEnemy < 15) {
            e.hp -= 1;
            return false;
          }
        }

        return b.x > 0 && b.x < canvas.width && b.y > 0 && b.y < canvas.height;
      });

      // Update Enemies
      g.enemies = g.enemies.filter(e => {
        if (e.hp <= 0) return false;
        
        const angleToCore = Math.atan2(core.y - e.y, core.x - e.x);
        // Move slowly towards core or player? Let's say towards core
        e.x += Math.cos(angleToCore) * ENEMY_SPEED * dt;
        e.y += Math.sin(angleToCore) * ENEMY_SPEED * dt;

        // Enemy shooting
        if (time - e.lastShoot > 2500) {
          const angleToPlayer = Math.atan2(player.y - e.y, player.x - e.x);
          g.enemyBullets.push({
            x: e.x,
            y: e.y,
            vx: Math.cos(angleToPlayer) * 180, // 3 * 60
            vy: Math.sin(angleToPlayer) * 180,
          });
          e.lastShoot = time;
        }

        return true;
      });

      // Update Enemy Bullets
      g.enemyBullets = g.enemyBullets.filter(eb => {
        eb.x += eb.vx * dt;
        eb.y += eb.vy * dt;

        // Player collision
        const distToPlayer = Math.sqrt((eb.x - player.x)**2 + (eb.y - player.y)**2);
        if (distToPlayer < PLAYER_SIZE) {
          g.lost = true;
          return false;
        }

        return eb.x > 0 && eb.x < canvas.width && eb.y > 0 && eb.y < canvas.height;
      });

      // Win/Loss conditions
      if (core.hp <= 0) {
        g.won = true;
      }

      if (g.won) {
        setGameState('won');
        setTimeout(() => onComplete(), 1500);
        return;
      }

      if (g.lost) {
        setGameState('lost');
        setShowRetry(true);
        setTimeout(() => {
          // Reset game
          g.lost = false;
          g.core.hp = CORE_HP;
          g.enemies = [];
          g.bullets = [];
          g.enemyBullets = [];
          g.player.x = canvas.width / 2;
          g.player.y = canvas.height - 100;
          setShowRetry(false);
          setGameState('playing');
        }, 2000);
        return;
      }

      // Draw
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Grid
      ctx.strokeStyle = '#1a1a1a';
      ctx.lineWidth = 1;
      const gridSize = 50;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Core
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#fff';
      ctx.beginPath();
      ctx.arc(core.x, core.y, core.radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.shadowBlur = 0;
      
      // Core HP bar
      const hpWidth = 60;
      ctx.fillStyle = '#333';
      ctx.fillRect(core.x - hpWidth/2, core.y + core.radius + 10, hpWidth, 4);
      ctx.fillStyle = PLAYER_COLOR;
      ctx.fillRect(core.x - hpWidth/2, core.y + core.radius + 10, hpWidth * (core.hp / CORE_HP), 4);

      // Player
      ctx.save();
      ctx.translate(player.x, player.y);
      ctx.rotate(player.angle);
      ctx.fillStyle = PLAYER_COLOR;
      ctx.shadowBlur = 15;
      ctx.shadowColor = PLAYER_COLOR;
      ctx.beginPath();
      ctx.moveTo(PLAYER_SIZE, 0);
      ctx.lineTo(-PLAYER_SIZE / 2, PLAYER_SIZE / 1.5);
      ctx.lineTo(-PLAYER_SIZE / 2, -PLAYER_SIZE / 1.5);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
      ctx.shadowBlur = 0;

      // Bullets
      ctx.fillStyle = BULLET_COLOR;
      ctx.shadowBlur = 5;
      ctx.shadowColor = BULLET_COLOR;
      for (let b of g.bullets) {
        ctx.beginPath();
        ctx.arc(b.x, b.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      // Enemy Bullets
      ctx.fillStyle = '#ff4444';
      for (let eb of g.enemyBullets) {
        ctx.beginPath();
        ctx.arc(eb.x, eb.y, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Enemies
      ctx.strokeStyle = ENEMY_COLOR;
      ctx.lineWidth = 2;
      for (let e of g.enemies) {
        if (e.type === 'circle') {
          ctx.beginPath();
          ctx.arc(e.x, e.y, 12, 0, Math.PI * 2);
          ctx.stroke();
        } else {
          ctx.strokeRect(e.x - 10, e.y - 10, 20, 20);
        }
      }

      animationFrame = requestAnimationFrame(loop);
    };

    animationFrame = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(animationFrame);
    };
  }, [gameState, onComplete]);

  return (
    <div 
      className="fixed inset-0 z-[200] bg-black overflow-hidden font-mono select-none"
      tabIndex={0}
      autoFocus
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
      
      {/* UI Overlay */}
      <div className="absolute top-8 left-8 flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={msg + i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="text-[#e6e2af] text-sm tracking-widest uppercase flicker"
            >
              {msg}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Status Messages */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {gameState === 'won' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-white text-4xl md:text-6xl tracking-[0.5em] uppercase font-bold"
          >
            [ACCESS GRANTED]
          </motion.div>
        )}
        {gameState === 'lost' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="text-[#ff4444] text-4xl md:text-6xl tracking-[0.5em] uppercase font-bold">
              [ACCESS DENIED]
            </div>
            <div className="text-white text-xl tracking-widest uppercase">
              [RETRYING...]
            </div>
          </motion.div>
        )}
      </div>

      {/* Controls Help */}
      {gameState === 'playing' && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-500 text-xs tracking-widest uppercase opacity-50">
          WASD to move | Mouse to aim
        </div>
      )}

      <style jsx>{`
        .flicker {
          animation: flicker 0.15s infinite alternate;
        }
        @keyframes flicker {
          0% { opacity: 0.8; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
