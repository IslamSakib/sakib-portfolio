---
title: "Why is my WordPress site so slow? The seven usual causes"
seoTitle: "Why Is My WordPress Site So Slow? 7 Causes and Fixes"
description: "Why is my WordPress site so slow? The seven usual causes and how to fix each one. Find yours."
focus: why is my WordPress site so slow
date: "2026-10-15"
art: speed
topic: Speed
service: wordpress-speed-optimization
imageAlt: "The TubeOnAI website on a laptop with mobile load time cut from 5.0 to 1.5 seconds, beside the title Why is my WordPress site so slow"
stats:
  - { value: "40%", label: "of WordPress sites passed Core Web Vitals on mobile in 2024, up from 28% in 2023", source: "HTTP Archive Web Almanac 2024", url: "https://almanac.httparchive.org/en/2024/cms" }
  - { value: "28 days", label: "of real-visitor data behind the field results in PageSpeed Insights", source: "Google, About PageSpeed Insights", url: "https://developers.google.com/speed/docs/insights/v5/about" }
  - { value: "590", label: "US searches a month for \"why is my WordPress site so slow\"", source: "Semrush Keyword Overview, US, Oct 2026" }
sources:
  - { name: "Google, About PageSpeed Insights", url: "https://developers.google.com/speed/docs/insights/v5/about" }
  - { name: "HTTP Archive Web Almanac 2024", url: "https://almanac.httparchive.org/en/2024/cms" }
  - { name: "web.dev, Web Vitals", url: "https://web.dev/articles/vitals" }
faq:
  - { q: "Why is my WordPress site slow only on mobile?", a: "Phones have slower processors and often slower connections, so heavy images, large JavaScript files and third-party scripts hurt far more there. Test with PageSpeed Insights on the mobile tab, which simulates a mid-range phone, and fix the items it lists." }
  - { q: "Will a caching plugin fix a slow WordPress site?", a: "It can, if the site has no caching at all. If your host already caches pages, adding a second cache plugin can make things worse. Use one caching layer, set up once, and fix oversized images and heavy plugins alongside it." }
  - { q: "How fast should a WordPress site load?", a: "Aim for the main content to appear within 2.5 seconds on mobile, which is Google's threshold for a good Largest Contentful Paint. Measure real visitor data in PageSpeed Insights rather than relying on a single lab score." }
  - { q: "Is my hosting making WordPress slow?", a: "Check the server response time in PageSpeed Insights. If the server takes more than about a second to start sending the page, the hosting, an old PHP version or missing caching is likely the cause, and front-end fixes will not be enough." }
  - { q: "How much does it cost to speed up a WordPress site?", a: "It depends on the cause. Image and caching fixes are quick; rebuilding heavy templates takes longer. My speed fixes start from $450 per site, with before and after numbers you can check yourself." }
---

Why is my WordPress site so slow? It's almost never one thing. It's usually two or three small problems stacked on top of each other, and you can't see them from the outside. These are the seven I find most often when I open a slow site, in the order I check them.

## How do I measure my site before I change anything?

Run the page through [Google PageSpeed Insights](https://pagespeed.web.dev/) on mobile. Look first at the box at the top that shows real visitor data ([Core Web Vitals](https://web.dev/articles/vitals) from the Chrome User Experience Report, covering the previous 28 days). That tells you whether real people find your site slow. The lab score underneath is good for finding causes, but it's a simulation on a slow phone, so a low lab score alone isn't proof of a problem.

Write the numbers down. Without a "before", you can't prove an "after".

## 1. Are your images far bigger than the screen?

This is the most common cause and the easiest to fix. A 4000-pixel photo straight from a camera, shown in a 400-pixel box, still gets downloaded in full. Resize images to the largest size they're shown at, serve modern formats such as WebP or AVIF, and give every image a width and height so the page doesn't jump while loading.

## 2. Do you have two caching systems fighting each other?

Many slow sites have a cache plugin, and many hosts run their own caching too. Two layers doing the same job serve stale pages, undo each other's work and can crash the site under traffic. This is exactly what took TubeOnAI down: leftover files from old cache plugins clashed with the host's own speed plugin. [The TubeOnAI case study](/work/tubeonai/) shows the fix. Keep one caching layer and set it up properly.

## 3. Is there a plugin for every small feature?

Each plugin can add its own CSS and JavaScript to every page, even pages that never use it. Thirty plugins can mean thirty extra files before your content appears. Go through the list and ask of each one: do I still use this, and could one plugin or a few lines of code replace three?

## 4. Is your page builder layout heavy?

Page builders are convenient, but old layouts built from nested sections and columns produce a lot of markup and scripts. Rebuilding the heaviest templates, usually the home page and your main landing pages, often helps more than any plugin.

## 5. Which third-party scripts are loading?

Chat widgets, heatmaps, ad pixels, embedded videos and font services all load from other servers. Each one is small. Together they block the page. Remove what nobody looks at, and load the rest after the page has appeared.

## 6. Is your hosting keeping up?

Cheap shared hosting is fine for a brochure site with little traffic. A WooCommerce store or a busy blog needs more memory and a current PHP version. Check your PHP version in the host's panel: an old version alone can make WordPress noticeably slower.

## 7. Is your database bloated?

Years of post revisions, expired temporary data and leftover tables from deleted plugins slow down every query. Cleaning them up is safe when it's done carefully, after a full backup.

## How can I tell which cause is slowing my site?

You don't have to guess. PageSpeed Insights lists its findings under the score, and each one points at one of the causes above:

- **"Properly size images" or "Serve images in next-gen formats"** means cause 1, oversized images.
- **"Reduce unused CSS" or "Reduce unused JavaScript"** usually means causes 3 and 4: plugins and page-builder layouts loading code on pages that don't need it.
- **"Reduce the impact of third-party code"** is cause 5. The report names each outside server and how long it blocked the page.
- **A slow "Time to First Byte" or "Reduce initial server response time"** points at the server: causes 2, 6 and 7, meaning caching, hosting or the database.

Look at server response time first. If the server takes more than a second to start sending the page, no amount of image work will make the site feel fast, because everything else waits for it.

## Why does my mobile score matter more than my desktop score?

You probably check your site on a fast office computer, where it feels fine. Google ranks pages on how they behave on phones, and most visitors to a typical small business site arrive on a phone over mobile data. A page that loads in one second on Wi-Fi can take four or five on a mid-range phone.

So test on mobile. If you can, open the site on an older phone over mobile data. If it feels slow there, it is slow.

## Will a speed plugin fix it, or make it worse?

A good caching plugin, set up once, can make a big difference on a site that has no caching at all. Trouble starts when plugins stack up: a cache plugin, an image plugin, a "speed booster" and a minify plugin, each with its own settings, often doing the same job twice. Combined CSS and JavaScript files can break layouts, and two caches can serve visitors an old copy of a page.

Before you install another speed plugin, ask what the last one actually fixed. If you don't know, it's likely part of the problem. I wrote more about this in [why two cache plugins make a site slower](/blog/too-many-wordpress-cache-plugins/).

## What does a fast WordPress site have?

It isn't exotic. A fast site has:

1. Images resized and served in modern formats
2. One caching layer, configured properly
3. A short plugin list where every plugin earns its place
4. Templates that load only the code each page uses
5. Third-party scripts kept to the ones that matter, loaded after the content
6. Hosting with a current PHP version and enough memory for the traffic
7. A clean database

None of this needs a rebuild. Most sites get there with a few days of careful work, and the result lasts because the causes are gone, not hidden.

## Should I fix it myself or get help?

Do it yourself if the fixes are images and one plugin. Get help if the server is slow, if the site breaks every time you change a speed setting, or if you run a store where every second costs sales. For stores, read [why WooCommerce gets slow](/blog/woocommerce-slow/). For the scores Google uses, read [how to pass Core Web Vitals on WordPress](/blog/wordpress-core-web-vitals/).

## What did it look like when TubeOnAI went from 5 s to 1.5 s?

TubeOnAI's site took about 5 seconds to load and kept going down under traffic. The obvious suspects were the images and the page builder, but the measurements pointed at the server: pages were slow to start, and the site failed at busy times. The cause was leftover files from old cache plugins clashing with a speed plugin the host had added on its own.

I removed the leftovers, kept one caching layer, rebuilt the old column layouts and fixed the crawling issues. Load time dropped to 1.5 seconds, server load fell 60%, and the downtime stopped. None of it needed a new theme or new hosting. That's typical: most slow WordPress sites get fixed by removing what's fighting, not by adding more. The [full case study](/work/tubeonai/) walks through each step.

## Fix the cause, then measure again

The order matters. Images and duplicate caching are quick wins. Plugins and layouts take longer but last longer. After each change, run the same test on the same page, so you know which fix actually helped.

If you'd rather hand this over, I do [WordPress speed optimization](/custom-web-development/website-maintenance/) with before and after numbers on Google's own tool, and the cause written down so it doesn't come back.
