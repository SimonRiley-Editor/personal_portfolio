"use client";

import { useEffect, useState } from 'react';
import { motion, useMotionValue } from 'motion/react';

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, input, select, textarea, [role="button"], [tabindex]:not([tabindex="-1"])');
      setIsHovering(!!interactive);
    };

    window.addEventListener('mousemove', moveCursor, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[100000] hidden [@media(pointer:fine)]:block mix-blend-difference"
      style={{
        x: cursorX,
        y: cursorY,
      }}
    >
      {/* Outer Ring for Hover State */}
      <motion.div
        className="absolute top-[2px] left-[2px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white flex items-center justify-center"
        initial={{ width: 0, height: 0, opacity: 0 }}
        animate={{ 
          width: isHovering ? 48 : 0, 
          height: isHovering ? 48 : 0, 
          opacity: isHovering ? 1 : 0 
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <motion.div 
          className="w-1.5 h-1.5 bg-white rounded-full"
          animate={{ scale: isHovering ? 1 : 0 }}
          transition={{ duration: 0.2, delay: 0.1 }}
        />
      </motion.div>
      
      {/* Arrow Pointer Design */}
      <motion.svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="#ffffff"
        stroke="#ffffff"
        strokeWidth="1.5"
        animate={{ 
          scale: isHovering ? 0 : 1,
          opacity: isHovering ? 0 : 1,
        }}
        style={{ transformOrigin: '2px 2px' }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <path d="M2 2l20 10-8 2-2 8z" />
      </motion.svg>
    </motion.div>
  );
}
