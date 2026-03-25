'use client';

import { useRef, useEffect, useState } from 'react';

export default function SectionWrapper({ 
  children, 
  index 
}: { 
  children: React.ReactNode, 
  index: number 
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  
  useEffect(() => {
    if (!ref.current) return;
    
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setHeight(entry.contentRect.height);
      }
    });
    
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ 
        // Stick to top if shorter than viewport, otherwise stick to bottom
        top: `min(0px, calc(100vh - ${height}px))`,
        zIndex: index, // Ensure sections stack correctly
      }}
      className="sticky w-full shadow-[0_-20px_50px_rgba(0,0,0,0.3)]"
    >
      {children}
    </div>
  );
}
