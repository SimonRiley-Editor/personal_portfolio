'use client';
import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react';

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  
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
  const cursorX = useTransform(scrollYProgress, [0.35, 0.45, 0.65], ['-40vw', '340px', '340px']);
  const cursorY = useTransform(scrollYProgress, [0.35, 0.45, 0.65], ['40vh', '240px', '240px']);
  const cursorScale = useTransform(scrollYProgress, [0.45, 0.5, 0.52, 0.55], [1, 1, 0.75, 1]);
  const cursorOpacity = useTransform(scrollYProgress, [0.3, 0.35, 0.6, 0.65], [0, 1, 1, 0]);

  const buttonScale = useTransform(scrollYProgress, [0.45, 0.5, 0.52, 0.55], [1, 1, 0.9, 1]);

  const [isClicked, setIsClicked] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= 0.52 && !isClicked) {
      setIsClicked(true);
    } else if (latest < 0.52 && isClicked) {
      setIsClicked(false);
    }
  });

  return (
    <section id="services" ref={containerRef} className="bg-[#ffda59] relative h-[300vh]">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-4 border-b-4 border-black bg-[#ffda59]">
        
        <div className="max-w-6xl w-full mx-auto relative z-10">
          
          {/* Decorative background cards */}
          <motion.div 
            style={{ x: bg2X, y: bg2Y, rotate: bg2Rotate }}
            className="absolute inset-0 bg-white border-4 border-black rounded-3xl -z-20 origin-bottom-left overflow-hidden flex items-center justify-center"
          >
            {/* Deep background pattern and text */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '32px 32px' }}></div>
            <h1 className="text-[20vw] font-black text-gray-100 whitespace-nowrap transform -rotate-12 select-none pointer-events-none">
              CMD + Z
            </h1>
          </motion.div>

          <motion.div 
            style={{ x: bg1X, y: bg1Y, rotate: bg1Rotate }}
            className="absolute inset-0 bg-white border-4 border-black rounded-3xl -z-10 origin-bottom-left overflow-hidden"
          >
            {/* Funny editor notes scattered around */}
            <div className="absolute top-12 left-8 md:top-20 md:left-20 font-mono text-sm md:text-xl font-bold text-gray-400 transform -rotate-6 select-none pointer-events-none">
              * Final_Render_v12_FINAL_ACTUALLY_FINAL.mp4
            </div>
            
            <div className="absolute top-32 right-8 md:top-40 md:right-24 font-display text-xl md:text-3xl font-black text-gray-300 transform rotate-3 select-none pointer-events-none">
              &quot;Can we make it pop?&quot;
            </div>

            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 font-wide text-4xl md:text-8xl font-black text-gray-100 transform -rotate-6 select-none pointer-events-none whitespace-nowrap">
              FIX IT IN POST.
            </div>

            <div className="absolute top-[60%] right-10 md:right-1/4 font-mono text-sm md:text-lg font-bold text-red-400 transform rotate-12 border-2 border-red-400 p-2 rounded select-none pointer-events-none bg-white">
              ⚠️ MEDIA OFFLINE
            </div>

            <div className="absolute top-1/2 left-4 md:left-12 font-display text-lg md:text-2xl font-black text-gray-300 transform -rotate-90 origin-left select-none pointer-events-none">
              autosave_004.prproj
            </div>
            
            <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-gray-400 select-none pointer-events-none">
              <span className="font-mono font-bold mb-2 text-sm md:text-base tracking-widest">SCROLL TO RENDER</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce">
                <path d="M12 5v14M19 12l-7 7-7-7"/>
              </svg>
            </div>
          </motion.div>

          {/* Main Card */}
          <motion.div 
            style={{ y: cardY, rotate: cardRotate }}
            className="bg-[#ff80ab] border-4 border-black rounded-3xl p-6 md:p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative origin-bottom max-h-[95vh] overflow-y-auto md:max-h-none md:overflow-visible"
          >
            <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-center">
              
              {/* Image Placeholder */}
              <motion.div 
                style={{ x: imageX, opacity: imageOpacity }}
                className="w-full max-w-[180px] md:max-w-none md:w-1/2 aspect-square md:aspect-[3/4] bg-[#69f0ae] border-4 border-black rounded-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center p-4 md:p-8 transform -rotate-3 mx-auto md:mx-0 relative overflow-hidden"
              >
                 {/* Original Text */}
                 <motion.div 
                   animate={{ opacity: isClicked ? 0 : 1, scale: isClicked ? 0.8 : 1 }}
                   transition={{ duration: 0.2 }}
                   className="text-center absolute inset-0 flex flex-col items-center justify-center"
                 >
                   <div className="font-display text-2xl md:text-4xl font-black mb-2 md:mb-4">LUTs &<br/>Presets</div>
                   <div className="w-16 h-16 md:w-32 md:h-32 border-4 border-black rounded-full mx-auto flex items-center justify-center bg-white">
                     <div className="w-8 h-8 md:w-16 md:h-16 bg-black rounded-full"></div>
                   </div>
                 </motion.div>

                 {/* Folder Animation */}
                 <motion.div 
                   initial={{ opacity: 0, scale: 0.5 }}
                   animate={{ opacity: isClicked ? 1 : 0, scale: isClicked ? 1 : 0.5 }}
                   transition={{ type: "spring", stiffness: 400, damping: 25 }}
                   className="absolute inset-0 flex items-center justify-center pointer-events-none"
                 >
                    <div className="relative w-32 h-24 md:w-48 md:h-36 mt-4">
                       {/* Folder Back */}
                       <div className="absolute bottom-0 w-full h-full bg-[#ffb74d] border-4 border-black rounded-lg"></div>
                       {/* Folder Tab */}
                       <div className="absolute -top-4 md:-top-6 left-0 w-12 h-6 md:w-16 md:h-8 bg-[#ffb74d] border-4 border-black border-b-0 rounded-t-lg"></div>
                       
                       {/* Fun Objects Inside */}
                       {/* Video File */}
                       <div className="absolute bottom-4 left-2 w-12 h-12 md:w-16 md:h-16 bg-[#54a0ff] border-4 border-black rounded transform -rotate-12 flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                          <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1"></div>
                       </div>
                       {/* Audio File */}
                       <div className="absolute bottom-6 right-2 w-10 h-14 md:w-14 md:h-20 bg-[#ff80ab] border-4 border-black rounded transform rotate-12 flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                          <span className="font-black text-xl md:text-3xl text-white">♫</span>
                       </div>
                       {/* Star */}
                       <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-8 md:w-10 md:h-10 bg-[#69f0ae] border-4 border-black transform rotate-45 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"></div>

                       {/* Folder Front */}
                       <div className="absolute bottom-0 w-full h-4/5 bg-[#ffda59] border-4 border-black rounded-lg transform origin-bottom -skew-x-6 shadow-[0px_-4px_0px_0px_rgba(0,0,0,0.1)]"></div>
                    </div>
                 </motion.div>
              </motion.div>

              {/* Content */}
              <motion.div 
                style={{ x: textX, opacity: textOpacity }}
                className="w-full md:w-1/2"
              >
                <h2 className="font-wide text-3xl md:text-8xl font-black tracking-tighter mb-3 md:mb-6 uppercase text-center md:text-left">
                  GEAR
                </h2>
                <p className="text-base md:text-2xl font-medium mb-3 md:mb-6 text-center md:text-left">
                  Level up your edits with my custom LUTs and Premiere Pro presets!
                </p>
                <p className="text-sm md:text-lg mb-4 md:mb-8 font-medium text-center md:text-left">
                  All the secrets to achieving that cinematic look. You&apos;ll find color grading presets, transition packs, and sound design essentials that I use in my everyday workflow.
                </p>
                <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8 text-sm md:text-base">
                  <li className="flex items-start gap-2 md:gap-3">
                    <div className="w-2 h-2 md:w-3 md:h-3 bg-black transform rotate-45 mt-1.5 flex-shrink-0"></div>
                    <span className="font-medium">50+ Cinematic LUTs for Log footage.</span>
                  </li>
                  <li className="flex items-start gap-2 md:gap-3">
                    <div className="w-2 h-2 md:w-3 md:h-3 bg-black transform rotate-45 mt-1.5 flex-shrink-0"></div>
                    <span className="font-medium">Drag-and-drop transition presets for Premiere Pro & After Effects.</span>
                  </li>
                  <li className="flex items-start gap-2 md:gap-3">
                    <div className="w-2 h-2 md:w-3 md:h-3 bg-black transform rotate-45 mt-1.5 flex-shrink-0"></div>
                    <span className="font-medium">Essential sound effects library for punchy edits.</span>
                  </li>
                </ul>

                <div className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-4">
                  <button className="bg-transparent border-4 border-black px-6 py-2 md:px-8 md:py-3 font-wide text-lg md:text-xl uppercase hover:bg-black hover:text-white transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-y-1 hover:translate-x-1">
                    Learn More
                  </button>
                  <motion.button 
                    style={{ scale: buttonScale }}
                    className="bg-[#69f0ae] border-4 border-black px-6 py-2 md:px-8 md:py-3 font-wide text-lg md:text-xl uppercase hover:bg-white transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-y-1 hover:translate-x-1 origin-center"
                  >
                    Buy Now
                  </motion.button>
                </div>
              </motion.div>
            </div>
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
          <svg width="64" height="64" viewBox="0 0 24 24" fill="white" stroke="black" strokeWidth="2" className="transform -rotate-12 drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
            <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
            <path d="M13 13l6 6" />
          </svg>
        </motion.div>

      </div>
    </section>
  );
}
