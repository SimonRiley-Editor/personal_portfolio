"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';

const projects = [
  { id: 1, title: 'Project One', img: 'https://picsum.photos/seed/edit1/800/600' },
  { id: 2, title: 'Project Two', img: 'https://picsum.photos/seed/edit2/800/600' },
  { id: 3, title: 'Project Three', img: 'https://picsum.photos/seed/edit3/800/600' },
];

export default function Work() {
  return (
    <section id="work" className="bg-[#111111] border-b-4 border-black pb-20 relative overflow-hidden">
      {/* Animated Background Film Strip */}
      <div className="absolute inset-0 pointer-events-none opacity-5 z-0 flex flex-col justify-between py-10">
        {[...Array(5)].map((_, i) => (
          <motion.div 
            key={i}
            className="w-[200%] h-12 flex gap-4"
            animate={{ x: i % 2 === 0 ? ['0%', '-50%'] : ['-50%', '0%'] }}
            transition={{ duration: 20 + i * 5, repeat: Infinity, ease: "linear" }}
          >
            {[...Array(20)].map((_, j) => (
              <div key={j} className="w-24 h-full border-4 border-white rounded-md flex-shrink-0"></div>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Marquee Tape */}
      <div className="bg-[#ffda59] border-b-4 border-black py-4 transform -rotate-2 scale-110 overflow-hidden whitespace-nowrap mb-20 relative z-10 shadow-[0_4px_0_0_rgba(0,0,0,1)]">
        <div className="flex w-max animate-marquee">
          <h2 className="font-display text-4xl md:text-5xl font-black tracking-tighter uppercase whitespace-pre">
            {"WORK • ".repeat(20)}
          </h2>
          <h2 className="font-display text-4xl md:text-5xl font-black tracking-tighter uppercase whitespace-pre">
            {"WORK • ".repeat(20)}
          </h2>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Main Video Player Placeholder */}
        <div className="aspect-video bg-black border-4 border-white rounded-xl mb-12 relative group cursor-pointer overflow-hidden">
           <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 border-4 border-white flex items-center justify-center group-hover:scale-110 transition-transform">
                <div className="w-0 h-0 border-t-[15px] border-t-transparent border-l-[25px] border-l-white border-b-[15px] border-b-transparent ml-2"></div>
              </div>
           </div>
           {/* Fake player controls */}
           <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent flex items-center gap-4">
              <div className="w-4 h-4 bg-white rounded-full"></div>
              <div className="h-1 bg-white/30 flex-1 rounded-full overflow-hidden">
                <div className="w-1/3 h-full bg-white"></div>
              </div>
              <div className="text-white font-mono text-sm">01:12</div>
           </div>
        </div>

        {/* Thumbnails Carousel */}
        <div className="flex gap-4 md:gap-6 overflow-x-auto pb-8 snap-x">
          {projects.map((p) => (
            <div key={p.id} className="min-w-[260px] md:min-w-[400px] aspect-video bg-gray-800 border-4 border-white rounded-xl snap-center relative overflow-hidden group cursor-pointer">
              <Image 
                src={p.img} 
                alt={p.title} 
                fill 
                className="object-cover opacity-70 group-hover:opacity-100 transition-opacity"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
