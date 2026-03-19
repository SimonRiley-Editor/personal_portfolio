'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import CrashScreen from './CrashScreen';

interface GlitchContextType {
  glitchLevel: number;
  increaseGlitch: () => void;
  resetGlitch: () => void;
  isCrashed: boolean;
  structuralGlitchActive: boolean;
}

const GlitchContext = createContext<GlitchContextType>({
  glitchLevel: 0,
  increaseGlitch: () => {},
  resetGlitch: () => {},
  isCrashed: false,
  structuralGlitchActive: false,
});

export const useGlitch = () => useContext(GlitchContext);

export const GlitchProvider = ({ children }: { children: React.ReactNode }) => {
  const [glitchLevel, setGlitchLevel] = useState(0);
  const [isCrashed, setIsCrashed] = useState(false);
  const [structuralGlitchActive, setStructuralGlitchActive] = useState(false);
  const [showFakeLoader, setShowFakeLoader] = useState(false);
  const clickCount = useRef(0);
  const clickTimer = useRef<NodeJS.Timeout | null>(null);
  const idleTimer = useRef<NodeJS.Timeout | null>(null);
  const structuralTimer = useRef<NodeJS.Timeout | null>(null);

  // Structural glitch randomizer
  useEffect(() => {
    if (glitchLevel >= 2 && !isCrashed) {
      const triggerStructuralGlitch = () => {
        setStructuralGlitchActive(true);
        setShowFakeLoader(Math.random() > 0.5);
        // Glitch lasts for 0.5 to 2 seconds
        setTimeout(() => {
          setStructuralGlitchActive(false);
          setShowFakeLoader(false);
        }, Math.random() * 1500 + 500);

        // Schedule next glitch
        structuralTimer.current = setTimeout(triggerStructuralGlitch, Math.random() * 10000 + 5000);
      };

      structuralTimer.current = setTimeout(triggerStructuralGlitch, Math.random() * 5000 + 2000);
    } else {
      setTimeout(() => {
        setStructuralGlitchActive(false);
        setShowFakeLoader(false);
      }, 0);
      if (structuralTimer.current) clearTimeout(structuralTimer.current);
    }

    return () => {
      if (structuralTimer.current) clearTimeout(structuralTimer.current);
    };
  }, [glitchLevel, isCrashed]);

  // Rapid click detection
  useEffect(() => {
    const handleClick = () => {
      clickCount.current += 1;
      
      if (!clickTimer.current) {
        clickTimer.current = setTimeout(() => {
          if (clickCount.current > 6) {
            setGlitchLevel(prev => Math.min(prev + 1, 4));
          }
          clickCount.current = 0;
          clickTimer.current = null;
        }, 2000);
      }
    };
    
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  // Idle detection for glitches
  useEffect(() => {
    const resetIdle = () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => {
        setGlitchLevel(prev => Math.min(prev + 1, 4));
      }, 45000); // 45 seconds of idle increases glitch level
    };

    window.addEventListener('mousemove', resetIdle);
    window.addEventListener('keydown', resetIdle);
    window.addEventListener('click', resetIdle);
    window.addEventListener('scroll', resetIdle);
    resetIdle();

    return () => {
      window.removeEventListener('mousemove', resetIdle);
      window.removeEventListener('keydown', resetIdle);
      window.removeEventListener('click', resetIdle);
      window.removeEventListener('scroll', resetIdle);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, []);

  // Crash handler
  useEffect(() => {
    if (glitchLevel === 4 && !isCrashed) {
      setTimeout(() => setIsCrashed(true), 0);
    }
  }, [glitchLevel, isCrashed]);

  const resetGlitch = () => {
    setGlitchLevel(0);
    setIsCrashed(false);
    setStructuralGlitchActive(false);
    setShowFakeLoader(false);
  };

  return (
    <GlitchContext.Provider value={{ glitchLevel, increaseGlitch: () => setGlitchLevel(p => Math.min(p + 1, 4)), resetGlitch, isCrashed, structuralGlitchActive }}>
      <div className={`transition-all duration-300 ${glitchLevel === 1 ? 'glitch-overlay-1' : glitchLevel === 2 ? 'glitch-overlay-2' : glitchLevel === 3 ? 'glitch-overlay-3' : ''} ${structuralGlitchActive ? 'structural-glitch' : ''}`}>
        {children}
        {showFakeLoader && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-nier-light/80 backdrop-blur-sm pointer-events-none">
            <div className="nier-box p-8 flex flex-col items-center gap-4 animate-pulse">
              <div className="w-12 h-12 border-4 border-nier-dark border-t-nier-red rounded-full animate-spin"></div>
              <span className="font-mono text-nier-dark tracking-widest uppercase">Recompiling Data...</span>
            </div>
          </div>
        )}
      </div>
      {isCrashed && <CrashScreen onRecover={resetGlitch} />}
    </GlitchContext.Provider>
  );
};
