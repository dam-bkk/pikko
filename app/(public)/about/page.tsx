'use client';
import Link from 'next/link';
import { useInView } from '@/lib/use-in-view';
const VALUES = [
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 64 64" fill="none">
        {/* Sprouting seed / book growing into plant */}
        <rect x="10" y="36" width="44" height="22" rx="6" fill="#4CC97C" fillOpacity="0.15"/>
        <rect x="10" y="36" width="44" height="22" rx="6" stroke="#4CC97C" strokeWidth="2"/>
        {/* Book pages */}
        <path d="M22 36 L22 18 Q22 14 26 14 L32 14" stroke="#4CC97C" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <path d="M42 36 L42 18 Q42 14 38 14 L32 14" stroke="#4CC97C" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <line x1="32" y1="14" x2="32" y2="36" stroke="#4CC97C" strokeWidth="2" strokeLinecap="round"/>
        {/* Growing sprout from book */}
        <path d="M32 14 Q32 8 28 6 Q34 4 34 10" fill="#4CC97C" fillOpacity="0.6"/>
        <circle cx="32" cy="6" r="3" fill="#4CC97C"/>
        {/* Text lines on book */}
        <line x1="16" y1="44" x2="28" y2="44" stroke="#4CC97C" strokeWidth="2" strokeLinecap="round"/>
        <line x1="16" y1="50" x2="25" y2="50" stroke="#4CC97C" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.6"/>
        <line x1="36" y1="44" x2="48" y2="44" stroke="#4CC97C" strokeWidth="2" strokeLinecap="round"/>
        <line x1="36" y1="50" x2="46" y2="50" stroke="#4CC97C" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.6"/>
      </svg>
    ),
    title: 'Every child can read',
    body: 'Reading in Thai is not a gift for the few — it\'s a skill every child can build with the right support, at their own pace.',
    accent: '#4CC97C',
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 64 64" fill="none">
        {/* Ear with sound waves — karaoke */}
        <path d="M24 16 Q16 22 16 32 Q16 42 24 46 Q28 48 28 44 Q28 40 32 38 Q38 34 38 26 Q38 16 28 14 Q26 14 24 16Z" fill="#FF6635" fillOpacity="0.15" stroke="#FF6635" strokeWidth="2"/>
        <path d="M26 24 Q22 28 22 32 Q22 36 26 38" stroke="#FF6635" strokeWidth="2" fill="none" strokeLinecap="round"/>
        {/* Sound waves radiating right */}
        <path d="M42 22 Q48 28 48 32 Q48 36 42 42" stroke="#FF6635" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <path d="M46 18 Q54 25 54 32 Q54 39 46 46" stroke="#FF6635" strokeWidth="2" fill="none" strokeLinecap="round" strokeOpacity="0.5"/>
        {/* Thai character ก floating */}
        <text x="37" y="36" fill="#FF6635" fontSize="12" fontWeight="900" fontFamily="system-ui" fillOpacity="0.9">ก</text>
      </svg>
    ),
    title: 'Sound first, script second',
    body: 'Before a child can read Thai script, they need to hear the tones. Pikko\'s karaoke method locks both together naturally.',
    accent: '#FF6635',
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 64 64" fill="none">
        {/* Brain with gears / science neurons */}
        <path d="M32 10 Q18 10 16 22 Q14 30 20 34 Q16 38 18 44 Q22 50 30 48 Q34 52 38 48 Q46 50 46 44 Q50 40 46 34 Q52 30 50 22 Q48 10 32 10Z" fill="#3BAFDA" fillOpacity="0.12" stroke="#3BAFDA" strokeWidth="2"/>
        {/* Center division */}
        <line x1="32" y1="12" x2="32" y2="48" stroke="#3BAFDA" strokeWidth="1.5" strokeDasharray="3 2" strokeOpacity="0.4"/>
        {/* Neurons / connection dots */}
        <circle cx="24" cy="26" r="3" fill="#3BAFDA"/>
        <circle cx="40" cy="26" r="3" fill="#3BAFDA"/>
        <circle cx="26" cy="38" r="3" fill="#3BAFDA"/>
        <circle cx="38" cy="38" r="3" fill="#3BAFDA"/>
        <circle cx="32" cy="30" r="4" fill="#3BAFDA" fillOpacity="0.7"/>
        {/* Connections */}
        <line x1="24" y1="26" x2="32" y2="30" stroke="#3BAFDA" strokeWidth="1.5" strokeOpacity="0.6"/>
        <line x1="40" y1="26" x2="32" y2="30" stroke="#3BAFDA" strokeWidth="1.5" strokeOpacity="0.6"/>
        <line x1="26" y1="38" x2="32" y2="30" stroke="#3BAFDA" strokeWidth="1.5" strokeOpacity="0.6"/>
        <line x1="38" y1="38" x2="32" y2="30" stroke="#3BAFDA" strokeWidth="1.5" strokeOpacity="0.6"/>
        {/* Small spark at top */}
        <path d="M32 10 L33.5 7 L35 10 M32 10 L30.5 7 L29 10" stroke="#FFD23F" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Built on learning science',
    body: 'Spaced repetition, phonemic awareness, comprehensible input — we\'ve baked the research into every interaction, invisibly.',
    accent: '#3BAFDA',
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 64 64" fill="none">
        {/* Heart with house/home inside — indie, personal */}
        <path d="M32 54 L12 34 Q6 26 12 18 Q18 10 26 14 Q30 16 32 20 Q34 16 38 14 Q46 10 52 18 Q58 26 52 34 Z" fill="#9B74E8" fillOpacity="0.15" stroke="#9B74E8" strokeWidth="2"/>
        {/* House silhouette inside heart */}
        <path d="M22 36 L22 28 L32 22 L42 28 L42 36 Z" fill="#9B74E8" fillOpacity="0.4"/>
        <path d="M19 30 L32 21 L45 30" stroke="#9B74E8" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        {/* Door */}
        <rect x="28" y="30" width="8" height="10" rx="2" fill="#9B74E8"/>
        {/* Small star above heart */}
        <path d="M32 10 l1 2.8 3 0 -2.4 1.7 0.9 2.8 -2.5-1.8 -2.5 1.8 0.9-2.8 -2.4-1.7 3 0z" fill="#FFD23F"/>
      </svg>
    ),
    title: 'Made with love, not VC money',
    body: 'Pikko is an indie project. No investor pressure means we optimise for your child\'s progress, not engagement metrics.',
    accent: '#9B74E8',
  },
];

export default function AboutPage() {
  const heroRef    = useInView(0);
  const missionRef = useInView(0);
  const valuesRef  = useInView(0);
  const teamRef    = useInView(0);

  return (
    <div style={{ backgroundColor: '#FAFAFA', minHeight: '100dvh' }}>

      {/* ── Hero ── */}
      <section
        style={{ background: 'linear-gradient(150deg,#1A0845 0%,#2D1278 40%,#5B20CC 80%,#7C2DFF 100%)', paddingTop: 112, paddingBottom: 96, position: 'relative', overflow: 'hidden' }}
      >
        {/* Background blobs */}
        <div style={{ position:'absolute', top:-120, left:-120, width:500, height:500, background:'radial-gradient(circle,rgba(255,87,87,0.18) 0%,transparent 70%)', borderRadius:'50%', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:-80, right:-80, width:420, height:420, background:'radial-gradient(circle,rgba(0,209,167,0.15) 0%,transparent 70%)', borderRadius:'50%', pointerEvents:'none' }} />

        {/* Orbs */}
        <div className="float-animate" style={{ position:'absolute', top:'14%', left:'5%',  width:44, height:44, backgroundColor:'#FFD60A', borderRadius:'50%', opacity:0.85, pointerEvents:'none' }} />
        <div className="float-animate" style={{ position:'absolute', top:'72%', left:'3%',  width:22, height:22, backgroundColor:'#FF5757', borderRadius:'50%', opacity:0.8, animationDelay:'1.2s', pointerEvents:'none' }} />
        <div className="float-animate" style={{ position:'absolute', top:'10%', right:'5%', width:18, height:18, backgroundColor:'#FF4C91', borderRadius:'50%', opacity:0.75, animationDelay:'0.6s', pointerEvents:'none' }} />
        <div className="float-animate" style={{ position:'absolute', top:'75%', right:'4%', width:32, height:32, backgroundColor:'#FFD60A', borderRadius:'50%', opacity:0.65, animationDelay:'1.8s', pointerEvents:'none' }} />

        {/* Sparkles */}
        {[{ top:'22%',left:'12%',s:22,d:0 },{ top:'60%',left:'18%',s:14,d:0.5 },{ top:'15%',right:'12%',s:18,d:1 }].map((sp,i)=>(
          <svg key={i} className="float-animate" style={{ position:'absolute', top:sp.top, left:(sp as any).left, right:(sp as any).right, opacity:0.45, animationDelay:`${sp.d}s`, pointerEvents:'none' }} width={sp.s} height={sp.s} viewBox="0 0 24 24" fill="none">
            <path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        ))}

        <div
          ref={heroRef.ref as React.RefObject<HTMLDivElement>}
          className={`max-w-3xl mx-auto px-6 text-center relative ${heroRef.inView ? 'anim-slide-up' : ''}`}
          style={{ opacity: heroRef.inView ? undefined : 0 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6 text-sm font-semibold" style={{ backgroundColor:'rgba(255,214,10,0.15)', color:'#FFD60A', border:'1px solid rgba(255,214,10,0.3)' }}>
            <div style={{ width:7, height:7, borderRadius:'50%', backgroundColor:'#FFD60A' }} />
            Our story
          </div>
          <h1 className="font-black leading-tight mb-5" style={{ color:'white', fontSize:'clamp(2.2rem,5.5vw,3.8rem)' }}>
            Thai reading for <span className="text-gradient">every child,</span><br />everywhere.
          </h1>
          <p style={{ color:'rgba(255,255,255,0.72)', fontSize:18, lineHeight:1.7, maxWidth:560, margin:'0 auto 32px' }}>
            Pikko started as a personal project for one child in Bangkok. Today it helps mixed-heritage families around the world give their children the gift of Thai literacy.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-bold rounded-full transition-all duration-200 hover:-translate-y-0.5"
            style={{ background:'linear-gradient(135deg,#FFD60A,#FF8C35)', color:'#1A0845', fontSize:16, padding:'14px 36px', boxShadow:'0 8px 28px rgba(255,214,10,0.4)' }}
          >
            Try Pikko free →
          </Link>
        </div>
      </section>

      {/* ── Mission — editorial dark strip ── */}
      <section style={{ background: 'linear-gradient(150deg,#100030 0%,#1E0860 50%,#0A1840 100%)', paddingTop: 96, paddingBottom: 96, position: 'relative', overflow: 'hidden' }}>
        {/* Radial glow left */}
        <div style={{ position:'absolute', top:'20%', left:'-10%', width:600, height:600, background:'radial-gradient(circle,rgba(124,45,255,0.25) 0%,transparent 65%)', borderRadius:'50%', pointerEvents:'none' }} />
        {/* Radial glow right */}
        <div style={{ position:'absolute', bottom:'10%', right:'-8%', width:500, height:500, background:'radial-gradient(circle,rgba(59,175,218,0.15) 0%,transparent 65%)', borderRadius:'50%', pointerEvents:'none' }} />

        <div className="max-w-6xl mx-auto px-6">
          {/* Label */}
          <p
            ref={missionRef.ref as React.RefObject<HTMLParagraphElement>}
            className={`font-black text-xs tracking-widest mb-10 text-center ${missionRef.inView ? 'anim-slide-up' : ''}`}
            style={{ color:'rgba(255,255,255,0.35)', opacity: missionRef.inView ? undefined : 0, letterSpacing:'0.25em' }}
          >
            OUR MISSION
          </p>

          {/* Big statement */}
          <h2
            className={`font-black text-center leading-tight mb-16 ${missionRef.inView ? 'anim-slide-up' : ''}`}
            style={{ color:'white', fontSize:'clamp(2rem,5.5vw,3.8rem)', maxWidth:900, margin:'0 auto 64px', opacity: missionRef.inView ? undefined : 0, animationDelay:'0.1s' }}
          >
            No child should lose their{' '}
            <span className="text-gradient">heritage language</span>
            {' '}because the tools weren't good enough.
          </h2>

          {/* Stats row — 4 huge numbers */}
          <div
            className={`grid grid-cols-2 lg:grid-cols-4 gap-px ${missionRef.inView ? 'anim-slide-up' : ''}`}
            style={{ background:'rgba(255,255,255,0.08)', borderRadius:24, overflow:'hidden', opacity: missionRef.inView ? undefined : 0, animationDelay:'0.2s' }}
          >
            {[
              { num: '4–9',  label: 'Target age range',      sub: 'years old', accent: '#FF6635' },
              { num: '6',    label: 'Languages',              sub: 'on the platform', accent: '#3BAFDA' },
              { num: '2',    label: 'Illustrated books',      sub: 'built so far', accent: '#4CC97C' },
              { num: '∞',    label: 'Stories',                sub: 'still to write', accent: '#FFD23F' },
            ].map((s, i) => (
              <div key={i} style={{ padding:'36px 24px', textAlign:'center', background:'rgba(255,255,255,0.04)', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                <p style={{ fontWeight:900, fontSize:'clamp(2.4rem,6vw,4rem)', color:s.accent, lineHeight:1, marginBottom:8, fontVariantNumeric:'tabular-nums' }}>{s.num}</p>
                <p style={{ fontWeight:800, fontSize:14, color:'white', marginBottom:2 }}>{s.label}</p>
                <p style={{ fontSize:12, color:'rgba(255,255,255,0.4)' }}>{s.sub}</p>
              </div>
            ))}
          </div>

          {/* Mission prose below stats */}
          <div
            className={`grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16 ${missionRef.inView ? 'anim-slide-up' : ''}`}
            style={{ opacity: missionRef.inView ? undefined : 0, animationDelay:'0.3s' }}
          >
            <p style={{ color:'rgba(255,255,255,0.65)', fontSize:17, lineHeight:1.8 }}>
              These children live in two worlds at once. English at school, a parent's language at home, Thai somewhere in between — four mandatory hours a week that can't compete with the weight of their daily environment. Over time, Thai becomes the language they understand but no longer dare to speak. Not from lack of love for it. From lack of confidence.
            </p>
            <p style={{ color:'rgba(255,255,255,0.65)', fontSize:17, lineHeight:1.8 }}>
              We've seen it up close: a child goes somewhere Thai is spoken and freezes — not because they don't know the words, but because they've never had enough of them to feel safe. That feeling is preventable. We built Pikko to give children the vocabulary, the rhythm, and the quiet confidence that comes from really knowing a language — not just surviving it.
            </p>
          </div>
        </div>
      </section>

      {/* ── Values — LevelsSection style ── */}
      <section style={{ background:'linear-gradient(150deg,#100030 0%,#1E0860 45%,#0A1840 100%)', paddingTop:96, paddingBottom:96, position:'relative', overflow:'hidden' }}>

        {/* Vivid background blobs */}
        <div style={{ position:'absolute', top:-140, right:-100, width:560, height:560, background:'radial-gradient(circle,rgba(76,201,124,0.25) 0%,transparent 65%)', borderRadius:'50%', pointerEvents:'none', filter:'blur(48px)' }} />
        <div style={{ position:'absolute', bottom:-100, left:-80, width:460, height:460, background:'radial-gradient(circle,rgba(59,175,218,0.2) 0%,transparent 65%)', borderRadius:'50%', pointerEvents:'none', filter:'blur(48px)' }} />
        <div style={{ position:'absolute', top:'40%', left:'30%', width:300, height:300, background:'radial-gradient(circle,rgba(255,214,10,0.1) 0%,transparent 65%)', borderRadius:'50%', pointerEvents:'none', filter:'blur(48px)' }} />

        {/* Organic shapes */}
        <div style={{ position:'absolute', top:'8%', right:'-4%', width:360, height:400, background:'linear-gradient(145deg,rgba(155,116,232,0.14) 0%,rgba(59,175,218,0.1) 100%)', borderRadius:'65% 35% 55% 45% / 45% 55% 35% 65%', border:'1.5px solid rgba(255,255,255,0.07)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:'6%', left:'-3%', width:300, height:340, background:'linear-gradient(145deg,rgba(76,201,124,0.14) 0%,rgba(255,214,10,0.08) 100%)', borderRadius:'35% 65% 45% 55% / 55% 45% 65% 35%', border:'1.5px solid rgba(255,255,255,0.07)', pointerEvents:'none' }} />

        {/* Floating dots */}
        {[
          { top:'12%', left:'8%',  size:10, color:'#FFD60A', delay:'0s' },
          { top:'28%', left:'4%',  size: 6, color:'#4CC97C', delay:'0.8s' },
          { top:'70%', left:'7%',  size: 8, color:'#3BAFDA', delay:'1.6s' },
          { top: '8%', right:'9%', size:12, color:'#FF6635', delay:'0.4s' },
          { top:'60%', right:'5%', size: 7, color:'#FFD60A', delay:'1.2s' },
          { top:'82%', right:'8%', size: 9, color:'#9B74E8', delay:'2s' },
        ].map((dot, i) => (
          <div key={i} className="float-animate" style={{ position:'absolute', top:dot.top, left:(dot as any).left, right:(dot as any).right, width:dot.size, height:dot.size, borderRadius:'50%', backgroundColor:dot.color, opacity:0.75, animationDelay:dot.delay, pointerEvents:'none', boxShadow:`0 0 ${dot.size * 2}px ${dot.color}88` }} />
        ))}

        <div className="max-w-6xl mx-auto px-6 relative">
          {/* Header */}
          <div
            ref={valuesRef.ref as React.RefObject<HTMLDivElement>}
            className={`text-center mb-14 ${valuesRef.inView ? 'anim-slide-up' : ''}`}
            style={{ opacity: valuesRef.inView ? undefined : 0 }}
          >
            <h2 className="font-black mb-3" style={{ color:'white', fontSize:'clamp(1.75rem,4vw,2.5rem)' }}>
              What we <span className="text-gradient">believe</span>
            </h2>
            <p style={{ color:'rgba(255,255,255,0.65)', fontSize:16, maxWidth:480, margin:'0 auto' }}>
              Four principles that shape every feature, every story, every decision.
            </p>
          </div>

          {/* Cards — same pattern as LevelsSection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v, i) => {
              const gradients = [
                'linear-gradient(135deg,#4CC97C,#3BAFDA,#00D2AA)',
                'linear-gradient(135deg,#FF6635,#FF8C35,#FFD60A)',
                'linear-gradient(135deg,#3BAFDA,#00AEEF,#9B74E8)',
                'linear-gradient(135deg,#9B74E8,#7C4DFF,#FF4090)',
              ];
              const shadows = ['#008A70','#CC4400','#006699','#5520AA'];
              const glows   = ['rgba(76,201,124,0.4)','rgba(255,102,53,0.4)','rgba(59,175,218,0.4)','rgba(155,116,232,0.4)'];
              const bgs     = ['rgba(76,201,124,0.18)','rgba(255,102,53,0.18)','rgba(59,175,218,0.18)','rgba(155,116,232,0.18)'];
              return (
                <div
                  key={v.title}
                  className={valuesRef.inView ? 'anim-pop-in' : ''}
                  style={{
                    padding: '2.5px',
                    background: gradients[i],
                    borderRadius: 28,
                    boxShadow: `6px 6px 0px ${shadows[i]}, 0 16px 40px ${glows[i]}`,
                    animationDelay: `${i * 0.1}s`,
                    opacity: valuesRef.inView ? undefined : 0,
                    transition: 'transform 0.2s',
                  }}
                >
                  <div
                    className="rounded-3xl p-6 flex flex-col hover:-translate-y-2 transition-all duration-200 cursor-default h-full"
                    style={{ backgroundColor:'#12103A', borderRadius:26, overflow:'hidden', position:'relative' }}
                  >
                    {/* Glass reflection */}
                    <div style={{ position:'absolute', top:0, left:0, right:0, height:'40%', background:'linear-gradient(to bottom,rgba(255,255,255,0.07) 0%,transparent 100%)', pointerEvents:'none', zIndex:1 }} />

                    {/* Icon badge */}
                    <div
                      style={{ width:60, height:60, borderRadius:18, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:16, background: bgs[i], boxShadow:`4px 4px 0 ${shadows[i]}, 0 8px 20px ${glows[i]}`, position:'relative', zIndex:2, flexShrink:0 }}
                    >
                      {v.icon}
                    </div>

                    {/* Belief number pill */}
                    <span
                      style={{ display:'inline-block', fontSize:11, fontWeight:800, padding:'3px 10px', borderRadius:99, marginBottom:12, alignSelf:'flex-start', backgroundColor: bgs[i], color: v.accent, border:`1.5px solid ${v.accent}88`, position:'relative', zIndex:2 }}
                    >
                      0{i + 1}
                    </span>

                    <h3 className="font-black text-lg leading-tight mb-2" style={{ color:'white', position:'relative', zIndex:2 }}>{v.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color:'rgba(255,255,255,0.65)', position:'relative', zIndex:2 }}>{v.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Team / Personal note ── */}
      <section style={{ background:'linear-gradient(150deg,#1A0845 0%,#2D1278 50%,#5B20CC 100%)', paddingTop:96, paddingBottom:96, position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:-80, right:-80, width:360, height:360, background:'radial-gradient(circle,rgba(255,214,10,0.1),transparent 70%)', borderRadius:'50%', pointerEvents:'none' }} />
        <div className="max-w-3xl mx-auto px-6">
          <div
            ref={teamRef.ref as React.RefObject<HTMLDivElement>}
            className={`text-center ${teamRef.inView ? 'anim-slide-up' : ''}`}
            style={{ opacity: teamRef.inView ? undefined : 0 }}
          >
            <div className="wiggle mx-auto mb-8" style={{ width:72, height:72 }}>
              <svg width="72" height="72" viewBox="0 0 80 80" fill="none">
                <path d="M40 16 L10 21 L10 62 L40 57 Z" fill="white" fillOpacity={0.95}/>
                <path d="M40 16 L70 21 L70 62 L40 57 Z" fill="white" fillOpacity={0.8}/>
                <line x1="40" y1="16" x2="40" y2="57" stroke="rgba(124,77,255,0.6)" strokeWidth="2.5"/>
                <text x="55" y="46" textAnchor="middle" fill="rgba(255,214,10,0.9)" fontSize="20" fontWeight="900" fontFamily="system-ui">ก</text>
                <circle cx="22" cy="32" r="3" fill="rgba(255,214,10,0.8)"/>
                <circle cx="26" cy="40" r="2" fill="rgba(255,214,10,0.6)"/>
              </svg>
            </div>
            <p className="font-black text-sm tracking-widest mb-4" style={{ color:'rgba(255,255,255,0.5)' }}>A NOTE FROM THE BUILDER</p>
            <blockquote className="font-semibold leading-relaxed mb-6" style={{ color:'rgba(255,255,255,0.88)', fontSize:'clamp(1.1rem,2.5vw,1.35rem)', fontStyle:'italic', maxWidth:560, margin:'0 auto 24px' }}>
              "My son loves reading in English — but there was nothing in Thai to help him keep up. My wife asked for something like Oxford Owl. I couldn't find it. So I built Pikko."
            </blockquote>
            <p className="font-bold" style={{ color:'#FFD60A' }}>Damien · Bangkok / Paris</p>
            <p className="text-sm mt-1" style={{ color:'rgba(255,255,255,0.45)' }}>Dad, builder, lifelong learner</p>

            <div className="mt-12 flex flex-wrap gap-4 justify-center">
              <Link href="/" className="font-bold rounded-full px-8 py-4 transition-all hover:-translate-y-0.5" style={{ background:'linear-gradient(135deg,#FFD60A,#FF8C35)', color:'#1A0845', boxShadow:'0 8px 24px rgba(255,214,10,0.35)' }}>
                Try Pikko free
              </Link>
              <Link href="/submit" className="font-bold rounded-full px-8 py-4 transition-all hover:-translate-y-0.5" style={{ background:'rgba(255,255,255,0.12)', color:'white', border:'1px solid rgba(255,255,255,0.2)' }}>
                Submit your story
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
