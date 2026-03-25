"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { useGlitch } from './GlitchContext';

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
      { id: 'Tm4cNXkU5pk', title: 'Creator Edit 05' },
      { id: '60cttcBWGYo', title: 'Creator Edit 06' },
      { id: 'FW_KNCtytdM', title: 'Creator Edit 07' },
    ]
  }
];

export default function WorkSection() {
  const { trackSection, reportUserAction } = useGlitch();
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const [activeVideo, setActiveVideo] = useState(categories[0].projects[0].id);

  const currentCategory = React.useMemo(() => 
    categories.find(c => c.id === activeCategory) || categories[0],
  [activeCategory]);

  const handleCategoryChange = React.useCallback((categoryId: string) => {
    setActiveCategory(categoryId);
    const newCategory = categories.find(c => c.id === categoryId);
    if (newCategory && newCategory.projects.length > 0) {
      setActiveVideo(newCategory.projects[0].id);
    }
  }, []);

  return (
    <motion.section 
      id="work" 
      className="bg-nier-gray border-b border-nier-dark pb-20 relative overflow-hidden"
      onViewportEnter={() => {
        trackSection('Work');
        reportUserAction('is reviewing the project archives');
      }}
      viewport={{ once: true, margin: "-20%" }}
    >
      {/* Animated Background Film Strip */}
      <div className="absolute inset-0 pointer-events-none opacity-10 z-0 flex flex-col justify-between py-10">
        {[...Array(5)].map((_, i) => (
          <motion.div 
            key={i}
            className="w-[200%] h-12 flex gap-4"
            animate={{ x: i % 2 === 0 ? ['0%', '-50%'] : ['-50%', '0%'] }}
            transition={{ duration: 20 + i * 5, repeat: Infinity, ease: "linear" }}
          >
            {[...Array(20)].map((_, j) => (
              <div key={j} className="w-24 h-full border border-nier-dark rounded-none flex-shrink-0"></div>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Marquee Tape */}
      <div className="bg-nier-dark border-y border-nier-dark py-2 transform -rotate-1 scale-110 overflow-hidden whitespace-nowrap mb-20 relative z-10">
        <div className="flex w-max animate-marquee">
          <h2 className="font-mono text-xl md:text-2xl font-bold tracking-[0.5em] uppercase whitespace-pre text-nier-light">
            {"[ SYSTEM DATA // WORK_LOG ] • ".repeat(10)}
          </h2>
          <h2 className="font-mono text-xl md:text-2xl font-bold tracking-[0.5em] uppercase whitespace-pre text-nier-light">
            {"[ SYSTEM DATA // WORK_LOG ] • ".repeat(10)}
          </h2>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Category Selector */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`px-6 py-2 font-mono text-sm tracking-widest uppercase border transition-colors ${
                activeCategory === category.id
                  ? 'border-nier-light text-black bg-nier-light'
                  : 'border-nier-dark text-nier-light hover:border-nier-light/50'
              }`}
            >
              [ {category.name} ]
            </button>
          ))}
        </div>

        {/* Main Video Player Placeholder */}
        <motion.div 
          className="aspect-video bg-black border border-nier-dark rounded-none mb-12 relative group overflow-hidden p-1"
          whileHover="hover"
          initial="initial"
        >
           {/* Actual Video (YouTube Embed) */}
           <iframe 
             className="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700"
             src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&mute=1&loop=1&playlist=${activeVideo}&controls=1&showinfo=0&rel=0&modestbranding=1`}
             title="YouTube video player"
             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
             allowFullScreen
             loading="lazy"
           ></iframe>

           {/* Shimmer/Pulse Effect */}
           <motion.div 
             className="absolute inset-1 bg-gradient-to-r from-transparent via-nier-light/10 to-transparent skew-x-12 pointer-events-none"
             variants={{
               hover: {
                 x: ['-200%', '200%'],
                 transition: { repeat: Infinity, duration: 1.5, ease: "linear" }
               },
               initial: { x: '-200%' }
             }}
           />
        </motion.div>

        {/* Thumbnails Carousel */}
        <div className="flex gap-4 md:gap-6 overflow-x-auto pb-8 snap-x">
          {currentCategory.projects.map((p) => (
            <div 
              key={p.id} 
              onClick={() => setActiveVideo(p.id)}
              className={`min-w-[260px] md:min-w-[400px] aspect-video bg-black border ${activeVideo === p.id ? 'border-white' : 'border-nier-dark'} rounded-none snap-center relative overflow-hidden group cursor-pointer p-1 transition-colors`}
            >
              <div className="absolute inset-1">
                <Image 
                  src={`https://img.youtube.com/vi/${p.id}/hqdefault.jpg`}
                  alt={p.title} 
                  fill 
                  className={`object-cover transition-all duration-500 ${activeVideo === p.id ? 'grayscale-0 opacity-100' : 'opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-100'}`}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 border border-nier-dark/50 pointer-events-none"></div>
              </div>
              <div className={`absolute bottom-2 left-2 ${activeVideo === p.id ? 'bg-white text-black' : 'bg-nier-dark/80 text-nier-light'} font-mono text-[10px] px-2 py-1 tracking-widest border border-nier-dark transition-colors`}>
                [ {p.title.toUpperCase()} ]
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
