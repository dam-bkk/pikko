'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signIn } from 'next-auth/react';
import { useInView } from '@/lib/use-in-view';

const STEPS = [
  { num: '01', icon: '💜', title: 'Sponsor a child',         sub: 'Pay for one family\'s Pikko subscription' },
  { num: '02', icon: '🎁', title: 'Earn your credit',        sub: 'We unlock 1 story submission for you' },
  { num: '03', icon: '✍️', title: 'Write your story',        sub: 'Share a tale in Thai — any level, any theme' },
  { num: '04', icon: '📚', title: 'It becomes a Pikko book', sub: 'Your story joins the library for every child' },
];

interface Referral { id: number; referred_name: string; referred_email: string; status: string; created_at: string; }
interface Submission { id: number; story_title: string; status: string; submitted_at: string; }

type Step = 'explain' | 'refer' | 'write' | 'done';

export default function SubmitPage() {
  const { data: session, status } = useSession();
  const [credits,     setCredits]     = useState(0);
  const [referrals,   setReferrals]   = useState<Referral[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [step,        setStep]        = useState<Step>('explain');

  /* Referral form */
  const [refName,  setRefName]  = useState('');
  const [refEmail, setRefEmail] = useState('');
  const [refSent,  setRefSent]  = useState(false);
  const [refErr,   setRefErr]   = useState('');

  /* Story form */
  const [storyTitle,    setStoryTitle]    = useState('');
  const [narratorName,  setNarratorName]  = useState('');
  const [storyBody,     setStoryBody]     = useState('');
  const [ageRange,      setAgeRange]      = useState('4-6');
  const [storyErr,      setStoryErr]      = useState('');
  const [storySaving,   setStorySaving]   = useState(false);

  const heroRef  = useInView(0);
  const stepsRef = useInView(0);
  const ctaRef   = useInView(0);

  useEffect(() => {
    if (status !== 'authenticated') return;
    Promise.all([
      fetch('/api/referrals').then(r => r.json()),
      fetch('/api/stories').then(r => r.json()),
    ]).then(([rData, sData]) => {
      setCredits(rData.credits ?? 0);
      setReferrals(rData.referrals ?? []);
      setSubmissions(sData.submissions ?? []);
      if ((rData.credits ?? 0) > 0) setStep('write');
      else if ((rData.referrals ?? []).length > 0) setStep('refer');
    });
  }, [status]);

  async function sendReferral() {
    if (!refName.trim() || !refEmail.trim()) { setRefErr('Please fill in both fields.'); return; }
    setRefErr('');
    const res = await fetch('/api/referrals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ referredName: refName.trim(), referredEmail: refEmail.trim() }),
    });
    const data = await res.json();
    if (data.error) { setRefErr(data.error); return; }
    setReferrals(data.referrals);
    setRefSent(true);
    setRefName(''); setRefEmail('');
  }

  async function submitStory() {
    if (!storyTitle.trim() || !storyBody.trim()) { setStoryErr('Title and story body are required.'); return; }
    setStoryErr(''); setStorySaving(true);
    const res = await fetch('/api/stories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: storyTitle, narratorName, body: storyBody, ageRange }),
    });
    const data = await res.json();
    setStorySaving(false);
    if (data.error) { setStoryErr(data.error); return; }
    setSubmissions(prev => [data.submission, ...prev]);
    setCredits(c => c - 1);
    setStep('done');
  }

  return (
    <div style={{ backgroundColor:'#FAFAFA', minHeight:'100dvh' }}>

      {/* ── Hero ── */}
      <section style={{ background:'linear-gradient(150deg,#1A0845 0%,#2D1278 40%,#5B20CC 80%,#7C2DFF 100%)', paddingTop:112, paddingBottom:80, position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:-100, left:-100, width:460, height:460, background:'radial-gradient(circle,rgba(255,87,87,0.18) 0%,transparent 70%)', borderRadius:'50%', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:-60, right:-60, width:380, height:380, background:'radial-gradient(circle,rgba(0,209,167,0.15) 0%,transparent 70%)', borderRadius:'50%', pointerEvents:'none' }} />

        <div className="float-animate" style={{ position:'absolute', top:'12%', left:'5%',  width:44, height:44, backgroundColor:'#FFD60A', borderRadius:'50%', opacity:0.85, pointerEvents:'none' }} />
        <div className="float-animate" style={{ position:'absolute', top:'72%', left:'3%',  width:20, height:20, backgroundColor:'#FF5757', borderRadius:'50%', opacity:0.8, animationDelay:'1.2s', pointerEvents:'none' }} />
        <div className="float-animate" style={{ position:'absolute', top:'8%',  right:'4%', width:18, height:18, backgroundColor:'#FF4C91', borderRadius:'50%', opacity:0.75, animationDelay:'0.6s', pointerEvents:'none' }} />
        <div className="float-animate" style={{ position:'absolute', top:'75%', right:'5%', width:32, height:32, backgroundColor:'#FFD60A', borderRadius:'50%', opacity:0.65, animationDelay:'1.8s', pointerEvents:'none' }} />

        {[{ top:'20%',left:'12%',s:22,d:0 },{ top:'60%',left:'20%',s:14,d:0.5 },{ top:'15%',right:'12%',s:18,d:1 }].map((sp,i)=>(
          <svg key={i} className="float-animate" style={{ position:'absolute', top:sp.top, left:(sp as any).left, right:(sp as any).right, opacity:0.45, animationDelay:`${sp.d}s`, pointerEvents:'none' }} width={sp.s} height={sp.s} viewBox="0 0 24 24" fill="none">
            <path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        ))}

        <div
          ref={heroRef.ref as React.RefObject<HTMLDivElement>}
          className={`max-w-3xl mx-auto px-6 text-center relative ${heroRef.inView ? 'anim-slide-up' : ''}`}
          style={{ opacity: heroRef.inView ? undefined : 0 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-5 text-sm font-semibold" style={{ backgroundColor:'rgba(255,214,10,0.15)', color:'#FFD60A', border:'1px solid rgba(255,214,10,0.3)' }}>
            ✍️ Submit Your Story
          </div>
          <h1 className="font-black leading-tight mb-5" style={{ color:'white', fontSize:'clamp(2rem,5vw,3.5rem)' }}>
            Become a<br /><span className="text-gradient">Pikko Godparent.</span>
          </h1>
          <p style={{ color:'rgba(255,255,255,0.75)', fontSize:17, lineHeight:1.75, maxWidth:520, margin:'0 auto 36px' }}>
            Sponsor one child's reading journey. In exchange, earn your place in the library — submit your own story and see it become a Pikko book.
          </p>
          {status === 'unauthenticated' && (
            <button
              onClick={() => signIn('google', { callbackUrl: '/submit' })}
              className="inline-flex items-center gap-3 font-bold rounded-full transition-all hover:-translate-y-0.5"
              style={{ background:'linear-gradient(135deg,#FFD60A,#FF8C35)', color:'#1A0845', fontSize:16, padding:'16px 40px', boxShadow:'0 8px 28px rgba(255,214,10,0.4)' }}
            >
              <GoogleIcon /> Sign in to get started
            </button>
          )}
        </div>
      </section>

      {/* ── How it works ── */}
      <section style={{ backgroundColor:'white', paddingTop:80, paddingBottom:80 }}>
        <div className="max-w-5xl mx-auto px-6">
          <div
            ref={stepsRef.ref as React.RefObject<HTMLDivElement>}
            className={`text-center mb-12 ${stepsRef.inView ? 'anim-slide-up' : ''}`}
            style={{ opacity: stepsRef.inView ? undefined : 0 }}
          >
            <h2 className="font-black" style={{ color:'#1A2B3C', fontSize:'clamp(1.6rem,4vw,2.2rem)' }}>
              How it <span className="text-gradient">works</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {STEPS.map((s, i) => (
              <div
                key={s.num}
                className={`rounded-3xl p-6 text-center ${stepsRef.inView ? 'anim-pop-in' : ''}`}
                style={{ backgroundColor:'#F7F5FF', opacity: stepsRef.inView ? undefined : 0, animationDelay:`${i * 0.1}s` }}
              >
                <div style={{ fontSize:36, marginBottom:12 }}>{s.icon}</div>
                <p className="font-black text-sm tracking-widest mb-2" style={{ color:'#9B74E8' }}>{s.num}</p>
                <h3 className="font-black text-base mb-1" style={{ color:'#1A2B3C' }}>{s.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color:'#6B7A8D' }}>{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Portal (logged in) ── */}
      {status === 'authenticated' && (
        <section style={{ backgroundColor:'#F7F5FF', paddingTop:64, paddingBottom:96 }}>
          <div className="max-w-2xl mx-auto px-6">

            {/* Credit status bar */}
            <div className="rounded-2xl px-5 py-4 mb-6 flex items-center justify-between" style={{ backgroundColor:'white', boxShadow:'0 4px 20px rgba(0,0,0,0.06)', border:'1px solid rgba(124,77,255,0.1)' }}>
              <div className="flex items-center gap-3">
                <div style={{ width:44, height:44, background:'linear-gradient(135deg,#7C4DFF,#9B6DFF)', borderRadius:14, display:'flex', alignItems:'center', justifyContent:'center', fontSize:22 }}>🎁</div>
                <div>
                  <p className="font-black text-base" style={{ color:'#1A2B3C' }}>
                    {credits > 0 ? `${credits} story credit${credits > 1 ? 's' : ''} available!` : 'No credits yet'}
                  </p>
                  <p className="text-xs" style={{ color:'#6B7A8D' }}>
                    {credits > 0 ? 'You can submit a story now →' : 'Sponsor a child below to earn your first credit'}
                  </p>
                </div>
              </div>
              {credits > 0 && (
                <button
                  onClick={() => setStep('write')}
                  className="font-bold text-sm px-4 py-2 rounded-full"
                  style={{ background:'linear-gradient(135deg,#7C4DFF,#9B6DFF)', color:'white' }}
                >
                  Write now →
                </button>
              )}
            </div>

            {/* ── Step: Referral form ── */}
            {(step === 'explain' || step === 'refer') && credits === 0 && (
              <div className="rounded-3xl overflow-hidden" style={{ backgroundColor:'white', boxShadow:'0 8px 32px rgba(0,0,0,0.08)' }}>
                <div style={{ background:'linear-gradient(135deg,#7C4DFF,#C43AFF)', padding:'20px 24px' }}>
                  <h2 className="font-black text-lg" style={{ color:'white' }}>💜 Sponsor a child</h2>
                  <p className="text-sm" style={{ color:'rgba(255,255,255,0.75)' }}>Enter the details of the family you'd like to offer Pikko to</p>
                </div>
                <div style={{ padding:'24px' }}>
                  {refSent ? (
                    <div className="text-center py-6">
                      <div style={{ fontSize:48, marginBottom:12 }}>🎉</div>
                      <p className="font-black text-lg mb-2" style={{ color:'#1A2B3C' }}>Invitation sent!</p>
                      <p className="text-sm mb-4" style={{ color:'#6B7A8D' }}>
                        We'll notify you when they activate their subscription — and your story credit will unlock automatically.
                      </p>
                      <button onClick={() => setRefSent(false)} className="text-sm font-semibold px-4 py-2 rounded-full" style={{ background:'rgba(124,77,255,0.1)', color:'#7C4DFF' }}>
                        Sponsor another family
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-3 mb-4">
                        <div>
                          <label className="text-xs font-bold block mb-1.5" style={{ color:'#6B7A8D' }}>Child's first name</label>
                          <input
                            value={refName} onChange={e => setRefName(e.target.value)}
                            placeholder="e.g. Emma"
                            className="w-full rounded-xl px-4 py-3 text-sm font-medium"
                            style={{ border:'2px solid rgba(124,77,255,0.15)', outline:'none', color:'#1A2B3C', backgroundColor:'#FAFAFE' }}
                            onFocus={e => e.target.style.borderColor='rgba(124,77,255,0.5)'}
                            onBlur={e => e.target.style.borderColor='rgba(124,77,255,0.15)'}
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold block mb-1.5" style={{ color:'#6B7A8D' }}>Parent's email</label>
                          <input
                            type="email" value={refEmail} onChange={e => setRefEmail(e.target.value)}
                            placeholder="parent@email.com"
                            className="w-full rounded-xl px-4 py-3 text-sm font-medium"
                            style={{ border:'2px solid rgba(124,77,255,0.15)', outline:'none', color:'#1A2B3C', backgroundColor:'#FAFAFE' }}
                            onFocus={e => e.target.style.borderColor='rgba(124,77,255,0.5)'}
                            onBlur={e => e.target.style.borderColor='rgba(124,77,255,0.15)'}
                          />
                        </div>
                      </div>
                      {refErr && <p className="text-xs text-red-500 mb-3">{refErr}</p>}
                      <button
                        onClick={sendReferral}
                        className="w-full font-bold rounded-xl py-3.5 text-sm transition-all hover:-translate-y-0.5"
                        style={{ background:'linear-gradient(135deg,#7C4DFF,#9B6DFF)', color:'white', boxShadow:'0 6px 20px rgba(124,77,255,0.35)' }}
                      >
                        Send invitation →
                      </button>
                      <p className="text-xs text-center mt-3" style={{ color:'#9CA3AF' }}>
                        They'll receive a link to subscribe. Your credit unlocks when they do.
                      </p>
                    </>
                  )}
                </div>

                {/* Existing referrals list */}
                {referrals.length > 0 && (
                  <div style={{ padding:'0 24px 24px' }}>
                    <p className="font-bold text-xs mb-3" style={{ color:'#6B7A8D' }}>YOUR INVITATIONS</p>
                    <div className="space-y-2">
                      {referrals.map(r => (
                        <div key={r.id} className="flex items-center justify-between rounded-xl px-4 py-3" style={{ backgroundColor:'#F7F5FF' }}>
                          <div>
                            <p className="font-bold text-sm" style={{ color:'#1A2B3C' }}>{r.referred_name}</p>
                            <p className="text-xs" style={{ color:'#9CA3AF' }}>{r.referred_email}</p>
                          </div>
                          <StatusBadge status={r.status} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ── Step: Write story ── */}
            {step === 'write' && credits > 0 && (
              <div className="rounded-3xl overflow-hidden" style={{ backgroundColor:'white', boxShadow:'0 8px 32px rgba(0,0,0,0.08)' }}>
                <div style={{ background:'linear-gradient(135deg,#FF6635,#FF4C91)', padding:'20px 24px' }}>
                  <h2 className="font-black text-lg" style={{ color:'white' }}>✍️ Write your story</h2>
                  <p className="text-sm" style={{ color:'rgba(255,255,255,0.8)' }}>Your story will be reviewed and added to the Pikko library</p>
                </div>
                <div style={{ padding:'24px' }}>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-bold block mb-1.5" style={{ color:'#6B7A8D' }}>Story title</label>
                      <input
                        value={storyTitle} onChange={e => setStoryTitle(e.target.value)}
                        placeholder="e.g. The Little Elephant"
                        className="w-full rounded-xl px-4 py-3 text-sm font-medium"
                        style={{ border:'2px solid rgba(255,102,53,0.2)', outline:'none', color:'#1A2B3C', backgroundColor:'#FFFAFA' }}
                        onFocus={e => e.target.style.borderColor='rgba(255,102,53,0.5)'}
                        onBlur={e => e.target.style.borderColor='rgba(255,102,53,0.2)'}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold block mb-1.5" style={{ color:'#6B7A8D' }}>Main character name <span style={{ fontWeight:400 }}>(optional)</span></label>
                      <input
                        value={narratorName} onChange={e => setNarratorName(e.target.value)}
                        placeholder="e.g. Nong Lek"
                        className="w-full rounded-xl px-4 py-3 text-sm font-medium"
                        style={{ border:'2px solid rgba(255,102,53,0.2)', outline:'none', color:'#1A2B3C', backgroundColor:'#FFFAFA' }}
                        onFocus={e => e.target.style.borderColor='rgba(255,102,53,0.5)'}
                        onBlur={e => e.target.style.borderColor='rgba(255,102,53,0.2)'}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold block mb-1.5" style={{ color:'#6B7A8D' }}>Age range</label>
                      <div className="flex gap-2">
                        {['4-6','6-8','8-10'].map(r => (
                          <button key={r} onClick={() => setAgeRange(r)}
                            className="px-4 py-2 rounded-full text-xs font-bold transition-all"
                            style={ageRange===r
                              ? { background:'linear-gradient(135deg,#FF6635,#FF4C91)', color:'white' }
                              : { background:'rgba(255,102,53,0.1)', color:'#FF6635' }}>
                            {r} years
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-bold block mb-1.5" style={{ color:'#6B7A8D' }}>
                        Story <span style={{ fontWeight:400 }}>(Thai text, one sentence per line)</span>
                      </label>
                      <textarea
                        value={storyBody} onChange={e => setStoryBody(e.target.value)}
                        rows={8}
                        placeholder={"หมาของฉันชื่อเล็ก\nเขาชอบวิ่งเล่นในสวน\n...\n\n(Thai text, you can include English translation on alternate lines)"}
                        className="w-full rounded-xl px-4 py-3 text-sm font-medium resize-none"
                        style={{ border:'2px solid rgba(255,102,53,0.2)', outline:'none', color:'#1A2B3C', backgroundColor:'#FFFAFA', lineHeight:1.7, fontFamily:"'Noto Serif Thai',serif" }}
                        onFocus={e => e.target.style.borderColor='rgba(255,102,53,0.5)'}
                        onBlur={e => e.target.style.borderColor='rgba(255,102,53,0.2)'}
                      />
                    </div>
                  </div>
                  {storyErr && <p className="text-xs text-red-500 mt-2 mb-3">{storyErr}</p>}
                  <button
                    onClick={submitStory} disabled={storySaving}
                    className="w-full font-bold rounded-xl py-3.5 text-sm mt-4 transition-all hover:-translate-y-0.5"
                    style={{ background:'linear-gradient(135deg,#FF6635,#FF4C91)', color:'white', boxShadow:'0 6px 20px rgba(255,102,53,0.35)', opacity: storySaving ? 0.7 : 1 }}
                  >
                    {storySaving ? 'Submitting…' : 'Submit my story →'}
                  </button>
                  <p className="text-xs text-center mt-3" style={{ color:'#9CA3AF' }}>
                    Your story will be reviewed before going live. We'll be in touch!
                  </p>
                </div>
              </div>
            )}

            {/* ── Step: Done ── */}
            {step === 'done' && (
              <div className="rounded-3xl text-center py-12 px-8" style={{ backgroundColor:'white', boxShadow:'0 8px 32px rgba(0,0,0,0.08)' }}>
                <div style={{ fontSize:64, marginBottom:16 }}>🎉</div>
                <h2 className="font-black text-2xl mb-3" style={{ color:'#1A2B3C' }}>Story submitted!</h2>
                <p className="text-sm leading-relaxed mb-6" style={{ color:'#6B7A8D', maxWidth:360, margin:'0 auto 24px' }}>
                  Thank you! Our team will review your story and reach out within 5–7 days. If it's a good fit, we'll illustrate it and add it to the library.
                </p>
                <div className="flex gap-3 justify-center">
                  <button onClick={() => setStep('write')} className="font-bold text-sm px-5 py-3 rounded-full" style={{ background:'rgba(124,77,255,0.1)', color:'#7C4DFF' }}>
                    Submit another
                  </button>
                  <Link href="/" className="font-bold text-sm px-5 py-3 rounded-full" style={{ background:'linear-gradient(135deg,#FFD60A,#FF8C35)', color:'#1A0845' }}>
                    Back to Pikko
                  </Link>
                </div>
              </div>
            )}

            {/* Past submissions */}
            {submissions.length > 0 && step !== 'done' && (
              <div className="mt-6">
                <p className="font-bold text-xs mb-3" style={{ color:'#6B7A8D' }}>YOUR SUBMISSIONS</p>
                <div className="space-y-2">
                  {submissions.map(s => (
                    <div key={s.id} className="flex items-center justify-between rounded-xl px-4 py-3" style={{ backgroundColor:'white', boxShadow:'0 2px 8px rgba(0,0,0,0.05)' }}>
                      <div>
                        <p className="font-bold text-sm" style={{ color:'#1A2B3C' }}>{s.story_title}</p>
                        <p className="text-xs" style={{ color:'#9CA3AF' }}>{new Date(s.submitted_at).toLocaleDateString()}</p>
                      </div>
                      <StatusBadge status={s.status} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── CTA for unauthenticated ── */}
      {status !== 'authenticated' && (
        <section
          ref={ctaRef.ref as React.RefObject<HTMLDivElement>}
          style={{ backgroundColor:'#F7F5FF', paddingTop:80, paddingBottom:96 }}
        >
          <div className={`max-w-3xl mx-auto px-6 text-center ${ctaRef.inView ? 'anim-slide-up' : ''}`} style={{ opacity: ctaRef.inView ? undefined : 0 }}>
            <h2 className="font-black mb-3" style={{ color:'#1A2B3C', fontSize:'clamp(1.5rem,3.5vw,2rem)' }}>
              Ready to leave your <span className="text-gradient">mark in the library?</span>
            </h2>
            <p className="text-sm mb-8" style={{ color:'#6B7A8D', maxWidth:420, margin:'0 auto 32px' }}>
              Sign in with Google to sponsor a family and submit your story. It takes 2 minutes.
            </p>
            <button
              onClick={() => signIn('google', { callbackUrl: '/submit' })}
              className="inline-flex items-center gap-3 font-bold rounded-full transition-all hover:-translate-y-0.5"
              style={{ background:'linear-gradient(135deg,#7C4DFF,#9B6DFF)', color:'white', fontSize:16, padding:'16px 40px', boxShadow:'0 8px 24px rgba(124,77,255,0.35)' }}
            >
              <GoogleIcon /> Sign in with Google
            </button>
          </div>
        </section>
      )}

    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const MAP: Record<string, { label: string; bg: string; color: string }> = {
    pending:  { label: 'Pending',  bg:'rgba(255,214,10,0.15)', color:'#B8830A' },
    active:   { label: 'Active',   bg:'rgba(76,201,124,0.15)', color:'#1A7A45' },
    approved: { label: 'Approved', bg:'rgba(76,201,124,0.15)', color:'#1A7A45' },
    published:{ label: 'Live 🎉', bg:'rgba(124,77,255,0.15)', color:'#7C4DFF' },
  };
  const s = MAP[status] ?? MAP.pending;
  return (
    <span className="text-xs font-bold px-3 py-1.5 rounded-full" style={{ backgroundColor:s.bg, color:s.color }}>
      {s.label}
    </span>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" fill="none">
      <path d="M47.5 24.5c0-1.6-.1-3.2-.4-4.7H24v9h13.2c-.6 3-2.4 5.6-5 7.3v6h8c4.8-4.4 7.3-10.8 7.3-17.6z" fill="#4285F4"/>
      <path d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-8-6c-2.1 1.4-4.8 2.3-7.9 2.3-6 0-11.2-4-13-9.4H2.7v6.1C6.8 42.7 14.9 48 24 48z" fill="#34A853"/>
      <path d="M11 29.1c-.5-1.4-.7-2.9-.7-4.4s.2-3 .7-4.4v-6.1H2.7C1 17.3 0 20.5 0 24s1 6.7 2.7 9.8l8.3-4.7z" fill="#FBBC05"/>
      <path d="M24 9.5c3.4 0 6.4 1.2 8.8 3.4l6.5-6.5C35.9 2.7 30.5.5 24 .5 14.9.5 6.8 5.8 2.7 14.2l8.3 6.1c1.8-5.4 7-10.8 13-10.8z" fill="#EA4335"/>
    </svg>
  );
}
