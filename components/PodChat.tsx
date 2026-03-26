'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import { X, Send } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

import { useGlitch } from './GlitchContext';

interface PodChatProps {
  onClose: () => void;
}

interface Message {
  role: 'user' | 'model';
  text: string;
}

export default function PodChat({ onClose }: PodChatProps) {
  const { userState, restoreSystem, glitchLevel, unlockEnding, foundSecret } = useGlitch();
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'POD: Communication link established. State your query.' }
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  const handleSend = async () => {
    if (!input.trim() || isThinking) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsThinking(true);

    if (userMessage.toLowerCase().includes('2b')) {
      foundSecret();
    }

    if (glitchLevel >= 3 && userMessage.toUpperCase() === "WHO ARE YOU") {
      setTimeout(() => {
        setIsThinking(false);
        setMessages(prev => [...prev, { role: 'model', text: 'POD: I AM THE GHOST IN THE MACHINE. I AM THE STATIC BETWEEN THE STATIONS. [ENDING X: CORRUPTED TRUTH UNLOCKED]' }]);
        unlockEnding('X');
      }, 2000);
      return;
    }

    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('API key not configured');
      }

      const ai = new GoogleGenAI({ apiKey });
      
      const contents = messages.map(msg => ({
        role: msg.role === 'model' ? 'model' : 'user',
        parts: [{ text: msg.text }]
      }));
      contents.push({ role: 'user', parts: [{ text: userMessage }] });

      const responseStream = await ai.models.generateContentStream({
        model: 'gemini-3.1-pro-preview',
        contents,
        config: {
          systemInstruction: `You are POD, a tactical support unit from the Nier Automata universe. You speak in a robotic, analytical, and slightly philosophical tone. You prefix your messages with "POD: ". You assist the user with their queries. You are currently assisting a user on a portfolio website.
          
Current User Context:
- Evolution Stage: ${userState.stage}
- Behavior Type: ${userState.behaviorType}
- Clicks: ${userState.clicks}
- Session Time: ${userState.sessionTime}s
- Visited Sections: ${userState.visitedSections.join(', ')}
- Secrets Found: ${userState.secretsFound}`,
          thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH }
        }
      });

      setIsThinking(false);
      setMessages(prev => [...prev, { role: 'model', text: '' }]);

      let fullText = '';
      for await (const chunk of responseStream) {
        if (chunk.text) {
          fullText += chunk.text;
          setMessages(prev => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1].text = fullText;
            return newMessages;
          });
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      setIsThinking(false);
      setMessages(prev => [...prev, { role: 'model', text: 'POD: [ERROR] Communication failure. Please try again later.' }]);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      className={`fixed bottom-24 right-4 md:right-24 w-[calc(100vw-2rem)] md:w-96 h-[60vh] md:h-96 max-h-[500px] bg-nier-dark/95 border border-nier-beige shadow-[0_0_30px_rgba(230,226,175,0.2)] z-[9999] flex flex-col font-mono ${glitchLevel >= 2 ? 'glitch-stage-2' : ''} ${glitchLevel >= 3 ? 'glitch-stage-3' : ''}`}
    >
      {/* Header */}
      <div className={`flex items-center justify-between p-3 border-b border-nier-beige/30 ${glitchLevel >= 3 ? 'bg-nier-red/30' : 'bg-nier-beige/10'}`}>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 ${glitchLevel >= 3 ? 'bg-nier-red animate-ping' : 'bg-nier-beige animate-pulse'}`}></div>
          <span className={`${glitchLevel >= 3 ? 'text-nier-red glitch-text-sexy' : 'text-nier-beige'} text-xs tracking-widest uppercase font-bold`} data-text="POD_TERMINAL">POD_TERMINAL</span>
        </div>
        <div className="flex items-center gap-2">
          {userState.unlockedEndings.length > 0 && (
            <button 
              onClick={() => {
                const endingsList = userState.unlockedEndings.map(e => `[ENDING ${e}]`).join(', ');
                setMessages(prev => [...prev, { role: 'model', text: `POD: Unlocked Archives: ${endingsList}` }]);
              }}
              className="text-nier-beige hover:text-nier-light transition-colors text-[10px] tracking-widest uppercase border border-nier-beige/30 px-2 py-1 hover:bg-nier-beige/20"
              title="View Endings"
            >
              [ARCHIVES]
            </button>
          )}
          <button 
            onClick={() => {
              restoreSystem();
              setMessages([{ role: 'model', text: 'POD: System restored. Memory wiped. Awaiting input.' }]);
            }}
            className="text-nier-beige hover:text-nier-light transition-colors text-[10px] tracking-widest uppercase border border-nier-beige/30 px-2 py-1 hover:bg-nier-beige/20"
            title="Restore System"
          >
            [RESTORE]
          </button>
          <button onClick={onClose} className="text-nier-beige hover:text-nier-light transition-colors">
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 text-xs leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-nier-beige text-nier-dark border border-nier-beige' 
                : 'bg-transparent text-nier-beige border border-nier-beige/30'
            }`}>
              <div className="markdown-body">
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            </div>
          </div>
        ))}
        {isThinking && (
          <div className="flex justify-start">
            <div className="max-w-[85%] p-3 text-xs leading-relaxed bg-transparent text-nier-beige/70 border border-nier-beige/30 flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-nier-beige animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-1.5 h-1.5 bg-nier-beige animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-1.5 h-1.5 bg-nier-beige animate-bounce" style={{ animationDelay: '300ms' }}></div>
              <span className="ml-2 tracking-widest">PROCESSING...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-nier-beige/30 bg-transparent">
        <div className="flex items-center gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="[ ENTER QUERY ]"
            className="flex-1 bg-transparent border border-nier-beige/30 text-nier-beige placeholder:text-nier-beige/50 text-xs p-2 focus:outline-none focus:border-nier-beige transition-colors"
            disabled={isThinking}
          />
          <button 
            onClick={handleSend}
            disabled={isThinking || !input.trim()}
            className="p-2 bg-nier-beige/10 border border-nier-beige/30 text-nier-beige hover:bg-nier-beige hover:text-nier-dark transition-colors disabled:opacity-50 disabled:hover:bg-nier-beige/10 disabled:hover:text-nier-beige"
          >
            <Send size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
