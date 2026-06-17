import Link from 'next/link';

interface LeadMagnetProps {
  title: string;
  description: string;
  downloadUrl: string;
  buttonLabel?: string;
}

export default function LeadMagnet({ title, description, downloadUrl, buttonLabel = 'Download free PDF' }: LeadMagnetProps) {
  return (
    <div style={{ margin: '32px 0', padding: '24px', background: 'linear-gradient(135deg,#1A0845,#5B20CC)', borderRadius: 20, textAlign: 'center' }}>
      <p style={{ fontSize: 11, fontWeight: 800, color: '#FFD23F', letterSpacing: '0.1em', marginBottom: 8 }}>FREE RESOURCE</p>
      <p style={{ fontSize: 20, fontWeight: 900, color: 'white', marginBottom: 8 }}>{title}</p>
      <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', marginBottom: 20, lineHeight: 1.6 }}>{description}</p>
      <Link
        href={downloadUrl}
        style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg,#FFD23F,#FF8C35)', color: '#1A0845', fontWeight: 800, fontSize: 15, padding: '12px 28px', borderRadius: 30, textDecoration: 'none' }}
      >
        <span style={{ fontSize: 16 }}>⬇️</span>
        {buttonLabel}
      </Link>
      <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 10 }}>No email required</p>
    </div>
  );
}
