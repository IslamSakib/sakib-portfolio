// The hero shows one short sentence, not a paragraph. Takes sentences from the lead until the line is 60 characters or more
// and names the focus keyword (the seo check needs both), so the first paragraph still passes.
export const heroLead = (text, focus = '') => {
  const parts = text.replace(/ (\S+)$/, ' $1').split(/(?<=[.?!])\s+(?=[A-Z])/);
  let out = '';
  for (const part of parts) {
    out = out ? `${out} ${part}` : part;
    if (out.length >= 60 && out.toLowerCase().includes(focus.toLowerCase())) break;
  }
  return out;
};
