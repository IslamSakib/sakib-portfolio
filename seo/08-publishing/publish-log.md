# Publish log

## 16 Oct 2026: full rewrite deploy to https://sakib.mywrkbase.com
- Build: 47 pages, gate 0 problems, audit clean, coverage 46/46 pages (title, description, one H1, own share image, on-page image, alt on all 331 images).
- Upload: 6 zips (8.18, 8.12, 3.20, 6.64, 7.52, 4.77 MB) to public_html/sakib via the Hostinger File Browser; each extracted in place with overwrite.
- Verified: 843 of 843 served files byte-identical to the build (sha256). `.htaccess` (2,093 B) and `lead.php` (8,941 B) match. `lead-config.php` untouched (213 B). `lead.php` answers GET with 405. Live sitemap lists 46 URLs including every new page.
- Live checks in Chrome: new home copy and ticking Dhaka clock; tap sound: 0 ticks for blank-space touches, 1 for a button tap.
- Search engines: IndexNow HTTP 200 (46 URLs); Search Console sitemap-index.xml resubmitted ("submitted successfully"); indexing requested for /wordpress-care-plans/, /wordpress-repair/, /wordpress-malware-removal/, /white-label-wordpress-maintenance/.
- Leftover: sakib-deploy-1..6.zip in the live folder (not publicly downloadable: HTTP 403). Delete when convenient.
- Not done: Bing Webmaster resubmission (IndexNow covers Bing); indexing requests for the other pages (the sitemap covers them).

## Same day, follow-up (search engine checklist)
- Bing Webmaster Tools: sitemap-index.xml resubmitted (status Processing); IndexNow page shows 46 URLs received today.
- Google Search Console: sitemap resubmitted earlier; Manual actions: no issues; Security issues: no issues; Page indexing: 12 indexed, 0 problems (pre-deploy). Indexing requested for care plans, repair, malware removal, white-label support and maintenance (5). The 6th request (speed page) returned "Quota exceeded": Google's daily limit. Remaining pages queued in 11-optimization/refresh-queue.md.

## 16 Oct 2026 (second deploy): voice pass on 27 pages + LinkedIn URL change
- 48 changed files deployed (verify-live: 843/843 identical, lead-config.php untouched at 213 B, lead.php GET 405).
- Method: root-level File Browser can't extract "into ." (403, path tricks 403). Worked: one zip per top-level folder with paths relative to it, Extract name = folder name (blog, work) with overwrite; single-page folders uploaded one by one with "Replace all".
- IndexNow: 46 URLs, HTTP 200. Scratch folder zz-deploy7 deleted. Leftover zips (sakib-deploy-7, blog-only, work-only) remain, 403 to the public; offer cleanup.
