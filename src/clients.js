// The "Built for" strip shows only clients whose own logo could be taken from their live site
// (scripts/logos.mjs writes a dark-theme version to src/assets/clients/<slug>.png). The full client list is longer:
// sites that no longer load, or that use plain lettering as their logo, are listed here but not shown.
const logos = import.meta.glob('./assets/clients/*.png', { eager: true });
// Logos that are a symbol without the name, so the name is printed beside them.
const iconOnly = ['wrkbase', 'tatka'];

const names = [
  'Mayabee',
  'Tabby',
  'TubeOnAI',
  'Moneybag',
  'Wrkbase',
  'Open Alliance Learning',
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
];
// Every client site Sakib listed as built or fixed, with or without a usable logo.
export const clientCount = names.length;

export const clients = names.flatMap((name) => {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const logo = logos[`./assets/clients/${slug}.png`]?.default;
  return logo ? [{ name, logo, showName: iconOnly.includes(slug) }] : [];
});
