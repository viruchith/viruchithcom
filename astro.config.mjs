import { defineConfig } from 'astro/config';
import legacy from '@vitejs/plugin-legacy';
import { unified } from '@astrojs/markdown-remark';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';

export default defineConfig({
  site: 'https://viruchith.com',
  compressHTML: true,
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
  },
  build: {
    inlineStylesheets: 'never',
  },
  devToolbar: {
    enabled: false,
  },
  vite: {
    plugins: [
      legacy({
        targets: ['defaults', 'not IE 11'],
        renderLegacyChunks: true,
        modernPolyfills: true,
        polyfills: true,
      }),
    ],
    build: {
      minify: true,
      cssMinify: true,
      chunkSizeWarningLimit: 700,
    },
  },
});
