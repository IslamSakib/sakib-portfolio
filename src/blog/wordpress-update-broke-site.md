---
title: "WordPress update broke my site: how to get it back and fix it"
seoTitle: "WordPress Update Broke My Site? How to Fix It Fast"
description: "A WordPress update broke your site? How to get it back online fast, find the update that caused it, fix it properly and update safely from now on."
focus: WordPress update broke
date: "2026-10-15"
art: update
topic: Fixes and maintenance
service: wordpress-maintenance
imageAlt: "A WordPress updates screen with plugins waiting to update and a site down message, with restore from backup and update on staging steps"
sources:
  - { name: "WordPress Developer Resources, Debugging in WordPress", url: "https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/" }
  - { name: "WordPress.org, Fatal error recovery mode in 5.2", url: "https://make.wordpress.org/core/2019/04/16/fatal-error-recovery-mode-in-5-2/" }
faq:
  - { q: "What do I do if a WordPress update broke my site?", a: "First get the site back: use the recovery mode email link, or disable the updated plugin by renaming its folder, or restore the most recent backup. Then find which update caused it on a staging copy and fix or replace that plugin before updating again." }
  - { q: "Can I undo a WordPress plugin update?", a: "Yes. You can restore a backup from before the update, or install the previous version of the plugin. WordPress.org keeps older versions of free plugins under Advanced View on each plugin's page." }
  - { q: "Why do WordPress updates break sites?", a: "A plugin may rely on code another plugin or WordPress itself changed, the theme may override templates that changed, or the update may need a newer PHP version than your host runs. Updating many plugins at once makes the cause harder to find." }
  - { q: "Should I turn off automatic WordPress updates?", a: "Keep automatic security updates for WordPress core on. For plugins, automatic updates are safest on simple sites; for stores and business-critical sites, test updates on staging first and apply them on a schedule." }
  - { q: "How do I update WordPress safely?", a: "Take a backup, update on a staging copy first, update a few plugins at a time, test key pages such as forms and checkout after each group, then repeat on the live site." }
---

When a WordPress update broke your site, the first job is getting it back online, and the second is making sure the same update does not break it again tonight. Those are different tasks, and mixing them up is how a one-hour problem becomes a lost day. Here is the order I work in when a site breaks after an update.

## First: how bad is it?

Updates break sites in three main ways:

- **The whole site is down:** a white screen, "There has been a critical error on this website", or a 500 error.
- **Part of the site is broken:** the layout looks wrong, a form or checkout does not work, a page builder will not load.
- **The admin is broken but the site works:** you cannot log in, or the dashboard is blank.

If customers cannot use the site, restore first and investigate second. If only something minor is broken, you can investigate on a copy without rushing.

## Getting the site back online

Pick the fastest option you have:

1. **Check your email for recovery mode.** Since WordPress 5.2, when a plugin or theme causes a fatal error, WordPress emails the admin address a link ([how it works](https://make.wordpress.org/core/2019/04/16/fatal-error-recovery-mode-in-5-2/)). It lets you log in with the broken plugin paused and deactivate it.
2. **Disable the plugin you just updated.** Using your host's file manager or SFTP, rename its folder in `wp-content/plugins`, for example to `plugin-name-off`. WordPress deactivates it.
3. **Restore the most recent backup** from before the update. Most hosts offer one-click restores. This is the fastest route when several things updated at once and you do not know which one is at fault.

Once the site is back, stop automatic updates for the plugin that broke it until you have a proper fix. Otherwise the same update runs again.

## If the update was stuck: the maintenance file

If the site shows "Briefly unavailable for scheduled maintenance. Check back in a minute." long after the update should have finished, the update was interrupted. Delete the `.maintenance` file in the site's root folder, then run the update again, preferably on staging.

## Finding which update caused it

If you updated many plugins at once, you need to narrow it down. Turn on the debug log ([how to](https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/)) on a staging copy and reproduce the problem: fatal errors name the file that failed. If there is no clear error, use the one-by-one method from my guide to [finding a WordPress plugin conflict](/blog/wordpress-plugin-conflict/).

Check these common causes as you go:

- **PHP version.** Some updates require a newer PHP version than your host runs. The plugin's page on WordPress.org lists the minimum.
- **Theme templates.** WooCommerce and page-builder updates often change templates that themes override. WooCommerce lists outdated theme templates under WooCommerce, then Status.
- **Licence or account problems.** Premium plugins sometimes stop working after an update if the licence expired or the update was downloaded from somewhere unofficial.
- **Caching.** Sometimes the site is fixed but you are seeing a cached broken copy. Clear every cache layer.

## Fixing it properly

Rolling back an update is a pause, not a fix. Older plugin versions stop receiving security patches, so you cannot stay there long. Real fixes, in order of preference:

1. Update the other plugin, theme or PHP version the update now depends on
2. Change a setting, such as excluding a plugin's scripts from an optimisation plugin
3. Contact the plugin's developer with the error message; a fix often follows within days
4. Replace the plugin with a maintained alternative

Test the fix on staging, then apply it live.

## Rolling back a single plugin

If you need the previous version of a free plugin, its WordPress.org page has older versions under Advanced View. Download the version you had, delete the current plugin folder, and upload the older one. Your settings normally stay in the database. Write down that the plugin is pinned to an old version and set a date to come back to it.

## How to update WordPress without breaking it

Almost every "update broke my site" story has the same shape: many updates applied at once, straight on the live site, with nobody checking afterwards. A safer routine:

1. **Back up first,** and keep the backup off the server. See [WordPress backup and restore done right](/blog/wordpress-backup-and-restore/).
2. **Update on staging first.** Most hosts provide a staging copy.
3. **Update in small groups:** core, then the theme, then plugins a few at a time.
4. **Test what earns money:** forms, checkout, logins, and the home page on mobile.
5. **Then repeat on the live site,** at a quiet time of day.
6. **Read changelogs for major versions.** A jump from version 4 to 5 of a plugin deserves more care than 4.1 to 4.2.

## Automatic updates: on or off?

Keep automatic minor and security updates for WordPress core switched on; they fix security holes and rarely break anything. For plugins, it depends on the site. On a simple brochure site with few plugins, automatic updates are usually fine. On a store or a site with custom code, an untested overnight update is a risk. Those sites are better updated on a schedule, after testing.

## Updates that need extra care

Some updates deserve more attention than others:

- **Major versions** of page builders, WooCommerce and membership plugins, which often change templates and settings
- **Theme updates** on sites where the theme files were edited directly, because the update overwrites those edits. Changes belong in a child theme.
- **PHP upgrades** by your host, which can break older plugins
- **Plugins that handle payments, logins or forms,** where a silent failure costs real customers

For these, read the changelog, update on staging, and test the specific feature before touching the live site.

## After the fix: one more check

Once the site is working again, check the things updates often break without an obvious error: contact form emails arriving, the mobile menu, logins, search, and on stores, a full test order. Then clear every cache and check again in a private window, the way a visitor sees it.

## When to get help

If your store cannot take orders, if you cannot get into the site at all, or if the fix means choosing between plugins your business relies on, get help. Tested updates are the core of every [WordPress maintenance plan](/wordpress-maintenance/) I run, and a one-off fix starts from $150 with the cause written down.
