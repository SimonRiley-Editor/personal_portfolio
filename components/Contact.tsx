"use client";

import React from 'react';
import { motion } from 'motion/react';

export default function Contact() {
  return (
    <section id="contact" className="bg-nier-gray py-20 pb-32 px-4 min-h-screen flex flex-col items-center justify-center relative overflow-hidden border-t border-nier-dark">
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
        <div className="nier-box p-6 md:p-8 relative bg-nier-beige">
          <form className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <label className="block font-mono text-xs tracking-widest mb-2 text-nier-dark uppercase">Identifier</label>
                <input 
                  type="text" 
                  className="w-full bg-nier-light/50 border border-nier-dark/50 p-3 focus:outline-none focus:border-nier-red transition-colors font-mono text-sm text-nier-dark"
                  placeholder="[ NAME ]"
                />
              </div>
              <div className="flex-1">
                <label className="block font-mono text-xs tracking-widest mb-2 text-nier-dark uppercase">Comm_Channel</label>
                <input 
                  type="email" 
                  className="w-full bg-nier-light/50 border border-nier-dark/50 p-3 focus:outline-none focus:border-nier-red transition-colors font-mono text-sm text-nier-dark"
                  placeholder="[ EMAIL ]"
                />
              </div>
            </div>
            
            <div>
              <label className="block font-mono text-xs tracking-widest mb-2 text-nier-dark uppercase">Payload</label>
              <textarea 
                rows={6}
                className="w-full bg-nier-light/50 border border-nier-dark/50 p-3 focus:outline-none focus:border-nier-red transition-colors resize-none font-mono text-sm text-nier-dark"
                placeholder="[ ENTER MESSAGE DATA ]"
              ></textarea>
            </div>

            <button 
              type="button"
              className="w-full bg-nier-dark text-nier-light border border-nier-dark py-4 font-mono text-sm tracking-widest uppercase hover:bg-nier-red transition-colors relative group overflow-hidden"
            >
              <span className="relative z-10">[ TRANSMIT ]</span>
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
          </form>

          {/* Decorative Elements */}
          <div className="absolute -right-4 -top-4 w-8 h-8 border-t border-r border-nier-dark"></div>
          <div className="absolute -left-4 -bottom-4 w-8 h-8 border-b border-l border-nier-dark"></div>
        </div>
      </div>
    </section>
  );
}
