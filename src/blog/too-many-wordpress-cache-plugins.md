---
title: "Why two WordPress cache plugins make a site slower, not faster"
seoTitle: "Two WordPress Cache Plugins: Why It Makes Sites Slower"
description: "WordPress cache plugins conflict when you run two. Why sites get slower, and how to set up just one."
focus: WordPress cache plugins
date: "2026-10-13"
imageAlt: "Two cache plugins crossed out and one caching layer set up once, beside the title Why two WordPress cache plugins make a site slower"
art: cache
topic: Speed
service: wordpress-speed-optimization
stats:
  - { value: "3 pages", label: "a store must never cache: cart, checkout and my account", source: "WooCommerce, How to configure caching plugins", url: "https://developer.woocommerce.com/docs/best-practices/performance/configuring-caching-plugins" }
  - { value: "40%", label: "of WordPress sites passed Core Web Vitals on mobile in 2024", source: "HTTP Archive Web Almanac 2024", url: "https://almanac.httparchive.org/en/2024/cms" }
sources:
  - { name: "WooCommerce, How to configure caching plugins", url: "https://developer.woocommerce.com/docs/best-practices/performance/configuring-caching-plugins" }
  - { name: "HTTP Archive Web Almanac 2024", url: "https://almanac.httparchive.org/en/2024/cms" }
  - { name: "Google, About PageSpeed Insights", url: "https://developers.google.com/speed/docs/insights/v5/about" }
faq:
  - { q: "Can I use two cache plugins on WordPress?", a: "Not two page cache plugins. They store and serve the same pages in different ways, undo each other's work and can serve stale or broken pages. One page cache plus an object cache and a CDN is fine." }
  - { q: "Does my host already cache my WordPress site?", a: "Many managed WordPress hosts run server-level page caching. Check your host's control panel or documentation, or look at the response headers of your pages for cache-related entries. If it does, turn off page caching in plugins." }
  - { q: "Which WordPress cache plugin is best?", a: "The best one is the one that matches your host, configured properly and running alone. If the host caches at the server level, use that. If not, pick one well-supported cache plugin and do not add a second." }
  - { q: "Why do my WordPress changes not show up?", a: "You are probably seeing a cached copy. Clear every cache layer: the plugin, the host's cache and any CDN. If you regularly need to clear several, you have overlapping caches to consolidate." }
  - { q: "Do deactivated cache plugins still affect my site?", a: "They can. Some leave files such as advanced-cache.php and settings in wp-config.php that keep running after the plugin is deactivated. Remove those leftovers when you remove the plugin." }
---

Your site is slow, so you installed a cache plugin. It didn't help enough, so you installed a second one. WordPress cache plugins are the usual first fix for a slow site, but that second plugin, or a plugin running on top of your host's own caching, usually makes the site slower and less stable. Here's why, and how to check your own site.

## What does a cache plugin do for my site?

Building a WordPress page takes work: PHP runs, the database is queried, the theme puts the page together. A cache plugin saves the finished page and serves the saved copy to the next visitor, so the work happens once instead of every time. Most cache plugins also rewrite your CSS and JavaScript files, change how images load, and add rules to the server.

## Why do two cache plugins fight each other?

Two WordPress cache plugins both try to own the same jobs. Each one saves its own copy of the page, each one rewrites the same files, and each one adds its own server rules. The result:

- Visitors are served stale or half-broken pages, because one plugin clears its cache and the other doesn't
- CSS and JavaScript get combined or minified twice, which breaks layouts and buttons
- The server does more work, not less, keeping two caches up to date
- Under traffic, the conflict can take the site down entirely

## Is my host already caching my site?

Probably. Many managed WordPress hosts run their own caching, sometimes through a plugin they install for you. Adding a general cache plugin on top of that is the same problem as running two plugins.

## Can a plugin I removed still be running?

Yes. Switching a cache plugin off doesn't always remove it. Some leave files and server rules behind that keep running. That's exactly what happened on TubeOnAI: after a move to a host with its own speed plugin, files left by the old cache plugins kept clashing with it, and the site went down again and again. Once I cleared the leftovers and kept one caching layer, load time went from 5 seconds to 1.5 and the downtime stopped. [The full case study is here](/work/tubeonai/).

## How do I check how many caches my site runs?

You can count them in about ten minutes, without special tools:

1. List your plugins and look for more than one with "cache", "speed", "optimize" or "performance" in the name.
2. Ask your host whether they cache pages for you, and whether they install a plugin to do it.
3. Look in the `wp-content` folder for `advanced-cache.php` and cache folders belonging to plugins you no longer use.
4. Test the site on Google PageSpeed Insights, on mobile, before you change anything, so you can tell whether the fix worked.

## Page, object and browser cache: which do I need?

Part of the confusion is that "cache" means several different things, and only some of them overlap:

- **Page cache** saves the finished HTML of a page so the server doesn't rebuild it for every visitor. This is what most cache plugins and many hosts do. You only want one.
- **Object cache** (for example Redis or Memcached) keeps database results in memory so WordPress itself runs faster, including for logged-in users and stores. It works alongside a page cache, not instead of it.
- **Browser cache** tells visitors' browsers to keep images, CSS and scripts so the next page loads faster. It's set by headers, often by the same plugin or the host.
- **CDN cache** keeps copies of files, and sometimes whole pages, on servers near the visitor.

Running a page cache plus an object cache plus a CDN is normal and fine. Running two page caches, or two plugins both minifying the same CSS, is where problems start.

## What are the signs my caches are fighting?

If you see any of these, two caches are probably working against each other:

- Changes you make don't appear until you clear two or three different caches
- Logged-out visitors see old prices, old menus or someone else's cart
- The layout breaks randomly, then fixes itself after a cache clear
- The site is fast on one visit and slow on the next with no clear pattern
- Errors in the debug log mention two cache plugins or the host's cache module

## Which cache should I keep?

If your host runs its own page cache at the server level, keep that one. It runs before WordPress even loads, so it's fastest. Turn off page caching in any plugin and use plugins only for what the host doesn't do, such as image optimisation. If your host doesn't cache, keep one well-supported cache plugin and configure it properly. Whichever you keep, exclude cart, checkout and account pages, and remove the leftovers of the others.

This exact conflict took TubeOnAI's site down repeatedly, and removing it was a big part of cutting load time from 5 seconds to 1.5. The [TubeOnAI case study](/work/tubeonai/) covers the details, and [why is my WordPress site so slow](/blog/why-is-my-wordpress-site-so-slow/) covers the other common causes.

## What do I test after removing a cache?

Check that the one you kept is working. Open a page in a private window, then reload it: the second load should be noticeably faster. Many cache plugins and hosts also add a response header saying whether the page came from the cache; your browser's developer tools show it under the network tab. Then test the parts that must never be cached: add something to a cart, log in, submit a form. Finally, run PageSpeed Insights on mobile and compare the server response time with your notes from before the change.

## When is a second cache layer fine?

Some combinations look like doubling up but aren't. A page cache on the server and a CDN in front of it is normal: the CDN serves visitors from nearby, and the server cache handles what reaches it. An image optimisation plugin next to a cache is fine because they do different jobs. The test is simple: if two tools change the same thing, the same pages or the same CSS and JavaScript files, keep one.

## What's the short fix?

Keep one caching layer, set it up properly, and remove every leftover from the others. Then look at why the pages were heavy in the first place: oversized images, page builder layouts and unused scripts. Caching hides those problems. It doesn't remove them. If you'd rather hand it over, I do [WordPress speed optimization](/custom-web-development/website-maintenance/) and write down exactly what was fighting.
