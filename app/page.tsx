'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AboutMe from '@/components/AboutMe';
import Experience from '@/components/Experience';
import Services from '@/components/Services';
import Awards from '@/components/Awards';
import Work from '@/components/Work';
import Contact from '@/components/Contact';
import Loader from '@/components/Loader';
import SectionWrapper from '@/components/SectionWrapper';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    console.log("%c[SYSTEM MESSAGE]", "color: #8b0000; font-weight: bold; font-size: 16px;");
    console.log("%cThere is a secret hidden in the logo. Click it 10 times.", "color: #4a4843; font-family: monospace;");
    console.log("%cAlso, try the Konami code.", "color: #4a4843; font-family: monospace;");
  }, []);

  return (
    <main className="min-h-screen bg-white selection:bg-black selection:text-white relative">
      <Loader onComplete={() => setIsLoaded(true)} />
      <Navbar isLoaded={isLoaded} />
      
      <SectionWrapper index={1}>
        <Hero isLoaded={isLoaded} />
      </SectionWrapper>
      
      <SectionWrapper index={2}>
        <AboutMe />
      </SectionWrapper>
      
      {/* 
        The rest of the sections scroll normally. 
        We wrap them in a relative container with a higher z-index 
        so they slide over the sticky sections above.
      */}
      <div className="relative z-10 bg-white shadow-[0_-20px_50px_rgba(0,0,0,0.3)]">
        <Experience />
        <Services />
        <Awards />
        <Work />
        <Contact />
      </div>
    </main>
  );
}
