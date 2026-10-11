// Fetches each client's own logo from their live site for the "Built for" strip: `node scripts/logos.mjs`.
// For every site it reads the home page, picks the first image that looks like the logo, trims the empty edges and
// saves it 96px tall to src/assets/clients/<slug>.png. A logo is only kept if it has a transparent background, because
// the strip shows every logo as one flat colour; sites without a usable logo keep their name as text.
import { mkdirSync, writeFileSync } from 'node:fs';
import sharp from 'sharp';

const sites = {
  tabby: 'https://www.usetabby.com/', tubeonai: 'https://tubeonai.com/', moneybag: 'https://moneybag.com.bd/', wrkbase: 'https://mywrkbase.com/',
  'open-alliance-learning': 'https://openalliancelearning.com/', pixmge: 'https://pixmge.com/', 'piola-pizza': 'https://piolapizza.dk/',
  'boss-pizza-ellerslie': 'https://bosspizzaellerslie.com/', 'orine-usa': 'https://orineusa.com/', 'fitt-foody': 'https://fittfoody.com/',
  'school-supply': 'https://schoolsupply.com.bd/', 'drc-store': 'https://drc-store.com/', 'polar-bear-lighting': 'https://polarbearlighting.com/',
  'o-and-h-products': 'https://oandhproducts.store/', 'soundwave-auto-world': 'https://soundwaveautoworld.com/', fitl: 'https://fitl.com.bd/',
  tatka: 'https://tatka.com.bd/', 'wafrah-al-haditha': 'https://wafrahalhaditha.com/', 'oxford-international-school': 'https://ois.edu.bd/',
  'oasis-short-stays': 'https://oasisshortstays.co.uk/', 'phone-repairman': 'https://phonerepairman.co.uk/', 'agbad-radi': 'https://agbadradi.com/',
  'my-legacy-wall': 'https://mylegacywall.com/', igac: 'https://igac.info/', 'siam-burning': 'https://siamburning.com/',
};
const ua = { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/126 Safari/537.36' };
const get = (url) => fetch(url, { headers: ua, redirect: 'follow', signal: AbortSignal.timeout(25000) });

// Candidate logo addresses, best first: an <img> whose tag mentions "logo", then the site icon.
const candidates = (html, base) => {
  const urls = [];
  for (const [tag] of html.matchAll(/<img\b[^>]*>/gi)) {
    if (!/logo/i.test(tag)) continue;
    const src = (tag.match(/\s(?:data-src|data-lazy-src|src)="([^"]+)"/i) || [])[1];
    if (src && !src.startsWith('data:')) urls.push(src);
  }
  for (const [tag] of html.matchAll(/<link\b[^>]*rel="[^"]*(?:apple-touch-icon|icon)[^"]*"[^>]*>/gi)) {
    const href = (tag.match(/href="([^"]+)"/i) || [])[1];
    if (href) urls.push(href);
  }
  return [...new Set(urls.map((u) => { try { return new URL(u.replace(/&amp;/g, '&'), base).href; } catch { return null; } }).filter(Boolean))];
};

mkdirSync('src/assets/clients', { recursive: true });
for (const [slug, url] of Object.entries(sites)) {
  try {
    const page = await get(url);
    const list = candidates(await page.text(), page.url);
    let done = '';
    for (const src of list.slice(0, 6)) {
      try {
        const buf = Buffer.from(await (await get(src)).arrayBuffer());
        const img = sharp(buf, { density: 300 }).ensureAlpha().trim();
        const { data, info } = await img.clone().raw().toBuffer({ resolveWithObject: true });
        let clear = 0;
        for (let i = 3; i < data.length; i += 4) if (data[i] < 40) clear++;
        const share = clear / (info.width * info.height);
        if (share < 0.15 || info.width < 40) continue; // opaque box or a tiny icon: not usable as a flat mark
        writeFileSync(`src/assets/clients/${slug}.png`, await img.resize({ height: 96 }).png().toBuffer());
        done = `${src} (${info.width}x${info.height}, ${Math.round(share * 100)}% clear)`;
        break;
      } catch {}
    }
    console.log(done ? 'ok  ' : 'none', slug, done || `${list.length} candidates, none usable`);
  } catch (e) {
    console.log('fail', slug, String(e).slice(0, 80));
  }
}
