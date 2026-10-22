---
title: "How to fix a hacked WordPress site and know it is clean"
seoTitle: "How to Fix a Hacked WordPress Site: Step by Step"
description: "How to fix a hacked WordPress site step by step: contain it, clean it, close the way in. Learn how."
focus: fix a hacked WordPress site
date: "2026-10-15"
art: shield
topic: Fixes and maintenance
service: wordpress-malware-removal
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

Your site's been hacked, and every instinct says start deleting things. Slow down for ten minutes. To fix a hacked WordPress site properly, you have to remove every way back in, not only the visible damage, or it'll be hacked again within days. This is the order I work in.

## How do I know my WordPress site has been hacked?

These are the signs I see most often, and any one of them is reason enough to check your site properly:

- Visitors are redirected to spam, gambling or pharmacy sites, often only on mobile or only when they arrive from Google
- Google shows strange pages from your site when you search for site:yourdomain.com
- Chrome or Google Search shows a "this site may be hacked" or "dangerous site" warning
- Admin users you don't recognise appear under Users
- Your host suspends the account for malware or spam email
- New PHP files appear in folders like wp-content/uploads, which should only hold images and documents

## Step 1: Take a copy before you touch anything

Download a full backup of the files and the database as they are now. You may need it to see how the attacker got in, and it protects you if the clean-up goes wrong.

## Step 2: Change every password

Change the hosting account, SFTP, database, every WordPress administrator, and the email account tied to the site. Then replace the security keys (the salts in wp-config.php). That logs everyone out, including the attacker.

## Step 3: Replace WordPress files with clean copies

Don't try to clean infected core files line by line. Reinstall WordPress core from wordpress.org, and reinstall every plugin and theme from its official source. If WP-CLI is available on your host, the commands `wp core verify-checksums` and `wp plugin verify-checksums --all` list the files that were changed.

## Step 4: Search what you can't reinstall

The uploads folder, wp-config.php, .htaccess and the database are unique to your site. Look for PHP files inside uploads (there should be none), unfamiliar code at the top of wp-config.php, redirect rules you didn't add in .htaccess, and suspicious scripts in posts or in the options table.

## Step 5: Remove unknown admin users

Delete any administrator you didn't create, and check that the remaining users still have the right roles.

## Step 6: Close the door they came in through

Most hacks come through an outdated plugin or theme (Patchstack found [91% of new WordPress vulnerabilities in 2025](https://www.patchstack.com/whitepaper/state-of-wordpress-security-in-2026/) were in plugins), a pirated ("nulled") premium plugin, or a reused password. Remove plugins you don't use, update everything, and replace any premium plugin that wasn't bought from its developer.

## Step 7: Tell Google the site is clean

If a Google Ads campaign was stopped, read [what a Compromised Site disapproval means and how to appeal it](/blog/google-ads-compromised-site/).

If Google flagged the site, request a review in Search Console under Security issues once you're sure it's clean, as [Google's help page](https://support.google.com/websearch/answer/190597) describes. The warning is removed after a successful review.

## How do I know my site is really clean?

"It looks fine now" isn't the same as clean. Hackers usually leave more than one way back in, and a site that looks normal can still be sending spam, redirecting mobile visitors or hiding links to other sites that only Google sees. Before you call it done, check:

1. **Core files match WordPress.org.** Tools such as WP-CLI's `wp core verify-checksums` compare every core file with the official copy.
2. **Plugins match their official versions.** `wp plugin verify-checksums --all` does the same for plugins from the WordPress directory.
3. **No PHP files in uploads.** The `wp-content/uploads` folder should hold images and documents, never `.php` files.
4. **No unknown scheduled tasks.** Malware often re-installs itself through WordPress cron jobs. List them and remove anything you don't recognise.
5. **No hidden redirects.** Visit the site from a phone on mobile data, and search Google for `site:yourdomain.com` to look for spam pages in your results.
6. **Clean in Google's eyes.** Search Console's Security issues report should be empty.

Then watch it for a few weeks. If the infection returns, a back door was missed, and it's time to rebuild from clean copies rather than keep patching.

## Why won't restoring a backup keep me safe?

Restoring last week's backup feels like a fix, but the hack usually started earlier than you noticed, so the backup may already be infected. Even a clean backup brings back the outdated plugin that let the attacker in. Restore only from a backup you know predates the hack, then update and harden immediately, before the site is public again.

## Which security steps actually stop the next hack?

Most "security plugins" add a long list of settings. These few things make the biggest difference:

- **Update promptly.** Most attacks use known holes in old plugin versions.
- **Remove what you don't use.** Deactivated plugins can still be exploited. Delete them.
- **Use strong, unique passwords and two-factor login** for every admin account.
- **Give people only the access they need.** Editors don't need administrator accounts.
- **Keep off-site backups** so recovery never depends on the hacked server.

If you want to catch problems early, read [how to check if your WordPress site is hacked](/blog/how-to-check-if-wordpress-site-is-hacked/). Most of the warning signs show up days before visitors notice.

## What do I tell my customers after a hack?

If customer data may have been exposed, for example on a store or a site with user accounts, take advice on whether you must notify customers or a regulator. Rules differ by country. Even when you don't have to, a short honest note builds more trust than silence: what happened, what you did, and whether anyone needs to change a password.

If the site only showed spam or redirected visitors, a notice is rarely needed, but check your email. Hacked sites are often used to send spam, which can get your domain's email blocked. Ask your host or email provider whether your domain was put on a block list, and request removal once the site is clean.

## How do I keep the site clean from now on?

Hacked sites are almost always unmaintained sites. Tested updates, off-site backups and monitoring for changed files catch problems in hours instead of weeks. That's the core of a [WordPress maintenance plan](/website-care/). If your site is hacked right now, send me the address and I'll tell you what I see before you spend anything.
