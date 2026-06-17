'use client';
import { useState, useEffect } from 'react';
import { useLang } from '@/lib/lang-context';

function PhoneMockup() {
  const words = ['นี่คือ', 'หมา', 'ของฉัน'];
  const [active, setActive] = useState(1);

  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % words.length), 2000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="float-animate" style={{ width: 300, position: 'relative' }}>
      {/* Glow rings */}
      <div style={{ position: 'absolute', inset: -24, borderRadius: 60, background: 'radial-gradient(ellipse at center, rgba(124,77,255,0.5) 0%, transparent 70%)', zIndex: 0 }} />

      {/* Gradient border ring — 5px margin, 1px gradient line */}
      <div style={{ position: 'relative', zIndex: 1, margin: 5, padding: 1, borderRadius: 40, background: 'linear-gradient(135deg, #FFD60A 0%, #FF6635 30%, #FF4090 55%, #9B74E8 80%, #3BAFDA 100%)' }}>
      <div className="rounded-[36px] overflow-hidden border-4"
        style={{ backgroundColor: '#1A2B3C', borderColor: '#4A3580', boxShadow: '0 40px 80px rgba(0,0,0,0.5), 0 0 60px rgba(124,77,255,0.35)' }}>
        {/* Status bar */}
        <div className="flex items-center justify-between px-5" style={{ backgroundColor: '#141040', height: 28 }}>
          <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: 10, fontWeight: 600 }}>9:41</span>
          <div style={{ width: 18, height: 8, border: '1px solid rgba(255,255,255,0.25)', borderRadius: 3, display: 'flex', padding: 1 }}>
            <div style={{ width: '70%', backgroundColor: 'rgba(255,255,255,0.4)', borderRadius: 2 }} />
          </div>
        </div>

        {/* Book header */}
        <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="flex items-center gap-2">
            <div style={{ width: 6, height: 6, borderRadius: 99, backgroundColor: '#FFD60A' }} />
            <span style={{ color: 'white', fontSize: 13, fontWeight: 700 }}>หมาของฉัน</span>
          </div>
          <span style={{ fontSize: 10, backgroundColor: 'rgba(255,214,10,0.2)', color: '#FFD60A', padding: '3px 8px', borderRadius: 99, fontWeight: 600 }}>Level 1</span>
        </div>

        {/* Illustration */}
        <div style={{ height: 190, background: 'linear-gradient(160deg, #FEF0CC 0%, #FAD8A0 60%, #F5C87A 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 14, left: 24, width: 28, height: 10, backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: 99 }} />
          <div style={{ position: 'absolute', top: 22, left: 44, width: 18, height: 7, backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: 99 }} />
          <div style={{ position: 'absolute', top: 12, right: 30, width: 20, height: 8, backgroundColor: 'rgba(255,255,255,0.6)', borderRadius: 99 }} />
          <svg className="wiggle" width="133" height="110" viewBox="0 0 492 407" style={{ filter: 'drop-shadow(0 8px 18px rgba(0,0,0,0.18))' }}>
            <path fill="#ce9be8" d="m182 364l-0.75-0.95c-0.41-0.52-3.79-1.65-14.25-4.05-3.49-1.45-9.79-4.15-16.25-6.94l-11.75-5.06-0.93-0.75c-0.52-0.41-4.86-3.45-9.65-6.75-6.22-4.28-11.09-8.79-17-15.75-4.56-5.36-9-9.75-11.42-9.75 0-4.86-7.78-22.58-9.83-24.75l-1.17-1.25 6.25-2.84c18.71-8.5 26.61-23.54 27.52-52.39 0.66-20.87 0.72-20.77-32.77-41.77-8.46-68.52 25.37-124.34 77.48-143.05l10.99-3.95c-19.86-16.59-13.33-24.53 5.53-18.38 11.33 3.69 11.86 3.22 6.69-5.91-8.4-14.84-2.57-23.69 11.04-16.77 9.32 4.74 24.27 25.61 24.27 33.87 0 1.54 1.72 2.06 11.72 3.54 57.44 8.49 103.19 59.19 103.27 114.43 0.01 9.25 0.32 11.02 3.09 17.5 1.7 3.97 3.72 10.71 4.5 14.97l1.42 7.75-3.75 8.88c-3.75 8.89-3.75 8.89 0.06 23.75 3.97 15.48 5.61 30.49 3.69 44.37-8.47 40.79-30.76 66.37-62.75 80.25l-13.25 5.75-14 5c-32.05 4.38-36.94 4.34-69.25 1.71zm1-56.12c0 18.32 15.22 38.73 34.26 45.94 5.1 1.94 7.28 2.14 19.49 1.84 11.67-0.3 15.42-0.82 24.75-3.44 33.28-9.37 51-29.25 51-57.23 0-32.96-28.7-51.78-69.7-45.72-32.88 4.85-59.8 31.25-59.8 58.61zm91-128.88l3.75 2.73c19.03 13.86 45.37-8.97 42.94-37.23-2.22-25.95-23.75-41.15-46.73-33-15.52 5.51-24.9 19.82-20.96 39.5l-10.54 0.25c-11.96 0.28-17.38 1.99-27.46 10.75 6.85-28.79-17.21-54.74-46-52-27.8 2.65-44.93 31.19-35 57 9.61 24.98 39.94 36.38 63 21l-0.59 3.51c-2.9 17.19 15.02 43.47 31.8 46.63 15.21 2.86 24.89-3.99 32.25-22.84 2.93-7.5 5.57-12.51 8.01-15.18 4.26-4.66 6.67-11.55 5.53-21.12zm-115.34-93.55c-5.54 3.33-12.14 10.78-11.17 12.6 0.28 0.52 0.68 0.95 0.88 0.95 0.21 0 4.6-1.91 9.75-4.25 9.38-4.25 9.38-4.25 21.79-4.25 13.46 0 14.63-0.5 11.68-5.01-4.41-6.72-21.8-6.75-32.93-0.04zm105.08 3.03c8.08-2.1 14.61-1.82 23.51 1.04 4.26 1.36 8.2 2.48 8.75 2.48 0.55 0 1.01-0.56 1.03-1.25 0.06-2.48-8.41-8.86-14.47-10.9-12.49-4.21-27.56-0.61-27.56 6.59 0 3.26 2.13 3.76 8.74 2.04z"/>
            <path fill="#fcbc19" d="m438 171l-23.25-4.09c-12.79-2.25-23.81-4.05-25.75-3.91-37.48-7.89-36.79-4.35-24.56-66.03 10.8-54.45 10.66-54.02 18.62-56.06 5.2-1.34 93.57 15.28 101.65 19.11 9.04 4.29 9.09 2.81-2.06 58.14-12.43 61.62-11.03 59.28-32.9 55.09z"/>
            <text x="414" y="148" textAnchor="middle" fontSize="105" fontWeight="900" fill="#422d26" fontFamily="'Sarabun','Noto Sans Thai',sans-serif">ก</text>
            <path fill="#e0baf4" d="m183 307.88c0-27.36 26.92-53.76 59.8-58.61 41-6.06 69.7 12.76 69.7 45.72 0 27.98-17.72 47.86-51 57.23-9.33 2.62-13.08 3.14-24.75 3.44-12.21 0.3-14.39 0.1-19.49-1.84-19.04-7.21-34.26-27.62-34.26-45.94z"/>
            <path fill="#bc82d8" d="m90 191c33.49 21 33.43 20.9 32.77 41.77-0.91 28.85-8.81 43.89-27.52 52.39l-6.25 2.84c-22.66 4.35-31.5 1.14-34.57-7.5-0.19-0.55 0.26-2.58 1.02-4.5 0.76-1.92 1.41-3.64 1.46-3.81 0.05-0.17-4.24-1.17-9.52-2.22-23.49-4.66-35.96-22.24-20.75-29.25 4.52-2.08 4.52-2.08-5.55-8.76-24.59-16.29-28.83-42.95-6.09-38.27 6.93 1.42 6.85 2.08 0.91-7.79-8.75-14.55-9.39-30.52-1.46-36.48 5.67-4.27 8.41-3.22 29.66 11.33 10.24 7.01 24.75 16.69 32.25 21.5z"/>
            <path fill="#bc82d8" d="m350 272c1.92-13.88 0.28-28.89-3.69-44.37-3.81-14.86-3.81-14.86-0.06-23.75l3.75-8.88c7.36-4.26 16.14-11.46 24.25-18.75l14.75-13.25c1.94-0.14 12.96 1.66 25.75 3.91l23.25 4.09c-3.42 12.16-10.03 25.72-17.83 39.46-0.29 0.52 1.9 1.42 4.88 2 15.45 2.97 3.76 28.03-17 36.42-7.44 3.01-7.44 3.01-7.56 7.58-0.29 11.09-11.77 16.19-35.59 15.79z"/>
            <path fill="#fcbc19" d="m197 188c9.1-6.06 15.47-15.39 18-26 10.08-8.76 15.5-10.47 27.46-10.75l10.54-0.25h1l3 3h2l5.25 4.75c3.37 3.05 6.06 6.63 9.75 15.25v5c1.14 9.57-1.27 16.46-5.53 21.12-2.44 2.67-5.08 7.68-8.01 15.18-7.36 18.85-17.04 25.7-32.25 22.84-16.78-3.16-34.7-29.44-31.8-46.63zm51 36l2.18-2.36c2.99-3.25 8.71-19.9 7.16-20.85-0.64-0.38-5.08 0.03-9.86 0.93-11.35 2.12-20.47 0.4-30.33-5.71-3.55-2.21-7.05-4.01-7.76-4.01-4.3 0-1.19 13.5 7.61 24l1.33 1.75c5.35 7.01 18.69 10.58 29.67 6.25z"/>
            <path fill="#995baf" d="m100 314c2.42 0 6.86 4.39 11.42 9.75 5.91 6.96 10.78 11.47 17 15.75 4.79 3.3 9.13 6.34 9.65 6.75l0.93 0.75c-15.17 21.29-26.2 31-32.14 31-3.95 0-6.17-3.54-5.38-8.59 0.66-4.3 0.56-4.66-1.13-4.08-18.41 6.3-17.97 6.21-23.33 5.13-5.06-1.02-6.31-2.18-8.57-7.97-0.74-1.89 3.23-9.97 6.03-12.3 2.79-2.32 2.79-2.32-5.1-4.61-25.81-7.52-14.92-24.25 19.37-29.77z"/>
            <path fill="#fcfcfc" d="m215 162c-2.53 10.61-8.9 19.94-18 26-23.06 15.38-53.39 3.98-63-21-9.93-25.81 7.2-54.35 35-57 28.79-2.74 52.85 23.21 46 52zm-64.96-6.88c0 7.47 2.97 14.64 8.26 19.93 5.28 5.29 12.45 8.26 19.93 8.26 7.47 0 14.64-2.97 19.93-8.26 5.29-5.29 8.26-12.46 8.26-19.93 0-7.48-2.97-14.65-8.26-19.94-5.29-5.28-12.46-8.25-19.93-8.25-7.48 0-14.65 2.97-19.93 8.25-5.29 5.29-8.26 12.46-8.26 19.94z"/>
            <path fill="#fcfcfc" d="m274 179v-5l4.75 1.08c27.32 6.2 35.36-40.88 8.78-51.42-14.57-5.77-31.46 9.62-28.53 30.34h-2l-3-3h-1c-3.94-19.68 5.44-33.99 20.96-39.5 22.98-8.15 44.51 7.05 46.73 33 2.43 28.26-23.91 51.09-42.94 37.23z"/>
            <path fill="#422d26" d="m150.04 155.12c0-7.48 2.97-14.65 8.26-19.93 5.28-5.29 12.45-8.26 19.93-8.26 7.48 0 14.65 2.97 19.93 8.26 5.29 5.28 8.26 12.45 8.26 19.93 0 7.48-2.97 14.65-8.26 19.93-5.28 5.29-12.45 8.26-19.93 8.26-7.48 0-14.65-2.97-19.93-8.26-5.29-5.28-8.26-12.45-8.26-19.93zm27.03-11.52c0 2.4 0.95 4.69 2.65 6.39 1.69 1.69 3.99 2.64 6.39 2.64 2.39 0 4.69-0.95 6.38-2.64 1.7-1.7 2.65-3.99 2.65-6.39 0-2.4-0.95-4.69-2.65-6.39-1.69-1.69-3.99-2.64-6.38-2.64-2.4 0-4.7 0.95-6.39 2.64-1.7 1.7-2.65 3.99-2.65 6.39z"/>
            <path fill="#422d26" d="m274 174c-3.69-8.62-6.38-12.2-9.75-15.25l-5.25-4.75c-2.93-20.72 13.96-36.11 28.53-30.34 26.58 10.54 18.54 57.62-8.78 51.42zm4.46-43.38c-8.91-3.42-16.56 6.52-9.96 12.94 1.7 1.66 3.64 2.44 6.05 2.44 2.43 0 4.31-0.77 6-2.45 3.59-3.6 2.36-11.22-2.09-12.93z"/>
            <path fill="#fcbc19" d="m260 363l14-5c7.69 17.83 9.49 19 20.81 19 22.51 0 27.14 6.2 15.29 20.49-5.44 6.55-6.72 6.61-22.25 1.03-9.14-3.29-16.1-5.08-23.2-5.99-12.49-1.59-13.66-2.06-14.39-5.73-0.81-4.07 1.82-6.64 8.6-8.39 6.68-1.73 6.91-2.33 3.68-9.66z"/>
            <path fill="#fcbc19" d="m167 359c10.46 2.4 13.84 3.53 14.25 4.05l0.75 0.95c-2.69 14.22-2.64 14.32 3.77 16 10.95 2.87 9.7 10.17-2.38 13.92-4.54 1.41-8.52 3.61-12.75 7.05-8.89 7.24-14.47 7.61-16.26 1.08-0.64-2.34-0.64-2.34-7.76-0.5-8.36 2.15-11.45 1.09-13.73-4.69-3.33-8.43 3.35-13.66 20.72-16.21 11.22-1.66 10.83-1.25 12.29-12.9z"/>
            <path fill="#963a0c" d="m248 224l-5.25-4.75c-6.81-6.16-11.51-7.34-25.75-3.25-8.8-10.5-11.91-24-7.61-24 0.71 0 4.21 1.8 7.76 4.01 9.86 6.11 18.98 7.83 30.33 5.71 4.78-0.9 9.22-1.31 9.86-0.93 1.55 0.95-4.17 17.6-7.16 20.85z"/>
            <path fill="#5b3f3d" d="m158.66 85.45c11.13-6.71 28.52-6.68 32.93 0.04 2.95 4.51 1.78 5.01-11.68 5.01-12.41 0-12.41 0-21.79 4.25-5.15 2.34-9.54 4.25-9.75 4.25-0.2 0-0.6-0.43-0.88-0.95-0.97-1.82 5.63-9.27 11.17-12.6z"/>
            <path fill="#5b3f3d" d="m263.74 88.48c-6.61 1.72-8.74 1.22-8.74-2.04 0-7.2 15.07-10.8 27.56-6.59 6.06 2.04 14.53 8.42 14.47 10.9-0.02 0.69-0.48 1.25-1.03 1.25-0.55 0-4.49-1.12-8.75-2.48-8.9-2.86-15.43-3.14-23.51-1.04z"/>
            <path fill="#f98723" d="m217 216c14.24-4.09 18.94-2.91 25.75 3.25l5.25 4.75c-10.98 4.33-24.32 0.76-29.67-6.25z"/>
            <path fill="#fcfcfc" d="m278.46 130.62c4.45 1.71 5.68 9.33 2.09 12.93-1.69 1.68-3.57 2.45-6 2.45-2.41 0-4.35-0.78-6.05-2.44-6.6-6.42 1.05-16.36 9.96-12.94z"/>
            <path fill="#fcfcfc" d="m177.07 143.6c0-2.4 0.95-4.69 2.65-6.39 1.69-1.69 3.99-2.64 6.38-2.64 2.4 0 4.7 0.95 6.39 2.64 1.7 1.7 2.65 3.99 2.65 6.39 0 2.4-0.95 4.69-2.65 6.39-1.69 1.69-3.99 2.64-6.39 2.64-2.39 0-4.69-0.95-6.38-2.64-1.7-1.7-2.65-3.99-2.65-6.39z"/>
            <path fill="#e0baf4" d="m254 151l3 3z"/>
          </svg>
        </div>

        {/* Karaoke controls */}
        <div style={{ backgroundColor: '#12103A', padding: '14px 16px' }}>
          <p style={{ fontSize: 15, marginBottom: 12, lineHeight: 1.7 }}>
            {words.map((w, i) => (
              <span key={w} style={i === active
                ? { backgroundColor: '#FFD60A', color: '#1A0845', padding: '1px 5px', borderRadius: 5, fontWeight: 700, transition: 'background 0.25s' }
                : { color: 'white' }
              }>{w}{' '}</span>
            ))}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <div style={{ width: 30, height: 30, backgroundColor: '#FF5757', borderRadius: 99, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 4px 10px rgba(255,87,87,0.5)' }}>
              <div style={{ width: 0, height: 0, borderTop: '5px solid transparent', borderBottom: '5px solid transparent', borderLeft: '9px solid white', marginLeft: 2 }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 18 }}>
              {[4, 8, 14, 9, 5, 12, 7, 4, 9, 14, 5, 8].map((h, i) => (
                <div key={i} className="wave-bar" style={{ width: 4, height: h, backgroundColor: '#FF9060', borderRadius: 99, animationDelay: `${i * 0.07}s` }} />
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} style={{ width: 7, height: 7, borderRadius: 99, backgroundColor: i === 0 ? '#FFD60A' : 'rgba(255,255,255,0.18)' }} />
            ))}
          </div>
        </div>
      </div>
      </div>{/* end gradient border wrapper */}
    </div>
  );
}

const BADGE: Record<string, { streak: string; keepUp: string; words: string; learned: string; newBook: string }> = {
  en: { streak: '5-day streak',    keepUp: 'Keep it up!',       words: '48 words', learned: 'learned this week',   newBook: 'New book!' },
  th: { streak: 'ต่อเนื่อง 5 วัน', keepUp: 'สู้ต่อนะ!',          words: '48 คำ',    learned: 'คำศัพท์สัปดาห์นี้',  newBook: 'หนังสือใหม่!' },
  fr: { streak: 'Série de 5 jours',keepUp: 'Continue !',         words: '48 mots',  learned: 'appris cette semaine', newBook: 'Nouveau livre !' },
  zh: { streak: '连续5天',          keepUp: '继续加油！',           words: '48词',     learned: '本周学会',            newBook: '新书！' },
  ja: { streak: '5日間連続',        keepUp: 'その調子！',           words: '48語',     learned: '今週学んだ',          newBook: '新しい本！' },
  ko: { streak: '5일 연속',         keepUp: '잘하고 있어요!',       words: '48단어',   learned: '이번 주 학습',         newBook: '새 책!' },
};

export default function Hero({ onGetStarted }: { onGetStarted: () => void }) {
  const { t, lang } = useLang();
  const bc = BADGE[lang] ?? BADGE.en;
  const headingSize = ['ja', 'ko'].includes(lang)
    ? 'clamp(1.9rem, 3.6vw, 3rem)'
    : 'clamp(2.6rem, 5.5vw, 4.2rem)';
  const headingMaxWidth = lang === 'fr' ? 620 : 540;
  const LINE3: Partial<Record<string, string>> = { fr: 'en thaï' };

  return (
    <section
      className="min-h-screen relative overflow-hidden pt-16"
      style={{ background: 'linear-gradient(150deg, #1A0845 0%, #2D1278 40%, #5B20CC 80%, #7C2DFF 100%)' }}
    >
      {/* Background texture: large soft blobs */}
      <div className="absolute pointer-events-none inset-0" aria-hidden>
        <div style={{ position: 'absolute', top: -120, left: -120, width: 500, height: 500, background: 'radial-gradient(circle, rgba(255,87,87,0.18) 0%, transparent 70%)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: -80, right: -80, width: 420, height: 420, background: 'radial-gradient(circle, rgba(0,209,167,0.15) 0%, transparent 70%)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', top: '40%', left: '30%', width: 300, height: 300, background: 'radial-gradient(circle, rgba(255,214,10,0.08) 0%, transparent 70%)', borderRadius: '50%' }} />

        {/* Vivid floating orbs */}
        <div className="float-animate" style={{ position: 'absolute', top: '14%', left: '5%',  width: 52, height: 52, backgroundColor: '#FFD60A', borderRadius: '50%', opacity: 0.9, animationDelay: '0s' }} />
        <div className="float-animate" style={{ position: 'absolute', top: '68%', left: '3%',  width: 24, height: 24, backgroundColor: '#FF5757', borderRadius: '50%', opacity: 0.85, animationDelay: '1.2s' }} />
        <div className="float-animate" style={{ position: 'absolute', top: '42%', left: '1.5%',width: 16, height: 16, backgroundColor: '#00D2AA', borderRadius: '50%', opacity: 0.75, animationDelay: '2.4s' }} />
        <div className="float-animate" style={{ position: 'absolute', top: '8%',  right: '4%', width: 20, height: 20, backgroundColor: '#FF4C91', borderRadius: '50%', opacity: 0.8, animationDelay: '0.6s' }} />
        <div className="float-animate" style={{ position: 'absolute', top: '78%', right: '6%', width: 38, height: 38, backgroundColor: '#FFD60A', borderRadius: '50%', opacity: 0.7, animationDelay: '1.8s' }} />
        <div className="float-animate" style={{ position: 'absolute', top: '30%', right: '2%', width: 14, height: 14, backgroundColor: '#00D2AA', borderRadius: '50%', opacity: 0.65, animationDelay: '3s' }} />

        {/* Sparkle crosses */}
        {[
          { top: '22%', left: '12%', size: 24, delay: 0 },
          { top: '55%', left: '20%', size: 16, delay: 0.5 },
          { top: '18%', right: '12%', size: 20, delay: 1 },
          { top: '72%', right: '18%', size: 14, delay: 1.5 },
        ].map((s, i) => (
          <svg key={i} className="float-animate" style={{ position: 'absolute', top: s.top, left: (s as any).left, right: (s as any).right, opacity: 0.55, animationDelay: `${s.delay}s` }} width={s.size} height={s.size} viewBox="0 0 24 24" fill="none">
            <path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        ))}

        {/* Stars */}
        {[
          { top: '35%', left: '8%' }, { top: '60%', left: '15%' },
          { top: '25%', right: '8%' }, { top: '50%', right: '14%' },
        ].map((s, i) => (
          <div key={i} className="float-animate" style={{ position: 'absolute', top: s.top, left: (s as any).left, right: (s as any).right, animationDelay: `${i * 0.7}s` }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 0l1.3 4H12L8.4 6.5 9.7 12 6 9.5 2.3 12l1.3-5.5L0 4h4.7z" fill="rgba(255,255,255,0.4)" />
            </svg>
          </div>
        ))}
      </div>

      {/* Main 2-column layout */}
      <div className="relative max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" style={{ minHeight: 'calc(100vh - 64px)', paddingTop: 48, paddingBottom: 48 }}>

        {/* Left: text */}
        <div className="flex flex-col items-start">
          <div
            className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full mb-6"
            style={{ backgroundColor: 'rgba(255,214,10,0.15)', color: '#FFD60A', border: '1px solid rgba(255,214,10,0.35)', backdropFilter: 'blur(8px)' }}
          >
            <div style={{ width: 8, height: 8, borderRadius: 99, backgroundColor: '#FFD60A' }} />
            {t.hero.badge}
          </div>

          <h1 className="font-black leading-tight mb-5" style={{ fontSize: headingSize, maxWidth: headingMaxWidth }}>
            <span style={{ color: 'white' }}>{t.hero.line1}</span>
            <br />
            {LINE3[lang] ? (
              <>
                <span className="text-gradient">{t.hero.line2}</span>
                <br />
                <span className="text-gradient">{LINE3[lang]}</span>
              </>
            ) : (
              <span className="text-gradient">{t.hero.line2}</span>
            )}
          </h1>

          <p className="mb-8 leading-relaxed" style={{ color: 'rgba(255,255,255,0.72)', fontSize: 17, maxWidth: 420 }}>
            {t.hero.subtitle}
          </p>

          <button
            onClick={onGetStarted}
            className="btn-bounce font-bold rounded-full transition-all duration-200 hover:shadow-2xl"
            style={{ background: 'linear-gradient(135deg, #FFD60A, #FF8C35)', color: '#1A0845', fontSize: 16, padding: '16px 40px', boxShadow: '0 8px 32px rgba(255,214,10,0.4)' }}
          >
            {t.hero.cta}
          </button>
          <p className="mt-3 text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>{t.hero.sub}</p>
        </div>

        {/* Right: phone + badges */}
        <div className="flex justify-center items-center relative">
          <div style={{ position: 'relative', zIndex: 1 }}>
            <PhoneMockup />

            {/* Floating badge — streak */}
            <div className="float-animate" style={{
              position: 'absolute', top: 44, left: -52,
              backgroundColor: 'white', borderRadius: 18, padding: '10px 14px',
              boxShadow: '0 8px 28px rgba(0,0,0,0.22)',
              display: 'flex', alignItems: 'center', gap: 10,
              animationDelay: '0.8s', whiteSpace: 'nowrap',
              border: '2px solid rgba(255,214,10,0.3)',
            }}>
              <div style={{ width: 34, height: 34, background: 'linear-gradient(135deg,#FFD60A,#FF8C35)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, flexShrink: 0 }}>🔥</div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#1A0845', lineHeight: 1.2 }}>{bc.streak}</p>
                <p style={{ fontSize: 10, color: '#6B7A8D', lineHeight: 1.2 }}>{bc.keepUp}</p>
              </div>
            </div>

            {/* Floating badge — words */}
            <div className="float-animate" style={{
              position: 'absolute', bottom: 52, right: -48,
              backgroundColor: 'white', borderRadius: 18, padding: '10px 14px',
              boxShadow: '0 8px 28px rgba(0,0,0,0.22)',
              display: 'flex', alignItems: 'center', gap: 10,
              animationDelay: '1.6s', whiteSpace: 'nowrap',
              border: '2px solid rgba(0,210,170,0.25)',
            }}>
              <div style={{ width: 34, height: 34, background: 'linear-gradient(135deg,#00D2AA,#00A8D2)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, flexShrink: 0 }}>📚</div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#1A0845', lineHeight: 1.2 }}>{bc.words}</p>
                <p style={{ fontSize: 10, color: '#6B7A8D', lineHeight: 1.2 }}>{bc.learned}</p>
              </div>
            </div>

            {/* Floating koala badge */}
            <div className="float-animate" style={{
              position: 'absolute', top: '50%', right: -44,
              backgroundColor: 'white', borderRadius: 18, padding: '10px 14px',
              boxShadow: '0 8px 28px rgba(0,0,0,0.22)',
              display: 'flex', alignItems: 'center', gap: 10,
              animationDelay: '2.4s', whiteSpace: 'nowrap',
              border: '2px solid rgba(255,87,87,0.25)',
            }}>
              <div style={{ width: 34, height: 34, background: 'linear-gradient(135deg,#FF5757,#FF4C91)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="20" height="20" viewBox="0 0 56 56" fill="none">
                  <circle cx="9" cy="18" r="11" fill="white" fillOpacity={0.9} />
                  <circle cx="47" cy="18" r="11" fill="white" fillOpacity={0.9} />
                  <circle cx="28" cy="32" r="20" fill="white" fillOpacity={0.9} />
                  <circle cx="20" cy="29" r="3.5" fill="#3D2B1F" />
                  <circle cx="36" cy="29" r="3.5" fill="#3D2B1F" />
                </svg>
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#1A0845', lineHeight: 1.2 }}>{bc.newBook}</p>
                <p style={{ fontSize: 10, color: '#9CA3AF', lineHeight: 1.2 }}>โคอาล่าน้อย</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
