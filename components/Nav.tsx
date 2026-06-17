'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useLang } from '@/lib/lang-context';
import type { Lang } from '@/lib/i18n';

const LANGS: { code: Lang; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'th', label: 'TH' },
  { code: 'fr', label: 'FR' },
  { code: 'zh', label: '中文' },
  { code: 'ja', label: '日本語' },
  { code: 'ko', label: '한국어' },
];

const MENU_ITEMS: Record<string, { num: string; title: string; href: string }[]> = {
  en: [
    { num: '01', title: 'About Pikko',    href: '/about'   },
    { num: '02', title: 'Reading Levels', href: '/levels'  },
    { num: '03', title: "Parent's Tips",  href: '/blog'    },
    { num: '04', title: 'Contact Us',     href: '/contact' },
  ],
  th: [
    { num: '01', title: 'เกี่ยวกับ Pikko', href: '/about'   },
    { num: '02', title: 'ระดับการอ่าน',    href: '/levels'  },
    { num: '03', title: 'เคล็ดลับพ่อแม่',  href: '/blog'    },
    { num: '04', title: 'ติดต่อเรา',       href: '/contact' },
  ],
  fr: [
    { num: '01', title: 'À propos',         href: '/about'   },
    { num: '02', title: 'Niveaux',          href: '/levels'  },
    { num: '03', title: 'Conseils parents', href: '/blog'    },
    { num: '04', title: 'Nous contacter',   href: '/contact' },
  ],
  zh: [
    { num: '01', title: '关于Pikko',  href: '/about'   },
    { num: '02', title: '阅读级别',   href: '/levels'  },
    { num: '03', title: '家长小贴士', href: '/blog'    },
    { num: '04', title: '联系我们',   href: '/contact' },
  ],
  ja: [
    { num: '01', title: 'Pikkoについて', href: '/about'   },
    { num: '02', title: '読書レベル',    href: '/levels'  },
    { num: '03', title: '保護者のヒント',href: '/blog'    },
    { num: '04', title: 'お問い合わせ',  href: '/contact' },
  ],
  ko: [
    { num: '01', title: 'Pikko 소개', href: '/about'   },
    { num: '02', title: '읽기 레벨',  href: '/levels'  },
    { num: '03', title: '부모 팁',    href: '/blog'    },
    { num: '04', title: '문의하기',   href: '/contact' },
  ],
};

/* ── Animated frosted panel ── */
function NavPanel({
  items, lang, setLang, onGetStarted, onClose,
  cta,
  onMouseEnter, onMouseLeave,
}: {
  items: { num: string; title: string; href: string }[];
  lang: Lang;
  setLang: (l: Lang) => void;
  onGetStarted: () => void;
  onClose: () => void;
  cta: string;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    /* double rAF so the browser paints the initial state before transitioning */
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => setVisible(true))
    );
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        position: 'fixed',
        top: 68,
        right: 16,
        width: 270,
        borderRadius: 20,
        /* frosted glass */
        background: 'rgba(18, 12, 48, 0.52)',
        backdropFilter: 'blur(28px) saturate(180%)',
        WebkitBackdropFilter: 'blur(28px) saturate(180%)',
        border: '1px solid rgba(255,255,255,0.18)',
        boxShadow: '0 24px 64px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.06) inset, 0 0 48px rgba(124,77,255,0.18)',
        overflow: 'hidden',
        zIndex: 55,
        /* JS-driven open animation */
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(-10px) scale(0.96)',
        transition: 'opacity 0.22s ease, transform 0.28s cubic-bezier(0.22,1,0.36,1)',
      }}
    >
      {/* Subtle inner glow strip at top */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
      }} />

      {/* Nav links */}
      <div style={{ padding: '10px 0' }}>
        {items.map((item, i) => (
          <Link
            key={item.num}
            href={item.href}
            onClick={onClose}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              padding: '13px 22px',
              textDecoration: 'none',
              borderBottom: i < items.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.07)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            <span style={{ fontSize: 10, fontWeight: 800, color: '#FFD60A', letterSpacing: 2, flexShrink: 0, opacity: 0.9 }}>{item.num}</span>
            <span style={{ fontSize: 15, fontWeight: 700, color: 'rgba(255,255,255,0.92)' }}>{item.title}</span>
          </Link>
        ))}
      </div>

      {/* Lang + CTA footer */}
      <div style={{
        padding: '14px 22px',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        background: 'rgba(0,0,0,0.12)',
      }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {LANGS.map(({ code, label }) => (
            <button key={code} onClick={() => setLang(code)}
              style={{
                padding: '4px 12px', borderRadius: 99, fontSize: 11, fontWeight: 700,
                border: lang === code ? 'none' : '1px solid rgba(255,255,255,0.15)',
                cursor: 'pointer',
                background: lang === code ? 'linear-gradient(135deg,#FFD60A,#FF8C35)' : 'rgba(255,255,255,0.06)',
                color: lang === code ? '#1A0845' : 'rgba(255,255,255,0.65)',
                transition: 'all 0.15s',
              }}>
              {label}
            </button>
          ))}
        </div>
        <button
          onClick={() => { onClose(); onGetStarted(); }}
          style={{
            width: '100%', padding: '11px', borderRadius: 12,
            background: 'linear-gradient(135deg,#FFD60A,#FF8C35)',
            border: 'none', color: '#1A0845', fontSize: 13, fontWeight: 800, cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(255,140,53,0.35)',
            transition: 'opacity 0.15s',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          {cta}
        </button>
      </div>
    </div>
  );
}

/* ── Main Nav ── */
export default function Nav({ onGetStarted = () => { window.location.href = '/'; } }: { onGetStarted?: () => void }) {
  const { lang, setLang, t } = useLang();
  const [scrolled, setScrolled]   = useState(false);
  const [dropOpen, setDropOpen]   = useState(false);
  const [expanded, setExpanded]   = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const dropRef  = useRef<HTMLDivElement>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 72);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (min-width: 1024px)');
    const check = () => setIsDesktop(mq.matches);
    check();
    mq.addEventListener('change', check);
    return () => mq.removeEventListener('change', check);
  }, []);

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setDropOpen(false);
    };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);

  const solid = scrolled;
  const currentLabel = LANGS.find(l => l.code === lang)?.label ?? 'EN';
  const items = MENU_ITEMS[lang] ?? MENU_ITEMS.en;

  const openPanel    = () => { clearTimeout(hideTimer.current); setExpanded(true); };
  const scheduleClose = () => { hideTimer.current = setTimeout(() => setExpanded(false), 150); };

  const barColor = solid ? '#1A2B3C' : 'white';
  const barStyle = (transform: string, extra?: object) => ({
    display: 'block' as const,
    width: 22, height: 2, borderRadius: 9,
    backgroundColor: barColor,
    transition: 'transform 0.28s cubic-bezier(0.22,1,0.36,1), opacity 0.2s',
    transform: expanded ? transform : 'none',
    ...extra,
  });

  return (
    <>
      <nav className={`fixed top-0 inset-x-0 z-50 h-16 flex items-center transition-all duration-300 ${solid ? 'bg-white shadow-sm' : 'bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-5 w-full flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="font-black tracking-tight transition-all duration-300"
            style={{ color: !solid ? 'white' : '#1A2B3C', fontSize: solid ? '1.25rem' : '1.75rem' }}>
            Pikko
          </Link>

          <div className="flex items-center gap-2.5">
            <Link href="/teachers"
              className={`hidden sm:block text-sm font-semibold transition-colors ${solid ? 'text-[#4A5568] hover:text-[#1A2B3C]' : 'text-white/80 hover:text-white'}`}>
              For Teachers
            </Link>

            {/* Language dropdown */}
            <div ref={dropRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setDropOpen(v => !v)}
                className={`flex items-center gap-1 text-sm font-semibold px-3 py-1.5 rounded-full border transition-all ${solid ? 'border-gray-200 text-[#4A5568] hover:border-gray-300' : 'border-white/40 text-white hover:bg-white/10'}`}>
                {currentLabel}
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
                  style={{ transition: 'transform 0.2s', transform: dropOpen ? 'rotate(180deg)' : 'none', opacity: 0.7 }}>
                  <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {dropOpen && (
                <div style={{ position: 'absolute', top: 'calc(100% + 8px)', right: 0, backgroundColor: 'white', borderRadius: 12, boxShadow: '0 8px 32px rgba(0,0,0,0.14)', border: '1px solid rgba(0,0,0,0.08)', overflow: 'hidden', minWidth: 128, zIndex: 60 }}>
                  {LANGS.map(({ code, label }) => (
                    <button key={code} onClick={() => { setLang(code); setDropOpen(false); }}
                      style={{ display: 'block', width: '100%', textAlign: 'left', padding: '9px 14px', fontSize: 13, fontWeight: lang === code ? 700 : 500, color: lang === code ? '#7C4DFF' : '#374151', backgroundColor: lang === code ? 'rgba(124,77,255,0.07)' : 'transparent', border: 'none', cursor: 'pointer' }}>
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* CTA */}
            <button onClick={onGetStarted}
              className={`text-sm font-bold px-4 py-2 rounded-full transition-all ${solid ? 'bg-[#7C4DFF] text-white hover:bg-[#6B3EE6]' : 'text-[#1A0845] hover:opacity-90'}`}
              style={!solid ? { background: 'linear-gradient(135deg,#FFD60A,#FF8C35)' } : undefined}>
              {t.nav.cta}
            </button>

            {/* Burger / close icon */}
            <div style={{ position: 'relative' }}>
              <button
                aria-label={expanded ? 'Close menu' : 'Open menu'}
                onMouseEnter={() => { if (isDesktop) openPanel(); }}
                onMouseLeave={scheduleClose}
                onClick={() => { if (!isDesktop) setExpanded(v => !v); }}
                style={{ width: 40, height: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 5, background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <span style={barStyle('translateY(7px) rotate(45deg)')} />
                <span style={barStyle('scaleX(0)', { opacity: expanded ? 0 : 1 })} />
                <span style={barStyle('translateY(-7px) rotate(-45deg)')} />
              </button>

              {expanded && (
                <NavPanel
                  items={items}
                  lang={lang}
                  setLang={setLang}
                  onGetStarted={onGetStarted}
                  onClose={() => setExpanded(false)}
                  cta={t.nav.cta}
                  onMouseEnter={openPanel}
                  onMouseLeave={scheduleClose}
                />
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
