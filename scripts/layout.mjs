// Layout quality audit: card widths, text fit, section spacing, graphics, borders, titles. Any site, any framework.
// The in-page checks live in layout-checks.js (same folder); this file only drives the browser.
//
//   node scripts/layout.mjs                                  sitemap of BASE, widths 320,390,768,1280
//   node scripts/layout.mjs --w 390,768 --pages /,/pricing  chosen widths and pages
//   BASE=http://localhost:4400 node scripts/layout.mjs --sitemap /sitemap.xml
//   node scripts/layout.mjs --kinds text-orphan,card-width   only these kinds
//   node scripts/layout.mjs --shots                          screenshot each page+width with findings to layout-audit/
//
// FAIL (exit 1): card-width, grid-collapse, text-narrow, graphic-broken.
// WARN: everything else. INFO: low-risk wording notes (orphan words in body text).
import { chromium } from 'playwright-core';
import { readFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const CHECKS = readFileSync(join(here, 'layout-checks.js'), 'utf8').trim();
const base = (process.env.BASE || 'http://localhost:4400').replace(/\/$/, '');
const arg = (n) => { const i = process.argv.indexOf('--' + n); return i > -1 ? process.argv[i + 1] : null; };
const flag = (n) => process.argv.includes('--' + n);
const widths = (arg('w') || '320,390,768,1280').split(',').map(Number);
const kinds = arg('kinds') ? arg('kinds').split(',') : null;
const shots = flag('shots');
if (shots) mkdirSync('layout-audit', { recursive: true });

let pages = arg('pages') ? arg('pages').split(',') : null;
if (!pages) {
  const xml = await (await fetch(base + (arg('sitemap') || '/sitemap.xml'))).text();
  pages = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
}

const FAIL = new Set(['card-width', 'grid-collapse', 'text-narrow', 'graphic-broken', 'external-link', 'overlap']);
const browser = await chromium.launch({ channel: 'chrome' }).catch(() => chromium.launch());
const groups = new Map();
for (const w of widths) {
  const page = await browser.newPage({ viewport: { width: w, height: 900 }, isMobile: w < 700, hasTouch: w < 700 });
  for (const path of pages) {
    await page.goto(base + path, { waitUntil: 'load' }).catch(() => {});
    await page.waitForTimeout(350);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight)); await page.waitForTimeout(150); await page.evaluate(() => window.scrollTo(0, 0));
    const res = await page.evaluate('(' + CHECKS + ')()');
    let any = false;
    for (const r of res) {
      if (kinds && !kinds.includes(r.kind)) continue;
      const level = FAIL.has(r.kind) ? 'FAIL' : r.level;
      const key = `${level}|${r.kind}|${r.msg.replace(/[\d.]+/g, 'N').slice(0, 80)}|${r.where.slice(0, 40)}`;
      (groups.get(key) || groups.set(key, []).get(key)).push(`${path || '/'}@${w}`);
      any = true;
    }
    if (any && shots) await page.screenshot({ path: `layout-audit/${(path.replace(/\W+/g, '_') || 'home')}-${w}.png`, fullPage: true });
  }
  await page.close();
}
await browser.close();

const order = { FAIL: 0, WARN: 1, INFO: 2 };
const rows = [...groups.entries()].map(([k, v]) => ({ k: k.split('|'), v })).sort((a, b) => order[a.k[0]] - order[b.k[0]] || b.v.length - a.v.length);
for (const { k, v } of rows) console.log(`${k[0]}  ${String(v.length).padStart(3)}x  ${k[1].padEnd(16)} ${k[3]}\n        ${k[2]}\n        e.g. ${v.slice(0, 3).join(', ')}`);
const fails = rows.filter((r) => r.k[0] === 'FAIL').length;
console.log(`\n${pages.length} pages x ${widths.length} widths: ${fails} failing groups, ${rows.length - fails} warning/info groups`);
process.exit(fails ? 1 : 0);
