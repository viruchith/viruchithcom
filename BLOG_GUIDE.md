# Blog Guide

This site uses Astro content collections for writing, validating, and publishing articles. The goal is to keep authoring simple in markdown while still taking advantage of Astro features for images, SEO, static generation, and component-rich content.

## Workflow

1. Create a new markdown file under `src/content/blog/`.
2. Add valid frontmatter that matches the schema in `src/content/config.ts`.
3. Reference a local hero asset from `src/assets/blog/`.
4. Write the article body in markdown with code fences, lists, blockquotes, and internal links.
5. Run `npm run build` to validate the content collection schema and generated routes.
6. Publish by committing the new content file and any related assets.

## Required Frontmatter

Every post must follow the `blog` collection schema.

```md
---
title: Building Resilient Java APIs
description: What changes when API design is driven by failure modes, latency budgets, and backward compatibility.
publishDate: 2026-04-18
updatedDate: 2026-04-18
category: Architecture
tags:
  - Java
  - APIs
  - Reliability
heroImage: ../../assets/blog/building-resilient-java-apis.svg
heroAlt: Abstract illustration of an API gateway and distributed services with telemetry overlays.
featured: false
draft: false
---
```

## Content Rules

- `title`: Keep it specific and search-friendly.
- `description`: This is used in meta tags and article previews. Write it like a SERP summary, not a teaser.
- `publishDate`: Controls sort order on the articles index and home carousel.
- `updatedDate`: Set this when you substantially revise a post.
- `category`: Keep category names consistent because the listing pages group by them.
- `tags`: Use a short list of meaningful technical tags.
- `heroImage`: Must point to a local image imported through the content collection image helper.
- `heroAlt`: Write descriptive alt text, not a keyword dump.
- `featured`: Use `true` only when you want the post visually emphasized.
- `draft`: In production builds, draft posts are excluded automatically.

## Astro Features Already Wired In

The current implementation already gives you these Astro capabilities without extra work:

- Content collections: Posts are type-checked through `src/content/config.ts`.
- Static routes: Each markdown file generates an article page at `/articles/[slug]/`.
- Asset optimization: Article cards and hero media render through `astro:assets` in the page and card components.
- SEO metadata: Titles, descriptions, Open Graph tags, Twitter cards, canonical URLs, and structured data are set in `src/layouts/BaseLayout.astro` and `src/pages/articles/[slug].astro`.
- Sitemap generation: New posts are automatically included through `src/pages/sitemap.xml.ts`.
- Latest-post carousel: The five newest posts are pulled onto the home page automatically.

## Recommended Asset Strategy

Use local assets whenever possible so Astro can fingerprint and optimize them.

Suggested layout:

```text
src/
  assets/
    blog/
      building-resilient-java-apis.svg
      building-resilient-java-apis-architecture.png
```

Recommended practices:

- Use SVG for diagrams, architecture sketches, and abstract editorial covers.
- Use PNG or WebP for screenshots and UI captures.
- Keep large screenshots tight and purposeful; avoid generic hero filler.
- Always provide useful `heroAlt` text.

## Writing in Markdown

Standard markdown features work out of the box.

Example:

```md
## Design for failure first

Reliable APIs are usually the result of explicit constraints, not style preferences.

- Define timeouts before you debate endpoint naming.
- Make retries safe through idempotency.
- Keep backward compatibility as a product requirement.

> If an API contract is easy to extend but hard to observe, it is still incomplete.

```java
@PostMapping("/orders")
public ResponseEntity<OrderResponse> createOrder(@RequestBody CreateOrderRequest request) {
    return ResponseEntity.ok(orderService.create(request));
}
```
```

## Adding Images in Article Body

There are two good options depending on whether you are writing plain markdown (`.md`) or component-enabled markdown (`.mdx`).

### Option 1: Plain markdown (`.md`) using `public/` assets

This is the simplest and recommended default for inline article images.

1. Add your image under `public/blog/` (example: `public/blog/api-rollout-phases.png`).
2. Reference it with a site-relative path in markdown.

```md
![API rollout phases](/blog/api-rollout-phases.png)
```

You can also use standard markdown syntax with a title:

```md
![API rollout phases](/blog/api-rollout-phases.png "Phased rollout model")
```

### Option 2: MDX with Astro image optimization

If you need Astro component features for inline content, use `.mdx` and `astro:assets`.

```mdx
---
title: Example Post
description: Example post with optimized inline images.
publishDate: 2026-04-18
category: Engineering
tags: [Astro, Images]
heroImage: ../../assets/blog/your-article-cover.svg
heroAlt: Cover image description.
featured: false
draft: false
---

import { Image } from 'astro:assets';
import architectureDiagram from '../../assets/blog/api-rollout-phases.png';

<Image src={architectureDiagram} alt="API rollout phases" />
```

### Which one should you use?

- Use `.md` + `public/blog/...` for most posts.
- Use `.mdx` + `astro:assets` only when you need component-level control in the article body.

## Internal Links

Link to other posts or pages with site-relative URLs.

```md
Read the follow-up in [Observability for Event-Driven Systems](/articles/observability-for-event-driven-systems/).
```

## Going Beyond Plain Markdown

If you want to use more of Astro than plain `.md` supports, switch individual articles to `.mdx` later. That would let you embed Astro components directly inside posts.

Good candidates for MDX enhancement:

- Callout components for key architectural takeaways.
- Reusable comparison tables.
- Mermaid or diagram wrappers.
- Embedded project cards or related-reading blocks.
- Responsive figure components with captions.

If you add MDX later, the ideal stack is:

1. Install Astro MDX integration.
2. Keep the same content collection schema.
3. Add a small library of editorial components under `src/components/articles/`.
4. Reserve MDX for posts that genuinely benefit from component composition.

## Optional Enhancements Worth Adding

These are the next Astro features that would improve the blog the most:

1. RSS feed generation for `/articles/`.
2. MDX support for richer article layouts.
3. Syntax highlighting customization with expressive code themes.
4. Reading progress and table-of-contents generation from headings.
5. Automatic related-post selection based on tags.
6. Social OG image generation per post.

## Publishing Checklist

- Frontmatter validates against the schema.
- Hero image exists locally and renders correctly.
- `description` reads well in search and sharing previews.
- Heading structure is clean and sequential.
- Code fences specify a language.
- Internal links use final production paths.
- `draft` is set correctly.
- `npm run build` passes.

## Fast Start Template

Copy this into a new file under `src/content/blog/`.

```md
---
title: Your Article Title
description: One-sentence summary for article cards, metadata, and social previews.
publishDate: 2026-04-18
updatedDate: 2026-04-18
category: Engineering
tags:
  - Example
  - Astro
heroImage: ../../assets/blog/your-article-cover.svg
heroAlt: Describe the article cover image clearly.
featured: false
draft: true
---

Intro paragraph that defines the problem and the lens of the article.

## First section

Add useful detail, not filler.

## Second section

Use examples, code, or tradeoff analysis.

## Conclusion

Close with what the reader should do or understand next.
```