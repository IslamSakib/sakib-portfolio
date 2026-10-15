---
title: "WordPress white screen of death: how to fix it step by step"
seoTitle: "WordPress White Screen of Death: How to Fix It"
description: "The WordPress white screen of death usually means a PHP error from a plugin, theme or failed update. How to find the cause and fix it safely, step by step."
focus: WordPress white screen of death
date: "2026-10-15"
art: blank
topic: Fixes and maintenance
service: wordpress-maintenance
imageAlt: "A blank white website showing the message There has been a critical error on this website, beside the title WordPress white screen of death"
stats:
  - { value: "5.2", label: "the WordPress version that added fatal error recovery mode", source: "WordPress.org, Fatal Error Recovery Mode in 5.2", url: "https://make.wordpress.org/core/2019/04/16/fatal-error-recovery-mode-in-5-2/" }
  - { value: "39.7%", label: "of all websites run WordPress", source: "W3Techs, 15 Oct 2026", url: "https://w3techs.com/technologies/details/cm-wordpress" }
  - { value: "390", label: "US searches a month for \"WordPress white screen of death\"", source: "Semrush Keyword Overview, US, Oct 2026" }
sources:
  - { name: "WordPress.org, Debugging in WordPress", url: "https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/" }
  - { name: "WordPress.org, Fatal Error Recovery Mode in 5.2", url: "https://make.wordpress.org/core/2019/04/16/fatal-error-recovery-mode-in-5-2/" }
  - { name: "W3Techs, 15 Oct 2026", url: "https://w3techs.com/technologies/details/cm-wordpress" }
faq:
  - { q: "What causes the WordPress white screen of death?", a: "A fatal PHP error that stops the page before anything is printed. The usual triggers are a plugin or theme update, a new plugin, running out of PHP memory, or the host changing the PHP version." }
  - { q: "How do I fix the white screen if I cannot log in?", a: "Use your host's file manager or SFTP. Rename the wp-content/plugins folder to disable every plugin; if the site returns, rename plugin folders back one at a time until the white screen reappears to find the one at fault." }
  - { q: "Will I lose my content because of the white screen?", a: "No. Posts, pages and settings are stored in the database, which the white screen does not touch. The site is simply failing to display. Once the error is fixed, everything is still there." }
  - { q: "Is the critical error message the same as the white screen?", a: "Yes. Since WordPress 5.2, WordPress catches most fatal errors and shows that message, and emails the site admin a recovery mode link. The cause and the fixes are the same." }
  - { q: "How do I stop the white screen happening again?", a: "Test updates on a staging copy before running them on the live site, keep daily backups stored away from the server, and keep the plugin list short. A monthly maintenance plan covers all three." }
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

## White screen or "critical error" message

Since WordPress 5.2 you often see a short message instead of a fully blank page: "There has been a critical error on this website." It is the same problem with a friendlier face. A fatal PHP error stopped the page, and WordPress caught it. Everything in this guide applies to both.

A fully blank page with no message usually means the error happened before WordPress could load its error handler, often in the theme's `functions.php` or in a must-use plugin in `wp-content/mu-plugins`. Check those two places early if the debug log points nowhere obvious.

## Only the admin is white, or only one page

If the front of the site works but the dashboard is blank, the cause is usually an admin-only plugin: a page builder, a security plugin or an SEO plugin. Disable plugins as in step 2.

If only one page is white, look at what is special about it: a form, a slider, a shortcode from a plugin, or a custom template. Switch that page to the default template temporarily. If it loads, the template or the block on it is the problem.

## Reading the error log without guessing

A debug log line looks like this:

```
PHP Fatal error: Uncaught Error: Call to undefined function some_function() in /wp-content/plugins/some-plugin/includes/file.php:42
```

Three parts matter. "Fatal error" tells you this line stopped the page. The function name tells you what was missing. The path tells you who owns the code: `/plugins/some-plugin/` is that plugin, `/themes/your-theme/` is the theme, and `/wp-includes/` usually means a plugin called WordPress core in a way it no longer supports after an update.

Ignore lines marked "Notice" or "Deprecated" for now. They are warnings, not the reason the page is white.

## When it is your host, not WordPress

Sometimes nothing in WordPress changed. The host upgraded PHP, hit a disk space limit, or a server process crashed. Signs: every site on the account is white, the debug log stays empty, or the host's own error log (in its control panel) shows errors outside WordPress. Contact the host with the time it started; they can see server-level logs you cannot.

## Restore from backup as a last resort

If you cannot find the cause and the site has to be up now, restore yesterday's backup. It is a fast way back online, but treat it as a pause, not a fix: if an automatic update caused the white screen, the same update will run again tonight. Find the cause before it repeats. [How WordPress backup and restore should work](/blog/wordpress-backup-and-restore/) covers what a usable backup looks like.

## What not to do

A few common reactions make a white screen worse:

- **Reinstalling WordPress from the dashboard installer or deleting folders at random.** You can delete the one file that holds your settings, or remove uploads you have no copy of.
- **Running every pending update at once to "fix" it.** If an update caused the error, more updates add more unknowns. Find the cause first.
- **Editing theme files in the dashboard editor.** One missing bracket in `functions.php` is itself a common cause of white screens, and if you break it there you may lose access to the editor.
- **Leaving debug mode on.** With `WP_DEBUG_DISPLAY` set to true, error details are shown to every visitor, including file paths an attacker can use. Log to the file, not the screen, and switch it off afterwards.

Before you change anything, take a fresh backup of the files and the database, even of the broken site. If a fix goes wrong, you can always get back to where you started.

## How long a fix usually takes

When the cause is a single plugin or theme update, finding it and getting the site back usually takes under an hour for someone used to the steps above. Memory problems and host-level failures take longer because the real fix sits with the code that uses too much memory, or with the hosting company. The step most people skip is the last one: writing down what caused it so the same update does not take the site down again next month.

## Stop it happening again

White screens almost always follow a change: an update, a new plugin, a host moving PHP versions. Three habits prevent most of them: test updates on a copy of the site first, keep daily backups stored away from the server, and keep the plugin list short.

That is what a [WordPress maintenance plan](/wordpress-maintenance/) covers. If your site is white right now and you need it back, a single fix starts from $150 and comes with the cause written down.
