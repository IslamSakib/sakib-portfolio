# Authority plan: next 10 posts and link building (23 Oct 2026)

Rules: a post answers a problem or a buying question. Projects appear only as one or two sentences of proof, linked to the case study. No "how I built X" posts (those are case studies in `/work/`). One strong post every one or two weeks beats several thin ones. Each post links to its service page and to two related posts, and its service page links back (see `guides` in `src/children-*.js`).

## What the data says
Search Console, 28 days to 21 Oct: 878 impressions, 2 clicks, average position 65.8. Impressions are almost all WordPress problem searches, at positions 45 to 90:
- "check if my wordpress site is hacked" and 4 close variants: about 185 impressions combined, position 69 to 84 (post: how-to-check-if-wordpress-site-is-hacked)
- "outsource wordpress development" and variants: about 110, position 52 to 98 (post: outsource-wordpress-development)
- "white label wordpress maintenance" and variants: about 100, position 58 to 88
- "woocommerce slow / checkout slow / add to cart slow": about 100, position 44 to 80
- "wordpress update broke my site", "plugin conflict", "why is wordpress so slow": about 60 each, position 46 to 76
Semrush volumes already pulled (US, KD in brackets) are in `seo/_data/semrush-service-keywords-20261023.md`.

## Step 1: lift what already gets impressions (2 to 3 weeks, before new posts)
Positions 45 to 90 are on page 5 to 9. These posts need to become the best answer, not just exist.
1. how-to-check-if-wordpress-site-is-hacked: add a step-by-step list of the checks with exact places to look, a screenshot-free table of warning signs, and a short "what to do next" with a link to /wordpress-development/wordpress-malware-removal/.
2. outsource-wordpress-development, white-label-wordpress-maintenance, woocommerce-slow, wordpress-update-broke-site: add a worked example in each (one real cause and fix, with numbers), a comparison table, and FAQ questions taken from the Search Console queries above, worded as people type them.
3. Re-check positions in Search Console two weeks after each update.

## Step 2: ten new posts (platform-neutral first)
Volumes marked "check" were not measured yet: the Semrush access dropped out mid-pull. Pull them from the Digitavision launcher before writing, and drop any with no volume.

| # | Post (working title) | Pillar and link target | Why | Volume |
|---|---|---|---|---|
| 1 | Why is my website slow? 7 causes and how to fix each | Custom website, speed optimization | Many people search it, and it ties to a measured result | check |
| 2 | How much does an ecommerce website cost? | Custom website, ecommerce | Buying question, one of the biggest pillar keywords (ecommerce website development 5,400) | check |
| 3 | Custom software vs off-the-shelf: how to decide | Web application, dashboards | Decision question for the "outgrew spreadsheets" audience | check |
| 4 | How to hire a full stack developer (and what to ask) | Role pages | hire full stack developer 880 / KD 22 | 880 |
| 5 | Freelance developer vs agency for a web app | Web application | Hire-intent, matches the existing WordPress version of this post | check |
| 6 | My website was hacked: what to do in the first hour | Custom website, repair | Same intent as the WordPress hacked-site post, platform-neutral | check |
| 7 | How to write a project brief a developer can quote from | All pillars, contact | Reduces back-and-forth, links to the quote form | check |
| 8 | Website maintenance checklist (any platform) | Custom website, maintenance | website maintenance 8,100 / KD 50, pairs with the cost post | 8,100 |
| 9 | What an AI agent can safely do inside your product | Web application, AI integration | ai integration services 1,900 / KD 43, backed by first-hand build | 1,900 |
| 10 | Core Web Vitals in plain words: LCP, CLS and INP | Custom website, speed optimization | Teaches the numbers used across the site | check |

Order: 1, 6, 4, 2, 8, then 3, 5, 7, 9, 10. Each post: 700 to 1,100 words, a table or checklist, 3 to 4 FAQs, one real example in two sentences, one or two cited outside sources, links to the service page and two related posts.

## Step 3: links and mentions (the bigger gap)
The site has very few links from other sites, which is why impressions are at positions 50 to 90. Posts alone will not fix that.
- Directory profiles: Clutch, GoodFirms, and the Upwork and Fiverr profile links where the site can be listed.
- Wrkbase launch: Product Hunt (v2 gallery images already prepared), plus Indie Hackers and relevant Reddit communities where self-promotion is allowed.
- LinkedIn: each new post shared as a short post (use the linkedin-writing rules), linking to the article.
- Answer questions where they are asked (Reddit, Stack Overflow, Indie Hackers, Quora) with a useful answer, then a link only where it genuinely helps.
- Guest posts: pitch two small-business or SaaS blogs per month with one of the post topics above.
- Open source: publish one small useful tool or plugin on GitHub with a README linking the site.
- Client and partner links: ask clients with a public site (Mayabee, Tabby, TubeOnAI, Moneybag, Open Alliance Learning) for a "built by" credit link in the footer.
- Entity consistency: same name, photo and description on the site, LinkedIn, GitHub, Wrkbase and directories.

## Measure
Search Console every two weeks: impressions and average position for the Step 1 posts, indexed pages, queries for each new post. Authority shows first as rising impressions at positions 11 to 30, then clicks. Do not judge before 6 to 8 weeks.
