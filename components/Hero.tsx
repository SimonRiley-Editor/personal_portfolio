"use client";

import React from 'react';
import { motion } from 'motion/react';
import { useGlitch } from './GlitchContext';

export default function Hero({ isLoaded = true }: { isLoaded?: boolean }) {
  const { trackSection, reportUserAction } = useGlitch();

  const handleProjectClick = (categoryId: string, projectId: string) => {
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('openProject', { 
        detail: { categoryId, projectId } 
      }));
    }, 100);
  };

  return (
    <motion.section 
      className="h-[100svh] w-full flex flex-col bg-nier-dark overflow-hidden"
      onViewportEnter={() => {
        trackSection('Hero');
        reportUserAction('is viewing the primary landing interface');
      }}
      viewport={{ once: true, margin: "-20%" }}
    >
      {/* Top Row (Large Block) */}
      <div className="relative w-full h-1/2 md:h-[55%] overflow-hidden group">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-[2s] ease-out"
        >
          <source src="https://res.cloudinary.com/ds6dwbk37/video/upload/v1775281440/ClipForHero_gfsyog.mp4" type="video/mp4" />
        </video>
        
        {/* Overlays */}
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-700"></div>
        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none z-10" />
        
        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-16 lg:px-24 z-20">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col text-white drop-shadow-2xl max-w-6xl"
          >
            <span className="text-sm md:text-base lg:text-lg font-mono tracking-[0.5em] text-nier-red mb-2 md:mb-4">
              AWARD-WINNING
            </span>
            <span className="text-4xl md:text-6xl lg:text-7xl xl:text-[5rem] font-display font-medium tracking-tighter uppercase leading-[1.1]">
              Visual Storytelling
            </span>
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={isLoaded ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4 mt-6 md:mt-8"
          >
            <div className="h-[2px] w-12 md:w-20 bg-nier-red relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-white animate-slide-playhead opacity-50"></div>
            </div>
            <p className="text-white font-mono tracking-[0.15em] text-xs md:text-sm uppercase drop-shadow-md">
              First Place & Best in Show — DerpyCon 2024
            </p>
          </motion.div>
        </div>
      </div>

      {/* Bottom Row (Three Equal Blocks) */}
      <div className="w-full h-1/2 md:h-[45%] flex flex-col md:flex-row z-20 bg-nier-dark">
        {/* Left Block */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex-1 h-full overflow-hidden group border-b md:border-b-0 md:border-r border-white/10 cursor-pointer"
          onClick={() => handleProjectClick('content-creators', 'pnCGwr5_2lU')}
        >
          <div className="absolute inset-0 bg-black/80 group-hover:bg-black/40 transition-colors duration-700 z-10"></div>
          <div className="absolute inset-0 bg-[url('https://img.youtube.com/vi/pnCGwr5_2lU/maxresdefault.jpg')] bg-cover bg-center opacity-40 group-hover:scale-110 transition-transform duration-[2s] ease-out"></div>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-20">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-wide text-white tracking-[0.15em] uppercase mb-3 md:mb-6 group-hover:scale-105 transition-transform duration-500">
              HIGH-RETENTION<br />CONTENT
            </h2>
            <p className="text-nier-red font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase">
              YouTube & Gaming (Braxophone)
            </p>
          </div>
        </motion.div>

        {/* Center Block */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex-1 h-full overflow-hidden group border-b md:border-b-0 md:border-r border-white/10 cursor-pointer"
          onClick={() => handleProjectClick('content-creators', 'h7LMLwdBl4o')}
        >
          <div className="absolute inset-0 bg-black/80 group-hover:bg-black/40 transition-colors duration-700 z-10"></div>
          <div className="absolute inset-0 bg-[url('https://img.youtube.com/vi/h7LMLwdBl4o/maxresdefault.jpg')] bg-cover bg-center opacity-40 group-hover:scale-110 transition-transform duration-[2s] ease-out"></div>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-20">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-wide text-white tracking-[0.15em] uppercase mb-3 md:mb-6 group-hover:scale-105 transition-transform duration-500">
              LET&apos;S MAKE YOUR<br />VIDEO UNIQUE
            </h2>
            <p className="text-nier-red font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase">
              VFX and After Effects work
            </p>
          </div>
        </motion.div>

        {/* Right Block */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex-1 h-full overflow-hidden group cursor-pointer"
          onClick={() => handleProjectClick('amvs', 'TaGrFtPV7lU')}
        >
          <div className="absolute inset-0 bg-black/80 group-hover:bg-black/40 transition-colors duration-700 z-10"></div>
          <div className="absolute inset-0 bg-[url('https://img.youtube.com/vi/TaGrFtPV7lU/maxresdefault.jpg')] bg-cover bg-center opacity-40 group-hover:scale-110 transition-transform duration-[2s] ease-out"></div>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-20">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-wide text-white tracking-[0.15em] uppercase mb-3 md:mb-6 group-hover:scale-105 transition-transform duration-500">
              CINEMATIC<br />EDITING
            </h2>
            <p className="text-nier-red font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase">
              AMV and high-end storytelling
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
