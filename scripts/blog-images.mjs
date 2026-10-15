// Blog covers, made for each post (no stock photos): an interface scene about the post's subject on the left, built
// from the site's own parts and, where it fits, real client screenshots; a large amethyst disc on the right with the
// topic and title. Rendered with headless Chrome so the site's own fonts are used.
//   src/assets/blog/<slug>.jpg    1600x900 in-page image (Astro makes AVIF/WebP sizes from it)
//   public/og-blog-<slug>.jpg     1200x630 share image
// A post picks its scene with `art:` in its frontmatter (one of the keys of `scenes` below).
// Run `npm run blog-images` after adding a post; `node scripts/blog-images.mjs <slug>` renders one.
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import { tmpdir } from 'node:os';
import sharp from 'sharp';

const chrome = ['C:/Program Files/Google/Chrome/Application/chrome.exe', '/usr/bin/google-chrome', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'].find(existsSync);
if (!chrome) throw new Error('Chrome not found');
const font = (pkg, file) => pathToFileURL(resolve('node_modules/@fontsource-variable', pkg, 'files', file)).href;
const shot = (f) => pathToFileURL(resolve('src/assets/work', f)).href;
const esc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const W = 1600, H = 900;

// Small parts the scenes are built from.
const win = (label, body, style) => `<div class="win" style="${style}"><div class="bar"><i></i><i></i><i></i><span>${label}</span></div>${body}</div>`;
const site = (url, img, style) => win(url, `<img src="${shot(img)}" style="display:block;width:100%">`, style);
const card = (body, style, glow = false) => `<div class="card${glow ? ' glow' : ''}" style="${style}">${body}</div>`;
const ok = (t) => `<div class="row"><span class="ok">✓</span><span>${t}</span></div>`;
const no = (t) => `<div class="row"><span class="no">×</span><span class="mut">${t}</span></div>`;
const gauge = (pct, label, color = '#5fd38d', size = 180) => {
  const r = size * 0.39, c = 2 * Math.PI * r;
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="#2a2633" stroke-width="${size * 0.08}"/><circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="${color}" stroke-width="${size * 0.08}" stroke-linecap="round" stroke-dasharray="${(c * pct).toFixed(1)} ${c.toFixed(1)}" transform="rotate(-90 ${size / 2} ${size / 2})"/><text x="${size / 2}" y="${size / 2 + size * 0.1}" text-anchor="middle" font-family="B" font-weight="700" font-size="${size * 0.25}" fill="#efeaf6">${label}</text></svg>`;
};
const bar = (name, value, width, color) => `<div style="display:grid;grid-template-columns:96px 1fr 84px;gap:14px;align-items:center;margin-top:16px"><span class="mono mut" style="font-size:18px">${name}</span><span style="height:14px;border-radius:7px;background:#2a2633"><i style="display:block;height:100%;width:${width}%;border-radius:7px;background:${color}"></i></span><b class="mono" style="font-size:20px;font-weight:500;text-align:right;color:${color}">${value}</b></div>`;
const log = (lines) => `<div class="mono" style="padding:22px 26px;font-size:18px;line-height:2">${lines.map(([t, bad]) => `<p style="${bad ? 'color:#ff8f7a;background:rgba(224,98,74,.14);margin:0 -26px;padding:0 26px;border-left:4px solid #e0624a' : 'color:#8f879f'}">${t}</p>`).join('')}</div>`;

// One scene per subject. Coordinates are for a 1600x900 page; the disc covers everything right of about x=760.
const scenes = {
  speed: `${site('tubeonai.com', 'tubeonai.png', 'left:60px;top:120px;width:640px')}
    ${card(`<p class="lab">Mobile load time</p>${bar('Before', '5.0 s', 100, '#e0624a')}${bar('After', '1.5 s', 30, '#5fd38d')}`, 'left:90px;top:560px;width:600px', true)}`,
  blank: `${win('yoursite.com', '<div style="height:330px;background:#fff"></div>', 'left:60px;top:130px;width:660px')}
    ${card(`<p class="lab" style="color:#ff8f7a">Error</p><p style="font:700 34px/1.15 B;margin-top:10px">There has been a critical error on this website.</p>`, 'left:100px;top:470px;width:580px', true)}`,
  redesign: `${win('old site', '<div style="padding:18px"><div style="height:24px;width:60%;background:#2a2633;border-radius:5px"></div><div style="margin-top:14px;height:120px;background:#221f2b;border-radius:8px"></div></div>', 'left:60px;top:150px;width:330px;opacity:.75')}
    ${site('new site', 'tabby.png', 'left:300px;top:230px;width:440px')}
    ${card(`<p class="lab">Rankings kept</p>${ok('Same page addresses')}${ok('Titles carried over')}${ok('Redirects in place')}`, 'left:80px;top:540px;width:430px', true)}`,
  // Ranges from the sources cited in the maintenance cost post (Sitewired, Oct 2026).
  cost: `${card(`<p class="lab">Monthly WordPress maintenance</p><div style="display:grid;gap:14px;margin-top:20px">${[['Freelancer', '$75 – $300', false], ['Agency', '$200 – $1,000+', false], ['My Care plan', '$149', true]].map(([n, p, hi]) => `<div class="row" style="justify-content:space-between;padding:18px 20px;border-radius:12px;border:1px solid ${hi ? '#a78bfa' : '#2f2a3b'};background:${hi ? 'rgba(167,139,250,.14)' : '#121019'}"><span style="font:600 22px H">${n}</span><b class="mono" style="font-size:26px;font-weight:500;color:${hi ? '#a78bfa' : '#efeaf6'}">${p}<small class="mut" style="font-size:16px"> /mo</small></b></div>`).join('')}</div>`, 'left:60px;top:200px;width:660px', true)}`,
  shield: `${win('security scan', log([['wp-content/uploads/x.php', true], ['Admin user added: "support2"', true], ['Core files: verified', false], ['Plugins: 2 outdated', false]]), 'left:60px;top:130px;width:660px')}
    ${card(`<p class="lab">Cleaned</p>${ok('Malware removed')}${ok('Passwords and keys reset')}${ok('Hole that let it in closed')}`, 'left:110px;top:500px;width:520px', true)}`,
  rings: `${card(`<p class="lab">Core Web Vitals · mobile</p><div class="row" style="gap:18px;margin-top:22px">${[['LCP', 0.9], ['INP', 0.93], ['CLS', 0.97]].map(([n, p]) => `<div style="text-align:center">${gauge(p, n, '#5fd38d', 190)}<p class="mono" style="color:#5fd38d;font-size:18px;margin-top:6px">Good</p></div>`).join('')}</div>`, 'left:60px;top:220px;width:680px', true)}`,
  hire: `${card(`<div class="row" style="gap:18px"><div style="width:70px;height:70px;border-radius:50%;background:linear-gradient(135deg,#a78bfa,#5b3fa8)"></div><div><p style="font:700 28px B">WordPress developer</p><p class="mut" style="font-size:18px">Freelance · senior</p></div></div><div style="margin-top:24px;display:flex;gap:10px;flex-wrap:wrap">${['Hourly', 'Fixed price', 'Monthly retainer'].map((t) => `<span class="chip">${t}</span>`).join('')}</div>`, 'left:60px;top:170px;width:680px', true)}
    ${card(`<p class="lab">Written quote</p>${ok('Scope in plain words')}${ok('Price and date agreed first')}`, 'left:160px;top:510px;width:500px')}`,
  checkout: `${win('checkout', `<div style="padding:26px;display:grid;gap:14px">${['Name', 'Email', 'Card number'].map((t) => `<div style="height:52px;border:1px solid #3a3446;border-radius:10px;padding:14px 16px;color:#6f6880;font-size:18px">${t}</div>`).join('')}<div style="height:58px;border-radius:10px;background:#a78bfa;color:#0b0a0f;display:grid;place-items:center;font:700 22px H">Place order</div></div>`, 'left:60px;top:110px;width:560px')}
    ${card(`<p class="lab" style="color:#ff8f7a">Payment failed</p><p class="mut" style="font-size:18px;margin-top:6px">Gateway did not respond</p>`, 'left:380px;top:520px;width:360px', true)}`,
  partner: `${win('your agency', '<div style="padding:30px;display:grid;place-items:center;height:240px"><p style="font:800 46px B;letter-spacing:-.04em">Your<span style="color:#a78bfa">Brand</span>.</p></div>', 'left:60px;top:140px;width:480px')}
    ${site('yourclient.com', 'tubeonai.png', 'left:300px;top:330px;width:440px')}
    <span class="pill abs" style="left:80px;top:720px">White label · your name on it</span>`,
  figma: `${win('Figma · Home', '<div style="padding:22px"><div style="height:30px;border-radius:6px;border:2px dashed #3a3446"></div><div style="margin-top:14px;height:150px;border-radius:10px;border:2px solid #a78bfa;background:rgba(167,139,250,.08);display:grid;place-items:center"><span class="mono" style="color:#a78bfa">Hero · 1440</span></div><div style="margin-top:14px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px">' + '<div style="height:80px;border-radius:8px;border:2px dashed #3a3446"></div>'.repeat(3) + '</div></div>', 'left:60px;top:130px;width:420px')}
    ${site('usetabby.com', 'tabby.png', 'left:330px;top:350px;width:420px')}`,
  weeks: `${card(`<p class="lab">One month of care</p><div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:20px">${[['Week 1', 'Updates, tested'], ['Week 2', 'Backups checked'], ['Week 3', 'Security scan'], ['Week 4', 'Report sent']].map(([w, t], i) => `<div style="padding:18px;border-radius:12px;border:1px solid ${i === 3 ? '#a78bfa' : '#2f2a3b'};background:#121019"><p class="mono" style="font-size:15px;color:${i === 3 ? '#a78bfa' : '#8f879f'}">${w}</p><p style="font:600 22px H;margin-top:8px">${t}</p></div>`).join('')}</div>`, 'left:60px;top:190px;width:680px', true)}`,
  cache: `${card(`<p class="lab">Plugins</p><div style="display:grid;gap:12px;margin-top:16px">${no('Cache plugin A')}${no('Cache plugin B')}${ok('One caching layer, set up once')}</div>`, 'left:60px;top:220px;width:640px', true)}
    <span class="pill abs" style="left:90px;top:560px">Two caches fight · one cache wins</span>`,
  // New subjects
  hackcheck: `${win('signs of a hack', `<div style="padding:24px;display:grid;gap:14px">${no('Unknown admin users')}${no('Redirects to spam sites')}${no('New files in uploads')}${no('Google "this site may be hacked"')}</div>`, 'left:60px;top:150px;width:640px')}
    ${card(`<p class="lab">Check, then clean</p><p style="font:700 32px B;margin-top:8px">Find it before your visitors do.</p>`, 'left:120px;top:520px;width:560px', true)}`,
  conflict: `${card(`<p style="font:600 24px H">Plugin A</p><p class="mono mut" style="font-size:16px;margin-top:6px">v4.2</p>`, 'left:60px;top:200px;width:270px')}
    ${card(`<p style="font:600 24px H">Plugin B</p><p class="mono mut" style="font-size:16px;margin-top:6px">v2.9</p>`, 'left:440px;top:200px;width:270px')}
    <svg class="abs" style="left:340px;top:205px" width="90" height="110" viewBox="0 0 90 110"><path d="M52 4L18 62h24l-6 44 36-62H48z" fill="#e0624a"/></svg>
    ${card(`<p class="lab">Conflict found</p>${log([['Fatal error: Cannot redeclare function', true]]).replace('padding:22px 26px', 'padding:14px 0 0')}${ok('One plugin replaced, site stable')}`, 'left:60px;top:440px;width:650px', true)}`,
  update: `${card(`<p class="lab">Updates available</p><div class="row" style="justify-content:space-between;margin-top:16px"><span style="font-size:20px">WordPress 6.x</span><span class="chip">Update</span></div><div class="row" style="justify-content:space-between;margin-top:12px"><span style="font-size:20px">12 plugins</span><span class="chip">Update all</span></div>`, 'left:60px;top:160px;width:640px')}
    ${card(`<p class="lab" style="color:#ff8f7a">Site down after update</p><div style="margin-top:14px">${ok('Restore from backup')}${ok('Update one at a time on staging')}</div>`, 'left:120px;top:440px;width:580px', true)}`,
  checklist: `${card(`<p class="lab">Maintenance checklist</p><div style="display:grid;gap:12px;margin-top:16px">${['Back up the site', 'Update core, theme, plugins', 'Test forms and checkout', 'Check uptime and security', 'Review speed on mobile', 'Write the monthly report'].map(ok).join('')}</div>`, 'left:60px;top:150px;width:660px', true)}`,
  woo: `${win('shop', `<div style="padding:24px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px">${'<div><div style="height:120px;border-radius:10px;background:#221f2b"></div><div style="margin-top:10px;height:14px;width:70%;border-radius:4px;background:#2a2633"></div></div>'.repeat(3)}</div>`, 'left:60px;top:140px;width:660px')}
    ${card(`<p class="lab">Add to cart</p><div style="margin-top:14px;height:16px;border-radius:8px;background:#2a2633"><i style="display:block;height:100%;width:28%;border-radius:8px;background:#e0624a"></i></div><p class="mono mut" style="font-size:17px;margin-top:10px">Waiting for server…</p>`, 'left:140px;top:500px;width:540px', true)}`,
  backup: `${card(`<p class="lab">Backups</p><div style="display:grid;gap:10px;margin-top:16px">${['Today 02:00', 'Yesterday 02:00', '2 days ago 02:00', '3 days ago 02:00'].map((t, i) => `<div class="row" style="justify-content:space-between;padding:12px 16px;border-radius:10px;background:${i === 1 ? 'rgba(167,139,250,.14)' : '#121019'};border:1px solid ${i === 1 ? '#a78bfa' : '#2a2633'}"><span class="mono" style="font-size:18px">${t}</span><span class="mono mut" style="font-size:15px">off-site</span></div>`).join('')}</div><div style="margin-top:20px;padding:14px;border-radius:10px;background:#a78bfa;color:#0b0a0f;text-align:center;font:700 21px H">Restore this backup</div>`, 'left:60px;top:130px;width:640px', true)}`,
  outsource: `${card(`<p class="lab">Your agency</p><p style="font:700 30px B;margin-top:8px">Design, client, deadline</p>`, 'left:60px;top:170px;width:330px')}
    ${card(`<p class="lab">Developer</p><p style="font:700 30px B;margin-top:8px">Build, test, hand over</p>`, 'left:420px;top:170px;width:320px')}
    ${card(`<p class="lab">Outsourced the right way</p>${ok('NDA and your tools')}${ok('Staging site you review')}${ok('Never in front of your client')}`, 'left:110px;top:440px;width:560px', true)}`,
  wlcare: `${card(`<div class="row" style="justify-content:space-between"><p style="font:800 30px B">Your<span style="color:#a78bfa">Brand</span>.</p><span class="mono mut" style="font-size:15px">Monthly report</span></div><div style="margin-top:18px;display:grid;gap:12px">${ok('Updates tested')}${ok('Backups off-site')}${ok('Uptime monitored')}${ok('Sent under your name')}</div>`, 'left:60px;top:170px;width:660px', true)}
    <span class="pill abs" style="left:100px;top:620px">White label care you resell</span>`,
};

const page = (w, h, post) => {
  const u = w / 1600, r = 560 * u, cx = w - r * 0.55;
  const size = (post.title.length > 56 ? 52 : 58) * u;
  return `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face { font-family: 'B'; src: url('${font('bricolage-grotesque', 'bricolage-grotesque-latin-wght-normal.woff2')}'); font-weight: 200 800; }
@font-face { font-family: 'H'; src: url('${font('hanken-grotesk', 'hanken-grotesk-latin-wght-normal.woff2')}'); font-weight: 100 900; }
@font-face { font-family: 'M'; src: url('${font('geist-mono', 'geist-mono-latin-wght-normal.woff2')}'); font-weight: 100 900; }
* { box-sizing: border-box; margin: 0; }
html, body { width: ${w}px; height: ${h}px; overflow: hidden; background: #0b0a0f; color: #efeaf6; font-family: 'H'; }
.stage { position: absolute; left: 0; top: 0; width: 1600px; height: 900px; transform: scale(${u}); transform-origin: 0 0;
  background: radial-gradient(900px 600px at 25% 30%, rgba(167,139,250,.18), transparent 60%), radial-gradient(700px 500px at 0% 100%, rgba(91,63,168,.22), transparent 60%), #0b0a0f; }
.stage::before { content: ''; position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px); background-size: 56px 56px; }
.abs { position: absolute; }
.win { position: absolute; border-radius: 16px; overflow: hidden; background: #14121a; border: 1px solid #2f2a3b; box-shadow: 0 50px 100px -30px rgba(0,0,0,.85); }
.bar { height: 40px; display: flex; align-items: center; gap: 8px; padding: 0 16px; background: #1a1722; border-bottom: 1px solid #2a2633; font: 400 15px 'M'; color: #8f879f; }
.bar i { width: 10px; height: 10px; border-radius: 50%; background: #3a3446; }
.bar span { margin-left: 12px; padding: 4px 12px; border-radius: 6px; background: #0f0d14; }
.card { position: absolute; padding: 26px 28px; border-radius: 18px; background: rgba(20,18,26,.94); border: 1px solid #2f2a3b; box-shadow: 0 50px 100px -30px rgba(0,0,0,.9); font-size: 20px; }
.card .row + .row, .card .lab + .row { margin-top: 12px; }
.glow { box-shadow: 0 0 0 1px rgba(167,139,250,.45), 0 40px 110px -20px rgba(167,139,250,.4), 0 50px 100px -30px rgba(0,0,0,.9); }
.lab { font: 500 15px 'M'; letter-spacing: .12em; text-transform: uppercase; color: #a78bfa; }
.mono { font-family: 'M'; } .mut { color: #9a93a8; }
.row { display: flex; align-items: center; gap: 12px; }
.ok, .no { flex: none; display: grid; place-items: center; width: 30px; height: 30px; border-radius: 50%; font: 700 17px 'H'; }
.ok { background: rgba(95,211,141,.14); color: #5fd38d; } .no { background: rgba(224,98,74,.14); color: #ff8f7a; }
.chip { padding: 8px 16px; border-radius: 999px; border: 1px solid #3a3446; font: 500 17px 'H'; }
.pill { display: inline-flex; padding: 12px 20px; border-radius: 999px; background: rgba(11,10,15,.9); border: 1px solid rgba(167,139,250,.45); font: 400 19px 'M'; }
.disc { position: absolute; left: ${cx - r}px; top: ${h / 2 - r}px; width: ${r * 2}px; height: ${r * 2}px; border-radius: 50%; background: #a78bfa; overflow: hidden; box-shadow: 0 0 0 ${14 * u}px rgba(167,139,250,.28), -${30 * u}px 0 ${80 * u}px rgba(0,0,0,.5); }
.disc::before { content: ''; position: absolute; inset: 0; background-image: linear-gradient(rgba(11,10,15,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(11,10,15,.07) 1px, transparent 1px); background-size: ${48 * u}px ${48 * u}px; }
.copy { position: absolute; left: ${cx - r * 0.72}px; right: ${64 * u}px; top: 50%; transform: translateY(-50%); color: #0b0a0f; }
.copy .t { font: 500 ${18 * u}px 'M'; letter-spacing: .14em; text-transform: uppercase; }
.copy .t::before { content: ''; display: inline-block; width: ${34 * u}px; height: ${2 * u}px; background: #0b0a0f; vertical-align: middle; margin-right: ${12 * u}px; }
.copy h1 { margin-top: ${22 * u}px; font: 750 ${size}px/1.04 'B'; letter-spacing: -0.035em; text-wrap: balance; }
.mark { position: absolute; left: ${36 * u}px; bottom: ${32 * u}px; padding: ${10 * u}px ${20 * u}px; border-radius: 999px; background: rgba(11,10,15,.85); border: 1px solid #2f2a3b; font: 600 ${22 * u}px 'B'; letter-spacing: -0.03em; }
.mark span { color: #a78bfa; }
</style></head><body><div class="stage">${scenes[post.art] || scenes.speed}</div><div class="disc"></div>
<div class="copy"><div class="t">${esc(post.topic)}</div><h1>${esc(post.title)}</h1></div>
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
  const post = { title: get('title'), topic: get('topic'), art: get('art') };
  if (!scenes[post.art]) throw new Error(`${slug}: art "${post.art}" is not one of: ${Object.keys(scenes).join(', ')}`);
  const tmp = join(tmpdir(), `${slug}-raw.png`);
  render(page(1600, 900, post), 1600, 900, tmp);
  await sharp(tmp).jpeg({ quality: 88, mozjpeg: true }).toFile(`src/assets/blog/${slug}.jpg`);
  render(page(1200, 630, post), 1200, 630, tmp);
  await sharp(tmp).jpeg({ quality: 86, mozjpeg: true }).toFile(`public/og-blog-${slug}.jpg`);
  rmSync(tmp, { force: true });
  console.log('image', slug);
}
