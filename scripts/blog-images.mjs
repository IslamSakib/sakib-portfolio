// Blog cover images in the site's style: violet-black ground, a fine ivory frame, the topic in amethyst, the title in
// Bricolage Grotesque and a line drawing of the subject. Rendered with headless Chrome so the real fonts are used.
//   src/assets/blog/<slug>.png   1600x900 cover (Astro makes AVIF/WebP sizes from it)
//   public/og-blog-<slug>.jpg     1200x630 share image
// Run `npm run blog-images` after adding a post. A post picks its drawing with `art:` in its frontmatter.
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import { tmpdir } from 'node:os';
import sharp from 'sharp';

const chrome = ['C:/Program Files/Google/Chrome/Application/chrome.exe', '/usr/bin/google-chrome', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'].find(existsSync);
if (!chrome) throw new Error('Chrome not found');
const font = (pkg, file) => pathToFileURL(resolve('node_modules/@fontsource-variable', pkg, 'files', file)).href;
const esc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;');

const C = { bg: '#0b0a0f', panel: '#14121a', line: '#2a2633', line2: '#3a3446', text: '#efeaf6', mut: '#9a93a8', ac: '#a78bfa' };

// Line drawings, one per subject, drawn in a 600x600 box.
const s = (inner) => `<svg viewBox="0 0 600 600" fill="none" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;
const frame = (x, y, w, h, dash = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="${dash ? 'none' : C.panel}" stroke="${C.line2}" stroke-width="2" ${dash ? `stroke-dasharray="${dash}"` : ''}/><circle cx="${x + 22}" cy="${y + 22}" r="5" fill="${C.line2}"/><circle cx="${x + 40}" cy="${y + 22}" r="5" fill="${C.line2}"/><line x1="${x}" y1="${y + 44}" x2="${x + w}" y2="${y + 44}" stroke="${C.line}" stroke-width="2"/>`;
const ring = (cx, cy, r, pct, label) => `<circle cx="${cx}" cy="${cy}" r="${r}" stroke="${C.line}" stroke-width="10"/><circle cx="${cx}" cy="${cy}" r="${r}" stroke="${C.ac}" stroke-width="10" stroke-dasharray="${(2 * Math.PI * r * pct).toFixed(1)} 999" transform="rotate(-90 ${cx} ${cy})"/><text x="${cx}" y="${cy + 9}" text-anchor="middle" font-family="Geist Mono Variable" font-size="26" fill="${C.text}" stroke="none">${label}</text>`;
const art = {
  bars: s(`<text x="60" y="210" font-family="Geist Mono Variable" font-size="24" fill="${C.mut}" stroke="none">BEFORE</text><rect x="60" y="230" width="480" height="34" rx="6" fill="${C.line2}" stroke="none"/><text x="60" y="350" font-family="Geist Mono Variable" font-size="24" fill="${C.ac}" stroke="none">AFTER</text><rect x="60" y="370" width="150" height="34" rx="6" fill="${C.ac}" stroke="none"/>`),
  blank: s(`${frame(70, 110, 460, 380)}<rect x="96" y="176" width="408" height="290" rx="6" fill="${C.text}" opacity="0.92" stroke="none"/><line x1="140" y1="320" x2="460" y2="320" stroke="${C.ac}" stroke-width="4"/>`),
  move: s(`${frame(40, 150, 220, 300, '8 8')}<rect x="66" y="220" width="120" height="14" rx="4" fill="${C.line2}" stroke="none"/><rect x="66" y="250" width="168" height="60" rx="6" fill="${C.line}" stroke="none"/>${frame(340, 150, 220, 300)}<rect x="366" y="220" width="120" height="14" rx="4" fill="${C.ac}" stroke="none"/><rect x="366" y="250" width="168" height="60" rx="6" fill="${C.line2}" stroke="none"/><path d="M270 300h60M315 285l15 15-15 15" stroke="${C.ac}" stroke-width="4"/>`),
  tiers: s(`<rect x="60" y="330" width="140" height="160" rx="10" stroke="${C.line2}" stroke-width="2"/><rect x="230" y="230" width="140" height="260" rx="10" stroke="${C.ac}" stroke-width="3"/><rect x="400" y="130" width="140" height="360" rx="10" stroke="${C.line2}" stroke-width="2"/><text x="300" y="300" text-anchor="middle" font-family="Geist Mono Variable" font-size="34" fill="${C.ac}" stroke="none">$</text>`),
  shield: s(`${frame(60, 120, 480, 360)}<path d="M300 200l90 34v70c0 60-40 96-90 110-50-14-90-50-90-110v-70z" stroke="${C.ac}" stroke-width="4"/><path d="M262 312l26 26 50-56" stroke="${C.ac}" stroke-width="5"/>`),
  rings: s(`${ring(105, 300, 70, 0.86, 'LCP')}${ring(300, 300, 70, 0.92, 'INP')}${ring(495, 300, 70, 0.97, 'CLS')}`),
  price: s(`<rect x="70" y="380" width="70" height="110" rx="8" fill="${C.line2}" stroke="none"/><rect x="170" y="320" width="70" height="170" rx="8" fill="${C.line2}" stroke="none"/><rect x="270" y="250" width="70" height="240" rx="8" fill="${C.line2}" stroke="none"/><rect x="370" y="170" width="70" height="320" rx="8" fill="${C.ac}" stroke="none"/><text x="470" y="150" font-family="Geist Mono Variable" font-size="54" fill="${C.text}" stroke="none">$</text>`),
  checkout: s(`${frame(90, 90, 420, 420)}<rect x="130" y="170" width="340" height="44" rx="8" stroke="${C.line2}" stroke-width="2"/><rect x="130" y="234" width="340" height="44" rx="8" stroke="${C.line2}" stroke-width="2"/><rect x="130" y="298" width="160" height="44" rx="8" stroke="${C.line2}" stroke-width="2"/><rect x="310" y="298" width="160" height="44" rx="8" stroke="${C.line2}" stroke-width="2"/><rect x="130" y="392" width="340" height="60" rx="10" fill="${C.ac}" stroke="none"/><text x="300" y="431" text-anchor="middle" font-family="Geist Mono Variable" font-size="24" fill="${C.bg}" stroke="none">PAY</text>`),
  partner: s(`${frame(50, 130, 300, 260, '9 9')}${frame(250, 210, 300, 260)}<rect x="276" y="282" width="150" height="16" rx="4" fill="${C.ac}" stroke="none"/><rect x="276" y="314" width="240" height="70" rx="8" fill="${C.line}" stroke="none"/>`),
  figma: s(`<rect x="40" y="150" width="200" height="300" rx="14" stroke="${C.line2}" stroke-width="2" stroke-dasharray="8 8"/><rect x="66" y="180" width="80" height="12" rx="4" fill="${C.line2}" stroke="none"/><rect x="66" y="206" width="148" height="30" rx="4" fill="${C.line}" stroke="none"/><rect x="66" y="252" width="148" height="160" rx="6" fill="${C.panel}" stroke="${C.line}" stroke-width="2"/><path d="M262 300h70M317 285l15 15-15 15" stroke="${C.ac}" stroke-width="4"/>${frame(350, 150, 210, 300)}<rect x="374" y="222" width="110" height="14" rx="4" fill="${C.ac}" stroke="none"/><rect x="374" y="250" width="162" height="170" rx="6" fill="${C.line}" stroke="none"/>`),
  weeks: s(['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4'].map((w, i) => `<rect x="${40 + i * 135}" y="220" width="115" height="160" rx="12" stroke="${i === 3 ? C.ac : C.line2}" stroke-width="${i === 3 ? 3 : 2}"/><text x="${60 + i * 135}" y="260" font-family="Geist Mono Variable" font-size="20" fill="${i === 3 ? C.ac : C.mut}" stroke="none">${w}</text>`).join('')),
  cache: s(`<rect x="60" y="200" width="220" height="56" rx="8" stroke="${C.line2}" stroke-width="2"/><rect x="320" y="200" width="220" height="56" rx="8" stroke="${C.line2}" stroke-width="2"/><line x1="80" y1="228" x2="260" y2="228" stroke="${C.mut}" stroke-width="2"/><line x1="340" y1="228" x2="520" y2="228" stroke="${C.mut}" stroke-width="2"/><rect x="60" y="320" width="300" height="64" rx="8" stroke="${C.ac}" stroke-width="3"/><path d="M90 352l14 14 28-30" stroke="${C.ac}" stroke-width="4"/><text x="150" y="361" font-family="Geist Mono Variable" font-size="22" fill="${C.ac}" stroke="none">one cache</text>`),
};

const page = (w, h, post) => `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face { font-family: 'Bricolage Grotesque Variable'; src: url('${font('bricolage-grotesque', 'bricolage-grotesque-latin-wght-normal.woff2')}'); font-weight: 200 800; }
@font-face { font-family: 'Hanken Grotesk Variable'; src: url('${font('hanken-grotesk', 'hanken-grotesk-latin-wght-normal.woff2')}'); font-weight: 100 900; }
@font-face { font-family: 'Geist Mono Variable'; src: url('${font('geist-mono', 'geist-mono-latin-wght-normal.woff2')}'); font-weight: 100 900; }
html, body { margin: 0; width: ${w}px; height: ${h}px; background: ${C.bg}; overflow: hidden; }
.c { position: absolute; inset: ${w * 0.03}px; border: 1px solid ${C.line}; border-radius: ${w * 0.012}px; }
.copy { position: absolute; left: ${w * 0.075}px; top: ${h * 0.14}px; width: ${w * 0.455}px; height: ${h * 0.72}px; display: flex; flex-direction: column; }
.lbl { font: 500 ${w * 0.0125}px 'Geist Mono Variable'; letter-spacing: .12em; text-transform: uppercase; color: ${C.ac}; }
.lbl::before { content: ''; display: inline-block; width: ${w * 0.025}px; height: 1px; background: ${C.ac}; vertical-align: middle; margin-right: ${w * 0.01}px; }
h1 { margin: ${h * 0.05}px 0 0; font: 700 ${w * (post.title.length > 58 ? 0.036 : post.title.length > 44 ? 0.04 : 0.045)}px/1.08 'Bricolage Grotesque Variable'; letter-spacing: -0.035em; color: ${C.text}; }
.foot { margin-top: auto; font: 400 ${w * 0.011}px 'Geist Mono Variable'; color: ${C.mut}; letter-spacing: .04em; }
.foot b { color: ${C.text}; font-weight: 500; }
.art { position: absolute; right: ${w * 0.06}px; top: 50%; transform: translateY(-50%); width: ${h * 0.62}px; height: ${h * 0.62}px; }
.art svg { width: 100%; height: 100%; }
.glow { position: absolute; right: ${w * 0.03}px; top: ${w * 0.03}px; bottom: ${w * 0.03}px; width: ${w * 0.4}px; border-left: 1px solid ${C.line}; background: ${C.panel}; border-radius: 0 ${w * 0.012}px ${w * 0.012}px 0; }
</style></head><body><div class="c"></div><div class="glow"></div>
<div class="copy"><div class="lbl">${esc(post.topic)}</div><h1>${esc(post.title)}</h1><div class="foot"><b>Sakib Islam</b> &nbsp;·&nbsp; sakib.mywrkbase.com/blog</div></div>
<div class="art">${art[post.art] || art.bars}</div></body></html>`;

const render = (html, w, h, out) => {
  const file = join(tmpdir(), `blog-img-${process.pid}.html`);
  writeFileSync(file, html);
  const r = spawnSync(chrome, ['--headless=new', '--disable-gpu', '--hide-scrollbars', `--window-size=${w},${h}`, '--force-device-scale-factor=1', '--virtual-time-budget=3000', `--screenshot=${out}`, pathToFileURL(file).href], { stdio: 'ignore' });
  rmSync(file, { force: true });
  if (r.status !== 0 || !existsSync(out)) throw new Error('render failed: ' + out);
};

mkdirSync('src/assets/blog', { recursive: true });
const only = process.argv.slice(2);
for (const f of readdirSync('src/blog').filter((f) => f.endsWith('.md'))) {
  const slug = f.replace('.md', '');
  if (only.length && !only.includes(slug)) continue;
  const md = readFileSync(join('src/blog', f), 'utf8');
  const get = (k) => ((md.match(new RegExp(`^${k}: (.*)$`, 'm')) || [])[1] || '').replace(/^"|"$/g, '');
  const post = { title: get('title'), topic: get('topic'), art: get('art') };
  const tmp = join(tmpdir(), `${slug}-raw.png`);
  render(page(1600, 900, post), 1600, 900, tmp);
  await sharp(tmp).png({ compressionLevel: 9 }).toFile(`src/assets/blog/${slug}.png`);
  render(page(1200, 630, post), 1200, 630, tmp);
  await sharp(tmp).jpeg({ quality: 86 }).toFile(`public/og-blog-${slug}.jpg`);
  rmSync(tmp, { force: true });
  console.log('image', slug);
}
