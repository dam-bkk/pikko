import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      className="min-h-dvh flex flex-col items-center justify-center px-6 text-center"
      style={{ background: 'linear-gradient(150deg,#1A0845 0%,#2D1278 40%,#5B20CC 80%,#7C2DFF 100%)', position: 'relative', overflow: 'hidden' }}
    >
      {/* Background orbs */}
      <div className="float-animate" style={{ position: 'absolute', top: '14%', left: '6%', width: 52, height: 52, backgroundColor: '#FFD60A', borderRadius: '50%', opacity: 0.85, animationDelay: '0s', pointerEvents: 'none' }} />
      <div className="float-animate" style={{ position: 'absolute', top: '72%', left: '4%', width: 24, height: 24, backgroundColor: '#FF5757', borderRadius: '50%', opacity: 0.8, animationDelay: '1.2s', pointerEvents: 'none' }} />
      <div className="float-animate" style={{ position: 'absolute', top: '10%', right: '5%', width: 20, height: 20, backgroundColor: '#FF4C91', borderRadius: '50%', opacity: 0.75, animationDelay: '0.6s', pointerEvents: 'none' }} />
      <div className="float-animate" style={{ position: 'absolute', top: '76%', right: '7%', width: 38, height: 38, backgroundColor: '#FFD60A', borderRadius: '50%', opacity: 0.65, animationDelay: '1.8s', pointerEvents: 'none' }} />

      <div className="relative z-10" style={{ maxWidth: 440, width: '100%' }}>
        {/* Logo */}
        <div className="mx-auto mb-6" style={{ width: 80, height: 80, background: 'linear-gradient(135deg,#FFD60A,#FF8C35)', borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 12px 32px rgba(255,214,10,0.4)' }}>
          <svg width="44" height="44" viewBox="0 0 80 80" fill="none">
            <path d="M40 16 L10 21 L10 62 L40 57 Z" fill="white" fillOpacity={0.95} />
            <path d="M40 16 L70 21 L70 62 L40 57 Z" fill="white" fillOpacity={0.8} />
            <line x1="40" y1="16" x2="40" y2="57" stroke="rgba(124,77,255,0.6)" strokeWidth="2.5" />
            <text x="55" y="46" textAnchor="middle" fill="rgba(255,214,10,0.85)" fontSize="20" fontWeight="900" fontFamily="system-ui,sans-serif">ก</text>
          </svg>
        </div>

        <p className="font-black" style={{ color: 'rgba(255,214,10,0.9)', fontSize: 'clamp(3rem,12vw,5rem)', lineHeight: 1 }}>404</p>
        <h1 className="font-black mb-2" style={{ color: 'white', fontSize: 'clamp(1.3rem,4vw,1.8rem)' }}>
          This page wandered off
        </h1>
        <p className="mb-9 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
          The page you&rsquo;re looking for doesn&rsquo;t exist. Let&rsquo;s get you back to the stories.
        </p>

        <Link
          href="/"
          className="inline-block btn-bounce font-bold rounded-full transition-all duration-200 hover:-translate-y-0.5"
          style={{ background: 'linear-gradient(135deg,#FFD60A,#FF8C35)', color: '#1A0845', fontSize: 16, padding: '15px 38px', boxShadow: '0 8px 32px rgba(255,214,10,0.4)' }}
        >
          Back to Pikko
        </Link>
      </div>
    </div>
  );
}
