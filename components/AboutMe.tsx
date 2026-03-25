import { motion } from 'motion/react';
import { Code, Film, Music, Sparkles, GraduationCap, Globe, User, BrainCircuit } from 'lucide-react';
import Image from 'next/image';
import { useGlitch } from './GlitchContext';
import { useState } from 'react';

export default function AboutMe() {
  const { trackSection, reportUserAction, foundSecret } = useGlitch();
  const [activeTab, setActiveTab] = useState('bio');

  const tabs = [
    { id: 'bio', label: 'Biography', icon: User },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'languages', label: 'Languages', icon: Globe },
    { id: 'philosophy', label: 'Philosophy', icon: BrainCircuit },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'bio':
        return (
          <motion.div 
            key="bio"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <p className="border-l-2 border-[#e6e2af]/30 pl-5 text-gray-300">
              I didn't begin my career as a video editor. My path started in computer engineering and programming, leading to a Master’s degree in Informatics from BSU. Although I valued the logic behind coding, it never fully connected with me. What remained constant was my love for editing.
            </p>
            <p className="border-l-2 border-[#e6e2af]/30 pl-5 text-gray-300">
              What started as a refuge editing anime clips to music to express my emotions transformed into a fiercely competitive field. Over the last 6 years, I have developed a career characterized by technical accuracy and creative influence, merging the engineering precision of my education with the pure enthusiasm of an AMV champion.
            </p>
            <p className="border-l-2 border-[#e6e2af]/30 pl-5 text-gray-300">
              My work is deeply rooted in a passion for digital art from winning multiple Editing Tournaments to partnering with top tier content creators like Braxaphone, Glaivekiyo, and Saintontas. I don’t merely “complete projects”; I craft unforgettable visual experiences. Whether I’m constructing intricate After Effects compositions or designing narrative-driven cinematic openings, my aim remains consistent: to create experiences that are not only viewed but truly felt.
            </p>
          </motion.div>
        );
      case 'education':
        return (
          <motion.div 
            key="education"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:ml-[1.25rem] md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-[#e6e2af] before:via-gray-800 before:to-transparent"
          >
            {/* Timeline Item 1 */}
            <div className="relative flex items-start gap-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-[#e6e2af] bg-[#0a0a0a] shrink-0 z-10 shadow-[0_0_10px_rgba(230,226,175,0.2)]">
                <div className="w-2 h-2 bg-[#e6e2af] rounded-full animate-pulse" />
              </div>
              <div className="flex-1 p-5 rounded border border-gray-800 bg-gray-900/40 hover:border-[#e6e2af]/40 transition-colors group">
                <h4 className="text-white font-semibold text-lg group-hover:text-[#e6e2af] transition-colors">Master of Science: Informatics</h4>
                <p className="text-[#e6e2af] text-sm mb-3">Baku State University (BSU)</p>
                <p className="text-sm text-gray-400 leading-relaxed">Advanced focus on information systems and algorithmic logic. This academic foundation allows me to approach complex project structures and data management with a systematic, high-level perspective.</p>
              </div>
            </div>
            {/* Timeline Item 2 */}
            <div className="relative flex items-start gap-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-700 bg-[#0a0a0a] shrink-0 z-10">
                <div className="w-2 h-2 bg-gray-600 rounded-full" />
              </div>
              <div className="flex-1 p-5 rounded border border-gray-800 bg-gray-900/40 hover:border-[#e6e2af]/40 transition-colors group">
                <h4 className="text-white font-semibold text-lg group-hover:text-[#e6e2af] transition-colors">Bachelor of Science: Computer Engineering</h4>
                <p className="text-[#e6e2af] text-sm mb-3">Azerbaijan Technical University (AzTU)</p>
                <p className="text-sm text-gray-400 leading-relaxed">Fundamental engineering principles. My background in hardware architecture and system optimization provides a distinct advantage in managing heavy rendering workloads and complex software integrations.</p>
              </div>
            </div>
            {/* Timeline Item 3 */}
            <div className="relative flex items-start gap-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-700 bg-[#0a0a0a] shrink-0 z-10">
                <div className="w-2 h-2 bg-gray-600 rounded-full" />
              </div>
              <div className="flex-1 p-5 rounded border border-gray-800 bg-gray-900/40 hover:border-[#e6e2af]/40 transition-colors group">
                <h4 className="text-white font-semibold text-lg group-hover:text-[#e6e2af] transition-colors">Professional Diploma: Digital Design</h4>
                <p className="text-[#e6e2af] text-sm mb-3">IT STEP Academy</p>
                <p className="text-sm text-gray-400 leading-relaxed">A multi-disciplinary program where I bridged the gap between Front-End Development, Professional Video Editing, and Visual Retouching. This is where my technical engineering roots met professional creative production.</p>
              </div>
            </div>
          </motion.div>
        );
      case 'languages':
        return (
          <motion.div 
            key="languages"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 gap-6"
          >
            {[
              { lang: 'Azerbaijani', level: 'Native', percentage: 100 },
              { lang: 'Russian', level: 'Bilingual', percentage: 95 },
              { lang: 'English', level: 'Professional Working Proficiency', percentage: 85 },
              { lang: 'Turkish', level: 'Professional Working Proficiency', percentage: 80 },
            ].map((item, idx) => (
              <div key={item.lang} className="space-y-2 p-4 rounded border border-gray-800 bg-gray-900/30">
                <div className="flex justify-between items-end mb-2">
                  <h4 className="text-white font-semibold tracking-wide">{item.lang}</h4>
                  <span className="text-xs text-[#e6e2af] uppercase tracking-widest">{item.level}</span>
                </div>
                <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percentage}%` }}
                    transition={{ duration: 1, delay: idx * 0.1, ease: "easeOut" }}
                    className="h-full bg-[#e6e2af]"
                  />
                </div>
              </div>
            ))}
          </motion.div>
        );
      case 'philosophy':
        return (
          <motion.div 
            key="philosophy"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative p-8 border border-gray-800 bg-gray-900/30 mt-4"
          >
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#e6e2af]" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#e6e2af]" />
            
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 bg-red-500 animate-pulse" />
              <span className="text-xs font-mono text-gray-500 tracking-widest uppercase">System.Log // Philosophy</span>
            </div>
            
            <p className="italic text-gray-300 text-lg leading-relaxed relative z-10">
              &quot;My background as a Computer Engineer means I don't just use creative software; I understand the architecture behind it. This technical depth allows me to optimize performance, troubleshoot complex VFX pipelines, and maintain peak visual quality in high-pressure environments.&quot;
            </p>
          </motion.div>
        );
      default:
        return null;
    }
  };

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Tab Switcher */}
            <div className="flex flex-wrap gap-2 border-b border-gray-800 pb-4">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex items-center gap-2 px-5 py-2.5 rounded-t-lg transition-all duration-300 overflow-hidden ${
                      isActive
                        ? 'text-[#e6e2af] bg-gray-900/80'
                        : 'text-gray-500 hover:text-gray-300 hover:bg-gray-900/40'
                    }`}
                  >
                    {isActive && (
                      <motion.div 
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#e6e2af]"
                      />
                    )}
                    <Icon className={`w-4 h-4 ${isActive ? 'animate-pulse' : ''}`} />
                    <span className="font-medium tracking-wide text-sm">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Content */}
            <div className="text-gray-400 text-lg leading-relaxed min-h-[300px]">
              {renderContent()}
            </div>
            
            <div className="pt-6 grid grid-cols-2 gap-6 border-t border-gray-800">
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
                  <div className="absolute bottom-4 right-4 text-[#e6e2af] text-xs font-mono z-30 bg-black/60 px-2 py-1 border border-[#e6e2af]/30 backdrop-blur-sm flex items-center gap-2 cursor-pointer" onClick={foundSecret}>
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
