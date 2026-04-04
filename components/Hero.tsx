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
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none z-10"></div>
        
        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end pb-12 md:pb-20 px-6 md:px-16 lg:px-24 z-20 pointer-events-none">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            whileHover={{ scale: 1.02, x: 10 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col text-white max-w-6xl pointer-events-auto cursor-default group"
          >
            <span className="text-sm md:text-base lg:text-lg font-mono tracking-[0.5em] text-nier-red mb-2 md:mb-4 drop-shadow-[0_0_8px_rgba(200,0,0,0.8)] group-hover:drop-shadow-[0_0_15px_rgba(255,0,0,1)] transition-all duration-300">
              AWARD-WINNING
            </span>
            <span className="text-4xl md:text-6xl lg:text-7xl xl:text-[5rem] font-display font-medium tracking-tighter uppercase leading-[1.1] drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] group-hover:drop-shadow-[0_0_25px_rgba(255,255,255,0.5)] transition-all duration-300">
              Visual Storytelling
            </span>
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={isLoaded ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4 mt-6 md:mt-8 pointer-events-auto"
          >
            <div className="h-[2px] w-12 md:w-20 bg-nier-red relative overflow-hidden shadow-[0_0_10px_rgba(200,0,0,0.8)]">
              <div className="absolute top-0 left-0 w-full h-full bg-white animate-slide-playhead opacity-50"></div>
            </div>
            <p className="text-white font-mono tracking-[0.15em] text-xs md:text-sm uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              First Place & Best in Show — DerpyCon 2024
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4 mt-8 md:mt-10 pointer-events-auto"
          >
            <button 
              onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3 bg-nier-red text-white font-mono text-xs md:text-sm tracking-widest uppercase hover:bg-white hover:text-nier-red transition-colors duration-300 shadow-[0_0_15px_rgba(200,0,0,0.4)] hover:shadow-[0_0_20px_rgba(255,255,255,0.6)]"
            >
              View my work
            </button>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3 bg-transparent border border-white/30 text-white font-mono text-xs md:text-sm tracking-widest uppercase hover:bg-white hover:text-nier-dark hover:border-white transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.4)]"
            >
              Hire me
            </button>
            <button 
              onClick={() => document.getElementById('awards')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3 bg-transparent border border-white/30 text-white font-mono text-xs md:text-sm tracking-widest uppercase hover:bg-white hover:text-nier-dark hover:border-white transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.4)]"
            >
              Check awards
            </button>
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
            <p className="text-nier-red font-mono text-xs md:text-sm font-bold tracking-[0.2em] uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] group-hover:drop-shadow-[0_0_12px_rgba(200,0,0,0.8)] group-hover:text-red-400 transition-all duration-300 bg-black/50 px-4 py-1.5 border border-nier-red/30 backdrop-blur-sm">
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
            <p className="text-nier-red font-mono text-xs md:text-sm font-bold tracking-[0.2em] uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] group-hover:drop-shadow-[0_0_12px_rgba(200,0,0,0.8)] group-hover:text-red-400 transition-all duration-300 bg-black/50 px-4 py-1.5 border border-nier-red/30 backdrop-blur-sm">
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
            <p className="text-nier-red font-mono text-xs md:text-sm font-bold tracking-[0.2em] uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] group-hover:drop-shadow-[0_0_12px_rgba(200,0,0,0.8)] group-hover:text-red-400 transition-all duration-300 bg-black/50 px-4 py-1.5 border border-nier-red/30 backdrop-blur-sm">
              AMV and high-end storytelling
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
