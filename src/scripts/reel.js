// Selected work: a list of projects on the left, one preview stage on the right. Hover, focus or click a name to show it.
// Until the visitor touches it, the reel moves to the next project every few seconds (not under reduced motion).
const reel = document.querySelector('[data-reel]');
if (reel) {
  const tabs = [...reel.querySelectorAll('[role=tab]')], panels = [...reel.querySelectorAll('[role=tabpanel]')];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let current = 0, timer = null;

  const show = (i) => {
    current = (i + tabs.length) % tabs.length;
    tabs.forEach((t, n) => { const on = n === current; t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1; });
    panels.forEach((p, n) => p.classList.toggle('on', n === current));
  };
  const stop = () => { clearInterval(timer); timer = null; reel.classList.remove('auto'); };
  const start = () => { if (reduce || timer) return; reel.classList.add('auto'); timer = setInterval(() => show(current + 1), 5000); };

  tabs.forEach((t, i) => {
    t.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') { stop(); show(i); } });
    t.addEventListener('focus', () => { stop(); show(i); });
    t.addEventListener('click', () => { stop(); show(i); });
    t.addEventListener('keydown', (e) => {
      const move = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
      if (!move) return;
      e.preventDefault(); stop(); show(current + move); tabs[current].focus();
    });
  });
  reel.querySelector('.reel-stage').addEventListener('pointerenter', stop);

  // Only run the automatic advance while the section is on screen.
  let touched = false;
  reel.addEventListener('pointerdown', () => { touched = true; }, { once: true });
  new IntersectionObserver(([e]) => { if (e.isIntersecting && !touched) start(); else stop(); }, { threshold: 0.4 }).observe(reel);
  show(0);
}
