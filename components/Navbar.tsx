'use client';

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  isLoaded?: boolean;
}

export default function Navbar({ isLoaded = true }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '#experience', label: 'Experience' },
    { href: '#services', label: 'Services' },
    { href: '#awards', label: 'Awards' },
    { href: '#work', label: 'Work' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <motion.div 
      initial={{ y: -100, opacity: 0 }}
      animate={isLoaded ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
      className="fixed top-4 left-0 w-full z-50 flex justify-center px-4 pointer-events-none"
    >
      {/* Desktop Nav */}
      <nav className="hidden md:flex bg-white border-4 border-black rounded-full px-6 py-3 items-center gap-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] pointer-events-auto">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} className="font-bold hover:bg-[#ffda59] px-4 py-1 rounded-full transition-colors whitespace-nowrap">
            {link.label}
          </a>
        ))}
      </nav>

      {/* Mobile Nav Toggle */}
      <div className="md:hidden flex justify-end w-full pointer-events-auto">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white border-4 border-black rounded-full p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-50 relative"
        >
          {isOpen ? <X size={24} strokeWidth={3} /> : <Menu size={24} strokeWidth={3} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-4 right-4 bg-white border-4 border-black rounded-3xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] pointer-events-auto md:hidden flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <a 
                key={link.href} 
                href={link.href} 
                onClick={() => setIsOpen(false)}
                className="font-bold text-2xl hover:bg-[#ffda59] px-4 py-3 rounded-xl transition-colors text-center border-2 border-transparent hover:border-black"
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
