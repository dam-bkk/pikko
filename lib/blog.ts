import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export type Lang = 'en' | 'fr' | 'th' | 'jp' | 'ko' | 'zh';

export interface PostMeta {
  title: string;
  slug: string;
  lang: Lang;
  author: string;
  date: string;
  meta_description: string;
  og_image?: string;
  keywords: string[];
  schema_type: string;
  reading_time_min: number;
  series?: string;
}

export interface PostWithContent extends PostMeta {
  content: string;
}

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');

export function getLangDir(lang: Lang) {
  return path.join(CONTENT_DIR, lang);
}

export function getAllPostMeta(lang?: Lang): PostMeta[] {
  const langs: Lang[] = lang ? [lang] : ['en', 'fr', 'th', 'jp', 'ko', 'zh'];
  const posts: PostMeta[] = [];

  for (const l of langs) {
    const dir = getLangDir(l);
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'));
    for (const file of files) {
      const raw = fs.readFileSync(path.join(dir, file), 'utf-8');
      const { data } = matter(raw);
      posts.push({ ...(data as PostMeta), lang: l });
    }
  }

  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(lang: Lang, slug: string): PostWithContent | null {
  const filePath = path.join(CONTENT_DIR, lang, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  return { ...(data as PostMeta), lang, content };
}

export function getAlternates(slug: string): Partial<Record<Lang, string>> {
  const langs: Lang[] = ['en', 'fr', 'th', 'jp', 'ko', 'zh'];
  const result: Partial<Record<Lang, string>> = {};
  for (const l of langs) {
    const p = path.join(CONTENT_DIR, l, `${slug}.mdx`);
    if (fs.existsSync(p)) result[l] = `/${l}/blog/${slug}`;
  }
  return result;
}

export function getAllSlugs(): { lang: Lang; slug: string }[] {
  const langs: Lang[] = ['en', 'fr', 'th', 'jp', 'ko', 'zh'];
  const slugs: { lang: Lang; slug: string }[] = [];
  for (const lang of langs) {
    const dir = getLangDir(lang);
    if (!fs.existsSync(dir)) continue;
    for (const file of fs.readdirSync(dir).filter(f => f.endsWith('.mdx'))) {
      slugs.push({ lang, slug: file.replace('.mdx', '') });
    }
  }
  return slugs;
}

export function getAuthorBio(authorId: string): { name: string; location: string; bio: string } | null {
  const p = path.join(CONTENT_DIR, '_meta', 'authors', `${authorId}.md`);
  if (!fs.existsSync(p)) return null;
  const raw = fs.readFileSync(p, 'utf-8');
  const { data } = matter(raw);
  return data as { name: string; location: string; bio: string };
}
