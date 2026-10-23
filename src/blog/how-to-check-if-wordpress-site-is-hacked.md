---
title: "How to check if your WordPress site is hacked: 10 signs to look for"
seoTitle: "How to Check if Your WordPress Site Is Hacked"
description: "How to check if your WordPress site is hacked: 10 signs, from spam pages to new admins. See the list."
focus: check if your WordPress site is hacked
date: "2026-10-15"
updated: "2026-10-24"
art: hackcheck
topic: Fixes and maintenance
service: wordpress-malware-removal
imageAlt: "A checklist of hack warning signs: unknown admin users, spam redirects, new files in uploads and a Google warning"
sources:
  - { name: "Google Search Central, Help for hacked sites", url: "https://developers.google.com/search/docs/monitor-debug/security/hacked-sites" }
  - { name: "WP-CLI, wp core verify-checksums", url: "https://developer.wordpress.org/cli/commands/core/verify-checksums/" }
  - { name: "Patchstack, State of WordPress Security in 2026", url: "https://www.patchstack.com/whitepaper/state-of-wordpress-security-in-2026/" }
faq:
  - { q: "How do I know if my WordPress site has been hacked?", a: "Look for spam pages in Google with site:yourdomain.com, redirects that only some visitors see, admin users you did not create, PHP files inside the uploads folder and a warning in Search Console. Check from a phone and through a Google search, because many hacks hide from the site owner." }
  - { q: "Is there a free tool to check if WordPress is hacked?", a: "Search Console's Security issues report, Google's site: search and WP-CLI checksum commands are free. A scanner plugin can help, but it can miss code hidden in a pirated plugin, so read the results as a lead, not as proof the site is clean." }
  - { q: "How can I check if my WordPress site is hacked for free?", a: "Search Google for site:yourdomain.com to look for spam pages, check Search Console's Security issues report, review your WordPress admin users, look for PHP files in the uploads folder, and run WP-CLI's checksum commands to compare core and plugin files with the official copies." }
  - { q: "Can a WordPress site be hacked without me noticing?", a: "Yes. Many hacks are designed to stay hidden: they redirect only mobile visitors or visitors from Google, or add spam pages that only search engines see. That is why checking from a phone, in a private window and through Google matters." }
  - { q: "Why is my WordPress site redirecting to another site?", a: "Unwanted redirects are one of the most common signs of a hack. Malware often redirects only some visitors, such as first-time visitors on mobile, so the site can look normal to you while customers are sent to spam or scam pages." }
  - { q: "Does Google tell you if your site is hacked?", a: "Often, but not always. If Google detects hacked content or malware it shows a warning in search results and lists the problem in Search Console under Security issues, and sends an email to verified owners." }
  - { q: "What should I do first if my WordPress site is hacked?", a: "Take a full copy of the site as it is, then change every password: WordPress admins, hosting, database and FTP. After that, clean the site from trusted copies and close the hole the attacker used before you make it public again." }
---

Something feels off with your site, and you want to check if your WordPress site is hacked. Start by assuming the hack is trying to hide. Most modern WordPress malware doesn't deface your home page. It quietly adds spam pages for search engines, redirects some visitors to scam sites, or creates a hidden admin account to come back later. You can look straight at your site and see nothing wrong. Here are the ten signs I check first, and the free tools that confirm them.

## Why can a hacked site look completely normal?

Attackers make money from your site's reputation and traffic, not from breaking it. A site that keeps working keeps its rankings, so the hack stays useful for longer. That's why so many hacks only show themselves to:

- Visitors arriving from Google, not those typing your address
- Mobile visitors, not desktop
- First-time visitors, tracked by a cookie
- Search engine crawlers, who see spam pages you never see

So the checks below deliberately look at the site the way strangers and search engines do.

## 1. Are there spam pages under my domain in Google?

Search Google for `site:yourdomain.com` and scroll through the results. Pages you never created, often about pharmacy products, gambling, replica goods or in a language you don't use, are the clearest sign of a hack. Also try `site:yourdomain.com` with words like "casino" or "viagra" to surface hidden pages faster.

## 2. Is there a warning in search results or Search Console?

Ads stopped too? That can be a [Compromised Site disapproval in Google Ads](/blog/google-ads-compromised-site/).

If Google detects a problem it may label your result "This site may be hacked" or show a red warning page in Chrome. Open Google Search Console and check **Security issues** and **Manual actions**. Both should say no issues detected. Google's [help for hacked sites](https://developers.google.com/search/docs/monitor-debug/security/hacked-sites) explains each message.

## 3. Does my site redirect only sometimes?

Open your site on your phone, on mobile data rather than Wi-Fi, in a private window. Then search for your business on Google and click through to your site. If you land somewhere else even once, treat it as a hack, even if it never happens on your laptop.

## 4. Are there admin users I didn't create?

In the WordPress dashboard, go to Users and filter by Administrator. Every name should be someone you know. Attackers often add an account with a plausible name such as "support", "wpadmin" or a copy of a real user's name with one letter changed. Check the email addresses too.

## 5. Are there PHP files in my uploads folder?

The `wp-content/uploads` folder should only hold images, PDFs and similar files. Using your host's file manager, search inside it for files ending in `.php`. There's almost never a legitimate reason for one to be there, and it's a classic place to hide a back door.

## 6. Do my core files match WordPress.org?

WordPress publishes checksums for every file. If you or your developer can use WP-CLI, run `wp core verify-checksums` ([command reference](https://developer.wordpress.org/cli/commands/core/verify-checksums/)) to list any core file that has been changed, and `wp plugin verify-checksums --all` to do the same for plugins from the WordPress directory. Modified core files on a site nobody has edited are a strong sign of a hack.

## 7. Are there strange scheduled tasks?

Malware often reinstalls itself using WordPress's scheduled tasks (cron). A plugin such as WP Crontrol, or `wp cron event list` in WP-CLI, shows them. Look for tasks with random-looking names or tasks that belong to no plugin you have installed.

## 8. Has my host or email provider warned me?

Hosts scan for malware and may suspend a site or email you about "malicious files". Email providers may start rejecting messages from your domain because a hacked site has been sending spam. Don't dismiss these as false alarms without checking.

## 9. Did my traffic or speed change suddenly?

A sharp drop in Google traffic can follow a hack once Google notices spam on the site. A sudden spike in server load, bandwidth or outgoing email can mean the site is being used to attack others or send spam. Check your hosting resource graphs alongside your analytics.

## 10. Has anything changed that I didn't change?

Unknown plugins in the plugin list, a changed site title or tagline, new pages in drafts, links in your footer you never added, or ads appearing on pages. Any change nobody on your team made needs an explanation.

## I found a sign. What do I do first?

Stay calm and work through these in order, because deleting things too early can destroy the evidence you need:

1. **Don't delete anything yet.** Take a full copy of the files and database as they are now. You'll need it to work out how the attacker got in.
2. **Change every password:** all WordPress administrators, the hosting account, the database, FTP or SFTP, and any connected email accounts. Turn on two-factor login.
3. **Put the site into maintenance mode** if visitors are being redirected or warned, so customers aren't harmed while you clean.
4. **Clean, then close the door.** Replace core files with clean copies, check plugins and uploads, remove unknown users, and update or remove the plugin that let them in. My step-by-step guide on [how to fix a hacked WordPress site](/blog/fix-hacked-wordpress-site/) covers each step.

## A real example: the scanner said clean, the site was not

A SaaS site had its Google Ads disapproved for "Compromised Site", and an appeal after a scanner cleanup had failed. The way in was a pirated copy of a paid caching plugin. A second pirated plugin, the page builder's Pro add-on, held hidden code that loaded content from an outside server over plain HTTP, and the scanner missed it. WordPress core and every free plugin matched the official checksums, so only a manual check of uploads, the database, scheduled tasks and server keys found the rest. The lesson for your own check: a clean scanner result does not clear a site that runs pirated plugins. See [the Google Ads Compromised Site flag](/blog/google-ads-compromised-site/) for how that case ended.

## How do attackers usually get in?

Patchstack's [2026 report](https://www.patchstack.com/whitepaper/state-of-wordpress-security-in-2026/) found that 91% of new WordPress vulnerabilities in 2025 were in plugins. In practice, most hacked sites I see share three things: plugins left months behind on updates, a premium plugin or theme downloaded from an unofficial "nulled" site, and an administrator password used somewhere else. Fix those three and you remove most of the risk.

## Is there a five-minute check I can run every month?

You don't need to be a security expert to catch problems early. Once a month:

- Run `site:yourdomain.com` in Google and glance through the results
- Check Search Console's Security issues report
- Review the list of administrator users
- Open the site on your phone from a Google search
- Confirm your last backup ran and is stored off the server

That routine catches most hacks within weeks rather than months. If you'd rather not do it yourself, it's part of every [WordPress maintenance plan](/wordpress-development/wordpress-maintenance/) I run, along with tested updates that close the holes before they're used.

## When should I call for help?

Prices vary a lot, so see [what WordPress malware removal costs](/blog/wordpress-malware-removal-cost/) before you decide.

Get help if you find PHP files you can't explain, if the infection comes back after cleaning, if the site takes payments or stores customer data, or if Google has already flagged it. Those cases need a careful clean and a written record of what was found. Send me the address and I'll tell you what I see before you spend anything.
