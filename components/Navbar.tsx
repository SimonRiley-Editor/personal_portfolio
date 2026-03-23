'use client';

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useGlitch } from './GlitchContext';

interface NavbarProps {
  isLoaded?: boolean;
}

export default function Navbar({ isLoaded = true }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { reportUserAction } = useGlitch();

  const handleNavClick = (label: string) => {
    reportUserAction(`is navigating to the ${label} section`);
    setIsOpen(false);
  };

  const navLinks = [
    { href: '#about', label: 'About Me' },
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
      <nav className="hidden md:flex bg-nier-light/90 backdrop-blur-sm border border-nier-dark px-6 py-2 items-center gap-6 shadow-sm pointer-events-auto">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} onClick={() => handleNavClick(link.label)} className="font-mono text-xs tracking-widest uppercase text-nier-dark hover:text-nier-red hover:bg-nier-dark/5 px-4 py-2 transition-colors whitespace-nowrap relative group">
            <span className="relative z-10">{link.label}</span>
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-nier-red scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
          </a>
        ))}
      </nav>

      {/* Mobile Nav Toggle */}
      <div className="md:hidden flex justify-end w-full pointer-events-auto">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="bg-nier-light border border-nier-dark p-3 shadow-sm z-50 relative text-nier-dark hover:bg-nier-dark/5 transition-colors"
        >
          {isOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 left-4 right-4 bg-nier-light border border-nier-dark p-6 shadow-md pointer-events-auto md:hidden flex flex-col gap-2"
          >
            {navLinks.map((link) => (
              <a 
                key={link.href} 
                href={link.href} 
                onClick={() => handleNavClick(link.label)}
                className="font-mono text-sm tracking-widest uppercase text-nier-dark hover:text-nier-red hover:bg-nier-dark/5 px-4 py-4 transition-colors text-center border-b border-nier-dark/20 last:border-b-0"
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
