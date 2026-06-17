'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import type { Book } from '@/lib/types';
import type { ChildProfile } from '@/lib/db';
import ForParentsModal from '@/components/ForParentsModal';
import KidsWelcome from './KidsWelcome';

interface Props {
  profile: ChildProfile;
  books: Book[];
  streak: number;
}

const GOALS = [
  { id: 'stories', label: 'Read 3 Stories',       done: 1, total: 3, color: '#3BAFDA' },
  { id: 'words',   label: 'Collect 5 Word Cards', done: 2, total: 5, color: '#9B74E8' },
  { id: 'games',   label: 'Win 2 Mini Games',     done: 0, total: 2, color: '#FF6635' },
];

const KF = 'var(--font-kids-round), Fredoka, var(--font-thai-sans), sans-serif';

/* ── Browser utilities ─────────────────────────────────────── */
function pop(freq = 680) {
  try {
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.connect(g); g.connect(ctx.destination);
    o.type = 'sine';
    o.frequency.setValueAtTime(freq, ctx.currentTime);
    o.frequency.exponentialRampToValueAtTime(freq * 0.55, ctx.currentTime + 0.1);
    g.gain.setValueAtTime(0.14, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);
    o.start(); o.stop(ctx.currentTime + 0.14);
    setTimeout(() => ctx.close(), 500);
  } catch {}
}

function vibe(ms = 28) {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) navigator.vibrate(ms);
}

/* ── SVG mascot ────────────────────────────────────────────── */
function TigerAvatar({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" style={{ display: 'block', flexShrink: 0 }}>
      <defs>
        <radialGradient id="tig-grad" cx="35%" cy="30%">
          <stop offset="0%" stopColor="#FFD060" />
          <stop offset="100%" stopColor="#FF8C35" />
        </radialGradient>
      </defs>
      {/* Base */}
      <circle cx="18" cy="19" r="17" fill="url(#tig-grad)" />
      {/* Ears */}
      <polygon points="5,7 11,19 17,7" fill="#FF8C35" />
      <polygon points="6.5,8.5 11,17 15.5,8.5" fill="#FFD080" />
      <polygon points="19,7 25,19 31,7" fill="#FF8C35" />
      <polygon points="20.5,8.5 25,17 29.5,8.5" fill="#FFD080" />
      {/* Face pad */}
      <ellipse cx="18" cy="22" rx="11" ry="9" fill="#FFE8A8" />
      {/* Stripes */}
      <path d="M9 15 Q11.5 18 10 22" stroke="#C06018" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M27 15 Q24.5 18 26 22" stroke="#C06018" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      {/* Eyes */}
      <ellipse cx="13.5" cy="19" rx="2.8" ry="3" fill="white" />
      <ellipse cx="22.5" cy="19" rx="2.8" ry="3" fill="white" />
      <circle cx="13.9" cy="19.4" r="1.6" fill="#2D1A0E" />
      <circle cx="22.9" cy="19.4" r="1.6" fill="#2D1A0E" />
      <circle cx="14.4" cy="18.9" r="0.55" fill="white" />
      <circle cx="23.4" cy="18.9" r="0.55" fill="white" />
      {/* Nose */}
      <ellipse cx="18" cy="23" rx="2.2" ry="1.5" fill="#C05010" />
      {/* Mouth */}
      <path d="M15.5 24.5 Q18 27 20.5 24.5" stroke="#A04010" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      {/* Whiskers */}
      <line x1="5" y1="22.5" x2="14" y2="23.5" stroke="#C06018" strokeWidth="0.8" opacity="0.4" />
      <line x1="5" y1="24.5" x2="14" y2="24.5" stroke="#C06018" strokeWidth="0.8" opacity="0.4" />
      <line x1="22" y1="23.5" x2="31" y2="22.5" stroke="#C06018" strokeWidth="0.8" opacity="0.4" />
      <line x1="22" y1="24.5" x2="31" y2="24.5" stroke="#C06018" strokeWidth="0.8" opacity="0.4" />
    </svg>
  );
}

/* ── Main component ────────────────────────────────────────── */
export default function KidsDashboard({ profile, books, streak }: Props) {
  const [welcome, setWelcome] = useState(true);
  const [goalsOpen, setGoalsOpen] = useState(false);
  const [parentsOpen, setParentsOpen] = useState(false);
  const pressRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const startParentPress = () => { pressRef.current = setTimeout(() => { setParentsOpen(true); }, 3000); };
  const cancelParentPress = () => { if (pressRef.current) { clearTimeout(pressRef.current); pressRef.current = null; } };

  if (welcome) return <KidsWelcome profile={profile} onEnter={() => setWelcome(false)} />;
  const firstBook = books[0];

  return (
    <div style={{
      minHeight: '100dvh',
      background: 'linear-gradient(180deg, #FFF9EE 0%, #FFF4DC 100%)',
      fontFamily: KF,
      overflowX: 'hidden',
      position: 'relative',
    }}>

      {/* ── Background blobs (pure CSS organic shapes) ── */}
      <div className="blob-drift" style={{
        position: 'absolute', top: 50, right: -50, zIndex: 0, pointerEvents: 'none',
        width: 220, height: 200,
        borderRadius: '63% 37% 54% 46% / 55% 48% 52% 45%',
        background: 'rgba(59,175,218,0.08)',
      }} />
      <div className="blob-drift" style={{
        position: 'absolute', top: 320, left: -45, zIndex: 0, pointerEvents: 'none',
        width: 180, height: 160,
        borderRadius: '40% 60% 35% 65% / 62% 38% 58% 42%',
        background: 'rgba(155,116,232,0.07)',
        animationDelay: '3s', animationDirection: 'reverse',
      }} />
      <div className="blob-drift" style={{
        position: 'absolute', bottom: 160, right: -20, zIndex: 0, pointerEvents: 'none',
        width: 140, height: 130,
        borderRadius: '55% 45% 70% 30% / 40% 65% 35% 60%',
        background: 'rgba(255,210,63,0.09)',
        animationDelay: '6s',
      }} />

      {/* ── Header ── */}
      <header style={{
        height: 62,
        background: '#FFFFFF',
        borderBottom: '2px solid #F0EDE5',
        display: 'flex', alignItems: 'center',
        padding: '0 14px', gap: 10,
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        position: 'relative', zIndex: 10,
      }}>

        {/* Avatar pill — breathes gently */}
        <div className="kids-breath" style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: '#FFF4DC', borderRadius: 99,
          padding: '4px 12px 4px 4px',
          border: '2px solid #FFD23F',
        }}>
          <TigerAvatar size={36} />
          <span style={{ fontSize: 14, fontWeight: 700, color: '#2D2D3F', fontFamily: KF }}>
            {profile.child_name}
          </span>
        </div>

        {/* Stars — hold 3s → parent dashboard */}
        <div
          onMouseDown={startParentPress} onMouseUp={cancelParentPress} onMouseLeave={cancelParentPress}
          onTouchStart={startParentPress} onTouchEnd={cancelParentPress}
          style={{
            display: 'flex', alignItems: 'center', gap: 5,
            background: '#FFF4DC', borderRadius: 99,
            padding: '6px 12px', border: '1.5px solid #FFD23F',
            userSelect: 'none', cursor: 'default',
          }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="#FFD23F"
            style={{ animation: 'wiggle 4s ease-in-out infinite' }}>
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          <span style={{ fontSize: 14, fontWeight: 900, color: '#B8940A', fontFamily: KF }}>{profile.xp}</span>
        </div>

        <div style={{ flex: 1 }} />

        {/* Streak */}
        {streak > 0 && (
          <div className="btn-bounce" style={{
            display: 'flex', alignItems: 'center', gap: 4,
            fontSize: 11, fontWeight: 700, color: '#FF6635', fontFamily: KF,
            animationDuration: '2.2s',
          }}>
            <FlameIcon size={15} />
            {streak}
          </div>
        )}

        <button
          onClick={() => { pop(600); vibe(20); setParentsOpen(true); }}
          style={{
            padding: '8px 14px', borderRadius: 99,
            fontSize: 11, fontWeight: 700, letterSpacing: '.06em',
            background: '#0D2B4E', color: 'white',
            border: 'none', cursor: 'pointer', fontFamily: KF,
          }}>
          PARENTS
        </button>

        <button style={{
          padding: '8px 14px', borderRadius: 99,
          fontSize: 11, fontWeight: 700, letterSpacing: '.06em',
          background: 'linear-gradient(135deg,#FFD60A,#FF8C35)',
          color: '#1A0845', border: 'none', cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(255,200,0,0.4)',
          fontFamily: KF,
        }}>
          UPGRADE
        </button>
      </header>

      {/* ── Today's Goals pill ── */}
      <div style={{
        padding: '14px 14px 0',
        maxWidth: 640, margin: '0 auto',
        boxSizing: 'border-box', width: '100%',
        position: 'relative', zIndex: 5,
      }}>
        <button
          onClick={() => { pop(720); vibe(); setGoalsOpen(true); }}
          className="kids-card"
          style={{
            width: '100%',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '11px 18px 11px 14px', borderRadius: 99,
            background: 'white', border: '2px solid #F0EDE5',
            boxShadow: '0 2px 10px rgba(0,0,0,0.07)',
            cursor: 'pointer',
          }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 30, height: 30, borderRadius: 9,
              background: '#FFF4DC',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {/* Target icon */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="#FF6635" strokeWidth="2.5" strokeLinecap="round">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" />
              </svg>
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#2D2D3F', fontFamily: KF }}>Today&apos;s Goals</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {GOALS.map((g, i) => (
              <div key={i} style={{
                width: 9, height: 9, borderRadius: '50%',
                background: g.done >= g.total ? g.color
                  : g.done > 0 ? `${g.color}60`
                  : '#E8E4DC',
              }} />
            ))}
          </div>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
            stroke="#8A8AA0" strokeWidth="2.5" strokeLinecap="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </div>

      {/* ── Main grid ── */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 90px',
        gap: 12, padding: '14px',
        maxWidth: 700, margin: '0 auto',
        boxSizing: 'border-box',
        position: 'relative', zIndex: 5,
      }}>

        {/* LEFT — cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

          {/* ── HERO CARD ── */}
          <Link
            href={firstBook ? `/books/${firstBook.id}` : '#'}
            onClick={() => { pop(600); vibe(20); }}
            style={{ textDecoration: 'none' }}
          >
            <div className="kids-card" style={{
              borderRadius: 26, height: 186,
              background: 'linear-gradient(135deg, #3BAFDA 0%, #2166B0 100%)',
              position: 'relative', overflow: 'hidden',
              boxShadow: '0 10px 36px rgba(59,175,218,0.45)',
              display: 'flex', alignItems: 'flex-end',
              padding: '0 20px 20px',
              cursor: 'pointer',
              animation: 'popIn 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.05s both',
            }}>
              {/* Decorative circles — organic drift */}
              <div className="blob-drift" style={{
                position: 'absolute', top: -30, right: -30,
                width: 140, height: 140, borderRadius: '50%',
                background: 'rgba(255,255,255,0.12)',
                animationDuration: '9s',
              }} />
              <div className="blob-drift" style={{
                position: 'absolute', top: 24, right: 36,
                width: 72, height: 72, borderRadius: '50%',
                background: 'rgba(255,255,255,0.18)',
                animationDuration: '7s', animationDirection: 'reverse',
              }} />

              {/* Open book — idles float */}
              <div className="kids-float" style={{
                position: 'absolute', right: 14, top: 12,
                filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.22))',
              }}>
                <BookOpenSVG size={72} />
              </div>

              <div style={{ position: 'relative', zIndex: 2 }}>
                <p style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.8)', letterSpacing: '.14em', marginBottom: 5, fontFamily: KF }}>
                  TODAY&apos;S STORY
                </p>
                <p style={{ fontSize: 20, fontWeight: 900, color: 'white', lineHeight: 1.15, fontFamily: 'var(--font-thai-school)' }}>
                  {firstBook?.title_thai ?? 'หมาของฉัน'}
                </p>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.75)', marginTop: 5, fontFamily: KF }}>
                  Level 1 · Day {streak + 1}
                </p>
              </div>

              <div style={{
                position: 'absolute', right: 18, bottom: 18,
                width: 38, height: 38, borderRadius: '50%',
                background: 'rgba(255,255,255,0.28)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="white" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>

          {/* ── SECONDARY CARDS ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>

            {/* MINI GAMES */}
            <div className="kids-card" onClick={() => { pop(540); vibe(20); }} style={{
              borderRadius: 22, height: 128,
              background: 'linear-gradient(135deg, #9B74E8 0%, #6943C9 100%)',
              position: 'relative', overflow: 'hidden',
              boxShadow: '0 8px 24px rgba(105,67,201,0.4)',
              display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
              padding: '0 16px 16px', cursor: 'pointer',
              animation: 'popIn 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.12s both',
            }}>
              <div className="blob-drift" style={{
                position: 'absolute', top: -12, right: -12,
                width: 80, height: 80, borderRadius: '50%',
                background: 'rgba(255,255,255,0.12)', animationDuration: '10s',
              }} />
              <div className="kids-float" style={{ position: 'absolute', top: 13, right: 14, animationDelay: '0.5s' }}>
                <GamepadSVG size={40} />
              </div>
              <p style={{ fontSize: 11, fontWeight: 700, color: 'white', letterSpacing: '.1em', fontFamily: KF, position: 'relative', zIndex: 1 }}>
                MINI GAMES
              </p>
            </div>

            {/* FREE READ */}
            <div className="kids-card" style={{
              borderRadius: 22, height: 128,
              background: 'linear-gradient(135deg, #FF6635 0%, #E85D7A 100%)',
              position: 'relative', overflow: 'hidden',
              boxShadow: '0 8px 24px rgba(232,93,122,0.4)',
              display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
              padding: '0 16px 16px', cursor: 'pointer',
              animation: 'popIn 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.19s both',
            }}>
              <div className="blob-drift" style={{
                position: 'absolute', top: -12, right: -12,
                width: 80, height: 80, borderRadius: '50%',
                background: 'rgba(255,255,255,0.12)', animationDuration: '8s', animationDirection: 'reverse',
              }} />
              <Link href="/books" onClick={() => { pop(580); vibe(20); }} style={{ position: 'absolute', inset: 0 }} />
              <div className="kids-float" style={{ position: 'absolute', top: 13, right: 14, animationDelay: '1.1s' }}>
                <ShelfSVG size={40} />
              </div>
              <p style={{ fontSize: 11, fontWeight: 700, color: 'white', letterSpacing: '.1em', fontFamily: KF, position: 'relative', zIndex: 1 }}>
                FREE READ
              </p>
            </div>

          </div>
        </div>

        {/* RIGHT — sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, paddingTop: 2 }}>
          <SidebarItem label="LETTERS" locked floatDelay="0s">
            <span style={{ fontSize: 22, fontWeight: 900, color: '#C0C0D0', fontFamily: 'var(--font-thai-sans)' }}>ก</span>
          </SidebarItem>
          <SidebarItem label="AI READ" floatDelay="0.3s">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
              stroke="#3BAFDA" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <circle cx="12" cy="17" r="0.5" fill="#3BAFDA" />
            </svg>
          </SidebarItem>
          <SidebarItem label="MAP" floatDelay="0.7s">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
              stroke="#4CC97C" strokeWidth="2" strokeLinecap="round">
              <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
              <line x1="9" y1="3" x2="9" y2="18" />
              <line x1="15" y1="6" x2="15" y2="21" />
            </svg>
          </SidebarItem>
          <SidebarItem label="COLLECT" floatDelay="1.1s">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
              stroke="#FF8C35" strokeWidth="2" strokeLinecap="round">
              <rect x="2" y="7" width="20" height="14" rx="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
          </SidebarItem>
        </div>
      </div>

      {/* ── Streak badge ── */}
      {streak >= 3 && (
        <div className="btn-bounce" style={{
          position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
          background: 'white', borderRadius: 99, padding: '10px 20px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
          display: 'flex', alignItems: 'center', gap: 8, zIndex: 50,
          border: '2px solid #FFD23F', fontFamily: KF,
        }}>
          <FlameIcon size={18} />
          <span style={{ fontSize: 13, fontWeight: 700, color: '#FF6635' }}>{streak} day streak!</span>
        </div>
      )}

      {goalsOpen && <GoalsModal onClose={() => setGoalsOpen(false)} />}
      {parentsOpen && <ForParentsModal onClose={() => setParentsOpen(false)} />}
    </div>
  );
}

/* ── Sidebar item ──────────────────────────────────────────── */
function SidebarItem({ label, locked, floatDelay = '0s', children }: {
  label: string;
  locked?: boolean;
  floatDelay?: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, opacity: locked ? 0.45 : 1 }}>
      <div className={locked ? '' : 'kids-card'} style={{
        width: 72, height: 72, borderRadius: 20,
        background: locked ? '#E8E8F0' : 'white',
        border: `2px solid ${locked ? '#D0D0E0' : '#F0EDE5'}`,
        boxShadow: locked ? 'none' : '0 4px 16px rgba(0,0,0,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: locked ? 'not-allowed' : 'pointer',
        position: 'relative',
      }}>
        {locked && (
          <div style={{
            position: 'absolute', top: -8, right: -8,
            width: 22, height: 22, borderRadius: '50%',
            background: '#6943C9',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
              stroke="white" strokeWidth="2.5" strokeLinecap="round">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
        )}
        {/* Icon floats inside the card — no transform conflict with kids-card:active */}
        <div
          className={locked ? 'wiggle' : 'kids-float'}
          style={{ animationDelay: floatDelay, animationDuration: locked ? '5s' : '3.5s' }}
        >
          {children}
        </div>
      </div>
      <p style={{
        fontSize: 8, fontWeight: 900,
        color: locked ? '#B0B0C0' : '#8A8AA0',
        letterSpacing: '.1em', textAlign: 'center', fontFamily: KF,
      }}>{label}</p>
    </div>
  );
}

/* ── Goals modal ───────────────────────────────────────────── */
function GoalsModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.45)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 100, padding: 20,
      }}>
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'white', borderRadius: 28,
          width: '100%', maxWidth: 400,
          padding: '24px 22px',
          boxShadow: '0 28px 72px rgba(0,0,0,0.3)',
          animation: 'popIn 0.38s cubic-bezier(0.34,1.56,0.64,1) both',
        }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#2D2D3F', margin: 0, fontFamily: KF }}>Today&apos;s Goals</h2>
          <button
            onClick={onClose}
            style={{
              width: 34, height: 34, borderRadius: '50%',
              background: '#F0EDE5', border: 'none', cursor: 'pointer',
              fontSize: 14, color: '#8A8AA0', fontWeight: 700,
            }}>
            ✕
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {GOALS.map((g, i) => (
            <div key={g.id} style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '12px 14px', borderRadius: 18,
              background: `${g.color}0D`,
              animation: 'popIn 0.4s cubic-bezier(0.34,1.56,0.64,1) both',
              animationDelay: `${0.05 + i * 0.07}s`,
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: 16,
                background: `${g.color}22`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <GoalIcon id={g.id} color={g.color} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#2D2D3F', fontFamily: KF }}>{g.label}</span>
                  <span style={{ fontSize: 12, fontWeight: 900, color: g.color, fontFamily: KF }}>{g.done}/{g.total}</span>
                </div>
                <div style={{ height: 8, borderRadius: 99, background: `${g.color}20`, overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', background: g.color, borderRadius: 99,
                    animation: 'xpFill 0.9s cubic-bezier(.22,1,.36,1) both',
                    animationDelay: `${0.2 + i * 0.07}s`,
                    ['--xp-pct' as string]: `${Math.round((g.done / g.total) * 100)}%`,
                  } as React.CSSProperties} />
                </div>
              </div>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: g.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
                boxShadow: `0 4px 12px ${g.color}55`,
              }}>
                <svg width="11" height="13" viewBox="0 0 11 13" fill="white">
                  <path d="M0 0l11 6.5-11 6.5z" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Small SVG components ──────────────────────────────────── */
function BookOpenSVG({ size = 60 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      <path d="M30 14 Q20 12 8 16 L8 46 Q20 42 30 46" fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.85)" strokeWidth="2" strokeLinejoin="round" />
      <path d="M30 14 Q40 12 52 16 L52 46 Q40 42 30 46" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.85)" strokeWidth="2" strokeLinejoin="round" />
      <line x1="30" y1="14" x2="30" y2="46" stroke="rgba(255,255,255,0.95)" strokeWidth="2.5" />
      <line x1="13" y1="25" x2="27" y2="23" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="13" y1="31" x2="27" y2="29" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="13" y1="37" x2="27" y2="35" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="33" y1="23" x2="47" y2="25" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="33" y1="29" x2="47" y2="31" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="33" y1="35" x2="47" y2="37" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function GamepadSVG({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <rect x="4" y="12" width="32" height="18" rx="9" fill="rgba(255,255,255,0.22)" stroke="rgba(255,255,255,0.85)" strokeWidth="1.8" />
      <line x1="10" y1="21" x2="17" y2="21" stroke="rgba(255,255,255,0.85)" strokeWidth="2" strokeLinecap="round" />
      <line x1="13.5" y1="17.5" x2="13.5" y2="24.5" stroke="rgba(255,255,255,0.85)" strokeWidth="2" strokeLinecap="round" />
      <circle cx="25" cy="19" r="1.8" fill="rgba(255,255,255,0.85)" />
      <circle cx="29" cy="23" r="1.8" fill="rgba(255,255,255,0.85)" />
    </svg>
  );
}

function ShelfSVG({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <rect x="5" y="9" width="9" height="20" rx="2" fill="rgba(255,255,255,0.5)" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5" />
      <rect x="16" y="13" width="9" height="16" rx="2" fill="rgba(255,255,255,0.35)" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5" />
      <rect x="27" y="7" width="9" height="22" rx="2" fill="rgba(255,255,255,0.55)" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5" />
      <line x1="3" y1="31" x2="37" y2="31" stroke="rgba(255,255,255,0.85)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function FlameIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d="M12 2C12 2 8 7 8 11.5C8 13.4 9.8 15 12 15C14.2 15 16 13.4 16 11.5C16 9.8 15 8.2 14 7C14 7 14 9.5 12 9.5C12 9.5 10 7.5 12 2Z" fill="#FF6635" />
      <path d="M12 9.5C12 9.5 10.2 11.2 10.2 12.8C10.2 13.9 11 14.7 12 14.7C13 14.7 13.8 13.9 13.8 12.8C13.8 11.5 12 9.5 12 9.5Z" fill="#FFD23F" />
    </svg>
  );
}

function GoalIcon({ id, color }: { id: string; color: string }) {
  if (id === 'stories') return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
  if (id === 'words') return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="6" y1="8" x2="14" y2="8" />
      <line x1="6" y1="12" x2="10" y2="12" />
      <path d="M16 21l2-2-2-2" />
    </svg>
  );
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="10 8 16 12 10 16 10 8" fill={color} />
    </svg>
  );
}
