'use client';
import { useLang } from '@/lib/lang-context';
import { useInView } from '@/lib/use-in-view';

const TITLE_HIGHLIGHT: Record<string, string> = {
  en: '3 minutes', th: '3 นาที', fr: '3 minutes',
  zh: '3分钟', ja: '3分', ko: '3분',
};

const STEP_COLORS  = ['#FF6635', '#7C4DFF', '#4CC97C'];
const STEP_SHADOWS = ['#CC3A10', '#5530CC', '#2E9B5A'];
const STEP_GLOWS   = ['rgba(255,102,53,0.32)', 'rgba(124,77,255,0.32)', 'rgba(76,201,124,0.32)'];
const STEP_BG      = ['rgba(255,102,53,0.08)', 'rgba(124,77,255,0.08)', 'rgba(76,201,124,0.08)'];

/* Card appears at these delays; connectors appear just after the preceding card */
const CARD_DELAYS = [0, 0.9, 1.8];
const LINE_DELAYS = [0.55, 1.45];

export default function HowItWorks() {
  const { t, lang } = useLang();
  const { howItWorks } = t;
  const titleRef = useInView(0);
  const section = useInView(0);

  return (
    <section style={{ backgroundColor: 'white', paddingTop: 96, paddingBottom: 96, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: -80, right: -80, width: 320, height: 320, background: 'radial-gradient(circle, rgba(124,77,255,0.06) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -60, left: -60, width: 280, height: 280, background: 'radial-gradient(circle, rgba(255,102,53,0.06) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

      <div className="max-w-6xl mx-auto px-6 relative">
        <div
          ref={titleRef.ref as React.RefObject<HTMLDivElement>}
          className={`text-center mb-16 ${titleRef.inView ? 'anim-slide-up' : ''}`}
          style={{ opacity: titleRef.inView ? undefined : 0 }}
        >
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full mb-5"
            style={{ backgroundColor: 'rgba(124,77,255,0.1)', color: '#7C4DFF', border: '1.5px solid rgba(124,77,255,0.2)' }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="5" stroke="#7C4DFF" strokeWidth="1.5" />
              <path d="M4 6l1.5 1.5 2.5-2.5" stroke="#7C4DFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {howItWorks.subtitle}
          </div>
          <h2 className="font-black" style={{ color: '#1A2B3C', fontSize: 'clamp(1.75rem,4vw,2.5rem)' }}>
            {(() => {
              const title = howItWorks.title;
              const word = TITLE_HIGHLIGHT[lang] ?? TITLE_HIGHLIGHT.en;
              const idx = title.indexOf(word);
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
        </div>

        {/* Cards + animated connectors */}
        <div
          ref={section.ref as React.RefObject<HTMLDivElement>}
          className="hidden md:grid relative"
          style={{ gridTemplateColumns: 'repeat(3,1fr)', gap: 32 }}
        >
          {/* Connector 1: card 1 → card 2 (center of col1 to center of col2) */}
          <div
            className={section.inView ? 'anim-grow-line' : ''}
            style={{
              position: 'absolute',
              top: 36,
              left: '16.67%',
              width: '33.33%',
              height: 3,
              transformOrigin: 'left center',
              transform: section.inView ? undefined : 'scaleX(0)',
              animationDelay: `${LINE_DELAYS[0]}s`,
              background: `linear-gradient(90deg, ${STEP_COLORS[0]}, ${STEP_COLORS[1]})`,
              borderRadius: 99,
              zIndex: 0,
              boxShadow: `0 0 10px ${STEP_GLOWS[0]}`,
            }}
          />
          {/* Connector 2: card 2 → card 3 */}
          <div
            className={section.inView ? 'anim-grow-line' : ''}
            style={{
              position: 'absolute',
              top: 36,
              left: '50%',
              width: '33.33%',
              height: 3,
              transformOrigin: 'left center',
              transform: section.inView ? undefined : 'scaleX(0)',
              animationDelay: `${LINE_DELAYS[1]}s`,
              background: `linear-gradient(90deg, ${STEP_COLORS[1]}, ${STEP_COLORS[2]})`,
              borderRadius: 99,
              zIndex: 0,
              boxShadow: `0 0 10px ${STEP_GLOWS[1]}`,
            }}
          />

          {howItWorks.steps.map((step, i) => (
            <div
              key={step.num}
              className={section.inView ? 'anim-pop-in' : ''}
              style={{
                opacity: section.inView ? undefined : 0,
                animationDelay: `${CARD_DELAYS[i]}s`,
                textAlign: 'center',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <div className="rounded-3xl p-8 h-full"
                style={{
                  backgroundColor: STEP_BG[i],
                  border: `2px solid ${STEP_COLORS[i]}22`,
                  boxShadow: `0 8px 32px ${STEP_GLOWS[i]}`,
                }}>
                <div
                  className="w-18 h-18 rounded-2xl flex items-center justify-center mx-auto mb-5 font-black text-2xl btn-bounce"
                  style={{
                    width: 72, height: 72,
                    backgroundColor: STEP_COLORS[i],
                    color: 'white',
                    boxShadow: `4px 4px 0 ${STEP_SHADOWS[i]}, 0 12px 28px ${STEP_GLOWS[i]}`,
                    border: `3px solid ${STEP_SHADOWS[i]}`,
                    animationDelay: `${i * 0.4}s`,
                  }}
                >
                  {step.num}
                </div>
                <h3 className="font-black text-lg mb-2" style={{ color: '#1A2B3C' }}>{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#4A5568' }}>{step.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: stacked layout with vertical connector */}
        <div className="flex flex-col gap-6 md:hidden">
          {howItWorks.steps.map((step, i) => (
            <div key={step.num} className="flex flex-col items-center gap-4">
              <div className="w-full rounded-3xl p-7 text-center"
                style={{
                  backgroundColor: STEP_BG[i],
                  border: `2px solid ${STEP_COLORS[i]}22`,
                  boxShadow: `0 8px 32px ${STEP_GLOWS[i]}`,
                }}>
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 font-black text-xl"
                  style={{ backgroundColor: STEP_COLORS[i], color: 'white', boxShadow: `3px 3px 0 ${STEP_SHADOWS[i]}`, border: `2px solid ${STEP_SHADOWS[i]}` }}
                >
                  {step.num}
                </div>
                <h3 className="font-black text-lg mb-1" style={{ color: '#1A2B3C' }}>{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#4A5568' }}>{step.body}</p>
              </div>
              {i < 2 && (
                <div style={{ width: 3, height: 32, background: `linear-gradient(to bottom, ${STEP_COLORS[i]}, ${STEP_COLORS[i + 1]})`, borderRadius: 99 }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
