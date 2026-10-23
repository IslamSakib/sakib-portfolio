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

## Step 2: ten new posts (platform-neutral first), volumes measured
Semrush US, 23 Oct 2026 (Access-2, smg1.digitavision.com). Volume / KD. Topics with no volume were dropped (hacked and site-down variants are covered by lifting the existing hacked-site post).

| # | Post | Pillar and link target | Volume / KD | Note |
|---|---|---|---|---|
| 1 | Payment gateway integration: how it works and where it fails | Web application, API integration | 1,300 / 35 | Strong fit: I wrote the Moneybag gateway plugin |
| 2 | Website audit checklist: 25 things to check before you pay for a redesign | Custom website, redesign and speed | 1,300 / 33 | Checklist posts earn links |
| 3 | Landing page best practices: what to put on one page | Custom website, landing page design | 1,600 / 41 | Pairs with the landing page vs website post |
| 4 | How much does a website cost? (rework the existing custom website cost post to also answer this) | Custom website | 2,900 / 58 | Lift the existing post, do not duplicate |
| 5 | How to improve Core Web Vitals: LCP, CLS and INP in plain words | Custom website, speed optimization | 480 / 32 (core web vitals 6,600 / 82 is too hard) | Uses the measured TubeOnAI and Mayabee results |
| 6 | How to build an MVP, and MVP vs prototype | Web application, MVP | 210 / 40 and 140 / 22 | One post for both |
| 7 | Custom software vs off the shelf: build or buy? | Web application, dashboards | 210 / 31 and 140 / 12 | Decision guide for the spreadsheet audience |
| 8 | AI agents for business: what they can safely do | Web application, AI integration | 210 / 39 | Backed by the Wrkbase agent |
| 9 | How to hire a web developer: full stack vs designer, freelancer vs agency | Role pages | hire full stack developer 880 / 22, web developer vs web designer 170 / 36, how to hire 40 / 17 | One post for the cluster |
| 10 | Why is my website slow? 7 causes and how to fix each | Custom website, speed optimization | 140 / 29 | Low volume, high relevance, links to the speed fix |

Order by effort against payoff: 1, 2, 3, 9, 5, then 4, 6, 7, 8, 10. Each post: 700 to 1,100 words, a table or checklist, 3 to 4 FAQs, one real example in two sentences, one or two cited outside sources, links to the service page and two related posts.

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
