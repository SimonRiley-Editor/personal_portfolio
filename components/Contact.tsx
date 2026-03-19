"use client";

import React from 'react';
import { motion } from 'motion/react';

export default function Contact() {
  return (
    <section id="contact" className="bg-[#ffda59] py-20 px-4 min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated Background Waves */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-10 flex flex-col justify-evenly">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="w-[200%] h-4 border-t-4 border-black border-dashed"
            animate={{ x: i % 2 === 0 ? ['0%', '-50%'] : ['-50%', '0%'] }}
            transition={{ duration: 15 + i * 2, repeat: Infinity, ease: "linear" }}
            style={{ transform: `rotate(${i % 2 === 0 ? 2 : -2}deg)` }}
          />
        ))}
      </div>

      <h2 className="font-display text-5xl md:text-9xl font-black tracking-tighter uppercase mb-12 text-center relative z-10">
        LET&apos;S TALK!
      </h2>

      <div className="w-full max-w-2xl relative z-10">
        {/* Envelope Flap Top */}
        <div className="absolute -top-10 left-0 w-full h-20 bg-white border-4 border-black rounded-t-3xl -z-10"></div>
        
        {/* Form Container */}
        <div className="bg-white border-4 border-black rounded-3xl p-6 md:p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative">
          <form className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <label className="block font-medium mb-2">Name</label>
                <input 
                  type="text" 
                  className="w-full border-4 border-black rounded-xl p-3 focus:outline-none focus:bg-gray-50 transition-colors"
                />
              </div>
              <div className="flex-1">
                <label className="block font-medium mb-2">Email Address</label>
                <input 
                  type="email" 
                  className="w-full border-4 border-black rounded-xl p-3 focus:outline-none focus:bg-gray-50 transition-colors"
                />
              </div>
            </div>
            
            <div>
              <label className="block font-medium mb-2">What&apos;s up?</label>
              <textarea 
                rows={6}
                className="w-full border-4 border-black rounded-xl p-3 focus:outline-none focus:bg-gray-50 transition-colors resize-none"
                placeholder="Tell me about your project..."
              ></textarea>
            </div>

            <button 
              type="button"
              className="w-full bg-[#69f0ae] border-4 border-black rounded-xl py-4 font-display font-black text-xl uppercase hover:bg-[#5eead4] transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-y-1 hover:translate-x-1"
            >
              Send
            </button>
          </form>

          {/* Decorative Paper Plane */}
          <div className="absolute -right-16 top-1/2 transform -translate-y-1/2 animate-bounce hidden md:block">
            <svg width="120" height="120" viewBox="0 0 24 24" fill="#ff80ab" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 2L11 13" />
              <path d="M22 2L15 22L11 13L2 9L22 2Z" />
            </svg>
          </div>
        </div>

        {/* Envelope Bottom Flaps */}
        <div className="absolute -bottom-4 left-0 w-full h-12 bg-white border-t-4 border-black -z-10 flex">
           <div className="w-1/2 h-full border-r-2 border-black transform skew-x-12"></div>
           <div className="w-1/2 h-full border-l-2 border-black transform -skew-x-12"></div>
        </div>
      </div>
    </section>
  );
}
