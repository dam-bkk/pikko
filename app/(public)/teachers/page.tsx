'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen, Lightbulb, Gift, GraduationCap,
  CheckCircle2, Link2, Users, School,
  ChevronRight, Star,
} from 'lucide-react';
import { LangProvider } from '@/lib/lang-context';
import Footer from '@/components/Footer';

function Check() {
  return <CheckCircle2 size={20} color="#4CC97C" fill="none" strokeWidth={2.5} />;
}

function BookIdeaForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ title: '', level: '1', desc: '' });

  const inputStyle = {
    width: '100%', padding: '12px 16px', borderRadius: 16, fontSize: 14,
    border: '2px solid rgba(124,77,255,0.2)', backgroundColor: 'white', outline: 'none',
  };

  if (submitted) {
    return (
      <div className="text-center py-10">
        <CheckCircle2 size={48} color="#4CC97C" className="mx-auto mb-4" />
        <h3 className="font-black text-xl mb-2" style={{ color: '#1A2B3C' }}>ส่งแล้ว!</h3>
        <p className="text-sm" style={{ color: '#4A5568' }}>
          เราจะตรวจสอบแนวคิดของคุณและแจ้งผล <strong>รอบส่งถัดไป: สิงหาคม 2026</strong>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <label className="block text-sm font-bold mb-1.5" style={{ color: '#1A2B3C' }}>ชื่อหนังสือหรือแนวคิด</label>
        <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="เช่น วันไปตลาดกับยาย"
          style={inputStyle}
          onFocus={(e) => (e.target.style.borderColor = '#7C4DFF')}
          onBlur={(e) => (e.target.style.borderColor = 'rgba(124,77,255,0.2)')} />
      </div>
      <div>
        <label className="block text-sm font-bold mb-1.5" style={{ color: '#1A2B3C' }}>ระดับการอ่าน</label>
        <select value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })}
          style={{ ...inputStyle, cursor: 'pointer' }}>
          <option value="1">Level 1 — คำแรก (อายุ 4–5 ปี)</option>
          <option value="2">Level 2 — ประโยคสั้น (อายุ 5–6 ปี)</option>
          <option value="3">Level 3 — เวลานิทาน (อายุ 6–7 ปี)</option>
          <option value="4">Level 4 — นักอ่าน (อายุ 7–9 ปี)</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-bold mb-1.5" style={{ color: '#1A2B3C' }}>เล่าเรื่องย่อ</label>
        <textarea required value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })}
          placeholder="ตัวละคร ฉาก สิ่งที่เด็กจะได้เรียนรู้..."
          rows={4} style={{ ...inputStyle, resize: 'none' }}
          onFocus={(e) => (e.target.style.borderColor = '#7C4DFF')}
          onBlur={(e) => (e.target.style.borderColor = 'rgba(124,77,255,0.2)')} />
      </div>
      <button type="submit" className="w-full py-3.5 rounded-2xl font-bold text-sm transition-all hover:-translate-y-0.5"
        style={{ backgroundColor: '#7C4DFF', color: 'white', boxShadow: '0 6px 20px rgba(124,77,255,0.35)' }}>
        ส่งแนวคิด
      </button>
      <p className="text-center text-xs" style={{ color: '#4A5568' }}>ส่งได้ 1 ครั้งต่อครูต่อไตรมาส</p>
    </form>
  );
}

function TeachersPage() {
  const [modal, setModal] = useState(false);
  const [step, setStep] = useState<'form' | 'done'>('form');
  const [form, setForm] = useState({ name: '', phone: '', school: '', province: '', moeCode: '', subject: '' });

  const inputStyle = {
    width: '100%', padding: '12px 16px', borderRadius: 16, fontSize: 14,
    border: '2px solid rgba(124,77,255,0.15)', backgroundColor: '#FAFAFA', outline: 'none',
  };

  const perks = [
    {
      Icon: BookOpen,
      color: '#FF6635', shadow: '#CC3A10', bg: '#FFF4F0',
      title: 'หนังสือพรีเมียมฟรี 3 เล่ม',
      body: 'เข้าถึงหนังสือ Pikko 3 เล่มเต็มรูปแบบสำหรับนักเรียน ไม่ต้องสมัครสมาชิก รวมเสียงอ่าน คาราโอเกะ และติดตามพัฒนาการ',
    },
    {
      Icon: Lightbulb,
      color: '#7C4DFF', shadow: '#5530CC', bg: '#F5F0FF',
      title: 'เสนอแนวคิดหนังสือ',
      body: 'คุณรู้จักนักเรียนดีที่สุด ส่งแนวคิดนิทานได้ทุกไตรมาส แนวคิดที่ได้รับการโหวตมากที่สุดจะถูกสร้างเป็นหนังสือ Pikko จริง',
    },
    {
      Icon: Gift,
      color: '#4CC97C', shadow: '#2E9B5A', bg: '#E8FFF4',
      title: 'โบนัสจากการแนะนำ',
      body: 'แนะนำนักเรียน 2 คนที่เปิดใช้แพ็กเกจชำระเงิน รับหนังสือเพิ่ม 1 เล่มฟรีสำหรับห้องเรียน ไม่จำกัดจำนวนครั้ง',
    },
  ];

  return (
    <div style={{ fontFamily: "var(--font-thai-sans), 'Mitr', sans-serif" }}>
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-40 h-16 flex items-center justify-between px-6"
        style={{ backgroundColor: 'white', boxShadow: '0 1px 12px rgba(0,0,0,0.06)' }}>
        <Link href="/" className="font-black text-xl" style={{ color: '#FF6635' }}>Pikko</Link>
        <div className="flex items-center gap-3">
          <Link href="/" className="text-sm font-semibold hidden sm:block" style={{ color: '#4A5568' }}>กลับหน้าหลัก</Link>
          <button onClick={() => setModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold"
            style={{ background: 'linear-gradient(135deg, #FFD60A, #FF8C35)', color: '#1A0845', boxShadow: '0 4px 16px rgba(255,214,10,0.35)' }}>
            สมัครเข้าร่วม <ChevronRight size={14} />
          </button>
        </div>
      </nav>

      <main style={{ paddingTop: 64 }}>
        {/* Hero */}
        <section style={{ background: 'linear-gradient(150deg, #1A0845 0%, #2D1278 40%, #5B20CC 80%, #7C2DFF 100%)', paddingTop: 96, paddingBottom: 96, position: 'relative', overflow: 'hidden' }}>
          {/* Background blobs */}
          <div style={{ position: 'absolute', top: -100, left: -100, width: 400, height: 400, background: 'radial-gradient(circle, rgba(255,87,87,0.18) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: -60, right: -60, width: 360, height: 360, background: 'radial-gradient(circle, rgba(0,209,167,0.14) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
          {/* Floating orbs */}
          {[
            { top: '18%', left: '4%', size: 44, color: '#FFD60A', delay: 0 },
            { top: '72%', left: '2%', size: 22, color: '#FF5757', delay: 1.2 },
            { top: '12%', right: '5%', size: 20, color: '#FF4C91', delay: 0.6 },
            { top: '76%', right: '4%', size: 36, color: '#FFD60A', delay: 1.8 },
            { top: '45%', right: '2%', size: 14, color: '#00D2AA', delay: 2.4 },
          ].map((o, i) => (
            <div key={i} className="float-animate" style={{ position: 'absolute', top: o.top, left: (o as any).left, right: (o as any).right, width: o.size, height: o.size, backgroundColor: o.color, borderRadius: '50%', opacity: 0.85, animationDelay: `${o.delay}s`, pointerEvents: 'none' }} />
          ))}

          <div className="max-w-4xl mx-auto px-6 text-center relative">
            <div className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full mb-6"
              style={{ backgroundColor: 'rgba(255,214,10,0.15)', color: '#FFD60A', border: '1px solid rgba(255,214,10,0.35)', backdropFilter: 'blur(8px)' }}>
              <GraduationCap size={16} />
              สำหรับครูภาษาไทย
            </div>
            <h1 className="font-black leading-tight mb-5" style={{ color: 'white', fontSize: 'clamp(2rem,5vw,3.4rem)' }}>
              ช่วยนักเรียนของคุณ<br />
              <span className="text-gradient">รักการอ่านภาษาไทย</span>
            </h1>
            <p className="mb-8 mx-auto" style={{ color: 'rgba(255,255,255,0.88)', fontSize: 17, maxWidth: 480 }}>
              เข้าถึงห้องเรียนฟรี มีส่วนร่วมในการสร้างคลังหนังสือ และรับหนังสือโบนัสเมื่อนักเรียนสมัคร
            </p>
            <button onClick={() => setModal(true)}
              className="btn-bounce font-bold rounded-full transition-all duration-200 hover:shadow-2xl"
              style={{ background: 'linear-gradient(135deg, #FFD60A, #FF8C35)', color: '#1A0845', fontSize: 16, padding: '16px 44px', boxShadow: '0 8px 32px rgba(255,214,10,0.4)' }}>
              สมัครสิทธิ์ครูฟรี
            </button>
            <p className="mt-3 text-sm" style={{ color: 'rgba(255,255,255,0.72)' }}>ตรวจสอบภายใน 48 ชั่วโมง</p>
          </div>
        </section>

        {/* Perks */}
        <section style={{ backgroundColor: 'white', paddingTop: 96, paddingBottom: 96 }}>
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-14">
              <h2 className="font-black mb-3" style={{ color: '#1A2B3C', fontSize: 'clamp(1.75rem,4vw,2.5rem)' }}>ครูได้อะไรบ้าง</h2>
              <p style={{ color: '#6B7A8D', fontSize: 16 }}>ความร่วมมือจริง ไม่ใช่แค่ของแถม</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {perks.map(({ Icon, color, shadow, bg, title, body }) => (
                <div key={title} className="rounded-3xl p-7 flex flex-col"
                  style={{ backgroundColor: bg, border: `3px solid ${color}`, boxShadow: `5px 5px 0 ${shadow}` }}>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: color, boxShadow: `3px 3px 0 ${shadow}` }}>
                    <Icon size={24} color="white" strokeWidth={2} />
                  </div>
                  <h3 className="font-black text-lg mb-2" style={{ color: '#1A2B3C' }}>{title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#4A5568' }}>{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Referral detail */}
        <section style={{ backgroundColor: '#F7F5FF', paddingTop: 80, paddingBottom: 80 }}>
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full mb-4"
                  style={{ backgroundColor: 'rgba(76,201,124,0.15)', color: '#4CC97C' }}>
                  <Gift size={12} /> โปรแกรมแนะนำ
                </span>
                <h2 className="font-black leading-tight mb-4" style={{ color: '#1A2B3C', fontSize: 'clamp(1.5rem,3.5vw,2.2rem)' }}>
                  นักเรียนสมัคร<br />ห้องเรียนได้หนังสือเพิ่ม
                </h2>
                <p className="leading-relaxed mb-6" style={{ color: '#6B7A8D', fontSize: 15 }}>
                  แชร์ลิงก์แนะนำเฉพาะของคุณ ทุกครั้งที่นักเรียน 2 คนเปิดใช้แพ็กเกจชำระเงิน คุณจะได้รับหนังสือเพิ่ม 1 เล่มสำหรับห้องเรียน ไม่จำกัดจำนวน
                </p>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {['นักเรียน 2 คนชำระเงิน → หนังสือฟรี 1 เล่ม', 'นักเรียน 4 คนชำระเงิน → หนังสือฟรี 2 เล่ม', 'ไม่มีวันหมดอายุ ไม่จำกัดจำนวน'].map((pt) => (
                    <li key={pt} className="flex items-center gap-3 text-sm font-semibold" style={{ color: '#1A2B3C' }}>
                      <Check />{pt}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-4">
                {[
                  { Icon: Link2,  label: 'ลิงก์แนะนำของคุณ', value: 'pikko.app/r/kru-abc123' },
                  { Icon: Users,  label: 'นักเรียนที่แนะนำ', value: '6 คน' },
                  { Icon: BookOpen, label: 'หนังสือที่ได้รับ', value: '3 เล่ม' },
                ].map(({ Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-4 rounded-2xl px-5 py-4"
                    style={{ backgroundColor: 'white', border: '2px solid rgba(76,201,124,0.2)' }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: 'rgba(76,201,124,0.12)' }}>
                      <Icon size={18} color="#4CC97C" />
                    </div>
                    <div>
                      <p className="text-xs" style={{ color: '#4A5568' }}>{label}</p>
                      <p className="font-black text-sm" style={{ color: '#1A2B3C' }}>{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Submit book idea */}
        <section style={{ backgroundColor: 'white', paddingTop: 80, paddingBottom: 80 }}>
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-10">
              <h2 className="font-black mb-3" style={{ color: '#1A2B3C', fontSize: 'clamp(1.75rem,4vw,2.5rem)' }}>เสนอแนวคิดหนังสือ</h2>
              <p style={{ color: '#6B7A8D', fontSize: 16 }}>ครูรู้ดีที่สุดว่าเด็กต้องการอะไร ส่งได้ไตรมาสละครั้ง</p>
            </div>
            <div className="rounded-3xl p-8" style={{ backgroundColor: '#FAFAFA', border: '2px solid rgba(124,77,255,0.12)', boxShadow: '0 8px 32px rgba(0,0,0,0.06)' }}>
              <BookIdeaForm />
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Application modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(26,43,60,0.7)', backdropFilter: 'blur(6px)' }}
          onClick={() => { setModal(false); setStep('form'); }}>
          <div className="w-full max-w-md rounded-3xl p-8 relative"
            style={{ backgroundColor: 'white', boxShadow: '0 32px 80px rgba(0,0,0,0.25)', maxHeight: '90vh', overflowY: 'auto' }}
            onClick={(e) => e.stopPropagation()}>
            <button onClick={() => { setModal(false); setStep('form'); }}
              className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'rgba(0,0,0,0.06)' }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1 1l10 10M11 1L1 11" stroke="#6B7A8D" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            {step === 'done' ? (
              <div className="text-center py-6">
                <CheckCircle2 size={52} color="#4CC97C" className="mx-auto mb-4" />
                <h2 className="font-black text-2xl mb-2" style={{ color: '#1A2B3C' }}>ได้รับใบสมัครแล้ว!</h2>
                <p className="text-sm" style={{ color: '#4A5568' }}>
                  เราจะตรวจสอบข้อมูลและส่งการยืนยันไปที่ <strong>{form.phone}</strong> ภายใน 48 ชั่วโมง
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: '#F5F0FF' }}>
                    <School size={20} color="#7C4DFF" />
                  </div>
                  <div>
                    <h2 className="font-black text-xl" style={{ color: '#1A2B3C' }}>สมัครสิทธิ์ครู</h2>
                    <p className="text-xs" style={{ color: '#4A5568' }}>ตรวจสอบภายใน 48 ชั่วโมง</p>
                  </div>
                </div>

                {/* Verification note */}
                <div className="rounded-2xl px-4 py-3 mb-6 flex items-start gap-3"
                  style={{ backgroundColor: '#F5F0FF', border: '1.5px solid rgba(124,77,255,0.2)' }}>
                  <Star size={15} color="#7C4DFF" className="flex-shrink-0 mt-0.5" />
                  <p className="text-xs leading-relaxed" style={{ color: '#7C4DFF' }}>
                    เราตรวจสอบด้วย <strong>รหัสโรงเรียน (กระทรวงศึกษาธิการ)</strong> แทนอีเมลโรงเรียน เพราะครูไทยส่วนใหญ่ไม่มีอีเมลสถาบัน
                  </p>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); setStep('done'); }}
                  style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold mb-1" style={{ color: '#1A2B3C' }}>ชื่อ-นามสกุล</label>
                      <input required placeholder="ครูสมศรี ใจดี"
                        value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                        style={inputStyle} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold mb-1" style={{ color: '#1A2B3C' }}>เบอร์โทรศัพท์</label>
                      <input required type="tel" placeholder="08X-XXX-XXXX"
                        value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        style={inputStyle} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1" style={{ color: '#1A2B3C' }}>ชื่อโรงเรียน</label>
                    <input required placeholder="โรงเรียนวัดบางพลี"
                      value={form.school} onChange={(e) => setForm({ ...form, school: e.target.value })}
                      style={inputStyle} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold mb-1" style={{ color: '#1A2B3C' }}>จังหวัด</label>
                      <input required placeholder="กรุงเทพมหานคร"
                        value={form.province} onChange={(e) => setForm({ ...form, province: e.target.value })}
                        style={inputStyle} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold mb-1" style={{ color: '#1A2B3C' }}>
                        รหัสโรงเรียน (ศธ.)
                        <span className="ml-1 font-normal" style={{ color: '#4A5568' }}>8 หลัก</span>
                      </label>
                      <input placeholder="1010730042"
                        value={form.moeCode} onChange={(e) => setForm({ ...form, moeCode: e.target.value })}
                        maxLength={10}
                        style={inputStyle} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1" style={{ color: '#1A2B3C' }}>วิชาที่สอน</label>
                    <input required placeholder="ภาษาไทย ป.1–3"
                      value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      style={inputStyle} />
                  </div>
                  <button type="submit"
                    className="w-full py-3.5 rounded-2xl font-bold text-sm transition-all hover:-translate-y-0.5"
                    style={{ backgroundColor: '#7C4DFF', color: 'white', boxShadow: '0 6px 20px rgba(124,77,255,0.35)' }}>
                    ส่งใบสมัคร
                  </button>
                  <p className="text-center text-xs" style={{ color: '#4A5568' }}>
                    ข้อมูลของคุณใช้เพื่อยืนยันสถานะครูเท่านั้น ไม่แชร์กับบุคคลที่สาม
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function TeachersPageWrapper() {
  return (
    <LangProvider>
      <TeachersPage />
    </LangProvider>
  );
}
