import Link from 'next/link';

interface RelatedPost {
  slug: string;
  lang: string;
  title: string;
  readTime?: number;
}

export default function RelatedReads({ posts }: { posts: RelatedPost[] }) {
  if (!posts?.length) return null;
  return (
    <section style={{ marginTop: 40, padding: '20px 24px', background: '#F7F5FF', borderRadius: 16 }}>
      <p style={{ fontSize: 12, fontWeight: 800, color: '#9B74E8', letterSpacing: '0.1em', marginBottom: 12 }}>RELATED READING</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {posts.map(p => (
          <Link key={p.slug} href={`/blog/${p.lang}/${p.slug}`} style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: '#E8E0FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 16 }}>
              📖
            </div>
            <div>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#1A2B3C', lineHeight: 1.3 }}>{p.title}</p>
              {p.readTime && <p style={{ fontSize: 11, color: '#9AA0AB' }}>{p.readTime} min read</p>}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
