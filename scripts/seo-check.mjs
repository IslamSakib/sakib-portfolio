// On-page SEO gate. Reads the built pages in dist/ and fails if any page breaks a rule:
// the focus keyword (html[data-focus]) must start the title and the H1 and appear in the meta description and the first
// paragraph after the H1 (the copy standard in seo/ and the seo-workflow skill); titles are 60 characters
// or fewer and unique; descriptions are 105 or fewer and unique; exactly one H1; a canonical link; every image has an alt attribute.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const root = 'dist';
const files = [];
const walk = (dir) => readdirSync(dir).forEach((f) => { const p = join(dir, f); statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') && !/^google[0-9a-f]+.html$/.test(f) && files.push(p); });
walk(root);

const decode = (s) => s.replace(/&nbsp;| /g, ' ').replace(/&amp;/g, '&').replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const text = (html) => decode(html.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
const pick = (html, re) => { const m = html.match(re); return m ? decode(m[1]).trim() : ''; };

const titles = new Map(), descriptions = new Map();
let problems = 0;
const rows = [];
for (const file of files.sort()) {
  const html = readFileSync(file, 'utf8');
  const page = '/' + relative(root, file).split(sep).join('/').replace(/index\.html$/, '');
  const title = pick(html, /<title>([^<]*)<\/title>/i);
  const description = pick(html, /<meta name="description" content="([^"]*)"/i);
  const focus = pick(html, /<html[^>]*data-focus="([^"]*)"/i);
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => text(m[1]));
  const errors = [];
  const has = (hay) => hay.toLowerCase().includes(focus.toLowerCase());
  const is404 = page.startsWith('/404');
  if (!title) errors.push('no title');
  if (title.length > 60) errors.push(`title is ${title.length} characters`);
  if (!description) errors.push('no description');
  if (description.length > 105) errors.push(`description is ${description.length} characters`);
  if (h1s.length !== 1) errors.push(`${h1s.length} H1 tags`);
  if (!/<link rel="canonical"/i.test(html)) errors.push('no canonical');
  if (!is404) {
    if (!focus) errors.push('no focus keyword');
    else {
      // Copy standard (Semrush on-page checklist): keyword at the start of the title and H1, in the description and
      // in the first real paragraph after the H1. "Start" allows a short lead-in such as "How to" or "A".
      const at = (hay) => hay.toLowerCase().indexOf(focus.toLowerCase());
      if (!has(title)) errors.push('focus keyword missing from title');
      else if (at(title) > 12) errors.push('title does not start with the focus keyword');
      if (!has(description)) errors.push('focus keyword missing from description');
      if (!has(h1s[0] || '')) errors.push('focus keyword missing from H1');
      else if (at(h1s[0]) > 12) errors.push('H1 does not start with the focus keyword');
      const afterH1 = html.split(/<\/h1>/i)[1] || '';
      const firstP = [...afterH1.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)].map((m) => text(m[1])).find((t) => t.length >= 60) || '';
      if (!has(firstP)) errors.push('focus keyword missing from the first paragraph');
    }
  }
  // Every image needs real alt text (Astro writes an empty alt as a bare `alt`, which counts as missing here).
  const noAlt = [...html.matchAll(/<img\b[^>]*>/gi)].filter((m) => !/\salt="[^"]{4,}"/.test(m[0])).length;
  if (noAlt) errors.push(`${noAlt} image(s) without alt text`);
  // Every indexable page needs its own share (featured) image, not the site-wide default.
  if (!is404 && /property="og:image" content="[^"]*\/og\.png/.test(html) && page !== '/') errors.push('no page-specific share image');
  if (titles.has(title)) errors.push('same title as ' + titles.get(title)); else titles.set(title, page);
  if (descriptions.has(description)) errors.push('same description as ' + descriptions.get(description)); else descriptions.set(description, page);
  problems += errors.length;
  rows.push(`${errors.length ? 'FAIL' : 'ok  '} ${page.padEnd(36)} ${String(title.length).padStart(2)}/${String(description.length).padStart(3)}  ${focus || '-'}${errors.length ? '\n       ' + errors.join('; ') : ''}`);
}
console.log('     page                                 title/desc  focus keyword\n' + rows.join('\n'));
console.log(`\n${files.length} pages, ${problems} problem(s)`);
process.exit(problems ? 1 : 0);
