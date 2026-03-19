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
    <section id="work" className="bg-nier-gray border-b border-nier-dark pb-20 relative overflow-hidden">
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
        {/* Main Video Player Placeholder */}
        <motion.div 
          className="aspect-video bg-black border border-nier-dark rounded-none mb-12 relative group cursor-pointer overflow-hidden p-1"
          whileHover="hover"
          initial="initial"
        >
           {/* Background Image for the video */}
           <div className="absolute inset-1 opacity-40 bg-[url('https://picsum.photos/seed/mainedit/1920/1080')] bg-cover bg-center mix-blend-luminosity grayscale group-hover:grayscale-0 transition-all duration-700"></div>

           {/* Shimmer/Pulse Effect */}
           <motion.div 
             className="absolute inset-1 bg-gradient-to-r from-transparent via-nier-light/10 to-transparent skew-x-12"
             variants={{
               hover: {
                 x: ['-200%', '200%'],
                 transition: { repeat: Infinity, duration: 1.5, ease: "linear" }
               },
               initial: { x: '-200%' }
             }}
           />
           
           <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                className="w-16 h-16 border border-nier-dark flex items-center justify-center bg-nier-light/10 backdrop-blur-sm rounded-none"
                variants={{
                  initial: { scale: 0.8, opacity: 0, y: 20 },
                  hover: { scale: 1, opacity: 1, y: 0 }
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-nier-light border-b-[10px] border-b-transparent ml-1"></div>
              </motion.div>
           </div>
           
           {/* Fake player controls */}
           <motion.div 
             className="absolute bottom-1 left-1 right-1 p-4 md:p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-center gap-4 border-t border-nier-dark/30"
             variants={{
               initial: { y: 20, opacity: 0 },
               hover: { y: 0, opacity: 1 }
             }}
             transition={{ type: "spring", stiffness: 300, damping: 25 }}
           >
              <div className="w-2 h-2 bg-nier-red rounded-none shadow-[0_0_10px_rgba(139,0,0,0.8)]"></div>
              <div className="h-[2px] bg-nier-dark flex-1 rounded-none overflow-hidden relative">
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-nier-red shadow-[0_0_10px_#8b0000]"
                  variants={{
                    initial: { width: "0%" },
                    hover: { width: "100%", transition: { duration: 15, ease: "linear" } }
                  }}
                ></motion.div>
              </div>
              <div className="text-nier-light font-mono text-xs md:text-sm font-bold tracking-widest">00:00 / 01:12</div>
           </motion.div>
        </motion.div>

        {/* Thumbnails Carousel */}
        <div className="flex gap-4 md:gap-6 overflow-x-auto pb-8 snap-x">
          {projects.map((p) => (
            <div key={p.id} className="min-w-[260px] md:min-w-[400px] aspect-video bg-black border border-nier-dark rounded-none snap-center relative overflow-hidden group cursor-pointer p-1">
              <div className="absolute inset-1">
                <Image 
                  src={p.img} 
                  alt={p.title} 
                  fill 
                  className="object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 border border-nier-dark/50 pointer-events-none"></div>
              </div>
              <div className="absolute bottom-2 left-2 bg-nier-dark/80 text-nier-light font-mono text-[10px] px-2 py-1 tracking-widest border border-nier-dark">
                [ {p.title.toUpperCase()} ]
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
