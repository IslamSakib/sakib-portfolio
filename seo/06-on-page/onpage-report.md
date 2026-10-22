# On-page report (16 Oct 2026)

Gates: `npm run build` → seo-check **40 pages, 0 problems** (focus keyword in title, description and H1; title ≤ 60; description ≤ 155; one H1; canonical; alt text). `scripts/seo-audit.mjs` → **no problems** (canonical, OG/Twitter, lang, viewport, heading order, schema fields, internal links, sitemap, robots, llms.txt).

| Page | Focus | Title / desc length | Schema | Links in (matrix) | Result |
|---|---|---|---|---|---|
| /wordpress-care-plans/ (new) | WordPress care plans | 47 / 143 | Service (2 Offers), FAQPage, BreadcrumbList | maintenance page, 4 maintenance posts (side card), menu | pass |
| /wordpress-repair/ (new) | WordPress website repair | 48 / 143 | Service (Offer min $150), FAQPage, BreadcrumbList | maintenance page, 3 fix posts, menu | pass |
| /wordpress-malware-removal/ (new) | WordPress malware removal | 53 / 138 | Service, FAQPage, BreadcrumbList | maintenance, repair, 2 hacked posts, menu | pass |
| /white-label-wordpress-maintenance/ (new) | white label WordPress support | 56 / 145 | Service (Offer $35/h), FAQPage, BreadcrumbList | agency page, WL post, menu | pass |
| /wordpress-speed-optimization/ | WordPress speed optimization **service** | 50 / 153 | unchanged | unchanged | refocused |
| /blog/what-wordpress-maintenance-includes/ | WordPress maintenance tasks | – | unchanged | | refocused |
| /blog/white-label-wordpress-maintenance/ | WordPress maintenance for agencies | – | unchanged | + link to the new service page | refocused |
| /work/tabby/ | website relaunch | 48 / 147 | unchanged | | refocused |
| /wordpress-maintenance/ | unchanged | 57 / 154 | + 2 FAQs (WooCommerce maintenance, maintenance company) | + links to care plans, repair, malware | updated |
| /white-label-wordpress-development/ | unchanged | 60 / 155 | + 1 FAQ (white label website developer) | + link to WL support | updated |

Mobile overflow check at 393 and 430 px (iframe): no horizontal scroll on any changed page.
New OG images: og-wordpress-repair.jpg and og-wordpress-malware-removal.jpg; OG cache version raised to v=3.
