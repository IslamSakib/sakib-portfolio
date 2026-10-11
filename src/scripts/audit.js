// Free audit console. Three inputs in turn (site address, main worry, contact), with the audit plan written out line by line
// in between. Sends to /lead.php as type "audit"; if that fails, the same request opens in WhatsApp.
const box = document.querySelector('[data-audit]');
if (box) {
  const log = box.querySelector('.console-log'), chipsBox = box.querySelector('.console-chips'), state = box.querySelector('[data-audit-state]');
  const form = box.querySelector('form'), input = form.querySelector('input[name=value]'), trap = form.querySelector('input[name=company]'), button = form.querySelector('button');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const req = {};
  let stage = 'site', busy = false, startedAt = Date.now();

  const wait = (ms) => new Promise((r) => setTimeout(r, reduce ? 0 : ms));

  // Until the visitor types, the empty field shows example addresses being typed, so it reads as a place to write.
  // It stops for good at the first focus or keystroke.
  if (!reduce) {
    const examples = ['yoursite.com', 'myshop.com', 'yourstartup.io'];
    let n = 0, i = 0, dir = 1;
    const hint = setInterval(() => {
      if (stage !== 'site' || input.value || document.activeElement === input) { clearInterval(hint); input.placeholder = examples[0]; return; }
      const word = examples[n];
      i += dir;
      input.placeholder = word.slice(0, i) + '▍';
      if (i === word.length + 8) dir = -1;
      if (i === 0) { dir = 1; n = (n + 1) % examples.length; }
    }, 110);
  }
  const line = (text, kind = 'sys') => {
    const p = document.createElement('p');
    p.className = 'line ' + kind;
    p.textContent = text;
    log.append(p);
    log.scrollTop = log.scrollHeight;
    return p;
  };
  // Write a line out character by character, like an agent reporting as it goes.
  const type = async (text, kind) => {
    const p = line('', kind);
    if (reduce) { p.textContent = text; return; }
    for (let i = 1; i <= text.length; i++) { p.textContent = text.slice(0, i); if (i % 2 === 0) await wait(12); }
    log.scrollTop = log.scrollHeight;
  };
  const chips = (list, onPick) => {
    chipsBox.replaceChildren(...(list || []).map((label) => {
      const b = document.createElement('button');
      b.type = 'button'; b.textContent = label;
      b.addEventListener('click', () => onPick(label));
      return b;
    }));
  };
  const ask = (placeholder, label, mode) => {
    input.value = ''; input.placeholder = placeholder; input.inputMode = mode; button.textContent = label;
    form.hidden = false; input.focus({ preventScroll: true });
  };

  // "example.com/shop" or "https://www.example.com" → host, or '' when it is not a plausible public address.
  const hostOf = (raw) => {
    try {
      const u = new URL(/^https?:\/\//i.test(raw) ? raw : 'https://' + raw);
      return /^[a-z0-9-]+(\.[a-z0-9-]+)+$/i.test(u.hostname) ? u.hostname.toLowerCase().replace(/^www\./, '') : '';
    } catch (e) { return ''; }
  };

  const onSite = async (value) => {
    const host = hostOf(value.trim());
    line('> ' + value.trim(), 'you');
    if (!host) { line('That does not look like a site address. Try something like yoursite.com.', 'warn'); return; }
    req.site = host;
    busy = true; form.hidden = true; state.textContent = 'planning';
    await type('Address accepted: ' + host, 'ok');
    await wait(250);
    for (const step of ['Plan 1 of 4: mobile speed and Core Web Vitals', 'Plan 2 of 4: plugins, theme and caching setup', 'Plan 3 of 4: what search engines can and cannot read', 'Plan 4 of 4: the three fixes to do first']) {
      await type(step, 'plan');
      await wait(180);
    }
    await type('This is the plan, not the result. Sakib runs the audit himself. What worries you most about the site?', 'sys');
    busy = false; stage = 'worry'; state.textContent = 'waiting';
    chips(['Pages are slow', 'It keeps going down', 'Not enough search traffic', 'Not sure, just check it'], onWorry);
  };

  const onWorry = async (value) => {
    if (busy) return;
    chips([]);
    req.worry = value;
    line('> ' + value, 'you');
    await type('Noted. Where should the audit be sent? An email address or WhatsApp number.', 'sys');
    stage = 'contact';
    ask('you@company.com', 'Send request', 'email');
  };

  const onContact = async (value) => {
    const v = value.trim().slice(0, 200);
    line('> ' + v, 'you');
    if (!(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) || v.replace(/\D/g, '').length >= 8)) { line('That does not look like an email address or phone number.', 'warn'); return; }
    req.contact = v;
    busy = true; form.hidden = true; state.textContent = 'sending';
    await type('Sending the request to Sakib...', 'sys');
    try {
      const r = await fetch('/lead.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'audit', ...req, company: trap.value, elapsed: Date.now() - startedAt, page: location.pathname }),
      });
      const j = await r.json();
      if (!r.ok || !j.ok) throw new Error('send failed');
      state.textContent = 'sent';
      await type('Request sent. The audit for ' + req.site + ' will go to ' + req.contact + '.', 'ok');
    } catch (e) {
      state.textContent = 'not sent';
      line('I could not send that from here. Use the link below and the same request opens in WhatsApp.', 'warn');
      const a = document.createElement('a');
      a.className = 'line link';
      a.href = box.dataset.whatsapp + '?text=' + encodeURIComponent('Free Audit request\nSite: ' + req.site + '\nMain worry: ' + req.worry + '\nReply to: ' + req.contact);
      a.target = '_blank'; a.rel = 'noopener';
      a.textContent = 'Send the audit request on WhatsApp ↗';
      log.append(a);
    }
    busy = false;
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (busy || !input.value.trim()) return;
    if (stage === 'site') onSite(input.value); else if (stage === 'contact') onContact(input.value);
  });
}
