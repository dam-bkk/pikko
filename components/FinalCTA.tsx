'use client';
import { useLang } from '@/lib/lang-context';
import { useInView } from '@/lib/use-in-view';

const TITLE_HIGHLIGHT: Record<string, string> = {
  en: 'reading journey',
  th: 'การเดินทางการอ่าน',
  fr: 'voyage de lecture',
  zh: '阅读之旅',
  ja: '読書の旅',
  ko: '독서 여정',
};

export default function FinalCTA({ onGetStarted }: { onGetStarted: () => void }) {
  const { t, lang } = useLang();
  const { finalCta } = t;
  const section = useInView(0);

  return (
    <section
      style={{
        background: 'linear-gradient(150deg, #1A0845 0%, #2D1278 40%, #5B20CC 80%, #7C2DFF 100%)',
        paddingTop: 112, paddingBottom: 112,
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Background blobs */}
      <div style={{ position: 'absolute', top: -120, left: -120, width: 500, height: 500, background: 'radial-gradient(circle, rgba(255,87,87,0.18) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -80, right: -80, width: 420, height: 420, background: 'radial-gradient(circle, rgba(0,209,167,0.15) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '45%', left: '35%', width: 300, height: 300, background: 'radial-gradient(circle, rgba(255,214,10,0.08) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

      {/* Vivid floating orbs */}
      <div className="float-animate" style={{ position: 'absolute', top: '12%', left: '5%',  width: 52, height: 52, backgroundColor: '#FFD60A', borderRadius: '50%', opacity: 0.9,  animationDelay: '0s',   pointerEvents: 'none' }} />
      <div className="float-animate" style={{ position: 'absolute', top: '70%', left: '3%',  width: 24, height: 24, backgroundColor: '#FF5757', borderRadius: '50%', opacity: 0.85, animationDelay: '1.2s', pointerEvents: 'none' }} />
      <div className="float-animate" style={{ position: 'absolute', top: '45%', left: '1.5%',width: 16, height: 16, backgroundColor: '#00D2AA', borderRadius: '50%', opacity: 0.75, animationDelay: '2.4s', pointerEvents: 'none' }} />
      <div className="float-animate" style={{ position: 'absolute', top: '8%',  right: '4%', width: 20, height: 20, backgroundColor: '#FF4C91', borderRadius: '50%', opacity: 0.8,  animationDelay: '0.6s', pointerEvents: 'none' }} />
      <div className="float-animate" style={{ position: 'absolute', top: '75%', right: '6%', width: 38, height: 38, backgroundColor: '#FFD60A', borderRadius: '50%', opacity: 0.7,  animationDelay: '1.8s', pointerEvents: 'none' }} />
      <div className="float-animate" style={{ position: 'absolute', top: '30%', right: '2%', width: 14, height: 14, backgroundColor: '#00D2AA', borderRadius: '50%', opacity: 0.65, animationDelay: '3s',   pointerEvents: 'none' }} />

      {/* Sparkle crosses */}
      {[
        { top: '20%', left: '12%',  size: 24, delay: 0 },
        { top: '58%', left: '22%',  size: 16, delay: 0.5 },
        { top: '15%', right: '12%', size: 20, delay: 1 },
        { top: '70%', right: '18%', size: 14, delay: 1.5 },
      ].map((s, i) => (
        <svg key={i} className="float-animate" style={{ position: 'absolute', top: s.top, left: (s as any).left, right: (s as any).right, opacity: 0.55, animationDelay: `${s.delay}s`, pointerEvents: 'none' }} width={s.size} height={s.size} viewBox="0 0 24 24" fill="none">
          <path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      ))}

      {/* Stars */}
      {[
        { top: '38%', left: '8%'  }, { top: '62%', left: '16%' },
        { top: '28%', right: '8%' }, { top: '52%', right: '14%' },
      ].map((s, i) => (
        <div key={i} className="float-animate" style={{ position: 'absolute', top: s.top, left: (s as any).left, right: (s as any).right, animationDelay: `${i * 0.7}s`, pointerEvents: 'none' }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 0l1.3 4H12L8.4 6.5 9.7 12 6 9.5 2.3 12l1.3-5.5L0 4h4.7z" fill="rgba(255,255,255,0.4)" />
          </svg>
        </div>
      ))}

      <div
        ref={section.ref as React.RefObject<HTMLDivElement>}
        className={`max-w-3xl mx-auto px-6 text-center relative ${section.inView ? 'anim-slide-up' : ''}`}
        style={{ opacity: section.inView ? undefined : 0 }}
      >
        {/* Animated open book */}
        <div className="wiggle mx-auto mb-6" style={{ width: 80, height: 80 }}>
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <path d="M40 16 L10 21 L10 62 L40 57 Z" fill="white" fillOpacity={0.95}/>
            <path d="M40 16 L70 21 L70 62 L40 57 Z" fill="white" fillOpacity={0.8}/>
            <line x1="40" y1="16" x2="40" y2="57" stroke="rgba(124,77,255,0.6)" strokeWidth="2.5"/>
            <line x1="17" y1="30" x2="34" y2="28.5" stroke="rgba(124,77,255,0.35)" strokeWidth="2" strokeLinecap="round"/>
            <line x1="17" y1="37" x2="34" y2="35.5" stroke="rgba(124,77,255,0.25)" strokeWidth="2" strokeLinecap="round"/>
            <line x1="17" y1="44" x2="28" y2="43"   stroke="rgba(124,77,255,0.2)"  strokeWidth="2" strokeLinecap="round"/>
            <text x="55" y="46" textAnchor="middle" fill="rgba(255,214,10,0.85)" fontSize="20" fontWeight="900" fontFamily="system-ui,sans-serif">ก</text>
            <circle cx="62" cy="30" r="3"   fill="rgba(255,214,10,0.85)"/>
            <circle cx="56" cy="35" r="2"   fill="rgba(255,214,10,0.6)"/>
            <circle cx="66" cy="38" r="1.5" fill="rgba(255,214,10,0.5)"/>
          </svg>
        </div>

        <h2 className="font-black mb-4 leading-tight" style={{ color: 'white', fontSize: 'clamp(2rem,5vw,3rem)' }}>
          {(() => {
            const title = finalCta.title;
            const word  = TITLE_HIGHLIGHT[lang] ?? TITLE_HIGHLIGHT.en;
            const idx   = title.indexOf(word);
            if (idx === -1) return <>{title}</>;
            return (
              <>
                {title.slice(0, idx)}
                <span className="text-gradient">{word}</span>
                {title.slice(idx + word.length)}
              </>
            );
          })()}
        </h2>

        <p className="mb-10 text-lg" style={{ color: 'rgba(255,255,255,0.75)' }}>{finalCta.subtitle}</p>

        <button
          onClick={onGetStarted}
          className="btn-bounce font-bold rounded-full transition-all duration-200 hover:shadow-2xl"
          style={{
            background: 'linear-gradient(135deg, #FFD60A, #FF8C35)',
            color: '#1A0845', fontSize: 17, padding: '18px 52px',
            boxShadow: '0 8px 32px rgba(255,214,10,0.4)',
          }}
        >
          {finalCta.cta}
        </button>

        <p className="mt-4 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>{finalCta.sub}</p>
      </div>
    </section>
  );
}
