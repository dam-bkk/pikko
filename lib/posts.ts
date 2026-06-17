/* Replace body fields with content from posts.md when ready */
export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  readTime: number;
  tags: string[];
  date: string;
  accent: string;
  emoji: string;
}

export const POSTS: Post[] = [
  {
    slug: 'thai-tones-for-kids',
    title: 'The 5 tones of Thai — how children learn them naturally',
    excerpt: 'Thai tones feel impossible to adults, but children under 7 absorb them effortlessly. Here\'s why, and how to nurture that window.',
    body: '',
    readTime: 5,
    tags: ['phonics', 'tones', 'neuroscience'],
    date: '2025-03-10',
    accent: '#FF6635',
    emoji: '🎵',
  },
  {
    slug: 'reading-before-speaking',
    title: 'Reading before speaking: why Pikko starts with listening',
    excerpt: 'Counterintuitively, exposing children to written Thai while hearing audio builds stronger long-term literacy than drilling pronunciation first.',
    body: '',
    readTime: 4,
    tags: ['method', 'research', 'audio'],
    date: '2025-03-24',
    accent: '#3BAFDA',
    emoji: '👂',
  },
  {
    slug: 'thai-consonant-clusters',
    title: 'Thai consonant clusters: a parent\'s plain-English guide',
    excerpt: 'ก ข ค ง — the 44 consonants look daunting. This guide breaks down the logic so you can support your child without studying for years.',
    body: '',
    readTime: 6,
    tags: ['consonants', 'guide', 'parents'],
    date: '2025-04-07',
    accent: '#9B74E8',
    emoji: '📖',
  },
  {
    slug: 'karaoke-reading-phonemic',
    title: 'How karaoke-style reading builds phonemic awareness',
    excerpt: 'Word-by-word highlighting synchronised with audio is not just fun — research shows it doubles reading comprehension speed in early learners.',
    body: '',
    readTime: 5,
    tags: ['karaoke', 'research', 'phonemic'],
    date: '2025-04-21',
    accent: '#4CC97C',
    emoji: '🎤',
  },
  {
    slug: 'screen-time-vs-reading',
    title: 'Screen time or reading time? Finding the healthy balance',
    excerpt: 'All screens are not equal. Interactive reading apps activate different brain regions than passive video — here\'s what the studies say.',
    body: '',
    readTime: 4,
    tags: ['screen time', 'health', 'balance'],
    date: '2025-05-05',
    accent: '#FFD60A',
    emoji: '📱',
  },
  {
    slug: '10-first-thai-words',
    title: '10 Thai words your child will learn in their first Pikko book',
    excerpt: 'From หมา (dog) to น้ำ (water), these high-frequency words appear in every book and form the foundation of Thai reading fluency.',
    body: '',
    readTime: 3,
    tags: ['vocabulary', 'beginner', 'words'],
    date: '2025-05-19',
    accent: '#FF8C35',
    emoji: '✨',
  },
  {
    slug: 'consistency-beats-intensity',
    title: 'Why 10 minutes a day beats 2 hours on weekends',
    excerpt: 'The spacing effect is one of the most robust findings in learning science. Here\'s how to use it to build a reading habit your child loves.',
    body: '',
    readTime: 4,
    tags: ['habit', 'routine', 'science'],
    date: '2025-06-02',
    accent: '#FF5757',
    emoji: '📅',
  },
  {
    slug: 'spaced-repetition-vocabulary',
    title: 'The science of spaced repetition in vocabulary building',
    excerpt: 'Pikko\'s mastery system surfaces words at exactly the right moment — just before you forget them. Here\'s the algorithm explained simply.',
    body: '',
    readTime: 5,
    tags: ['memory', 'vocabulary', 'SRS'],
    date: '2025-06-16',
    accent: '#00D2AA',
    emoji: '🧠',
  },
  {
    slug: 'bilingual-families-thai',
    title: 'Bilingual families: making Thai reading a daily habit abroad',
    excerpt: 'Raising a Thai reader outside Thailand is hard. These families share what actually worked — from Chiang Mai to Paris to London.',
    body: '',
    readTime: 7,
    tags: ['bilingual', 'diaspora', 'stories'],
    date: '2025-06-30',
    accent: '#FF4C91',
    emoji: '🌍',
  },
  {
    slug: 'gor-gai-to-sentences',
    title: 'From ก to full sentences: the roadmap to Thai reading',
    excerpt: 'A clear, stage-by-stage breakdown of how Thai reading develops from letter recognition to fluent reading — and where Pikko fits in.',
    body: '',
    readTime: 6,
    tags: ['roadmap', 'stages', 'guide'],
    date: '2025-07-14',
    accent: '#7C4DFF',
    emoji: '🗺️',
  },
];

export function getPostBySlug(slug: string): Post | undefined {
  return POSTS.find(p => p.slug === slug);
}
