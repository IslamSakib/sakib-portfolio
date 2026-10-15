---
title: "WordPress Core Web Vitals: how to pass LCP, INP and CLS"
seoTitle: "WordPress Core Web Vitals: How to Pass LCP, INP, CLS"
description: "WordPress Core Web Vitals explained: what LCP, INP and CLS measure, how to read your real-visitor data, and the WordPress fixes that move each one."
focus: WordPress Core Web Vitals
date: "2026-10-15"
art: rings
topic: Speed
service: wordpress-speed-optimization
imageAlt: "Three Core Web Vitals gauges, LCP, INP and CLS, all rated good on mobile, beside the title WordPress Core Web Vitals"
stats:
  - { value: "2.5 s", label: "or less is a good Largest Contentful Paint", source: "web.dev, Web Vitals", url: "https://web.dev/articles/vitals" }
  - { value: "200 ms", label: "or less is a good Interaction to Next Paint", source: "web.dev, Web Vitals", url: "https://web.dev/articles/vitals" }
  - { value: "40%", label: "of WordPress sites passed Core Web Vitals on mobile in 2024", source: "HTTP Archive Web Almanac 2024", url: "https://almanac.httparchive.org/en/2024/cms" }
sources:
  - { name: "web.dev, Web Vitals", url: "https://web.dev/articles/vitals" }
  - { name: "Google, About PageSpeed Insights", url: "https://developers.google.com/speed/docs/insights/v5/about" }
  - { name: "HTTP Archive Web Almanac 2024", url: "https://almanac.httparchive.org/en/2024/cms" }
faq:
  - { q: "What are good Core Web Vitals scores?", a: "Google's thresholds for good are a Largest Contentful Paint of 2.5 seconds or less, an Interaction to Next Paint of 200 milliseconds or less, and a Cumulative Layout Shift of 0.1 or less, measured at the 75th percentile of real visits." }
  - { q: "Do Core Web Vitals affect SEO?", a: "They are part of Google's page experience signals, so they can affect rankings, mostly between pages of similar relevance and quality. They have a bigger effect on how many visitors stay long enough to read and act." }
  - { q: "Why does my PageSpeed score keep changing?", a: "The lab score is one simulated run, so network timing and third-party scripts move it by a few points each test. Run it several times, or rely on the real visitor data averaged over 28 days." }
  - { q: "Which WordPress plugin fixes Core Web Vitals?", a: "No single plugin fixes them. A caching plugin helps server speed, and an image plugin helps LCP, but heavy themes, page builders and third-party scripts need to be fixed at the source. Stacking optimisation plugins often makes things worse." }
  - { q: "How long until Core Web Vitals improve in Search Console?", a: "The real visitor data covers the previous 28 days, so improvements show gradually over about four weeks after a fix is deployed. You can then use Search Console's Validate Fix button to confirm." }
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

## Do Core Web Vitals affect rankings?

Yes, but as one signal among many. Google uses page experience, including Core Web Vitals, when it ranks pages, but relevant, helpful content still matters more. Where Core Web Vitals help most is between pages of similar quality: if your page and a competitor's answer the same question equally well, the faster, steadier page has the edge.

The bigger effect is on visitors. A page that loads slowly or jumps around while loading loses people before they read a word, and that affects enquiries and sales whether or not rankings move.

## Why your score changes every time you test

The lab score in PageSpeed Insights is a single simulated run, so it moves by a few points between tests because of network timing, server load and third-party scripts. Do not chase small changes. Run the test three times and look at the middle result, or better, watch the real visitor data, which is averaged over 28 days and changes slowly.

If the real visitor box says "not enough data", your site does not have enough Chrome visitors for Google to report on. Google then judges the page mostly on other signals, and the lab test is your best guide.

## WordPress plugins that commonly hurt Core Web Vitals

Not every plugin is a problem, but some types are frequent offenders:

- **Sliders and carousels at the top of the page.** They delay the main image (LCP) and often shift the layout (CLS).
- **Page builders with heavy add-on packs.** Many load their scripts and styles on every page, used or not, which hurts LCP and INP.
- **Chat widgets, pop-ups and cookie banners.** Large scripts from other servers that compete with your content and can block taps (INP).
- **Social feeds and embedded videos.** Each embed loads code from another site. Load them only when the visitor scrolls to them, or show a static preview image.
- **Multiple optimisation plugins.** Two plugins rewriting the same CSS and JavaScript can break layouts and undo each other. Keep one.

## A testing routine that works

1. Pick the pages that matter: the home page, your top landing pages and, for stores, a product page and the checkout.
2. Record mobile results for each before changing anything.
3. Make one change at a time and test again on the same pages.
4. After deploying, check the real visitor data in Search Console's Core Web Vitals report over the next four weeks.

Search Console groups pages with similar problems, so one fix to a shared template often fixes hundreds of URLs at once.

## What this looks like in practice

Tabby launched with Core Web Vitals above 90, and TubeOnAI's load time went from 5 seconds to 1.5 once its caching conflict was removed. The fixes were not exotic: the right image sizes, one caching layer and lighter templates. The [TubeOnAI case study](/work/tubeonai/) walks through it.

If you want the work done with before and after numbers on Google's own tool, see [WordPress speed optimization](/wordpress-speed-optimization/).
