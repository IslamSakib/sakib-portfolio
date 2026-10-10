// The four services. Each one is a page (src/pages/[service].astro) and a row on the home page.
// `focus` is the page's focus keyword: it must appear in `title`, `description` and `h1` (scripts/seo-check.mjs checks this).
// Every claim here comes from the case studies in src/work or from what Sakib has confirmed.
export const services = [
  {
    slug: 'wordpress-development',
    name: 'WordPress development',
    focus: 'custom WordPress development',
    title: 'Custom WordPress Development Services | Sakib Islam',
    description:
      'Custom WordPress development by one senior developer: themes, plugins, WooCommerce, payments and integrations, built fast and handed over clean.',
    h1: 'Custom WordPress development, front end and back end.',
    lead: 'One developer for the whole job: the theme, the plugins, the payments and the integrations. Built to load fast and to survive the next update.',
    row: 'The whole job, front end and back end: custom themes, custom plugins, WooCommerce, payments and integrations.',
    chips: ['Custom themes', 'Plugin development', 'WooCommerce', 'Payments', 'LMS', 'Integrations'],
    problemTitle: 'A theme and thirty plugins is not a build',
    problem:
      'Many WordPress sites are assembled, not built. A bought theme, a page builder and a plugin for every feature. It works until traffic grows, a plugin updates or you need something the theme never planned for. Then every change costs more than the last one. I build the parts that matter as code written for your site, and use plugins only where they earn their place.',
    includes: [
      { name: 'Design to WordPress', text: 'Your Figma file, or a design I work out with you, built as a responsive theme. Tabby and TubeOnAI were both built this way.' },
      { name: 'Custom plugin development', text: 'Features written for your business instead of bent out of a generic plugin. For Moneybag that was a payment gateway plugin; for Tabby, a tax calculator and plugins for its AI demos.' },
      { name: 'WooCommerce and payments', text: 'Stores, subscriptions, payment gateways and checkouts that are short on a phone.' },
      { name: 'Learning and membership sites', text: 'Courses, enrolment and a dashboard for each kind of user, as built for Open Alliance Learning on LearnDash.' },
      { name: 'Integrations', text: 'CRM, analytics, chat and forms connected so data lands where your team already works.' },
      { name: 'Care after launch', text: 'Updates, security patches and changes. I still maintain Tabby after building it.' },
    ],
    proof: ['tabby', 'moneybag', 'open-alliance-learning'],
    faq: [
      { q: 'Can you build a WordPress site from our Figma designs?', a: 'Yes. I build Figma designs into WordPress as they were drawn, responsive on every screen size. Tabby and TubeOnAI both started as Figma files, and Tabby launched on schedule with Core Web Vitals above 90.' },
      { q: 'Do you write custom WordPress plugins?', a: 'Yes. When a feature is specific to your business, a custom plugin is cleaner and faster than stacking general ones. I wrote a payment gateway plugin for Moneybag, and a tax calculator and AI demo plugins for Tabby.' },
      { q: 'Do you work with Elementor and page builders?', a: 'Yes. I use a builder where your team needs to edit pages without a developer, and custom code where speed or logic matters. I also rebuild old, heavy builder layouts when they slow a site down.' },
      { q: 'Can you take over a site another developer built?', a: 'Yes. I start by reading what is there: the theme, the plugins, the errors and what changed recently. You get a short list of what is wrong and what I would fix first before any work begins.' },
      { q: 'Do you maintain the site after it launches?', a: 'Yes. I can look after updates, security and changes for a site I have built or fixed. Tabby is the example: I built it and still maintain it today.' },
    ],
  },
  {
    slug: 'wordpress-speed-optimization',
    name: 'Speed and rescue',
    focus: 'WordPress speed optimization',
    title: 'WordPress Speed Optimization Service | Sakib Islam',
    description:
      'WordPress speed optimization that fixes the cause, not the score: caching, Core Web Vitals, images and heavy layouts. Before and after numbers included.',
    h1: 'WordPress speed optimization that fixes the cause.',
    lead: 'Slow sites made fast and broken sites made stable. I find what is actually wrong first, then fix it once, where the problem lives.',
    row: 'Slow sites made fast and broken sites fixed. I find the cause first, then fix it at the root instead of adding another plugin.',
    chips: ['Core Web Vitals', 'Caching', 'Image delivery', 'Downtime', 'Technical SEO'],
    problemTitle: 'Another speed plugin is usually the problem, not the fix',
    problem:
      'A slow WordPress site loses visitors before they read a word, and Google measures the delay. The usual reaction is to install a cache plugin, then another one. On TubeOnAI that is exactly what took the site down: files left behind by old cache plugins clashed with the speed plugin the host runs. I removed them, kept one caching layer and rebuilt the heavy layouts. Load time went from 5 seconds to 1.5 and the downtime stopped.',
    includes: [
      { name: 'A measured starting point', text: 'PageSpeed Insights and Core Web Vitals on mobile before I change anything, so the result can be checked.' },
      { name: 'Caching set up once', text: 'One caching layer, configured properly, with leftovers from old plugins cleared out.' },
      { name: 'Lighter pages', text: 'Unused CSS and JavaScript removed, and heavy page-builder layouts rebuilt.' },
      { name: 'Images that load fast', text: 'Resized, compressed and served in modern formats at the size each screen needs.' },
      { name: 'Downtime and errors', text: 'White screens, plugin conflicts and sites that keep going down, traced to the cause.' },
      { name: 'Crawling and indexing', text: 'The technical issues that stop Google reading the site properly.' },
    ],
    proof: ['tubeonai', 'tabby'],
    faq: [
      { q: 'What are Core Web Vitals?', a: 'Core Web Vitals are three measurements Google uses to judge how a page feels to load and use. LCP is how long the main content takes to appear, good under 2.5 seconds. INP is how quickly the page responds to a tap or click, good under 200 milliseconds. CLS is how much the layout jumps, good under 0.1.' },
      { q: 'Why is my WordPress site slow?', a: 'The common causes are too many plugins doing overlapping jobs, caching that is missing or set up twice, images far larger than the screen needs, and page-builder layouts that load heavy code on every page. Slow hosting is sometimes part of it, but it is rarely the whole story.' },
      { q: 'Why does my WordPress site keep going down?', a: 'A WordPress site that keeps going down usually has a conflict, not bad luck. Typical causes are two plugins fighting, leftover files from a removed plugin, or a server running out of memory under a heavy page. On TubeOnAI it was old cache plugin files clashing with the host\'s own speed plugin.' },
      { q: 'Will a cache plugin fix my speed?', a: 'One caching layer, set up properly, helps a lot. A second or third one usually makes things worse, because they conflict. Caching also hides problems rather than removing them, so I fix the heavy pages and images as well.' },
      { q: 'How do I know the work made a difference?', a: 'You get the before and after numbers from Google PageSpeed Insights, on mobile, for the same pages. It is a public tool, so you can run the test yourself at any time and see the same result I do.' },
    ],
  },
  {
    slug: 'custom-web-development',
    name: 'Custom development',
    focus: 'custom web development',
    title: 'Custom Web Development for Startups | Sakib Islam',
    description:
      'Custom web development for startups: SaaS products, dashboards and fast marketing sites built from scratch when WordPress is the wrong tool.',
    h1: 'Custom web development for products WordPress cannot carry.',
    lead: 'Web products built from scratch: the sign-in, the data, the dashboard and the site that sells it. Wrkbase, my own SaaS platform, is the proof.',
    row: 'Web products built from scratch when WordPress is the wrong tool. Wrkbase, my own SaaS platform and its website, is the example.',
    chips: ['SaaS platforms', 'Dashboards', 'Marketing sites', 'Free tools', 'APIs'],
    problemTitle: 'Some products outgrow WordPress on day one',
    problem:
      'WordPress is the right tool for a content site or a store. It is the wrong one when the product is the software itself: accounts with different roles, live data, rules about who can see and do what. Forcing that into plugins gives you something slow and fragile. I have built that kind of product end to end. Wrkbase is a team management platform I designed and built myself, with tasks, automatic time tracking, attendance, leave, payroll, team chat, role-based access and an audit log.',
    includes: [
      { name: 'A first version you can sell', text: 'The core of the product built first and built properly, so real users can start on it.' },
      { name: 'Accounts, roles and permissions', text: 'Who can see and do what, decided up front and logged.' },
      { name: 'Dashboards and reporting', text: 'The numbers a team needs on one screen, as in the Wrkbase dashboard.' },
      { name: 'Marketing sites that load instantly', text: 'Static, hand-built sites with no page builder. This site and the current Moneybag website are built this way.' },
      { name: 'Free tools and calculators', text: 'Small tools that bring search traffic and show what the product does. Wrkbase has overtime, PTO, time card and cost calculators.' },
      { name: 'Help centers and documentation', text: 'The pages that answer questions before a customer has to ask.' },
    ],
    proof: ['wrkbase', 'moneybag'],
    faq: [
      { q: 'When is WordPress the wrong tool?', a: 'When the product is the software rather than the content. If people sign in, have different roles and work with live data all day, a custom build is faster, safer and cheaper to change. For a marketing site, a blog or a store, WordPress is usually still the right choice.' },
      { q: 'Can you build a SaaS product from an idea?', a: 'Yes. I built Wrkbase from an idea to a working platform: sign-in first, then tasks with automatic time tracking, then attendance, leave, payroll and an AI agent. I start with the one thing users must be able to do and build outward from there.' },
      { q: 'Do you build the marketing website as well?', a: 'Yes. I built the Wrkbase website alongside the product: feature pages, pricing, comparison pages, free tools, a blog and a help center. One person building both keeps the product and the site saying the same thing.' },
      { q: 'How fast will a custom-built site be?', a: 'A static, hand-built site ships very little code, so it loads almost instantly. This site is built that way, and you can test it yourself with Google PageSpeed Insights.' },
    ],
  },
  {
    slug: 'ai-development',
    name: 'AI agents and automation',
    focus: 'AI agent development',
    title: 'AI Agent Development & AI Automation | Sakib Islam',
    description:
      'AI agent development for web products: agents that act with your approval, LLM API integration, WordPress AI chatbots and workflow automation.',
    h1: 'AI agent development for products that need to act, not just chat.',
    lead: 'AI built into your product or site so it does real work: agents that take actions, chatbots that answer from your content, and automations that remove the repeat tasks.',
    row: 'AI agents that take real actions, LLM APIs wired into your product, chatbots for WordPress and automations that remove repeat work.',
    chips: ['AI agents', 'LLM API integration', 'WordPress chatbots', 'Workflow automation'],
    problemTitle: 'A chat box bolted on is not an AI product',
    problem:
      'Adding a chat window is easy. Making AI do something useful and safe inside a real product is the hard part: it needs the right data, clear limits and a record of what it did. I built this into Wrkbase. Its agent plans a piece of admin work, shows each step, waits for approval, then carries it out, and every action is logged. When the agent kept reporting itself unavailable, the API and the model were fine. I traced it to the trigger and a render delay, and fixed it there.',
    includes: [
      { name: 'AI agents inside your product', text: 'Agents that plan a task, show the steps, wait for a yes and then act, with a full log.' },
      { name: 'LLM API integration', text: 'Models such as OpenAI and Claude connected to your site or product for summaries, drafting, search and support.' },
      { name: 'AI chatbots for WordPress', text: 'A chatbot on your WordPress or WooCommerce site that answers from your own pages and products.' },
      { name: 'Workflow automation', text: 'Repeat work handed to automations with AI steps, using tools such as n8n.' },
      { name: 'Guardrails', text: 'Approval steps, permissions and audit logs, so the AI cannot do what a person in that role could not.' },
      { name: 'Debugging AI features', text: 'When an AI feature fails in production, finding out whether it is the model, the API, the trigger or the interface.' },
    ],
    proof: ['wrkbase'],
    faq: [
      { q: 'What is an AI agent?', a: 'An AI agent is software that uses a language model to carry out a task, not only to answer a question. It reads the situation, plans steps and takes actions through the tools it is allowed to use. In Wrkbase the agent does admin work after the user approves each plan.' },
      { q: 'Can you add AI to an existing WordPress site?', a: 'Yes. The usual starting points are a chatbot that answers from your own content, AI-written drafts or summaries inside the admin, and automations that move form or order data without anyone copying it by hand.' },
      { q: 'Is it safe to let an AI agent take actions?', a: 'It is when the limits are built in. The agent should only have the permissions its user has, show what it plans to do, wait for approval on anything that matters and log every action. That is how the Wrkbase agent works.' },
      { q: 'Which AI models do you work with?', a: 'I integrate language models through their APIs, including OpenAI and Claude. The right one depends on the task, the cost per request and how fast the answer has to arrive, so I choose per feature rather than per project.' },
    ],
  },
];
