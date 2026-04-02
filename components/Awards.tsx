"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Trophy, Medal, Star, Award, ShieldCheck } from 'lucide-react';
import { useGlitch } from './GlitchContext';
import { useLanguage } from './LanguageContext';

const awards = [
  {
    year: '2025',
    items: [
      { titleKey: 'awards.best_editing', context: 'DERPICON', icon: Trophy },
      { titleKey: 'awards.judges_choice', context: 'ANIREVO', icon: Star },
    ]
  },
  {
    year: '2024',
    items: [
      { titleKey: 'awards.1st_place', context: 'ROYAL GRINDIS AMV CONTEST', icon: Medal },
      { titleKey: 'awards.most_impactful', context: 'ANIREVO', icon: Star },
      { titleKey: 'awards.1st_place_exclusive', context: 'ANIME FESTIVAL KASSEL', icon: Trophy },
      { titleKey: 'awards.1st_place_open', context: 'ANIME FESTIVAL KASSEL', icon: Award },
    ]
  },
  {
    year: '2023',
    items: [
      { titleKey: 'awards.judges_choice', context: 'ANIREVO', icon: Star },
      { titleKey: 'awards.1st_place', context: 'ANIME MESSE BABELSBERG', icon: Medal },
      { titleKey: 'awards.1st_place', context: 'ANIME TORONTO', icon: Trophy },
    ]
  }
];

export default function Awards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { trackSection, reportUserAction, foundSpecialSecret } = useGlitch();
  const { t } = useLanguage();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "start 20%"]
  });

  return (
    <motion.section 
      id="awards" 
      ref={containerRef} 
      className="bg-nier-beige py-24 relative overflow-hidden"
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

      {/* Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-0" style={{ backgroundImage: 'linear-gradient(var(--color-nier-dark) 1px, transparent 1px), linear-gradient(90deg, var(--color-nier-dark) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="text-center mb-20 relative z-10">
        <div className="inline-block relative">
           <h2 className="font-akira text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase text-nier-dark cursor-pointer" onClick={foundSpecialSecret}>
             {t('awards.title')}
           </h2>
           <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-full max-w-[200px] h-[1px] bg-nier-dark opacity-50"></div>
           <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-[3px] bg-nier-red"></div>
        </div>
        <div className="mt-8 flex items-center justify-center gap-3">
          <div className="w-2 h-2 bg-nier-red animate-pulse" />
          <span className="font-mono text-xs tracking-[0.3em] text-nier-dark uppercase">{t('awards.achievement_loaded')}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {awards.map((group, yearIdx) => (
          <div key={yearIdx} className="mb-24 last:mb-0">
            {/* Year Header */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-6 mb-10"
            >
              <h3 className="font-akira text-5xl md:text-7xl text-nier-dark opacity-20 tracking-tighter">{group.year}</h3>
              <div className="h-[1px] flex-1 bg-nier-dark/20 relative">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 border border-nier-red bg-nier-beige" />
              </div>
            </motion.div>

            {/* Awards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {group.items.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="group relative bg-nier-light border border-nier-dark p-6 md:p-8 hover:bg-nier-dark hover:text-nier-light transition-all duration-300 overflow-hidden cursor-default shadow-sm"
                  >
                    {/* Hover Scanline */}
                    <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(255,255,255,0.05)_50%)] bg-[length:100%_4px] opacity-0 group-hover:opacity-100 pointer-events-none z-0" />
                    
                    <div className="relative z-10 flex items-start justify-between">
                      <div className="space-y-6">
                        <div className="flex items-center gap-3">
                          <Icon className="w-6 h-6 text-nier-red group-hover:text-nier-light transition-colors" />
                          <span className="font-mono text-xs tracking-[0.2em] opacity-60 uppercase">{t('awards.record')}_{group.year}_{i+1}</span>
                        </div>
                        <div>
                          <h4 className="font-akira text-xl md:text-2xl mb-3 tracking-wide leading-tight">{t(item.titleKey)}</h4>
                          <p className="font-mono text-sm tracking-widest uppercase opacity-80 text-nier-red group-hover:text-nier-light transition-colors">{item.context}</p>
                        </div>
                      </div>
                      
                      {/* Verification Stamp */}
                      <div className="absolute -right-8 -bottom-8 opacity-5 group-hover:opacity-20 transition-opacity duration-500 rotate-[-15deg] pointer-events-none">
                        <ShieldCheck className="w-40 h-40" />
                      </div>
                    </div>

                    {/* Decorative Corners */}
                    <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-nier-red opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-nier-red opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
