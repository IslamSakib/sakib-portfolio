// One-off: remove the grey studio backdrop from the portrait. Flood fill from the top and side edges through
// neutral mid-grey pixels, then feather the mask and save a 2x cutout, sharpened, because the source is only 400px with transparency.
import sharp from 'sharp';
const src = 'src/assets/sakib-islam.png', out = 'src/assets/sakib-islam-cut.png';
const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const W = info.width, H = info.height, bg = new Uint8Array(W * H), stack = [];
const isBg = (i) => { const r = data[i * 4], g = data[i * 4 + 1], b = data[i * 4 + 2]; const mx = Math.max(r, g, b), mn = Math.min(r, g, b); const x = i % W, y = (i - x) / W; if (y >= 224 && x >= (y < 238 ? 157 : 150) && x <= Math.min(271, 260 + (y - 224) * 0.6)) return false; return mx - mn < 26 && mx > 95; };
const push = (x, y) => { const i = y * W + x; if (x >= 0 && y >= 0 && x < W && y < H && !bg[i] && isBg(i)) { bg[i] = 1; stack.push(i); } };
for (let x = 0; x < W; x++) push(x, 0);
for (let y = 0; y < H; y++) { push(0, y); push(W - 1, y); }
while (stack.length) { const i = stack.pop(), x = i % W, y = (i - x) / W; push(x + 1, y); push(x - 1, y); push(x, y + 1); push(x, y - 1); }
const mask = Buffer.alloc(W * H); let kept = 0;
for (let i = 0; i < W * H; i++) { mask[i] = bg[i] ? 0 : 255; kept += bg[i] ? 0 : 1; }
// feather, then pull the edge in a little so no grey fringe is left around the hair
const soft = await sharp(mask, { raw: { width: W, height: H, channels: 1 } }).blur(1.6).linear(1.9, -115).toColourspace('b-w').raw().toBuffer();
const rgba = Buffer.from(data);
for (let i = 0; i < W * H; i++) rgba[i * 4 + 3] = soft[i];
await sharp(rgba, { raw: { width: W, height: H, channels: 4 } }).resize(800, 800, { kernel: 'lanczos3' }).sharpen({ sigma: 1.1, m1: 1, m2: 2.5 }).png().toFile(out);
console.log('kept', Math.round(kept / (W * H) * 100) + '% of pixels as subject');
// preview on orange to check the edge
await sharp({ create: { width: 800, height: 800, channels: 3, background: '#ff8552' } }).composite([{ input: out }]).jpeg({ quality: 70 }).toFile(process.argv[2]);
