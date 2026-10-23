// Draws the four service pictures (glossy violet 3D-style scenes, no screenshots or mockups) and renders them to
// src/assets/visuals/svc-*.jpg with Chrome. Run with `node scripts/service-art.mjs`.
import { chromium } from 'playwright-core';
import { writeFileSync } from 'node:fs';

const W = 1200, H = 800;

const defs = `
<defs>
  <radialGradient id="glow" cx="50%" cy="46%" r="55%"><stop offset="0" stop-color="#7048e8" stop-opacity=".55"/><stop offset=".55" stop-color="#3b1fa0" stop-opacity=".18"/><stop offset="1" stop-color="#0b0a0f" stop-opacity="0"/></radialGradient>
  <radialGradient id="floor" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#a78bfa" stop-opacity=".35"/><stop offset="1" stop-color="#a78bfa" stop-opacity="0"/></radialGradient>
  <pattern id="dots" width="32" height="32" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.2" fill="#f2efe6" fill-opacity=".07"/></pattern>
  <linearGradient id="top" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e4d9ff"/><stop offset="1" stop-color="#a78bfa"/></linearGradient>
  <linearGradient id="left" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7b55f0"/><stop offset="1" stop-color="#3e22a8"/></linearGradient>
  <linearGradient id="right" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a2cc0"/><stop offset="1" stop-color="#1f1060"/></linearGradient>
  <linearGradient id="topD" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5a3fd0"/><stop offset="1" stop-color="#2d1a80"/></linearGradient>
  <linearGradient id="leftD" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#34208a"/><stop offset="1" stop-color="#170c48"/></linearGradient>
  <linearGradient id="rightD" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#22136a"/><stop offset="1" stop-color="#0f0833"/></linearGradient>
  <linearGradient id="shine" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".75"/><stop offset=".5" stop-color="#fff" stop-opacity=".08"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
  <linearGradient id="beam" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#c4b5fd" stop-opacity="0"/><stop offset=".5" stop-color="#e9e1ff" stop-opacity=".95"/><stop offset="1" stop-color="#c4b5fd" stop-opacity="0"/></linearGradient>
  <filter id="blur8" x="-300%" y="-300%" width="700%" height="700%"><feGaussianBlur stdDeviation="8"/></filter>
  <filter id="blur24"><feGaussianBlur stdDeviation="24"/></filter>
  <filter id="soft"><feGaussianBlur stdDeviation="1.2"/></filter>
</defs>`;

const bg = `<rect width="${W}" height="${H}" fill="#0b0a0f"/><rect width="${W}" height="${H}" fill="url(#dots)"/><rect width="${W}" height="${H}" fill="url(#glow)"/>`;

// One isometric block: top face apex at (cx, y0), half width a, half height b, side height h.
const block = (cx, y0, a, b, h, o = {}) => {
  const d = o.dark ? 'D' : '';
  const T = `${cx},${y0} ${cx + a},${y0 + b} ${cx},${y0 + 2 * b} ${cx - a},${y0 + b}`;
  const L = `${cx - a},${y0 + b} ${cx},${y0 + 2 * b} ${cx},${y0 + 2 * b + h} ${cx - a},${y0 + b + h}`;
  const R = `${cx},${y0 + 2 * b} ${cx + a},${y0 + b} ${cx + a},${y0 + b + h} ${cx},${y0 + 2 * b + h}`;
  return `<g opacity="${o.opacity ?? 1}">
    <polygon points="${L}" fill="url(#left${d})"/><polygon points="${R}" fill="url(#right${d})"/><polygon points="${T}" fill="url(#top${d})"/>
    <polygon points="${T}" fill="url(#shine)" opacity="${o.dark ? 0.25 : 0.55}"/>
    <polyline points="${cx - a},${y0 + b} ${cx},${y0 + 2 * b} ${cx + a},${y0 + b}" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="2" stroke-linejoin="round"/>
    <polygon points="${T}" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="1.5" stroke-linejoin="round"/>
    ${o.inset ? `<polygon points="${cx},${y0 + b * 0.55} ${cx + a * 0.62},${y0 + b} ${cx},${y0 + b * 1.45} ${cx - a * 0.62},${y0 + b}" fill="#fff" fill-opacity=".28"/>` : ''}
  </g>`;
};

const shadow = (cx, cy, rx, ry) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#floor)" filter="url(#blur8)"/>`;
const sparks = (pts) => pts.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#efe9ff" opacity=".9"/><circle cx="${x}" cy="${y}" r="${r * 4}" fill="#a78bfa" opacity=".25" filter="url(#blur8)"/>`).join('');
const line = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#c4b5fd" stroke-opacity=".55" stroke-width="2" stroke-dasharray="2 10" stroke-linecap="round"/>`;

const scenes = {
  // A website is layers built together: three slabs from design down to backend, lit from above.
  'svc-website': () => `${bg}
    <g transform="translate(0,-70)">
    ${shadow(600, 640, 330, 70)}
    ${block(600, 470, 300, 150, 40, { dark: true })}
    ${block(600, 370, 300, 150, 40)}
    ${block(600, 250, 300, 150, 46, { inset: true })}
    <rect x="420" y="168" width="360" height="6" rx="3" fill="url(#beam)" filter="url(#soft)"/>
    ${sparks([[330, 210, 3], [880, 260, 4], [760, 140, 3], [250, 420, 2.5], [950, 470, 3]])}</g>`,
  // A web app is a hub with parts around it: accounts, data, API.
  'svc-webapp': () => `${bg}
    ${shadow(600, 660, 360, 60)}
    ${line(600, 440, 270, 330)}${line(600, 440, 930, 330)}${line(600, 440, 300, 560)}${line(600, 440, 900, 560)}
    ${block(270, 270, 92, 46, 44, { dark: true })}
    ${block(930, 270, 92, 46, 44, { dark: true })}
    ${block(300, 500, 80, 40, 38, { dark: true })}
    ${block(900, 500, 80, 40, 38, { dark: true })}
    ${block(600, 330, 170, 85, 100, { inset: true })}
    ${sparks([[200, 160, 3], [1000, 180, 3.5], [600, 130, 3], [140, 520, 2.5], [1060, 520, 3]])}`,
  // WordPress is blocks you assemble: three in place and one lifted into position.
  'svc-wordpress': () => `${bg}
    ${shadow(600, 650, 340, 64)}
    ${block(450, 470, 130, 65, 70, { dark: true })}
    ${block(750, 470, 130, 65, 70, { dark: true })}
    ${block(600, 548, 130, 65, 70)}
    <g transform="translate(0,-100)">${block(600, 380, 130, 65, 70, { inset: true })}</g>
    <path d="M600 478 L600 505" stroke="#e9e1ff" stroke-width="3" stroke-dasharray="3 9" stroke-linecap="round" opacity=".8"/>
    <polygon points="590,505 610,505 600,523" fill="#e9e1ff" opacity=".9"/>
    ${sparks([[300, 210, 3], [930, 250, 3.5], [250, 520, 2.5], [980, 500, 3], [820, 150, 2.5]])}`,
  // Care is protection that stays on: a shield with a check, ringed by a steady orbit.
  'svc-care': () => `${bg}
    <circle cx="600" cy="370" r="260" fill="none" stroke="#c4b5fd" stroke-opacity=".3" stroke-width="2" stroke-dasharray="2 12" stroke-linecap="round"/>
    <circle cx="600" cy="370" r="330" fill="none" stroke="#c4b5fd" stroke-opacity=".15" stroke-width="2"/>
    ${shadow(600, 660, 260, 46)}
    <defs>
      <linearGradient id="sh" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#cdbbff"/><stop offset=".5" stop-color="#7b55f0"/><stop offset="1" stop-color="#2d1a80"/></linearGradient>
      <linearGradient id="shr" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a2cc0"/><stop offset="1" stop-color="#150a45"/></linearGradient>
    </defs>
    <path d="M600 140 L790 210 V380 C790 500 710 580 600 630 C490 580 410 500 410 380 V210 Z" fill="url(#shr)"/>
    <path d="M600 140 L790 210 V380 C790 500 710 580 600 630 Z" fill="#12093a" opacity=".45"/>
    <path d="M600 170 L762 230 V380 C762 482 696 550 600 596 C504 550 438 482 438 380 V230 Z" fill="url(#sh)"/>
    <path d="M600 170 L762 230 V300 C690 260 520 250 438 300 V230 Z" fill="url(#shine)" opacity=".7"/>
    <path d="M600 140 L790 210 V380 C790 500 710 580 600 630 C490 580 410 500 410 380 V210 Z" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="2.5"/>
    <path d="M520 385 L580 445 L685 320" fill="none" stroke="#fff" stroke-width="30" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M520 385 L580 445 L685 320" fill="none" stroke="#e9e1ff" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" opacity=".9"/>
    ${sparks([[300, 250, 3], [900, 210, 4], [860, 520, 3], [250, 500, 2.5], [980, 380, 3]])}`,

  // Speed: a gauge pushed to the top of its range, with a bolt through it.
  'svc-speed': () => `${bg}
    ${shadow(600, 650, 300, 52)}
    <defs><linearGradient id="arc" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#4a2cc0"/><stop offset="1" stop-color="#e4d9ff"/></linearGradient>
    <radialGradient id="disc" cx="50%" cy="35%" r="70%"><stop offset="0" stop-color="#2a1a75"/><stop offset="1" stop-color="#0f0833"/></radialGradient></defs>
    <circle cx="600" cy="360" r="260" fill="url(#disc)" stroke="#fff" stroke-opacity=".35" stroke-width="2"/>
    <path d="M 392 515 A 260 260 0 1 1 808 515" fill="none" stroke="#2a1a75" stroke-width="40" stroke-linecap="round"/>
    <path d="M 392 515 A 260 260 0 0 1 760 190" fill="none" stroke="url(#arc)" stroke-width="40" stroke-linecap="round"/>
    <path d="M640 220 L520 380 H600 L570 510 L690 340 H610 Z" fill="#fff" opacity=".95"/>
    <path d="M640 220 L520 380 H600 L570 510 L690 340 H610 Z" fill="none" stroke="#a78bfa" stroke-width="4" stroke-linejoin="round"/>
    ${sparks([[300, 200, 3], [920, 240, 3.5], [900, 560, 3], [260, 520, 2.5]])}`,
  // Repair: a gear locking back into place.
  'svc-repair': () => {
    const teeth = Array.from({ length: 12 }, (_, i) => `<rect x="-34" y="-290" width="68" height="70" rx="14" transform="rotate(${i * 30})" fill="url(#gl)"/>`).join('');
    return `${bg}
    ${shadow(600, 660, 300, 52)}
    <defs><linearGradient id="gl" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#d6c8ff"/><stop offset=".5" stop-color="#7b55f0"/><stop offset="1" stop-color="#2d1a80"/></linearGradient></defs>
    <g transform="translate(600 370)">${teeth}<circle r="250" fill="url(#gl)"/><circle r="250" fill="url(#shine)" opacity=".5"/><circle r="250" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="2.5"/><circle r="105" fill="#0b0a0f"/><circle r="105" fill="none" stroke="#e9e1ff" stroke-opacity=".7" stroke-width="3"/><circle r="40" fill="#a78bfa" opacity=".8"/></g>
    ${sparks([[260, 240, 3], [950, 200, 3.5], [940, 560, 3], [240, 540, 2.5]])}`;
  },
  // Malware removal: a lens searching a shield until it is clean.
  'svc-malware': () => `${bg}
    ${shadow(600, 660, 280, 48)}
    <defs><linearGradient id="sh2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#cdbbff"/><stop offset=".5" stop-color="#7b55f0"/><stop offset="1" stop-color="#2d1a80"/></linearGradient></defs>
    <path d="M560 150 L740 215 V375 C740 485 665 560 560 605 C455 560 380 485 380 375 V215 Z" fill="url(#sh2)" stroke="#fff" stroke-opacity=".5" stroke-width="2.5"/>
    <path d="M560 150 L740 215 V290 C670 250 470 250 380 290 V215 Z" fill="url(#shine)" opacity=".6"/>
    <circle cx="690" cy="440" r="120" fill="#0b0a0f" fill-opacity=".55" stroke="#e9e1ff" stroke-width="14"/>
    <circle cx="690" cy="440" r="120" fill="url(#shine)" opacity=".25"/>
    <path d="M776 526 L880 630" stroke="#e9e1ff" stroke-width="30" stroke-linecap="round"/>
    <path d="M640 440 L680 480 L750 395" fill="none" stroke="#fff" stroke-width="22" stroke-linecap="round" stroke-linejoin="round"/>
    ${sparks([[250, 260, 3], [940, 220, 3.5], [250, 520, 2.5]])}`,
};

const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: W, height: H } });
for (const [name, draw] of Object.entries(scenes)) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${defs}${draw()}</svg>`;
  await page.setContent(`<body style="margin:0;background:#0b0a0f">${svg}</body>`);
  await page.screenshot({ path: `src/assets/visuals/${name}.jpg`, type: 'jpeg', quality: 90 });
  console.log('wrote', name);
}
await browser.close();
