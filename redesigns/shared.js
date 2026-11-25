// Shared data/helpers for the redesigns. Menu items come from the main site.
export { menu } from '../js/menu.js';

export const info = {
  address: ['Roeselaarsestraat 168/1', '8870 Izegem'],
  maps: 'https://www.google.com/maps/search/?api=1&query=Roeselaarsestraat%20168%2F1%2C%208870%20Izegem',
  phone: '051 24 05 42',
  tel: 'tel:+3251240542',
  email: 'ciao@nonnalucrezia.be',
};

// Opening hours per weekday (0 = Sunday). Times as "HH:MM".
export const schedule = {
  0: [['12:00', '14:00'], ['17:00', '21:00']],
  1: [],
  2: [],
  3: [['17:30', '21:00']],
  4: [['12:00', '14:00'], ['17:30', '21:00']],
  5: [['12:00', '14:00'], ['17:00', '21:30']],
  6: [['12:00', '14:00'], ['17:00', '21:30']],
};

export const hoursList = [
  ['Ma – Di', 'gesloten'],
  ['Wo', '17:30 – 21:00'],
  ['Do', '12:00 – 14:00 · 17:30 – 21:00'],
  ['Vr – Za', '12:00 – 14:00 · 17:00 – 21:30'],
  ['Zo', '12:00 – 14:00 · 17:00 – 21:00'],
];

const DAYS = ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'];
const mins = (t) => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };

// Returns { open: bool, text: "Nu open tot 21:00" / "Opent vandaag om 17:00" / "Opent woensdag om 17:30" }
export function openStatus(now = new Date()) {
  const d = now.getDay(), m = now.getHours() * 60 + now.getMinutes();
  for (const [a, b] of schedule[d]) {
    if (m >= mins(a) && m < mins(b)) return { open: true, text: `Nu open tot ${b}` };
    if (m < mins(a)) return { open: false, text: `Opent vandaag om ${a}` };
  }
  for (let i = 1; i <= 7; i++) {
    const nd = (d + i) % 7;
    if (schedule[nd].length) return { open: false, text: `Opent ${i === 1 ? 'morgen' : DAYS[nd]} om ${schedule[nd][0][0]}` };
  }
  return { open: false, text: '' };
}

export const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
export const price = (p) => (p === 'gratis' ? 'gratis' : `€${p}`);
