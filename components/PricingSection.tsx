'use client';
import { useState } from 'react';
import { useLang } from '@/lib/lang-context';
import { useInView } from '@/lib/use-in-view';

const TITLE_HIGHLIGHT: Record<string, string> = {
  en: 'honest pricing', th: 'โปร่งใส', fr: 'transparents',
  zh: '透明', ja: '正直な', ko: '솔직한',
};

/* Per-plan accent colors & gradients for border frames */
const PLAN_BORDER = [
  null,
  'linear-gradient(135deg,#7C4DFF,#B06DFF)',
  'linear-gradient(135deg,#7C4DFF,#C43AFF,#FF5757)',
  'linear-gradient(135deg,#FF8C35,#FF6635)',
];
const PLAN_GLOW = [
  'none',
  '0 16px 40px rgba(124,77,255,0.18)',
  '0 28px 64px rgba(124,77,255,0.42)',
  '0 16px 40px rgba(255,140,53,0.2)',
];
const PLAN_CTA_STYLE = [
  { background: '#F0EAFF', color: '#7C4DFF' },
  { background: 'linear-gradient(135deg,#7C4DFF,#9B6DFF)', color: 'white' },
  { background: 'white', color: '#7C4DFF' },
  { background: 'linear-gradient(135deg,#FF8C35,#FF6635)', color: 'white' },
];

function Check({ planIdx }: { planIdx: number }) {
  const colors = ['#A0AEC0', '#7C4DFF', 'rgba(255,255,255,0.9)', '#FF8C35'];
  const bg     = ['rgba(0,0,0,0.05)', 'rgba(124,77,255,0.1)', 'rgba(255,255,255,0.22)', 'rgba(255,140,53,0.12)'];
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden style={{ flexShrink: 0 }}>
      <circle cx="8" cy="8" r="8" fill={bg[planIdx]} />
      <path d="M5 8l2 2 4-4" stroke={colors[planIdx]} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function PricingSection({ onGetStarted }: { onGetStarted: () => void }) {
  const { t, lang } = useLang();
  const { pricing } = t;
  const [yearly, setYearly] = useState(false);
  const titleRef = useInView(0);
  const section  = useInView(0);

  return (
    <section style={{ backgroundColor: '#F8F5FF', paddingTop: 96, paddingBottom: 96, position: 'relative', overflow: 'hidden' }}>
      {/* Decorative blobs */}
      <div style={{ position: 'absolute', top: -120, right: -100, width: 500, height: 500, background: 'radial-gradient(circle,rgba(124,77,255,0.12) 0%,transparent 65%)', borderRadius: '50%', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -80, left: -80, width: 360, height: 360, background: 'radial-gradient(circle,rgba(76,201,124,0.09) 0%,transparent 65%)', borderRadius: '50%', pointerEvents: 'none' }} />

      <div className="max-w-6xl mx-auto px-6 relative">

        {/* ── Header ── */}
        <div
          ref={titleRef.ref as React.RefObject<HTMLDivElement>}
          className={`text-center mb-12 ${titleRef.inView ? 'anim-slide-up' : ''}`}
          style={{ opacity: titleRef.inView ? undefined : 0 }}
        >
          <h2 className="font-black mb-3" style={{ color: '#1A2B3C', fontSize: 'clamp(1.75rem,4vw,2.5rem)' }}>
            {(() => {
              const title = pricing.title;
              const word  = TITLE_HIGHLIGHT[lang] ?? TITLE_HIGHLIGHT.en;
              const idx   = title.indexOf(word);
              if (idx === -1) return <>{title}</>;
              return <>{title.slice(0, idx)}<span className="text-gradient">{word}</span>{title.slice(idx + word.length)}</>;
            })()}
          </h2>
          <p style={{ color: '#6B7A8D', fontSize: 16, marginBottom: 32 }}>{pricing.subtitle}</p>

          {/* ── Toggle ── */}
          <div className="inline-flex rounded-full p-1.5" style={{ backgroundColor: '#EDE8FF', boxShadow: '0 2px 16px rgba(124,77,255,0.1)' }}>
            <button
              onClick={() => setYearly(false)}
              className="px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-200"
              style={!yearly
                ? { background: 'linear-gradient(135deg,#7C4DFF,#9B6DFF)', color: 'white', boxShadow: '0 4px 14px rgba(124,77,255,0.35)' }
                : { background: 'transparent', color: '#7C4DFF' }}
            >
              {pricing.monthly}
            </button>
            <button
              onClick={() => setYearly(true)}
              className="px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-200 flex items-center gap-2"
              style={yearly
                ? { background: 'linear-gradient(135deg,#7C4DFF,#9B6DFF)', color: 'white', boxShadow: '0 4px 14px rgba(124,77,255,0.35)' }
                : { background: 'transparent', color: '#7C4DFF' }}
            >
              {pricing.yearly}
              <span className="text-xs font-black px-2 py-0.5 rounded-full" style={{ backgroundColor: '#4CC97C', color: 'white', fontSize: 10 }}>
                {pricing.save}
              </span>
            </button>
          </div>
        </div>

        {/* ── Cards ── */}
        <div
          ref={section.ref as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-end"
        >
          {pricing.plans.map((plan, pi) => {
            const price     = yearly ? plan.yearly : plan.monthly;
            const isFree    = plan.monthly === 0;
            const border    = PLAN_BORDER[pi];
            const isHot     = plan.highlight;

            const cardContent = (
              <div
                className={`rounded-3xl flex flex-col h-full ${section.inView ? 'anim-pop-in' : ''}`}
                style={{
                  padding: isHot ? '28px 24px 24px' : '24px',
                  animationDelay: `${pi * 0.1}s`,
                  opacity: section.inView ? undefined : 0,
                  ...(isHot
                    ? { background: 'linear-gradient(145deg,#6A3DFF,#9B6DFF)', position: 'relative', overflow: 'hidden' }
                    : { backgroundColor: 'white' }),
                }}
              >
                {/* Reflection strip on highlight card */}
                {isHot && (
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '45%', background: 'linear-gradient(to bottom,rgba(255,255,255,0.12),transparent)', pointerEvents: 'none' }} />
                )}

                {/* Plan name */}
                <div className="mb-4">
                  <p className="font-black text-base" style={{ color: isHot ? 'white' : '#1A2B3C' }}>{plan.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: isHot ? 'rgba(255,255,255,0.65)' : '#9CA3AF' }}>{plan.nameTh}</p>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-1 mb-1">
                  {isFree ? (
                    <span className="font-black" style={{ fontSize: 44, color: isHot ? 'white' : '#1A2B3C', lineHeight: 1 }}>
                      {pricing.currency}0
                    </span>
                  ) : (
                    <>
                      <span style={{ fontSize: 18, fontWeight: 900, color: isHot ? 'rgba(255,255,255,0.8)' : '#6B7A8D', alignSelf: 'flex-start', paddingTop: 6 }}>{pricing.currency}</span>
                      <span className="font-black" style={{ fontSize: 44, color: isHot ? 'white' : '#1A2B3C', lineHeight: 1 }}>
                        {price.toLocaleString()}
                      </span>
                      <span className="text-xs" style={{ color: isHot ? 'rgba(255,255,255,0.6)' : '#9CA3AF', paddingBottom: 4 }}>
                        {yearly ? pricing.perYear : pricing.perMonth}
                      </span>
                    </>
                  )}
                </div>

                <p className="text-xs leading-relaxed mb-5" style={{ color: isHot ? 'rgba(255,255,255,0.7)' : '#6B7A8D' }}>
                  {plan.desc}
                </p>

                <ul className="flex-1 mb-6" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {plan.features.map(feat => (
                    <li key={feat} className="flex items-center gap-2 text-xs" style={{ color: isHot ? 'rgba(255,255,255,0.9)' : '#1A2B3C', fontWeight: 500 }}>
                      <Check planIdx={pi} />{feat}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={onGetStarted}
                  className="w-full py-3 rounded-2xl text-sm font-bold transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
                  style={PLAN_CTA_STYLE[pi]}
                >
                  {plan.cta}
                </button>
              </div>
            );

            /* Wrap highlight card in gradient border frame */
            if (border) {
              return (
                <div key={plan.name} style={{ position: 'relative' }}>
                  {isHot && (
                    <div className="flex justify-center mb-3">
                      <span className="text-xs font-black px-4 py-1.5 rounded-full"
                        style={{ background: 'linear-gradient(135deg,#7C4DFF,#C43AFF)', color: 'white', boxShadow: '0 4px 16px rgba(124,77,255,0.4)' }}>
                        {pricing.popular}
                      </span>
                    </div>
                  )}
                  <div style={{ padding: 2, background: border, borderRadius: 28, boxShadow: PLAN_GLOW[pi] }}>
                    {cardContent}
                  </div>
                </div>
              );
            }

            return (
              <div key={plan.name}
                style={{ borderRadius: 28, boxShadow: PLAN_GLOW[pi], border: '2px solid rgba(124,77,255,0.08)' }}>
                {cardContent}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
