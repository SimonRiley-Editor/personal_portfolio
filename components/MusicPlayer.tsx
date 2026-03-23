'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { useGlitch } from './GlitchContext';

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [isHovered, setIsHovered] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { glitchLevel, isCrashed } = useGlitch();

  useEffect(() => {
    if (audioRef.current) {
      if (isCrashed) {
        audioRef.current.pause();
        return;
      }
      
      const targetVolume = Math.max(0.1, volume - (glitchLevel * 0.05));
      audioRef.current.volume = targetVolume;
      audioRef.current.playbackRate = Math.max(0.5, 1 - (glitchLevel * 0.15));

      if (playing) {
        audioRef.current.play().catch(e => {
          console.error("Audio playback failed:", e);
          setPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [playing, volume, glitchLevel, isCrashed]);

  // Auto-play attempt on first interaction
  useEffect(() => {
    const handleInteraction = () => {
      setPlaying(true);
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };

    window.addEventListener('click', handleInteraction);
    window.addEventListener('keydown', handleInteraction);

    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };
  }, []);

  return (
    <>
      <audio
        ref={audioRef}
        src="/bgm.mp3"
        loop
        preload="auto"
      />

      {/* Minimalistic Control Panel */}
      <div 
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 p-2 px-3 bg-nier-dark/90 backdrop-blur-md border border-nier-light/20 text-nier-light shadow-2xl transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button
          onClick={() => setPlaying(!playing)}
          className="hover:text-nier-red transition-colors focus:outline-none flex items-center justify-center w-6 h-6"
          aria-label={playing ? "Pause Background Music" : "Play Background Music"}
        >
          {playing ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" className="ml-0.5" />}
        </button>
        
        <div className="w-[1px] h-4 bg-nier-light/20"></div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setVolume(volume === 0 ? 0.3 : 0)}
            className="hover:text-nier-red transition-colors focus:outline-none flex items-center justify-center w-6 h-6"
            aria-label={volume === 0 ? "Unmute" : "Mute"}
          >
            {volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
          
          <div 
            className={`overflow-hidden transition-all duration-300 ease-in-out flex items-center ${
              isHovered ? 'w-20 opacity-100 mr-2' : 'w-0 opacity-0 mr-0'
            }`}
          >
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-20 h-[2px] appearance-none bg-nier-light/20 outline-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-nier-light hover:[&::-webkit-slider-thumb]:bg-nier-red transition-colors"
              aria-label="Volume Control"
            />
          </div>
        </div>
        
        <div 
          className={`font-mono text-[10px] tracking-widest transition-all duration-300 flex items-center ${
            isHovered ? 'w-0 opacity-0 overflow-hidden' : 'w-8 opacity-70'
          }`}
        >
          BGM
        </div>
      </div>
    </>
  );
}
