'use client';

import { useEffect } from 'react';
import { motion, useMotionValue } from 'motion/react';

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  useEffect(() => {
    let animationFrameId: number;
    let latestX = -100;
    let latestY = -100;

    const moveCursor = (e: MouseEvent) => {
      latestX = e.clientX;
      latestY = e.clientY;
      
      if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(() => {
          cursorX.set(latestX);
          cursorY.set(latestY);
          animationFrameId = 0;
        });
      }
    };

    window.addEventListener('mousemove', moveCursor, { passive: true });
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
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
      {/* Arrow Pointer Design */}
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="#ffffff"
        stroke="#ffffff"
        strokeWidth="1.5"
      >
        <path d="M2 2l20 10-8 2-2 8z" />
      </svg>
    </motion.div>
  );
}
