'use client';
import React, { useEffect, useState, useRef } from 'react';

export default function CrashScreen({ onRecover }: { onRecover: () => void }) {
  const [text, setText] = useState('');
  const [phase, setPhase] = useState<'error' | 'purge' | 'reboot' | 'exit'>('error');
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const onRecoverRef = useRef(onRecover);
  
  useEffect(() => {
    onRecoverRef.current = onRecover;
  }, [onRecover]);

  const errorText = `FATAL ERROR: MEMORY CORRUPTION DETECTED.
MODULE: UI_RENDER_PIPELINE
STATUS: OFFLINE

ATTEMPTING SYSTEM RECOVERY...
REALLOCATING MEMORY SECTORS...`;

  const purgeText = `
[ WARNING: UNAUTHORIZED ACCESS DETECTED ]
[ PURGING CORRUPTED DATA ]
[ OVERRIDING SECURITY PROTOCOLS ]`;

  const rebootText = `
REBOOTING...`;

  useEffect(() => {
    let i = 0;
    let currentText = errorText;
    let timeoutId: NodeJS.Timeout;
    let progressInterval: NodeJS.Timeout;
    
    const typeText = () => {
      setText(currentText.slice(0, i));
      i++;
      
      if (i <= currentText.length) {
        timeoutId = setTimeout(typeText, Math.random() * 10 + 5); // Faster typing
      } else {
        if (phase === 'error') {
          timeoutId = setTimeout(() => {
            setPhase('purge');
            i = 0;
            currentText = errorText + purgeText;
            typeText();
          }, 400); // Reduced from 800
        } else if (phase === 'purge') {
          progressInterval = setInterval(() => {
            setProgress(p => {
              if (p >= 100) {
                clearInterval(progressInterval);
                return 100;
              }
              return p + Math.floor(Math.random() * 25); // Faster progress
            });
          }, 50); // Faster interval

          timeoutId = setTimeout(() => {
            setPhase('reboot');
            i = 0;
            currentText = errorText + purgeText + rebootText;
            typeText();
          }, 800); // Reduced from 1500
        } else if (phase === 'reboot') {
          timeoutId = setTimeout(() => {
            setPhase('exit');
            setIsExiting(true);
            setTimeout(() => {
              if (onRecoverRef.current) onRecoverRef.current();
            }, 500); // Wait for fade out animation
          }, 800); // Reduced from 1500
        }
      }
    };

    typeText();
    
    // Play harsh glitch sound
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(100, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.3);
      osc.frequency.setValueAtTime(200, audioCtx.currentTime + 0.3);
      osc.frequency.exponentialRampToValueAtTime(1000, audioCtx.currentTime + 0.6);
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1.0);
      
      // Add noise burst
      const bufferSize = audioCtx.sampleRate * 0.5;
      const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let j = 0; j < bufferSize; j++) {
        data[j] = Math.random() * 2 - 1;
      }
      const noise = audioCtx.createBufferSource();
      noise.buffer = buffer;
      const noiseGain = audioCtx.createGain();
      noiseGain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
      noise.connect(noiseGain);
      noiseGain.connect(audioCtx.destination);
      noise.start();

      osc.start();
      osc.stop(audioCtx.currentTime + 1.0);
    } catch(e) {}

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (progressInterval) clearInterval(progressInterval);
    };
  }, [phase, errorText, purgeText, rebootText]);

  return (
    <div className={`fixed inset-0 z-[9999] bg-nier-gray text-nier-red font-mono p-8 flex flex-col pointer-events-auto overflow-hidden animate-pulse transition-opacity duration-500 ease-in-out ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
      {/* Static Scanlines */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(transparent_50%,rgba(255,0,0,0.25)_50%)] bg-[length:100%_4px]" />
      
      <div className="relative z-10 max-w-4xl w-full mx-auto mt-20">
        <div className="flex items-center gap-4 mb-8 border-b-2 border-nier-red pb-4">
          <div className="w-8 h-8 bg-nier-red animate-ping" />
          <h1 className="text-4xl md:text-6xl font-bold tracking-widest uppercase glitch-text-sexy" data-text="SYSTEM FAILURE">SYSTEM FAILURE</h1>
        </div>
        
        <div className="bg-nier-red/10 border border-nier-red/50 p-6 min-h-[400px] shadow-[0_0_30px_rgba(255,0,0,0.3)]">
          <pre className="whitespace-pre-wrap text-lg md:text-xl leading-relaxed">
            {text}
            {phase === 'purge' && (
              <div className="mt-4">
                <div className="w-full bg-nier-red/20 h-4 border border-nier-red">
                  <div className="bg-nier-red h-full transition-all duration-100" style={{ width: `${Math.min(progress, 100)}%` }} />
                </div>
                <div className="text-sm mt-1">PURGE PROGRESS: {Math.min(progress, 100)}%</div>
              </div>
            )}
            <span className="animate-pulse bg-nier-red text-nier-dark ml-1">█</span>
          </pre>
        </div>
      </div>
    </div>
  );
}
