'use client';
import { useLang } from '@/lib/lang-context';

/* ─── Mockup: Karaoke reader ─── */
function ReadingMockup() {
  return (
    <div className="float-animate mx-auto" style={{ width: 250 }}>
      <div className="rounded-[30px] overflow-hidden border-4" style={{ backgroundColor: '#1A2B3C', borderColor: '#2a3f56', boxShadow: '0 24px 56px rgba(0,0,0,0.18)' }}>
        <div className="flex items-center justify-between px-4 py-2.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <span style={{ color: 'white', fontSize: 11, fontWeight: 700 }}>หมาของฉัน</span>
          <span style={{ fontSize: 9, backgroundColor: 'rgba(255,102,53,0.2)', color: '#FF9060', padding: '2px 7px', borderRadius: 99 }}>Level 1</span>
        </div>
        <div style={{ height: 120, background: 'linear-gradient(to bottom,#FDE9C0,#FAD5A5)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: 10 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: 38, height: 38, backgroundColor: '#C4956A', borderRadius: 99, position: 'relative', marginBottom: 3 }}>
              <div style={{ position: 'absolute', right: 6, top: 12, width: 6, height: 6, backgroundColor: '#3D2B1F', borderRadius: 99 }} />
              <div style={{ position: 'absolute', right: -6, top: 2, width: 11, height: 16, backgroundColor: '#A67C52', borderRadius: 99, transform: 'rotate(12deg)' }} />
            </div>
            <div style={{ width: 52, height: 20, backgroundColor: '#C4956A', borderRadius: 99 }} />
          </div>
        </div>
        <div style={{ backgroundColor: '#172844', padding: '12px 14px' }}>
          <p style={{ color: 'white', fontSize: 12, marginBottom: 10, lineHeight: 1.7 }}>
            นี่คือ{' '}
            <span style={{ backgroundColor: '#FFD23F', color: '#1A2B3C', padding: '1px 4px', borderRadius: 4, fontWeight: 700 }}>หมา</span>
            {' '}ของฉัน
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <div style={{ width: 26, height: 26, backgroundColor: '#FF6635', borderRadius: 99, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 0, height: 0, borderTop: '5px solid transparent', borderBottom: '5px solid transparent', borderLeft: '8px solid white', marginLeft: 2 }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 14 }}>
              {[3, 7, 11, 8, 4, 10, 5, 3, 8, 12].map((h, i) => (
                <div key={i} className="wave-bar" style={{ width: 3, height: h, backgroundColor: '#FF9060', borderRadius: 99, animationDelay: `${i * 0.08}s` }} />
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

/* ─── Mockup: Library grid ─── */
function LibraryMockup() {
  const books = [
    { title: 'หมาของฉัน', lv: 1, bg: '#FFE0CC' },
    { title: 'ผลไม้อร่อย', lv: 1, bg: '#CCF0FF' },
    { title: 'ฝนตกแล้ว', lv: 2, bg: '#CCEDDA' },
    { title: 'บ้านฉัน', lv: 2, bg: '#F8CCDE' },
    { title: 'วันเดินทาง', lv: 3, bg: '#E4CCF8' },
    { title: 'เพื่อนใหม่', lv: 3, bg: '#FFF8CC' },
  ];
  const lvColor: Record<number, string> = { 1: '#FF6635', 2: '#3BAFDA', 3: '#4CC97C' };

  return (
    <div className="mx-auto rounded-3xl overflow-hidden" style={{ width: 290, boxShadow: '0 24px 56px rgba(0,0,0,0.14)', backgroundColor: 'white' }}>
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
          <span key={tab} style={{ fontSize: 8, padding: '3px 7px', borderRadius: 99, fontWeight: 600, backgroundColor: i === 0 ? '#FF6635' : '#F3F4F6', color: i === 0 ? 'white' : '#9CA3AF', whiteSpace: 'nowrap' }}>
            {tab}
          </span>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 7, padding: '0 12px 14px' }}>
        {books.map(b => (
          <div key={b.title} style={{ backgroundColor: b.bg, borderRadius: 14, aspectRatio: '3/4', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 7 }}>
            <span style={{ fontSize: 7, fontWeight: 700, backgroundColor: lvColor[b.lv], color: 'white', padding: '1px 4px', borderRadius: 99, alignSelf: 'flex-start' }}>L{b.lv}</span>
            <p style={{ fontSize: 8, fontWeight: 700, color: '#1A2B3C', lineHeight: 1.3 }}>{b.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Mockup: Parent dashboard ─── */
function DashboardMockup() {
  return (
    <div className="mx-auto rounded-3xl overflow-hidden" style={{ width: 270, boxShadow: '0 24px 56px rgba(0,0,0,0.14)', backgroundColor: 'white' }}>
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
            { title: 'ผลไม้อร่อย', w: '72%', c: '#4CC97C' },
            { title: 'ฝนตกแล้ว', w: '38%', c: '#FFD23F' },
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

/* ─── Feature block layout ─── */
interface BlockProps {
  badge: string; title1: string; title2: string; body: string;
  mockup: React.ReactNode; reverse?: boolean; accent: string; bg: string;
}

function FeatureBlock({ badge, title1, title2, body, mockup, reverse, accent, bg }: BlockProps) {
  return (
    <section style={{ backgroundColor: bg, paddingTop: 96, paddingBottom: 96 }}>
      <div className={`max-w-6xl mx-auto px-6 flex flex-col items-center gap-14 ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
        <div className="flex-1">
          <span className="inline-block text-xs font-bold px-3 py-1.5 rounded-full mb-4" style={{ backgroundColor: `${accent}18`, color: accent }}>
            {badge}
          </span>
          <h2 className="font-black leading-tight mb-4" style={{ color: '#1A2B3C', fontSize: 'clamp(1.75rem,4vw,2.5rem)' }}>
            {title1}<br />{title2}
          </h2>
          <p className="leading-relaxed" style={{ color: '#6B7A8D', fontSize: 16, maxWidth: 420 }}>{body}</p>
        </div>
        <div className="flex-1 flex justify-center w-full">{mockup}</div>
      </div>
    </section>
  );
}

export default function Features() {
  const { t } = useLang();
  const f = t.features;

  return (
    <>
      <FeatureBlock badge={f[0].badge} title1={f[0].title1} title2={f[0].title2} body={f[0].body} mockup={<ReadingMockup />} accent="#FF6635" bg="#FFF4F0" />
      <FeatureBlock badge={f[1].badge} title1={f[1].title1} title2={f[1].title2} body={f[1].body} mockup={<LibraryMockup />} reverse accent="#00AEEF" bg="#E8F7FF" />
      <FeatureBlock badge={f[2].badge} title1={f[2].title1} title2={f[2].title2} body={f[2].body} mockup={<DashboardMockup />} accent="#00C07A" bg="#E8FFF4" />
    </>
  );
}
