// Builds the images shown when a link to the site is shared (1200x630): public/og.png for the home page,
// public/og-<slug>.jpg for each service page (headline and photo) and each case study (result and screenshot).
// Run with `npm run og` after changing a headline, a result or a screenshot.
import sharp from 'sharp';
import { readFileSync, readdirSync } from 'node:fs';
import { services, fixes } from '../src/services.js';
import { roleList } from '../src/roles.js';

const W = 1200, H = 630, font = 'Arial, Helvetica, sans-serif';
const esc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;');
// Breaks a sentence into lines of at most `max` characters; a number stays with its unit ("5 s").
const wrap = (t, max) => t.replace(/(\d) s\b/g, '$1\u00a0s').split(' ').reduce((l, w) => ((l.at(-1) + ' ' + w).trim().length <= max ? l.splice(-1, 1, (l.at(-1) + ' ' + w).trim()) : l.push(w), l), ['']);
// Same number of lines as `wrap`, but evenly filled, so the last line is not a single short word.
const balance = (t, max) => { const n = wrap(t, max).length; for (let w = Math.ceil(t.length / n); w < max; w++) if (wrap(t, w).length <= n) return wrap(t, w); return wrap(t, max); };

// Text column on the left; `room` is its width in pixels, so the headline is sized to fit it.
const card = (label, lines, room, right) => {
  const size = Math.min(84, Math.floor(room / (Math.max(...lines.map((l) => l.length)) * 0.54)));
  const top = 315 - ((lines.length - 1) * size * 1.12) / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs><pattern id="d" width="28" height="28" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.3" fill="#f2efe6" fill-opacity="0.1"/></pattern></defs>
  <rect width="${W}" height="${H}" fill="#0b0a0f"/><rect width="${W}" height="${H}" fill="url(#d)"/>
  ${right}
  <text x="80" y="110" font-family="${font}" font-size="26" fill="#a78bfa" letter-spacing="2">${esc(label.toUpperCase())}</text>
  ${lines.map((l, i) => `<text x="80" y="${top + i * size * 1.12}" font-family="${font}" font-size="${size}" font-weight="700" fill="#f2efe6" letter-spacing="-${size / 34}">${esc(l)}</text>`).join('')}
  <text x="80" y="550" font-family="${font}" font-size="26" fill="#9a93a8">Sakib Islam · sakib.mywrkbase.com</text>
</svg>`;
};

// Photo on a solid violet panel (the brand accent; navy and blue were retired in the Oct 2026 redesign).
const panel = '<rect x="740" y="150" width="380" height="480" rx="6" fill="#7048e8"/>';
const photo = await sharp('src/assets/sakib-islam-cut.png').resize(470, 470).toBuffer();
const withPhoto = (label, lines) => sharp(Buffer.from(card(label, lines, 600, panel))).composite([{ input: photo, left: 695, top: 160 }]);

await withPhoto('Websites · Web apps · WordPress · Care', ['Full stack developer.', 'Custom websites', 'and web apps.']).png({ compressionLevel: 9 }).toFile('public/og.png');
for (const s of [...services, ...fixes]) await withPhoto(s.name, s.h1Lines).jpeg({ quality: 88 }).toFile(`public/og-${s.slug}.jpg`);
// Hand-built pages: [file name, label, headline lines]. Keep the lines in step with each page's H1.
const pages = [
  ['website-care', 'Website care', ['Website maintenance,', 'so your site', 'stops breaking.']],
  ['wordpress-care-plans', 'Care plans', ['WordPress care plans:', 'what each plan', 'includes and costs.']],
  ['white-label-wordpress-development', 'For agencies', ['White label WordPress', 'under your', "agency's name."]],
  ['white-label-wordpress-maintenance', 'For agencies', ['White label support', 'you can resell', 'as your own.']],
  ['contact', 'Contact', ['Tell me what', 'you need built.']],
  ['blog', 'Blog', ['Website guides for', 'owners and teams.']],
  ['terms', 'Service terms', ['Service terms.']],
  ['privacy', 'Privacy', ['No tracking.', 'No cookies.']],
];
for (const [slug, label, lines] of pages) await withPhoto(label, lines).jpeg({ quality: 88 }).toFile(`public/og-${slug}.jpg`);

// Developer-role pages: a hub per role and one image per place.
for (const r of roleList) {
  await withPhoto(r.name, r.hub.h1Lines).jpeg({ quality: 88 }).toFile(`public/og-${r.slug}.jpg`);
  for (const p of r.pages) await withPhoto(`${r.name} · ${p.name}`, p.h1Lines).jpeg({ quality: 88 }).toFile(`public/og-${r.slug}-${p.slug}.jpg`);
}

// Case studies: the result as the headline, the client's site in a frame on the right.
const frame = '<rect x="619" y="151" width="502" height="316" rx="8" fill="#14121a" stroke="#26222f" stroke-width="2"/>';
const mask = Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="500" height="313"><rect width="500" height="313" rx="7"/></svg>');
for (const f of readdirSync('src/work')) {
  const slug = f.replace('.md', ''), md = readFileSync(`src/work/${f}`, 'utf8');
  const get = (k) => (md.match(new RegExp(`^${k}: (.*)$`, 'm')) || [])[1].replace(/^"|"$/g, '');
  const shot = await sharp(`src/assets/work/${slug}.png`).resize(500, 313, { position: 'top' }).composite([{ input: mask, blend: 'dest-in' }]).png().toBuffer();
  await sharp(Buffer.from(card(`Case study · ${get('client')}`, balance(get('result'), 16), 480, frame)))
    .composite([{ input: shot, left: 620, top: 152 }]).jpeg({ quality: 88 }).toFile(`public/og-${slug}.jpg`);
}
console.log('public/og.png and public/og-*.jpg written');
