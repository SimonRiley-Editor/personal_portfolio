'use client';

import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Auto-play attempt on first interaction
  useEffect(() => {
    const handleInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        setPlaying(true);
      }
    };

    window.addEventListener('click', handleInteraction, { once: true });
    window.addEventListener('keydown', handleInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };
  }, [hasInteracted]);

  return (
    <>
      {/* Hidden YouTube Player */}
      <div className="hidden">
        {playing && (
          <iframe
            width="0"
            height="0"
            src="https://www.youtube.com/embed/wEVXk7fT_eA?autoplay=1&loop=1&playlist=wEVXk7fT_eA&controls=0"
            allow="autoplay"
            title="Nier Automata OST"
          />
        )}
      </div>

      {/* Floating Control Button */}
      <button
        onClick={() => setPlaying(!playing)}
        className="fixed bottom-6 left-6 z-50 p-3 bg-nier-dark text-nier-light border border-nier-light/20 hover:bg-nier-red hover:text-white transition-colors flex items-center gap-2 shadow-lg"
        aria-label={playing ? "Mute Background Music" : "Play Background Music"}
      >
        {playing ? <Volume2 size={20} /> : <VolumeX size={20} />}
        <span className="font-mono text-xs hidden md:inline-block">
          {playing ? 'BGM_ACTIVE' : 'BGM_MUTED'}
        </span>
      </button>
    </>
  );
}
