import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPost, getAllSlugs, getAuthorBio, type Lang } from '@/lib/blog';
import AuthorBio from '@/components/blog/AuthorBio';
import FaqSection from '@/components/blog/FaqSection';
import RelatedReads from '@/components/blog/RelatedReads';
import EditLog from '@/components/blog/EditLog';
import ShareButtons from '@/components/blog/ShareButtons';
import LeadMagnet from '@/components/blog/LeadMagnet';
import Link from 'next/link';

interface Params { lang: string; slug: string }

export async function generateStaticParams() {
  return getAllSlugs().map(({ lang, slug }) => ({ lang, slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { lang, slug } = await params;
  const post = getPost(lang as Lang, slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.meta_description,
    openGraph: { title: post.title, description: post.meta_description, images: post.og_image ? [post.og_image] : [] },
    alternates: { languages: { [lang]: `/blog/${lang}/${slug}` } },
  };
}

const LANG_LABELS: Record<string, string> = { en: 'EN', fr: 'FR', th: 'TH', jp: 'JP', ko: 'KO', zh: 'ZH' };

const mdxComponents = {
  FaqSection,
  RelatedReads,
  EditLog,
  LeadMagnet,
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h1 style={{ fontSize: 'clamp(1.6rem,4vw,2.2rem)', fontWeight: 900, color: '#1A2B3C', lineHeight: 1.2, marginBottom: '1rem' }} {...props} />,
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#1A2B3C', marginTop: '2rem', marginBottom: '0.75rem' }} {...props} />,
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#2D3F54', marginTop: '1.5rem', marginBottom: '0.5rem' }} {...props} />,
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => <p style={{ fontSize: '1.0625rem', lineHeight: 1.8, color: '#2D3F54', marginBottom: '1.1rem' }} {...props} />,
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem', color: '#2D3F54', lineHeight: 1.8 }} {...props} />,
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => <ol style={{ paddingLeft: '1.5rem', marginBottom: '1rem', color: '#2D3F54', lineHeight: 1.8 }} {...props} />,
  li: (props: React.HTMLAttributes<HTMLLIElement>) => <li style={{ marginBottom: '0.4rem', fontSize: '1.0625rem' }} {...props} />,
  blockquote: (props: React.HTMLAttributes<HTMLElement>) => <blockquote style={{ borderLeft: '4px solid #7C2DFF', paddingLeft: '1rem', margin: '1.5rem 0', color: '#6B7A8D', fontStyle: 'italic' }} {...props} />,
  strong: (props: React.HTMLAttributes<HTMLElement>) => <strong style={{ fontWeight: 800, color: '#1A2B3C' }} {...props} />,
  em: (props: React.HTMLAttributes<HTMLElement>) => <em style={{ color: '#7C2DFF', fontStyle: 'italic' }} {...props} />,
  hr: () => <hr style={{ border: 'none', borderTop: '1px solid #E8E0FF', margin: '2rem 0' }} />,
  table: (props: React.HTMLAttributes<HTMLTableElement>) => <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}><table style={{ borderCollapse: 'collapse', width: '100%', fontSize: '0.95rem' }} {...props} /></div>,
  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => <th style={{ padding: '8px 12px', background: '#F0E8FF', fontWeight: 800, textAlign: 'left', borderBottom: '2px solid #E8E0FF' }} {...props} />,
  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => <td style={{ padding: '8px 12px', borderBottom: '1px solid #F0E8FF', color: '#2D3F54' }} {...props} />,
  code: (props: React.HTMLAttributes<HTMLElement>) => <code style={{ background: '#F0E8FF', borderRadius: 4, padding: '2px 6px', fontSize: '0.9em', color: '#7C2DFF' }} {...props} />,
};

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { lang, slug } = await params;
  const post = getPost(lang as Lang, slug);
  if (!post) notFound();

  const authorBio = getAuthorBio(post.author);
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.meta_description,
    datePublished: post.date,
    author: authorBio ? { '@type': 'Person', name: authorBio.name } : undefined,
  };

  return (
    <div style={{ background: 'white', minHeight: '100vh' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      {/* Top bar */}
      <div style={{ background: 'linear-gradient(150deg,#1A0845,#5B20CC)', padding: '12px 24px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <Link href="/blog" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 13, fontWeight: 600 }}>← Blog</Link>
        <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>/</span>
        <span style={{ fontSize: 11, fontWeight: 800, padding: '3px 10px', borderRadius: 99, background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.85)' }}>{LANG_LABELS[lang]}</span>
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginLeft: 'auto' }}>{post.reading_time_min} min read</span>
      </div>

      {/* Article */}
      <article style={{ maxWidth: 680, margin: '0 auto', padding: '40px 24px 60px' }}>
        {/* Series tag */}
        {post.series && (
          <p style={{ fontSize: 11, fontWeight: 800, color: '#9B74E8', letterSpacing: '0.1em', marginBottom: 12 }}>
            RAISING THAI READERS SERIES
          </p>
        )}

        {/* Date + reading time */}
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 24 }}>
          <span style={{ fontSize: 12, color: '#9AA0AB' }}>
            {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
          <span style={{ fontSize: 12, color: '#9AA0AB' }}>·</span>
          <span style={{ fontSize: 12, color: '#9AA0AB' }}>{post.reading_time_min} min read</span>
        </div>

        {/* Keywords as tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 32 }}>
          {(post.keywords ?? []).slice(0, 4).map(k => (
            <span key={k} style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 99, background: '#F0E8FF', color: '#7C2DFF' }}>{k}</span>
          ))}
        </div>

        {/* MDX content */}
        <MDXRemote source={post.content} components={mdxComponents as unknown as Record<string, React.ComponentType>} />

        {/* Author bio */}
        {authorBio && (
          <AuthorBio
            name={authorBio.name}
            location={authorBio.location}
            bio={authorBio.bio}
            authorId={post.author}
          />
        )}

        <ShareButtons url={`https://pikko.app/blog/${lang}/${slug}`} title={post.title} />
      </article>
    </div>
  );
}
