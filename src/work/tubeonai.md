---
order: 2
client: TubeOnAI
clientUrl: https://tubeonai.com/
title: The site kept going down because of its own speed plugins
seoTitle: "TubeOnAI: Fixing a WordPress Site That Kept Going Down"
description: TubeOnAI's WordPress site kept going down. The cause was leftover cache plugin files. Load time went from 5 seconds to 1.5.
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
