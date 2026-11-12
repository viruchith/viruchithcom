# Changelog

All notable changes to this project are documented in this file.

Related documentation:
- [Project Overview & Setup Guide](./README.md)
- [Blog Authoring & Content Guide](./BLOG_GUIDE.md)
 
## [Unreleased]

### Added
- **Article media zoom viewer**: Interactive modal zoom viewer (`src/components/ArticleZoomViewer.astro`) for all article body images, hero images, and Mermaid.js architecture diagrams.
  - Smooth pan and zoom canvas supporting zoom in/out controls, keyboard shortcuts (`+`, `-`, `0`, `Esc`, arrow keys), mouse-wheel zoom centered on cursor, multi-touch pinch-to-zoom on mobile, and double-click/double-tap to toggle 2x zoom.
  - Hover-revealed (and touch-persistent) "Zoom" action button on Mermaid diagram frames (`.diagram-frame__zoom`) alongside full click-to-zoom interaction.
  - Accessible dialog (`<dialog>` with `aria-modal="true"`, focus management returning to trigger upon close, and keyboard navigation).

### Changed
- Upgraded **Astro** to `7.4.7` (from `7.3.2`, direct range `^7.3.3`).
- Upgraded **sharp** to `0.35.5` (from `0.35.4`).
- Upgraded **KaTeX** to `0.19.1` (direct range `^0.19.0`, from `^0.17.0`).
- Upgraded **Vitest** to `4.1.12`.
- Typed the class lookups in `src/components/ui/Grid.astro`, `Stack.astro`, and `Text.astro` so `pnpm typecheck` passes under Astro 7.4's stricter checks. Rendered markup is unchanged.
- Narrowed the reading measure from `68ch` to `56ch`. `ch` is the width of the "0" glyph, so `68ch` rendered about 90 characters per line in the body font. `DESIGN.md` and `.impeccable/design.json` were updated to match.
- Moved the 18 article images referenced by blog posts from `public/articles/images/` to `src/assets/articles/`, so Astro optimizes them with intrinsic dimensions, lazy loading, and a responsive `srcset`. The unused `prompt-butler-sc-3.webp` was removed.
- Enabled Astro's constrained image layout with responsive styles (`image.layout: 'constrained'`) in `astro.config.mjs`.

### Fixed
- **Mermaid diagram zoom rendering**: Fixed an issue where clicking a Mermaid diagram opened an empty square by preserving the diagram's scoped SVG ID (retaining internal `<style>` node/edge styling and arrow markers) and calculating explicit responsive dimensions from the SVG `viewBox` coordinates to prevent shrink-wrap layout collapse inside flex containers.
- **Diagram edge label contrast in zoom view**: Added dark and light mode surface/ink overrides for Mermaid edge labels inside the zoom modal.
- **Mobile layout shift on the homepage** (Lighthouse CLS 0.248): when Schibsted Grotesk and JetBrains Mono replaced the system fallback fonts, the hero description block moved by about 35px at 412px wide. Added width-matched fallback faces (`Schibsted Grotesk Fallback` and `JetBrains Mono Fallback`), built with `local()` and `size-adjust` against Segoe UI, Segoe UI Semibold, and Consolas, and placed them in the font stacks in `tailwind.config.mjs` ahead of the generic families. Measured layout shift for the swap dropped from 0.2479 to 0.0002 at 412px, and to 0.0011 at desktop width. Platforms without these local fonts use their usual fallback, so the swap there is unchanged.
- **Short phone screens**: below 40rem of viewport height, the header no longer stays sticky as a full block. Only the top bar stays pinned. At 200% text size, a script also pins only the bar when the full header would take more than 22% of the viewport. The `--header-h` offset is adjusted to match.
- **Articles index at 200% text size**: the search field and article column no longer overflow horizontally (`min-w-0` on the grid column and search field).
- **Mermaid diagram labels in dark mode**: edge labels and node labels use the raised surface and ink color, lifting contrast from 4.4:1 to about 16:1.
- **Without JavaScript**: the menu button is hidden, and a Resume link appears in the header bar instead, so the Resume document stays reachable.
- **Browser chrome color**: the `theme-color` meta follows an explicit Light or Dark choice, not only the operating system setting.
- **Reduced motion**: the cat widget no longer runs its ambient walk or jump animation when `prefers-reduced-motion: reduce` is set. A click still plays the meow.

### Security
- Remediated all 58 `pnpm audit` findings (1 critical, 19 high, 25 moderate, 13 low), bringing `pnpm audit` to 0 vulnerabilities:
  - **`dompurify`**: Overridden to `3.4.17` (fixes critical GHSA-cg2g-xh64-v4q7 and high GHSA-mrv2-3pqr-j5jr, plus three low-severity advisories), pulled in by `mermaid`.
  - **`undici`**: Overridden to `7.30.1` (fixes six high advisories, including GHSA-4w7w-5xrc-9h26, GHSA-qrxm-fqhp-jwvm, and GHSA-xjj6-f33q-929c, plus moderate and low advisories), pulled in by `wrangler`.
  - **`vite`**: Overridden to `8.1.6` (fixes high GHSA-587h-7wmj-h5pm and four moderate and low advisories), pulled in by `@vitejs/plugin-legacy`.
  - **`devalue`**: Overridden to `5.9.3` (fixes four high advisories, including GHSA-j22f-vq7h-c4qm, and several moderate and low advisories), pulled in by `astro`.
  - **`zod`**: Overridden to `4.6.6` (fixes high GHSA-mrhx-c7xc-m3w5, memory exhaustion on oversized collections), pulled in by `@astrojs/rss`.
  - **`sharp`**: Upgraded to `0.35.5` (fixes high GHSA-wq5f-xc86-pv6w, a librsvg dependency issue).
  - **`source-map-js`**: Overridden to `1.2.2` (fixes high GHSA-68fv-2mgg-jv7q, CVE-2026-93749, event-loop DoS).
  - **`brace-expansion`**: Scoped overrides for `@1` (`1.1.21`) and `@5` (`5.0.12`) (fix high GHSA-6j4f-fj2g-mc7p and GHSA-qhr7-859c-m2p7, plus moderate GHSA-q2hr-2g5m-vwhr).
  - **`fast-uri`**: Overridden to `3.1.9` (fixes moderate GHSA-w74x-v6f9-j3xg, GHSA-wjr9-j795-jxcr, and GHSA-hrr3-gc8f-f4qj, plus low advisories).
  - **`smol-toml`**: Overridden to `1.9.0` (fixes moderate GHSA-r4xh-jqrq-34v2, quadratic-time parse).
  - **`minimatch`**: Overridden to `11.0.1` for the `@10` line (fixes moderate GHSA-g3hv-75wg-m249, globparts DoS), pulled in by `typescript-eslint`.
  - **`postcss-selector-parser`**: Scoped `@6` override raised to `6.1.5` (fixes moderate GHSA-rj75-hqrm-r3gf, quadratic flat-selector parsing).
  - **`katex`**: Upgraded to `0.19.1` (fixes low GHSA-238p-pmpm-9mq7).
  - **`astro`**: Upgraded to `7.4.7` (fixes low GHSA-mpr7-6m5w-76rw).
  - **`@vitest/mocker`**: Resolved to `4.1.12` (fixes moderate GHSA-xp26-3454-mjgp and GHSA-qxg6-89mg-rqv8).

### Verification
- `pnpm audit` reports no known vulnerabilities.
- `pnpm typecheck` reports 0 errors and 0 warnings across 55 Astro files.
- `pnpm test` passes all 7 tests.
- `pnpm build` completes with 39 pages.
- `pnpm exec eslint src` is clean. The full `pnpm lint` still reports 94 problems, all in the vendored Impeccable tooling under `.cursor/skills/impeccable/scripts/`.
- Rendered an article with KaTeX math on the production build in the browser: all formulas render with no KaTeX errors in dark mode.

### Infrastructure
- Regenerated `pnpm-lock.yaml`. The project version stays at `1.7.0`.

## [1.7.0] - 2026-11-06

### Added
- **Manual Page redesign**: New editorial layout built on hanging-indent sections, a 12-column grid, hairline rules, and a sticky running header with a section navigation row and a cross-reference trail (`VIRUCHITH` wordmark, section name on wide screens).
- **Light, dark, and system themes**: Theme switch in the header, mobile menu, and footer. The choice is remembered, and the default follows the operating system.
- **Projects archive** at `/projects/`, split into Featured and Other work, with `CollectionPage` structured data.
- **Custom 404 page** styled as a terminal "No manual entry" message, with links to Home, Articles, Projects, and email.
- **Article thumbnails** in the homepage Articles list, the articles index, search results, and the See also block on article pages.
- **Article search upgrades**: Word-based matching with a fuzzy fallback on titles and descriptions, highlighted results, a clear-search control, and the `/` shortcut to focus the search box.
- **Article page extras**: Table of contents, copy buttons on code blocks, and a share panel with copy link, X, LinkedIn, Facebook, WhatsApp, and email.
- **`DESIGN.md`** documenting the design system, with a machine-readable `.impeccable/design.json`.
- **Self-hosted fonts**: Schibsted Grotesk for display and body text, and JetBrains Mono for code, dates, figures, and identifiers.

### Changed
- **Wordmark** is now `VIRUCHITH` in the header and footer.
- **Homepage order**: Hero, Articles, Experience, Projects, Expertise, Education and certifications, Testimonials (renders only when entries exist), Contact, Known issues. The Articles section moved up, and its heading is now "Articles".
- **Featured projects**: Phish Slayer, Android Shredder, and Prompt Butler lead both the homepage and the projects page.
- **Cat widget is opt-in**: It no longer starts on its own. Visitors enable it from the Known issues section, and its 3D model and sound load only then.
- **Articles index** shows 12 articles per page (pages 1 to 3). Older `/articles/page/4/` to `/articles/page/6/` URLs now show the 404 page.
- **Hero and contact copy** rewritten to state the offer, location, and availability in plain terms.
- **Search index** (`/articles/search.json`) includes a thumbnail path for each article.
- **Dependencies**: Replaced `@fontsource-variable/inter` and `@fontsource-variable/manrope` with `@fontsource-variable/schibsted-grotesk` and `@fontsource-variable/jetbrains-mono`.

### Removed
- `About`, `ArticlesCarousel`, and `ArticleCard` components, replaced by the new layout and list components.
- Inter and Manrope font packages.

### Fixed
- Primary action buttons in the hero stay above the fold at 320px and 375px wide.
- Search results no longer appear under the default "Latest" heading, and "Clear search" and "Try again" stay hidden until they apply.
- The running-header trail no longer gets overwritten by section tracking while a cross-reference is hovered or focused.
- Theme switch icons no longer block clicks on the option labels.
- Mobile navigation no longer overflows at 320px.

### Verification
- `pnpm typecheck` reports 0 errors and 0 warnings across 55 Astro files.
- `pnpm build` completes with 39 pages.
- `pnpm test` passes all 7 tests.
- `pnpm lint` passes for `src/`. Findings remain in the vendored Impeccable tooling under `.cursor/skills/impeccable/scripts/`, outside the site source.

### Infrastructure
- Bumped version to `1.7.0`.

## [1.6.0] - 2026-10-17

### Added
- **Single Source of Truth Configuration**: Introduced `src/config/site.ts` to centralize professional title, contact information, navigation links, and SEO metadata.
- **Structured JSON-LD Schemas**: Added Google-compliant `Person`, `WebSite`, `ProfilePage`, and `BlogPosting` schemas with bidirectional cross-linking between articles and the portfolio author.
- **Full-Text RSS Feed**: Added `/rss.xml` generated via `@astrojs/rss` with HTML entity escaping and full post content for syndicated distribution.
- **Branded OpenGraph Preview Image**: Automated 1200x630 `public/og-default.png` image generation using Sharp for social sharing previews.
- **Agentic Search & Crawl Standard (`/llms.txt`)**: Published `/llms.txt` adhering to `llmstxt.org` specifications and Chrome Lighthouse agentic browsing audit guidelines.
- **Direct Resume PDF Link**: Added Google Drive-hosted resume access across Hero, Contact, and `llms.txt`.
- **Google Cloud Certification**: Added Google Cloud Certified Generative AI Leader certification credential (obtained Oct 2026).

### Changed
- **Landing Page Content & SEO Rewrite**:
  - Rewrote Hero, About, Experience, Projects, Skills, Education, and Contact sections for immediate recruiter clarity and role rankings ("Java backend engineer Bengaluru", "Spring Boot developer", "microservices consultant", "legacy Java modernization").
  - Structured engineering accomplishments with factual metrics, architectural focus, and clear business outcomes.
  - Aligned Skills taxonomy with backend enterprise engineering (purged third-party data platforms not directly practiced).
- **Styling & Web Performance**:
  - Configured `font-display: swap` for `@fontsource-variable/manrope` and `@fontsource-variable/inter`.
  - Added smooth anchor scrolling with `scroll-margin-top: 5rem` to avoid header overlap on internal section navigation.
  - Added `@media (prefers-reduced-motion: reduce)` accessibility rules for animations.

### Fixed
- **Mobile Responsive Layout**: Resolved email button horizontal overflow in `#contact` section on narrow viewports (320px–375px) via responsive padding, adaptive button text, and icon shrink protection.

### Infrastructure
- Bumped version to `1.6.0`.

## [1.5.1] - 2026-09-12

### Changed
- Upgraded **Astro** to `7.3.2` and `@astrojs/markdown-remark` to `7.3.1`.
- Upgraded **Vitest** to `4.1.11`.

### Security
- Remediated all 16 Dependabot alerts across runtime and development dependencies, bringing `pnpm audit` to 0 vulnerabilities:
  - **`sharp`**: Upgraded to `0.35.4` (fixes libheif RCE vulnerabilities GHSA-rgj7-g3m4-5g8c, CVE-2026-84383).
  - **`astro`**: Upgraded to `7.3.2` (fixes RCE through AVIF image optimization GHSA-26w7-cxv4-gfx2).
  - **`vitest` / `@vitest/mocker`**: Upgraded to `4.1.11` (fixes path traversal / arbitrary file read GHSA-82fw-gwwq-j7x9, CVE-2026-84373).
  - **`smol-toml`**: Overridden to `1.7.2` (fixes infinite loop / DoS GHSA-7w5x-hrqm-74c2, CVE-2026-85730).
  - **`svgo`**: Overridden to `4.1.0` (fixes script bypass and namespace bypass XSS GHSA-4vpr-x523-8j87, GHSA-w27v-7q3p-w38r).
  - **`browserslist`**: Overridden to `4.28.9` (fixes prototype write / crash via custom stats GHSA-73wf-gq98-2v4g, CVE-2026-73088).
  - **`baseline-browser-mapping`**: Overridden to `2.11.22` (fixes process termination DoS GHSA-w5vr-8v7q-w6rv, CVE-2026-45819).
  - **`fast-uri`**: Overridden to `3.1.7` (fixes security vulnerabilities CVE-2026-31802).
  - **`postcss-selector-parser`**: Scoped overrides for `@6` (`6.1.4`) and `@7` (`7.1.6`) (fixes uncontrolled AST recursion DoS GHSA-w9m9-85wc-3x92).
  - **`js-yaml`**: Overridden to `4.3.2` (fixes CPU consumption DoS GHSA-2883-xcg3-v3hh).
  - **`brace-expansion`**: Scoped overrides for `@1` (`1.1.18`) and `@5` (`5.0.9`) (fixes unbounded intermediate array DoS GHSA-mh99-v99m-4gvg, GHSA-rgw5-rvv9-x895).

### Verification
- `pnpm audit` reports 0 vulnerabilities.
- `pnpm lint && pnpm typecheck && pnpm test && pnpm build` passed cleanly.

### Infrastructure
- Updated project version to `1.5.1`.

## [1.5.0] - 2026-08-23

### Added
- Integrated [`astro-mermaid`](https://www.npmjs.com/package/astro-mermaid) and `mermaid` to render Mermaid.js diagrams directly within Markdown (`.md`) and MDX article content.
- Configured default dark theme and automatic theme switching in `astro.config.mjs`.
- Enabled experimental incremental static builds (`experimental.incrementalBuild: true`) with `cacheKey: post.digest` in `src/pages/articles/[slug].astro` for faster page regeneration.
- Added Mermaid syntax documentation and diagram examples to [Blog Authoring Guide](./BLOG_GUIDE.md).

### Changed
- Upgraded **Astro** to `7.2.4` and `@astrojs/markdown-remark` to `7.2.4`.
- Configured `session: false` in `astro.config.mjs` to strip unused session runtime from production bundles.
- Migrated schema `z` imports from `astro:content` to `astro/zod` in `src/content.config.ts`.
- Replaced deprecated Lucide `Code2` icon with `Code` in `src/components/Expertise.astro`.
- Optimized `tsconfig.json` with `skipLibCheck` and explicit include paths for faster and memory-efficient type checking (`astro check`).

### Security
- Resolved 14 Dependabot alerts across production and tooling dependencies:
  - **`sharp`**: Upgraded to `0.35.3` (fixes libvips CVE-2026-33327, CVE-2026-33328, CVE-2026-35590, CVE-2026-35591).
  - **`postcss`**: Upgraded to `8.5.26` (fixes path traversal in source map loading CVE-2026-69153, GHSA-fxqj-rqcc-2cmp).
  - **`nanoid`**: Overridden to `3.3.18` (fixes infinite loops in custom/non-secure generators CVE-2026-67213, CVE-2026-67214).
  - **`js-yaml`**: Overridden to `4.3.1` (fixes quadratic CPU consumption DoS in `!!omap` resolution GHSA-5p4m-2wfm-xmqj).
  - **`fast-uri`**: Overridden to `3.1.5` (fixes host confusion via backslash authority introducer CVE-2026-18446).
  - **`undici`**: Overridden to `7.29.0` (fixes CRLF injection and cache disclosure vulnerabilities CVE-2026-15157).
  - **`svgo`**: Overridden to `4.0.2` (fixes script removal bypass).

### Verification
- `pnpm lint && pnpm typecheck && pnpm test && pnpm build`

### Infrastructure
- Updated project version to `1.5.0`.

## [1.4.4] - 2026-07-13

### Changed
- Enabled Markdown math rendering for blog posts so KaTeX equations compile correctly in Astro.
- Fixed the Gorilla compression example in the Datadog and Grafana article so the timestamp equation renders as display math.

### Verification
- `pnpm build`

### Infrastructure
- Updated project version to `1.4.4`.

## [1.4.3] - 2026-07-10

### Security
- Remediated reported Dependabot alerts related to `undici`, `js-yaml`, and `esbuild` by upgrading dependency chains.
- Upgraded tooling dependencies that pulled vulnerable transitive packages:
	- `wrangler` to `4.110.0` (with updated `miniflare`/`undici` chain)
	- `astro` to `7.0.7` (with updated `js-yaml` and build toolchain)
	- `@vitejs/plugin-legacy` to `8.2.0`
	- `@lucide/astro` to `1.24.0`

### Verification
- `pnpm audit --audit-level low` reports no known vulnerabilities.

### Infrastructure
- Updated project version to `1.4.3`.

## [1.4.2] - 2026-07-10

### Changed
- Tuned homepage mobile rendering performance with lighter above-the-fold visual effects on small screens.
- Deferred non-critical homepage content rendering to reduce initial mobile paint cost.
- Optimized font loading behavior for mobile to reduce layout instability risk.
- Updated analytics loading strategy to reduce first-load contention on mobile.

### Infrastructure
- Updated project version to `1.4.2`.

## [1.4.1] - 2026-07-07

### Changed
- Added deferred loading for the cat widget one minute after page initialization.
- Added graceful runtime checks for unsupported environments before initializing the widget.
- Externalized stylesheet output for production to avoid inline CSS bloat in built HTML.

### Infrastructure
- Updated project version to `1.4.1`.
