'use client';
import Link from 'next/link';
import { useLang } from '@/lib/lang-context';

const COMMUNITY: Record<string, { heading: string; teachers: string; schools: string; parents: string }> = {
  en: { heading: 'Community',    teachers: 'For Teachers',         schools: 'For Schools',       parents: 'Parent Resources' },
  th: { heading: 'ชุมชน',        teachers: 'สำหรับครู',            schools: 'สำหรับโรงเรียน',    parents: 'ทรัพยากรผู้ปกครอง' },
  fr: { heading: 'Communauté',   teachers: 'Pour les enseignants', schools: 'Pour les écoles',   parents: 'Ressources parents' },
  zh: { heading: '社区',          teachers: '教师专区',              schools: '学校专区',            parents: '家长资源' },
  ja: { heading: 'コミュニティ',  teachers: '教師の方へ',            schools: '学校の方へ',          parents: '保護者リソース' },
  ko: { heading: '커뮤니티',      teachers: '교사를 위해',           schools: '학교를 위해',         parents: '학부모 리소스' },
};
const COPYRIGHT: Record<string, string> = {
  en: 'Making Thai literacy joyful, one story at a time.',
  th: 'ทำให้การอ่านภาษาไทยเป็นเรื่องสนุก',
  fr: "Rendre l'apprentissage du thaï joyeux, une histoire à la fois.",
  zh: '让泰语学习充满快乐，一次一个故事。',
  ja: '一つひとつの物語で、タイ語学習を楽しく。',
  ko: '한 번에 하나의 이야기로, 태국어 학습을 즐겁게.',
};

export default function Footer() {
  const { t, lang, setLang } = useLang();

  const cc = COMMUNITY[lang] ?? COMMUNITY.en;
  const cols = [
    {
      heading: t.footer.product,
      links: t.footer.productLinks.map((l) => ({ label: l, href: '#' })),
    },
    {
      heading: cc.heading,
      links: [
        { label: cc.teachers, href: '/teachers' },
        { label: cc.schools, href: '#' },
        { label: cc.parents, href: '#' },
      ],
    },
    {
      heading: t.footer.company,
      links: t.footer.companyLinks.map((l) => ({ label: l, href: '#' })),
    },
  ];

  return (
    <footer style={{ background: 'linear-gradient(150deg, #0D0A2E 0%, #1A0845 50%, #0D0A2E 100%)', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative blobs */}
      <div style={{ position: 'absolute', top: -60, left: -60, width: 280, height: 280, background: 'radial-gradient(circle, rgba(124,77,255,0.15) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -40, right: -40, width: 240, height: 240, background: 'radial-gradient(circle, rgba(255,214,10,0.08) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
      {/* Floating orbs */}
      {[
        { top: '18%', right: '6%', size: 32, color: '#FFD60A', delay: 0 },
        { top: '65%', left: '4%', size: 18, color: '#FF5757', delay: 1.4 },
        { top: '40%', right: '3%', size: 12, color: '#00D2AA', delay: 2.2 },
      ].map((o, i) => (
        <div key={i} className="float-animate" style={{ position: 'absolute', top: o.top, left: (o as any).left, right: (o as any).right, width: o.size, height: o.size, backgroundColor: o.color, borderRadius: '50%', opacity: 0.6, animationDelay: `${o.delay}s`, pointerEvents: 'none' }} />
      ))}

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-6 relative" style={{ paddingTop: 72, paddingBottom: 48 }}>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16">

          {/* Brand column */}
          <div className="lg:col-span-2">
            <p className="font-black mb-1 text-gradient" style={{ fontSize: 36, lineHeight: 1 }}>Pikko</p>
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.65)' }}>
              Thai Reading for Kids
            </p>
            <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 14, maxWidth: 300, lineHeight: 1.7, marginBottom: 28 }}>
              {t.footer.tagline}
            </p>
            {/* CTA */}
            <Link href="#"
              className="btn-bounce inline-block font-bold rounded-full text-sm"
              style={{ background: 'linear-gradient(135deg, #FFD60A, #FF8C35)', color: '#1A0845', padding: '12px 28px', boxShadow: '0 6px 24px rgba(255,214,10,0.35)' }}>
              {t.nav.cta}
            </Link>
            {/* Language toggle */}
            <div className="flex flex-wrap items-center gap-2 mt-6">
              {(['en', 'th', 'fr', 'zh', 'ja', 'ko'] as const).map((l) => (
                <button key={l} onClick={() => setLang(l)}
                  className="text-xs font-black uppercase px-3 py-1.5 rounded-full transition-all"
                  style={{
                    backgroundColor: lang === l ? 'rgba(255,214,10,0.2)' : 'rgba(255,255,255,0.08)',
                    color: lang === l ? '#FFD60A' : 'rgba(255,255,255,0.7)',
                    border: `1.5px solid ${lang === l ? 'rgba(255,214,10,0.4)' : 'rgba(255,255,255,0.15)'}`,
                    cursor: 'pointer',
                  }}>
                  {l === 'zh' ? '中文' : l === 'ja' ? '日本語' : l === 'ko' ? '한국어' : l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {cols.map((col) => (
            <div key={col.heading}>
              <p className="text-xs font-black uppercase tracking-widest mb-5" style={{ color: 'rgba(255,255,255,0.65)' }}>
                {col.heading}
              </p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {col.links.map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href}
                      className="text-sm transition-colors hover:text-white"
                      style={{ color: 'rgba(255,255,255,0.72)' }}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 24, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>
            © 2025 Pikko · {COPYRIGHT[lang] ?? COPYRIGHT.en}
          </p>
          {/* LINE */}
          <a href="#" aria-label="LINE" style={{ display:'flex', alignItems:'center', justifyContent:'center', width:36, height:36, borderRadius:10, background:'linear-gradient(135deg,#FFD60A,#FF8C35)', transition:'opacity 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.opacity='0.8')} onMouseLeave={e => (e.currentTarget.style.opacity='1')}>
            <svg width="22" height="22" viewBox="0 0 48 48" fill="none">
              <path d="M24 8C15.2 8 8 14.4 8 22.2c0 4.2 2.3 7.95 5.9 10.5-.26.9-.98 3.38-1.14 3.96-.18.63.22.62.46.45.19-.13 3.04-2.03 4.3-2.87 1.03.17 2.1.24 3.2.24C32.8 34.5 40 28.2 40 22.2 40 14.4 32.8 8 24 8z" fill="#1A0845"/>
              <circle cx="18.5" cy="22.5" r="2" fill="#FFD60A"/>
              <circle cx="24" cy="22.5" r="2" fill="#FFD60A"/>
              <circle cx="29.5" cy="22.5" r="2" fill="#FFD60A"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
