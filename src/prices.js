// Starting prices in US dollars. One source for the home page, service pages, the care pages, the agency pages and the
// structured data. Every job still gets a written quote first. Reset 23 Oct 2026 after a market check (see
// seo/02-strategy/pricing-20261023.md): US freelance full-stack rates run about $70 to $135 an hour, custom small-business
// sites $3,000 to $10,000, web app first versions $10,000 to $50,000, small-business care plans $100 to $300 a month, and
// Bangladesh freelancers about $16 to $62 an hour. Prices set by the owner on 23 Oct 2026: websites from $600, stores from $800,
// web applications from $999, WordPress from $300 (stores from $500), care plans unchanged. Owner-set, below the Western range.
export const prices = {
  // Websites and web apps
  site: 600, // custom business website: UI/UX, frontend, backend, admin
  store: 800, // custom online store with its own dashboard (Mayabee type)
  webApp: 999, // first version of a web application: sign-in, roles, dashboard, API
  // WordPress
  build: 300, // custom WordPress theme build
  woo: 500, // WooCommerce store with custom theme and checkout
  plugin: 200, // one custom WordPress plugin
  // Care and fixes
  care: 149,
  carePlus: 299,
  fix: 50,
  speed: 150,
  malware: 99,
  // Extra developer time on an existing project
  hourly: 25,
  // White-label work for agencies
  agencyHour: 20,
  agencySite: 300,
  agencyCare: 59,
};

export const usd = (n) => '$' + n.toLocaleString('en-US');

// What a project usually costs once scoped, shown beside each "from" price so the "from" is not mistaken for the total.
export const typical = {
  site: '$600 to $1,500',
  store: '$800 to $2,500',
  webApp: '$999 to $4,000',
  wordpress: '$300 to $1,000',
};

// The two monthly care plans, shown on the website care and care plans pages (same cards, one source).
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
