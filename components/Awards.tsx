"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const awards = [
  {
    year: '2023',
    items: [
      { title: 'Webby Award Winner', context: 'Best Editing - Documentary' },
      { title: 'Vimeo Staff Pick', context: 'Short Film "Neon Nights"' },
    ]
  },
  {
    year: '2021',
    items: [
      { title: 'Emmy Nomination', context: 'Outstanding Picture Editing' },
      { title: 'SXSW Film Festival', context: 'Official Selection' },
    ]
  }
];

export default function Awards() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "start 20%"]
  });

  const glassesY = useTransform(scrollYProgress, [0.4, 1], [0, -40]);
  const glassesX = useTransform(scrollYProgress, [0.4, 1], [0, 30]);
  const glassesRotate = useTransform(scrollYProgress, [0.4, 1], [0, 45]);

  return (
    <section id="awards" ref={containerRef} className="bg-[#d977ff] border-b-4 border-black py-20 relative overflow-hidden">
      {/* Animated Background Rays */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[200vw] md:w-[100vw] md:h-[100vw] opacity-20 pointer-events-none z-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        style={{
          background: 'conic-gradient(from 0deg, transparent 0deg 15deg, black 15deg 30deg, transparent 30deg 45deg, black 45deg 60deg, transparent 60deg 75deg, black 75deg 90deg, transparent 90deg 105deg, black 105deg 120deg, transparent 120deg 135deg, black 135deg 150deg, transparent 150deg 165deg, black 165deg 180deg, transparent 180deg 195deg, black 195deg 210deg, transparent 210deg 225deg, black 225deg 240deg, transparent 240deg 255deg, black 255deg 270deg, transparent 270deg 285deg, black 285deg 300deg, transparent 300deg 315deg, black 315deg 330deg, transparent 330deg 345deg, black 345deg 360deg)'
        }}
      />

      {/* Decorative background elements */}
      <motion.div 
        animate={{ y: [0, -20, 0], rotate: [12, 24, 12] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-10 w-8 h-8 bg-[#69f0ae] border-2 border-black z-10"
      ></motion.div>
      <motion.div 
        animate={{ y: [0, 20, 0], rotate: [-12, -24, -12] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-20 right-20 w-6 h-6 bg-[#ffda59] border-2 border-black z-10"
      ></motion.div>
      <motion.div 
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 right-10 w-10 h-10 bg-white border-2 border-black rounded-full z-10"
      ></motion.div>

      <div className="text-center mb-16 relative z-10">
        <div className="inline-block relative">
           <div className="absolute -top-8 -left-8 md:-top-12 md:-left-12 w-16 h-16 md:w-24 md:h-24 bg-[#ffda59] border-4 border-black rounded-full flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
             <span className="text-3xl md:text-5xl absolute">😏</span>
             <motion.span 
               className="text-3xl md:text-5xl absolute origin-bottom-right"
               style={{ y: glassesY, x: glassesX, rotate: glassesRotate }}
             >
               🕶️
             </motion.span>
           </div>
           <h2 className="font-display text-5xl md:text-9xl font-black tracking-tighter uppercase">
             AWARDS
           </h2>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        {awards.map((group, idx) => (
          <div key={idx} className="relative mb-12">
            {/* Year Badge */}
            <div className="absolute -left-2 md:-left-12 top-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 bg-[#69f0ae] border-4 border-black rounded-full flex items-center justify-center font-display font-black text-lg md:text-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-20">
              {group.year}
            </div>
            
            {/* Award Card */}
            <div className="bg-white border-4 border-black rounded-3xl p-6 md:p-8 md:pl-16 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ml-6 md:ml-0">
              {group.items.map((item, i) => (
                <div key={i} className="flex flex-col md:flex-row md:items-center justify-between py-4 border-b-2 border-black last:border-b-0">
                  <span className="text-xl md:text-2xl font-medium">{item.title}</span>
                  <span className="text-gray-600 font-medium mt-1 md:mt-0">{item.context}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
