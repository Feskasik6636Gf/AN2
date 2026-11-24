// Semi-realistic flat-vector bust generator (original characters)
let uid = 0; const nid = p => p + (uid++);
let seed = 5; const rnd = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
const INK = '#17141c';

const HEAD = `M-70,-95 C-78,-142 -40,-160 0,-160 C40,-160 78,-142 70,-95 L80,-12 C81,28 75,58 66,80 C54,106 32,126 0,130 C-32,126 -54,106 -66,80 C-75,58 -81,28 -80,-12 Z`;

function head(o) {
  const c = o.c; let s = '';
  const clip = nid('hc');
  s += `<defs><clipPath id="${clip}"><path d="${HEAD}"/></clipPath></defs>`;
  // ears
  for (const sx of [-1, 1]) {
    const e = `M${sx * 76},-28 C${sx * 98},-38 ${sx * 102},4 ${sx * 92},22 C${sx * 88},34 ${sx * 80},36 ${sx * 74},30 Z`;
    s += `<path d="${e}" fill="${sx > 0 ? c.skinS : c.skin}" stroke="${INK}" stroke-width="3"/>`;
    s += `<path d="M${sx * 82},-14 C${sx * 92},-10 ${sx * 90},10 ${sx * 84},18" stroke="${c.skinD}" stroke-width="3" fill="none"/>`;
  }
  // base skin + cel shadow (light from LEFT unless o.lightR)
  const L = o.lightR ? -1 : 1;
  s += `<g clip-path="url(#${clip})"><path d="${HEAD}" fill="${c.skin}"/>
    <path transform="scale(${L},1)" d="M22,-170 C44,-110 30,-60 40,-20 C48,20 34,60 44,90 C30,118 10,132 -10,140 L120,140 L120,-170Z" fill="${c.skinS}"/>
    <path d="M-60,40 C-40,70 -20,78 0,80 C20,78 40,70 60,40 L80,140 L-80,140Z" fill="${c.skinS}" opacity=".35"/>
    ${o.stubble ? stubble(c) : ''}
    <path d="${HEAD}" fill="none" stroke="${o.rim}" stroke-width="10" transform="translate(${-L * 7},2)" opacity="${o.rimA ?? .0}"/>
  </g>`;
  // rim light on the side opposite to key (backlight colour)
  s += `<g clip-path="url(#${clip})"><path d="${HEAD}" fill="none" stroke="${o.rim}" stroke-width="7" transform="translate(${-L * 6},-2)" opacity=".0"/></g>`;
  s += `<path d="${HEAD}" fill="none" stroke="${o.rim}" stroke-width="5" opacity="${o.rimA ?? .9}" clip-path="url(#${clip})" transform="translate(${L * 0},0)" style="mix-blend-mode:screen"/>`;
  s += `<path d="${HEAD}" fill="none" stroke="${INK}" stroke-width="3.2" stroke-linejoin="round"/>`;
  // cheekbone + jaw lines
  s += `<path d="M${L * 50},18 C${L * 58},34 ${L * 56},52 ${L * 48},62" stroke="${c.skinD}" stroke-width="2.5" fill="none" opacity=".8"/>`;
  s += `<path d="M-44,96 C-30,110 -16,116 0,118" stroke="${c.skinD}" stroke-width="2" fill="none" opacity=".5"/>`;
  // brows
  const by = -34 + (o.browY ?? 0), bt = o.browTilt ?? 0;
  for (const sx of [-1, 1]) {
    const inX = sx * 12, outX = sx * 60, inY = by + bt, outY = by - 4 - bt * .3;
    s += `<path d="M${inX},${inY + 3} C${sx * 30},${by - 9} ${sx * 46},${by - 10} ${outX},${outY} C${sx * 46},${by - 3} ${sx * 30},${by - 1} ${inX},${inY + 9} Z" fill="${c.brow}" stroke="${INK}" stroke-width="1.6"/>`;
  }
  // eyes
  for (const sx of [-1, 1]) {
    const ex = sx * 34, ey = -8 + (o.eyeY ?? 0), w = 20, open = o.eyeOpen ?? 1;
    const up = `M${ex - w},${ey + 2} C${ex - 10},${ey - 10 * open} ${ex + 10},${ey - 11 * open} ${ex + w},${ey - 1}`;
    const lo = `C${ex + 10},${ey + 6} ${ex - 10},${ey + 7} ${ex - w},${ey + 2}Z`;
    const ec = nid('ec');
    s += `<defs><clipPath id="${ec}"><path d="${up} ${lo}"/></clipPath></defs>`;
    s += `<path d="${up} ${lo}" fill="#f4efe6"/>`;
    s += `<g clip-path="url(#${ec})"><circle cx="${ex + (o.look ?? 0)}" cy="${ey - 1}" r="7.5" fill="${c.iris}"/><circle cx="${ex + (o.look ?? 0)}" cy="${ey - 1}" r="3.4" fill="${INK}"/>
          <circle cx="${ex + (o.look ?? 0) - 2.5}" cy="${ey - 3.5}" r="1.8" fill="#fff"/><path d="${up} L${ex + w},${ey - 12} L${ex - w},${ey - 12}Z" fill="${c.skinS}" opacity=".25"/></g>`;
    s += `<path d="${up}" stroke="${INK}" stroke-width="3.4" fill="none" stroke-linecap="round"/>`;
    s += `<path d="M${ex - w + 4},${ey + 5} C${ex - 6},${ey + 9} ${ex + 6},${ey + 9} ${ex + w - 4},${ey + 4}" stroke="${c.skinD}" stroke-width="1.6" fill="none"/>`;
    if (o.bags) s += `<path d="M${ex - 14},${ey + 14} C${ex - 4},${ey + 18} ${ex + 6},${ey + 18} ${ex + 14},${ey + 12}" stroke="${c.skinD}" stroke-width="1.6" fill="none" opacity=".8"/>`;
  }
  // nose
  s += `<path d="M${L * -4},-6 C${L * -6},12 ${L * -10},26 ${L * -12},36" stroke="${c.skinD}" stroke-width="2.4" fill="none"/>`;
  s += `<path d="M-15,42 C-12,48 -4,50 0,47 C4,50 12,48 15,42" stroke="${INK}" stroke-width="2.6" fill="none" stroke-linecap="round"/>`;
  s += `<path d="M${L * 4},48 C${L * 10},52 ${L * 16},48 ${L * 18},42 L${L * 16},54 Z" fill="${c.skinD}" opacity=".5"/>`;
  // nasolabial
  s += `<path d="M${L * 20},46 C${L * 30},56 ${L * 32},66 ${L * 30},76" stroke="${c.skinD}" stroke-width="2" fill="none" opacity=".7"/>`;
  // mouth
  const m = o.mouth ?? 'neutral';
  if (m === 'neutral') s += `<path d="M-26,72 C-10,74 10,74 26,70" stroke="${INK}" stroke-width="2.8" fill="none" stroke-linecap="round"/><path d="M-12,84 C-4,86 6,86 12,83" stroke="${c.skinD}" stroke-width="2" fill="none"/>`;
  if (m === 'smirk') s += `<path d="M-24,74 C-8,76 10,74 28,64" stroke="${INK}" stroke-width="2.8" fill="none" stroke-linecap="round"/><path d="M-10,85 C-2,87 6,86 12,83" stroke="${c.skinD}" stroke-width="2" fill="none"/>`;
  if (m === 'grim') s += `<path d="M-26,74 C-10,70 10,70 26,74" stroke="${INK}" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M-12,85 C-4,87 6,87 12,84" stroke="${c.skinD}" stroke-width="2" fill="none"/>`;
  if (m === 'talk') s += `<path d="M-24,70 C-10,72 10,72 24,69 C18,88 -18,88 -24,70Z" fill="#3a1e22" stroke="${INK}" stroke-width="2.6"/><path d="M-18,71 L18,71 L16,76 L-16,76Z" fill="#efe9de"/>`;
  // scar
  if (o.scar) s += `<path d="${o.scar}" stroke="${c.scar}" stroke-width="4" fill="none" stroke-linecap="round"/><path d="${o.scar}" stroke="${INK}" stroke-width="1.2" fill="none" opacity=".6"/>`;
  if (o.lines) s += `<path d="M-34,-56 C-14,-60 14,-60 34,-56 M-28,-48 C-10,-51 10,-51 28,-48" stroke="${c.skinD}" stroke-width="1.6" fill="none" opacity=".6"/>`;
  return s;
}
function stubble(c) {
  let s = ''; for (let i = 0; i < 420; i++) {
    const a = rnd() * Math.PI, r = 30 + rnd() * 100; const x = Math.cos(a) * r * .9, y = 40 + Math.sin(a) * r * .7;
    if (y < 50 || Math.abs(x) > 74 || (y < 92 && Math.abs(x) < 30 && y > 60)) continue;
    s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(0.7 + rnd() * .8).toFixed(2)}" fill="${c.stub}" opacity=".55"/>`;
  } return s;
}

// ---------- hair ----------
const HAIR = {
  crop: c => `<path d="M-74,-90 C-84,-150 -40,-176 6,-172 C50,-170 84,-146 74,-88 C66,-110 58,-122 40,-126 C20,-120 -10,-126 -30,-132 C-46,-122 -62,-112 -74,-90Z" fill="${c.hair}" stroke="${INK}" stroke-width="3"/>
      <path d="M-30,-132 C-10,-140 20,-136 40,-126 M-50,-140 C-30,-150 0,-156 30,-150" stroke="${c.hairL}" stroke-width="3" fill="none" opacity=".7"/>`,
  undercut: c => `<path d="M-72,-80 C-80,-130 -72,-150 -52,-160 L-50,-110 C-62,-104 -68,-94 -72,-80Z" fill="${c.hairS}" stroke="${INK}" stroke-width="2.5"/>
      <path d="M72,-80 C80,-130 72,-150 52,-160 L50,-110 C62,-104 68,-94 72,-80Z" fill="${c.hairS}" stroke="${INK}" stroke-width="2.5"/>
      <path d="M-56,-112 C-70,-170 -10,-196 40,-182 C82,-170 96,-130 70,-96 C60,-120 40,-132 20,-128 C40,-112 50,-96 52,-80 C30,-108 0,-120 -20,-118 C-36,-118 -48,-116 -56,-112Z" fill="${c.hair}" stroke="${INK}" stroke-width="3"/>
      <path d="M-30,-160 C0,-176 40,-170 66,-140 M-10,-150 C20,-158 44,-146 60,-124" stroke="${c.hairL}" stroke-width="3" fill="none" opacity=".8"/>`,
  slick: c => `<path d="M-76,-70 C-90,-150 -40,-178 6,-176 C56,-176 92,-146 76,-70 C72,-100 66,-112 58,-120 C30,-130 -10,-132 -54,-118 C-66,-104 -72,-90 -76,-70Z" fill="${c.hair}" stroke="${INK}" stroke-width="3"/>
      <path d="M-50,-124 C-20,-150 30,-156 60,-128 M-40,-138 C-10,-160 30,-162 64,-140 M-60,-110 C-40,-138 0,-146 40,-140" stroke="${c.hairL}" stroke-width="2.4" fill="none" opacity=".85"/>
      <path d="M-76,-70 L-80,-20 L-74,-20 Z M76,-70 L80,-20 L74,-20Z" fill="${c.hair}" stroke="${INK}" stroke-width="2"/>`,
};

// ---------- clothing / bust ----------
function bust(o) {
  const c = o.c; let s = '<g transform="scale(1.18,1)">';
  // torso silhouette (shoulders) — y from 170 down to 520
  const T = `M-60,150 C-120,170 -210,190 -236,250 C-256,300 -262,420 -266,560 L266,560 C262,420 256,300 236,250 C210,190 120,170 60,150Z`;
  const tc = nid('tc');
  s += `<defs><clipPath id="${tc}"><path d="${T}"/></clipPath></defs>`;
  // neck
  s += `<path d="M-46,90 L-52,190 L52,190 L46,90Z" fill="${c.skinS}" stroke="${INK}" stroke-width="3"/><path d="M-46,96 C-20,130 20,130 46,96 L46,90 L-46,90Z" fill="${c.skinD}" opacity=".55"/>`;
  s += `<g clip-path="url(#${tc})"><path d="${T}" fill="${c.cloth}"/>
        <path d="M70,140 C140,200 170,300 180,560 L300,560 L300,140Z" fill="${c.clothS}"/>
        ${o.outfit(c)}
        <path d="${T}" fill="none" stroke="${o.rim}" stroke-width="12" transform="translate(${o.lightR ? 8 : -8},6)" opacity="0"/>
        </g>`;
  s += `<path d="${T}" fill="none" stroke="${INK}" stroke-width="3.2"/>`;
  // rim on shoulder (back light)
  s += `<path d="M-60,152 C-120,172 -208,192 -232,252 C-250,296 -256,400 -260,560" stroke="${o.rim}" stroke-width="5" fill="none" opacity=".9"/>
        <path d="M60,152 C120,172 208,192 232,252 C250,296 256,400 260,560" stroke="${o.rim}" stroke-width="5" fill="none" opacity=".9"/></g>`;
  return s;
}

// outfits ------------------------------------------------------------
const stitch = (x1, y1, x2, y2, col) => `<path d="M${x1},${y1} L${x2},${y2}" stroke="${col}" stroke-width="1.6" stroke-dasharray="5 4" fill="none"/>`;
const OUT = {
  // 1. rescue shell jacket (hero)
  shell: c => `
   <path d="M-70,150 C-50,200 -30,220 0,226 C30,220 50,200 70,150 L80,150 C64,230 34,250 0,256 C-34,250 -64,230 -80,150Z" fill="${c.collar}" stroke="${INK}" stroke-width="2.6"/>
   <path d="M-82,146 C-70,120 -40,108 0,108 C40,108 70,120 82,146 C60,140 30,136 0,138 C-30,136 -60,140 -82,146Z" fill="${c.clothS}" stroke="${INK}" stroke-width="2.6"/>
   <path d="M0,256 L0,560" stroke="${INK}" stroke-width="3"/><path d="M-6,256 L-6,560 M6,256 L6,560" stroke="${c.clothS}" stroke-width="3"/>
   ${[...Array(18)].map((_, i) => `<path d="M-5,${262 + i * 16} L5,${262 + i * 16}" stroke="${INK}" stroke-width="2"/>`).join('')}
   <path d="M-236,330 L-60,300 L-60,340 L-240,372Z" fill="${c.band}" stroke="${INK}" stroke-width="2.4"/>
   <path d="M236,330 L60,300 L60,340 L240,372Z" fill="${c.band}" stroke="${INK}" stroke-width="2.4"/>
   <path d="M-236,336 L-60,306 M236,336 L60,306" stroke="#fff" stroke-width="2" opacity=".6"/>
   <rect x="-170" y="400" width="96" height="70" rx="8" fill="${c.clothS}" stroke="${INK}" stroke-width="2.4"/>${stitch(-164, 412, -80, 412, c.collar)}
   <rect x="74" y="400" width="96" height="70" rx="8" fill="${c.clothS}" stroke="${INK}" stroke-width="2.4"/>${stitch(80, 412, 164, 412, c.collar)}
   <g transform="translate(-118,240)"><rect x="-26" y="-18" width="52" height="36" rx="5" fill="${c.patch}" stroke="${INK}" stroke-width="2.2"/><path d="M-18,10 L-4,-10 L4,0 L8,-6 L18,10Z" fill="#fff"/></g>
   <path d="M120,200 C130,250 128,280 118,320" stroke="${INK}" stroke-width="2" fill="none" opacity=".5"/>
   <rect x="96" y="214" width="16" height="40" rx="4" fill="#2a2a30" stroke="${INK}" stroke-width="2"/><circle cx="104" cy="208" r="5" fill="#2a2a30"/>`,
  // 2. bomber with headset (medic/tech)
  bomber: c => `
   <path d="M-84,150 C-60,140 -30,132 0,132 C30,132 60,140 84,150 L84,176 C60,168 30,164 0,164 C-30,164 -60,168 -84,176Z" fill="${c.rib}" stroke="${INK}" stroke-width="2.4"/>
   ${[...Array(14)].map((_, i) => `<path d="M${-78 + i * 12},${152 - Math.sin(i / 13 * 3.14) * 16} l0,22" stroke="${c.clothS}" stroke-width="1.6"/>`).join('')}
   <path d="M-40,176 L0,300 L40,176" fill="${c.under}" stroke="${INK}" stroke-width="2.4"/>
   <path d="M0,300 L0,560" stroke="${INK}" stroke-width="2.6"/>
   <path d="M-40,176 L-70,560 M40,176 L70,560" stroke="${c.clothS}" stroke-width="2.4" opacity=".8"/>
   <rect x="-200" y="250" width="70" height="26" rx="4" fill="${c.patch}" stroke="${INK}" stroke-width="2"/><text x="-165" y="269" font-family="Arial Black" font-size="15" text-anchor="middle" fill="${INK}">MED</text>
   <path d="M-236,300 C-200,300 -180,310 -170,330" stroke="${c.clothS}" stroke-width="3" fill="none"/>
   <rect x="120" y="300" width="80" height="22" rx="5" fill="${c.rib}" stroke="${INK}" stroke-width="2"/>${stitch(126, 311, 196, 311, INK)}`,
  // 3. turtleneck + long coat (antagonist)
  coat: c => `
   <path d="M-60,120 C-30,112 30,112 60,120 L66,190 C30,200 -30,200 -66,190Z" fill="${c.under}" stroke="${INK}" stroke-width="2.6"/>
   ${[0, 1, 2, 3].map(i => `<path d="M-60,${136 + i * 14} C-20,${130 + i * 14} 20,${130 + i * 14} 60,${136 + i * 14}" stroke="${c.underS}" stroke-width="2" fill="none"/>`).join('')}
   <path d="M-66,190 C-30,200 30,200 66,190 L66,560 L-66,560Z" fill="${c.under}"/>
   <path d="M-70,170 L-150,190 L-96,300 L-60,560 L-36,560 L-50,260Z" fill="${c.lapel}" stroke="${INK}" stroke-width="2.6"/>
   <path d="M70,170 L150,190 L96,300 L60,560 L36,560 L50,260Z" fill="${c.lapelS}" stroke="${INK}" stroke-width="2.6"/>
   <path d="M-150,190 L-120,176 L-110,210Z M150,190 L120,176 L110,210Z" fill="${c.clothS}" stroke="${INK}" stroke-width="2"/>
   <circle cx="-150" cy="430" r="9" fill="#2a2630" stroke="${INK}" stroke-width="2"/><circle cx="-150" cy="500" r="9" fill="#2a2630" stroke="${INK}" stroke-width="2"/>
   <g transform="translate(-122,244)"><circle r="12" fill="#c9a24a" stroke="${INK}" stroke-width="2"/><path d="M-6,0 L6,0 M0,-6 L0,6" stroke="${INK}" stroke-width="2"/></g>`,
};

module.exports = { head, bust, HAIR, OUT, INK };
