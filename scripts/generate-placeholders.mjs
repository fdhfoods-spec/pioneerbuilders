/**
 * Generates PLACEHOLDER architectural elevation drawings (SVG) for use until real
 * project photography is supplied. These are deliberately stylised drawings, not
 * photographs, so they can never be mistaken for images of completed work.
 *
 *   npm run assets
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "images", "placeholders");
mkdirSync(OUT, { recursive: true });

const W = 1600;
const H = 1000;
const GROUND = 840;

/* deterministic rng so output is stable between runs */
function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const THEMES = {
  forest: { top: "#0d110f", bot: "#2b5e4b", glow: "#d4af62", bld: "#111513", bld2: "#1a201d", far: "#1f3a2f" },
  concrete: { top: "#131513", bot: "#6d706b", glow: "#f5f2eb", bld: "#171917", bld2: "#232622", far: "#3a3d39" },
  dusk: { top: "#120f0b", bot: "#8a6a2c", glow: "#f0cf86", bld: "#15130f", bld2: "#211e18", far: "#3b3321" },
  cherry: { top: "#130b0d", bot: "#74202f", glow: "#e6a08a", bld: "#160e10", bld2: "#231619", far: "#3b1a21" },
};

const r2 = (n) => Math.round(n * 10) / 10;
const rect = (x, y, w, h, fill, extra = "") => `<rect x="${r2(x)}" y="${r2(y)}" width="${r2(w)}" height="${r2(h)}" fill="${fill}" ${extra}/>`;

function windows(x, y, cols, rows, cw, ch, gx, gy, rand, th, lit = 0.22) {
  let s = "";
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const on = rand() < lit;
      s += rect(x + c * (cw + gx), y + r * (ch + gy), cw, ch, on ? th.glow : "#f5f2eb", on ? 'opacity=".62"' : 'opacity=".07"');
    }
  }
  return s;
}

function frame(id, th, body, { w = W, h = H, seed = 1 } = {}) {
  const rand = rng(seed);
  // far skyline (context)
  let far = "";
  let x = -20;
  while (x < w) {
    const bw = 60 + rand() * 110;
    const bh = 90 + rand() * 260;
    far += rect(x, GROUND - bh, bw, bh + 4, th.far, 'opacity=".55"');
    x += bw + 6 + rand() * 18;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Placeholder architectural drawing">
<defs>
<linearGradient id="sky-${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${th.top}"/><stop offset=".62" stop-color="${th.top}"/><stop offset="1" stop-color="${th.bot}"/></linearGradient>
<radialGradient id="glow-${id}" cx=".72" cy=".86" r=".6"><stop offset="0" stop-color="${th.glow}" stop-opacity=".30"/><stop offset="1" stop-color="${th.glow}" stop-opacity="0"/></radialGradient>
<filter id="grain-${id}"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 .55 0"/></filter>
</defs>
<rect width="${w}" height="${h}" fill="url(#sky-${id})"/>
<rect width="${w}" height="${h}" fill="url(#glow-${id})"/>
<g>${far}</g>
${body(rand, th)}
<rect y="${GROUND}" width="${w}" height="${h - GROUND}" fill="${th.top}"/>
<rect y="${GROUND}" width="${w}" height="1.5" fill="#D4AF62" opacity=".7"/>
<rect width="${w}" height="${h}" filter="url(#grain-${id})" opacity=".07"/>
</svg>
`;
}

/* ----- building generators ----- */
function block({ x, y, w, h, cols, rows, th, rand, lit = 0.22, slabs = true, balcony = 14 }) {
  let s = rect(x, y, w, h, th.bld);
  s += rect(x + w * 0.78, y, w * 0.22, h, "#f5f2eb", 'opacity=".035"');
  const padX = w * 0.08;
  const padTop = h * 0.04;
  const gx = 8;
  const gy = 10;
  const cw = (w - padX * 2 - gx * (cols - 1)) / cols;
  const ch = (h - padTop * 2 - gy * (rows - 1)) / rows - 2;
  s += windows(x + padX, y + padTop, cols, rows, cw, ch, gx, gy + 2, rand, th, lit);
  if (slabs) {
    const fh = (h - padTop) / rows;
    for (let r = 1; r < rows; r++) s += rect(x - balcony / 2, y + padTop * 0.5 + r * fh - 3, w + balcony, 3, "#f5f2eb", 'opacity=".16"');
  }
  s += rect(x - 6, y - 6, w + 12, 8, "#f5f2eb", 'opacity=".2"');
  return s;
}

const gens = {
  apartments: [
    "forest",
    1,
    (rand, th) =>
      block({ x: 250, y: 470, w: 230, h: 370, cols: 3, rows: 7, th, rand }) +
      block({ x: 1120, y: 420, w: 250, h: 420, cols: 3, rows: 8, th, rand }) +
      block({ x: 560, y: 110, w: 480, h: 730, cols: 6, rows: 14, th, rand, lit: 0.26 }) +
      rect(630, 70, 150, 40, th.bld2) +
      rect(800, 40, 6, 70, "#D4AF62", 'opacity=".8"'),
  ],
  residential: [
    "concrete",
    2,
    (rand, th) =>
      rect(260, 700, 1100, 140, th.bld2) +
      block({ x: 300, y: 420, w: 440, h: 420, cols: 6, rows: 8, th, rand }) +
      block({ x: 800, y: 300, w: 520, h: 540, cols: 7, rows: 10, th, rand }) +
      windows(300, 720, 14, 2, 52, 38, 24, 16, rand, th, 0.3),
  ],
  villa: [
    "dusk",
    3,
    (rand, th) => {
      let s = "";
      s += `<ellipse cx="190" cy="720" rx="120" ry="150" fill="${th.far}" opacity=".9"/>${rect(184, 760, 12, 90, th.bld)}`;
      s += `<ellipse cx="1430" cy="740" rx="110" ry="130" fill="${th.far}" opacity=".9"/>${rect(1424, 770, 12, 80, th.bld)}`;
      s += rect(340, 560, 560, 280, th.bld);
      s += rect(380, 600, 380, 200, th.glow, 'opacity=".5"');
      for (let i = 0; i < 6; i++) s += rect(380 + i * 76, 600, 4, 200, th.bld);
      s += rect(600, 400, 600, 180, th.bld2);
      s += rect(640, 440, 520, 100, "#f5f2eb", 'opacity=".09"');
      s += rect(300, 380, 940, 16, "#f5f2eb", 'opacity=".28"');
      s += rect(900, 560, 4, 280, "#f5f2eb", 'opacity=".1"');
      s += rect(980, 846, 440, 30, "#f5f2eb", 'opacity=".12"');
      s += windows(1000, 600, 4, 1, 80, 120, 30, 0, rand, th, 0.5);
      return s;
    },
  ],
  hospital: [
    "concrete",
    4,
    (rand, th) => {
      let s = rect(180, 560, 1240, 280, th.bld2);
      s += block({ x: 640, y: 240, w: 320, h: 600, cols: 5, rows: 9, th, rand, lit: 0.2 });
      for (let i = 0; i < 3; i++) {
        s += rect(200, 600 + i * 70, 420, 38, "#f5f2eb", 'opacity=".09"');
        s += rect(980, 600 + i * 70, 420, 38, "#f5f2eb", 'opacity=".09"');
      }
      s += rect(690, 650, 220, 14, "#D4AF62", 'opacity=".85"');
      s += rect(700, 664, 8, 176, "#f5f2eb", 'opacity=".22"') + rect(892, 664, 8, 176, "#f5f2eb", 'opacity=".22"');
      s += rect(720, 700, 160, 140, th.glow, 'opacity=".35"');
      return s;
    },
  ],
  industrial: [
    "cherry",
    5,
    (rand, th) => {
      let s = "";
      s += rect(1250, 190, 44, 650, th.bld2) + rect(1244, 180, 56, 16, "#f5f2eb", 'opacity=".25"');
      s += `<ellipse cx="170" cy="560" rx="52" ry="22" fill="${th.bld2}"/>${rect(118, 560, 104, 280, th.bld2)}`;
      s += rect(220, 560, 1000, 280, th.bld);
      const teeth = 6;
      const tw = 1000 / teeth;
      for (let i = 0; i < teeth; i++) {
        const x0 = 220 + i * tw;
        s += `<polygon points="${x0},560 ${x0},470 ${x0 + tw},560" fill="${th.bld2}"/>`;
        s += `<polygon points="${x0},470 ${x0 + 6},470 ${x0 + 6},560 ${x0},560" fill="${th.glow}" opacity=".45"/>`;
      }
      for (let i = 0; i <= teeth; i++) s += rect(220 + i * tw - 3, 560, 6, 280, "#f5f2eb", 'opacity=".12"');
      s += rect(300, 660, 220, 180, "#f5f2eb", 'opacity=".07"') + rect(620, 660, 220, 180, "#f5f2eb", 'opacity=".07"');
      s += rect(900, 640, 240, 200, th.glow, 'opacity=".3"');
      s += windows(300, 590, 16, 1, 40, 26, 22, 0, rand, th, 0.3);
      return s;
    },
  ],
  public: [
    "dusk",
    6,
    (rand, th) => {
      let s = rect(260, 700, 1080, 140, th.bld2);
      s += rect(300, 440, 1000, 40, th.bld) + rect(300, 436, 1000, 6, "#f5f2eb", 'opacity=".28"');
      s += rect(620, 300, 360, 140, th.bld2);
      s += `<path d="M640 300 A160 130 0 0 1 960 300 Z" fill="${th.bld}"/>`;
      s += rect(796, 150, 8, 40, "#D4AF62", 'opacity=".85"');
      for (let i = 0; i < 9; i++) s += rect(330 + i * 112, 480, 30, 220, th.bld) + rect(330 + i * 112 + 22, 480, 8, 220, "#f5f2eb", 'opacity=".1"');
      s += rect(300, 700, 1000, 28, th.bld) + rect(260, 728, 1080, 28, th.bld) + rect(220, 756, 1160, 28, th.bld);
      s += windows(660, 330, 6, 1, 32, 80, 18, 0, rand, th, 0.5);
      return s;
    },
  ],
  "group-housing": [
    "forest",
    7,
    (rand, th) => {
      const heights = [360, 460, 410, 500, 380];
      let s = "";
      heights.forEach((h, i) => {
        s += block({ x: 130 + i * 290, y: GROUND - h, w: 250, h, cols: 3, rows: Math.round(h / 55), th, rand, lit: 0.24, balcony: 18 });
      });
      s += rect(100, 826, 1400, 14, th.bld2);
      return s;
    },
  ],
  "crane-site": [
    "dusk",
    8,
    (rand, th) => {
      let s = "";
      // building under construction: clad base, exposed frame above
      s += rect(280, 560, 560, 280, th.bld);
      s += windows(310, 590, 8, 3, 44, 54, 20, 16, rand, th, 0.3);
      const top = 300;
      for (let c = 0; c <= 5; c++) s += rect(280 + c * 110 - 6, top, 12, 260, "#f5f2eb", 'opacity=".24"');
      for (let f = 0; f <= 4; f++) s += rect(272, top + f * 65, 576, 9, "#f5f2eb", 'opacity=".3"');
      for (let c = 0; c <= 5; c++) s += rect(280 + c * 110 - 1.5, top - 36, 3, 36, "#f5f2eb", 'opacity=".4"');
      // crane
      s += rect(1000, 120, 14, 720, th.bld2);
      let zig = "M1000 840";
      for (let i = 0; i < 18; i++) zig += ` L${i % 2 ? 1000 : 1014} ${840 - (i + 1) * 40}`;
      s += `<path d="${zig}" fill="none" stroke="#f5f2eb" stroke-opacity=".3" stroke-width="2"/>`;
      s += rect(420, 120, 880, 14, th.bld2) + rect(420, 134, 880, 3, "#D4AF62", 'opacity=".8"');
      s += rect(1014, 100, 70, 20, th.bld2) + rect(1240, 134, 60, 40, "#f5f2eb", 'opacity=".2"');
      s += rect(520, 137, 2, 210, "#f5f2eb", 'opacity=".4"') + rect(500, 347, 42, 24, th.glow, 'opacity=".6"');
      return s;
    },
  ],
  "detail-facade": [
    "concrete",
    9,
    (rand, th) => {
      let s = rect(0, 0, W, GROUND, th.bld);
      const cols = 14;
      const rows = 7;
      const cw = W / cols;
      const rh = GROUND / rows;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const on = rand() < 0.2;
          s += rect(c * cw + 16, r * rh + 18, cw - 32, rh - 52, on ? th.glow : "#f5f2eb", on ? 'opacity=".55"' : 'opacity=".07"');
        }
        s += rect(0, (r + 1) * rh - 14, W, 6, "#f5f2eb", 'opacity=".16"');
      }
      for (let c = 0; c <= cols; c++) s += rect(c * cw - 3, 0, 6, GROUND, "#f5f2eb", 'opacity=".1"');
      s += `<polygon points="0,0 780,0 0,GROUND" fill="#000" opacity=".28"/>`.replace("GROUND", String(GROUND));
      s += `<polygon points="${W},${GROUND} ${W - 700},${GROUND} ${W},120" fill="#000" opacity=".22"/>`;
      return s;
    },
  ],
  "detail-structure": [
    "forest",
    10,
    (rand, th) => {
      let s = "";
      for (let i = 0; i < 5; i++) {
        const x = 130 + i * 300;
        s += rect(x, 0, 130, GROUND, th.bld2) + rect(x + 100, 0, 30, GROUND, "#f5f2eb", 'opacity=".05"');
        for (let k = 0; k < 6; k++) s += rect(x + 18 + k * 18, 0, 2, GROUND, "#f5f2eb", 'opacity=".06"');
      }
      s += rect(0, 190, W, 76, th.bld) + rect(0, 190, W, 4, "#f5f2eb", 'opacity=".25"');
      s += rect(0, 500, W, 76, th.bld) + rect(0, 500, W, 4, "#f5f2eb", 'opacity=".25"');
      for (let i = 0; i < 5; i++) for (let k = 0; k < 4; k++) s += rect(140 + i * 300 + k * 30, 0, 3, 190, "#D4AF62", 'opacity=".5"');
      s += rect(0, 700, W, 140, "#f5f2eb", 'opacity=".04"');
      return s;
    },
  ],
};

for (const [name, [theme, seed, body]] of Object.entries(gens)) {
  const svg = frame(name, THEMES[theme], body, { seed });
  writeFileSync(join(OUT, `${name}.svg`), svg);
  console.log("wrote", `${name}.svg`);
}

/* Portrait placeholder (leadership) */
{
  const th = THEMES.forest;
  const pw = 800;
  const ph = 1000;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${pw} ${ph}" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Portrait placeholder">
<defs><linearGradient id="p" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#181b18"/><stop offset="1" stop-color="${th.bot}" stop-opacity=".8"/></linearGradient></defs>
<rect width="${pw}" height="${ph}" fill="url(#p)"/>
<circle cx="400" cy="400" r="130" fill="#f5f2eb" opacity=".14"/>
<path d="M120 1000 C120 760 240 660 400 660 C560 660 680 760 680 1000 Z" fill="#f5f2eb" opacity=".14"/>
<rect y="940" width="${pw}" height="1.5" fill="#D4AF62" opacity=".7"/>
</svg>
`;
  writeFileSync(join(OUT, "portrait.svg"), svg);
  console.log("wrote portrait.svg");
}
