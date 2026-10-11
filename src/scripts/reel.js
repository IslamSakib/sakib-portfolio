// Pick-one-of-many panels, used for Selected work and for the recommendations. A list of tabs and a stage of panels:
// hover, focus or click a tab to show its panel. Until the visitor touches it, each reel moves on by itself every few
// seconds (data-interval, default 5000 ms), but only while it is on screen and never under reduced motion.
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

document.querySelectorAll('[data-reel]').forEach((reel) => {
  const tabs = [...reel.querySelectorAll('[role=tab]')], panels = [...reel.querySelectorAll('[role=tabpanel]')];
  const every = Number(reel.dataset.interval) || 5000;
  let current = 0, timer = null, touched = false;
  reel.style.setProperty('--reel-time', every + 'ms');

  const show = (i) => {
    current = (i + tabs.length) % tabs.length;
    tabs.forEach((t, n) => { const on = n === current; t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1; });
    panels.forEach((p, n) => p.classList.toggle('on', n === current));
  };
  const stop = () => { clearInterval(timer); timer = null; reel.classList.remove('auto'); };
  const start = () => { if (reduce || timer || touched) return; reel.classList.add('auto'); timer = setInterval(() => show(current + 1), every); };
  const pick = (i) => { touched = true; stop(); show(i); };

  tabs.forEach((t, i) => {
    t.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') pick(i); });
    t.addEventListener('focus', () => pick(i));
    t.addEventListener('click', () => pick(i));
    t.addEventListener('keydown', (e) => {
      const move = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
      if (!move) return;
      e.preventDefault(); pick(current + move); tabs[current].focus();
    });
  });
  // Reading a panel pauses the reel; leaving lets it carry on unless the visitor has chosen one.
  const stage = reel.querySelector('[data-reel-stage]');
  if (stage) { stage.addEventListener('pointerenter', stop); stage.addEventListener('pointerleave', start); }

  new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), { threshold: 0.4 }).observe(reel);
  show(0);
});
