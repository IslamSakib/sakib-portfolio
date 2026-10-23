// Runs INSIDE the page (page.evaluate). Returns [{level, kind, where, msg}] for the current viewport.
// kinds: text-heavy, card-repeat, card-width, grid-collapse, text-orphan, text-stack, text-blank, section-padding, section-gap, graphic-broken, graphic-clipped
() => {
  const out = [];
  const vw = innerWidth;
  const vis = (e) => { const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && cs.display !== 'none'; };
  const name = (e) => {
    const t = e.tagName.toLowerCase(); const id = e.id ? '#' + e.id : ''; const c = (e.className && e.className.toString().trim().split(/\s+/)[0]) || '';
    const txt = (e.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 36);
    return t + id + (c ? '.' + c.slice(0, 24) : '') + (txt ? ` "${txt}"` : '');
  };
  const add = (level, kind, e, msg) => out.push({ level, kind, where: name(e), msg });

  // ---------- 1. cards: equal width when stacked, grids that never collapsed ----------
  const isCard = (c) => {
    const cs = getComputedStyle(c), r = c.getBoundingClientRect();
    return (parseFloat(cs.borderTopLeftRadius) || 0) >= 12 && r.width > 120 && r.height > 80 &&
      (cs.backgroundColor !== 'rgba(0, 0, 0, 0)' || cs.borderTopWidth !== '0px' || cs.boxShadow !== 'none');
  };
  document.querySelectorAll('body *').forEach((p) => {
    if (!vis(p)) return;
    const cs = getComputedStyle(p);
    if (cs.display === 'grid') {
      const tracks = cs.gridTemplateColumns.split(' ');
      const dead = tracks.filter((t) => parseFloat(t) < 4).length;
      if (vw < 900 && tracks.length >= 4 && dead >= tracks.length - 2) add('FAIL', 'grid-collapse', p, `${tracks.length}-column grid did not collapse at ${vw}px (${dead} tracks are ~0px), spanning cards will differ in width`);
    }
    const kids = [...p.children].filter((c) => vis(c) && isCard(c));
    if (kids.length < 2) return;
    const byLeft = {};
    kids.forEach((k) => { const r = k.getBoundingClientRect(); (byLeft[Math.round(r.left / 4)] ||= []).push(Math.round(r.width)); });
    Object.values(byLeft).forEach((ws) => { if (ws.length >= 2 && Math.max(...ws) - Math.min(...ws) > 2) add('FAIL', 'card-width', p, `stacked cards have different widths: ${ws.join(', ')} px`); });
    // cards in the same row should share a height class (within 8px) unless the grid is a deliberate bento
    if (vw < 700) {
      const tops = {};
      kids.forEach((k) => { const r = k.getBoundingClientRect(); (tops[Math.round(r.top / 8)] ||= []).push(k); });
      Object.values(tops).forEach((row) => { if (row.length >= 2) { const hs = row.map((k) => Math.round(k.getBoundingClientRect().height)); if (Math.max(...hs) - Math.min(...hs) > 40) add('WARN', 'card-width', p, `side-by-side cards have uneven heights: ${hs.join(', ')} px`); } });
    }
  });

  // ---------- 2. text: odd line breaks and blank space ----------
  const lines = (el) => {
    const rg = document.createRange(); const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    const rows = []; let n;
    while ((n = walker.nextNode())) {
      if (!n.textContent.trim()) continue;
      const words = [...n.textContent.matchAll(/\S+/g)];
      words.forEach((m) => { rg.setStart(n, m.index); rg.setEnd(n, m.index + m[0].length); const rc = rg.getClientRects()[0]; if (!rc || !rc.width) return;
        const row = rows.find((r) => Math.abs(r.top - rc.top) < rc.height * 0.5);
        if (row) { row.words++; row.right = Math.max(row.right, rc.right); row.left = Math.min(row.left, rc.left); } else rows.push({ top: rc.top, words: 1, left: rc.left, right: rc.right }); });
    }
    return rows.sort((a, b) => a.top - b.top);
  };
  document.querySelectorAll('h1,h2,h3,h4,p,li,td,th,summary,figcaption').forEach((el) => {
    if (!vis(el) || el.closest('nav,footer,[aria-hidden=true],svg,[role=tablist]')) return;
    const cs = getComputedStyle(el); if (cs.position === 'fixed') return;
    const txt = el.textContent.trim().replace(/\s+/g, ' '); const wc = txt.split(' ').length;
    if (wc < 3) return;
    const rows = lines(el); if (!rows.length) return;
    const isHead = /^H[1-4]$/.test(el.tagName); const cell = /^(TD|TH)$/.test(el.tagName);
    // stacked single words: 3+ one-word lines in one block ("Leave / requests / and / balances")
    const singles = rows.filter((r) => r.words === 1).length;
    if (rows.length >= 3 && singles >= 3 && singles >= rows.length - 1) add('WARN', 'text-stack', el, `${rows.length} lines, ${singles} of them a single word: column is too narrow for this text`);
    // cramped title: multi-line heading whose line-height is too tight (lines touch) or whose last line is a ragged stub
    if (isHead && rows.length >= 2) {
      const fs = parseFloat(cs.fontSize) || 16; const lh = cs.lineHeight === 'normal' ? 1.2 : parseFloat(cs.lineHeight) / fs;
      if (lh < 1.12 && fs < 40) add('WARN', 'title-leading', el, `line-height ${lh.toFixed(2)} on a ${rows.length}-line ${Math.round(fs)}px title: lines crowd each other (use 1.15 to 1.25)`);
      else if (lh < 1.02) add('WARN', 'title-leading', el, `line-height ${lh.toFixed(2)}: lines of the title touch`);
      const widest = Math.max(...rows.map((r) => r.right - r.left)), last = rows[rows.length - 1];
      const lastW = last.right - last.left;
      const lastWords = txt.split(' '); const endsOn = (rows.length >= 2) ? null : null;
      if (rows.length >= 3 && lastW < widest * 0.36) add('WARN', 'title-ragged', el, `last line is only ${Math.round((lastW / widest) * 100)}% as wide as the longest; the title ends in a stub`);
    }
    // orphan: last line is one short word after 2+ lines (not for table cells)
    if (!cell && rows.length >= 2 && rows[rows.length - 1].words === 1 && wc >= 4) {
      const last = rows[rows.length - 1], prev = rows[rows.length - 2];
      if (last.right - last.left < (prev.right - prev.left) * 0.3) add(isHead ? 'WARN' : 'INFO', 'text-orphan', el, `last line is a single word ("${txt.split(' ').pop()}")`);
    }
    // blank space: text is left/centre aligned inside a wider container but stops far short of it
    const par = el.parentElement; if (!par) return;
    const pr = par.getBoundingClientRect(), pcs = getComputedStyle(par);
    const inner = pr.width - (parseFloat(pcs.paddingLeft) || 0) - (parseFloat(pcs.paddingRight) || 0);
    const er = el.getBoundingClientRect(); const widest = Math.max(...rows.map((r) => r.right - r.left));
    const align = cs.textAlign;
    if (/^(P|H[1-4])$/.test(el.tagName) && rows.length >= 2 && inner > 240 && er.width < inner * 0.72 && widest < inner * 0.72 && (align === 'start' || align === 'left') && cs.display !== 'inline-block' && cs.float === 'none' && pcs.display !== 'flex' && pcs.display !== 'grid') {
      add(isHead || cs.fontSize ? 'WARN' : 'INFO', 'text-blank', el, `text fills only ${Math.round((widest / inner) * 100)}% of its ${Math.round(inner)}px container (max-width or narrow column leaves blank space)`);
    }
    if (isHead && rows.length >= 3 && align === 'center' && widest < inner * 0.6 && inner > 300) add('WARN', 'text-blank', el, `centred heading uses ${Math.round((widest / inner) * 100)}% of the width; side gutters look empty`);
  });

  // ---------- 3. section padding and dead space ----------
  const secs = [...document.querySelectorAll('main > section, body > section, main > div > section, section')].filter((s, i, a) => vis(s) && !s.parentElement.closest('section') && a.indexOf(s) === i);
  const pads = secs.map((s) => { const cs = getComputedStyle(s); return { s, t: parseFloat(cs.paddingTop) || 0, b: parseFloat(cs.paddingBottom) || 0, r: s.getBoundingClientRect() }; });
  const med = (a) => { const x = a.filter((v) => v > 0).sort((p, q) => p - q); return x.length ? x[Math.floor(x.length / 2)] : 0; };
  const mt = med(pads.slice(1).map((p) => p.t)), mb = med(pads.slice(1).map((p) => p.b));
  pads.forEach((p, i) => {
    if (i === 0 || i === pads.length - 1 || p.r.height < 200) return;
    if (mt && p.t > 0 && Math.abs(p.t - mt) > 24) add('WARN', 'section-padding', p.s, `top padding ${Math.round(p.t)}px, page norm ${Math.round(mt)}px`);
    if (mb && p.b > 0 && Math.abs(p.b - mb) > 24) add('WARN', 'section-padding', p.s, `bottom padding ${Math.round(p.b)}px, page norm ${Math.round(mb)}px`);
    // dead space: empty band below the last visible child
    const kids = [...p.s.children].filter(vis); if (!kids.length) return;
    const bottom = Math.max(...kids.map((k) => k.getBoundingClientRect().bottom));
    const dead = p.r.bottom - bottom - p.b; if (dead > 48) add('WARN', 'section-gap', p.s, `${Math.round(dead)}px of empty space under the last content`);
    const prev = pads[i - 1]; const gap = p.r.top - prev.r.bottom;
    if (gap > 24 && vw < 900) add('WARN', 'section-gap', p.s, `${Math.round(gap)}px gap between this section and the one above`);
  });

  // ---------- 4. broken graphics ----------
  document.querySelectorAll('img').forEach((im) => {
    if (!vis(im) && !(im.complete && !im.naturalWidth && im.currentSrc)) return;
    if (im.complete && im.naturalWidth === 0 && (im.currentSrc || im.src)) add('FAIL', 'graphic-broken', im, `image failed to load: ${(im.currentSrc || im.src).slice(-60)}`);
    else if (vis(im) && im.getBoundingClientRect().height < 8 && im.getBoundingClientRect().width > 40) add('WARN', 'graphic-broken', im, 'image is rendered almost flat (height under 8px)');
  });
  document.querySelectorAll('svg').forEach((sv) => { if (sv.closest('button,a,[aria-hidden=true]') || !vis(sv)) return; const r = sv.getBoundingClientRect(); if (r.width > 60 && r.height < 6) add('WARN', 'graphic-broken', sv, 'svg is squashed flat'); });
  // clipped mock-ups / screenshots: an overflow:hidden box whose graphic content is cut off
  document.querySelectorAll('body *').forEach((b) => {
    if (!vis(b)) return; const cs = getComputedStyle(b);
    if (!(cs.overflowX === 'hidden' || cs.overflowX === 'clip' || cs.overflowY === 'hidden' || cs.overflowY === 'clip')) return;
    if (!b.querySelector('img,svg,canvas,video,[class*=mock],[class*=preview],[class*=frame]') && !/mock|preview|frame|demo|screenshot/i.test(b.className.toString())) return;
    const br = b.getBoundingClientRect(); let worst = 0, who = null;
    const scrolls = (c) => { for (let a = c.parentElement; a && a !== b; a = a.parentElement) { const o = getComputedStyle(a).overflowX; if (o === 'auto' || o === 'scroll') return true; } return false; };
    b.querySelectorAll('*').forEach((c) => { if (!vis(c) || c.closest('svg') && c.tagName !== 'svg' || scrolls(c)) return; const r = c.getBoundingClientRect(); const over = Math.max(r.right - br.right, br.left - r.left); if (over > worst && r.width > 40) { worst = over; who = c; } });
    if (worst > 24 && who) add('WARN', 'graphic-clipped', b, `graphic content runs ${Math.round(worst)}px past its box and is cut off (${name(who).slice(0, 40)})`);
  });
  // ---------- 5. squeezed text columns (a 2-column list that should have stacked) ----------
  if (vw < 700) {
    document.querySelectorAll('p,li,dd,figcaption,blockquote').forEach((el) => {
      if (!vis(el) || el.closest('table,nav,[aria-hidden=true],button,.tabs')) return;
      const txt = el.textContent.trim().replace(/\s+/g, ' '); const wc = txt.split(' ').length; const r = el.getBoundingClientRect();
      const rows = lines(el);
      if (wc >= 7 && r.width < 150 && rows.length >= 5) add('FAIL', 'text-narrow', el, `${wc} words squeezed into a ${Math.round(r.width)}px column over ${rows.length} lines: a multi-column layout did not stack on this screen`);
    });
  }

  // ---------- 6. stray borders: dividers above the first / below the last item, and lines that spill outside their card ----------
  document.querySelectorAll('li,div,tr,a,details,section,article').forEach((el) => {
    if (!vis(el) || el.closest('table,svg')) return; const cs = getComputedStyle(el), par = el.parentElement; if (!par) return;
    const r = el.getBoundingClientRect(); if (r.height < 20 || r.width < 60) return;
    const bt = parseFloat(cs.borderTopWidth) > 0 && cs.borderTopStyle !== 'none' && cs.borderTopColor !== 'rgba(0, 0, 0, 0)';
    const bb = parseFloat(cs.borderBottomWidth) > 0 && cs.borderBottomStyle !== 'none' && cs.borderBottomColor !== 'rgba(0, 0, 0, 0)';
    const bl = parseFloat(cs.borderLeftWidth) > 0, brt = parseFloat(cs.borderRightWidth) > 0;
    const sides = (bt ? 1 : 0) + (bb ? 1 : 0) + (bl ? 1 : 0) + (brt ? 1 : 0);
    const kids = [...par.children].filter(vis);
    const rounded = (parseFloat(getComputedStyle(par).borderTopLeftRadius) || 0) >= 10;
    // a divider drawn on only the top edge of the FIRST item, or only the bottom edge of the LAST item
    const gp = par.parentElement; const gpBox = gp && (parseFloat(getComputedStyle(gp).borderTopLeftRadius) || 0) >= 10;
    const nothingAbove = !par.previousElementSibling && gpBox && !gp.previousElementSibling === false || (!par.previousElementSibling && gpBox);
    if (sides === 1 && bt && kids[0] === el && kids.length > 1 && nothingAbove) add('WARN', 'stray-border', el, 'divider above the first item (nothing to separate it from)');
    if (sides === 1 && bb && kids[kids.length - 1] === el && kids.length > 1 && rounded) add('WARN', 'stray-border', el, 'divider below the last item, touching the card edge');
    // single-edge line that is wider/narrower than the card it sits in, or crosses the card's rounded corner
    if (sides === 1 && rounded && (bt || bb)) { const pr = par.getBoundingClientRect(); const edge = bt ? r.top - pr.top : pr.bottom - r.bottom; if (edge < 3 && (r.left - pr.left < 14 || pr.right - r.right < 14)) add('WARN', 'stray-border', el, 'line runs into the card\'s rounded corner'); }
  });

  // ---------- 7. graphics: parts poking out of their frame, and padding that swallows the graphic ----------
  document.querySelectorAll('div,span,a').forEach((el) => {
    if (!vis(el) || el.children.length > 0 && el.textContent.trim().length > 40) return;
    const cs = getComputedStyle(el); const par = el.parentElement; if (!par || cs.position === 'absolute' || cs.position === 'fixed') return;
    const pcs = getComputedStyle(par); const hasBox = (parseFloat(pcs.borderTopWidth) > 0 || pcs.backgroundColor !== 'rgba(0, 0, 0, 0)') && (parseFloat(pcs.borderTopLeftRadius) || 0) >= 6;
    if (!hasBox || /^(auto|scroll)$/.test(pcs.overflowX) || par.closest('svg,table')) return;
    const r = el.getBoundingClientRect(), pr = par.getBoundingClientRect(); if (r.width < 24 || pr.width < 120) return;
    const over = Math.max(r.right - pr.right, pr.left - r.left);
    if (over > 1.5 && r.width < pr.width) add('WARN', 'graphic-overflow', el, `sticks ${over.toFixed(1)}px outside its container box`);
  });
  // a tinted frame whose ONLY child is a boxed graphic (card, svg, img) with a lot of padding around it
  document.querySelectorAll('div').forEach((f) => {
    if (!vis(f) || f.children.length !== 1) return; const cs = getComputedStyle(f); const fr = f.getBoundingClientRect();
    if (cs.backgroundColor === 'rgba(0, 0, 0, 0)' || (parseFloat(cs.borderTopLeftRadius) || 0) < 10 || fr.width < 150 || fr.width > 700 || fr.height < 70) return;
    const k = f.children[0]; if (!vis(k)) return; const kcs = getComputedStyle(k);
    const boxed = /^(SVG|IMG|CANVAS|PICTURE)$/i.test(k.tagName) || (kcs.backgroundColor !== 'rgba(0, 0, 0, 0)' && kcs.backgroundColor !== cs.backgroundColor) || parseFloat(kcs.borderTopWidth) > 0;
    if (!boxed) return;
    const kr = k.getBoundingClientRect();
    const padL = kr.left - fr.left, padR = fr.right - kr.right, padT = kr.top - fr.top, padB = fr.bottom - kr.bottom;
    const side = Math.min(padL, padR), vert = Math.min(padT, padB);
    if (side > (vw < 700 ? 28 : 56) && fr.width < 560) add('WARN', 'graphic-padding', f, `${Math.round(side)}px of padding either side of the graphic inside this frame (${Math.round((kr.width / fr.width) * 100)}% of the width used); keep it to 12-16px on phones`);
    else if (vert > 36 && vert > side + 12) add('WARN', 'graphic-padding', f, `${Math.round(vert)}px of padding above and below the graphic inside this frame`);
  });
  // a single side is wider than the other: the graphic sits off-centre in its frame
  document.querySelectorAll('div').forEach((f) => {
    if (!vis(f) || f.children.length !== 1) return; const cs = getComputedStyle(f); const fr = f.getBoundingClientRect();
    if (cs.backgroundColor === 'rgba(0, 0, 0, 0)' || (parseFloat(cs.borderTopLeftRadius) || 0) < 10 || fr.width < 150) return;
    const k = f.children[0]; if (!vis(k) || !/^(SVG|IMG|DIV)$/i.test(k.tagName)) return; const kr = k.getBoundingClientRect();
    const padL = kr.left - fr.left, padR = fr.right - kr.right;
    if (Math.abs(padL - padR) > 20 && Math.max(padL, padR) > 30 && kr.width < fr.width * 0.85) add('WARN', 'graphic-padding', f, `graphic is off-centre in its frame (left ${Math.round(padL)}px, right ${Math.round(padR)}px)`);
  });
  // ---------- 8. artwork: parts of an SVG graphic that cross the edge of the card drawn inside it ----------
  document.querySelectorAll('svg[viewBox]').forEach((sv) => {
    if (!vis(sv) || sv.closest('button,a,[aria-hidden=true]')) return;
    const vb = sv.viewBox.baseVal; if (!vb || !vb.width || vb.width < 120) return;
    const els = [...sv.querySelectorAll('rect,text,circle,path,g')].filter((e) => !e.closest('defs,clipPath,mask,pattern') );
    const boxes = els.map((e) => { try { const b = e.getBBox(); return { e, x: b.x, y: b.y, w: b.width, h: b.height, tag: e.tagName }; } catch { return null; } }).filter((b) => b && b.w > 0 && b.h > 0);
    const cards = boxes.filter((b) => b.tag === 'rect' && b.w > 60 && b.h > 40 && b.w < vb.width * 0.98 && (b.e.getAttribute('stroke') || b.e.getAttribute('rx')) && b.e.getAttribute('fill') && b.e.getAttribute('fill') !== 'none');
    let n = 0;
    cards.forEach((c) => boxes.forEach((b) => {
      if (n > 3 || b === c || b.tag === 'g' || b.w >= c.w) return;
      const cx = b.x + b.w / 2, cy = b.y + b.h / 2; if (cx < c.x || cx > c.x + c.w || cy < c.y || cy > c.y + c.h) return;   // belongs to this card
      const spill = Math.max(b.x + b.w - (c.x + c.w), c.x - b.x, b.y + b.h - (c.y + c.h), c.y - b.y);
      if (spill > 0.4 && spill < 40) { n++; add('WARN', 'art-overflow', sv, `a ${b.tag}${b.e.textContent ? ' "' + b.e.textContent.trim().slice(0, 14) + '"' : ''} sticks ${spill.toFixed(1)} units outside the card drawn in this graphic`); }
    }));
  });
  // ---------- 9. visual weight: pages should lean on pictures and icons, not paragraphs, and not repeat one card ----------
  const words = (e) => (e.innerText || '').trim().split(/\s+/).filter(Boolean).length;
  const vsecs = [...document.querySelectorAll('main > section, main > div > section')].filter(vis);
  vsecs.forEach((s) => {
    const w = words(s); if (w < 110 || s.closest('.faq,.blog,article')) return;
    const media = s.querySelectorAll('img,picture,video,canvas,svg:not([aria-hidden=true]),.tile-ic,.mega-ti,figure').length;
    const heads = s.querySelectorAll('h2,h3').length;
    if (media === 0 && w / Math.max(1, heads) > 45) add('WARN', 'text-heavy', s, `${w} words and no picture, icon or graphic: add a visual, cut the copy, or turn paragraphs into short labels`);
  });
  // the same boxed card (border + fill + radius) used in 3 or more sections of one page
  const boxed = (li) => { const cs = getComputedStyle(li); return cs.borderTopWidth !== '0px' && cs.borderTopStyle !== 'none' && cs.backgroundColor !== 'rgba(0, 0, 0, 0)' && (parseFloat(cs.borderTopLeftRadius) || 0) >= 8; };
  let boxedSections = 0;
  vsecs.forEach((s) => { const lis = [...s.querySelectorAll('ul > li, ol > li')].filter((li) => vis(li) && li.getBoundingClientRect().width > 150); if (lis.length >= 3 && lis.filter(boxed).length >= 3 && !s.querySelector('.reel,.rv,.faq')) boxedSections++; });
  if (boxedSections >= 3) add('WARN', 'card-repeat', document.body, `${boxedSections} sections use the same boxed-card grid; vary the layout (open rows, icon tiles, split text and picture, one large feature)`);
  return out;
}
