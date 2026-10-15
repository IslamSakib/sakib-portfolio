---
title: "WordPress Core Web Vitals: how to pass LCP, INP and CLS"
seoTitle: "WordPress Core Web Vitals: How to Pass LCP, INP, CLS"
description: "WordPress Core Web Vitals explained: what LCP, INP and CLS measure, how to read your real-visitor data, and the WordPress fixes that move each one."
focus: WordPress Core Web Vitals
date: "2026-10-15"
topic: Speed
service: wordpress-speed-optimization
imageAlt: "Woman smiling at her phone in a cafe, beside the title WordPress Core Web Vitals: how to pass LCP, INP and CLS"
stats:
  - { value: "2.5 s", label: "or less is a good Largest Contentful Paint", source: "web.dev, Web Vitals", url: "https://web.dev/articles/vitals" }
  - { value: "200 ms", label: "or less is a good Interaction to Next Paint", source: "web.dev, Web Vitals", url: "https://web.dev/articles/vitals" }
  - { value: "40%", label: "of WordPress sites passed Core Web Vitals on mobile in 2024", source: "HTTP Archive Web Almanac 2024", url: "https://almanac.httparchive.org/en/2024/cms" }
sources:
  - { name: "web.dev, Web Vitals", url: "https://web.dev/articles/vitals" }
  - { name: "Google, About PageSpeed Insights", url: "https://developers.google.com/speed/docs/insights/v5/about" }
  - { name: "HTTP Archive Web Almanac 2024", url: "https://almanac.httparchive.org/en/2024/cms" }
---

[Core Web Vitals](https://web.dev/articles/vitals) are three measurements Google uses to judge how a page feels to real visitors. On WordPress sites they mostly come down to images, scripts and layout. Here is what each one measures, the target to aim for, and the WordPress fixes that actually move it.

## The three measurements

- **LCP, Largest Contentful Paint:** how long the main content takes to appear. Good is 2.5 seconds or less.
- **INP, Interaction to Next Paint:** how quickly the page responds when someone taps or clicks. Good is 200 milliseconds or less.
- **CLS, Cumulative Layout Shift:** how much the page jumps around while it loads. Good is 0.1 or less.

A page passes when at least 75% of real visits meet all three.

## Read the right numbers

Google PageSpeed Insights shows two sets of numbers. The top box is real visitor data from Chrome users over the previous 28 days ([Google explains the difference](https://developers.google.com/speed/docs/insights/v5/about)), and this is what Google uses. The lab score below it is a simulated test on a slow phone. A site can have a poor lab score and still pass on real visitors, and the other way round. Fix what the real data says first.

New or small sites may have no real visitor data yet. Then the lab test is your best guide.

## Fixing LCP on WordPress

The largest element is usually the hero image or the main heading.

- Serve the hero image at the size it is shown, in WebP or AVIF
- Do not lazy-load the hero image; it should load first
- Use one properly configured caching layer, not two
- Cut render-blocking CSS and JavaScript from plugins that are not needed on that page
- Self-host your web fonts and preload the main one

## Fixing INP on WordPress

INP suffers when too much JavaScript runs on the page.

- Remove plugins that add scripts to every page but are only used on one
- Delay third-party scripts (chat, analytics, ad pixels) until after the page has loaded
- Rebuild very heavy page-builder layouts, which ship large scripts

## Fixing CLS on WordPress

CLS is usually the easiest of the three.

- Give every image and video a width and height
- Reserve space for ads, embeds and cookie banners before they load
- Load fonts so the text does not change size noticeably after the page appears

## What this looks like in practice

Tabby launched with Core Web Vitals above 90, and TubeOnAI's load time went from 5 seconds to 1.5 once its caching conflict was removed. The fixes were not exotic: the right image sizes, one caching layer and lighter templates. The [TubeOnAI case study](/work/tubeonai/) walks through it.

If you want the work done with before and after numbers on Google's own tool, see [WordPress speed optimization](/wordpress-speed-optimization/).
