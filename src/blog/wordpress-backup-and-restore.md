---
title: "WordPress backup and restore: how to do it so it works when needed"
seoTitle: "WordPress Backup and Restore: A Complete Guide"
description: "WordPress backup and restore that works: what to back up, where to keep it, how to test. Learn how."
focus: WordPress backup and restore
date: "2026-10-15"
art: backup
topic: Fixes and maintenance
service: wordpress-care-plans
imageAlt: "A list of daily off-site WordPress backups with one selected and a restore this backup button"
sources:
  - { name: "WordPress.org Documentation, WordPress Backups", url: "https://wordpress.org/documentation/article/wordpress-backups/" }
  - { name: "WP-CLI, wp db export", url: "https://developer.wordpress.org/cli/commands/db/export/" }
faq:
  - { q: "What should a WordPress backup include?", a: "Both the database, which holds posts, pages, settings, users and orders, and the files, especially wp-content with uploads, themes and plugins, plus wp-config.php. A backup of only one of the two cannot fully restore the site." }
  - { q: "How often should I back up WordPress?", a: "Daily for most business sites. Stores and sites that change many times a day should back up the database more often, even hourly, because every order since the last backup would be lost in a restore." }
  - { q: "Are my host's backups enough?", a: "They are a good second copy, but not enough on their own. They are often stored on the same infrastructure, kept for a short time, and may cost extra to restore. Keep at least one copy somewhere you control." }
  - { q: "How do I restore a WordPress backup?", a: "Use your backup tool's restore function or your host's restore option. Manually, upload the files and import the database, then check wp-config.php has the right database details. Test the restore on a staging site first if you can." }
  - { q: "How long should I keep WordPress backups?", a: "Keep at least 30 days of daily backups, so you can go back to before a hack or a mistake that was noticed late, plus a few older monthly copies." }
---

You probably have a backup of your WordPress site. The question is whether it would actually bring the site back on your worst day. A WordPress backup and restore plan is the one piece of maintenance you only find out about when something breaks. Most site owners have backups of some kind. Far fewer have backups that include everything, are stored somewhere safe, and have been restored once to prove they work. Here's how to set them up so a hacked server, a failed update or a deleted page is an inconvenience instead of a disaster.

## What must my backup include?

A WordPress site lives in two places, and a backup needs both ([WordPress.org's backup guide](https://wordpress.org/documentation/article/wordpress-backups/)):

- **The database:** every post, page, setting, user, form entry and, on stores, every order and customer.
- **The files:** the `wp-content` folder with your uploads (images, PDFs), themes and plugins, plus `wp-config.php`, which holds the settings that connect WordPress to the database.

A database-only backup brings back your words but not your images. A files-only backup brings back the design but not your content. Check that your tool takes both.

## How often should I back up?

Match the backup to how often the site changes:

- **Brochure sites** that change a few times a month: daily is plenty.
- **Blogs and busy business sites:** daily, plus a backup before every update or big change.
- **Stores and membership sites:** the database more often, even hourly, because a restore loses everything since the last backup, including real orders.

Always take one more backup right before updating plugins or making changes. It costs a minute and is the quickest way back if the update fails.

## Where should I keep my backups?

Follow the 3-2-1 rule. A backup stored on the same server as the site disappears with it when the server fails or is hacked. The rule of thumb:

- **3 copies** of your data
- on **2 different kinds of storage**
- with **1 copy off-site,** somewhere your hosting company and an attacker on your server can't reach

In practice: your host's backups, plus a backup plugin sending copies to cloud storage you own, such as Google Drive, Dropbox or an S3-compatible bucket.

## How long should I keep backups?

Hacks and mistakes are often noticed late. If you only keep seven days of backups and the site was hacked twelve days ago, every backup you have contains the hack. Keep at least 30 days of daily backups, plus a few monthly copies going further back.

## Have I tested a restore?

This is the step almost everyone skips. A backup you've never restored is a hope, not a plan. Every few months:

1. Create a staging site or a local copy
2. Restore a recent backup to it
3. Check the home page, a few posts, images, forms and, on stores, recent orders
4. Write down how long it took

That last number matters. If restoring takes three hours, you know your site would be down for at least that long on a bad day.

## How do I restore WordPress?

It depends on where your backup lives, so start with the option that matches yours.

**With a backup plugin or your host:** choose the backup from before the problem, restore files and database together, then clear every cache and test.

**Manually:**

1. Upload the backed-up files over SFTP, replacing the current ones
2. Import the database into a fresh database using phpMyAdmin or WP-CLI (`wp db import`; exports use [`wp db export`](https://developer.wordpress.org/cli/commands/db/export/))
3. Make sure the database name, user and password in `wp-config.php` match
4. If the address changed (for example, restoring to staging), update it in the database with a search-and-replace tool
5. Log in, re-save permalinks, clear caches and test

## Is it safe to restore after a hack?

Be careful. Restoring last week's backup after a hack often brings the hack back, because the attacker got in earlier than you noticed. Restore from a backup you're confident predates the hack, then immediately update everything and close the hole that let them in, before the site is public. My guides on [checking if your site is hacked](/blog/how-to-check-if-wordpress-site-is-hacked/) and [fixing a hacked WordPress site](/blog/fix-hacked-wordpress-site/) cover the rest.

## Which backup mistakes leave me with nothing?

These are why people find out on their worst day that they have no usable backup:

- **Backups stored only on the same server**
- **Backups that silently stopped** months ago because storage filled up or a password changed
- **Only the database, or only the files**
- **Too short a history** to go back before a late-noticed problem
- **Never tested,** so the first restore happens under pressure
- **No backup before updates,** the single most useful moment to have one

## How do I make backups automatic, then check them?

The ideal set-up runs on its own and tells you when it fails: daily automatic backups, copies sent off-site, an alert if a backup fails, and a test restore every few months. That's part of every [WordPress maintenance plan](/custom-web-development/website-maintenance/) I run, alongside tested updates. If you're doing it yourself, add these steps to your [WordPress maintenance checklist](/blog/wordpress-maintenance-checklist/).

## Should I use a backup plugin, my host's backups, or both?

**Host backups** are convenient and often free, but they're usually stored on the host's own infrastructure, kept for a limited time, and sometimes charged for when you restore. **A backup plugin** gives you control over how often backups run, how long they're kept and where copies go. The safest set-up uses both: the host's backups for quick restores, and a plugin sending copies somewhere you own.

When choosing a plugin, check that it backs up both files and the database, can send copies to off-site storage, can restore to a different address (useful for staging), alerts you when a backup fails, and doesn't slow the site down while it runs on large sites.

## What's different for a WooCommerce store?

Orders. If you restore yesterday's backup, today's orders disappear from WordPress, even though the customers paid. Before restoring a store, export recent orders, or choose a restore method that leaves the order tables untouched, and reconcile with your payment gateway afterwards. Back up the database more often on busy stores, so a restore never loses more than a short window.

## What's a quick health check for my backups?

Right now, answer three questions: when did your last backup run, where is the copy stored, and when did anyone last restore one? If any answer is "I'm not sure", fix that this week. It's the cheapest insurance your website will ever have.

## What if my site is down and the backup won't restore?

Don't keep retrying on the live site. Take a copy of what's there, and get help. A one-off fix starts from $150, and it comes with a note of what went wrong so your next restore works first time.
