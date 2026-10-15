---
title: "How to check if your WordPress site is hacked: 10 signs to look for"
seoTitle: "How to Check if Your WordPress Site Is Hacked"
description: "How to check if your WordPress site is hacked: ten warning signs, the free checks that confirm it, and what to do first if you find one."
focus: check if your WordPress site is hacked
date: "2026-10-15"
art: hackcheck
topic: Fixes and maintenance
service: wordpress-maintenance
imageAlt: "A checklist of hack warning signs: unknown admin users, spam redirects, new files in uploads and a Google warning"
sources:
  - { name: "Google Search Central, Help for hacked sites", url: "https://developers.google.com/search/docs/monitor-debug/security/hacked-sites" }
  - { name: "WP-CLI, wp core verify-checksums", url: "https://developer.wordpress.org/cli/commands/core/verify-checksums/" }
  - { name: "Patchstack, State of WordPress Security in 2026", url: "https://www.patchstack.com/whitepaper/state-of-wordpress-security-in-2026/" }
faq:
  - { q: "How can I check if my WordPress site is hacked for free?", a: "Search Google for site:yourdomain.com to look for spam pages, check Search Console's Security issues report, review your WordPress admin users, look for PHP files in the uploads folder, and run WP-CLI's checksum commands to compare core and plugin files with the official copies." }
  - { q: "Can a WordPress site be hacked without me noticing?", a: "Yes. Many hacks are designed to stay hidden: they redirect only mobile visitors or visitors from Google, or add spam pages that only search engines see. That is why checking from a phone, in a private window and through Google matters." }
  - { q: "Why is my WordPress site redirecting to another site?", a: "Unwanted redirects are one of the most common signs of a hack. Malware often redirects only some visitors, such as first-time visitors on mobile, so the site can look normal to you while customers are sent to spam or scam pages." }
  - { q: "Does Google tell you if your site is hacked?", a: "Often, but not always. If Google detects hacked content or malware it shows a warning in search results and lists the problem in Search Console under Security issues, and sends an email to verified owners." }
  - { q: "What should I do first if my WordPress site is hacked?", a: "Take a full copy of the site as it is, then change every password: WordPress admins, hosting, database and FTP. After that, clean the site from trusted copies and close the hole the attacker used before you make it public again." }
---

If you want to check if your WordPress site is hacked, start by assuming the hack is trying to hide. Most modern WordPress malware does not deface your home page. It quietly adds spam pages for search engines, redirects some visitors to scam sites, or creates a hidden admin account to come back later. You can look straight at your site and see nothing wrong. Here are the ten signs I check first, and the free tools that confirm them.

## Why hacked WordPress sites look normal

Attackers make money from your site's reputation and traffic, not from breaking it. A site that keeps working keeps its rankings, so the hack stays useful for longer. That is why so many hacks only show themselves to:

- Visitors arriving from Google, not those typing your address
- Mobile visitors, not desktop
- First-time visitors, tracked by a cookie
- Search engine crawlers, who see spam pages you never see

So the checks below deliberately look at the site the way strangers and search engines do.

## 1. Spam pages under your domain in Google

Search Google for `site:yourdomain.com`. Scroll through the results. Pages you never created, often about pharmacy products, gambling, replica goods or in a language you do not use, are the clearest sign of a hack. Also try `site:yourdomain.com` with words like "casino" or "viagra" to surface hidden pages faster.

## 2. A warning in search results or Search Console

If Google detects a problem it may label your result "This site may be hacked" or show a red warning page in Chrome. Open Google Search Console and check **Security issues** and **Manual actions**. Both should say no issues detected. Google's [help for hacked sites](https://developers.google.com/search/docs/monitor-debug/security/hacked-sites) explains each message.

## 3. Redirects that only happen sometimes

Open your site on your phone, on mobile data rather than Wi-Fi, in a private window. Then search for your business on Google and click through to your site. If you land somewhere else even once, treat it as a hack, even if it never happens on your laptop.

## 4. Admin users you did not create

In the WordPress dashboard, go to Users and filter by Administrator. Every name should be someone you know. Attackers often add an account with a plausible name such as "support", "wpadmin" or a copy of a real user's name with one letter changed. Check the email addresses too.

## 5. PHP files in the uploads folder

The `wp-content/uploads` folder should only contain images, PDFs and similar files. Using your host's file manager, search inside it for files ending in `.php`. There is almost never a legitimate reason for one to be there, and it is a classic place to hide a back door.

## 6. Core files that do not match WordPress.org

WordPress publishes checksums for every file. If you or your developer can use WP-CLI, run `wp core verify-checksums` ([command reference](https://developer.wordpress.org/cli/commands/core/verify-checksums/)) to list any core file that has been changed, and `wp plugin verify-checksums --all` to do the same for plugins from the WordPress directory. Modified core files on a site nobody has edited are a strong sign of a hack.

## 7. New or strange scheduled tasks

Malware often reinstalls itself using WordPress's scheduled tasks (cron). A plugin such as WP Crontrol, or `wp cron event list` in WP-CLI, shows them. Look for tasks with random-looking names or tasks that belong to no plugin you have installed.

## 8. Your host or email provider warns you

Hosts scan for malware and may suspend a site or email you about "malicious files". Email providers may start rejecting messages from your domain because a hacked site has been sending spam. Do not dismiss these as false alarms without checking.

## 9. Sudden changes in traffic or speed

A sharp drop in Google traffic can follow a hack once Google notices spam on the site. A sudden spike in server load, bandwidth or outgoing email can mean the site is being used to attack others or send spam. Check your hosting resource graphs alongside your analytics.

## 10. Things you did not change

Unknown plugins in the plugin list, changed site title or tagline, new pages in drafts, links in your footer you never added, or ads appearing on pages. Any change nobody on your team made needs an explanation.

## If you find a sign: what to do first

1. **Do not delete things yet.** Take a full copy of the files and database as they are now. You will need it to work out how the attacker got in.
2. **Change every password:** all WordPress administrators, the hosting account, the database, FTP or SFTP, and any connected email accounts. Turn on two-factor login.
3. **Put the site into maintenance mode** if visitors are being redirected or warned, so customers are not harmed while you clean.
4. **Clean, then close the door.** Replace core files with clean copies, check plugins and uploads, remove unknown users, and update or remove the plugin that let them in. My step-by-step guide on [how to fix a hacked WordPress site](/blog/fix-hacked-wordpress-site/) covers each step.

## How hacks usually get in

Patchstack's [2026 report](https://www.patchstack.com/whitepaper/state-of-wordpress-security-in-2026/) found that 91% of new WordPress vulnerabilities in 2025 were in plugins. In practice, most hacked sites I see share three things: plugins left months behind on updates, a premium plugin or theme downloaded from an unofficial "nulled" site, and an administrator password used somewhere else. Fixing those three removes most of the risk.

## A monthly five-minute check

You do not need to be a security expert to catch problems early. Once a month:

- Run `site:yourdomain.com` in Google and glance through the results
- Check Search Console's Security issues report
- Review the list of administrator users
- Open the site on your phone from a Google search
- Confirm your last backup ran and is stored off the server

That routine catches most hacks within weeks rather than months. If you would rather not do it yourself, it is part of every [WordPress maintenance plan](/wordpress-maintenance/) I run, along with tested updates that close the holes before they are used.

## When to call for help

Get help if you find PHP files you cannot explain, if the infection comes back after cleaning, if the site takes payments or stores customer data, or if Google has already flagged it. Those cases need a careful clean and a written record of what was found. Send me the address and I will tell you what I see before you spend anything.
