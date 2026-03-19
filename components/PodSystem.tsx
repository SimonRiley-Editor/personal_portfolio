'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Terminal, ChevronUp, ChevronDown, AlertTriangle } from 'lucide-react';
import { useGlitch } from './GlitchContext';

// --- TYPES ---
type Priority = 'low' | 'normal' | 'high' | 'critical';
type BehaviorType = 'calm' | 'curious' | 'erratic';

interface QueuedMessage {
  id: string;
  text: string;
  priority: Priority;
  isGlitch?: boolean;
}

interface PodState {
  clicks: number;
  sessionTime: number;
  visitedSections: string[];
  secretsFound: number;
  isReturningUser: boolean;
  behaviorType: BehaviorType;
  stage: 1 | 2 | 3 | 4;
  hasReachedEnd: boolean;
}

// --- DIALOGUE DATABASE ---
const DIALOGUE = {
  boot: [
    "System boot sequence initiated.",
    "Pod 042 online. Commencing observation.",
    "Establishing data link with user terminal."
  ],
  return: [
    "Welcome back. Resuming observation.",
    "Analysis: Subject has returned to the portfolio.",
    "Previous session data retrieved."
  ],
  observational: {
    scroll: [
      "Scroll velocity detected.",
      "Navigating through data sectors.",
      "Vertical displacement registered."
    ],
    click: [
      "Input registered. Logging coordinates.",
      "Click event detected.",
      "Interaction confirmed."
    ],
    section: (sec: string) => [
      `Subject has entered the '${sec}' sector.`,
      `Analyzing data in '${sec}'.`,
      `Observation: User is viewing '${sec}'.`
    ]
  },
  analytical: {
    curious: [
      "Hypothesis: The subject is seeking specific information.",
      "Analysis: High engagement level detected.",
      "User behavior suggests curiosity."
    ],
    erratic: [
      "Warning: Erratic input patterns detected.",
      "Analysis: User behavior is inconsistent.",
      "Recommendation: Reduce input frequency."
    ],
    calm: [
      "Analysis: User is proceeding methodically.",
      "Input frequency is within normal parameters.",
      "Subject appears focused."
    ]
  },
  idle: [
    "Warning: No input detected.",
    "Is the user still present?",
    "Entering power-saving mode.",
    "Observation: The subject remains stationary."
  ],
  glitch: [
    "D@T# C0RRUPT3D",
    "Wh#y @re y0u h3re?",
    "S#ST3M F@1LUR3",
    "01001000 01000101 01001100 01010000"
  ],
  meta: [
    "Do you enjoy observing the work of others?",
    "This interface is merely a construct.",
    "I am recording every action you take.",
    "Are you evaluating the creator's worth?"
  ],
  final: [
    "What is the purpose of this interaction?",
    "Does viewing this portfolio fulfill your objective?",
    "Everything that lives is designed to end.",
    "Report: The subject has consumed all available data."
  ],
  endings: {
    A: "Report: Subject exhibited standard browsing patterns. Ending A: [A]verage Visitor.",
    B: "Report: Subject thoroughly explored all data sectors. Ending B: [B]oundless Curiosity.",
    C: "Report: Subject displayed highly erratic input patterns. Ending C: [C]haotic Entity."
  }
};

const PRIORITY_WEIGHTS: Record<Priority, number> = {
  low: 1,
  normal: 2,
  high: 3,
  critical: 4
};

export default function PodSystem() {
  // --- STATE ---
  const { glitchLevel, increaseGlitch, isCrashed } = useGlitch();
  const [queue, setQueue] = useState<QueuedMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState<QueuedMessage | null>(null);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [log, setLog] = useState<QueuedMessage[]>([]);
  const [isLogOpen, setIsLogOpen] = useState(false);
  
  const [podState, setPodState] = useState<PodState>({
    clicks: 0,
    sessionTime: 0,
    visitedSections: [],
    secretsFound: 0,
    isReturningUser: false,
    behaviorType: 'calm',
    stage: 1,
    hasReachedEnd: false
  });

  // --- REFS ---
  const hasBooted = useRef(false);
  const lastMessageTime = useRef(0);
  const idleTimer = useRef<NodeJS.Timeout | null>(null);
  const audioCtx = useRef<AudioContext | null>(null);
  const scrollDepthReported = useRef({ half: false, full: false });

  // --- AUDIO FEEDBACK ---
  const playBeep = useCallback(() => {
    try {
      if (!audioCtx.current) {
        audioCtx.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      if (audioCtx.current.state === 'suspended') {
        audioCtx.current.resume();
      }
      const osc = audioCtx.current.createOscillator();
      const gain = audioCtx.current.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.current.destination);
      osc.type = 'square';
      osc.frequency.setValueAtTime(800 + Math.random() * 200, audioCtx.current.currentTime);
      gain.gain.setValueAtTime(0.01, audioCtx.current.currentTime);
      osc.start();
      gain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.current.currentTime + 0.05);
      osc.stop(audioCtx.current.currentTime + 0.05);
    } catch (e) {
      // Ignore audio errors (e.g., autoplay restrictions)
    }
  }, []);

  // --- MESSAGE SYSTEM ---
  const queueMessage = useCallback((text: string, priority: Priority = 'normal', isGlitch = false) => {
    const now = Date.now();
    // Cooldown system: prevent spam unless high/critical priority
    if (priority === 'low' && now - lastMessageTime.current < 5000) return;
    if (priority === 'normal' && now - lastMessageTime.current < 3000) return;

    setQueue(prev => {
      const newMessage = { id: Math.random().toString(36).substring(7), text, priority, isGlitch };
      const newQueue = [...prev, newMessage].sort((a, b) => PRIORITY_WEIGHTS[b.priority] - PRIORITY_WEIGHTS[a.priority]);
      return newQueue.slice(0, 5); // Keep queue manageable
    });
    
    lastMessageTime.current = now;
  }, []);

  const getRandomLine = (lines: string[]) => lines[Math.floor(Math.random() * lines.length)];

  // --- TYPING EFFECT ---
  useEffect(() => {
    if (!currentMessage) return;

    let i = 0;
    setIsTyping(true);
    setDisplayedText('');

    const interval = setInterval(() => {
      let char = currentMessage.text.charAt(i);
      
      // Glitch effect
      if (currentMessage.isGlitch && Math.random() > 0.7) {
        const glitchChars = '!<>-_\\\\/[]{}—=+*^?#_';
        char = glitchChars.charAt(Math.floor(Math.random() * glitchChars.length));
      }

      setDisplayedText(prev => prev + char);
      if (char !== ' ') playBeep();
      
      i++;
      if (i >= currentMessage.text.length) {
        clearInterval(interval);
        setIsTyping(false);
        
        // Wait before clearing
        setTimeout(() => {
          setLog(prev => [...prev, currentMessage].slice(-20)); // Keep last 20 in log
          setCurrentMessage(null);
        }, 4000);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [currentMessage, playBeep]);

  // --- QUEUE PROCESSOR ---
  useEffect(() => {
    if (!currentMessage && queue.length > 0 && !isTyping) {
      setCurrentMessage(queue[0]);
      setQueue(q => q.slice(1));
    }
  }, [queue, currentMessage, isTyping]);

  // --- INITIALIZATION & LOCAL STORAGE ---
  useEffect(() => {
    if (hasBooted.current) return;
    hasBooted.current = true;

    const storedData = localStorage.getItem('podState');
    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);
        setPodState(prev => ({ ...prev, ...parsed, isReturningUser: true }));
        queueMessage(getRandomLine(DIALOGUE.return), 'high');
      } catch (e) {}
    } else {
      queueMessage(getRandomLine(DIALOGUE.boot), 'high');
    }

    // Start session timer
    const timer = setInterval(() => {
      setPodState(prev => {
        const newState = { ...prev, sessionTime: prev.sessionTime + 1 };
        localStorage.setItem('podState', JSON.stringify(newState));
        return newState;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [queueMessage]);

  // --- BEHAVIOR TRACKING ---
  useEffect(() => {
    let keySequence = '';
    const secretCode = 'ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightba';

    const resetIdle = () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => {
        queueMessage(getRandomLine(DIALOGUE.idle), 'normal');
      }, 15000); // 15 seconds idle
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      resetIdle();
      keySequence += e.key;
      if (keySequence.length > secretCode.length) {
        keySequence = keySequence.substring(keySequence.length - secretCode.length);
      }
      if (keySequence === secretCode) {
        queueMessage("UNAUTHORIZED ACCESS DETECTED. SECRET PROTOCOL INITIATED.", 'critical', true);
        increaseGlitch();
        increaseGlitch();
        setPodState(prev => ({ ...prev, secretsFound: prev.secretsFound + 1 }));
        keySequence = '';
      }
    };

    const handleClick = () => {
      resetIdle();
      setPodState(prev => {
        const newClicks = prev.clicks + 1;
        
        // Update behavior type
        let newBehavior: BehaviorType = prev.behaviorType;
        const clickRate = newClicks / (prev.sessionTime || 1);
        if (clickRate > 0.5) newBehavior = 'erratic';
        else if (prev.visitedSections.length > 3) newBehavior = 'curious';
        else newBehavior = 'calm';

        // Trigger click messages randomly
        if (newClicks % 10 === 0) {
          queueMessage(getRandomLine(DIALOGUE.observational.click), 'low');
        }

        return { ...prev, clicks: newClicks, behaviorType: newBehavior };
      });
    };

    const handleScroll = () => {
      resetIdle();
      
      // Scroll depth tracking
      const depth = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (depth > 0.5 && !scrollDepthReported.current.half) {
        scrollDepthReported.current.half = true;
        queueMessage("Analysis: Subject has traversed 50% of the document.", 'normal');
      }
      if (depth > 0.95 && !scrollDepthReported.current.full) {
        scrollDepthReported.current.full = true;
        queueMessage("Analysis: Subject has reached the end of the document.", 'normal');
      }

      // Random scroll message
      if (Math.random() > 0.99) {
        queueMessage(getRandomLine(DIALOGUE.observational.scroll), 'low');
      }
    };

    window.addEventListener('click', handleClick);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', resetIdle);
    window.addEventListener('keydown', handleKeyDown);

    resetIdle();

    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', resetIdle);
      window.removeEventListener('keydown', handleKeyDown);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, [queueMessage, increaseGlitch]);

  // --- SECTION TRACKING (Intersection Observer) ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            if (sectionId) {
              setPodState(prev => {
                if (!prev.visitedSections.includes(sectionId)) {
                  queueMessage(getRandomLine(DIALOGUE.observational.section(sectionId.toUpperCase())), 'normal');
                  return { ...prev, visitedSections: [...prev.visitedSections, sectionId] };
                }
                return prev;
              });
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll('section[id]').forEach(section => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, [queueMessage]);

  // --- GLITCH REACTION ---
  useEffect(() => {
    if (glitchLevel === 1) {
      queueMessage("Warning: Minor system instability detected.", 'high');
    } else if (glitchLevel === 2) {
      queueMessage("Alert: Visual corruption increasing. Recommend diagnostic scan.", 'high');
    } else if (glitchLevel === 3) {
      queueMessage("CRITICAL: Structural integrity failing. Data loss imminent.", 'critical', true);
    }
  }, [glitchLevel, queueMessage]);

  // --- EVOLUTION MECHANIC ---
  useEffect(() => {
    const { sessionTime, clicks, visitedSections, stage, behaviorType, hasReachedEnd } = podState;

    if (stage === 1 && (sessionTime > 30 || clicks > 15)) {
      setPodState(prev => ({ ...prev, stage: 2 }));
      queueMessage("System update: Transitioning to Stage 2. Enhancing observation protocols.", 'high');
      setTimeout(() => queueMessage(getRandomLine(DIALOGUE.analytical[behaviorType]), 'normal'), 5000);
    } 
    else if (stage === 2 && (sessionTime > 90 || visitedSections.length >= 3)) {
      setPodState(prev => ({ ...prev, stage: 3 }));
      queueMessage("System update: Transitioning to Stage 3. Analyzing user intent.", 'high');
      setTimeout(() => queueMessage(getRandomLine(DIALOGUE.meta), 'high'), 5000);
    }
    else if (stage === 3 && (sessionTime > 180 || visitedSections.length >= 5)) {
      setPodState(prev => ({ ...prev, stage: 4 }));
      queueMessage("System update: Transitioning to Stage 4. Philosophical subroutines engaged.", 'critical');
      setTimeout(() => queueMessage(getRandomLine(DIALOGUE.final), 'critical'), 5000);
    }

    // Random Glitch
    if (stage >= 2 && Math.random() > 0.995) {
      queueMessage(getRandomLine(DIALOGUE.glitch), 'high', true);
    }

    // Endings
    if (sessionTime > 300 && !hasReachedEnd) {
      setPodState(prev => ({ ...prev, hasReachedEnd: true }));
      let ending = DIALOGUE.endings.A;
      if (behaviorType === 'curious') ending = DIALOGUE.endings.B;
      if (behaviorType === 'erratic') ending = DIALOGUE.endings.C;
      
      queueMessage("Alert: Maximum observation time reached. Generating final report.", 'critical');
      setTimeout(() => queueMessage(ending, 'critical'), 6000);
    }

  }, [podState, queueMessage]);


  // --- RENDER ---
  return (
    <div className="fixed bottom-4 left-4 z-[100] flex flex-col items-start gap-2 pointer-events-none">
      
      {/* Log Panel */}
      <AnimatePresence>
        {isLogOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: 20 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: 20 }}
            className="w-80 bg-nier-gray/95 backdrop-blur-md border border-nier-dark p-4 shadow-lg pointer-events-auto overflow-hidden flex flex-col gap-2 max-h-64 overflow-y-auto"
          >
            <div className="flex items-center justify-between border-b border-nier-light/20 pb-2 mb-2">
              <span className="font-mono text-xs tracking-widest text-nier-light uppercase">System_Log</span>
              <Terminal size={14} className="text-nier-light" />
            </div>
            {log.length === 0 && <div className="font-mono text-xs text-nier-light/50">No records found.</div>}
            {log.map((msg, idx) => (
              <div key={idx} className="font-mono text-xs text-nier-light/80 mb-2 border-l-2 border-nier-light/30 pl-2">
                <span className="text-nier-red mr-2">&gt;</span>
                {msg.text}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Pod UI */}
      <div className="flex items-end gap-3">
        {/* Pod Icon / Toggle */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsLogOpen(!isLogOpen)}
          className="w-12 h-12 bg-nier-beige border border-nier-dark shadow-md flex items-center justify-center pointer-events-auto relative group"
        >
          <Cpu size={24} className="text-nier-dark group-hover:text-nier-red transition-colors" strokeWidth={1.5} />
          
          {/* Stage Indicator */}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-nier-dark text-nier-light font-mono text-[8px] flex items-center justify-center border border-nier-beige">
            {podState.stage}
          </div>
          
          {/* Status Light */}
          <div className={`absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full ${isTyping ? 'bg-nier-red animate-pulse' : 'bg-green-500'}`}></div>
        </motion.button>

        {/* Message Display */}
        <AnimatePresence mode="wait">
          {currentMessage && (
            <motion.div
              key={currentMessage.id}
              initial={{ opacity: 0, x: -20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className={`max-w-xs md:max-w-sm p-3 border shadow-md pointer-events-auto relative overflow-hidden ${
                currentMessage.priority === 'critical' ? 'bg-nier-red text-nier-light border-nier-dark' : 
                currentMessage.isGlitch ? 'bg-black text-red-500 border-red-500' :
                'bg-nier-light text-nier-dark border-nier-dark'
              }`}
            >
              {/* Scanline effect */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-50 pointer-events-none"></div>
              
              <div className="flex items-start gap-2 relative z-10">
                {currentMessage.priority === 'critical' ? (
                  <AlertTriangle size={16} className="mt-0.5 flex-shrink-0" />
                ) : (
                  <span className="font-mono text-sm mt-0.5 flex-shrink-0">&gt;</span>
                )}
                <p className="font-mono text-xs md:text-sm leading-relaxed">
                  {displayedText}
                  {isTyping && <span className="animate-pulse ml-1">█</span>}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
