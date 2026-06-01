import { defineConfig } from 'astro/config';
import legacy from '@vitejs/plugin-legacy';

export default defineConfig({
  site: 'https://viruchith.com',
  compressHTML: true,
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
      minify: 'esbuild',
      cssMinify: true,
      chunkSizeWarningLimit: 700,
    },
  },
});
