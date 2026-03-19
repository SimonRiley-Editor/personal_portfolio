'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { AlertTriangle } from 'lucide-react';

export default function CrashScreen({ onRecover }: { onRecover: () => void }) {
  const [text, setText] = useState('');
  const fullText = `FATAL ERROR: MEMORY CORRUPTION DETECTED.
MODULE: UI_RENDER_PIPELINE
STATUS: OFFLINE

ATTEMPTING SYSTEM RECOVERY...
REALLOCATING MEMORY SECTORS...

[ WARNING: UNAUTHORIZED ACCESS DETECTED ]
[ PURGING CORRUPTED DATA ]

REBOOTING...`;

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) {
        clearInterval(interval);
        setTimeout(onRecover, 3000);
      }
    }, 40);
    
    // Play harsh glitch sound
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(100, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.5);
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1);
      osc.start();
      osc.stop(audioCtx.currentTime + 1);
    } catch(e) {}

    return () => clearInterval(interval);
  }, [fullText, onRecover]);

  return (
    <div className="fixed inset-0 z-[9999] bg-black text-red-500 font-mono p-8 flex flex-col justify-center items-center pointer-events-auto">
      <div className="max-w-2xl w-full">
        <motion.div animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.1, repeat: Infinity }} className="mb-4">
          <AlertTriangle size={64} />
        </motion.div>
        <pre className="whitespace-pre-wrap text-sm md:text-base leading-relaxed">
          {text}
          <span className="animate-pulse">█</span>
        </pre>
      </div>
    </div>
  );
}
