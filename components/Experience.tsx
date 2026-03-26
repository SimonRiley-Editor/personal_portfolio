'use client';

import React, { useState } from 'react';
import { Plus, Minus, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useGlitch } from './GlitchContext';

const experiences = [
  {
    period: 'Current',
    company: 'Ethin',
    role: 'Designer and Editor',
    location: 'Remote',
    details: [
      'High-Impact Thumbnails Creating clickable, high-fidelity art using advanced lighting and composition techniques.',
      'Acted as a dedicated creative partner, providing rapid-response support for all production needs.',
      'Leveraged technical proficiency to manage multi-disciplinary tasks from Photoshop compositions to creating Videos for chanel without compromising quality.'
    ]
  },
  {
    period: 'Current',
    company: 'Glaivekiyo',
    role: 'Lead Editor',
    location: 'Remote',
    details: [
      'Revolutionized channel visual identity, evolving standard formats into high-engagement narratives through creative pacing.',
      'Mastered "Retention Editing," utilizing rhythmic cutting and subtle motion cues to maximize viewer immersion.',
      'Standardized high-fidelity workflows, delivering professional-grade visual quality that redefined the channel’s production value.',
      'Redefined creative direction, shifting the video-making style to prioritize a professional, high-impact aesthetic.'
    ]
  },
  {
    period: 'Current',
    company: 'Braxophone',
    role: 'Editor',
    location: 'Remote',
    details: [
      'Executed high-precision post-production, managing granular feedback loops to ensure every frame met elite-level quality standards.',
      'Mastered rigorous quality assurance, delivering frame-perfect revisions through extended production cycles without compromising project integrity.',
      'Maintained 100% project completion rates, demonstrating extreme reliability and dedication to meeting complex, high-pressure deadlines.'
    ]
  },
  {
    period: 'Current',
    company: 'Saintontas',
    role: 'Motion Designer , Editor',
    location: 'Remote',
    details: [
      'Developed unique A-roll graphics to transform complex data into high-retention motion assets.',
      'Engineered bespoke "Intro Edits" for character guides, creating distinct visual identities through high-impact sync.',
      'Integrated advanced VFX and masking to elevate standard tutorials into cinematic experiences.',
      'Leveraged 6 years of expertise in competitive AMV production to deliver professional-grade sound design and "flow."'
    ]
  },
  {
    period: '2024–2025',
    company: 'MrPokke',
    role: 'Video Editor',
    location: 'Remote',
    details: [
      'Curated high-engagement video content, synthesizing raw stream archives into polished, high-quality narratives for the main channel.',
      'Mastered audience retention techniques, identifying and isolating "must-watch" moments to drive consistent viewer growth.',
      'Maintained peak visual consistency, ensuring each upload aligned with the channel\'s high standards for pacing and clarity.'
    ]
  },
  {
    period: '2024-2025',
    company: 'VillainArc$',
    role: 'Editor',
    location: 'Remote',
    details: [
      'Produced high-impact, stylized Anime Edits for a specialized crypto agency, blending high-energy visual aesthetics with corporate messaging to capture a modern, digital-native audience.',
      'Mastered rapid-turnaround workflows for high-volume video series, ensuring professional-grade visual quality while meeting the fast-paced demands of the crypto industry.'
    ]
  }
];

export default function Experience() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const [isHoveringLog, setIsHoveringLog] = useState(false);
  const { trackSection, reportUserAction } = useGlitch();

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

      <motion.div 
        className="max-w-7xl mx-auto px-4 py-20 relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-20%" }}
        onViewportEnter={() => {
          trackSection('Experience');
          reportUserAction('is analyzing the employment history');
        }}
      >
        <div className="flex flex-col lg:flex-row gap-12 items-start relative">
          
          {/* Left Column: Sticky System Data Block */}
          <div className="lg:w-1/3 lg:sticky lg:top-32 z-20 w-full">
            <div 
              className="nier-box p-6 md:p-8 relative bg-nier-light overflow-hidden group"
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
                <div className="flex items-center gap-2 mb-6 border-b border-nier-dark/30 pb-2">
                  <Terminal size={16} className="text-nier-red" />
                  <span className="font-mono text-xs tracking-widest text-nier-dark uppercase">Personal_Data_Log</span>
                </div>
                
                <div className="space-y-4">
                  <p className="text-sm md:text-base font-mono text-nier-dark leading-relaxed transition-all duration-300 group-hover:font-bold">
                    &gt; I’ve spent the last 6 years mastering the art of the edit. My background in the competitive AMV scene taught me the importance of frame-perfect timing my work with top-tier creators taught me how to engage an audience.
                  </p>
                  <p className="text-sm md:text-base font-mono text-nier-dark/80 leading-relaxed transition-all duration-300 group-hover:text-nier-dark group-hover:font-bold">
                    &gt; I don&apos;t just put clips together, I build an experience. With 6 years of experience, I’ve transitioned from winning anime editing contests to providing high-level video solutions for creators like Braxaphone and Saintontas.
                  </p>
                  <p className="text-sm md:text-base font-mono text-nier-dark/80 leading-relaxed transition-all duration-300 group-hover:text-nier-dark group-hover:font-bold">
                    &gt; Currently, I’m bridging the gap between traditional editing and motion design, ensuring your project isn&apos;t just watched, but felt.
                  </p>
                </div>
                
                <div className="mt-8 flex justify-between items-center border-t border-nier-dark/20 pt-4">
                  <div className="flex gap-1">
                    <div className="w-1 h-4 bg-nier-dark/40 animate-pulse"></div>
                    <div className="w-1 h-4 bg-nier-dark/40 animate-pulse" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-1 h-4 bg-nier-dark/40 animate-pulse" style={{ animationDelay: '300ms' }}></div>
                  </div>
                  <span className="font-mono text-[10px] text-nier-dark/50 tracking-widest">[ END OF LOG ]</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Timeline Accordion */}
          <div className="lg:w-2/3 w-full flex flex-col gap-6 relative">
            {/* Vertical Timeline Line */}
            <div className="absolute left-[28px] top-8 bottom-8 w-[1px] bg-nier-dark/30 hidden md:block"></div>

            {experiences.map((exp, index) => (
              <motion.div 
                key={index} 
                className="relative pl-0 md:pl-20 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Timeline Node */}
                <div className={`absolute left-[24px] top-8 w-[9px] h-[9px] border-2 hidden md:block transition-colors duration-300 z-10 ${
                  expandedIndex === index ? 'bg-nier-red border-nier-red' : 'bg-nier-light border-nier-dark group-hover:border-nier-red'
                }`}></div>
                
                {/* Experience Card */}
                <div className={`border border-nier-dark transition-all duration-300 ${
                  expandedIndex === index 
                    ? 'bg-nier-gray shadow-[8px_8px_0px_0px_var(--color-nier-red)] -translate-y-1 -translate-x-1' 
                    : 'bg-nier-light hover:shadow-[8px_8px_0px_0px_var(--color-nier-dark)] hover:-translate-y-1 hover:-translate-x-1'
                }`}>
                  <button 
                    onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                    className="w-full flex flex-col md:flex-row items-start md:items-center justify-between p-6 text-left"
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8 w-full">
                      <div className="flex flex-col w-full md:w-48">
                        <span className={`font-mono text-sm tracking-widest mb-1 ${expandedIndex === index ? 'text-nier-light/60' : 'text-nier-dark/60'}`}>[{exp.period}]</span>
                        <span className={`text-xl font-mono uppercase font-bold ${expandedIndex === index ? 'text-nier-light' : 'text-nier-dark'}`}>{exp.company}</span>
                      </div>
                      <div className="flex flex-col w-full md:w-64">
                        <span className={`text-sm font-mono uppercase ${expandedIndex === index ? 'text-nier-light/90' : 'text-nier-dark/90'}`}>{exp.role}</span>
                        <span className={`text-xs font-mono uppercase mt-1 ${expandedIndex === index ? 'text-nier-light/50' : 'text-nier-dark/50'}`}>{exp.location}</span>
                      </div>
                    </div>
                    <div className={`mt-4 md:mt-0 p-2 border ${
                      expandedIndex === index 
                        ? 'border-nier-light/30 text-nier-light bg-nier-light/10' 
                        : 'border-nier-dark/30 text-nier-dark bg-nier-dark/5 group-hover:bg-nier-dark/10'
                    }`}>
                      <motion.div
                        animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        {expandedIndex === index ? <Minus size={18} strokeWidth={2} /> : <Plus size={18} strokeWidth={2} />}
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
                        className="overflow-hidden border-t border-nier-light/10"
                      >
                        <div className="p-6 bg-nier-gray/95">
                          <ul className="space-y-4">
                            {exp.details.map((detail, i) => (
                              <motion.li 
                                key={i} 
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 + (i * 0.05) }}
                                className="text-sm font-mono text-nier-light/80 flex items-start gap-3"
                              >
                                <span className="text-nier-red mt-0.5 select-none">&gt;</span>
                                <span className="leading-relaxed">{detail}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
