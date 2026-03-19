import type {Metadata} from 'next';
import { Inter, Space_Grotesk, Archivo_Black } from 'next/font/google';
import './globals.css'; // Global styles

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' });
const archivoBlack = Archivo_Black({ weight: '400', subsets: ['latin'], variable: '--font-wide' });

export const metadata: Metadata = {
  title: 'Video Editor Portfolio',
  description: 'Portfolio of a Video Editor and Motion Designer',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${archivoBlack.variable}`}>
      <body className="font-sans antialiased text-black" suppressHydrationWarning>{children}</body>
    </html>
  );
}
