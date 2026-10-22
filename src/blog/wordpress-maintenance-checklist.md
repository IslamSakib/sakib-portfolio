---
title: "WordPress maintenance checklist: weekly, monthly and yearly tasks"
seoTitle: "WordPress Maintenance Checklist: Weekly to Yearly"
description: "WordPress maintenance checklist: weekly, monthly and yearly tasks you can finish. Get the list."
focus: WordPress maintenance checklist
date: "2026-10-15"
art: checklist
topic: Fixes and maintenance
service: wordpress-care-plans
imageAlt: "A WordPress maintenance checklist: back up, update, test forms and checkout, check uptime and security, review speed, write the report"
sources:
  - { name: "WordPress Developer Resources, Site Health screen", url: "https://wordpress.org/documentation/article/site-health-screen/" }
  - { name: "Google PageSpeed Insights", url: "https://pagespeed.web.dev/" }
faq:
  - { q: "How often should I maintain my WordPress site?", a: "Check backups and security weekly, apply and test updates at least monthly (security updates as soon as they appear), review speed, plugins and content quarterly, and review hosting, licences and accounts yearly." }
  - { q: "What is included in WordPress maintenance?", a: "Backups stored away from the server, tested updates to WordPress, the theme and plugins, uptime and security monitoring, speed checks, plugin housekeeping, and a regular check of forms, checkout and other key features." }
  - { q: "How long does WordPress maintenance take each month?", a: "For a typical small business site, about one to three hours a month for the routine work. Stores and sites with many plugins take longer because each update needs more testing." }
  - { q: "Can I automate WordPress maintenance?", a: "Partly. Backups, uptime monitoring and security scans can run automatically. Testing updates, checking that forms and checkout work, and deciding what to fix still need a person." }
  - { q: "What happens if I do not maintain my WordPress site?", a: "Plugins fall behind on security updates, which is the most common way WordPress sites get hacked, backups may silently stop, and the site slowly gets slower and more fragile until something breaks." }
---

You know you should be looking after your WordPress site, and you never get round to it. This WordPress maintenance checklist turns "I should" into a short list you can actually finish. WordPress isn't hard to maintain, but it needs regular attention: plugins update every week, backups can silently fail, and small problems grow if nobody looks. It's the list I work from, split into weekly, monthly, quarterly and yearly tasks, with what each one protects you from.

## What do I need before I start?

Get these three things ready first, so the checklist doesn't stall halfway:

1. **Administrator access** to WordPress, and access to your hosting control panel.
2. **A backup stored away from the server,** so a hacked or crashed server doesn't take your only copy with it.
3. **A staging site,** a private copy where you can test updates. Most hosts create one in a click.

## What do I check every week (10 to 15 minutes)?

- [ ] **Confirm last night's backup ran** and that the copy is off the server.
- [ ] **Check uptime alerts.** Was the site down this week? For how long?
- [ ] **Look at pending security updates.** Apply any update marked as a security fix promptly, after a quick test.
- [ ] **Glance at the Site Health screen** (Tools, then Site Health) for new critical issues ([what it checks](https://wordpress.org/documentation/article/site-health-screen/)).
- [ ] **Check form submissions arrived.** A contact form that silently stopped sending emails is one of the most common unnoticed failures.

## What do I do every month (1 to 3 hours)?

Allow one to three hours, and more if something needs fixing:

- [ ] **Take a fresh backup** before changing anything.
- [ ] **Update WordPress core, the theme and plugins on staging first,** in small groups.
- [ ] **Test what matters on staging:** the home page, contact forms, checkout and payments, logins, and the mobile menu.
- [ ] **Apply the same updates on the live site** at a quiet time and test again.
- [ ] **Run a security scan** and review new administrator users.
- [ ] **Check mobile speed** on the home page and your top landing pages in [PageSpeed Insights](https://pagespeed.web.dev/), and compare with last month.
- [ ] **Look for broken links** and 404 errors in Search Console.
- [ ] **Clear spam comments** and old post revisions if they're building up.
- [ ] **Write down what you did,** what you found and what needs a decision.

## What do I do every quarter (an afternoon)?

- [ ] **Test restoring a backup** to staging. A backup you've never restored is a hope, not a backup. See [WordPress backup and restore](/blog/wordpress-backup-and-restore/).
- [ ] **Review the plugin list.** Remove unused plugins, and replace any that their developer hasn't updated in a long time.
- [ ] **Check the PHP version** in your hosting panel. A supported version is faster and safer.
- [ ] **Review user accounts.** Remove people who left, and lower roles that are higher than needed.
- [ ] **Check Search Console's Core Web Vitals and Pages reports** for new problems.
- [ ] **Read your key pages** as a customer would: are prices, opening hours, team and contact details still right?

## What do I do once a year?

- [ ] **Renew the domain, SSL and premium plugin licences,** and check they're in your name.
- [ ] **Review hosting:** is it still fast enough for your traffic? Is the plan still the right size?
- [ ] **Audit who has access:** hosting, domain registrar, WordPress, analytics and email.
- [ ] **Review security basics:** strong passwords and two-factor login for every administrator.
- [ ] **Decide what to improve:** the slowest template, an outdated design section, content that no longer reflects the business.

## What extra checks does a WooCommerce store need?

Stores need everything above plus:

- [ ] A **test order** after every update to WooCommerce, the theme or a payment plugin
- [ ] **Cart, checkout and account pages excluded** from every cache layer
- [ ] **Outdated template warnings** under WooCommerce, then Status
- [ ] **Order emails** reaching customers and the shop owner
- [ ] **Payment gateway webhooks** succeeding in the gateway dashboard

My guide to [WooCommerce checkout problems](/blog/woocommerce-checkout-not-working/) covers what to do when one of these fails.

## What goes wrong if I skip the checklist?

Skipping it doesn't break your site on day one. These problems build up quietly:

- **Updates fall behind** and a known security hole in a plugin gets used. This is the most common way WordPress sites get hacked; see [how to check if your WordPress site is hacked](/blog/how-to-check-if-wordpress-site-is-hacked/).
- **Backups stop** without anyone noticing, until the day you need them.
- **"Update all" breaks the site** because nothing was tested first.
- **The site slowly gets slower** as plugins and scripts pile up.

## Should I keep a log?

Yes. Keep one line per maintenance session in a shared document or spreadsheet: the date, what was updated, what was tested, anything that broke and how it was fixed, and anything that needs a decision. It takes two minutes and pays for itself the first time something goes wrong, because you can see what changed and when. It also helps anyone who takes over the site after you.

## Which tools make the checklist faster?

You don't need many, but a few save a lot of time:

- **A backup plugin or host backups** that send copies off-site automatically and alert you if a backup fails
- **An uptime monitor** that emails or messages you when the site goes down
- **A security plugin or scanner** that watches for changed files and known vulnerable plugins
- **A staging site,** usually from your host, for testing updates
- **Google Search Console** for indexing problems, Core Web Vitals and security warnings
- **PageSpeed Insights** for mobile speed checks

Fewer, well-chosen tools beat many overlapping ones. Two security plugins or two backup plugins create the same kind of problems as [two cache plugins](/blog/too-many-wordpress-cache-plugins/).

## What do I do when a check fails?

If an update breaks something, restore the backup you took before updating and test that update alone on staging; see [what to do when a WordPress update broke your site](/blog/wordpress-update-broke-site/). If a backup failed, fix it before anything else, because every other task assumes you can go back. If the security scan finds something you can't explain, treat it as a possible hack until proven otherwise.

## How do I make the checklist mine?

Copy it into whatever you already use, a spreadsheet, a project board or a calendar reminder, and remove what doesn't apply. A brochure site doesn't need the store checks. A busy store may need some monthly tasks every week. The best checklist is the one that actually gets done.

## Should I do it myself or hand it over?

You can work through this yourself in one to three hours a month for a typical small business site. The harder parts are testing updates properly and knowing what to do when one fails. If you'd rather hand it over, this checklist is exactly what my [WordPress maintenance plans](/website-care/) cover, from $149 a month, with a plain-English report each month. For what plans cost elsewhere, see [WordPress maintenance cost](/blog/wordpress-maintenance-cost/).
