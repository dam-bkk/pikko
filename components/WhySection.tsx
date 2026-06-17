'use client';
import { useLang } from '@/lib/lang-context';
import { useInView } from '@/lib/use-in-view';

const TITLE_HIGHLIGHT: Record<string, string> = {
  en: 'every child', th: 'ทุกคน', fr: 'chaque enfant',
  zh: '每一位', ja: 'すべての子ども', ko: '모든 아이',
};

function Check({ color }: { color: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <circle cx="9" cy="9" r="9" fill={color} />
      <path d="M5.5 9l2.5 2.5 4.5-4.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function WhySection() {
  const { t, lang } = useLang();
  const { why } = t;
  const titleRef = useInView(0);
  const section = useInView(0);

  const cards = [
    {
      data: why.native,
      accent: '#FF6635',
      topBg: 'linear-gradient(135deg,#FF6635,#FF9060)',
      cardBg: '#FFF6F3',
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          {/* Open book */}
          <path d="M20 9 L5 12 L5 32 L20 29 Z" fill="white" fillOpacity={0.9}/>
          <path d="M20 9 L35 12 L35 32 L20 29 Z" fill="white" fillOpacity={0.72}/>
          <line x1="20" y1="9" x2="20" y2="29" stroke="white" strokeWidth="1.5" strokeOpacity={0.6}/>
          {/* Thai letter ก on left page */}
          <text x="13" y="27" textAnchor="middle" fill="#FF6635" fontSize="14" fontWeight="900" fontFamily="system-ui, sans-serif">ก</text>
          {/* Stars on right page */}
          <circle cx="27.5" cy="18" r="2" fill="#FF6635" fillOpacity={0.75}/>
          <circle cx="24" cy="24" r="1.4" fill="#FF6635" fillOpacity={0.5}/>
          <circle cx="30" cy="25" r="1" fill="#FF6635" fillOpacity={0.4}/>
        </svg>
      ),
    },
    {
      data: why.mixed,
      accent: '#3BAFDA',
      topBg: 'linear-gradient(135deg,#3BAFDA,#60CEFF)',
      cardBg: '#F2FBFF',
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          {/* Globe */}
          <circle cx="20" cy="18" r="12" stroke="white" strokeWidth="2" fill="none"/>
          <ellipse cx="20" cy="18" rx="5.5" ry="12" stroke="white" strokeWidth="1.5" fill="none" strokeOpacity={0.55}/>
          <line x1="8" y1="18" x2="32" y2="18" stroke="white" strokeWidth="1.5" strokeOpacity={0.55}/>
          <line x1="9.5" y1="12" x2="30.5" y2="12" stroke="white" strokeWidth="1.2" strokeOpacity={0.35}/>
          <line x1="9.5" y1="24" x2="30.5" y2="24" stroke="white" strokeWidth="1.2" strokeOpacity={0.35}/>
          {/* Heart below globe */}
          <path d="M20 36 C20 36 13 30 13 26 C13 23.8 14.8 22 17 22 C18.3 22 19.4 22.7 20 23.8 C20.6 22.7 21.7 22 23 22 C25.2 22 27 23.8 27 26 C27 30 20 36 20 36 Z" fill="white" fillOpacity={0.95}/>
        </svg>
      ),
    },
  ];

  return (
    <section style={{ backgroundColor: '#F7F5FF', paddingTop: 96, paddingBottom: 96 }}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div
          ref={titleRef.ref as React.RefObject<HTMLDivElement>}
          className={`text-center mb-14 ${titleRef.inView ? 'anim-slide-up' : ''}`}
          style={{ opacity: titleRef.inView ? undefined : 0 }}
        >
          <h2 className="font-black leading-tight mb-3" style={{ color: '#1A2B3C', fontSize: 'clamp(1.75rem,4vw,2.5rem)' }}>
            {(() => {
              const title = why.title;
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
          <p style={{ color: '#6B7A8D', fontSize: 16, maxWidth: 500, margin: '0 auto' }}>{why.subtitle}</p>
        </div>

        {/* Cards */}
        <div
          ref={section.ref as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {cards.map(({ data, accent, topBg, cardBg, icon }, i) => (
            <div
              key={data.badge}
              className={`rounded-3xl overflow-hidden ${section.inView ? (i === 0 ? 'anim-slide-in-left' : 'anim-slide-in-right') : ''}`}
              style={{ backgroundColor: cardBg, boxShadow: '0 8px 32px rgba(0,0,0,0.08)', opacity: section.inView ? undefined : 0, animationDelay: `${i * 0.15}s` }}
            >
              {/* Coloured top band */}
              <div style={{ background: topBg, padding: '28px 28px 24px', display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 16, padding: 10, flexShrink: 0 }}>
                  {icon}
                </div>
                <div>
                  <span
                    className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-2"
                    style={{ backgroundColor: 'rgba(255,255,255,0.25)', color: 'white' }}
                  >
                    {data.badge}
                  </span>
                  <h3 className="font-black leading-tight" style={{ color: 'white', fontSize: 20 }}>
                    {data.title1}<br />{data.title2}
                  </h3>
                </div>
              </div>

              {/* Body */}
              <div style={{ padding: '24px 28px 28px' }}>
                <p className="leading-relaxed mb-6 text-sm" style={{ color: '#4A5568' }}>{data.body}</p>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {data.points.map(pt => (
                    <li key={pt} style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#1A2B3C', fontSize: 14, fontWeight: 600 }}>
                      <Check color={accent} />{pt}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
