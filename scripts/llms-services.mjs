// Rewrites the "## Services" section of public/llms.txt from src/children.js, so the AI-readable list matches the site map.
// Run with `node scripts/llms-services.mjs`.
import { readFileSync, writeFileSync } from 'node:fs';
import { pillars, pathOf } from '../src/children.js';

const base = 'https://sakib.mywrkbase.com';
let out = '## Services\n\nThree service areas, each with its own pages.\n\n';
for (const p of pillars) {
  out += `### ${p.name}\n\n- [${p.name}](${base}/${p.slug}/): ${p.short} ${p.from}.\n`;
  for (const k of p.kids) out += `- [${k.name}](${base}${pathOf(k)}): ${k.short || ''} ${k.from || ''}.\n`;
  out += '\n';
}
const f = 'public/llms.txt';
let s = readFileSync(f, 'utf8');
const a = s.includes('## Services') ? s.indexOf('## Services') : s.indexOf('## Hire by role and place');
const b = s.indexOf('## Hire by role and place');
s = s.slice(0, a) + out + s.slice(b);
writeFileSync(f, s);
console.log('llms.txt services rewritten');
