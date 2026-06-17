'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useInView } from '@/lib/use-in-view';
import { POSTS } from '@/lib/posts';
import { getWordOfDay } from '@/lib/words-of-day';

const word = getWordOfDay();

const ALL_TAGS = Array.from(new Set(POSTS.flatMap(p => p.tags)));

const COVER_BG: Record<string, string> = {
  '#FF6635': '#2D1000',
  '#3BAFDA': '#001828',
  '#9B74E8': '#140B2A',
  '#4CC97C': '#051A10',
  '#FFD60A': '#1C1500',
  '#FF8C35': '#251200',
  '#FF5757': '#250000',
  '#00D2AA': '#001816',
  '#FF4C91': '#280012',
  '#7C4DFF': '#12082A',
};

const ICONS: Record<string, React.ReactNode> = {
  'thai-tones-for-kids': (
    <svg width="48" height="48" viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="27" r="21" fill="#FF6635" fillOpacity="0.15"/>
      <path d="M8 27 Q14 15 20 27 Q26 39 32 27 Q38 15 44 27 Q50 39 56 27" stroke="#FF6635" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <rect x="11" y="44" width="7" height="12" rx="3.5" fill="#FF6635" fillOpacity="0.5"/>
      <rect x="22" y="38" width="7" height="18" rx="3.5" fill="#FF6635" fillOpacity="0.75"/>
      <rect x="29" y="41" width="6" height="15" rx="3" fill="#FF6635"/>
      <rect x="38" y="36" width="7" height="20" rx="3.5" fill="#FF6635" fillOpacity="0.8"/>
      <rect x="46" y="42" width="7" height="14" rx="3.5" fill="#FF6635" fillOpacity="0.55"/>
    </svg>
  ),
  'reading-before-speaking': (
    <svg width="48" height="48" viewBox="0 0 64 64" fill="none">
      <path d="M20 14 Q10 20 10 32 Q10 44 20 48 Q26 51 28 46 Q28 40 34 38 Q42 34 42 24 Q42 12 28 10 Q24 10 20 14Z" fill="#3BAFDA" fillOpacity="0.2" stroke="#3BAFDA" strokeWidth="2.5"/>
      <path d="M22 22 Q18 26 18 32 Q18 38 22 40" stroke="#3BAFDA" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M46 20 Q54 26 54 32 Q54 38 46 44" stroke="#3BAFDA" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M50 14 Q60 22 60 32 Q60 42 50 50" stroke="#3BAFDA" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeOpacity="0.4"/>
    </svg>
  ),
  'thai-consonant-clusters': (
    <svg width="48" height="48" viewBox="0 0 64 64" fill="none">
      <path d="M8 14 L8 52 L32 48 L32 10 Z" fill="#9B74E8" fillOpacity="0.18" stroke="#9B74E8" strokeWidth="2"/>
      <path d="M56 14 L56 52 L32 48 L32 10 Z" fill="#9B74E8" fillOpacity="0.1" stroke="#9B74E8" strokeWidth="2"/>
      <line x1="32" y1="10" x2="32" y2="48" stroke="#9B74E8" strokeWidth="2.5"/>
      <text x="20" y="39" textAnchor="middle" fill="#9B74E8" fontSize="20" fontWeight="900" fontFamily="system-ui">ก</text>
      <line x1="38" y1="26" x2="52" y2="24" stroke="#9B74E8" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.65"/>
      <line x1="38" y1="33" x2="50" y2="31" stroke="#9B74E8" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.45"/>
      <line x1="38" y1="40" x2="48" y2="38" stroke="#9B74E8" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.3"/>
    </svg>
  ),
  'karaoke-reading-phonemic': (
    <svg width="48" height="48" viewBox="0 0 64 64" fill="none">
      <rect x="23" y="6" width="18" height="26" rx="9" fill="#4CC97C" fillOpacity="0.2" stroke="#4CC97C" strokeWidth="2.5"/>
      <line x1="23" y1="18" x2="41" y2="18" stroke="#4CC97C" strokeWidth="1.5" strokeOpacity="0.5"/>
      <line x1="23" y1="24" x2="41" y2="24" stroke="#4CC97C" strokeWidth="1.5" strokeOpacity="0.5"/>
      <path d="M16 32 Q16 48 32 48 Q48 48 48 32" stroke="#4CC97C" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <line x1="32" y1="48" x2="32" y2="55" stroke="#4CC97C" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="20" y1="55" x2="44" y2="55" stroke="#4CC97C" strokeWidth="3" strokeLinecap="round"/>
      <rect x="8" y="39" width="48" height="5" rx="2.5" fill="#4CC97C" fillOpacity="0.15"/>
      <rect x="8" y="39" width="22" height="5" rx="2.5" fill="#4CC97C" fillOpacity="0.65"/>
    </svg>
  ),
  'screen-time-vs-reading': (
    <svg width="48" height="48" viewBox="0 0 64 64" fill="none">
      <rect x="10" y="8" width="44" height="36" rx="6" fill="#FFD60A" fillOpacity="0.14" stroke="#FFD60A" strokeWidth="2.5"/>
      <circle cx="32" cy="50" r="3" fill="#FFD60A" fillOpacity="0.6"/>
      <path d="M16 16 L16 36 L28 34 L28 14 Z" fill="#FFD60A" fillOpacity="0.5"/>
      <path d="M28 14 L28 34 L38 36 L38 16 Z" fill="#FFD60A" fillOpacity="0.25"/>
      <line x1="28" y1="14" x2="28" y2="34" stroke="#FFD60A" strokeWidth="1.5"/>
      <path d="M42 16 L50 20 L42 24 Z" fill="#FFD60A" fillOpacity="0.75"/>
      <line x1="42" y1="28" x2="50" y2="28" stroke="#FFD60A" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.5"/>
      <line x1="42" y1="33" x2="48" y2="33" stroke="#FFD60A" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.35"/>
    </svg>
  ),
  '10-first-thai-words': (
    <svg width="48" height="48" viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="34" r="22" fill="#FF8C35" fillOpacity="0.14"/>
      <text x="32" y="46" textAnchor="middle" fill="#FF8C35" fontSize="30" fontWeight="900" fontFamily="system-ui">ก</text>
      <path d="M10 10 L11.5 14.5 L16 14.5 L12.5 17.2 L13.8 21.5 L10 18.8 L6.2 21.5 L7.5 17.2 L4 14.5 L8.5 14.5 Z" fill="#FF8C35" fillOpacity="0.75"/>
      <path d="M52 8 L53.2 11.8 L57 11.8 L54 13.9 L55 17.5 L52 15.5 L49 17.5 L50 13.9 L47 11.8 L50.8 11.8 Z" fill="#FF8C35" fillOpacity="0.55"/>
      <path d="M56 44 L57 47 L60 47 L57.7 48.8 L58.6 52 L56 50.3 L53.4 52 L54.3 48.8 L52 47 L55 47 Z" fill="#FF8C35" fillOpacity="0.65"/>
      <circle cx="8" cy="44" r="3" fill="#FF8C35" fillOpacity="0.4"/>
      <circle cx="56" cy="26" r="2" fill="#FF8C35" fillOpacity="0.35"/>
    </svg>
  ),
  'consistency-beats-intensity': (
    <svg width="48" height="48" viewBox="0 0 64 64" fill="none">
      <rect x="10" y="16" width="44" height="40" rx="8" fill="#FF5757" fillOpacity="0.14" stroke="#FF5757" strokeWidth="2.5"/>
      <line x1="10" y1="28" x2="54" y2="28" stroke="#FF5757" strokeWidth="2"/>
      <rect x="20" y="10" width="5" height="12" rx="2.5" fill="#FF5757"/>
      <rect x="39" y="10" width="5" height="12" rx="2.5" fill="#FF5757"/>
      <path d="M18 38 L21 42 L27 34" stroke="#FF5757" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M32 38 L35 42 L41 34" stroke="#FF5757" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M48 50 Q46 44 50 39 Q51 45 54 43 Q54 51 48 53 Q46 53 45 50 Q43 52 41 50 Q42 44 48 42 Q46 46 48 50Z" fill="#FF5757" fillOpacity="0.85"/>
    </svg>
  ),
  'spaced-repetition-vocabulary': (
    <svg width="48" height="48" viewBox="0 0 64 64" fill="none">
      <path d="M32 10 Q18 10 16 22 Q14 30 20 34 Q16 38 18 44 Q22 50 30 48 Q34 52 38 48 Q46 50 46 44 Q50 40 46 34 Q52 30 50 22 Q48 10 32 10Z" fill="#00D2AA" fillOpacity="0.15" stroke="#00D2AA" strokeWidth="2.5"/>
      <path d="M32 10 Q35 22 32 34 Q29 22 32 10" fill="#00D2AA" fillOpacity="0.2"/>
      <circle cx="22" cy="26" r="4" fill="#00D2AA"/>
      <circle cx="42" cy="26" r="4" fill="#00D2AA"/>
      <circle cx="32" cy="40" r="4" fill="#00D2AA"/>
      <line x1="22" y1="26" x2="42" y2="26" stroke="#00D2AA" strokeWidth="1.5" strokeOpacity="0.45"/>
      <line x1="22" y1="26" x2="32" y2="40" stroke="#00D2AA" strokeWidth="1.5" strokeOpacity="0.45"/>
      <line x1="42" y1="26" x2="32" y2="40" stroke="#00D2AA" strokeWidth="1.5" strokeOpacity="0.45"/>
    </svg>
  ),
  'bilingual-families-thai': (
    <svg width="48" height="48" viewBox="0 0 64 64" fill="none">
      <circle cx="30" cy="34" r="22" fill="#FF4C91" fillOpacity="0.12" stroke="#FF4C91" strokeWidth="2.5"/>
      <ellipse cx="30" cy="34" rx="10" ry="22" stroke="#FF4C91" strokeWidth="1.5" strokeOpacity="0.45"/>
      <line x1="8" y1="34" x2="52" y2="34" stroke="#FF4C91" strokeWidth="1.5" strokeOpacity="0.35"/>
      <line x1="10" y1="24" x2="50" y2="24" stroke="#FF4C91" strokeWidth="1" strokeOpacity="0.25"/>
      <line x1="10" y1="44" x2="50" y2="44" stroke="#FF4C91" strokeWidth="1" strokeOpacity="0.25"/>
      <circle cx="48" cy="18" r="11" fill="#FF4C91"/>
      <path d="M43.5 16.5 Q43.5 14 46 14 Q48 14 48 16.5 Q48 14 50 14 Q52.5 14 52.5 16.5 Q52.5 20 48 23.5 Q43.5 20 43.5 16.5Z" fill="white"/>
    </svg>
  ),
  'gor-gai-to-sentences': (
    <svg width="48" height="48" viewBox="0 0 64 64" fill="none">
      <path d="M10 52 Q16 34 32 28 Q48 22 54 10" stroke="#7C4DFF" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <circle cx="10" cy="52" r="7" fill="#7C4DFF"/>
      <text x="10" y="56" textAnchor="middle" fill="white" fontSize="9" fontWeight="900" fontFamily="system-ui">ก</text>
      <circle cx="32" cy="28" r="5" fill="#7C4DFF" fillOpacity="0.7"/>
      <circle cx="54" cy="10" r="4" fill="#7C4DFF" fillOpacity="0.45"/>
      <path d="M18 46 Q22 40 28 34" stroke="#7C4DFF" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeOpacity="0.35" strokeDasharray="3,3"/>
      <line x1="42" y1="34" x2="56" y2="30" stroke="#7C4DFF" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.5"/>
      <line x1="42" y1="40" x2="55" y2="37" stroke="#7C4DFF" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.35"/>
    </svg>
  ),
};

export default function BlogPage() {
  const [activeTag, setActiveTag]   = useState<string | null>(null);
  const [expanded, setExpanded]     = useState<string | null>(null);
  const heroRef  = useInView(0);
  const postsRef = useInView(0);

  const filtered = activeTag ? POSTS.filter(p => p.tags.includes(activeTag)) : POSTS;

  return (
    <div style={{ backgroundColor:'#FAFAFA', minHeight:'100dvh' }}>

      {/* ── Hero ── */}
      <section style={{ background:'linear-gradient(150deg,#1A0845 0%,#2D1278 40%,#5B20CC 80%,#7C2DFF 100%)', paddingTop:112, paddingBottom:80, position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:-100, left:-100, width:450, height:450, background:'radial-gradient(circle,rgba(255,87,87,0.18) 0%,transparent 70%)', borderRadius:'50%', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:-60, right:-60, width:380, height:380, background:'radial-gradient(circle,rgba(0,209,167,0.15) 0%,transparent 70%)', borderRadius:'50%', pointerEvents:'none' }} />

        <div className="float-animate" style={{ position:'absolute', top:'14%', left:'5%',  width:40, height:40, backgroundColor:'#FFD60A', borderRadius:'50%', opacity:0.85, pointerEvents:'none' }} />
        <div className="float-animate" style={{ position:'absolute', top:'70%', right:'5%', width:28, height:28, backgroundColor:'#FF5757', borderRadius:'50%', opacity:0.75, animationDelay:'1.2s', pointerEvents:'none' }} />
        <div className="float-animate" style={{ position:'absolute', top:'20%', right:'8%', width:16, height:16, backgroundColor:'#FF4C91', borderRadius:'50%', opacity:0.7, animationDelay:'0.6s', pointerEvents:'none' }} />

        <div
          ref={heroRef.ref as React.RefObject<HTMLDivElement>}
          className={`max-w-5xl mx-auto px-6 ${heroRef.inView ? 'anim-slide-up' : ''}`}
          style={{ opacity: heroRef.inView ? undefined : 0 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">

            {/* Left — title */}
            <div className="lg:col-span-3">
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-5 text-sm font-semibold" style={{ backgroundColor:'rgba(255,214,10,0.15)', color:'#FFD60A', border:'1px solid rgba(255,214,10,0.3)' }}>
                <span style={{ fontSize:16 }}>📚</span> Parent's Tips
              </div>
              <h1 className="font-black leading-tight mb-4" style={{ color:'white', fontSize:'clamp(2rem,5vw,3.2rem)' }}>
                Read better,<br /><span className="text-gradient">together.</span>
              </h1>
              <p style={{ color:'rgba(255,255,255,0.7)', fontSize:16, lineHeight:1.75, maxWidth:480 }}>
                Guides, research, and real stories to help you support your child's Thai reading journey — even if you don't speak the language yourself.
              </p>
            </div>

            {/* Right — Word of the Day card */}
            <div className="lg:col-span-2">
              <WordOfDay />
            </div>
          </div>
        </div>
      </section>

      {/* ── Tag filter ── */}
      <div style={{ backgroundColor:'white', borderBottom:'1px solid rgba(0,0,0,0.06)', position:'sticky', top:64, zIndex:20 }}>
        <div className="max-w-5xl mx-auto px-6 py-3 flex gap-2 overflow-x-auto" style={{ scrollbarWidth:'none' }}>
          <button
            onClick={() => setActiveTag(null)}
            className="flex-none text-xs font-bold px-4 py-2 rounded-full transition-all"
            style={!activeTag
              ? { background:'linear-gradient(135deg,#7C4DFF,#9B6DFF)', color:'white' }
              : { background:'rgba(0,0,0,0.05)', color:'#6B7A8D' }}
          >
            All
          </button>
          {ALL_TAGS.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className="flex-none text-xs font-bold px-4 py-2 rounded-full transition-all capitalize"
              style={activeTag === tag
                ? { background:'linear-gradient(135deg,#7C4DFF,#9B6DFF)', color:'white' }
                : { background:'rgba(0,0,0,0.05)', color:'#6B7A8D' }}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* ── Posts grid ── */}
      <section style={{ paddingTop:56, paddingBottom:96 }}>
        <div
          ref={postsRef.ref as React.RefObject<HTMLDivElement>}
          className="max-w-5xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((post, i) => {
            const isOpen = expanded === post.slug;
            const a = post.accent;
            const grad = `linear-gradient(135deg,${a},${a}BB,${a}77)`;
            const shadow = `6px 6px 0px ${a}55, 0 16px 40px ${a}22`;
            return (
              <article
                key={post.slug}
                className={postsRef.inView ? 'anim-pop-in' : ''}
                style={{ padding:'2.5px', background:grad, borderRadius:28, boxShadow:shadow, opacity: postsRef.inView ? undefined : 0, animationDelay:`${i * 0.07}s` }}
              >
                <div
                  className="flex flex-col h-full hover:-translate-y-1 transition-all duration-200 cursor-default"
                  style={{ backgroundColor:'#FAFAFA', borderRadius:26, overflow:'hidden' }}
                >
                  {/* Cover — vivid dark + radial glow + icon */}
                  <div style={{ height:120, backgroundColor: COVER_BG[a] ?? '#0C0A1E', display:'flex', alignItems:'center', justifyContent:'center', position:'relative', flexShrink:0, overflow:'hidden' }}>
                    <div style={{ position:'absolute', inset:0, background:`radial-gradient(circle at 50% 60%, ${a}50 0%, transparent 68%)`, pointerEvents:'none' }} />
                    <div style={{ position:'absolute', bottom:-24, right:-16, width:100, height:100, borderRadius:'50%', background:`${a}12`, pointerEvents:'none' }} />
                    <div style={{ position:'absolute', top:-20, left:-20, width:80, height:80, borderRadius:'50%', background:`${a}0A`, pointerEvents:'none' }} />
                    <div style={{ position:'relative', zIndex:1, filter:`drop-shadow(0 4px 14px ${a}80)` }}>
                      {ICONS[post.slug] ?? <span style={{ fontSize:40 }}>{post.emoji}</span>}
                    </div>
                  </div>

                  <div style={{ padding:'16px 20px 20px', flex:1, display:'flex', flexDirection:'column' }}>
                    {/* Tags */}
                    <div className="flex gap-1.5 flex-wrap mb-3">
                      {post.tags.slice(0,2).map(tag => (
                        <span key={tag} className="text-xs font-bold px-3 py-1 rounded-full capitalize" style={{ background:`${a}18`, color:a, border:`1.5px solid ${a}44` }}>{tag}</span>
                      ))}
                    </div>

                    <h2 className="font-black text-sm leading-snug mb-auto" style={{ color:'#1A2B3C' }}>{post.title}</h2>

                    <div className="flex items-center justify-between mt-4" style={{ borderTop:`1px solid ${a}22`, paddingTop:12 }}>
                      <span className="text-xs font-semibold" style={{ color:'#9CA3AF' }}>
                        {new Date(post.date).toLocaleDateString('en', { month:'short', day:'numeric' })} · {post.readTime} min
                      </span>
                      {post.body ? (
                        <button
                          onClick={() => setExpanded(isOpen ? null : post.slug)}
                          className="text-xs font-bold px-3 py-1.5 rounded-full transition-all"
                          style={{ background:`${a}18`, color:a, border:`1.5px solid ${a}44` }}
                        >
                          {isOpen ? 'Close' : 'Read →'}
                        </button>
                      ) : (
                        <span className="text-xs font-semibold px-3 py-1.5 rounded-full" style={{ background:'rgba(0,0,0,0.04)', color:'#9CA3AF' }}>Soon</span>
                      )}
                    </div>

                    {/* Expanded body */}
                    {isOpen && post.body && (
                      <div className="mt-4 pt-4 text-sm leading-relaxed" style={{ color:'#4A5568', borderTop:`1px solid ${a}22` }}>
                        {post.body}
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

      </section>

      {/* ── CTA strip ── */}
      <section style={{ background:'linear-gradient(135deg,#F7F5FF,#EDE8FF)', paddingTop:64, paddingBottom:64 }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="font-black mb-2" style={{ color:'#1A2B3C', fontSize:'clamp(1.4rem,3.5vw,2rem)' }}>
            Ready to start your child's <span className="text-gradient">reading journey?</span>
          </p>
          <p className="mb-6 text-sm" style={{ color:'#6B7A8D' }}>Free forever. No credit card needed.</p>
          <Link href="/" className="inline-block font-bold rounded-full px-10 py-4 transition-all hover:-translate-y-0.5" style={{ background:'linear-gradient(135deg,#7C4DFF,#9B6DFF)', color:'white', boxShadow:'0 8px 24px rgba(124,77,255,0.35)' }}>
            Try Pikko free →
          </Link>
        </div>
      </section>

    </div>
  );
}

function WordOfDay() {
  return (
    <div
      className="rounded-3xl overflow-hidden"
      style={{ boxShadow:'0 16px 48px rgba(0,0,0,0.3)', border:'1px solid rgba(255,255,255,0.15)' }}
    >
      {/* Header */}
      <div style={{ background:'linear-gradient(135deg,rgba(255,214,10,0.2),rgba(255,140,53,0.15))', padding:'14px 20px', borderBottom:'1px solid rgba(255,255,255,0.12)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div className="flex items-center gap-2">
          <span style={{ fontSize:16 }}>✨</span>
          <span className="font-black text-xs tracking-widest" style={{ color:'#FFD60A' }}>WORD OF THE DAY</span>
        </div>
        <span className="text-xs font-semibold" style={{ color:'rgba(255,255,255,0.4)' }}>
          {new Date().toLocaleDateString('en', { month:'short', day:'numeric' })}
        </span>
      </div>

      {/* Body */}
      <div style={{ background:'rgba(255,255,255,0.08)', backdropFilter:'blur(16px)', padding:'24px 24px' }}>
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <p className="font-black" style={{ color:'white', fontSize:'clamp(2rem,5vw,2.8rem)', lineHeight:1, fontFamily:"'Noto Serif Thai', serif" }}>
              {word.thai}
            </p>
            <p className="font-semibold text-sm mt-1" style={{ color:'rgba(255,255,255,0.55)', fontStyle:'italic' }}>
              {word.romanization}
            </p>
          </div>
          <div style={{ fontSize:40, flexShrink:0 }}>{word.emoji}</div>
        </div>

        <div style={{ borderTop:'1px solid rgba(255,255,255,0.1)', paddingTop:16 }}>
          <p className="font-bold text-base" style={{ color:'white' }}>{word.meaning}</p>
          <div className="inline-flex items-center gap-2 mt-2 rounded-full px-3 py-1.5" style={{ background:'rgba(255,214,10,0.15)', border:'1px solid rgba(255,214,10,0.3)' }}>
            <span style={{ fontSize:14 }}>😄</span>
            <p className="text-xs font-semibold" style={{ color:'#FFD60A' }}>{word.funFact}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
