"use client";

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Trophy, Medal, Star, Award, ShieldCheck, Play } from 'lucide-react';
import Image from 'next/image';
import { useGlitch } from './GlitchContext';

const awards = [
  {
    year: '2025',
    items: [
      { title: 'BEST EDITING', context: 'DERPICON', icon: Trophy },
      { title: 'JUDGES CHOICE', context: 'ANIREVO', icon: Star },
    ]
  },
  {
    year: '2024',
    items: [
      { title: '1ST PLACE', context: 'ROYAL GRINDIS AMV CONTEST', icon: Medal },
      { title: 'MOST IMPACTFUL', context: 'ANIREVO', icon: Star },
      { title: '1ST PLACE (EXC)', context: 'ANIME FESTIVAL KASSEL', icon: Trophy },
      { title: '1ST PLACE (OPEN)', context: 'ANIME FESTIVAL KASSEL', icon: Award },
    ]
  },
  {
    year: '2023',
    items: [
      { title: 'JUDGES CHOICE', context: 'ANIREVO', icon: Star },
      { title: '1ST PLACE', context: 'ANIME MESSE BABELSBERG', icon: Medal },
      { title: '1ST PLACE', context: 'ANIME TORONTO', icon: Trophy },
    ]
  }
];

const categories = [
  {
    id: 'amvs',
    name: 'AMVs / Edits',
    projects: [
      { id: 'o9FOYN3gMRQ', title: 'Project 01' },
      { id: 'TaGrFtPV7lU', title: 'Project 02' },
      { id: 'xT60m9aAR-Y', title: 'Project 03' },
      { id: 'z-VnFmpcrmU', title: 'Project 04' },
    ]
  },
  {
    id: 'content-creators',
    name: 'Content Creators',
    projects: [
      { id: '4QmfVjeO4gA', title: 'Creator Edit 01' },
      { id: '-V7mCMyjzF4', title: 'Creator Edit 02' },
      { id: 'nCQmHokmhxQ', title: 'Creator Edit 03' },
      { id: 'pnCGwr5_2lU', title: 'Creator Edit 04' },
    ]
  }
];

export default function CinematicTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { trackSection, reportUserAction } = useGlitch();
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const [activeVideo, setActiveVideo] = useState(categories[0].projects[0].id);

  const currentCategory = categories.find(c => c.id === activeCategory) || categories[0];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // --- SCENE 1: AWARDS (0 to 0.4) ---
  const awardsOpacity = useTransform(scrollYProgress, [0, 0.05, 0.35, 0.4], [0, 1, 1, 0]);
  const awardsScale = useTransform(scrollYProgress, [0, 0.4], [0.8, 1.2]);
  const awardsX = useTransform(scrollYProgress, [0.05, 0.35], ["0%", "-50%"]);

  // --- TRANSITION: GLITCH & WARP (0.38 to 0.45) ---
  const glitchOpacity = useTransform(scrollYProgress, [0.38, 0.4, 0.42, 0.45], [0, 1, 0.5, 0]);
  const glitchScale = useTransform(scrollYProgress, [0.38, 0.45], [1, 1.5]);
  const glitchFilter = useTransform(scrollYProgress, [0.38, 0.4, 0.45], ["contrast(1) hue-rotate(0deg)", "contrast(2) hue-rotate(90deg)", "contrast(1) hue-rotate(0deg)"]);

  // --- SCENE 2: WORK (0.45 to 1.0) ---
  const workOpacity = useTransform(scrollYProgress, [0.45, 0.5, 0.95, 1], [0, 1, 1, 0.5]);
  const workScale = useTransform(scrollYProgress, [0.45, 0.5], [0.5, 1]);
  const workY = useTransform(scrollYProgress, [0.45, 0.5], ["20%", "0%"]);
  
  // Pointer events toggle so underlying layers don't block clicks
  const workPointerEvents = useTransform(scrollYProgress, (v) => v > 0.45 ? "auto" : "none");
  const awardsPointerEvents = useTransform(scrollYProgress, (v) => v < 0.4 ? "auto" : "none");

  return (
    <section 
      id="cinematic-timeline" 
      ref={containerRef} 
      className="relative h-[400vh] bg-nier-dark"
      onMouseEnter={() => {
        trackSection('Cinematic Timeline');
        reportUserAction('entered the cinematic timeline');
      }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-nier-dark flex items-center justify-center">
        
        {/* Background Grid Parallax */}
        <motion.div 
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{ 
            backgroundImage: 'linear-gradient(var(--color-nier-dark) 1px, transparent 1px), linear-gradient(90deg, var(--color-nier-dark) 1px, transparent 1px)', 
            backgroundSize: '40px 40px',
            y: useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
          }} 
        />

        {/* ================= SCENE 1: AWARDS ================= */}
        <motion.div 
          className="absolute inset-0 flex flex-col justify-center pl-[10vw]"
          style={{ 
            opacity: awardsOpacity, 
            scale: awardsScale,
            pointerEvents: awardsPointerEvents as any
          }}
        >
          <div className="mb-12">
            <h2 className="font-akira text-6xl md:text-8xl text-nier-beige tracking-tighter uppercase">
              AWARDS_LOG
            </h2>
            <div className="w-24 h-1 bg-nier-red mt-4"></div>
          </div>

          <motion.div 
            className="flex gap-12 w-max"
            style={{ x: awardsX }}
          >
            {awards.map((group, yearIdx) => (
              <div key={yearIdx} className="flex flex-col gap-6 w-[300px] md:w-[400px]">
                <h3 className="font-akira text-4xl text-nier-beige opacity-50">{group.year}</h3>
                {group.items.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="bg-nier-light border border-nier-dark p-6 relative group overflow-hidden">
                      <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(255,255,255,0.05)_50%)] bg-[length:100%_4px] opacity-0 group-hover:opacity-100 pointer-events-none z-0" />
                      <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                          <Icon className="w-5 h-5 text-nier-red" />
                          <span className="font-mono text-[10px] tracking-widest opacity-60 uppercase">Record_{group.year}_{i+1}</span>
                        </div>
                        <h4 className="font-akira text-lg mb-2 leading-tight text-nier-dark">{item.title}</h4>
                        <p className="font-mono text-xs tracking-widest uppercase text-nier-red">{item.context}</p>
                      </div>
                      <ShieldCheck className="absolute -right-4 -bottom-4 w-24 h-24 opacity-5 rotate-[-15deg] pointer-events-none" />
                    </div>
                  );
                })}
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ================= TRANSITION GLITCH ================= */}
        <motion.div 
          className="absolute inset-0 bg-nier-red mix-blend-overlay pointer-events-none z-40"
          style={{ 
            opacity: glitchOpacity,
            scale: glitchScale,
            filter: glitchFilter
          }}
        >
          <div className="w-full h-full flex items-center justify-center opacity-50">
            <h2 className="font-akira text-[15vw] text-white tracking-tighter animate-pulse">
              SYSTEM_OVERRIDE
            </h2>
          </div>
        </motion.div>

        {/* ================= SCENE 2: WORK ================= */}
        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-center px-4 bg-nier-dark z-30"
          style={{ 
            opacity: workOpacity, 
            scale: workScale,
            y: workY,
            pointerEvents: workPointerEvents as any
          }}
        >
          <div className="w-full max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-akira text-4xl md:text-6xl text-nier-light tracking-tighter uppercase">
                PROJECT_ARCHIVE
              </h2>
              <div className="hidden md:flex gap-4">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setActiveCategory(category.id);
                      setActiveVideo(category.projects[0].id);
                    }}
                    className={`px-4 py-2 font-mono text-xs tracking-widest uppercase border transition-colors ${
                      activeCategory === category.id
                        ? 'border-nier-beige text-nier-dark bg-nier-beige'
                        : 'border-nier-beige text-nier-beige hover:border-nier-beige/50'
                    }`}
                  >
                    [{category.name}]
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Category Selector */}
            <div className="flex md:hidden gap-2 mb-6 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setActiveCategory(category.id);
                    setActiveVideo(category.projects[0].id);
                  }}
                  className={`px-3 py-1.5 font-mono text-[10px] whitespace-nowrap tracking-widest uppercase border transition-colors ${
                    activeCategory === category.id
                      ? 'border-nier-beige text-nier-dark bg-nier-beige'
                      : 'border-nier-beige text-nier-beige hover:border-nier-beige/50'
                  }`}
                >
                  [{category.name}]
                </button>
              ))}
            </div>

            {/* Main Video Player */}
            <div className="aspect-video bg-black border border-nier-beige relative group overflow-hidden p-1 mb-6 shadow-[0_0_30px_rgba(0,0,0,0.8)]">
               <iframe 
                 className="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700 relative z-10"
                 src={`https://www.youtube.com/embed/${activeVideo}?autoplay=0&mute=0&rel=0&modestbranding=1`}
                 title="YouTube video player"
                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                 allowFullScreen
               ></iframe>
               <div className="absolute inset-0 bg-nier-red/10 mix-blend-overlay pointer-events-none z-20"></div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
              {currentCategory.projects.map((p) => (
                <div 
                  key={p.id} 
                  onClick={() => setActiveVideo(p.id)}
                  className={`min-w-[160px] md:min-w-[240px] aspect-video bg-black border ${activeVideo === p.id ? 'border-nier-red' : 'border-nier-beige'} snap-center relative overflow-hidden group cursor-pointer p-1 transition-colors`}
                >
                  <div className="absolute inset-1">
                    <Image 
                      src={`https://img.youtube.com/vi/${p.id}/hqdefault.jpg`}
                      alt={p.title} 
                      fill 
                      className={`object-cover transition-all duration-500 ${activeVideo === p.id ? 'grayscale-0 opacity-100' : 'opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-100'}`}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className={`absolute bottom-2 left-2 ${activeVideo === p.id ? 'bg-nier-red text-white' : 'bg-nier-dark/80 text-nier-beige'} font-mono text-[8px] md:text-[10px] px-2 py-1 tracking-widest border border-nier-beige transition-colors z-10`}>
                    [{p.title}]
                  </div>
                  {activeVideo === p.id && (
                    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                      <Play className="w-8 h-8 text-white opacity-50" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Cinematic Letterboxing */}
        <div className="absolute top-0 left-0 w-full h-[8vh] bg-black z-50 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-full h-[8vh] bg-black z-50 flex items-center justify-between px-8 pointer-events-none">
          <div className="font-mono text-[10px] text-white/50 tracking-widest animate-pulse">REC</div>
          <div className="font-mono text-[10px] text-white/50 tracking-widest">
            {/* Simple progress bar */}
            <motion.div 
              className="w-32 h-[1px] bg-white/30 relative"
            >
              <motion.div 
                className="absolute top-0 left-0 h-full bg-nier-red"
                style={{ width: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
              />
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
