'use client';

import { useEffect, useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import type { ChildProfile } from '@/lib/db';

/* ─── Types ────────────────────────────────────────────────── */
type Tab    = 'profile' | 'subscription' | 'settings' | 'help';
type Screen = 'dashboard' | 'progress' | 'stories' | 'words';

interface ParentData {
  streak: { current_streak: number; longest_streak: number };
  booksReadThisWeek: number;
  totalTimeSeconds: number;
  vocabulary: { thai: string; english: string; romanization: string; mastery: number }[];
}

/* ─── Constants ─────────────────────────────────────────────── */
const DEV_BYPASS       = process.env.NEXT_PUBLIC_BYPASS_AUTH === 'true';
const DEV_SESSION_USER = { name: 'Dev User', email: 'dev@pikko.app', image: '' };

const MASTERY: Record<number, { label: string; color: string; bg: string }> = {
  0: { label: 'New',      color: '#6B7A8D', bg: 'rgba(107,122,141,0.1)' },
  1: { label: 'Seen',     color: '#F87C3C', bg: 'rgba(248,124,60,0.12)' },
  2: { label: 'Familiar', color: '#4FD175', bg: 'rgba(79,209,117,0.12)' },
  3: { label: 'Mastered', color: '#FFD23F', bg: 'rgba(255,210,63,0.15)' },
};

const MOCK_STORY_PROGRESS = [
  { bookId: 'my-dog',      titleThai: 'หมาของฉัน',  titleEnglish: 'My Dog',      level: '1', timesRead: 3, lastReadAt: 'yesterday',  quizTotal: 3, quizCorrect: 3, stars: 3, color: '#3BAFDA' },
  { bookId: 'yummy-fruit', titleThai: 'ผลไม้อร่อย', titleEnglish: 'Yummy Fruit', level: '1', timesRead: 1, lastReadAt: '5 days ago', quizTotal: 3, quizCorrect: 1, stars: 1, color: '#4FD175' },
];

const MOCK_WORDS: { thai: string; romanization: string; english: string; exposures: number; mastery: 0|1|2|3 }[] = [
  { thai: 'หมา',   romanization: 'hǎa',          english: 'dog',       exposures: 8, mastery: 3 },
  { thai: 'กิน',   romanization: 'gin',          english: 'eat',       exposures: 7, mastery: 3 },
  { thai: 'แมว',   romanization: 'mɛɛo',         english: 'cat',       exposures: 5, mastery: 3 },
  { thai: 'ผลไม้', romanization: 'phǒn-lá-máai', english: 'fruit',     exposures: 4, mastery: 2 },
  { thai: 'อร่อย', romanization: 'a-ròi',        english: 'delicious', exposures: 3, mastery: 2 },
  { thai: 'น้ำ',   romanization: 'náam',         english: 'water',     exposures: 2, mastery: 1 },
  { thai: 'นก',    romanization: 'nók',          english: 'bird',      exposures: 1, mastery: 1 },
  { thai: 'ปลา',   romanization: 'plaa',         english: 'fish',      exposures: 0, mastery: 0 },
];

/* ─── Root ──────────────────────────────────────────────────── */
export default function ParentPage() {
  const { data: rawSession, status: rawStatus } = useSession();
  const session = (DEV_BYPASS ? { user: DEV_SESSION_USER } : rawSession) as { user: { name?: string | null; email?: string | null; image?: string | null } } | null;
  const status  = DEV_BYPASS ? ('authenticated' as const) : rawStatus;

  const [data,   setData]   = useState<ParentData | null>(null);
  const [child,  setChild]  = useState<ChildProfile | null>(null);
  const [tab,    setTab]    = useState<Tab>('profile');
  const [screen, setScreen] = useState<Screen>('dashboard');

  useEffect(() => {
    if (status !== 'authenticated') return;
    Promise.all([
      fetch('/api/parent').then(r => r.json()),
      fetch('/api/child').then(r => r.json()),
    ]).then(([pd, cd]) => { setData(pd); setChild(cd.profile); });
  }, [status]);

  if (status === 'loading') return <Loader />;
  if (status === 'unauthenticated') return <LoginScreen />;

  /* sub-screens launched from child card */
  if (screen === 'progress') return (
    <ProgressScreen
      data={data}
      child={child}
      onBack={() => setScreen('dashboard')}
      onStories={() => setScreen('stories')}
      onWords={() => setScreen('words')}
    />
  );
  if (screen === 'stories') return (
    <StoriesScreen
      onBack={() => setScreen('progress')}
      onSwitch={() => setScreen('words')}
    />
  );
  if (screen === 'words') return (
    <WordsScreen
      onBack={() => setScreen('progress')}
      onSwitch={() => setScreen('stories')}
    />
  );

  return (
    <div style={{ minHeight: '100dvh', background: '#F5F5FA', fontFamily: 'var(--font-kids-round), Fredoka, var(--font-thai-sans), sans-serif', display: 'flex', flexDirection: 'column' }}>

      {/* ── Dark blue header ── */}
      <header style={{
        background: '#7C4DFF',
        padding: '0 20px',
        height: 60,
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
      }}>
        {/* Back arrow */}
        <Link href="/" style={{
          width: 38, height: 38, borderRadius: '50%',
          background: '#FFE05A',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          textDecoration: 'none', flexShrink: 0,
          boxShadow: '0 2px 8px rgba(255,224,90,0.4)',
        }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#1A2B3C" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
        </Link>

        {/* Title */}
        <span style={{ fontSize: 28, fontWeight: 900, color: 'white', letterSpacing: '-.02em' }}>Parents</span>

        <div style={{ flex: 1 }} />

        {/* Remote Access */}
        <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', fontWeight: 500 }}>Remote Access</span>

        {/* Version badge */}
        <div style={{ padding: '4px 10px', borderRadius: 6, background: '#FFE05A', fontSize: 14, fontWeight: 800, color: '#1A2B3C' }}>
          Pikko 1.0
        </div>

        {/* Support key */}
        <div style={{ padding: '4px 10px', borderRadius: 6, background: '#5B2FCC', fontSize: 14, fontWeight: 800, color: 'white', letterSpacing: '.06em' }}>
          {session?.user?.name?.replace(' ', '').toUpperCase().slice(0, 8) ?? 'PIKKOAPP'}
        </div>
      </header>

      {/* ── Full-width tab nav ── */}
      <div style={{ background: '#7C4DFF', display: 'flex', borderBottom: '3px solid rgba(0,0,0,0.15)' }}>
        {([
          { id: 'profile',      label: 'Profile',      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="7" r="4.5"/><path d="M3 21c0-4.97 4.03-9 9-9s9 4.03 9 9H3z"/></svg> },
          { id: 'subscription', label: 'Subscription', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22 6H2a2 2 0 0 0-2 2v1h24V8a2 2 0 0 0-2-2zM0 11v7a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2v-7H0zm6 5H4v-2h2v2zm5 0H9v-2h2v2z"/></svg> },
          { id: 'settings',     label: 'Settings',     icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm9.4 3l-1.5-.87a7.9 7.9 0 0 0 0-2.26l1.5-.87a1 1 0 0 0 .37-1.37l-2-3.46a1 1 0 0 0-1.36-.37l-1.5.87A7.93 7.93 0 0 0 15 2.13V.5A1 1 0 0 0 14 0h-4a1 1 0 0 0-1 1v1.13a7.93 7.93 0 0 0-1.95 1.14l-1.5-.87a1 1 0 0 0-1.36.37l-2 3.46a1 1 0 0 0 .37 1.37l1.5.87a7.9 7.9 0 0 0 0 2.26l-1.5.87A1 1 0 0 0 2.23 12l2 3.46a1 1 0 0 0 1.36.37l1.5-.87A7.93 7.93 0 0 0 9 16.87V18a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-1.13a7.93 7.93 0 0 0 1.95-1.14l1.5.87a1 1 0 0 0 1.36-.37l2-3.46a1 1 0 0 0-.37-1.37z"/></svg> },
          { id: 'help',         label: 'Help',         icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/></svg> },
        ] as { id: Tab; label: string; icon: React.ReactNode }[]).map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            flex: 1,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
            padding: '11px 8px',
            borderRadius: '10px 10px 0 0',
            border: 'none', cursor: 'pointer',
            fontSize: 18, fontWeight: 700,
            background: tab === t.id ? 'white' : 'transparent',
            color: tab === t.id ? '#7C4DFF' : 'rgba(255,255,255,0.75)',
            marginBottom: tab === t.id ? -3 : 0,
            transition: 'all 0.15s',
            whiteSpace: 'nowrap',
          }}>
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      {/* ── Tab content ── */}
      {tab === 'profile'      && <ProfileTab session={session} child={child} data={data} onProgress={() => setScreen('progress')} />}
      {tab === 'subscription' && <SubscriptionTab />}
      {tab === 'settings'     && <SettingsTab session={session} />}
      {tab === 'help'         && <HelpTab />}
    </div>
  );
}

/* ─── Profile Tab ───────────────────────────────────────────── */
function ProfileTab({ session, child, data, onProgress }: {
  session: { user: { name?: string | null; email?: string | null; image?: string | null } } | null;
  child: ChildProfile | null;
  data: ParentData | null;
  onProgress: () => void;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      {/* White section */}
      <div style={{ background: 'white' }}>
      <div style={{ maxWidth: 1250, margin: '0 auto', padding: '20px 24px 24px' }}>

        {/* 2-column: My Account | Subscribe banner */}
        <div style={{ display: 'flex', gap: 20, alignItems: 'center', marginBottom: 40 }}>

          {/* Left: account */}
          <div style={{ flex: '0 0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <h2 style={{ fontSize: 25, fontWeight: 900, color: '#2D2D3F' }}>My Account</h2>
              <button style={{ width: 36, height: 36, borderRadius: '50%', background: '#F5F5FA', border: '1.5px solid #E0E0EA', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8A8AA0" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
              </button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <GoogleIcon size={16} />
              <span style={{ fontSize: 18, color: '#4A90D9', fontWeight: 600 }}>{session?.user?.email ?? 'Not signed in'}</span>
            </div>
          </div>

          {/* Right: subscribe banner — 20% inset each side, mascot centered inside */}
          <div style={{ flex: 1, paddingLeft: '20%', paddingRight: '20%' }}>
            <div style={{
              borderRadius: 60,
              background: 'linear-gradient(135deg, #FFD600 0%, #F5C000 100%)',
              display: 'flex', alignItems: 'center', gap: 20,
              position: 'relative',
              boxShadow: '0 6px 24px rgba(200,155,0,0.45)',
              minHeight: 120,
              paddingRight: 28,
              overflow: 'hidden',
            }}>
              {/* Confetti */}
              <svg style={{ position: 'absolute', top: 16, left: 148 }} width="13" height="12" viewBox="0 0 10 9" fill="#FF4D6D"><path d="M5 8.5C5 8.5 0 5.5 0 2.8 0 1.3 1.1.1 2.5.1c.8 0 1.5.4 2 1 .5-.6 1.2-1 2-1C7.9.1 9 1.3 9 2.8c0 2.7-4 5.7-4 5.7z"/></svg>
              <div style={{ position: 'absolute', top: 12, left: 164, width: 7, height: 7, borderRadius: 2, background: '#4FD175', transform: 'rotate(22deg)' }} />
              <div style={{ position: 'absolute', bottom: 22, left: 142, width: 6, height: 6, borderRadius: '50%', background: '#6B9DFF' }} />
              <div style={{ position: 'absolute', top: 18, left: 178, width: 6, height: 6, borderRadius: 2, background: '#FF8C35', transform: 'rotate(-15deg)' }} />
              <div style={{ position: 'absolute', bottom: 18, left: 168, width: 5, height: 5, borderRadius: '50%', background: '#B57FFF' }} />

              {/* Mascot inside, vertically centered */}
              <div className="kids-breath" style={{ flexShrink: 0, alignSelf: 'center', paddingLeft: 18, filter: 'drop-shadow(0 6px 14px rgba(0,0,0,0.18))' }}>
                <ParentMascot size={100} />
              </div>

              {/* Text */}
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 21, fontWeight: 900, color: '#1A2B3C', marginBottom: 5 }}>SUBSCRIBE NOW</p>
                <p style={{ fontSize: 15, color: 'rgba(0,0,0,0.6)', lineHeight: 1.4 }}>Unlock all books and features for your child!</p>
              </div>

              {/* YES button */}
              <button style={{ padding: '14px 34px', borderRadius: 99, background: '#2D3A4A', color: 'white', fontSize: 18, fontWeight: 900, border: 'none', cursor: 'pointer', boxShadow: '0 4px 14px rgba(0,0,0,0.3)', flexShrink: 0 }}>YES</button>
            </div>
          </div>
        </div>

        {/* My Purchase Summary */}
        <h3 style={{ fontSize: 23, fontWeight: 900, color: '#2D2D3F', marginBottom: 12 }}>My Purchase Summary</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', borderRadius: 12, background: '#FFF8F0', border: '1.5px solid #FFD23F30' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F87C3C" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <span style={{ fontSize: 18, color: '#2D2D3F', flex: 1 }}>Free plan · 2 books included.</span>
          <span style={{ fontSize: 18, color: '#4A90D9', fontWeight: 700, cursor: 'pointer' }}>See History</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
          <button style={{
            padding: '10px 22px', borderRadius: 99,
            background: 'transparent', border: '2px solid #2D2D3F',
            fontSize: 16, fontWeight: 800, color: '#2D2D3F', cursor: 'pointer',
            letterSpacing: '.04em',
          }}>
            SUBSCRIBE NOW
          </button>
        </div>
      </div>
      </div>

      {/* ── Learner's Progress — deep amber ── */}
      <div style={{ background: '#FFCA28', flex: 1 }}>
      <div style={{ maxWidth: 1250, margin: '0 auto', padding: '22px 24px 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <h2 style={{ fontSize: 25, fontWeight: 900, color: '#2D2D3F' }}>Learner&apos;s Progress</h2>
          <button style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(0,0,0,0.08)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2D2D3F" strokeWidth="2" strokeLinecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
          </button>
        </div>

        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          {/* Child profile card */}
          {child ? (
            <div style={{
              background: 'white', borderRadius: 20,
              padding: '16px 16px 14px',
              minWidth: 200, maxWidth: 240,
              boxShadow: '0 8px 0 rgba(0,0,0,0.13), 0 12px 24px rgba(0,0,0,0.07)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 20, fontWeight: 900, color: '#2D2D3F' }}>{child.child_name}</span>
                  <div style={{ width: 20, height: 20, borderRadius: 6, background: '#F5F5FA', border: '1px solid #E0E0EA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#8A8AA0" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                  </div>
                </div>
              </div>
              <p style={{ fontSize: 15, color: '#8A8AA0', marginBottom: 8 }}>Level {child.level}</p>
              {/* XP bar */}
              <div style={{ height: 6, borderRadius: 99, background: '#F0EDE5', marginBottom: 12, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${child.xp % 100}%`, background: '#2D2D3F', borderRadius: 99 }} />
              </div>
              {/* Pill buttons */}
              <div style={{ display: 'flex', gap: 8 }}>
                <button style={{ padding: '7px 12px', borderRadius: 99, background: 'transparent', border: '2px solid #2D2D3F', fontSize: 14, fontWeight: 800, color: '#2D2D3F', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, whiteSpace: 'nowrap' }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="3"/></svg>
                  Level {child.level}
                </button>
                <button
                  onClick={onProgress}
                  style={{ padding: '7px 12px', borderRadius: 99, background: 'transparent', border: '2px solid #2D2D3F', fontSize: 14, fontWeight: 800, color: '#2D2D3F', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                  Progress
                </button>
              </div>
            </div>
          ) : (
            <div style={{ background: 'white', borderRadius: 20, padding: '16px', minWidth: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 130, boxShadow: '0 4px 16px rgba(0,0,0,0.12)' }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', border: '3px solid rgba(0,0,0,0.12)', borderTopColor: '#F87C3C', animation: 'spin 0.8s linear infinite' }} />
            </div>
          )}

          {/* Add new user card */}
          <div style={{
            borderRadius: 20,
            background: 'rgba(255,255,255,0.45)',
            border: '2px solid rgba(0,0,0,0.12)',
            minWidth: 150, maxWidth: 190,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            gap: 14, padding: '24px 16px 16px',
            cursor: 'pointer',
            boxShadow: '0 8px 0 rgba(180,130,0,0.28)',
          }}>
            <div style={{ width: 52, height: 52, borderRadius: '50%', border: '2.5px solid rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.4)" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </div>
            <div style={{
              padding: '8px 16px', borderRadius: 99,
              background: 'rgba(255,255,255,0.7)',
              border: '2px solid rgba(0,0,0,0.18)',
              fontSize: 14, fontWeight: 800, color: 'rgba(0,0,0,0.55)',
            }}>
              Add new user
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

/* ─── Subscription Tab ──────────────────────────────────────── */
function SubscriptionTab() {
  const freePlan  = ['2 books included', 'Basic syllable practice', 'Progress tracking', 'Parent dashboard'];
  const proPlan   = ['Unlimited books (all levels)', 'Karaoke + audio for every book', 'Word mastery tracking', 'Multiple child profiles', 'Priority support'];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <div style={{ background: 'white' }}>
        <div style={{ maxWidth: 1250, margin: '0 auto', padding: '24px 24px 28px' }}>
          <h2 style={{ fontSize: 25, fontWeight: 900, color: '#2D2D3F', marginBottom: 20 }}>Subscription</h2>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {/* Free plan card */}
            <div style={{ flex: '1 1 260px', background: '#F9F9FC', borderRadius: 20, padding: '20px', border: '2px solid #E8E8F0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <div style={{ padding: '4px 12px', borderRadius: 99, background: '#FFE05A30', border: '1.5px solid #FFD23F60', fontSize: 13, fontWeight: 800, color: '#B8940A' }}>FREE</div>
                <span style={{ fontSize: 15, color: '#8A8AA0', fontWeight: 600 }}>Current plan</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {freePlan.map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#4FD175"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
                    <span style={{ fontSize: 16, color: '#2D2D3F' }}>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* My Purchase Summary */}
            <div style={{ flex: '1 1 260px', background: '#F9F9FC', borderRadius: 20, padding: '20px', border: '2px solid #E8E8F0' }}>
              <h3 style={{ fontSize: 18, fontWeight: 900, color: '#2D2D3F', marginBottom: 14 }}>My Purchase Summary</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', borderRadius: 12, background: '#FFF8F0', border: '1.5px solid #FFD23F30', marginBottom: 14 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#F87C3C"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                <span style={{ fontSize: 16, color: '#2D2D3F', flex: 1 }}>Free plan · 2 books included.</span>
                <span style={{ fontSize: 16, color: '#4A90D9', fontWeight: 700, cursor: 'pointer' }}>History</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ background: '#2D1B6E', flex: 1 }}>
        <div style={{ maxWidth: 1250, margin: '0 auto', padding: '24px 24px 32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
            <h2 style={{ fontSize: 25, fontWeight: 900, color: 'white' }}>Go Pro ✦</h2>
            <span style={{ fontSize: 20, fontWeight: 900, color: '#FFD600' }}>฿299<span style={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>/mo</span></span>
          </div>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 22 }}>
            {proPlan.map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.1)', borderRadius: 12, padding: '8px 14px', boxShadow: '0 4px 0 rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.15)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFD600"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                <span style={{ fontSize: 15, fontWeight: 700, color: 'white' }}>{f}</span>
              </div>
            ))}
          </div>
          <button style={{ padding: '14px 40px', borderRadius: 99, background: '#FFD600', color: '#1A0845', fontSize: 18, fontWeight: 900, border: 'none', cursor: 'pointer', boxShadow: '0 6px 0 rgba(0,0,0,0.35)', letterSpacing: '.04em' }}>
            UPGRADE NOW
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Settings Tab ──────────────────────────────────────────── */
function SettingsTab({ session }: { session: { user: { name?: string | null; email?: string | null; image?: string | null } } | null }) {
  const rows = [
    { label: 'Daily reading goal', value: '15 minutes' },
    { label: 'Language',           value: 'English'    },
    { label: 'Timezone',           value: 'Bangkok (UTC+7)' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <div style={{ background: 'white' }}>
        <div style={{ maxWidth: 1250, margin: '0 auto', padding: '24px 24px 28px' }}>
          <h2 style={{ fontSize: 25, fontWeight: 900, color: '#2D2D3F', marginBottom: 20 }}>Settings</h2>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {/* Profile card */}
            <div style={{ flex: '0 0 auto', background: '#F9F9FC', borderRadius: 20, padding: '20px', border: '2px solid #E8E8F0', display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'linear-gradient(135deg,#FFD60A,#FF8C35)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 25, fontWeight: 900, color: '#1A0845', flexShrink: 0 }}>
                {session?.user?.name?.[0] ?? 'P'}
              </div>
              <div>
                <p style={{ fontSize: 20, fontWeight: 800, color: '#2D2D3F' }}>{session?.user?.name ?? 'Parent'}</p>
                <p style={{ fontSize: 15, color: '#8A8AA0' }}>{session?.user?.email}</p>
              </div>
            </div>
            {/* Preferences */}
            <div style={{ flex: '1 1 300px', background: '#F9F9FC', borderRadius: 20, padding: '20px', border: '2px solid #E8E8F0' }}>
              {rows.map((row, i) => (
                <div key={row.label} style={{ display: 'flex', alignItems: 'center', padding: '10px 0', borderBottom: i < rows.length - 1 ? '1px solid #EBEBF2' : 'none' }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 16, fontWeight: 700, color: '#2D2D3F' }}>{row.label}</p>
                    <p style={{ fontSize: 14, color: '#8A8AA0' }}>{row.value}</p>
                  </div>
                  <button style={{ padding: '6px 16px', borderRadius: 99, background: 'white', border: '1.5px solid #E0E0EA', fontSize: 13, fontWeight: 700, color: '#8A8AA0', cursor: 'pointer' }}>Change</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div style={{ background: '#EEF2FF', flex: 1 }}>
        <div style={{ maxWidth: 1250, margin: '0 auto', padding: '24px 24px 32px' }}>
          <h2 style={{ fontSize: 25, fontWeight: 900, color: '#2D2D3F', marginBottom: 18 }}>Account</h2>
          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={() => signOut()} style={{ padding: '12px 28px', borderRadius: 99, background: 'white', border: '2px solid rgba(232,93,122,0.4)', fontSize: 16, fontWeight: 800, color: '#E85D7A', cursor: 'pointer', boxShadow: '0 5px 0 rgba(100,100,200,0.18)' }}>
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Help Tab ──────────────────────────────────────────────── */
function HelpTab() {
  const [open, setOpen] = useState<number | null>(null);
  const items = [
    { q: 'How does reading level work?',    a: 'Books are grouped by vocabulary complexity. Level 1 uses simple patterns with 5–8 unique words.' },
    { q: 'How is word mastery calculated?', a: 'A word is "mastered" after 4+ correct quiz answers (≥80% accuracy).' },
    { q: 'Can I add more books?',           a: 'Upgrade to Pro to unlock unlimited books across all levels.' },
    { q: 'How do I reset progress?',        a: 'Go to Settings → Reset Progress. This clears quiz history but keeps your books.' },
    { q: 'Does Pikko work offline?',        a: 'Books you have opened before are cached locally — audio and illustrations load without internet.' },
    { q: 'How do I contact support?',       a: 'Email us at support@pikko.app — we reply within 24 hours.' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, background: '#F7F5FF' }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '28px 24px 40px', width: '100%' }}>
        <h2 style={{ fontSize: 25, fontWeight: 900, color: '#2A1060', marginBottom: 20 }}>Help &amp; FAQ</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {items.map((item, i) => (
            <div key={i} style={{ background: '#EDE8FC', borderRadius: 18, overflow: 'hidden' }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '18px 22px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
                }}
              >
                <span style={{ fontWeight: 800, fontSize: 16, color: '#2A1060', paddingRight: 12 }}>{item.q}</span>
                <span style={{
                  flexShrink: 0, width: 32, height: 32, borderRadius: '50%',
                  background: '#4FD175', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transform: open === i ? 'rotate(45deg)' : 'none',
                  transition: 'transform 0.2s',
                  boxShadow: '0 2px 6px rgba(79,209,117,0.35)',
                }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 2v10M2 7h10" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
                  </svg>
                </span>
              </button>
              <div style={{ maxHeight: open === i ? 160 : 0, overflow: 'hidden', transition: 'max-height 0.3s ease' }}>
                <p style={{ padding: '0 22px 18px', fontSize: 14, color: '#5A4080', lineHeight: 1.7, fontWeight: 500 }}>{item.a}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 32, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#EDE8FC', borderRadius: 16, padding: '14px 20px' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#7C4DFF"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
            <span style={{ fontSize: 15, fontWeight: 700, color: '#2A1060' }}>support@pikko.app</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#EDE8FC', borderRadius: 16, padding: '14px 20px' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#4FD175"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
            <span style={{ fontSize: 15, fontWeight: 700, color: '#2A1060' }}>Pikko v1.0 · Reply in 24h</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Progress Screen (section 3.6.2) ──────────────────────── */
function ProgressScreen({ data, child, onBack, onStories, onWords }: {
  data: ParentData | null;
  child: ChildProfile | null;
  onBack: () => void;
  onStories: () => void;
  onWords: () => void;
}) {
  const wordsMastered = MOCK_WORDS.filter(w => w.mastery === 3).length;
  const wordsTotal    = MOCK_WORDS.length;
  const masteryPct    = Math.round((wordsMastered / wordsTotal) * 100);

  return (
    <div style={{ minHeight: '100dvh', background: '#F8F9FB', fontFamily: 'system-ui, sans-serif' }}>

      {/* Screen header */}
      <div style={{ background: '#7C4DFF', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
        <button onClick={onBack} style={{ width: 36, height: 36, borderRadius: '50%', background: '#FFE05A', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1A2B3C" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
        <div>
          <span style={{ fontSize: 20, fontWeight: 900, color: 'white' }}>{child?.child_name ?? 'Progress'}</span>
          <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', marginLeft: 10 }}>Level {child?.level ?? 1} · {masteryPct}% in progress</span>
        </div>
      </div>

      <div style={{ padding: '20px 20px', maxWidth: 820, margin: '0 auto' }}>

        {/* ── Panel 1: Reading Progress (yellow) ── */}
        <div style={{ borderRadius: 22, overflow: 'hidden', display: 'flex', background: 'white', boxShadow: '0 2px 16px rgba(0,0,0,0.08)', marginBottom: 16 }}>
          <div style={{ width: 192, flexShrink: 0, background: '#FFE05A', padding: '24px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontSize: 19, fontWeight: 900, color: '#2D2D3F', marginBottom: 10 }}>Reading Progress</p>
              <p style={{ fontSize: 14, color: 'rgba(0,0,0,0.5)', lineHeight: 1.7 }}>Number of stories read and quizzes passed.</p>
            </div>
            <button onClick={onStories} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 15, fontWeight: 700, color: '#2D2D3F', background: 'white', border: 'none', borderRadius: 99, padding: '8px 16px', cursor: 'pointer', alignSelf: 'flex-start', boxShadow: '0 2px 8px rgba(0,0,0,0.15)', marginTop: 16 }}>
              See More <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
          <div style={{ flex: 1, padding: '24px 28px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', marginBottom: 24 }}>
              {[
                { v: '2',  t: 'Complete\nActivities\nPast 24h'    },
                { v: '5',  t: 'Complete\nActivities\nPast 7d'     },
                { v: `${data?.streak.current_streak ?? 0}d`, t: 'Recommended\nGoal\nStreak' },
              ].map((k, i) => (
                <div key={i} style={{ textAlign: 'center', padding: '0 10px', borderRight: i < 2 ? '1px solid rgba(0,0,0,0.07)' : 'none' }}>
                  <p style={{ fontSize: 50, fontWeight: 900, color: '#2D2D3F', lineHeight: 1, marginBottom: 7 }}>{k.v}</p>
                  {k.t.split('\n').map((l, j) => <p key={j} style={{ fontSize: j === 0 ? 10 : 9, fontWeight: j === 0 ? 700 : 400, color: j === 0 ? '#2D2D3F' : '#8A8AA0', lineHeight: 1.35 }}>{l}</p>)}
                </div>
              ))}
            </div>
            <p style={{ fontSize: 11, fontWeight: 800, color: '#8A8AA0', letterSpacing: '.12em', marginBottom: 12 }}>RECENTLY PLAYED</p>
            <div style={{ display: 'flex', gap: 12 }}>
              {MOCK_STORY_PROGRESS.map(s => (
                <div key={s.bookId} style={{ flexShrink: 0, width: 100 }}>
                  <div style={{ aspectRatio: '16/10', borderRadius: 10, background: `linear-gradient(135deg,${s.color},${s.color}99)`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 7 }}>
                    <span style={{ fontSize: 33, fontFamily: 'var(--font-thai-school)', fontWeight: 900, color: 'white' }}>{s.titleThai[0]}</span>
                  </div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: '#2D2D3F', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.titleThai}</p>
                  <p style={{ fontSize: 11, color: '#8A8AA0' }}>Lvl {s.level} · {s.lastReadAt}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Panel 2: Word Mastery (purple) ── */}
        <div style={{ borderRadius: 22, overflow: 'hidden', display: 'flex', background: 'white', boxShadow: '0 2px 16px rgba(0,0,0,0.08)' }}>
          <div style={{ width: 192, flexShrink: 0, background: '#6943C9', padding: '24px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontSize: 19, fontWeight: 900, color: 'white', marginBottom: 10 }}>Word Mastery</p>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>80% correct answers needed to master a word.</p>
            </div>
            <button onClick={onWords} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 15, fontWeight: 700, color: '#6943C9', background: 'white', border: 'none', borderRadius: 99, padding: '8px 16px', cursor: 'pointer', alignSelf: 'flex-start', boxShadow: '0 2px 8px rgba(0,0,0,0.2)', marginTop: 16 }}>
              See More <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
          <div style={{ flex: 1, padding: '24px 28px', display: 'flex', gap: 28, alignItems: 'flex-start' }}>
            <DonutProgress pct={masteryPct} color="#6943C9" label={`${wordsMastered} / ${wordsTotal} mastered`} sublabel="Words of Level 1" />
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', flex: 1 }}>
              {MOCK_WORDS.filter(w => w.mastery === 3).map(w => (
                <div key={w.thai} style={{ width: 78, borderRadius: 12, background: '#F3F0FF', border: '1.5px solid #6943C925', padding: '10px 8px', textAlign: 'center' }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: 'linear-gradient(135deg,#8B6FD4,#6943C9)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 7px' }}>
                    <span style={{ fontSize: 21, fontFamily: 'var(--font-thai-school)', fontWeight: 900, color: 'white' }}>{w.thai[0]}</span>
                  </div>
                  <p style={{ fontSize: 18, fontWeight: 900, color: '#2D2D3F', fontFamily: 'var(--font-thai-school)' }}>{w.thai}</p>
                  <p style={{ fontSize: 10, color: '#8A8AA0', marginTop: 2 }}>{w.romanization}</p>
                  <p style={{ fontSize: 11, color: '#6943C9', fontWeight: 700 }}>{w.english}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Shared detail tab switcher ────────────────────────────── */
function DetailHeader({ active, onSwitch, onBack }: { active: 'stories' | 'words'; onSwitch: () => void; onBack: () => void }) {
  return (
    <div style={{ background: '#7C4DFF', padding: '10px 20px', display: 'flex', alignItems: 'center', gap: 10 }}>
      <button onClick={onBack} style={{ width: 34, height: 34, borderRadius: '50%', background: '#FFE05A', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1A2B3C" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
      </button>
      <button onClick={active === 'words' ? onSwitch : undefined} style={{ padding: '7px 18px', borderRadius: 99, fontSize: 15, fontWeight: 700, background: active === 'stories' ? '#FFE05A' : 'transparent', color: active === 'stories' ? '#2D2D3F' : 'rgba(255,255,255,0.5)', border: 'none', cursor: 'pointer', boxShadow: active === 'stories' ? '0 2px 8px rgba(0,0,0,0.15)' : 'none' }}>
        Reading Progress
      </button>
      <button onClick={active === 'stories' ? onSwitch : undefined} style={{ padding: '7px 18px', borderRadius: 99, fontSize: 15, fontWeight: 700, background: active === 'words' ? '#6943C9' : 'transparent', color: active === 'words' ? 'white' : 'rgba(255,255,255,0.5)', border: 'none', cursor: 'pointer', boxShadow: active === 'words' ? '0 2px 8px rgba(0,0,0,0.2)' : 'none' }}>
        Word Mastery
      </button>
    </div>
  );
}

function StoriesScreen({ onBack, onSwitch }: { onBack: () => void; onSwitch: () => void }) {
  return (
    <div style={{ minHeight: '100dvh', background: '#F8F9FB' }}>
      <DetailHeader active="stories" onSwitch={onSwitch} onBack={onBack} />
      <div style={{ padding: '20px', maxWidth: 860, margin: '0 auto' }}>
        <div style={{ borderRadius: 16, background: 'white', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 54px 72px 140px 100px 44px', padding: '10px 20px', background: '#F8F9FB', gap: 8 }}>
            {['Story', 'Level', 'Read', 'Quiz Score', 'Last Time', ''].map(h => (
              <p key={h} style={{ fontSize: 11, fontWeight: 800, color: '#8A8AA0', letterSpacing: '.1em' }}>{h}</p>
            ))}
          </div>
          {MOCK_STORY_PROGRESS.map((s, i) => {
            const ratio = s.quizTotal > 0 ? s.quizCorrect / s.quizTotal : null;
            const low   = ratio !== null && ratio < 0.6;
            return (
              <div key={s.bookId} style={{ display: 'grid', gridTemplateColumns: '1fr 54px 72px 140px 100px 44px', padding: '14px 20px', gap: 8, borderTop: i > 0 ? '1px solid #F0EDE5' : 'none', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                  {low && <span style={{ color: '#E85D7A', fontSize: 13, flexShrink: 0 }}>●</span>}
                  <div style={{ width: 44, height: 32, borderRadius: 8, background: `linear-gradient(135deg,${s.color},${s.color}88)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontSize: 19, fontFamily: 'var(--font-thai-school)', fontWeight: 900, color: 'white' }}>{s.titleThai[0]}</span>
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontSize: 16, fontWeight: 700, color: '#2D2D3F', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.titleThai}</p>
                    <p style={{ fontSize: 13, color: '#8A8AA0' }}>{s.titleEnglish}</p>
                  </div>
                </div>
                <div style={{ width: 30, height: 30, borderRadius: '50%', background: '#FFE0E6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 15, fontWeight: 900, color: '#E85D7A' }}>{s.level}</span>
                </div>
                <span style={{ fontSize: 19, fontWeight: 900, color: '#2D2D3F' }}>{s.timesRead}×</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  {ratio !== null ? (
                    <>
                      <span style={{ fontSize: 15, fontWeight: 700, color: low ? '#E85D7A' : '#2D2D3F' }}>{s.quizCorrect}/{s.quizTotal}</span>
                      <div style={{ display: 'flex', gap: 2 }}>
                        {[1,2,3].map(n => <svg key={n} width="10" height="10" viewBox="0 0 24 24" fill={n <= s.stars ? '#FFD23F' : 'rgba(0,0,0,0.1)'}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>)}
                      </div>
                    </>
                  ) : <span style={{ color: '#8A8AA0' }}>—</span>}
                </div>
                <span style={{ fontSize: 14, color: '#8A8AA0' }}>{s.lastReadAt}</span>
                <Link href={`/books/${s.bookId}`} style={{ width: 32, height: 32, borderRadius: '50%', background: '#F87C3C', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', boxShadow: '0 2px 8px rgba(248,124,60,0.4)' }}>
                  <svg width="9" height="11" viewBox="0 0 9 11" fill="white"><path d="M0 0l9 5.5-9 5.5z"/></svg>
                </Link>
              </div>
            );
          })}
        </div>
        {MOCK_STORY_PROGRESS.some(s => s.quizCorrect / s.quizTotal < 0.6) && (
          <p style={{ fontSize: 14, color: '#E85D7A', marginTop: 12 }}>● Quiz Score Below 60% — Re-read recommended</p>
        )}
      </div>
    </div>
  );
}

function WordsScreen({ onBack, onSwitch }: { onBack: () => void; onSwitch: () => void }) {
  return (
    <div style={{ minHeight: '100dvh', background: '#F8F9FB' }}>
      <DetailHeader active="words" onSwitch={onSwitch} onBack={onBack} />
      <div style={{ padding: '20px', maxWidth: 860, margin: '0 auto' }}>
        <div style={{ borderRadius: 16, background: 'white', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 140px 70px 95px', padding: '10px 20px', background: '#F8F9FB', gap: 8 }}>
            {['Word', 'Romanization', 'Seen', 'Status'].map(h => (
              <p key={h} style={{ fontSize: 11, fontWeight: 800, color: '#8A8AA0', letterSpacing: '.1em' }}>{h}</p>
            ))}
          </div>
          {MOCK_WORDS.map((w, i) => {
            const m = MASTERY[w.mastery];
            return (
              <div key={w.thai} style={{ display: 'grid', gridTemplateColumns: '1fr 140px 70px 95px', padding: '13px 20px', gap: 8, borderTop: i > 0 ? '1px solid #F0EDE5' : 'none', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 9, background: w.mastery === 3 ? 'linear-gradient(135deg,#8B6FD4,#6943C9)' : '#F0F0F6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontSize: 20, fontFamily: 'var(--font-thai-school)', fontWeight: 900, color: w.mastery === 3 ? 'white' : '#C5C5D0' }}>{w.thai[0]}</span>
                  </div>
                  <div>
                    <span style={{ fontSize: 21, fontWeight: 900, color: '#2D2D3F', fontFamily: 'var(--font-thai-school)' }}>{w.thai}</span>
                    <span style={{ fontSize: 14, color: '#8A8AA0', marginLeft: 8 }}>{w.english}</span>
                  </div>
                </div>
                <span style={{ fontSize: 15, color: '#8A8AA0' }}>{w.romanization}</span>
                <span style={{ fontSize: 18, fontWeight: 700, color: '#2D2D3F' }}>{w.exposures > 0 ? `${w.exposures}×` : '—'}</span>
                <span style={{ fontSize: 13, fontWeight: 700, padding: '4px 12px', borderRadius: 99, background: m.bg, color: m.color, display: 'inline-block', width: 'fit-content' }}>{m.label}</span>
              </div>
            );
          })}
        </div>
        <p style={{ fontSize: 13, color: '#8A8AA0', marginTop: 12 }}>Mastery = 4+ encounters with ≥80% correct answers</p>
      </div>
    </div>
  );
}

/* ─── Shared UI ─────────────────────────────────────────────── */
function DonutProgress({ pct, color, label, sublabel }: { pct: number; color: string; label: string; sublabel: string }) {
  const r = 28, circ = 2 * Math.PI * r;
  return (
    <div style={{ textAlign: 'center', flexShrink: 0 }}>
      <div style={{ position: 'relative', width: 72, height: 72 }}>
        <svg width="72" height="72" style={{ transform: 'rotate(-90deg)', position: 'absolute' }}>
          <circle cx="36" cy="36" r={r} fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="5" />
          <circle cx="36" cy="36" r={r} fill="none" stroke={color} strokeWidth="5"
            strokeDasharray={circ} strokeDashoffset={circ - (pct / 100) * circ}
            strokeLinecap="round" style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(.22,1,.36,1)' }} />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 16, fontWeight: 900, color: '#2D2D3F' }}>{pct}%</span>
        </div>
      </div>
      <p style={{ fontSize: 14, fontWeight: 700, color, marginTop: 8 }}>{sublabel}</p>
      <p style={{ fontSize: 13, color: '#8A8AA0' }}>{label}</p>
    </div>
  );
}

function LoginScreen() {
  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(150deg,#0E0628,#1C0A52,#2D1278,#4A22C0)', padding: 24, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '15%', left: '8%', width: 280, height: 280, background: 'radial-gradient(circle,rgba(124,77,255,0.18) 0%,transparent 70%)', borderRadius: '50%', filter: 'blur(40px)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 380, width: '100%', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ width: 80, height: 80, background: '#FFE05A', borderRadius: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', boxShadow: '0 12px 32px rgba(255,224,90,0.35)' }}>
          <ParentMascot size={56} />
        </div>
        <h1 style={{ color: 'white', fontSize: '2.19rem', fontWeight: 900, marginBottom: 8 }}>Parent Dashboard</h1>
        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 18, marginBottom: 40 }}>Track your child&apos;s Thai reading journey</p>
        <button onClick={() => signIn('google', { callbackUrl: '/parent' })} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, background: 'white', color: '#1A2B3C', fontSize: 19, fontWeight: 700, padding: '15px 24px', borderRadius: 14, boxShadow: '0 8px 32px rgba(0,0,0,0.4)', border: 'none', cursor: 'pointer' }}>
          <GoogleIcon size={18} />
          Continue with Google
        </button>
      </div>
    </div>
  );
}

function Loader() {
  return (
    <div style={{ minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F5F5FA' }}>
      <div style={{ width: 28, height: 28, borderRadius: '50%', border: '3px solid rgba(0,0,0,0.08)', borderTopColor: '#FFE05A', animation: 'spin 0.8s linear infinite' }} />
    </div>
  );
}

/* Spell Parrot mascot (spell-parrot.4860a9d8.svg) */
function ParentMascot({ size = 82 }: { size?: number }) {
  const w = Math.round(size * 492 / 407);
  return (
    <svg width={w} height={size} viewBox="0 0 492 407" style={{ display: 'block' }}>
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
  );
}

function GoogleIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M47.5 24.5c0-1.6-.1-3.2-.4-4.7H24v9h13.2c-.6 3-2.4 5.6-5 7.3v6h8c4.8-4.4 7.3-10.8 7.3-17.6z" fill="#4285F4"/>
      <path d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-8-6c-2.1 1.4-4.8 2.3-7.9 2.3-6 0-11.2-4-13-9.4H2.7v6.1C6.8 42.7 14.9 48 24 48z" fill="#34A853"/>
      <path d="M11 29.1c-.5-1.4-.7-2.9-.7-4.4s.2-3 .7-4.4v-6.1H2.7C1 17.3 0 20.5 0 24s1 6.7 2.7 9.8l8.3-4.7z" fill="#FBBC05"/>
      <path d="M24 9.5c3.4 0 6.4 1.2 8.8 3.4l6.5-6.5C35.9 2.7 30.5.5 24 .5 14.9.5 6.8 5.8 2.7 14.2l8.3 6.1c1.8-5.4 7-10.8 13-10.8z" fill="#EA4335"/>
    </svg>
  );
}
