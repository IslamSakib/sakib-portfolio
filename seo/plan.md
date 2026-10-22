# SEO plan: sakib.mywrkbase.com
Started 16 Oct 2026 · Semrush db: US (UK/AU/CA from the global split) · Semrush access: shared Digitavision Access-5 (counter 1/1,000 at start)

## Business
- **Offers:** WordPress maintenance and care plans, speed optimisation, custom WordPress/WooCommerce development, and white-label WordPress for agencies. Custom web development is secondary.
- **ICPs** (approved 14 Oct, `docs/research/02-icp.md`):
  - **Direct (D+G):** US/UK/AU companies whose WordPress site earns revenue, with no senior WP developer. They arrive with a problem: slow, broken, relaunch, or the developer has gone. They land on `/wordpress-maintenance/`, `/wordpress-speed-optimization/` or `/wordpress-development/`.
  - **Agency (B):** design and marketing agencies of 2–25 people that need white-label builds and care. They land on `/white-label-wordpress-development/`.
- **Markets:** US first, then UK, AU, CA. Remote, with no local pages.
- **Owner capacity:** solo developer working a full-time job, so assume 2 content pieces a week.

## Current state
- Live since about 15–16 Oct 2026; sitemap holds 35 URLs (6 service/landing pages, 7 case studies, 20 blog posts, home, contact).
- Existing research reused: `docs/research/01-audit.md` to `06-qa-launch.md`, which cover the ICP, 28 measured keywords, SERP reads, the page map and blog clusters.
- Built-in gates: `scripts/seo-check.mjs` (runs in `npm run build`) and `scripts/seo-audit.mjs`.

## Competitors (provisional, from the 14 Oct SERP reads; confirmed in phase 1)
| Domain | Type | Why |
|---|---|---|
| wpjohnny.com | search, solo | ranks for speed optimisation service as a solo developer |
| onlinemediamasters.com | search, solo | speed service with priced packages |
| wpbuffs.com | search + business | maintenance plans, speed |
| e2msolutions.com | search + business | white-label WordPress for agencies |
| codeable.io | business | where direct buyers and agencies hire WP experts |

## What this run adds (the gaps in the existing research)
1. Semrush baseline for the site and the competitor domains (never pulled before).
2. Competitor keyword pulls (the keyword gap): what the solo and white-label competitors rank for that the site doesn't target.
3. Volumes for the keywords still marked `?` / `n/a` (batch-2 list and the 7b posts).
4. Re-scored priorities using business, ranking and traffic potential → G1.

## Phases
| # | Phase | Semrush cap | Output | Status |
|---|---|---|---|---|
| 1 | Research | 25 (used 11) | seo/01-research/ | done |
| 2 | Strategy | 15 (used 0) | seo/02-strategy/ → **G1** | done (approved 16 Oct) |
| 3 | Architecture | 10 (used 0) | seo/03-architecture/ → **G2** | done (approved 16 Oct) |
| 4 | Content planning | 10 (used 1) | seo/04-content/ | done |
| 5 | Copywriting | 0 | src/blog, src/pages | done |
| 6 | On-page | 0 | seo/06-on-page/ | done |
| 7 | Technical | 0 | seo/07-technical/ → **G3** | done (passed 16 Oct) |
| 8 | Publishing | 0 | seo/08-publishing/ | done (16 Oct) |
| 9 | Authority | 8 (used 0 beyond the gap pull) | seo/09-authority/ | drafts ready, nothing sent |
| 10 | Tracking | 5 (used 1) | seo/10-tracking/ | baseline done |
| 11 | Optimization | 5 | seo/11-optimization/ | queue written, review 13 Nov |

## Gates
- **G1** after Strategy: approve the target keywords.
- **G2** after Architecture: approve the URL plan, merges and redirects.
- **G3** before go-live: approve the deploy, indexing submissions and outreach sends.

## Never without a yes
Deploy · email/DM sends · third-party form submits. In Semrush, read-only analytics only: never touch other users' projects.
