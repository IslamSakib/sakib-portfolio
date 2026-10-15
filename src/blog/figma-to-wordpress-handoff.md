---
title: "Figma to WordPress: how to hand off designs that build cleanly"
seoTitle: "Figma to WordPress: How to Hand Off Designs Cleanly"
description: "Figma to WordPress, done well: how to prepare the Figma file, decide the editing approach and plan the build so the live site matches the design."
focus: Figma to WordPress
date: "2026-10-15"
art: figma
topic: For agencies
service: white-label-wordpress-development
imageAlt: "A Figma design frame with the hero selected turning into the live Tabby website, beside the title Figma to WordPress"
stats:
  - { value: "590", label: "US searches a month for \"Figma to WordPress\"", source: "Semrush Keyword Overview, US, Oct 2026" }
  - { value: "39.7%", label: "of all websites run WordPress", source: "W3Techs, 15 Oct 2026", url: "https://w3techs.com/technologies/details/cm-wordpress" }
  - { value: "58.5%", label: "of websites with a known CMS use WordPress", source: "W3Techs, 15 Oct 2026", url: "https://w3techs.com/technologies/details/cm-wordpress" }
sources:
  - { name: "W3Techs, 15 Oct 2026", url: "https://w3techs.com/technologies/details/cm-wordpress" }
faq:
  - { q: "How do you convert a Figma design to WordPress?", a: "A developer builds the design as a custom theme or as blocks and templates, using the Figma components, colour and text styles as the theme's building blocks, then adds the content and tests it on desktop and mobile before launch." }
  - { q: "Can Figma export directly to WordPress?", a: "Plugins exist that try, but the code they produce is usually heavy and hard to edit. For a site that loads fast and that a client can maintain, the design is built by a developer as a proper theme or block set." }
  - { q: "What should a Figma file include for WordPress development?", a: "Desktop and mobile frames for every template, components with variants, colour and text styles, hover and error states, real or realistic content, and exported assets such as SVG logos and full-size images." }
  - { q: "How long does a Figma to WordPress build take?", a: "It depends on the number of templates, not pages. A site with five to seven templates and standard integrations usually takes a few weeks including review; complex features or a store take longer." }
  - { q: "Elementor or a custom theme for a Figma design?", a: "A custom theme gives the best speed and the cleanest editing for most sites. Elementor suits clients who need to change layouts themselves often. Decide before the build starts, because it changes how the design is built." }
---

Plugins that convert Figma to WordPress automatically are getting better, but for a real client site most teams still build by hand, because the result has to be fast, editable and match the design at every screen size. The quality of a Figma to WordPress build is decided before the developer writes a line: in how the file is prepared and what is agreed up front. Here is how to hand off designs that build cleanly.

## Prepare the Figma file

- **Use components and styles.** Colours, type styles and repeated elements (buttons, cards, headers) as components tell the developer what is reusable. It also keeps the build consistent.
- **Design at least two widths.** Desktop and mobile frames for every template. Without a mobile design, the developer has to invent one.
- **Draw the states.** Hover, focus, error, empty and loading states. These are the screens most often left out and most often guessed.
- **Use real content.** Real headlines and real image ratios reveal layout problems that placeholder text hides.
- **Name layers and pages clearly.** "Home, desktop" and "Home, mobile" beat "Frame 247".

## Agree how the site will be edited

Decide this before the build, because it changes how everything is built:

- **The block editor** with custom blocks: fast, future-proof and close to the design
- **ACF fields** on fixed templates: very hard for editors to break, but less flexible
- **A page builder** such as Elementor: most flexible for editors, but heavier and slower if not built carefully

There is no single right answer. It depends on who edits the site and how often.

## Count templates, not pages

A 30-page site might only have five unique templates. Developers estimate by unique templates and custom features (forms, calculators, filters, integrations), not by page count. List both, and the quote becomes far more accurate.

## Hand over the assets properly

Export images at the sizes they are used, provide SVG icons, and confirm font licences cover web use. Licensing problems found at launch are expensive.

## Plan the review

Agree how feedback is collected (one list per round works better than messages scattered across channels), how many rounds are included, and where the work is reviewed: a staging site you can open on your phone.

## Design responsive states, not just desktop

The most common gap in a Figma file is mobile. If only the desktop frames exist, the developer has to guess how every section collapses, and guesses rarely match what the designer imagined. Design at least two widths, desktop and mobile, for every template. A tablet frame helps for complex layouts such as pricing tables or multi-column grids.

Also design the states people forget: hover and focus styles for buttons and links, form errors and success messages, empty states (a blog category with no posts), and what a long title does to a card layout.

## Use components and styles the developer can reuse

Figma components map directly to WordPress blocks or theme parts. If the same card appears on six pages, make it one component with variants rather than six slightly different copies. Set up colour, text and spacing styles in Figma, and use them consistently. The developer turns those into theme settings, and every later page is faster to build and easier for your client to edit.

When two elements look nearly the same but differ by a few pixels, the developer has to decide whether that was deliberate. Decide it in the design instead.

## Content that matches reality

Placeholder text hides problems. Design with real headings, real product names and realistic lengths. A heading that fits on one line in the design but runs to three with the client's real copy will break the layout after launch. If final copy is not ready, use copy of a similar length.

## What the WordPress build needs from you

Before the build starts, the developer should have:

- The Figma file with view and Dev Mode access
- Fonts and their licences for web use
- Final logos as SVG and images at full resolution
- A page list and which template each page uses
- How the client will edit the site: blocks, a page builder or fixed templates
- Any integrations: forms, CRM, newsletter, analytics, booking or payments
- Hosting access or where the staging site should live

Missing any of these is the main reason builds stall halfway. For the agency side of the relationship, see [how to choose a white label WordPress partner](/blog/choosing-a-white-label-wordpress-partner/).

## What this looks like on a real project

Tabby and TubeOnAI both started as Figma files. Tabby needed far more than pages: a tax calculator, subscriptions, a help centre and analytics, built to launch on a tight deadline, and it launched with Core Web Vitals above 90. [The Tabby case study](/work/tabby/) shows how.

If your agency has designs waiting to be built, I take them from Figma to WordPress under your name: [see how white label work runs](/white-label-wordpress-development/).
