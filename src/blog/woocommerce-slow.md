---
title: "WooCommerce slow? Why stores slow down and how to speed them up"
seoTitle: "WooCommerce Slow? Causes and Fixes That Work"
description: "WooCommerce slow? Why stores slow down, from uncached carts to heavy plugins, and how to fix it."
focus: WooCommerce slow
date: "2026-10-15"
art: woo
topic: Speed
service: wordpress-speed-optimization
imageAlt: "A WooCommerce shop grid with a slow add to cart progress bar waiting for the server, beside the title WooCommerce slow"
sources:
  - { name: "WooCommerce Developer Docs, High-Performance Order Storage", url: "https://developer.woocommerce.com/docs/features/high-performance-order-storage/" }
  - { name: "web.dev, Interaction to Next Paint (INP)", url: "https://web.dev/articles/inp" }
  - { name: "Google PageSpeed Insights", url: "https://pagespeed.web.dev/" }
faq:
  - { q: "Why is WooCommerce so slow?", a: "Stores cannot cache the cart, checkout and account pages, so the server builds them for every visitor. Large product images, many plugins, cart fragment requests, a big orders table and underpowered hosting add up on top of that." }
  - { q: "Why is the WooCommerce admin slow?", a: "Usually a large database, especially years of orders and their metadata, heavy reporting or marketing plugins loading on every admin screen, scheduled tasks piling up in Action Scheduler, or a server without enough memory or an object cache." }
  - { q: "Does WooCommerce need special hosting?", a: "It needs more than a basic brochure site: a current PHP version, enough memory, and ideally an object cache such as Redis, because many store pages cannot be fully cached. Cheap shared hosting is a common cause of slow stores." }
  - { q: "Should I cache WooCommerce pages?", a: "Cache product, category and content pages, but never the cart, checkout or my-account pages. Caching those breaks carts and sessions." }
  - { q: "How much does it cost to speed up a WooCommerce store?", a: "It depends on whether the cause is the server, the plugins or the theme. My speed fixes start from $450 per site, measured before and after on Google's own tool, with stores quoted after a look at the site." }
---

Your WooCommerce store is slow on every page, and every extra second sits between a customer and the "Place order" button. WooCommerce slow is usually not WooCommerce itself. It's the combination of pages that can't be cached, product images and plugins that add weight to every page, and a database that grows with every order. A slow store costs more than a slow brochure site. Here's where stores lose speed and what actually fixes it.

## Why is my store slower than a normal WordPress site?

A normal WordPress page can be built once and served from a cache to every visitor. A store can't do that everywhere:

- **The cart, checkout and account pages** are different for every visitor, so the server builds them fresh every time.
- **Cart fragments:** many themes update the mini-cart in the header with an extra background request on page loads.
- **More database work:** products, variations, stock, prices, coupons and orders all live in the database and get queried constantly.
- **More plugins:** payment gateways, shipping, reviews, wishlists, marketing pixels, each adding code.

That's why a store needs faster hosting and more care than a brochure site of the same size.

## Which pages should I measure?

The ones that sell. Test four kinds of page separately in [PageSpeed Insights](https://pagespeed.web.dev/), on mobile:

1. The home page
2. A category page
3. A product page with a full gallery
4. The cart and checkout (add an item first)

Write down the results, especially the server response time. If the server is slow on every page, the fix is in hosting, caching or the database. If the server is fast but the pages are heavy, the fix is in images, scripts and the theme.

## Cause 1: Is my hosting keeping up?

Because so many store pages are built fresh, a store needs a current PHP version, enough memory and, ideally, an object cache such as Redis or Memcached, which keeps database results in memory. On cheap shared hosting, a store can be fast at night and crawl during a sale. If your server response time is above about a second on uncached pages, start here.

## Cause 2: Are my product images too big?

Product photos straight from a camera or a supplier are often thousands of pixels wide. Resize them to the largest size your theme displays, serve WebP or AVIF, and make sure the gallery lazy-loads images below the first one. A product page with eight full-size photos can weigh several megabytes before any code runs.

## Cause 3: Are too many plugins loading on every page?

Store plugins often load their scripts on every page, even where they do nothing: a reviews widget on the contact page, a wishlist script on blog posts, three tracking pixels everywhere. Review each plugin and ask whether you use it and whether its code can be limited to the pages that need it.

## Cause 4: What are cart fragments and AJAX requests?

Many themes ask the server for an updated mini-cart on page loads so the header shows the right count. On a busy store this adds a lot of uncached requests. If your theme uses it, limit it to pages where it matters, or use a theme that updates the cart only when something is added.

## Cause 5: Is my database heavy?

Every order, customer and product variation adds rows. Years of orders, old sessions, expired data and leftover tables from removed plugins slow queries down. Two things help most:

- **High-Performance Order Storage (HPOS)** moves orders into dedicated tables instead of the general posts table ([WooCommerce's documentation](https://developer.woocommerce.com/docs/features/high-performance-order-storage/)). Newer stores use it by default. Older stores can switch after testing their plugins for compatibility.
- **Cleaning up** expired sessions, old scheduled actions in Action Scheduler, post revisions and orphaned data, after a full backup.

## Cause 6: Is my theme or page builder too heavy?

Multipurpose themes and page builders often load large CSS and JavaScript files on every page. On a store, that weight sits on top of WooCommerce's own scripts. Rebuilding the product and category templates with less code is often the single biggest front-end gain.

## Cause 7: Why do taps feel slow, not just loading?

Google's [Interaction to Next Paint](https://web.dev/articles/inp) measures how quickly a page responds when someone taps. On stores, "Add to cart", variation selectors and the checkout button are where slow responses hurt most. Heavy JavaScript from marketing scripts and page builders is the usual cause.

## How do I cache my store without breaking the cart?

Cache what can be cached, and exclude what can't:

- **Cache:** home, category, product and content pages for logged-out visitors.
- **Never cache:** cart, checkout, my-account, and any page with personal content.
- **Add an object cache** for the pages that can't be page-cached.

Don't stack two page-caching plugins, and don't let an optimisation plugin combine or delay checkout scripts. That's a common cause of [WooCommerce checkout not working](/blog/woocommerce-checkout-not-working/).

## Why is my WooCommerce admin slow too?

If the dashboard is slow while the shop front is fine, look at the database size, the Action Scheduler queue (WooCommerce, then Status, then Scheduled Actions) for thousands of pending tasks, reporting and analytics plugins that run heavy queries on every admin screen, and the server's memory limit.

## How do I keep my store fast during sales?

A store that's fine on a normal day can struggle during a sale, when many people browse uncached pages, add to cart and check out at once. Before a big promotion, test the store under realistic traffic on staging, make sure the hosting plan can scale or has headroom, warm the cache for product and category pages, and avoid deploying updates in the days just before. A slow checkout during a sale costs more than at any other time.

## Why check the checkout last?

After any speed change, place a test order from start to finish, logged out, on a phone. Speed work that breaks the checkout is worse than no speed work at all.

## Where should I start?

In my experience the order that pays off fastest is: hosting and object cache if the server is slow, then images, then plugin and script clean-up, then the theme templates. Measure after each step so you know what helped. For the general WordPress causes, see [why is my WordPress site so slow](/blog/why-is-my-wordpress-site-so-slow/).

If you'd rather hand it over, I do [WordPress and WooCommerce speed optimization](/website-care/) with before and after numbers on Google's own tool. I also built Moneybag's payment gateway plugin for WooCommerce, so I know the checkout side from the inside.
