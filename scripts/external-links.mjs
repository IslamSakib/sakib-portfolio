// Runs after `astro build`: every link in dist/ that points to another website opens in a new tab
// (target="_blank" rel="noopener"). Links to this site's own pages are left alone. This covers links written inside
// Markdown (blog posts, case studies), which Astro renders without those attributes.
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const site = 'https://sakib.mywrkbase.com';
const files = [];
const walk = (d) => readdirSync(d).forEach((f) => { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') && files.push(p); });
walk('dist');

export const fix = (tag) => {
  const href = (tag.match(/\shref="([^"]*)"/) || [])[1] || '';
  if (!/^https?:\/\//i.test(href) || href.startsWith(site)) return tag;
  let t = tag;
  if (!/\starget=/.test(t)) t = t.replace(/^<a\b/, '<a target="_blank"');
  if (!/\srel=/.test(t)) t = t.replace(/^<a\b/, '<a rel="noopener"');
  return t;
};

let changed = 0;
for (const f of files) {
  const html = readFileSync(f, 'utf8');
  const out = html.replace(/<a\b[^>]*>/g, (tag) => { const t = fix(tag); if (t !== tag) changed++; return t; });
  if (out !== html) writeFileSync(f, out);
}
console.log(`external-links: ${changed} links set to open in a new tab`);

if (process.argv.includes('--test')) {
  const eq = (a, b) => { if (a !== b) { console.error('FAIL', a, '!=', b); process.exit(1); } };
  eq(fix('<a href="https://web.dev/x">'), '<a rel="noopener" target="_blank" href="https://web.dev/x">');
  eq(fix('<a href="/blog/">'), '<a href="/blog/">');
  eq(fix('<a href="https://sakib.mywrkbase.com/x">'), '<a href="https://sakib.mywrkbase.com/x">');
  eq(fix('<a href="https://x.com" target="_blank" rel="noopener">'), '<a href="https://x.com" target="_blank" rel="noopener">');
  console.log('external-links self-check passed');
}
