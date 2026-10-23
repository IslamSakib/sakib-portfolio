# Saved for later: site-wide design and responsiveness pass (asked 23 Oct 2026, usage limit reached)

Run, in this order, on the WHOLE site (not only /for/ pages):
1. /design-taste-frontend
2. /audit-responsiveness (audit, layout and vitals scripts; preview on port 4400)
Then commit, push, deploy over SSH (see memory deploy-and-browser-rules), verify-live 0 problems, check in the built-in browser.

Owner's complaints (screenshots, 23 Oct):
- The same plain dark card (icon tile, number, title, grey text) is used for almost every section on every page (.kit cards in HubPage, IcpPage, services, /for/). It looks repetitive and like spam. Vary the layouts: lists with dividers instead of boxes, split text and image rows, a numbered process strip, a comparison table, large pull quotes, a bento with mixed sizes. Use cards only where they show real hierarchy.
- The uneven last row of cards (7 cards, 4 cards, 8 cards in a 3-column grid) leaves empty space. Make counts fit or span cells.
- Card text, tags and lists in the service cards read as cramped and low contrast (grey on near-black).
- Both mega menus (Services, Who I help) show the same Mayabee picture in the right panel. Use a different image for each, or drop the image from one. Menu text is hard to read: low-contrast grey and small, hover state dims the feature card title.
- /for/ cards: short descriptions of different lengths make the grid look uneven.
Constraints: keep brand (violet-black theme), no stock photos, no entrance animations, no em dashes, solo developer voice, prices only from src/prices.js.
