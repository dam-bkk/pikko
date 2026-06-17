'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { Book } from '@/lib/types';

interface Props {
  book: Book;
  onReadAgain: () => void;
}

const CONFETTI_COLORS = ['#F4C95D', '#E8A598', '#B8D4B0', '#2D3E5C', '#fff'];

interface Piece {
  id: number;
  x: number;
  color: string;
  delay: number;
  size: number;
}

export default function RewardScreen({ book, onReadAgain }: Props) {
  const [pieces, setPieces] = useState<Piece[]>([]);

  useEffect(() => {
    setPieces(
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        delay: Math.random() * 1,
        size: 8 + Math.random() * 10,
      }))
    );
  }, []);

  return (
    <div
      className="min-h-dvh flex flex-col items-center justify-center overflow-hidden relative"
      style={{ backgroundColor: '#FDF6E8' }}
    >
      {/* Confetti */}
      {pieces.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-sm pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: -20,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            animation: `confettiFall 2s ease-in ${p.delay}s forwards`,
          }}
        />
      ))}

      {/* Stars */}
      <div className="flex gap-3 mb-6">
        {[0, 0.3, 0.6].map((delay, i) => (
          <svg
            key={i}
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="#F4C95D"
            style={{
              animation: `bounceIn 0.5s ease-out ${delay}s both`,
            }}
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        ))}
      </div>

      <div className="text-center px-8">
        <p
          className="thai-text text-4xl font-bold mb-2"
          style={{ color: '#2D3E5C', fontFamily: 'var(--font-thai-serif), serif' }}
        >
          เก่งมาก!
        </p>
        <p className="text-xl font-semibold mb-1" style={{ color: '#2D3E5C' }}>
          Well done!
        </p>
        <p className="text-base mb-8" style={{ color: '#2D3E5C', opacity: 0.6 }}>
          {book.title_thai} · {book.title_english}
        </p>
      </div>

      <div className="flex flex-col gap-4 w-64">
        <button
          onClick={onReadAgain}
          className="w-full h-14 rounded-2xl font-bold text-lg transition-transform active:scale-95"
          style={{ backgroundColor: '#F4C95D', color: '#2D3E5C' }}
        >
          อ่านอีกครั้ง
        </button>
        <Link
          href="/"
          className="w-full h-14 rounded-2xl font-bold text-lg flex items-center justify-center transition-transform active:scale-95"
          style={{ backgroundColor: '#2D3E5C', color: '#FDF6E8' }}
        >
          กลับหน้าหลัก
        </Link>
      </div>

      <style jsx global>{`
        @keyframes bounceIn {
          0% { transform: scale(0) rotate(-30deg); opacity: 0; }
          60% { transform: scale(1.3) rotate(5deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
