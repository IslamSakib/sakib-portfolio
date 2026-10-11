// Builds the images shown when a link to the site is shared (1200x630): public/og.png for the home page,
// public/og-<slug>.jpg for each service page (headline and photo) and each case study (result and screenshot).
// Run with `npm run og` after changing a headline, a result or a screenshot.
import sharp from 'sharp';
import { readFileSync, readdirSync } from 'node:fs';
import { services } from '../src/services.js';

const W = 1200, H = 630, font = 'Arial, Helvetica, sans-serif';
const esc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;');
// Breaks a sentence into lines of at most `max` characters; a number stays with its unit ("5 s").
const wrap = (t, max) => t.replace(/(\d) s\b/g, '$1\u00a0s').split(' ').reduce((l, w) => ((l.at(-1) + ' ' + w).trim().length <= max ? l.splice(-1, 1, (l.at(-1) + ' ' + w).trim()) : l.push(w), l), ['']);

// Text column on the left; `room` is its width in pixels, so the headline is sized to fit it.
const card = (label, lines, room, right) => {
  const size = Math.min(84, Math.floor(room / (Math.max(...lines.map((l) => l.length)) * 0.5)));
  const top = 315 - ((lines.length - 1) * size * 1.12) / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs><pattern id="d" width="28" height="28" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.3" fill="#f2efe6" fill-opacity="0.1"/></pattern></defs>
  <rect width="${W}" height="${H}" fill="#0c121b"/><rect width="${W}" height="${H}" fill="url(#d)"/>
  ${right}
  <text x="80" y="110" font-family="${font}" font-size="26" fill="#7aa2ff" letter-spacing="2">${esc(label.toUpperCase())}</text>
  ${lines.map((l, i) => `<text x="80" y="${top + i * size * 1.12}" font-family="${font}" font-size="${size}" font-weight="700" fill="#f2efe6" letter-spacing="-${size / 34}">${esc(l)}</text>`).join('')}
  <text x="80" y="550" font-family="${font}" font-size="26" fill="#9aa6b8">Sakib Islam · sakib.mywrkbase.com</text>
</svg>`;
};

// Photo on the solid blue panel, as in the home page hero.
const panel = '<rect x="740" y="150" width="380" height="480" rx="6" fill="#1b55ff"/>';
const photo = await sharp('src/assets/sakib-islam-cut.png').resize(470, 470).toBuffer();
const withPhoto = (label, lines) => sharp(Buffer.from(card(label, lines, 600, panel))).composite([{ input: photo, left: 695, top: 160 }]);

await withPhoto('WordPress · Custom development · AI', ['WordPress developer', 'for SaaS and', 'AI startups.']).png({ compressionLevel: 9 }).toFile('public/og.png');
for (const s of services) await withPhoto(s.name, wrap(s.h1, 18)).jpeg({ quality: 88 }).toFile(`public/og-${s.slug}.jpg`);

// Case studies: the result as the headline, the client's site in a frame on the right.
const frame = '<rect x="619" y="151" width="502" height="316" rx="8" fill="#131b27" stroke="#2a3445" stroke-width="2"/>';
const mask = Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="500" height="313"><rect width="500" height="313" rx="7"/></svg>');
for (const f of readdirSync('src/work')) {
  const slug = f.replace('.md', ''), md = readFileSync(`src/work/${f}`, 'utf8');
  const get = (k) => (md.match(new RegExp(`^${k}: (.*)$`, 'm')) || [])[1].replace(/^"|"$/g, '');
  const shot = await sharp(`src/assets/work/${slug}.png`).resize(500, 313, { position: 'top' }).composite([{ input: mask, blend: 'dest-in' }]).png().toBuffer();
  await sharp(Buffer.from(card(`Case study · ${get('client')}`, wrap(get('result'), 16), 480, frame)))
    .composite([{ input: shot, left: 620, top: 152 }]).jpeg({ quality: 88 }).toFile(`public/og-${slug}.jpg`);
}
console.log('public/og.png and public/og-*.jpg written');
