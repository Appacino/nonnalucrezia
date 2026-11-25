import { bannerSVG } from './banner.js';
import { menu } from './menu.js';

// Banner
document.getElementById('banner').innerHTML = bannerSVG;

// Menu
const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const price = (p) => (p === 'gratis' ? 'gratis' : `€${p}`);

document.getElementById('menu-grid').innerHTML = menu
  .map(({ cat, wide, items }) => `
    <div class="menu-card${wide ? ' wide' : ''}">
      <h3 class="label-caps">${esc(cat)}</h3>
      <ul>
        ${items.map(([name, desc, p]) => `
          <li>
            <div class="menu-line"><span>${esc(name)}</span><span class="dots"></span><span class="price">${price(p)}</span></div>
            ${desc ? `<p class="menu-desc">${esc(desc)}</p>` : ''}
          </li>`).join('')}
      </ul>
    </div>`)
  .join('');
