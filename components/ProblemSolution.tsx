'use client';
import { useLang } from '@/lib/lang-context';
import { useInView } from '@/lib/use-in-view';

const HIGHLIGHT: Record<string, string> = {
  en: 'homework', th: 'การบ้าน', fr: 'devoirs', zh: '作业', ja: '宿題', ko: '숙제',
};
const OLD_WAY: Record<string, string> = {
  en: 'The old way', th: 'วิธีเดิม', fr: "L'ancienne méthode",
  zh: '旧方法', ja: '従来の方法', ko: '기존 방법',
};

function XMark() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden style={{ flexShrink: 0 }}>
      <circle cx="11" cy="11" r="11" fill="rgba(255,87,87,0.2)" />
      <path d="M7.5 7.5l7 7M14.5 7.5l-7 7" stroke="#FF5757" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

function Check() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden style={{ flexShrink: 0 }}>
      <circle cx="11" cy="11" r="11" fill="#4CC97C" />
      <path d="M7 11l3.5 3.5 5.5-6" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BoredKid() {
  return (
    <svg width="68" height="68" viewBox="0 0 68 68" fill="none">
      <rect x="8" y="48" width="52" height="7" rx="3" fill="rgba(255,255,255,0.12)" transform="rotate(-2 8 48)" />
      <rect x="11" y="41" width="46" height="7" rx="3" fill="rgba(255,255,255,0.08)" transform="rotate(1 11 41)" />
      <circle cx="34" cy="26" r="15" fill="rgba(255,255,255,0.13)" />
      <line x1="26" y1="25" x2="30" y2="25" stroke="rgba(255,255,255,0.55)" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="38" y1="25" x2="42" y2="25" stroke="rgba(255,255,255,0.55)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M28 33 Q34 29 40 33" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Z Z Z */}
      <path d="M48 12 L53 12 L48 17 L54 17" stroke="rgba(255,255,255,0.35)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M52 6 L56 6 L52 10 L57 10" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HappyReader() {
  return (
    <svg width="68" height="68" viewBox="0 0 68 68" fill="none">
      <path d="M34 44 L14 48 L14 65 L34 61 Z" fill="rgba(255,255,255,0.22)" />
      <path d="M34 44 L54 48 L54 65 L34 61 Z" fill="rgba(255,255,255,0.16)" />
      <line x1="34" y1="44" x2="34" y2="61" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
      <circle cx="34" cy="26" r="16" fill="rgba(255,255,255,0.18)" />
      <path d="M26 24 Q28 21 30 24" stroke="rgba(255,255,255,0.9)" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M38 24 Q40 21 42 24" stroke="rgba(255,255,255,0.9)" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M28 33 Q34 39 40 33" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* Stars */}
      <path d="M52 16 L53.2 20 L57 20 L54 22.5 L55.2 26 L52 24 L48.8 26 L50 22.5 L47 20 L50.8 20 Z" fill="rgba(255,214,10,0.85)" />
      <path d="M13 12 L13.9 15 L17 15 L14.5 17 L15.4 20 L13 18.5 L10.6 20 L11.5 17 L9 15 L12.1 15 Z" fill="rgba(255,214,10,0.6)" />
    </svg>
  );
}

export default function ProblemSolution() {
  const { t, lang } = useLang();
  const { problem } = t;
  const titleRef = useInView(0);
  const left = useInView();
  const right = useInView();

  return (
    <section style={{ backgroundColor: '#0D0A2E', paddingTop: 96, paddingBottom: 96, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: -80, left: -80, width: 360, height: 360, background: 'radial-gradient(circle, rgba(255,87,87,0.1) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -60, right: -80, width: 320, height: 320, background: 'radial-gradient(circle, rgba(124,77,255,0.15) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

      <div className="max-w-6xl mx-auto px-6 relative">
        <div
          ref={titleRef.ref as React.RefObject<HTMLDivElement>}
          className={`text-center mb-16 ${titleRef.inView ? 'anim-slide-up' : ''}`}
          style={{ opacity: titleRef.inView ? undefined : 0 }}
        >
          <h2 className="font-black leading-tight" style={{ color: 'white', fontSize: ['fr','ja','ko'].includes(lang) ? 'clamp(1.35rem,2.6vw,1.85rem)' : 'clamp(1.75rem,4vw,2.5rem)' }}>
            {(() => {
              const title = t.problem.title;
              const word = HIGHLIGHT[lang] ?? HIGHLIGHT.en;
              const idx = title.indexOf(word);
              if (idx === -1) return <span style={{ color: 'white' }}>{title}</span>;
              return (
                <>
                  <span style={{ color: 'white' }}>{title.slice(0, idx)}</span>
                  <span className="text-gradient-pink">{word}</span>
                  <span style={{ color: 'white' }}>{title.slice(idx + word.length)}</span>
                </>
              );
            })()}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* The old way */}
          <div
            ref={left.ref as React.RefObject<HTMLDivElement>}
            className={left.inView ? 'anim-slide-in-left' : ''}
            style={{ opacity: left.inView ? undefined : 0 }}
          >
            <div className="rounded-3xl p-8" style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1.5px solid rgba(255,87,87,0.22)', backdropFilter: 'blur(8px)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                <span className="text-xs font-black uppercase tracking-widest" style={{ color: '#FF5757' }}>
                  {OLD_WAY[lang] ?? OLD_WAY.en}
                </span>
                <BoredKid />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                {problem.problems.map((p) => (
                  <div key={p.text} className="flex items-start gap-3">
                    <XMark />
                    <p className="text-base leading-snug font-semibold" style={{ color: 'rgba(255,255,255,0.75)' }}>{p.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* The Pikko way */}
          <div
            ref={right.ref as React.RefObject<HTMLDivElement>}
            className={right.inView ? 'anim-slide-in-right' : ''}
            style={{ opacity: right.inView ? undefined : 0 }}
          >
            <div
              className="rounded-3xl p-8"
              style={{
                background: 'linear-gradient(145deg, #FF5757 0%, #C43AFF 55%, #7C4DFF 100%)',
                boxShadow: '0 20px 60px rgba(124,77,255,0.38), inset 0 0 0 1.5px rgba(255,255,255,0.14)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                <span
                  className="inline-block text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full"
                  style={{ backgroundColor: 'rgba(255,255,255,0.22)', color: 'white' }}
                >
                  {problem.solution.label}
                </span>
                <HappyReader />
              </div>
              <h3 className="font-black leading-tight mb-6" style={{ color: 'white', fontSize: 'clamp(1.4rem,3vw,1.9rem)' }}>
                {problem.solution.title}
              </h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {problem.solution.points.map((pt) => (
                  <li key={pt} className="flex items-center gap-3 text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.95)' }}>
                    <Check />{pt}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
