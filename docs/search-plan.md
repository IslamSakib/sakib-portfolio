# Search plan and site structure

> Superseded on 14 Oct 2026 by docs/research/ (ICP, Semrush keyword data and the page map). Kept for history.

Written 10 Oct 2026. Covers keyword research, the SEO, AEO and GEO plans, and the page structure.

## 1. Keyword research

Method: I searched each group of phrases and looked at who ranks today. I have no keyword volume tool connected, so priorities are based on intent and on how beatable the current results are, not on search counts.

| Phrase group | Who ranks now | Verdict |
|---|---|---|
| "WordPress speed optimization service" | Established service companies (WP Fix It, FixRunner and similar) | Too competitive as a main target for a new one-person site |
| "fix WordPress white screen of death" (to hire) | Fiverr gigs from $15, freelancer marketplaces | Commodity pricing; don't compete on the hire phrase |
| "Figma to WordPress developer freelance" | Marketplaces (arc.dev) and job boards | Owned by marketplaces; use as a supporting phrase only |
| "white label WordPress developer for agencies" | Agencies and vendor "top 10" lists | Crowded; revisit later with a dedicated page |
| "WordPress developer for SaaS startup" | A blog article and a few Upwork listings | The weakest results of all five. This is the opening |

What this means:

- **Position the site on "WordPress developer for SaaS and AI startups".** The competition is thin and your two best projects (Tabby, TubeOnAI) are exactly that.
- **Win specific problems through case studies.** A page that describes one real problem in detail, with numbers, can rank for long phrases and be quoted by AI assistants where a service page cannot.
- **Own your name.** The most important search is someone checking you after a pitch. "Sakib Islam" is a common name, so every page pairs it with "WordPress developer".
- **Be realistic about timing.** Search is the slow channel. For the first months the site's main job is to convince visitors you send to it from pitches and LinkedIn.

## 2. Page map

| Page | Address | Main phrase | Supporting phrases |
|---|---|---|---|
| Home | `/` | WordPress developer for SaaS and AI startups | freelance WordPress developer, WordPress performance, Core Web Vitals, Figma to WordPress |
| Tabby | `/work/tabby/` | Figma to WordPress for a SaaS product | SaaS marketing website, website relaunch without losing SEO |
| TubeOnAI | `/work/tubeonai/` | WordPress site keeps going down | cache plugin conflict, leftover plugin files, reduce server load |
| Oxford International School | `/work/oxford-international-school/` | school website more enquiries | mobile enquiry form, WordPress load time |
| Moneybag Payment Gateway | `/work/moneybag-payment-gateway/` | custom WooCommerce payment gateway plugin | custom WordPress plugin development |

Titles and headings:

| Page | Title tag | Main heading |
|---|---|---|
| Home | Sakib Islam \| WordPress Developer for SaaS and AI Startups | I build fast WordPress sites for SaaS and AI products. |
| Tabby | Tabby: Figma to WordPress for an AI Bookkeeping Product | From Figma to a live platform for an AI bookkeeping product |
| TubeOnAI | TubeOnAI: Fixing a WordPress Site That Kept Going Down | The site kept going down because of its own speed plugins |
| Oxford International School | Oxford International School: 40% More Enquiries | 40% more enquiries from a school website |
| Moneybag | Moneybag: Custom WooCommerce Payment Gateway Plugin | A payment gateway platform built as a custom plugin |

Descriptions are written with each page, 150 characters or fewer, each containing the main phrase and one number.

## 3. SEO plan

- One main phrase per page, used in the title, the main heading, the first paragraph and the address.
- The home page links to every case study; every case study links back and to the next one.
- Images have descriptive file names, alt text, and fixed dimensions.
- One canonical address per page, a `sitemap.xml`, and a `robots.txt`.
- Structured data: Person and WebSite on the home page; an Article and a BreadcrumbList on each case study.
- Speed is part of the plan: 95 or higher on mobile PageSpeed, with the score shown on the home page.

## 4. AEO plan (being quoted as the direct answer)

- Headings phrased as the question a client would type, followed by a plain answer of 40 to 60 words.
- Every case study follows the same four parts: Problem, Cause, Fix, Result. The numbers appear in the text, not only in images.
- A short FAQ on the home page with FAQPage markup. Planned questions:
  - Can you fix a WordPress site that keeps going down?
  - What does a WordPress speed fix involve?
  - Can you build a WordPress site from a Figma design?
  - How do you measure the result?
  - Do you work with companies outside Bangladesh?
- One more question needs your answer before it goes in: do you offer ongoing maintenance after a project?

## 5. GEO plan (being cited by AI assistants)

- The same facts about you on every page: Sakib Islam, WordPress and full-stack developer, Dhaka, founder of Wrkbase, with links to your LinkedIn profile and mywrkbase.com.
- Every case study is dated and signed, names the client, and gives each statistic with its context ("server load fell by 60% after the caching was rebuilt").
- `robots.txt` allows AI crawlers.
- Once the site is live: add it to your LinkedIn Featured section, link each LinkedIn Project to its case study, and add your profile link to the mywrkbase.com About page.

## 6. Home page sections, in order

1. Hero: the one-line positioning, three proof numbers, and this site's own PageSpeed score.
2. Selected work: the four strongest projects only, each with its headline number.
3. What I do: builds, speed work, rescue work.
4. How an engagement runs.
5. Recommendations: the two you already have on LinkedIn.
6. Also building: a short block on Wrkbase.
7. FAQ.
8. Contact: email and LinkedIn.

## 7. Still needed from you

- The email address to show for contact.
- Whether you offer ongoing maintenance.
- Your photo in Downloads is 400 by 400 pixels. It works at small sizes; a larger original would look sharper.

## 8. Change on 10 Oct: best work only

You asked to show only the best work, so the site has four case studies, not five:

| Kept | Why |
|---|---|
| Tabby | US AI product, the 2.0 launch, and a recommendation from its founder |
| TubeOnAI | AI product; a build and a rescue, with a money figure attached |
| Moneybag Payment Gateway | Fintech; a custom plugin handling real transactions, with a recommendation from a former Moneybag colleague |
| Oxford International School | A large institution and a business result (enquiries up 40%) |

Left out: The7teen, Profit Town Trading, Piola Pizza, Pixmge, and the Wrkbase website (Wrkbase keeps its own short block on the home page).

## 9. Change on 10 Oct: final four case studies

You removed Oxford International School and added the Wrkbase website, and pointed the Moneybag case study at the latest moneybag.com.bd site.

| Page | Address | Main phrase |
|---|---|---|
| Tabby | `/work/tabby/` | Figma to WordPress for a SaaS product |
| TubeOnAI | `/work/tubeonai/` | WordPress site keeps going down |
| Moneybag | `/work/moneybag/` | payment gateway website and custom WooCommerce plugin |
| Wrkbase | `/work/wrkbase/` | SaaS marketing website with free tools and comparison pages |

This replaces the page tables in sections 2 and 8. Wrkbase is now a case study, so the separate "also building" block is dropped.
