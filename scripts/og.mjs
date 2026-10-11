// Builds public/og.png (1200x630), the image shown when a link to the site is shared.
import sharp from 'sharp';
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs><radialGradient id="g" cx="78%" cy="110%" r="75%"><stop offset="0" stop-color="#f2efe6" stop-opacity="0.75"/><stop offset="1" stop-color="#f2efe6" stop-opacity="0"/></radialGradient>
  <pattern id="d" width="28" height="28" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.3" fill="#f2efe6" fill-opacity="0.12"/></pattern></defs>
  <rect width="1200" height="630" fill="#0d1a20"/><rect width="1200" height="630" fill="url(#d)"/><rect width="1200" height="630" fill="url(#g)"/>
  <text x="80" y="120" font-family="Arial, Helvetica, sans-serif" font-size="30" fill="#5b8cff" letter-spacing="2">WORDPRESS · CUSTOM DEVELOPMENT · AI</text>
  <text x="80" y="290" font-family="Arial, Helvetica, sans-serif" font-size="92" font-weight="700" fill="#f2efe6" letter-spacing="-3">Sakib Islam<tspan fill="#f2efe6">.</tspan></text>
  <text x="80" y="370" font-family="Arial, Helvetica, sans-serif" font-size="40" fill="#f2efe6" fill-opacity="0.82">WordPress developer for startups and SaaS</text>
  <text x="80" y="540" font-family="Arial, Helvetica, sans-serif" font-size="28" fill="#aaa79d">sakib.mywrkbase.com</text>
</svg>`;
const photo = await sharp('src/assets/sakib-islam-cut.png').resize(470, 470).toBuffer();
await sharp(Buffer.from(svg)).composite([{ input: photo, left: 700, top: 160 }]).png({ compressionLevel: 9 }).toFile('public/og.png');
console.log('public/og.png written');
