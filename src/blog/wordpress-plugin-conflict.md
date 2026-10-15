---
title: "WordPress plugin conflict: how to find it and fix it safely"
seoTitle: "WordPress Plugin Conflict: How to Find and Fix It"
description: "A WordPress plugin conflict can break layouts, forms or the whole site. How to find which plugin is at fault, test safely and stop it happening again."
focus: WordPress plugin conflict
date: "2026-10-15"
art: conflict
topic: Fixes and maintenance
service: wordpress-maintenance
imageAlt: "Two plugin cards with a lightning bolt between them and a conflict found message, beside the title WordPress plugin conflict"
sources:
  - { name: "WordPress.org, Health Check & Troubleshooting plugin", url: "https://wordpress.org/plugins/health-check/" }
  - { name: "WordPress Developer Resources, Debugging in WordPress", url: "https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/" }
faq:
  - { q: "How do I know if I have a WordPress plugin conflict?", a: "Typical signs are a feature that broke right after an update or a new plugin, layout or menu problems on some pages, forms or checkout that stop working, admin screens that will not load, or errors in the browser console or debug log that name two different plugins." }
  - { q: "How do I find which plugin is causing the conflict?", a: "Deactivate all plugins, then reactivate them one at a time and test after each. The Health Check & Troubleshooting plugin lets you do this for your own login only, so visitors are not affected while you test." }
  - { q: "Can a plugin conflict break my whole site?", a: "Yes. If two plugins declare the same function or one calls code another has removed, PHP stops with a fatal error and you see a white screen or a critical error message." }
  - { q: "Is it safe to deactivate plugins on a live site?", a: "Deactivating can change what visitors see and can break features such as forms or checkout. Use the troubleshooting mode of the Health Check plugin or a staging copy, and take a backup first." }
  - { q: "How do I prevent WordPress plugin conflicts?", a: "Keep the plugin list short, avoid two plugins that do the same job, test updates on a staging copy before running them live, and remove plugins you no longer use." }
---

A WordPress plugin conflict happens when two plugins, or a plugin and your theme, try to do the same thing in incompatible ways. The result ranges from a button that stops working to a site that will not load at all. Conflicts are one of the most common reasons a WordPress site breaks after an update, and the good news is that they can be found methodically. Here is how I track one down without making the site worse.

## What a plugin conflict looks like

You are probably looking at a conflict if:

- Something broke right after you updated or installed a plugin
- A form, slider, menu or checkout works on some pages but not others
- The layout looks different when you are logged in versus logged out
- An admin screen loads blank or spins forever
- You see a white screen or "There has been a critical error on this website"
- The browser console shows JavaScript errors naming plugin files

## Why plugins conflict

Plugins are written by different people who cannot test against every other plugin. The usual causes:

1. **Duplicate functions or classes.** Two plugins bundle the same library in different versions, and PHP refuses to load both. This produces a fatal error.
2. **JavaScript clashes.** Two scripts load different versions of the same library, or one fails and stops the scripts after it from running. Forms and checkout are hit hardest.
3. **Doing the same job twice.** Two caching plugins, two SEO plugins, two security plugins. Each assumes it is the only one.
4. **Optimisation plugins rewriting code.** Plugins that combine, minify or delay CSS and JavaScript can change the order other plugins depend on.
5. **Outdated plugins.** A plugin the developer stopped updating calls WordPress functions that have since changed.

## Step 1: Back up and write down what changed

Before touching anything, take a full backup of the files and database. Then note what changed recently: which plugins were updated, what was installed, whether the theme or WordPress itself updated, and whether the host changed the PHP version. Most conflicts follow a change within the last few days, so this list is often the shortcut to the answer.

## Step 2: Read the errors

Turn on WordPress's debug log ([how to](https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/)) and reproduce the problem. Fatal errors in `wp-content/debug.log` include the file path, which names the plugin. For front-end problems, open your browser's developer tools on the broken page and check the Console tab: the error lines usually point to a specific plugin's script.

If two different plugin names appear in the same error, you have probably found your pair.

## Step 3: Test plugins one at a time, safely

The classic method is to deactivate all plugins, check the problem is gone, then reactivate them one by one, testing after each. On a live site that changes what every visitor sees, so use one of these instead:

- **The Health Check & Troubleshooting plugin** ([WordPress.org](https://wordpress.org/plugins/health-check/)) has a troubleshooting mode that disables plugins and switches to a default theme for your login only. Visitors see the normal site while you test.
- **A staging copy.** Many hosts create one in a click. Break it as much as you need.

When the problem returns after reactivating a plugin, that plugin is one half of the conflict. To find the other half, deactivate everything except that plugin and reactivate the others one at a time.

## Step 4: Check the theme too

If the problem stays with every plugin off, switch to a default theme such as Twenty Twenty-Five, again in troubleshooting mode or on staging. Themes often bundle their own copies of libraries or override WooCommerce templates, so a theme can be the second party in a "plugin" conflict.

## Step 5: Decide on the fix

Once you know the pair, you have a few options, in order of preference:

1. **Update both** if newer versions exist. The conflict may already be fixed.
2. **Change a setting.** If an optimisation plugin causes it, exclude the other plugin's scripts from combining or delaying.
3. **Replace one plugin** with an alternative that does the same job, or remove it if a second plugin already covers that job.
4. **Report it** to both plugin developers with the error message. Good developers fix conflicts quickly.
5. **Roll back** the updated plugin to its previous version as a temporary fix, and plan a proper fix, because old versions stop receiving security updates.

## Conflicts that only appear after updates

The most frustrating conflicts appear the morning after automatic updates ran overnight. Two habits prevent most of them: test updates on a staging copy before they reach the live site, and update in small groups rather than "Update all", so you know which update caused the problem. If your site did break after an update, my guide to [what to do when a WordPress update broke your site](/blog/wordpress-update-broke-site/) walks through getting back online first.

## How to prevent plugin conflicts

- **Keep the plugin list short.** Every plugin is a possible conflict. Remove anything unused; deactivated plugins can still cause trouble through leftover files.
- **One plugin per job.** One cache, one SEO plugin, one security plugin, one form builder.
- **Prefer well-maintained plugins.** Check the last update date and support activity before installing.
- **Avoid nulled premium plugins.** Pirated copies are often modified and are a common source of both conflicts and malware.
- **Watch optimisation plugins carefully.** Many conflicts I see are caused by settings that combine or delay scripts. See [why two cache plugins make a site slower](/blog/too-many-wordpress-cache-plugins/).

## Keep a record of what fixed it

When you find a conflict, write down which plugins were involved, which versions, what the error was and what fixed it. Next time either plugin updates, check that note first. Conflicts that were fixed by a setting change can come back if a plugin update resets its options.

## When to get help

Get help if the conflict is on a store's checkout, if you cannot log in, or if the fix means choosing between two plugins your business relies on. Finding the cause is usually quick; choosing the right replacement and testing it properly is where experience saves time. Plugin housekeeping and tested updates are part of every [WordPress maintenance plan](/wordpress-maintenance/) I run, and a one-off fix starts from $150.
