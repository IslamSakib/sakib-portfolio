import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync } from 'node:fs';

// Blog posts carry their own date (or `updated:`), so their sitemap entries get a true lastmod. Other pages are left
// without one rather than given a made-up date.
const postDates = Object.fromEntries(
  readdirSync('src/blog').filter((f) => f.endsWith('.md')).map((f) => {
    const md = readFileSync(`src/blog/${f}`, 'utf8');
    const get = (k) => (md.match(new RegExp(`^${k}: "?([0-9-]+)"?`, 'm')) || [])[1];
    return [`/blog/${f.replace('.md', '')}/`, get('updated') || get('date')];
  })
);

export default defineConfig({
  // Canonical links, the sitemap and robots.txt all read from this.
  site: 'https://sakib.mywrkbase.com',
  integrations: [
    sitemap({
      serialize(item) {
        const date = postDates[new URL(item.url).pathname];
        return date ? { ...item, lastmod: new Date(date).toISOString() } : item;
      },
    }),
  ],
  build: { inlineStylesheets: 'always' },
});
