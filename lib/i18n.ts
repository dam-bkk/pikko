export type Lang = 'en' | 'th' | 'fr' | 'zh' | 'ja' | 'ko';

const en = {
  nav: { cta: 'Get Started Free' },
  hero: {
    badge: 'Thai Reading App · Ages 4–9',
    line1: 'Every child can',
    line2: 'love reading Thai',
    subtitle: 'Interactive Thai books with karaoke audio, illustrated stories, and parent progress tracking.',
    cta: 'Start Reading Free',
    sub: 'No credit card · Cancel anytime',
  },
  trust: {
    rating: '★★★★★  4.9',
    families: '2,400+ families',
    langs: 'EN · TH · FR · 中文 · 日本語 · 한국어',
    appStore: 'App Store',
    safe: 'Safe for kids',
  },
  problem: {
    title: "Learning Thai shouldn't feel like homework",
    problems: [
      { icon: '😰', text: 'Flashcards bore kids in minutes — and parents too' },
      { icon: '📚', text: 'Thai textbooks assume a classroom, not a living room' },
      { icon: '🤷', text: "Parents can't always help — especially in mixed families" },
    ],
    solution: {
      label: 'The Pikko way',
      title: 'Stories first. Everything else follows.',
      points: [
        'Real Thai books, real Thai voices',
        'Words light up — kids follow along naturally',
        'Parents see progress without interrupting play',
      ],
    },
  },
  features: [
    {
      badge: 'Read Along',
      title1: 'Words come alive',
      title2: 'with every tap',
      body: 'Every book is narrated by a native Thai speaker. Tap any word to hear it — then watch it light up as the story plays.',
    },
    {
      badge: 'Growing Library',
      title1: 'Hundreds of books,',
      title2: 'four reading levels',
      body: 'From single words to short stories — Pikko grows with your child. Each level adds new vocabulary while reinforcing what they already know.',
    },
    {
      badge: 'For Parents',
      title1: 'See every step',
      title2: 'of their journey',
      body: 'Track reading streaks, new words learned, and books finished — all in a parent dashboard your child never needs to touch.',
    },
  ],
  howItWorks: {
    title: 'Up and reading in 3 minutes',
    subtitle: 'No setup. No headache. Just open and read.',
    steps: [
      { num: '1', title: 'Pick a book', body: "Choose from books matched to your child's level." },
      { num: '2', title: 'Tap play', body: 'Audio starts, words highlight as the story plays — karaoke style.' },
      { num: '3', title: 'Track progress', body: 'Check the parent dashboard for streaks, words learned, and books finished.' },
    ],
  },
  why: {
    title: 'Built for every child learning Thai',
    subtitle: "Whether Thai is your child's first language or fourth, Pikko meets them where they are.",
    native: {
      badge: 'Native Thai Kids',
      title1: 'Strong foundation',
      title2: 'before Prathom 1',
      body: 'For Thai families, Pikko reinforces the phonics and vocabulary your child will meet in school — building reading confidence that lasts.',
      points: ['School-aligned vocabulary', 'Thai phonics patterns', 'Confidence before Prathom 1'],
    },
    mixed: {
      badge: 'Heritage & Mixed Families',
      title1: 'Thai as a second',
      title2: 'language, made joyful',
      body: 'No Thai-speaking parent required. Audio-led stories let your child hear and absorb Thai naturally, at their own pace.',
      points: ['Fully audio-led, parent-optional', 'Cultural stories and context', 'Progress from absolute zero'],
    },
  },
  testimonials: [
    { name: 'Aom', role: 'Mum of Mali, age 5', quote: 'She used to refuse to read Thai. Now she asks for Pikko before bed. Every. Single. Night.' },
    { name: 'James', role: 'Dad of two, Bangkok', quote: "My wife is Thai, I'm not. Pikko is the first thing that actually works for both of us." },
    { name: 'Nok', role: 'Teacher, Prathom 1', quote: 'I recommend Pikko to every parent. Kids who use it arrive at school so much more confident.' },
  ],
  levels: {
    title: 'Four levels, one journey',
    subtitle: 'Each level is carefully designed so children feel challenged — but never stuck.',
    agesLabel: 'Ages',
    items: [
      { num: '1', name: 'First Words', th: 'คำแรก', ages: '4–5', desc: 'Single words, simple patterns. The very beginning of Thai reading.' },
      { num: '2', name: 'Short Sentences', th: 'ประโยคสั้น', ages: '5–6', desc: 'Two to three words, common verbs, everyday objects.' },
      { num: '3', name: 'Story Time', th: 'เวลานิทาน', ages: '6–7', desc: 'Short illustrated stories with a beginning, middle, and end.' },
      { num: '4', name: 'Reader', th: 'นักอ่าน', ages: '7–9', desc: 'Longer narratives, dialogue, and richer vocabulary.' },
    ],
  },
  pricing: {
    title: 'Simple, honest pricing',
    subtitle: "Start free. Upgrade when you're ready.",
    monthly: 'Monthly',
    yearly: 'Yearly',
    save: 'Save 30%',
    perMonth: '/mo',
    perYear: '/yr',
    currency: '฿',
    popular: 'Most Popular',
    plans: [
      { name: 'Free', nameTh: 'ฟรี', monthly: 0, yearly: 0, desc: 'Try Pikko with 2 starter books. No credit card needed.', features: ['2 starter books', 'Audio playback', 'Basic progress', '1 child profile'], cta: 'Start for Free', highlight: false },
      { name: '1 Child', nameTh: '1 คน', monthly: 149, yearly: 1249, desc: 'Perfect for one learner growing at their own pace.', features: ['1 child profile', 'Full library access', 'Parent dashboard', 'Audio + karaoke'], cta: 'Start Free Trial', highlight: false },
      { name: 'Family', nameTh: 'ครอบครัว', monthly: 249, yearly: 1999, desc: 'Up to 4 children. One subscription, the whole family.', features: ['Up to 4 child profiles', 'Everything in 1 Child', 'Progress comparison', 'Priority support'], cta: 'Start Free Trial', highlight: true },
      { name: 'Premium', nameTh: 'พรีเมียม', monthly: 299, yearly: 2990, desc: 'Unlimited profiles and the complete Pikko experience.', features: ['Unlimited profiles', 'Everything in Family', 'Early access to new books', 'Offline reading'], cta: 'Start Free Trial', highlight: false },
    ],
  },
  faq: {
    title: "Questions? We've got answers.",
    items: [
      { q: 'What age is Pikko for?', a: 'Pikko is designed for children aged 4–9, across four reading levels that grow with your child.' },
      { q: 'Do parents need to speak Thai?', a: 'Not at all. All books are fully narrated by native Thai speakers — your child just taps play.' },
      { q: 'Can I try before paying?', a: 'Yes. The Free plan gives access to 2 full books with no credit card required, ever.' },
      { q: 'How many devices can we use?', a: 'All paid plans work on any device. The free plan supports one device at a time.' },
      { q: 'Is there an offline mode?', a: 'Offline reading is available on the Premium plan. Other plans require an internet connection.' },
    ],
  },
  finalCta: {
    title: "Start your child's reading journey today",
    subtitle: 'Free forever. Upgrade when ready.',
    cta: 'Start Reading Free',
    sub: 'No credit card needed',
  },
  auth: {
    signIn: 'Sign in',
    signUp: 'Create account',
    continueGoogle: 'Continue with Google',
    terms: 'By continuing, you agree to our Terms of Service and Privacy Policy.',
  },
  footer: {
    tagline: 'Making Thai literacy joyful, one story at a time.',
    product: 'Product',
    company: 'Company',
    productLinks: ['Features', 'Pricing', 'Levels', 'For Schools'],
    companyLinks: ['About', 'Blog', 'Privacy', 'Terms', 'Contact'],
  },
};

// ─── Thai ────────────────────────────────────────────────────────────────────
const th: typeof en = {
  nav: { cta: 'เริ่มใช้ฟรี' },
  hero: {
    badge: 'แอปอ่านภาษาไทย · อายุ 4–9 ปี',
    line1: 'ให้ลูกรักการอ่าน',
    line2: 'ภาษาไทยตั้งแต่เล็ก',
    subtitle: 'หนังสือภาษาไทยพร้อมเสียงอ่านคาราโอเกะ ภาพประกอบสวยงาม และรายงานพัฒนาการสำหรับผู้ปกครอง',
    cta: 'เริ่มอ่านฟรีเลย',
    sub: 'ไม่ต้องบัตรเครดิต · ยกเลิกได้ทุกเมื่อ',
  },
  trust: {
    rating: '★★★★★  4.9',
    families: '2,400+ ครอบครัว',
    langs: 'EN · TH · FR · 中文 · 日本語 · 한국어',
    appStore: 'App Store',
    safe: 'ปลอดภัยสำหรับเด็ก',
  },
  problem: {
    title: 'การเรียนภาษาไทยไม่ควรรู้สึกเหมือนการบ้าน',
    problems: [
      { icon: '😰', text: 'แฟลชการ์ดทำให้เด็กเบื่อในไม่กี่นาที ผู้ปกครองด้วย' },
      { icon: '📚', text: 'หนังสือเรียนภาษาไทยออกแบบมาสำหรับห้องเรียน ไม่ใช่ห้องนั่งเล่น' },
      { icon: '🤷', text: 'ผู้ปกครองช่วยไม่ได้เสมอ โดยเฉพาะในครอบครัวผสม' },
    ],
    solution: {
      label: 'วิธีของ Pikko',
      title: 'นิทานมาก่อน ทุกอย่างตามมาเอง',
      points: ['หนังสือภาษาไทยจริง เสียงผู้พูดภาษาไทยจริง', 'คำสว่างขึ้น เด็กติดตามตามธรรมชาติ', 'ผู้ปกครองเห็นพัฒนาการโดยไม่ขัดการเล่น'],
    },
  },
  features: [
    { badge: 'อ่านตามพร้อมเสียง', title1: 'คำศัพท์มีชีวิต', title2: 'เมื่อกดฟัง', body: 'ทุกเล่มมีเสียงอ่านโดยผู้พูดภาษาไทยเป็นภาษาแม่ แตะคำใดก็ได้เพื่อฟัง แล้วดูคำนั้นสว่างขึ้นตามเสียง' },
    { badge: 'คลังหนังสือ', title1: 'หนังสือนับร้อยเล่ม', title2: 'สี่ระดับการอ่าน', body: 'ตั้งแต่คำศัพท์เดี่ยวไปจนถึงนิทานสั้น Pikko เติบโตไปพร้อมกับลูก แต่ละระดับเพิ่มคำใหม่และทบทวนสิ่งที่เรียนรู้แล้ว' },
    { badge: 'สำหรับผู้ปกครอง', title1: 'ติดตามทุกก้าว', title2: 'ของพัฒนาการลูก', body: 'ดูสถิติการอ่าน คำศัพท์ใหม่ และหนังสือที่อ่านจบ ทั้งหมดในแดชบอร์ดที่ไม่ต้องให้เด็กล็อกอินเอง' },
  ],
  howItWorks: {
    title: 'พร้อมอ่านใน 3 นาที',
    subtitle: 'ไม่ต้องตั้งค่า ไม่ยุ่งยาก แค่เปิดแล้วอ่าน',
    steps: [
      { num: '1', title: 'เลือกหนังสือ', body: 'เลือกจากหนังสือที่เหมาะกับระดับของลูก' },
      { num: '2', title: 'กดเล่น', body: 'เสียงเริ่ม คำสว่างขึ้นตามเสียง แบบคาราโอเกะ' },
      { num: '3', title: 'ติดตามพัฒนาการ', body: 'ดูแดชบอร์ดผู้ปกครองสำหรับสถิติ คำศัพท์ที่เรียน และหนังสือที่อ่านจบ' },
    ],
  },
  why: {
    title: 'ออกแบบมาเพื่อทุกคนที่เรียนภาษาไทย',
    subtitle: 'ไม่ว่าภาษาไทยจะเป็นภาษาแรกหรือภาษาที่สี่ Pikko พบลูกในจุดที่เขาอยู่',
    native: {
      badge: 'เด็กไทยโดยกำเนิด',
      title1: 'รากฐานที่แข็งแกร่ง',
      title2: 'ก่อนเข้าประถม',
      body: 'สำหรับครอบครัวไทย Pikko ช่วยเสริมทักษะการอ่านออกเขียนได้ที่เด็กจะต้องใช้ในโรงเรียน สร้างความมั่นใจที่ยั่งยืน',
      points: ['คำศัพท์ตามหลักสูตร', 'รูปแบบเสียงภาษาไทย', 'มั่นใจก่อนเข้า ป.1'],
    },
    mixed: {
      badge: 'ครอบครัวผสมและนานาชาติ',
      title1: 'ภาษาไทยเป็นภาษาที่สอง',
      title2: 'แบบสนุกและได้ผล',
      body: 'ไม่ต้องให้ผู้ปกครองพูดภาษาไทย นิทานที่นำด้วยเสียงช่วยให้ลูกได้ยินและซึมซับภาษาไทยอย่างเป็นธรรมชาติ',
      points: ['นำด้วยเสียง ไม่พึ่งผู้ปกครอง', 'นิทานและบริบทวัฒนธรรมไทย', 'เริ่มจากศูนย์ก็พัฒนาได้'],
    },
  },
  testimonials: [
    { name: 'อ้อม', role: 'คุณแม่ของน้องมาลี อายุ 5 ขวบ', quote: 'หนูปฏิเสธการอ่านภาษาไทยมาตลอด ตอนนี้ขอเปิด Pikko ก่อนนอนทุกคืนเลยค่ะ' },
    { name: 'เจมส์', role: 'คุณพ่อ 2 คน กรุงเทพฯ', quote: 'ภรรยาผมเป็นคนไทย ผมไม่ใช่ Pikko คือสิ่งแรกที่ได้ผลสำหรับทั้งคู่จริงๆ' },
    { name: 'นก', role: 'ครูประถม 1', quote: 'แนะนำ Pikko ให้ทุกครอบครัวเลยค่ะ เด็กที่ใช้มาถึงโรงเรียนมั่นใจมากกว่าคนอื่นมาก' },
  ],
  levels: {
    title: 'สี่ระดับ หนึ่งเส้นทาง',
    subtitle: 'แต่ละระดับออกแบบมาให้เด็กรู้สึกท้าทาย แต่ไม่ติดขัด',
    agesLabel: 'อายุ',
    items: [
      { num: '1', name: 'First Words', th: 'คำแรก', ages: '4–5', desc: 'คำศัพท์เดี่ยว รูปแบบง่าย จุดเริ่มต้นของการอ่านภาษาไทย' },
      { num: '2', name: 'Short Sentences', th: 'ประโยคสั้น', ages: '5–6', desc: 'ประโยค 2–3 คำ กริยาทั่วไป สิ่งของในชีวิตประจำวัน' },
      { num: '3', name: 'Story Time', th: 'เวลานิทาน', ages: '6–7', desc: 'นิทานสั้นพร้อมภาพประกอบ มีต้น กลาง และปลาย' },
      { num: '4', name: 'Reader', th: 'นักอ่าน', ages: '7–9', desc: 'เรื่องราวยาวขึ้น มีบทสนทนา คำศัพท์หลากหลายขึ้น' },
    ],
  },
  pricing: {
    title: 'ราคาเรียบง่าย โปร่งใส',
    subtitle: 'เริ่มฟรี อัปเกรดเมื่อพร้อม',
    monthly: 'รายเดือน', yearly: 'รายปี', save: 'ประหยัด 30%', perMonth: '/เดือน', perYear: '/ปี', currency: '฿', popular: 'ยอดนิยม',
    plans: [
      { name: 'Free', nameTh: 'ฟรี', monthly: 0, yearly: 0, desc: 'ทดลองใช้ Pikko กับหนังสือ 2 เล่ม ไม่ต้องบัตรเครดิต', features: ['หนังสือ 2 เล่ม', 'เสียงอ่านประกอบ', 'ติดตามพัฒนาการเบื้องต้น', '1 โปรไฟล์เด็ก'], cta: 'เริ่มใช้ฟรีเลย', highlight: false },
      { name: '1 Child', nameTh: '1 คน', monthly: 149, yearly: 1249, desc: 'เหมาะสำหรับเด็ก 1 คน เรียนรู้ในจังหวะของตัวเอง', features: ['1 โปรไฟล์เด็ก', 'เข้าถึงหนังสือทุกเล่ม', 'แดชบอร์ดผู้ปกครอง', 'เสียง + คาราโอเกะ'], cta: 'ทดลองใช้ฟรี', highlight: false },
      { name: 'Family', nameTh: 'ครอบครัว', monthly: 249, yearly: 1999, desc: 'สำหรับ 4 คนในครอบครัว สมัครครั้งเดียว', features: ['สูงสุด 4 โปรไฟล์', 'ทุกอย่างใน 1 คน', 'เปรียบเทียบพัฒนาการ', 'บริการดูแลพิเศษ'], cta: 'ทดลองใช้ฟรี', highlight: true },
      { name: 'Premium', nameTh: 'พรีเมียม', monthly: 299, yearly: 2990, desc: 'สำหรับครอบครัวที่ต้องการประสบการณ์เต็มรูปแบบ', features: ['โปรไฟล์ไม่จำกัด', 'ทุกอย่างใน Family', 'เข้าถึงหนังสือใหม่ก่อนใคร', 'อ่านออฟไลน์ได้'], cta: 'ทดลองใช้ฟรี', highlight: false },
    ],
  },
  faq: {
    title: 'มีคำถาม? เรามีคำตอบ',
    items: [
      { q: 'Pikko เหมาะกับเด็กอายุเท่าไหร่?', a: 'Pikko ออกแบบมาสำหรับเด็กอายุ 4–9 ปี มีสี่ระดับการอ่านที่เติบโตไปพร้อมกับลูก' },
      { q: 'ผู้ปกครองต้องพูดภาษาไทยได้ไหม?', a: 'ไม่จำเป็นเลย หนังสือทุกเล่มมีเสียงอ่านโดยผู้พูดภาษาไทยเป็นภาษาแม่ ลูกแค่กดเล่น' },
      { q: 'ทดลองใช้ก่อนชำระเงินได้ไหม?', a: 'ได้เลย แพ็กเกจ Free ให้เข้าถึงหนังสือ 2 เล่มเต็มโดยไม่ต้องบัตรเครดิตเลย' },
      { q: 'ใช้ได้กี่เครื่อง?', a: 'แพ็กเกจที่ชำระเงินใช้ได้ทุกอุปกรณ์ แพ็กเกจฟรีรองรับ 1 เครื่องในเวลาเดียวกัน' },
      { q: 'มีโหมดออฟไลน์ไหม?', a: 'การอ่านออฟไลน์มีใน Premium แพ็กเกจอื่นต้องใช้อินเทอร์เน็ต' },
    ],
  },
  finalCta: { title: 'เริ่มการเดินทางการอ่านของลูกวันนี้', subtitle: 'ฟรีตลอด อัปเกรดเมื่อพร้อม', cta: 'เริ่มอ่านฟรีเลย', sub: 'ไม่ต้องบัตรเครดิต' },
  auth: { signIn: 'เข้าสู่ระบบ', signUp: 'สร้างบัญชี', continueGoogle: 'ดำเนินการด้วย Google', terms: 'เมื่อดำเนินการต่อ คุณยอมรับข้อกำหนดการใช้งานและนโยบายความเป็นส่วนตัวของเรา' },
  footer: {
    tagline: 'ทำให้การอ่านภาษาไทยเป็นเรื่องสนุก ทีละนิทาน',
    product: 'ผลิตภัณฑ์', company: 'บริษัท',
    productLinks: ['ฟีเจอร์', 'ราคา', 'ระดับการอ่าน', 'สำหรับโรงเรียน'],
    companyLinks: ['เกี่ยวกับเรา', 'บล็อก', 'ความเป็นส่วนตัว', 'ข้อกำหนด', 'ติดต่อ'],
  },
};

// ─── French ──────────────────────────────────────────────────────────────────
const fr: typeof en = {
  nav: { cta: "Commence gratuitement" },
  hero: {
    badge: "Application de lecture thaïe · 4–9 ans",
    line1: "Chaque enfant",
    line2: "peut lire",
    subtitle: "Livres thaïs interactifs avec audio karaoké, histoires illustrées et suivi des progrès pour les parents.",
    cta: "Commence gratuitement",
    sub: "Sans carte bancaire · Résiliable à tout moment",
  },
  trust: {
    rating: "★★★★★  4.9",
    families: "2 400+ familles",
    langs: "EN · TH · FR · 中文 · 日本語 · 한국어",
    appStore: "App Store",
    safe: "Sécurisé pour les enfants",
  },
  problem: {
    title: "Apprendre le thaï ne devrait pas ressembler à des devoirs",
    problems: [
      { icon: "😰", text: "Les flashcards ennuient les enfants en quelques minutes — et les parents aussi" },
      { icon: "📚", text: "Les manuels thaïs supposent une salle de classe, pas un salon" },
      { icon: "🤷", text: "Les parents ne peuvent pas toujours aider — surtout dans les familles mixtes" },
    ],
    solution: {
      label: "La méthode Pikko",
      title: "L'histoire d'abord. Tout le reste suit.",
      points: [
        "De vrais livres thaïs, de vraies voix thaïes",
        "Les mots s'illuminent — l'enfant suit naturellement",
        "Les parents suivent les progrès sans interrompre",
      ],
    },
  },
  features: [
    { badge: "Lecture guidée", title1: "Les mots prennent vie", title2: "à chaque touche", body: "Chaque livre est narré par un locuteur natif thaï. Touche n'importe quel mot pour l'entendre — puis regarde-le s'illuminer." },
    { badge: "Bibliothèque", title1: "Des centaines de livres,", title2: "quatre niveaux de lecture", body: "Des premiers mots aux courtes histoires — Pikko grandit avec votre enfant. Chaque niveau ajoute du vocabulaire tout en consolidant l'acquis." },
    { badge: "Pour les parents", title1: "Suivez chaque étape", title2: "de leur parcours", body: "Séries de lecture, mots appris, livres terminés — tout dans un tableau de bord que votre enfant n'a pas besoin de toucher." },
  ],
  howItWorks: {
    title: "Prêt à lire en 3 minutes",
    subtitle: "Zéro configuration. Zéro prise de tête. Ouvrez et lisez.",
    steps: [
      { num: "1", title: "Choisir un livre", body: "Sélectionnez parmi des livres adaptés au niveau de votre enfant." },
      { num: "2", title: "Appuyer sur lecture", body: "L'audio démarre, les mots s'illuminent au fil de l'histoire — style karaoké." },
      { num: "3", title: "Suivre les progrès", body: "Consultez le tableau de bord parent : séries, mots appris, livres terminés." },
    ],
  },
  why: {
    title: "Conçu pour chaque enfant qui apprend le thaï",
    subtitle: "Que le thaï soit la première ou la quatrième langue de votre enfant, Pikko le rencontre là où il en est.",
    native: {
      badge: "Enfants thaïs natifs",
      title1: "Des bases solides",
      title2: "avant le CP thaï",
      body: "Pour les familles thaïes, Pikko renforce la phonétique et le vocabulaire que votre enfant rencontrera à l'école.",
      points: ["Vocabulaire aligné sur le programme", "Phonétique thaïe", "Confiance avant le Prathom 1"],
    },
    mixed: {
      badge: "Familles mixtes & diaspora",
      title1: "Le thaï comme seconde",
      title2: "langue, avec joie",
      body: "Aucun parent thaïophone n'est nécessaire. Les histoires audio permettent à votre enfant d'absorber le thaï naturellement.",
      points: ["100 % guidé par l'audio", "Histoires et contexte culturel thaï", "Progresser depuis zéro"],
    },
  },
  testimonials: [
    { name: "Aom", role: "Maman de Mali, 5 ans", quote: "Elle refusait de lire en thaï. Maintenant elle réclame Pikko avant de dormir. Chaque. Soir." },
    { name: "James", role: "Papa de deux enfants, Bangkok", quote: "Ma femme est thaïe, moi non. Pikko est la première chose qui fonctionne vraiment pour nous deux." },
    { name: "Nok", role: "Enseignante, CP thaï", quote: "Je recommande Pikko à tous les parents. Les enfants qui l'utilisent arrivent à l'école beaucoup plus confiants." },
  ],
  levels: {
    title: "Quatre niveaux, un seul parcours",
    subtitle: "Chaque niveau est conçu pour que les enfants se sentent stimulés — mais jamais bloqués.",
    agesLabel: "Âge",
    items: [
      { num: "1", name: "Premiers mots", th: "คำแรก", ages: "4–5", desc: "Mots isolés, patterns simples. Le tout début de la lecture thaïe." },
      { num: "2", name: "Phrases courtes", th: "ประโยคสั้น", ages: "5–6", desc: "Deux à trois mots, verbes courants, objets du quotidien." },
      { num: "3", name: "L'heure du conte", th: "เวลานิทาน", ages: "6–7", desc: "Histoires courtes illustrées avec un début, un milieu et une fin." },
      { num: "4", name: "Lecteur", th: "นักอ่าน", ages: "7–9", desc: "Récits plus longs, dialogues et vocabulaire enrichi." },
    ],
  },
  pricing: {
    title: "Tarifs simples et transparents",
    subtitle: "Commence gratuitement. Passe au premium quand tu es prêt.",
    monthly: "Mensuel", yearly: "Annuel", save: "Économisez 30 %", perMonth: "/mois", perYear: "/an", currency: "฿", popular: "Le plus populaire",
    plans: [
      { name: "Gratuit", nameTh: "ฟรี", monthly: 0, yearly: 0, desc: "Essaie Pikko avec 2 livres. Sans carte bancaire.", features: ["2 livres de démarrage", "Lecture audio", "Suivi basique", "1 profil enfant"], cta: "Commence gratuitement", highlight: false },
      { name: "1 Enfant", nameTh: "1 คน", monthly: 149, yearly: 1249, desc: "Idéal pour un apprenant progressant à son rythme.", features: ["1 profil enfant", "Accès à toute la bibliothèque", "Tableau de bord parent", "Audio + karaoké"], cta: "Essai gratuit", highlight: false },
      { name: "Famille", nameTh: "ครอบครัว", monthly: 249, yearly: 1999, desc: "Jusqu'à 4 enfants. Un abonnement, toute la famille.", features: ["Jusqu'à 4 profils", "Tout dans 1 Enfant", "Comparaison des progrès", "Support prioritaire"], cta: "Essai gratuit", highlight: true },
      { name: "Premium", nameTh: "พรีเมียม", monthly: 299, yearly: 2990, desc: "Profils illimités et l'expérience Pikko complète.", features: ["Profils illimités", "Tout dans Famille", "Accès anticipé aux nouveaux livres", "Lecture hors ligne"], cta: "Essai gratuit", highlight: false },
    ],
  },
  faq: {
    title: "Des questions ? Nous avons les réponses.",
    items: [
      { q: "Pour quel âge est Pikko ?", a: "Pikko est conçu pour les enfants de 4 à 9 ans, avec quatre niveaux de lecture qui évoluent avec votre enfant." },
      { q: "Les parents doivent-ils parler thaï ?", a: "Pas du tout. Tous les livres sont entièrement narrés par des locuteurs natifs thaïs." },
      { q: "Puis-je essayer avant de payer ?", a: "Oui. Le plan Gratuit donne accès à 2 livres complets sans carte bancaire requise." },
      { q: "Combien d'appareils peut-on utiliser ?", a: "Tous les plans payants fonctionnent sur n'importe quel appareil. Le plan gratuit supporte un appareil à la fois." },
      { q: "Y a-t-il un mode hors ligne ?", a: "La lecture hors ligne est disponible sur le plan Premium. Les autres plans nécessitent une connexion internet." },
    ],
  },
  finalCta: { title: "Lance le voyage de lecture de ton enfant aujourd'hui", subtitle: "Gratuit pour toujours. Passe au premium quand tu es prêt.", cta: "Commence gratuitement", sub: "Sans carte bancaire" },
  auth: { signIn: "Se connecter", signUp: "Créer un compte", continueGoogle: "Continuer avec Google", terms: "En continuant, vous acceptez nos Conditions d'utilisation et notre Politique de confidentialité." },
  footer: {
    tagline: "Rendre l'apprentissage du thaï joyeux, une histoire à la fois.",
    product: "Produit", company: "Entreprise",
    productLinks: ["Fonctionnalités", "Tarifs", "Niveaux", "Pour les écoles"],
    companyLinks: ["À propos", "Blog", "Confidentialité", "Conditions", "Contact"],
  },
};

// ─── Chinese Simplified ───────────────────────────────────────────────────────
const zh: typeof en = {
  nav: { cta: "免费开始" },
  hero: {
    badge: "泰语阅读应用 · 4–9岁",
    line1: "让每个孩子都能",
    line2: "爱上阅读泰语",
    subtitle: "互动泰语绘本，配有卡拉OK音频、精美插图，以及家长学习进度追踪功能。",
    cta: "免费开始阅读",
    sub: "无需信用卡 · 随时取消",
  },
  trust: {
    rating: "★★★★★  4.9",
    families: "2,400+ 个家庭",
    langs: "EN · TH · FR · 中文 · 日本語 · 한국어",
    appStore: "App Store",
    safe: "儿童安全认证",
  },
  problem: {
    title: "学泰语不应该像做作业一样痛苦",
    problems: [
      { icon: "😰", text: "闪卡几分钟就让孩子厌倦——家长也一样" },
      { icon: "📚", text: "泰语教材是为课堂设计的，不是为客厅" },
      { icon: "🤷", text: "家长不总能帮上忙——尤其是多文化家庭" },
    ],
    solution: {
      label: "Pikko的方式",
      title: "故事第一，其他自然跟来。",
      points: ["真实泰语绘本，真实泰语母语发音", "单词自动高亮——孩子自然跟读", "家长实时追踪进度，不打扰孩子玩耍"],
    },
  },
  features: [
    { badge: "跟读模式", title1: "每次点击", title2: "单词都能活起来", body: "每本书都由泰语母语播音员朗读。点击任意单词即可收听——然后看着它随故事高亮闪烁。" },
    { badge: "成长书库", title1: "数百本绘本，", title2: "四个阅读级别", body: "从单个词汇到短篇故事——Pikko陪伴孩子成长。每个级别在巩固已学知识的同时增加新词汇。" },
    { badge: "家长专区", title1: "追踪孩子", title2: "每一步成长", body: "阅读连续天数、新学词汇、完成书目——尽在家长仪表盘，无需孩子操作。" },
  ],
  howItWorks: {
    title: "3分钟即可开始阅读",
    subtitle: "无需设置，无需烦恼，打开即读。",
    steps: [
      { num: "1", title: "选择绘本", body: "从适合孩子水平的绘本中选择。" },
      { num: "2", title: "点击播放", body: "音频开始，单词随故事高亮——卡拉OK风格。" },
      { num: "3", title: "追踪进度", body: "查看家长仪表盘了解连续阅读天数、学习词汇和完成书目。" },
    ],
  },
  why: {
    title: "专为每一位学习泰语的孩子设计",
    subtitle: "无论泰语是孩子的第一语言还是第四语言，Pikko都能与他们相遇。",
    native: {
      badge: "泰语母语儿童",
      title1: "小学前打好",
      title2: "扎实的语言基础",
      body: "对于泰国家庭，Pikko强化孩子在学校会遇到的语音和词汇，建立持久的阅读自信。",
      points: ["学校课程对齐词汇", "泰语拼音规律", "小学一年级前建立自信"],
    },
    mixed: {
      badge: "混血与华人家庭",
      title1: "泰语作为第二语言",
      title2: "快乐且有效",
      body: "不需要会说泰语的家长。全音频引导的故事让孩子自然吸收泰语，按自己节奏进步。",
      points: ["全程音频引导，家长可选参与", "文化故事与泰国背景", "从零开始也能进步"],
    },
  },
  testimonials: [
    { name: "Aom", role: "5岁Mali的妈妈", quote: "她以前拒绝读泰语。现在每晚睡前都要求开Pikko。每。一。晚。" },
    { name: "James", role: "两孩爸爸，曼谷", quote: "我妻子是泰国人，我不是。Pikko是第一个对我们俩都真正有效的工具。" },
    { name: "Nok", role: "小学一年级教师", quote: "我向每位家长推荐Pikko。使用它的孩子来学校时自信心明显更强。" },
  ],
  levels: {
    title: "四个级别，一段旅程",
    subtitle: "每个级别都经过精心设计，让孩子感到挑战——但不会卡住。",
    agesLabel: "年龄",
    items: [
      { num: "1", name: "第一个词", th: "คำแรก", ages: "4–5", desc: "单个词汇，简单规律。泰语阅读的真正起点。" },
      { num: "2", name: "短句", th: "ประโยคสั้น", ages: "5–6", desc: "两到三个词，常用动词，日常物品。" },
      { num: "3", name: "故事时间", th: "เวลานิทาน", ages: "6–7", desc: "带插图的短篇故事，有开头、中间和结尾。" },
      { num: "4", name: "小读者", th: "นักอ่าน", ages: "7–9", desc: "较长的叙述、对话和更丰富的词汇。" },
    ],
  },
  pricing: {
    title: "简单透明的定价",
    subtitle: "免费开始，准备好了再升级。",
    monthly: "月付", yearly: "年付", save: "节省30%", perMonth: "/月", perYear: "/年", currency: "฿", popular: "最受欢迎",
    plans: [
      { name: "免费", nameTh: "ฟรี", monthly: 0, yearly: 0, desc: "用2本入门书体验Pikko，无需信用卡。", features: ["2本入门书", "音频播放", "基础进度追踪", "1个儿童档案"], cta: "免费开始", highlight: false },
      { name: "1个孩子", nameTh: "1 คน", monthly: 149, yearly: 1249, desc: "适合一位学习者按自己节奏成长。", features: ["1个儿童档案", "完整书库访问", "家长仪表盘", "音频+卡拉OK"], cta: "免费试用", highlight: false },
      { name: "家庭版", nameTh: "ครอบครัว", monthly: 249, yearly: 1999, desc: "最多4个孩子，一个订阅，全家使用。", features: ["最多4个儿童档案", "包含1个孩子的所有功能", "进度对比", "优先支持"], cta: "免费试用", highlight: true },
      { name: "旗舰版", nameTh: "พรีเมียม", monthly: 299, yearly: 2990, desc: "无限档案，完整Pikko体验。", features: ["无限儿童档案", "包含家庭版所有功能", "新书抢先体验", "离线阅读"], cta: "免费试用", highlight: false },
    ],
  },
  faq: {
    title: "有问题？我们有答案。",
    items: [
      { q: "Pikko适合几岁的孩子？", a: "Pikko专为4-9岁儿童设计，有四个阅读级别随孩子成长。" },
      { q: "家长需要会说泰语吗？", a: "完全不需要。所有绘本均由泰语母语播音员朗读——孩子只需点击播放。" },
      { q: "付费前可以试用吗？", a: "可以。免费计划提供2本完整绘本，无需信用卡。" },
      { q: "可以在多少台设备上使用？", a: "所有付费计划可在任何设备上使用。免费计划同时支持一台设备。" },
      { q: "有离线模式吗？", a: "离线阅读在旗舰版计划中可用。其他计划需要网络连接。" },
    ],
  },
  finalCta: { title: "今天就开始孩子的阅读之旅", subtitle: "永久免费，准备好了再升级。", cta: "免费开始阅读", sub: "无需信用卡" },
  auth: { signIn: "登录", signUp: "创建账号", continueGoogle: "使用Google继续", terms: "继续即表示您同意我们的服务条款和隐私政策。" },
  footer: {
    tagline: "让泰语学习充满快乐，一次一个故事。",
    product: "产品", company: "公司",
    productLinks: ["功能", "定价", "级别", "学校版"],
    companyLinks: ["关于我们", "博客", "隐私政策", "条款", "联系我们"],
  },
};

// ─── Japanese ─────────────────────────────────────────────────────────────────
const ja: typeof en = {
  nav: { cta: "無料で始める" },
  hero: {
    badge: "タイ語読書アプリ · 4〜9歳向け",
    line1: "すべての子どもが",
    line2: "タイ語を好きになれる",
    subtitle: "カラオケ式音声・美しいイラスト・保護者向け学習追跡機能を備えたインタラクティブなタイ語絵本。",
    cta: "無料で読み始める",
    sub: "クレジットカード不要 · いつでもキャンセル可",
  },
  trust: {
    rating: "★★★★★  4.9",
    families: "2,400以上のご家庭",
    langs: "EN · TH · FR · 中文 · 日本語 · 한국어",
    appStore: "App Store",
    safe: "お子様に安全",
  },
  problem: {
    title: "タイ語の学習は宿題のように感じる必要はない",
    problems: [
      { icon: "😰", text: "単語カードは数分で子どもを飽きさせる——保護者も同様" },
      { icon: "📚", text: "タイ語の教科書は教室向けで、家庭向けではない" },
      { icon: "🤷", text: "保護者が常に助けられるとは限らない——特に多文化家庭では" },
    ],
    solution: {
      label: "Pikkoの方法",
      title: "まずお話から。あとは自然についてくる。",
      points: ["本物のタイ語絵本、本物のタイ語ネイティブの声", "単語がハイライト——子どもは自然についていける", "保護者は遊びを妨げずに進歩を確認できる"],
    },
  },
  features: [
    { badge: "読み聞かせ", title1: "タップするたびに", title2: "言葉が生き生きとする", body: "すべての絵本はタイ語ネイティブスピーカーによってナレーションされています。どの単語でもタップして聞け、物語に合わせてハイライトします。" },
    { badge: "成長する本棚", title1: "何百冊もの絵本と", title2: "4つの読書レベル", body: "単語から短い物語まで——Pikkoはお子様とともに成長します。各レベルは既習の内容を強化しながら新しい語彙を追加します。" },
    { badge: "保護者向け", title1: "学習の歩みを", title2: "すべて見守る", body: "読書の連続記録、新しく学んだ単語、読み終えた本——すべてお子様が触れる必要のない保護者ダッシュボードで確認できます。" },
  ],
  howItWorks: {
    title: "3分で読み始められる",
    subtitle: "設定不要。面倒なし。開いて読むだけ。",
    steps: [
      { num: "1", title: "絵本を選ぶ", body: "お子様のレベルに合った絵本から選べます。" },
      { num: "2", title: "再生する", body: "音声が始まり、物語に合わせて単語がハイライトされます——カラオケ形式。" },
      { num: "3", title: "進捗を確認", body: "保護者ダッシュボードで連続記録、学習単語、読了冊数を確認できます。" },
    ],
  },
  why: {
    title: "タイ語を学ぶすべての子どものために",
    subtitle: "タイ語がお子様の第一言語であっても第四言語であっても、Pikkoはそこから始めます。",
    native: {
      badge: "タイ語ネイティブの子ども",
      title1: "小学校入学前に",
      title2: "確かな基礎を築く",
      body: "タイ系家庭向けに、Pikkoは学校で必要なフォニックスと語彙を強化し、長続きする読書への自信を育みます。",
      points: ["学校カリキュラム対応の語彙", "タイ語フォニックスパターン", "プラトム1年生前に自信をつける"],
    },
    mixed: {
      badge: "国際・混合家庭",
      title1: "第二言語としての",
      title2: "タイ語を楽しく",
      body: "タイ語を話せる保護者は不要です。音声主導の物語で、お子様はタイ語を自然に吸収できます。",
      points: ["完全音声ガイド、保護者不要", "文化的な物語と背景", "ゼロからでも着実に上達"],
    },
  },
  testimonials: [
    { name: "Aom", role: "5歳のMaliのお母さん", quote: "タイ語の読書を拒否していたのに、今は毎晩寝る前にPikkoをねだるんです。毎・晩。" },
    { name: "James", role: "2児のパパ、バンコク在住", quote: "妻はタイ人、私は違います。Pikkoは私たち両方に本当に効果があった初めてのものです。" },
    { name: "Nok", role: "小学1年生担任教師", quote: "すべての保護者にPikkoを勧めています。使っている子どもは学校に来るときずっと自信に満ちています。" },
  ],
  levels: {
    title: "4つのレベル、一つの旅",
    subtitle: "各レベルはお子様が挑戦を感じながら——でも行き詰まらないように設計されています。",
    agesLabel: "年齢",
    items: [
      { num: "1", name: "はじめての言葉", th: "คำแรก", ages: "4–5", desc: "単語、シンプルなパターン。タイ語読書の最初の一歩。" },
      { num: "2", name: "短い文", th: "ประโยคสั้น", ages: "5–6", desc: "2〜3語の文、一般的な動詞、日常の物。" },
      { num: "3", name: "お話の時間", th: "เวลานิทาน", ages: "6–7", desc: "始まり・中盤・結末のある短い絵本。" },
      { num: "4", name: "読書家", th: "นักอ่าน", ages: "7–9", desc: "長めの物語、会話、より豊かな語彙。" },
    ],
  },
  pricing: {
    title: "シンプルで正直な料金体系",
    subtitle: "無料で始めて、準備ができたらアップグレード。",
    monthly: "月払い", yearly: "年払い", save: "30%お得", perMonth: "/月", perYear: "/年", currency: "฿", popular: "人気No.1",
    plans: [
      { name: "無料", nameTh: "ฟรี", monthly: 0, yearly: 0, desc: "2冊の絵本でPikkoをお試し。クレジットカード不要。", features: ["入門書2冊", "音声再生", "基本的な進捗管理", "子どもプロフィール1つ"], cta: "無料で始める", highlight: false },
      { name: "お子様1人", nameTh: "1 คน", monthly: 149, yearly: 1249, desc: "自分のペースで学ぶ1人の学習者に最適。", features: ["子どもプロフィール1つ", "全書庫アクセス", "保護者ダッシュボード", "音声+カラオケ"], cta: "無料トライアル", highlight: false },
      { name: "ファミリー", nameTh: "ครอบครัว", monthly: 249, yearly: 1999, desc: "最大4人の子ども。1つのサブスクで家族全員。", features: ["子どもプロフィール最大4つ", "お子様1人プランの全機能", "進捗比較", "優先サポート"], cta: "無料トライアル", highlight: true },
      { name: "プレミアム", nameTh: "พรีเมียม", monthly: 299, yearly: 2990, desc: "無制限プロフィールと完全なPikkoエクスペリエンス。", features: ["無制限プロフィール", "ファミリープランの全機能", "新しい絵本への早期アクセス", "オフライン読書"], cta: "無料トライアル", highlight: false },
    ],
  },
  faq: {
    title: "ご質問がありますか？答えはこちら。",
    items: [
      { q: "Pikkoは何歳向けですか？", a: "Pikkoは4〜9歳のお子様向けに設計されており、お子様とともに成長する4つの読書レベルがあります。" },
      { q: "保護者はタイ語を話せる必要がありますか？", a: "全く必要ありません。すべての絵本はタイ語ネイティブスピーカーによって完全にナレーションされています。" },
      { q: "支払い前に試せますか？", a: "はい。無料プランでは2冊の完全な絵本にアクセスでき、クレジットカードは不要です。" },
      { q: "何台の端末で使えますか？", a: "有料プランはどの端末でも使用できます。無料プランは同時に1台の端末をサポートします。" },
      { q: "オフラインモードはありますか？", a: "オフライン読書はプレミアムプランで利用可能です。他のプランはインターネット接続が必要です。" },
    ],
  },
  finalCta: { title: "今日からお子様の読書の旅を始めましょう", subtitle: "永久無料。準備ができたらアップグレード。", cta: "無料で読み始める", sub: "クレジットカード不要" },
  auth: { signIn: "ログイン", signUp: "アカウント作成", continueGoogle: "Googleで続ける", terms: "続行することで、利用規約とプライバシーポリシーに同意したことになります。" },
  footer: {
    tagline: "一つひとつの物語で、タイ語学習を楽しく。",
    product: "製品", company: "会社",
    productLinks: ["機能", "料金", "レベル", "学校向け"],
    companyLinks: ["私たちについて", "ブログ", "プライバシー", "利用規約", "お問い合わせ"],
  },
};

// ─── Korean ───────────────────────────────────────────────────────────────────
const ko: typeof en = {
  nav: { cta: "무료로 시작하기" },
  hero: {
    badge: "태국어 독서 앱 · 4~9세",
    line1: "모든 아이가",
    line2: "태국어 읽기를 즐길 수 있어요",
    subtitle: "카라오케 오디오, 아름다운 삽화, 학부모 학습 추적 기능을 갖춘 인터랙티브 태국어 그림책.",
    cta: "무료로 읽기 시작",
    sub: "신용카드 불필요 · 언제든지 취소 가능",
  },
  trust: {
    rating: "★★★★★  4.9",
    families: "2,400개 이상의 가정",
    langs: "EN · TH · FR · 中文 · 日本語 · 한국어",
    appStore: "App Store",
    safe: "어린이 안전 인증",
  },
  problem: {
    title: "태국어 학습이 숙제처럼 느껴질 필요는 없어요",
    problems: [
      { icon: "😰", text: "플래시카드는 몇 분 만에 아이를 지루하게 만들어요 — 부모도 마찬가지죠" },
      { icon: "📚", text: "태국어 교과서는 교실용으로 만들어졌지, 거실용이 아니에요" },
      { icon: "🤷", text: "부모가 항상 도울 수 있는 것은 아니에요 — 특히 다문화 가정에서는" },
    ],
    solution: {
      label: "Pikko의 방법",
      title: "이야기가 먼저. 나머지는 자연스럽게.",
      points: ["진짜 태국어 책, 진짜 태국어 원어민 목소리", "단어가 빛나며 아이가 자연스럽게 따라가요", "부모는 놀이를 방해하지 않고 진도를 확인해요"],
    },
  },
  features: [
    { badge: "따라 읽기", title1: "탭할 때마다", title2: "단어가 살아나요", body: "모든 책은 태국어 원어민이 낭독합니다. 어떤 단어든 탭하여 들을 수 있고, 이야기가 진행되면서 단어가 빛납니다." },
    { badge: "성장하는 서재", title1: "수백 권의 그림책,", title2: "4가지 읽기 수준", body: "단어부터 짧은 이야기까지 — Pikko는 아이와 함께 성장합니다. 각 단계는 기존 지식을 강화하면서 새 어휘를 추가합니다." },
    { badge: "학부모 전용", title1: "아이의 모든 발걸음을", title2: "함께 지켜봐요", body: "읽기 연속 기록, 새로 배운 단어, 완독한 책 — 아이가 건드릴 필요 없는 학부모 대시보드에서 모두 확인하세요." },
  ],
  howItWorks: {
    title: "3분 만에 읽기 시작",
    subtitle: "설정 없음. 번거로움 없음. 열고 읽기만 하면 돼요.",
    steps: [
      { num: "1", title: "책 선택", body: "아이 수준에 맞는 책 중에서 선택하세요." },
      { num: "2", title: "재생", body: "오디오가 시작되고, 이야기에 맞춰 단어가 빛납니다 — 카라오케 방식." },
      { num: "3", title: "진도 확인", body: "학부모 대시보드에서 연속 기록, 학습 단어, 완독한 책을 확인하세요." },
    ],
  },
  why: {
    title: "태국어를 배우는 모든 아이를 위해 만들었어요",
    subtitle: "태국어가 아이의 첫 번째 언어든 네 번째 언어든, Pikko가 함께합니다.",
    native: {
      badge: "태국어 원어민 아이",
      title1: "초등학교 입학 전",
      title2: "탄탄한 기초 다지기",
      body: "태국 가정을 위해 Pikko는 학교에서 만날 발음과 어휘를 강화하여 오래 지속되는 읽기 자신감을 키워줍니다.",
      points: ["학교 교육과정 연계 어휘", "태국어 파닉스 패턴", "프라톰 1학년 전 자신감 키우기"],
    },
    mixed: {
      badge: "다문화 & 혼혈 가정",
      title1: "제2언어로서의 태국어,",
      title2: "즐겁고 효과적으로",
      body: "태국어를 하는 부모가 없어도 됩니다. 오디오 중심 이야기로 아이가 자연스럽게 태국어를 흡수합니다.",
      points: ["100% 오디오 가이드, 부모 선택 참여", "문화적 이야기와 배경", "완전 초보도 성장 가능"],
    },
  },
  testimonials: [
    { name: "Aom", role: "5살 Mali의 엄마", quote: "태국어 읽기를 거부했는데, 지금은 매일 밤 자기 전에 Pikko를 켜달라고 해요. 매. 일. 밤." },
    { name: "James", role: "두 아이 아빠, 방콕 거주", quote: "아내는 태국인이고 저는 아닙니다. Pikko는 우리 두 사람 모두에게 정말 효과가 있는 첫 번째 도구예요." },
    { name: "Nok", role: "초등학교 1학년 담임교사", quote: "모든 학부모에게 Pikko를 추천합니다. 사용한 아이들이 훨씬 더 자신감 있게 학교에 와요." },
  ],
  levels: {
    title: "4가지 단계, 하나의 여정",
    subtitle: "각 단계는 아이가 도전감을 느끼되 — 절대 막히지 않도록 정교하게 설계되었습니다.",
    agesLabel: "나이",
    items: [
      { num: "1", name: "첫 단어", th: "คำแรก", ages: "4–5", desc: "단어 하나, 간단한 패턴. 태국어 읽기의 시작." },
      { num: "2", name: "짧은 문장", th: "ประโยคสั้น", ages: "5–6", desc: "2~3단어 문장, 일반 동사, 일상 사물." },
      { num: "3", name: "이야기 시간", th: "เวลานิทาน", ages: "6–7", desc: "시작, 중간, 끝이 있는 짧은 그림책." },
      { num: "4", name: "독서가", th: "นักอ่าน", ages: "7–9", desc: "더 긴 이야기, 대화, 풍부한 어휘." },
    ],
  },
  pricing: {
    title: "단순하고 솔직한 요금제",
    subtitle: "무료로 시작하고, 준비되면 업그레이드하세요.",
    monthly: "월간", yearly: "연간", save: "30% 절약", perMonth: "/월", perYear: "/년", currency: "฿", popular: "가장 인기",
    plans: [
      { name: "무료", nameTh: "ฟรี", monthly: 0, yearly: 0, desc: "입문서 2권으로 Pikko를 체험하세요. 신용카드 불필요.", features: ["입문서 2권", "오디오 재생", "기본 진도 관리", "어린이 프로필 1개"], cta: "무료로 시작하기", highlight: false },
      { name: "어린이 1명", nameTh: "1 คน", monthly: 149, yearly: 1249, desc: "자신의 속도로 성장하는 1명의 학습자에게 완벽.", features: ["어린이 프로필 1개", "전체 서재 접근", "학부모 대시보드", "오디오 + 카라오케"], cta: "무료 체험", highlight: false },
      { name: "가족", nameTh: "ครอบครัว", monthly: 249, yearly: 1999, desc: "최대 4명의 아이. 구독 하나로 온 가족.", features: ["어린이 프로필 최대 4개", "어린이 1명 플랜의 모든 기능", "진도 비교", "우선 지원"], cta: "무료 체험", highlight: true },
      { name: "프리미엄", nameTh: "พรีเมียม", monthly: 299, yearly: 2990, desc: "무제한 프로필과 완전한 Pikko 경험.", features: ["무제한 프로필", "가족 플랜의 모든 기능", "새 책 조기 접근", "오프라인 읽기"], cta: "무료 체험", highlight: false },
    ],
  },
  faq: {
    title: "질문이 있으신가요? 답변해 드려요.",
    items: [
      { q: "Pikko는 몇 살 아이에게 맞나요?", a: "Pikko는 4~9세 어린이를 위해 설계되었으며, 아이와 함께 성장하는 4가지 읽기 단계가 있습니다." },
      { q: "부모가 태국어를 할 줄 알아야 하나요?", a: "전혀요. 모든 책은 태국어 원어민이 완전히 낭독합니다 — 아이는 재생 버튼만 누르면 돼요." },
      { q: "결제 전에 체험할 수 있나요?", a: "네. 무료 플랜으로 신용카드 없이 책 2권에 완전히 접근할 수 있습니다." },
      { q: "몇 대의 기기에서 사용할 수 있나요?", a: "모든 유료 플랜은 어떤 기기에서도 사용할 수 있습니다. 무료 플랜은 동시에 한 대를 지원합니다." },
      { q: "오프라인 모드가 있나요?", a: "오프라인 읽기는 프리미엄 플랜에서 사용할 수 있습니다. 다른 플랜은 인터넷 연결이 필요합니다." },
    ],
  },
  finalCta: { title: "오늘부터 아이의 독서 여정을 시작하세요", subtitle: "영원히 무료. 준비되면 업그레이드.", cta: "무료로 읽기 시작", sub: "신용카드 불필요" },
  auth: { signIn: "로그인", signUp: "계정 만들기", continueGoogle: "Google로 계속하기", terms: "계속 진행하면 서비스 약관 및 개인정보 처리방침에 동의하는 것입니다." },
  footer: {
    tagline: "한 번에 하나의 이야기로, 태국어 학습을 즐겁게.",
    product: "제품", company: "회사",
    productLinks: ["기능", "요금제", "단계", "학교용"],
    companyLinks: ["소개", "블로그", "개인정보", "약관", "문의"],
  },
};

export const translations = { en, th, fr, zh, ja, ko };
export type T = typeof en;
