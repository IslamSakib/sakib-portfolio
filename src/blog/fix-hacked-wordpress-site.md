---
title: "How to fix a hacked WordPress site, and know for sure it is clean"
seoTitle: "How to Fix a Hacked WordPress Site: Step by Step"
description: "How to fix a hacked WordPress site: the signs it has been hacked, the clean-up steps in the right order, and how to stop it happening again."
focus: fix a hacked WordPress site
date: "2026-10-15"
art: shield
topic: Fixes and maintenance
service: wordpress-maintenance
imageAlt: "A security scan finding a suspicious file and an unknown admin user, with a card showing malware removed, passwords reset and the hole closed"
stats:
  - { value: "11,334", label: "new WordPress vulnerabilities found in 2025, 42% more than in 2024", source: "Patchstack, State of WordPress Security in 2026", url: "https://www.patchstack.com/whitepaper/state-of-wordpress-security-in-2026/" }
  - { value: "91%", label: "of them were in plugins, 9% in themes", source: "Patchstack, State of WordPress Security in 2026", url: "https://www.patchstack.com/whitepaper/state-of-wordpress-security-in-2026/" }
  - { value: "5 hours", label: "median time to mass exploitation for heavily exploited flaws", source: "Patchstack, State of WordPress Security in 2026", url: "https://www.patchstack.com/whitepaper/state-of-wordpress-security-in-2026/" }
sources:
  - { name: "Patchstack, State of WordPress Security in 2026", url: "https://www.patchstack.com/whitepaper/state-of-wordpress-security-in-2026/" }
  - { name: "Google Search Help, hacked site warnings", url: "https://support.google.com/websearch/answer/190597" }
faq:
  - { q: "How do I know if my WordPress site has been hacked?", a: "Common signs are unknown admin users, redirects to spam sites (often only on mobile), new PHP files in the uploads folder, a Google warning in search results, emails from your host about malware, or sudden spam pages indexed under your domain." }
  - { q: "Can I fix a hacked WordPress site myself?", a: "Often, yes, if you can replace core files with clean copies, check plugins and uploads, remove unknown users and change every password. If the infection keeps coming back, a back door was missed and a full clean or rebuild is safer." }
  - { q: "Will restoring a backup fix a hacked site?", a: "Only if the backup is from before the hack started, and even then the hole that let the attacker in comes back with it. Restore, then update everything and close the entry point before the site is public again." }
  - { q: "How do I remove the Google hacked site warning?", a: "Clean the site completely, then request a review in Google Search Console under Security issues. Google removes the warning after a successful review, which usually takes a few days." }
  - { q: "How do WordPress sites get hacked?", a: "Mostly through outdated plugins and themes with known security holes, pirated premium plugins that ship with malware, and reused or weak passwords. Patchstack found 91% of new WordPress vulnerabilities in 2025 were in plugins." }
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

## How to know for sure it is clean

"It looks fine now" is not the same as clean. Hackers usually leave more than one way back in, and a site that looks normal can still be sending spam, redirecting mobile visitors or hiding links to other sites that only Google sees. Before you call it done, check:

1. **Core files match WordPress.org.** Tools such as WP-CLI's `wp core verify-checksums` compare every core file with the official copy.
2. **Plugins match their official versions.** `wp plugin verify-checksums --all` does the same for plugins from the WordPress directory.
3. **No PHP files in uploads.** The `wp-content/uploads` folder should hold images and documents, never `.php` files.
4. **No unknown scheduled tasks.** Malware often re-installs itself through WordPress cron jobs. List them and remove anything you do not recognise.
5. **No hidden redirects.** Visit the site from a phone on mobile data, and search Google for `site:yourdomain.com` to look for spam pages in your results.
6. **Clean in Google's eyes.** Search Console's Security issues report should be empty.

Then watch it for a few weeks. If the infection returns, a back door was missed, and it is time to rebuild from clean copies rather than keep patching.

## Why reinstalling a backup is not enough

Restoring last week's backup feels like a fix, but the hack usually started earlier than you noticed, so the backup may already be infected. Even a clean backup brings back the outdated plugin that let the attacker in. Restore only from a backup you know predates the hack, then update and harden immediately, before the site is public again.

## Hardening that actually helps

Most "security plugins" add a long list of settings. The few things that make the biggest difference:

- **Update promptly.** Most attacks use known holes in old plugin versions.
- **Remove what you do not use.** Deactivated plugins can still be exploited. Delete them.
- **Use strong, unique passwords and two-factor login** for every admin account.
- **Give people only the access they need.** Editors do not need administrator accounts.
- **Keep off-site backups** so recovery never depends on the hacked server.

If you want to catch problems early, read [how to check if your WordPress site is hacked](/blog/how-to-check-if-wordpress-site-is-hacked/): most of the warning signs show up days before visitors notice.

## What to tell your customers

If customer data may have been exposed, for example on a store or a site with user accounts, take advice on whether you must notify customers or a regulator; rules differ by country. Even when you do not have to, a short honest note builds more trust than silence: what happened, what you did, and whether anyone needs to change a password.

If the site only showed spam or redirected visitors, a notice is rarely needed, but check your email: hacked sites are often used to send spam, which can get your domain's email blocked. Ask your host or email provider whether your domain was put on a block list, and request removal once the site is clean.

## Keeping it clean

Hacked sites are almost always unmaintained sites. Tested updates, off-site backups and monitoring for changed files catch problems in hours instead of weeks. That is the core of a [WordPress maintenance plan](/wordpress-maintenance/). If your site is hacked right now, send me the address and I will tell you what I see before you spend anything.
