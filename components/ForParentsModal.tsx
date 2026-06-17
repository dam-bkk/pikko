'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const NUM_WORDS = ['one','two','three','four','five','six','seven','eight','nine','ten']
const HOLD_WORDS: Record<number, string> = { 3: 'three', 4: 'four', 5: 'five' }
const VARIANTS: Array<'yellow' | 'orange'> = ['yellow','orange','yellow','orange','yellow','orange']
const COLORS = { yellow: '#FFD23F', orange: '#FF8C35' }

interface ForParentsModalProps {
  onClose: () => void
}

export default function ForParentsModal({ onClose }: ForParentsModalProps) {
  const router = useRouter()

  const [circles] = useState<number[]>(() => {
    const pool = Array.from({ length: 10 }, (_, i) => i + 1)
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[pool[i], pool[j]] = [pool[j], pool[i]]
    }
    return pool.slice(0, 6)
  })

  const [targetIdx]    = useState(() => Math.floor(Math.random() * 6))
  const [holdDuration] = useState<3 | 4 | 5>(() => ([3, 4, 5] as const)[Math.floor(Math.random() * 3)])

  const [progress, setProgress] = useState(0)
  const [granted,  setGranted]  = useState(false)
  const [wrongIdx, setWrongIdx] = useState<number | null>(null)
  const holdRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const targetWord = NUM_WORDS[circles[targetIdx] - 1]
  const holdWord   = HOLD_WORDS[holdDuration]

  useEffect(() => () => { if (holdRef.current) clearInterval(holdRef.current) }, [])

  const startHold = useCallback((idx: number) => {
    if (granted) return
    if (idx !== targetIdx) {
      setWrongIdx(idx)
      setTimeout(() => setWrongIdx(null), 500)
      return
    }
    if (holdRef.current) return
    const TICK = 50
    const step = 100 / ((holdDuration * 1000) / TICK)
    holdRef.current = setInterval(() => {
      setProgress(p => {
        const next = p + step
        if (next >= 100) {
          clearInterval(holdRef.current!)
          holdRef.current = null
          setGranted(true)
          setTimeout(() => router.push('/parent'), 500)
          return 100
        }
        return next
      })
    }, TICK)
  }, [granted, targetIdx, holdDuration, router])

  const endHold = useCallback(() => {
    if (holdRef.current) {
      clearInterval(holdRef.current)
      holdRef.current = null
    }
    setProgress(p => (p >= 100 ? p : 0))
  }, [])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.60)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full"
        style={{
          maxWidth: 460,
          background: 'linear-gradient(150deg, #2D1278 0%, #7C2DFF 100%)',
          borderRadius: '5.25rem',
          padding: '2.75rem 2.25rem 2.5rem',
          animation: 'popIn 0.35s cubic-bezier(0.34,1.56,0.64,1) both',
        }}
        onClick={e => e.stopPropagation()}
      >

        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute', top: 0, right: '0.5rem',
            transform: 'translateY(-35%)',
            width: 62, height: 62, borderRadius: '50%',
            background: '#FF6635', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
            <line x1="4" y1="4" x2="22" y2="22" stroke="#FFD23F" strokeWidth="3.8" strokeLinecap="round"/>
            <line x1="22" y1="4" x2="4"  y2="22" stroke="#FFD23F" strokeWidth="3.8" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Title */}
        <h2 style={{
          color: 'white',
          fontSize: 'clamp(2.2rem, 6vw, 2.8rem)',
          fontWeight: 900,
          letterSpacing: '-0.02em',
          lineHeight: 1,
          marginBottom: '1.25rem',
          textAlign: 'center',
        }}>
          for parents
        </h2>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.25)', marginBottom: '1.25rem' }} />

        {/* Instruction */}
        <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 600, fontSize: '1.15rem', lineHeight: 1.6 }}>
            Press <strong style={{ fontWeight: 900, color: '#FFD23F' }}>{targetWord}</strong>
          </p>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 600, fontSize: '1.15rem', lineHeight: 1.6 }}>
            Hold for <strong style={{ fontWeight: 900, color: '#FFD23F' }}>{holdWord}</strong> seconds to unlock
          </p>
        </div>

        {/* Progress bar */}
        <div style={{
          width: '100%', height: 38,
          background: 'rgba(0,0,0,0.30)',
          borderRadius: 6, overflow: 'hidden',
          marginBottom: '2rem',
        }}>
          <div style={{
            height: '100%',
            width: `${progress}%`,
            background: granted ? '#FF8C35' : '#FFD23F',
            borderRadius: 6,
            transition: progress === 0 ? 'width 0.2s ease' : 'none',
          }} />
        </div>

        {/* Circles — 3×2 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.25rem',
        }}>
          {circles.map((num, i) => {
            const isWrong  = wrongIdx === i
            const variant  = VARIANTS[i]
            const innerBg  = isWrong ? '#FF6666' : COLORS[variant]
            const outerBg  = isWrong ? 'rgba(255,50,50,0.5)' : 'rgba(0,0,0,0.30)'
            return (
              <div key={i} style={{ display: 'flex', justifyContent: 'center' }}>
                <div
                  onMouseDown={() => startHold(i)}
                  onMouseUp={endHold}
                  onMouseLeave={endHold}
                  onTouchStart={e => { e.preventDefault(); startHold(i) }}
                  onTouchEnd={endHold}
                  style={{
                    width: 94, height: 94, borderRadius: '50%',
                    background: outerBg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer',
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    transition: 'background 0.15s, transform 0.1s',
                    transform: isWrong ? 'scale(0.9)' : 'scale(1)',
                  } as React.CSSProperties}
                >
                  <div style={{
                    width: 76, height: 76, borderRadius: '50%',
                    background: innerBg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'background 0.15s',
                  }}>
                    <span style={{
                      color: '#1A0845',
                      fontSize: '1.875rem',
                      fontWeight: 900,
                      lineHeight: 1,
                      letterSpacing: '-0.03em',
                    }}>
                      {num}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Granted overlay text */}
        {granted && (
          <p style={{
            textAlign: 'center',
            marginTop: '1.5rem',
            color: 'white',
            fontWeight: 900,
            fontSize: '1.1rem',
            letterSpacing: '0.05em',
            animation: 'popIn 0.3s ease both',
          }}>
            Unlocking…
          </p>
        )}

      </div>
    </div>
  )
}
