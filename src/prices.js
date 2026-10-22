// Starting prices in US dollars, approved by Sakib on 14 Oct 2026. One source for the home page, the maintenance page,
// the agency page and the structured data. Every job still gets a written quote first.
export const prices = {
  care: 149,
  carePlus: 299,
  fix: 150,
  speed: 450,
  build: 2500,
  agencyHour: 35,
  agencySite: 1200,
  // Set 16 Oct 2026 at Sakib's request ("standard pricing that will be competitive"), from market checks: one-off
  // cleanups run $79–$497 (hosts $250–$300); white-label care sells wholesale at $39–$89 a site, retail from ~$150.
  malware: 199,
  agencyCare: 59,
};

export const usd = (n) => '$' + n.toLocaleString('en-US');

// The two monthly care plans, shown on the maintenance and care plans pages (same cards, one source).
export const carePlans = [
  {
    name: 'Care', for: 'For a business site that needs to stay safe, current and online.',
    price: usd(prices.care), unit: '/mo', billing: 'Billed monthly · cancel any month',
    outcome: 'Your site updated, backed up and watched every month, by one developer who knows it.',
    items: ['WordPress, theme and plugin updates, tested before they go live', 'Daily backups kept off the server', 'Uptime and security monitoring', 'Monthly report in plain English', '1 hour of changes and fixes a month', 'Urgent reply within 24 hours', { t: 'Monthly mobile speed check', ok: false }],
    cta: 'Start Care', href: '/contact/?plan=care', note: 'You keep every login',
  },
  {
    name: 'Care + development', for: 'For sites that change often and need a developer on hand.', featured: true, badge: 'More hands-on',
    price: usd(prices.carePlus), unit: '/mo', billing: 'Billed monthly · cancel any month',
    outcome: 'Everything in Care, plus three hours a month for changes and a monthly speed check.',
    items: ['WordPress, theme and plugin updates, tested before they go live', 'Daily backups kept off the server', 'Uptime and security monitoring', 'Monthly report in plain English', '3 hours of changes and fixes a month', 'Urgent reply within 24 hours', 'Monthly mobile speed check'],
    cta: 'Start Care + development', href: '/contact/?plan=care-plus', note: 'You keep every login',
  },
];
