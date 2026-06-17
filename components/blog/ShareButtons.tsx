'use client';

export default function ShareButtons({ url, title }: { url: string; title: string }) {
  const encoded = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const links = [
    { label: 'LINE', color: '#06C755', href: `https://social-plugins.line.me/lineit/share?url=${encoded}`, icon: 'M12 2C6.477 2 2 6.151 2 11.246c0 4.128 2.633 7.656 6.471 9.049-.089-.775-.17-1.964.035-2.809.184-.757 1.242-5.265 1.242-5.265s-.317-.634-.317-1.573c0-1.474.856-2.576 1.918-2.576.907 0 1.347.681 1.347 1.497 0 .912-.581 2.278-.882 3.543-.25 1.057.529 1.918 1.569 1.918 1.883 0 3.332-1.985 3.332-4.851 0-2.536-1.822-4.309-4.425-4.309-3.01 0-4.777 2.257-4.777 4.592 0 .909.349 1.883.786 2.416.086.105.098.197.073.304-.08.331-.258 1.057-.293 1.205-.047.196-.156.237-.36.143-1.344-.626-2.185-2.592-2.185-4.172 0-3.392 2.465-6.509 7.112-6.509 3.733 0 6.633 2.659 6.633 6.213 0 3.707-2.336 6.687-5.576 6.687-1.089 0-2.114-.567-2.465-1.234l-.67 2.5c-.243.934-.899 2.101-1.34 2.813.909.28 1.869.432 2.867.432C17.523 20.5 22 16.349 22 11.246 22 6.151 17.523 2 12 2z' },
    { label: 'Facebook', color: '#1877F2', href: `https://www.facebook.com/sharer/sharer.php?u=${encoded}`, icon: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' },
    { label: 'X', color: '#000', href: `https://x.com/intent/tweet?url=${encoded}&text=${encodedTitle}`, icon: 'M4 4l16 16M4 20L20 4' },
    { label: 'WhatsApp', color: '#25D366', href: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encoded}`, icon: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z' },
  ];

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 32 }}>
      <span style={{ fontSize: 12, fontWeight: 700, color: '#9AA0AB' }}>Share</span>
      {links.map(({ label, color, href, icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${label}`}
          style={{ width: 36, height: 36, borderRadius: '50%', background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill={color} stroke="none">
            <path d={icon}/>
          </svg>
        </a>
      ))}
    </div>
  );
}
