---
title: "WordPress white screen of death: how to fix it step by step"
seoTitle: "WordPress White Screen of Death: How to Fix It"
description: "WordPress white screen of death: find the PHP error and fix it step by step. Learn the fix."
focus: WordPress white screen of death
date: "2026-10-15"
art: blank
topic: Fixes and maintenance
service: wordpress-repair
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

Your site is a blank white page. No error, no design, nothing. It looks bad, but this is the WordPress white screen of death, and the cause is usually simple: PHP hit an error it couldn't recover from and stopped before it printed anything. Your posts, pages and settings are safe in the database. Here's how I find the error and fix it without making things worse.

## First: check your inbox for a recovery link

Since WordPress 5.2 ([fatal error recovery mode](https://make.wordpress.org/core/2019/04/16/fatal-error-recovery-mode-in-5-2/)), when a plugin or theme causes a fatal error, WordPress emails your site's admin address a link to recovery mode. Look in the inbox and the spam folder of that address. The link lets you log in with the broken plugin paused, so you can switch it off from the dashboard. If the email is there, you may be done in two minutes.

## Step 1: Turn on the error log so you can see what broke

You can't fix an error you can't see ([WordPress.org explains the debug settings](https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/)). Open `wp-config.php` in your host's file manager or over SFTP and set:

```php
define( 'WP_DEBUG', true );
define( 'WP_DEBUG_LOG', true );
define( 'WP_DEBUG_DISPLAY', false );
```

Reload the page, then open `wp-content/debug.log`. The last lines name the file that failed. If the path contains `/plugins/some-plugin/`, you've found the cause. Turn debugging off again when you're done.

## Step 2: Can't log in? Switch plugins off from the files

Rename the `wp-content/plugins` folder to `plugins-off`. WordPress deactivates every plugin. If the site comes back, rename the folder back, then rename plugin folders one at a time until the white screen returns. The last one you touched is the culprit.

## Step 3: Still white? Try a default theme

If plugins weren't the cause, the theme may be. Rename your theme's folder inside `wp-content/themes`. WordPress falls back to a default theme such as Twenty Twenty-Five, if one is installed.

## Step 4: "Allowed memory size exhausted" means PHP ran out of memory

Raise the limit in `wp-config.php` with `define( 'WP_MEMORY_LIMIT', '256M' );`, and ask your host to raise the server limit if needed. Then find out what is eating the memory, because a bigger limit only hides the problem.

## Step 5: The screen went white during an update

Look for a file called `.maintenance` in the site's root folder and delete it. Then run the update again, on a staging copy first if you can.

## Step 6: Clear every cache

Sometimes the site is fixed but you're still being served a cached blank page. Clear the cache plugin, the host's cache and, if you use it, Cloudflare.

## Is "critical error" the same as the white screen?

Yes. Since WordPress 5.2 you often see "There has been a critical error on this website" instead of a fully blank page. It's the same problem with a friendlier face: a fatal PHP error stopped the page and WordPress caught it. Everything in this guide applies to both.

A fully blank page with no message usually means the error happened before WordPress could load its error handler. That's often the theme's `functions.php` or a must-use plugin in `wp-content/mu-plugins`, so check those two places early if the debug log points nowhere obvious.

## What if only your dashboard, or one page, is white?

If the front of the site works but the dashboard is blank, an admin-only plugin is usually to blame: a page builder, a security plugin or an SEO plugin. Disable plugins as in step 2.

If only one page is white, ask what's special about it: a form, a slider, a plugin shortcode, a custom template. Switch that page to the default template for a moment. If it loads, the template or the block on it is the problem.

## How do I read the error log without guessing?

A debug log line looks like this:

```
PHP Fatal error: Uncaught Error: Call to undefined function some_function() in /wp-content/plugins/some-plugin/includes/file.php:42
```

Three parts matter. "Fatal error" means this line stopped the page. The function name tells you what was missing. The path tells you who owns the code: `/plugins/some-plugin/` is that plugin, `/themes/your-theme/` is your theme, and `/wp-includes/` usually means a plugin called WordPress core in a way an update no longer supports.

Ignore lines marked "Notice" or "Deprecated" for now. They're warnings, not the reason the page is white.

## What if it's my host and not WordPress?

Sometimes nothing in WordPress changed. The host upgraded PHP, you hit a disk space limit, or a server process crashed. The signs: every site on the account is white, the debug log stays empty, or the host's own error log shows errors outside WordPress. Contact the host with the time it started. They can see server logs you can't.

## When should I just restore a backup?

Only as a last resort. If you can't find the cause and the site has to be up now, restore yesterday's backup. It gets you back online fast, but treat it as a pause, not a fix. If an automatic update caused the white screen, the same update will run again tonight. [How WordPress backup and restore should work](/blog/wordpress-backup-and-restore/) covers what a usable backup looks like.

## What should I not do while the site is down?

These reactions make a white screen worse:

- **Reinstalling WordPress or deleting folders at random.** You can delete the one file that holds your settings, or remove uploads you have no copy of.
- **Running every pending update at once "to fix it".** If an update caused the error, more updates add more unknowns. Find the cause first.
- **Editing theme files in the dashboard editor.** One missing bracket in `functions.php` is itself a common cause of white screens, and breaking it there can lock you out of the editor.
- **Leaving debug mode on.** With `WP_DEBUG_DISPLAY` set to true, every visitor sees error details, including file paths an attacker can use. Log to the file, not the screen, and switch it off afterwards.

Before you change anything, take a fresh backup of the files and the database, even of the broken site. If a fix goes wrong, you can get back to where you started.

## How long will the fix take?

When the cause is a single plugin or theme update, finding it and getting the site back usually takes me under an hour. Memory problems and host-level failures take longer, because the real fix sits with the code that uses too much memory or with the hosting company. The step most people skip is the last one: writing down what caused it, so the same update doesn't take the site down again next month.

## How do I stop it happening again?

White screens almost always follow a change: an update, a new plugin, a host moving PHP versions. Three habits prevent most of them. Test updates on a copy of the site first. Keep daily backups stored away from the server. Keep the plugin list short.

That's what a [WordPress maintenance plan](/custom-web-development/website-maintenance/) covers. If your site is white right now and you need it back, send me access and a single fix starts from $150, with the cause written down so you know what happened.
