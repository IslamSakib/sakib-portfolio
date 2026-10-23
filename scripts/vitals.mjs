// Core Web Vitals check: LCP, CLS, INP (simulated tap), FCP, TTFB and blocking time on a throttled phone.
// Needs `npm run dev` and `npm run api` running, and Chrome installed.
//
//   npm run vitals                    every public page + a few dashboard pages
//   npm run vitals -- --only public   (or: admin)
//   npm run vitals -- --page /shop    one page
//   npm run vitals -- --desktop       no throttling, 1440 wide
//
// Google "good" limits: LCP 2.5 s, CLS 0.1, INP 200 ms, FCP 1.8 s, TTFB 0.8 s. Blocking time (TBT) 200 ms is the lab stand-in for INP.
// FAIL (exit code 1): a metric in Google's "poor" band. WARN: "needs improvement". Dev servers are not minified, so the
// numbers are slightly worse than the live site. Run it again after `npm run package` is deployed for the real answer.
import { chromium } from 'playwright-core';
import { readFileSync, existsSync } from 'node:fs';

const base = process.env.BASE || 'http://localhost:4400';
const arg = (n) => { const i = process.argv.indexOf('--' + n); return i > -1 ? process.argv[i + 1] : null; };
const flag = (n) => process.argv.includes('--' + n);

const PUBLIC = ['/', '/custom-web-development/', '/wordpress-development/', '/custom-web-development/website-maintenance/', '/wordpress-development/wordpress-maintenance/', '/full-stack-developer/', '/full-stack-developer/florida/', '/full-stack-developer/usa/', '/web-application-developer/', '/web-application-developer/texas/', '/wordpress-developer/', '/wordpress-developer/chicago/', '/work/mayabee/', '/work/tabby/', '/contact/', '/wordpress-development/white-label-wordpress-development/', '/blog/'];
const ADMIN = [];
let pages = flag('only') || arg('only') ? (arg('only') === 'admin' ? ADMIN : PUBLIC) : [...PUBLIC, ...ADMIN];
if (arg('page')) pages = [('/' + arg('page').replace(/^[A-Za-z]:[\/]Program Files[\/]Git/, '').replace(/^\/+/, ''))]; // Git Bash turns /shop into a C:/ path

// [metric, unit, good, poor]
const LIMITS = { LCP: [2500, 4000], CLS: [0.1, 0.25], INP: [200, 500], FCP: [1800, 3000], TTFB: [800, 1800], TBT: [200, 600] };
const grade = (k, v) => (v === null ? 'n/a' : v <= LIMITS[k][0] ? 'good' : v <= LIMITS[k][1] ? 'warn' : 'FAIL');

const browser = await chromium.launch({ channel: 'chrome' });
const desktop = flag('desktop');
const ctx = await browser.newContext(desktop ? { viewport: { width: 1440, height: 900 } } : { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });

async function admin() {
  const f = 'api/dev-owner.txt';
  const t = existsSync(f) ? readFileSync(f, 'utf8') : '';
  const email = /email:\s*(\S+)/.exec(t)?.[1], password = /password:\s*(\S+)/.exec(t)?.[1];
  if (!email) return false;
  const H = { 'Content-Type': 'application/json', 'X-Requested-With': 'mb' };
  let r = await (await ctx.request.post(base + '/api/admin/login', { headers: H, data: { email, password } })).json();
  if (r.confirm) { // new device: the dev mail log holds the confirm link
    const log = readFileSync('api/dev-mail.log', 'utf8'); const tok = [...log.matchAll(/confirm\?t=(\w+)/g)].pop()?.[1];
    if (tok) r = await (await ctx.request.post(base + '/api/admin/confirm', { headers: H, data: { token: tok } })).json();
  }
  return !!r.ok;
}
const needsAdmin = pages.some((p) => p.startsWith('/admin'));
const adminOk = needsAdmin ? await admin() : false;

const rows = []; const notes = [];
for (const path of pages) {
  if (path.startsWith('/admin') && !adminOk) { notes.push(`${path}: skipped (no dev sign-in)`); continue; }
  const page = await ctx.newPage();
  const cdp = await ctx.newCDPSession(page);
  if (!desktop) {
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 }); // mid-range phone
    await cdp.send('Network.enable');
    await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: (1.6 * 1024 * 1024) / 8, uploadThroughput: (750 * 1024) / 8 }); // "slow 4G"
  }
  let bytes = 0, reqs = 0; const big = [];
  page.on('response', async (r) => { try { const len = +(r.headers()['content-length'] || 0); bytes += len; reqs++; if (len > 250000 && /image/.test(r.headers()['content-type'] || '')) big.push(r.url().split('/').pop() + ' ' + Math.round(len / 1024) + 'KB'); } catch {} });
  await page.addInitScript(() => {
    const w = window; w.__v = { lcp: 0, lcpEl: '', cls: 0, tbt: 0, inp: 0, fcp: 0, shifts: [] };
    new PerformanceObserver((l) => { for (const e of l.getEntries()) { w.__v.lcp = e.startTime; w.__v.lcpEl = (e.element?.tagName || '') + (e.element?.className ? '.' + String(e.element.className).split(' ')[0] : '') + (e.url ? ' ' + e.url.split('/').pop().slice(0, 40) : ''); } }).observe({ type: 'largest-contentful-paint', buffered: true });
    new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) { w.__v.cls += e.value; if (e.value > 0.01) w.__v.shifts.push(e.value.toFixed(3) + ' ' + (e.sources || []).slice(0, 2).map((s) => (s.node?.nodeName || '?').toLowerCase() + (s.node?.className && typeof s.node.className === 'string' ? '.' + s.node.className.split(' ')[0] : '') + '#' + (s.node?.id || '')).join(' + ')); } }).observe({ type: 'layout-shift', buffered: true });
    new PerformanceObserver((l) => { for (const e of l.getEntries()) if (e.startTime > 0) w.__v.tbt += Math.max(0, e.duration - 50); }).observe({ type: 'longtask', buffered: true });
    new PerformanceObserver((l) => { for (const e of l.getEntries()) w.__v.inp = Math.max(w.__v.inp, e.duration); }).observe({ type: 'event', durationThreshold: 16, buffered: true });
    new PerformanceObserver((l) => { for (const e of l.getEntries()) if (e.name === 'first-contentful-paint') w.__v.fcp = e.startTime; }).observe({ type: 'paint', buffered: true });
  });
  const errs = []; page.on('pageerror', (e) => errs.push(e.message));
  try { await page.goto(base + path, { waitUntil: 'load', timeout: 60000 }); } catch (e) { notes.push(`${path}: ${e.message.split('\n')[0]}`); await page.close(); continue; }
  await page.waitForTimeout(3500); // let late shifts and the hero finish
  // a real tap on the first button or link that is not navigation, to measure responsiveness
  try { const b = page.locator('button:visible:not([disabled])').first(); if (await b.count()) { await b.click({ timeout: 2000, noWaitAfter: true }); await page.waitForTimeout(600); } } catch {}
  const nav = await page.evaluate(() => { const n = performance.getEntriesByType('navigation')[0]; return { ttfb: n ? n.responseStart : null }; });
  const v = await page.evaluate(() => (window).__v);
  const noDim = await page.evaluate(() => [...document.images].filter((i) => !i.getAttribute('width') && !i.style.width && !i.closest('[style*="aspect"],[class*="mb-ci"],[class*="photo"],[class*="th"]') && i.getBoundingClientRect().height > 0).length);
  const m = { LCP: v.lcp || null, CLS: +v.cls.toFixed(3), INP: v.inp || 0, FCP: v.fcp || null, TTFB: nav.ttfb, TBT: Math.round(v.tbt) };
  rows.push({ path, ...m, el: v.lcpEl, shifts: v.shifts, kb: Math.round(bytes / 1024), reqs, big, noDim, errs });
  await page.close();
}
await browser.close();

const f = (k, v) => (v === null ? 'n/a' : k === 'CLS' ? v.toFixed(3) : Math.round(v) + 'ms');
let fails = 0, warns = 0;
console.log(`\nCore Web Vitals, ${desktop ? 'desktop' : 'phone 390px, 4x slower CPU, slow 4G'} (${base})\n`);
console.log('Page'.padEnd(30) + ['LCP', 'CLS', 'INP', 'FCP', 'TTFB', 'TBT'].map((k) => k.padEnd(11)).join('') + 'Weight');
for (const r of rows) {
  const cells = ['LCP', 'CLS', 'INP', 'FCP', 'TTFB', 'TBT'].map((k) => { const g = grade(k, r[k]); if (g === 'FAIL') fails++; if (g === 'warn') warns++; return (f(k, r[k]) + (g === 'good' || g === 'n/a' ? '' : g === 'warn' ? ' !' : ' X')).padEnd(11); });
  console.log(r.path.padEnd(30) + cells.join('') + `${r.kb}KB/${r.reqs}`);
}
console.log('\nDetails');
for (const r of rows) {
  const d = [];
  if (r.el) d.push('LCP element: ' + r.el);
  if (r.shifts.length) d.push('layout shifts: ' + r.shifts.slice(0, 3).join(' | '));
  if (r.big.length) d.push('heavy images: ' + r.big.slice(0, 3).join(', '));
  if (r.noDim > 2) d.push(`${r.noDim} images without a fixed size (layout-shift risk)`);
  if (r.errs.length) d.push('script error: ' + r.errs[0]);
  if (d.length) console.log(r.path + '\n  ' + d.join('\n  '));
}
for (const n of notes) console.log('note: ' + n);
console.log(`\n${fails} poor, ${warns} needs improvement`);
process.exit(fails ? 1 : 0);
