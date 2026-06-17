'use client';
import { Users, Globe, ShieldCheck } from 'lucide-react';
import { useLang } from '@/lib/lang-context';

export default function TrustBar() {
  const { t } = useLang();
  const { trust } = t;

  const items = [
    { icon: <span style={{ color: '#FFD60A', letterSpacing: 2, fontSize: 13 }}>★★★★★</span>, label: '4.9' },
    { icon: <Users size={14} color="rgba(255,255,255,0.7)" />, label: trust.families },
    { icon: <Globe size={14} color="rgba(255,255,255,0.7)" />, label: trust.langs },
    { icon: <ShieldCheck size={14} color="rgba(255,255,255,0.7)" />, label: trust.safe },
  ];

  return (
    <div style={{ background: 'linear-gradient(90deg, #FF5757, #FF4C91)', paddingTop: 16, paddingBottom: 16 }}>
      <div className="max-w-6xl mx-auto px-6 flex flex-wrap items-center justify-center gap-y-2">
        {items.map(({ icon, label }, i) => (
          <div key={label} className="flex items-center">
            <div className="flex items-center gap-1.5">
              {icon}
              <span className="text-sm font-bold" style={{ color: 'white' }}>{label}</span>
            </div>
            {i < items.length - 1 && (
              <span style={{ color: 'rgba(255,255,255,0.3)', margin: '0 20px', fontSize: 18 }}>|</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
