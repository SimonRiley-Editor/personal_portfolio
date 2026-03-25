'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import Awards from './Awards';
import Work from './Work';

export default function AwardsWorkTransition() {
  const transitionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: transitionRef,
    offset: ["start start", "end start"]
  });

  // Shorter, snappier animations. 
  // The transition block is 200vh, and Work is pulled up by 100vh.
  // This means the user only scrolls 100vh to get through the transition.
  // 100vh / 200vh = 0.5. So the transition happens between 0 and 0.5 progress.
  
  const bgColor = useTransform(scrollYProgress, [0, 0.1], ["#E4E3E0", "#050505"]);
  const textColor = useTransform(scrollYProgress, [0, 0.1], ["#050505", "#E4E3E0"]);
  
  // Zoom in aggressively and fade out
  const scale = useTransform(scrollYProgress, [0.05, 0.4], [1, 25]);
  const opacity = useTransform(scrollYProgress, [0.2, 0.4], [1, 0]);
  const blur = useTransform(scrollYProgress, [0.2, 0.4], ["blur(0px)", "blur(12px)"]);
  const textY = useTransform(scrollYProgress, [0, 0.4], [0, -50]);
  
  // Glitch effects (skew and x-translation)
  const glitchOpacity = useTransform(scrollYProgress, [0.15, 0.25, 0.35], [0, 0.8, 0]);
  const skewX = useTransform(scrollYProgress, [0.2, 0.25, 0.3, 0.35], [0, -10, 10, 0]);
  const x = useTransform(scrollYProgress, [0.2, 0.25, 0.3, 0.35], [0, -15, 15, 0]);

  // Parallax for background grid
  const gridY = useTransform(scrollYProgress, [0, 0.5], [0, -150]);

  return (
    <div className="relative z-20">
      {/* Awards Section */}
      <div className="relative z-30 bg-nier-beige">
        <Awards />
      </div>

      {/* Cinematic Scroll Transition */}
      <div ref={transitionRef} className="h-[200vh] relative z-20">
        <motion.div 
          className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-center"
          style={{ backgroundColor: bgColor }}
        >
          {/* Background grid parallax */}
          <motion.div 
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{ 
              backgroundImage: 'linear-gradient(var(--color-nier-light) 1px, transparent 1px), linear-gradient(90deg, var(--color-nier-light) 1px, transparent 1px)', 
              backgroundSize: '40px 40px',
              y: gridY
            }} 
          />

          {/* Zooming Text Effect */}
          <motion.div 
            className="relative z-10 flex flex-col items-center"
            style={{ scale, opacity, y: textY, filter: blur, skewX, x }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-3 h-3 bg-nier-red animate-pulse" />
              <motion.span 
                className="font-mono text-sm tracking-[0.5em] uppercase"
                style={{ color: textColor }}
              >
                System_Transition
              </motion.span>
            </div>
            <motion.h2 
              className="font-akira text-5xl md:text-8xl lg:text-9xl tracking-tighter text-center mix-blend-difference"
              style={{ color: textColor }}
            >
              ACCESSING
              <br />
              <span className="text-nier-red">ARCHIVES</span>
            </motion.h2>
          </motion.div>

          {/* Glitch Overlay */}
          <motion.div 
            className="absolute inset-0 pointer-events-none bg-nier-red mix-blend-overlay"
            style={{ opacity: glitchOpacity }}
          />
          
          {/* Scanlines */}
          <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none z-50" />
        </motion.div>
      </div>

      {/* Work Section - Slides up over the transition */}
      <div className="relative z-30 bg-nier-gray -mt-[100vh] shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        <Work />
      </div>
    </div>
  );
}
