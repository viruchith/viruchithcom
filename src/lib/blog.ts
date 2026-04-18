import { getCollection, type CollectionEntry } from 'astro:content';

export type BlogEntry = CollectionEntry<'blog'>;

export interface BlogPostSummary {
  slug: string;
  title: string;
  description: string;
  publishDate: Date;
  updatedDate?: Date;
  category: string;
  tags: string[];
  heroImage: BlogEntry['data']['heroImage'];
  heroAlt: string;
  featured: boolean;
  readingTime: string;
}

const WORDS_PER_MINUTE = 220;

export function formatArticleDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export function getReadingTime(content: string) {
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE));
  return `${minutes} min read`;
}

export function mapBlogPost(post: BlogEntry): BlogPostSummary {
  return {
    slug: post.slug,
    title: post.data.title,
    description: post.data.description,
    publishDate: post.data.publishDate,
    updatedDate: post.data.updatedDate,
    category: post.data.category,
    tags: post.data.tags,
    heroImage: post.data.heroImage,
    heroAlt: post.data.heroAlt,
    featured: post.data.featured,
    readingTime: getReadingTime(post.body),
  };
}

export async function getAllBlogPosts() {
  const posts = await getCollection('blog', ({ data }) => (import.meta.env.PROD ? !data.draft : true));
  return posts.sort((left, right) => right.data.publishDate.valueOf() - left.data.publishDate.valueOf());
}

export async function getLatestBlogPosts(limit = 5) {
  const posts = await getAllBlogPosts();
  return posts.slice(0, limit);
}