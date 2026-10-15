---
title: "WooCommerce checkout not working? Where to look first"
seoTitle: "WooCommerce Checkout Not Working? 8 Causes to Check"
description: "WooCommerce checkout not working? The eight causes I check first, from cached checkout pages to payment gateway errors, and how to find which one it is."
focus: WooCommerce checkout not working
date: "2026-10-15"
photoFocus: 95%
topic: Builds
service: wordpress-development
imageAlt: "Woman holding a bank card and a phone while shopping online, beside the title WooCommerce checkout not working"
stats:
  - { value: "3 pages", label: "WooCommerce says must never be cached: cart, checkout and my account", source: "WooCommerce, How to configure caching plugins", url: "https://developer.woocommerce.com/docs/best-practices/performance/configuring-caching-plugins" }
  - { value: "270", label: "US searches a month across \"WooCommerce checkout not working\" variations", source: "Semrush Keyword Overview, US, Oct 2026" }
sources:
  - { name: "WooCommerce, How to configure caching plugins", url: "https://developer.woocommerce.com/docs/best-practices/performance/configuring-caching-plugins" }
---

A WooCommerce checkout that is not working is the most expensive bug a store can have, because every minute it is broken is lost orders. The good news is that the cause is usually one of a short list. These are the eight I check first, in this order.

## 1. Look at the logs before guessing

Go to WooCommerce, then Status, then Logs. Payment gateways and WooCommerce itself write errors here, often with the exact reason a payment failed. Also open the browser console on the checkout page (right click, Inspect, Console): a red JavaScript error there usually explains a button that does nothing.

## 2. The checkout page is being cached

Cart, checkout and my-account pages must never be cached, because they are different for every customer. If a cache plugin, your host or Cloudflare caches them, customers see someone else's cart or a checkout that will not submit. Exclude those pages in every caching layer; [WooCommerce's own caching guide](https://developer.woocommerce.com/docs/best-practices/performance/configuring-caching-plugins) says the same.

## 3. Scripts combined or delayed by a speed plugin

Speed plugins that combine, minify or delay JavaScript can break the checkout scripts. If the checkout broke after a speed change, exclude WooCommerce and your payment gateway's scripts from those optimisations.

## 4. A plugin conflict

Two plugins changing the checkout (custom fields, shipping rules, discounts) can collide. Test on a staging copy: switch to a default theme and disable plugins one at a time until the checkout works.

## 5. The payment gateway setup

Check that the gateway is in live mode, not test mode, that the API keys are the live ones, and that webhooks are set up and reachable. Many "payment went through but the order is still pending" problems are webhooks that never arrive.

## 6. An outdated theme template

Themes can override WooCommerce's checkout templates. When WooCommerce updates, an old override can break. WooCommerce, then Status, lists any outdated template overrides at the bottom of the page.

## 7. HTTPS and mixed content

The checkout must load entirely over HTTPS. Images or scripts loading over plain HTTP can block payment forms. The browser console shows mixed content warnings.

## 8. Sessions and cookies

If the cart empties at checkout, look at cookie and session settings, especially after a domain change or when a security plugin blocks cookies.

## Fix it on a copy, not on the live store

Every test above can disturb real customers. Make a staging copy, find the cause there, then apply only that fix to the live store.

Payment and checkout work is a large part of what I build. For Moneybag, a licensed payment gateway, I wrote the gateway as a custom WooCommerce plugin; [the Moneybag case study](/work/moneybag/) covers it. If your checkout is broken now, describe the problem and I will tell you where I would look first.
