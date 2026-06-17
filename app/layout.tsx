import type { Metadata, Viewport } from 'next';
import { Sarabun, Mitr, Noto_Serif_Thai, Fredoka } from 'next/font/google';
import SessionProvider from '@/components/SessionProvider';
import './globals.css';

// School style — structured, textbook familiar
const sarabun = Sarabun({
  subsets: ['thai', 'latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-thai-school',
  display: 'swap',
  preload: true,
});

// Rounded — soft, open letterforms, best for beginners
const mitr = Mitr({
  subsets: ['thai', 'latin'],
  weight: ['400', '500', '600'],
  variable: '--font-thai-sans',
  display: 'swap',
  preload: false,
});

// Rounded kids UI — playful, chunky Latin labels
const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-kids-round',
  display: 'swap',
  preload: false,
});

// Traditional serif — calligraphic, for advanced readers
const notoSerifThai = Noto_Serif_Thai({
  subsets: ['thai'],
  weight: ['400', '700', '900'],
  variable: '--font-thai-serif',
  display: 'swap',
  preload: false,
});

export const metadata: Metadata = {
  title: 'Pikko · Thai Reading for Kids',
  description: 'Interactive Thai books with karaoke audio and progress tracking for children aged 4–9.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FF6635',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" className={`${sarabun.variable} ${mitr.variable} ${notoSerifThai.variable} ${fredoka.variable}`}>
      <body className="antialiased" style={{ fontFamily: 'var(--font-thai-school), sans-serif' }}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
