import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getAllBlogPosts, getBlogSlug } from '../lib/blog';
import { siteConfig } from '../config/site';

export async function GET(context: APIContext) {
  const posts = await getAllBlogPosts();

  return rss({
    title: `${siteConfig.name} — Technical Insights & Systems Architecture`,
    description:
      'Engineering articles on Java, Spring Boot, microservices, cloud-native delivery, and legacy enterprise modernization.',
    site: context.site ?? siteConfig.siteUrl,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.publishDate,
      description: post.data.description,
      link: `/articles/${getBlogSlug(post)}/`,
      categories: [post.data.category, ...(post.data.tags ?? [])],
    })),
    customData: `<language>en-us</language>`,
  });
}
