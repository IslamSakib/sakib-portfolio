---
order: 2
client: TubeOnAI
focus: WordPress site keeps going down
clientUrl: https://tubeonai.com/
title: "A WordPress site keeps going down: the cause was its own speed plugins"
seoTitle: "WordPress Site Keeps Going Down? How I Fixed TubeOnAI"
description: "When a WordPress site keeps going down, look at its speed plugins first. TubeOnAI went from a 5 second load to 1.5 once the cause was removed."
summary: A WordPress site that kept going down, traced to leftover cache plugin files and fixed at the root.
result: Load time from 5 s to 1.5 s
role: WordPress developer, part-time
period: 2024 to 2025
stack: [WordPress, Elementor, Caching, Technical SEO]
metricValue: 1.5 s
metricLabel: load time, down from 5 seconds
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

## What is on the site today

Checked on the live site on 11 October 2026.

- A page for each summary tool: YouTube, podcasts, Drive files and articles
- Pages for each audience: students, professors, creators, researchers and marketers
- Two plugins written for this site: one for custom Elementor widgets and one for site features
- WordPress with Elementor and Rank Math, served through Cloudflare
