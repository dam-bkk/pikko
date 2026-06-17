'use client';
import { useState } from 'react';
import { useLang } from '@/lib/lang-context';
import { useInView } from '@/lib/use-in-view';

function Item({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-200"
      style={{ background: '#EDE8FC' }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-5 text-left"
        aria-expanded={open}
      >
        <span className="font-bold text-base pr-4" style={{ color: '#2A1060', fontSize: '1.05rem' }}>{q}</span>
        <span
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
          style={{
            backgroundColor: '#4FD175',
            transform: open ? 'rotate(45deg)' : 'none',
            boxShadow: '0 2px 6px rgba(79,209,117,0.35)',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 2v10M2 7h10" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      <div style={{ maxHeight: open ? 220 : 0, overflow: 'hidden', transition: 'max-height 0.3s ease' }}>
        <p className="px-6 pb-5 text-sm leading-relaxed" style={{ color: '#5A4080', fontWeight: 500 }}>{a}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const { t } = useLang();
  const { faq } = t;
  const [open, setOpen] = useState<number | null>(null);
  const section = useInView(0.1);

  return (
    <section style={{ backgroundColor: '#F7F5FF', paddingTop: 96, paddingBottom: 96 }}>
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-center font-black mb-12" style={{ color: '#2A1060', fontSize: 'clamp(1.75rem,4vw,2.5rem)' }}>
          {faq.title}
        </h2>

        <div
          ref={section.ref as React.RefObject<HTMLDivElement>}
          className={`flex flex-col gap-4 ${section.inView ? 'anim-slide-up' : ''}`}
          style={{ opacity: section.inView ? undefined : 0 }}
        >
          {faq.items.map((item, i) => (
            <Item
              key={item.q}
              q={item.q}
              a={item.a}
              open={open === i}
              onToggle={() => setOpen(open === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
