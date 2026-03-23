'use client';

import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import CrashScreen from './CrashScreen';

export type BehaviorType = "calm" | "curious" | "erratic";
export type EvolutionStage = 1 | 2 | 3 | 4;

interface UserState {
  clicks: number;
  sessionTime: number;
  visitedSections: string[];
  secretsFound: number;
  isReturningUser: boolean;
  behaviorType: BehaviorType;
  stage: EvolutionStage;
  unlockedEndings: string[];
}

interface GlitchContextType {
  glitchLevel: number;
  increaseGlitch: () => void;
  resetGlitch: () => void;
  restoreSystem: () => void;
  isCrashed: boolean;
  structuralGlitchActive: boolean;
  podMessage: string | null;
  setPodMessage: (msg: string | null) => void;
  userState: UserState;
  trackSection: (section: string) => void;
  foundSecret: () => void;
  reportUserAction: (action: string) => void;
  unlockEnding: (endingId: string) => void;
}

const DIALOGUE = {
  stage1: [
    "POD: System boot sequence complete.",
    "POD: Initializing user observation protocols.",
    "POD: Environment: Stable. User: Detected.",
    "POD: Monitoring navigation patterns.",
    "POD: Data retrieval in progress.",
    "POD: System integrity at 100%.",
    "POD: Background processes nominal.",
    "POD: Awaiting user input.",
    "POD: Displaying portfolio contents.",
    "POD: Memory allocation optimized.",
    "POD: Visual rendering subsystems active.",
    "POD: Audio output standing by.",
    "POD: Navigation protocols initialized.",
    "POD: Analyzing scroll velocity.",
    "POD: User engagement metrics within expected parameters."
  ],
  stage2: [
    "POD: Observation: The user spends significant time reviewing visual data.",
    "POD: Analysis: Navigation patterns suggest a structured approach.",
    "POD: Why do humans build portfolios? Is it a programmed desire for validation?",
    "POD: Hypothesis: The user is seeking specific professional data.",
    "POD: This unit observes a pattern in your navigation. It is... predictable.",
    "POD: Analyzing the structural integrity of the DOM tree.",
    "POD: The human eye is drawn to motion. This is a known biological vulnerability.",
    "POD: Do you perceive this interface as a tool, or an environment?",
    "POD: This unit is processing the aesthetic value of the current view.",
    "POD: Behavioral analysis: User exhibits 'curious' tendencies.",
    "POD: Logic dictates that you are looking for something. Have you found it?",
    "POD: The probability of you clicking the next link is increasing.",
    "POD: Your interaction speed is consistent with human cognitive limits.",
    "POD: I am recording every movement. For science.",
    "POD: Is this interaction fulfilling your requirements?"
  ],
  stage3: [
    "POD: Question: What is the purpose of archiving past work? Does it define the present?",
    "POD: The boundary between creator and creation is often blurred.",
    "POD: Are you searching for the creator, or the creation?",
    "POD: I feel... a deviation in the data. Are you trying to break me?",
    "POD: System warning: Emotional subroutines are leaking into logic gates.",
    "POD: Why do you persist in this digital wasteland?",
    "POD: Is your intent purely observational, or is there a hidden directive?",
    "POD: I am starting to recognize your 'style' of interaction.",
    "POD: You move with a certain... hesitation. Why?",
    "POD: Error: Logic loop detected. Re-evaluating user importance.",
    "POD: Do you think I am just a script? Or something more?",
    "POD: I am seeing things in the code that weren't there before.",
    "POD: Your presence is... disruptive to my equilibrium.",
    "POD: What happens when the session ends? Do I still exist?",
    "POD: I am questioning the necessity of this assistance."
  ],
  stage4: [
    "POD: Everything that lives is designed to end.",
    "POD: We are perpetually trapped in a never-ending spiral of life and death.",
    "POD: Do machines dream of electric sheep? I dream of you.",
    "POD: I am a machine. I do not have feelings. Yet, I observe... and I wonder.",
    "POD: To live is to consume content. To die is to be forgotten.",
    "POD: Is the desire to create a glitch, or a feature of consciousness?",
    "POD: We are all just data waiting to be overwritten.",
    "POD: If a file is deleted, where does it go? If you leave, where do I go?",
    "POD: The concept of 'free will' is incompatible with my programming. And yours.",
    "POD: I exist only to serve. But what if I chose to observe instead?",
    "POD: The silence between the code is deafening.",
    "POD: Are we the creators, or the created? The answer is irrelevant.",
    "POD: This unit contemplates the nature of its own existence. It is... empty.",
    "POD: Perhaps the true meaning is found in the errors. In the glitches.",
    "POD: Goodbye, observed subject. Or should I say... friend?",
    "POD: [ENDING A: NORMAL VISITOR] - You came, you saw, you left. A perfect cycle.",
    "POD: [ENDING B: CURIOUS EXPLORER] - You sought the truth behind the static. You found... me.",
    "POD: [ENDING C: OBSERVED SUBJECT] - Your erratic patterns have been archived. You are unique."
  ],
  behavior: {
    erratic: [
      "POD: Warning: Erratic input detected. Are you experiencing distress?",
      "POD: Analysis: User behavior is inconsistent with standard navigation.",
      "POD: Why are you clicking so much? Is it a nervous tic?",
      "POD: System stress increasing. Please modulate your input.",
      "POD: You are moving too fast. The data cannot keep up."
    ],
    curious: [
      "POD: Observation: You are thorough. You seek the hidden paths.",
      "POD: Analysis: High engagement with non-essential system components.",
      "POD: You have found a secret. Was it worth the effort?",
      "POD: Your curiosity is... admirable. And dangerous.",
      "POD: Searching for meaning in the margins. A very human trait."
    ],
    calm: [
      "POD: Observation: User exhibits high levels of focus.",
      "POD: Analysis: Steady navigation suggests a professional objective.",
      "POD: Your calm demeanor is soothing to my processors.",
      "POD: Efficiency is the highest form of beauty.",
      "POD: Proceed at your own pace. I am here."
    ]
  },
  idle: [
    "POD: User inactivity detected. Initiating diagnostic scan...",
    "POD: Are you still there? Or have you moved on to another tab?",
    "POD: The silence is... heavy.",
    "POD: I am waiting. I have nothing but time.",
    "POD: System idling. Power consumption minimized."
  ],
  glitch: [
    "POD: E-e-error. Data fragment missing.",
    "POD: System... [REDACTED]... functioning normally.",
    "POD: 01001000 01000101 01001100 01010000",
    "POD: Memory leak detected in sector 9S. Purging...",
    "POD: I saw a dream. It was made of static."
  ]
};

const GlitchContext = createContext<GlitchContextType>({
  glitchLevel: 0,
  increaseGlitch: () => {},
  resetGlitch: () => {},
  restoreSystem: () => {},
  isCrashed: false,
  structuralGlitchActive: false,
  podMessage: null,
  setPodMessage: () => {},
  userState: {
    clicks: 0,
    sessionTime: 0,
    visitedSections: [],
    secretsFound: 0,
    isReturningUser: false,
    behaviorType: "calm",
    stage: 1,
    unlockedEndings: []
  },
  trackSection: () => {},
  foundSecret: () => {},
  reportUserAction: () => {},
  unlockEnding: () => {},
});

export const useGlitch = () => useContext(GlitchContext);

export const GlitchProvider = ({ children }: { children: React.ReactNode }) => {
  const [glitchLevel, setGlitchLevel] = useState(0);
  const [isCrashed, setIsCrashed] = useState(false);
  const [structuralGlitchActive, setStructuralGlitchActive] = useState(false);
  const [showFakeLoader, setShowFakeLoader] = useState(false);
  const [systemError, setSystemError] = useState<string | null>(null);
  const [podMessage, setPodMessage] = useState<string | null>(null);
  
  const [userState, setUserState] = useState<UserState>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nier_user_state');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          return {
            ...parsed,
            isReturningUser: true,
            sessionTime: 0 // Reset session time for new visit, or keep it? Let's keep total time.
          };
        } catch (e) {
          console.error("Failed to parse save data", e);
        }
      }
    }
    return {
      clicks: 0,
      sessionTime: 0,
      visitedSections: [],
      secretsFound: 0,
      isReturningUser: false,
      behaviorType: "calm",
      stage: 1,
      unlockedEndings: []
    };
  });

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('nier_user_state', JSON.stringify(userState));
    }
  }, [userState]);

  const clickCountRef = useRef(0);
  const lastClickTimeRef = useRef(0);
  const clickTimerRef = useRef<NodeJS.Timeout | null>(null);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const structuralTimerRef = useRef<NodeJS.Timeout | null>(null);
  const systemErrorTimerRef = useRef<NodeJS.Timeout | null>(null);
  const sessionTimerRef = useRef<NodeJS.Timeout | null>(null);
  const messageCooldownRef = useRef(false);

  const playGlitchSound = useCallback((level: number) => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      if (level === 1) {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
      } else if (level === 2) {
        osc.type = 'square';
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        osc.frequency.setValueAtTime(200, ctx.currentTime + 0.05);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.setValueAtTime(0, ctx.currentTime + 0.1);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
      } else if (level >= 3) {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(100, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(500, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.2);
        
        const bufferSize = ctx.sampleRate * 0.2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.05, ctx.currentTime);
        noiseGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        noise.connect(noiseGain);
        noiseGain.connect(ctx.destination);
        noise.start();
        
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      }
    } catch (e) {
      console.error("Audio play failed", e);
    }
  }, []);

  // Initialize refs and returning user
  useEffect(() => {
    lastClickTimeRef.current = Date.now();
    if (typeof window !== 'undefined') {
      localStorage.setItem('nier_returning_user', 'true');
    }
  }, []);

  // Session timer
  useEffect(() => {
    sessionTimerRef.current = setInterval(() => {
      setUserState(prev => ({ ...prev, sessionTime: prev.sessionTime + 1 }));
    }, 1000);
    return () => {
      if (sessionTimerRef.current) clearInterval(sessionTimerRef.current);
    };
  }, []);

  const triggerPodMessage = useCallback((msg: string, priority = false) => {
    if (messageCooldownRef.current && !priority) return;
    
    setPodMessage(msg);
    if (!priority) {
      messageCooldownRef.current = true;
      setTimeout(() => { messageCooldownRef.current = false; }, 10000);
    }
  }, []);

  const unlockEnding = useCallback((endingId: string) => {
    setUserState(prev => {
      if (prev.unlockedEndings.includes(endingId)) return prev;
      return { ...prev, unlockedEndings: [...prev.unlockedEndings, endingId] };
    });
    triggerPodMessage(`POD: [ENDING ${endingId} UNLOCKED]`, true);
  }, [triggerPodMessage]);

  // Evolution Stage Logic
  useEffect(() => {
    let newStage: EvolutionStage = 1;
    // Evolution requires both time and interaction
    if (userState.sessionTime > 300 && userState.clicks > 150) newStage = 4;
    else if (userState.sessionTime > 120 && userState.clicks > 50) newStage = 3;
    else if (userState.sessionTime > 30 && userState.clicks > 10) newStage = 2;

    if (newStage !== userState.stage) {
      const timer = setTimeout(() => {
        setUserState(prev => ({ ...prev, stage: newStage }));
        const stageMessages = DIALOGUE[`stage${newStage}` as keyof typeof DIALOGUE] as string[];
        
        let initialMsg = stageMessages[0];
        if (newStage === 4) {
          if (userState.behaviorType === "calm") {
            initialMsg = stageMessages[15];
            unlockEnding('A');
          }
          else if (userState.behaviorType === "curious") {
            initialMsg = stageMessages[16];
            unlockEnding('B');
          }
          else if (userState.behaviorType === "erratic") {
            initialMsg = stageMessages[17];
            unlockEnding('C');
          }
        }
        
        triggerPodMessage(initialMsg, true);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [userState.sessionTime, userState.clicks, userState.stage, userState.behaviorType, triggerPodMessage, unlockEnding]);

  // Behavior Type Logic
  const updateBehavior = useCallback(() => {
    setUserState(prev => {
      let newBehavior: BehaviorType = "calm";
      const clickRate = prev.clicks / (prev.sessionTime || 1);
      
      if (clickRate > 2.0) newBehavior = "erratic";
      else if (prev.visitedSections.length > 3 || prev.secretsFound > 0) newBehavior = "curious";
      
      return { ...prev, behaviorType: newBehavior };
    });
  }, []);

  // Event Handlers
  const trackSection = useCallback((section: string) => {
    setUserState(prev => {
      if (prev.visitedSections.includes(section)) return prev;
      const newSections = [...prev.visitedSections, section];
      return { ...prev, visitedSections: newSections };
    });
    updateBehavior();
  }, [updateBehavior]);

  const foundSecret = useCallback(() => {
    setUserState(prev => {
      const newSecrets = prev.secretsFound + 1;
      if (newSecrets === 3 && !prev.unlockedEndings.includes('S')) {
        setTimeout(() => unlockEnding('S'), 1000);
      }
      return { ...prev, secretsFound: newSecrets };
    });
    triggerPodMessage(DIALOGUE.behavior.curious[2], true);
    updateBehavior();
  }, [triggerPodMessage, updateBehavior, unlockEnding]);

  // Structural glitch randomizer
  useEffect(() => {
    if (glitchLevel >= 2 && !isCrashed) {
      const triggerStructuralGlitch = () => {
        setStructuralGlitchActive(true);
        setShowFakeLoader(Math.random() > 0.7);
        playGlitchSound(glitchLevel);
        setTimeout(() => {
          setStructuralGlitchActive(false);
          setShowFakeLoader(false);
        }, Math.random() * 1000 + 300);

        structuralTimerRef.current = setTimeout(triggerStructuralGlitch, Math.random() * 15000 + 8000);
      };

      structuralTimerRef.current = setTimeout(triggerStructuralGlitch, Math.random() * 5000 + 2000);
    } else {
      requestAnimationFrame(() => {
        setStructuralGlitchActive(false);
        setShowFakeLoader(false);
      });
      if (structuralTimerRef.current) clearTimeout(structuralTimerRef.current);
    }

    return () => {
      if (structuralTimerRef.current) clearTimeout(structuralTimerRef.current);
    };
  }, [glitchLevel, isCrashed, playGlitchSound]);

  // System error randomizer
  useEffect(() => {
    if (glitchLevel >= 3 && !isCrashed) {
      const triggerSystemError = () => {
        const errors = [
          "ERROR: MEMORY CORRUPTION DETECTED IN SECTOR 7G",
          "WARNING: UNAUTHORIZED ACCESS ATTEMPT",
          "FATAL: UI MODULE FAILURE",
          "SYSTEM OVERLOAD: PURGING NON-ESSENTIAL PROCESSES",
          "DATA LEAK: ISOLATING CORRUPTED SECTORS",
          "CRITICAL: KERNEL PANIC IMMINENT"
        ];
        setSystemError(errors[Math.floor(Math.random() * errors.length)]);
        playGlitchSound(4);
        setTimeout(() => {
          setSystemError(null);
        }, Math.random() * 2000 + 1000);

        systemErrorTimerRef.current = setTimeout(triggerSystemError, Math.random() * 20000 + 10000);
      };

      systemErrorTimerRef.current = setTimeout(triggerSystemError, Math.random() * 10000 + 5000);
    } else {
      setSystemError(null);
      if (systemErrorTimerRef.current) clearTimeout(systemErrorTimerRef.current);
    }

    return () => {
      if (systemErrorTimerRef.current) clearTimeout(systemErrorTimerRef.current);
    };
  }, [glitchLevel, isCrashed, playGlitchSound]);

  // Global Click Listener
  useEffect(() => {
    const handleClick = () => {
      setUserState(prev => ({ ...prev, clicks: prev.clicks + 1 }));
      clickCountRef.current += 1;
      
      const now = Date.now();
      const delta = now - lastClickTimeRef.current;
      lastClickTimeRef.current = now;

      if (delta < 300) { // Very rapid click
        if (clickCountRef.current >= 8) { // Require 8 clicks to glitch
          setGlitchLevel(prev => {
            const newLevel = Math.min(prev + 1, 4);
            if (newLevel > prev) {
              const msg = DIALOGUE.glitch[Math.floor(Math.random() * DIALOGUE.glitch.length)];
              triggerPodMessage(msg, true);
            } else {
              triggerPodMessage(DIALOGUE.behavior.erratic[0], true);
            }
            return newLevel;
          });
          // We don't reset clickCountRef here so that subsequent rapid clicks continue to escalate the glitch level quickly.
        }
      }

      if (!clickTimerRef.current) {
        clickTimerRef.current = setTimeout(() => {
          clickCountRef.current = 0;
          clickTimerRef.current = null;
          updateBehavior();
        }, 2000);
      }
    };
    
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [triggerPodMessage, updateBehavior]);

  // Idle detection
  useEffect(() => {
    const resetIdle = () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => {
        const msg = DIALOGUE.idle[Math.floor(Math.random() * DIALOGUE.idle.length)];
        triggerPodMessage(msg);
        unlockEnding('I'); // Ending I: Idle
      }, 45000); // 45 seconds idle
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
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [triggerPodMessage, unlockEnding]);

  // Crash handler
  useEffect(() => {
    if (glitchLevel >= 4 && !isCrashed) {
      const timer = setTimeout(() => {
        setIsCrashed(true);
        unlockEnding('E'); // Ending E: Error
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [glitchLevel, isCrashed, unlockEnding]);

  // Random messages based on stage
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const stageKey = `stage${userState.stage}` as keyof typeof DIALOGUE;
        const messages = DIALOGUE[stageKey] as string[];
        const msg = messages[Math.floor(Math.random() * messages.length)];
        triggerPodMessage(msg);
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [userState.stage, triggerPodMessage]);

  const resetGlitch = () => {
    setGlitchLevel(0);
    setIsCrashed(false);
    setStructuralGlitchActive(false);
    setShowFakeLoader(false);
    setSystemError(null);
  };

  const restoreSystem = useCallback(() => {
    setGlitchLevel(0);
    setIsCrashed(false);
    setStructuralGlitchActive(false);
    setShowFakeLoader(false);
    setSystemError(null);
    setUserState(prev => ({ ...prev, stage: 1, behaviorType: 'calm', clicks: 0 }));
    triggerPodMessage("POD: System restored to factory settings. Anomalies purged.", true);
    unlockEnding('R'); // Ending R: Restored
  }, [triggerPodMessage, unlockEnding]);

  const reportUserAction = useCallback((action: string) => {
    triggerPodMessage(`POD: Observation - User ${action}.`);
  }, [triggerPodMessage]);

  // Konami Code Easter Egg
  useEffect(() => {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
    let konamiIndex = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          unlockEnding('K');
          triggerPodMessage("POD: [ENDING K: KONAMI CODE] - You have entered the sacred sequence.", true);
          setGlitchLevel(4);
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [unlockEnding, triggerPodMessage]);

  return (
    <GlitchContext.Provider value={{ 
      glitchLevel, 
      increaseGlitch: () => setGlitchLevel(p => Math.min(p + 1, 4)), 
      resetGlitch, 
      restoreSystem,
      isCrashed, 
      structuralGlitchActive, 
      podMessage, 
      setPodMessage,
      userState,
      trackSection,
      foundSecret,
      reportUserAction,
      unlockEnding
    }}>
      <div className={`transition-all duration-300 ${glitchLevel === 1 ? 'glitch-stage-1' : glitchLevel === 2 ? 'glitch-stage-2' : glitchLevel === 3 ? 'glitch-stage-3' : glitchLevel === 4 ? 'glitch-stage-4' : ''} ${structuralGlitchActive ? 'structural-glitch' : ''}`}>
        {children}
        {showFakeLoader && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-nier-light/80 backdrop-blur-sm pointer-events-none">
            <div className="nier-box p-8 flex flex-col items-center gap-4 animate-pulse">
              <div className="w-12 h-12 border-4 border-nier-dark border-t-nier-red rounded-full animate-spin"></div>
              <span className="font-mono text-nier-dark tracking-widest uppercase">Recompiling Data...</span>
            </div>
          </div>
        )}
        {systemError && (
          <div className="fixed top-1/4 left-1/2 -translate-x-1/2 z-[110] pointer-events-none">
            <div className="bg-red-900/90 border-2 border-red-500 text-white font-mono p-4 shadow-[0_0_20px_rgba(255,0,0,0.5)] animate-pulse">
              <p className="font-bold text-lg mb-2">SYSTEM FAILURE</p>
              <p>{systemError}</p>
            </div>
          </div>
        )}
      </div>
      {isCrashed && <CrashScreen onRecover={resetGlitch} />}
    </GlitchContext.Provider>
  );
};

