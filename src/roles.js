// The three developer titles people search for, each with a hub page (/<role>/) and place pages (/<role>/<place>/).
// Full stack pages live in src/locations.js (written by hand, one per market). Web application developer and WordPress
// developer pages reuse each place's name and time-zone sums, and carry their own lead, industries and questions.
// Semrush US volumes, 23 Oct 2026: hire full stack developer 880; hire WordPress developer 1,300; WordPress developer Chicago 390,
// New York 210; hire web application developer 90; web application development New York 90, Florida 50 (all low: keep the set small).
import { places, placeBySlug } from './locations.js';

const near = (role, slugs) => slugs;

const fullStackHub = {
  focus: 'Hire a Full Stack Developer',
  title: 'Hire a Full Stack Developer | Sakib Islam',
  description: 'Hire a full stack developer for custom websites and web apps: UI/UX, frontend and backend by one person.',
  h1Lines: ['Hire a Full Stack Developer', 'who handles design,', 'frontend and backend.'],
  lead: 'Hire a full stack developer when you want one person to take your website or web app from idea to launch. I research your competitors, design the UI and UX, and build the frontend, backend and admin dashboard. I work remotely from Dhaka with a daily overlap on US, UK and Australian hours.',
  covers: [
    { name: 'Competitor research first', text: 'I compare what your competitors do well and badly, so the design aims at a real gap.' },
    { name: 'UI and UX design', text: 'The screens are designed by the person who builds them. No hand-off, no lost detail.' },
    { name: 'Frontend that loads fast', text: 'Hand-built pages tested on a throttled phone against Google Core Web Vitals.' },
    { name: 'Backend and APIs', text: 'Accounts, orders, payments, emails and integrations, written for how your business works.' },
    { name: 'Admin dashboards', text: 'The screens your team uses every day, with roles for who can see and do what.' },
    { name: 'Launch and care', text: 'Deployment, backups, monitoring and changes after launch, on a website care plan if you want one.' },
  ],
  faq: [
    { q: 'What does a full stack developer do?', a: 'A full stack developer builds both sides of a website or app: the part visitors see (frontend) and the part that runs behind it (backend, database and admin). For a business that means one person can take a project from design to launch.' },
    { q: 'When should I hire a full stack developer instead of an agency?', a: 'Hire one person when you want a direct line to whoever builds your project and your scope fits one developer: a business website, a store with a dashboard, a first product version. An agency makes sense when you need a large team working in parallel.' },
    { q: 'How much does it cost to hire a full stack developer?', a: 'WordPress builds start at $2,500. Custom websites and web apps are quoted after I read your brief, because the price depends on screens, accounts and integrations. You get a written price in US dollars before any work starts.' },
    { q: 'Do you build WordPress sites as well as custom ones?', a: 'Yes. I write custom WordPress themes and plugins, and I build fully custom websites and web apps when WordPress is not the right tool. I will tell you which fits your project.' },
    { q: 'Where do you work from, and which time zones do you cover?', a: 'I work remotely from Dhaka, Bangladesh, on an evening shift that overlaps the US morning and early afternoon, and the UK and Australia too. You get a reply within 24 hours.' },
  ],
  proof: ['mayabee', 'wrkbase', 'tabby'],
};

const webAppHub = {
  focus: 'Hire a Web Application Developer',
  title: 'Hire a Web Application Developer | Sakib Islam',
  description: 'Hire a web application developer for custom web apps, portals and dashboards, built frontend to backend.',
  h1Lines: ['Hire a Web Application Developer', 'who builds the app, the', 'API and the dashboard.'],
  lead: 'Hire a web application developer when your business needs software that people sign in to: a customer portal, an internal tool, a booking system or a SaaS product. I design the UI and UX, then build the frontend, backend, database and admin dashboard. Wrkbase and Mayabee are the live proof.',
  covers: [
    { name: 'Accounts, roles and permissions', text: 'Who can see and do what, decided up front and logged. Mayabee has owner, manager, orders and content roles.' },
    { name: 'Dashboards and reporting', text: 'The numbers a team needs on one screen, from orders and stock to hours and payroll.' },
    { name: 'A first version you can sell', text: 'The core of the product built first and built properly, so real users can start on it.' },
    { name: 'Integrations', text: 'Payments, email, CRM and analytics connected so data lands where your team already works.' },
    { name: 'Workflow automation', text: 'Repetitive steps turned into rules the app follows, so your team stops copying data between tools.' },
    { name: 'AI agents inside your product', text: 'Language models connected to your app, acting only after a person approves, as built into Wrkbase.' },
  ],
  faq: [
    { q: 'What is a web application developer?', a: 'A web application developer builds software that runs in the browser and that people sign in to: dashboards, portals, booking systems and SaaS products. It goes beyond a website that only shows information.' },
    { q: 'What is the difference between a website and a web application?', a: 'A website mainly shows information. A web application lets users do things with their own data: sign in, place orders, manage a team, see reports. Many business sites need a bit of both, like a store with an order dashboard.' },
    { q: 'How much does a web application cost?', a: 'Web applications are quoted after I read your brief, because the price depends on the screens, user roles and integrations. You get a written price in US dollars before any work starts, and I scope a first version that real users can start on.' },
    { q: 'What technology do you use?', a: 'I choose the stack for the job. Mayabee, for example, is built with a fast Astro frontend, a PHP API and a MySQL database, with an admin dashboard on top. You own the code.' },
    { q: 'Can you add AI features to a web app?', a: 'Yes. Wrkbase includes an AI agent that executes approved actions with a transparent activity log. I add AI only where it solves a problem your users have.' },
  ],
  proof: ['wrkbase', 'mayabee', 'moneybag'],
};

const wordpressHub = {
  focus: 'Hire a WordPress Developer',
  title: 'Hire a WordPress Developer | Sakib Islam',
  description: 'Hire a WordPress developer for custom themes, plugins, WooCommerce and site care. Written quote first.',
  h1Lines: ['Hire a WordPress Developer', 'for custom themes, plugins', 'and WooCommerce.'],
  lead: 'Hire a WordPress developer when a bought theme and a pile of plugins can no longer do what you need. I build custom themes and plugins, WooCommerce stores and integrations, and I look after the site once it is live. Tabby, Moneybag and Open Alliance Learning are live examples.',
  covers: [
    { name: 'Design to WordPress', text: 'Your Figma file, or a design I work out with you, built as a responsive theme.' },
    { name: 'Custom plugin development', text: 'Features written for your business instead of bent out of a generic plugin.' },
    { name: 'WooCommerce and payments', text: 'Stores, subscriptions, payment gateways and checkouts that are short on a phone.' },
    { name: 'Learning and membership sites', text: 'Courses, enrolment and a dashboard for each kind of user, on LearnDash.' },
    { name: 'Integrations', text: 'CRM, analytics, chat and forms connected so data lands where your team already works.' },
    { name: 'Care after launch', text: 'Updates, security patches and changes through a website care plan from $149 a month.' },
  ],
  faq: [
    { q: 'How much does it cost to hire a WordPress developer?', a: 'Custom WordPress builds start at $2,500, with a written quote first. Single fixes start at $150, and a monthly care plan starts at $149. Prices are in US dollars.' },
    { q: 'Do you write custom WordPress themes and plugins?', a: 'Yes. A custom theme gives you a design that fits your brand and loads faster than a bought theme. A custom plugin does one job properly: for Moneybag that was a payment gateway, and for Tabby a tax calculator and AI demo plugins.' },
    { q: 'Can you take over a WordPress site another developer built?', a: 'Yes. I read the theme, the plugins, the errors and what changed recently, then send you a short list of what is wrong and what I would fix first before any work begins.' },
    { q: 'Do you work with WooCommerce?', a: 'Yes. Stores, subscriptions, custom payment gateways and checkouts. I test the checkout and order emails after every change.' },
    { q: 'Do you also build sites outside WordPress?', a: 'Yes. When WordPress is the wrong tool, for example a product people sign in to, I build custom websites and web apps. I will tell you which fits.' },
  ],
  proof: ['tabby', 'moneybag', 'open-alliance-learning'],
};

// Role pages for individual places. Each carries its own lead, three things that market asks for, and two questions.
const webApp = {
  usa: {
    lead: 'Looking for the best web application developer in USA? I build the screens people use and the rules behind them: sign-in, roles, orders, reports. I built Wrkbase, a team management platform with an AI agent, from idea to launch.',
    items: [
      { name: 'Customer portals', text: 'A place for your customers to sign in, see orders and documents and make requests, instead of email threads.' },
      { name: 'Internal tools', text: 'The spreadsheet your operations team lives in, turned into a screen with roles, history and reports.' },
      { name: 'SaaS products', text: 'A first version with sign-in, a dashboard and billing, built so real users can start on it.' },
    ],
    faq: [
      { q: 'Can you build a web app for a US company from Dhaka?', a: 'Yes. I work an evening shift that covers your morning, reply within 24 hours and invoice in US dollars. Tabby, a US company, has worked with me for two years.' },
      { q: 'Who owns the code of the web application?', a: 'You do. You own the code, the design files, the domain and every login, and I work through my own accounts that you can remove at any time.' },
    ],
    proof: ['wrkbase', 'mayabee', 'tabby'],
    near: ['florida', 'texas', 'california', 'new-york'],
  },
  florida: {
    lead: 'Looking for the best web application developer in Florida? I build booking systems, property dashboards and client portals, with the API and staff dashboard behind them. I work remotely from Dhaka and overlap your Florida morning.',
    items: [
      { name: 'Booking and reservation systems', text: 'Availability, confirmations by email and a staff screen to manage the day, for tours, rentals and local services.' },
      { name: 'Property and lead dashboards', text: 'Listings, enquiries and follow-up tracked in one place for agents and property managers.' },
      { name: 'Client and patient portals', text: 'Secure sign-in, forms and documents. Because these hold personal details, I collect as little as possible and flag when a compliance review is needed.' },
    ],
    faq: [
      { q: 'Can you build a booking system for my Florida business?', a: 'Yes. I scope the one flow your guests use most, build it with confirmations and an admin screen, then add the rest. Mayabee\'s order dashboard uses the same ideas for orders and delivery.' },
      { q: 'How do we work with a 10 to 11 hour difference?', a: 'Florida is 10 hours behind Dhaka in summer and 11 in winter. My evening is your morning, so a call at 9 or 10 am Eastern is easy, and written updates arrive before your day starts.' },
    ],
    proof: ['mayabee', 'wrkbase', 'tabby'],
    near: ['usa', 'texas', 'california', 'new-york'],
  },
  texas: {
    lead: 'Looking for the best web application developer in Texas? I replace spreadsheets and email with portals and dashboards: quotes, orders, dispatch and delivery. I work remotely from Dhaka on Central-time hours.',
    items: [
      { name: 'Quote and order portals', text: 'Customers request quotes and track orders online, and your team sees every request in one dashboard.' },
      { name: 'Dispatch and delivery dashboards', text: 'Status, delivery tracking and cash collection screens, like the one built for Mayabee.' },
      { name: 'Field service scheduling', text: 'A schedule view for crews, request forms and customer notifications, usable on a phone.' },
    ],
    faq: [
      { q: 'Can you replace our spreadsheets with a web app?', a: 'Yes. I map how the spreadsheet is really used, then build screens with roles, history and reports. You keep your data and can export it at any time.' },
      { q: 'How do we meet on Central time?', a: 'Dhaka is 11 hours ahead of Central daylight time and 12 ahead of standard time. I work an evening shift, so we overlap from your 8 am to about 1 pm.' },
    ],
    proof: ['mayabee', 'wrkbase', 'moneybag'],
    near: ['usa', 'florida', 'california', 'new-york'],
  },
  california: {
    lead: 'Looking for the best web application developer in California? I ship a usable first version fast, then grow it: dashboard, API, billing. I built Wrkbase from idea to launch, and Tabby\'s v2.0 website.',
    items: [
      { name: 'MVPs for startups', text: 'Sign-in, a dashboard and an API for the one job users must do, then billing and integrations on top.' },
      { name: 'AI-powered tools', text: 'Apps where a language model does part of the work and a person approves it. Wrkbase\'s agent runs approved actions and logs them.' },
      { name: 'Creator and membership platforms', text: 'Accounts, content access and payments for course, community and media businesses.' },
    ],
    faq: [
      { q: 'How quickly can you build an MVP?', a: 'By cutting scope to the one thing users must do, I build that first and show working screens every week. The timeline depends on the screens and integrations, and you get it in the written quote.' },
      { q: 'Can we speak during California mornings?', a: 'Yes. California is 13 hours behind Dhaka in summer and 14 in winter, so my evening covers your 7 am to noon. Written updates arrive before your day starts.' },
    ],
    proof: ['wrkbase', 'tabby', 'mayabee'],
    near: ['usa', 'florida', 'texas', 'new-york'],
  },
  'new-york': {
    lead: 'Looking for the best web application developer in New York? I build apps where the rules must be exact: payments, onboarding, approvals. I built Moneybag\'s payment plugin and merchant onboarding flow.',
    items: [
      { name: 'Payment and onboarding flows', text: 'Merchant or client onboarding with OTP sign-in and CRM integration. Moneybag onboarding time fell by 60 percent.' },
      { name: 'Client portals for firms', text: 'Documents, approvals and messages in one sign-in area for professional services and agencies.' },
      { name: 'Reporting dashboards', text: 'Orders, revenue and activity on one screen, with roles for who sees what.' },
    ],
    faq: [
      { q: 'Have you built anything that handles money?', a: 'Yes. For Moneybag, a licensed payment gateway, I built a custom payment plugin, OTP authentication and a merchant onboarding workflow, with CRM integration.' },
      { q: 'Can we meet during New York business hours?', a: 'Yes. New York is 10 hours behind Dhaka in summer and 11 in winter, so a 10 am Eastern call is 8 pm for me.' },
    ],
    proof: ['moneybag', 'wrkbase', 'mayabee'],
    near: ['usa', 'florida', 'texas', 'california'],
  },
};

const wordpress = {
  usa: {
    lead: 'Looking for the best WordPress developer in USA? I write custom themes and plugins, build WooCommerce stores and maintain live sites. Tabby, a US company, has had me maintain its website for two years.',
    items: [
      { name: 'Custom themes', text: 'Your design built as a fast, responsive theme your team can edit, instead of a bought theme bent to fit.' },
      { name: 'Custom plugins', text: 'One job done properly: a payment gateway for Moneybag, a tax calculator and AI demos for Tabby.' },
      { name: 'WooCommerce stores', text: 'Checkouts that are short on a phone, tested after every update.' },
    ],
    faq: [
      { q: 'Do you work with US companies on WordPress sites?', a: 'Yes. Tabby, a US company, hired me for its v2.0 website and I still maintain it. I overlap US mornings, reply within 24 hours and invoice in US dollars.' },
      { q: 'What does a WordPress site cost?', a: 'Custom WordPress builds start at $2,500, with a written quote first. Single fixes start at $150 and a care plan at $149 a month.' },
    ],
    proof: ['tabby', 'moneybag', 'open-alliance-learning'],
    near: ['florida', 'texas', 'california', 'new-york'],
  },
  florida: {
    lead: 'Looking for the best WordPress developer in Florida? I turn a design into a fast theme and add booking or lead features as plugins. I work remotely from Dhaka and overlap your Florida morning.',
    items: [
      { name: 'Hospitality and tour sites', text: 'Fast pages with booking enquiries, galleries that do not slow the site, and forms that reach staff by email.' },
      { name: 'Real estate sites', text: 'Listing pages and lead capture on a theme your agents can edit.' },
      { name: 'Practice and local service sites', text: 'Clear service pages, appointment requests and a monthly care plan so updates never break the site.' },
    ],
    faq: [
      { q: 'Can you fix or take over my Florida business\'s WordPress site?', a: 'Yes. I read the theme, plugins and errors first and send a short list of what is wrong before any work starts. Repairs start at $150.' },
      { q: 'How do I reach you in Florida hours?', a: 'Florida is 10 hours behind Dhaka in summer and 11 in winter. I work an evening shift, so a 9 or 10 am Eastern call works well.' },
    ],
    proof: ['tabby', 'open-alliance-learning', 'moneybag'],
    near: ['usa', 'texas', 'california', 'new-york'],
  },
  texas: {
    lead: 'Looking for the best WordPress developer in Texas? I build faster, cleaner sites and write plugins for features no plugin does well: quote calculators, custom forms, CRM links.',
    items: [
      { name: 'B2B and industrial sites', text: 'Product catalogs, quote request forms and clear service pages that rank for what buyers search.' },
      { name: 'Plugin work for specific jobs', text: 'A quote calculator, a custom form flow or an integration with your CRM, written as a plugin.' },
      { name: 'Site rescue and speed', text: 'Slow or broken sites traced to the cause, with before and after numbers from PageSpeed Insights.' },
    ],
    faq: [
      { q: 'Can you speed up my slow WordPress site?', a: 'Yes. I measure first, fix the cause, and send before and after numbers on mobile. Speed fixes start at $450 per site.' },
      { q: 'How do we work across the time difference?', a: 'Dhaka is 11 hours ahead of Central daylight time, 12 of standard time. We overlap from your 8 am to about 1 pm, and I reply in writing within 24 hours.' },
    ],
    proof: ['tabby', 'moneybag', 'open-alliance-learning'],
    near: ['usa', 'florida', 'california', 'new-york'],
  },
  california: {
    lead: 'Looking for the best WordPress developer in California? I build fast marketing sites, blogs and interactive tools. I built Tabby\'s v2.0 website before its San Francisco event and still maintain it.',
    items: [
      { name: 'Startup marketing sites', text: 'Fast pages, clean structure for search and a theme your team can edit without a developer.' },
      { name: 'Interactive demos and calculators', text: 'Plugins for tools that bring traffic, like the tax calculator and AI demos I built for Tabby.' },
      { name: 'Courses and memberships', text: 'WordPress LMS with separate dashboards for each user type, as built for Open Alliance Learning.' },
    ],
    faq: [
      { q: 'Have you built WordPress sites for California companies?', a: 'Yes. Tabby\'s v2.0 website launched ahead of its San Francisco event with Core Web Vitals above 90, and I have maintained it since.' },
      { q: 'What are the working hours across Pacific time?', a: 'California is 13 hours behind Dhaka in summer and 14 in winter. My evening covers your 7 am to noon, and replies arrive before your day starts.' },
    ],
    proof: ['tabby', 'open-alliance-learning', 'moneybag'],
    near: ['usa', 'florida', 'texas', 'new-york'],
  },
  'new-york': {
    lead: 'Looking for the best WordPress developer in New York? I build custom themes and plugins, including a payment gateway for Moneybag, and I build agency designs under the agency\'s name.',
    items: [
      { name: 'Agency and studio builds', text: 'Your Figma design built in WordPress under your name. White-label work has its own page and prices.' },
      { name: 'Firm and brand websites', text: 'A credible, fast site with enquiry forms and pages written so they can rank.' },
      { name: 'Payment and fintech plugins', text: 'Custom gateways and merchant flows for WooCommerce, tested before launch.' },
    ],
    faq: [
      { q: 'Do you work with New York agencies?', a: 'Yes. I build agency designs in WordPress under the agency\'s name, and the agency keeps the client. From $1,200 per site or $35 an hour.' },
      { q: 'When can we talk during New York hours?', a: 'New York is 10 hours behind Dhaka in summer and 11 in winter, so a 10 am Eastern call is 8 pm for me. Messages get a reply within 24 hours.' },
    ],
    proof: ['moneybag', 'tabby', 'open-alliance-learning'],
    near: ['usa', 'florida', 'texas', 'california'],
  },
  chicago: {
    lead: 'Looking for the best WordPress developer in Chicago? I build fast sites with the features around them: quote forms, learner dashboards, client areas. I built the WordPress LMS for Open Alliance Learning.',
    items: [
      { name: 'Education and training sites', text: 'Courses, enrolment and separate dashboards for learners, teachers and assessors, on LearnDash and WooCommerce.' },
      { name: 'Logistics and manufacturing sites', text: 'Service pages, spec catalogs and quote request forms that reach the right person.' },
      { name: 'Care after launch', text: 'Tested updates, backups and monitoring so a busy quarter does not meet a broken plugin.' },
    ],
    faq: [
      { q: 'Can you build a WordPress learning platform?', a: 'Yes. I built the WordPress LMS for Open Alliance Learning: enrolment and payment in one step, and a separate dashboard for learners, teachers and assessors.' },
      { q: 'How do I reach you in Chicago hours?', a: 'Chicago is 11 hours behind Dhaka in summer and 12 in winter. My evening covers your 8 am to early afternoon.' },
    ],
    proof: ['open-alliance-learning', 'tabby', 'moneybag'],
    near: ['usa', 'texas', 'new-york', 'florida'],
  },
};

const mk = (role, table) => Object.entries(table).map(([slug, d]) => {
  const base = placeBySlug[slug];
  const inUsa = slug === 'usa';
  const where = inUsa ? 'USA' : base.name;
  const focus = `Best ${role.title} in ${where}`;
  return {
    slug,
    name: base.name,
    kind: base.kind,
    focus,
    title: `${focus} | Sakib Islam`,
    description: `${focus}: ${role.descTail} Get a quote.`,
    h1Lines: [`Best ${role.title}`, `in ${where} for ${role.h1b}`, role.h1c],
    lead: d.lead,
    tz: base.tz,
    industries: d.items,
    proof: d.proof,
    faq: [...d.faq, ...role.sharedFaq(where)],
    near: d.near,
  };
});

export const roles = {
  'full-stack-developer': {
    slug: 'full-stack-developer', name: 'Full stack developer', title: 'Full Stack Developer',
    hub: fullStackHub, pages: places,
  },
  'web-application-developer': {
    slug: 'web-application-developer', name: 'Web application developer', title: 'Web Application Developer',
    descTail: 'custom web apps and portals. Remote, US hours.', h1b: 'custom web apps', h1c: 'and dashboards.',
    sharedFaq: (where) => [{ q: `How much does a web application developer in ${where} cost?`, a: 'Web applications are quoted after I read your brief, because the price depends on screens, user roles and integrations. You get a written price in US dollars before any work starts.' }],
    hub: webAppHub,
  },
  'wordpress-developer': {
    slug: 'wordpress-developer', name: 'WordPress developer', title: 'WordPress Developer',
    descTail: 'custom themes, plugins and WooCommerce.', h1b: 'custom themes', h1c: 'plugins and WooCommerce.',
    sharedFaq: (where) => [{ q: `Do you only work on WordPress, or also custom sites in ${where === 'USA' ? 'the USA' : where}?`, a: 'Both. When WordPress is the right tool I build custom themes and plugins. When a project needs accounts, roles or live data, I build a custom website or web app instead and tell you why.' }],
    hub: wordpressHub,
  },
};
roles['web-application-developer'].pages = mk(roles['web-application-developer'], webApp);
roles['wordpress-developer'].pages = mk(roles['wordpress-developer'], wordpress);

export const roleList = Object.values(roles);
export { near };
