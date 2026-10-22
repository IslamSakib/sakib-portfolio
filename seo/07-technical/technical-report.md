# Technical report (16 Oct 2026)

| Check | Result |
|---|---|
| Build | passes; 40 pages |
| Sitemap | 39 URLs (all except 404), all 4 new pages included |
| robots.txt | allows all; disallows /lead.php; sitemap referenced |
| Click depth | new pages are 1 click from home through the Services menu (desktop and mobile) |
| Lighthouse mobile, /wordpress-care-plans/ (local preview, lab) | performance 99, accessibility 100, best practices 100, SEO 100; LCP 2.0 s, CLS 0.029, TBT 20 ms |
| Lighthouse mobile, /wordpress-repair/ (local preview, lab) | performance 99, accessibility 100, best practices 100, SEO 100; LCP 2.0 s, CLS 0.016, TBT 60 ms |
| IndexNow key | public/3bfdbdec5b9dd791ee91afe3cb65c4fe.txt exists |
| Redirects | none needed (no URL changed) |

The full technical audit (headers, CSP, HTTPS, 404) was done at launch (docs/research/06-qa-launch.md) and nothing in this change touches it. CrUX field data: n/a (the site is too new).
