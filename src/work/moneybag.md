---
order: 3
client: Moneybag
focus: custom WordPress plugin
clientUrl: https://moneybag.com.bd/
title: "Custom WordPress plugin and website for a licensed payment gateway"
seoTitle: "Custom WordPress Plugin for a Payment Gateway | Moneybag"
description: "Custom WordPress plugin and website for Moneybag, a licensed payment gateway. See how it was built."
summary: "A custom WordPress plugin and website for Moneybag, a licensed payment gateway, built for security and speed."
result: Merchant onboarding time down 60%
chip: "payment gateway plugin"
relevant: "Relevant if you need custom checkout or payment work."
role: WordPress and plugin developer
period: 2025
stack: [WordPress, WooCommerce, Custom plugin, OTP authentication, CRM integration]
metricValue: 60%
metricLabel: less time to onboard a merchant
faq:
  - q: "When do you need a custom WordPress plugin?"
    a: "You need a custom WordPress plugin when a feature is specific to your business and no existing plugin does it cleanly. A payment gateway is a clear case: verification, fees and failed payments follow your own rules, so the logic belongs in code written for it."
  - q: "Can WooCommerce work with a custom payment gateway?"
    a: "Yes. WooCommerce is built to accept new payment gateways through plugins. For Moneybag I wrote the gateway plugin, with OTP sign-in and a merchant onboarding flow around it."
  - q: "How do you keep a payment site fast?"
    a: "Ship as little code as possible. The current Moneybag home page loads no external scripts and two stylesheets, which is why the first response arrives in under half a second."
---

## What did Moneybag need?

Moneybag is an online payment gateway in Bangladesh, licensed by Bangladesh Bank as a Payment Service Operator. It needed a platform secure enough for financial transactions, fast enough to convert visitors, and able to grow with its merchants.

## What did I build?

- A custom payment gateway plugin for WordPress and WooCommerce
- OTP authentication
- A merchant onboarding workflow
- CRM integration for transactions and users
- Subscription tiers and dynamic pricing logic
- The current website at moneybag.com.bd

## What was the result?

- Pages load in under 2 seconds
- Merchant onboarding time fell by 60%
- The platform handles thousands of transactions a day

## Why did I write a custom WordPress plugin?

A payment gateway can't be bolted on with a general-purpose plugin. The rules are specific: how a merchant is verified, what happens when a payment fails halfway, which fee applies to which plan. Writing the gateway as its own plugin kept that logic in one place where it can be tested and changed safely. If your WooCommerce checkout is failing instead, start with [why a WooCommerce checkout stops working](/blog/woocommerce-checkout-not-working/).

## What does the Moneybag site look like today?

I read the live site page by page on 11 October 2026.

**How big is it?** 77 pages in the sitemap, including a library of articles on how payment gateways work, fraud prevention and WooCommerce payment gateways in Bangladesh, plus 6 support pages.

**What do the pages do?**

- The payment gateway page explains the product in order: how a payment runs, what happens after the customer pays, and five ways to ask for money
- A developer area: four steps to a first payment, a sandbox, an API lab, maintained libraries and an AI integration kit
- An onboarding page listing the documents needed for 11 kinds of organisation, from a sole proprietorship to a government agency
- A pricing page that explains how charges work and how money reaches the merchant

**How is it built?**

- The current site is a static build: the home page loads no external scripts and only two stylesheets
- The first response arrived in under half a second
- Served through Cloudflare with Brotli compression

**What do search engines see?**

- Structured data for the organisation and the website
- A sitemap referenced from robots.txt, and a canonical address on every page

Need a custom plugin or a payment integration? See [custom WordPress development](/wordpress-development/).
