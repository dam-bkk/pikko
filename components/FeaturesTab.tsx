'use client';
import { useState, useEffect } from 'react';
import { useLang } from '@/lib/lang-context';
import { useInView } from '@/lib/use-in-view';

/* ── SVG animals ── */
function AnimalDog({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
      <ellipse cx="12" cy="22" rx="9" ry="13" fill="#A67C52" transform="rotate(-18,12,22)" />
      <ellipse cx="44" cy="22" rx="9" ry="13" fill="#A67C52" transform="rotate(18,44,22)" />
      <circle cx="28" cy="32" r="20" fill="#C4956A" />
      <circle cx="20" cy="30" r="4" fill="#3D2B1F" />
      <circle cx="36" cy="30" r="4" fill="#3D2B1F" />
      <circle cx="21" cy="29" r="1.5" fill="white" />
      <circle cx="37" cy="29" r="1.5" fill="white" />
      <ellipse cx="28" cy="38" rx="6" ry="4" fill="#3D2B1F" />
      <ellipse cx="26" cy="37" rx="2" ry="1.5" fill="#7A4A3A" />
    </svg>
  );
}

function AnimalKoala({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
      <circle cx="9" cy="18" r="11" fill="#B8BFC8" />
      <circle cx="47" cy="18" r="11" fill="#B8BFC8" />
      <circle cx="9" cy="18" r="7" fill="#9BA5AF" />
      <circle cx="47" cy="18" r="7" fill="#9BA5AF" />
      <circle cx="28" cy="32" r="20" fill="#C8CDD6" />
      <circle cx="20" cy="29" r="3.5" fill="#3D2B1F" />
      <circle cx="36" cy="29" r="3.5" fill="#3D2B1F" />
      <circle cx="21" cy="28" r="1.5" fill="white" />
      <circle cx="37" cy="28" r="1.5" fill="white" />
      <ellipse cx="28" cy="37" rx="8" ry="6" fill="#7A8A9A" />
      <ellipse cx="28" cy="36" rx="5" ry="3.5" fill="#9AAABB" />
    </svg>
  );
}

function AnimalCat({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
      <polygon points="8,24 14,6 22,22" fill="#9BA5B0" />
      <polygon points="34,22 42,6 48,24" fill="#9BA5B0" />
      <polygon points="10,23 14,10 20,22" fill="#F4A6C0" />
      <polygon points="36,22 42,10 46,23" fill="#F4A6C0" />
      <circle cx="28" cy="32" r="20" fill="#9BA5B0" />
      <ellipse cx="20" cy="29" rx="4" ry="3.5" fill="#3D2B1F" />
      <ellipse cx="36" cy="29" rx="4" ry="3.5" fill="#3D2B1F" />
      <circle cx="21" cy="28" r="1.5" fill="white" />
      <circle cx="37" cy="28" r="1.5" fill="white" />
      <polygon points="28,36 25,40 31,40" fill="#F4A6C0" />
      <line x1="16" y1="36" x2="24" y2="37" stroke="#7A8A9A" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="16" y1="38.5" x2="24" y2="38.5" stroke="#7A8A9A" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="32" y1="37" x2="40" y2="36" stroke="#7A8A9A" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="32" y1="38.5" x2="40" y2="38.5" stroke="#7A8A9A" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function AnimalRabbit({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
      {/* Ears — tall, white with vivid pink inside */}
      <ellipse cx="19" cy="13" rx="6" ry="14" fill="white" />
      <ellipse cx="37" cy="13" rx="6" ry="14" fill="white" />
      <ellipse cx="19" cy="13" rx="3.5" ry="11" fill="#FF8BB0" />
      <ellipse cx="37" cy="13" rx="3.5" ry="11" fill="#FF8BB0" />
      {/* Head — pure white with soft shadow ring */}
      <circle cx="28" cy="33" r="21" fill="rgba(220,210,240,0.6)" />
      <circle cx="28" cy="33" r="19.5" fill="white" />
      {/* Rosy cheeks */}
      <circle cx="18" cy="37" r="5.5" fill="rgba(255,140,176,0.32)" />
      <circle cx="38" cy="37" r="5.5" fill="rgba(255,140,176,0.32)" />
      {/* Big shiny eyes */}
      <circle cx="21.5" cy="30" r="5" fill="#2D1A3E" />
      <circle cx="34.5" cy="30" r="5" fill="#2D1A3E" />
      {/* Shine in eyes */}
      <circle cx="23.5" cy="28" r="2" fill="white" />
      <circle cx="36.5" cy="28" r="2" fill="white" />
      <circle cx="22" cy="31.5" r="0.9" fill="rgba(255,255,255,0.7)" />
      <circle cx="35" cy="31.5" r="0.9" fill="rgba(255,255,255,0.7)" />
      {/* Cute nose */}
      <ellipse cx="28" cy="37" rx="2.8" ry="2" fill="#FF8BB0" />
      {/* Smile */}
      <path d="M24.5 39.5 Q28 43 31.5 39.5" stroke="#FF8BB0" strokeWidth="1.4" strokeLinecap="round" fill="none" />
      {/* Whiskers */}
      <line x1="11" y1="37" x2="22" y2="37.8" stroke="rgba(180,150,210,0.7)" strokeWidth="1.1" strokeLinecap="round" />
      <line x1="11" y1="39.5" x2="22" y2="39" stroke="rgba(180,150,210,0.7)" strokeWidth="1.1" strokeLinecap="round" />
      <line x1="34" y1="37.8" x2="45" y2="37" stroke="rgba(180,150,210,0.7)" strokeWidth="1.1" strokeLinecap="round" />
      <line x1="34" y1="39" x2="45" y2="39.5" stroke="rgba(180,150,210,0.7)" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}

function AnimalGiraffe({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
      <ellipse cx="20" cy="9" rx="5" ry="8" fill="#C09030" />
      <ellipse cx="36" cy="9" rx="5" ry="8" fill="#C09030" />
      <circle cx="20" cy="6" r="4" fill="#E0AA40" />
      <circle cx="36" cy="6" r="4" fill="#E0AA40" />
      <circle cx="28" cy="32" r="20" fill="#F0C040" />
      <ellipse cx="19" cy="26" rx="5" ry="4" fill="#C09030" />
      <ellipse cx="37" cy="30" rx="4" ry="5" fill="#C09030" />
      <ellipse cx="27" cy="38" rx="6" ry="4" fill="#C09030" />
      <circle cx="20" cy="30" r="3.5" fill="#3D2B1F" />
      <circle cx="36" cy="30" r="3.5" fill="#3D2B1F" />
      <circle cx="21" cy="29" r="1.5" fill="white" />
      <circle cx="37" cy="29" r="1.5" fill="white" />
      <ellipse cx="28" cy="40" rx="5" ry="3" fill="#3D2B1F" />
    </svg>
  );
}

function AnimalLeopard({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
      {/* Ears */}
      <circle cx="13" cy="17" r="8.5" fill="#B87800" />
      <circle cx="43" cy="17" r="8.5" fill="#B87800" />
      <circle cx="13" cy="17" r="5.5" fill="#E8A820" />
      <circle cx="43" cy="17" r="5.5" fill="#E8A820" />
      {/* Head */}
      <circle cx="28" cy="32" r="20" fill="#E8A820" />
      {/* Spots — rosette pattern */}
      <ellipse cx="17" cy="26" rx="3.5" ry="2.5" fill="#7A4500" fillOpacity={0.75} />
      <ellipse cx="39" cy="26" rx="3.5" ry="2.5" fill="#7A4500" fillOpacity={0.75} />
      <ellipse cx="28" cy="21" rx="2.5" ry="2" fill="#7A4500" fillOpacity={0.65} />
      <ellipse cx="21" cy="41" rx="2.8" ry="2" fill="#7A4500" fillOpacity={0.7} />
      <ellipse cx="35" cy="41" rx="2.8" ry="2" fill="#7A4500" fillOpacity={0.7} />
      {/* Muzzle */}
      <ellipse cx="28" cy="38" rx="9" ry="6.5" fill="#F5D080" />
      {/* Eyes — green */}
      <circle cx="21" cy="29" r="3.8" fill="#3A7A20" />
      <circle cx="35" cy="29" r="3.8" fill="#3A7A20" />
      <ellipse cx="21" cy="29" rx="2" ry="2.8" fill="#1A4A10" />
      <ellipse cx="35" cy="29" rx="2" ry="2.8" fill="#1A4A10" />
      <circle cx="22" cy="28" r="1.2" fill="white" />
      <circle cx="36" cy="28" r="1.2" fill="white" />
      {/* Nose */}
      <ellipse cx="28" cy="36" rx="2.5" ry="1.8" fill="#7A4500" />
      {/* Whiskers */}
      <line x1="13" y1="37.5" x2="22" y2="38" stroke="#C8A040" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="13" y1="40" x2="22" y2="39.5" stroke="#C8A040" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="34" y1="38" x2="43" y2="37.5" stroke="#C8A040" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="34" y1="39.5" x2="43" y2="40" stroke="#C8A040" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

/* ── Phone mockup: karaoke reader (Koala book) ── */
function ReadingMockup() {
  const words = ['โคอาล่า', 'น้อย', 'หลับแล้ว'];
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % words.length), 2000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="float-animate mx-auto" style={{ width: 260 }}>
      <div className="rounded-[32px] overflow-hidden border-4" style={{ backgroundColor: '#1A2B3C', borderColor: '#2a3f56', boxShadow: '0 24px 56px rgba(0,0,0,0.18)' }}>
        <div className="flex items-center justify-between px-4 py-2.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <span style={{ color: 'white', fontSize: 11, fontWeight: 700 }}>โคอาล่าน้อย</span>
          <span style={{ fontSize: 9, backgroundColor: 'rgba(124,77,255,0.25)', color: '#C4A0FF', padding: '2px 7px', borderRadius: 99 }}>Level 2</span>
        </div>
        <div style={{ height: 130, background: 'linear-gradient(to bottom,#D4E8F0,#B8D4E4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <AnimalKoala size={88} />
        </div>
        <div style={{ backgroundColor: '#172844', padding: '12px 14px' }}>
          <p style={{ fontSize: 13, marginBottom: 10, lineHeight: 1.8 }}>
            {words.map((w, i) => (
              <span
                key={w}
                style={i === active
                  ? { backgroundColor: '#FFD23F', color: '#1A2B3C', padding: '1px 4px', borderRadius: 5, fontWeight: 700, transition: 'background 0.25s' }
                  : { color: 'white' }
                }
              >{w}{' '}</span>
            ))}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <div style={{ width: 28, height: 28, backgroundColor: '#7C4DFF', borderRadius: 99, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 3px 8px rgba(124,77,255,0.4)' }}>
              <div style={{ width: 0, height: 0, borderTop: '5px solid transparent', borderBottom: '5px solid transparent', borderLeft: '8px solid white', marginLeft: 2 }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 14 }}>
              {[3, 7, 11, 8, 4, 10, 5, 3, 8, 12].map((h, i) => (
                <div key={i} className="wave-bar" style={{ width: 3, height: h, backgroundColor: '#C4A0FF', borderRadius: 99, animationDelay: `${i * 0.08}s` }} />
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 5 }}>
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} style={{ width: 6, height: 6, borderRadius: 99, backgroundColor: i === 0 ? '#FFD23F' : 'rgba(255,255,255,0.18)' }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Library grid mockup ── */
function LibraryMockup() {
  const books = [
    { title: 'หมาของฉัน',  lv: 1, bg: '#FFE0CC', Animal: AnimalDog },
    { title: 'โคอาล่าน้อย', lv: 1, bg: '#D4E8F4', Animal: AnimalKoala },
    { title: 'กระต่ายน้อย', lv: 2, bg: '#EDE6FA', Animal: AnimalRabbit },
    { title: 'แมวเหมียว',  lv: 2, bg: '#F8CCDE', Animal: AnimalCat },
    { title: 'ยีราฟสูง',   lv: 3, bg: '#FFF4CC', Animal: AnimalGiraffe },
    { title: 'เสือดาว',     lv: 3, bg: '#FFF0CC', Animal: AnimalLeopard },
  ];
  const lvColor: Record<number, string> = { 1: '#FF6635', 2: '#3BAFDA', 3: '#4CC97C' };
  return (
    <div className="float-animate mx-auto rounded-[32px] overflow-hidden" style={{ width: 290, boxShadow: '0 24px 56px rgba(0,0,0,0.14)', backgroundColor: 'white' }}>
      <div style={{ backgroundColor: '#FF6635', padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ color: 'white', fontWeight: 900, fontSize: 13 }}>Pikko</span>
        <div style={{ width: 24, height: 24, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 99 }} />
      </div>
      <div style={{ padding: '10px 12px 6px' }}>
        <div style={{ backgroundColor: '#F3F4F6', borderRadius: 10, padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg width="12" height="12" fill="none" stroke="#9CA3AF" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <span style={{ color: '#9CA3AF', fontSize: 10 }}>ค้นหา...</span>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 5, padding: '4px 12px 10px' }}>
        {['ทั้งหมด', 'Level 1', 'Level 2'].map((tab, i) => (
          <span key={tab} style={{ fontSize: 8, padding: '3px 7px', borderRadius: 99, fontWeight: 600, backgroundColor: i === 0 ? '#FF6635' : '#F3F4F6', color: i === 0 ? 'white' : '#9CA3AF', whiteSpace: 'nowrap' }}>{tab}</span>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 7, padding: '0 12px 14px' }}>
        {books.map(({ title, lv, bg, Animal }) => (
          <div key={title} style={{ backgroundColor: bg, borderRadius: 18, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px 4px 2px' }}>
              <Animal size={44} />
            </div>
            <div style={{ padding: '2px 6px 7px', display: 'flex', flexDirection: 'column', gap: 3 }}>
              <span style={{ fontSize: 7, fontWeight: 700, backgroundColor: lvColor[lv], color: 'white', padding: '1px 4px', borderRadius: 99, alignSelf: 'flex-start' }}>L{lv}</span>
              <p style={{ fontSize: 8, fontWeight: 700, color: '#1A2B3C', lineHeight: 1.3 }}>{title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Parent dashboard mockup ── */
function DashboardMockup() {
  return (
    <div className="float-animate mx-auto rounded-[32px] overflow-hidden" style={{ width: 270, boxShadow: '0 24px 56px rgba(0,0,0,0.14)', backgroundColor: 'white' }}>
      <div style={{ backgroundColor: '#FF6635', padding: '14px 18px' }}>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 10, marginBottom: 2 }}>มาลี · สัปดาห์นี้</p>
        <p style={{ color: 'white', fontWeight: 900, fontSize: 17 }}>พัฒนาการดีมาก!</p>
      </div>
      <div style={{ padding: 14 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
          <div style={{ backgroundColor: '#FFF3EC', borderRadius: 16, padding: '10px 12px' }}>
            <p style={{ fontSize: 24, fontWeight: 900, color: '#FF6635', lineHeight: 1 }}>5</p>
            <p style={{ fontSize: 9, color: '#6B7A8D', marginTop: 2 }}>วันต่อเนื่อง</p>
          </div>
          <div style={{ backgroundColor: '#EBF8FF', borderRadius: 16, padding: '10px 12px' }}>
            <p style={{ fontSize: 24, fontWeight: 900, color: '#3BAFDA', lineHeight: 1 }}>48</p>
            <p style={{ fontSize: 9, color: '#6B7A8D', marginTop: 2 }}>คำที่เรียนรู้</p>
          </div>
        </div>
        <p style={{ fontSize: 9, fontWeight: 700, color: '#6B7A8D', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>หนังสือที่อ่านจบ</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          {[
            { title: 'หมาของฉัน', w: '100%', c: '#4CC97C' },
            { title: 'ผลไม้อร่อย', w: '72%',  c: '#4CC97C' },
            { title: 'ฝนตกแล้ว',  w: '38%',  c: '#FFD23F' },
          ].map(b => (
            <div key={b.title} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 6, height: 6, borderRadius: 99, backgroundColor: b.c, flexShrink: 0 }} />
              <div style={{ flex: 1, backgroundColor: '#F3F4F6', borderRadius: 99, height: 5, overflow: 'hidden' }}>
                <div style={{ width: b.w, height: '100%', backgroundColor: b.c, borderRadius: 99 }} />
              </div>
              <span style={{ fontSize: 8, color: '#9CA3AF', flexShrink: 0, width: 50, textAlign: 'right', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const MOCKUPS = [<ReadingMockup key="r" />, <LibraryMockup key="l" />, <DashboardMockup key="d" />];

const TAB_ACCENT   = ['#FF6635', '#00AEEF', '#4CC97C'];
const TAB_GRAD_A   = ['#FF6635', '#3BAFDA', '#4CC97C'];
const TAB_GRAD_B   = ['#FF4090', '#00D2CC', '#00AEEF'];
const TAB_GLOW     = ['rgba(255,102,53,0.55)', 'rgba(0,174,239,0.55)', 'rgba(76,201,124,0.55)'];
const CARD_BORDER  = [
  'linear-gradient(135deg,#FF6635,#FF4090,#7C4DFF)',
  'linear-gradient(135deg,#3BAFDA,#00D2CC,#4CC97C)',
  'linear-gradient(135deg,#4CC97C,#00AEEF,#7C4DFF)',
];

export default function FeaturesTab() {
  const { t } = useLang();
  const [active, setActive] = useState(0);
  const titleRef = useInView(0);
  const section = useInView(0);

  return (
    <section style={{ background: 'linear-gradient(150deg,#100030 0%,#1E0860 45%,#0A1840 100%)', paddingTop: 96, paddingBottom: 96, position: 'relative', overflow: 'hidden' }}>

      {/* ── Vivid background blobs ── */}
      <div style={{ position: 'absolute', top: -140, right: -100, width: 560, height: 560, background: 'radial-gradient(circle,rgba(255,60,140,0.28) 0%,transparent 65%)', borderRadius: '50%', pointerEvents: 'none', filter: 'blur(48px)' }} />
      <div style={{ position: 'absolute', bottom: -100, left: -80, width: 460, height: 460, background: 'radial-gradient(circle,rgba(0,200,200,0.22) 0%,transparent 65%)', borderRadius: '50%', pointerEvents: 'none', filter: 'blur(48px)' }} />
      <div style={{ position: 'absolute', top: '38%', left: '28%', width: 320, height: 320, background: 'radial-gradient(circle,rgba(255,214,10,0.12) 0%,transparent 65%)', borderRadius: '50%', pointerEvents: 'none', filter: 'blur(36px)' }} />

      {/* ── Curved 3-D organic shapes ── */}
      <div style={{ position: 'absolute', top: '10%', right: '-4%', width: 340, height: 380, background: 'linear-gradient(145deg,rgba(124,77,255,0.18) 0%,rgba(255,60,140,0.1) 100%)', borderRadius: '60% 40% 70% 30% / 40% 65% 35% 60%', border: '1.5px solid rgba(255,255,255,0.07)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '8%', left: '-3%', width: 280, height: 320, background: 'linear-gradient(145deg,rgba(0,200,200,0.15) 0%,rgba(76,201,124,0.1) 100%)', borderRadius: '40% 60% 30% 70% / 60% 35% 65% 40%', border: '1.5px solid rgba(255,255,255,0.07)', pointerEvents: 'none' }} />

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
        {/* Tab pills */}
        <div
          ref={titleRef.ref as React.RefObject<HTMLDivElement>}
          className={`flex flex-wrap justify-center gap-3 mb-14 ${titleRef.inView ? 'anim-slide-up' : ''}`}
          style={{ opacity: titleRef.inView ? undefined : 0 }}
        >
          {t.features.map((f, i) => (
            <button
              key={f.badge}
              onClick={() => setActive(i)}
              className="px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-250"
              style={active === i
                ? { background: `linear-gradient(135deg,${TAB_GRAD_A[i]},${TAB_GRAD_B[i]})`, color: 'white', boxShadow: `0 6px 24px ${TAB_GLOW[i]}, 0 0 0 3px rgba(255,255,255,0.15)` }
                : { backgroundColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)', border: '1.5px solid rgba(255,255,255,0.14)' }
              }
            >
              {f.badge}
            </button>
          ))}
        </div>

        {/* Content: text left, mockup right */}
        <div
          ref={section.ref as React.RefObject<HTMLDivElement>}
          className="flex flex-col lg:flex-row items-center gap-14"
        >
          {/* Text side */}
          <div className={`flex-1 ${section.inView ? 'anim-slide-in-left' : ''}`} style={{ opacity: section.inView ? undefined : 0 }}>
            {/* Accent bar + badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
              <div style={{ width: 4, height: 48, borderRadius: 99, background: `linear-gradient(to bottom,${TAB_GRAD_A[active]},${TAB_GRAD_B[active]})`, flexShrink: 0 }} />
              <span
                className="inline-block text-xs font-bold px-3 py-1.5 rounded-full"
                style={{ background: `linear-gradient(135deg,${TAB_GRAD_A[active]}28,${TAB_GRAD_B[active]}28)`, color: TAB_ACCENT[active], border: `1px solid ${TAB_ACCENT[active]}44` }}
              >
                {t.features[active].badge}
              </span>
            </div>
            <h2 className="font-black leading-tight mb-5" style={{ color: 'white', fontSize: 'clamp(1.75rem,4vw,2.5rem)' }}>
              {t.features[active].title1}<br />
              <span className={`text-gradient-f${active}`}>
                {t.features[active].title2}
              </span>
            </h2>
            <p className="leading-relaxed" style={{ color: 'rgba(255,255,255,0.72)', fontSize: 16, maxWidth: 420 }}>
              {t.features[active].body}
            </p>
          </div>

          {/* Mockup side — glowing 3-D card frame */}
          <div className={`flex-1 flex justify-center w-full ${section.inView ? 'anim-slide-in-right' : ''}`} style={{ opacity: section.inView ? undefined : 0, minHeight: 340 }}>
            <div style={{ position: 'relative' }}>
              {/* Glow ring behind */}
              <div style={{ position: 'absolute', inset: -20, borderRadius: 48, background: CARD_BORDER[active], opacity: 0.22, filter: 'blur(20px)', transition: 'background 0.4s', pointerEvents: 'none' }} />
              {/* Card frame with gradient border */}
              <div style={{
                position: 'relative',
                padding: 3,
                borderRadius: 40,
                background: CARD_BORDER[active],
                boxShadow: `0 24px 64px ${TAB_GLOW[active]}, 0 0 0 1px rgba(255,255,255,0.08)`,
                transition: 'background 0.4s, box-shadow 0.4s',
              }}>
                <div style={{ borderRadius: 38, overflow: 'hidden', backgroundColor: '#12103A', padding: '20px 16px 16px' }}>
                  {/* Glass reflection strip */}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '45%', background: 'linear-gradient(to bottom,rgba(255,255,255,0.07) 0%,transparent 100%)', borderRadius: '38px 38px 0 0', pointerEvents: 'none', zIndex: 2 }} />
                  {MOCKUPS[active]}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
