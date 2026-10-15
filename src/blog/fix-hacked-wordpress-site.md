---
title: "How to fix a hacked WordPress site, and know for sure it is clean"
seoTitle: "How to Fix a Hacked WordPress Site: Step by Step"
description: "How to fix a hacked WordPress site: the signs it has been hacked, the clean-up steps in the right order, and how to stop it happening again."
focus: fix a hacked WordPress site
date: "2026-10-15"
art: shield
topic: Fixes and maintenance
service: wordpress-maintenance
imageAlt: "Dark violet cover with a shield outline and a purple check mark over a website frame, for cleaning a hacked WordPress site"
stats:
  - { value: "11,334", label: "new WordPress vulnerabilities found in 2025, 42% more than in 2024", source: "Patchstack, State of WordPress Security in 2026", url: "https://www.patchstack.com/whitepaper/state-of-wordpress-security-in-2026/" }
  - { value: "91%", label: "of them were in plugins, 9% in themes", source: "Patchstack, State of WordPress Security in 2026", url: "https://www.patchstack.com/whitepaper/state-of-wordpress-security-in-2026/" }
  - { value: "5 hours", label: "median time to mass exploitation for heavily exploited flaws", source: "Patchstack, State of WordPress Security in 2026", url: "https://www.patchstack.com/whitepaper/state-of-wordpress-security-in-2026/" }
sources:
  - { name: "Patchstack, State of WordPress Security in 2026", url: "https://www.patchstack.com/whitepaper/state-of-wordpress-security-in-2026/" }
  - { name: "Google Search Help, hacked site warnings", url: "https://support.google.com/websearch/answer/190597" }
---

Finding out your site has been hacked is stressful, and the urge is to start deleting things. Slow down for ten minutes. To fix a hacked WordPress site properly you have to remove every way back in, not only the visible damage, or it will be hacked again within days.

## Signs your WordPress site has been hacked

- Visitors are redirected to spam, gambling or pharmacy sites, often only on mobile or only when they arrive from Google
- Google shows strange pages from your site when you search for site:yourdomain.com
- Chrome or Google Search shows a "this site may be hacked" or "dangerous site" warning
- Admin users you do not recognise appear under Users
- Your host suspends the account for malware or spam email
- New PHP files appear in folders like wp-content/uploads, which should only hold images and documents

## Step 1: Take a copy before you touch anything

Download a full backup of the files and the database as they are now. You may need it to see how the attacker got in, and it protects you if the clean-up goes wrong.

## Step 2: Change every password

Hosting account, SFTP, database, every WordPress administrator, and the email account tied to the site. Then replace the security keys (the salts in wp-config.php), which logs everyone out, including the attacker.

## Step 3: Replace WordPress files with clean copies

Do not try to clean infected core files line by line. Reinstall WordPress core from wordpress.org, and reinstall every plugin and theme from its official source. If WP-CLI is available on your host, the commands `wp core verify-checksums` and `wp plugin verify-checksums --all` list the files that were changed.

## Step 4: Search what cannot be reinstalled

The uploads folder, wp-config.php, .htaccess and the database are unique to your site. Look for PHP files inside uploads (there should be none), unfamiliar code at the top of wp-config.php, redirect rules you did not add in .htaccess, and suspicious scripts in posts or in the options table.

## Step 5: Remove unknown admin users

Delete any administrator you did not create, and check that the remaining users still have the right roles.

## Step 6: Close the door they came in through

Most hacks come through an outdated plugin or theme (Patchstack found [91% of new WordPress vulnerabilities in 2025](https://www.patchstack.com/whitepaper/state-of-wordpress-security-in-2026/) were in plugins), a pirated ("nulled") premium plugin, or a reused password. Remove plugins you do not use, update everything, and replace any premium plugin that was not bought from its developer.

## Step 7: Tell Google it is clean

If Google flagged the site, request a review in Search Console under Security issues once you are sure it is clean, as [Google's help page](https://support.google.com/websearch/answer/190597) describes. The warning is removed after a successful review.

## Keeping it clean

Hacked sites are almost always unmaintained sites. Tested updates, off-site backups and monitoring for changed files catch problems in hours instead of weeks. That is the core of a [WordPress maintenance plan](/wordpress-maintenance/). If your site is hacked right now, send me the address and I will tell you what I see before you spend anything.
