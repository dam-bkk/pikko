'use client';
import { useState } from 'react';

interface FaqItem {
  q: string;
  a: string;
}

interface FaqSectionProps {
  items: FaqItem[];
}

export default function FaqSection({ items = [] }: FaqSectionProps) {
  const [open, setOpen] = useState<number | null>(null);
  if (!items.length) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  return (
    <section style={{ marginTop: 40 }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <h2 style={{ fontSize: 20, fontWeight: 900, color: '#1A2B3C', marginBottom: 16 }}>Frequently asked questions</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {items.map((item, i) => (
          <div key={i} style={{ borderRadius: 12, border: '1px solid #E8E0FF', overflow: 'hidden' }}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              style={{ width: '100%', textAlign: 'left', padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: open === i ? '#F0E8FF' : 'white', border: 'none', cursor: 'pointer', gap: 12 }}
            >
              <span style={{ fontSize: 15, fontWeight: 700, color: '#1A2B3C', lineHeight: 1.4 }}>{item.q}</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9B74E8" strokeWidth="2.5" style={{ flexShrink: 0, transform: open === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </button>
            {open === i && (
              <div style={{ padding: '0 18px 16px', background: '#F0E8FF' }}>
                <p style={{ fontSize: 14, color: '#6B7A8D', lineHeight: 1.7 }}>{item.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
