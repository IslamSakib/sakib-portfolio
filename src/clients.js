// Every site in the "Built for" strip, all at one height.
// A client's own logo is used when their site still serves one (scripts/logos.mjs writes src/assets/clients/<slug>.png).
// The rest get a wordmark set in `marks`: these are sites that no longer load, have no logo image, or now show
// something else on the domain. `style` picks the lettering, `color` the ink, `badge` the letters in the small emblem.
const logos = import.meta.glob('./assets/clients/*.png', { eager: true });
// Logos that are a symbol without the name, so the name is printed beside them.
const iconOnly = ['wrkbase', 'tatka'];
const marks = {
  // Piola Pizza and My Legacy Wall use plain lettering as their logo, so these two follow the real thing.
  'piola-pizza': { style: 'heavy', color: '#f5f4ef', text: 'PIOLA.' },
  'my-legacy-wall': { style: 'plain', color: '#9db0ff' },
  'boss-pizza-ellerslie': { style: 'heavy', color: '#ffd166', badge: 'B' },
  'fitt-foody': { style: 'round', color: '#8fd694', badge: 'F' },
  'drc-store': { style: 'mono', color: '#f5f4ef', badge: 'DRC' },
  'soundwave-auto-world': { style: 'caps', color: '#b9a2ff', badge: 'S' },
  'wafrah-al-haditha': { style: 'serif', color: '#6fd6c8', badge: 'W' },
  'oasis-short-stays': { style: 'script', color: '#7fd3ea', badge: 'O' },
  'phone-repairman': { style: 'heavy', color: '#ffa45c', badge: 'P' },
  'siam-burning': { style: 'heavy', color: '#ff7b7b', badge: 'S' },
};

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
  return { name, logo, mark: logo ? null : marks[slug], showName: !!logo && iconOnly.includes(slug) };
});
