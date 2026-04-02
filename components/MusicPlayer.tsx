'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward, Music } from 'lucide-react';
import { useGlitch } from './GlitchContext';

const tracks = [
  {
    title: 'City Ruins',
    url: 'https://res.cloudinary.com/ds6dwbk37/video/upload/v1774501473/bgm_ye67vo.mp3'
  },
  {
    title: 'Weight of the World',
    url: 'https://res.cloudinary.com/ds6dwbk37/video/upload/v1775054346/Weight_of_the_World_%E5%A3%8A%E3%83%AC%E3%82%BF%E4%B8%96%E7%95%8C%E3%83%8E%E6%AD%8C_gmxmf6.mp3'
  }
];

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [isHovered, setIsHovered] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
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
  }, [playing, volume, glitchLevel, isCrashed, currentTrackIndex]);

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

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={tracks[currentTrackIndex].url}
        onEnded={nextTrack}
        preload="auto"
      />

      {/* Minimalistic Control Panel */}
      <div 
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 p-2 px-3 bg-nier-dark/90 backdrop-blur-md border border-nier-light/20 text-nier-light shadow-2xl transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`flex items-center gap-1 transition-all duration-300 overflow-hidden ${isHovered ? 'w-16 opacity-100' : 'w-0 opacity-0'}`}>
          <button onClick={prevTrack} className="hover:text-nier-red transition-colors p-1" aria-label="Previous Track">
            <SkipBack size={14} />
          </button>
          <button onClick={nextTrack} className="hover:text-nier-red transition-colors p-1" aria-label="Next Track">
            <SkipForward size={14} />
          </button>
        </div>

        <button
          onClick={() => setPlaying(!playing)}
          className="hover:text-nier-red transition-colors focus:outline-none flex items-center justify-center w-6 h-6 shrink-0"
          aria-label={playing ? "Pause Background Music" : "Play Background Music"}
        >
          {playing ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" className="ml-0.5" />}
        </button>
        
        <div className="w-[1px] h-4 bg-nier-light/20 shrink-0"></div>
        
        <div className="flex items-center gap-2 shrink-0">
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

        <div className={`overflow-hidden transition-all duration-300 ease-in-out flex items-center border-l border-nier-light/20 ${
          isHovered ? 'w-32 opacity-100 pl-3' : 'w-0 opacity-0 pl-0 border-transparent'
        }`}>
          <div className="flex flex-col whitespace-nowrap">
            <span className="font-mono text-[8px] text-nier-light/50 tracking-widest uppercase">NOW PLAYING</span>
            <span className="font-mono text-[10px] tracking-wider truncate w-28 text-nier-red">{tracks[currentTrackIndex].title}</span>
          </div>
        </div>
        
        <div 
          className={`font-mono text-[10px] tracking-widest transition-all duration-300 flex items-center shrink-0 ${
            isHovered ? 'w-0 opacity-0 overflow-hidden' : 'w-8 opacity-70'
          }`}
        >
          BGM
        </div>
      </div>
    </>
  );
}
