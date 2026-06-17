'use client';
import { LangProvider } from '@/lib/lang-context';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <LangProvider>
      <Nav />
      {children}
      <Footer />
    </LangProvider>
  );
}
