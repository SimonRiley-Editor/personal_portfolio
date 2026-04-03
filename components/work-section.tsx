"use client";

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { useGlitch } from './GlitchContext';
import { useLanguage } from './LanguageContext';

type Project = {
  id: string;
  title: string;
  thumbnail?: string;
  description?: string;
  technologies?: string[];
  link?: string;
};

type Category = {
  id: string;
  nameKey: string;
  type: 'video' | 'image';
  projects: Project[];
};

const categories: Category[] = [
  {
    id: 'amvs',
    nameKey: 'work.category_amvs',
    type: 'video',
    projects: [
      { 
        id: 'o9FOYN3gMRQ', 
        title: 'Project 01', 
        thumbnail: 'https://res.cloudinary.com/ds6dwbk37/image/upload/v1775199626/sddefault_yv02qz.jpg',
        description: 'A high-energy AMV editing project showcasing advanced motion graphics, seamless transitions, and precise audio synchronization.',
        technologies: ['After Effects', 'Premiere Pro', 'Blender'],
        link: 'https://youtube.com/watch?v=o9FOYN3gMRQ'
      },
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
      { 
        id: 'https://res.cloudinary.com/ds6dwbk37/image/upload/v1774598330/thumblifyai-youtube-thumbnail_xy9jml.jpg', 
        title: 'Thumbnail 01',
        description: 'A custom YouTube thumbnail designed to maximize click-through rate with high contrast and compelling imagery.',
        technologies: ['Photoshop', 'Illustrator'],
        link: 'https://res.cloudinary.com/ds6dwbk37/image/upload/v1774598330/thumblifyai-youtube-thumbnail_xy9jml.jpg'
      },
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

function ProjectThumbnail({ 
  project, 
  categoryType, 
  isActive, 
  onClick 
}: { 
  project: Project; 
  categoryType: 'video' | 'image'; 
  isActive: boolean; 
  onClick: () => void;
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.button 
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className={`min-w-[260px] md:min-w-[400px] aspect-video bg-black border ${isActive ? 'border-white' : 'border-nier-dark'} rounded-none snap-center relative overflow-hidden group cursor-pointer p-1 transition-colors focus:outline-none focus:ring-2 focus:ring-nier-red focus:ring-offset-2 focus:ring-offset-nier-gray text-left`}
      aria-label={`View details for ${project.title}`}
    >
      <div className="absolute inset-1 overflow-hidden bg-nier-dark/20">
        {/* Skeleton Loader */}
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${isLoaded ? 'opacity-0' : 'opacity-100'}`}>
           <div className="w-8 h-8 border-2 border-nier-beige/30 border-t-nier-red rounded-full animate-spin"></div>
        </div>

        <Image 
          src={categoryType === 'video' ? (project.thumbnail || `https://img.youtube.com/vi/${project.id}/hqdefault.jpg`) : project.id}
          alt={project.title} 
          fill 
          sizes="(max-width: 768px) 260px, 400px"
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          className={`object-cover transition-all duration-500 grayscale-0 group-hover:grayscale group-hover:scale-110 ${!isLoaded ? 'opacity-0 scale-105' : isActive ? 'opacity-100 scale-100' : 'opacity-70 scale-100 group-hover:opacity-100'}`}
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 border border-nier-dark/50 pointer-events-none z-10"></div>
        
        {/* Play Button Overlay */}
        {categoryType === 'video' && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 z-20">
            <div className="w-12 h-12 bg-nier-dark/80 rounded-full flex items-center justify-center border-2 border-nier-beige transform scale-75 group-hover:scale-100 transition-transform duration-300">
              <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-nier-beige border-b-[8px] border-b-transparent ml-1"></div>
            </div>
          </div>
        )}
      </div>
      <div className={`absolute bottom-2 left-2 z-30 ${isActive ? 'bg-nier-dark text-nier-beige' : 'bg-nier-beige/80 text-nier-dark'} font-mono text-[10px] px-2 py-1 tracking-widest border border-nier-dark transition-colors`}>
        [ {project.title.toUpperCase()} ]
      </div>
    </motion.button>
  );
}

function MainPlayerPlaceholder({ 
  categoryType, 
  activeVideo, 
  activeProject, 
  onClick 
}: { 
  categoryType: 'video' | 'image'; 
  activeVideo: string; 
  activeProject: Project; 
  onClick: () => void;
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <button 
      className={`w-full h-full relative cursor-pointer ${categoryType === 'video' ? 'group/play' : ''} bg-nier-dark/20 focus:outline-none focus:ring-2 focus:ring-nier-red focus:ring-offset-2 focus:ring-offset-nier-gray block text-left`}
      onClick={onClick}
      aria-label={`View details for ${activeProject.title}`}
    >
      {/* Skeleton Loader */}
      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${isLoaded ? 'opacity-0' : 'opacity-100'}`}>
         <div className="w-12 h-12 border-2 border-nier-beige/30 border-t-nier-red rounded-full animate-spin"></div>
      </div>

      <Image 
        src={categoryType === 'video' ? (activeProject.thumbnail || `https://img.youtube.com/vi/${activeVideo}/maxresdefault.jpg`) : activeVideo}
        alt={categoryType === 'video' ? "Video Thumbnail" : "Thumbnail"}
        fill
        priority
        onLoad={() => setIsLoaded(true)}
        className={`object-${categoryType === 'video' ? 'cover' : 'contain'} transition-all duration-700 ${!isLoaded ? 'opacity-0 scale-105' : 'opacity-100 scale-100'} ${categoryType === 'video' ? 'grayscale group-hover/play:grayscale-0' : 'grayscale group-hover:grayscale-0'}`}
        referrerPolicy="no-referrer"
      />
      
      {categoryType === 'video' ? (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover/play:bg-black/40 transition-colors">
          <div className="w-16 h-16 md:w-24 md:h-24 bg-nier-dark/80 rounded-full flex items-center justify-center border-2 border-nier-beige transform group-hover/play:scale-110 transition-transform">
            <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-nier-beige border-b-[12px] border-b-transparent ml-2 md:border-t-[16px] md:border-l-[28px] md:border-b-[16px] md:ml-3"></div>
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
          <div className="bg-nier-dark/80 text-nier-beige px-4 py-2 font-mono text-sm border border-nier-beige tracking-widest uppercase">
            [ VIEW DETAILS ]
          </div>
        </div>
      )}
    </button>
  );
}

export default function WorkSection() {
  const { trackSection, reportUserAction } = useGlitch();
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const [activeVideo, setActiveVideo] = useState(categories[0].projects[0].id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

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

  const activeProject = React.useMemo(() => 
    currentCategory.projects.find(p => p.id === activeVideo) || currentCategory.projects[0],
  [currentCategory, activeVideo]);

  const handleCategoryChange = React.useCallback((categoryId: string) => {
    setActiveCategory(categoryId);
    const newCategory = categories.find(c => c.id === categoryId);
    if (newCategory && newCategory.projects.length > 0) {
      setActiveVideo(newCategory.projects[0].id);
    }
  }, []);

  // Modal Accessibility: Escape key, Focus Trapping, and Focus Restoration
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return;

      if (e.key === 'Escape') {
        setIsModalOpen(false);
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), iframe'
        );
        
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    if (isModalOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
      
      // Focus the close button initially
      setTimeout(() => {
        const closeBtn = modalRef.current?.querySelector('button');
        if (closeBtn) closeBtn.focus();
      }, 10);
    } else {
      document.body.style.overflow = 'unset';
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

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
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentCategory.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="aspect-video bg-black border border-nier-dark rounded-none mb-12 relative group overflow-hidden p-1"
            whileHover="hover"
          >
             <MainPlayerPlaceholder 
               key={activeVideo} 
               categoryType={currentCategory.type} 
               activeVideo={activeVideo} 
               activeProject={activeProject}
               onClick={() => setIsModalOpen(true)} 
             />

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
        </AnimatePresence>

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
            <AnimatePresence mode="popLayout">
              {currentCategory.projects.map((p) => (
                <ProjectThumbnail 
                  key={p.id}
                  project={p}
                  categoryType={currentCategory.type}
                  isActive={activeVideo === p.id}
                  onClick={() => {
                    setActiveVideo(p.id);
                    setIsModalOpen(true);
                  }}
                />
              ))}
            </AnimatePresence>
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

      {/* Details Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(4px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 md:p-8"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div 
              initial={{ y: 40, opacity: 0, scale: 0.95, rotateX: 5 }}
              animate={{ y: 0, opacity: 1, scale: 1, rotateX: 0 }}
              exit={{ y: 20, opacity: 0, scale: 0.95, rotateX: -5 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              className="relative w-full max-w-6xl bg-nier-light border border-nier-dark shadow-[0_0_30px_rgba(218,212,196,0.3)] flex flex-col lg:flex-row overflow-hidden max-h-[95vh] sm:max-h-[90vh] perspective-1000"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setIsModalOpen(false)}
              aria-label="Close modal"
              className="absolute top-2 right-2 sm:top-4 sm:right-4 z-50 text-nier-dark hover:text-nier-red font-mono text-xs sm:text-sm tracking-widest uppercase flex items-center gap-1 sm:gap-2 transition-colors bg-nier-light/90 backdrop-blur p-1.5 sm:p-2 border border-nier-dark/20 focus:outline-none focus:ring-2 focus:ring-nier-red"
            >
              [ CLOSE ]
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            
            {/* Media Area */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
              className="w-full lg:w-2/3 aspect-video lg:aspect-auto relative bg-black min-h-[250px] sm:min-h-[300px] lg:min-h-[400px] border-b lg:border-b-0 lg:border-r border-nier-dark flex-shrink-0"
            >
              {currentCategory.type === 'video' ? (
                <iframe 
                  className="w-full h-full absolute inset-0"
                  src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&controls=1&showinfo=0&rel=0&modestbranding=1`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  allowFullScreen
                ></iframe>
              ) : (
                <Image 
                  src={activeVideo}
                  alt={activeProject.title}
                  fill
                  className="object-contain"
                  referrerPolicy="no-referrer"
                />
              )}
            </motion.div>

            {/* Details Area */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.25, ease: [0.23, 1, 0.32, 1] }}
              className="w-full lg:w-1/3 p-4 sm:p-6 lg:p-8 flex flex-col overflow-y-auto bg-nier-beige/30"
            >
              <h3 id="modal-title" className="font-akira text-lg sm:text-xl lg:text-2xl mb-3 sm:mb-4 uppercase text-nier-dark">{activeProject.title}</h3>
              <div className="w-8 sm:w-12 h-1 bg-nier-red mb-4 sm:mb-6"></div>
              
              <div className="flex-1 space-y-4 sm:space-y-6">
                <div>
                  <h4 className="font-mono text-[10px] sm:text-xs tracking-widest uppercase text-nier-dark/60 mb-1 sm:mb-2">[ DESCRIPTION ]</h4>
                  <p className="text-xs sm:text-sm leading-relaxed text-nier-dark/80 font-sans">
                    {activeProject.description || 'A creative project showcasing visual storytelling and technical expertise. This piece explores dynamic composition and engaging pacing.'}
                  </p>
                </div>

                <div>
                  <h4 className="font-mono text-[10px] sm:text-xs tracking-widest uppercase text-nier-dark/60 mb-1 sm:mb-2">[ TECHNOLOGIES ]</h4>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {(activeProject.technologies || ['Adobe Premiere', 'After Effects', 'Photoshop']).map((tech: string, i: number) => (
                      <span key={i} className="text-[10px] sm:text-xs font-mono border border-nier-dark/30 px-1.5 py-0.5 sm:px-2 sm:py-1 bg-nier-light text-nier-dark">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-nier-dark/20">
                <a 
                  href={activeProject.link || (currentCategory.type === 'video' ? `https://youtube.com/watch?v=${activeVideo}` : activeVideo)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-nier-dark text-nier-light py-2.5 sm:py-3 font-mono text-xs sm:text-sm tracking-widest uppercase hover:bg-nier-red hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-nier-red focus:ring-offset-2 focus:ring-offset-nier-light"
                >
                  VIEW LIVE DEMO
                </a>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>
    </motion.section>
  );
}
