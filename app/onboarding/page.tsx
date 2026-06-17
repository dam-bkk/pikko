'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { AVATAR_LIST, GROUP_LABELS, type AvatarId } from '@/components/shared/Avatar';

export default function OnboardingPage() {
  const [step, setStep]     = useState<'name' | 'avatar'>('name');
  const [name, setName]     = useState('');
  const [avatar, setAvatar] = useState<AvatarId>('tiger-cub');
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  async function save() {
    if (!name.trim()) return;
    setSaving(true);
    await fetch('/api/child', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ childName: name.trim(), childAvatar: avatar }),
    });
    router.push('/kids');
  }

  const groups = ['animals', 'kids', 'fantasy'] as const;

  return (
    <div
      className="min-h-dvh flex flex-col items-center justify-center px-4"
      style={{ background: 'linear-gradient(150deg,#1A0845 0%,#2D1278 40%,#5B20CC 80%,#7C2DFF 100%)', position: 'relative', overflow: 'hidden' }}
    >
      {/* Orbs */}
      <div className="float-animate" style={{ position:'absolute', top:'10%', left:'5%',  width:40, height:40, backgroundColor:'#FFD60A', borderRadius:'50%', opacity:0.8, pointerEvents:'none' }} />
      <div className="float-animate" style={{ position:'absolute', top:'75%', right:'5%', width:28, height:28, backgroundColor:'#FF5757', borderRadius:'50%', opacity:0.75, animationDelay:'1.2s', pointerEvents:'none' }} />
      <div className="float-animate" style={{ position:'absolute', top:'60%', left:'3%',  width:18, height:18, backgroundColor:'#00D2AA', borderRadius:'50%', opacity:0.7, animationDelay:'2.4s', pointerEvents:'none' }} />

      <div className="relative z-10 w-full" style={{ maxWidth: step === 'avatar' ? 580 : 440 }}>

        {/* Step dots */}
        <div className="flex items-center gap-2 justify-center mb-8">
          {['name','avatar'].map((s) => (
            <div key={s} style={{
              width: step === s ? 32 : 8, height: 8,
              borderRadius: 99,
              backgroundColor: step === s ? '#FFD60A' : 'rgba(255,255,255,0.25)',
              transition: 'all 0.3s ease',
            }} />
          ))}
        </div>

        {step === 'name' ? (
          <div className="text-center">
            <div className="wiggle mx-auto mb-6" style={{ width:72, height:72 }}>
              <svg width="72" height="72" viewBox="0 0 80 80" fill="none">
                <path d="M40 16 L10 21 L10 62 L40 57 Z" fill="white" fillOpacity={0.95}/>
                <path d="M40 16 L70 21 L70 62 L40 57 Z" fill="white" fillOpacity={0.8}/>
                <line x1="40" y1="16" x2="40" y2="57" stroke="rgba(124,77,255,0.6)" strokeWidth="2.5"/>
                <text x="55" y="46" textAnchor="middle" fill="rgba(255,214,10,0.9)" fontSize="20" fontWeight="900" fontFamily="system-ui">ก</text>
                <circle cx="22" cy="30" r="3" fill="rgba(255,214,10,0.85)"/>
              </svg>
            </div>

            <h1 className="font-black mb-2" style={{ color:'white', fontSize:'clamp(1.6rem,4vw,2.2rem)' }}>
              What's your child's <span className="text-gradient">name?</span>
            </h1>
            <p className="mb-8 text-sm" style={{ color:'rgba(255,255,255,0.6)' }}>
              We'll personalise their reading adventure
            </p>

            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && name.trim()) setStep('avatar'); }}
              placeholder="e.g. Emma, Luca, Mia…"
              autoFocus
              className="w-full text-center font-bold text-lg rounded-2xl mb-6"
              style={{
                background: 'rgba(255,255,255,0.12)',
                backdropFilter: 'blur(12px)',
                border: '2px solid rgba(255,255,255,0.25)',
                color: 'white',
                padding: '18px 24px',
                outline: 'none',
              }}
            />

            <button
              onClick={() => name.trim() && setStep('avatar')}
              disabled={!name.trim()}
              className="w-full font-bold rounded-2xl transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: name.trim() ? 'linear-gradient(135deg,#FFD60A,#FF8C35)' : 'rgba(255,255,255,0.15)',
                color: name.trim() ? '#1A0845' : 'rgba(255,255,255,0.4)',
                fontSize: 17, padding: '16px',
                boxShadow: name.trim() ? '0 8px 24px rgba(255,214,10,0.35)' : 'none',
                transition: 'all 0.2s',
              }}
            >
              Next →
            </button>
          </div>

        ) : (
          <div>
            <div className="text-center mb-6">
              <h1 className="font-black mb-1" style={{ color:'white', fontSize:'clamp(1.5rem,4vw,2rem)' }}>
                Choose <span className="text-gradient">{name}'s</span> hero
              </h1>
              <p className="text-sm" style={{ color:'rgba(255,255,255,0.55)' }}>
                Pick a reading buddy for the journey
              </p>
            </div>

            {/* Preview of selected */}
            <div className="flex justify-center mb-6">
              <div
                className="anim-pop-in"
                style={{ width:96, height:96, borderRadius:'50%', border:'4px solid #FFD60A', boxShadow:'0 0 32px rgba(255,214,10,0.5)', overflow:'hidden' }}
              >
                <Image src={`/avatars/${avatar}.svg`} alt={avatar} width={96} height={96} style={{ objectFit:'cover' }} />
              </div>
            </div>

            {/* Groups */}
            <div style={{ background:'rgba(255,255,255,0.06)', borderRadius:24, padding:'16px', marginBottom:20 }}>
              {groups.map(group => (
                <div key={group} className="mb-4 last:mb-0">
                  <p className="text-xs font-black tracking-widest mb-3" style={{ color:'rgba(255,255,255,0.45)' }}>
                    {GROUP_LABELS[group]}
                  </p>
                  <div className="grid grid-cols-4 gap-3">
                    {AVATAR_LIST.filter(a => a.group === group).map(({ id, label }) => (
                      <button
                        key={id}
                        onClick={() => setAvatar(id)}
                        className="flex flex-col items-center gap-1.5 p-2 rounded-2xl transition-all duration-200"
                        style={{
                          background: avatar === id
                            ? 'rgba(255,214,10,0.15)'
                            : 'rgba(255,255,255,0.06)',
                          border: avatar === id ? '2px solid #FFD60A' : '2px solid rgba(255,255,255,0.08)',
                          transform: avatar === id ? 'scale(1.08)' : 'scale(1)',
                          boxShadow: avatar === id ? '0 0 20px rgba(255,214,10,0.3)' : 'none',
                        }}
                      >
                        <div style={{ width:52, height:52, borderRadius:'50%', overflow:'hidden', flexShrink:0 }}>
                          <Image src={`/avatars/${id}.svg`} alt={label} width={52} height={52} style={{ objectFit:'cover' }} />
                        </div>
                        <span className="text-xs font-bold leading-tight text-center" style={{ color: avatar === id ? '#FFD60A' : 'rgba(255,255,255,0.6)', fontSize:10 }}>
                          {label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep('name')}
                className="flex-none px-6 py-4 rounded-2xl font-bold text-sm"
                style={{ background:'rgba(255,255,255,0.1)', color:'rgba(255,255,255,0.7)' }}
              >
                ← Back
              </button>
              <button
                onClick={save}
                disabled={saving}
                className="flex-1 font-bold rounded-2xl transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: 'linear-gradient(135deg,#FFD60A,#FF8C35)',
                  color: '#1A0845', fontSize: 17, padding: '16px',
                  boxShadow: '0 8px 24px rgba(255,214,10,0.35)',
                  opacity: saving ? 0.7 : 1,
                }}
              >
                {saving ? 'Setting up…' : "Let's read! →"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
