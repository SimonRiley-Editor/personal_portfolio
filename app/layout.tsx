import type {Metadata} from 'next';
import { Inter, Space_Grotesk, Archivo_Black, Michroma } from 'next/font/google';
import './globals.css'; // Global styles
import { GlitchProvider } from '@/components/GlitchContext';
import CustomCursor from '@/components/CustomCursor';
import MusicPlayer from '@/components/MusicPlayer';
import PodSystem from '@/components/PodSystem';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' });
const archivoBlack = Archivo_Black({ weight: '400', subsets: ['latin'], variable: '--font-wide' });
const michroma = Michroma({ weight: '400', subsets: ['latin'], variable: '--font-akira' });

export const metadata: Metadata = {
  title: 'Video Editor Portfolio',
  description: 'Portfolio of a Video Editor and Motion Designer',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${archivoBlack.variable} ${michroma.variable}`}>
      <body className="font-sans antialiased text-nier-dark bg-nier-beige relative min-h-screen" suppressHydrationWarning>
        <GlitchProvider>
          <CustomCursor />
          <MusicPlayer />
          <div className="fixed inset-0 nier-noise z-50 mix-blend-overlay pointer-events-none"></div>
          <div className="fixed inset-0 nier-scanlines z-50 pointer-events-none"></div>
          <PodSystem />
          {children}
        </GlitchProvider>
      </body>
    </html>
  );
}
