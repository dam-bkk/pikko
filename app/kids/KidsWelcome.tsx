'use client'

import { useState, useEffect, useRef } from 'react'
import ForParentsModal from '@/components/ForParentsModal'
import type { ChildProfile } from '@/lib/db'

const KF   = 'var(--font-kids-round), Fredoka, var(--font-thai-sans), sans-serif'
const THAI = 'var(--font-thai-school), var(--font-thai-sans), Noto Sans Thai, sans-serif'

const EXTRA_CSS = `
  @keyframes jumpChar {
    0%,100% { transform: translateY(0)     scaleX(1)    scaleY(1); }
    8%      { transform: translateY(2px)   scaleX(1.18) scaleY(0.82); }
    22%     { transform: translateY(-38px) scaleX(0.88) scaleY(1.06); }
    38%     { transform: translateY(-48px) scaleX(0.94) scaleY(1.02); }
    54%     { transform: translateY(-22px) scaleX(0.90) scaleY(1.08); }
    66%     { transform: translateY(0)     scaleX(1.14) scaleY(0.86); }
    76%     { transform: translateY(-14px) scaleX(0.96) scaleY(1.03); }
    86%     { transform: translateY(0)     scaleX(1.05) scaleY(0.95); }
  }
  @keyframes layWobble {
    0%,100% { transform: var(--lay-rot); }
    50%     { transform: var(--lay-rot) translateY(-5px); }
  }
  @keyframes eyeBlink {
    0%,90%,100% { transform: scaleY(1); }
    95%         { transform: scaleY(0.06); }
  }
  @keyframes rabbitHeadBob {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    30%      { transform: translateY(-5px) rotate(2.2deg); }
    70%      { transform: translateY(-2px) rotate(-1.5deg); }
  }
  @keyframes rabbitBlink {
    0%, 88%, 100% { transform: scaleY(1); }
    92%            { transform: scaleY(0.06); }
  }
  .rabbit-eye {
    transform-box: fill-box;
    transform-origin: 50% 50%;
  }
  .rabbit-eye-r    { animation: rabbitBlink 5s ease-in-out 0s   infinite; }
  .rabbit-eye-l    { animation: rabbitBlink 5s ease-in-out 0.5s infinite; }
  .rabbit-eye-bl-r { animation: rabbitBlink 5s ease-in-out 0.2s infinite; }
  .rabbit-eye-bl-l { animation: rabbitBlink 5s ease-in-out 0.7s infinite; }
`

interface LetterDef {
  char: string
  x: string; y: string
  color: string; dark: string
  rot: number; size: number
  mode: 'float' | 'jump' | 'lay'
  del: string; spd: string
  perspX?: number; perspY?: number
}

function frostBg(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${alpha})`
}

const LETTERS: LetterDef[] = [
  // Left — 2 tiles vertically centred beside Pikko
  { char:'ก', x:'3%',  y:'22%', color:'#38C8FF', dark:'#1890CC', rot:-8,  size:138, mode:'float', del:'0s',   spd:'3.2s' },
  { char:'น', x:'2%',  y:'53%', color:'#FB6A85', dark:'#B02040', rot:6,   size:132, mode:'float', del:'1.4s', spd:'3.5s' },
  // Right — 2 tiles vertically centred beside Pikko
  { char:'ข', x:'65%', y:'20%', color:'#C860FF', dark:'#8020C0', rot:12,  size:142, mode:'float', del:'0.7s', spd:'2.8s' },
  { char:'ด', x:'64%', y:'53%', color:'#50E8B4', dark:'#0A9870', rot:-7,  size:135, mode:'float', del:'1.1s', spd:'3.6s' },
]

const PIKKO = [
  { char:'P', color:'#C860FF' },
  { char:'i', color:'#FFD23F' },
  { char:'k', color:'#38C8FF' },
  { char:'k', color:'#FF8C35' },
  { char:'o', color:'#FF6B8A' },
]

/* ── Tiger avatar ─────────────────────────────────────────── */
function TigerAvatar({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" style={{ display:'block', flexShrink:0 }}>
      <defs>
        <radialGradient id="twg2" cx="35%" cy="30%">
          <stop offset="0%"   stopColor="#FFD060"/>
          <stop offset="100%" stopColor="#FF8C35"/>
        </radialGradient>
      </defs>
      <circle cx="18" cy="19" r="17" fill="url(#twg2)"/>
      <polygon points="5,7 11,19 17,7"         fill="#FF8C35"/>
      <polygon points="6.5,8.5 11,17 15.5,8.5" fill="#FFD080"/>
      <polygon points="19,7 25,19 31,7"         fill="#FF8C35"/>
      <polygon points="20.5,8.5 25,17 29.5,8.5" fill="#FFD080"/>
      <ellipse cx="18" cy="22" rx="11" ry="9" fill="#FFE8A8"/>
      <path d="M9 15 Q11.5 18 10 22"  stroke="#C06018" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <path d="M27 15 Q24.5 18 26 22" stroke="#C06018" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <ellipse cx="13.5" cy="19" rx="2.8" ry="3" fill="white"/>
      <ellipse cx="22.5" cy="19" rx="2.8" ry="3" fill="white"/>
      <circle cx="13.9" cy="19.4" r="1.6" fill="#2D1A0E"/>
      <circle cx="22.9" cy="19.4" r="1.6" fill="#2D1A0E"/>
      <circle cx="14.4" cy="18.9" r="0.55" fill="white"/>
      <circle cx="23.4" cy="18.9" r="0.55" fill="white"/>
      <ellipse cx="18" cy="23" rx="2.2" ry="1.5" fill="#C05010"/>
      <path d="M15.5 24.5 Q18 27 20.5 24.5" stroke="#A04010" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
    </svg>
  )
}

/* ── Thai letter tile — repelRef wired to direct DOM updates ─ */
function LetterChar({
  def,
  repelRef,
}: {
  def: LetterDef
  repelRef: (el: HTMLDivElement | null) => void
}) {
  const s    = def.size
  const br   = Math.round(s * 0.22)
  const bdr  = Math.max(2, Math.round(s * 0.022))
  const dep  = Math.round(s * 0.055)
  const eyeW = Math.round(s * 0.11)
  const eyeH = Math.round(s * 0.135)
  const pupW = Math.round(s * 0.065)
  const pupH = Math.round(s * 0.082)

  const hasPerspective = !!(def.perspX || def.perspY)

  const outerStyle: React.CSSProperties = {
    position: 'absolute',
    left: def.x,
    top:  def.y,
    zIndex: 3,
    pointerEvents: 'none',
    transform: [
      hasPerspective
        ? `perspective(500px) rotateX(${def.perspX ?? 0}deg) rotateY(${def.perspY ?? 0}deg)`
        : '',
      def.mode !== 'lay' ? `rotate(${def.rot}deg)` : '',
    ].filter(Boolean).join(' ') || undefined,
  }

  const animStyle: React.CSSProperties = def.mode === 'float' ? {
    animation: `idleFloat ${def.spd} ease-in-out ${def.del} infinite`,
  } : def.mode === 'jump' ? {
    animation: `jumpChar ${def.spd} ease-in-out ${def.del} infinite`,
    transformOrigin: 'bottom center',
  } : {
    ['--lay-rot' as string]: `rotate(${def.rot}deg)`,
    animation: `layWobble ${def.spd} ease-in-out ${def.del} infinite`,
  }

  return (
    <div style={outerStyle}>
      {/* repelRef div: transform mutated directly by parent useEffect — zero re-renders */}
      <div ref={repelRef} style={{ willChange: 'transform' }}>
        <div style={animStyle}>
          <div style={{
            width:  s,
            height: Math.round(s * 1.14),
            borderRadius: br,
            background: frostBg(def.color, 0.15),
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            border: `${bdr}px solid ${frostBg(def.color, 0.42)}`,
            boxShadow: [
              `0 ${dep}px 0 ${frostBg(def.dark, 0.70)}`,
              `0 0 ${Math.round(s * 0.26)}px ${frostBg(def.color, 0.18)}`,
              `inset 0 ${bdr}px 0 rgba(255,255,255,0.22)`,
            ].join(', '),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0,
              height: '36%',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.22) 0%, transparent 100%)',
              borderRadius: `${br}px ${br}px 0 0`,
              pointerEvents: 'none',
            }}/>
            <div style={{
              position: 'absolute',
              top: Math.round(s * 0.09),
              display: 'flex',
              gap: Math.round(s * 0.10),
              zIndex: 1,
            }}>
              {[0, 1].map(i => (
                <div key={i} style={{
                  width: eyeW, height: eyeH,
                  background: 'white',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  animation: `eyeBlink ${2.8 + i * 1.4}s ease-in-out ${i * 0.5}s infinite`,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.18)',
                }}>
                  <div style={{
                    width: pupW, height: pupH,
                    background: '#1A1030',
                    borderRadius: '50%',
                    transform: 'translate(1px, 2px)',
                  }}/>
                </div>
              ))}
            </div>
            <span style={{
              fontFamily: THAI,
              fontSize: Math.round(s * 0.56),
              fontWeight: 900,
              color: def.color,
              lineHeight: 1,
              textShadow: [
                `0 2px 5px rgba(0,0,0,0.18)`,
                `0 0 ${Math.round(s * 0.16)}px ${frostBg(def.color, 0.50)}`,
              ].join(', '),
              marginTop: Math.round(s * 0.09),
              zIndex: 1,
              userSelect: 'none',
            }}>
              {def.char}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Thai village — houses left & right, clear center ─────── */
function ThaiVillage() {
  return (
    <svg
      viewBox="0 0 400 200"
      preserveAspectRatio="xMidYMax meet"
      style={{ position:'absolute', bottom:'18%', left:0, right:0, width:'100%', zIndex:1 }}
    >
      <ellipse cx="65"  cy="176" rx="115" ry="42" fill="#8AC020"/>
      <ellipse cx="335" cy="178" rx="110" ry="38" fill="#7AB018"/>
      <ellipse cx="200" cy="188" rx="110" ry="22" fill="#96CA28"/>

      {/* LEFT HOUSE */}
      <line x1="32" y1="176" x2="32" y2="192" stroke="#7A4220" strokeWidth="4" strokeLinecap="round"/>
      <line x1="52" y1="176" x2="52" y2="196" stroke="#7A4220" strokeWidth="4" strokeLinecap="round"/>
      <line x1="72" y1="176" x2="72" y2="192" stroke="#7A4220" strokeWidth="4" strokeLinecap="round"/>
      <rect x="24" y="152" width="56" height="26" rx="2" fill="#C87848"/>
      <line x1="24" y1="162" x2="80" y2="162" stroke="rgba(0,0,0,0.08)" strokeWidth="1.2"/>
      <line x1="24" y1="172" x2="80" y2="172" stroke="rgba(0,0,0,0.08)" strokeWidth="1.2"/>
      <rect x="44" y="158" width="14" height="16" rx="7 7 0 0" fill="#3A1808"/>
      <path d="M12,154 Q52,132 92,154" fill="#B05828" stroke="#5A2010" strokeWidth="1.8"/>
      <path d="M12,154 Q4,148 9,138"    stroke="#FFD23F" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M92,154 Q100,148 95,138" stroke="#FFD23F" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <line x1="24" y1="154" x2="80" y2="154" stroke="#FFD23F" strokeWidth="1.5" opacity="0.6"/>
      <path d="M4,196 C6,181 10,170 16,154" stroke="#8B5E3C" strokeWidth="5" fill="none" strokeLinecap="round"/>
      <ellipse cx="12" cy="149" rx="17" ry="6" fill="#5A9B28" transform="rotate(-25 12 149)"/>
      <ellipse cx="18" cy="146" rx="17" ry="6" fill="#4A8B20" transform="rotate(15 18 146)"/>
      <ellipse cx="8"  cy="151" rx="14" ry="5" fill="#6AAB30" transform="rotate(-50 8 151)"/>
      <circle cx="16" cy="154" r="4" fill="#7A4E2A" opacity="0.8"/>
      <path d="M104,197 C106,185 109,175 114,162" stroke="#8B5E3C" strokeWidth="4" fill="none" strokeLinecap="round"/>
      <ellipse cx="111" cy="157" rx="14" ry="5" fill="#4A8B20" transform="rotate(-20 111 157)"/>
      <ellipse cx="116" cy="154" rx="14" ry="5" fill="#5A9B28" transform="rotate(20 116 154)"/>
      <circle cx="114" cy="162" r="3.5" fill="#7A4E2A" opacity="0.8"/>

      {/* RIGHT HOUSE */}
      <line x1="316" y1="176" x2="316" y2="192" stroke="#7A4220" strokeWidth="4" strokeLinecap="round"/>
      <line x1="336" y1="176" x2="336" y2="196" stroke="#7A4220" strokeWidth="4" strokeLinecap="round"/>
      <line x1="356" y1="176" x2="356" y2="192" stroke="#7A4220" strokeWidth="4" strokeLinecap="round"/>
      <rect x="308" y="150" width="56" height="28" rx="2" fill="#B87048"/>
      <line x1="308" y1="160" x2="364" y2="160" stroke="rgba(0,0,0,0.08)" strokeWidth="1.2"/>
      <line x1="308" y1="170" x2="364" y2="170" stroke="rgba(0,0,0,0.08)" strokeWidth="1.2"/>
      <rect x="326" y="158" width="14" height="16" rx="7 7 0 0" fill="#3A1808"/>
      <path d="M296,152 Q336,130 376,152" fill="#A05028" stroke="#5A2010" strokeWidth="1.8"/>
      <path d="M296,152 Q288,146 293,136" stroke="#FFD23F" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M376,152 Q384,146 379,136" stroke="#FFD23F" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <line x1="308" y1="152" x2="364" y2="152" stroke="#FFD23F" strokeWidth="1.5" opacity="0.6"/>
      <path d="M396,196 C394,181 390,170 384,154" stroke="#8B5E3C" strokeWidth="5" fill="none" strokeLinecap="round"/>
      <ellipse cx="388" cy="149" rx="17" ry="6" fill="#4A8B20" transform="rotate(25 388 149)"/>
      <ellipse cx="382" cy="146" rx="17" ry="6" fill="#5A9B28" transform="rotate(-15 382 146)"/>
      <ellipse cx="392" cy="151" rx="14" ry="5" fill="#6AAB30" transform="rotate(50 392 151)"/>
      <circle cx="384" cy="154" r="4" fill="#7A4E2A" opacity="0.8"/>
      <path d="M292,197 C290,185 287,175 282,162" stroke="#8B5E3C" strokeWidth="4" fill="none" strokeLinecap="round"/>
      <ellipse cx="285" cy="157" rx="14" ry="5" fill="#5A9B28" transform="rotate(20 285 157)"/>
      <ellipse cx="280" cy="154" rx="14" ry="5" fill="#4A8B20" transform="rotate(-20 280 154)"/>
      <circle cx="282" cy="162" r="3.5" fill="#7A4E2A" opacity="0.8"/>

      <rect x="0" y="192" width="400" height="8" rx="2" fill="#78BCD4" opacity="0.40"/>
      <path d="M0,195 Q80,191 160,195 Q240,199 320,195 Q360,192 400,195"
        stroke="#58A0BA" strokeWidth="1" fill="none" opacity="0.50"/>
      <line x1="30"  y1="195" x2="60"  y2="195" stroke="white" strokeWidth="0.8" opacity="0.35" strokeLinecap="round"/>
      <line x1="160" y1="194" x2="200" y2="194" stroke="white" strokeWidth="0.8" opacity="0.28" strokeLinecap="round"/>
      <line x1="300" y1="195" x2="340" y2="195" stroke="white" strokeWidth="0.8" opacity="0.35" strokeLinecap="round"/>
      <ellipse cx="52"  cy="192" rx="40" ry="6" fill="rgba(0,0,0,0.07)"/>
      <ellipse cx="336" cy="192" rx="40" ry="6" fill="rgba(0,0,0,0.07)"/>
    </svg>
  )
}

/* ── Both rabbits from rabbits.svg — centered, blink + head bob ── */
function Rabbits() {
  return (
    <div style={{
      position: 'absolute',
      left: '50%',
      bottom: '19%',
      transform: 'translateX(-50%)',
      zIndex: 6,
      pointerEvents: 'none',
      width: 280,
    }}>
      <div style={{
        animation: 'rabbitHeadBob 3.8s ease-in-out infinite',
        transformOrigin: 'bottom center',
      }}>
        <svg viewBox="0 0 670 390" width="280" style={{ display:'block', overflow:'visible' }}>
          <g transform="translate(-55.376 -157.78)">
            {/* Blue rabbit — paths directly in layer1 */}
            <path fill="#0197fd" d="m253.05 248.9c6.3896 42.552-5.6816 79.637-26.962 82.833-21.28 3.1954-43.711-28.709-50.1-71.261-6.3896-42.552-1.7112-98.716 19.569-101.91 21.28-3.1954 51.104 47.788 57.493 90.34z"/>
            <path fill="#33b5e5" d="m246.38 250.35c4.7448 42.766-8.7468 79.359-30.134 81.732-21.387 2.3729-42.572-30.373-47.317-73.139-4.7448-42.766 2.0948-98.709 23.482-101.08 21.387-2.3729 49.224 49.722 53.969 92.489z"/>
            <path fill="#b3defd" d="m231.68 262.56c3.3244 29.964-6.719 57.311-17.65 58.524-10.931 1.2128-22.488-22.095-25.812-52.059-3.3244-29.964-1.8483-71.855 7.7353-66.458 17.06 9.606 32.403 30.029 35.727 59.994z"/>
            <path fill="#0197fd" d="m339.59 217.14c-28.641 15.604-58.932 60.763-67.657 100.87-8.7242 40.103 7.4219 59.964 36.063 44.36s56.916-48.285 65.64-88.388c8.7242-40.103-5.4054-72.441-34.047-56.838z"/>
            <path fill="#33b5e5" d="m335.79 214.46c-28.641 15.604-58.932 60.763-67.657 100.87-8.7242 40.103 7.4219 59.964 36.063 44.36s56.916-48.285 65.64-88.388c8.7242-40.103-5.4054-72.441-34.047-56.838z"/>
            <path fill="#b3defd" d="m337.93 300.75c-20.73 27.208-44.973 64.547-54.826 59.66-9.8526-4.8878-5.5167-33.691 9.6847-64.333s57.912-63.752 67.764-58.864c9.8527 4.8878-3.9095 38.976-22.623 63.538z"/>
            <path fill="#0197fd" d="m333.12 413.58c13.517 76.54-21.531 101.52-114.7 94.768-77.695-5.6297-126.58-42.603-110.6-96.04 24.106-80.614 55.773-99.167 111.91-91.381 71.762 9.9521 103.29 35.477 113.39 92.653z"/>
            <path fill="#33b5e5" d="m330.91 406.41c13.52 76.54-21.53 101.52-114.7 94.77-77.69-5.63-126.58-42.61-110.6-96.04 24.106-80.614 55.773-99.167 111.91-91.381 71.762 9.9521 103.29 35.477 113.39 92.653z"/>
            {/* Blue right eye */}
            <g className="rabbit-eye rabbit-eye-bl-r">
              <path fill="#ffffff" d="m439.85 398.94c0 17.534-14.602 31.748-32.613 31.748-18.012 0-32.614-14.214-32.614-31.748s14.602-31.748 32.614-31.748 32.613 14.214 32.613 31.748z" transform="matrix(.68404 .066160 -.068628 .70955 -104.56 100.61)"/>
              <path fill="#000000" d="m439.85 398.94c0 17.534-14.602 31.748-32.613 31.748-18.012 0-32.614-14.214-32.614-31.748s14.602-31.748 32.614-31.748 32.613 14.214 32.613 31.748z" transform="matrix(.48453 .046864 -.049972 .51667 -28.36 188.34)"/>
            </g>
            {/* Blue nose */}
            <path fill="#0169c9" d="m234.1 430.62c-.88242 9.1234-12.315 16.446-23.889 15.327-11.574-1.1194-18.907-10.257-18.025-19.381.88242-9.1234 9.86-7.8545 21.395-6.3288s21.401 1.2592 20.518 10.383z"/>
            {/* Blue mouth */}
            <path fill="none" stroke="#000" strokeLinecap="round" strokeMiterlimit="1.3" strokeWidth="3.4" d="m208.78 465.72c9.7958 7.461 26.743 19.035 33.639-14.507"/>
            {/* Blue cheeks */}
            <path fill="#b3defd" d="m169.45 453.52c-.73786 7.6288-7.7022 13.197-15.555 12.438-7.8532-.75956-13.621-7.5596-12.883-15.188.73786-7.6288 7.2174-12.424 15.071-11.665 7.8531.75956 14.106 6.7864 13.368 14.415z"/>
            <path fill="#b3defd" d="m282.35 464.85c-.73786 7.6288-7.7022 13.197-15.555 12.438-7.8531-.75956-13.621-7.5596-12.883-15.188.73786-7.6288 7.2174-12.424 15.071-11.665 7.8531.75956 14.106 6.7864 13.368 14.415z"/>
            {/* Blue left eye */}
            <g className="rabbit-eye rabbit-eye-bl-l">
              <path fill="#ffffff" d="m439.85 398.94c0 17.534-14.602 31.748-32.613 31.748-18.012 0-32.614-14.214-32.614-31.748s14.602-31.748 32.614-31.748 32.613 14.214 32.613 31.748z" transform="matrix(.68404 .066160 -.068628 .70955 40.98 112.74)"/>
              <path fill="#000000" d="m439.85 398.94c0 17.534-14.602 31.748-32.613 31.748-18.012 0-32.614-14.214-32.614-31.748s14.602-31.748 32.614-31.748 32.613 14.214 32.613 31.748z" transform="matrix(.50321 .048671 -.054304 .56145 108.8 181.59)"/>
            </g>
            {/* Blue whiskers left */}
            <path fill="none" stroke="#000" strokeLinecap="round" strokeWidth="2.004" d="m114.94 439.03c-21.115-6.4-38.093-7.97-54.982-16.35"/>
            <path fill="none" stroke="#000" strokeLinecap="round" strokeWidth="2.004" d="m113.66 444.57c-22.025-1.2812-38.898 1.1704-57.28-3.022"/>
            <path fill="none" stroke="#000" strokeLinecap="round" strokeWidth="2.004" d="m117.55 450.73c-21.595 4.5172-37.241 11.292-56.08 12.047"/>
            {/* Blue whiskers right */}
            <path fill="none" stroke="#000" strokeLinecap="round" strokeWidth="2.4941" d="m310.46 455.19c22.621 2.8356 40.426-.11032 58.872 6.9124"/>
            <path fill="none" stroke="#000" strokeLinecap="round" strokeWidth="2.4532" d="m308.32 459.67c24.46 7.7557 44.71 9.5436 63.75 19.795"/>
            <path fill="none" stroke="#000" strokeLinecap="round" strokeWidth="1.9746" d="m300.97 465.77c23.599 7.8535 40.029 16.432 61.226 20.656"/>

            {/* Pink rabbit — g4249 group */}
            <g transform="matrix(.99971 -.024068 .024068 .99971 -16.716 9.7687)">
              <path fill="#ff62ff" d="m567.06 272.18c3.5138 42.885 23.748 76.226 45.195 74.469 21.447-1.7573 35.984-37.947 32.471-80.832-3.5138-42.885-20.916-96.49-42.363-94.733-21.447 1.7573-38.817 58.211-35.303 101.1z"/>
              <path fill="#ff9bff" d="m562.99 271.93c3.5138 42.885 23.748 76.226 45.195 74.469 21.447-1.7573 35.984-37.947 32.471-80.832-3.5138-42.885-20.916-96.49-42.363-94.733-21.447 1.7573-38.817 58.211-35.303 101.1z"/>
              <path fill="#fdd99b" d="m573.93 285.85c2.462 30.047 17.545 54.971 28.507 54.073 10.962-.89816 17.852-25.984 15.39-56.032-2.462-30.047-11.915-70.884-20.291-63.756-14.91 12.689-26.068 35.667-23.606 65.715z"/>
              <path fill="#ff62ff" d="m542.29 204.42c9.7128 31.136.0444 84.647-21.595 119.52s-47.055 37.902-56.768 6.7653c-9.7128-31.136-7.2785-74.282 14.361-109.16 21.639-34.873 54.289-48.266 64.002-17.13z"/>
              <path fill="#ff9bff" d="m546.98 201.58c9.7128 31.136.0444 84.647-21.595 119.52s-47.055 37.902-56.768 6.7653c-9.7128-31.136-7.2785-74.282 14.361-109.16 21.639-34.873 54.289-48.266 64.002-17.13z"/>
              <path fill="#fdd99b" d="m485.86 267.55c-10.404 32.585-10.959 76.884-.48124 80.23 10.477 3.3454 27.405-20.358 37.809-52.943s10.345-61.712-.13226-65.058c-10.477-3.3454-26.792 5.1858-37.196 37.771z"/>
              <path fill="#ff67ff" d="m428.6 412.4c-14.865 73.567 19.727 98.014 112.98 92.547 77.763-4.5589 127.28-39.626 112.25-91.269-22.671-77.908-53.997-96.128-110.25-89.254-71.909 8.7877-103.88 33.021-114.98 87.976z"/>
              <path fill="#ff9bff" d="m427.94 404.35c-14.865 73.567 19.727 98.014 112.98 92.547 77.763-4.5589 127.28-39.626 112.25-91.269-22.671-77.908-49.099-92.047-105.35-85.172-71.909 8.7877-108.78 28.939-119.88 83.894z"/>
              <g className="rabbit-eye rabbit-eye-r">
                <path fill="#ffffff" d="m439.85 398.94c0 17.534-14.602 31.748-32.613 31.748-18.012 0-32.614-14.214-32.614-31.748s14.602-31.748 32.614-31.748 32.613 14.214 32.613 31.748z" transform="matrix(-.68493 .056121 .058213 .71048 867.53 101.08)"/>
                <path fill="#000000" d="m439.85 398.94c0 17.534-14.602 31.748-32.613 31.748-18.012 0-32.614-14.214-32.614-31.748s14.602-31.748 32.614-31.748 32.613 14.214 32.613 31.748z" transform="matrix(-.48521 .041679 .041923 .53669 790.76 178.78)"/>
              </g>
              <path fill="#565248" d="m517.42 429.29c.70518 8.6064 11.153 15.68 21.831 14.805 10.678-.87493 17.544-9.3675 16.838-17.974-.70518-8.6064-10.383-8.4011-21.061-7.5262-10.678.87493-18.313 2.0882-17.608 10.695z"/>
              <path fill="none" stroke="#000" strokeLinecap="round" strokeMiterlimit="1.3" strokeWidth="3.6786" d="m562.76 450.02c-5.3948 11.529-15.525 30.343-42.498 5.5274"/>
              <path fill="#fdd99b" d="m584.54 456.34c.62588 7.6388 7.5078 13.309 15.371 12.665 7.8634-.64429 13.731-7.359 13.105-14.998-.62589-7.6388-7.0344-12.529-14.898-11.884-7.8634.64429-14.204 6.5788-13.578 14.218z"/>
              <path fill="#fdd99b" d="m480.75 462.38c.61348 7.6385 7.3879 13.306 15.131 12.659 7.7432-.64719 13.523-7.364 12.909-15.002-.61348-7.6385-6.922-12.526-14.665-11.879-7.7432.6472-13.989 6.584-13.375 14.222z"/>
              <g className="rabbit-eye rabbit-eye-l">
                <path fill="#ffffff" d="m439.85 398.94c0 17.534-14.602 31.748-32.613 31.748-18.012 0-32.614-14.214-32.614-31.748s14.602-31.748 32.614-31.748 32.613 14.214 32.613 31.748z" transform="matrix(-.68493 .056121 .058213 .71048 721.83 111.07)"/>
                <path fill="#000000" d="m439.85 398.94c0 17.534-14.602 31.748-32.613 31.748-18.012 0-32.614-14.214-32.614-31.748s14.602-31.748 32.614-31.748 32.613 14.214 32.613 31.748z" transform="matrix(-.50387 .041285 .046064 .56219 653.83 178.85)"/>
              </g>
              <path fill="none" stroke="#000" strokeLinecap="round" strokeWidth="2.004" d="m443.2 453.36c-21.417-5.2956-38.454-5.9776-55.756-13.468"/>
              <path fill="none" stroke="#000" strokeLinecap="round" strokeWidth="2.004" d="m444.26 459.81c-22.046.8451-38.604 4.9097-57.304 2.5064"/>
              <path fill="none" stroke="#000" strokeLinecap="round" strokeWidth="2.004" d="m447.23 464.56c-21.059 6.5751-35.981 14.824-54.66 17.39"/>
              <path fill="none" stroke="#000" strokeLinecap="round" strokeWidth="1.8367" d="m641.32 432.28c23.74-5.8462 43.157-7.9523 61.852-14.99"/>
              <path fill="none" stroke="#000" strokeLinecap="round" strokeWidth="1.8367" d="m640.8 436.04c25.476.6143 44.611 3.5689 66.221 1.8219"/>
              <path fill="none" stroke="#000" strokeLinecap="round" strokeWidth="1.8367" d="m635.36 442.01c24.336 4.7794 41.58 10.776 63.165 12.641"/>
            </g>
          </g>
        </svg>
      </div>
    </div>
  )
}

/* ── Bush ────────────────────────────────────────────────── */
function Bush({ w=80, h=50, style={} }: { w?:number; h?:number; style?:React.CSSProperties }) {
  return (
    <div style={{
      height: h, width: w,
      borderRadius: `${Math.round(h*0.6)}px ${Math.round(h*0.6)}px ${Math.round(h*0.45)}px ${Math.round(h*0.45)}px`,
      background: 'radial-gradient(ellipse at 40% 30%, #8FCC3A, #6AAA1E)',
      boxShadow: `inset 0 -${Math.round(h*0.14)}px 0 #4A8A10, 0 3px 6px rgba(0,0,0,0.15)`,
      ...style,
    }}/>
  )
}

/* ── Flower ──────────────────────────────────────────────── */
function Flower({ x, y, color='#FFD23F', size=18 }: { x:string; y:string; color?:string; size?:number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24"
      style={{ position:'absolute', left:x, top:y, pointerEvents:'none', zIndex:2 }}>
      {Array.from({length:5}).map((_,i) => {
        const a = (i/5)*Math.PI*2
        return (
          <ellipse key={i}
            cx={12+Math.cos(a)*5} cy={12+Math.sin(a)*5}
            rx="3.5" ry="2.4"
            transform={`rotate(${(i/5)*360} ${12+Math.cos(a)*5} ${12+Math.sin(a)*5})`}
            fill={color}/>
        )
      })}
      <circle cx="12" cy="12" r="3.5" fill="white"/>
    </svg>
  )
}

/* ── GO button ───────────────────────────────────────────── */
function GoButton({ onClick }: { onClick:()=>void }) {
  const [down, setDown] = useState(false)
  return (
    <button
      onMouseDown={()=>setDown(true)}
      onMouseUp={()=>{ setDown(false); onClick() }}
      onMouseLeave={()=>setDown(false)}
      onTouchStart={e=>{ e.preventDefault(); setDown(true) }}
      onTouchEnd={()=>{ setDown(false); onClick() }}
      style={{
        background: 'linear-gradient(180deg,#FFE84C 0%,#FFDA33 100%)',
        border: '4px solid #4A4E2A',
        borderRadius: 99,
        padding: '15px 62px',
        fontSize: 28,
        fontWeight: 900,
        color: '#2D2B10',
        cursor: 'pointer',
        fontFamily: KF,
        letterSpacing: '0.06em',
        transform: down ? 'translateY(6px)' : 'translateY(0)',
        boxShadow: down
          ? '0 2px 0 #4A4E2A, 0 4px 10px rgba(0,0,0,0.18)'
          : '0 8px 0 #4A4E2A, 0 14px 24px rgba(0,0,0,0.26)',
        transition: 'transform 0.08s, box-shadow 0.08s',
        animation: 'popIn 0.45s cubic-bezier(0.34,1.56,0.64,1) 0.6s both',
      }}
    >
      GO !
    </button>
  )
}

/* ── Main ─────────────────────────────────────────────────── */
export default function KidsWelcome({ profile, onEnter }: { profile: ChildProfile; onEnter:()=>void }) {
  const [parentsOpen, setParentsOpen] = useState(false)
  const repelEls = useRef<(HTMLDivElement | null)[]>(new Array(LETTERS.length).fill(null))

  /* Mouse repulsion — zero React re-renders, pure DOM mutation at rAF rate */
  useEffect(() => {
    let raf = 0
    const mouse = { x: 0, y: 0 }
    let active = false

    const update = () => {
      if (!active) return
      const vw = window.innerWidth
      const vh = window.innerHeight
      LETTERS.forEach((def, i) => {
        const el = repelEls.current[i]
        if (!el) return
        const cx = (parseFloat(def.x) / 100) * vw + def.size / 2
        const cy = (parseFloat(def.y) / 100) * vh + (def.size * 1.14) / 2
        const dx = cx - mouse.x
        const dy = cy - mouse.y
        const dist = Math.hypot(dx, dy)
        if (dist < 210 && dist > 0) {
          const force = Math.pow(1 - dist / 210, 1.6) * 155
          el.style.transition = 'transform 0.08s ease-out'
          el.style.transform  = `translate(${(dx / dist) * force}px,${(dy / dist) * force}px)`
        } else if (el.style.transform) {
          el.style.transition = 'transform 0.65s cubic-bezier(0.34,1.56,0.64,1)'
          el.style.transform  = ''
        }
      })
    }

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      active  = true
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf) }
  }, [])

  return (
    <div style={{
      minHeight: '100dvh',
      background: 'linear-gradient(180deg, #C8EAFF 0%, #B0DC60 42%, #A0C840 68%, #8CB428 100%)',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: '14vh',   /* shift visual center upward */
      fontFamily: KF,
      userSelect: 'none',
    }}>
      <style>{EXTRA_CSS}</style>

      <ThaiVillage />

      {/* Ground */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '18%',
        background: 'linear-gradient(180deg, #90C030 0%, #7AAC20 100%)',
        zIndex: 1,
      }}/>

      {/* Bushes */}
      <Bush w={92} h={58} style={{ position:'absolute', bottom:'15%', left:'0%',  zIndex:2 }}/>
      <Bush w={68} h={44} style={{ position:'absolute', bottom:'15%', left:'9%',  zIndex:2 }}/>
      <Bush w={84} h={52} style={{ position:'absolute', bottom:'15%', right:'1%', zIndex:2 }}/>
      <Bush w={60} h={38} style={{ position:'absolute', bottom:'15%', right:'10%',zIndex:2 }}/>

      {/* Flowers */}
      <Flower x="22%" y="81%" color="#FF8C35" size={22}/>
      <Flower x="26%" y="83%" color="#FFD23F" size={16}/>
      <Flower x="58%" y="82%" color="#FB6A85" size={20}/>
      <Flower x="62%" y="84%" color="#FFD23F" size={15}/>
      <Flower x="35%" y="83%" color="#4FD175" size={14}/>

      {/* Rabbits */}
      <Rabbits />

      {/* Thai letter tiles */}
      {LETTERS.map((def, i) => (
        <LetterChar
          key={i}
          def={def}
          repelRef={el => { repelEls.current[i] = el }}
        />
      ))}

      {/* Parents button */}
      <button
        onClick={()=>setParentsOpen(true)}
        style={{
          position: 'absolute', top: 18, left: 18, zIndex: 10,
          padding: '9px 20px',
          background: '#ABDBB6',
          border: '3px solid #3A3A28',
          borderRadius: 99,
          fontWeight: 700, fontSize: 13,
          color: '#2A2A18', cursor: 'pointer',
          fontFamily: KF,
          boxShadow: '0 4px 0 #3A3A28',
          transition: 'transform 0.08s, box-shadow 0.08s',
        }}
        onMouseDown={e=>{ e.currentTarget.style.transform='translateY(3px)'; e.currentTarget.style.boxShadow='0 1px 0 #3A3A28' }}
        onMouseUp={e=>{ e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='0 4px 0 #3A3A28' }}
      >
        Parents
      </button>

      {/* Central content */}
      <div style={{
        position: 'relative', zIndex: 5,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: 16,
      }}>
        {/* Pikko bubble — no shadow, 15% bigger */}
        <div style={{
          background: '#232120',
          borderRadius: '62px 82px 74px 68px / 72px 62px 82px 68px',
          padding: '25px 51px 30px',
          boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.07)',
          display: 'flex',
          alignItems: 'baseline',
          gap: 2,
          animation: 'popIn 0.5s cubic-bezier(0.34,1.56,0.64,1) both',
        }}>
          {PIKKO.map(({char, color}, i) => (
            <span key={i} style={{
              fontFamily: KF,
              fontWeight: 900,
              fontSize: 'clamp(3.4rem,14vw,6.3rem)',
              color,
              lineHeight: 1.1,
              display: 'inline-block',
              textShadow: `0 0 24px ${color}88, 0 2px 0 rgba(0,0,0,0.35)`,
              animation: `popIn 0.4s cubic-bezier(0.34,1.56,0.64,1) ${0.08 + i * 0.10}s both`,
            }}>
              {char}
            </span>
          ))}
        </div>

        {/* Profile pill */}
        <div style={{
          background: '#232120',
          borderRadius: 99,
          padding: '10px 22px',
          color: 'white',
          fontWeight: 700,
          fontSize: 17,
          display: 'flex', alignItems: 'center', gap: 10,
          boxShadow: '0 5px 0 #0E0D0D, 0 10px 20px rgba(0,0,0,0.30)',
          animation: 'popIn 0.45s cubic-bezier(0.34,1.56,0.64,1) 0.38s both',
        }}>
          <TigerAvatar size={30}/>
          <span>{profile.child_name}</span>
        </div>

        <GoButton onClick={onEnter}/>
      </div>

      {parentsOpen && <ForParentsModal onClose={()=>setParentsOpen(false)}/>}
    </div>
  )
}
