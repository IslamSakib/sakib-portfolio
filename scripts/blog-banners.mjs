// Banner images for the full-stack blog posts (Oct 2026): large headline on the left, a real screenshot or a real number
// on the right. Screenshots come from seo/_data/mayabee-shots; numbers are the dated, sourced ones used in each post.
//   src/assets/blog/<slug>.jpg      1600x840 (the post cover)
//   public/og-blog-<slug>.jpg       1200x630 (share image)
// Run `node scripts/blog-banners.mjs`.
import sharp from 'sharp';

const S = 'seo/_data/mayabee-shots/';
const W = 1600, H = 840, font = 'Arial, Helvetica, sans-serif';
const esc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;');

const bg = () => Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><defs>
  <radialGradient id="a" cx="78%" cy="30%" r="60%"><stop offset="0" stop-color="#a78bfa" stop-opacity=".24"/><stop offset="1" stop-color="#a78bfa" stop-opacity="0"/></radialGradient>
  <radialGradient id="b" cx="5%" cy="100%" r="55%"><stop offset="0" stop-color="#5b3fa8" stop-opacity=".3"/><stop offset="1" stop-color="#5b3fa8" stop-opacity="0"/></radialGradient>
  <pattern id="g" width="64" height="64" patternUnits="userSpaceOnUse"><path d="M64 0H0V64" fill="none" stroke="#fff" stroke-opacity=".04"/></pattern></defs>
  <rect width="${W}" height="${H}" fill="#0b0a0f"/><rect width="${W}" height="${H}" fill="url(#a)"/><rect width="${W}" height="${H}" fill="url(#b)"/><rect width="${W}" height="${H}" fill="url(#g)"/></svg>`);

const text = (eyebrow, lines) => ({
  input: Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="860" height="${H}">
    <text x="80" y="150" font-family="${font}" font-size="30" fill="#a78bfa" letter-spacing="4">${esc(eyebrow.toUpperCase())}</text>
    ${lines.map((l, i) => `<text x="80" y="${290 + i * 120}" font-family="${font}" font-size="96" font-weight="700" fill="#f2efe6" letter-spacing="-3">${esc(l)}</text>`).join('')}
    <text x="80" y="${H - 70}" font-family="${font}" font-size="30" fill="#9a93a8">Sakib Islam · sakib.mywrkbase.com</text></svg>`), left: 0, top: 0,
});

const win = async (file, url, width, region) => {
  const r = region ?? { left: 0, top: 0, width: 1552, height: 730 };
  const h = Math.round((width * r.height) / r.width), bar = 40, rad = 16, th = h + bar;
  const body = await sharp(S + file).extract(r).resize(width, h).png().toBuffer();
  const frame = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${th}"><rect width="${width}" height="${th}" rx="${rad}" fill="#14121a" stroke="#2f2a3b" stroke-width="2"/><rect x="1" y="1" width="${width - 2}" height="${bar}" rx="${rad}" fill="#1a1722"/><rect x="1" y="${bar - rad}" width="${width - 2}" height="${rad}" fill="#1a1722"/>${[22, 40, 58].map((x) => `<circle cx="${x}" cy="20" r="5.5" fill="#3a3446"/>`).join('')}<rect x="80" y="9" width="${Math.min(340, width - 120)}" height="22" rx="6" fill="#0f0d14"/><text x="94" y="25" font-family="${font}" font-size="13" fill="#8f879f">${url}</text></svg>`);
  const framed = await sharp(frame).composite([{ input: body, left: 0, top: bar }]).png().toBuffer();
  const mask = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${th}"><rect width="${width}" height="${th}" rx="${rad}"/></svg>`);
  return { input: await sharp(framed).composite([{ input: mask, blend: 'dest-in' }]).png().toBuffer(), w: width, h: th };
};
const shadow = (w, h, x, y) => ({ input: Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w + 160}" height="${h + 160}"><defs><filter id="s"><feGaussianBlur stdDeviation="26"/></filter></defs><rect x="80" y="100" width="${w}" height="${h}" rx="18" fill="#000" fill-opacity=".7" filter="url(#s)"/></svg>`), left: x - 80, top: y - 80 });
const card = (w, h, x, y, body) => ({ input: Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><rect width="${w}" height="${h}" rx="24" fill="#14121a" fill-opacity=".96" stroke="#2f2a3b" stroke-width="2"/>${body}</svg>`), left: x, top: y });
const place = (w, x, y) => [];

const store = await win('store-home.jpg', 'mayabeebd.com', 760, { left: 234, top: 0, width: 1100, height: 688 });
const orders = await win('admin-orders.jpg', 'mayabeebd.com/admin', 700);
const dash = await win('admin-home.jpg', 'mayabeebd.com/admin', 700);

const posts = [
  { slug: 'what-is-a-full-stack-developer', eyebrow: 'Developer guide', lines: ['What is a full', 'stack developer?'],
    layers: [shadow(store.w, store.h, 860, 90), { input: store.input, left: 860, top: 90 }, shadow(orders.w, orders.h, 780, 480), { input: orders.input, left: 780, top: 480 }] },
  { slug: 'custom-website-vs-wordpress', eyebrow: 'How to choose', lines: ['Custom website', 'vs WordPress'],
    layers: [card(560, 330, 940, 110, `<text x="40" y="150" font-family="${font}" font-size="140" font-weight="700" fill="#a78bfa">39.6%</text><text x="40" y="215" font-family="${font}" font-size="34" fill="#efeaf6">of all websites run</text><text x="40" y="262" font-family="${font}" font-size="34" fill="#efeaf6">WordPress</text><text x="40" y="304" font-family="${font}" font-size="24" fill="#9a93a8">W3Techs, 22 Oct 2026</text>`), shadow(orders.w, orders.h, 800, 470), { input: orders.input, left: 800, top: 470 }] },
  { slug: 'custom-website-cost', eyebrow: 'Pricing guide', lines: ['Custom website', 'cost: what sets', 'the price'],
    layers: [card(640, 640, 900, 100, ['Design', 'Page types', 'Accounts and roles', 'Payments', 'Integrations', 'Admin dashboard'].map((t, i) => `<text x="44" y="${92 + i * 96}" font-family="${font}" font-size="30" fill="#a78bfa" font-weight="700">0${i + 1}</text><text x="120" y="${92 + i * 96}" font-family="${font}" font-size="44" fill="#efeaf6" font-weight="700">${t}</text>`).join(''))] },
  { slug: 'web-application-vs-website', eyebrow: 'Explained', lines: ['Web application', 'vs website'],
    layers: [shadow(store.w, store.h, 840, 70), { input: store.input, left: 840, top: 70 }, shadow(dash.w, dash.h, 780, 440), { input: dash.input, left: 780, top: 440 },
      card(250, 64, 840, 24, `<text x="125" y="42" text-anchor="middle" font-family="${font}" font-size="28" fill="#efeaf6">Website</text>`), card(360, 64, 1180, 396, `<text x="180" y="42" text-anchor="middle" font-family="${font}" font-size="28" fill="#efeaf6">Web application</text>`)] },
  { slug: 'custom-ecommerce-website-vs-shopify', eyebrow: 'Store guide', lines: ['Custom ecommerce', 'website vs Shopify'],
    layers: [card(560, 330, 940, 90, `<text x="40" y="150" font-family="${font}" font-size="150" font-weight="700" fill="#a78bfa">100</text><text x="40" y="215" font-family="${font}" font-size="32" fill="#efeaf6">PageSpeed Performance,</text><text x="40" y="258" font-family="${font}" font-size="32" fill="#efeaf6">mobile, custom shop</text><text x="40" y="302" font-family="${font}" font-size="24" fill="#9a93a8">Google PageSpeed Insights, 23 Oct 2026</text>`), shadow(orders.w, orders.h, 800, 470), { input: orders.input, left: 800, top: 470 }] },
];

for (const p of posts) {
  const buf = await sharp(bg()).composite([text(p.eyebrow, p.lines), ...p.layers]).jpeg({ quality: 88 }).toBuffer();
  await sharp(buf).toFile(`src/assets/blog/${p.slug}.jpg`);
  await sharp(buf).resize(1200, 630).jpeg({ quality: 88 }).toFile(`public/og-blog-${p.slug}.jpg`);
}
console.log('blog banners written');
