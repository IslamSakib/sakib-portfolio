// Visits every page in the sitemap with Chrome and reports console errors, failed requests, broken images, a wrong H1 count,
// invalid JSON-LD and links that point to missing pages. Run with `node scripts/qa.mjs` while `astro preview --port 4400` is up.
import { chromium } from 'playwright-core';
const base = (process.env.BASE || 'http://localhost:4400').replace(/\/$/, '');
const xml = await (await fetch(base + '/sitemap-0.xml')).text();
const pages = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
const browser = await chromium.launch({ channel: 'chrome' }).catch(() => chromium.launch());
const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const page = await ctx.newPage();
let problems = 0;
const report = (p, msg) => { problems++; console.log(`${p}  ${msg}`); };
for (const p of pages) {
  const errs = [], fails = [];
  page.removeAllListeners();
  page.on('console', (m) => m.type() === 'error' && errs.push(m.text().slice(0, 100)));
  page.on('pageerror', (e) => errs.push('pageerror ' + e.message.slice(0, 100)));
  page.on('requestfailed', (r) => fails.push(r.url().slice(0, 80)));
  const res = await page.goto(base + p, { waitUntil: 'load' }).catch(() => null);
  if (!res || res.status() !== 200) { report(p, 'status ' + (res && res.status())); continue; }
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight)); await page.waitForTimeout(250);
  const r = await page.evaluate(() => ({
    h1: document.querySelectorAll('h1').length,
    badImg: [...document.images].filter((i) => i.complete && i.naturalWidth === 0 && i.loading !== 'lazy').length + [...document.images].filter((i) => i.complete && i.naturalWidth === 0 && i.currentSrc).length,
    ld: [...document.querySelectorAll('script[type="application/ld+json"]')].filter((s) => { try { JSON.parse(s.textContent); return false; } catch { return true; } }).length,
    title: document.title.length,
    desc: (document.querySelector('meta[name=description]') || {}).content?.length || 0,
    sw: document.documentElement.scrollWidth - innerWidth,
  }));
  if (errs.length) report(p, 'console: ' + errs[0]);
  if (fails.length) report(p, 'failed request: ' + fails[0]);
  if (r.h1 !== 1) report(p, `h1 count ${r.h1}`);
  if (r.badImg) report(p, `${r.badImg} broken image(s)`);
  if (r.ld) report(p, `${r.ld} invalid JSON-LD`);
  if (r.sw > 0) report(p, `sideways scroll ${r.sw}px`);
}
await browser.close();
console.log(`${pages.length} pages, ${problems} problem(s)`);
