# Site architecture (Phase 3, 16 Oct 2026)

Method: **SERP overlap**. Two keywords share a page only when their Google US top 10s (16 Oct 2026, `pws=0`) share 3 or more URLs.

| Pair | Shared URLs | Decision |
|---|---:|---|
| wordpress care plans ↔ wordpress maintenance services | 0 / 9 | **separate pages** (plan/pricing pages vs. service pages and listicles) |
| wordpress website repair ↔ malware removal service ↔ emergency support | 0 / 8–9 each | **separate intents**. Repair and emergency share one page for now (emergency is only 170/mo); malware gets its own page |
| white label wordpress development ↔ white label wordpress support | 0 / 8–9 | **separate pages** |
| white label wordpress support ↔ white label wordpress maintenance | **3 / 9** | **one page** (support + maintenance); service pages win it |
| wordpress speed optimization service ↔ wordpress speed optimization | 0 / 7–8 | **separate**. The service page targets "…service"; the head term returns how-to guides (blog intent) |

Current state: all 35 pages are within 2 clicks of home, with no orphans. Weakly linked: white screen of death (1 inbound), plugin conflict (2), what-maintenance-includes (2).

## URL tree
```
/                                         keep    home: routes businesses / agencies  ("wordpress developer", bet)
├─ /wordpress-maintenance/                update  hub: maintenance service, company, support  (+ link to care plans, repair, malware)
│  ├─ /wordpress-care-plans/              NEW     plan tiers, what's in each, prices  ("wordpress care plans" 1K, KD 12)
│  ├─ /wordpress-repair/                  NEW     fix a broken site + emergency support  ("website repair" 210 KD 3, "emergency support" 170 KD 10)
│  └─ /wordpress-malware-removal/         NEW     hacked site cleanup  ("malware removal service" 320, KD 11)
├─ /wordpress-speed-optimization/         update  refocus → "wordpress speed optimization service"
├─ /wordpress-development/                update  custom WordPress + WooCommerce (add WooCommerce service vocabulary)
├─ /white-label-wordpress-development/    update  agency hub: builds (+ white label web development wording)
│  └─ /white-label-wordpress-maintenance/ NEW     white-label support + maintenance for agencies ("white label wordpress support" 480, KD 1)
├─ /custom-web-development/               keep    (deprioritised)
├─ /work/*                                keep    (tabby: refocus to "WordPress relaunch")
├─ /blog/*                                keep    (2 refocused, see below)
└─ /contact/
```

## Changes to existing pages
| URL | Change | Why |
|---|---|---|
| /wordpress-speed-optimization/ | focus "WordPress speed optimization" → "WordPress speed optimization **service**" | approved at G1; the SERP check confirms the intent split |
| /blog/what-wordpress-maintenance-includes/ | focus → "what does WordPress maintenance include" | stops it cannibalising /wordpress-maintenance/ |
| /blog/white-label-wordpress-maintenance/ | focus → the agency how-to angle ("resell WordPress maintenance"; volume checked in Phase 4), linking to the new service page | the new service page owns the commercial term |
| /work/tabby/ | focus "Figma to WordPress" → "WordPress relaunch" | stops it cannibalising /blog/figma-to-wordpress-handoff/ |
| /wordpress-maintenance/ | add "company", "support services", "woocommerce maintenance" wording; link to care plans, repair, malware | supports the cluster vocabulary |
| /white-label-wordpress-development/ | add "white label web development (services)", "white label website developer"; link to the new WL maintenance page | gap terms from e2msolutions |

## Navigation
Services mega menu: add **Care plans**, **Repair**, **Malware removal** under the maintenance group. Add **White-label maintenance** to the agency column. Every new page lands 1 click from home.

## Redirects
None. No existing URL changes.
