export default function Loading() {
  return (
    <div style={{ minHeight: '100dvh', background: 'linear-gradient(150deg,#1A0845,#2D1278 60%,#5B20CC)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 44, height: 44, border: '3px solid rgba(255,255,255,0.15)', borderTopColor: '#FFD60A', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
    </div>
  );
}
