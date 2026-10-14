// Starting prices in US dollars, approved by Sakib on 14 Oct 2026. One source for the home page, the maintenance page,
// the agency page and the structured data. Every job still gets a written quote first.
export const prices = {
  care: 149,
  carePlus: 299,
  fix: 150,
  speed: 450,
  build: 2500,
  agencyHour: 35,
  agencySite: 1200,
};

export const usd = (n) => '$' + n.toLocaleString('en-US');
