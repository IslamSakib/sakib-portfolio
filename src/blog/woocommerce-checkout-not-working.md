---
title: "WooCommerce checkout not working? Where to look first"
seoTitle: "WooCommerce Checkout Not Working? 8 Causes to Check"
description: "WooCommerce checkout not working? The eight causes I check first, from cached checkout pages to payment gateway errors, and how to find which one it is."
focus: WooCommerce checkout not working
date: "2026-10-15"
art: checkout
topic: Builds
service: wordpress-development
imageAlt: "A WooCommerce checkout form with a payment failed message, beside the title WooCommerce checkout not working"
stats:
  - { value: "3 pages", label: "WooCommerce says must never be cached: cart, checkout and my account", source: "WooCommerce, How to configure caching plugins", url: "https://developer.woocommerce.com/docs/best-practices/performance/configuring-caching-plugins" }
  - { value: "270", label: "US searches a month across \"WooCommerce checkout not working\" variations", source: "Semrush Keyword Overview, US, Oct 2026" }
sources:
  - { name: "WooCommerce, How to configure caching plugins", url: "https://developer.woocommerce.com/docs/best-practices/performance/configuring-caching-plugins" }
faq:
  - { q: "Why is my WooCommerce checkout not working?", a: "The most common causes are the checkout page being cached, a speed plugin combining or delaying scripts, a plugin conflict, payment gateway settings or webhooks, an outdated theme template, or mixed http and https content. Check the WooCommerce logs first." }
  - { q: "Why does WooCommerce checkout keep spinning?", a: "Usually a JavaScript error stops the checkout script. Open the browser console on the checkout page to see the error, then check for recently updated plugins or a speed plugin that combines or delays scripts." }
  - { q: "Why are WooCommerce orders stuck on pending payment?", a: "The payment gateway usually confirms payment through a webhook call to your site. If a firewall, cache or wrong URL blocks that call, the order stays pending. Check the webhook log in your gateway account." }
  - { q: "Should the WooCommerce checkout page be cached?", a: "No. Cart, checkout and my-account pages must be excluded from every cache, including the host's cache and any CDN, because they show different content for every visitor." }
  - { q: "How do I test WooCommerce checkout safely?", a: "Use your payment gateway's test mode on a staging copy of the store and place test orders with the gateway's test cards. Test the full path from cart to order email, logged out, as a customer would." }
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

## Symptoms and where they usually point

Match what you see to the likely cause before changing anything:

| What happens | Most likely cause |
|---|---|
| Spinner keeps turning after "Place order" | A JavaScript error, often from a plugin or a speed plugin combining scripts |
| "Session expired" or the cart empties | Checkout or cart pages being cached, or a cookie problem |
| Order created but marked failed | Payment gateway settings, API keys or webhook not reaching the site |
| Payment taken but order stuck on pending | The gateway's webhook or return call is blocked or failing |
| Checkout works for you but not for customers | You are logged in and bypassing the cache; visitors are not |
| Only one payment method fails | That gateway plugin or its account settings |
| Problems started after an update | A plugin, the theme's WooCommerce templates or WooCommerce itself |

The "works for me but not for them" case is the most common trap. Always test in a private browser window while logged out, the way a customer sees the store.

## Testing checkout without losing real money

Every major gateway has a test or sandbox mode with test card numbers. Use it on a staging copy of the store so you can place as many orders as you need. If you must test on the live store, use a small real payment and refund it, and turn off any automatic stock, shipping or email workflows first so a test order does not trigger real fulfilment.

Test the full path, not just the payment: add to cart, change quantity, apply a coupon, choose shipping, pay, and check that the order email arrives and the order appears correctly in WooCommerce.

## Webhooks: the hidden half of payments

Many gateways confirm payment by calling your site back afterwards (a webhook). If that call fails, the customer has paid but the order stays pending or failed. Common reasons: a security plugin or firewall blocking the gateway's servers, a caching layer serving the webhook URL, the site moved to a new address without updating the webhook, or an expired SSL certificate. Your gateway account dashboard usually lists webhook attempts and their errors, which is often the fastest way to the answer.

## Prevent it next time

Checkout failures are expensive because they are silent: nobody emails to say they could not pay, they just leave. Three habits help:

1. **Exclude cart, checkout and account pages from every cache layer**, including the host's and any CDN.
2. **Test a full order after every update** to WooCommerce, the theme or a payment plugin.
3. **Watch for a sudden drop in orders.** A store that normally takes orders every day and suddenly takes none is telling you something.

For stores that also feel slow, [why WooCommerce gets slow](/blog/woocommerce-slow/) covers the speed side. I built Moneybag's payment gateway plugin for WooCommerce, so this is work I know from the inside. See the [Moneybag case study](/work/moneybag/).

## Fix it on a copy, not on the live store

Every test above can disturb real customers. Make a staging copy, find the cause there, then apply only that fix to the live store.

Payment and checkout work is a large part of what I build. For Moneybag, a licensed payment gateway, I wrote the gateway as a custom WooCommerce plugin; [the Moneybag case study](/work/moneybag/) covers it. If your checkout is broken now, describe the problem and I will tell you where I would look first.
