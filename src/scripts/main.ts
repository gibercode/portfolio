const root = document.documentElement;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

const store = {
  get(k: string) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k: string, v: string) { try { localStorage.setItem(k, v); } catch { /* storage unavailable */ } },
};

/* Language + accent controls */
function setLang(lang: string) {
  root.dataset.lang = lang;
  root.lang = lang;
  store.set('gl-lang', lang);
  document.querySelectorAll<HTMLButtonElement>('[data-set-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.setLang === lang)));
  document.title = lang === 'en' ? 'Giberson Lara · Full-stack developer' : 'Giberson Lara · Desarrollador full-stack';
}
function setAccent(name: string) {
  root.dataset.accent = name;
  store.set('gl-accent', name);
  document.querySelectorAll<HTMLButtonElement>('[data-accent].sw').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.accent === name)));
  accent = readAccent();
  fields.forEach((f) => f.draw(performance.now()));
}
document.querySelectorAll<HTMLButtonElement>('[data-set-lang]').forEach((b) => b.addEventListener('click', () => setLang(b.dataset.setLang!)));
document.querySelectorAll<HTMLButtonElement>('.sw').forEach((b) => b.addEventListener('click', () => setAccent(b.dataset.accent!)));

const readAccent = () => getComputedStyle(root).getPropertyValue('--accent').trim() || '#00b8d9';
let accent = readAccent();
const fields: Field[] = [];
setLang(root.dataset.lang || 'es');
document.querySelectorAll<HTMLButtonElement>('.sw').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.accent === (root.dataset.accent || 'cyan'))));

/* Reveal on scroll (once) */
const revs = document.querySelectorAll('.rev');
if (reduce || !('IntersectionObserver' in window)) {
  revs.forEach((el) => el.classList.add('in'));
} else {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -8% 0px' });
  revs.forEach((el) => io.observe(el));
}

/* Fixed bar gets a ground once the hero is behind it */
const bar = document.querySelector<HTMLElement>('.bar')!;
const onScroll = () => bar.classList.toggle('solid', window.scrollY > window.innerHeight * 0.7);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* Vibrating line field (Soto / Cruz-Diez): 1px lines bend around a point, a colour strip layer shifts behind */
const ease = (t: number) => 1 - Math.pow(1 - Math.min(Math.max(t, 0), 1), 4);
const easeOutExpo = (t: number) => { const x = Math.min(Math.max(t, 0), 1); return x === 1 ? 1 : 1 - Math.pow(2, -10 * x); };
const t0 = performance.now();
const coarse = matchMedia('(pointer: coarse)').matches;

class Field {
  W = 0; H = 0; dpr = 1; gap = 9; sigma: number; baseSigma: number;
  tx = 0.68; ty = 0.42; sx = 0.68; sy = 0.42;
  visible = false; revealFrom = 0;
  ink: CanvasRenderingContext2D; col: CanvasRenderingContext2D | null;
  constructor(public host: HTMLElement, public inkCv: HTMLCanvasElement, public colCv: HTMLCanvasElement | null, sigma = 190) {
    this.baseSigma = sigma;
    this.sigma = sigma;
    this.ink = inkCv.getContext('2d')!;
    this.col = colCv ? colCv.getContext('2d')! : null;
    new ResizeObserver(() => this.resize()).observe(host);
    new IntersectionObserver((e) => {
      const v = e[0].isIntersecting;
      if (v && !this.visible && !this.revealFrom) this.revealFrom = performance.now();
      this.visible = v;
    }, { threshold: 0.05 }).observe(host);
    this.resize();
  }
  resize() {
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    const r = this.inkCv.getBoundingClientRect();
    this.W = r.width; this.H = r.height;
    this.gap = this.W < 700 ? 7 : 9;
    this.sigma = Math.min(this.baseSigma, Math.max(90, this.W * 0.14));
    for (const c of [this.inkCv, this.colCv]) {
      if (!c) continue;
      c.width = Math.round(this.W * this.dpr); c.height = Math.round(this.H * this.dpr);
    }
    this.ink.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    this.col?.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    if (reduce) this.draw(t0 + 4000);
  }
  disp(x: number, y: number, px: number, py: number, t: number) {
    const dx = x - px, dy = y - py;
    const g = Math.exp(-(dx * dx + dy * dy) / (2 * this.sigma * this.sigma));
    return dx * g * 0.28 + Math.sin(y * 0.0046 + t * 0.00035 + x * 0.0021) * 3.2;
  }
  draw(now: number) {
    const { W, H, gap, ink, col } = this;
    const t = now - t0;
    const px = this.sx * W, py = this.sy * H;
    const tr = reduce ? 4000 : now - (this.revealFrom || t0);
    ink.clearRect(0, 0, W, H);
    col?.clearRect(0, 0, W, H);
    const shift = Math.floor(this.sx * 30 + t * 0.0004);
    const n = Math.ceil(W / gap) + 2;
    ink.strokeStyle = '#0c0c0d';
    ink.lineWidth = 1;
    if (col) col.fillStyle = accent;
    for (let i = -1; i < n; i++) {
      const x = i * gap;
      const reveal = reduce ? 1 : ease((tr - (x / W) * 700) / 1500);
      const yEnd = H * reveal;
      if (yEnd <= 0) continue;
      ink.beginPath();
      for (let y = 0; y <= yEnd; y += 12) {
        const xx = x + this.disp(x, y, px, py, t);
        y === 0 ? ink.moveTo(xx, y) : ink.lineTo(xx, y);
      }
      ink.stroke();
      if (col && ((i + shift) % 4 + 4) % 4 < 2) {
        const left: number[] = [], right: number[] = [];
        for (let y = 0; y <= yEnd; y += 12) {
          left.push(x + gap * 0.18 + this.disp(x + gap * 0.18, y, px, py, t));
          right.push(x + gap * 0.82 + this.disp(x + gap * 0.82, y, px, py, t));
        }
        col.beginPath();
        left.forEach((xx, k) => (k === 0 ? col.moveTo(xx, 0) : col.lineTo(xx, k * 12)));
        for (let k = right.length - 1; k >= 0; k--) col.lineTo(right[k], k * 12);
        col.closePath();
        col.fill();
      }
    }
  }
}

let stripField: Field | null = null;
const hero = document.querySelector<HTMLElement>('.hero')!;
const heroField = new Field(hero, hero.querySelector('.field-ink')!, hero.querySelector('.field-color')!);
fields.push(heroField);
const stripEl = document.querySelector<HTMLElement>('.strip');
// The closing strip: same grammar, smaller scene, so the accent stays visible down the page
if (stripEl) {
  const strip = new Field(stripEl, stripEl.querySelector('.strip-ink')!, stripEl.querySelector('.strip-color')!, 120);
  strip.sx = strip.tx = 0.5; strip.sy = strip.ty = 0.5;
  fields.push(strip);
  stripField = strip;
}
const letters = Array.from(hero.querySelectorAll<HTMLElement>('.ch'));

let lastMove = -1e9;
window.addEventListener('pointermove', (e) => {
  lastMove = performance.now();
  for (const f of fields) {
    const r = f.inkCv.getBoundingClientRect();
    f.tx = (e.clientX - r.left) / r.width;
    f.ty = (e.clientY - r.top) / r.height;
  }
}, { passive: true });

function updateLetters(now: number) {
  const t = now - t0;
  const f = heroField;
  const cx = f.sx * f.W, cy = f.sy * f.H;
  const hr = hero.getBoundingClientRect();
  letters.forEach((el, i) => {
    const r = el.getBoundingClientRect();
    const dx = r.left - hr.left + r.width / 2 - cx;
    const dy = r.top - hr.top + r.height / 2 - cy;
    const near = Math.exp(-(dx * dx + dy * dy) / (2 * 240 * 240));
    const intro = reduce ? 0 : 1 - easeOutExpo((t - 350 - i * 60) / 1100);
    const narrow = f.W < 700;
    const wdth = (narrow ? 56 : 72) + near * (narrow ? 8 : 22) + intro * 8;
    const wght = 760 + near * (narrow ? 6 : 15) - intro * 80;
    el.style.fontVariationSettings = `'wdth' ${wdth.toFixed(1)}, 'wght' ${wght.toFixed(0)}`;
    el.style.transform = intro > 0.001 ? `translateY(${(intro * 108).toFixed(2)}%)` : '';
  });
}

function frame(now: number) {
  requestAnimationFrame(frame);
  if (document.hidden) return;
  const idle = coarse || now - lastMove > 3500;
  const t = now - t0;
  for (const f of fields) {
    if (!f.visible) continue;
    if (idle) {
      if (f === heroField && f.W < 700) {
        // phones: a slow drift kept in the open upper field so the colour band never leaves the frame
        f.tx = 0.5 + 0.2 * Math.sin(t / 3400);
        f.ty = 0.3 + 0.1 * Math.sin(t / 2600 + 1);
      } else {
        f.tx = 0.5 + 0.3 * Math.sin(t / 2800 + (f === heroField ? 0 : 2));
        f.ty = 0.45 + 0.2 * Math.sin(t / 1900 + 1);
      }
    }
    f.sx += (f.tx - f.sx) * 0.1;
    f.sy += (f.ty - f.sy) * 0.1;
    f.draw(now);
  }
  const phone = heroField.W < 700;
  hero.style.setProperty('--zx', `${(phone ? heroField.sx : 0.4 + heroField.sx * 0.5) * 100}%`);
  hero.style.setProperty('--zy', `${(phone ? heroField.sy : 0.25 + heroField.sy * 0.4) * 100}%`);
  if (stripField?.visible) stripEl!.style.setProperty('--zx', `${stripField.sx * 100}%`);
  if (heroField.visible) updateLetters(now);
}

if (reduce) {
  updateLetters(t0 + 4000);
  fields.forEach((f) => f.draw(t0 + 4000));
} else {
  requestAnimationFrame(frame);
}
