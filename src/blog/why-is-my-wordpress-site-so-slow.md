---
title: "Why is my WordPress site so slow? The seven usual causes"
seoTitle: "Why Is My WordPress Site So Slow? 7 Causes and Fixes"
description: "Why is my WordPress site so slow? The seven causes I find most often, how to check each one in minutes, and what fixes them at the root."
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

If you are asking why your WordPress site is so slow, the answer is almost never one thing. It is usually two or three small problems stacked on top of each other. These are the seven I find most often when I open a slow site, roughly in the order I check them.

## Measure before you change anything

Run the page through [Google PageSpeed Insights](https://pagespeed.web.dev/) on mobile. Look first at the box at the top that shows real visitor data ([Core Web Vitals](https://web.dev/articles/vitals) from the Chrome User Experience Report, covering the previous 28 days). That tells you whether real people find the site slow. The lab score underneath is useful for finding causes, but it is a simulation on a slow phone, so a low lab score alone is not proof of a problem.

Write the numbers down. Without a before, you cannot prove an after.

## 1. Images far larger than the screen

The most common cause, and the easiest to fix. A 4000-pixel photo straight from a camera, shown in a 400-pixel box, still has to be downloaded in full. Resize images to the largest size they are shown at, serve modern formats such as WebP or AVIF, and give every image a width and height so the page does not jump while loading.

## 2. Two caching systems fighting each other

Many slow sites have a cache plugin, and many hosts run their own caching too. Two layers doing the same job serve stale pages, undo each other's work and can crash the site under traffic. This is exactly what took TubeOnAI down: leftover files from old cache plugins clashed with the host's own speed plugin. [The TubeOnAI case study](/work/tubeonai/) shows the fix. Keep one caching layer and set it up properly.

## 3. A plugin for every small feature

Each plugin can add its own CSS and JavaScript to every page, even pages that never use it. Thirty plugins can mean thirty extra files before your content appears. Go through the list and ask of each one: is it still used, and could one plugin or a few lines of code replace three?

## 4. Heavy page-builder layouts

Page builders are convenient, but old layouts built from nested sections and columns produce a lot of markup and scripts. Rebuilding the heaviest templates, usually the home page and the main landing pages, often helps more than any plugin.

## 5. Third-party scripts

Chat widgets, heatmaps, ad pixels, embedded videos and font services all load from other servers. Each one is small; together they block the page. Remove what nobody looks at, and load the rest after the page has appeared.

## 6. Hosting that cannot keep up

Cheap shared hosting is fine for a brochure site with little traffic. A WooCommerce store or a busy blog needs more memory and a current PHP version. Check your PHP version in the host's panel: an old version alone can make WordPress noticeably slower.

## 7. A bloated database

Years of post revisions, expired temporary data and leftover tables from deleted plugins slow down every query. Cleaning them is safe when done carefully, after a full backup.

## How to tell which cause is yours

You do not have to guess. PageSpeed Insights lists its findings under the score, and each one points at one of the causes above:

- **"Properly size images" or "Serve images in next-gen formats"** means cause 1, oversized images.
- **"Reduce unused CSS" or "Reduce unused JavaScript"** usually means causes 3 and 4: plugins and page-builder layouts loading code on pages that do not need it.
- **"Reduce the impact of third-party code"** is cause 5. The report names each outside server and how long it blocked the page.
- **A slow "Time to First Byte" or "Reduce initial server response time"** points at the server: causes 2, 6 and 7, meaning caching, hosting or the database.

Server response time is the one to look at first. If the server takes more than a second to start sending the page, no amount of image work will make the site feel fast, because everything else waits for it.

## Mobile is the score that counts

Most people check their site on a fast office computer, where it feels fine. Google ranks pages on how they behave on phones, and most visitors to a typical small business site arrive on a phone over mobile data. A page that loads in one second on Wi-Fi can take four or five on a mid-range phone.

So test on mobile, and if you can, open the site on an older phone over mobile data. If it feels slow there, it is slow.

## Speed plugins: when they help and when they hurt

A good caching plugin, set up once, can make a big difference on a site that has no caching at all. Problems start when plugins are stacked: a cache plugin, an image plugin, a "speed booster" and a minify plugin, each with its own settings, often doing the same job twice. Combined CSS and JavaScript files can break layouts, and two caches can serve visitors an old copy of a page.

Before installing another speed plugin, ask what the last one actually fixed. If you do not know, it is likely part of the problem. I wrote more about this in [why two cache plugins make a site slower](/blog/too-many-wordpress-cache-plugins/).

## What a fast WordPress site needs

A fast WordPress site is not exotic. It has:

1. Images resized and served in modern formats
2. One caching layer, configured properly
3. A short plugin list where every plugin earns its place
4. Templates that load only the code each page uses
5. Third-party scripts kept to the ones that matter, loaded after the content
6. Hosting with a current PHP version and enough memory for the traffic
7. A clean database

None of these needs a rebuild. Most sites get there with a few days of careful work, and the result lasts because the causes are gone rather than hidden.

## When it is time to get help

Do it yourself if the fixes are images and one plugin. Get help if the server is slow, if the site breaks every time you change a speed setting, or if you are running a store where every second costs sales. For stores, see [why WooCommerce gets slow](/blog/woocommerce-slow/). For the scores Google uses, see [how to pass Core Web Vitals on WordPress](/blog/wordpress-core-web-vitals/).

## A real example: TubeOnAI

TubeOnAI's site took about 5 seconds to load and kept going down under traffic. The obvious suspects were the images and the page builder, but the measurements pointed at the server: pages were slow to start, and the site failed at busy times. The cause turned out to be leftover files from old cache plugins clashing with a speed plugin the host had added on its own.

Removing the leftovers, keeping one caching layer, rebuilding the old column layouts and fixing the crawling issues brought load time to 1.5 seconds and cut server load by 60%, and the downtime stopped. None of it needed a new theme or new hosting. That is typical: most slow WordPress sites are fixed by removing what is fighting, not by adding more. The [full case study](/work/tubeonai/) walks through each step.

## Fix the cause, then measure again

The order matters. Images and duplicate caching are quick wins. Plugins and layouts take longer but last longer. After each change, run the same test again on the same page, so you know which fix actually helped.

If you would rather hand this over, I do [WordPress speed optimization](/wordpress-speed-optimization/) with before and after numbers on Google's own tool, and the cause written down so it does not come back.
