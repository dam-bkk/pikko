'use client';
import { useLang } from '@/lib/lang-context';
import { useInView } from '@/lib/use-in-view';

const TITLE: Record<string, string> = {
  en: 'Families who love', th: 'ครอบครัวที่รัก',
  fr: 'Les familles qui aiment', zh: '爱上Pikko的家庭',
  ja: 'Pikkoを愛するご家族', ko: 'Pikko를 사랑하는 가족들',
};
const SUBTITLE: Record<string, string> = {
  en: 'From real parents, not marketers.',
  th: 'จากผู้ปกครองจริง ไม่ใช่นักการตลาด',
  fr: 'De vrais parents, pas des spécialistes du marketing.',
  zh: '来自真实家长，不是营销人员。',
  ja: '本当の保護者から。マーケターではありません。',
  ko: '진짜 부모님들의 이야기, 마케터가 아닙니다.',
};

const AVATAR_COLORS = ['#C860FF', '#38C8FF', '#4FD175'];
const AVATAR_DARK   = ['#8020C0', '#1890CC', '#18853A'];

export default function Testimonials() {
  const { t, lang } = useLang();
  const titleRef = useInView(0);
  const section  = useInView(0);

  return (
    <section style={{ background: '#F7F5FF', paddingTop: 96, paddingBottom: 96 }}>
      <div className="max-w-4xl mx-auto px-6">

        <div
          ref={titleRef.ref as React.RefObject<HTMLDivElement>}
          className={`text-center mb-14 ${titleRef.inView ? 'anim-slide-up' : ''}`}
          style={{ opacity: titleRef.inView ? undefined : 0 }}
        >
          <h2 className="font-black mb-3" style={{ color: '#2A1060', fontSize: 'clamp(1.75rem,4vw,2.5rem)' }}>
            {TITLE[lang] ?? TITLE.en}{' '}
            <span className="text-gradient">Pikko</span>
          </h2>
          <p style={{ color: '#7A6090', fontSize: 16, fontWeight: 500 }}>
            {SUBTITLE[lang] ?? SUBTITLE.en}
          </p>
        </div>

        <div
          ref={section.ref as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {t.testimonials.map((item, i) => (
            <div
              key={item.name}
              className={`rounded-2xl p-6 flex flex-col ${section.inView ? 'anim-pop-in' : ''}`}
              style={{
                opacity: section.inView ? undefined : 0,
                animationDelay: `${i * 0.13}s`,
                background: '#EDE8FC',
              }}
            >
              <div style={{ color: '#FF8C35', fontSize: 14, letterSpacing: 3, marginBottom: 14 }}>★★★★★</div>
              <p className="flex-1 text-base leading-relaxed mb-6" style={{ color: '#3A2060', fontWeight: 500 }}>{item.quote}</p>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-black text-base"
                  style={{
                    background: `linear-gradient(135deg, ${AVATAR_COLORS[i]} 0%, ${AVATAR_DARK[i]} 100%)`,
                    color: 'white',
                    flexShrink: 0,
                    boxShadow: `0 3px 0 ${AVATAR_DARK[i]}`,
                  }}
                >
                  {item.name[0]}
                </div>
                <div>
                  <p className="font-black text-sm" style={{ color: '#2A1060' }}>{item.name}</p>
                  <p className="text-xs" style={{ color: '#7A6090' }}>{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
