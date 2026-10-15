// A fuller audit of the built site than seo-check.mjs: `node scripts/seo-audit.mjs` after a build.
// It reads dist/ and reports, per page: indexability, canonical, Open Graph, heading order, structured data that parses
// and has the fields search engines need, internal links that point nowhere, images without sizes, and thin pages.
// It also checks robots.txt, the sitemap and llms.txt against the pages that exist. Prints problems; exits 1 if any.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const root = 'dist', site = 'https://sakib.mywrkbase.com';
const files = [];
const walk = (d) => readdirSync(d).forEach((f) => { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') && !/^google[0-9a-f]+\.html$/.test(f) && files.push(p); });
walk(root);
const urlOf = (f) => '/' + relative(root, f).split(sep).join('/').replace(/index\.html$/, '');
const pages = new Map(files.map((f) => [urlOf(f), readFileSync(f, 'utf8')]));
const problems = [], notes = [];
const bad = (page, msg) => problems.push(`${page}  ${msg}`);
const need = { Person: ['name', 'url'], WebSite: ['name', 'url'], FAQPage: ['mainEntity'], Service: ['name', 'provider'], Article: ['headline', 'author', 'datePublished', 'image'], BreadcrumbList: ['itemListElement'] };

for (const [page, html] of pages) {
  if (page === '/404.html') continue;
  const attr = (re) => (html.match(re) || [])[1] || '';
  if (/<meta name="robots" content="[^"]*noindex/i.test(html)) bad(page, 'is set to noindex');
  const canonical = attr(/<link rel="canonical" href="([^"]+)"/);
  if (canonical !== site + page) bad(page, `canonical is "${canonical}", expected "${site + page}"`);
  for (const p of ['og:title', 'og:description', 'og:image', 'og:url', 'twitter:card']) if (!new RegExp(`(property|name)="${p}"`).test(html)) bad(page, `missing ${p}`);
  if (!/<html[^>]*lang="en/.test(html)) bad(page, 'html has no lang');
  if (!/<meta name="viewport"/.test(html)) bad(page, 'no viewport meta');

  // Headings must not skip a level going down (h2 then h4).
  const levels = [...html.replace(/<(script|style)[\s\S]*?<\/\1>/g, '').matchAll(/<h([1-6])[\s>]/g)].map((m) => +m[1]);
  levels.forEach((l, i) => { if (i && l > levels[i - 1] + 1) bad(page, `heading jumps from h${levels[i - 1]} to h${l}`); });

  // Structured data: parses, and each type has what it needs.
  const types = [];
  for (const [, json] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      const d = JSON.parse(json); types.push(d['@type']);
      for (const k of need[d['@type']] || []) if (d[k] === undefined || d[k] === '' || (Array.isArray(d[k]) && !d[k].length)) bad(page, `${d['@type']} structured data has no ${k}`);
      if (d['@type'] === 'FAQPage') for (const q of d.mainEntity) if (!q.name || !q.acceptedAnswer?.text) bad(page, 'FAQ entry without question or answer');
    } catch (e) { bad(page, 'structured data does not parse'); }
  }
  if (!types.length) bad(page, 'no structured data');

  // Internal links and images.
  for (const [, href] of html.matchAll(/<a\b[^>]*href="([^"#?]+)[^"]*"/g)) {
    if (!href.startsWith('/')) continue;
    if (!pages.has(href) && !existsSync(join(root, href))) bad(page, `links to ${href}, which does not exist`);
  }
  for (const [tag] of html.matchAll(/<img\b[^>]*>/g)) if (!/\swidth=/.test(tag) || !/\sheight=/.test(tag)) bad(page, `image without width and height: ${(tag.match(/src="([^"]{0,60})/) || [])[1]}`);

  const words = html.replace(/<(script|style|svg)[\s\S]*?<\/\1>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').split(/\s+/).filter(Boolean).length;
  // Listing and contact pages are short by design; content pages are not.
  if (words < 300 && !['/blog/', '/contact/'].includes(page)) bad(page, `only ${words} words`);
  notes.push(`${page.padEnd(34)} ${String(words).padStart(5)} words  ${types.join(', ')}`);
}

// Site files
const sitemap = existsSync(join(root, 'sitemap-0.xml')) ? readFileSync(join(root, 'sitemap-0.xml'), 'utf8') : '';
const listed = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(site, '')));
for (const page of pages.keys()) if (page !== '/404.html' && !listed.has(page)) bad(page, 'is not in the sitemap');
for (const u of listed) if (!pages.has(u)) bad(u, 'is in the sitemap but is not a page');
const robots = readFileSync(join(root, 'robots.txt'), 'utf8');
if (!robots.includes(`Sitemap: ${site}/sitemap-index.xml`)) bad('/robots.txt', 'does not name the sitemap');
if (/Disallow: \/\s*$/m.test(robots)) bad('/robots.txt', 'blocks the whole site');
const llms = existsSync(join(root, 'llms.txt')) ? readFileSync(join(root, 'llms.txt'), 'utf8') : '';
for (const [, u] of llms.matchAll(/\]\((https:\/\/sakib\.mywrkbase\.com[^)]*)\)/g)) if (!pages.has(u.replace(site, ''))) bad('/llms.txt', `links to ${u}, which is not a page`);

console.log(notes.join('\n'));
console.log(problems.length ? `\n${problems.length} problem(s):\n` + problems.join('\n') : '\nno problems');
process.exit(problems.length ? 1 : 0);
