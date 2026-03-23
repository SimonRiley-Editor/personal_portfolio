import { motion } from 'motion/react';
import { Code, Film, Music, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { useGlitch } from './GlitchContext';
import { useEffect } from 'react';

export default function AboutMe() {
  const { trackSection, reportUserAction } = useGlitch();

  return (
    <section className="py-24 bg-[#0a0a0a] text-white relative overflow-hidden" id="about">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          onViewportEnter={() => {
            trackSection('About');
            reportUserAction('is reading the creator\'s biography');
          }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            <span className="text-[#e6e2af]">01.</span> ABOUT ME
          </h2>
          <div className="w-20 h-1 bg-[#e6e2af] mb-8" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 text-gray-400 text-lg leading-relaxed"
          >
            <p>
              With 6 years of professional experience in the high-stakes world of video editing and motion design, I have built a career defined by technical precision and creative impact. My journey began in the elite competitive AMV (Anime Music Video) circuit, where I earned a reputation as a multi-tournament champion. By mastering frame-perfect synchronization, great sound design, and advanced VFX, I developed a unique &quot;flow&quot; that has since become my professional signature.
            </p>
            <p>
              My background is rooted in a deep passion for digital artistry—from winning Judges Choice at AniRevo to having chance to work with content creators like Braxaphone and Saintontas. Whether I am building complex After Effects compositions on high-end hardware or shaping the narrative of a feature-length clips, my goal is always the same: to create visual experiences that are not just seen, but felt.
            </p>
            
            <div className="pt-6 grid grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <Code className="w-5 h-5 text-[#e6e2af]" />
                <span className="text-white text-sm tracking-wider uppercase">Frontend Dev</span>
              </div>
              <div className="flex items-center gap-3">
                <Film className="w-5 h-5 text-[#e6e2af]" />
                <span className="text-white text-sm tracking-wider uppercase">Video Editor</span>
              </div>
              <div className="flex items-center gap-3">
                <Music className="w-5 h-5 text-[#e6e2af]" />
                <span className="text-white text-sm tracking-wider uppercase">Sound Designer</span>
              </div>
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-[#e6e2af]" />
                <span className="text-white text-sm tracking-wider uppercase">Motion Designer</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            <div className="aspect-square relative max-w-md mx-auto">
              <div className="absolute inset-0 border-2 border-[#e6e2af] translate-x-4 translate-y-4" />
              <div className="absolute inset-0 bg-[#1a1a1a] border border-gray-800 flex items-center justify-center overflow-hidden">
                {/* Image with Hologram/Glitch Effects */}
                <div className="w-full h-full relative group">
                  <style>{`
                    @keyframes scanline {
                      0% { transform: translateY(-100%); }
                      100% { transform: translateY(400px); }
                    }
                    .glitch-img-1 {
                      animation: glitch-anim-1 3s infinite linear alternate-reverse;
                    }
                    .glitch-img-2 {
                      animation: glitch-anim-2 2s infinite linear alternate-reverse;
                    }
                    @keyframes glitch-anim-1 {
                      0% { clip-path: inset(20% 0 80% 0); transform: translate(-2px, 1px); }
                      20% { clip-path: inset(60% 0 10% 0); transform: translate(2px, -1px); }
                      40% { clip-path: inset(40% 0 50% 0); transform: translate(-2px, 2px); }
                      60% { clip-path: inset(80% 0 5% 0); transform: translate(2px, -2px); }
                      80% { clip-path: inset(10% 0 70% 0); transform: translate(-1px, 1px); }
                      100% { clip-path: inset(30% 0 50% 0); transform: translate(1px, -1px); }
                    }
                    @keyframes glitch-anim-2 {
                      0% { clip-path: inset(10% 0 60% 0); transform: translate(2px, -1px); }
                      20% { clip-path: inset(30% 0 20% 0); transform: translate(-2px, 1px); }
                      40% { clip-path: inset(70% 0 10% 0); transform: translate(2px, 2px); }
                      60% { clip-path: inset(20% 0 50% 0); transform: translate(-2px, -2px); }
                      80% { clip-path: inset(50% 0 30% 0); transform: translate(1px, 1px); }
                      100% { clip-path: inset(5% 0 80% 0); transform: translate(-1px, -1px); }
                    }
                  `}</style>

                  {/* Base Image */}
                  <Image 
                    src="/image.webp" 
                    alt="SYS.USR.01" 
                    fill
                    className="object-cover filter grayscale contrast-125 brightness-90 group-hover:grayscale-0 transition-all duration-700"
                  />
                  
                  {/* Glitch Layers (visible on hover) */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Image 
                      src="/image.webp" 
                      alt="" 
                      fill
                      className="object-cover filter grayscale contrast-150 mix-blend-screen glitch-img-1"
                      style={{ filter: 'drop-shadow(3px 0 0 #ff4444)' }}
                    />
                    <Image 
                      src="/image.webp" 
                      alt="" 
                      fill
                      className="object-cover filter grayscale contrast-150 mix-blend-screen glitch-img-2"
                      style={{ filter: 'drop-shadow(-3px 0 0 #69f0ae)' }}
                    />
                  </div>

                  {/* Hologram Overlays */}
                  <div className="absolute inset-0 bg-[#e6e2af] mix-blend-overlay opacity-20 z-10 pointer-events-none" />
                  <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_4px] z-20 pointer-events-none opacity-50" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#e6e2af]/10 via-transparent to-black/60 z-20 pointer-events-none" />
                  
                  {/* Scanning Line */}
                  <div className="absolute top-0 left-0 w-full h-2 bg-[#e6e2af]/30 shadow-[0_0_15px_#e6e2af] z-30 animate-[scanline_4s_linear_infinite] pointer-events-none" />

                  {/* Decorative elements */}
                  <div className="absolute top-4 left-4 text-[#e6e2af] text-xs font-mono z-30 bg-black/60 px-2 py-1 border border-[#e6e2af]/30 backdrop-blur-sm">
                    SYS.USR.01
                  </div>
                  <div className="absolute bottom-4 right-4 text-[#e6e2af] text-xs font-mono z-30 bg-black/60 px-2 py-1 border border-[#e6e2af]/30 backdrop-blur-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    ONLINE
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
