# viruchith.com — Portfolio

Static portfolio site for a Java backend and microservices-focused software engineer. Content is built with **Astro**, styled with **Tailwind CSS**, and ships as fast HTML with minimal client JavaScript.

## Features

- **Static-first:** Astro SSG; pages render to plain HTML for performance and SEO.
- **Design:** Stitch-inspired layout—hero with ambient glow, bento “Technical Engine,” timeline experience, project cards with gradient placeholders, education and certifications, contact footer with social icons.
- **Typography & assets:** **Manrope** and **Inter** via `@fontsource` (bundled, no font CDNs). **Lucide** icons via `@lucide/astro` and small inline brand SVGs where needed.
- **Theming:** Light/dark mode with `prefers-color-scheme` by default, persistent choice in `localStorage` (`viruchith-theme`), and optional **View Transitions API** for smoother toggles in supporting browsers.
- **SEO:** Meta tags, canonical URL, JSON-LD (`Person`, `ProfessionalService`), `robots.txt`, favicon.
- **Build quality:** HTML compression, CSS minification (PostCSS + **cssnano** in production), JS minification (**esbuild**), **legacy browser** bundles and polyfills via **`@vitejs/plugin-legacy`**.
- **Accessibility:** Skip link, landmark structure, icon labels where appropriate.

## Tech stack

| Area | Choice |
|------|--------|
| Framework | [Astro](https://astro.build/) 4.x |
| Styling | [Tailwind CSS](https://tailwindcss.com/) 3.x, PostCSS, Autoprefixer |
| Languages | TypeScript (where used), Astro components |
| Icons | [@lucide/astro](https://lucide.dev/) |
| Fonts | [@fontsource/manrope](https://fontsource.org/), [@fontsource/inter](https://fontsource.org/) |
| Bundler / tooling | Vite (via Astro), `@vitejs/plugin-legacy`, Terser (legacy chunks) |
| Targets | [Browserslist](https://github.com/browserslist/browserslist) in `package.json` |

## Prerequisites

- **Node.js** 18.x or **20.x** LTS recommended (matches Astro 4 expectations).
- **npm** (comes with Node). **pnpm** / **yarn** work if you prefer; commands below use `npm`.

## Install

From the project root:

```bash
npm install
```

If `npm install` fails on Windows with **Access is denied** during a dependency postinstall (for example `esbuild` or `core-js`), try:

```bash
npm install --ignore-scripts
```

Then, if the **esbuild** binary is missing, run once:

```bash
node node_modules/esbuild/install.js
```

## Development

Start the dev server with hot reload; the URL is printed in the terminal (often **http://localhost:4321**):

```bash
npm run dev
```

The project uses `node ./node_modules/astro/astro.js dev` so the CLI does not rely on a global `astro` shim (helpful on some Windows setups).

## Production build

Generate the static site into `dist/`:

```bash
npm run build
```

Artifacts include modern and legacy JS chunks where applicable (see `@vitejs/plugin-legacy` in `astro.config.mjs`).

## Preview production output

Serve the `dist/` folder locally to verify before deploy:

```bash
npm run preview
```

## Deploy

Upload the contents of **`dist/`** to any static host (object storage + CDN, Netlify, Vercel, GitHub Pages, nginx, etc.). Set the public URL in **`astro.config.mjs`** (`site: 'https://viruchith.com'`) so canonical URLs and sitemap-related metadata stay correct.

## Project layout (high level)

```
├── astro.config.mjs      # Astro + Vite + legacy plugin
├── postcss.config.cjs    # Tailwind; cssnano in production
├── tailwind.config.mjs
├── public/               # Static assets (favicon, robots.txt)
└── src/
    ├── layouts/          # Base layout, SEO, JSON-LD
    ├── pages/            # Routes (e.g. index.astro)
    ├── components/       # UI sections and icons
    └── styles/           # Global CSS, font imports
```

## License

Private project unless you add a license file.
