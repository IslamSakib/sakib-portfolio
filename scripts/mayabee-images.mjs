// Images for the Mayabee case study, made from real screenshots in seo/_data/mayabee-shots (public storefront on
// mayabeebd.com and the admin dashboard run locally with the project's seed data, so no customer details appear).
//   src/assets/work/mayabee.png            1440x900 storefront home (case study hero, home page, OG image)
//   src/assets/work/extra/mayabee-N.jpg    gallery screens
//   src/assets/visuals/mayabee.jpg         storefront + dashboard scene (custom web development service picture)
//   src/assets/visuals/step-*.jpg          the four build steps shown on service and place pages
// Run `node scripts/mayabee-images.mjs` after replacing a screenshot.
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const S = 'seo/_data/mayabee-shots/';
const font = 'Arial, Helvetica, sans-serif';
mkdirSync('src/assets/work/extra', { recursive: true });

// The raw captures are 1568x744 with a scrollbar on the right and a toolbar at the bottom.
const crop = (f) => sharp(S + f).extract({ left: 0, top: 0, width: 1552, height: 730 });
for (const f of ['store-shop', 'store-product', 'store-bn', 'admin-home', 'admin-orders', 'admin-delivery', 'admin-products', 'admin-reports'].entries()) {
  await crop(f[1] + '.jpg').jpeg({ quality: 86 }).toFile(`src/assets/work/extra/mayabee-${f[0] + 1}.jpg`);
}
await sharp(S + 'store-home.jpg').extract({ left: 234, top: 0, width: 1100, height: 688 }).resize(1440, 900).png({ compressionLevel: 9 }).toFile('src/assets/work/mayabee.png');

// Scene helpers: a browser window (rounded, with a URL bar) around a screenshot.
const W = 1600, H = 1067;
const bg = () => Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><defs>
  <radialGradient id="a" cx="72%" cy="28%" r="60%"><stop offset="0" stop-color="#a78bfa" stop-opacity=".22"/><stop offset="1" stop-color="#a78bfa" stop-opacity="0"/></radialGradient>
  <radialGradient id="b" cx="8%" cy="100%" r="55%"><stop offset="0" stop-color="#5b3fa8" stop-opacity=".25"/><stop offset="1" stop-color="#5b3fa8" stop-opacity="0"/></radialGradient>
  <pattern id="g" width="64" height="64" patternUnits="userSpaceOnUse"><path d="M64 0H0V64" fill="none" stroke="#fff" stroke-opacity=".035"/></pattern></defs>
  <rect width="${W}" height="${H}" fill="#0b0a0f"/><rect width="${W}" height="${H}" fill="url(#a)"/><rect width="${W}" height="${H}" fill="url(#b)"/><rect width="${W}" height="${H}" fill="url(#g)"/></svg>`);
const win = async (file, url, width, region) => {
  const h = Math.round((width * (region?.height ?? 730)) / (region?.width ?? 1552));
  let img = sharp(S + file);
  img = img.extract(region ?? { left: 0, top: 0, width: 1552, height: 730 }).resize(width, h);
  const body = await img.png().toBuffer();
  const bar = 40, r = 16, tw = width, th = h + bar;
  const frame = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${tw}" height="${th}"><rect width="${tw}" height="${th}" rx="${r}" fill="#14121a" stroke="#2f2a3b" stroke-width="2"/>
    <rect x="1" y="1" width="${tw - 2}" height="${bar}" rx="${r}" fill="#1a1722"/><rect x="1" y="${bar - r}" width="${tw - 2}" height="${r}" fill="#1a1722"/>
    ${[22, 40, 58].map((x) => `<circle cx="${x}" cy="${bar / 2}" r="5.5" fill="#3a3446"/>`).join('')}
    <rect x="80" y="9" width="${Math.min(360, tw - 120)}" height="22" rx="6" fill="#0f0d14"/><text x="94" y="25" font-family="${font}" font-size="13" fill="#8f879f">${url}</text></svg>`);
  const mask = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${tw}" height="${th}"><rect width="${tw}" height="${th}" rx="${r}"/></svg>`);
  const framed = await sharp(frame).composite([{ input: body, left: 0, top: bar }]).png().toBuffer();
  const out = await sharp(framed).composite([{ input: mask, blend: 'dest-in' }]).png().toBuffer();
  return { input: out, w: tw, h: th };
};
const shadow = (w, h, x, y) => ({ input: Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w + 160}" height="${h + 160}"><defs><filter id="s"><feGaussianBlur stdDeviation="28"/></filter></defs><rect x="80" y="100" width="${w}" height="${h}" rx="18" fill="#000" fill-opacity=".7" filter="url(#s)"/></svg>`), left: x - 80, top: y - 80 });
const label = (text, x, y, w = 420) => ({ input: Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="64"><rect width="${w}" height="64" rx="32" fill="#0b0a0f" fill-opacity=".92" stroke="#a78bfa" stroke-opacity=".5"/><text x="${w / 2}" y="41" text-anchor="middle" font-family="${font}" font-size="24" fill="#efeaf6">${text}</text></svg>`), left: x, top: y });
const card = (lines, x, y, w, h) => ({ input: Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><rect width="${w}" height="${h}" rx="20" fill="#14121a" fill-opacity=".95" stroke="#2f2a3b" stroke-width="2"/>${lines.map((l, i) => l.big ? `<text x="30" y="${l.y}" font-family="${font}" font-size="${l.size}" font-weight="700" fill="${l.fill || '#efeaf6'}">${l.t}</text>` : `<text x="${l.x ?? 30}" y="${l.y}" font-family="${font}" font-size="${l.size || 22}" fill="${l.fill || '#9a93a8'}" letter-spacing="${l.ls || 0}">${l.t}</text>`).join('')}</svg>`), left: x, top: y });
const save = (layers, file) => sharp(bg()).composite(layers).jpeg({ quality: 88 }).toFile(file);

// Service picture: the storefront with its dashboard in front.
{
  const a = await win('store-home.jpg', 'mayabeebd.com', 1000, { left: 234, top: 0, width: 1100, height: 688 });
  const b = await win('admin-orders.jpg', 'mayabeebd.com/admin', 860);
  const ax = 70, ay = 110, bx = 650, by = 480;
  await save([shadow(a.w, a.h, ax, ay), { input: a.input, left: ax, top: ay }, shadow(b.w, b.h, bx, by), { input: b.input, left: bx, top: by },
    label('Storefront + admin dashboard', 70, 36, 480)], 'src/assets/visuals/mayabee.jpg');
}

// Step pictures. Each shows something real from the project, or a plain checklist where no artefact exists.
{
  // 1. Study your competitors: a checklist, no invented findings.
  await save([card([
    { t: 'COMPETITOR REVIEW', y: 60, size: 20, fill: '#a78bfa', ls: 3 },
    { t: 'What I compare before drawing a screen', y: 120, size: 38, big: true },
    ...['Layout and page order', 'Product pages and checkout', 'Delivery and payment options', 'Language and mobile experience', 'What nobody is doing well'].flatMap((t, i) => [{ t: '✓', y: 210 + i * 70, size: 28, fill: '#5fd38d', big: true }, { t, x: 80, y: 210 + i * 70, size: 28, fill: '#efeaf6' }]),
  ], 220, 220, 1160, 600)], 'src/assets/visuals/step-research.jpg');
  // 2. Design: the storefront product page and the dashboard home, side by side.
  const a = await win('store-product.jpg', 'Storefront', 700), b = await win('admin-home.jpg', 'Dashboard', 700);
  await save([shadow(a.w, a.h, 60, 240), { input: a.input, left: 60, top: 240 }, shadow(b.w, b.h, 840, 400), { input: b.input, left: 840, top: 400 }, label('UI/UX for both sides', 60, 90, 420)], 'src/assets/visuals/step-design.jpg');
  // 3. Build: orders and delivery screens, the working dashboard.
  const c = await win('admin-orders.jpg', 'Orders', 760), d = await win('admin-delivery.jpg', 'Delivery and cash', 760);
  await save([shadow(c.w, c.h, 50, 130), { input: c.input, left: 50, top: 130 }, shadow(d.w, d.h, 790, 440), { input: d.input, left: 790, top: 440 }, label('Frontend, backend, dashboard', 50, 40, 520)], 'src/assets/visuals/step-build.jpg');
  // 4. Launch: the live speed check from 23 Oct 2026 (seo/_data/mayabee-vitals-20261023.txt), throttled phone.
  await save([card([
    { t: 'CORE WEB VITALS, MAYABEEBD.COM HOME', y: 60, size: 20, fill: '#a78bfa', ls: 3 },
    { t: 'Checked on a throttled phone, 23 Oct 2026', y: 112, size: 28, fill: '#9a93a8' },
    { t: '0.8 s', y: 270, size: 120, big: true }, { t: 'largest content painted (LCP)', y: 320, size: 26 },
    { t: '0.000', y: 470, size: 120, big: true }, { t: 'layout shift (CLS)', y: 520, size: 26 },
    { t: '253 KB', y: 670, size: 120, big: true, fill: '#a78bfa' }, { t: 'page weight, 29 requests', y: 720, size: 26 },
  ], 420, 150, 760, 780)], 'src/assets/visuals/step-launch.jpg');
}
console.log('mayabee images written');
