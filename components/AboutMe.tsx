import { motion } from 'motion/react';
import { Code, Film, Music, Sparkles, GraduationCap, Globe, User, BrainCircuit, Wrench, Zap } from 'lucide-react';
import Image from 'next/image';
import { useGlitch } from './GlitchContext';
import { useState } from 'react';
import { useLanguage } from './LanguageContext';

const profileImg = 'https://res.cloudinary.com/ds6dwbk37/image/upload/v1774436237/pp_itmpcf.png';

export default function AboutMe() {
  const { trackSection, reportUserAction, foundSecret } = useGlitch();
  const [activeTab, setActiveTab] = useState('bio');
  const { t } = useLanguage();

  const tabs = [
    { id: 'bio', label: t('about.bio'), icon: User },
    { id: 'skills', label: t('about.skills'), icon: Zap },
    { id: 'software', label: t('about.software'), icon: Wrench },
    { id: 'education', label: t('about.education'), icon: GraduationCap },
    { id: 'languages', label: t('about.languages'), icon: Globe },
    { id: 'philosophy', label: t('about.philosophy'), icon: BrainCircuit },
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
            <p className="border-l-2 border-nier-beige/30 pl-5 text-[#e8e6e1]/80">
              {t('about.bio_p1')}
            </p>
            <p className="border-l-2 border-nier-beige/30 pl-5 text-[#e8e6e1]/80">
              {t('about.bio_p2')}
            </p>
            <p className="border-l-2 border-nier-beige/30 pl-5 text-[#e8e6e1]/80">
              {t('about.bio_p3')}
            </p>
          </motion.div>
        );
      case 'skills':
        return (
          <motion.div 
            key="skills"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {[
              { title: t('about.skill_1_title'), desc: t('about.skill_1_desc') },
              { title: t('about.skill_2_title'), desc: t('about.skill_2_desc') },
              { title: t('about.skill_3_title'), desc: t('about.skill_3_desc') },
              { title: t('about.skill_4_title'), desc: t('about.skill_4_desc') },
              { title: t('about.skill_5_title'), desc: t('about.skill_5_desc') },
              { title: t('about.skill_6_title'), desc: t('about.skill_6_desc') }
            ].map((skill, idx) => (
              <div key={idx} className="border-l-2 border-nier-beige/30 pl-5">
                <h4 className="text-[#e8e6e1] font-semibold text-lg mb-1">{skill.title}</h4>
                <p className="text-[#e8e6e1]/70 text-sm leading-relaxed">{skill.desc}</p>
              </div>
            ))}
          </motion.div>
        );
      case 'software':
        return (
          <motion.div 
            key="software"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {[
              { title: t('about.soft_1_title'), desc: t('about.soft_1_desc') },
              { title: t('about.soft_2_title'), desc: t('about.soft_2_desc') },
              { title: t('about.soft_3_title'), desc: t('about.soft_3_desc') },
              { title: t('about.soft_4_title'), desc: t('about.soft_4_desc') }
            ].map((software, idx) => (
              <div key={idx} className="p-4 rounded border border-nier-dark/80 bg-nier-dark/20 hover:border-nier-beige/40 transition-colors">
                <h4 className="text-[#e8e6e1] font-semibold mb-2">{software.title}</h4>
                <p className="text-[#e8e6e1]/70 text-sm leading-relaxed">{software.desc}</p>
              </div>
            ))}
          </motion.div>
        );
      case 'education':
        return (
          <motion.div 
            key="education"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:ml-[1.25rem] md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-nier-beige before:via-nier-dark before:to-transparent"
          >
            {/* Timeline Item 1 */}
            <div className="relative flex items-start gap-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-nier-beige bg-nier-gray shrink-0 z-10 shadow-[0_0_10px_rgba(218,212,196,0.2)]">
                <div className="w-2 h-2 bg-nier-beige rounded-full animate-pulse" />
              </div>
              <div className="flex-1 p-5 rounded border border-nier-dark/80 bg-nier-dark/20 hover:border-nier-beige/40 transition-colors group">
                <h4 className="text-[#e8e6e1] font-semibold text-lg group-hover:text-nier-beige transition-colors">{t('about.edu_1_title')}</h4>
                <p className="text-nier-beige text-sm mb-3">Baku State University (BSU)</p>
                <p className="text-sm text-[#e8e6e1]/70 leading-relaxed">{t('about.edu_1_desc')}</p>
              </div>
            </div>
            {/* Timeline Item 2 */}
            <div className="relative flex items-start gap-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-nier-dark/60 bg-nier-gray shrink-0 z-10">
                <div className="w-2 h-2 bg-nier-dark/40 rounded-full" />
              </div>
              <div className="flex-1 p-5 rounded border border-nier-dark/80 bg-nier-dark/20 hover:border-nier-beige/40 transition-colors group">
                <h4 className="text-[#e8e6e1] font-semibold text-lg group-hover:text-nier-beige transition-colors">{t('about.edu_2_title')}</h4>
                <p className="text-nier-beige text-sm mb-3">Azerbaijan Technical University (AzTU)</p>
                <p className="text-sm text-[#e8e6e1]/70 leading-relaxed">{t('about.edu_2_desc')}</p>
              </div>
            </div>
            {/* Timeline Item 3 */}
            <div className="relative flex items-start gap-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-nier-dark/60 bg-nier-gray shrink-0 z-10">
                <div className="w-2 h-2 bg-nier-dark/40 rounded-full" />
              </div>
              <div className="flex-1 p-5 rounded border border-nier-dark/80 bg-nier-dark/20 hover:border-nier-beige/40 transition-colors group">
                <h4 className="text-[#e8e6e1] font-semibold text-lg group-hover:text-nier-beige transition-colors">{t('about.edu_3_title')}</h4>
                <p className="text-nier-beige text-sm mb-3">IT STEP Academy</p>
                <p className="text-sm text-[#e8e6e1]/70 leading-relaxed">{t('about.edu_3_desc')}</p>
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
              { lang: t('about.lang_1'), level: t('about.lang_1_level'), percentage: 100 },
              { lang: t('about.lang_2'), level: t('about.lang_2_level'), percentage: 95 },
              { lang: t('about.lang_3'), level: t('about.lang_3_level'), percentage: 85 },
              { lang: t('about.lang_4'), level: t('about.lang_4_level'), percentage: 80 },
            ].map((item, idx) => (
              <div key={item.lang} className="space-y-2 p-4 rounded border border-nier-dark/80 bg-nier-dark/20">
                <div className="flex justify-between items-end mb-2">
                  <h4 className="text-[#e8e6e1] font-semibold tracking-wide">{item.lang}</h4>
                  <span className="text-xs text-nier-beige uppercase tracking-widest">{item.level}</span>
                </div>
                <div className="h-1.5 w-full bg-nier-dark/80 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percentage}%` }}
                    transition={{ duration: 1, delay: idx * 0.1, ease: "easeOut" }}
                    className="h-full bg-nier-beige"
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
            className="relative p-8 border border-nier-dark/80 bg-nier-dark/20 mt-4"
          >
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-nier-beige" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-nier-beige" />
            
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 bg-nier-red animate-pulse" />
              <span className="text-xs font-mono text-[#e8e6e1]/50 tracking-widest uppercase">{t('about.philosophy_log')}</span>
            </div>
            
            <p className="italic text-[#e8e6e1]/80 text-lg leading-relaxed relative z-10">
              &quot;{t('about.philosophy_quote')}&quot;
            </p>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="py-24 bg-nier-gray text-[#e8e6e1] relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(var(--color-nier-dark) 1px, transparent 1px), linear-gradient(90deg, var(--color-nier-dark) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
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
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-[#e8e6e1] uppercase">
            <span className="text-nier-beige">01.</span> {t('about.title')}
          </h2>
          <div className="w-20 h-1 bg-nier-beige mb-8" />
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
            <div className="flex flex-wrap gap-2 border-b border-nier-dark/80 pb-4">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex items-center gap-1.5 md:gap-2 px-3 py-2 md:px-5 md:py-2.5 rounded-t-lg transition-all duration-300 overflow-hidden ${
                      isActive
                        ? 'text-nier-beige bg-nier-dark/60'
                        : 'text-[#e8e6e1]/50 hover:text-[#e8e6e1]/80 hover:bg-nier-dark/30'
                    }`}
                  >
                    {isActive && (
                      <motion.div 
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-nier-beige"
                      />
                    )}
                    <Icon className={`w-3.5 h-3.5 md:w-4 md:h-4 ${isActive ? 'animate-pulse' : ''}`} />
                    <span className="font-medium tracking-wide text-xs md:text-sm">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Content */}
            <div className="text-[#e8e6e1]/70 text-lg leading-relaxed min-h-[300px]">
              {renderContent()}
            </div>
            
            <div className="pt-6 grid grid-cols-2 gap-6 border-t border-nier-dark/80">
              <div className="flex items-center gap-3">
                <Code className="w-5 h-5 text-nier-beige" />
                <span className="text-[#e8e6e1] text-sm tracking-wider uppercase">{t('about.frontend')}</span>
              </div>
              <div className="flex items-center gap-3">
                <Film className="w-5 h-5 text-nier-beige" />
                <span className="text-[#e8e6e1] text-sm tracking-wider uppercase">{t('about.video')}</span>
              </div>
              <div className="flex items-center gap-3">
                <Music className="w-5 h-5 text-nier-beige" />
                <span className="text-[#e8e6e1] text-sm tracking-wider uppercase">{t('about.sound')}</span>
              </div>
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-nier-beige" />
                <span className="text-[#e8e6e1] text-sm tracking-wider uppercase">{t('about.motion')}</span>
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
              <div className="absolute inset-0 border-2 border-nier-beige translate-x-4 translate-y-4" />
              <div className="absolute inset-0 bg-nier-dark border border-nier-dark/80 flex items-center justify-center overflow-hidden">
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
                    src={profileImg} 
                    alt="SYS.USR.01" 
                    fill
                    referrerPolicy="no-referrer"
                    className="object-cover filter grayscale contrast-125 brightness-90 group-hover:grayscale-0 transition-all duration-700"
                  />
                  
                  {/* Glitch Layers (visible on hover) */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Image 
                      src={profileImg} 
                      alt="" 
                      fill
                      referrerPolicy="no-referrer"
                      className="object-cover filter grayscale contrast-150 mix-blend-screen glitch-img-1"
                      style={{ filter: 'drop-shadow(3px 0 0 #ff4444)' }}
                    />
                    <Image 
                      src={profileImg} 
                      alt="" 
                      fill
                      referrerPolicy="no-referrer"
                      className="object-cover filter grayscale contrast-150 mix-blend-screen glitch-img-2"
                      style={{ filter: 'drop-shadow(-3px 0 0 #69f0ae)' }}
                    />
                  </div>

                  {/* Hologram Overlays */}
                  <div className="absolute inset-0 bg-nier-beige mix-blend-overlay opacity-20 z-10 pointer-events-none" />
                  <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_4px] z-20 pointer-events-none opacity-50" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-nier-beige/10 via-transparent to-black/60 z-20 pointer-events-none" />
                  
                  {/* Scanning Line */}
                  <div className="absolute top-0 left-0 w-full h-2 bg-nier-beige/30 shadow-[0_0_15px_var(--color-nier-beige)] z-30 animate-[scanline_4s_linear_infinite] pointer-events-none" />

                  {/* Decorative elements */}
                  <div className="absolute top-4 left-4 text-nier-beige text-xs font-mono z-30 bg-black/60 px-2 py-1 border border-nier-beige/30 backdrop-blur-sm">
                    SYS.USR.01
                  </div>
                  <div className="absolute bottom-4 right-4 text-nier-beige text-xs font-mono z-30 bg-black/60 px-2 py-1 border border-nier-beige/30 backdrop-blur-sm flex items-center gap-2 cursor-pointer" onClick={foundSecret}>
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
