'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useInView } from '@/lib/use-in-view';

const LEVELS = [
  {
    num: '1', th: 'คำแรก', name: 'First Words',
    ages: '4–6', color: '#FF5757', shadow: '#CC2020',
    bg: 'rgba(255,87,87,0.15)', glow: 'rgba(255,87,87,0.4)',
    gradient: 'linear-gradient(135deg,#FF5757,#FF4090,#FF8C35)',
    skills: ['Recognises 20+ Thai consonants', 'Follows audio word-by-word', 'Sight words: หมา น้ำ ดี กิน'],
    books: 2,
    icon: (
      <svg width="32" height="32" viewBox="0 0 64 64" fill="none">
        <text x="32" y="44" textAnchor="middle" fill="white" fontSize="34" fontWeight="900" fontFamily="system-ui">ก</text>
      </svg>
    ),
  },
  {
    num: '2', th: 'ประโยคสั้น', name: 'Short Sentences',
    ages: '6–7', color: '#FFD60A', shadow: '#CC9A00',
    bg: 'rgba(255,214,10,0.15)', glow: 'rgba(255,214,10,0.4)',
    gradient: 'linear-gradient(135deg,#FFD60A,#FF8C35,#FFAA00)',
    skills: ['2–4 word sentences', 'Common verbs & objects', 'Simple vowel patterns (อา อิ อุ)'],
    books: 4,
    icon: (
      <svg width="32" height="32" viewBox="0 0 64 64" fill="none">
        <line x1="10" y1="20" x2="54" y2="20" stroke="white" strokeWidth="5" strokeLinecap="round"/>
        <line x1="10" y1="32" x2="44" y2="32" stroke="white" strokeWidth="5" strokeLinecap="round"/>
        <line x1="10" y1="44" x2="38" y2="44" stroke="white" strokeWidth="5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    num: '3', th: 'เวลานิทาน', name: 'Story Time',
    ages: '7–8', color: '#00D2AA', shadow: '#008A70',
    bg: 'rgba(0,210,170,0.15)', glow: 'rgba(0,210,170,0.4)',
    gradient: 'linear-gradient(135deg,#00D2AA,#00AEEF,#4CC97C)',
    skills: ['Short illustrated stories', 'Tone marks & vowel clusters', 'Beginning, middle, end narrative'],
    books: 6,
    icon: (
      <svg width="32" height="32" viewBox="0 0 64 64" fill="none">
        <path d="M10 14 L10 50 L32 46 L32 10 Z" fill="white" fillOpacity="0.9"/>
        <path d="M54 14 L54 50 L32 46 L32 10 Z" fill="white" fillOpacity="0.55"/>
        <line x1="32" y1="10" x2="32" y2="46" stroke="rgba(0,210,170,0.6)" strokeWidth="2"/>
      </svg>
    ),
  },
  {
    num: '4', th: 'นักอ่าน', name: 'Reader',
    ages: '8–10', color: '#B87FFF', shadow: '#7C4DCC',
    bg: 'rgba(184,127,255,0.15)', glow: 'rgba(184,127,255,0.4)',
    gradient: 'linear-gradient(135deg,#B87FFF,#7C4DFF,#FF4090)',
    skills: ['Longer narratives & dialogue', 'Richer vocabulary (100+ words)', 'Reads with minimal audio support'],
    books: 8,
    icon: (
      <svg width="32" height="32" viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="28" r="16" stroke="white" strokeWidth="4" fill="none"/>
        <path d="M26 22 L38 28 L26 34 Z" fill="white"/>
        <line x1="24" y1="48" x2="40" y2="48" stroke="white" strokeWidth="4" strokeLinecap="round"/>
        <line x1="32" y1="44" x2="32" y2="48" stroke="white" strokeWidth="4" strokeLinecap="round"/>
      </svg>
    ),
  },
];

const AGE_BANDS = [
  { age: '4–5', label: 'Pre-reader', th: 'ก่อนอ่าน', level: null, levelNum: null, color: 'rgba(255,255,255,0.08)',
    what: 'Recognises Thai script is different. Can repeat 3–5 Thai words. Follows audio eagerly.' },
  { age: '5–6', label: 'Emergent', th: 'เริ่มต้น', level: 'Level 1', levelNum: '1', color: 'rgba(255,87,87,0.18)',
    what: 'Knows 10–15 consonants. Follows word-by-word karaoke. Recognises sight words by sound.' },
  { age: '6–7', label: 'Beginning', th: 'เริ่มอ่าน', level: 'Level 1 → 2', levelNum: '1→2', color: 'rgba(255,214,10,0.15)',
    what: 'Decodes simple CVC words. Reads 2–3 word sentences with audio support.' },
  { age: '7–8', label: 'Developing', th: 'พัฒนา', level: 'Level 2 → 3', levelNum: '2→3', color: 'rgba(0,210,170,0.15)',
    what: 'Handles short illustrated stories. Understands basic vowel patterns and some tone marks.' },
  { age: '8–9', label: 'Early fluent', th: 'คล่องแคล่ว', level: 'Level 3', levelNum: '3', color: 'rgba(0,210,170,0.18)',
    what: 'Reads short texts with decreasing audio dependency. Retells stories in Thai.' },
  { age: '9–10', label: 'Growing', th: 'ก้าวหน้า', level: 'Level 3 → 4', levelNum: '3→4', color: 'rgba(184,127,255,0.18)',
    what: 'Handles longer narratives and richer vocabulary. Tone reading becoming natural.' },
  { age: '10+', label: 'Independent', th: 'อิสระ', level: 'Level 4', levelNum: '4', color: 'rgba(184,127,255,0.22)',
    what: 'Reads age-appropriate Thai independently. Strong phonetic foundation established.' },
];

const BAND_COLORS = [
  '#9CA3AF',
  '#FF5757',
  '#FF8C35',
  '#FFD60A',
  '#00D2AA',
  '#7C4DFF',
  '#B87FFF',
];
const BAND_GRADIENTS = [
  'linear-gradient(135deg,#6B7A8D,#9CA3AF,#D1D5DB)',
  'linear-gradient(135deg,#FF5757,#FF4090,#FF8C35)',
  'linear-gradient(135deg,#FF5757,#FF8C35,#FFD60A)',
  'linear-gradient(135deg,#FFD60A,#FF8C35,#FF6635)',
  'linear-gradient(135deg,#00D2AA,#00AEEF,#4CC97C)',
  'linear-gradient(135deg,#00D2AA,#7C4DFF,#B87FFF)',
  'linear-gradient(135deg,#B87FFF,#7C4DFF,#FF4090)',
];
const SKILLS = [
  ['Knows Thai script looks different from English', 'Can repeat 3–5 Thai words by heart', 'Ready for letter recognition games'],
  ['Recognises 10–15 Thai consonants', 'Follows word-by-word karaoke audio', 'Identifies หมา น้ำ ดี by sound alone'],
  ['Decodes simple 2-sound words with support', 'Reads 2–3 word sentences with audio on', 'Starting to recognise basic vowel patterns'],
  ['Handles short illustrated stories (5–8 pages)', 'Understands basic tone mark placement', 'Uses audio about 60% of the time'],
  ['Reads short texts with decreasing audio use', 'Retells simple stories in Thai', 'Has 80+ mastered sight words'],
  ['Handles longer narratives and dialogue', 'Tonal reading becoming intuitive', 'Reaches for audio occasionally, not constantly'],
  ['Reads age-appropriate Thai independently', 'Strong phonetic foundation established', 'Can sound out unfamiliar words'],
];

const PILLARS = [
  {
    num: '01', title: 'Sound before script',
    body: 'Tones are introduced through listening before writing. Children build an audio map of Thai in their mind — the same way they learned their first language. Script follows when the sounds are already familiar.',
    accent: '#FF6635',
    icon: (
      <svg width="36" height="36" viewBox="0 0 64 64" fill="none">
        <path d="M20 14 Q10 20 10 32 Q10 44 20 48 Q26 51 28 46 Q28 40 34 38 Q42 34 42 24 Q42 12 28 10 Q24 10 20 14Z" fill="#FF6635" fillOpacity="0.2" stroke="#FF6635" strokeWidth="2.5"/>
        <path d="M22 22 Q18 26 18 32 Q18 38 22 40" stroke="#FF6635" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M46 20 Q54 26 54 32 Q54 38 46 44" stroke="#FF6635" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    num: '02', title: 'Karaoke reading method',
    body: 'Every word lights up in sync with native Thai audio. Research in L2 literacy shows word-by-word audio synchronisation doubles decoding speed in early learners. It turns reading into an active listening exercise.',
    accent: '#4CC97C',
    icon: (
      <svg width="36" height="36" viewBox="0 0 64 64" fill="none">
        <rect x="23" y="6" width="18" height="26" rx="9" fill="#4CC97C" fillOpacity="0.2" stroke="#4CC97C" strokeWidth="2.5"/>
        <path d="M16 32 Q16 48 32 48 Q48 48 48 32" stroke="#4CC97C" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <line x1="32" y1="48" x2="32" y2="55" stroke="#4CC97C" strokeWidth="2.5" strokeLinecap="round"/>
        <rect x="8" y="38" width="48" height="5" rx="2.5" fill="#4CC97C" fillOpacity="0.15"/>
        <rect x="8" y="38" width="22" height="5" rx="2.5" fill="#4CC97C" fillOpacity="0.65"/>
      </svg>
    ),
  },
  {
    num: '03', title: 'Whole-word + phonics blend',
    body: 'High-frequency words (หมา, น้ำ, ดี, กิน) are learned as sight words — instant recognition without decoding. Less common words are built phonetically. This mirrors how fluent Thai readers actually process text.',
    accent: '#3BAFDA',
    icon: (
      <svg width="36" height="36" viewBox="0 0 64 64" fill="none">
        <path d="M8 14 L8 52 L32 48 L32 10 Z" fill="#3BAFDA" fillOpacity="0.18" stroke="#3BAFDA" strokeWidth="2"/>
        <path d="M56 14 L56 52 L32 48 L32 10 Z" fill="#3BAFDA" fillOpacity="0.1" stroke="#3BAFDA" strokeWidth="2"/>
        <text x="20" y="39" textAnchor="middle" fill="#3BAFDA" fontSize="18" fontWeight="900" fontFamily="system-ui">ก</text>
        <line x1="38" y1="26" x2="52" y2="24" stroke="#3BAFDA" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.65"/>
        <line x1="38" y1="33" x2="50" y2="31" stroke="#3BAFDA" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.45"/>
      </svg>
    ),
  },
  {
    num: '04', title: 'Spaced repetition',
    body: "Words resurface at scientifically optimised intervals — just before the brain would forget them. Pikko's mastery system follows the Ebbinghaus forgetting curve, so every word seen twice is remembered three times as long.",
    accent: '#9B74E8',
    icon: (
      <svg width="36" height="36" viewBox="0 0 64 64" fill="none">
        <path d="M32 10 Q18 10 16 22 Q14 30 20 34 Q16 38 18 44 Q22 50 30 48 Q34 52 38 48 Q46 50 46 44 Q50 40 46 34 Q52 30 50 22 Q48 10 32 10Z" fill="#9B74E8" fillOpacity="0.15" stroke="#9B74E8" strokeWidth="2.5"/>
        <circle cx="22" cy="26" r="3.5" fill="#9B74E8"/>
        <circle cx="42" cy="26" r="3.5" fill="#9B74E8"/>
        <circle cx="32" cy="40" r="3.5" fill="#9B74E8"/>
        <line x1="22" y1="26" x2="42" y2="26" stroke="#9B74E8" strokeWidth="1.5" strokeOpacity="0.45"/>
        <line x1="22" y1="26" x2="32" y2="40" stroke="#9B74E8" strokeWidth="1.5" strokeOpacity="0.45"/>
        <line x1="42" y1="26" x2="32" y2="40" stroke="#9B74E8" strokeWidth="1.5" strokeOpacity="0.45"/>
      </svg>
    ),
  },
  {
    num: '05', title: 'i+1 challenge balance',
    body: "Every book is calibrated so 80% of words are already familiar and 20% are new. Based on Krashen's input hypothesis, this is the exact tension that keeps children engaged without triggering frustration.",
    accent: '#FF4C91',
    icon: (
      <svg width="36" height="36" viewBox="0 0 64 64" fill="none">
        <rect x="10" y="30" width="18" height="24" rx="6" fill="#FF4C91" fillOpacity="0.25" stroke="#FF4C91" strokeWidth="2"/>
        <rect x="24" y="20" width="18" height="34" rx="6" fill="#FF4C91" fillOpacity="0.35" stroke="#FF4C91" strokeWidth="2"/>
        <rect x="38" y="10" width="18" height="44" rx="6" fill="#FF4C91" fillOpacity="0.55" stroke="#FF4C91" strokeWidth="2"/>
        <path d="M14 22 Q24 18 32 14" stroke="#FF4C91" strokeWidth="2" fill="none" strokeLinecap="round" strokeDasharray="3,3"/>
      </svg>
    ),
  },
  {
    num: '06', title: 'Built with Thai teachers',
    body: 'The level progression was designed with Thai language teachers from international schools in Bangkok, and refined with diaspora parents in Paris, London, Singapore and Seoul. Real classrooms. Real children.',
    accent: '#FFD60A',
    icon: (
      <svg width="36" height="36" viewBox="0 0 64 64" fill="none">
        <circle cx="20" cy="22" r="8" fill="#FFD60A" fillOpacity="0.25" stroke="#FFD60A" strokeWidth="2"/>
        <circle cx="44" cy="22" r="8" fill="#FFD60A" fillOpacity="0.25" stroke="#FFD60A" strokeWidth="2"/>
        <circle cx="32" cy="14" r="8" fill="#FFD60A" fillOpacity="0.35" stroke="#FFD60A" strokeWidth="2.5"/>
        <path d="M12 48 Q12 36 20 36 Q26 36 26 40 Q26 36 32 36 Q38 36 38 40 Q38 36 44 36 Q52 36 52 48" stroke="#FFD60A" strokeWidth="2" fill="none" strokeLinecap="round"/>
      </svg>
    ),
  },
];

export default function LevelsPage() {
  const heroRef    = useInView(0);
  const levelsRef  = useInView(0.05);
  const startRef   = useInView(0.05);
  const scienceRef = useInView(0.05);

  return (
    <div style={{ backgroundColor:'#FAFAFA', minHeight:'100dvh' }}>

      {/* ── Hero ── */}
      <section style={{ background:'linear-gradient(150deg,#1A0845 0%,#2D1278 40%,#5B20CC 80%,#7C2DFF 100%)', paddingTop:112, paddingBottom:96, position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:-120, left:-120, width:500, height:500, background:'radial-gradient(circle,rgba(255,87,87,0.18) 0%,transparent 70%)', borderRadius:'50%', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:-80, right:-80, width:420, height:420, background:'radial-gradient(circle,rgba(0,209,167,0.15) 0%,transparent 70%)', borderRadius:'50%', pointerEvents:'none' }} />
        <div className="float-animate" style={{ position:'absolute', top:'14%', left:'5%', width:42, height:42, backgroundColor:'#FFD60A', borderRadius:'50%', opacity:0.85, pointerEvents:'none' }} />
        <div className="float-animate" style={{ position:'absolute', top:'70%', right:'5%', width:26, height:26, backgroundColor:'#FF5757', borderRadius:'50%', opacity:0.75, animationDelay:'1.2s', pointerEvents:'none' }} />
        <div className="float-animate" style={{ position:'absolute', top:'18%', right:'8%', width:16, height:16, backgroundColor:'#FF4C91', borderRadius:'50%', opacity:0.7, animationDelay:'0.6s', pointerEvents:'none' }} />

        <div
          ref={heroRef.ref as React.RefObject<HTMLDivElement>}
          className={`max-w-4xl mx-auto px-6 text-center relative ${heroRef.inView ? 'anim-slide-up' : ''}`}
          style={{ opacity: heroRef.inView ? undefined : 0 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6 text-sm font-semibold" style={{ backgroundColor:'rgba(255,214,10,0.15)', color:'#FFD60A', border:'1px solid rgba(255,214,10,0.3)' }}>
            <div style={{ width:7, height:7, borderRadius:'50%', backgroundColor:'#FFD60A' }} />
            Reading Levels
          </div>
          <h1 className="font-black leading-tight mb-5" style={{ color:'white', fontSize:'clamp(2.2rem,5.5vw,3.8rem)' }}>
            A reading path built for <span className="text-gradient">mixed-heritage children</span>
          </h1>
          <p style={{ color:'rgba(255,255,255,0.72)', fontSize:18, lineHeight:1.75, maxWidth:600, margin:'0 auto 36px' }}>
            Not the Thai school curriculum. Not the international school approach. Something in between — designed for children who are brilliant in English or French but need the right entry point for Thai.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/" className="inline-flex items-center gap-2 font-bold rounded-full transition-all duration-200 hover:-translate-y-0.5" style={{ background:'linear-gradient(135deg,#FFD60A,#FF8C35)', color:'#1A0845', fontSize:16, padding:'14px 36px', boxShadow:'0 8px 28px rgba(255,214,10,0.4)' }}>
              Start for free →
            </Link>
            <a href="#age-guide" className="inline-flex items-center gap-2 font-bold rounded-full transition-all duration-200 hover:-translate-y-0.5" style={{ color:'white', fontSize:16, padding:'14px 36px', border:'1.5px solid rgba(255,255,255,0.3)' }}>
              See age guide ↓
            </a>
          </div>
        </div>
      </section>

      <AgeGuideSection />

      {/* ── The 4 levels ── */}
      <section style={{ background:'linear-gradient(150deg,#100030 0%,#1E0860 45%,#0A1840 100%)', paddingTop:96, paddingBottom:96, position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:-140, right:-100, width:560, height:560, background:'radial-gradient(circle,rgba(255,60,140,0.28) 0%,transparent 65%)', borderRadius:'50%', pointerEvents:'none', filter:'blur(48px)' }} />
        <div style={{ position:'absolute', bottom:-100, left:-80, width:460, height:460, background:'radial-gradient(circle,rgba(0,200,200,0.22) 0%,transparent 65%)', borderRadius:'50%', pointerEvents:'none', filter:'blur(48px)' }} />
        {[
          { top:'12%', left:'8%',  size:10, color:'#FFD60A', delay:'0s' },
          { top:'28%', left:'4%',  size: 6, color:'#FF5757', delay:'0.8s' },
          { top:'70%', left:'7%',  size: 8, color:'#00D2AA', delay:'1.6s' },
          { top: '8%', right:'9%', size:12, color:'#FF4090', delay:'0.4s' },
          { top:'60%', right:'5%', size: 7, color:'#FFD60A', delay:'1.2s' },
        ].map((dot, i) => (
          <div key={i} className="float-animate" style={{ position:'absolute', top:dot.top, left:(dot as any).left, right:(dot as any).right, width:dot.size, height:dot.size, borderRadius:'50%', backgroundColor:dot.color, opacity:0.75, animationDelay:dot.delay, pointerEvents:'none', boxShadow:`0 0 ${dot.size * 2}px ${dot.color}88` }} />
        ))}

        <div className="max-w-6xl mx-auto px-6 relative">
          <div
            ref={levelsRef.ref as React.RefObject<HTMLDivElement>}
            className={`text-center mb-14 ${levelsRef.inView ? 'anim-slide-up' : ''}`}
            style={{ opacity: levelsRef.inView ? undefined : 0 }}
          >
            <p style={{ fontSize:11, fontWeight:800, letterSpacing:'0.2em', color:'#FF6635', marginBottom:12 }}>THE FOUR LEVELS</p>
            <h2 className="font-black mb-4" style={{ color:'white', fontSize:'clamp(1.75rem,4vw,2.6rem)' }}>
              Four levels, <span className="text-gradient">one journey</span>
            </h2>
            <p style={{ color:'rgba(255,255,255,0.6)', fontSize:15, maxWidth:480, margin:'0 auto' }}>
              Each level is designed so your child feels challenged — but never stuck.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {LEVELS.map((lv, i) => (
              <div
                key={lv.num}
                className={levelsRef.inView ? 'anim-pop-in' : ''}
                style={{ padding:'2.5px', background:lv.gradient, borderRadius:28, boxShadow:`6px 6px 0px ${lv.shadow}, 0 16px 40px ${lv.glow}`, animationDelay:`${i * 0.1}s`, opacity: levelsRef.inView ? undefined : 0 }}
              >
                <div className="flex flex-col hover:-translate-y-2 transition-all duration-200 cursor-default h-full" style={{ backgroundColor:'#12103A', borderRadius:26, overflow:'hidden', position:'relative' }}>
                  {/* Glass strip */}
                  <div style={{ position:'absolute', top:0, left:0, right:0, height:'40%', background:'linear-gradient(to bottom,rgba(255,255,255,0.07) 0%,transparent 100%)', pointerEvents:'none', zIndex:1 }} />

                  {/* Level badge */}
                  <div style={{ padding:'24px 24px 0' }}>
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 font-black" style={{ backgroundColor:lv.color, color:'#0A0820', fontSize:28, boxShadow:`4px 4px 0 ${lv.shadow}, 0 8px 20px ${lv.glow}`, position:'relative', zIndex:2 }}>
                      {lv.num}
                    </div>
                    <span className="inline-block text-xs font-black px-3 py-1 rounded-full mb-3" style={{ backgroundColor:lv.bg, color:lv.color, border:`1.5px solid ${lv.color}`, position:'relative', zIndex:2 }}>
                      Ages {lv.ages}
                    </span>
                    <p className="font-black text-xl leading-tight mb-1" style={{ color:'white', position:'relative', zIndex:2 }}>{lv.th}</p>
                    <p className="text-sm font-semibold mb-4" style={{ color:lv.color, position:'relative', zIndex:2 }}>{lv.name}</p>
                  </div>

                  {/* Skills */}
                  <div style={{ padding:'0 24px 24px', flex:1 }}>
                    <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:8 }}>
                      {lv.skills.map((sk, si) => (
                        <li key={si} style={{ display:'flex', alignItems:'flex-start', gap:8 }}>
                          <div style={{ width:6, height:6, borderRadius:'50%', backgroundColor:lv.color, marginTop:5, flexShrink:0 }} />
                          <span style={{ fontSize:12, color:'rgba(255,255,255,0.65)', lineHeight:1.55 }}>{sk}</span>
                        </li>
                      ))}
                    </ul>
                    <div style={{ marginTop:16, paddingTop:16, borderTop:`1px solid rgba(255,255,255,0.06)`, display:'flex', alignItems:'center', gap:6 }}>
                      <span style={{ fontSize:11, fontWeight:700, color:'rgba(255,255,255,0.35)' }}>BOOKS IN LEVEL</span>
                      <span style={{ fontSize:13, fontWeight:800, color:lv.color }}>{lv.books}+</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Start low philosophy ── */}
      <section style={{ backgroundColor:'white', paddingTop:96, paddingBottom:96 }}>
        <div className="max-w-5xl mx-auto px-6">
          <div
            ref={startRef.ref as React.RefObject<HTMLDivElement>}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${startRef.inView ? 'anim-slide-up' : ''}`}
            style={{ opacity: startRef.inView ? undefined : 0 }}
          >
            {/* Left — editorial */}
            <div>
              <p style={{ fontSize:11, fontWeight:800, letterSpacing:'0.2em', color:'#FF6635', marginBottom:12 }}>OUR PHILOSOPHY</p>
              <h2 className="font-black mb-5" style={{ color:'#1A2B3C', fontSize:'clamp(1.75rem,4vw,2.4rem)', lineHeight:1.15 }}>
                Start low.<br />
                <span style={{ background:'linear-gradient(135deg,#7C4DFF,#FF4090)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Move fast.</span>
              </h2>
              <p style={{ color:'#4A5568', fontSize:15, lineHeight:1.8, marginBottom:16 }}>
                We always recommend starting one level lower than you think your child is ready for. A confident child who breezes through Level 1 will sprint through Level 2. A child placed too high will stall — and worse, start to feel that Thai reading is "too hard for me."
              </p>
              <p style={{ color:'#4A5568', fontSize:15, lineHeight:1.8, marginBottom:28 }}>
                The levels are not a cage. If your child finds a level too easy after a few books, skip up. You can always come back. Pikko tracks mastered words regardless of level — so nothing is wasted.
              </p>

              {/* Flow diagram */}
              <div style={{ display:'flex', alignItems:'center', gap:12, flexWrap:'wrap' }}>
                {[
                  { label:'Start Level 1', color:'#FF5757', sub:'Even if they seem ready for 2' },
                  { label:'Too easy?', color:'rgba(0,0,0,0.2)', sub:'After 2–3 books', isArrow:true },
                  { label:'Skip ahead', color:'#7C4DFF', sub:'Any time, no penalty' },
                ].map((step, i) => (
                  step.isArrow ? (
                    <div key={i} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
                      <svg width="28" height="16" viewBox="0 0 28 16" fill="none"><path d="M2 8h24M18 2l8 6-8 6" stroke={step.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      <span style={{ fontSize:10, color:'#9CA3AF', fontWeight:600 }}>{step.sub}</span>
                    </div>
                  ) : (
                    <div key={i} style={{ borderRadius:14, padding:'12px 16px', border:`2px solid ${step.color}33`, backgroundColor:`${step.color}08` }}>
                      <p style={{ fontWeight:800, fontSize:13, color:step.color, marginBottom:2 }}>{step.label}</p>
                      <p style={{ fontSize:11, color:'#9CA3AF' }}>{step.sub}</p>
                    </div>
                  )
                ))}
              </div>
            </div>

            {/* Right — visual card */}
            <div style={{ borderRadius:28, padding:'2.5px', background:'linear-gradient(135deg,#7C4DFF,#FF4090,#FFD60A)' }}>
              <div style={{ backgroundColor:'#12103A', borderRadius:26, padding:'36px 32px', position:'relative', overflow:'hidden' }}>
                <div style={{ position:'absolute', top:0, left:0, right:0, height:'40%', background:'linear-gradient(to bottom,rgba(255,255,255,0.06) 0%,transparent 100%)', pointerEvents:'none' }} />
                <p className="font-black text-xs tracking-widest mb-4" style={{ color:'rgba(255,255,255,0.35)' }}>BUILT-IN SAFETY NET</p>
                <h3 className="font-black text-2xl mb-6" style={{ color:'white', lineHeight:1.25 }}>If they skip a level, they miss nothing</h3>

                <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:14 }}>
                  {[
                    { icon:'🔁', text:"Pikko's mastery tracker follows words, not levels — a word learned in Level 1 counts at Level 3." },
                    { icon:'⏩', text:'Skip up or drop back any time from the parent dashboard. One tap.' },
                    { icon:'📊', text:'Parent reports show mastered words, streak, and reading time — so you always know where they are.' },
                    { icon:'🎯', text:'Level 1 is not "too easy." For most mixed-heritage children it is exactly right — and it feels like winning.' },
                  ].map((item, i) => (
                    <li key={i} style={{ display:'flex', alignItems:'flex-start', gap:12 }}>
                      <span style={{ fontSize:20, flexShrink:0, marginTop:1 }}>{item.icon}</span>
                      <p style={{ fontSize:13, color:'rgba(255,255,255,0.7)', lineHeight:1.65 }}>{item.text}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Science & Pedagogy ── */}
      <section style={{ background:'linear-gradient(150deg,#100030 0%,#1E0860 50%,#0A1840 100%)', paddingTop:96, paddingBottom:96, position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:'20%', left:'-8%', width:500, height:500, background:'radial-gradient(circle,rgba(124,45,255,0.25) 0%,transparent 65%)', borderRadius:'50%', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:'10%', right:'-6%', width:420, height:420, background:'radial-gradient(circle,rgba(59,175,218,0.15) 0%,transparent 65%)', borderRadius:'50%', pointerEvents:'none' }} />

        <div className="max-w-6xl mx-auto px-6">
          <div
            ref={scienceRef.ref as React.RefObject<HTMLDivElement>}
            className={`text-center mb-14 ${scienceRef.inView ? 'anim-slide-up' : ''}`}
            style={{ opacity: scienceRef.inView ? undefined : 0 }}
          >
            <p style={{ fontSize:11, fontWeight:800, letterSpacing:'0.2em', color:'#4CC97C', marginBottom:12 }}>THE SCIENCE BEHIND THE LEVELS</p>
            <h2 className="font-black mb-4" style={{ color:'white', fontSize:'clamp(1.75rem,4vw,2.6rem)' }}>
              Not intuition. <span className="text-gradient">Evidence.</span>
            </h2>
            <p style={{ color:'rgba(255,255,255,0.6)', fontSize:15, maxWidth:540, margin:'0 auto', lineHeight:1.75 }}>
              Every choice in Pikko's level design — the sequence of sounds, the word frequency lists, the pacing of new vocabulary — is grounded in second-language acquisition research and refined with real Thai teachers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PILLARS.map((p, i) => {
              const shadows: Record<string, string> = {
                '#FF6635':'#CC3300', '#4CC97C':'#2A8A55', '#3BAFDA':'#0077A8',
                '#9B74E8':'#6633BB', '#FF4C91':'#BB1166', '#FFD60A':'#CC9900',
              };
              const glows: Record<string, string> = {
                '#FF6635':'rgba(255,102,53,0.4)', '#4CC97C':'rgba(76,201,124,0.4)',
                '#3BAFDA':'rgba(59,175,218,0.4)', '#9B74E8':'rgba(155,116,232,0.4)',
                '#FF4C91':'rgba(255,76,145,0.4)', '#FFD60A':'rgba(255,214,10,0.4)',
              };
              const grad: Record<string, string> = {
                '#FF6635':'linear-gradient(135deg,#FF6635,#FF8C35,#FFD60A)',
                '#4CC97C':'linear-gradient(135deg,#4CC97C,#3BAFDA,#00D2AA)',
                '#3BAFDA':'linear-gradient(135deg,#3BAFDA,#00AEEF,#9B74E8)',
                '#9B74E8':'linear-gradient(135deg,#9B74E8,#7C4DFF,#FF4090)',
                '#FF4C91':'linear-gradient(135deg,#FF4C91,#FF5757,#FF8C35)',
                '#FFD60A':'linear-gradient(135deg,#FFD60A,#FF8C35,#FF6635)',
              };
              return (
                <div
                  key={p.num}
                  className={scienceRef.inView ? 'anim-pop-in' : ''}
                  style={{ padding:'2.5px', background: grad[p.accent], borderRadius:28, boxShadow:`6px 6px 0px ${shadows[p.accent]}, 0 16px 40px ${glows[p.accent]}`, animationDelay:`${i * 0.08}s`, opacity: scienceRef.inView ? undefined : 0 }}
                >
                  <div className="flex flex-col h-full hover:-translate-y-1 transition-all duration-200" style={{ backgroundColor:'#12103A', borderRadius:26, padding:'28px 24px', position:'relative', overflow:'hidden' }}>
                    <div style={{ position:'absolute', top:0, left:0, right:0, height:'40%', background:'linear-gradient(to bottom,rgba(255,255,255,0.07) 0%,transparent 100%)', pointerEvents:'none', zIndex:1 }} />
                    <div style={{ width:56, height:56, borderRadius:16, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:16, background:`${p.accent}22`, boxShadow:`4px 4px 0 ${shadows[p.accent]}, 0 8px 20px ${glows[p.accent]}`, position:'relative', zIndex:2, flexShrink:0 }}>
                      {p.icon}
                    </div>
                    <span style={{ display:'inline-block', fontSize:11, fontWeight:800, padding:'3px 10px', borderRadius:99, marginBottom:12, alignSelf:'flex-start', backgroundColor:`${p.accent}22`, color:p.accent, border:`1.5px solid ${p.accent}88`, position:'relative', zIndex:2 }}>
                      {p.num}
                    </span>
                    <h3 className="font-black text-base leading-snug mb-3" style={{ color:'white', position:'relative', zIndex:2 }}>{p.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color:'rgba(255,255,255,0.62)', position:'relative', zIndex:2 }}>{p.body}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quote */}
          <div className="mt-14 max-w-3xl mx-auto text-center">
            <blockquote style={{ color:'rgba(255,255,255,0.82)', fontSize:'clamp(1rem,2.2vw,1.2rem)', fontStyle:'italic', lineHeight:1.75, marginBottom:20 }}>
              "We reviewed the level scaffolding with three Thai language teachers from international schools in Bangkok. Their input shaped how we sequence consonant clusters and introduce tone marks. This is not a translation of the Thai national curriculum — it's a new path built specifically for children who are already fluent in another language."
            </blockquote>
            <p style={{ fontWeight:700, color:'#FFD60A', fontSize:14 }}>Damien · Founder, Pikko</p>
            <p style={{ color:'rgba(255,255,255,0.35)', fontSize:12, marginTop:4 }}>Reviewed with teachers in Bangkok · Parents in Paris, London, Singapore, Seoul</p>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background:'linear-gradient(135deg,#F7F5FF,#EDE8FF)', paddingTop:80, paddingBottom:80 }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="font-black mb-2" style={{ color:'#1A2B3C', fontSize:'clamp(1.4rem,3.5vw,2rem)' }}>
            Ready to find your child's <span className="text-gradient">starting level?</span>
          </p>
          <p className="mb-8 text-sm" style={{ color:'#6B7A8D' }}>Free forever. No credit card. Start at Level 1 — you can always skip ahead.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/" className="inline-block font-bold rounded-full px-10 py-4 transition-all hover:-translate-y-0.5" style={{ background:'linear-gradient(135deg,#7C4DFF,#9B6DFF)', color:'white', boxShadow:'0 8px 24px rgba(124,77,255,0.35)' }}>
              Try Pikko free →
            </Link>
            <Link href="/about" className="inline-block font-bold rounded-full px-10 py-4 transition-all hover:-translate-y-0.5" style={{ border:'2px solid rgba(124,77,255,0.3)', color:'#7C4DFF' }}>
              Our story
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

function AgeGuideSection() {
  const [idx, setIdx]         = useState(2);
  const [visible, setVisible] = useState(true);
  const inView                = useInView(0.05);

  useEffect(() => {
    setVisible(false);
    const t = setTimeout(() => setVisible(true), 160);
    return () => clearTimeout(t);
  }, [idx]);

  const band     = AGE_BANDS[idx];
  const color    = BAND_COLORS[idx];
  const gradient = BAND_GRADIENTS[idx];
  const fillPct  = (idx / (AGE_BANDS.length - 1)) * 100;
  const N        = AGE_BANDS.length;

  return (
    <section id="age-guide" style={{ backgroundColor:'white', paddingTop:96, paddingBottom:96 }}>
      <div className="max-w-5xl mx-auto px-6">
        <div
          ref={inView.ref as React.RefObject<HTMLDivElement>}
          className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-start ${inView.inView ? 'anim-slide-up' : ''}`}
          style={{ opacity: inView.inView ? undefined : 0 }}
        >

          {/* ── Left: editorial + slider ── */}
          <div>
            <p style={{ fontSize:11, fontWeight:800, letterSpacing:'0.2em', color:'#FF6635', marginBottom:12 }}>WHERE DOES MY CHILD START?</p>
            <h2 className="font-black mb-4" style={{ color:'#1A2B3C', fontSize:'clamp(1.75rem,4vw,2.4rem)', lineHeight:1.15 }}>
              Find the right<br />
              <span style={{ background:'linear-gradient(135deg,#7C4DFF,#FF4090)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>entry point.</span>
            </h2>
            <p style={{ color:'#4A5568', fontSize:15, lineHeight:1.8, marginBottom:44 }}>
              Mixed-heritage children reading Thai are typically 2–4 years behind native speakers — and that is completely normal. Drag the slider to your child's age to see where they likely stand.
            </p>

            {/* ── Slider ── */}
            <div style={{ marginBottom:32 }}>

              {/* Track wrapper — holds bg, fill, dots, handle, invisible input */}
              <div style={{ position:'relative', height:52, display:'flex', alignItems:'center', marginBottom:8, cursor:'pointer' }}>

                {/* Track bg */}
                <div style={{ position:'absolute', left:0, right:0, height:8, borderRadius:99, backgroundColor:'#EDE8FF' }} />

                {/* Colored fill */}
                <div style={{
                  position:'absolute', left:0, height:8, borderRadius:99,
                  width:`${fillPct}%`,
                  backgroundColor: color,
                  transition:'width 0.3s cubic-bezier(0.4,0,0.2,1), background-color 0.3s',
                }} />

                {/* Stop dots */}
                {AGE_BANDS.map((_, i) => (
                  <div
                    key={i}
                    style={{
                      position:'absolute',
                      left:`${(i / (N - 1)) * 100}%`,
                      transform:'translateX(-50%)',
                      width: i === idx ? 14 : 9,
                      height: i === idx ? 14 : 9,
                      borderRadius:'50%',
                      backgroundColor: i <= idx ? color : '#D1C4FF',
                      border: i === idx ? `2.5px solid white` : 'none',
                      boxShadow: i === idx ? `0 0 0 3px ${color}44` : 'none',
                      transition:'all 0.25s',
                      pointerEvents:'none',
                      zIndex:5,
                    }}
                  />
                ))}

                {/* Handle */}
                <div style={{
                  position:'absolute',
                  left:`${fillPct}%`,
                  transform:'translateX(-50%)',
                  width:52, height:52, borderRadius:'50%',
                  backgroundColor:'white',
                  border:`3px solid ${color}`,
                  boxShadow:`0 4px 18px ${color}55, 0 0 0 6px ${color}18`,
                  transition:'left 0.3s cubic-bezier(0.4,0,0.2,1), border-color 0.3s, box-shadow 0.3s',
                  display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
                  pointerEvents:'none', zIndex:10,
                }}>
                  <span style={{ fontSize:11, fontWeight:900, color, lineHeight:1.1 }}>{band.age}</span>
                  <span style={{ fontSize:8, fontWeight:600, color:'#9CA3AF', marginTop:1 }}>yrs</span>
                </div>

                {/* Invisible range input — captures all interactions */}
                <input
                  type="range" min={0} max={N - 1} step={1} value={idx}
                  onChange={e => setIdx(Number(e.target.value))}
                  style={{ position:'absolute', inset:0, width:'100%', opacity:0, cursor:'pointer', zIndex:20, margin:0 }}
                />
              </div>

              {/* Age labels */}
              <div style={{ display:'flex', justifyContent:'space-between', paddingTop:4 }}>
                {AGE_BANDS.map((b, i) => (
                  <button
                    key={i}
                    onClick={() => setIdx(i)}
                    style={{
                      fontSize:10, fontWeight: i === idx ? 800 : 500,
                      color: i === idx ? color : '#9CA3AF',
                      background:'none', border:'none', cursor:'pointer', padding:'2px 0',
                      transition:'color 0.25s',
                    }}
                  >
                    {b.age}
                  </button>
                ))}
              </div>
            </div>

            {/* Current selection summary chip */}
            <div style={{ display:'flex', alignItems:'center', gap:10, flexWrap:'wrap' }}>
              <div style={{ width:8, height:8, borderRadius:'50%', backgroundColor:color, flexShrink:0 }} />
              <span style={{ fontSize:14, fontWeight:700, color:'#1A2B3C' }}>{band.label} reader</span>
              {band.level && (
                <span style={{ fontSize:11, fontWeight:800, padding:'3px 12px', borderRadius:99, backgroundColor:`${color}15`, color, border:`1.5px solid ${color}44` }}>
                  {band.level}
                </span>
              )}
            </div>

            {/* Start low note */}
            <div style={{ marginTop:28, padding:'14px 18px', borderRadius:16, background:'#F7F5FF', border:'1px solid rgba(124,77,255,0.15)' }}>
              <span style={{ fontWeight:700, color:'#7C4DFF', fontSize:13 }}>Not sure? </span>
              <span style={{ fontSize:13, color:'#6B7A8D' }}>Always start one level lower than you think. Confidence comes fast — and you can skip ahead any time.</span>
            </div>
          </div>

          {/* ── Right: premium dark card ── */}
          <div style={{ padding:'2.5px', background:gradient, borderRadius:28, boxShadow:`6px 6px 0px ${color}55, 0 16px 40px ${color}33`, transition:'background 0.35s, box-shadow 0.35s' }}>
            <div style={{ backgroundColor:'#12103A', borderRadius:26, padding:'32px 28px', position:'relative', overflow:'hidden', minHeight:360 }}>

              {/* Glass reflection */}
              <div style={{ position:'absolute', top:0, left:0, right:0, height:'40%', background:'linear-gradient(to bottom,rgba(255,255,255,0.07) 0%,transparent 100%)', pointerEvents:'none' }} />

              {/* Animated content */}
              <div style={{ transition:'opacity 0.18s, transform 0.18s', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(10px)', position:'relative', zIndex:2 }}>

                {/* Age + level pills */}
                <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:22, flexWrap:'wrap' }}>
                  <span style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'5px 16px', borderRadius:99, backgroundColor:`${color}22`, border:`1.5px solid ${color}55` }}>
                    <div style={{ width:6, height:6, borderRadius:'50%', backgroundColor:color }} />
                    <span style={{ fontWeight:800, fontSize:13, color }}>Ages {band.age}</span>
                  </span>
                  {band.level && (
                    <span style={{ fontWeight:700, fontSize:12, color:'rgba(255,255,255,0.4)' }}>{band.level}</span>
                  )}
                </div>

                {/* Stage name */}
                <p style={{ fontWeight:900, fontSize:24, color:'white', lineHeight:1.15, marginBottom:3 }}>{band.label}</p>
                <p style={{ fontWeight:600, fontSize:14, color, marginBottom:18, fontStyle:'italic' }}>{band.th}</p>

                {/* What they can do */}
                <p style={{ fontSize:14, color:'rgba(255,255,255,0.72)', lineHeight:1.8, marginBottom:22 }}>{band.what}</p>

                <div style={{ borderTop:'1px solid rgba(255,255,255,0.06)', paddingTop:20, marginBottom:16 }} />

                <p style={{ fontSize:10, fontWeight:800, letterSpacing:'0.18em', color:'rgba(255,255,255,0.28)', marginBottom:14 }}>AT THIS STAGE</p>

                <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:11 }}>
                  {SKILLS[idx].map((sk, si) => (
                    <li key={si} style={{ display:'flex', alignItems:'center', gap:10 }}>
                      <div style={{ width:6, height:6, borderRadius:'50%', backgroundColor:color, flexShrink:0 }} />
                      <span style={{ fontSize:13, color:'rgba(255,255,255,0.72)', lineHeight:1.5 }}>{sk}</span>
                    </li>
                  ))}
                </ul>

                {idx === 0 && (
                  <div style={{ marginTop:20, padding:'12px 16px', borderRadius:12, backgroundColor:'rgba(255,214,10,0.1)', border:'1px solid rgba(255,214,10,0.25)' }}>
                    <p style={{ fontSize:12, color:'#FFD60A', fontWeight:600, lineHeight:1.6 }}>No rush before age 5–6. Let them absorb Thai sounds naturally first — Pikko will be here when they're ready.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
