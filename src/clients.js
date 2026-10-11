// Every site in the "Built for" strip. Names follow each site's own domain; the list is long enough that two copies
// always fill the widest screens, which is what keeps the marquee loop seamless.
// A client's own logo is shown when scripts/logos.mjs found a usable one on their site (src/assets/clients/<slug>.png).
// `iconOnly` lists logos that are a symbol without the name, so the name is printed beside them.
const logos = import.meta.glob('./assets/clients/*.png', { eager: true });
const iconOnly = ['wrkbase', 'tatka', 'open-alliance-learning'];

export const clients = [
  'Tabby',
  'TubeOnAI',
  'Moneybag',
  'Wrkbase',
  'Open Alliance Learning',
  'Pixmge',
  'Piola Pizza',
  'Boss Pizza Ellerslie',
  'Orine USA',
  'Fitt Foody',
  'School Supply',
  'DRC Store',
  'Polar Bear Lighting',
  'O and H Products',
  'Soundwave Auto World',
  'FITL',
  'Tatka',
  'Wafrah Al Haditha',
  'Oxford International School',
  'Oasis Short Stays',
  'Phone Repairman',
  'Agbad Radi',
  'My Legacy Wall',
  'IGAC',
  'Siam Burning',
].map((name) => {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const logo = logos[`./assets/clients/${slug}.png`]?.default;
  return { name, logo, showName: !logo || iconOnly.includes(slug) };
});
