// Blog cover images: a real photo on the left, a large amethyst disc on the right with the topic and title in
// Bricolage Grotesque, and the wordmark on the photo. Rendered with headless Chrome so the real fonts are used.
//   scripts/photos/<slug>.jpg     source photo (Unsplash, free licence; credits in scripts/photos/CREDITS.md)
//   src/assets/blog/<slug>.jpg    1600x900 in-page image (Astro makes AVIF/WebP sizes from it)
//   public/og-blog-<slug>.jpg     1200x630 share image
// Run `npm run blog-images` after adding a post. `photoFocus: 30%` in frontmatter moves the photo crop left/right.
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

const page = (w, h, post) => {
  const u = w / 1600; // sizes are designed at 1600 wide
  const r = h * 0.72; // disc radius; its left edge curves over the photo
  const cx = w - r * 0.62;
  const size = (post.title.length > 56 ? 68 : 76) * u;
  const photoW = cx - Math.sqrt(r * r - (h / 2) ** 2) + 20 * u; // photo ends just under the disc's top and bottom edge
  return `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face { font-family: 'Bricolage Grotesque Variable'; src: url('${font('bricolage-grotesque', 'bricolage-grotesque-latin-wght-normal.woff2')}'); font-weight: 200 800; }
@font-face { font-family: 'Geist Mono Variable'; src: url('${font('geist-mono', 'geist-mono-latin-wght-normal.woff2')}'); font-weight: 100 900; }
html, body { margin: 0; width: ${w}px; height: ${h}px; background: #0b0a0f; overflow: hidden; }
.photo { position: absolute; left: 0; top: 0; width: ${photoW}px; height: 100%; background: url('${post.photo}') ${post.focus} 50% / cover; }
.photo::after { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, rgba(11,10,15,.15), rgba(11,10,15,0) 40%); }
.disc { position: absolute; left: ${cx - r}px; top: ${h / 2 - r}px; width: ${r * 2}px; height: ${r * 2}px; border-radius: 50%; background: #a78bfa; overflow: hidden;
  box-shadow: 0 0 0 ${14 * u}px rgba(167,139,250,.28); }
.disc::before { content: ''; position: absolute; inset: 0; background-image: linear-gradient(rgba(11,10,15,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(11,10,15,.07) 1px, transparent 1px); background-size: ${48 * u}px ${48 * u}px; }
.copy { position: absolute; left: ${cx - r * 0.78}px; right: ${70 * u}px; top: 50%; transform: translateY(-50%); color: #0b0a0f; }
.lbl { font: 500 ${19 * u}px 'Geist Mono Variable'; letter-spacing: .14em; text-transform: uppercase; }
.lbl::before { content: ''; display: inline-block; width: ${36 * u}px; height: ${2 * u}px; background: #0b0a0f; vertical-align: middle; margin-right: ${14 * u}px; }
h1 { margin: ${26 * u}px 0 0; font: 750 ${size}px/1.04 'Bricolage Grotesque Variable'; letter-spacing: -0.035em; text-wrap: balance; }
.mark { position: absolute; left: ${40 * u}px; bottom: ${40 * u}px; padding: ${12 * u}px ${22 * u}px; border-radius: ${999}px; background: rgba(11,10,15,.82); color: #efeaf6;
  font: 600 ${24 * u}px 'Bricolage Grotesque Variable'; letter-spacing: -0.03em; }
.mark span { color: #a78bfa; }
</style></head><body><div class="photo"></div><div class="disc"></div>
<div class="copy"><div class="lbl">${esc(post.topic)}</div><h1>${esc(post.title)}</h1></div>
<div class="mark">Sakib Islam<span>.</span></div></body></html>`;
};

const render = (html, w, h, out) => {
  const file = join(tmpdir(), `blog-img-${process.pid}.html`);
  writeFileSync(file, html);
  const r = spawnSync(chrome, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--allow-file-access-from-files', `--window-size=${w},${h}`, '--force-device-scale-factor=1', '--virtual-time-budget=3000', `--screenshot=${out}`, pathToFileURL(file).href], { stdio: 'ignore' });
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
  const src = resolve('scripts/photos', `${slug}.jpg`);
  if (!existsSync(src)) throw new Error(`missing photo: scripts/photos/${slug}.jpg`);
  const post = { title: get('title'), topic: get('topic'), focus: get('photoFocus') || '50%', photo: pathToFileURL(src).href };
  const tmp = join(tmpdir(), `${slug}-raw.png`);
  render(page(1600, 900, post), 1600, 900, tmp);
  await sharp(tmp).jpeg({ quality: 88, mozjpeg: true }).toFile(`src/assets/blog/${slug}.jpg`);
  render(page(1200, 630, post), 1200, 630, tmp);
  await sharp(tmp).jpeg({ quality: 86, mozjpeg: true }).toFile(`public/og-blog-${slug}.jpg`);
  rmSync(tmp, { force: true });
  console.log('image', slug);
}
