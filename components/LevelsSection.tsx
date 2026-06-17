'use client';
import { useLang } from '@/lib/lang-context';
import { useInView } from '@/lib/use-in-view';

const LEVELS = [
  { color: '#FF5757', shadow: '#CC2020', bg: 'rgba(255,87,87,0.15)', glow: 'rgba(255,87,87,0.4)', gradient: 'linear-gradient(135deg,#FF5757,#FF4090,#FF8C35)' },
  { color: '#FFD60A', shadow: '#CC9A00', bg: 'rgba(255,214,10,0.15)', glow: 'rgba(255,214,10,0.4)', gradient: 'linear-gradient(135deg,#FFD60A,#FF8C35,#FFAA00)' },
  { color: '#00D2AA', shadow: '#008A70', bg: 'rgba(0,210,170,0.15)', glow: 'rgba(0,210,170,0.4)', gradient: 'linear-gradient(135deg,#00D2AA,#00AEEF,#4CC97C)' },
  { color: '#B87FFF', shadow: '#7C4DCC', bg: 'rgba(184,127,255,0.15)', glow: 'rgba(184,127,255,0.4)', gradient: 'linear-gradient(135deg,#B87FFF,#7C4DFF,#FF4090)' },
];

// Second part of the title (to receive text-gradient class), looked up from i18n titles
const TITLE_JOURNEY: Record<string, string> = {
  en: 'one journey',
  th: 'หนึ่งเส้นทาง',
  fr: 'un seul parcours',
  zh: '一段旅程',
  ja: '一つの旅',
  ko: '하나의 여정',
};

// First part of the title (everything before the journey fragment)
const TITLE_BEFORE: Record<string, string> = {
  en: 'Four levels, ',
  th: 'สี่ระดับ ',
  fr: 'Quatre niveaux, ',
  zh: '四个级别，',
  ja: '4つのレベル、',
  ko: '4가지 단계, ',
};

export default function LevelsSection() {
  const { t, lang } = useLang();
  const { levels } = t;
  const titleRef = useInView(0);
  const section = useInView(0.1);

  const titleBefore = TITLE_BEFORE[lang] ?? TITLE_BEFORE.en;
  const titleJourney = TITLE_JOURNEY[lang] ?? TITLE_JOURNEY.en;

  return (
    <section style={{ background: 'linear-gradient(150deg,#100030 0%,#1E0860 45%,#0A1840 100%)', paddingTop: 96, paddingBottom: 96, position: 'relative', overflow: 'hidden' }}>

      {/* ── Vivid background blobs ── */}
      <div style={{ position: 'absolute', top: -140, right: -100, width: 560, height: 560, background: 'radial-gradient(circle,rgba(255,60,140,0.28) 0%,transparent 65%)', borderRadius: '50%', pointerEvents: 'none', filter: 'blur(48px)' }} />
      <div style={{ position: 'absolute', bottom: -100, left: -80, width: 460, height: 460, background: 'radial-gradient(circle,rgba(0,200,200,0.22) 0%,transparent 65%)', borderRadius: '50%', pointerEvents: 'none', filter: 'blur(48px)' }} />
      <div style={{ position: 'absolute', top: '40%', left: '30%', width: 300, height: 300, background: 'radial-gradient(circle,rgba(255,214,10,0.12) 0%,transparent 65%)', borderRadius: '50%', pointerEvents: 'none', filter: 'blur(48px)' }} />

      {/* ── Curved 3-D organic shapes ── */}
      <div style={{ position: 'absolute', top: '8%', right: '-4%', width: 360, height: 400, background: 'linear-gradient(145deg,rgba(184,127,255,0.14) 0%,rgba(255,60,140,0.1) 100%)', borderRadius: '65% 35% 55% 45% / 45% 55% 35% 65%', border: '1.5px solid rgba(255,255,255,0.07)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '6%', left: '-3%', width: 300, height: 340, background: 'linear-gradient(145deg,rgba(0,200,200,0.14) 0%,rgba(76,201,124,0.1) 100%)', borderRadius: '35% 65% 45% 55% / 55% 45% 65% 35%', border: '1.5px solid rgba(255,255,255,0.07)', pointerEvents: 'none' }} />

      {/* ── Sparkle dots ── */}
      {[
        { top: '12%', left: '8%',  size: 10, color: '#FFD60A', delay: '0s' },
        { top: '28%', left: '4%',  size:  6, color: '#FF5757', delay: '0.8s' },
        { top: '70%', left: '7%',  size:  8, color: '#00D2AA', delay: '1.6s' },
        { top:  '8%', right: '9%', size: 12, color: '#FF4090', delay: '0.4s' },
        { top: '60%', right: '5%', size:  7, color: '#FFD60A', delay: '1.2s' },
        { top: '82%', right: '8%', size:  9, color: '#B87FFF', delay: '2s' },
      ].map((dot, i) => (
        <div key={i} className="float-animate" style={{ position: 'absolute', top: dot.top, left: (dot as any).left, right: (dot as any).right, width: dot.size, height: dot.size, borderRadius: '50%', backgroundColor: dot.color, opacity: 0.75, animationDelay: dot.delay, pointerEvents: 'none', boxShadow: `0 0 ${dot.size * 2}px ${dot.color}88` }} />
      ))}

      <div className="max-w-6xl mx-auto px-6 relative">
        <div
          ref={titleRef.ref as React.RefObject<HTMLDivElement>}
          className={`text-center mb-14 ${titleRef.inView ? 'anim-slide-up' : ''}`}
          style={{ opacity: titleRef.inView ? undefined : 0 }}
        >
          <h2 className="font-black mb-3" style={{ color: 'white', fontSize: 'clamp(1.75rem,4vw,2.5rem)' }}>
            {titleBefore}<span className="text-gradient">{titleJourney}</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 16, maxWidth: 480, margin: '0 auto' }}>{levels.subtitle}</p>
        </div>

        <div ref={section.ref as React.RefObject<HTMLDivElement>} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {levels.items.map((item, i) => {
            const { color, shadow, bg, glow, gradient } = LEVELS[i];
            return (
              <div
                key={item.num}
                className={`${section.inView ? 'anim-pop-in' : ''}`}
                style={{
                  padding: '2.5px',
                  background: gradient,
                  borderRadius: 28,
                  boxShadow: `6px 6px 0px ${shadow}, 0 16px 40px ${glow}`,
                  animationDelay: `${i * 0.1}s`,
                  opacity: section.inView ? undefined : 0,
                  transition: 'transform 0.2s',
                }}
              >
                <div
                  className="relative rounded-3xl p-6 flex flex-col transition-all duration-200 hover:-translate-y-2 cursor-default h-full"
                  style={{
                    backgroundColor: '#12103A',
                    backdropFilter: 'blur(8px)',
                    borderRadius: 26,
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  {/* Glass reflection strip */}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(to bottom,rgba(255,255,255,0.07) 0%,transparent 100%)', pointerEvents: 'none', zIndex: 1 }} />

                  {/* Level badge */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 font-black"
                    style={{ backgroundColor: color, color: '#0A0820', fontSize: 28, boxShadow: `4px 4px 0 ${shadow}, 0 8px 20px ${glow}`, position: 'relative', zIndex: 2 }}
                  >
                    {item.num}
                  </div>

                  {/* Age tag */}
                  <span
                    className="inline-block text-xs font-black px-3 py-1 rounded-full mb-3 self-start"
                    style={{ backgroundColor: bg, color, border: `1.5px solid ${color}`, position: 'relative', zIndex: 2 }}
                  >
                    {levels.agesLabel} {item.ages}
                  </span>

                  <p className="font-black text-xl leading-tight mb-1" style={{ color: 'white', position: 'relative', zIndex: 2 }}>{item.th}</p>
                  <p className="text-sm font-semibold mb-3" style={{ color, position: 'relative', zIndex: 2 }}>{item.name}</p>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)', position: 'relative', zIndex: 2 }}>{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
