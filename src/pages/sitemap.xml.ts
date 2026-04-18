import type { APIRoute } from 'astro';
import { getAllBlogPosts } from '../lib/blog';

const site = 'https://viruchith.com';

function xmlEscape(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

export const GET: APIRoute = async () => {
  const posts = await getAllBlogPosts();

  const urls = [
    { loc: `${site}/`, lastmod: new Date().toISOString() },
    { loc: `${site}/articles/`, lastmod: posts[0]?.data.publishDate.toISOString() ?? new Date().toISOString() },
    ...posts.map((post) => ({
      loc: `${site}/articles/${post.slug}/`,
      lastmod: (post.data.updatedDate ?? post.data.publishDate).toISOString(),
    })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map(
      (url) => `  <url>\n    <loc>${xmlEscape(url.loc)}</loc>\n    <lastmod>${xmlEscape(url.lastmod)}</lastmod>\n  </url>`,
    )
    .join('\n')}\n</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};