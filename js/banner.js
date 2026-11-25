// Top banner (vines, grapes, pizza sketch, wine glasses) drawn as SVG.
// Everything is generated from code; tweak positions/colours below.

const W = 1344, H = 496;

// ---------- helpers ----------
let seed = 7;
const rnd = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
const jit = (a) => (rnd() * 2 - 1) * a;
const f = (n) => Math.round(n * 10) / 10;
const pts = (arr) => arr.map(([x, y], i) => `${i ? 'L' : 'M'}${f(x)} ${f(y)}`).join('') + 'Z';

// Smooth closed path through points (Catmull-Rom -> cubic Bezier)
function smooth(p, closed = true) {
  const n = p.length, g = (i) => p[(i + n) % n];
  let d = `M${f(p[0][0])} ${f(p[0][1])}`;
  const last = closed ? n : n - 1;
  for (let i = 0; i < last; i++) {
    const p0 = closed ? g(i - 1) : p[Math.max(i - 1, 0)], p1 = g(i), p2 = g(i + 1);
    const p3 = closed ? g(i + 2) : p[Math.min(i + 2, n - 1)];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(p2[0])} ${f(p2[1])}`;
  }
  return closed ? d + 'Z' : d;
}

// ---------- vine leaf (stem at 0,0, hanging downward, ~100 tall) ----------
function leafPath() {
  const p = [];
  const N = 180;
  for (let i = 0; i < N; i++) {
    const t = (i / N) * Math.PI * 2;           // 0 = pointing down
    const lobes = 0.62 + 0.38 * Math.pow(Math.abs(Math.cos(2.5 * t)), 1.6);
    const teeth = 0.05 * Math.abs(Math.sin(t * 22));
    const notch = Math.exp(-Math.pow((Math.abs(t - Math.PI)) / 0.35, 2)) * 0.55; // sinus at stem
    const r = 50 * (lobes + teeth - notch);
    p.push([Math.sin(t) * r, 50 + Math.cos(t) * r]);
  }
  return pts(p);
}
function leafVeins() {
  const v = [];
  for (const a of [0, 1.25, -1.25, 2.45, -2.45]) {
    const L = a === 0 ? 45 : Math.abs(a) > 2 ? 28 : 40;
    v.push(`M0 50Q${f(Math.sin(a) * L * 0.5 + 3)} ${f(50 + Math.cos(a) * L * 0.5)} ${f(Math.sin(a) * L)} ${f(50 + Math.cos(a) * L)}`);
  }
  return v.join('') + 'M0 2L0 50';
}

// ---------- grape cluster ----------
function cluster(cx, top, scale = 1, tone = 'a') {
  const rows = [5, 6, 6, 5, 5, 4, 4, 3, 2, 1];
  const r = 8.2 * scale, out = [];
  out.push(`<path d="M${cx} ${top - 34 * scale}Q${cx + 6} ${top - 16 * scale} ${cx} ${top}" class="nl-stem"/>`);
  const grapes = [];
  rows.forEach((n, row) => {
    const y = top + row * r * 1.55;
    const sway = Math.sin(row * 0.6) * r * 0.5;
    for (let i = 0; i < n; i++) {
      const x = cx + sway + (i - (n - 1) / 2) * r * 1.75 + jit(r * 0.25);
      grapes.push([x, y + jit(r * 0.25), r * (0.92 + rnd() * 0.16)]);
    }
  });
  grapes.sort((a, b) => a[1] - b[1]);
  for (const [x, y, rr] of grapes) {
    out.push(`<circle cx="${f(x)}" cy="${f(y)}" r="${f(rr)}" fill="url(#nl-grape-${tone})"/>`);
    out.push(`<circle cx="${f(x - rr * 0.35)}" cy="${f(y - rr * 0.38)}" r="${f(rr * 0.22)}" fill="#fff" opacity=".35"/>`);
  }
  return out.join('');
}

const leaf = (x, y, s, rot, fill) =>
  `<use href="#nl-leaf" transform="translate(${x} ${y}) rotate(${rot}) scale(${s * 1.3})" fill="${fill}"/>`;

// ---------- pizza sketch ----------
export function pizza(cx, cy, R) {
  const ring = (r, wob) => {
    const p = [];
    for (let i = 0; i < 40; i++) {
      const t = (i / 40) * Math.PI * 2;
      const rr = r + Math.sin(t * 7) * wob + jit(wob * 0.6);
      p.push([cx + Math.cos(t) * rr, cy + Math.sin(t) * rr]);
    }
    return p;
  };
  const gap0 = -0.15, gap1 = 0.65; // removed slice (radians, 0 = right)
  const arcPts = (r, wob) => ring(r, wob).filter((_, i) => {
    const t = (i / 40) * Math.PI * 2; const tt = t > Math.PI ? t - 2 * Math.PI : t;
    return !(tt > gap0 && tt < gap1);
  });
  const out = [];
  // whole pizza (minus slice) as open strokes
  const outer = arcPts(R, 3.5), inner = arcPts(R * 0.83, 2.5);
  // rotate so open path starts after the gap
  const rot = (a) => { const k = a.findIndex(([x, y]) => Math.atan2(y - cy, x - cx) > gap1); return a.slice(k).concat(a.slice(0, k)); };
  out.push(`<path d="${smooth(rot(outer), false)}"/>`, `<path d="${smooth(rot(inner), false)}"/>`);
  // slice cuts
  for (const a of [gap0, gap1, 1.6, 2.5, 3.5, 4.4, 5.35]) {
    out.push(`<path d="M${f(cx + Math.cos(a) * 6)} ${f(cy + Math.sin(a) * 6)}L${f(cx + Math.cos(a) * R)} ${f(cy + Math.sin(a) * R)}"/>`);
  }
  // crust bubbles
  for (let i = 0; i < 18; i++) {
    const t = rnd() * Math.PI * 2; const tt = t > Math.PI ? t - 2 * Math.PI : t;
    if (tt > gap0 - 0.1 && tt < gap1 + 0.1) continue;
    const rr = R * 0.915;
    out.push(`<ellipse cx="${f(cx + Math.cos(t) * rr)}" cy="${f(cy + Math.sin(t) * rr)}" rx="${f(4 + rnd() * 4)}" ry="3" transform="rotate(${f(t * 57.3 + 90)} ${f(cx + Math.cos(t) * rr)} ${f(cy + Math.sin(t) * rr)})"/>`);
  }
  // toppings: basil leaves + mozzarella
  const basil = (x, y, a, s = 1) =>
    `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(a)}) scale(${s})"><path d="M-14 0Q0 -11 14 0Q0 11 -14 0Z" class="nl-basil"/><path d="M-12 0L12 0M-4 0L0 -5M3 0L7 -4M-4 0L0 5M3 0L7 4"/></g>`;
  const mozz = (x, y, r) => `<path d="${smooth(Array.from({ length: 8 }, (_, i) => { const t = i / 8 * Math.PI * 2; const q = r + jit(r * 0.3); return [x + Math.cos(t) * q, y + Math.sin(t) * q]; }))}"/>`;
  [[-40, -45, 30], [10, -60, -20], [-55, 10, 70], [-15, 45, 10], [35, 55, -40], [-20, -10, 120]].forEach(([dx, dy, a]) => out.push(basil(cx + dx, cy + dy, a)));
  [[15, -25, 9], [-50, -20, 7], [-35, 50, 8], [25, 25, 7], [-10, 15, 6]].forEach(([dx, dy, r]) => out.push(mozz(cx + dx, cy + dy, r)));
  // loose slice, pulled out to the lower right
  const sx = 42, sy = 22, sl = [];
  sl.push(`M${f(cx + sx)} ${f(cy + sy)}`);
  for (let i = 0; i <= 8; i++) { const t = gap0 + (gap1 - gap0) * i / 8; sl.push(`L${f(cx + sx + Math.cos(t) * (R + jit(2)))} ${f(cy + sy + Math.sin(t) * (R + jit(2)))}`); }
  sl.push('Z');
  out.push(`<path d="${sl.join('')}" class="nl-slice"/>`);
  let inn = `M${f(cx + sx + Math.cos(gap0) * R * 0.83)} ${f(cy + sy + Math.sin(gap0) * R * 0.83)}`;
  for (let i = 1; i <= 8; i++) { const t = gap0 + (gap1 - gap0) * i / 8; inn += `L${f(cx + sx + Math.cos(t) * R * 0.83)} ${f(cy + sy + Math.sin(t) * R * 0.83)}`; }
  out.push(`<path d="${inn}"/>`);
  out.push(basil(cx + sx + 55, cy + sy + 18, 20, 0.9), mozz(cx + sx + 30, cy + sy + 8, 6));
  return `<g class="nl-ink">${out.join('')}</g>`;
}

// ---------- wine glass (origin at base center) ----------
function glass(x, y, rot, wine) {
  const bowl = 'M-17 -112C-20 -85 -16 -62 0 -55C16 -62 20 -85 17 -112Z';
  const fill = 'M-18.6 -92C-17 -72 -12 -61 0 -57C12 -61 17 -72 18.6 -92Z';
  return `<g transform="translate(${x} ${y}) rotate(${rot})">
<path d="${fill}" fill="${wine}" opacity=".92"/>
<path d="${bowl}" fill="#fff" fill-opacity=".18" stroke="#e9ece6" stroke-width="1.6"/>
<path d="M-12 -104C-14 -88 -12 -74 -6 -66" stroke="#fff" stroke-opacity=".7" stroke-width="2" fill="none" stroke-linecap="round"/>
<path d="M0 -55L0 -4" stroke="#e9ece6" stroke-width="2.4"/>
<ellipse cx="0" cy="-2" rx="14" ry="3.5" fill="#e9ece6" fill-opacity=".6" stroke="#e9ece6" stroke-width="1.4"/>
</g>`;
}

// ---------- compose ----------
const vine1 = smooth([[-10, 40], [120, 30], [260, 12], [420, 20], [520, 6], [640, 18], [760, 14], [900, 4], [1000, 10], [1100, 32], [1240, 48], [1360, 46]], false);
const vine2 = smooth([[-10, 4], [90, 16], [180, 8], [300, 30], [380, 12], [470, 0]], false);
const vine3 = smooth([[1000, 0], [1080, 26], [1180, 38], [1300, 30], [1360, 36]], false);
const tendril = (x, y, s = 1) => `<path d="M${x} ${y}c${4 * s} 10 ${14 * s} 12 ${16 * s} 4s-6 -10 -10 -4s2 10 8 8" class="nl-tendril"/>`;

const greens = ['#4d6b4a', '#5f7d55', '#6f8a63', '#41603f'];
const pales = ['#b8c4b2', '#c9d1c2', '#a9b59f'];
const browns = ['#8c7a4f', '#7d7346'];

const backLeaves = [
  leaf(205, 10, 0.9, 10, pales[0]), leaf(330, 22, 0.75, -15, greens[1]), leaf(560, 0, 0.8, 5, greens[0]),
  leaf(700, 8, 0.95, -5, greens[3]), leaf(905, 6, 0.85, 20, pales[1]), leaf(1100, 10, 0.95, -10, pales[2]),
  leaf(1215, 18, 0.7, 15, browns[0]), leaf(1300, 0, 0.6, -25, pales[0]), leaf(30, -8, 0.6, -20, pales[1]),
  leaf(985, 30, 0.7, -30, greens[2]),
].join('');
const clusters = [
  cluster(115, 92, 1.05, 'a'), cluster(330, 58, 0.95, 'b'), cluster(495, 66, 1.05, 'a'),
  cluster(615, 20, 1, 'c'), cluster(818, 56, 1, 'a'), cluster(1012, 86, 1.1, 'c'),
  cluster(1232, 98, 1, 'a'),
].join('');
const frontLeaves = [
  leaf(205, 70, 0.95, 25, browns[0]), leaf(400, 30, 0.85, 15, browns[1]), leaf(712, 10, 0.9, 0, greens[0]),
  leaf(905, 30, 0.85, -10, browns[0]), leaf(1150, 68, 1, 10, pales[2]), leaf(965, 40, 0.65, 40, greens[3]),
  leaf(1110, 60, 0.6, -40, greens[1]),
].join('');

export const bannerSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="Nonna Lucrezia — Napolitaanse pizza, lekkere hapjes en wijn" style="display:block;height:auto">
<defs>
<radialGradient id="nl-grape-a" cx=".35" cy=".3" r=".75"><stop offset="0" stop-color="#8a8fb8"/><stop offset=".55" stop-color="#4b4f7c"/><stop offset="1" stop-color="#262849"/></radialGradient>
<radialGradient id="nl-grape-b" cx=".35" cy=".3" r=".75"><stop offset="0" stop-color="#9aa0bf"/><stop offset=".55" stop-color="#5a5f86"/><stop offset="1" stop-color="#33365a"/></radialGradient>
<radialGradient id="nl-grape-c" cx=".35" cy=".3" r=".75"><stop offset="0" stop-color="#7c6f9e"/><stop offset=".55" stop-color="#3f3563"/><stop offset="1" stop-color="#1f1a38"/></radialGradient>
<g id="nl-leaf"><path d="${leafPath()}"/><path d="${leafVeins()}" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="1.6"/></g>
<style>
.nl-stem,.nl-vine{fill:none;stroke:#8b6a45;stroke-linecap:round}
.nl-stem{stroke-width:2.5}.nl-vine{stroke-width:4}
.nl-tendril{fill:none;stroke:#8b6a45;stroke-width:1.4}
.nl-ink{fill:none;stroke:#2f4d3b;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
.nl-ink .nl-basil{fill:#2f4d3b;fill-opacity:.12}
.nl-ink .nl-slice{fill:#2f4d3b;fill-opacity:.06}
</style>
</defs>
<g class="nl-vines"><path d="${vine2}" class="nl-vine"/><path d="${vine3}" class="nl-vine"/><path d="${vine1}" class="nl-vine"/>
${tendril(70, 34)}${tendril(450, 18, -1)}${tendril(780, 14)}${tendril(1270, 46, -1)}${tendril(1060, 22)}</g>
<g class="nl-leaves-back">${backLeaves}</g>
<g class="nl-grapes">${clusters}</g>
<g class="nl-leaves-front">${frontLeaves}</g>
${pizza(278, 306, 108)}
<text x="688" y="258" text-anchor="middle" font-family="'Great Vibes',cursive" font-size="86" fill="#2c4a37">Nonna Lucrezia</text>
<path d="M458 284H918" stroke="#2c4a37" stroke-width="1.5"/>
<g font-family="'Josefin Sans',sans-serif" font-weight="600" font-size="16.5" letter-spacing="2.2" fill="#f4f1e6" text-anchor="middle">
<text x="672" y="322">NAPOLITAANSE PIZZA, LEKKERE HAPJES EN</text>
<text x="672" y="349">WIJN VAN NONNA LUCREZIA</text>
</g>
<g class="nl-wine">${glass(984, 398, -18, '#9b1c30')}${glass(1044, 376, 16, '#e7d58f')}
<path d="M1008 288C1014 270 1026 262 1032 272" fill="none" stroke="#e7d58f" stroke-width="3" stroke-linecap="round"/>
<circle cx="1018" cy="262" r="2.6" fill="#e7d58f"/><circle cx="1028" cy="256" r="1.8" fill="#e7d58f"/><circle cx="1004" cy="270" r="2" fill="#b0263c"/></g>
</svg>`;
