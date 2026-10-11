// Prepares client logos for the "Built for" strip: `node scripts/logos.mjs <folder of raw logo files>`.
// The raw files are each client's own logo, saved from their live site and named <slug>.<anything>.
// The strip sits on the site's dark background, so every logo gets a dark-theme version, the way brands ship one:
// the background is removed, black and grey lettering becomes off-white, dark brand colours are lifted until they
// read on dark, and colours that already work are left alone. Saved 160px tall at most (four times the height it is shown at) to src/assets/clients/<slug>.png.
import { mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import sharp from 'sharp';

const raw = process.argv[2];
mkdirSync('src/assets/clients', { recursive: true });

for (const file of readdirSync(raw)) {
  const slug = file.split('.')[0];
  try {
    const { data, info } = await sharp(`${raw}/${file}`, { density: 300 }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    const px = info.width * info.height;
    let clear = 0;
    for (let i = 3; i < data.length; i += 4) if (data[i] < 40) clear++;
    // A logo saved on a solid background: make that colour (taken from the top-left corner) transparent.
    if (clear / px < 0.05) {
      const [r, g, b] = data;
      for (let i = 0; i < data.length; i += 4) if (Math.abs(data[i] - r) + Math.abs(data[i + 1] - g) + Math.abs(data[i + 2] - b) < 70) data[i + 3] = 0;
    }
    for (let i = 0; i < data.length; i += 4) {
      if (data[i + 3] < 8) continue;
      const r = data[i], g = data[i + 1], b = data[i + 2];
      const max = Math.max(r, g, b), min = Math.min(r, g, b), lum = (r * 299 + g * 587 + b * 114) / 1000;
      const sat = max === 0 ? 0 : (max - min) / max;
      if (sat < 0.3 || max < 60) {
        // Black, white and grey: flip dark to light, in the site's warm off-white.
        // Mid greys would stay dim either way, so everything lands between light grey and off-white.
        if (lum < 200) { const v = (170 + (Math.max(lum, 255 - lum) - 128) * 0.67) / 255; data[i] = Math.round(245 * v); data[i + 1] = Math.round(244 * v); data[i + 2] = Math.round(239 * v); }
      } else if (lum < 120) {
        // A dark brand colour: same hue, lifted.
        const k = Math.min(2.6, 135 / Math.max(lum, 1));
        data[i] = Math.min(255, Math.round(r * k + 20)); data[i + 1] = Math.min(255, Math.round(g * k + 20)); data[i + 2] = Math.min(255, Math.round(b * k + 20));
      }
    }
    const out = await sharp(data, { raw: info }).trim().resize({ width: 560, height: 160, fit: 'inside', withoutEnlargement: true }).png().toBuffer({ resolveWithObject: true });
    writeFileSync(`src/assets/clients/${slug}.png`, out.data);
    console.log('ok  ', slug.padEnd(28), `${out.info.width}x${out.info.height}`);
  } catch (e) {
    console.log('fail', slug, String(e).slice(0, 90));
  }
}
