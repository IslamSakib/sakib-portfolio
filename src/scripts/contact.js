// Contact form: business or agency inquiry, posted as JSON to /lead.php, which emails it to Sakib.
// Success is shown only when the server says the email was sent. If sending fails (no PHP on the dev server, or no
// SMTP password on the host yet) the visitor gets the same message ready to send by email or WhatsApp instead.
import { gibberish, sensible } from './validate.js';

const form = document.querySelector('[data-contact]');
if (form) {
  const done = document.querySelector('[data-done]');
  const alertBox = form.querySelector('[data-alert]');
  const msgLabel = form.querySelector('[data-msg-label]');
  const f = form.elements;
  const started = Date.now();
  const params = new URLSearchParams(location.search);
  const isEmail = (v) => /^[^\s@]+@[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,24}$/i.test(v);

  // The fields that only one audience needs are shown for that audience.
  const setType = (type) => {
    form.querySelectorAll('[data-for]').forEach((el) => { el.hidden = el.dataset.for !== type; });
    msgLabel.textContent = type === 'agency' ? 'Tell me about the project and the date' : 'What is going on with the site?';
  };
  form.addEventListener('change', (e) => { if (e.target.name === 'type') setType(e.target.value); });
  if (params.get('type') === 'agency') form.querySelector('input[value=agency]').checked = true;
  const needs = { maintenance: 'Monthly maintenance', broken: 'Something is broken', speed: 'My site is slow', build: 'A new build or relaunch' };
  if (needs[params.get('need')]) f.need.value = needs[params.get('need')];
  // A plan picked on a pricing table starts the message for the visitor.
  const plans = {
    care: ['Monthly maintenance', 'I would like to start the Care plan ($149 a month) for my site: '],
    'care-plus': ['Monthly maintenance', 'I would like to start the Care + development plan ($299 a month) for my site: '],
    site: [null, 'We have a design to build in WordPress. Pages and date: '],
    hourly: [null, 'We would like to book hourly help ($35 an hour) for: '],
    block: [null, 'We would like a quote for a monthly block of hours, about this many hours a month: '],
  };
  const plan = plans[params.get('plan')];
  if (plan) {
    if (plan[0]) f.need.value = plan[0];
    f.message.value = plan[1];
  }
  setType(f.type.value);

  const flag = (input, message) => {
    const err = input.parentElement.querySelector('.err');
    input.setAttribute('aria-invalid', message ? 'true' : 'false');
    if (err) { err.textContent = message; err.hidden = !message; if (message) input.setAttribute('aria-describedby', (err.id ||= input.id + '-err')); }
    return !message;
  };
  const check = () => {
    const name = f.name.value.trim(), email = f.contact.value.trim(), msg = f.message.value.trim();
    const results = [
      flag(f.name, name.length < 2 || gibberish(name) ? 'Add the name I should use.' : ''),
      flag(f.contact, isEmail(email) ? '' : 'Enter an email like name@company.com'),
      flag(f.message, msg.length < 10 || gibberish(msg) || !sensible(msg) ? 'Add a sentence or two so I know where to start.' : ''),
    ];
    return results.every(Boolean);
  };

  const data = () => {
    const type = f.type.value;
    const d = { type, name: f.name.value.trim(), contact: f.contact.value.trim(), timeline: f.timeline.value, budget: f.budget.value, message: f.message.value.trim() };
    if (type === 'agency') Object.assign(d, { agency: f.agency.value.trim(), work: f.work.value });
    else Object.assign(d, { site: f.site.value.trim(), need: f.need.value });
    return d;
  };
  const plain = (d) => Object.entries(d).filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join('\n');

  const fallback = (d) => {
    const text = 'Hi Sakib,\n\n' + plain(d);
    alertBox.innerHTML = '';
    alertBox.append('The form could not send just now. Your message is ready to send another way: ');
    const mail = document.createElement('a');
    mail.href = `mailto:${form.dataset.email}?subject=${encodeURIComponent(d.type === 'agency' ? 'Agency inquiry' : 'Website inquiry')}&body=${encodeURIComponent(text)}`;
    mail.textContent = 'by email';
    const wa = document.createElement('a');
    wa.href = `${form.dataset.whatsapp}?text=${encodeURIComponent(text)}`;
    wa.target = '_blank'; wa.rel = 'noopener';
    wa.textContent = 'on WhatsApp';
    alertBox.append(mail, ' or ', wa, '.');
    alertBox.hidden = false;
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    alertBox.hidden = true;
    if (!check()) {
      alertBox.textContent = 'A couple of things need fixing before this can send.';
      alertBox.hidden = false;
      form.querySelector('[aria-invalid=true]')?.focus();
      return;
    }
    const button = form.querySelector('button[type=submit]');
    button.disabled = true; button.textContent = 'Sending…';
    const d = data();
    try {
      const r = await fetch('/lead.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...d, company: f.company.value, elapsed: Date.now() - started, page: location.pathname }),
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok || !j.ok) throw new Error('send failed');
      form.hidden = true;
      done.hidden = false;
      done.focus();
    } catch (err) {
      fallback(d);
    } finally {
      button.disabled = false; button.textContent = 'Send message';
    }
  });
}
