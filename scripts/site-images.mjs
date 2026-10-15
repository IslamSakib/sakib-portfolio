// Original site visuals, made for this site instead of stock photos. Each is a dark, on-brand scene built from Sakib's
// real client screenshots (src/assets/work) plus interface details that show the service: a speed report, a care
// report, an error log, a checkout. Every number shown is a real, published result from the case studies.
// Rendered with headless Chrome so the site's own fonts are used.
//   src/assets/visuals/<name>.jpg   1600x1067 (3:2)
// Run `npm run site-images` after changing a scene. `node scripts/site-images.mjs speed care` renders only those.
import { writeFileSync, existsSync, rmSync, mkdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import { tmpdir } from 'node:os';
import sharp from 'sharp';

const chrome = ['C:/Program Files/Google/Chrome/Application/chrome.exe', '/usr/bin/google-chrome', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'].find(existsSync);
if (!chrome) throw new Error('Chrome not found');
const font = (pkg, file) => pathToFileURL(resolve('node_modules/@fontsource-variable', pkg, 'files', file)).href;
const shot = (f) => pathToFileURL(resolve('src/assets/work', f)).href;
const W = 1600, H = 1067;

const css = `
@font-face { font-family: 'B'; src: url('${font('bricolage-grotesque', 'bricolage-grotesque-latin-wght-normal.woff2')}'); font-weight: 200 800; }
@font-face { font-family: 'H'; src: url('${font('hanken-grotesk', 'hanken-grotesk-latin-wght-normal.woff2')}'); font-weight: 100 900; }
@font-face { font-family: 'M'; src: url('${font('geist-mono', 'geist-mono-latin-wght-normal.woff2')}'); font-weight: 100 900; }
* { box-sizing: border-box; margin: 0; }
html, body { width: ${W}px; height: ${H}px; overflow: hidden; background: #0b0a0f; color: #efeaf6; font-family: 'H'; }
.scene { position: absolute; inset: 0; overflow: hidden; background: radial-gradient(1100px 700px at 70% 30%, rgba(167,139,250,.20), transparent 60%), radial-gradient(900px 600px at 10% 100%, rgba(91,63,168,.22), transparent 60%), #0b0a0f; }
.scene::before { content: ''; position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px); background-size: 64px 64px; mask-image: radial-gradient(circle at 60% 40%, #000, transparent 75%); }
.abs { position: absolute; }
.win { position: absolute; border-radius: 18px; overflow: hidden; background: #14121a; border: 1px solid #2f2a3b; box-shadow: 0 60px 120px -30px rgba(0,0,0,.85), 0 0 0 1px rgba(0,0,0,.5); }
.bar { height: 44px; display: flex; align-items: center; gap: 9px; padding: 0 18px; background: #1a1722; border-bottom: 1px solid #2a2633; font: 400 15px 'M'; color: #8f879f; }
.bar i { width: 11px; height: 11px; border-radius: 50%; background: #3a3446; }
.bar span { margin-left: 14px; padding: 5px 14px; border-radius: 7px; background: #0f0d14; }
.win img { display: block; width: 100%; }
.card { position: absolute; padding: 26px 28px; border-radius: 20px; background: rgba(20,18,26,.92); border: 1px solid #2f2a3b; backdrop-filter: blur(12px); box-shadow: 0 50px 100px -30px rgba(0,0,0,.9); }
.lab { font: 500 15px 'M'; letter-spacing: .12em; text-transform: uppercase; color: #a78bfa; }
.big { font: 700 64px/1 'B'; letter-spacing: -.04em; }
.mono { font-family: 'M'; }
.mut { color: #9a93a8; }
.row { display: flex; align-items: center; gap: 14px; }
.ok { display: grid; place-items: center; width: 30px; height: 30px; border-radius: 50%; background: rgba(95,211,141,.14); color: #5fd38d; font: 700 17px 'H'; }
.pill { display: inline-flex; align-items: center; gap: 10px; padding: 12px 18px; border-radius: 999px; background: rgba(11,10,15,.9); border: 1px solid rgba(167,139,250,.45); font: 400 18px 'M'; }
.glow { box-shadow: 0 0 0 1px rgba(167,139,250,.5), 0 40px 120px -20px rgba(167,139,250,.45), 0 60px 120px -30px rgba(0,0,0,.9); }
`;

const browser = (url, img, style) => `<div class="win" style="${style}"><div class="bar"><i></i><i></i><i></i><span>${url}</span></div><img src="${shot(img)}"></div>`;
const gauge = (pct, label) => {
  const r = 78, c = 2 * Math.PI * r;
  return `<svg width="200" height="200" viewBox="0 0 200 200"><circle cx="100" cy="100" r="${r}" fill="none" stroke="#2a2633" stroke-width="16"/><circle cx="100" cy="100" r="${r}" fill="none" stroke="#5fd38d" stroke-width="16" stroke-linecap="round" stroke-dasharray="${(c * pct).toFixed(1)} ${c.toFixed(1)}" transform="rotate(-90 100 100)"/><text x="100" y="114" text-anchor="middle" font-family="B" font-weight="700" font-size="50" fill="#efeaf6">${label}</text></svg>`;
};
const bars = (rows) => rows.map(([name, v, w, col]) => `<div style="display:grid;grid-template-columns:110px 1fr 90px;gap:16px;align-items:center;margin-top:16px"><span class="mono mut" style="font-size:17px">${name}</span><span style="height:14px;border-radius:7px;background:#2a2633;overflow:hidden"><i style="display:block;height:100%;width:${w}%;background:${col};border-radius:7px"></i></span><b class="mono" style="font-size:20px;font-weight:500;text-align:right;color:${col}">${v}</b></div>`).join('');

// A Figma-style editor: layers on the left, the real design on the canvas with one frame selected and measured.
const figma = (img, file, style, sel = 'Hero') => `<div class="win" style="${style};background:#1e1c24">
  <div class="bar" style="justify-content:space-between"><span style="margin:0;background:none;padding:0;color:#efeaf6;font-family:H;font-weight:600;font-size:16px">${file}</span><span style="margin:0;padding:4px 12px;border-radius:6px;background:#a78bfa;color:#0b0a0f;font-family:H;font-weight:700;font-size:14px">Share</span></div>
  <div style="display:grid;grid-template-columns:150px 1fr;">
    <div style="padding:16px 14px;border-right:1px solid #2a2633;font:400 14px/2.1 M;color:#8f879f">
      <p style="color:#efeaf6">▾ Home</p><p>&nbsp; Nav</p><p style="color:#0b0a0f;background:#a78bfa;border-radius:5px;padding-left:8px;margin-left:6px">${sel}</p><p>&nbsp; Features</p><p>&nbsp; Pricing</p><p>&nbsp; Footer</p>
    </div>
    <div style="position:relative;padding:26px 24px;background:#16141c;overflow:hidden">
      <p style="font:400 13px M;color:#8f879f;margin-bottom:8px">Desktop · 1440</p>
      <div style="position:relative;border-radius:4px;overflow:hidden;box-shadow:0 20px 40px rgba(0,0,0,.5)"><img src="${shot(img)}" style="display:block;width:100%">
        <div style="position:absolute;left:8%;right:8%;top:14%;height:46%;border:2px solid #a78bfa;background:rgba(167,139,250,.08)">
          ${['left:-6px;top:-6px', 'right:-6px;top:-6px', 'left:-6px;bottom:-6px', 'right:-6px;bottom:-6px'].map((p) => `<i style="position:absolute;${p};width:10px;height:10px;background:#fff;border:2px solid #a78bfa"></i>`).join('')}
          <span style="position:absolute;left:50%;bottom:-34px;transform:translateX(-50%);padding:3px 10px;border-radius:5px;background:#a78bfa;color:#0b0a0f;font:600 14px M">1240 × 560</span>
        </div>
      </div>
    </div>
  </div>
</div>`;

const scenes = {
  // Speed: TubeOnAI in a browser, a Core Web Vitals gauge and the measured before/after.
  speed: `
    ${browser('tubeonai.com', 'tubeonai.png', 'left:90px;top:150px;width:980px;transform:perspective(2400px) rotateY(10deg) rotateX(3deg)')}
    <div class="card glow" style="left:1010px;top:110px;width:480px">
      <p class="lab">Core Web Vitals</p>
      <div class="row" style="margin-top:18px;gap:26px">${gauge(0.92, '90+')}<div><p style="font:600 26px 'H'">Passed</p><p class="mut" style="font-size:18px;margin-top:6px">Tabby, at launch</p></div></div>
    </div>
    <div class="card" style="left:1010px;top:520px;width:480px">
      <p class="lab">TubeOnAI load time</p>
      ${bars([['Before', '5.0 s', 100, '#e0624a'], ['After', '1.5 s', 30, '#5fd38d']])}
    </div>
    <span class="pill abs" style="left:140px;top:930px"><b style="color:#5fd38d;font-weight:500">●</b> Server load down 60%</span>`,

  // Care plan: the monthly report a client receives, over the Tabby site.
  care: `
    ${browser('usetabby.com', 'tabby.png', 'left:70px;top:120px;width:900px;opacity:.9;transform:perspective(2400px) rotateY(12deg)')}
    <div class="card glow" style="left:760px;top:150px;width:760px;padding:38px 42px">
      <div class="row" style="justify-content:space-between"><p class="lab">Monthly care report</p><span class="mono mut" style="font-size:16px">usetabby.com</span></div>
      <p style="font:700 44px/1.1 'B';letter-spacing:-.03em;margin-top:18px">Everything checked this month.</p>
      ${[['WordPress, theme and plugin updates', 'Tested on staging first'], ['Backups', 'Daily, stored off the server'], ['Uptime and security monitoring', 'Watched every day'], ['Changes and fixes', 'Done from your list'], ['Report', 'Written in plain English']].map(([a, b]) => `<div class="row" style="margin-top:22px;padding-top:22px;border-top:1px solid #2a2633"><span class="ok">✓</span><div><p style="font:600 22px 'H'">${a}</p><p class="mut" style="font-size:17px;margin-top:3px">${b}</p></div></div>`).join('')}
    </div>`,

  // WordPress builds: Figma-style frames turning into the live Tabby site, with a paid checkout.
  // WordPress builds: the design in Figma becomes the live Tabby site, with a paid checkout.
  build: `
    ${figma('tabby.png', 'Tabby · Website', 'left:70px;top:230px;width:780px')}
    <svg class="abs" style="left:858px;top:450px" width="100" height="40" viewBox="0 0 100 40"><path d="M4 20h84M76 8l14 12-14 12" fill="none" stroke="#a78bfa" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>
    ${browser('usetabby.com', 'tabby.png', 'left:970px;top:190px;width:570px')}
    <div class="card glow" style="left:1000px;top:620px;width:510px;padding:30px 34px">
      <p class="lab">WooCommerce checkout</p>
      <div class="row" style="justify-content:space-between;margin-top:20px"><span style="font-size:22px">Card payment</span><span class="mono mut" style="font-size:18px">Secure</span></div>
      <div style="margin-top:22px;padding:18px;border-radius:12px;background:#a78bfa;color:#0b0a0f;text-align:center;font:700 23px 'H'">Paid ✓</div>
    </div>
    <span class="pill abs" style="left:90px;top:900px;font-size:20px">Figma → WordPress → checkout</span>`,

  // White label: the agency's Figma file becomes the client's live site under the agency's brand.
  agency: `
    ${figma('tubeonai.png', 'Your agency · Client site', 'left:70px;top:230px;width:780px')}
    <svg class="abs" style="left:858px;top:450px" width="100" height="40" viewBox="0 0 100 40"><path d="M4 20h84M76 8l14 12-14 12" fill="none" stroke="#a78bfa" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>
    ${browser('yourclient.com', 'tubeonai.png', 'left:970px;top:190px;width:570px')}
    <div class="card glow" style="left:970px;top:620px;width:570px;padding:28px 32px">
      <p class="lab">White-label handover</p>
      ${['Built on a private staging site', 'Reviewed by you on phone and desktop', 'Launched under your brand'].map((a) => `<div class="row" style="margin-top:18px"><span class="ok">✓</span><span style="font:600 21px 'H'">${a}</span></div>`).join('')}
    </div>
    <span class="pill abs" style="left:90px;top:900px;font-size:20px">Your name on it · never mine</span>`,

  // Fixes: the site down, the cause found in the log, then fixed.
  fixes: `
    ${browser('tubeonai.com', 'tubeonai.png', 'left:900px;top:130px;width:640px;opacity:.95')}
    <span class="abs pill" style="left:930px;top:510px;font-size:20px;border-color:rgba(95,211,141,.6)"><b style="color:#5fd38d;font-weight:500">●</b> 200 OK · back up</span>
    <div class="win" style="left:60px;top:150px;width:900px">
      <div class="bar"><i></i><i></i><i></i><span>error_log</span></div>
      <div class="mono" style="padding:30px 34px;font-size:22px;line-height:2.05">
        <p class="mut">[14:02:11] PHP Notice: Undefined index</p>
        <p class="mut">[14:02:11] WP Cron: scheduled event ran</p>
        <p style="color:#ff8f7a;background:rgba(224,98,74,.14);margin:0 -34px;padding:0 34px;border-left:5px solid #e0624a">[14:02:12] Fatal error: Cannot redeclare cache_flush()</p>
        <p class="mut">[14:02:12] Two cache plugins active</p>
        <p style="color:#ff8f7a">[14:02:13] 500 Internal Server Error</p>
      </div>
    </div>
    <div class="card glow" style="left:560px;top:620px;width:900px;padding:38px 44px">
      <p class="lab">Fixed at the cause</p>
      <p style="font:700 50px/1.1 'B';letter-spacing:-.03em;margin-top:16px">One caching layer, set up once.</p>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px 28px;margin-top:26px">
        ${['Duplicate cache plugin removed', 'Leftover cache files cleared', 'Cause written down for next time', 'Tested on staging first'].map((a) => `<div class="row"><span class="ok">✓</span><span style="font-size:21px">${a}</span></div>`).join('')}
      </div>
    </div>`,

  'step-find': `
    <div class="win" style="left:150px;top:170px;width:1300px"><div class="bar"><i></i><i></i><i></i><span>What changed this week</span></div>
      <div class="mono" style="padding:40px 46px;font-size:26px;line-height:2.1">
        <p class="mut">Mon  WordPress core updated to 6.x</p>
        <p class="mut">Tue  New plugin installed: page speed booster</p>
        <p style="color:#ff8f7a">Wed  Site starts timing out on mobile</p>
        <p class="mut">Thu  Host enabled its own cache layer</p>
      </div>
    </div>
    <div class="abs" style="left:1050px;top:470px;width:250px;height:250px;border-radius:50%;border:8px solid #a78bfa;box-shadow:0 0 80px rgba(167,139,250,.5), inset 0 0 60px rgba(167,139,250,.2)"></div>
    <div class="abs" style="left:1265px;top:690px;width:150px;height:22px;border-radius:11px;background:#a78bfa;transform:rotate(45deg);transform-origin:0 50%"></div>`,

  // Step 2: one clean change where the problem lives.
  'step-fix': `
    <div class="win" style="left:150px;top:170px;width:1300px"><div class="bar"><i></i><i></i><i></i><span>The fix</span></div>
      <div class="mono" style="padding:40px 0;font-size:26px;line-height:2.1">
        <p style="padding:0 46px;background:rgba(224,98,74,.12);color:#ff8f7a">−  Plugin: page speed booster (second cache)</p>
        <p style="padding:0 46px;background:rgba(224,98,74,.12);color:#ff8f7a">−  Leftover cache files in wp-content</p>
        <p style="padding:0 46px;background:rgba(95,211,141,.12);color:#7fe0a5">+  One caching layer, configured once</p>
        <p style="padding:0 46px" class="mut">   Tested on staging before going live</p>
      </div>
    </div>`,

  // Step 3: before and after, measured.
  'step-measure': `
    <div class="card glow" style="left:200px;top:200px;width:1200px;padding:56px 64px">
      <p class="lab" style="font-size:20px">TubeOnAI · load time</p>
      <div style="margin-top:30px">${bars([['Before', '5.0 s', 100, '#e0624a'], ['After', '1.5 s', 30, '#5fd38d']]).replace(/font-size:17px/g, 'font-size:26px').replace(/font-size:20px/g, 'font-size:30px').replace(/height:14px/g, 'height:26px').replace(/110px 1fr 90px/g, '170px 1fr 130px')}</div>
      <p class="mut" style="font-size:24px;margin-top:40px">Measured on mobile, before and after the fix.</p>
    </div>`,

  // Step 4: handover notes the client keeps.
  'step-hand': `
    <div class="card glow" style="left:280px;top:150px;width:1040px;padding:56px 64px">
      <p class="lab" style="font-size:20px">Handover notes</p>
      <p style="font:700 54px/1.1 'B';letter-spacing:-.03em;margin-top:20px">What was done, and why.</p>
      ${[['What was wrong', 'Two cache plugins fighting each other'], ['What I changed', 'Removed one, configured the other once'], ['What to avoid', 'Adding another speed plugin on top'], ['Logins', 'Yours. You can remove my account any time']].map(([a, b]) => `<div style="display:grid;grid-template-columns:300px 1fr;gap:24px;margin-top:24px;padding-top:24px;border-top:1px solid #2a2633"><span class="mono mut" style="font-size:22px">${a}</span><span style="font-size:26px">${b}</span></div>`).join('')}
    </div>`,
};

const only = process.argv.slice(2);
mkdirSync('src/assets/visuals', { recursive: true });
for (const [name, body] of Object.entries(scenes)) {
  if (only.length && !only.includes(name)) continue;
  const file = join(tmpdir(), `site-img-${process.pid}.html`), raw = join(tmpdir(), `site-img-${process.pid}.png`);
  writeFileSync(file, `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body><div class="scene">${body}</div></body></html>`);
  const r = spawnSync(chrome, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--allow-file-access-from-files', `--window-size=${W},${H}`, '--force-device-scale-factor=1', '--virtual-time-budget=4000', `--screenshot=${raw}`, pathToFileURL(file).href], { stdio: 'ignore' });
  if (r.status !== 0 || !existsSync(raw)) throw new Error('render failed: ' + name);
  await sharp(raw).jpeg({ quality: 90, mozjpeg: true }).toFile(`src/assets/visuals/${name}.jpg`);
  rmSync(file, { force: true }); rmSync(raw, { force: true });
  console.log('visual', name);
}
