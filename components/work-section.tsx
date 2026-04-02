"use client";

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { useGlitch } from './GlitchContext';
import { useLanguage } from './LanguageContext';

const categories = [
  {
    id: 'amvs',
    nameKey: 'work.category_amvs',
    type: 'video',
    projects: [
      { id: 'o9FOYN3gMRQ', title: 'Project 01' },
      { id: 'TaGrFtPV7lU', title: 'Project 02' },
      { id: 'xT60m9aAR-Y', title: 'Project 03' },
      { id: 'z-VnFmpcrmU', title: 'Project 04' },
    ]
  },
  {
    id: 'content-creators',
    nameKey: 'work.category_creators',
    type: 'video',
    projects: [
      { id: 'pnCGwr5_2lU', title: 'Creator Edit 10' },
      { id: 'Tm4cNXkU5pk', title: 'Creator Edit 11' },
      { id: 'X2b2JFaaRfA', title: 'Creator Edit 06' },
      { id: '4QmfVjeO4gA', title: 'Creator Edit 07' },
      { id: 'BxB2rbBUVSo', title: 'Creator Edit 03' },
      { id: '1wdvjKG4Dyk', title: 'Creator Edit 01' },
      { id: 'nt6cHA4aTZI', title: 'Creator Edit 02' },
      { id: 'wsWcJ0_OPlI', title: 'Creator Edit 04' },
      { id: 'h7LMLwdBl4o', title: 'Creator Edit 05' },
      { id: '-V7mCMyjzF4', title: 'Creator Edit 08' },
      { id: 'nCQmHokmhxQ', title: 'Creator Edit 09' },
      { id: '60cttcBWGYo', title: 'Creator Edit 12' },
      { id: 'FW_KNCtytdM', title: 'Creator Edit 13' },
    ]
  },
  {
    id: 'thumbnails',
    nameKey: 'work.category_thumbnails',
    type: 'image',
    projects: [
      { id: 'https://res.cloudinary.com/ds6dwbk37/image/upload/v1774598330/thumblifyai-youtube-thumbnail_xy9jml.jpg', title: 'Thumbnail 01' },
      { id: 'https://res.cloudinary.com/ds6dwbk37/image/upload/v1774598370/thumblifyai-youtube-thumbnail_1_van5bd.jpg', title: 'Thumbnail 02' },
      { id: 'https://res.cloudinary.com/ds6dwbk37/image/upload/v1774598278/U313123ntitled-1_y8ofgp.webp', title: 'Thumbnail 03' },
      { id: 'https://res.cloudinary.com/ds6dwbk37/image/upload/v1774598278/Camellya_Guide_sk9dcz.webp', title: 'Thumbnail 04' },
      { id: 'https://res.cloudinary.com/ds6dwbk37/image/upload/v1774598279/bra1212nt_problem_cglay0.webp', title: 'Thumbnail 05' },
      { id: 'https://res.cloudinary.com/ds6dwbk37/image/upload/v1774598278/Havo111c_rover_ytssg1.webp', title: 'Thumbnail 06' },
      { id: 'https://res.cloudinary.com/ds6dwbk37/image/upload/v1774598277/1231231256_usgrqu.webp', title: 'Thumbnail 07' },
      { id: 'https://res.cloudinary.com/ds6dwbk37/image/upload/v1774598277/image_uiqijx.webp', title: 'Thumbnail 08' },
      { id: 'https://res.cloudinary.com/ds6dwbk37/image/upload/v1774598276/Tier_list_2_hgju35.webp', title: 'Thumbnail 09' },
    ]
  }
];

export default function WorkSection() {
  const { trackSection, reportUserAction } = useGlitch();
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const [activeVideo, setActiveVideo] = useState(categories[0].projects[0].id);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400; // Approximate width of one thumbnail
      const currentScroll = scrollContainerRef.current.scrollLeft;
      scrollContainerRef.current.scrollTo({
        left: direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const currentCategory = React.useMemo(() => 
    categories.find(c => c.id === activeCategory) || categories[0],
  [activeCategory]);

  const handleCategoryChange = React.useCallback((categoryId: string) => {
    setActiveCategory(categoryId);
    const newCategory = categories.find(c => c.id === categoryId);
    if (newCategory && newCategory.projects.length > 0) {
      setActiveVideo(newCategory.projects[0].id);
    }
  }, []);

  return (
    <motion.section 
      id="work" 
      className="bg-nier-gray border-b border-nier-dark pb-20 relative overflow-hidden"
      onViewportEnter={() => {
        trackSection('Work');
        reportUserAction('is reviewing the project archives');
      }}
      viewport={{ once: true, margin: "-20%" }}
    >
      {/* Animated Background Film Strip */}
      <div className="absolute inset-0 pointer-events-none opacity-10 z-0 flex flex-col justify-between py-10">
        {[...Array(5)].map((_, i) => (
          <motion.div 
            key={i}
            className="w-[200%] h-12 flex gap-4"
            animate={{ x: i % 2 === 0 ? ['0%', '-50%'] : ['-50%', '0%'] }}
            transition={{ duration: 20 + i * 5, repeat: Infinity, ease: "linear" }}
          >
            {[...Array(20)].map((_, j) => (
              <div key={j} className="w-24 h-full border border-nier-beige rounded-none flex-shrink-0"></div>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Marquee Tape */}
      <div className="bg-nier-dark border-y border-nier-dark py-2 transform -rotate-1 scale-110 overflow-hidden whitespace-nowrap mb-20 relative z-10">
        <div className="flex w-max animate-marquee">
          <h2 className="font-mono text-xl md:text-2xl font-bold tracking-[0.5em] uppercase whitespace-pre text-nier-beige">
            {t('work.system_data').repeat(10)}
          </h2>
          <h2 className="font-mono text-xl md:text-2xl font-bold tracking-[0.5em] uppercase whitespace-pre text-nier-beige">
            {t('work.system_data').repeat(10)}
          </h2>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Category Selector */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`px-4 py-2 md:px-6 md:py-3 font-mono text-xs md:text-base font-bold tracking-widest uppercase border-2 transition-all duration-300 ${
                activeCategory === category.id
                  ? 'border-nier-dark bg-nier-dark text-nier-beige shadow-[0_0_15px_rgba(0,0,0,0.5)] scale-105 dark:border-nier-light dark:bg-nier-light dark:text-nier-dark dark:shadow-[0_0_15px_rgba(255,255,255,0.3)]'
                  : 'border-nier-dark text-nier-dark bg-nier-beige hover:bg-nier-red hover:text-white hover:border-nier-red hover:scale-105 dark:border-nier-light dark:text-nier-light dark:bg-nier-dark dark:hover:bg-nier-red dark:hover:text-white dark:hover:border-nier-red'
              }`}
            >
              [ {t(category.nameKey)} ]
            </button>
          ))}
        </div>

        {/* Main Video/Image Player Placeholder */}
        <motion.div 
          className="aspect-video bg-black border border-nier-dark rounded-none mb-12 relative group overflow-hidden p-1"
          whileHover="hover"
          initial="initial"
        >
           {currentCategory.type === 'video' ? (
             <iframe 
               className="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700"
               src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&mute=1&loop=1&playlist=${activeVideo}&controls=1&showinfo=0&rel=0&modestbranding=1`}
               title="YouTube video player"
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
               allowFullScreen
               loading="lazy"
             ></iframe>
           ) : (
             <div className="w-full h-full relative grayscale group-hover:grayscale-0 transition-all duration-700">
               <Image 
                 src={activeVideo} 
                 alt="Thumbnail" 
                 fill 
                 className="object-contain"
                 referrerPolicy="no-referrer"
               />
             </div>
           )}

           {/* Shimmer/Pulse Effect */}
           <motion.div 
             className="absolute inset-1 bg-gradient-to-r from-transparent via-nier-dark/10 to-transparent skew-x-12 pointer-events-none"
             variants={{
               hover: {
                 x: ['-200%', '200%'],
                 transition: { repeat: Infinity, duration: 1.5, ease: "linear" }
               },
               initial: { x: '-200%' }
             }}
           />
        </motion.div>

        {/* Thumbnails Carousel */}
        <div className="relative group/carousel">
          {/* Scroll Left Button */}
          <button 
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 bg-nier-dark text-nier-beige p-3 border-2 border-nier-light opacity-80 hover:opacity-100 hover:bg-nier-red hover:text-white hover:scale-110 transition-all disabled:opacity-0 hidden md:block shadow-[0_0_15px_rgba(0,0,0,0.8)]"
            aria-label="Scroll left"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <div 
            ref={scrollContainerRef}
            className="flex gap-4 md:gap-6 overflow-x-auto pb-8 pt-2 snap-x nier-horizontal-scrollbar scroll-smooth"
          >
            {currentCategory.projects.map((p) => (
              <div 
                key={p.id} 
                onClick={() => setActiveVideo(p.id)}
                className={`min-w-[260px] md:min-w-[400px] aspect-video bg-black border ${activeVideo === p.id ? 'border-white' : 'border-nier-dark'} rounded-none snap-center relative overflow-hidden group cursor-pointer p-1 transition-colors`}
              >
                <div className="absolute inset-1">
                  <Image 
                    src={currentCategory.type === 'video' ? `https://img.youtube.com/vi/${p.id}/hqdefault.jpg` : p.id}
                    alt={p.title} 
                    fill 
                    sizes="(max-width: 768px) 260px, 400px"
                    loading="lazy"
                    className={`object-cover transition-all duration-500 ${activeVideo === p.id ? 'grayscale-0 opacity-100' : 'opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-100'}`}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 border border-nier-dark/50 pointer-events-none"></div>
                </div>
                <div className={`absolute bottom-2 left-2 ${activeVideo === p.id ? 'bg-nier-dark text-nier-beige' : 'bg-nier-beige/80 text-nier-dark'} font-mono text-[10px] px-2 py-1 tracking-widest border border-nier-dark transition-colors`}>
                  [ {p.title.toUpperCase()} ]
                </div>
              </div>
            ))}
          </div>

          {/* Scroll Right Button */}
          <button 
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 bg-nier-dark text-nier-beige p-3 border-2 border-nier-light opacity-80 hover:opacity-100 hover:bg-nier-red hover:text-white hover:scale-110 transition-all disabled:opacity-0 hidden md:block shadow-[0_0_15px_rgba(0,0,0,0.8)]"
            aria-label="Scroll right"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </motion.section>
  );
}
