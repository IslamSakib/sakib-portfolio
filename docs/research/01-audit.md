# 01. Audit of the current site and repository

Date: 14 Oct 2026. Site: https://sakib.mywrkbase.com. Repo: `portfolio/` (Astro 7, static, plain CSS, 13 pages).

## How this was checked

| Check | Result | Status |
|---|---|---|
| `npm run build` (includes `scripts/seo-check.mjs`) | 13 pages, 0 problems | Run, passed |
| `node scripts/seo-audit.mjs` | No problems. Service pages ~1,950–2,050 words, case studies 700–990 | Run, passed |
| Lighthouse mobile, home, local production build | Performance 98, Accessibility 100, Best practices 100, SEO 100. LCP 2.3 s, TBT 0 ms, CLS 0.002, 606 KiB | Run |
| Lighthouse flags under 0.9 | Images not responsive / not modern format (est. 340 KiB), main-thread work 3.9 s, DOM 1,099 nodes | Run |
| Live site read in Chrome as a buyer (desktop) | Home walked end to end | Run |
| Mobile and tablet walkthrough, keyboard pass | | Not yet run: done in QA (Phase 9) |
| Real lead submission | SMTP password still empty on the server, so forms fall back to WhatsApp | Known, not testable yet |

## 1. What works and should be kept

- **Speed and technical SEO.** Fast static build, a clean audit, structured data per page type, a sitemap, AI crawlers allowed, and an SEO gate in the build. Few freelance portfolios have this.
- **Real proof.** Real screenshots, live links to each client site, real client logos taken from their sites, and recommendations quoted word for word with links to LinkedIn.
- **Case studies with substance.** Brief → cause → fix → result, plus a FAQ each. TubeOnAI (site kept going down) is the strongest problem story.
- **Content as data.** `services.js`, `work/*.md`, `reviews.js`, `site.js`. New pages are cheap to add.
- **Lead endpoint built safely.** Same-site check, size caps, honeypot, server-side email/phone validation, password kept outside the web root.

## 2. Generic, unconvincing or inconsistent

- **Fake terminal patterns** in the services block (`$ sakib --services`, `$ sakib open …`) and the `audit-agent` console. These read as developer theatre to a non-technical buyer and are on the brief's list of things to avoid. They also hide the service names behind command slugs (`speed-and-rescue`).
- **Stat tiles carry decoration and unverified numbers.** "25+ client websites", "12 recommendations" (6 are shown), "4 countries" (only one target market, the US, has a named client; no CA or AU), and "$6K saved (estimate)". Sakib hasn't confirmed any of these.
- **Positioning is narrow and only half-tested.** "for SaaS and AI startups" fits Tabby and TubeOnAI. But the client strip is mostly small businesses (pizza, lighting, school supply, auto), and agencies, the audience he engages most on LinkedIn, get no message at all.
- **Seven case studies of very different weight.** Piola Pizza and Pixmge are listed alongside Tabby with no signal of who each one is relevant to.

## 3. Friction for a prospective client

- **No email address and no form that sends.** The only working contact routes are WhatsApp (a Bangladeshi number) and LinkedIn. Many US, UK, CA and AU business buyers and most agencies expect email or a booking link, and some won't use WhatsApp for work.
- **No prices, no engagement models, no availability.** He has approved stating starting prices, maintenance plans, a 24-hour reply for urgent fixes, and overlap with US/UK hours. None of this is on the site yet.
- **No path for agencies.** There's nothing on white-label work, NDAs, handoff, or working inside an agency's tools.
- **Music starts on the first click with no way to stop it.** This fails WCAG 2.2 criterion 1.4.2 (audio that plays more than 3 seconds needs a pause control). It's also a risk with buyers who open the site in an office or in a meeting. Sakib asked for no off switch on 11 Oct; this audit recommends adding a pause control, and the decision is his.

## 4. Services that are hard to understand

- Service names are mixed: "Speed and rescue" in the services list, "WordPress speed optimization" on its page, `speed-and-rescue` in the fake terminal.
- Maintenance is a real, provable service (he still maintains Tabby) but appears only as one FAQ line. WooCommerce is folded into WordPress development, although the store work (Moneybag gateway, Piola Pizza) is distinct proof.

## 5. Proof missing or underused

- Tabby founder's recommendation and the ongoing maintenance relationship: the strongest proof for both maintenance retainers and agency reliability, currently shown only in the general reviews row.
- Shamsi Nur (Musemind, a design agency): "freelance Elementor developer for three months, highly responsive … delivers on time". **This is direct proof of agency subcontracting** and it isn't on the site. Musemind is a design agency, which matches the agency ICP.
- Process proof agencies need (how he receives designs, where work happens, how handoff notes look) isn't shown.

## 6. SEO opportunities missed

- No page targets agency or white-label searches. Semrush shows "white label wordpress development" at 590/month in the US with KD 10% (14 Oct 2026). Details are in `03-keywords.md`.
- No page targets maintenance or WooCommerce intents.
- The previous keyword choices had no volume or difficulty data. Phase 3 replaces them.

## 7. Technical and accessibility issues

| Issue | Severity | Fix |
|---|---|---|
| Music without a pause control (WCAG 1.4.2) | High (a11y) | Add a small pause button, or start music only after an explicit "play" choice. Needs Sakib's decision |
| Work screenshots served as large PNGs | Medium (perf) | Use Astro `<Picture>` with `formats={['avif','webp']}` and `widths`/`sizes` |
| Reviews row duplicated 4× in the DOM | Low | Copies are `aria-hidden`, which is fine for screen readers. Trimming to 2 copies reduces DOM size |
| Contact form can't email | High (business) | Sakib fills the SMTP password in `lead-config.php` on Hostinger |
| `sakib-site-*.zip` (21 MB) and `cut.mjs` in repo root | Low | Remove from the repo; keep outside it if still wanted |

## 8. Keep, change, add, remove

| Keep | Change | Add | Remove |
|---|---|---|---|
| Visual system: palette, type, spacing, radii | Hero message: route businesses and agencies | Agency partner page | Fake terminal UI on services |
| Case study template and FAQs | Services list as plain named rows | Maintenance plans page (if keywords confirm) | Unconfirmed stat numbers |
| Real logos strip, verbatim reviews | Contact: add email and a form with a business/agency choice | Prices and engagement models | Repo zips |
| SEO gate and audit scripts, JSON-LD | Images to responsive AVIF/WebP | Availability: hours overlap, 24 h urgent reply | |
| Lead endpoint security | Case studies tagged by audience | Musemind recommendation (agency proof) | |
