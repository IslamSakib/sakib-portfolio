// Draws one glossy 3D-style picture for each icon key in src/icons.js (src/assets/visuals/k-<key>.jpg), used on the feature cards
// instead of tiny line icons. Run with `node scripts/kit-art.mjs`.
import { chromium } from 'playwright-core';
import { icons } from '../src/icons.js';

const W = 800, H = 450;
const defs = `<defs>
  <radialGradient id="glow" cx="50%" cy="50%" r="55%"><stop offset="0" stop-color="#7048e8" stop-opacity=".5"/><stop offset=".6" stop-color="#3b1fa0" stop-opacity=".15"/><stop offset="1" stop-color="#0b0a0f" stop-opacity="0"/></radialGradient>
  <radialGradient id="floor" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#a78bfa" stop-opacity=".4"/><stop offset="1" stop-color="#a78bfa" stop-opacity="0"/></radialGradient>
  <pattern id="dots" width="28" height="28" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.1" fill="#f2efe6" fill-opacity=".07"/></pattern>
  <linearGradient id="face" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#cdbbff"/><stop offset=".45" stop-color="#7b55f0"/><stop offset="1" stop-color="#34208a"/></linearGradient>
  <linearGradient id="back" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4a2cc0"/><stop offset="1" stop-color="#150a45"/></linearGradient>
  <linearGradient id="shine" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".7"/><stop offset=".5" stop-color="#fff" stop-opacity=".05"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
  <filter id="b10" x="-300%" y="-300%" width="700%" height="700%"><feGaussianBlur stdDeviation="10"/></filter>
  <filter id="b3" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="0.5"/></filter>
</defs>`;

const scene = (path, i) => {
  const rot = [6, -6, 9, -9, 4, -4][i % 6], dx = [0, 30, -30][i % 3];
  const cx = 400 + dx, cy = 215;
  const spark = [[110, 90, 3], [690, 120, 3.5], [640, 360, 3], [140, 340, 2.5], [560, 70, 2.5]]
    .map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#efe9ff" opacity=".9"/><circle cx="${x}" cy="${y}" r="${r * 4}" fill="#a78bfa" opacity=".25" filter="url(#b10)"/>`).join('');
  return `<rect width="${W}" height="${H}" fill="#0b0a0f"/><rect width="${W}" height="${H}" fill="url(#dots)"/><rect width="${W}" height="${H}" fill="url(#glow)"/>
  <ellipse cx="${cx}" cy="392" rx="170" ry="24" fill="url(#floor)" filter="url(#b10)"/>
  <g transform="translate(${cx - 46} ${cy + 18}) rotate(${-rot - 8})"><rect x="-105" y="-105" width="210" height="210" rx="52" fill="url(#back)" stroke="#fff" stroke-opacity=".18" stroke-width="2"/></g>
  <g transform="translate(${cx} ${cy}) rotate(${rot})">
    <rect x="-125" y="-125" width="250" height="250" rx="60" fill="url(#face)" stroke="#fff" stroke-opacity=".55" stroke-width="2.5"/>
    <rect x="-125" y="-125" width="250" height="250" rx="60" fill="url(#shine)" opacity=".6"/>
    <g transform="scale(6.4) translate(-12 -12)" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path d="${path}" stroke="#1a0d55" stroke-opacity=".5" stroke-width="2.2" transform="translate(.5 .7)" filter="url(#b3)"/>
      <path d="${path}" stroke="#fff" stroke-width="1.8"/>
    </g>
  </g>${spark}`;
};

const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: W, height: H } });
let i = 0;
for (const [key, path] of Object.entries(icons)) {
  await page.setContent(`<body style="margin:0;background:#0b0a0f"><svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${defs}${scene(path, i++)}</svg></body>`);
  await page.screenshot({ path: `src/assets/visuals/k-${key}.jpg`, type: 'jpeg', quality: 88 });
}
await browser.close();
console.log('wrote', i, 'pictures');
