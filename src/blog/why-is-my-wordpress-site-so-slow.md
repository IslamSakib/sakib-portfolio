---
title: "Why is my WordPress site so slow? The seven usual causes"
seoTitle: "Why Is My WordPress Site So Slow? 7 Causes and Fixes"
description: "Why is my WordPress site so slow? The seven causes I find most often, how to check each one in minutes, and what fixes them at the root."
focus: why is my WordPress site so slow
date: "2026-10-15"
art: bars
topic: Speed
service: wordpress-speed-optimization
imageAlt: "Dark violet cover with a long grey bar and a short purple bar comparing a slow and a fast WordPress page load"
---

If you are asking why your WordPress site is so slow, the answer is almost never one thing. It is usually two or three small problems stacked on top of each other. These are the seven I find most often when I open a slow site, roughly in the order I check them.

## Measure before you change anything

Run the page through Google PageSpeed Insights on mobile. Look first at the box at the top that shows real visitor data (Core Web Vitals from the Chrome User Experience Report). That tells you whether real people find the site slow. The lab score underneath is useful for finding causes, but it is a simulation on a slow phone, so a low lab score alone is not proof of a problem.

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

## Fix the cause, then measure again

The order matters. Images and duplicate caching are quick wins. Plugins and layouts take longer but last longer. After each change, run the same test again on the same page, so you know which fix actually helped.

If you would rather hand this over, I do [WordPress speed optimization](/wordpress-speed-optimization/) with before and after numbers on Google's own tool, and the cause written down so it does not come back.
