export default function Loading() {
  return (
    <div style={{ height: '100dvh', background: 'linear-gradient(145deg,#080518,#120838,#1E0D5C)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 44, height: 44, border: '3px solid rgba(255,255,255,0.1)', borderTopColor: '#FFD23F', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
    </div>
  );
}
