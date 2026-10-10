// On-page SEO gate. Reads the built pages in dist/ and fails if any page breaks a rule:
// the focus keyword (html[data-focus]) must be in the title, the meta description and the H1; titles are 60 characters
// or fewer and unique; descriptions are 155 or fewer and unique; exactly one H1; a canonical link; every image has an alt attribute.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const root = 'dist';
const files = [];
const walk = (dir) => readdirSync(dir).forEach((f) => { const p = join(dir, f); statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') && files.push(p); });
walk(root);

const decode = (s) => s.replace(/&amp;/g, '&').replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
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
  if (description.length > 155) errors.push(`description is ${description.length} characters`);
  if (h1s.length !== 1) errors.push(`${h1s.length} H1 tags`);
  if (!/<link rel="canonical"/i.test(html)) errors.push('no canonical');
  if (!is404) {
    if (!focus) errors.push('no focus keyword');
    else {
      if (!has(title)) errors.push('focus keyword missing from title');
      if (!has(description)) errors.push('focus keyword missing from description');
      if (!has(h1s[0] || '')) errors.push('focus keyword missing from H1');
    }
  }
  const noAlt = [...html.matchAll(/<img\b[^>]*>/gi)].filter((m) => !/\salt=/.test(m[0])).length;
  if (noAlt) errors.push(`${noAlt} image(s) without alt`);
  if (titles.has(title)) errors.push('same title as ' + titles.get(title)); else titles.set(title, page);
  if (descriptions.has(description)) errors.push('same description as ' + descriptions.get(description)); else descriptions.set(description, page);
  problems += errors.length;
  rows.push(`${errors.length ? 'FAIL' : 'ok  '} ${page.padEnd(36)} ${String(title.length).padStart(2)}/${String(description.length).padStart(3)}  ${focus || '-'}${errors.length ? '\n       ' + errors.join('; ') : ''}`);
}
console.log('     page                                 title/desc  focus keyword\n' + rows.join('\n'));
console.log(`\n${files.length} pages, ${problems} problem(s)`);
process.exit(problems ? 1 : 0);
