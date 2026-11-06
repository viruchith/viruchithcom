# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Primary visitors are:

- Recruiters and hiring managers evaluating Viruchith for full-time backend engineering roles.
- Companies looking for Spring Boot and legacy Java modernization consultants.
- Engineers and technology enthusiasts reading the technical articles (peers, search engines, and LLM-based discovery).
- Open-source users and contributors interested in the published projects.

## Product Purpose
viruchith.com is the personal portfolio and engineering publication of Viruchith Ganesan, a backend engineer in Bengaluru. It presents his experience, projects, and certifications, and hosts a markdown-authored engineering blog on backend systems, architecture, delivery, and platform engineering.

Success means a qualified visitor contacts him about a full-time backend role. Consulting inquiries are secondary. The site works as evidence: the portfolio states the claims, and the articles and projects prove them.

## Positioning
Written from production experience rather than theory: legacy Restlet, WildFly, and Tomcat systems migrated to Spring Boot on Kubernetes and GCP, and telecom qualification APIs running at 100,000+ requests/day. (Inferred from the current site copy; confirm before relying on it for new claims.)

## Operating Context
- Visitors arrive from search, RSS, LinkedIn, GitHub, and direct links to the resume.
- Articles are the main long-form reading experience, with search, pagination, and a featured carousel on the homepage.
- Content is authored in markdown under `src/content/blog/` and validated by the collection schema in `src/content.config.ts`. Authoring rules live in `BLOG_GUIDE.md`.
- Updates are made by the owner through code, with a changelog in `CHANGELOG.md`.

## Capabilities and Constraints
- Static Astro site with minimal client-side JavaScript, deployed to Cloudflare via Wrangler.
- Required discovery surfaces: canonical URLs, Open Graph and Twitter metadata, JSON-LD (`Person`, `WebSite`, `ProfilePage`, `BlogPosting`), full-text RSS at `/rss.xml`, sitemap at `/sitemap.xml`, and `/llms.txt`.
- Mermaid diagrams and KaTeX math must keep rendering in articles.
- Article listing is paginated at `/articles/page/[number]/` with client-side fuzzy search.
- The `site` value in `astro.config.mjs` must match the production domain (`https://viruchith.com`).
- Undecided: none recorded.

## Brand Commitments
- Name: Viruchith Ganesan.
- Domain: viruchith.com.
- Title and description copy in `src/config/site.ts` are the canonical search-facing wording and were written to fixed character lengths. Keep those lengths when editing.

## Evidence on Hand
- Projects: `src/data/projects.ts` (Project VEGA, Ticketris, CloudLab Orchestrator, SentinelExtension, and additional projects).
- Experience: `src/data/experience.ts`; skills: `src/data/skills.ts`; testimonials: `src/data/testimonials.ts`.
- Articles: `src/content/blog/`, with hero images in `src/assets/blog/`.
- Resume: hosted PDF linked from `src/config/site.ts`.
- Certifications: Google Cloud Associate Cloud Engineer; Google Cloud Generative AI Leader.
- Production figures in use: 100,000+ requests/day; 3+ years of experience.

## Product Principles
- Hiring first: every section should make the case for a full-time backend role, with consulting as a secondary path.
- Proof over claims: concrete production scale, shipped projects, and published engineering writing outrank adjectives.
- Articles are first-class evidence of engineering depth, not a side blog.
- Discoverable by people, search engines, and AI agents alike.
- Technical readers get depth: precise, honest detail over marketing language. Never fabricate metrics, clients, or testimonials.
