import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import legacy from '@vitejs/plugin-legacy';

export default defineConfig({
  site: 'https://viruchith.com',
  compressHTML: true,
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
  ],
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
      minify: 'esbuild',
      cssMinify: true,
    },
  },
});
