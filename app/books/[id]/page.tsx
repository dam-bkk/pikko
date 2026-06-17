'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Book, Page, KaraokeTimestamp } from '@/lib/types';
import RewardScreen from '@/components/RewardScreen';

interface Props {
  params: Promise<{ id: string }>;
}

export default function ReaderPage({ params }: Props) {
  const { id } = use(params);

  const [book, setBook] = useState<Book | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [activeSyllable, setActiveSyllable] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [showVocab, setShowVocab] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const touchStartX = useRef<number>(0);

  useEffect(() => {
    fetch(`/api/books/${id}`)
      .then((r) => r.json())
      .then(({ book: b }: { book: Book }) => setBook(b));
  }, [id]);

  useEffect(() => {
    if (!book) return;
    fetch('/api/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'start', bookId: book.id }),
    })
      .then((r) => r.json())
      .then(({ sessionId: sid }) => setSessionId(sid));
  }, [book]);

  useEffect(() => {
    if (!book || !autoPlay) return;
    const timer = setTimeout(() => playPage(), 500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, book]);

  function playPage() {
    if (!book) return;
    const page = book.pages[currentPage];
    simulateKaraoke(page.audio_specs.karaoke_timestamps);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.src = `/books/${book.id}/page-${page.page_number}.mp3`;
      audioRef.current.play().catch(() => {});
    }
  }

  function simulateKaraoke(timestamps: KaraokeTimestamp[]) {
    setActiveSyllable(-1);
    timestamps.forEach((ts, idx) => {
      setTimeout(() => setActiveSyllable(idx), ts.start_ms);
      if (idx === timestamps.length - 1) {
        setTimeout(() => {
          setActiveSyllable(-1);
          setIsPlaying(false);
        }, ts.end_ms + 200);
      }
    });
  }

  const saveProgress = useCallback(
    async (pageIdx: number, done: boolean) => {
      if (!book || !sessionId) return;
      const vocabOnPage = book.pages
        .slice(0, pageIdx + 1)
        .flatMap((p) => p.new_vocabulary.map((v) => v.split(' ')[0]));
      await fetch('/api/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update',
          bookId: book.id,
          sessionId,
          pagesRead: pageIdx + 1,
          completed: done,
          vocabWords: vocabOnPage,
        }),
      });
    },
    [book, sessionId]
  );

  function goNext() {
    if (!book) return;
    if (currentPage < book.pages.length - 1) {
      const next = currentPage + 1;
      setCurrentPage(next);
      saveProgress(next, false);
    } else {
      saveProgress(currentPage, true);
      setCompleted(true);
    }
  }

  function goPrev() {
    if (currentPage > 0) setCurrentPage((p) => p - 1);
  }

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    const dx = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 60) dx > 0 ? goNext() : goPrev();
  }

  if (!book) {
    return (
      <div className="min-h-dvh flex items-center justify-center" style={{ backgroundColor: '#FDF6E8' }}>
        <div className="w-12 h-12 rounded-full border-4 animate-spin"
          style={{ borderColor: '#2D3E5C', borderTopColor: 'transparent' }} />
      </div>
    );
  }

  if (completed) return <RewardScreen book={book} onReadAgain={() => { setCompleted(false); setCurrentPage(0); }} />;

  const page: Page = book.pages[currentPage];
  const syllables = page.syllable_breakdown.split(' / ');

  return (
    <div
      className="min-h-dvh flex flex-col no-select overflow-hidden"
      style={{ backgroundColor: '#1a2535' }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* ── ILLUSTRATION — fills top portion ── */}
      <div className="relative flex-1 min-h-0" style={{ minHeight: '55dvh' }}>
        <PageIllustration bookId={book.id} pageNumber={page.page_number} />

        {/* Gradient fade into bottom panel */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent, #FDF6E8)',
          }}
        />

        {/* Top controls overlaid on image */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 pt-10 pb-4">
          <Link
            href="/"
            className="w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm"
            style={{ backgroundColor: 'rgba(255,255,255,0.25)' }}
            aria-label="Back"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
          </Link>

          {/* Progress dots */}
          <div className="flex items-center gap-1.5">
            {book.pages.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === currentPage ? 20 : 6,
                  height: 6,
                  backgroundColor: i === currentPage ? 'white' : 'rgba(255,255,255,0.45)',
                }}
              />
            ))}
          </div>

          {/* Auto-play toggle */}
          <button
            onClick={() => setAutoPlay((a) => !a)}
            className="w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm"
            style={{ backgroundColor: autoPlay ? 'rgba(244,201,93,0.85)' : 'rgba(255,255,255,0.25)' }}
            aria-label={autoPlay ? 'Disable auto-play' : 'Enable auto-play'}
          >
            <svg width="15" height="15" viewBox="0 0 24 24"
              fill={autoPlay ? '#2D3E5C' : 'white'}>
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </button>
        </div>

        {/* Side tap zones for navigation */}
        <button
          onClick={goPrev}
          disabled={currentPage === 0}
          className="absolute left-0 top-1/4 bottom-1/4 w-16 flex items-center justify-start pl-3 transition-opacity"
          style={{ opacity: currentPage === 0 ? 0 : 0.6 }}
          aria-label="Previous page"
        >
          <div className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'rgba(255,255,255,0.3)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </div>
        </button>

        <button
          onClick={goNext}
          className="absolute right-0 top-1/4 bottom-1/4 w-16 flex items-center justify-end pr-3"
          style={{ opacity: 0.6 }}
          aria-label="Next page"
        >
          <div className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'rgba(255,255,255,0.3)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </div>
        </button>
      </div>

      {/* ── BOTTOM PANEL ── */}
      <div
        className="rounded-t-[2rem] px-6 pt-6 pb-8 flex flex-col items-center gap-4"
        style={{ backgroundColor: '#FDF6E8', minHeight: '38dvh' }}
      >
        {/* Thai text — karaoke */}
        <div className="flex items-center justify-center gap-1 flex-wrap">
          {syllables.map((syl, idx) => {
            const isActive = activeSyllable === idx;
            return (
              <span
                key={idx}
                className="transition-all duration-100 rounded-xl px-2 py-0.5"
                style={{
                  fontFamily: 'var(--font-thai-serif), serif',
                  fontSize: 'clamp(2.2rem, 6vw, 3rem)',
                  fontWeight: 700,
                  lineHeight: 1.4,
                  color: isActive ? '#2D3E5C' : '#2D3E5C',
                  backgroundColor: isActive ? '#F4C95D' : 'transparent',
                  transform: isActive ? 'scale(1.12)' : 'scale(1)',
                  display: 'inline-block',
                }}
              >
                {syl}
              </span>
            );
          })}
        </div>

        {/* English */}
        <p className="text-base text-center" style={{ color: '#2D3E5C', opacity: 0.55 }}>
          {page.english_translation}
        </p>

        {/* Controls row */}
        <div className="flex items-center justify-center gap-6 mt-1 w-full">
          {/* Prev */}
          <button
            onClick={goPrev}
            disabled={currentPage === 0}
            className="w-12 h-12 rounded-full flex items-center justify-center transition-opacity"
            style={{ backgroundColor: 'rgba(45,62,92,0.1)', opacity: currentPage === 0 ? 0.25 : 1 }}
            aria-label="Previous page"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2D3E5C" strokeWidth="2.5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Play button */}
          <button
            onClick={playPage}
            className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-90"
            style={{
              backgroundColor: isPlaying ? '#B8D4B0' : '#F4C95D',
              boxShadow: '0 8px 24px rgba(244,201,93,0.45)',
            }}
            aria-label="Play audio"
          >
            {isPlaying ? (
              <svg width="26" height="26" viewBox="0 0 24 24" fill="#2D3E5C">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg width="26" height="26" viewBox="0 0 24 24" fill="#2D3E5C" style={{ marginLeft: 3 }}>
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            )}
          </button>

          {/* Next */}
          <button
            onClick={goNext}
            className="w-12 h-12 rounded-full flex items-center justify-center transition-transform active:scale-90"
            style={{ backgroundColor: '#2D3E5C' }}
            aria-label="Next page"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* Vocab trigger */}
        {page.new_vocabulary.length > 0 && (
          <button
            onClick={() => setShowVocab(true)}
            className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full mt-1"
            style={{ backgroundColor: 'rgba(45,62,92,0.08)', color: '#2D3E5C' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
            {page.new_vocabulary.length} new word{page.new_vocabulary.length > 1 ? 's' : ''}
          </button>
        )}
      </div>

      {/* Vocab sheet */}
      {showVocab && (
        <div className="fixed inset-0 bg-black/40 flex items-end z-50" onClick={() => setShowVocab(false)}>
          <div
            className="w-full rounded-t-3xl p-6 max-h-[60dvh] overflow-y-auto"
            style={{ backgroundColor: '#FDF6E8' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-1 rounded-full mx-auto mb-5" style={{ backgroundColor: 'rgba(45,62,92,0.2)' }} />
            <h2 className="text-base font-bold mb-4" style={{ color: '#2D3E5C' }}>คำศัพท์ใหม่</h2>
            {page.new_vocabulary.map((v, i) => (
              <div key={i} className="flex items-center gap-4 py-3 border-b"
                style={{ borderColor: 'rgba(45,62,92,0.08)' }}>
                <span className="text-3xl font-bold" style={{ fontFamily: 'var(--font-thai-serif), serif', color: '#2D3E5C' }}>
                  {v.split(' (')[0]}
                </span>
                <span className="text-sm" style={{ color: '#2D3E5C', opacity: 0.55 }}>
                  {v.replace(/^[^ ]+ /, '')}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />
    </div>
  );
}

function PageIllustration({ bookId, pageNumber }: { bookId: string; pageNumber: number }) {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    setSrc(null);
    const tryJpg = new window.Image();
    tryJpg.onload = () => setSrc(`/books/${bookId}/page-${pageNumber}.jpg`);
    tryJpg.onerror = () => {
      const tryPng = new window.Image();
      tryPng.onload = () => setSrc(`/books/${bookId}/page-${pageNumber}.png`);
      tryPng.onerror = () => setSrc('');
      tryPng.src = `/books/${bookId}/page-${pageNumber}.png`;
    };
    tryJpg.src = `/books/${bookId}/page-${pageNumber}.jpg`;
  }, [bookId, pageNumber]);

  if (src === null) return <div className="w-full h-full" style={{ backgroundColor: '#2a3a52' }} />;

  if (src === '') {
    return (
      <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: '#2a3a52' }}>
        <span className="text-8xl select-none">{pageNumber % 2 === 0 ? '🌿' : '🌸'}</span>
      </div>
    );
  }

  return (
    <Image src={src} alt={`Page ${pageNumber}`} fill sizes="100vw" className="object-cover" priority={pageNumber === 1} />
  );
}
