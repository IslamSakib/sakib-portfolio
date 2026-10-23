// Lists pages outside the WordPress area whose title, H1 or description mention WordPress or WooCommerce.
// The owner's rule (23 Oct 2026): WordPress words belong on WordPress pages, not across the whole site. Run after `npm run build`.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const files = [];
const walk = (d) => readdirSync(d).forEach((f) => { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') && files.push(p); });
walk('dist');
let total = 0, wp = 0;
for (const f of files) {
  const h = readFileSync(f, 'utf8');
  const u = '/' + f.replace(/\\/g, '/').replace(/^dist\//, '').replace(/index\.html$/, '');
  const title = (h.match(/<title>(.*?)<\/title>/) || [])[1] || '';
  const h1 = ((h.match(/<h1[^>]*>(.*?)<\/h1>/s) || [])[1] || '').replace(/<[^>]+>/g, '');
  const desc = (h.match(/name="description" content="([^"]*)"/) || [])[1] || '';
  total++;
  if (!/wordpress|woocommerce/i.test(title + h1 + desc)) continue;
  wp++;
  if (!/^\/(wordpress-development|wordpress-developer|blog)\//.test(u)) console.log('WordPress outside the WordPress area:', u, '|', title);
}
console.log(`${total} pages, ${wp} mention WordPress in title, H1 or description`);
