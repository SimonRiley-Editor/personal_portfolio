'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Loader from '@/components/Loader';
import SectionWrapper from '@/components/SectionWrapper';

// Dynamically import components below the fold
const AboutMe = dynamic(() => import('@/components/AboutMe'), { ssr: true });
const Experience = dynamic(() => import('@/components/Experience'), { ssr: true });
const Services = dynamic(() => import('@/components/Services'), { ssr: true });
const Awards = dynamic(() => import('@/components/Awards'), { ssr: true });
const WorkSection = dynamic(() => import('@/components/work-section'), { ssr: true });
const Contact = dynamic(() => import('@/components/Contact'), { ssr: true });
const Presentation = dynamic(() => import('@/components/Presentation'), { ssr: true });

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    console.log("%c[SYSTEM MESSAGE]", "color: #8b0000; font-weight: bold; font-size: 16px;");
    console.log("%cThere is a secret hidden in the logo. Click it 10 times.", "color: #4a4843; font-family: monospace;");
    console.log("%cAlso, try the Konami code.", "color: #4a4843; font-family: monospace;");
  }, []);

  return (
    <main className="min-h-screen bg-nier-beige selection:bg-nier-dark selection:text-nier-light relative">
      <Loader onComplete={() => setIsLoaded(true)} />
      <Navbar isLoaded={isLoaded} />
      
      <SectionWrapper index={1}>
        <Hero isLoaded={isLoaded} />
      </SectionWrapper>
      
      <div id="about" className="w-full h-0" />
      <SectionWrapper index={2}>
        <AboutMe />
      </SectionWrapper>
      
      {/* 
        The rest of the sections scroll normally. 
        We wrap them in a relative container with a higher z-index 
        so they slide over the sticky sections above.
      */}
      <div className="relative z-10 bg-nier-beige shadow-[0_-20px_50px_rgba(0,0,0,0.3)]">
        <Presentation />
        <Experience />
        <Services />
        <Awards />
        <WorkSection />
        <Contact />
      </div>
    </main>
  );
}
