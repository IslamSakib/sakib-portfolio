---
title: "WordPress backup and restore: how to do it so it works when needed"
seoTitle: "WordPress Backup and Restore: A Complete Guide"
description: "WordPress backup and restore done right: what to back up, how often, where to keep copies, and how to test a restore before the day you really need it."
focus: WordPress backup and restore
date: "2026-10-15"
art: backup
topic: Fixes and maintenance
service: wordpress-maintenance
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

A WordPress backup and restore plan is the one piece of maintenance you only find out about on your worst day. Most site owners have backups of some kind. Far fewer have backups that include everything, are stored somewhere safe, and have actually been restored once to prove they work. Here is how to set them up so a hacked server, a failed update or a deleted page is an inconvenience instead of a disaster.

## What a WordPress backup must include

A WordPress site lives in two places, and a backup needs both ([WordPress.org's backup guide](https://wordpress.org/documentation/article/wordpress-backups/)):

- **The database:** every post, page, setting, user, form entry and, on stores, every order and customer.
- **The files:** the `wp-content` folder with your uploads (images, PDFs), themes and plugins, plus `wp-config.php`, which holds the settings that connect WordPress to the database.

A database-only backup brings back your words but not your images. A files-only backup brings back the design but not your content. Check that your tool takes both.

## How often to back up

Match the backup to how often the site changes:

- **Brochure sites** that change a few times a month: daily is plenty.
- **Blogs and busy business sites:** daily, plus a backup before every update or big change.
- **Stores and membership sites:** the database more often, even hourly, because a restore loses everything since the last backup, including real orders.

Always take one more backup right before updating plugins or making changes. It costs a minute and is the quickest way back if the update fails.

## Where to keep backups: the 3-2-1 idea

A backup stored on the same server as the site disappears with it when the server fails or is hacked. A simple rule of thumb:

- **3 copies** of your data
- on **2 different kinds of storage**
- with **1 copy off-site,** somewhere your hosting company and an attacker on your server cannot reach

In practice: your host's backups, plus a backup plugin sending copies to cloud storage you own, such as Google Drive, Dropbox or an S3-compatible bucket.

## How long to keep them

Hacks and mistakes are often noticed late. If you only keep seven days of backups and the site was hacked twelve days ago, every backup you have contains the hack. Keep at least 30 days of daily backups, plus a few monthly copies going further back.

## Testing a restore: the step everyone skips

A backup you have never restored is a hope, not a plan. Every few months:

1. Create a staging site or a local copy
2. Restore a recent backup to it
3. Check the home page, a few posts, images, forms and, on stores, recent orders
4. Write down how long it took

That last number matters. If restoring takes three hours, you know your site would be down for at least that long on a bad day.

## How to restore WordPress

**With a backup plugin or your host:** choose the backup from before the problem, restore files and database together, then clear every cache and test.

**Manually:**

1. Upload the backed-up files over SFTP, replacing the current ones
2. Import the database into a fresh database using phpMyAdmin or WP-CLI (`wp db import`; exports use [`wp db export`](https://developer.wordpress.org/cli/commands/db/export/))
3. Make sure the database name, user and password in `wp-config.php` match
4. If the address changed (for example, restoring to staging), update it in the database with a search-and-replace tool
5. Log in, re-save permalinks, clear caches and test

## Restoring after a hack: be careful

Restoring last week's backup after a hack often brings the hack back, because the attacker got in earlier than you noticed. Restore from a backup you are confident predates the hack, then immediately update everything and close the hole that let them in, before the site is public. My guides on [checking if your site is hacked](/blog/how-to-check-if-wordpress-site-is-hacked/) and [fixing a hacked WordPress site](/blog/fix-hacked-wordpress-site/) cover the rest.

## Common backup mistakes

- **Backups stored only on the same server**
- **Backups that silently stopped** months ago because storage filled up or a password changed
- **Only the database, or only the files**
- **Too short a history** to go back before a late-noticed problem
- **Never tested,** so the first restore happens under pressure
- **No backup before updates,** the single most useful moment to have one

## Making it automatic and checked

The ideal set-up runs on its own and tells you when it fails: daily automatic backups, copies sent off-site, an alert if a backup fails, and a test restore every few months. That is part of every [WordPress maintenance plan](/wordpress-maintenance/) I run, alongside tested updates. If you are doing it yourself, add these steps to your [WordPress maintenance checklist](/blog/wordpress-maintenance-checklist/).

## Backup plugin, host backups or both

**Host backups** are convenient and often free, but they are usually stored on the host's own infrastructure, kept for a limited time, and sometimes charged for when you restore. **A backup plugin** gives you control over how often backups run, how long they are kept and where copies go. The safest set-up uses both: the host's backups for quick restores, and a plugin sending copies somewhere you own.

When choosing a plugin, check that it backs up both files and the database, can send copies to off-site storage, can restore to a different address (useful for staging), alerts you when a backup fails, and does not slow the site down while it runs on large sites.

## Backups for WooCommerce stores

Stores have one extra problem: orders. If you restore yesterday's backup, today's orders disappear from WordPress, even though the customers paid. Before restoring a store, export recent orders, or choose a restore method that leaves the order tables untouched, and reconcile with your payment gateway afterwards. Back up the database more often on busy stores, so a restore never loses more than a short window.

## A quick backup health check

Right now, answer three questions: when did your last backup run, where is the copy stored, and when did anyone last restore one? If any answer is "I am not sure", fix that this week. It is the cheapest insurance your website will ever have.

## When you need help

If your site is down and your backup will not restore, do not keep retrying on the live site. Take a copy of what is there, and get help. A one-off fix starts from $150, and it comes with a note of what went wrong so your next restore works first time.
