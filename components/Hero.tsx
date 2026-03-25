"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Crosshair, Terminal, Video, Activity, Cpu, Database } from 'lucide-react';
import { motion, useMotionValue, useTransform, animate } from 'motion/react';
import Image from 'next/image';
import { useGlitch } from './GlitchContext';

const shapes = [
  { width: 120, height: 120, left: '10%', top: '20%', y: [0, -10, 0], x: [0, 10, 0], duration: 15, color: 'transparent', border: '1px solid #4a4843' },
  { width: 80, height: 80, left: '80%', top: '15%', y: [0, 20, 0], x: [0, -5, 0], duration: 12, color: 'transparent', border: '1px solid #4a4843' },
  { width: 150, height: 150, left: '70%', top: '70%', y: [0, -10, 0], x: [0, -15, 0], duration: 18, color: 'rgba(74, 72, 67, 0.05)', border: '1px solid #4a4843' },
  { width: 90, height: 90, left: '20%', top: '80%', y: [0, 15, 0], x: [0, 5, 0], duration: 14, color: 'transparent', border: '1px solid #8b0000' },
  { width: 110, height: 110, left: '40%', top: '40%', y: [0, -20, 0], x: [0, 20, 0], duration: 16, color: 'transparent', border: '1px solid #4a4843' },
  { width: 70, height: 70, left: '60%', top: '85%', y: [0, 10, 0], x: [0, -10, 0], duration: 11, color: 'rgba(139, 0, 0, 0.05)', border: '1px solid #8b0000' },
];

export default function Hero({ isLoaded = true }: { isLoaded?: boolean }) {
  const progress = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);
  const [time, setTime] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(`${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}:${now.getMilliseconds().toString().padStart(3, '0')}`);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isDragging) {
      let currentAnimation: any;
      
      const startInfinite = (from: number, to: number) => {
        currentAnimation = animate(progress, to, {
          duration: Math.abs(to - from) * 3,
          ease: "easeInOut",
          onComplete: () => {
            startInfinite(to, to === 1 ? 0 : 1);
          }
        });
      };
      
      startInfinite(progress.get(), progress.get() > 0.5 ? 0 : 1);
      
      return () => {
        if (currentAnimation) currentAnimation.stop();
      };
    }
  }, [isDragging, progress]);

  const updateProgress = useCallback((clientX: number) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const newProgress = Math.max(0, Math.min(1, x / rect.width));
      progress.set(newProgress);
    }
  }, [progress]);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (isDragging) {
        updateProgress(e.clientX);
      }
    };

    const handlePointerUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
      return () => {
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerup', handlePointerUp);
      };
    }
  }, [isDragging, updateProgress]);

  const textSkew = useTransform(progress, [0, 0.5, 1], [-5, 0, 5]);
  const letterSpacing = useTransform(progress, [0, 0.5, 1], ["0em", "0.2em", "0em"]);
  const textColor = useTransform(progress, [0, 0.5, 1], ["rgba(74,72,67,0)", "#8b0000", "rgba(74,72,67,0)"]);
  const strokeColor = useTransform(progress, [0, 0.5, 1], ["#4a4843", "#4a4843", "#4a4843"]);
  const textStroke = useTransform(strokeColor, c => `1px ${c}`);

  const { trackSection, reportUserAction, unlockEnding, foundSecret } = useGlitch();

  return (
    <motion.section 
      className="min-h-screen bg-transparent relative flex flex-col items-center justify-center overflow-hidden border-b border-nier-dark pt-20"
      onViewportEnter={() => {
        trackSection('Hero');
        reportUserAction('is viewing the primary landing interface');
      }}
      viewport={{ once: true, margin: "-20%" }}
    >
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" style={{ backgroundImage: 'linear-gradient(var(--color-nier-dark) 1px, transparent 1px), linear-gradient(90deg, var(--color-nier-dark) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden z-0 opacity-30">
        {shapes.map((shape, i) => (
          <motion.div
            key={i}
            className="absolute rounded-none"
            style={{
              width: shape.width,
              height: shape.height,
              left: shape.left,
              top: shape.top,
              backgroundColor: shape.color,
              border: shape.border,
            }}
            animate={{
              y: shape.y,
              x: shape.x,
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: shape.duration,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Technical HUD Elements */}
      <div className="absolute top-24 left-6 hidden lg:flex flex-col gap-4 opacity-60 z-10 font-mono text-[10px] text-nier-dark tracking-widest">
        <div className="flex items-center gap-2">
          <Activity size={12} className="text-nier-red animate-pulse" />
          <span>SYS.STATUS: OPTIMAL</span>
        </div>
        <div className="flex items-center gap-2">
          <Cpu size={12} />
          <span>MEM.USAGE: 42.8%</span>
        </div>
        <div className="flex items-center gap-2">
          <Database size={12} />
          <span>DB.CONN: ESTABLISHED</span>
        </div>
        <div className="mt-4 border-l border-nier-dark pl-2 space-y-1">
          <div>LAT: 40.3790° N</div>
          <div>LON: 49.8920° E</div>
          <div className="text-nier-red mt-2">{time}</div>
        </div>
      </div>

      <div className="absolute top-24 right-6 hidden lg:flex flex-col items-end gap-2 opacity-60 z-10 font-mono text-[10px] text-nier-dark tracking-widest text-right">
        <div className="writing-vertical-rl transform rotate-180 text-2xl font-bold tracking-[0.5em] opacity-30">
          アリ・アリエフ
        </div>
        <div className="mt-4 border-r border-nier-dark pr-2 space-y-1">
          <div>TARGET: IDENTIFIED</div>
          <div>MODE: CREATIVE</div>
          <div>VFX_PIPELINE: ACTIVE</div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-[10%] md:left-1/4 animate-float -rotate-45 opacity-50 z-10">
        <Crosshair size={48} className="text-nier-dark" strokeWidth={1} />
      </div>
      <div className="absolute bottom-1/4 right-[10%] md:right-1/4 animate-float opacity-50 z-10 cursor-pointer" onClick={foundSecret}>
        <Terminal size={32} className="text-nier-red" strokeWidth={1} />
      </div>

      {/* Main Content */}
      <div className="text-center z-10 px-4 mt-12 flex flex-col items-center w-full max-w-5xl">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={isLoaded ? { scale: 1, opacity: 1, y: 0 } : { scale: 0.9, opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: isLoaded ? 0.3 : 0 }}
          className="relative w-full nier-box px-8 md:px-16 py-8 md:py-12 mb-8 md:mb-12 z-30 cursor-default hover:bg-nier-dark hover:text-nier-light transition-colors duration-500 group overflow-hidden"
          onClick={() => {
            const currentClicks = parseInt(localStorage.getItem('nier_logo_clicks') || '0') + 1;
            localStorage.setItem('nier_logo_clicks', currentClicks.toString());
            if (currentClicks === 10) {
              reportUserAction('discovered the logo secret');
              unlockEnding('L'); // Ending L: Logo Clicker
            }
          }}
        >
          {/* Hover Scanline */}
          <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(255,255,255,0.05)_50%)] bg-[length:100%_4px] opacity-0 group-hover:opacity-100 pointer-events-none z-0" />
          
          <div className="absolute top-2 left-3 text-[10px] font-mono text-nier-dark opacity-50 group-hover:text-nier-light group-hover:opacity-80 transition-colors duration-200 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-nier-red rounded-full animate-pulse" />
            SYS.ID: 9S // AUTHORIZED
          </div>
          
          <div className="absolute top-2 right-3 text-[10px] font-mono text-nier-dark opacity-50 group-hover:text-nier-light group-hover:opacity-80 transition-colors duration-200">
            ビデオエディター
          </div>

          <h1 className="font-akira text-5xl md:text-7xl lg:text-[9rem] tracking-widest uppercase leading-[0.9] text-nier-dark mt-6 group-hover:text-nier-light transition-colors duration-500 relative z-10">
            ALI<br/>ALIYEV
          </h1>
          
          <div className="absolute bottom-2 right-3 text-[10px] font-mono text-nier-dark opacity-50 group-hover:text-nier-light group-hover:opacity-80 transition-colors duration-200">
            [ DATA_LINK_ACTIVE ]
          </div>
          
          <div className="absolute bottom-2 left-3 text-[10px] font-mono text-nier-dark opacity-50 group-hover:text-nier-light group-hover:opacity-80 transition-colors duration-200">
            VER: 2.0.4b
          </div>

          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-nier-red opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-nier-red opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.5, delay: isLoaded ? 0.5 : 0 }}
          className="relative inline-block mb-16 mx-4 md:mx-16 w-full max-w-4xl"
        >
          <motion.div 
            className="font-wide text-6xl md:text-[8rem] lg:text-[11rem] tracking-tighter relative z-10" 
            style={{ 
              skewX: textSkew,
              letterSpacing: letterSpacing,
              color: textColor,
              WebkitTextStroke: textStroke
            }}
          >
            EDITOR
          </motion.div>
          
          <div className="absolute inset-0 flex items-center justify-center z-20">
             {/* Timeline line */}
             <div className="w-[120%] h-[1px] md:h-[2px] bg-nier-dark absolute top-1/2 -translate-y-1/2 -left-[10%] pointer-events-none"></div>
             
             {/* Interactive Area */}
             <div 
               ref={containerRef}
               className="absolute top-1/2 -translate-y-1/2 left-[-10%] right-[-10%] h-32 cursor-pointer touch-none"
               onPointerDown={(e) => {
                 setIsDragging(true);
                 updateProgress(e.clientX);
               }}
             >
               {/* Playhead */}
               <motion.div 
                 className="w-1 md:w-2 h-16 md:h-24 bg-nier-red border border-nier-dark absolute top-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing shadow-[0_0_10px_rgba(139,0,0,0.5)]"
                 style={{ 
                   left: useTransform(progress, [0, 1], ["0%", "100%"]),
                   x: "-50%"
                 }}
               >
                 <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-3 h-3 border border-nier-dark bg-nier-light rotate-45"></div>
                 <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3 h-3 border border-nier-dark bg-nier-light rotate-45"></div>
               </motion.div>
               
               {/* Video icon */}
               <motion.div 
                 className="absolute top-1/2 -translate-y-1/2 pointer-events-none" 
                 style={{ 
                   left: useTransform(progress, [0, 1], ["0%", "100%"]),
                   x: "100%",
                 }}
               >
                 <div className="nier-box p-2 md:p-3 ml-4 bg-nier-beige/80 backdrop-blur-sm">
                   <Video size={24} className="text-nier-dark" strokeWidth={1.5} />
                 </div>
               </motion.div>
             </div>
          </div>
        </motion.div>
        
        <motion.a 
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          href="#work"
          className="text-xs md:text-sm font-mono tracking-widest text-nier-light bg-nier-dark px-8 md:px-12 py-5 border border-nier-dark cursor-pointer inline-block uppercase relative group overflow-hidden hover:bg-nier-red hover:text-nier-light transition-colors duration-300 shadow-lg"
          transition={{ duration: 0.8, delay: isLoaded ? 0.7 : 0 }}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className="relative z-10 flex items-center gap-3">
            <span className="w-2 h-2 bg-nier-light rounded-full animate-pulse" />
            [ Award-winning Video Editor & Motion Designer ]
          </span>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </motion.a>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 hidden md:flex flex-col items-center gap-2 opacity-50">
        <div className="text-[10px] font-mono tracking-widest text-nier-dark rotate-90 origin-right mb-8">SCROLL</div>
        <div className="w-[1px] h-16 bg-nier-dark relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-nier-red animate-slide-playhead"></div>
        </div>
      </div>
    </motion.section>
  );
}
