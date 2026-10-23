---
title: "Payment gateway integration: how it works and where it fails"
seoTitle: "Payment Gateway Integration: How It Works and Fails"
description: "Payment gateway integration explained: the flow from checkout to confirmation and what can fail."
focus: payment gateway integration
date: "2026-10-24"
topic: Builds
service: web-application-development
art: checkout
imageAlt: "Payment gateway integration: checkout, gateway, webhook and order confirmation, with the points where a payment can fail"
sources:
  - { name: "Stripe documentation, idempotent requests", url: "https://docs.stripe.com/api/idempotent_requests" }
  - { name: "Stripe documentation, webhooks", url: "https://docs.stripe.com/webhooks" }
faq:
  - { q: "What is payment gateway integration?", a: "It connects your checkout to a payment gateway so a customer can pay and your system learns the result. The checkout sends the payment request, the gateway takes the payment, and your server confirms the result before it marks the order as paid." }
  - { q: "How long does a payment gateway integration take?", a: "A standard gateway with good documentation takes days to a couple of weeks including testing. A gateway with no ready plugin, or one that needs custom onboarding, takes longer. The quote lists the timeline." }
  - { q: "What is a webhook and why does it matter?", a: "A webhook is a message the gateway sends to your server when a payment changes state. Relying on it, instead of only on the customer's browser returning to your site, is what keeps orders correct when the customer closes the tab." }
  - { q: "How much does payment gateway integration cost?", a: "It is quoted per job after I read the gateway's documentation. Extra developer time on an existing project is $25 an hour, and a first version of a web application starts at $999. Prices are in US dollars." }
  - { q: "Can you build a payment gateway plugin when none exists?", a: "Yes. I wrote the WordPress and WooCommerce payment gateway plugin for Moneybag, with OTP sign-in and a merchant onboarding flow around it." }
---

Payment gateway integration connects your checkout to a service that takes the payment and tells you the result. The happy path is short. Almost all the work is in what happens when a step fails, because a payment is the one place where a bug costs real money.

## How a payment flows

1. **The customer checks out.** Your site creates an order with status "pending" and sends the amount and order reference to the gateway.
2. **The gateway takes the payment.** The customer enters their details on the gateway's page or fields, never on your server. That keeps card data out of your system.
3. **The customer returns to your site.** The browser lands on a success or failure page.
4. **The gateway tells your server.** It sends a webhook, a message from its server to yours, with the final result.
5. **Your server confirms and updates the order.** Only now is the order marked paid, stock reduced and the confirmation email sent.

The browser return in step 3 is for the customer. The webhook in step 4 is the source of truth.

## Where payments fail

| Failure | What goes wrong | The fix |
|---|---|---|
| Customer closes the tab after paying | Paid, but the order stays pending | Trust the webhook, not the browser return |
| The webhook arrives twice | The order is processed twice | Handle each event once, using its unique id |
| A request times out and is retried | The customer is charged twice | Send an idempotency key, so a repeat is recognised ([Stripe explains the idea](https://docs.stripe.com/api/idempotent_requests)) |
| Someone fakes a webhook | An order is marked paid that was not | Verify the signature of every webhook ([how Stripe signs them](https://docs.stripe.com/webhooks)) |
| The amount differs from the order | Underpayment goes unnoticed | Compare the paid amount with the order total before confirming |
| The gateway is down | Customers cannot pay | Show a clear message, keep the cart and log the failure |

## What to test before launch

- A successful payment, a declined card and a cancelled payment.
- The customer closing the tab at each step.
- The same webhook sent twice.
- A refund, and a payment that completes after a delay.
- The gateway's test mode with the live keys kept out of the code.

## Plugin or custom code?

For a gateway with a maintained plugin for your platform, use the plugin and spend the effort on testing. When no plugin exists, or the rules are your own, the logic belongs in code written for it. For Moneybag, a licensed payment gateway, I wrote the WooCommerce gateway plugin with OTP sign-in and a merchant onboarding flow around it. Merchant onboarding time fell by 60%, and the case study has the details: [the Moneybag case study](/work/moneybag/).

Checkout failing right now? Start with [WooCommerce checkout not working](/blog/woocommerce-checkout-not-working/). To connect a gateway to a custom site or app, see [API integration services](/web-application-development/api-integration/) and send the brief.
