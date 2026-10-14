# 06. Implementation, QA and launch checklist

Date: 15 Oct 2026. Covers the rebuild approved in Claude Design (canvas: claude.ai/artifact/9tWZ84xUiBXZzz5ycqfVmd).

## What changed

| Area | Change | Files |
|---|---|---|
| Theme | Violet-tinted black, ivory text, amethyst accent; ivory buttons. Tokens only, so every page follows | `src/styles/global.css` (`:root`), `src/layouts/Base.astro` (theme colour, dot field colours) |
| New layouts | Home, agency, maintenance, contact, blog styles | `src/styles/pages.css` |
| Home | Portrait hero, two paths, service bento, work mosaic, About + experience timeline, agency pipeline, motto, price strip, recommendations slider, blog teaser, Connect | `src/pages/index.astro` |
| New pages | `/white-label-wordpress-development/`, `/wordpress-maintenance/`, `/contact/`, `/blog/`, `/blog/<post>/` | `src/pages/*.astro`, `src/pages/blog/` |
| Blog system | Markdown posts in `src/blog/*.md` (frontmatter documented in `src/blog.js`), covers drawn from the subject (`src/components/BlogCover.astro`). Two first posts | `src/blog.js`, `src/blog/` |
| Prices | One source, approved 14 Oct: care $149/mo, care + dev $299/mo, fix $150, speed $450, build $2,500, agency $35/h or $1,200/site | `src/prices.js` |
| Contact | Business/agency switch, optional fields, server-confirmed success only, email/WhatsApp fallback | `src/pages/contact.astro`, `src/scripts/contact.js`, `public/lead.php` |
| Navigation | Services menu (maintenance first), For agencies, Work, About, Blog, CTA; new phone menu (there was none under 861 px) | `src/layouts/Base.astro` |
| AI page | Merged into Custom development; `/ai-development/` 301s there | `src/services.js`, `public/.htaccess` |
| Case studies | "Relevant if…" line and a short chip per study | `src/work/*.md`, `src/pages/work/[slug].astro` |
| Service pages | Starting price under the hero (speed, development); CTA to the contact page | `src/pages/[service].astro` |
| Music | New generated ambient bed (minor 9 pads, sub bass, echoing arpeggio, reverb, no drums); set up on arrival | `src/layouts/Base.astro` |
| Removed | Audit console, old WhatsApp CTA band, AI OG image | `Audit.astro`, `audit.js`, `Cta.astro`, `og-ai-development.jpg` |
| `llms.txt` | Rewritten for the new services, prices, blog and contact | `public/llms.txt` |

## Test results (15 Oct 2026)

| Check | Result |
|---|---|
| `npm run build` + SEO gate | **Passed**: 18 pages, 0 problems |
| `node scripts/seo-audit.mjs` | **Passed**: no problems (blog index and contact exempt from the 300-word rule) |
| Lighthouse mobile, production build: `/`, agency, maintenance, blog post, contact | **99 / 100 / 100 / 100** each (performance / accessibility / best practices / SEO); LCP 1.8 to 2.1 s; CLS 0 |
| Desktop walkthrough in Chrome (home, agency, maintenance, contact, blog index, post, case study, service page) | **Passed** after fixes: hero line length, post cover height, typing effect limited to section headings, two spacing gaps |
| Phone width (390 px, in a frame) | **Passed**: no horizontal overflow on home and agency pages; phone menu opens and lists every page |
| Contact form: empty submit | **Passed**: three fields flagged, focus on the first, alert shown |
| Contact form: valid submit without PHP (local preview) | **Passed**: no false success; email and WhatsApp fallback links with the message filled in |
| `lead.php` (local PHP + shim for `mb_substr`): valid agency inquiry with empty optional fields | **Passed**: validation accepted, send failed only for lack of SMTP password (500) |
| `lead.php`: bad email / empty message / wrong origin | **Passed**: 400 / 400 / 403 |
| Browser console on load and after a click | **Passed**: no errors |
| Real email delivery | **Not run**: SMTP password still empty on the server |
| Structured data in Google's Rich Results test | **Not run**: needs the live URL |
| Music audible on landing without any click | **Not possible**: browsers block audio until the first click, tap or key press |

## Known limits and open items

1. **Forms cannot email yet.** Sakib must put the mailbox password in `public_html/sakib/lead-config.php` (`return ['pass' => '...'];`) in Hostinger File Manager. Until then the form offers email/WhatsApp.
2. **Music and accessibility.** Audio that plays for more than 3 seconds without a pause control fails WCAG 2.2 1.4.2. Kept without a control at Sakib's request; a small pause button is the recommended fix.
3. **New pages use the default share image** (`/og.png`). `scripts/og.mjs` makes images for services and case studies only.
4. **Semrush batch 2** (list in `03-keywords.md`) is still to run on the next free quota.
5. **Unconfirmed numbers removed from the home page**: 25+ sites, 12 recommendations, 4 countries and $6K tiles are gone. The $6,000 estimate remains only inside the TubeOnAI case study, labelled as an estimate.

## Launch checklist (needs Sakib's go-ahead)

- [ ] `npm run build` passes (done locally 15 Oct)
- [ ] Upload `dist/` contents to `public_html/sakib/` on Hostinger, keeping `lead-config.php` on the server (not in `dist/`)
- [ ] Check `/ai-development/` redirects to `/custom-web-development/`
- [ ] Open `/`, `/white-label-wordpress-development/`, `/wordpress-maintenance/`, `/contact/`, `/blog/` live on a phone
- [ ] Fill the SMTP password, send one test inquiry of each type, confirm both emails arrive
- [ ] Submit `sitemap-index.xml` again in Search Console and Bing; request indexing for the new pages
- [ ] Run Rich Results test on the agency and maintenance pages
- [ ] Rollback: the previous build is the `sakib-site-3.zip` upload bundle and the git commit before this one

## Measuring the ICP and keyword bets (after launch)

- Every inquiry email now states business or agency, the need or type of work, timeline, budget and the page it came from. Keep a simple tally per month.
- Search Console, 8 to 12 weeks after launch: impressions and clicks for the white-label, maintenance and speed clusters (`03-keywords.md`).
- A CTA click is not a lead; count only emails received.
- If agency inquiries stay at zero after 12 weeks while maintenance inquiries arrive, shift the home page order toward businesses (and the reverse).
