---
title: "API integration explained: how your tools talk to each other"
seoTitle: "API Integration Explained for Business Owners"
description: "API integration explained in plain words: how your site, CRM and payments share data, and where it fails."
focus: API integration
date: "2026-10-23"
topic: Builds
service: web-application-development
art: checklist
imageAlt: "API integration: a website sending orders to a payment service, a CRM and a courier"
faq:
  - { q: "What is an API integration?", a: "An API integration connects two systems so they share data automatically, for example an order on your site creating a record in your CRM." }
  - { q: "How much does API integration cost?", a: "It is quoted per integration after I read the documentation of the services involved. Extra developer time on an existing project is $25 an hour." }
  - { q: "What happens when the other service is down?", a: "A well built integration retries safely, logs the failure and never charges or sends twice." }
  - { q: "Can you build an API for my own product?", a: "Yes. I build the API as part of a web application so a mobile app or a partner can use it." }
---

API integration connects two systems so they share data on their own. An order on your website creates a customer in your CRM, a payment confirms the order, and a delivery request goes to the courier. Nobody copies anything by hand.

## What an integration actually does

1. **Sends data** from one system to another when something happens.
2. **Receives data** back, such as a payment result.
3. **Handles failure.** The other service is slow, rejects a request or is down.

The third part is where most of the work is.

## Where integrations break

- A timeout leaves an order half created.
- A retry charges a customer twice.
- A changed field name on the other side breaks silently.
- Nobody sees the failure until a customer reports it.

Good integrations log every request, retry safely and make failures visible.

## Typical integrations

| Need | Example |
|---|---|
| Payments | A checkout connected to a gateway. I wrote the gateway plugin for Moneybag. |
| Email and forms | Enquiries sent to the inbox or CRM with a confirmation. |
| Delivery | Orders handed to a courier service. |
| Your own API | A clean API so an app or partner can build on your product. |

Integrations are quoted per job, and extra developer time is $25 an hour in US dollars. See [API integration services](/web-application-development/api-integration/) to send a brief.
