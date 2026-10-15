---
title: "How to redesign a website without losing SEO"
seoTitle: "How to Redesign a Website Without Losing SEO"
description: "How to redesign a website without losing SEO: keep the addresses or redirect them, carry over what ranks, and check Search Console after launch."
focus: redesign a website without losing SEO
date: "2026-10-15"
art: redesign
topic: Builds
service: wordpress-development
imageAlt: "An old website and the new Tabby website side by side with a checklist: same page addresses, titles carried over, redirects in place"
stats:
  - { value: "1 year", label: "the minimum Google recommends keeping redirects after a move", source: "Google Search Central, Site moves and migrations", url: "https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes" }
  - { value: "301 / 308", label: "the permanent redirect types Google recommends", source: "Google Search Central, Site moves and migrations", url: "https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes" }
  - { value: "1,900", label: "US searches a month for \"website redesign seo\"", source: "Semrush Keyword Overview, US, Oct 2026" }
sources:
  - { name: "Google Search Central, Site moves and migrations", url: "https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes" }
faq:
  - { q: "Will a website redesign hurt my SEO?", a: "Only if pages change address without redirects, lose the topic they ranked for, or get blocked from Google at launch. Keep URLs the same or redirect each one, carry over titles and main content, and check indexing settings before going live." }
  - { q: "How long do redirects need to stay after a redesign?", a: "Google recommends keeping 301 or 308 redirects for at least a year. In practice, keep them permanently: they cost almost nothing and protect links from other sites that still point to the old addresses." }
  - { q: "Should I redirect old pages to the home page?", a: "No. Google treats mass redirects to the home page much like deleted pages. Redirect each old page to the new page that covers the same topic." }
  - { q: "How long does it take for rankings to recover after a redesign?", a: "If URLs, titles and content were carried over correctly, rankings usually hold or wobble only briefly. A steady drop on specific pages after the first couple of weeks points to a missing redirect or a removed title or section." }
  - { q: "Can I change my WordPress theme without losing SEO?", a: "Yes, if the page addresses, titles, headings and content stay the same and the new theme is at least as fast on mobile. Test the new theme on a staging copy and compare the source of your top pages before switching." }
---

A redesign is when many sites lose the search traffic they spent years building. Not because the new design is worse, but because the pages Google knew quietly changed address, lost their titles or disappeared. You can redesign a website without losing SEO if you treat the move as carefully as the design. This is the checklist I follow, including on Tabby's 2.0 relaunch.

## 1. List every page that brings traffic

Before anything changes, export the pages that get search clicks from Google Search Console (Performance, then Pages), and crawl the old site to get a full list of addresses. These two lists are what you must protect.

## 2. Keep the addresses, or redirect every one

The safest redesign keeps every URL the same. If addresses must change, map each old address to its closest new page and add a permanent (301) redirect for each. [Google's site move guide](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes) recommends 301 or 308 redirects, kept for at least a year. Never send everything to the home page: Google treats that much like the page was deleted.

## 3. Carry over what ranks

For each page on your traffic list, keep what earned the ranking: the main heading, the title tag, the meta description and the core content. You can rewrite and redesign, but do not drop the topic the page was ranking for. On Tabby's relaunch, the addresses, titles and descriptions that were already ranking were carried into the new site, so Google saw the same pages with a new design instead of a new site. [The Tabby case study](/work/tabby/) has the details.

## 4. Keep internal links pointing at real pages

A new menu and new templates change how pages link to each other. Make sure important pages are still linked from the menu or the home page, and that no links point to old addresses that now redirect.

## 5. Build on a hidden staging site

Build the new design on a staging copy that search engines cannot index. Before launch, untick "Discourage search engines from indexing this site" (Settings, then Reading) and remove any noindex tags. This one checkbox has de-indexed more relaunched sites than any algorithm update.

## 6. Do not launch slower than you were

Page speed is part of how Google judges a page. Test the new templates on mobile before launch. A heavier design can cost rankings even when everything else was moved correctly.

## 7. Launch, then watch for two weeks

After launch, submit the new sitemap in Search Console, check the Pages report for new "not found" errors, and compare clicks for your traffic list week by week. Small dips in the first days are normal; a steady fall on specific pages means a redirect or a title went missing.

## The redirect map, in practice

The redirect map is a simple spreadsheet with two columns: old address and new address. Fill it from your traffic list first, then from the full crawl. A few rules make it work:

- **One old page, one closest new page.** A page about pricing goes to the new pricing page, not to the home page.
- **No chains.** If an address was already redirected in an earlier redesign, point the oldest address straight at the final one. Chains of two or three redirects waste crawl time and leak value.
- **Keep the old domain's redirects too.** If the site has ever moved domains or switched from http to https, those rules must survive the redesign.
- **Test the whole list after launch.** A crawler can check every old address and confirm each one lands on a live page with a 200 response in one hop.

On WordPress, redirects can live in the server configuration or in a redirect plugin. Server rules are faster; a plugin is easier for non-developers to edit. Either is fine as long as there is one place for them.

## Content you can safely change

A redesign does not mean freezing every word. Safe changes: improving the layout, rewriting for clarity, adding sections, better images with proper alt text, and adding FAQs that answer real questions. Risky changes: removing the section that answered the search query, merging two ranking pages into one without a redirect, or changing the main heading to something unrelated to the topic people searched for.

When in doubt, keep the page's main subject in the title, the H1 and the first paragraph. That is the signal Google uses most to understand what the page is about.

## Structured data and meta tags

If the old site had structured data (for example FAQ, product or article markup), carry it over. The same goes for canonical tags, Open Graph tags for social sharing, and hreflang tags on multilingual sites. These are invisible on the page, so they are the easiest things to lose in a redesign and the hardest to notice afterwards. Compare the old and new source of your top pages before launch.

## Redesigning on WordPress specifically

WordPress adds a few traps of its own:

- **Permalink settings.** Changing the permalink structure (Settings, then Permalinks) changes every post address at once. Leave it as it was unless you have a redirect for every post.
- **Category and tag pages.** These often get search traffic too. Keep their base slugs the same.
- **Image addresses.** If images moved to a new folder or a CDN, old image links in Google Images will break. Redirect them or keep the uploads folder in place.
- **SEO plugin data.** Titles and descriptions stored in an SEO plugin must be migrated if you switch plugins.

If the redesign also moves the site to new hosting, do the move first, confirm traffic is stable, and then launch the design. Two big changes at once make it impossible to tell which one caused a drop.

## A launch-day checklist

Print this and tick it off on the day the new site goes live:

1. Search engine visibility setting is on (Settings, then Reading) and no page carries a noindex tag by mistake
2. Every old address in the redirect map lands on the right new page in one hop
3. Titles, meta descriptions and H1s on the top pages match what was planned
4. The XML sitemap lists only new, live addresses and is submitted in Search Console
5. Robots.txt does not block anything important (staging sites often ship with a "block everything" rule)
6. Analytics and Search Console tracking are installed on every template
7. Forms, checkout and any logins work, tested with a real submission
8. Mobile speed on the home page and the top three landing pages is checked again on the live server

Most traffic losses after a redesign come from items 1, 2 and 5. They take minutes to check and months to recover from if missed.

## The short version

Same addresses or a redirect for every one, the same topic on every ranking page, nothing blocked from Google, and the new site at least as fast as the old one.

I build and relaunch WordPress sites with this checklist as part of the job. See [custom WordPress development](/wordpress-development/), or send me your current site for a free check.
