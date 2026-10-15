---
title: "WordPress white screen of death: how to fix it step by step"
seoTitle: "WordPress White Screen of Death: How to Fix It"
description: "The WordPress white screen of death usually means a PHP error from a plugin, theme or failed update. How to find the cause and fix it safely, step by step."
focus: WordPress white screen of death
date: "2026-10-15"
topic: Fixes and maintenance
service: wordpress-maintenance
imageAlt: "Woman holding her head in front of a laptop, beside the title WordPress white screen of death: how to fix it"
stats:
  - { value: "5.2", label: "the WordPress version that added fatal error recovery mode", source: "WordPress.org, Fatal Error Recovery Mode in 5.2", url: "https://make.wordpress.org/core/2019/04/16/fatal-error-recovery-mode-in-5-2/" }
  - { value: "39.7%", label: "of all websites run WordPress", source: "W3Techs, 15 Oct 2026", url: "https://w3techs.com/technologies/details/cm-wordpress" }
  - { value: "390", label: "US searches a month for \"WordPress white screen of death\"", source: "Semrush Keyword Overview, US, Oct 2026" }
sources:
  - { name: "WordPress.org, Debugging in WordPress", url: "https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/" }
  - { name: "WordPress.org, Fatal Error Recovery Mode in 5.2", url: "https://make.wordpress.org/core/2019/04/16/fatal-error-recovery-mode-in-5-2/" }
  - { name: "W3Techs, 15 Oct 2026", url: "https://w3techs.com/technologies/details/cm-wordpress" }
---

The WordPress white screen of death is a blank page where your site should be. No error, no design, nothing. It looks dramatic, but the cause is usually simple: PHP hit an error it could not recover from and stopped before it printed anything. Here is how to find that error and fix it without making things worse.

## First: check your email

Since WordPress 5.2 ([fatal error recovery mode](https://make.wordpress.org/core/2019/04/16/fatal-error-recovery-mode-in-5-2/)), when a plugin or theme causes a fatal error, WordPress emails the site's admin address a link to recovery mode. Check the inbox (and spam folder) of the admin email. The link lets you log in with the broken plugin paused, so you can deactivate it from the dashboard.

## Step 1: Turn on the error log

You need to see the error ([WordPress.org explains the debug settings](https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/)). Open `wp-config.php` in your host's file manager or over SFTP and set:

```php
define( 'WP_DEBUG', true );
define( 'WP_DEBUG_LOG', true );
define( 'WP_DEBUG_DISPLAY', false );
```

Reload the page, then open `wp-content/debug.log`. The last lines name the file that failed. If the path contains `/plugins/some-plugin/`, you have found the cause. Turn debugging off again when you are done.

## Step 2: Disable plugins without the dashboard

If you cannot log in, rename the `wp-content/plugins` folder to `plugins-off`. WordPress deactivates every plugin. If the site comes back, rename the folder back and rename plugin folders one at a time until the white screen returns. The last one you renamed is the culprit.

## Step 3: Switch to a default theme

If plugins were not the cause, the theme may be. Rename your theme's folder inside `wp-content/themes`. WordPress falls back to a default theme such as Twenty Twenty-Five, if one is installed.

## Step 4: Check the memory limit

An error mentioning "Allowed memory size exhausted" means PHP ran out of memory. Raise it in `wp-config.php` with `define( 'WP_MEMORY_LIMIT', '256M' );`, and ask your host to raise the server limit if needed. Then find out what is using so much memory, because the limit only hides the problem.

## Step 5: A failed update

If the screen went white during an update, look for a file called `.maintenance` in the site's root folder and delete it. Then run the update again, ideally on a staging copy first.

## Step 6: Clear every cache

Sometimes the site is fixed but you are still being served a cached blank page. Clear the cache plugin, the host's cache and, if you use one, Cloudflare.

## Stop it happening again

White screens almost always follow a change: an update, a new plugin, a host moving PHP versions. Three habits prevent most of them: test updates on a copy of the site first, keep daily backups stored away from the server, and keep the plugin list short.

That is what a [WordPress maintenance plan](/wordpress-maintenance/) covers. If your site is white right now and you need it back, a single fix starts from $150 and comes with the cause written down.
