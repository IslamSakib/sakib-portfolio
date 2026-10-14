# 02. Ideal customer profiles (ICP), buyer problems and journeys

Date: 14 Oct 2026. Status: **draft for Sakib's check-in** (plan gate before keyword research).

## Method and limits

- **Desk research only.** No buyer interviews were done. Every conclusion is tagged **[V]** verified fact, **[S]** supported inference, **[H]** working hypothesis or **[?]** unknown.
- Sources:
  1. Sakib's own evidence: `docs/content.md`, LinkedIn recommendations, the 10 Oct LinkedIn findings in memory, and the client list in `src/clients.js`.
  2. Semrush Keyword Overview (free plan, US database with its global split by country, 14 Oct 2026), 9 lookups.
  3. Google results pages (US) showing Reddit thread titles and snippets. Reddit itself is blocked for both the browser and fetch tools, so only the snippets Google shows were read.
  4. Vendor pricing pages. These are marketing sources, so they're used for direction only.
- Search demand is one criterion out of seven (10% weight), not the decider.

### Demand evidence used for scoring (Semrush, monthly volume, 14 Oct 2026)

| Keyword | US | UK | AU | CA | KD | CPC (US) | Semrush intent |
|---|---:|---:|---:|---:|---:|---:|---|
| white label web development | 1,000 | 590 | 210 | 90 | 9 | $17.71 | Informational |
| white label wordpress development | 590 | 170 | 20* | 20* | 10 | $4.55 | Informational |
| wordpress maintenance services | 1,900 | 880 | 590 | 260 | 34 | $21.17 | Info + Commercial |
| wordpress speed optimization service | 720 | 210 | 260 | 110 | 18 | $7.43 | Informational |
| wordpress website repair | 210 | 40 | 140 | 20 | 3 | $0 | Informational |
| hire wordpress developer | 1,300 | 480 | 90 | 30 | 21 | $21.20 | Info + Commercial |
| woocommerce developer | 1,600 | 1,300 | 260 | 40 | 50 | $36.10 | Informational |
| custom web application development | 2,400 | 480 | 260 | 320 | 28 | $39.89 | Informational |

\*Read from the country bars on the first lookup; small values are approximate. Intent labels are Semrush's, and Phase 3 checks them against the live results pages. Notable variations: "white label web development services" 720 (KD 13), "woocommerce development agency" 1,300 (KD 31), "hire speed optimization developers wordpress" 720 (KD 11), "wordpress website maintenance services" 1,300 (KD 38).

Main reading: agency (white-label) terms and fix/speed/repair terms combine real volume with low difficulty. WooCommerce head terms are hard (KD 50). Custom web application terms have high CPC (buyers pay) but are owned by companies. **[V]** for the numbers, **[S]** for the reading.

## Candidate ICPs

### A. Small businesses wanting a new site or redesign
- Who: owner-led local and service businesses (restaurants, retail, trades). Sakib's client list is full of these (Piola Pizza, Boss Pizza, Polar Bear Lighting, School Supply) **[V]**.
- Buyer: the owner, budget-led, compares Fiverr, Wix/Squarespace, local agencies **[S]**.
- Problem: credibility and leads. The trigger is an outdated site or a new business.
- Commercial: one-off, low to mid budget, price-shopped. Marketplace prices start very low (Fiverr gigs from $15 seen on 10 Oct) **[V]**.
- Fit: medium. Reach from Dhaka: weak without referrals **[S]**.

### B. Design and marketing agencies without a senior WordPress developer (white-label)
- Who: 2–25 person design, branding and marketing agencies in US/UK/CA/AU that sell websites but design in Figma and outsource the build **[S]**.
- Evidence:
  - r/agency question to "web design agencies (especially those that don't have in-house developers)", whose top answer reads "Took me 3 years to find the perfect outsourced … team" **[V]** (snippet).
  - r/Wordpress, "small web design agency in Québec, Canada … looking to scale up by outsourcing" (45 answers) **[V]**.
  - r/forhire, 2 weeks old: "small web agency … looking for an experienced WordPress developer for a long-term white-label partnership" **[V]**.
  - r/Wordpress answer: "As a white label freelancer, I typically work for smaller agencies who don't have their…" **[V]**.
  - r/marketingagency, Sep 2026: "most common reason you end up firing an outsourced developer? (e.g., breaking tracking pixels, slow load times ruining SEO …)" **[V]**.
- Buyer: agency owner or project lead. Fast, relationship-based decision after a trial project **[S]**.
- Triggers: a signed project with no free developer, a freelancer who disappeared, overflow at peak **[S]**.
- What they fear: missed deadlines, poor communication, the developer contacting the end client, sites that break tracking or SEO **[V]** (snippets).
- Commercial: recurring. White-label vendors sell monthly retainers of about $429–$2,429 for 20–160 hours (WP Web Infotech), and quoted senior hourly rates run $18–45 (India) to $65–90 (Eastern Europe) (KrishaWeb) **[V]** (vendor sources). Price pressure is real.
- Fit: **strong.**
  - Shamsi Nur at Musemind, a design agency, recommended him as their freelance Elementor developer for 3 months **[V]**.
  - Figma-to-WordPress builds for Tabby and TubeOnAI **[V]**.
  - The speed and CWV skill guards against the "slow load times ruining SEO" fear above **[S]**.
- Reach: good. He already sent 100 LinkedIn invites to US/UK/CA/AU agency owners on 12 Oct **[V]**. Agency owners find partners through referrals, communities, r/forhire and search **[S]**.

### C. WooCommerce store owners needing custom work
- Who: stores with real revenue that need payment, checkout or plugin work **[H]**.
- Fit: Moneybag payment gateway plugin and Piola Pizza ordering **[V]**, but there's no measured store revenue result.
- Search: high volume, KD 50 for head terms. US and UK lead **[V]**.
- Commercial: urgent when the checkout breaks, and pays well **[S]**. Shopify competition is growing **[S]**.

### D. Businesses with an existing WordPress site that is slow, broken or unmaintained
- Who: companies (SaaS, B2B services, schools, stores) whose site matters to revenue, with no in-house WordPress developer, often after the original developer left **[S]**.
- Evidence:
  - Recurring "developer went AWOL" discussions (Chris Lema, WP Watercooler, DigitalOcean community: a developer "disappeared with the site 90% done") **[V]**.
  - Search: maintenance 1,900 US + 880 UK + 590 AU; speed service 720 US (KD 18); repair 210 US (KD 3) **[V]**.
- Triggers: site down, a Google traffic drop, a slow-site complaint, a failed update, a hacked site, the developer gone **[S]**. Urgency is the highest of all segments.
- Commercial: a fix project that turns into a maintenance retainer. Market care plans run about $75–$300 a month from freelancers (Sitewired, Codeable via BSS) **[V]** (vendor sources).
- Fit: **strong.** TubeOnAI (downtime fixed, 5 s → 1.5 s) and Tabby (ongoing maintenance, founder recommendation) **[V]**.
- Reach: search (problem phrases), his free audit offer, and outbound speed reports (the StrideQ pilot) **[V]**.

### E. Businesses needing a custom web application
- Who: SMBs needing dashboards or internal tools **[H]**.
- Fit: Wrkbase is his own product, not client work **[V]**, which is a credibility gap for buyers who want client references **[S]**.
- Search: 2,400 US, CPC $39.89, but results are dominated by development companies **[S]** (to be checked against the live results in Phase 3).
- Deal size: large; buyers usually prefer firms over individuals **[S]**.

### F. Software and development agencies needing extra capacity
- Overlaps with B, but these buyers need full-stack, framework-level depth and an established team **[S]**. Proof: BizPartner 360 CEO recommendation (frontend frameworks) **[V]**. Weaker portfolio fit than B.

### G. SaaS and AI startups needing a marketing site (the current positioning)
- Fit: best case studies (Tabby, TubeOnAI, Wrkbase) **[V]**. They pay for speed and launch dates **[S]**.
- Search: "wordpress developer for saas startup" results were weak on 10 Oct, and the phrase has negligible demand **[V]** (old doc). Reach is mainly outbound and LinkedIn.
- This is better treated as a **vertical inside D** (their site already exists and matters to revenue) than as a separate ICP.

## Weighted scoring

Scale 1–5. Weights as in the brief: urgency 20%, willingness to pay 15%, fit 20%, reach 15%, differentiation 10%, repeat work 10%, search 10%. Scores are judgement based on the evidence above. Only the search column is measured.

| ICP | Urgency | Pay | Fit | Reach | Diff. | Repeat | Search | **Weighted** |
|---|---|---|---|---|---|---|---|---|
| D. Existing site slow/broken/unmaintained | 5 | 3 | 4 | 3 | 3 | 4 | 4 | **3.80** |
| B. Agencies, white-label WordPress | 3 | 3 | 4 | 4 | 4 | 5 | 4 | **3.75** |
| G. SaaS/AI startup sites | 4 | 4 | 5 | 3 | 4 | 4 | 1 | 3.75 |
| C. WooCommerce custom work | 4 | 4 | 3 | 2 | 2 | 3 | 3 | 3.10 |
| E. Custom web apps | 3 | 5 | 2 | 2 | 2 | 4 | 3 | 2.95 |
| F. Software agencies | 3 | 4 | 2 | 3 | 2 | 4 | 2 | 2.85 |
| A. Small-business new builds | 3 | 3 | 3 | 2 | 2 | 2 | 3 | 2.65 |

## Recommendation

1. **Primary direct-client ICP: D + G merged.** US/UK/AU companies whose WordPress site brings in revenue (SaaS and AI products first, then B2B service firms and stores) and who have no senior WordPress developer of their own. They arrive with a problem: the site is slow, keeps breaking, needs a relaunch, or the last developer is gone. Offer: fix it at the cause, then keep it healthy on a monthly plan.
2. **Primary agency ICP: B.** Small design and marketing agencies in US/UK/CA/AU that sell WordPress sites but don't have a senior developer. Offer: white-label Figma-to-WordPress builds, fixes and care under the agency's name, with overlapping hours and a 24-hour reply.
3. **Secondary:** C (WooCommerce custom and payment work) as a capability inside both paths. It's proven by Moneybag, but gets no separate hero message.
4. **Deprioritised:** A (price-shopped, hard to reach), E and F (proof gap until there's a client custom-app case study). AI agent work stays as a capability, not an audience.
5. **Why not "everyone"**: A, E and F would each need their own proof and message, and the site can't credibly carry five audiences.

### What would most improve confidence
- 10 conversations with agency owners from his 12 Oct LinkedIn invites. Ask how they find developers today, what they pay, and the last time an outsourced build went wrong.
- Search Console data once the new pages have been live for 8–12 weeks: which problem queries bring impressions.
- Lead source and type logged with every inquiry (the new form fields in Phase 8).

## Buyer problems and journeys (Phase 2)

### Direct client (D+G)

| Stage | What happens |
|---|---|
| Before searching | Something hurts: the site went down, sign-ups dropped, Google flagged Core Web Vitals, a redesign launch is coming, or the old developer stopped replying |
| Stated problem | "My WordPress site is slow / keeps crashing / need someone to maintain it / need a WordPress developer" |
| Real need | One accountable senior person who finds the cause, fixes it without breaking SEO or tracking, and stays reachable |
| Alternatives | Upwork/Fiverr freelancers, Codeable, local agencies, maintenance services (WP Buffs type), the hosting company's support |
| Trust signals | Similar problem solved before, with numbers; a named founder vouching; clear price ranges; fast reply; hours overlap; a written plan before work |
| Reject signals | Vague promises, no prices, slow to reply, only WhatsApp, offshore with no overlap, template portfolio |
| Questions before contact | What will it cost? How fast can you start? Will you break my site or rankings? Do I keep access? Do you do ongoing care? |
| Budget approval needs | A scoped fix list with priority, a fixed price or capped hours, a measurable before/after |

### Agency partner (B)

| Stage | What happens |
|---|---|
| Before searching | A signed project and no free developer, or a bad experience with the last freelancer/vendor |
| Stated problem | "Need a white-label WordPress developer / Figma to WordPress / overflow help" |
| Real need | Builds that match the design, ship on the agency's date, don't contact the client, and come back with clean handoff notes |
| Alternatives | Large offshore white-label shops (monthly retainers), Codeable, r/forhire, Upwork, hiring |
| Trust signals | Process (how designs come in, staging, QA, handoff), NDA, working hours, a paid trial project, other agencies vouching (Musemind) |
| Reject signals | Missed deadlines, poor communication, contacting end clients, slow sites, broken tracking pixels |
| Questions before contact | Rate or per-project price? Turnaround? Which builders (Elementor, Gutenberg, ACF)? Do you sign an NDA? Who supports the site after launch? |

### Problem → service → proof

| Buyer problem | Service | Proof on the site |
|---|---|---|
| Site keeps going down | Fix and stabilise | TubeOnAI case study |
| Site slow, Core Web Vitals failing | Speed optimisation | TubeOnAI (5 s → 1.5 s), Tabby (CWV 90+ at launch) |
| No developer since the last one left | Monthly maintenance plan | Tabby ongoing maintenance + founder recommendation |
| Relaunch without losing rankings | Rebuild / redesign build | Tabby 2.0 relaunch |
| Custom feature or payment flow | Custom plugin / WooCommerce | Moneybag gateway plugin |
| Agency: Figma design to build | White-label build | Tabby and TubeOnAI from Figma, Musemind recommendation |
| Agency: overflow fixes and care | White-label support | TubeOnAI rescue, Tabby maintenance |

## Positioning hypotheses (refined in 04-positioning.md)

- **Direct:** "Your WordPress site makes you money. I keep it fast and working." A senior developer who fixes the cause, shows the before and after numbers, and stays on a monthly plan.
- **Agency:** "Your design, built in WordPress under your name, on your deadline." White-label builds and care, NDA, overlap with US/UK hours, reply within 24 hours.

## Sources

- Semrush Keyword Overview, US database, 14 Oct 2026 (Sakib's free account).
- Google US results pages for Reddit threads, 14 Oct 2026: r/Wordpress "For WordPress agencies, when does white label actually…", r/agency "What's your experience with White label agencies?", r/forhire "[Hiring] Experienced German-Speaking WordPress…", r/Wordpress "Any wordpress white label agency recommendation", r/marketingagency "Marketing Agencies owners: What is your absolute biggest…", r/agency "Question for design agencies…".
- Pricing (vendor sources): wpwebinfotech.com/white-label-wordpress-development, krishaweb.com white-label pricing 2026, sitewired.com WordPress maintenance cost, bsscommerce.com WordPress maintenance pricing, qualimero.com WooCommerce developer cost.
- Developer-gone cases: chrislema.com "web designer goes AWOL", digitalocean.com community "our website developer disappeared".
