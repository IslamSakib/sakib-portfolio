# 03. Keyword research, SERP analysis and keyword-to-page map

Date: 14 Oct 2026. Replaces `docs/keyword-research.md` and the keyword sections of `docs/search-plan.md`. Those files are kept for history.

## Method and limits

- **Semrush Keyword Overview**, free plan, Sakib's account. Database: United States. Each lookup also shows the global volume split by country, which is where the UK, CA and AU numbers below come from (same month, same source).
  - 11 lookups on 14 Oct, after which the "out of requests" limit appeared. A second batch is planned (list at the end).
  - KD is Semrush's organic Keyword Difficulty (0–100). Google Ads competition is not used as difficulty.
  - Intent labels are Semrush's. They're checked against the live results below.
- **Google results pages**, read in Chrome with `gl=us|uk|au` and `pws=0`, 14 Oct 2026. The searches were run from Bangladesh, so results can differ slightly from what a local searcher sees.
- Not available: Google Keyword Planner (no Ads account), Search Console data for this site, Semrush Keyword Magic full lists. Missing numbers are "unknown", never estimated.
- Volumes are monthly averages as reported by Semrush on 14 Oct 2026. Countries are kept separate and never added together.

## 1. Keyword data (Semrush, 14 Oct 2026)

| Keyword | US | UK | AU | CA | KD | CPC US | Intent (Semrush) | ICP |
|---|---:|---:|---:|---:|---:|---:|---|---|
| white label web development | 1,000 | 590 | 210 | 90 | 9 | $17.71 | Info | Agency |
| white label web development services | 720 | ? | ? | ? | 13 | ? | ? | Agency |
| white label wordpress development | 590 | 170 | ~20 | ~20 | 10 | $4.55 | Info | Agency |
| white label wordpress development services | 210 | ? | ? | ? | 16 | ? | ? | Agency |
| white label wordpress development agency | 260 | ? | ? | ? | 14 | ? | ? | Agency |
| outsource wordpress development | 320 | 90 | 30 | ? | 6 | $9.75 | Info | Agency |
| outsource wordpress web development services | 390 | ? | ? | ? | 8 | ? | ? | Agency |
| outsource wordpress plugin development | 320 | ? | ? | ? | 1 | ? | ? | Agency |
| figma to wordpress | 590 | 140 | 110 | 260 | 45 | $6.65 | Info | Agency (supporting) |
| figma to wordpress conversion | 70 | ? | ? | ? | 32 | ? | ? | Agency |
| wordpress maintenance services | 1,900 | 880 | 590 | 260 | 34 | $21.17 | Info + Commercial | Direct |
| wordpress maintenance service | 1,600 | ? | ? | ? | 19 | ? | ? | Direct |
| wordpress website maintenance services | 1,300 | ? | ? | ? | 38 | ? | ? | Direct |
| best wordpress maintenance services | 480 | ? | ? | ? | 29 | ? | ? | Direct |
| wordpress site maintenance services | 390 | ? | ? | ? | 19 | ? | ? | Direct |
| wordpress speed optimization service | 720 | 210 | 260 | 110 | 18 | $7.43 | Info | Direct |
| wordpress speed optimization services | 390 | ? | ? | ? | 11 | ? | ? | Direct |
| hire speed optimization developers wordpress | 720 | ? | ? | ? | 11 | ? | ? | Direct |
| wordpress page speed optimization service | 170 | ? | ? | ? | 7 | ? | ? | Direct |
| wordpress website repair | 210 | 40 | 140 | 20 | 3 | $0 | Info | Direct |
| hire wordpress developer | 1,300 | 480 | 90 | 30 | 21 | $21.20 | Info + Commercial | Direct |
| how to hire a wordpress developer | 1,300 | ? | ? | ? | 24 | ? | ? | Direct |
| woocommerce developer | 1,600 | 1,300 | 260 | 40 | 50 | $36.10 | Info | Secondary |
| woocommerce development services | 1,900 | ? | ? | ? | 45 | ? | ? | Secondary |
| woocommerce development agency | 1,300 | ? | ? | ? | 31 | ? | ? | Secondary |
| custom web application development | 2,400 | 480 | 260 | 320 | 28 | $39.89 | Info | Deprioritised |

"?" means the number is only available from a separate lookup in that country database, which hasn't been run. Rows without a country split come from the "Keyword variations" panel of the parent lookup (US only).

## 2. SERP analysis (Google, 14 Oct 2026, top organic results)

| Keyword (market) | What ranks | Page type expected | Can a solo developer compete? |
|---|---|---|---|
| white label wordpress development (US) | e2msolutions, dynamicdreamz (offshore white-label shops), synergytechnicalgroup, techbear, qewebby (guides), theplusaddons (listicle), an affiliate blog, Reddit | Service page aimed at agencies, plus guides | **Yes.** Mostly offshore shops and thin guides; KD 10. No result speaks as one named senior developer with overlap hours |
| white label wordpress development (UK) | drivebywebsites.co.uk, zestcode.co.uk (UK providers), whitelabelwp.io, bsscommerce guide, Reddit | Service page, some UK-local preference | Partly. UK results favour UK providers |
| white label web development (US) | whitelabeliq (90+ person team), bridgewaydigital, listicles (getdevdone, dribbble, LinkedIn, onelittleweb), Reddit | Mixed: providers + "top companies" lists | Harder than the WordPress version; supporting term |
| outsource wordpress development (US) | acclaim.agency, developress.io, deazy, codeable, guides | Service pages for agencies | Yes, KD 6 |
| wordpress maintenance services (US) | prontomarketing, wpsiteplan, wpbuffs (plan providers), malcare/elementor/fatlab/wp101 (listicles), Reddit, an LA local provider | Plan/pricing page | **Yes, but harder** (KD 34). Pages that rank show plans and prices |
| wordpress maintenance services (UK) | wpmanager.co.uk, yellowpeach.co.uk, thrivewp, gov.uk Digital Marketplace, listicles | UK-local providers | Weak. Strong local preference |
| wordpress maintenance services (AU) | snugsite.com.au, wpcreative.com.au, velocityhost.com.au, digitize.au (Adelaide) | AU-local providers | Weak. Strong local preference; no fake local presence |
| wordpress speed optimization service (US) | wp-rocket (list), Reddit, webkul, wpbuffs, **wpjohnny.com (solo)**, **onlinemediamasters.com (solo, "$40/hour")**, Fiverr, seowebmechanics | Service page with packages and before/after proof | **Yes.** Two solo developers rank with priced packages and before/after screenshots |
| wordpress website repair (US) | gotechark, fixmysite, webless, wpfixit, fixed.net, sitecare, wp-techsupport, Reddit | Fix/support service pages, often "24/7" | Yes on KD (3), but competitors promise 24/7. Sakib promises a 24 h reply, not 24/7 |
| hire wordpress developer (US) | Upwork, Toptal, Codeable, Fiverr, Reddit, Quora, a few agencies | Marketplaces and "where to hire" lists | **No** as a main target. Marketplace-owned; supporting phrase on home only |
| figma to wordpress developer (US) | figma.com (plugin pages), Reddit, codeable guide, tympanus tutorial, instawp guide, **qbattersby.com (solo dev)** | Tools and how-to, one solo dev | Supporting term on the agency page; not its own page |

What the results tell us:
1. **Agency (white-label) terms are the clearest opportunity.** There's real demand (US 590–1,000 per head term) and low KD (6–16). The ranking pages are offshore team pages and generic guides, and none comes from an identifiable senior developer. **[S]**
2. **Speed optimisation is winnable** and is already proven by solo developers who show packages, prices and before/after proof. The current speed page has no prices. **[S]**
3. **Maintenance is the largest direct-client term** but leans local in the UK and AU. Target the US with an honest "remote, US/UK hours overlap" message. Don't create country pages. **[S]**
4. **"Hire WordPress developer" and "WooCommerce developer" are owned by marketplaces or are hard (KD 50).** They're used as supporting phrases only. **[S]**
5. **Repair/fix intent** fits the maintenance and support page (sitecare and wp-techsupport rank for both maintenance and repair). A separate repair page would be thin. **[S]**

## 3. Scoring (clusters)

Each criterion is scored 1–5: ICP relevance, commercial intent, urgency, service fit, ranking chance (from KD and the results above), demand, existing proof. Equal weights. Sum out of 35.

| Cluster | ICP | Rel | Intent | Urg | Fit | Rank | Demand | Proof | **Total** |
|---|---|---|---|---|---|---|---|---|---|
| White-label / outsource WordPress | Agency | 5 | 4 | 3 | 5 | 5 | 4 | 4 | **30** |
| WordPress speed optimisation service | Direct | 5 | 4 | 4 | 5 | 4 | 3 | 5 | **30** |
| WordPress maintenance and support (+ repair) | Direct | 5 | 4 | 4 | 4 | 3 | 5 | 4 | **29** |
| Custom WordPress development (+ WooCommerce, Figma) | Both | 4 | 3 | 3 | 5 | 2 | 4 | 5 | 26 |
| Hire / freelance WordPress developer | Direct | 4 | 4 | 3 | 4 | 1 | 4 | 3 | 23 |
| WooCommerce developer (head) | Secondary | 3 | 3 | 3 | 3 | 1 | 4 | 3 | 20 |
| Custom web application development | Deprioritised | 2 | 3 | 2 | 2 | 2 | 4 | 2 | 17 |
| AI agent development | Deprioritised | 2 | 2 | 2 | 3 | 2 | ? | 2 | 13+ |

## 4. Keyword-to-page map

| Page | URL | Primary keyword | Supporting | Market | ICP | Priority |
|---|---|---|---|---|---|---|
| White-label WordPress for agencies (**new**) | `/white-label-wordpress-development/` | white label wordpress development | white label web development (services), outsource wordpress development, outsource wordpress plugin development, figma to wordpress conversion, wordpress development outsourcing | US first, then UK/CA/AU | Agency | 1 |
| WordPress maintenance and support (**new**) | `/wordpress-maintenance/` | wordpress maintenance services | wordpress maintenance service, wordpress site maintenance services, wordpress website repair, wordpress support services (to verify) | US | Direct | 1 |
| WordPress speed optimisation (keep, add prices and packages) | `/wordpress-speed-optimization/` | wordpress speed optimization service | wordpress speed optimization services, wordpress page speed optimization service, hire speed optimization developers wordpress, Core Web Vitals | US, AU, UK | Direct | 1 |
| Custom WordPress development (keep, rewrite) | `/wordpress-development/` | custom wordpress development (volume to verify) | woocommerce development services, custom wordpress plugin, figma to wordpress, hire wordpress developer | US, UK | Both | 2 |
| Home | `/` | wordpress developer (volume to verify) + name | freelance wordpress developer, hire wordpress developer | All | Both, routing | 1 |
| Custom web development (keep, merge AI into it) | `/custom-web-development/` | custom web development | AI agent development, SaaS development | — | Deprioritised | 3 |
| AI development | `/ai-development/` → 301 to `/custom-web-development/` | — | — | — | — | 3 |
| Case studies | `/work/*` | unchanged problem phrases | — | — | Tagged per ICP | 2 |

Cannibalisation rules: the speed page owns "slow / speed / Core Web Vitals"; the maintenance page owns "maintenance / support / repair / broken"; the agency page owns everything "white label / outsource / for agencies"; the development page owns "custom / build / WooCommerce / plugin". The home page links to each and doesn't target those phrases itself.

## 5. Excluded or deferred

- **Excluded:** country-specific pages ("wordpress maintenance uk", "… australia"). He has no local presence, and the results favour local providers.
- **Excluded:** marketplace-owned "hire" terms as page targets; "woocommerce developer" as a page target (KD 50).
- **Excluded:** "figma to wordpress" head term (results are tools and tutorials).
- **Deferred:** blog or insights section. Candidate topics that link to a service: "what WordPress maintenance includes" (questions at 10/month each), "white label vs freelancer for agencies", "why a WooCommerce checkout fails". Add only after the service pages exist and Search Console shows impressions.

## 6. Semrush batch 2 (next free quota)

wordpress developer · custom wordpress development · freelance wordpress developer · wordpress support services · white label wordpress maintenance · wordpress care plans (UK database) · wordpress maintenance services (UK and AU databases, for KD) · woocommerce payment gateway integration · fix slow wordpress site · wordpress agency partner.

Pages are built on the evidence above. Batch 2 can change supporting phrases, not the page list, unless a number contradicts it.

## 7. Blog clusters (15 Oct 2026, Semrush batch 2, US database)

Informational questions the two ICPs ask, one post each. Service pages keep the commercial terms; posts link to them.

| Post | Focus keyword | US vol. | KD | ICP | Links to |
|---|---|---:|---:|---|---|
| /blog/why-is-my-wordpress-site-so-slow/ | why is my WordPress site so slow | 590 | 27 | Direct | speed page, TubeOnAI |
| /blog/wordpress-white-screen-of-death/ | WordPress white screen of death | 390 | 27 | Direct | maintenance page |
| /blog/redesign-website-without-losing-seo/ | redesign a website without losing SEO | 260 (parent "website redesign seo" 1,900) | 1 (parent 26) | Direct | development page, Tabby |
| /blog/wordpress-maintenance-cost/ | WordPress maintenance cost | 210 (UK 210) | 26 | Direct | maintenance page |
| /blog/fix-hacked-wordpress-site/ | fix a hacked WordPress site | 110 | 17 | Direct | maintenance page |
| /blog/wordpress-core-web-vitals/ | WordPress Core Web Vitals | 260 | 17 | Direct | speed page, TubeOnAI |
| /blog/cost-to-hire-a-wordpress-developer/ | cost to hire a WordPress developer | 70 | 10 | Direct | development page |
| /blog/woocommerce-checkout-not-working/ | WooCommerce checkout not working | 50 (270 across variations) | n/a | Direct (stores) | development page, Moneybag |
| /blog/choosing-a-white-label-wordpress-partner/ | white label WordPress partner | 260 for "white label wordpress" | 13 | Agency | agency page |
| /blog/figma-to-wordpress-handoff/ | Figma to WordPress | 590 | 45 | Agency | agency page, Tabby |

Also seen, for later posts: "white label wordpress support" 480 (KD 1, commercial, belongs on the agency page), "wordpress plugin conflicts" 40 (KD 16), "how to tell if your wordpress site has been hacked" 50 (KD 13).
