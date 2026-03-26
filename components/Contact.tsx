"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Youtube, Twitter, Heart } from 'lucide-react';
import { useGlitch } from './GlitchContext';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'transmitting' | 'success'>('idle');
  const [copied, setCopied] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const { trackSection, reportUserAction } = useGlitch();
  const formRef = useRef<HTMLFormElement>(null);

  const handleTransmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (status !== 'idle' || !formRef.current) return;
    
    setStatus('transmitting');
    
    emailjs.sendForm(
      'service_4jsa7ei',
      'template_j9yjgck',
      formRef.current,
      'fH9kZwRMt_gbhAhcW'
    ).then(
      () => {
        setStatus('success');
        setTimeout(() => {
          setStatus('idle');
          if (formRef.current) formRef.current.reset();
        }, 4000);
      },
      (error) => {
        console.error('EmailJS Error:', error.text);
        setStatus('idle');
        alert('Transmission failed. Please try again.');
      }
    );
  };

  return (
    <motion.section 
      id="contact" 
      className="bg-nier-beige py-20 pb-32 px-4 min-h-screen flex flex-col items-center justify-center relative overflow-hidden border-t border-nier-dark"
      onViewportEnter={() => {
        trackSection('Contact');
        reportUserAction('is accessing the communication terminal');
      }}
      viewport={{ once: true, margin: "-20%" }}
    >
      {/* Animated Background Waves */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-10 flex flex-col justify-evenly">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="w-[200%] h-[1px] bg-nier-dark"
            animate={{ x: i % 2 === 0 ? ['0%', '-50%'] : ['-50%', '0%'] }}
            transition={{ duration: 15 + i * 2, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </div>

      <div className="text-center mb-12 relative z-10">
        <h2 className="font-akira text-4xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase text-nier-dark">
          DATA_LINK
        </h2>
        <div className="flex items-center justify-center gap-4 mt-4">
          <div className="w-12 h-[1px] bg-nier-dark"></div>
          <span className="font-mono text-xs tracking-[0.3em] text-nier-dark/70 uppercase">Establish Connection</span>
          <div className="w-12 h-[1px] bg-nier-dark"></div>
        </div>
      </div>

      <div className="w-full max-w-2xl relative z-10">
        {/* Form Container */}
        <div className="nier-box p-6 md:p-8 relative bg-nier-light min-h-[400px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {status === 'idle' || status === 'transmitting' ? (
              <motion.form 
                ref={formRef}
                onSubmit={handleTransmit}
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, filter: 'blur(10px)', scale: 0.95 }}
                className="space-y-6"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <label className="block font-mono text-xs tracking-widest mb-2 text-nier-dark uppercase">Identifier</label>
                    <input 
                      type="text" 
                      name="user_name"
                      required
                      disabled={status === 'transmitting'}
                      className="w-full bg-nier-light/50 border border-nier-dark/50 p-3 focus:outline-none focus:border-nier-red transition-colors font-mono text-sm text-nier-dark placeholder:text-nier-dark/50 disabled:opacity-50"
                      placeholder="[ NAME ]"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block font-mono text-xs tracking-widest mb-2 text-nier-dark uppercase">Comm_Channel</label>
                    <input 
                      type="email" 
                      name="user_email"
                      required
                      disabled={status === 'transmitting'}
                      className="w-full bg-nier-light/50 border border-nier-dark/50 p-3 focus:outline-none focus:border-nier-red transition-colors font-mono text-sm text-nier-dark placeholder:text-nier-dark/50 disabled:opacity-50"
                      placeholder="[ EMAIL ]"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block font-mono text-xs tracking-widest mb-2 text-nier-dark uppercase">Payload</label>
                  <textarea 
                    name="message"
                    required
                    rows={6}
                    disabled={status === 'transmitting'}
                    className="w-full bg-nier-light/50 border border-nier-dark/50 p-3 focus:outline-none focus:border-nier-red transition-colors resize-none font-mono text-sm text-nier-dark placeholder:text-nier-dark/50 disabled:opacity-50"
                    placeholder="[ ENTER MESSAGE DATA ]"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  disabled={status === 'transmitting'}
                  className="w-full bg-nier-dark text-nier-light border border-nier-dark py-4 font-mono text-sm tracking-widest uppercase hover:bg-nier-red hover:text-white transition-colors relative group overflow-hidden disabled:hover:bg-nier-dark disabled:hover:text-nier-light"
                >
                  <span className="relative z-10">
                    {status === 'transmitting' ? '[ TRANSMITTING DATA... ]' : '[ TRANSMIT ]'}
                  </span>
                  {status === 'transmitting' && (
                    <motion.div 
                      className="absolute left-0 top-0 bottom-0 bg-nier-red z-0"
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 2, ease: "linear" }}
                    />
                  )}
                  {status === 'idle' && (
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-12 text-center h-full"
              >
                <div className="w-20 h-20 border border-nier-dark rounded-none flex items-center justify-center mb-8 relative">
                  <motion.div 
                    className="absolute inset-0 border-2 border-nier-red"
                    initial={{ scale: 1, opacity: 1 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                  />
                  <motion.div 
                    className="w-10 h-10 bg-nier-dark"
                    animate={{ rotate: [0, 90, 180, 270, 360] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2 h-2 bg-nier-light" />
                  </div>
                </div>
                <h3 className="font-akira text-2xl md:text-3xl text-nier-dark mb-4 tracking-widest">DATA RECEIVED</h3>
                <div className="w-full max-w-xs h-[1px] bg-nier-dark/30 mb-4 relative">
                  <motion.div 
                    className="absolute left-0 top-0 h-full bg-nier-red"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <p className="font-mono text-sm tracking-widest text-nier-dark/70 uppercase leading-relaxed">
                  Communication link established.<br/>
                  <span className="text-nier-red font-bold mt-2 block">Awaiting further instructions.</span>
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Decorative Elements */}
          <div className="absolute -right-4 -top-4 w-8 h-8 border-t border-r border-nier-dark"></div>
          <div className="absolute -left-4 -bottom-4 w-8 h-8 border-b border-l border-nier-dark"></div>
        </div>
      </div>

      {/* Social Links */}
      <div className="mt-32 w-full max-w-4xl relative z-10 flex flex-col items-center">
        <div className="flex items-center justify-center gap-4 mb-12 w-full">
          <div className="h-[1px] bg-nier-dark flex-1 opacity-30"></div>
          <span className="font-mono text-xs tracking-[0.5em] text-nier-dark uppercase">Network_Nodes</span>
          <div className="h-[1px] bg-nier-dark flex-1 opacity-30"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {/* Discord */}
          <motion.a
            href="javascript:void(0)"
            onClick={(e) => {
              e.preventDefault();
              navigator.clipboard.writeText('simon_kun');
              setCopied(true);
              setTimeout(() => setCopied(false), 3000);
            }}
            className="group relative border border-nier-dark bg-nier-light p-6 flex flex-col items-center justify-center overflow-hidden cursor-pointer"
            whileHover="hover"
            initial="initial"
          >
            <motion.div 
              className="absolute inset-0 bg-nier-dark origin-bottom"
              variants={{
                initial: { scaleY: 0 },
                hover: { scaleY: 1 }
              }}
              transition={{ duration: 0.3, ease: "circOut" }}
            />
            <div className="relative z-10 flex flex-col items-center gap-3 text-nier-dark group-hover:text-nier-light transition-colors duration-300">
              <MessageSquare size={32} strokeWidth={1.5} />
              <div className="text-center">
                <div className="font-akira text-sm tracking-widest mb-1">DISCORD</div>
                <div className="font-mono text-xs opacity-70 group-hover:opacity-100">
                  {copied ? <span className="text-green-400 font-bold">Username Copied successfully</span> : 'simon_kun'}
                </div>
              </div>
            </div>
            {/* Hover Glitch/Decorations */}
            <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-nier-dark group-hover:border-nier-light transition-colors"></div>
            <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-nier-dark group-hover:border-nier-light transition-colors"></div>
          </motion.a>

          {/* YouTube */}
          <motion.a
            href="https://www.youtube.com/@simongodly/videos"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative border border-nier-dark bg-nier-light p-6 flex flex-col items-center justify-center overflow-hidden cursor-pointer"
            whileHover="hover"
            initial="initial"
          >
            <motion.div 
              className="absolute inset-0 bg-nier-dark origin-bottom"
              variants={{
                initial: { scaleY: 0 },
                hover: { scaleY: 1 }
              }}
              transition={{ duration: 0.3, ease: "circOut" }}
            />
            <div className="relative z-10 flex flex-col items-center gap-3 text-nier-dark group-hover:text-nier-light transition-colors duration-300">
              <Youtube size={32} strokeWidth={1.5} />
              <div className="text-center">
                <div className="font-akira text-sm tracking-widest mb-1">YOUTUBE</div>
                <div className="font-mono text-xs opacity-70 group-hover:opacity-100">SimonGodly</div>
              </div>
            </div>
            <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-nier-dark group-hover:border-nier-light transition-colors"></div>
            <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-nier-dark group-hover:border-nier-light transition-colors"></div>
          </motion.a>

          {/* Twitter / X */}
          <motion.a
            href="https://x.com/Sim0nG0dly"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative border border-nier-dark bg-nier-light p-6 flex flex-col items-center justify-center overflow-hidden cursor-pointer"
            whileHover="hover"
            initial="initial"
          >
            <motion.div 
              className="absolute inset-0 bg-nier-dark origin-bottom"
              variants={{
                initial: { scaleY: 0 },
                hover: { scaleY: 1 }
              }}
              transition={{ duration: 0.3, ease: "circOut" }}
            />
            <div className="relative z-10 flex flex-col items-center gap-3 text-nier-dark group-hover:text-nier-light transition-colors duration-300">
              <Twitter size={32} strokeWidth={1.5} />
              <div className="text-center">
                <div className="font-akira text-sm tracking-widest mb-1">X / TWITTER</div>
                <div className="font-mono text-xs opacity-70 group-hover:opacity-100">@Sim0nG0dly</div>
              </div>
            </div>
            <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-nier-dark group-hover:border-nier-light transition-colors"></div>
            <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-nier-dark group-hover:border-nier-light transition-colors"></div>
          </motion.a>
        </div>
      </div>

      {/* Secret Graphic */}
      <div 
        className="absolute bottom-4 right-4 w-2 h-2 bg-nier-dark/20 hover:bg-nier-red cursor-pointer transition-colors z-50 rounded-full"
        onClick={() => setShowSecret(true)}
        title="?"
      />

      {/* Secret Message Modal */}
      <AnimatePresence>
        {showSecret && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-10 right-10 bg-nier-dark text-nier-light p-6 border border-nier-light/30 shadow-2xl z-[100] max-w-sm"
          >
            <div className="flex items-start gap-4">
              <Heart className="text-nier-red animate-pulse mt-1" size={24} />
              <div>
                <h4 className="font-akira text-sm tracking-widest mb-2">SECRET_DATA_FOUND</h4>
                <p className="font-mono text-xs leading-relaxed opacity-80">
                  Thx for visiting my site! I poured my heart into this design. Keep creating and stay awesome.
                </p>
                <button 
                  onClick={() => setShowSecret(false)}
                  className="mt-4 font-mono text-xs text-nier-red hover:text-white transition-colors uppercase tracking-widest"
                >
                  [ CLOSE ]
                </button>
              </div>
            </div>
            {/* Scanline overlay */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20 pointer-events-none"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
