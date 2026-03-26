'use client';

import { useEffect } from 'react';
import { motion, useMotionValue } from 'motion/react';

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[100000] hidden md:block"
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
        fill="var(--nier-beige)"
        stroke="var(--nier-dark)"
        strokeWidth="1.5"
        className="drop-shadow-sm"
      >
        <path d="M2 2l20 10-8 2-2 8z" />
      </svg>
    </motion.div>
  );
}
