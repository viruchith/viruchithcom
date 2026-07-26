import { defineConfig } from "vitest/config";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "astro:content": fileURLToPath(
        new URL("./src/__mocks__/astro-content.ts", import.meta.url),
      ),
    },
  },
  test: {
    globals: true,
  },
});
