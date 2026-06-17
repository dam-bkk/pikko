'use client';
import { signIn } from 'next-auth/react';

export default function ParentLogin() {
  return (
    <div
      className="min-h-dvh flex flex-col items-center justify-center px-6"
      style={{ background: 'linear-gradient(150deg,#1A0845 0%,#2D1278 40%,#5B20CC 80%,#7C2DFF 100%)', position: 'relative', overflow: 'hidden' }}
    >
      {/* Background orbs */}
      <div className="float-animate" style={{ position:'absolute', top:'12%', left:'5%',  width:52, height:52, backgroundColor:'#FFD60A', borderRadius:'50%', opacity:0.85, animationDelay:'0s',   pointerEvents:'none' }} />
      <div className="float-animate" style={{ position:'absolute', top:'70%', left:'3%',  width:24, height:24, backgroundColor:'#FF5757', borderRadius:'50%', opacity:0.8,  animationDelay:'1.2s', pointerEvents:'none' }} />
      <div className="float-animate" style={{ position:'absolute', top:'8%',  right:'4%', width:20, height:20, backgroundColor:'#FF4C91', borderRadius:'50%', opacity:0.75, animationDelay:'0.6s', pointerEvents:'none' }} />
      <div className="float-animate" style={{ position:'absolute', top:'75%', right:'6%', width:38, height:38, backgroundColor:'#FFD60A', borderRadius:'50%', opacity:0.65, animationDelay:'1.8s', pointerEvents:'none' }} />

      <div className="relative z-10 text-center" style={{ maxWidth: 400, width: '100%' }}>
        {/* Logo */}
        <div className="mx-auto mb-6" style={{ width:80, height:80, background:'linear-gradient(135deg,#FFD60A,#FF8C35)', borderRadius:24, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 12px 32px rgba(255,214,10,0.4)' }}>
          <svg width="44" height="44" viewBox="0 0 80 80" fill="none">
            <path d="M40 16 L10 21 L10 62 L40 57 Z" fill="white" fillOpacity={0.95}/>
            <path d="M40 16 L70 21 L70 62 L40 57 Z" fill="white" fillOpacity={0.8}/>
            <line x1="40" y1="16" x2="40" y2="57" stroke="rgba(124,77,255,0.6)" strokeWidth="2.5"/>
            <text x="55" y="46" textAnchor="middle" fill="rgba(255,214,10,0.85)" fontSize="20" fontWeight="900" fontFamily="system-ui,sans-serif">ก</text>
          </svg>
        </div>

        <h1 className="font-black mb-1" style={{ color:'white', fontSize:'clamp(1.6rem,4vw,2rem)' }}>
          Welcome to <span className="text-gradient">Pikko</span>
        </h1>
        <p className="mb-10 text-sm" style={{ color:'rgba(255,255,255,0.6)' }}>
          Parent dashboard · Sign in to track your child's progress
        </p>

        {/* Google Sign In */}
        <button
          onClick={() => signIn('google', { callbackUrl: '/parent' })}
          className="w-full flex items-center justify-center gap-3 font-bold rounded-2xl transition-all duration-200 hover:-translate-y-0.5"
          style={{ backgroundColor:'white', color:'#1A2B3C', fontSize:16, padding:'16px 24px', boxShadow:'0 8px 32px rgba(0,0,0,0.25)' }}
        >
          <GoogleIcon />
          Sign in with Google
        </button>

        <p className="mt-6 text-xs" style={{ color:'rgba(255,255,255,0.35)' }}>
          Your data stays private. No ads, ever.
        </p>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 48 48" fill="none">
      <path d="M47.5 24.5c0-1.6-.1-3.2-.4-4.7H24v9h13.2c-.6 3-2.4 5.6-5 7.3v6h8c4.8-4.4 7.3-10.8 7.3-17.6z" fill="#4285F4"/>
      <path d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-8-6c-2.1 1.4-4.8 2.3-7.9 2.3-6 0-11.2-4-13-9.4H2.7v6.1C6.8 42.7 14.9 48 24 48z" fill="#34A853"/>
      <path d="M11 29.1c-.5-1.4-.7-2.9-.7-4.4s.2-3 .7-4.4v-6.1H2.7C1 17.3 0 20.5 0 24s1 6.7 2.7 9.8l8.3-4.7z" fill="#FBBC05"/>
      <path d="M24 9.5c3.4 0 6.4 1.2 8.8 3.4l6.5-6.5C35.9 2.7 30.5.5 24 .5 14.9.5 6.8 5.8 2.7 14.2l8.3 6.1c1.8-5.4 7-10.8 13-10.8z" fill="#EA4335"/>
    </svg>
  );
}
