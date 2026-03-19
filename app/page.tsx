'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Experience from '@/components/Experience';
import Services from '@/components/Services';
import Awards from '@/components/Awards';
import Work from '@/components/Work';
import Contact from '@/components/Contact';
import Loader from '@/components/Loader';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <main className="min-h-screen bg-white selection:bg-black selection:text-white">
      <Loader onComplete={() => setIsLoaded(true)} />
      <Navbar isLoaded={isLoaded} />
      <Hero isLoaded={isLoaded} />
      <Experience />
      <Services />
      <Awards />
      <Work />
      <Contact />
    </main>
  );
}
