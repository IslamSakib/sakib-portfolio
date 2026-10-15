// Contact page guide: one question at a time, with the answers so far shown above as a short chat log. Picking an
// option moves on by itself; typed answers move on with Continue. A plan or service picked elsewhere on the site
// arrives in the URL and is answered for the visitor. The lead is posted as JSON to /lead.php (types "business" and
// "agency"), and success is shown only when the server says the email went out. If sending fails, the same message
// is offered ready to send by email or WhatsApp.
import { gibberish, sensible } from './validate.js';

const form = document.querySelector('[data-contact]');
if (form) {
  const f = form.elements;
  const $ = (s) => form.querySelector(s);
  const done = document.querySelector('[data-done]');
  const alertBox = $('[data-alert]'), log = $('[data-log]'), bar = $('[data-bar]'), countLabel = $('[data-count-label]');
  const back = $('[data-back]'), skip = $('[data-skip]'), next = $('[data-next]'), send = $('[data-send]');
  const steps = Object.fromEntries([...form.querySelectorAll('[data-step]')].map((el) => [el.dataset.step, el]));
  const started = Date.now();
  const isEmail = (v) => /^[^\s@]+@[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,24}$/i.test(v);
  const radio = (name) => form.querySelector(`input[name="${name}"]:checked`);
  const type = () => radio('type')?.value;
  const service = () => radio(type() === 'agency' ? 'work' : 'need');

  form.classList.add('is-guided');

  // Questions in order for the current audience. The budget question is dropped when the price is already known.
  const order = () => {
    const t = type();
    if (!t) return ['type'];
    const s = t === 'agency' ? ['type', 'work', 'agency'] : ['type', 'need', 'site'];
    s.push('timeline');
    if (!service()?.dataset.fixed) s.push('budget');
    s.push('message', 'you', 'review');
    return s;
  };

  // What each answered question shows in the log.
  const answer = (step) => {
    switch (step) {
      case 'type': return radio('type')?.parentElement.querySelector('b').textContent;
      case 'need': case 'work': return radio(step)?.parentElement.querySelector('b').textContent + ' · ' + radio(step)?.parentElement.querySelector('small').textContent;
      case 'site': return f.site.value.trim() || 'Skipped';
      case 'agency': return f.agency.value.trim() || 'Skipped';
      case 'timeline': case 'budget': return radio(step)?.value || 'Skipped';
      case 'message': return f.message.value.trim();
      case 'you': return `${f.name.value.trim()} · ${f.contact.value.trim()}`;
    }
    return '';
  };

  // The message question and its starter text follow the chosen service.
  const starters = {
    care: 'I would like to start the Care plan for my site.',
    'care-plus': 'I would like to start the Care + development plan for my site.',
    speed: 'My site is slow, especially on phones. ',
    broken: 'Something on my site is broken: ',
    build: 'I need a site built. What it is for: ',
    site: 'We have a design to build in WordPress. Pages and date: ',
    hourly: 'We would like hourly help with: ',
    block: 'We would like a monthly block of about this many hours: ',
    fixes: 'A client site needs fixing. What is happening: ',
  };
  let starter = '';
  const syncMessage = () => {
    const key = service()?.dataset.key;
    $('[data-msg-q]').textContent = type() === 'agency' ? 'Tell me about the project and the date.' : key === 'build' ? 'What should the new site do?' : key === 'care' || key === 'care-plus' ? 'Anything I should know about the site?' : 'What is going on with the site?';
    const s = starters[key] || '';
    if (!f.message.value.trim() || f.message.value === starter) f.message.value = s;
    starter = s;
  };

  let at = 0;
  const show = (i, focus = true) => {
    const seq = order();
    at = Math.max(0, Math.min(i, seq.length - 1));
    const name = seq[at];
    Object.entries(steps).forEach(([k, el]) => { el.hidden = k !== name; el.classList.toggle('on', k === name); });
    if (name === 'message') syncMessage();
    if (name === 'review') summary();

    // The log: every earlier answer, each with a way back to change it.
    log.innerHTML = '';
    if (name !== 'review') seq.slice(0, at).forEach((k, j) => {
      const li = document.createElement('li');
      const q = document.createElement('span'); q.className = 'g-lq'; q.textContent = steps[k].querySelector('.g-q').firstChild.textContent.trim();
      const a = document.createElement('span'); a.className = 'g-la'; a.textContent = answer(k);
      const edit = document.createElement('button'); edit.type = 'button'; edit.className = 'g-edit'; edit.textContent = 'Change';
      edit.setAttribute('aria-label', 'Change answer: ' + q.textContent);
      edit.addEventListener('click', () => show(j));
      li.append(q, a, edit);
      log.append(li);
    });

    const typed = ['site', 'agency', 'message', 'you'].includes(name);
    const optional = steps[name].hasAttribute('data-optional');
    back.hidden = at === 0;
    skip.hidden = !optional || (typed ? false : !!radio(name));
    next.hidden = !(typed || (name === 'timeline' && radio('timeline')) || (name === 'budget' && radio('budget')) || (['type', 'need', 'work'].includes(name) && radio(name)));
    send.hidden = name !== 'review';
    countLabel.textContent = name === 'review' ? 'Ready to send' : seq.length > 1 ? `Question ${at + 1} of ${seq.length - 1}` : 'About a minute';
    bar.style.transform = `scaleX(${seq.length > 1 ? (at + (name === 'review' ? 1 : 0)) / (seq.length - 1) : 0})`;
    alertBox.hidden = true;

    if (focus) {
      const target = steps[name].querySelector('input:not([type=radio]), textarea') || radio(name) || steps[name].querySelector('input');
      (target || steps[name]).focus({ preventScroll: true });
      const top = form.getBoundingClientRect().top;
      if (top < 80 || top > innerHeight * 0.5) form.scrollIntoView({ block: 'start' });
    }
  };

  const flag = (input, message) => {
    const err = input.parentElement.querySelector('.err');
    input.setAttribute('aria-invalid', message ? 'true' : 'false');
    if (err) { err.textContent = message; err.hidden = !message; if (message) input.setAttribute('aria-describedby', (err.id ||= input.id + '-err')); }
    return !message;
  };
  const valid = (name) => {
    if (name === 'message') {
      const msg = f.message.value.trim();
      return flag(f.message, msg.length < 10 || gibberish(msg) || !sensible(msg) ? 'Add a sentence or two so I know where to start.' : '');
    }
    if (name === 'you') {
      const a = flag(f.name, f.name.value.trim().length < 2 || gibberish(f.name.value.trim()) ? 'Add the name I should use.' : '');
      const b = flag(f.contact, isEmail(f.contact.value.trim()) ? '' : 'Enter an email like name@company.com');
      return a && b;
    }
    if (name === 'site' && f.site.value.trim() && !/^(https?:\/\/)?[^\s.]+\.[^\s]{2,}$/i.test(f.site.value.trim())) {
      alertBox.textContent = 'That does not look like a web address. Fix it or skip this question.';
      alertBox.hidden = false;
      return false;
    }
    return true;
  };
  const forward = () => {
    const name = order()[at];
    if (!valid(name)) { form.querySelector('[aria-invalid=true]')?.focus(); return; }
    show(at + 1);
  };

  // Picking an option answers the question and moves on after a short beat, so the choice is seen.
  form.addEventListener('change', (e) => {
    const t = e.target;
    if (t.type !== 'radio') return;
    if (t.name === 'type') { form.querySelectorAll('input[name=need], input[name=work]').forEach((r) => { r.checked = false; }); }
    setTimeout(() => show(at + 1), 260);
  });
  next.addEventListener('click', forward);
  back.addEventListener('click', () => show(at - 1));
  skip.addEventListener('click', () => {
    const name = order()[at];
    if (name === 'site') f.site.value = '';
    if (name === 'agency') f.agency.value = '';
    if (name === 'budget' && radio('budget')) radio('budget').checked = false;
    show(at + 1);
  });
  // Enter in a one-line answer means Continue (the message box keeps Enter for new lines).
  form.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.tagName === 'INPUT' && e.target.type !== 'radio') { e.preventDefault(); forward(); }
  });

  const data = () => {
    const d = { type: type(), name: f.name.value.trim(), contact: f.contact.value.trim(), timeline: radio('timeline')?.value || '', budget: radio('budget')?.value || '', message: f.message.value.trim() };
    if (d.type === 'agency') Object.assign(d, { agency: f.agency.value.trim(), work: radio('work')?.value || '' });
    else Object.assign(d, { site: f.site.value.trim(), need: radio('need')?.value || '' });
    return d;
  };
  const labels = { type: 'Writing as', need: 'Needs', work: 'Work', site: 'Website', agency: 'Agency', timeline: 'Timeline', budget: 'Budget', message: 'Message', name: 'Name', contact: 'Email' };
  const summary = () => {
    const d = data();
    const box = $('[data-summary]');
    box.innerHTML = '';
    ['type', 'need', 'work', 'site', 'agency', 'timeline', 'budget', 'message', 'name', 'contact'].filter((k) => d[k]).map((k) => [k, d[k]]).forEach(([k, v]) => {
      const row = document.createElement('div');
      const dt = document.createElement('dt'); dt.textContent = labels[k] || k;
      const dd = document.createElement('dd'); dd.textContent = k === 'type' ? (v === 'agency' ? 'An agency' : 'A business') : v;
      row.append(dt, dd); box.append(row);
    });
  };
  const plain = (d) => Object.entries(d).filter(([, v]) => v).map(([k, v]) => `${labels[k] || k}: ${v}`).join('\n');

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
    if (order()[at] !== 'review') { forward(); return; }
    send.disabled = true; send.textContent = 'Sending…';
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
      send.disabled = false; send.textContent = 'Send message';
    }
  });

  // Answers that arrive with the link: who is writing, and the plan or service they picked.
  const params = new URLSearchParams(location.search);
  const aliases = { maintenance: 'care' };
  const wanted = aliases[params.get('plan') || params.get('need')] || params.get('plan') || params.get('need');
  const t = params.get('type') === 'agency' ? 'agency' : wanted ? 'business' : null;
  if (t) form.querySelector(`input[name=type][value=${t}]`).checked = true;
  const pick = wanted && form.querySelector(`input[name=${t === 'agency' ? 'work' : 'need'}][data-key="${CSS.escape(wanted)}"]`);
  if (pick) pick.checked = true;
  // Start on the first question that still needs an answer.
  const seq = order();
  show(Math.max(0, seq.findIndex((k) => (k === 'type' ? !type() : k === 'need' || k === 'work' ? !service() : true))), false);
}
