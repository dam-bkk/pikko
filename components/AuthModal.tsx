'use client';
import { useState } from 'react';
import { useLang } from '@/lib/lang-context';

export default function AuthModal({ onClose }: { onClose: () => void }) {
  const { t } = useLang();
  const [tab, setTab] = useState<'in' | 'up'>('in');

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(26,43,60,0.65)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl"
        style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.6)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Tabs */}
        <div className="flex border-b border-gray-100">
          {(['in', 'up'] as const).map(k => (
            <button
              key={k}
              onClick={() => setTab(k)}
              className={`flex-1 py-4 text-sm font-semibold transition-colors ${
                tab === k
                  ? 'text-[#FF6635] border-b-2 border-[#FF6635]'
                  : 'text-[#6B7A8D]'
              }`}
            >
              {k === 'in' ? t.auth.signIn : t.auth.signUp}
            </button>
          ))}
        </div>

        <div className="px-8 py-8">
          {/* Wordmark */}
          <div className="text-center mb-7">
            <span className="text-3xl font-black text-[#FF6635]">Pikko</span>
          </div>

          {/* Google */}
          <button className="w-full flex items-center justify-center gap-3 border-2 border-gray-200 rounded-2xl py-3.5 text-sm font-semibold text-[#1A2B3C] hover:bg-gray-50 hover:border-gray-300 transition-all">
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            {t.auth.continueGoogle}
          </button>

          <p className="text-center text-[11px] text-[#6B7A8D] mt-5 leading-relaxed px-2">
            {t.auth.terms}
          </p>
        </div>
      </div>
    </div>
  );
}
