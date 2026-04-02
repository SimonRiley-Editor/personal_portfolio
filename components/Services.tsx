'use client';
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import { useLanguage } from './LanguageContext';
import { useGlitch } from './GlitchContext';

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { trackSection, reportUserAction, foundSecret } = useGlitch();
  const { t } = useLanguage();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Animations for the main pink card
  const cardY = useTransform(scrollYProgress, [0, 0.25], ['100vh', '0vh']);
  const cardRotate = useTransform(scrollYProgress, [0, 0.25], [15, -2]);
  
  // Animations for the background white cards (fanning out)
  const bg1X = useTransform(scrollYProgress, [0.15, 0.3], ['0px', '16px']);
  const bg1Y = useTransform(scrollYProgress, [0.15, 0.3], ['0px', '16px']);
  const bg1Rotate = useTransform(scrollYProgress, [0.15, 0.3], [-2, 2]);

  const bg2X = useTransform(scrollYProgress, [0.15, 0.3], ['0px', '32px']);
  const bg2Y = useTransform(scrollYProgress, [0.15, 0.3], ['0px', '32px']);
  const bg2Rotate = useTransform(scrollYProgress, [0.15, 0.3], [-2, 4]);

  // Animations for inner content
  const imageX = useTransform(scrollYProgress, [0.2, 0.35], ['-50px', '0px']);
  const imageOpacity = useTransform(scrollYProgress, [0.2, 0.35], [0, 1]);
  
  const textX = useTransform(scrollYProgress, [0.25, 0.4], ['50px', '0px']);
  const textOpacity = useTransform(scrollYProgress, [0.25, 0.4], [0, 1]);

  // Cursor & Click Animations
  // Move in (0.35 -> 0.45), wait (0.45 -> 0.5), click (0.5 -> 0.55)
  const cursorX = useTransform(scrollYProgress, [0.35, 0.45, 0.65], ['-40vw', '260px', '260px']);
  const cursorY = useTransform(scrollYProgress, [0.35, 0.45, 0.65], ['40vh', '230px', '230px']);
  const cursorScale = useTransform(scrollYProgress, [0.45, 0.5, 0.52, 0.55], [1, 1, 0.75, 1]);
  const cursorOpacity = useTransform(scrollYProgress, [0.3, 0.35, 0.6, 0.65], [0, 1, 1, 0]);

  const buttonScale = useTransform(scrollYProgress, [0.45, 0.5, 0.52, 0.55], [1, 1, 0.9, 1]);

  const [isClicked, setIsClicked] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= 0.52 && !isClicked) {
      setIsClicked(true);
    } else if (latest < 0.52 && isClicked) {
      setIsClicked(false);
    }
  });

  const [activeLogIndex, setActiveLogIndex] = useState(0);

  const logs = [
    {
      id: 'hire',
      title: 'HIRE ME',
      badge: 'AVAILABLE',
      desc1: 'Turn your raw footage into high-impact content with an editor who knows the rhythm of the screen.',
      desc2: 'I specialize in the "feel" of a video—ensuring every cut, sound, and transition works together to keep viewers locked in. Whether it’s a high-energy short or just simple video, I bring a veteran\'s eye to the timeline to deliver a polished, ready-to-post final product.',
      items: [
        { title: 'Versatile Professional Editing.', desc: 'From cinematic storytelling to high-energy social clips, I can handle literally any style of footage you throw at me.' },
        { title: 'High-Level Sound Mixing.', desc: 'Advanced layering and native audio processing. I don\'t just add sound; I mix it to give every transition a tactile, punchy impact.' },
        { title: 'Refined Motion Design.', desc: 'Clean, effective animation and custom curves. I focus on modern motion that supports the edit without overcomplicating it.' },
      ],
      button1: 'DETAILS',
      button2: 'HIRE ME',
    },
    {
      id: 'gear',
      title: t('services.gear'),
      desc1: t('services.desc_1'),
      desc2: t('services.desc_2'),
      items: [
        { title: t('services.item_1_title'), desc: t('services.item_1_desc') },
        { title: t('services.item_2_title'), desc: t('services.item_2_desc') },
        { title: t('services.item_3_title'), desc: t('services.item_3_desc') },
      ],
      button1: t('services.details'),
      button2: t('services.acquire'),
    }
  ];

  const cardVariants = {
    active: {
      scale: 1,
      x: 0,
      y: 0,
      rotate: 0,
      transition: { duration: 0.5, type: "spring" as const, bounce: 0.3 }
    },
    inactive: (offset: number) => ({
      scale: isMobile ? 0.95 : 0.9,
      x: isMobile ? offset * 10 : offset * 120,
      y: isMobile ? -60 : Math.abs(offset) * 20,
      rotate: isMobile ? offset * 2 : offset * 6,
      transition: { duration: 0.5, type: "spring" as const, bounce: 0.3 }
    }),
    hover: (offset: number) => ({
      scale: isMobile ? 0.95 : 0.95,
      x: isMobile ? offset * 10 : offset * 140,
      y: isMobile ? -70 : 0,
      rotate: isMobile ? offset * 2 : offset * 8,
      transition: { duration: 0.3, type: "spring" as const, bounce: 0.4 }
    })
  };

  return (
    <section id="services" ref={containerRef} className="bg-nier-beige relative h-[300vh]">
      <motion.div 
        className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-4 border-b border-nier-dark bg-nier-beige"
        onViewportEnter={() => {
          trackSection('Services');
          reportUserAction('is browsing available assets and services');
        }}
        viewport={{ once: true, margin: "-20%" }}
      >
        
        <div className="max-w-6xl w-full mx-auto relative z-10">
          
          {/* Decorative background cards */}
          <motion.div 
            style={{ x: bg2X, y: bg2Y, rotate: bg2Rotate }}
            className="absolute inset-0 bg-nier-light border border-nier-dark -z-20 origin-bottom-left overflow-hidden flex items-center justify-center"
          >
            {/* Deep background pattern and text */}
            <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(var(--color-nier-dark) 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
            <h1 className="text-[15vw] font-akira text-nier-dark/10 whitespace-nowrap transform -rotate-12 select-none pointer-events-none">
              {t('services.system_data')}
            </h1>
          </motion.div>

          <motion.div 
            style={{ x: bg1X, y: bg1Y, rotate: bg1Rotate }}
            className="absolute inset-0 bg-nier-beige border border-nier-dark -z-10 origin-bottom-left overflow-hidden"
          >
            {/* Funny editor notes scattered around */}
            <div className="absolute top-12 left-8 lg:top-20 lg:left-20 font-mono text-sm lg:text-xl text-nier-dark/50 transform -rotate-6 select-none pointer-events-none">
              {t('services.analyzing')}
            </div>
            
            <div className="absolute top-32 right-8 lg:top-40 lg:right-24 font-mono text-xl lg:text-3xl text-nier-dark/40 transform rotate-3 select-none pointer-events-none">
              {t('services.encrypted')}
            </div>

            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 font-akira text-4xl lg:text-8xl text-nier-dark/20 transform -rotate-6 select-none pointer-events-none whitespace-nowrap">
              {t('services.error')}
            </div>

            <div className="absolute top-[60%] right-10 lg:right-1/4 font-mono text-sm lg:text-lg text-nier-red transform rotate-12 border border-nier-red p-2 select-none pointer-events-none bg-nier-light">
              {t('services.warning')}
            </div>

            <div className="absolute top-1/2 left-4 lg:left-12 font-mono text-lg lg:text-2xl text-nier-dark/30 transform -rotate-90 origin-left select-none pointer-events-none">
              memory_bank_004.dat
            </div>
            
            <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-nier-dark/60 select-none pointer-events-none">
              <span className="font-mono text-xs lg:text-sm tracking-widest mb-2 uppercase">{t('services.scroll')}</span>
              <div className="w-[1px] h-8 bg-nier-dark animate-pulse"></div>
            </div>
          </motion.div>

          {/* Main Cards */}
          <motion.div 
            style={{ y: cardY, rotate: cardRotate }}
            className="relative grid grid-cols-1 grid-rows-1 w-full"
          >
            {logs.map((log, index) => {
              const isActive = activeLogIndex === index;
              const offset = index - activeLogIndex;
              
              return (
                <motion.div 
                  key={log.id}
                  custom={offset}
                  variants={cardVariants}
                  initial={false}
                  animate={isActive ? "active" : "inactive"}
                  whileHover={!isActive ? "hover" : undefined}
                  style={{ 
                    gridArea: '1 / 1 / 2 / 2',
                    zIndex: isActive ? 20 : 10 - Math.abs(offset)
                  }}
                  onClick={() => {
                    if (!isActive) setActiveLogIndex(index);
                  }}
                  className={`nier-box bg-nier-light p-0 relative origin-bottom transition-shadow duration-300 ${isActive ? 'cursor-default shadow-[0_0_30px_rgba(0,0,0,0.15)]' : 'cursor-pointer shadow-md'}`}
                >
                  {/* Dark overlay for inactive state (replaces buggy filter animation) */}
                  <div className={`absolute inset-0 bg-black pointer-events-none transition-opacity duration-500 ${isActive ? 'opacity-0' : 'opacity-[0.15]'}`}></div>

                  {/* Tab for inactive cards to peek out */}
                  <div className={`absolute -top-12 lg:-top-10 ${offset > 0 ? 'right-2 lg:-right-8' : 'left-2 lg:-left-8'} bg-nier-dark text-nier-light px-4 lg:px-6 py-2 font-mono text-xs lg:text-sm tracking-widest border border-nier-dark transition-all duration-300 flex flex-col lg:flex-row items-center gap-1 lg:gap-3 ${isActive ? 'opacity-0 translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0 shadow-lg pointer-events-auto'}`}>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-nier-red animate-pulse"></span>
                      {log.title}
                    </div>
                    <span className="text-[9px] text-nier-light/50 lg:hidden">TAP TO SWITCH</span>
                  </div>
                  
                  {/* Giant watermark text on the side of inactive cards */}
                  <div className={`absolute top-1/2 -translate-y-1/2 ${offset > 0 ? 'right-2 lg:right-8' : 'left-2 lg:left-8'} font-akira text-3xl lg:text-6xl text-nier-dark/5 transform ${offset > 0 ? 'rotate-90' : '-rotate-90'} pointer-events-none transition-opacity duration-300 ${isActive ? 'opacity-0' : 'opacity-100'}`}>
                    {log.title}
                  </div>

                  {/* Scrollable Content Wrapper */}
                  <div className="p-4 lg:p-12 pb-16 lg:pb-12 max-h-[70vh] overflow-y-auto lg:max-h-none lg:overflow-visible w-full custom-scrollbar">
                    <div className={`flex flex-col lg:flex-row gap-4 lg:gap-12 items-center ${isActive ? 'opacity-100' : 'opacity-20 pointer-events-none'} transition-opacity duration-300`}>
                      
                      {/* Image Placeholder */}
                    <motion.div 
                      style={{ x: imageX, opacity: imageOpacity }}
                      className="w-full max-w-[120px] lg:max-w-none lg:w-1/2 aspect-square lg:aspect-[3/4] bg-nier-beige border border-nier-dark flex items-center justify-center p-3 lg:p-8 transform -rotate-3 mx-auto lg:mx-0 relative overflow-hidden shrink-0"
                    >
                       {/* Original Text */}
                       <motion.div 
                         animate={{ opacity: isClicked ? 0 : 1, scale: isClicked ? 0.8 : 1 }}
                         transition={{ duration: 0.2 }}
                         className="text-center absolute inset-0 flex flex-col items-center justify-center"
                       >
                         <div className="font-mono text-lg lg:text-2xl tracking-widest mb-1 lg:mb-4 text-nier-dark uppercase whitespace-pre-line">{t('services.assets')}</div>
                         <div className="w-12 h-12 lg:w-32 lg:h-32 border border-nier-dark rounded-full mx-auto flex items-center justify-center bg-nier-light relative">
                           <div className="w-6 h-6 lg:w-16 lg:h-16 bg-nier-dark rounded-full"></div>
                           <div className="absolute inset-0 border border-nier-dark rounded-full animate-ping opacity-20"></div>
                         </div>
                       </motion.div>

                       {/* Dynamic Icon Animation based on log type */}
                       <motion.div 
                         initial={{ opacity: 0, scale: 0.5 }}
                         animate={{ opacity: isClicked ? 1 : 0, scale: isClicked ? 1 : 0.5 }}
                         transition={{ type: "spring", stiffness: 400, damping: 25 }}
                         className="absolute inset-0 flex items-center justify-center pointer-events-none"
                       >
                         {log.id === 'hire' ? (
                           <div className="relative w-24 h-16 lg:w-48 lg:h-36 mt-2 lg:mt-4">
                              {/* Folder Back */}
                              <div className="absolute bottom-0 w-full h-full bg-nier-dark border border-nier-dark"></div>
                              {/* Folder Tab */}
                              <div className="absolute -top-3 lg:-top-6 left-0 w-8 h-4 lg:w-16 lg:h-8 bg-nier-dark border border-nier-dark border-b-0"></div>
                              
                              {/* Fun Objects Inside */}
                              {/* Video File */}
                              <div className="absolute bottom-2 left-1 w-8 h-8 lg:w-16 lg:h-16 bg-nier-beige border border-nier-dark transform -rotate-12 flex items-center justify-center">
                                 <div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[6px] border-l-nier-dark border-b-[4px] border-b-transparent ml-0.5 lg:border-t-[6px] lg:border-l-[10px] lg:border-b-[6px] lg:ml-1"></div>
                              </div>
                              {/* Audio File */}
                              <div className="absolute bottom-4 right-1 w-6 h-10 lg:w-14 lg:h-20 bg-nier-light border border-nier-dark transform rotate-12 flex items-center justify-center">
                                 <span className="font-mono text-sm lg:text-3xl text-nier-dark">♫</span>
                              </div>
                              {/* Star */}
                              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-6 h-6 lg:w-10 lg:h-10 bg-nier-red border border-nier-dark transform rotate-45"></div>

                              {/* Folder Front */}
                              <div className="absolute bottom-0 w-full h-4/5 bg-nier-beige border border-nier-dark transform origin-bottom -skew-x-6"></div>
                           </div>
                         ) : (
                           <div className="relative w-16 h-16 lg:w-32 lg:h-32 rounded-full border-2 lg:border-4 border-nier-dark bg-nier-beige flex items-center justify-center overflow-hidden shadow-inner">
                             <motion.div 
                               animate={{ rotate: isClicked ? 360 : 0 }} 
                               transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                               className="absolute inset-0"
                             >
                               {[0, 60, 120, 180, 240, 300].map((deg) => (
                                 <div key={deg} className="absolute top-1/2 left-0 w-full h-[1px] lg:h-[2px] bg-nier-dark/20" style={{ transform: `rotate(${deg}deg)` }}></div>
                               ))}
                             </motion.div>
                             <div className="absolute inset-1 lg:inset-4 rounded-full border border-nier-dark flex items-center justify-center bg-nier-light z-10">
                               <div className="absolute inset-1 lg:inset-3 rounded-full bg-nier-dark flex items-center justify-center overflow-hidden">
                                 <div className="w-2 h-2 lg:w-4 lg:h-4 rounded-full bg-nier-red animate-pulse shadow-[0_0_10px_rgba(255,0,0,0.8)]"></div>
                                 <div className="absolute top-0.5 right-0.5 lg:top-2 lg:right-2 w-2 h-2 lg:w-4 lg:h-4 rounded-full bg-white/30"></div>
                               </div>
                             </div>
                           </div>
                         )}
                       </motion.div>
                    </motion.div>

                    {/* Content */}
                    <motion.div 
                      style={{ x: textX, opacity: textOpacity }}
                      className="w-full lg:w-1/2"
                    >
                      <div className="flex items-center gap-2 mb-2 lg:mb-4 justify-center lg:justify-start">
                        <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-nier-red"></div>
                        <span className="font-mono text-[10px] lg:text-xs tracking-widest text-nier-dark uppercase">{t('services.equipment_log')}</span>
                      </div>
                      
                      <div className="flex flex-col lg:flex-row items-center lg:items-end gap-2 lg:gap-3 mb-2 lg:mb-6">
                        <h2 className="font-akira text-2xl lg:text-6xl tracking-tighter uppercase text-center lg:text-left text-nier-dark m-0 leading-none">
                          {log.title}
                        </h2>
                        {log.badge && (
                          <div className="bg-nier-red text-white px-2 py-0.5 lg:px-3 lg:py-1 font-mono text-[10px] lg:text-xs tracking-widest uppercase animate-pulse mb-1">
                            {log.badge}
                          </div>
                        )}
                      </div>

                      <p className="text-xs lg:text-lg font-mono mb-2 lg:mb-6 text-center lg:text-left text-nier-dark">
                        {log.desc1}
                      </p>
                      <p className="text-[10px] lg:text-sm mb-3 lg:mb-8 font-mono text-center lg:text-left text-nier-dark/80 leading-relaxed">
                        {log.desc2}
                      </p>
                      <ul className="space-y-2 lg:space-y-4 mb-4 lg:mb-8 text-[10px] lg:text-sm font-mono text-nier-dark">
                        {log.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 lg:gap-3">
                            <span className="text-nier-red mt-0.5">&gt;</span>
                            <div className="flex flex-col">
                              <span className="font-bold">{item.title}</span>
                              <span className="text-nier-dark/80">{item.desc}</span>
                            </div>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap justify-center lg:justify-start gap-2 lg:gap-4">
                        <button className="bg-transparent border border-nier-dark px-4 py-2 lg:px-8 lg:py-3 font-mono text-xs lg:text-sm tracking-widest uppercase hover:bg-nier-dark hover:text-nier-light transition-colors">
                          {log.button1}
                        </button>
                        <motion.button 
                          style={{ scale: isActive ? buttonScale : 1 }}
                          className="bg-nier-dark text-nier-light border border-nier-dark px-4 py-2 lg:px-8 lg:py-3 font-mono text-xs lg:text-sm tracking-widest uppercase hover:bg-nier-red hover:text-white transition-colors origin-center relative z-50"
                          onClick={foundSecret}
                        >
                          {log.button2}
                        </motion.button>
                      </div>
                    </motion.div>
                  </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
        
        {/* Cursor/Pointer decorative element */}
        <motion.div 
          style={{ 
            opacity: cursorOpacity,
            x: cursorX,
            y: cursorY,
            scale: cursorScale
          }}
          className="absolute left-1/2 top-1/2 hidden lg:block z-50 pointer-events-none origin-top-left"
        >
          <svg width="48" height="48" viewBox="0 0 24 24" fill="var(--color-nier-light)" stroke="var(--color-nier-dark)" strokeWidth="1" className="transform -rotate-12 drop-shadow-sm">
            <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
            <path d="M13 13l6 6" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
