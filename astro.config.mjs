import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // Canonical links, the sitemap and robots.txt all read from this.
  site: 'https://sakib.mywrkbase.com',
  integrations: [sitemap()],
  build: { inlineStylesheets: 'always' },
});
