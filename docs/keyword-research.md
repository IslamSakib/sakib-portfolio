# Keyword research and on-page spec

Researched 11 Oct 2026 with free tools only: Google Trends (worldwide, past 12 months) and Google autocomplete.
Trends numbers are relative interest on a 0 to 100 scale inside each comparison. They are not monthly search volumes, and numbers from different comparisons cannot be compared with each other.

## 1. Google Trends

Comparison A (average interest over 12 months):

| Term | Average | Note |
|---|---|---|
| wordpress developer | 42 | Peaked at 100 in May 2026. Strongest interest from Pakistan, Nigeria, Nepal, Sri Lanka, Morocco, which is job-seeker traffic as much as buyers |
| ai agent developer | 21 | Rose from about 10 to 47 between Oct 2025 and Jun 2026. Rising related terms are agent products and certifications |
| woocommerce developer | 5 | Rising: "shopify to woocommerce" +110% |
| wordpress speed optimization | 2 | Rising: "speed up wordpress" +80%, "database optimization" +250% |
| ai chatbot for wordpress | 1 | Too little data for related queries |

Comparison B:

| Term | Average | Note |
|---|---|---|
| ai automation agency | 42 | Rising: "n8n" +90%, "workflow automation" +70%, "ai workflow automation" +60% |
| hire wordpress developer | 4 | Top regions include Netherlands, United States, United Kingdom, India. Rising: "wordpress developer for hire" +160% |
| wordpress maintenance services | 4 | |
| freelance wordpress developer | 2 | Rising: "freelance wordpress developer london" +90% |
| custom wordpress plugin development | 1 | |

Comparison C:

| Term | Average | Note |
|---|---|---|
| core web vitals | 49 | Rising: "page speed" +200%, "cls core web vitals" +100%, "lcp" +90%. Informational intent |
| figma to wordpress | 3 | Rising terms are tools, not services |
| fix wordpress site | 2 | |
| saas mvp development | 1 | |
| wordpress speed optimization service | 0 | Real phrase in autocomplete, tiny volume |

## 2. Google autocomplete (the wording people type)

- hire wordpress developer: + india, usa, uk, and many city names
- freelance wordpress developer: + uk, london, near me, jobs
- wordpress speed optimization: service, plugin, expert, without plugin, checklist
- wordpress speed optimization service: "wordpress performance optimization services", "wordpress page speed optimization service"
- fix wordpress site: "fix slow wordpress site", "fix hacked wordpress site", "fix my wordpress site"
- wordpress site keeps going down: also "wordpress website keeps crashing"
- custom wordpress plugin development: + services, company
- woocommerce developer: "woocommerce developers for hire", near me
- wordpress developer bangladesh: "best wordpress developer in bangladesh", "professional wordpress developer in bangladesh"
- ai agent developer: mostly jobs, salary, course. "hire ai agent developer", "hire dedicated ai agent developers"
- ai chatbot for wordpress: + website, with openai, and woocommerce, plugin, free
- ai automation agency: + for small businesses, pricing, services
- saas mvp development: + company, cost
- wordpress maintenance: + services, plans

## 3. What this means

1. "WordPress developer" is the only head term with real interest, but it mixes job seekers with buyers. The home page targets it, qualified with who he serves, and the buying variants ("hire", "freelance") go in the supporting copy.
2. Speed terms are small as service searches but "Core Web Vitals" is large and informational. The speed page targets the service phrase and answers Core Web Vitals questions (LCP, CLS, INP) so it can also be found and cited for those.
3. AI is where interest is growing fastest. "AI agent" and "AI automation" both deserve a place; the AI page targets agent development and covers automation (n8n) and WordPress chatbots as sections.
4. Problem phrases ("WordPress site keeps going down", "fix slow WordPress site") have low volume but the searcher has an urgent problem and money to fix it. The TubeOnAI case study and the FAQ target them directly.
5. "WordPress developer Bangladesh" phrases are low competition; location is stated plainly on the home page and in structured data.

## 4. Page map

Rule for every page: the focus keyword appears in the meta title, the meta description and the H1. Titles are 60 characters or fewer, descriptions 155 or fewer. `scripts/seo-check.mjs` enforces this on every build.

| Page | URL | Focus keyword | Supporting phrases |
|---|---|---|---|
| Home | `/` | WordPress developer | hire WordPress developer, freelance WordPress developer, WordPress developer Bangladesh, full-stack developer for startups |
| WordPress development | `/wordpress-development/` | custom WordPress development | custom WordPress plugin development, WooCommerce developer, Figma to WordPress, WordPress maintenance |
| Speed optimization | `/wordpress-speed-optimization/` | WordPress speed optimization | Core Web Vitals, fix slow WordPress site, LCP, CLS, INP, page speed |
| Custom development | `/custom-web-development/` | custom web development | SaaS MVP development, web app developer, full-stack developer |
| AI development | `/ai-development/` | AI agent development | AI automation, LLM integration, AI chatbot for WordPress, n8n |
| Tabby | `/work/tabby/` | Figma to WordPress | SaaS marketing website, Core Web Vitals |
| TubeOnAI | `/work/tubeonai/` | WordPress site keeps going down | cache plugin conflict, fix slow WordPress site |
| Moneybag | `/work/moneybag/` | custom WordPress plugin | payment gateway, WooCommerce |
| Wrkbase | `/work/wrkbase/` | SaaS development | AI agent, custom web development |
| Open Alliance Learning | `/work/open-alliance-learning/` | WordPress LMS | LearnDash, online course website |
| Piola Pizza | `/work/piola-pizza/` | restaurant website | online ordering, WordPress |
| Pixmge | `/work/pixmge/` | agency website | WordPress, image editing service site |

The exact titles, descriptions and H1s live with each page's content (`src/pages/index.astro`, `src/services.js`, `src/work/*.md`), so there is one source for each.
