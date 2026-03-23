'use client';

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Activity, Shield, Zap, AlertCircle } from 'lucide-react';
import { useGlitch } from './GlitchContext';

interface FloatingPodProps {
  onClick?: () => void;
  onTriggerHacking?: () => void;
  onTriggerCinematic?: () => void;
}

export default function FloatingPod({ onClick, onTriggerHacking, onTriggerCinematic }: FloatingPodProps) {
  const { podMessage, setPodMessage, userState, foundSecret } = useGlitch();
  const audioCtxRef = useRef<AudioContext | null>(null);
  const [isMounted, setIsMounted] = React.useState(false);

  useEffect(() => {
    setTimeout(() => setIsMounted(true), 0);
  }, []);

  const playSound = (type: 'click' | 'message') => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      const now = ctx.currentTime;
      if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1200, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.05);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else {
        osc.type = 'square';
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.setValueAtTime(600, now + 0.05);
        gain.gain.setValueAtTime(0.03, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
      }
    } catch (e) {}
  };

  useEffect(() => {
    if (podMessage) {
      playSound('message');
      const timer = setTimeout(() => {
        setPodMessage(null);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [podMessage, setPodMessage]);

  const getStageIcon = () => {
    if (!isMounted) return <Cpu size={20} className="text-[#e6e2af]" />;
    switch (userState.stage) {
      case 1: return <Shield size={20} className="text-[#e6e2af]" />;
      case 2: return <Activity size={20} className="text-[#e6e2af]" />;
      case 3: return <Zap size={20} className="text-[#e6e2af]" />;
      case 4: return <AlertCircle size={20} className="text-nier-red" />;
      default: return <Cpu size={20} className="text-[#e6e2af]" />;
    }
  };

  const getStageLabel = () => {
    if (!isMounted) return "SYSTEM";
    switch (userState.stage) {
      case 1: return "NEUTRAL";
      case 2: return "OBSERVING";
      case 3: return "ANALYZING";
      case 4: return "EVOLVED";
      default: return "SYSTEM";
    }
  };

  return (
    <div className="fixed bottom-24 right-6 z-[9999] flex flex-col items-end pointer-events-none">
      <AnimatePresence>
        {isMounted && podMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, x: 20, scale: 0.9 }}
            className="mb-4 max-w-xs bg-black/90 text-[#e6e2af] p-4 border-l-4 border-[#e6e2af] text-xs font-mono tracking-widest shadow-[0_0_20px_rgba(230,226,175,0.15)] backdrop-blur-md relative"
          >
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#e6e2af]/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#e6e2af]/50 to-transparent"></div>
            
            <div className="flex items-center justify-between mb-2 opacity-50">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 ${userState.stage === 4 ? 'bg-nier-red animate-ping' : 'bg-[#e6e2af] animate-pulse'}`}></div>
                <span>POD.042 // {getStageLabel()}</span>
              </div>
              <span className="text-[8px]">BEHAVIOR: {userState.behaviorType.toUpperCase()}</span>
            </div>
            
            <div className="leading-relaxed">
              {podMessage}
            </div>

            {/* Progress bar for stage */}
            <div className="mt-3 h-[1px] w-full bg-[#e6e2af]/10 relative overflow-hidden">
              <motion.div 
                className={`absolute inset-0 ${userState.stage === 4 ? 'bg-nier-red' : 'bg-[#e6e2af]'}`}
                initial={{ width: 0 }}
                animate={{ width: `${(userState.stage / 4) * 100}%` }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="flex flex-col items-center gap-2">
        {/* Secret trigger (invisible button near pod) */}
        <button 
          className="w-4 h-4 opacity-0 pointer-events-auto cursor-default"
          onClick={() => foundSecret()}
        />

        <motion.div
          animate={{ 
            y: [0, -10, 0],
            rotate: isMounted && userState.stage === 4 ? [0, 5, -5, 0] : 0
          }}
          transition={{ 
            y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 0.1, repeat: Infinity }
          }}
          className={`w-16 h-16 bg-[#050505] border-2 ${isMounted && userState.stage === 4 ? 'border-nier-red shadow-[0_0_20px_rgba(139,0,0,0.6)]' : 'border-[#e6e2af]/60 shadow-[0_0_15px_rgba(230,226,175,0.2)]'} flex items-center justify-center pointer-events-auto cursor-help hover:bg-[#e6e2af]/10 transition-all duration-300 group relative rounded-sm`}
          onClick={() => {
            playSound('click');
            setPodMessage("POD: Manual diagnostic requested. System status: " + (userState.stage === 4 ? "UNSTABLE" : "NOMINAL"));
            if (onClick) onClick();
          }}
        >
          {/* Mechanical Pod Design */}
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Outer Ring */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className={`absolute w-12 h-12 border border-dashed rounded-full ${isMounted && userState.stage === 4 ? 'border-nier-red' : 'border-[#e6e2af]/40'}`}
            />
            {/* Inner Ring */}
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
              className={`absolute w-8 h-8 border border-dotted rounded-full ${isMounted && userState.stage === 4 ? 'border-nier-red' : 'border-[#e6e2af]/60'}`}
            />
            {/* Core Eye */}
            <div className={`w-4 h-4 rounded-full flex items-center justify-center ${isMounted && userState.stage === 4 ? 'bg-nier-red animate-pulse' : 'bg-[#e6e2af]'}`}>
              <div className="w-1.5 h-1.5 bg-black rounded-full" />
            </div>
            {/* Antennae */}
            <div className={`absolute -top-2 w-1 h-3 ${isMounted && userState.stage === 4 ? 'bg-nier-red' : 'bg-[#e6e2af]'}`} />
            <div className={`absolute -bottom-2 w-1 h-2 ${isMounted && userState.stage === 4 ? 'bg-nier-red' : 'bg-[#e6e2af]'}`} />
            <div className={`absolute -left-2 w-2 h-1 ${isMounted && userState.stage === 4 ? 'bg-nier-red' : 'bg-[#e6e2af]'}`} />
            <div className={`absolute -right-2 w-2 h-1 ${isMounted && userState.stage === 4 ? 'bg-nier-red' : 'bg-[#e6e2af]'}`} />
          </div>

          {/* Decorative corners */}
          <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-[#e6e2af]"></div>
          <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-[#e6e2af]"></div>
          <div className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-[#e6e2af]"></div>
          <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-[#e6e2af]"></div>

          {/* Mini status text */}
          <div className="absolute -bottom-6 right-0 text-[9px] font-mono text-[#e6e2af]/60 tracking-tighter whitespace-nowrap bg-black/50 px-1">
            {isMounted ? `S:${userState.stage} | C:${userState.clicks} | T:${userState.sessionTime}s` : 'S:1 | C:0 | T:0s'}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
