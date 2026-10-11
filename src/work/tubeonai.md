---
order: 2
client: TubeOnAI
focus: WordPress site keeps going down
clientUrl: https://tubeonai.com/
title: "A WordPress site keeps going down: the cause was its own speed plugins"
seoTitle: "WordPress Site Keeps Going Down? How I Fixed TubeOnAI"
description: "When a WordPress site keeps going down, look at its speed plugins first. TubeOnAI went from a 5 second load to 1.5 once the cause was removed."
summary: A WordPress site that kept going down, traced to leftover cache plugin files and fixed at the root.
result: Load time from 5 s to 1.5 s after the fix
role: WordPress developer, part-time
period: 2024 to 2025
stack: [WordPress, Elementor, Caching, Technical SEO]
metricValue: 1.5 s
metricLabel: load time after the fix, down from 5 seconds
faq:
  - q: "Why does a WordPress site keep going down?"
    a: "A WordPress site keeps going down when something on it conflicts or runs out of resources. The usual causes are two plugins doing the same job, files left behind by a removed plugin, or heavy pages exhausting server memory. On TubeOnAI it was old cache plugin files clashing with the host's own speed plugin."
  - q: "Can too many cache plugins slow a site down?"
    a: "Yes. Each cache plugin rewrites how pages are stored and served. Two of them at once can serve broken pages, clear each other's work or crash the site. One caching layer, set up properly, is faster than three."
  - q: "How do you fix a slow WordPress site?"
    a: "Measure first, then remove causes in order of size. On TubeOnAI that meant clearing the leftover cache plugins, keeping one caching layer and rebuilding the heaviest page layouts. Load time went from 5 seconds to 1.5 at the time of the fix."
  - q: "Does removing a plugin delete all its files?"
    a: "Not always. Some plugins leave files, database entries or server rules behind, especially cache and security plugins. Those leftovers can keep running. Part of a proper clean-up is checking the server for them."
---

## The problem

TubeOnAI is an AI tool that summarises videos, podcasts and articles. I built its marketing site from Figma designs. Later the site became unreliable: it went down again and again, and Google's crawler could not index its pages properly. Every hour offline meant lost signups.

## The cause

Several cache plugins had been added over time, each one meant to make the site faster. The site then moved to a host that runs its own speed plugin. The old plugins were removed, but their files stayed on the server and clashed with the new one. Some Elementor pages were also built in the old column style and were heavier than they needed to be.

## The fix

- Cleared out the old cache plugins and every leftover file
- Kept one caching layer
- Rebuilt the old column layouts
- Fixed the crawling and indexing issues

## The result

- The downtime stopped
- Load time went from 5 seconds to 1.5 seconds
- Server load fell by 60%
- Core Web Vitals above 90
- An estimated $6,000 in signups was not lost

## How I found it

- The symptoms pointed at the server, so I started there: what had changed, and when
- The site had recently moved to a host that runs its own speed plugin
- The old cache plugins had been switched off, but their files were still on the server and still being loaded
- Two caching systems were fighting over the same pages, which is what took the site down under load

## Inside the site, 11 October 2026

Read from the live site, page by page, and from Google PageSpeed Insights (mobile).

**Size.** 174 pages in the sitemap. Most are articles and tool pages: guides, tool round-ups and pages comparing TubeOnAI with alternatives.

**What the pages do.**

- Each tool page follows one pattern: what the tool is, how to use it, who it is for by role, then an FAQ. The YouTube Video Summarizer page is the model
- A pricing page with the plans side by side and its own FAQ
- Pages for students, professors, creators, researchers and marketers

**How it is built.**

- WordPress with Elementor Pro, on the Hello Elementor base theme
- Two plugins written for this site: one for custom Elementor widgets and one for site features
- Rank Math for search, Fluent Forms for forms
- Served through Cloudflare with Brotli compression and HTTPS enforced

**What search engines see.**

- Best practices score 96 in PageSpeed Insights
- Structured data for the organisation and the website
- Every one of the 22 images on the home page has alt text

The speed figures above are from when I did the work. The site has changed a great deal since, so they are not today's numbers.
