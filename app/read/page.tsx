'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Book } from '@/lib/types';

interface BooksResponse {
  books: Book[];
  favorites: string[];
}

const BOOK_COLORS = ['#B8D4B0', '#E8A598', '#F4C95D', '#c4d4e8'];
const BOOK_EMOJIS = ['🐕', '🥭', '🌸', '🌿'];

function CoverImage({ bookId, fallbackEmoji }: { bookId: string; fallbackEmoji: string }) {
  const [ext, setExt] = useState<'jpg' | 'png' | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const img = new window.Image();
    img.onload = () => setExt('jpg');
    img.onerror = () => {
      const img2 = new window.Image();
      img2.onload = () => setExt('png');
      img2.onerror = () => setFailed(true);
      img2.src = `/books/${bookId}/cover.png`;
    };
    img.src = `/books/${bookId}/cover.jpg`;
  }, [bookId]);

  if (!failed && ext) {
    return (
      <Image
        src={`/books/${bookId}/cover.${ext}`}
        alt={bookId}
        fill
        sizes="20vw"
        className="object-cover"
        priority
      />
    );
  }

  return (
    <span className="text-5xl select-none" role="img">
      {fallbackEmoji}
    </span>
  );
}

type BookFont = 'school' | 'rounded' | 'classic';

const FONT_OPTIONS: { key: BookFont; label: string; style: string }[] = [
  { key: 'school',   label: 'ก',  style: "var(--font-thai-school), 'Sarabun', sans-serif" },
  { key: 'rounded',  label: 'ก',  style: "var(--font-thai-sans), 'Mitr', sans-serif" },
  { key: 'classic',  label: 'ก',  style: "var(--font-thai-serif), 'Noto Serif Thai', serif" },
];

export default function ReadHome() {
  const [data, setData] = useState<BooksResponse | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [bookFont, setBookFont] = useState<BookFont>('school');

  const currentFont = FONT_OPTIONS.find(f => f.key === bookFont)!.style;

  useEffect(() => {
    fetch('/api/books')
      .then((r) => r.json())
      .then((d: BooksResponse) => {
        setData(d);
        setFavorites(new Set(d.favorites));
      });
  }, []);

  async function toggleFav(e: React.MouseEvent, bookId: string) {
    e.preventDefault();
    const res = await fetch('/api/favorites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookId }),
    });
    const { isFavorite } = await res.json();
    setFavorites((prev) => {
      const next = new Set(prev);
      if (isFavorite) next.add(bookId);
      else next.delete(bookId);
      return next;
    });
  }

  return (
    <div className="min-h-dvh" style={{ backgroundColor: '#FDF6E8' }}>
      <header className="flex items-center justify-between px-5 pt-8 pb-3">
        <div>
          <h1
            className="text-2xl font-bold tracking-tight"
            style={{ color: '#2D3E5C', fontFamily: currentFont }}
          >
            อ่านดี
          </h1>
        </div>
        <div className="flex items-center gap-2">
          {/* Font switcher */}
          <div className="flex items-center gap-1 rounded-full p-1" style={{ backgroundColor: 'rgba(45,62,92,0.08)' }}>
            {FONT_OPTIONS.map((f) => (
              <button
                key={f.key}
                onClick={() => setBookFont(f.key)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-150"
                style={{
                  fontFamily: f.style,
                  backgroundColor: bookFont === f.key ? '#2D3E5C' : 'transparent',
                  color: bookFont === f.key ? 'white' : '#2D3E5C',
                }}
                aria-label={`Font: ${f.key}`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <Link
            href="/parent"
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ backgroundColor: '#2D3E5C' }}
            aria-label="Parent dashboard"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </Link>
        </div>
      </header>

      <main className="px-4 pt-2 pb-10">
        {!data ? (
          <div className="flex items-center justify-center h-48">
            <div
              className="w-8 h-8 rounded-full border-4 animate-spin"
              style={{ borderColor: '#2D3E5C', borderTopColor: 'transparent' }}
            />
          </div>
        ) : (
          <div className="grid grid-cols-5 gap-3">
            {data.books.map((book, i) => (
              <Link
                key={book.id}
                href={`/books/${book.id}`}
                className="relative rounded-2xl overflow-hidden shadow-sm active:scale-95 transition-transform duration-150 flex flex-col"
                style={{ backgroundColor: BOOK_COLORS[i % BOOK_COLORS.length] }}
              >
                <div
                  className="w-full aspect-[3/4] relative flex items-center justify-center"
                  style={{ backgroundColor: BOOK_COLORS[i % BOOK_COLORS.length] }}
                >
                  <CoverImage bookId={book.id} fallbackEmoji={BOOK_EMOJIS[i % BOOK_EMOJIS.length]} />
                </div>
                <div className="px-2 py-2">
                  <p
                    className="text-sm font-bold leading-tight truncate"
                    style={{ color: '#2D3E5C', fontFamily: currentFont }}
                  >
                    {book.title_thai}
                  </p>
                  <p className="text-xs mt-0.5 truncate" style={{ color: '#2D3E5C', opacity: 0.6 }}>
                    {book.title_english}
                  </p>
                </div>
                <button
                  onClick={(e) => toggleFav(e, book.id)}
                  className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(255,255,255,0.75)' }}
                  aria-label={favorites.has(book.id) ? 'Remove from favorites' : 'Add to favorites'}
                >
                  <svg
                    width="13" height="13" viewBox="0 0 24 24"
                    fill={favorites.has(book.id) ? '#E8A598' : 'none'}
                    stroke="#E8A598" strokeWidth="2"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>
              </Link>
            ))}
          </div>
        )}
        {data && data.books.length === 0 && (
          <p className="text-center mt-20 text-lg" style={{ color: '#2D3E5C', opacity: 0.5 }}>
            ยังไม่มีหนังสือ
          </p>
        )}
      </main>
    </div>
  );
}
