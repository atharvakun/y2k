/* ===========================================================
   RAINBOW.EXE — main.js
   boot · cursor · window manager · products · bag · motion
   =========================================================== */
(() => {
'use strict';

const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const rand = (a, b) => a + Math.random() * (b - a);
const pick = arr => arr[Math.floor(Math.random() * arr.length)];
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
const FINE = matchMedia('(pointer: fine)').matches;
const HAS_GSAP = !!window.gsap;
const Q = new URLSearchParams(location.search);
if (HAS_GSAP && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
if (HAS_GSAP && Q.has('still')) gsap.globalTimeline.timeScale(40); // dev: fast-forward for screenshots
const fmt = n => '₹' + n.toLocaleString('en-IN');
const esc = s => String(s).replace(/[<>&"]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c]));

/* ---------------- terminal log ---------------- */
const term = $('#term');
function log(msg, cls = '') {
  if (!term) return;
  const d = new Date(), p = n => String(n).padStart(2, '0');
  const ln = document.createElement('div');
  ln.className = 'ln ' + cls;
  ln.innerHTML = `<span class="ts">[${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}]</span> ${esc(msg)}`;
  term.appendChild(ln);
  while (term.children.length > 60) term.firstChild.remove();
  term.scrollTop = term.scrollHeight;
}

/* ---------------- garments: technical wireframes ---------------- */
let uid = 0;
function garment(type, hue = '#C6FF3D', opts = {}) {
  const id = ++uid;
  const sw = opts.stroke || 1.6;
  const defs = `<defs>
    <linearGradient id="h${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ffffff" stop-opacity=".55"/><stop offset=".35" stop-color="${hue}" stop-opacity=".55"/>
      <stop offset=".6" stop-color="#ffffff" stop-opacity=".5"/><stop offset="1" stop-color="${hue}" stop-opacity=".45"/>
    </linearGradient></defs>`;
  const F = `fill="url(#h${id})" fill-opacity=".28" stroke="#EDEDF0" stroke-width="${sw}" stroke-linejoin="round" vector-effect="non-scaling-stroke"`;
  const L = `fill="none" stroke="#EDEDF0" stroke-width="${sw}" stroke-linecap="round" vector-effect="non-scaling-stroke"`;
  const D = `fill="none" stroke="${hue}" stroke-width="1" stroke-dasharray="3 3" vector-effect="non-scaling-stroke"`;
  const shapes = {
    tee: `<path d="M40 42 L78 24 Q100 42 122 24 L160 42 L186 76 L156 94 L152 180 L48 180 L44 94 L14 76 Z" ${F}/>
          <path d="M78 24 Q100 50 122 24" ${L}/><path d="M48 150 H152" ${D}/><path d="M60 98 H140" ${D}/>`,
    babytee: `<path d="M50 50 L82 36 Q100 50 118 36 L150 50 L172 76 L146 90 L142 136 L58 136 L54 90 L28 76 Z" ${F}/>
          <path d="M82 36 Q100 58 118 36" ${L}/><path d="M64 126 H136" ${D}/>`,
    cargo: `<path d="M58 22 H142 L150 182 H108 L100 104 L92 182 H50 Z" ${F}/>
          <rect x="60" y="90" width="26" height="30" ${L}/><rect x="114" y="90" width="26" height="30" ${L}/>
          <line x1="58" y1="36" x2="142" y2="36" ${L}/><path d="M100 36 V104" ${D}/><circle cx="100" cy="29" r="2.5" fill="${hue}"/>`,
    hoodie: `<ellipse cx="100" cy="42" rx="34" ry="24" ${F}/>
          <path d="M36 60 L74 44 Q100 60 126 44 L164 60 L190 96 L160 110 L156 184 L44 184 L40 110 L10 96 Z" ${F}/>
          <rect x="74" y="130" width="52" height="34" ${L}/><line x1="92" y1="62" x2="92" y2="94" ${L}/><line x1="108" y1="62" x2="108" y2="94" ${L}/>
          <path d="M44 170 H156" ${D}/>`,
    visor: `<path d="M30 110 Q100 60 170 110 L170 124 Q100 80 30 124 Z" ${F}/>
          <path d="M20 118 Q100 150 180 118 L186 132 Q100 172 14 132 Z" ${F}/><path d="M40 122 Q100 100 160 122" ${D}/>`,
    skirt: `<path d="M62 40 H138 L172 164 H28 Z" ${F}/>
          <g ${L}><line x1="80" y1="40" x2="62" y2="164"/><line x1="100" y1="40" x2="100" y2="164"/><line x1="120" y1="40" x2="138" y2="164"/></g>
          <rect x="58" y="32" width="84" height="12" fill="#EDEDF0"/><path d="M36 150 H164" ${D}/>`,
    bag: `<path d="M60 72 Q100 36 140 72" ${L}/>
          <rect x="24" y="80" width="152" height="80" rx="40" ${F}/>
          <circle cx="100" cy="120" r="9" ${L}/><circle cx="100" cy="120" r="3" fill="${hue}"/><path d="M40 120 H84 M116 120 H160" ${D}/>`,
    jacket: `<path d="M34 50 L76 30 Q100 46 124 30 L166 50 L192 92 L162 106 L158 184 L42 184 L38 106 L8 92 Z" ${F}/>
          <g ${L}><path d="M42 80 H158 M42 110 H158 M42 140 H158 M42 165 H158"/></g>
          <path d="M100 46 V184" ${D}/>`
  };
  return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${defs}${shapes[type] || shapes.tee}
    <path d="M8 8 H20 M8 8 V20 M192 192 H180 M192 192 V180" ${L}/></svg>`;
}

/* ---------------- products ---------------- */
const PRODUCTS = [
  { id: 1, sku: 'RB-001', name: 'RAINBOW.EXE', kind: 'Baby Tee', type: 'babytee', price: 1499, tier: 'Silver', hue: '#F28A94',
    mat: '100% deadstock cotton', fit: 'Cropped / slim', wt: '140 g', blurb: 'Ringer neck, pre-millennium cotton. Fits like a popup: small and impossible to ignore.' },
  { id: 2, sku: 'RB-002', name: 'Floor Plan', kind: 'Cargo Pants', type: 'cargo', price: 3299, tier: 'Gold', hue: '#93CF86',
    mat: 'Ripstop nylon', fit: 'Relaxed / low-rise', wt: '620 g', blurb: '2BHK of pockets. Carpet area: your whole personality.' },
  { id: 3, sku: 'RB-003', name: 'Highpoint', kind: 'Zip Hoodie', type: 'hoodie', price: 3999, tier: 'Platinum', hue: '#8F8BE0',
    mat: '480 gsm loopback', fit: 'Oversized', wt: '900 g', blurb: 'Hood big enough to live in. Advanced MIVAN construction (we googled it).' },
  { id: 4, sku: 'RB-004', name: 'Skyline', kind: 'Chrome Visor', type: 'visor', price: 999, tier: 'Silver', hue: '#79BDEB',
    mat: 'Mirror PC lens', fit: 'One size', wt: '60 g', blurb: 'See the city. Let the city see you back.' },
  { id: 5, sku: 'RB-005', name: 'Seven Stripes', kind: 'Pleated Mini', type: 'skirt', price: 1999, tier: 'Gold', hue: '#EACB6E',
    mat: 'Poly twill', fit: 'Mid-rise', wt: '260 g', blurb: 'Pleated like a brochure spread. Every stripe hand-matched.' },
  { id: 6, sku: 'RB-006', name: 'Moon Phase', kind: 'Puffer Jacket', type: 'jacket', price: 5499, tier: 'Diamond', hue: '#B98BD1',
    mat: 'Recycled down / nylon', fit: 'Boxy', wt: '1.1 kg', blurb: 'Quilted in seven horizontal storeys. Weatherproof vibes.' },
  { id: 7, sku: 'RB-007', name: 'Artistic Impression', kind: 'Baguette Bag', type: 'bag', price: 2499, tier: 'Platinum', hue: '#F29A6B',
    mat: 'Liquid-chrome PU', fit: 'Shoulder', wt: '310 g', blurb: 'Shown for representation purposes only. The real one is cuter.' },
  { id: 8, sku: 'RB-008', name: 'Rise Naturally', kind: 'Ringer Tee', type: 'tee', price: 1299, tier: 'Silver', hue: '#93CF86',
    mat: '100% organic cotton', fit: 'Regular', wt: '180 g', blurb: 'Giant type across the chest. Readable from the 37th floor.' }
];
const SIZES = ['XS', 'S', 'M', 'L', 'XL', '2K'];

/* ---------------- window manager ---------------- */
const layer = $('#winLayer');
const wins = new Set();
let zTop = 1000, cascade = 0, spawned = 0;
const MAX_WINS = 16;
const winCountEl = $('#winCount'), winTotalEl = $('#winTotal');

function updateCount() { winCountEl.textContent = wins.size; winTotalEl.textContent = spawned; }
function focusWin(el) { wins.forEach(w => w.classList.remove('focus')); el.classList.add('focus'); el.style.zIndex = ++zTop; }
function closeWin(el) {
  if (!wins.has(el)) return;
  wins.delete(el); updateCount();
  if (HAS_GSAP && !RM) gsap.to(el, { scale: .92, opacity: 0, duration: .18, ease: 'power2.in', onComplete: () => el.remove() });
  else el.remove();
}
function closeAll() { [...wins].forEach(closeWin); if (wins.size === 0) cascade = 0; }

function makeWin({ title = 'window.exe', html = '', color, x, y, w, actions = [], ttl, scatter = false } = {}) {
  if (wins.size >= MAX_WINS) closeWin(wins.values().next().value);
  const el = document.createElement('div');
  el.className = 'win';
  if (color) el.style.setProperty('--wc', color);
  if (w) el.style.width = Math.min(w, innerWidth - 16) + 'px';
  el.innerHTML = `
    <div class="win-bar"><span class="t">${esc(title)}</span><span class="b m" title="minimise"></span><span class="b x" title="close"></span></div>
    <div class="win-body">${html}${actions.length ? '<div class="win-actions"></div>' : ''}</div>`;
  layer.appendChild(el);
  const ww = el.offsetWidth, wh = el.offsetHeight;
  let px, py;
  if (x != null && y != null) { px = x; py = y; }
  else if (scatter) { px = rand(16, innerWidth - ww - 16); py = rand(70, innerHeight - wh - 16); }
  else { const k = cascade++ % 7; px = innerWidth / 2 - ww / 2 + (k - 3) * 34; py = Math.max(72, innerHeight / 2 - wh / 2 + (k - 3) * 28); }
  el.style.left = Math.max(6, Math.min(px, innerWidth - ww - 6)) + 'px';
  el.style.top  = Math.max(6, Math.min(py, innerHeight - wh - 6)) + 'px';

  const act = $('.win-actions', el);
  actions.forEach(a => {
    const b = document.createElement('button');
    b.className = 'btn btn-sm ' + (a.cls || '');
    b.textContent = a.label; b.dataset.hover = '';
    b.addEventListener('click', ev => { ev.stopPropagation(); const r = a.fn && a.fn(el); if (r !== false) closeWin(el); });
    act.appendChild(b);
  });
  $('.x', el).addEventListener('click', () => { closeWin(el); log(`closed ${title}`); });
  $('.m', el).addEventListener('click', () => { const b = $('.win-body', el); b.style.display = b.style.display === 'none' ? '' : 'none'; });
  el.addEventListener('pointerdown', () => focusWin(el));
  enableDrag(el, $('.win-bar', el));

  wins.add(el); spawned++; focusWin(el); updateCount();
  log(`opened ${title}`);
  if (HAS_GSAP && !RM) gsap.from(el, { scale: .9, opacity: 0, y: 12, duration: .35, ease: 'expo.out' });
  if (ttl) setTimeout(() => closeWin(el), ttl);
  return el;
}

function enableDrag(el, handle) {
  handle.addEventListener('pointerdown', e => {
    if (e.target.closest('.b')) return;
    const r = el.getBoundingClientRect();
    const ox = r.left - e.clientX, oy = r.top - e.clientY;
    handle.setPointerCapture(e.pointerId);
    const move = ev => {
      el.style.left = Math.max(-r.width + 80, Math.min(ev.clientX + ox, innerWidth - 80)) + 'px';
      el.style.top  = Math.max(0, Math.min(ev.clientY + oy, innerHeight - 34)) + 'px';
    };
    const up = () => { handle.removeEventListener('pointermove', move); handle.removeEventListener('pointerup', up); handle.removeEventListener('pointercancel', up); };
    handle.addEventListener('pointermove', move);
    handle.addEventListener('pointerup', up);
    handle.addEventListener('pointercancel', up);
  });
}

/* ---------------- bag ---------------- */
const bag = [];
const bagCountEl = $('#bagCount'), bagStatEl = $('#bagStat'), bagBtn = $('#bagBtn');
const bagTotal = () => bag.reduce((s, i) => s + i.p.price, 0);
function renderBag() {
  bagCountEl.textContent = bag.length; bagStatEl.textContent = bag.length;
  bagBtn.classList.remove('pulse'); void bagBtn.offsetWidth; bagBtn.classList.add('pulse');
}
function addToBag(p, size = 'M') {
  bag.push({ p, size }); renderBag();
  log(`+ bag: ${p.name} (${size}) ${fmt(p.price)}`);
  makeWin({ title: 'added.exe', color: p.hue, w: 300, ttl: 2200, x: innerWidth - 316, y: innerHeight - 140,
    html: `<p class="meta">added to bag</p><p><b>${esc(p.name)}</b> · ${size} · ${fmt(p.price)}</p>` });
  const open = $('#bagWin'); if (open) { open.remove(); wins.delete(open); showBag(); }
}
function showBag() {
  const ex = $('#bagWin'); if (ex) { focusWin(ex); return; }
  const list = bag.length
    ? `<ul class="bag-list">${bag.map((i, k) => `<li><span>${esc(i.p.name)} <span class="muted">/ ${i.size}</span></span><span>${fmt(i.p.price)} <button data-rm="${k}" title="remove">×</button></span></li>`).join('')}</ul>`
    : `<p class="fine">Bag is empty. Like the year 2000: full of potential.</p>`;
  const el = makeWin({ title: 'bag.exe', w: 380, x: innerWidth - 396, y: 70,
    html: `<h4>Your Bag</h4>${list}<div class="bag-total"><span>TOTAL</span><span>${fmt(bagTotal())}</span></div>`,
    actions: [{ label: 'CHECKOUT →', cls: 'btn-lime', fn: () => checkout() }, { label: 'KEEP SHOPPING' }] });
  el.id = 'bagWin';
  $$('[data-rm]', el).forEach(b => b.addEventListener('click', () => { bag.splice(+b.dataset.rm, 1); renderBag(); el.remove(); wins.delete(el); updateCount(); showBag(); }));
}
function checkout() {
  if (!bag.length) { makeWin({ title: 'error.exe', color: '#FF3DB5', html: `<div class="err"><span class="ico">!</span><p>Cannot checkout an empty bag.<br><span class="fine">Error 0x2000-NO-DRIP</span></p></div>`, actions: [{ label: 'OK' }] }); log('checkout failed: empty bag', 'err'); return; }
  makeWin({ title: 'checkout.exe', w: 400,
    html: `<h4>Payment Portal 2000</h4><p class="meta">total ${fmt(bagTotal())}</p>
      <input value="✦✦✦✦ ✦✦✦✦ ✦✦✦✦ ✦✦✦✦" readonly>
      <p class="fine">Demo site. No money moves. Your fits remain theoretical, like most of Y2K.</p>`,
    actions: [{ label: 'PAY', cls: 'btn-lime', fn: () => { const n = bag.length; bag.length = 0; renderBag(); log(`paid for ${n} item(s). ship date: 3–5 business millennia`);
      makeWin({ title: 'thankyou.exe', color: '#C6FF3D', html: `<p class="big">Thank <i>you.</i></p><p>Order ships from the 37th floor in 3–5 business millennia.</p>`, actions: [{ label: 'NICE' }] }); } }] });
}
bagBtn.addEventListener('click', showBag);

/* ---------------- product windows + grid ---------------- */
function productWin(p) {
  let size = 'M';
  const el = makeWin({ title: `${p.sku.toLowerCase()}_${p.type}.exe`, color: p.hue, w: 420,
    html: `<div class="art">${garment(p.type, p.hue)}</div>
      <h4>${esc(p.name)}</h4><p class="meta">${esc(p.kind)} · ${p.sku} · <span class="tag ${p.tier}">${p.tier}</span></p>
      <p>${esc(p.blurb)}</p>
      <dl class="spec"><div><dt>MATERIAL</dt><dd>${esc(p.mat)}</dd></div><div><dt>FIT</dt><dd>${esc(p.fit)}</dd></div><div><dt>WEIGHT</dt><dd>${p.wt}</dd></div><div><dt>ORIGIN</dt><dd>Pune → World</dd></div></dl>
      <div class="sizes">${SIZES.map(s => `<button class="size ${s === 'M' ? 'on' : ''}" data-s="${s}" data-hover>${s}</button>`).join('')}</div>
      <div class="price-l">${fmt(p.price)}</div>`,
    actions: [{ label: 'ADD TO BAG', cls: 'btn-lime', fn: () => { addToBag(p, size); return false; } }, { label: 'CLOSE' }] });
  $$('.size', el).forEach(b => b.addEventListener('click', () => { $$('.size', el).forEach(o => o.classList.remove('on')); b.classList.add('on'); size = b.dataset.s; }));
  return el;
}

const grid = $('#grid');
PRODUCTS.forEach((p, i) => {
  const card = document.createElement('article');
  card.className = 'card'; card.dataset.tier = p.tier;
  card.innerHTML = `
    <div class="top"><span>${p.sku}</span><span>0${i + 1} / 08</span></div>
    <div class="art" data-hover>${garment(p.type, p.hue)}</div>
    <div><h3 class="name">${esc(p.name)}</h3><p class="kind">${esc(p.kind)} · <span class="tag ${p.tier}">${p.tier}</span></p></div>
    <div class="bottom"><span class="price">${fmt(p.price)}</span>
      <div class="acts"><button class="btn btn-sm view" data-hover>DOSSIER</button><button class="btn btn-sm btn-lime add" data-hover>+ BAG</button></div></div>`;
  grid.appendChild(card);
  $('.art', card).addEventListener('click', () => productWin(p));
  $('.view', card).addEventListener('click', () => productWin(p));
  $('.add', card).addEventListener('click', () => addToBag(p));
});

$('#filters').addEventListener('click', e => {
  const b = e.target.closest('.chip'); if (!b) return;
  $$('.chip').forEach(c => c.classList.toggle('on', c === b));
  const f = b.dataset.f;
  $$('.card').forEach(c => c.classList.toggle('hide', f !== 'all' && c.dataset.tier !== f));
  log(`filter: ${f}`);
  if (HAS_GSAP) { gsap.fromTo('.card:not(.hide)', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .5, stagger: .05, ease: 'expo.out', overwrite: 'auto' }); ScrollTrigger.refresh(); }
});

/* ---------------- popup library ---------------- */
let storm = false;
const POPS = [
  o => makeWin({ ...o, title: 'visitor.exe', color: '#EACB6E', w: 340,
    html: `<p class="big">1,000,000<i>th</i></p><p>You are our one-millionth visitor. Claim your butterfly clip before the millennium ends.</p>`,
    actions: [{ label: 'CLAIM', cls: 'btn-lime', fn: () => productWin(pick(PRODUCTS)) }, { label: 'NO THX' }] }),
  o => { const p = pick(PRODUCTS); makeWin({ ...o, title: 'nearby.exe', color: p.hue, w: 340,
    html: `<div class="art">${garment(p.type, p.hue)}</div><h4>${esc(p.name)}</h4><p class="meta">${esc(p.kind)} · 0.3 km away</p><p>Wants to meet you.</p>`,
    actions: [{ label: 'DOSSIER', cls: 'btn-lime', fn: () => productWin(p) }, { label: 'IGNORE' }] }); },
  o => makeWin({ ...o, title: 'horoscope.exe', color: '#8F8BE0', w: 340,
    html: `<h4>Forecast</h4><p>Mercury is in low-rise. Avoid beige. Wear a zipper that goes nowhere.</p><p class="fine">Lucky stripe: ${pick(['lilac', 'periwinkle', 'sky', 'green', 'yellow', 'peach', 'coral'])}</p>`,
    actions: [{ label: 'NOTED' }] }),
  o => makeWin({ ...o, title: 'download.exe', color: '#79BDEB', w: 340,
    html: `<div class="err"><span class="ico">↓</span><p>Your outfit is running low on RAM.<br>Download more RAM?</p></div>`,
    actions: [{ label: 'YES', cls: 'btn-lime', fn: () => makeWin({ title: 'ram.exe', html: `<p>Downloading RAM… <b>2000%</b></p><p class="fine">Please wait 2000 years.</p>`, actions: [{ label: 'OK' }] }) }, { label: 'ALSO YES', fn: () => makeWin({ title: 'ram.exe', html: `<p>Both buttons do the same thing. Welcome to 2000.</p>`, actions: [{ label: 'OK' }] }) }] }),
  o => makeWin({ ...o, title: 'warning.exe', color: '#F29A6B', w: 340,
    html: `<div class="err"><span class="ico">!</span><p><b>WARNING:</b> this outfit may cause compliments, double-takes and at least one "where did you get that".</p></div>`,
    actions: [{ label: 'ACCEPT' }] }),
  o => { const el = makeWin({ ...o, title: 'password.exe', w: 340,
    html: `<h4>Restricted</h4><p>Enter the password for 20% off.</p><input id="pw" placeholder="hint: it's the year" autocomplete="off"><p class="fine" id="pwMsg">&nbsp;</p>`,
    actions: [{ label: 'ENTER', cls: 'btn-lime', fn: w => { const v = $('#pw', w).value.trim();
      if (v === '2000' || v.toLowerCase() === 'y2k') { log('access granted: code Y2K20'); makeWin({ title: 'access.exe', color: '#C6FF3D', html: `<p class="big">ACCESS <i>granted</i></p><p>Code <b>Y2K20</b>. Screenshot it; nothing is saved anywhere.</p>`, actions: [{ label: 'NICE' }] }); return true; }
      $('#pwMsg', w).textContent = 'ACCESS DENIED. try "2000".'; log('access denied', 'err'); return false; } }, { label: 'CANCEL' }] });
    setTimeout(() => $('#pw', el)?.focus(), 80); },
  o => makeWin({ ...o, title: 'tip.exe', color: '#93CF86', w: 320, html: `<p><b>Tip:</b> every window is draggable. Build a little city.</p>`, actions: [{ label: 'COOL' }] })
];
function errorPop(o = {}) {
  return makeWin({ ...o, title: 'rainbow.exe — not responding', color: '#FF3DB5', w: 340,
    html: `<div class="err"><span class="ico">×</span><p><b>RAINBOW.EXE has stopped responding.</b><br>Reason: the drip is too strong.</p></div>`,
    actions: [{ label: 'OK', cls: 'btn-lime', fn: w => { if (storm && wins.size < MAX_WINS - 1) { const r = w.getBoundingClientRect(); errorPop({ x: r.left + 30, y: r.top + 30 }); errorPop({ x: r.left - 30, y: r.top + 60 }); } } },
              { label: 'CANCEL', fn: () => { if (storm) errorPop({ scatter: true }); } }] });
}
const randomPop = (o = {}) => pick(POPS)(o);
function unleash() {
  storm = true; log('storm: spawning 7 windows');
  for (let i = 0; i < 7; i++) setTimeout(() => (i % 3 === 2 ? errorPop({ scatter: true }) : randomPop({ scatter: true })), i * 120);
}
$('#spawnOne').addEventListener('click', () => randomPop());
$('#spawnStorm').addEventListener('click', unleash);
$('#heroPop').addEventListener('click', () => { for (let i = 0; i < 3; i++) setTimeout(() => randomPop(), i * 140); });
$('#closeAll').addEventListener('click', () => { storm = false; closeAll(); log('closed all windows'); });
addEventListener('keydown', e => { if (e.key === 'Escape') { storm = false; closeAll(); } });

/* ---------------- tiers / guestbook ---------------- */
$$('.tier-btn').forEach(b => b.addEventListener('click', () => {
  const t = b.closest('.tier').dataset.tier;
  const hue = { Silver: '#cfd3d9', Gold: '#EACB6E', Platinum: '#8F8BE0', Diamond: '#B98BD1' }[t];
  log(`tier join: ${t}`);
  makeWin({ title: `welcome_${t.toLowerCase()}.exe`, color: hue, w: 360,
    html: `<p class="big">Welcome to <i>${t}.</i></p><p>Your walk-in wardrobe is under construction. Possession: Y2K+27, subject to vibes and monsoon.</p>`,
    actions: [{ label: 'MOVE IN', cls: 'btn-lime' }] });
}));
$('#guestbook').addEventListener('submit', e => {
  e.preventDefault();
  const name = $('#gbName').value.trim() || 'stranger';
  log(`guestbook signed by ${name}`);
  makeWin({ title: 'guestbook.exe', color: '#B98BD1', w: 340,
    html: `<p class="big">Thanks, <i>${esc(name)}.</i></p><p>You are family #6,001. A butterfly clip is on its way, emotionally.</p>`, actions: [{ label: '♥' }] });
  e.target.reset();
});

/* ---------------- smooth anchors ---------------- */
document.addEventListener('click', e => {
  const a = e.target.closest('a[href^="#"]'); if (!a) return;
  const t = document.querySelector(a.getAttribute('href')); if (!t) return;
  e.preventDefault();
  scrollTo({ top: t.getBoundingClientRect().top + scrollY - 60, behavior: RM ? 'instant' : 'smooth' });
});

/* ---------------- clock + hit counter ---------------- */
const clock = $('#clock');
const tick = () => { const d = new Date(), p = n => String(n).padStart(2, '0'); clock.textContent = `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())} / ${p(d.getDate())}.${p(d.getMonth() + 1)}.2000`; };
tick(); setInterval(tick, 1000);
const hit = $('#hitCounter'); let hits = 137420 + Math.floor(rand(0, 400));
(function bump() { hits += Math.floor(rand(1, 4)); hit.textContent = String(hits).padStart(9, '0'); setTimeout(bump, rand(2500, 7000)); })();

/* ---------------- custom cursor ---------------- */
if (FINE && !RM) {
  document.documentElement.classList.add('fine');
  const cur = $('#cur'), ring = $('#curRing');
  let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
  addEventListener('pointermove', e => { mx = e.clientX; my = e.clientY; cur.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`; }, { passive: true });
  (function loop() { rx += (mx - rx) * .18; ry += (my - ry) * .18; ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`; requestAnimationFrame(loop); })();
  document.addEventListener('pointerover', e => { if (e.target.closest('a,button,[data-hover],.win-bar,input')) ring.classList.add('hov'); });
  document.addEventListener('pointerout', e => { if (e.target.closest('a,button,[data-hover],.win-bar,input')) ring.classList.remove('hov'); });
  document.addEventListener('mouseleave', () => { cur.style.opacity = 0; ring.style.opacity = 0; });
  document.addEventListener('mouseenter', () => { cur.style.opacity = 1; ring.style.opacity = 1; });
}

/* ---------------- motion ---------------- */
function initMotion() {
  if (!HAS_GSAP) {
    $$('.rv,.card,.hero-title .w').forEach(el => { el.style.opacity = 1; el.style.transform = 'none'; });
    $$('[data-count]').forEach(el => el.textContent = el.dataset.count.padStart(el.textContent.length, '0'));
    return;
  }
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
  tl.to('.hero-title .w', { y: 0, duration: 1.2, stagger: .12 }, 0)
    .from('.hero-meta span', { opacity: 0, y: 10, duration: .6, stagger: .06 }, .1)
    .from('.orb-wrap', { scale: .6, opacity: 0, duration: 1.6, ease: 'expo.out' }, .2)
    .from('.stats div', { opacity: 0, y: 16, duration: .7, stagger: .08 }, .6)
    .from('.hero-cta .btn', { opacity: 0, y: 16, duration: .6, stagger: .1 }, .8);
  $$('[data-count]').forEach(el => {
    const len = el.textContent.length, o = { v: 0 };
    gsap.to(o, { v: +el.dataset.count, duration: 1.6, delay: .7, ease: 'expo.out', onUpdate: () => el.textContent = String(Math.round(o.v)).padStart(len, '0') });
  });
  gsap.to('.orb-wrap', { y: 160, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

  const show = (b, extra = {}) => gsap.to(b, { opacity: 1, y: 0, duration: .9, ease: 'expo.out', stagger: .08, overwrite: 'auto', ...extra });
  ScrollTrigger.batch('.rv',   { start: 'top 88%', onEnter: b => show(b), onEnterBack: b => show(b, { duration: .3 }) });
  ScrollTrigger.batch('.card', { start: 'top 92%', onEnter: b => show(b, { stagger: .06 }), onEnterBack: b => show(b, { duration: .3 }) });

  // archive: horizontal pin
  const track = $('#arTrack'), prog = $('#arProg');
  $$('.ar-panel').forEach(p => p.insertAdjacentHTML('afterbegin', garment(p.dataset.g, getComputedStyle(p).getPropertyValue('--g').trim(), { stroke: 1.2 })));
  const dist = () => track.scrollWidth - innerWidth;
  gsap.to(track, { x: () => -dist(), ease: 'none',
    scrollTrigger: { trigger: '.archive', start: 'top top', end: () => '+=' + dist(), pin: true, scrub: .8, invalidateOnRefresh: true, anticipatePin: 1,
      onUpdate: st => { prog.textContent = String(Math.round(st.progress * 100)).padStart(3, '0') + '%'; } } });
  $$('.ar-word').forEach((w, i) => gsap.to(w, { xPercent: -10 - i * 3, ease: 'none', scrollTrigger: { trigger: '.archive', start: 'top top', end: () => '+=' + dist(), scrub: .8 } }));

  ScrollTrigger.refresh();
  if (Q.get('scroll')) { const t = document.getElementById(Q.get('scroll')); if (t) { scrollTo({ top: t.getBoundingClientRect().top + scrollY - 60, behavior: 'instant' }); ScrollTrigger.update(); } }
}

/* ---------------- boot ---------------- */
const boot = $('#boot'), blog = $('#bootLog'), fill = $('#bootFill'), pct = $('#bootPct'), enterBtn = $('#bootEnter');
document.body.classList.add('booting');
let booted = false;
const LINES = [
  'RAINBOW.EXE v2.000  (c) 2000 Legacy of Fits Pvt. Ltd.',
  '> Checking chrome .............. OK',
  '> Loading seven stripes ........ OK',
  '> Polishing rhinestones ........ OK',
  '> Detecting your aura .......... ' + pick(['CORAL', 'LILAC', 'PERIWINKLE', 'SKY', 'PEACH', 'LIME']),
  '> Mounting /dev/drip ........... OK',
  '> Window manager ............... READY',
  '> Ready.'
];
function finishBoot() {
  if (booted) return; booted = true;
  const go = () => { boot.remove(); document.body.classList.remove('booting'); initMotion(); log('session start. window manager ready.'); log('tip: every window is draggable. esc closes all.'); };
  if (HAS_GSAP && !RM && !Q.has('noboot')) gsap.to(boot, { yPercent: -100, duration: .9, ease: 'expo.inOut', onComplete: go });
  else go();
}
(function runBoot() {
  if (Q.has('noboot')) { finishBoot(); return; }
  let i = 0;
  const step = () => { if (i < LINES.length) { blog.textContent += LINES[i++] + '\n'; setTimeout(step, i === 1 ? 300 : rand(120, 260)); } };
  step();
  const start = performance.now(), dur = RM ? 300 : 2300;
  const prog = () => {
    const t = Math.min(1, (performance.now() - start) / dur);
    const v = Math.floor(Math.pow(t, .8) * 100 / 4) * 4;
    fill.style.width = v + '%'; pct.textContent = v;
    if (t < 1) requestAnimationFrame(prog);
    else { fill.style.width = '100%'; pct.textContent = 100; enterBtn.classList.add('show'); setTimeout(finishBoot, 1800); }
  };
  requestAnimationFrame(prog);
  enterBtn.addEventListener('click', finishBoot);
  boot.addEventListener('click', () => { if (performance.now() - start > 600) finishBoot(); });
  addEventListener('keydown', () => finishBoot(), { once: true });
})();

})();
