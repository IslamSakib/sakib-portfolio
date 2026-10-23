// Every service page below the three pillars (custom website, web application, WordPress). One list drives the route
// src/pages/[pillar]/[child].astro, the pillar pages' service tiles and both menus. `handBuilt` entries have their own page file.
import { services, fixes } from './services.js';
import { prices, usd } from './prices.js';
import { customChildren } from './children-custom.js';
import { webappChildren } from './children-webapp.js';
import { wordpressChildren } from './children-wordpress.js';

const wpFixes = fixes.map((f) => ({
  ...f,
  pillar: 'wordpress-development',
  fix: true,
  art: f.slug,
  need: 'broken',
  cta: 'Send the site',
  minPrice: f.slug === 'wordpress-repair' ? prices.fix : prices.malware,
  menu: f.slug === 'wordpress-repair' ? 'Repair and fixes' : 'Malware removal',
  ic: f.slug === 'wordpress-repair' ? 'M14 6l4 4-8 8H6v-4zM13 7l4 4' : 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6zM12 8v5M12 16v.01',
  from: f.slug === 'wordpress-repair' ? `Repairs from ${usd(prices.fix)}` : `Cleanup from ${usd(prices.malware)}`,
}));

const handBuilt = [
  { slug: 'website-maintenance', pillar: 'custom-web-development', handBuilt: true, name: 'Website maintenance services', menu: 'Website maintenance', ic: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6zM9 12l2 2 4-4', from: `From ${usd(prices.care)} a month` },
  { slug: 'wordpress-maintenance', pillar: 'wordpress-development', handBuilt: true, name: 'WordPress maintenance services', menu: 'Care plans', ic: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6zM9 12l2 2 4-4', from: `From ${usd(prices.care)} a month` },
  { slug: 'white-label-wordpress-development', pillar: 'wordpress-development', handBuilt: true, name: 'White label WordPress development', menu: 'White-label for agencies', ic: 'M4 7h16v12H4zM9 7V5h6v2', from: `${usd(prices.agencyHour)} an hour or ${usd(prices.agencySite)} a site` },
  { slug: 'white-label-wordpress-maintenance', pillar: 'wordpress-development', handBuilt: true, name: 'White label WordPress support', menu: 'White-label support', ic: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z', from: `From ${usd(prices.agencyCare)} per site a month` },
];

export const children = [...customChildren, ...webappChildren, ...wordpressChildren, ...wpFixes, ...handBuilt];
export const dataChildren = children.filter((c) => !c.handBuilt);
export const kidsOf = (pillar) => {
  const order = {
    'custom-web-development': ['custom-web-design', 'ecommerce-website-development', 'landing-page-design', 'website-redesign', 'website-speed-optimization', 'website-repair', 'website-maintenance'],
    'web-application-development': ['saas-development', 'customer-portal-development', 'dashboard-development', 'mvp-development', 'api-integration', 'ai-integration'],
    'wordpress-development': ['wordpress-theme-development', 'wordpress-plugin-development', 'woocommerce-development', 'wordpress-speed-optimization', 'wordpress-repair', 'wordpress-malware-removal', 'wordpress-maintenance', 'white-label-wordpress-development', 'white-label-wordpress-maintenance'],
  }[pillar];
  return order.map((slug) => children.find((c) => c.pillar === pillar && c.slug === slug)).filter(Boolean);
};
export const pillars = services.map((p) => ({ ...p, kids: kidsOf(p.slug) }));
export const pathOf = (o) => (o.pillar ? `/${o.pillar}/${o.slug}/` : `/${o.slug}/`);
