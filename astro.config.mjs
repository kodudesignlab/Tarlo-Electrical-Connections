import { defineConfig } from 'astro/config';

// Fully static build: `npm run build` writes the site to dist/,
// which Cloudflare serves as plain files (see wrangler.jsonc).
export default defineConfig({
  output: 'static',
});
