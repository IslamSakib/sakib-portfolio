---
order: 0
client: Mayabee
focus: custom ecommerce website
clientUrl: https://mayabeebd.com/
title: "Custom ecommerce website with its own order dashboard"
seoTitle: "Custom Ecommerce Website With Admin Dashboard | Mayabee"
description: "Custom ecommerce website for a Dhaka handbag and jewellery shop, with an order and delivery dashboard."
summary: "A custom ecommerce website for Mayabee, a handbag and jewellery shop in Dhaka: English and Bangla storefront, an admin dashboard for orders, cash on delivery, stock and reports."
result: Shop and dashboard built as one
chip: "custom store and dashboard"
relevant: "Relevant if you need an online store or web app with its own admin side."
role: Full-stack developer, UI/UX designer
period: 2026
stack: [Astro, PHP API, MySQL, Admin dashboard, English and Bangla]
metricValue: "0.8 s"
metricLabel: largest content on screen, home page on a throttled phone, 23 Oct 2026
faq:
  - q: "What does a custom ecommerce website cost compared with a hosted store?"
    a: "A hosted store builder costs less to start, but it charges monthly fees and cannot easily follow your own rules, such as cash on delivery by area or courier payouts. A custom build costs more up front and is quoted after I read your brief. It makes sense when your shop runs on rules a template cannot follow."
  - q: "Can the shop owner manage products and orders without a developer?"
    a: "Yes. The shop team adds products, uploads photos, changes prices and stock, confirms orders and records courier payouts in the dashboard. A change shows on the shop at once, and daily work does not need me."
  - q: "Can a store work in two languages?"
    a: "Yes. Mayabee runs in English and Bangla across the storefront and the dashboard, with a language switch on every page. Each language has its own pages, so both can be found in search."
  - q: "Do you build the dashboard as well as the storefront?"
    a: "Yes. The storefront, the API and the dashboard were designed and built together, so the shop and the dashboard always agree about stock, prices and orders."
psi:
  date: "23 Oct 2026"
  page: "mayabeebd.com home page"
  report: "https://pagespeed.web.dev/analysis/https-mayabeebd-com/2fzjuyqshd?form_factor=mobile"
  performance: 100
  accessibility: 100
  bestPractices: 96
  seo: 100
  lcp: "0.9 s"
  cls: "0.003"
  tbt: "0 ms"
  fcp: "0.9 s"
  speedIndex: "2.7 s"
  note: "Lab test. Google has no real-user data for this new site yet."
---

## What did Mayabee need?

Mayabee sells handbags and jewellery in Dhaka and delivers across Bangladesh with cash on delivery. The owner needed a shop that looks like the brand, loads fast on a phone, and a back office the team can run without a developer: confirm orders by phone, send parcels with a courier and know how much cash the couriers still owe.

## What did I build?

**The storefront**

- A shop with categories, filters for price, colour and occasion, and product pages with a delivery estimate by area
- Cart, checkout with cash on delivery, order tracking and a wishlist
- English and Bangla versions of every page, with a switch in the header
- Product pages drawn from the database, so a change in the dashboard shows at once

**The admin dashboard**

- Home: today's orders and sales, what needs attention, best sellers
- Orders: every order with its status, phone orders entered by staff, invoices and parcel labels
- Delivery and cash: parcels with each courier, cash on delivery collected, payouts recorded, return rate by area
- Products, stock, size guides and a media library that shrinks photos for the web
- Customers, discounts and delivery fees, content and SEO, messages
- Reports for sales, products, customers, areas, coupons and delivery
- Team and activity: four roles (owner, manager, orders, content) and a record of every change

## How did I design it?

I designed the storefront and the dashboard myself before writing code, so what the owner approved is what shipped. The dashboard's wording is plain on purpose: its screens say "Needs your attention" and "Still with couriers", not accounting terms.

## How is it built?

- A static Astro front end for the pages that rarely change, and a PHP API with a MySQL database for products, orders and customers
- Sign-in with email and password, and a confirmation link sent when a new device signs in
- Photos resized to several WebP sizes (AVIF where the server allows), with camera and location data removed
- Deployed to the owner's shared hosting with one command, without touching the database or uploaded photos

## What was the result?

I measured the live site on 23 October 2026 on a simulated phone (390 px wide, 4x slower processor, slow 4G):

- Home page: largest content on screen in 0.8 s, no layout shift, 253 KB over 29 requests
- Shop and product pages: largest content in under 0.9 s with no layout shift
- Google PageSpeed Insights, mobile, 23 October 2026: Performance 100, Accessibility 100, Best practices 96, SEO 100 (the full report is linked above)

The shop and dashboard are live at [mayabeebd.com](https://mayabeebd.com/). Online card and mobile wallet payments are not built yet: orders are cash on delivery.
