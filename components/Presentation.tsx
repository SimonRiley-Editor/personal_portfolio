import { motion } from 'motion/react';
import { Database, Maximize2, ExternalLink } from 'lucide-react';

export default function Presentation() {
  const slidesUrl = "https://docs.google.com/presentation/d/e/2PACX-1vT-IE_7oHLKQJ_KK4Ll6mbbxnS1pqSXXFvi_7Mu10xkU3KusVdvaPnBHF6dBPDGdY7yusicF8SA-vqK/pubembed?start=false&loop=false&delayms=5000";

  return (
    <section id="presentation" className="py-24 bg-nier-beige text-nier-dark relative overflow-hidden border-y border-nier-dark/20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(var(--color-nier-dark) 1px, transparent 1px), linear-gradient(90deg, var(--color-nier-dark) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Database className="w-5 h-5 text-nier-dark animate-pulse" />
              <span className="text-sm font-mono tracking-widest uppercase font-bold">System.Archive // Data Retrieval</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-nier-dark">
              <span className="text-nier-dark/50">02.</span> PORTFOLIO DECK
            </h2>
            <div className="w-20 h-1 bg-nier-dark mt-4" />
          </div>
          
          <div className="font-mono text-sm text-nier-dark/70 bg-nier-dark/5 px-4 py-2 border border-nier-dark/20">
            STATUS: <span className="text-green-600 font-bold">ONLINE</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          {/* NieR Styled Container */}
          <div className="relative bg-nier-gray p-1 md:p-2 border border-nier-dark shadow-2xl">
            {/* Corner Accents */}
            <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-nier-dark" />
            <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-nier-dark" />
            <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-nier-dark" />
            <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-nier-dark" />

            {/* Top Bar */}
            <div className="bg-nier-dark text-nier-beige px-4 py-2 flex justify-between items-center font-mono text-xs md:text-sm mb-1 md:mb-2">
              <div className="flex items-center gap-4">
                <span className="animate-pulse">▶</span>
                <span>DATA_STREAM_ACTIVE</span>
              </div>
              <div className="flex items-center gap-4 opacity-70">
                <Maximize2 className="w-4 h-4 hidden md:block" />
                <span>1920x1080</span>
              </div>
            </div>

            {/* Google Slides Embed */}
            <div className="relative w-full aspect-[16/9] bg-black overflow-hidden group">
              {/* Scanline Overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] z-20 pointer-events-none opacity-30" />
              
              <iframe 
                src={slidesUrl}
                className="absolute top-0 left-0 w-full h-full border-0 z-10"
                allowFullScreen
                title="Portfolio Presentation"
              />
            </div>

            {/* Bottom Bar */}
            <div className="bg-nier-dark text-nier-beige px-4 py-2 mt-1 md:mt-2 flex justify-between items-center font-mono text-xs md:text-sm">
              <span>ENCRYPTION: NONE</span>
              <a 
                href={slidesUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <span>OPEN_EXTERNAL</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
