"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Scissors, Play, Video } from 'lucide-react';
import { motion, useMotionValue, useTransform, animate } from 'motion/react';

const shapes = [
  { width: 120, height: 120, left: '10%', top: '20%', y: [0, -30, 0], x: [0, 20, 0], duration: 15, color: '#ffda59' },
  { width: 80, height: 80, left: '80%', top: '15%', y: [0, 40, 0], x: [0, -10, 0], duration: 12, color: '#69f0ae' },
  { width: 150, height: 150, left: '70%', top: '70%', y: [0, -20, 0], x: [0, -30, 0], duration: 18, color: '#ff80ab' },
  { width: 90, height: 90, left: '20%', top: '80%', y: [0, 30, 0], x: [0, 10, 0], duration: 14, color: 'transparent' },
  { width: 110, height: 110, left: '40%', top: '40%', y: [0, -40, 0], x: [0, 40, 0], duration: 16, color: '#ffda59' },
  { width: 70, height: 70, left: '60%', top: '85%', y: [0, 20, 0], x: [0, -20, 0], duration: 11, color: '#69f0ae' },
];

export default function Hero({ isLoaded = true }: { isLoaded?: boolean }) {
  const progress = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isDragging) {
      let currentAnimation: any;
      
      const startInfinite = (from: number, to: number) => {
        currentAnimation = animate(progress, to, {
          duration: Math.abs(to - from) * 3,
          ease: "easeInOut",
          onComplete: () => {
            startInfinite(to, to === 1 ? 0 : 1);
          }
        });
      };
      
      startInfinite(progress.get(), progress.get() > 0.5 ? 0 : 1);
      
      return () => {
        if (currentAnimation) currentAnimation.stop();
      };
    }
  }, [isDragging, progress]);

  const updateProgress = (clientX: number) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const newProgress = Math.max(0, Math.min(1, x / rect.width));
      progress.set(newProgress);
    }
  };

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (isDragging) {
        updateProgress(e.clientX);
      }
    };

    const handlePointerUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
      return () => {
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerup', handlePointerUp);
      };
    }
  }, [isDragging]);

  const textSkew = useTransform(progress, [0, 0.5, 1], [-15, 0, 15]);
  const letterSpacing = useTransform(progress, [0, 0.5, 1], ["-0.05em", "0.1em", "-0.05em"]);
  const textColor = useTransform(progress, [0, 0.5, 1], ["rgba(0,0,0,0)", "#ffda59", "rgba(0,0,0,0)"]);
  const strokeColor = useTransform(progress, [0, 0.5, 1], ["#000", "#000", "#000"]);
  const textStroke = useTransform(strokeColor, c => `4px ${c}`);

  return (
    <section className="min-h-screen bg-[#d977ff] relative flex flex-col items-center justify-center overflow-hidden border-b-4 border-black pt-20">
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {shapes.map((shape, i) => (
          <motion.div
            key={i}
            drag
            dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
            dragElastic={0.2}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
            whileHover={{ scale: 1.1, cursor: "grab" }}
            whileDrag={{ scale: 1.2, cursor: "grabbing", zIndex: 50 }}
            className="absolute rounded-full border-4 border-black"
            style={{
              width: shape.width,
              height: shape.height,
              left: shape.left,
              top: shape.top,
              backgroundColor: shape.color,
            }}
            animate={{
              y: shape.y,
              x: shape.x,
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: shape.duration,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-[10%] md:left-1/4 animate-float -rotate-45">
        <Scissors size={48} className="text-black" strokeWidth={2} />
      </div>

      {/* Main Content */}
      <div className="text-center z-10 px-4 mt-12 flex flex-col items-center">
        <motion.div
          initial={{ scale: 0, opacity: 0, y: 100, rotate: -15 }}
          animate={isLoaded ? { scale: 1, opacity: 1, y: 0, rotate: -2 } : { scale: 0, opacity: 0, y: 100, rotate: -15 }}
          whileHover={{ scale: 1.05, rotate: 0, boxShadow: "16px 16px 0px 0px rgba(0,0,0,1)" }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: isLoaded ? 0.3 : 0 }}
          className="bg-white border-4 border-black px-6 md:px-12 py-4 md:py-6 mb-8 md:mb-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative z-30 inline-block cursor-default"
        >
          <h1 className="font-wide text-4xl md:text-8xl lg:text-[10rem] tracking-tighter uppercase leading-[0.85] text-black">
            I&apos;m Ali<br/>Aliyev
          </h1>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.5, delay: isLoaded ? 0.5 : 0 }}
          className="relative inline-block mb-12 mx-4 md:mx-16"
        >
          <motion.div 
            className="font-wide text-5xl md:text-[10rem] tracking-tighter relative z-10" 
            style={{ 
              skewX: textSkew,
              letterSpacing: letterSpacing,
              color: textColor,
              WebkitTextStroke: textStroke
            }}
          >
            EDIT
          </motion.div>
          
          <div className="absolute inset-0 flex items-center justify-center z-20">
             {/* Timeline line */}
             <div className="w-[120%] h-2 md:h-3 bg-black absolute top-1/2 -translate-y-1/2 -left-[10%] pointer-events-none"></div>
             
             {/* Interactive Area */}
             <div 
               ref={containerRef}
               className="absolute top-1/2 -translate-y-1/2 left-[-10%] right-[-10%] h-32 cursor-pointer touch-none"
               onPointerDown={(e) => {
                 setIsDragging(true);
                 updateProgress(e.clientX);
               }}
             >
               {/* Playhead */}
               <motion.div 
                 className="w-4 md:w-6 h-16 md:h-24 bg-white border-4 border-black absolute top-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing"
                 style={{ 
                   left: useTransform(progress, [0, 1], ["0%", "100%"]),
                   x: "-50%"
                 }}
               ></motion.div>
               
               {/* Video icon */}
               <motion.div 
                 className="absolute top-1/2 -translate-y-1/2 pointer-events-none" 
                 style={{ 
                   left: useTransform(progress, [0, 1], ["0%", "100%"]),
                   x: "100%",
                 }}
               >
                 <div className="bg-white border-4 border-black p-2 md:p-3 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] animate-float" style={{ animationDelay: '1s', transform: 'rotate(12deg)' }}>
                   <Video size={40} className="text-black" strokeWidth={2.5} />
                 </div>
               </motion.div>
             </div>
          </div>
        </motion.div>
        
        <motion.a 
          initial={{ opacity: 0, y: 50 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          href="https://www.youtube.com/@simongodly"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm md:text-3xl font-black text-white bg-black px-4 md:px-8 py-3 border-4 border-black rounded-full shadow-[6px_6px_0px_0px_#ffda59] cursor-pointer inline-block"
          whileHover={{ 
            scale: 1.05,
            rotate: [-2, 2, -2, 0],
            boxShadow: "10px 10px 0px 0px #69f0ae",
            color: "#ffda59"
          }}
          transition={{ duration: 0.5, delay: isLoaded ? 0.7 : 0 }}
        >
          Award-winning Video Editor & Motion Designer
        </motion.a>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 animate-spin-slow hidden md:block">
        <svg width="100" height="100" viewBox="0 0 100 100">
          <path id="curve" d="M 50 50 m -40 0 a 40 40 0 1 1 80 0 a 40 40 0 1 1 -80 0" fill="transparent" />
          <text className="font-bold text-xs tracking-widest uppercase">
            <textPath href="#curve">
              Scroll Down • Scroll Down • Scroll Down •
            </textPath>
          </text>
        </svg>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M19 12l-7 7-7-7"/>
          </svg>
        </div>
      </div>
    </section>
  );
}
