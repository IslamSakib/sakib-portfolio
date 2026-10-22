---
order: 5
client: Open Alliance Learning
focus: WordPress LMS
clientUrl: https://openalliancelearning.com/
title: "A WordPress LMS with a dashboard for every role"
seoTitle: "WordPress LMS With Role Dashboards | Open Alliance Learning"
description: "WordPress LMS with separate dashboards for learners, teachers and assessors. See how it works."
summary: "A WordPress LMS and website with separate dashboards for learners, teachers and quality assessors."
result: Three role dashboards
chip: "WordPress LMS"
relevant: "Relevant if you run courses or memberships on WordPress."
role: Full-stack WordPress developer
period: 2026
stack: [WordPress, LearnDash, WooCommerce, Custom dashboards]
metricValue: "3"
metricLabel: dashboards, one each for learners, teachers and IQA
faq:
  - q: "What is a WordPress LMS?"
    a: "A WordPress LMS is a learning management system built on WordPress: courses, lessons, quizzes, progress tracking and certificates, usually through a plugin such as LearnDash. Open Alliance Learning runs on LearnDash, with WooCommerce for enrolment and payment."
  - q: "Can a WordPress LMS have different dashboards for different users?"
    a: "Yes. Open Alliance Learning has three: one for learners, one for teachers and one for the people who check assessment quality. Each role signs in and sees only what it needs."
  - q: "Can you sell courses with WooCommerce and LearnDash together?"
    a: "Yes. WooCommerce takes the payment and LearnDash grants access to the course, so a learner pays and starts in one step."
---

## What did Open Alliance Learning need?

Open Alliance Learning needed a new website and a learning management system in one place. Three groups use it for different reasons: learners, teachers, and IQA, the people who check the quality of assessment.

## What did I build?

- The new Open Alliance Learning website
- The LMS, configured on LearnDash
- A separate dashboard for learners, for teachers and for IQA
- Course sales through WooCommerce

## What shaped the design?

When one system serves several roles, the first design question is who is looking, not what the feature is. Each group sees only what it needs.

## How is the WordPress LMS put together?

- LearnDash runs the courses, lessons and progress
- WooCommerce handles enrolment and payment, so buying a course and getting access is one step
- Each role signs in to its own dashboard: a learner sees courses and progress, a teacher sees learners and marking, an assessor sees what needs quality checking

If you're planning a course site, the same split works for you: decide who signs in first, then build each person's screen.

## What does the site look like today?

I read the live site page by page on 11 October 2026.

**How big is it?** 21 pages in the sitemap, including 4 courses on sale.

**What do the pages do?**

- A course catalogue in four groups: health care sector, CPD, education and training, and IT and digital skills
- A courses page with a filter, so a learner can narrow the list
- Login and registration for learners
- An about page covering who the provider is, how learning works and accreditation
- Terms of sale and a refund policy, which a site that takes payment needs

**How is it built?**

- WordPress with Elementor, on the Hello Elementor base theme
- LearnDash for courses and WooCommerce for enrolment and payment
- Pages served from a LiteSpeed cache with Brotli compression
- A content security policy in place

Need a WordPress LMS? See [custom WordPress development](/wordpress-development/).
