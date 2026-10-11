// Answer checks shared by the lead chat (chat.js) and the audit console (audit.js). Each returns '' when the answer is
// usable, or a short message telling the visitor what to type instead. They catch random typing, not bad intentions:
// the server (public/lead.php) does its own checks before anything is emailed.
// Run `node scripts/check-validate.mjs` after changing anything here.

const mash = /(asdf|sdfg|dfgh|fghj|ghjk|hjkl|qwer|wert|erty|rtyu|tyui|yuio|uiop|zxcv|xcvb|cvbn|vbnm|abcd|1234)/i;

// True for keyboard mashing: "asdfgh", "aaaaaa", "xkcdvbnt", "!!!!". Text in other scripts (Bangla, Arabic) is let through.
export const gibberish = (text) => {
  const s = text.toLowerCase().trim();
  if (/[^\u0000-\u007f]/.test(s) && /\p{L}/u.test(s.replace(/[a-z]/g, ''))) return false;
  if (/(.)\1{3,}/.test(s) || mash.test(s)) return true;
  const words = s.split(/\s+/).map((w) => w.replace(/[^a-z]/g, '')).filter(Boolean);
  if (!words.length) return !/\d/.test(s);
  const bad = words.filter((w) => w.length >= 4 && (!/[aeiouy]/.test(w) || /[^aeiouy]{6,}/.test(w)));
  return bad.length > 0 && bad.length >= words.length / 2;
};

// "example.com/shop" or "https://www.example.com" gives "example.com"; anything that is not a plausible public address gives ''.
export const hostOf = (raw) => {
  try {
    const u = new URL(/^https?:\/\//i.test(raw.trim()) ? raw.trim() : 'https://' + raw.trim());
    const ok = /^[a-z0-9-]+(\.[a-z0-9-]+)+$/i.test(u.hostname) && /\.[a-z]{2,24}$/i.test(u.hostname) && !gibberish(u.hostname.split('.').slice(0, -1).join(' '));
    return ok ? u.hostname.toLowerCase().replace(/^www\./, '') : '';
  } catch (e) { return ''; }
};

const isEmail = (v) => /^[^\s@]+@[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,24}$/i.test(v);
const isPhone = (v) => /^[+()\d\s.-]+$/.test(v) && v.replace(/\D/g, '').length >= 8 && v.replace(/\D/g, '').length <= 15;

export const checks = {
  // What they need: a few real words.
  need: (v) => (v.length < 3 || gibberish(v) ? 'I did not catch that. Pick one of the options, or say in a few words what you need.' : ''),
  // A site address, or a plain "no".
  site: (v) => (/^(no|none|nope|n\/a|not yet|no site( yet)?|don'?t have( one)?|nothing)\b/i.test(v) || hostOf(v) ? '' : 'That does not look like a site address. Type it like yoursite.com, or say "no site yet".'),
  goal: (v) => (v.split(/\s+/).length < 2 || gibberish(v) ? 'Could you say that in a sentence? For example: "more enquiries from the site" or "pages that load in under two seconds".' : ''),
  timeline: (v) => (/\d|asap|soon|urgent|today|tomorrow|week|month|year|day|quarter|date|flexible|no (rush|hurry|fixed)|whenever|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec/i.test(v) && !gibberish(v) ? '' : 'When would you like it done? Pick an option, or type something like "in 3 weeks" or "by December".'),
  budget: (v) => (/\d|not sure|unsure|don'?t know|no idea|flexible|open|depends|tbd|negotiable|low|small|tight/i.test(v) && !gibberish(v) ? '' : 'A rough figure is enough, such as "$1,000" or "around 500". You can also pick "Not sure yet".'),
  name: (v) => (/^[\p{L}][\p{L}\p{M} .'-]{1,59}$/u.test(v) && !gibberish(v) && !/(.)\1{2,}/.test(v) ? '' : 'What name should Sakib use? Letters only, please.'),
  contact: (v) => (isEmail(v) || isPhone(v) ? '' : 'That does not look like an email address or phone number. Try name@company.com or a number with its country code.'),
};
