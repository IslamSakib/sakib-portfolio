# 05. Site architecture and page plan

Date: 14 Oct 2026. Built from 02 (ICP), 03 (keywords and results pages), 04 (positioning).

## Site map

```
/                                   Home: routes businesses and agencies
├─ /wordpress-maintenance/          NEW  Direct: maintenance, support, fixes (care plans)
├─ /wordpress-speed-optimization/   KEEP Direct: speed, Core Web Vitals (adds packages + prices)
├─ /wordpress-development/          KEEP Both: custom builds, WooCommerce, plugins, relaunches
├─ /white-label-wordpress-development/  NEW  Agency: white-label partner page
├─ /custom-web-development/         KEEP, secondary (absorbs AI section)
├─ /ai-development/                 301 → /custom-web-development/
├─ /work/{tabby,tubeonai,moneybag,wrkbase,open-alliance-learning,piola-pizza,pixmge}/   KEEP, tagged by audience
└─ /404
```

Navigation: **Services** (Maintenance · Speed · Development · Custom web) · **For agencies** · **Work** · **Contact**. "For agencies" is a top-level link because it's a different buyer, not another service.

## Page specs

### Home `/`
- ICP: both. Intent: name searches, "wordpress developer". Goal: route each visitor to the right path within the first screen.
- Sections:
  1. Hero: one line for the shared promise and **two paths side by side**: "I run a business" → maintenance/speed/development, "I run an agency" → white-label page.
  2. Logo strip (existing).
  3. Problems I fix: slow / broken / no developer / relaunch, each linking to its page with one proof number.
  4. Selected work: Tabby, TubeOnAI, Moneybag first.
  5. For agencies band: Musemind quote, process in 4 steps, CTA.
  6. Prices at a glance (after approval).
  7. Reviews (existing).
  8. FAQ, trimmed.
  9. Contact.
- Remove: the fake terminal service picker, unconfirmed stat tiles (replaced by checkable facts: years, named clients, recommendation count once confirmed).
- CTAs: primary "Get a free site check"; secondary "Agency? See how I work with you".

### `/wordpress-maintenance/` (new)
- ICP: direct. Keyword: wordpress maintenance services (+ support, repair).
- Visitor questions: what's included, what does it cost, how fast do you reply, do I keep access, what if it breaks.
- Sections: problem (no one looking after the site), the two care plans with prices, what a month looks like, a broken-site fix offer, proof (Tabby maintenance + Ahad Ali quote, TubeOnAI rescue), what I need from you (logins, hosting), FAQ, CTA.
- CTA: "Start a care plan" / secondary "Fix one problem first".

### `/wordpress-speed-optimization/` (keep, extend)
- Add: packages and starting price, "what you get" report (before/after mobile PageSpeed), field data vs lab score explanation (the CWV box he already checks for prospects).
- Proof: TubeOnAI, Tabby. CTA: free site check.

### `/wordpress-development/` (keep, rewrite)
- Focus: custom WordPress and WooCommerce builds and relaunches that keep SEO. Proof: Tabby 2.0 relaunch, Moneybag gateway plugin, Open Alliance Learning.
- Add "from $2,500" once approved; how a build runs; handover.

### `/white-label-wordpress-development/` (new)
- ICP: agency. Keyword: white label wordpress development (+ outsource).
- Visitor questions: can you match our designs, which builders, how do we communicate, NDA, will you contact our client, rate, turnaround, who supports it after launch, can we try first.
- Sections:
  1. Hero (your design, your name, your date)
  2. What I take on (builds from Figma, overflow fixes, speed, care for your clients' sites)
  3. How we work: brief, staging link, QA checklist, handoff notes; your tools; overlap hours; 24 h reply
  4. Engagement models and prices (per site, hourly, monthly block)
  5. Proof: Musemind quote, Figma-to-WordPress case studies, speed results
  6. Paid trial project offer
  7. FAQ
  8. Agency inquiry form
- CTA: "Start with a small trial project".

### Case studies
- Add an "audience" tag (direct / agency / both) and a one-line "relevant if you…" under each title.
- Order: Tabby, TubeOnAI, Moneybag, Wrkbase, Open Alliance Learning, Piola Pizza, Pixmge.
- Keep the existing structure (brief, cause, fix, result, FAQ). It already matches the brief's case-study needs.

### Contact (home section + every page's CTA block)
- Choose: **Business** or **Agency**. Fields:
  - Business: name, work email, website URL, what's wrong or what you need (select: slow / broken / maintenance / new build / other), message.
  - Agency: name, work email, agency name, type of work (build from design / overflow / care for clients / other), message.
  - Only name, email and message are required.
- Email first, WhatsApp as alternative. Success is shown only after the server confirms. Until the SMTP password is set, the fallback is WhatsApp with the message prefilled (existing behaviour).

## Structured data
- Home: Person + WebSite (existing), ProfessionalService with `areaServed` as a plain list of countries served remotely. No address in the target countries.
- Service pages: Service + FAQPage + BreadcrumbList (existing pattern). Prices go in Service `offers` only once they're shown on the page.
- No review/rating markup.
