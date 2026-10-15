// Runs after `astro build`. Lines wrap normally (they fill the full width), and here the last two words of every heading,
// paragraph, caption and quote in dist/ are joined with a non-breaking space, so a single word never sits alone on the
// last line. Only the final short gap is touched; elements that contain other blocks are left alone.
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const files = [];
const walk = (d) => readdirSync(d).forEach((f) => { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') && files.push(p); });
walk('dist');

const blocks = /<(h1|h2|h3|p|dd|figcaption|blockquote|summary)(\s[^>]*)?>([\s\S]*?)<\/\1>/g;
const nested = /<(p|div|ul|ol|li|h[1-6]|figure|section|table|br)\b/i;

// Join the last two words: find the last space that sits in plain text (not inside a tag) with a word on both sides.
export const glue = (inner) => {
  if (nested.test(inner)) return inner;
  const parts = inner.split(/(<[^>]+>)/);
  for (let i = parts.length - 1; i >= 0; i--) {
    const s = parts[i];
    if (!s || s.startsWith('<')) continue;
    const m = s.match(/^([\s\S]*\S) (\S+\s*)$/);
    if (m) {
      // Keep it to the last short word, so long tails can still wrap.
      const tail = (m[2] + parts.slice(i + 1).join('').replace(/<[^>]+>/g, '')).trim();
      if (tail.length <= 14) parts[i] = m[1] + '&nbsp;' + m[2];
      return parts.join('');
    }
    if (/\s/.test(s) || s.trim()) return inner;
  }
  return inner;
};

let changed = 0;
for (const f of files) {
  const html = readFileSync(f, 'utf8');
  const out = html.replace(blocks, (all, tag, attrs = '', inner) => {
    const g = glue(inner);
    if (g !== inner) changed++;
    return `<${tag}${attrs}>${g}</${tag}>`;
  });
  if (out !== html) writeFileSync(f, out);
}
console.log(`no-orphans: joined the last two words in ${changed} text blocks`);

// Self-check: `node scripts/no-orphans.mjs --test`
if (process.argv.includes('--test')) {
  const eq = (a, b) => { if (a !== b) { console.error('FAIL', JSON.stringify(a), '!=', JSON.stringify(b)); process.exit(1); } };
  eq(glue('Fix the cause, not the symptom.'), 'Fix the cause, not the&nbsp;symptom.');
  eq(glue('Speed <em>fixed at the cause.</em>'), 'Speed <em>fixed at the&nbsp;cause.</em>');
  eq(glue('a <a href="/x y">link text</a>'), 'a <a href="/x y">link&nbsp;text</a>');
  eq(glue('<span>one</span><div>two words</div>'), '<span>one</span><div>two words</div>');
  eq(glue('Word'), 'Word');
  console.log('no-orphans self-check passed');
}
