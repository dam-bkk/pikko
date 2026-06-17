'use client';
import { useState } from 'react';
import { useLang } from '@/lib/lang-context';
import { useInView } from '@/lib/use-in-view';

type FontCopy = { label: string; tag: string; desc: string };
type FontDef = {
  key: string; cssVar: string; displayWeight: number; displaySize: number;
  color: string; shadow: string; glow: string; bg: string;
  copies: Record<string, FontCopy>;
};

const FONTS: FontDef[] = [
  {
    key: 'school', cssVar: "var(--font-thai-school), 'Sarabun', sans-serif",
    displayWeight: 600, displaySize: 48, color: '#FF6635', shadow: '#CC3A10',
    glow: 'rgba(255,102,53,0.35)', bg: 'rgba(255,102,53,0.12)',
    copies: {
      en: { label: 'School Style',    tag: 'Textbook familiar',          desc: 'Clean and structured — exactly how Thai appears in classrooms and workbooks.' },
      th: { label: 'สไตล์การเรียน',  tag: 'คุ้นเคยเหมือนหนังสือเรียน', desc: 'สะอาดและมีระเบียบ เหมือนตัวอักษรในหนังสือเรียนและแบบฝึกหัด' },
      fr: { label: 'Style scolaire',  tag: 'Familier comme un manuel',   desc: 'Propre et structuré — exactement comme le thaï dans les classes et cahiers.' },
      zh: { label: '学校风格',         tag: '教科书常见',                  desc: '简洁规整——与教室和作业本中的泰语完全一致。' },
      ja: { label: '教科書スタイル',   tag: '教科書でお馴染み',            desc: 'すっきり構造的——タイ語の教科書に登場する文字そのもの。' },
      ko: { label: '교과서 스타일',    tag: '교과서에서 친숙한',           desc: '깔끔하고 체계적 — 교실과 교재에서 볼 수 있는 태국어 그대로.' },
    },
  },
  {
    key: 'rounded', cssVar: "var(--font-thai-sans), 'Mitr', sans-serif",
    displayWeight: 400, displaySize: 52, color: '#FFD60A', shadow: '#CC9A00',
    glow: 'rgba(255,214,10,0.35)', bg: 'rgba(255,214,10,0.12)',
    copies: {
      en: { label: 'Rounded',       tag: 'Best for beginners',       desc: 'Soft, open letterforms make Thai characters less intimidating for young readers.' },
      th: { label: 'โค้งมน',        tag: 'เหมาะสำหรับผู้เริ่มต้น',  desc: 'ตัวอักษรกลม เปิดโล่ง ทำให้ภาษาไทยดูไม่ยากสำหรับเด็กเล็ก' },
      fr: { label: 'Arrondi',       tag: 'Idéal pour les débutants', desc: 'Des formes ouvertes rendent les caractères thaïs moins intimidants pour les jeunes.' },
      zh: { label: '圆润',            tag: '初学者首选',               desc: '圆润开放的字形让泰语字符对小读者来说不那么吓人。' },
      ja: { label: '丸み',           tag: '初心者に最適',              desc: 'やさしく開いた字形がタイ語をより親しみやすくします。' },
      ko: { label: '둥근체',          tag: '초보자에게 최적',           desc: '부드러운 열린 글자 모양으로 어린 독자들이 편하게 느낄 수 있어요.' },
    },
  },
  {
    key: 'classic', cssVar: "var(--font-thai-serif), 'Noto Serif Thai', serif",
    displayWeight: 400, displaySize: 44, color: '#00D2AA', shadow: '#008A70',
    glow: 'rgba(0,210,170,0.35)', bg: 'rgba(0,210,170,0.12)',
    copies: {
      en: { label: 'Traditional',  tag: 'Advanced readers',  desc: 'Elegant calligraphic strokes — the typeface of Thai literature and royal manuscripts.' },
      th: { label: 'ดั้งเดิม',     tag: 'นักอ่านขั้นสูง',   desc: 'เส้นอักษรสง่างามแบบดั้งเดิม คล้ายตัวเขียนในวรรณกรรมและเอกสารโบราณ' },
      fr: { label: 'Traditionnel', tag: 'Lecteurs avancés',  desc: 'Tracés calligraphiques élégants — la police des classiques thaïs et manuscrits royaux.' },
      zh: { label: '传统',           tag: '高级读者',           desc: '优雅的书法笔触——泰语文学和皇家文书的字体。' },
      ja: { label: '伝統的',        tag: '上級者向け',         desc: '優雅な書道風の筆致——タイ文学と王室文書の書体。' },
      ko: { label: '전통',           tag: '고급 독자용',        desc: '우아한 서예 획 — 태국 문학과 왕실 문서의 서체.' },
    },
  },
];

const LABEL: Record<string, string> = {
  en: 'Exclusive Feature', th: 'ฟีเจอร์พิเศษ', fr: 'Fonctionnalité exclusive',
  zh: '独家功能', ja: '独自機能', ko: '독점 기능',
};
const FONTS_TITLE: Record<string, { before: string; highlight: string; after: string }> = {
  en: { before: '3 Thai typefaces — ', highlight: 'one app', after: '' },
  th: { before: 'แบบอักษรไทย ', highlight: '3 รูปแบบ', after: ' ในแอปเดียว' },
  fr: { before: '3 polices thaïes — ', highlight: 'une seule appli', after: '' },
  zh: { before: '3种泰语字体 — ', highlight: '一个应用', after: '' },
  ja: { before: '3つのタイ語フォント — ', highlight: '1つのアプリ', after: '' },
  ko: { before: '3가지 태국어 서체 — ', highlight: '하나의 앱', after: '' },
};
const FONTS_SUBTITLE: Record<string, string> = {
  en: 'Every child connects differently with Thai script. Switch in one tap — no settings menu needed.',
  th: 'เด็กแต่ละคนชอบรูปแบบตัวอักษรที่ต่างกัน เปลี่ยนได้ในคลิกเดียว ไม่ต้องเข้าการตั้งค่า',
  fr: 'Chaque enfant se connecte différemment au thaï. Changez en un tap — sans menu de réglages.',
  zh: '每个孩子与泰语文字的连接方式不同。一键切换——无需进入设置菜单。',
  ja: '子どもによってタイ語との相性は違います。設定なしで一タップで切り替え。',
  ko: '아이마다 태국어 글꼴과의 연결 방식이 다릅니다. 설정 없이 한 번에 전환.',
};
const PREVIEW_LABEL: Record<string, string> = {
  en: 'Live Preview', th: 'ตัวอย่างข้อความ', fr: 'Aperçu en direct',
  zh: '实时预览', ja: 'ライブプレビュー', ko: '실시간 미리보기',
};
const CAPTION_L1: Record<string, string> = {
  en: '"My Dog" — Level 1 book', th: '"หมาของฉัน" — Level 1',
  fr: '"Mon chien" — Niveau 1', zh: '"我的狗" — 第1级', ja: '"ぼくのいぬ" — レベル1', ko: '"내 강아지" — 레벨1',
};
const CAPTION_STORY: Record<string, string> = {
  en: '"Once upon a time…" — story level', th: '"กาลครั้งหนึ่งนานมาแล้ว" — นิทาน',
  fr: '"Il était une fois…" — niveau histoire', zh: '"很久很久以前…" — 故事级', ja: '"むかしむかし…" — お話レベル', ko: '"옛날 옛적에…" — 이야기 수준',
};

const PREVIEW = [
  'หมาของฉัน ❤️',
  'หมาของฉัน ❤️',
  'กาลครั้งหนึ่งนานมาแล้ว',
];

const FONT_GRADIENTS = [
  'linear-gradient(135deg,#FF6635,#FF4090)',
  'linear-gradient(135deg,#FFD60A,#FF8C35)',
  'linear-gradient(135deg,#00D2AA,#00AEEF)',
];

export default function FontsSection() {
  const { lang } = useLang();
  const [active, setActive] = useState(1);
  const titleRef = useInView(0);
  const section = useInView(0);
  const f = FONTS[active];
  const ft = FONTS_TITLE[lang] ?? FONTS_TITLE.en;

  return (
    <section style={{ background: 'linear-gradient(150deg,#100030 0%,#1E0860 45%,#0A1840 100%)', paddingTop: 96, paddingBottom: 96, position: 'relative', overflow: 'hidden' }}>

      {/* ── Vivid background blobs ── */}
      <div style={{ position: 'absolute', top: -140, right: -100, width: 560, height: 560, background: 'radial-gradient(circle,rgba(255,60,140,0.28) 0%,transparent 65%)', borderRadius: '50%', pointerEvents: 'none', filter: 'blur(48px)' }} />
      <div style={{ position: 'absolute', bottom: -100, left: -80, width: 460, height: 460, background: 'radial-gradient(circle,rgba(0,200,200,0.22) 0%,transparent 65%)', borderRadius: '50%', pointerEvents: 'none', filter: 'blur(48px)' }} />
      <div style={{ position: 'absolute', top: '38%', left: '28%', width: 320, height: 320, background: 'radial-gradient(circle,rgba(255,214,10,0.14) 0%,transparent 65%)', borderRadius: '50%', pointerEvents: 'none', filter: 'blur(48px)' }} />

      {/* ── Curved 3-D organic shapes ── */}
      <div style={{ position: 'absolute', top: '8%', right: '-4%', width: 360, height: 400, background: 'linear-gradient(145deg,rgba(255,60,140,0.14) 0%,rgba(124,77,255,0.1) 100%)', borderRadius: '65% 35% 55% 45% / 45% 55% 35% 65%', border: '1.5px solid rgba(255,255,255,0.07)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '6%', left: '-3%', width: 300, height: 340, background: 'linear-gradient(145deg,rgba(0,200,200,0.14) 0%,rgba(76,201,124,0.1) 100%)', borderRadius: '35% 65% 45% 55% / 55% 45% 65% 35%', border: '1.5px solid rgba(255,255,255,0.07)', pointerEvents: 'none' }} />

      {/* ── Sparkle dots ── */}
      {[
        { top: '12%', left: '8%',  size: 10, color: '#FFD60A', delay: '0s' },
        { top: '28%', left: '4%',  size:  6, color: '#FF6635', delay: '0.8s' },
        { top: '70%', left: '7%',  size:  8, color: '#00D2AA', delay: '1.6s' },
        { top:  '8%', right: '9%', size: 12, color: '#FF4090', delay: '0.4s' },
        { top: '60%', right: '5%', size:  7, color: '#FFD60A', delay: '1.2s' },
        { top: '82%', right: '8%', size:  9, color: '#7C4DFF', delay: '2s' },
      ].map((dot, i) => (
        <div key={i} className="float-animate" style={{ position: 'absolute', top: dot.top, left: (dot as any).left, right: (dot as any).right, width: dot.size, height: dot.size, borderRadius: '50%', backgroundColor: dot.color, opacity: 0.75, animationDelay: dot.delay, pointerEvents: 'none', boxShadow: `0 0 ${dot.size * 2}px ${dot.color}88` }} />
      ))}

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Header */}
        <div
          ref={titleRef.ref as React.RefObject<HTMLDivElement>}
          className={`text-center mb-14 ${titleRef.inView ? 'anim-slide-up' : ''}`}
          style={{ opacity: titleRef.inView ? undefined : 0 }}
        >
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full mb-5"
            style={{ backgroundColor: 'rgba(255,214,10,0.15)', color: '#FFD60A', border: '1px solid rgba(255,214,10,0.3)' }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1l1.5 4.5H14L9.5 8.5 11 13 7 10.5 3 13l1.5-4.5L0 5.5h5.5Z" fill="#FFD60A" />
            </svg>
            {LABEL[lang] ?? LABEL.en}
          </div>
          <h2 className="font-black leading-tight mb-4" style={{ color: 'white', fontSize: 'clamp(1.75rem,4vw,2.5rem)' }}>
            {ft.before}<span className="text-gradient">{ft.highlight}</span>{ft.after}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: 16, maxWidth: 500, margin: '0 auto' }}>
            {FONTS_SUBTITLE[lang] ?? FONTS_SUBTITLE.en}
          </p>
        </div>

        {/* Font cards */}
        <div
          ref={section.ref as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10"
        >
          {FONTS.map((font, i) => {
            const copy = font.copies[lang] ?? font.copies.en;
            const isActive = active === i;
            const cardInner = (
              <button
                key={font.key}
                onClick={() => setActive(i)}
                className={`rounded-3xl p-7 text-left transition-all duration-250 hover:-translate-y-1 w-full h-full ${section.inView ? 'anim-pop-in' : ''}`}
                style={{
                  opacity: section.inView ? undefined : 0,
                  animationDelay: `${i * 0.12}s`,
                  backgroundColor: isActive ? '#12103A' : 'rgba(255,255,255,0.04)',
                  border: isActive ? 'none' : '2px solid rgba(255,255,255,0.1)',
                  boxShadow: isActive ? `5px 5px 0 ${font.shadow}, 0 16px 48px ${font.glow}` : 'none',
                  cursor: 'pointer',
                  backdropFilter: 'blur(8px)',
                  borderRadius: 'inherit',
                }}
              >
                {/* Big Thai display */}
                <div style={{
                  fontFamily: font.cssVar,
                  fontSize: font.displaySize,
                  fontWeight: font.displayWeight,
                  color: isActive ? font.color : 'rgba(255,255,255,0.55)',
                  lineHeight: 1.15,
                  marginBottom: 16,
                  transition: 'color 0.2s',
                  letterSpacing: font.key === 'classic' ? 2 : 0,
                }}>
                  {font.key === 'classic' ? 'กขค ฆง' : 'ก ข ค'}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
                  <span className="font-black text-sm" style={{ color: isActive ? 'white' : 'rgba(255,255,255,0.72)' }}>
                    {copy.label}
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: isActive ? font.bg : 'rgba(255,255,255,0.1)', color: isActive ? font.color : 'rgba(255,255,255,0.65)' }}>
                    {copy.tag}
                  </span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: isActive ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.6)' }}>
                  {copy.desc}
                </p>
              </button>
            );
            if (isActive) {
              return (
                <div key={font.key} style={{ padding: '2.5px', background: FONT_GRADIENTS[i], borderRadius: 28, boxShadow: `0 16px 48px ${font.glow}` }}>
                  {cardInner}
                </div>
              );
            }
            return <div key={font.key}>{cardInner}</div>;
          })}
        </div>

        {/* Live preview card */}
        <div style={{ maxWidth: 512, margin: '0 auto', padding: '2.5px', background: FONT_GRADIENTS[active], borderRadius: 28, boxShadow: `4px 4px 0 ${f.shadow}, 0 20px 48px ${f.glow}`, transition: 'background 0.3s, box-shadow 0.3s' }}>
          <div className="rounded-3xl p-8 text-center" style={{ backgroundColor: '#12103A', backdropFilter: 'blur(10px)', position: 'relative', overflow: 'hidden', borderRadius: 26 }}>
            {/* Glass reflection strip */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '45%', background: 'linear-gradient(to bottom,rgba(255,255,255,0.07) 0%,transparent 100%)', pointerEvents: 'none', zIndex: 1 }} />
            <p className="text-xs font-black uppercase tracking-widest mb-5" style={{ color: f.color, position: 'relative', zIndex: 2 }}>
              {PREVIEW_LABEL[lang] ?? PREVIEW_LABEL.en}
            </p>
            <p style={{
              fontFamily: f.cssVar,
              fontSize: 36,
              fontWeight: f.displayWeight,
              color: 'white',
              lineHeight: 1.6,
              transition: 'all 0.3s ease',
              letterSpacing: active === 2 ? 1 : 0,
              position: 'relative',
              zIndex: 2,
            }}>
              {PREVIEW[active]}
            </p>
            <p className="mt-3 text-sm" style={{ color: 'rgba(255,255,255,0.72)', position: 'relative', zIndex: 2 }}>
              {active === 2
                ? (CAPTION_STORY[lang] ?? CAPTION_STORY.en)
                : (CAPTION_L1[lang] ?? CAPTION_L1.en)}
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 20, position: 'relative', zIndex: 2 }}>
              {FONTS.map((font, i) => (
                <button key={i} onClick={() => setActive(i)}
                  aria-label={`Show ${font.copies.en.label} font sample`}
                  aria-pressed={i === active}
                  style={{ width: i === active ? 24 : 8, height: 8, borderRadius: 99, backgroundColor: i === active ? f.color : 'rgba(255,255,255,0.2)', transition: 'all 0.25s', border: 'none', cursor: 'pointer', padding: 0 }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
