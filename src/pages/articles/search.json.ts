import type { APIRoute } from 'astro';
import { getAllBlogPosts, getReadingTime, getBlogSlug } from '../../lib/blog';

function stripMarkdown(md: string): string {
  if (!md) return '';
  let previous: string;
  let sanitized = md;
  let iterations = 0;
  const maxIterations = 10;
  do {
    previous = sanitized;
    sanitized = sanitized
      // Remove code blocks
      .replace(/```[\s\S]*?```/g, '')
      // Remove inline code
      .replace(/`([^`]+)`/g, '$1')
      // Remove HTML tags
      .replace(/<[^>]*>/g, '')
      // Remove HTML angle brackets to prevent tag/script injection patterns
      .replace(/[<>]/g, '')
      // Remove links [text](url) -> text
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      // Remove image links ![alt](url) -> alt
      .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
      // Remove bold/italics/strikes
      .replace(/[*_~]{1,3}/g, '')
      // Remove headings (# Heading)
      .replace(/^#+\s+/gm, '')
      // Remove blockquotes (> quote)
      .replace(/^\s*>\s+/gm, '')
      // Remove lists (- list, 1. list)
      .replace(/^\s*[-*+]\s+/gm, '')
      .replace(/^\s*\d+\.\s+/gm, '')
      // Replace multiple newlines or spaces with a single space
      .replace(/\s+/g, ' ')
      .trim();
    iterations += 1;
  } while (sanitized !== previous && iterations < maxIterations);
  return sanitized;
}

export const GET: APIRoute = async () => {
  const posts = await getAllBlogPosts();

  const data = posts.map((post) => ({
    slug: getBlogSlug(post),
    title: post.data.title,
    description: post.data.description,
    category: post.data.category,
    tags: post.data.tags,
    publishDate: post.data.publishDate.toISOString(),
    formattedDate: new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(post.data.publishDate),
    readingTime: getReadingTime(post.body ?? ''),
    heroImage: post.data.heroImage.src,
    heroAlt: post.data.heroAlt,
    featured: post.data.featured,
    body: stripMarkdown(post.body ?? ''),
  }));

  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
