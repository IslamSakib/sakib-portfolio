// Lead chat: a scripted assistant that asks a few questions, shows a summary, then posts the answers to /lead.php,
// which emails them to Sakib. It says plainly that it is an assistant, and it never blocks the page: if sending fails
// (or there is no PHP, as on the local dev server) it hands the same summary to WhatsApp instead.
import { checks } from './validate.js';

const root = document.querySelector('[data-chat]');
if (root) {
  const panel = root.querySelector('.chat-panel'), log = root.querySelector('.chat-log'), chipsBox = root.querySelector('.chat-chips');
  const form = root.querySelector('form'), input = form.querySelector('input[name=msg]'), trap = form.querySelector('input[name=company]');
  const launcher = root.querySelector('.chat-launcher');
  const whatsapp = root.dataset.whatsapp;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lead = {};
  let step = -1, busy = false, startedAt = 0;

  const steps = [
    {
      key: 'need',
      ask: () => 'Hi, I am Sakib\'s assistant. I will ask a few quick questions and send your answers straight to him. What do you need help with?',
      chips: ['My site is slow', 'Something is broken', 'Monthly maintenance', 'A new build or relaunch', 'White-label work for my agency', 'Something else'],
    },
    {
      key: 'site',
      ask: () => (/agency|white/i.test(lead.need)
        ? 'Good. Is there a design or a client site I should look at? Paste a link, or say "no site yet".'
        : /build|relaunch/i.test(lead.need)
          ? 'Good. Is there an existing site or a reference I should look at? Paste the address, or say "no site yet".'
          : 'Got it. What is the site address? If there is no site yet, just say so.'),
      chips: ['No site yet'],
    },
    { key: 'goal', ask: () => 'What is the main result you want from this? One or two sentences is plenty.' },
    { key: 'timeline', ask: () => 'When do you need it done?', chips: ['As soon as possible', 'Within a month', '1 to 3 months', 'No fixed date'] },
    {
      key: 'budget',
      // The starting prices from src/prices.js, so the visitor knows the ballpark before answering.
      ask: () => (/maintenance/i.test(lead.need)
        ? 'Care plans start at $149 a month, or $299 with development time included. Do you have a budget in mind?'
        : /agency|white/i.test(lead.need)
          ? 'White-label work is $35 an hour, or from $1,200 per site from a Figma design. Do you have a budget in mind for this one?'
          : /slow|broken/i.test(lead.need)
            ? 'Single fixes start at $150 and speed fixes at $450. Do you have a budget range in mind?'
            : 'Builds start at $2,500. Do you have a budget range in mind? It helps Sakib suggest the right scope.'),
      chips: ['Under $500', '$500 to $2,000', '$2,000 to $5,000', 'Above $5,000', 'Not sure yet'],
    },
    { key: 'name', ask: () => 'Almost done. What is your name?' },
    {
      key: 'contact',
      ask: () => `Thanks, ${lead.name.split(' ')[0]}. Where should Sakib reply? An email address or a WhatsApp number works.`,
    },
  ];

  const labels = { need: 'Needs', site: 'Site', goal: 'Goal', timeline: 'Timeline', budget: 'Budget', name: 'Name', contact: 'Reply to' };
  const summary = () => Object.keys(labels).map((k) => `${labels[k]}: ${lead[k]}`).join('\n');
  const wait = (ms) => new Promise((r) => setTimeout(r, reduce ? 0 : ms));
  const scroll = () => { log.scrollTop = log.scrollHeight; };

  const bubble = (text, who) => {
    const el = document.createElement('p');
    el.className = 'chat-msg ' + who;
    el.textContent = text;
    log.append(el); scroll();
    return el;
  };
  const say = async (text) => {
    busy = true;
    const dots = document.createElement('p');
    dots.className = 'chat-msg bot typing';
    dots.setAttribute('aria-hidden', 'true');
    dots.innerHTML = '<i></i><i></i><i></i>';
    log.append(dots); scroll();
    await wait(Math.min(1400, 450 + text.length * 14));
    dots.remove();
    bubble(text, 'bot');
    busy = false;
  };
  const chips = (list, onPick) => {
    chipsBox.replaceChildren(...(list || []).map((label) => {
      const b = document.createElement('button');
      b.type = 'button'; b.textContent = label;
      b.addEventListener('click', () => onPick(label));
      return b;
    }));
  };

  const next = async () => {
    step += 1;
    chips([]);
    if (step < steps.length) {
      await say(steps[step].ask());
      chips(steps[step].chips, answer);
      input.focus();
      return;
    }
    await say('Here is what I will send to Sakib:\n\n' + summary());
    chips(['Send it', 'Start over'], (pick) => (pick === 'Send it' ? send() : restart()));
  };

  const answer = async (value) => {
    const v = value.trim().slice(0, 600);
    if (!v || busy || step < 0 || step >= steps.length) return;
    bubble(v, 'user');
    input.value = '';
    chips([]);
    // Every answer is checked (validate.js). A bad one gets a short hint and the same question stays open,
    // with its quick options back on screen.
    const problem = checks[steps[step].key](v);
    if (problem) { await say(problem); chips(steps[step].chips, answer); input.focus(); return; }
    lead[steps[step].key] = v;
    next();
  };

  const fallback = async () => {
    await say('I could not send that from here, sorry. Tap below and the same details open in WhatsApp, ready to send.');
    const a = document.createElement('a');
    a.className = 'chat-msg bot link';
    a.href = whatsapp + '?text=' + encodeURIComponent('Hi Sakib, here are my project details.\n\n' + summary());
    a.target = '_blank'; a.rel = 'noopener';
    a.textContent = 'Send on WhatsApp ↗';
    log.append(a); scroll();
  };

  const send = async () => {
    chips([]);
    bubble('Send it', 'user');
    busy = true;
    try {
      const r = await fetch('/lead.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...lead, company: trap.value, elapsed: Date.now() - startedAt, page: location.pathname }),
      });
      const j = await r.json();
      if (!r.ok || !j.ok) throw new Error('send failed');
      busy = false;
      await say(`Sent. Sakib will reply to ${lead.contact}. If it is urgent, you can also message him on WhatsApp.`);
      form.hidden = true;
    } catch (e) {
      busy = false;
      await fallback();
    }
  };

  const restart = () => {
    Object.keys(lead).forEach((k) => delete lead[k]);
    log.replaceChildren();
    form.hidden = false;
    step = -1;
    next();
  };

  const open = () => {
    root.classList.add('open');
    panel.hidden = false;
    launcher.setAttribute('aria-expanded', 'true');
    if (step === -1) { startedAt = Date.now(); next(); }
    input.focus();
  };
  const close = () => {
    root.classList.remove('open');
    panel.hidden = true;
    launcher.setAttribute('aria-expanded', 'false');
    launcher.focus();
  };

  launcher.addEventListener('click', () => (panel.hidden ? open() : close()));
  root.querySelector('.chat-close').addEventListener('click', close);
  document.querySelectorAll('[data-chat-open]').forEach((b) => b.addEventListener('click', open));
  form.addEventListener('submit', (e) => { e.preventDefault(); answer(input.value); });
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && !panel.hidden) close(); });
}

// Back to top: appears once the visitor has scrolled a screen or so.
const top = document.querySelector('[data-top]');
if (top) {
  const show = () => top.classList.toggle('show', scrollY > 700);
  addEventListener('scroll', show, { passive: true });
  show();
  top.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));
}
