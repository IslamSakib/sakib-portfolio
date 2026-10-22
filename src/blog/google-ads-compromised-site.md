---
title: "Compromised site Google Ads disapproval: what it means and how to get your ads back"
seoTitle: "Compromised Site Google Ads Disapproval: How to Fix"
description: "Compromised site Google Ads disapproval: what triggers it, how to clean your site and appeal. Fix it."
focus: compromised site Google Ads
date: "2026-10-16"
art: ads
topic: Fixes and maintenance
service: wordpress-malware-removal
imageAlt: "A Google Ads disapproval reading Compromised Site next to the three steps that clear it: clean, check Safe Browsing, appeal"
stats:
  - { value: "72 hours", label: "Google says to allow for a recrawl after you clean the site and resubmit", source: "Google Ads Help: Compromised sites", url: "https://support.google.com/adspolicy/answer/15938376?hl=en" }
  - { value: "7 days", label: "of warning Google says you get before any account suspension for this policy", source: "Google Ads Help: Compromised sites", url: "https://support.google.com/adspolicy/answer/15938376?hl=en" }
sources:
  - { name: "Google Ads Help: Compromised sites", url: "https://support.google.com/adspolicy/answer/15938376?hl=en" }
faq:
  - { q: "What does Compromised Site mean in Google Ads?", a: "It means Google found that your landing page's code has been changed to benefit someone else without you knowing: hidden scripts, redirects, pop-ups, malware, or software with known, exploited security holes. The ads pointing at that page are disapproved until it is cleaned." }
  - { q: "Will my Google Ads account be suspended?", a: "Google says violations of this policy do not cause an immediate suspension, and that you get a warning at least 7 days before any suspension. That is not a reason to wait. Ads stay off until the site is clean and the appeal passes." }
  - { q: "How long does the appeal take?", a: "After you clean the site and resubmit, Google says to allow up to 72 hours for the landing page to be recrawled and re-evaluated. Appeals filed before the problem is fixed tend to fail, and repeating them does not help." }
  - { q: "My scanner says the site is clean. Why was my appeal rejected?", a: "A scanner only finds what it recognises. Pirated plugins, injected code that loads from another server and a way back in that was never closed can all survive a scan. Check what loads from outside your site, and look at nulled themes and plugins first." }
  - { q: "Can I just point the ad at a different page?", a: "Yes. Google's own advice is that if you cannot fix the destination, you can update the ad with a compliant one. Editing the ad sends it for review again. It does not fix the compromised site." }
---

A compromised site Google Ads disapproval means Google found something on your landing page that you didn't put there: a hidden script, a redirect, or software with a known security hole. Your ads stop running until the page is clean and the disapproval is appealed. This guide shows how to find what Google is reacting to, clean it, and appeal in the right order. I wrote it after a SaaS client's ads were flagged and their first appeal failed.

## What "compromised site" actually means

Google's policy describes it as a site whose code has been manipulated to benefit a third party without the owner's knowledge. Its own examples are scripts that collect user data without consent (such as card skimmers), malware, pop-up ads, redirects to other sites, and running a content management system with known, exploited security vulnerabilities ([Google Ads Help](https://support.google.com/adspolicy/answer/15938376?hl=en)).

Notice the last one. You can be flagged for **running vulnerable software**, not only for being visibly hacked. An out-of-date plugin is enough to put a campaign on hold.

## Step 1: Find out which ads and which domain

In Google Ads, open **Ads** under Campaigns and filter by **Policy details: Compromised site**. Open the disapproval reason: it can show which outside domains your page loads content from. That domain is your biggest clue, because the fix is usually to find and remove the code that calls it.

## Step 2: Check what Google already knows

Before you touch anything, look at two free tools:

- **Search Console's Security issues report:** it lists hacked content and malware Google has found on your site.
- **Google's Safe Browsing Site Status checker:** it shows whether your domain is currently on the unsafe list.

If both say clean and your ads are still flagged, the problem is probably something Google sees when it crawls your ad's landing page, such as a script loaded from another server. In the case I worked on, both tools showed the site as clean while the ads stayed disapproved.

## Step 3: Clean the site, not just the scan

A scanner removes what it recognises. A real cleanup also finds how the problem got in. Work through these in order:

1. **Take a full backup first**, files and database, so nothing is lost.
2. **Look for pirated ("nulled") plugins and themes.** They are the most common way malware arrives on a WordPress site, and they often hide code that calls an outside server. If you find one, replace it with a licensed copy from the real vendor.
3. **Update WordPress, the theme and every plugin.** Google's policy names known, exploited vulnerabilities as a trigger.
4. **Remove plugins you don't use**, especially file managers, which attackers target.
5. **Check for admin users you didn't create**, and change every password.
6. **Search for code that loads from outside your site:** unfamiliar script addresses, base64-encoded strings and files in your uploads folder that shouldn't be there.
7. **Rotate your WordPress security keys** so every old login session stops working.

My guides on [how to check whether your WordPress site is hacked](/blog/how-to-check-if-wordpress-site-is-hacked/) and [how to fix a hacked WordPress site](/blog/fix-hacked-wordpress-site/) go through these in detail.

## Step 4: Appeal once, after the fix

Appeal after the site is clean, not before. In Google Ads, hover over the disapproved ad's status, click **Appeal**, choose **Made changes to comply with policy**, select the ads and submit. Then track it in Policy Manager.

Google says to allow up to 72 hours for the page to be recrawled. Appealing again and again while the problem is still there doesn't speed anything up.

## If your appeal fails

A failed appeal almost always means something is still on the page, or Google's check ran before you finished cleaning. Do these in order:

1. Wait out the 72 hours, then look at what loads on the landing page again.
2. Re-check pirated plugins and anything loading from another server. A scanner can miss these.
3. Appeal once more with a clear, honest description of what you changed.
4. Meanwhile, you can point the ads at a different, clean page. Editing the ad restarts its review.
5. If ads stay disapproved after the Safe Browsing status is clear, contact Google Ads support.

## How to stop it happening again

- **Never install pirated plugins or themes.** The saving is not worth an ad account on hold.
- **Keep everything updated, with a test first.** Updates close the holes Google's policy names.
- **Keep backups off your server** so you can undo damage quickly.
- **Turn on Search Console email alerts** so you hear about security issues early.
- **Get the site watched.** A [care plan](/wordpress-care-plans/) checks updates, backups and security every month.

## Want it cleaned properly?

If your ads are stuck, I can clean the site, find how it got in and close it. That's what my [WordPress malware removal](/wordpress-malware-removal/) service does, from $199, with a written quote after a free first look. [Send me your site](/contact/) and you'll hear back within 24 hours.
