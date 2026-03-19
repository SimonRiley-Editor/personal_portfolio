'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const experiences = [
  {
    period: 'Current',
    company: 'Netflix',
    role: 'Senior Video Editor',
    location: 'Remote',
    details: [
      'Lead editor for original documentary series.',
      'Collaborate with directors and producers to shape narratives.',
      'Manage a team of assistant editors and colorists.'
    ]
  },
  {
    period: '2020—2023',
    company: 'HBO Max',
    role: 'Motion Designer',
    location: 'Los Angeles, CA',
    details: [
      'Created promotional motion graphics for social media.',
      'Designed title sequences for original shows.'
    ]
  },
  {
    period: '2017—2020',
    company: 'Vice Media',
    role: 'Video Editor',
    location: 'New York, NY',
    details: [
      'Edited short-form documentaries for YouTube.',
      'Handled color grading and sound mixing.'
    ]
  }
];

export default function Experience() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <section id="experience" className="bg-[#69f0ae] border-b-4 border-black relative overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{ 
        backgroundImage: 'linear-gradient(black 2px, transparent 2px), linear-gradient(90deg, black 2px, transparent 2px)',
        backgroundSize: '40px 40px'
      }}>
        <motion.div 
          className="w-full h-full"
          animate={{ backgroundPosition: ['0px 0px', '40px 40px'] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          style={{ 
            backgroundImage: 'linear-gradient(black 2px, transparent 2px), linear-gradient(90deg, black 2px, transparent 2px)',
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="border-b-4 border-black py-6 md:py-10 overflow-hidden bg-white flex group relative z-10">
        <div className="animate-marquee flex items-center w-max group-hover:[animation-play-state:paused]">
          {[...Array(8)].map((_, i) => (
            <React.Fragment key={i}>
              <span 
                className="font-wide text-5xl md:text-[10rem] leading-none uppercase mx-4 md:mx-8 text-transparent hover:text-[#69f0ae] transition-all duration-300 cursor-default hover:scale-110 hover:rotate-3 inline-block" 
                style={{ WebkitTextStroke: '3px black' }}
              >
                EXPERIENCE
              </span>
              <span 
                className="font-wide text-5xl md:text-[10rem] leading-none uppercase mx-4 md:mx-8 text-black hover:text-[#d977ff] transition-all duration-300 cursor-default hover:scale-110 hover:-rotate-3 inline-block"
              >
                EXPERIENCE
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-20 relative z-10">
        <div className="flex flex-col md:flex-row gap-12 items-start mb-20 relative">
          {/* Avatar Wrapper (Peer & Group) */}
          <div className="relative w-48 h-48 md:w-64 md:h-64 flex-shrink-0 peer cursor-pointer group z-20 mx-auto md:mx-0">
            
            {/* Extending Arm (Hidden until hover) */}
            <div className="absolute top-[55%] left-[70%] flex items-center z-10">
               <div className="h-8 bg-orange-500 border-y-4 border-black w-0 group-hover:w-20 md:group-hover:w-24 transition-all duration-300 ease-out"></div>
               <div className="w-10 h-10 bg-[#ffb74d] border-4 border-black rounded-full -ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100"></div>
            </div>

            {/* Avatar Circle */}
            <div className="w-full h-full rounded-full border-4 border-black bg-[#ffda59] overflow-hidden relative shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-20">
               <div className="absolute inset-0 animate-float flex flex-col items-center justify-end">
                 {/* Hair Back */}
                 <div className="absolute top-4 w-44 h-44 bg-black rounded-full"></div>
                 <div className="absolute top-2 -left-2 w-16 h-16 bg-black rotate-45"></div>
                 <div className="absolute top-2 -right-2 w-16 h-16 bg-black rotate-45"></div>
                 <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-20 h-20 bg-black rotate-45"></div>

                 {/* Body/Jacket */}
                 <div className="w-48 h-24 bg-orange-500 border-4 border-black rounded-t-[3rem] relative z-10 flex justify-center">
                    <div className="w-1 h-full bg-black"></div>
                 </div>

                 {/* Head */}
                 <div className="absolute top-14 w-32 h-36 bg-[#ffb74d] border-4 border-black rounded-b-[50px] rounded-t-[40px] z-20 flex flex-col items-center overflow-hidden">
                    {/* Headband */}
                    <div className="w-full h-10 bg-blue-600 border-b-4 border-black flex items-center justify-center">
                       <div className="w-12 h-6 bg-gray-300 border-2 border-black rounded-sm flex items-center justify-center gap-1">
                          <div className="w-1 h-1 bg-black rounded-full"></div>
                          <div className="w-1 h-1 bg-black rounded-full"></div>
                          <div className="w-1 h-1 bg-black rounded-full"></div>
                       </div>
                    </div>
                    
                    {/* Eyes */}
                    <div className="flex gap-2 mt-4">
                       <div className="w-10 h-12 bg-white border-4 border-black rounded-full relative overflow-hidden animate-blink origin-center">
                          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-6 h-7 bg-blue-500 border-2 border-black rounded-full">
                             <div className="absolute top-1 left-1 w-2 h-2 bg-white rounded-full"></div>
                             <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-black rounded-full"></div>
                          </div>
                       </div>
                       <div className="w-10 h-12 bg-white border-4 border-black rounded-full relative overflow-hidden animate-blink origin-center">
                          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-6 h-7 bg-blue-500 border-2 border-black rounded-full">
                             <div className="absolute top-1 left-1 w-2 h-2 bg-white rounded-full"></div>
                             <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-black rounded-full"></div>
                          </div>
                       </div>
                    </div>

                    {/* Mouth */}
                    <div className="mt-2 w-8 h-4 bg-white border-4 border-black rounded-b-full"></div>
                    
                    {/* Cheek marks */}
                    <div className="absolute top-16 left-1 w-4 h-1 bg-black rotate-12"></div>
                    <div className="absolute top-20 left-1 w-4 h-1 bg-black rotate-12"></div>
                    <div className="absolute top-16 right-1 w-4 h-1 bg-black -rotate-12"></div>
                    <div className="absolute top-20 right-1 w-4 h-1 bg-black -rotate-12"></div>
                 </div>
                 
                 {/* Hair Front Bangs */}
                 <div className="absolute top-10 z-30 flex gap-1">
                    <div className="w-8 h-12 bg-black rounded-br-full rotate-12"></div>
                    <div className="w-10 h-14 bg-black rounded-b-full"></div>
                    <div className="w-8 h-12 bg-black rounded-bl-full -rotate-12"></div>
                 </div>
               </div>
            </div>
          </div>

          {/* Speech Bubble (Reacts to Peer Hover) */}
          <div className="bg-white peer-hover:bg-[#ff80ab] peer-hover:scale-105 peer-hover:-rotate-2 peer-hover:rounded-none border-4 border-black rounded-3xl p-6 md:p-8 relative shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] peer-hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] flex-1 z-10 transition-all duration-300">
            
            {/* Impact Star (Appears on touch) */}
            <div className="absolute top-1/2 -left-10 -translate-y-1/2 w-20 h-20 opacity-0 peer-hover:opacity-100 transition-opacity duration-300 delay-150 z-50 pointer-events-none hidden md:block">
               <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-slow">
                  <polygon points="50,0 60,35 100,35 65,55 80,100 50,70 20,100 35,55 0,35 40,35" fill="#ffda59" stroke="black" strokeWidth="4" />
               </svg>
            </div>

            {/* Pointer */}
            <div className="absolute top-1/2 -left-4 w-8 h-8 bg-white peer-hover:bg-[#ff80ab] border-l-4 border-b-4 border-black transform rotate-45 -translate-y-1/2 hidden md:block transition-all duration-300 peer-hover:rounded-none"></div>
            
            <p className="text-xl font-medium mb-4 transition-colors duration-300">
              I have spent the last 6 years mastering the art of the edit. My background in the competitive AMV scene taught me the importance of frame-perfect timing
            </p>
            <p className="text-lg text-gray-700 peer-hover:text-black mb-4 transition-colors duration-300">
              I don&apos;t just cut clips together; I craft stories, build pacing, and create emotional resonance through visual rhythm.
            </p>
            <p className="text-lg text-gray-700 peer-hover:text-black transition-colors duration-300">
              I have experience across a variety of formats, from feature-length documentaries to punchy social media promos. I lead post-production teams with a focus on collaboration and creative excellence.
            </p>
          </div>
        </div>

        {/* Accordion */}
        <div className="border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          {experiences.map((exp, index) => (
            <div key={index} className="border-b-4 border-black last:border-b-0">
              <button 
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                className={`w-full flex flex-col md:flex-row items-start md:items-center justify-between p-6 transition-colors text-left ${
                  expandedIndex === index ? 'bg-[#ffda59]' : 'bg-white hover:bg-gray-50'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12 w-full">
                  <span className="font-display text-2xl md:text-3xl font-black w-full md:w-48">{exp.period}</span>
                  <span className="text-xl md:text-2xl font-medium w-full md:w-48">{exp.company}</span>
                  <span className="text-lg md:text-xl text-gray-600 w-full md:w-64">{exp.role}</span>
                  <span className="text-base md:text-lg text-gray-500 hidden lg:block">{exp.location}</span>
                </div>
                <div className="mt-4 md:mt-0">
                  <motion.div
                    animate={{ rotate: expandedIndex === index ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <Plus size={32} strokeWidth={3} />
                  </motion.div>
                </div>
              </button>
              
              <AnimatePresence initial={false}>
                {expandedIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden bg-[#ffda59]"
                  >
                    <div className="p-6 pt-0">
                      <ul className="list-disc list-inside space-y-2">
                        {exp.details.map((detail, i) => (
                          <li key={i} className="text-lg font-medium">{detail}</li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
