# WooCommerce Checkout Works for You but Not for Customers: How to Find the Cause

*Draft for WP Swings (write-for-us). About 2,200 words. No statistics are quoted, so no sources are needed. Paste into a Google Doc with edit rights before submitting. One do-follow link in the body (marked), author box at the end.*

You place a test order and it goes through. Then a customer emails to say the checkout just spins, or the page says their session expired, or they were charged but the order shows "Pending payment." Nothing is wrong on your screen, so it is easy to dismiss it as one unlucky customer.

It is rarely one customer. A checkout that works for the store owner and fails for visitors is one of the most common WooCommerce faults, and it has a reason you can find. This guide shows why it happens, how to match a symptom to a cause, how to test without risking real money, and how to stop it coming back.

## Why it works for you and fails for them

You are not testing the same site your customers use. Three differences matter.

**You are logged in.** Most caching setups skip logged-in users. A visitor gets a cached copy of the page, and you get a fresh one. If the cached copy holds an old security token, an old cart or an old script, only visitors see the fault.

**You have a warm session.** You have probably visited the store many times. Your browser already has the cookies WooCommerce needs. A first-time visitor on a phone starts with nothing, and any problem with cookies or sessions shows up on their very first order.

**You use one payment method on one device.** A customer may pay with a card that triggers a bank check, a wallet that opens another app, or a local gateway that sends them off your site and back. Each of those paths has its own failure points that your test order never touched.

So the first rule is to test as a customer, not as yourself. Open a private window, log out, use a phone on mobile data, and place an order from scratch.

## Start with a symptom-to-cause table

Match what customers report to the most likely cause. Then check that cause first.

| What the customer sees | Most likely cause | Where to look first |
|---|---|---|
| Spinner after clicking Place order, nothing happens | A JavaScript error on the checkout page, or a blocked request | Browser console and Network tab |
| "Your session has expired" or an empty cart at checkout | Cached cart or checkout page, or cookies not being set | Cache plugin exclusions, cookie settings |
| Checkout page shows but fields do not update | A plugin or theme script conflict | Plugin conflict test |
| Card is charged but the order stays "Pending payment" | The gateway's confirmation (webhook) never reached your site | Gateway dashboard webhook log |
| One payment method fails, others work | That gateway's keys, mode or callback address | Gateway settings and logs |
| Order works on desktop but fails on mobile | A script or layout problem on small screens, or a slow response timing out | Test on a real phone, check response time |
| "There was an error processing your order" | A server error, often a PHP limit or a fatal error | WooCommerce logs and the PHP error log |

Do not change settings at random. Each row points to one place. Look there before touching anything else.

## Step 1: Reproduce it like a customer

You cannot fix what you cannot see. Set up a clean test.

1. Open a private browser window and make sure you are logged out.
2. Add a product to the cart and go to checkout.
3. Fill the form as a new customer would, with an address you have never used before on the site.
4. Try once on desktop and once on a phone with mobile data, not your office wifi.
5. Note exactly what happens and at what step.

If you can reproduce it, you are halfway there. If you cannot, ask the customer for three things: the device and browser, the payment method they chose, and the time it happened. The time matters, because it lets you find the matching line in your logs.

## Step 2: Read the browser console

A silent spinner almost always means a script failed. Right-click the checkout page, open Developer Tools, and go to the Console tab. Place the order and watch.

- A red error that names a plugin file points to a conflict or a broken script. Note the file name. It tells you which plugin is involved.
- Open the Network tab and look at the request sent when you click Place order. WooCommerce sends this to a checkout address. If the response is anything other than a normal result, click it and read the response. A response that begins with HTML instead of data usually means a warning or error was printed into the page, which breaks the checkout.
- A request that never completes points to a timeout, which is a server or gateway speed problem.

You do not need to understand every line. You only need the name of the file or the status code, because that is what you search the logs for next.

## Step 3: Rule out caching

Caching is the top cause of "works for me, not for them," because it treats you and a visitor differently.

Cart, checkout and account pages must never be cached. Most good cache plugins exclude them by default, but a second plugin, a host-level cache or a CDN rule can undo that. Check each layer:

- **Your cache plugin:** confirm the cart, checkout and my-account pages are excluded, along with the cookies WooCommerce uses to track a cart.
- **Your host's cache:** many hosts add server-side caching you do not see in the dashboard. Ask the host, or look in their panel, whether those pages are excluded.
- **Your CDN or firewall:** a rule that caches everything by path can serve a stale checkout page.

A quick test: add a random query string to the checkout address, for example `?test=1`. If the problem disappears, a cached copy was the cause.

If you run more than one caching layer, that alone can cause strange behaviour. Keep one cache plugin, and make sure the others are off or clearly separated.

## Step 4: Run a plugin and theme conflict test

If the console points to a plugin, or you suspect one, test on a staging copy, never on the live store.

1. Create a staging copy of the site.
2. Switch to a default theme such as Twenty Twenty-Four.
3. Deactivate every plugin except WooCommerce and your payment gateway.
4. Place a test order. If it works, the fault is in something you turned off.
5. Re-enable plugins in small groups, testing after each group, until the problem returns.

The plugin you enabled last is the culprit, or it conflicts with another one. Update it, check its support page for a known fix, or replace it. This is slow the first time but it is the most reliable way to find a conflict, and it never puts real customers at risk.

For the full symptom list and fixes for each case, see this [WooCommerce checkout not working guide](https://sakib.mywrkbase.com/blog/woocommerce-checkout-not-working/). *(do-follow link, placed here)*

## Step 5: Test payments safely with sandbox cards

Never test a payment gateway by buying something with your own real card on a live store. Use the gateway's test mode.

Almost every gateway offers a sandbox, with separate test keys and published test card numbers that always succeed or always fail. The steps are the same everywhere:

1. On staging, switch the gateway to test or sandbox mode and paste in the test keys, not the live ones.
2. Use the test card numbers the gateway publishes in its own documentation. Always take them from the gateway's documentation, since they differ between providers.
3. Test a successful payment, a declined card, and, if the gateway supports it, a card that asks for extra bank verification.
4. After each test, check the order status in WooCommerce and the transaction in the gateway dashboard. They should agree.

The failed and verification cases matter most. Many checkouts work for a plain successful card and break when the customer's bank asks for a second step, because the customer leaves your site and must come back correctly.

A common mistake is leaving a gateway in test mode after launch, or using live keys on staging. Check the mode on both sites every time you copy one to the other.

## Step 6: Paid but showing as unpaid (webhooks)

This one frightens store owners most: the customer was charged, but the order says "Pending payment" or "On hold."

Here is what normally happens. The customer pays on the gateway. The gateway then sends a message to your site, called a webhook or callback, saying "this order was paid." Your site marks the order paid and sends the confirmation email. If that message never arrives, the order never updates, even though the money moved.

Check these in order:

- **Gateway dashboard webhook log.** Most gateways show each message they sent and whether your site answered. A failed delivery here tells you the problem is on the way in.
- **The callback address.** It must match your live site address exactly, including `https`. After a move from staging or a change from `http` to `https`, the old address stays saved in the gateway and messages go to the wrong place.
- **A firewall or security plugin blocking the gateway.** These tools sometimes treat the gateway's server as a threat. Allow the gateway's requests, following the gateway's own documentation.
- **A redirect on the callback address.** If the address redirects, for example from `http` to `https` or to a version with a trailing slash, some gateways do not follow it and the message is lost.
- **A site that is slow or down at that moment.** If your site does not answer in time, the gateway may give up after a few tries.

Once the cause is fixed, ask the gateway to resend the missed messages if it allows that, or update the stuck orders by hand after confirming each payment in the gateway dashboard. Always confirm in the dashboard before marking an order paid.

## Step 7: Check the logs

When the screen gives no clue, the logs usually do.

- **WooCommerce logs:** go to WooCommerce, then Status, then Logs. Gateway plugins often write detailed lines here. Look for the time the customer gave you.
- **PHP error log:** your host provides this. A fatal error or a memory-limit message at the time of the failed order points to a server limit or a broken plugin.
- **Debug log:** you can turn on WordPress debug logging temporarily on staging, and switch it off afterwards. Never leave detailed logging on a live site.

Read the line closest to the failure time, find the file name or error, and search for it. Most causes now have a known answer.

## Step 8: Common server limits that break checkout

If errors only appear under load, or only for some orders, check server limits.

- **PHP memory limit too low.** A checkout runs many plugins at once. If memory runs out, the order fails halfway. Raise the limit with your host.
- **Execution time too short.** If a gateway or shipping lookup is slow, the page can be cut off before it finishes.
- **Slow shipping or tax lookups.** A checkout that waits on an outside service for a long time feels broken to customers. Check whether one plugin calls an outside service on every page load.
- **Outdated PHP version.** Some gateway plugins need a recent version. Check each plugin's requirements.

Changing these is a host-level task. If you are not sure, ask your host to confirm the values and show you the error log for the failed time.

## How to stop it coming back

Fixing it once is good. Making sure you hear about the next one before a customer does is better.

**Test the checkout after every change.** After any plugin, theme or WooCommerce update, place a test order as a customer. Do it on staging first when you can. A two-minute test after each update catches most breakage.

**Keep a short checkout checklist.** Write down the steps: guest checkout, logged-in checkout, one card payment, one declined card, one mobile order. Run the same list each time so nothing is skipped.

**Watch for failed orders.** Review orders marked failed or stuck in pending each week. A sudden rise means something broke. Many gateways can also email you about failed webhooks, so turn those alerts on.

**Keep cache exclusions documented.** Note which pages are excluded and where, in the plugin, at the host and at the CDN. When you change hosts or add a plugin, check the list again.

**Keep staging and live separate.** Different keys, different modes, different callback addresses. Mixing them is how test keys end up on live stores and live keys end up on staging.

**Back up before you change anything.** A recent backup turns a bad update into a short delay instead of a long outage.

## A short checklist to keep

1. Reproduce the fault logged out, on a phone, as a new customer.
2. Read the browser console and the failed request.
3. Rule out caching on every layer: plugin, host, CDN.
4. Run a plugin and theme conflict test on staging.
5. Test payments with the gateway's sandbox cards, including a decline and a bank check.
6. For paid-but-pending orders, check the gateway's webhook log and the callback address.
7. Read the WooCommerce and PHP logs at the failure time.
8. Check PHP memory, time limits and slow outside lookups.
9. Add a test order to your update routine.

## Final thoughts

A checkout that fails only for customers is frustrating because you cannot see it yourself. It stops being a mystery once you test as a customer and follow the symptom to its cause: a cached page, a script conflict, a missed webhook or a server limit. Work through the steps in order, change one thing at a time, and test on staging before touching the live store.

*About the author: Sakib Islam is a WordPress and WooCommerce developer based in Dhaka. He built the payment gateway plugin for Moneybag, a licensed payment gateway in Bangladesh, and fixes broken checkouts for stores worldwide. Portfolio: [sakib.mywrkbase.com](https://sakib.mywrkbase.com/)*
