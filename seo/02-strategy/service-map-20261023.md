# Service map, 23 Oct 2026 (three pillars)

Why: the site read as a WordPress specialist. Sakib is a full stack developer, so each of the three services owns its own pages, and WordPress words sit on WordPress pages only. Data: `seo/_data/semrush-service-keywords-20261023.md` (Semrush US, Access-5). Code: `src/children*.js`, `src/pages/[pillar]/[child].astro`, `src/components/ServicePage.astro`.

| Pillar | Page | Focus keyword (volume / KD) |
|---|---|---|
| Custom website development `/custom-web-development/` | pillar | custom website development (3,600 / 50) |
| | `/custom-web-design/` | custom web design (4,400 / 34) |
| | `/ecommerce-website-development/` | ecommerce website development (5,400 / 45) |
| | `/landing-page-design/` | landing page design (2,400 / 50) |
| | `/website-redesign/` | website redesign services (3,600 / 23) |
| | `/website-speed-optimization/` | website speed optimization (1,600 / 67) |
| | `/website-repair/` | website repair (480 / 6) |
| | `/website-maintenance/` | website maintenance services (4,400 / 23) |
| Web application development `/web-application-development/` | pillar | custom web application development (2,400 / 28) |
| | `/saas-development/` | saas development services (2,400 / 29) |
| | `/customer-portal-development/` | customer portal development (260 / 5) |
| | `/dashboard-development/` | dashboard development services (320 / 6) |
| | `/mvp-development/` | mvp development (1,900 / 34) |
| | `/api-integration/` | api integration services (1,600 / 22) |
| | `/ai-integration/` | ai integration services (1,900 / 43) |
| WordPress development `/wordpress-development/` | pillar | custom WordPress development (1,600 / 13) |
| | `/wordpress-theme-development/` | custom WordPress theme development (210 / 28) |
| | `/wordpress-plugin-development/` | WordPress plugin development (590 / 34) |
| | `/woocommerce-development/` | WooCommerce development services (1,300 / 47) |
| | `/wordpress-speed-optimization/` | WordPress speed optimization (1,300 / 34) |
| | `/wordpress-repair/` | WordPress website repair (210 / 3) |
| | `/wordpress-malware-removal/` | WordPress malware removal (880 / 19) |
| | `/wordpress-maintenance/` | WordPress maintenance services (1,900 / 34) |
| | `/white-label-wordpress-development/` and `/white-label-wordpress-maintenance/` | white label WordPress development (590 / 10) |

Redirects (301, `public/.htaccess`): /website-care/, /wordpress-care-plans/, /wordpress-maintenance/, /wordpress-speed-optimization/, /wordpress-repair/, /wordpress-malware-removal/, /white-label-wordpress-development/, /white-label-wordpress-maintenance/, /ai-development/ now point inside the pillars.
Navigation: Services menu (three columns), Who I help menu, mobile menu with three groups. Home page shows the three pillars with their main services. ICP pages link to the matching child services.
Next content: platform-neutral guides (website maintenance cost, ecommerce vs marketplace, SaaS MVP cost, customer portal guide, API integration guide).
Rule: `node scripts/wp-scan.mjs` lists WordPress words outside the WordPress area (case studies of real WordPress projects are allowed).
