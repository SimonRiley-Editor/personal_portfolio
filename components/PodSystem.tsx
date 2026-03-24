'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import FloatingPod from './FloatingPod';
import HackingIntro from './HackingIntro';
import CinematicIntro from './CinematicIntro';
import PodChat from './PodChat';
import { useGlitch } from './GlitchContext';

export default function PodSystem() {
  const { userState, setPodMessage, reportUserAction, unlockEnding } = useGlitch();
  const [activeGame, setActiveGame] = useState<'none' | 'hacking' | 'cinematic'>('none');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [hasPlayedCinematic, setHasPlayedCinematic] = useState(false);

  const handleHackingComplete = () => {
    setActiveGame('none');
    setPodMessage("POD: Intrusion repelled. System integrity restored.");
    reportUserAction('completed the hacking mini-game');
    unlockEnding('H'); // Ending H: Hacker
  };

  const handleCinematicComplete = () => {
    setActiveGame('none');
    setHasPlayedCinematic(true);
    setPodMessage("POD: Core defense sequence completed. You have proven your worth.");
    reportUserAction('completed the cinematic core defense sequence');
    unlockEnding('C'); // Ending C: Core Defender
  };

  return (
    <>
      {activeGame === 'none' && (
        <FloatingPod 
          isChatOpen={isChatOpen}
          onClick={() => setIsChatOpen(true)}
          onTriggerHacking={() => setActiveGame('hacking')} 
          onTriggerCinematic={() => {
            if (!hasPlayedCinematic) setActiveGame('cinematic');
            else setIsChatOpen(true);
          }} 
        />
      )}
      <AnimatePresence>
        {isChatOpen && <PodChat onClose={() => setIsChatOpen(false)} />}
      </AnimatePresence>
      {activeGame === 'hacking' && <HackingIntro onComplete={handleHackingComplete} />}
      {activeGame === 'cinematic' && <CinematicIntro onComplete={handleCinematicComplete} />}
    </>
  );
}
