"use client";

import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useGlitch } from './GlitchContext';

const awards = [
  {
    year: '2025',
    items: [
      { title: 'BEST EDITING', context: 'DERPICON' },
      { title: 'JUDGES CHOICE', context: 'ANIREVO' },
    ]
  },
  {
    year: '2024',
    items: [
      { title: '1ST PLACE', context: 'ROYAL GRINDIS AMV CONTEST' },
      { title: 'PEOPLE\'S CHOICE', context: 'ANIREVO' },
      { title: '1ST PLACE (EXCLUSIVE)', context: 'ANIME FESTIVAL KASSEL' },
      { title: '1ST PLACE (OPEN)', context: 'ANIME FESTIVAL KASSEL' },
    ]
  },
  {
    year: '2023',
    items: [
      { title: 'JUDGES CHOICE', context: 'ANIREVO' },
      { title: '1ST PLACE', context: 'ANIME MESSE BABELSBERG' },
      { title: '1ST PLACE', context: 'ANIME TORONTO' },
    ]
  }
];

export default function Awards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { trackSection, reportUserAction } = useGlitch();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "start 20%"]
  });

  const glassesY = useTransform(scrollYProgress, [0.4, 1], [0, -40]);
  const glassesX = useTransform(scrollYProgress, [0.4, 1], [0, 30]);
  const glassesRotate = useTransform(scrollYProgress, [0.4, 1], [0, 45]);

  return (
    <motion.section 
      id="awards" 
      ref={containerRef} 
      className="bg-nier-beige border-b border-nier-dark py-20 relative overflow-hidden"
      onViewportEnter={() => {
        trackSection('Awards');
        reportUserAction('is analyzing the achievement records');
      }}
      viewport={{ once: true, margin: "-20%" }}
    >
      {/* Animated Background Rays */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[200vw] md:w-[100vw] md:h-[100vw] opacity-[0.03] pointer-events-none z-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        style={{
          background: 'conic-gradient(from 0deg, transparent 0deg 15deg, var(--color-nier-dark) 15deg 30deg, transparent 30deg 45deg, var(--color-nier-dark) 45deg 60deg, transparent 60deg 75deg, var(--color-nier-dark) 75deg 90deg, transparent 90deg 105deg, var(--color-nier-dark) 105deg 120deg, transparent 120deg 135deg, var(--color-nier-dark) 135deg 150deg, transparent 150deg 165deg, var(--color-nier-dark) 165deg 180deg, transparent 180deg 195deg, var(--color-nier-dark) 195deg 210deg, transparent 210deg 225deg, var(--color-nier-dark) 225deg 240deg, transparent 240deg 255deg, var(--color-nier-dark) 255deg 270deg, transparent 270deg 285deg, var(--color-nier-dark) 285deg 300deg, transparent 300deg 315deg, var(--color-nier-dark) 315deg 330deg, transparent 330deg 345deg, var(--color-nier-dark) 345deg 360deg)'
        }}
      />

      {/* Decorative background elements */}
      <motion.div 
        animate={{ y: [0, -10, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-10 w-8 h-8 border border-nier-dark z-10"
      ></motion.div>
      <motion.div 
        animate={{ y: [0, 10, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-20 right-20 w-6 h-6 border border-nier-dark z-10"
      ></motion.div>
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 right-10 w-10 h-10 border border-nier-dark rounded-full z-10"
      ></motion.div>

      <div className="text-center mb-16 relative z-10">
        <div className="inline-block relative">
           <h2 className="font-akira text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase text-nier-dark">
             AWARDS
           </h2>
           <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-full max-w-[200px] h-[1px] bg-nier-dark opacity-50"></div>
           <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-[3px] bg-nier-red"></div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        {awards.map((group, idx) => (
          <div key={idx} className="relative mb-12">
            {/* Year Badge */}
            <div className="absolute -left-2 md:-left-12 top-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 bg-nier-light border border-nier-dark flex items-center justify-center font-mono font-bold text-lg md:text-xl text-nier-dark z-20 shadow-sm">
              {group.year}
            </div>
            
            {/* Award Card */}
            <div className="nier-box p-6 md:p-8 md:pl-16 ml-6 md:ml-0">
              {group.items.map((item, i) => (
                <div key={i} className="flex flex-col md:flex-row md:items-center justify-between py-4 border-b border-nier-dark/30 last:border-b-0">
                  <span className="text-xl md:text-2xl font-mono text-nier-dark">{item.title}</span>
                  <span className="text-nier-dark/70 font-mono mt-1 md:mt-0 text-sm tracking-wider uppercase">{item.context}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
