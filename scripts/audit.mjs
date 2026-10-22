// Responsive audit: 16 real device sizes x public pages + dashboard x English and Bangla.
// Needs `npm run dev` and `npm run api` running, and Chrome installed.
//
//   npm run audit                       everything (a few minutes)
//   npm run audit -- --quick            5 key sizes only
//   npm run audit -- --only admin       just the dashboard (or: public)
//   npm run audit -- --lang en          one language
//   npm run audit -- --w 320,390        chosen widths
//   npm run audit -- --shots            save a screenshot of every page and size to audit/
//
// FAIL (exit code 1): sideways scroll, elements poking off screen, overlapping controls, script errors.
// WARN (listed, not failing): tap targets under 44 px on touch sizes, text under 14 px.
import { chromium } from 'playwright-core';
import { mkdirSync, readFileSync, existsSync } from 'node:fs';

const base = process.env.BASE || 'http://localhost:4400';
const arg = (n) => { const i = process.argv.indexOf('--' + n); return i > -1 ? process.argv[i + 1] : null; };
const flag = (n) => process.argv.includes('--' + n);

const DEVICES = [
  ['Small mobile', 320, 568], ['Mobile', 360, 800], ['Mobile', 375, 812], ['Mobile', 390, 844], ['Large mobile', 430, 932],
  ['Small tablet', 600, 960], ['Tablet', 768, 1024], ['Large tablet', 820, 1180], ['iPad Pro', 1024, 1366],
  ['Small laptop', 1280, 720], ['Laptop', 1366, 768], ['Laptop', 1440, 900], ['Desktop', 1536, 864], ['Desktop', 1920, 1080],
  ['Large desktop', 2560, 1440], ['Ultrawide', 3440, 1440],
];
const QUICK = [320, 390, 768, 1280, 1920];
let devices = DEVICES;
if (flag('quick')) devices = DEVICES.filter((d) => QUICK.includes(d[1]));
if (arg('w')) { const ws = arg('w').split(',').map(Number); devices = DEVICES.filter((d) => ws.includes(d[1])); }

const PUBLIC = ['/', '/custom-web-development/', '/wordpress-development/', '/website-care/', '/wordpress-care-plans/', '/full-stack-developer/', '/full-stack-developer/florida/', '/full-stack-developer/usa/', '/web-application-developer/', '/web-application-developer/texas/', '/wordpress-developer/', '/wordpress-developer/chicago/', '/work/mayabee/', '/work/tabby/', '/contact/', '/white-label-wordpress-development/', '/blog/'];
const ADMIN = [];
const only = arg('only');
const langs = arg('lang') ? [arg('lang') === 'bn' ? '/bn' : ''] : ['', '/bn'];
const shots = flag('shots');
if (shots) mkdirSync('audit', { recursive: true });

const browser = await chromium.launch({ channel: 'chrome' });

/** Sign in to the dashboard as the dev owner (confirming this "device" from the dev mail log). */
async function adminState() {
  const ctx = await browser.newContext();
  const H = { 'Content-Type': 'application/json', 'X-Requested-With': 'mb' };
  const creds = { email: 'owner@mayabee.test', password: 'Mayabee#2026' };
  let r = await (await ctx.request.post(base + '/api/admin/login', { headers: H, data: creds })).json();
  if (r.confirm) {
    const log = existsSync('api/dev-mail.log') ? readFileSync('api/dev-mail.log', 'utf8') : '';
    const t = [...log.matchAll(/confirm\?t=([a-f0-9]+)/g)].pop()?.[1];
    if (!t) throw new Error('Could not sign in to the dashboard: no confirm link in api/dev-mail.log');
    r = await (await ctx.request.post(base + '/api/admin/confirm', { headers: H, data: { token: t } })).json();
  }
  if (!r.ok) throw new Error('Dashboard sign-in failed. Is the dev owner created? (php api/make-owner.php owner@mayabee.test "Dev Owner" owner)');
  const s = await ctx.storageState();
  await ctx.close();
  return s;
}
const needsAdmin = only !== 'public';
const state = needsAdmin ? await adminState() : undefined;

/** Runs inside the page. Returns what is wrong at this size. */
function inspect({ touch }) {
  const W = document.documentElement.clientWidth;
  const vis = (e) => { const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && cs.display !== 'none' && cs.opacity !== '0'; };
  const name = (e) => e.tagName.toLowerCase() + (e.id ? '#' + e.id : '') + '.' + String(e.className?.baseVal ?? e.className).trim().split(/\s+/).slice(0, 2).join('.') + (e.textContent ? ` "${e.textContent.trim().slice(0, 18)}"` : '');
  const inScroller = (e) => { for (let p = e.parentElement; p && p !== document.body; p = p.parentElement) { const o = getComputedStyle(p).overflowX; if ((o === 'auto' || o === 'scroll') && p.scrollWidth > p.clientWidth) return true; } return false; };
  const ownText = (e) => [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
  const clipped = (e) => { if (ownText(e)) return false; for (let p = e.parentElement; p && p !== document.documentElement; p = p.parentElement) { const o = getComputedStyle(p).overflowX; if ((o === 'hidden' || o === 'clip') && p.getBoundingClientRect().right <= W + 1) return true; } return false; }; // pictures and decoration cut off inside their own box are fine; words that are cut off are not
  const skip = '[data-cart],.mb-panel,.mb-drawer,dialog,[hidden],.mb-word';

  const off = [...document.querySelectorAll('body *')].filter((e) => {
    if (!vis(e) || e.closest(skip) || inScroller(e) || clipped(e)) return false;
    const r = e.getBoundingClientRect(), cs = getComputedStyle(e);
    return r.right > W + 1 && cs.position !== 'fixed';
  }).slice(0, 3).map(name);

  const controls = [...document.querySelectorAll('a[href],button,input:not([type=hidden]),select,textarea,summary')].filter((e) => vis(e) && !e.closest(skip) && !e.classList.contains('sr') && !e.closest('.sr') && !e.classList.contains('mb-quick')); // .mb-quick waits off the photo until hover
  const overlap = [];
  for (let i = 0; i < controls.length && overlap.length < 3; i++) {
    const a = controls[i].getBoundingClientRect();
    for (let j = i + 1; j < controls.length; j++) {
      if (controls[i].contains(controls[j]) || controls[j].contains(controls[i])) continue;
      if (controls[i].closest('.mb-ci,.pd-main') && controls[j].closest('.mb-ci,.pd-main')) continue; // buttons laid over a photo on purpose
      const b = controls[j].getBoundingClientRect();
      const w = Math.min(a.right, b.right) - Math.max(a.left, b.left), h = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
      if (w > 4 && h > 4 && getComputedStyle(controls[i]).position !== 'fixed' && getComputedStyle(controls[j]).position !== 'fixed' && !controls[i].closest('.mb-header,header') ) { overlap.push(name(controls[i]) + ' x ' + name(controls[j])); break; }
    }
  }

  const small = touch ? controls.filter((e) => { const r = e.getBoundingClientRect(); const t = e.type; return (r.height < 43 || r.width < 43) && t !== 'checkbox' && t !== 'radio' && !(e.tagName === 'A' && e.closest('p,li,dd,td,.mb-ft,nav') && r.height < 43 && e.textContent.trim().length > 12); }).slice(0, 3).map(name) : [];
  const tiny = [...document.querySelectorAll('body *')].filter((e) => {
    if (!vis(e) || e.closest(skip) || ![...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim().length > 1)) return false;
    return parseFloat(getComputedStyle(e).fontSize) < 13.5;
  }).slice(0, 3).map(name);
  return { sw: document.documentElement.scrollWidth, W, off, overlap, small, tiny };
}

const fail = []; const warn = []; const perDevice = [];
for (const [label, w, h] of devices) {
  const touch = w <= 1024;
  let pagesDone = 0, issues = 0, warns = 0;
  for (const kind of ['public', 'admin']) {
    if (only && only !== kind) continue;
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, hasTouch: touch, isMobile: w <= 600, storageState: kind === 'admin' ? state : undefined });
    const pg = await ctx.newPage();
    const errors = [];
    pg.on('pageerror', (e) => errors.push(String(e.message).slice(0, 90)));
    for (const lang of kind === 'admin' ? [''] : langs) { // the dashboard switches language in the browser, not by address
      for (const p of kind === 'admin' ? ADMIN : PUBLIC) {
        const url = base + (lang && p === '/' ? lang : lang + p);
        errors.length = 0;
        const res = await pg.goto(url, { waitUntil: 'networkidle' }).catch(() => null);
        await pg.waitForTimeout(250);
        const r = await pg.evaluate(inspect, { touch });
        const tag = `${w}px ${label} ${lang || '/en'} ${p}`;
        const status = res?.status();
        const problems = [];
        if (r.sw > r.W + 1) problems.push(`sideways scroll ${r.sw}>${r.W}`);
        if (r.off.length) problems.push('off screen: ' + r.off.join(' | '));
        if (r.overlap.length) problems.push('overlap: ' + r.overlap.join(' | '));
        if (errors.length) problems.push('script error: ' + errors[0]);
        if (status && status >= 500) problems.push('server error ' + status);
        if (problems.length) { fail.push(`${tag}\n    ${problems.join('\n    ')}`); issues++; }
        const ws = [];
        if (r.small.length) ws.push('small tap target: ' + r.small.join(' | '));
        if (r.tiny.length) ws.push('text under 14px: ' + r.tiny.join(' | '));
        if (ws.length) { warn.push(`${tag}\n    ${ws.join('\n    ')}`); warns++; }
        if (shots) await pg.screenshot({ path: `audit/${w}${(lang || '-en').replace('/', '-')}${p.replace(/[^a-z0-9]+/gi, '_')}.png`, fullPage: true });
        pagesDone++;
      }
    }
    await ctx.close();
  }
  perDevice.push([`${w} x ${h}`, label, pagesDone, issues, warns]);
  process.stdout.write(`${w}px ${label}: ${issues ? issues + ' FAIL' : 'ok'}${warns ? ', ' + warns + ' warn' : ''}\n`);
}
await browser.close();

console.log('\nSize         Device         Pages  Fail  Warn');
for (const [s, d, n, f, w] of perDevice) console.log(`${s.padEnd(12)} ${d.padEnd(14)} ${String(n).padStart(5)} ${String(f).padStart(5)} ${String(w).padStart(5)}`);
if (warn.length) console.log(`\nWARNINGS (${warn.length}, not failing):\n` + warn.slice(0, 40).join('\n') + (warn.length > 40 ? `\n... and ${warn.length - 40} more` : ''));
if (fail.length) { console.log(`\nFAILURES (${fail.length}):\n` + fail.join('\n')); process.exit(1); }
console.log('\nNo failures at any size.');
