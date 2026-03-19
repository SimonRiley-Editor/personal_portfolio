'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = 'hidden';

    const duration = 2000; // 2 seconds loading
    const interval = 20;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newProgress = Math.min(Math.round((currentStep / steps) * 100), 100);
      setProgress(newProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(() => {
            document.body.style.overflow = 'auto';
            onComplete();
          }, 800); // Wait for slide up animation
        }, 400); // Pause at 100%
      }
    }, interval);

    return () => {
      clearInterval(timer);
      document.body.style.overflow = 'auto';
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-12">
            <div className="flex justify-between items-start w-full">
              <span className="font-mono text-sm md:text-base text-gray-400 uppercase tracking-widest">
                System Boot
              </span>
              <span className="font-mono text-sm md:text-base text-gray-400 uppercase tracking-widest">
                Ali Aliyev
              </span>
            </div>
            
            <div className="flex flex-col items-center justify-center flex-1 w-full">
              <div className="relative w-full max-w-4xl flex flex-col items-center">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="font-wide text-[25vw] md:text-[15rem] leading-none text-[#ffda59] tracking-tighter"
                >
                  {progress}%
                </motion.div>
                <div className="font-display text-xl md:text-3xl text-white uppercase tracking-widest mt-4 animate-pulse">
                  Rendering Assets...
                </div>
              </div>
            </div>

            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#69f0ae] transition-all duration-75 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
