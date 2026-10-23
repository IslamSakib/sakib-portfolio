// Small line icons for the "What you get" cards on the service pages. Each is one SVG path on a 24 by 24 grid,
// drawn with a 1.6 stroke. `iconFor` picks the icon for a card by its title.
export const icons = {
  layout: 'M3 5h18v14H3z M3 10h18 M9 10v9',
  plug: 'M9 3v4 M15 3v4 M6 7h12v4a6 6 0 0 1-12 0z M12 17v4',
  cart: 'M3 4h2l2.5 11h10L20 7H6 M9 19.5v.01 M17 19.5v.01',
  cap: 'M2 9l10-5 10 5-10 5z M6 11v5c3 3 9 3 12 0v-5',
  link: 'M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1 M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1',
  shield: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z M9 12l2 2 4-4',
  gauge: 'M4 17a8 8 0 1 1 16 0 M12 17l4-6',
  layers: 'M12 4l9 5-9 5-9-5z M3 14l9 5 9-5',
  image: 'M3 5h18v14H3z M3 16l5-5 4 4 3-3 6 6 M15.5 9.5v.01',
  alert: 'M12 4l9 16H3z M12 10v5 M12 17.5v.01',
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14z M16 16l5 5',
  flag: 'M5 21V4 M5 4h12l-2 4 2 4H5',
  lock: 'M6 11h12v9H6z M8 11V8a4 4 0 0 1 8 0v3',
  chart: 'M4 20V10 M10 20V4 M16 20v-7 M21 20H3',
  bolt: 'M13 3L5 14h6l-1 7 8-11h-6z',
  calc: 'M6 3h12v18H6z M9 7h6 M9 12v.01 M12 12v.01 M15 12v.01 M9 16v.01 M12 16v.01 M15 16v.01',
  book: 'M3 5c3-1 6-1 9 1 3-2 6-2 9-1v14c-3-1-6-1-9 1-3-2-6-2-9-1z M12 6v14',
  bot: 'M6 9h12v10H6z M12 9V5 M12 4.5v.01 M9.5 13.5v.01 M14.5 13.5v.01 M10 16.5h4',
  code: 'M8 8l-4 4 4 4 M16 8l4 4-4 4 M14 5l-4 14',
  chat: 'M4 5h16v11H9l-5 4z',
  flow: 'M5 5h4v4H5z M15 15h4v4h-4z M15 5h4v4h-4z M9 7h6 M17 9v6',
  bug: 'M9 7a3 3 0 0 1 6 0 M7 9h10v6a5 5 0 0 1-10 0z M3 12h4 M17 12h4 M4 18l3-2 M20 18l-3-2 M12 9v11',
};

const byTitle = {
  'Design to WordPress': 'layout', 'Custom plugin development': 'plug', 'WooCommerce and payments': 'cart',
  'Learning and membership sites': 'cap', Integrations: 'link', 'Care after launch': 'shield',
  'A measured starting point': 'gauge', 'Caching set up once': 'layers', 'Lighter pages': 'bolt',
  'Images that load fast': 'image', 'Downtime and errors': 'alert', 'Crawling and indexing': 'search',
  'A first version you can sell': 'flag', 'Accounts, roles and permissions': 'lock', 'Dashboards and reporting': 'chart',
  'Marketing sites that load instantly': 'bolt', 'Free tools and calculators': 'calc', 'Help centers and documentation': 'book',
  'AI agents inside your product': 'bot', 'LLM API integration': 'code', 'AI chatbots for WordPress': 'chat',
  'Workflow automation': 'flow', Guardrails: 'shield', 'Debugging AI features': 'bug',
  'Competitor research first': 'search', 'UI and UX design': 'layout', 'Frontend that loads fast': 'bolt',
  'Backend and APIs': 'code', 'Admin dashboards': 'chart', 'Web apps and SaaS': 'flag', 'Launch and care': 'shield',
  'SaaS and startups': 'flag', 'Online stores and DTC brands': 'cart', 'Service businesses': 'calc',
  'Tourism and hospitality': 'flag', 'Real estate and property services': 'layers', 'Healthcare and wellness practices': 'shield',
  'Logistics and delivery': 'flow', 'Education and training': 'cap', 'Fintech and payments': 'lock',
};
const byWord = [[/research|find|look|study/i, 'search'], [/design|ux|ui|screen/i, 'layout'], [/fast|speed|load|light/i, 'bolt'], [/api|backend|code|integrat|plugin/i, 'code'], [/dashboard|report|number|data|track/i, 'chart'], [/care|backup|monitor|secur|safe|clean|hack/i, 'shield'], [/pay|price|cost|money|quote|billing/i, 'calc'], [/store|shop|order|checkout/i, 'cart'], [/school|learn|train|teach/i, 'cap'], [/ai|agent|model|automat/i, 'bot'], [/account|role|permission|approv|log/i, 'lock'], [/launch|first version|start|sell/i, 'flag'], [/agenc|client|team|people|spreadsheet/i, 'chat'], [/site|page|market|website/i, 'image'], [/slow|down|error|break|broke|fail|quote months|judge/i, 'alert'], [/deadline|time|date|week/i, 'gauge'], [/doc|guide|help/i, 'book']];
export const iconKeyFor = (title) => {
  if (byTitle[title]) return byTitle[title];
  const hit = byWord.find(([re]) => re.test(title));
  return hit ? hit[1] : 'layers';
};
export const iconFor = (title) => icons[iconKeyFor(title)];
