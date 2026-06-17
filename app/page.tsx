'use client';
import { useState } from 'react';
import { LangProvider } from '@/lib/lang-context';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import ProblemSolution from '@/components/ProblemSolution';
import FeaturesTab from '@/components/FeaturesTab';
import HowItWorks from '@/components/HowItWorks';
import FontsSection from '@/components/FontsSection';
import WhySection from '@/components/WhySection';
import Testimonials from '@/components/Testimonials';
import LevelsSection from '@/components/LevelsSection';
import PricingSection from '@/components/PricingSection';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';

function LandingPage() {
  const [modal, setModal] = useState(false);
  const open = () => setModal(true);

  return (
    <>
      <Nav onGetStarted={open} />
      <main>
        <Hero onGetStarted={open} />
        <TrustBar />
        <ProblemSolution />
        <FeaturesTab />
        <HowItWorks />
        <FontsSection />
        <WhySection />
        <Testimonials />
        <LevelsSection />
        <PricingSection onGetStarted={open} />
        <FAQ />
        <FinalCTA onGetStarted={open} />
      </main>
      <Footer />
      {modal && <AuthModal onClose={() => setModal(false)} />}
    </>
  );
}

export default function Home() {
  return (
    <LangProvider>
      <LandingPage />
    </LangProvider>
  );
}
