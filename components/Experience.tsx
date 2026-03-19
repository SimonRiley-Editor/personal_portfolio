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
  const [isHoveringLog, setIsHoveringLog] = useState(false);

  return (
    <section id="experience" className="bg-nier-beige border-b border-nier-dark relative overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]" style={{ 
        backgroundImage: 'linear-gradient(var(--color-nier-dark) 1px, transparent 1px), linear-gradient(90deg, var(--color-nier-dark) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }}>
        <motion.div 
          className="w-full h-full"
          animate={{ backgroundPosition: ['0px 0px', '40px 40px'] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          style={{ 
            backgroundImage: 'linear-gradient(var(--color-nier-dark) 1px, transparent 1px), linear-gradient(90deg, var(--color-nier-dark) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="border-b border-nier-dark py-6 md:py-10 overflow-hidden bg-nier-light flex group relative z-10">
        <div className="animate-marquee flex items-center w-max group-hover:[animation-play-state:paused]">
          {[...Array(8)].map((_, i) => (
            <React.Fragment key={i}>
              <span 
                className="font-wide text-5xl md:text-[8rem] leading-none uppercase mx-4 md:mx-8 text-transparent hover:text-nier-red transition-all duration-300 cursor-default inline-block glitch-text-sexy" 
                style={{ WebkitTextStroke: '2px var(--color-nier-dark)', textShadow: '4px 4px 0px rgba(0,0,0,0.05)' }}
                data-text="EXPERIENCE"
              >
                EXPERIENCE
              </span>
              <span 
                className="font-wide text-5xl md:text-[8rem] leading-none uppercase mx-4 md:mx-8 text-nier-dark hover:text-nier-gray transition-all duration-300 cursor-default inline-block glitch-text-sexy"
                style={{ textShadow: '4px 4px 0px rgba(0,0,0,0.1)' }}
                data-text="EXPERIENCE"
              >
                EXPERIENCE
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-20 relative z-10">
        <div className="flex flex-col md:flex-row gap-12 items-start mb-20 relative">
          
          {/* System Data Block */}
          <div 
            className="nier-box p-6 md:p-8 relative bg-nier-light flex-1 z-10 overflow-hidden group"
            onMouseEnter={() => setIsHoveringLog(true)}
            onMouseLeave={() => setIsHoveringLog(false)}
          >
            {/* Character Face Hover Animation */}
            <div 
              className={`absolute inset-0 z-0 transition-opacity duration-700 ease-in-out pointer-events-none ${isHoveringLog ? 'opacity-15' : 'opacity-0'}`}
              style={{
                backgroundImage: 'url("https://picsum.photos/seed/nier2b/800/600?grayscale")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                mixBlendMode: 'multiply'
              }}
            >
              <div className="absolute inset-0 bg-nier-red/20 mix-blend-overlay"></div>
            </div>

            <div className="relative z-10">
              <div className="absolute top-0 left-0 w-full h-1 bg-nier-dark"></div>
              <div className="flex items-center gap-2 mb-6 border-b border-nier-dark/30 pb-2">
                <div className="w-2 h-2 bg-nier-red"></div>
                <span className="font-mono text-xs tracking-widest text-nier-dark uppercase">Personal_Data_Log</span>
              </div>
              
              <p className="text-sm md:text-base font-mono text-nier-dark mb-4 leading-relaxed transition-all duration-300 group-hover:font-bold">
                &gt; I’ve spent the last 6 years mastering the art of the edit. My background in the competitive AMV scene taught me the importance of frame-perfect timing my work with top-tier creators taught me how to engage an audience.
              </p>
              <p className="text-sm md:text-base font-mono text-nier-dark/80 mb-4 leading-relaxed transition-all duration-300 group-hover:text-nier-dark group-hover:font-bold">
                &gt; I don&apos;t just put clips together, I build an experience. With 6 years of experience, I’ve transitioned from winning anime editing contests to providing high-level video solutions for creators like Braxaphone and Saintontas.
              </p>
              <p className="text-sm md:text-base font-mono text-nier-dark/80 leading-relaxed transition-all duration-300 group-hover:text-nier-dark group-hover:font-bold">
                &gt; Currently, I’m bridging the gap between traditional editing and motion design, ensuring your project isn&apos;t just watched, but felt.
              </p>
              
              <div className="mt-8 flex justify-end">
                <span className="font-mono text-[10px] text-nier-dark/50 tracking-widest">[ END OF LOG ]</span>
              </div>
            </div>
          </div>
        </div>

        {/* Accordion */}
        <div className="border border-nier-dark bg-nier-light">
          {experiences.map((exp, index) => (
            <div key={index} className="border-b border-nier-dark last:border-b-0">
              <button 
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                className={`w-full flex flex-col md:flex-row items-start md:items-center justify-between p-6 transition-colors text-left ${
                  expandedIndex === index ? 'bg-nier-gray text-nier-light' : 'bg-nier-light hover:bg-nier-beige text-nier-dark'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12 w-full">
                  <span className={`font-mono text-sm md:text-base font-bold w-full md:w-48 tracking-widest ${expandedIndex === index ? 'text-nier-light' : 'text-nier-dark'}`}>[{exp.period}]</span>
                  <span className={`text-lg md:text-xl font-mono w-full md:w-48 uppercase ${expandedIndex === index ? 'text-nier-light' : 'text-nier-dark'}`}>{exp.company}</span>
                  <span className={`text-sm md:text-base font-mono w-full md:w-64 uppercase ${expandedIndex === index ? 'text-nier-light/70' : 'text-nier-dark/70'}`}>{exp.role}</span>
                  <span className={`text-xs md:text-sm font-mono hidden lg:block uppercase ${expandedIndex === index ? 'text-nier-light/50' : 'text-nier-dark/50'}`}>{exp.location}</span>
                </div>
                <div className={`mt-4 md:mt-0 ${expandedIndex === index ? 'text-nier-light' : 'text-nier-dark'}`}>
                  <motion.div
                    animate={{ rotate: expandedIndex === index ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <Plus size={24} strokeWidth={1} />
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
                    className="overflow-hidden bg-nier-gray border-t border-nier-dark/30"
                  >
                    <div className="p-6">
                      <ul className="space-y-3">
                        {exp.details.map((detail, i) => (
                          <li key={i} className="text-sm font-mono text-nier-light/80 flex items-start gap-3">
                            <span className="text-nier-red mt-1">&gt;</span>
                            <span>{detail}</span>
                          </li>
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
