export default function EditLog({ date, note }: { date: string; note: string }) {
  return (
    <div style={{ marginTop: 24, padding: '12px 16px', background: '#FFF9EE', borderRadius: 10, borderLeft: '3px solid #FFD23F' }}>
      <p style={{ fontSize: 12, fontWeight: 800, color: '#FF8C35', marginBottom: 4 }}>EDIT — {date}</p>
      <p style={{ fontSize: 14, color: '#6B7A8D', lineHeight: 1.6 }}>{note}</p>
    </div>
  );
}
