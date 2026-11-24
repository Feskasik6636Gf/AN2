// Original 2D character system "Скетчи" — SVG generator
let uid = 0;
const OL = '#1b1d36';                       // outline ink (deep indigo, not black)
const LW = 5;

// shape with cel-shade (light from upper-left) + rim light, outlined
function shaded(d, base, shade, opts = {}) {
  const id = 's' + (uid++);
  const dx = opts.dx ?? 16, dy = opts.dy ?? 10;
  const rim = opts.rim ?? 'rgba(255,240,215,.55)';
  return `<defs><clipPath id="${id}"><path d="${d}"/></clipPath></defs>
  <g clip-path="url(#${id})">
    <path d="${d}" fill="${shade}"/>
    <path d="${d}" fill="${base}" transform="translate(${-dx},${-dy})"/>
    <path d="${d}" fill="none" stroke="${rim}" stroke-width="7" transform="translate(5,6)" opacity=".0"/>
  </g>
  <path d="${d}" fill="none" stroke="${OL}" stroke-width="${opts.lw ?? LW}" stroke-linejoin="round"/>`;
}
// thick limb: outline stroke + color stroke
function limb(pts, col, w, shade) {
  const d = 'M' + pts.map(p => p.join(',')).join(' Q').replace(/Q([^ ]+) ([^ ]+)/, 'Q$1 $2');
  const path = pts.length === 3 ? `M${pts[0]} Q${pts[1]} ${pts[2]}` : `M${pts[0]} L${pts[1]}`;
  return `<path d="${path}" stroke="${OL}" stroke-width="${w + LW * 2}" fill="none" stroke-linecap="round"/>
          <path d="${path}" stroke="${shade}" stroke-width="${w}" fill="none" stroke-linecap="round"/>
          <path d="${path}" stroke="${col}" stroke-width="${w * .55}" fill="none" stroke-linecap="round" transform="translate(-3,-3)"/>`;
}
function hand(x, y, skin, skinS, r = 17, open = false) {
  if (open) {
    const f = [-50, -15, 20, 55].map(a => { const t = a * Math.PI / 180; return `<path d="M${x} ${y} L${x + Math.sin(t) * r * 1.7} ${y - Math.cos(t) * r * 1.7}" stroke="${OL}" stroke-width="${11 + LW * 2}" stroke-linecap="round"/><path d="M${x} ${y} L${x + Math.sin(t) * r * 1.7} ${y - Math.cos(t) * r * 1.7}" stroke="${skin}" stroke-width="11" stroke-linecap="round"/>`; }).join('');
    return f + `<circle cx="${x}" cy="${y}" r="${r}" fill="${skin}" stroke="${OL}" stroke-width="${LW}"/>`;
  }
  return shaded(`M${x - r} ${y} a${r} ${r * 1.08} 0 1 0 ${2 * r} 0 a${r} ${r * 1.08} 0 1 0 ${-2 * r} 0Z`, skin, skinS, { dx: 6, dy: 4 });
}

// ---------- FACE ----------
function face(cx, cy, s, mood, c) {
  const ex = 38 * s, ey = -6 * s, ew = 25 * s, eh = (mood === 'shock' ? 33 : 29) * s;
  let out = '';
  // blush
  out += `<ellipse cx="${cx - 52 * s}" cy="${cy + 32 * s}" rx="${17 * s}" ry="${9 * s}" fill="${c.blush}" opacity="${mood === 'shy' ? .85 : .45}"/>
          <ellipse cx="${cx + 52 * s}" cy="${cy + 32 * s}" rx="${17 * s}" ry="${9 * s}" fill="${c.blush}" opacity="${mood === 'shy' ? .85 : .45}"/>`;
  for (const sx of [-1, 1]) {
    const x = cx + sx * ex, y = cy + ey;
    if (mood === 'joy') {
      out += `<path d="M${x - ew} ${y + 6 * s} Q${x} ${y - 26 * s} ${x + ew} ${y + 6 * s}" stroke="${OL}" stroke-width="${7 * s}" fill="none" stroke-linecap="round"/>`;
    } else if (mood === 'smug' || mood === 'tired') {
      out += `<ellipse cx="${x}" cy="${y}" rx="${ew}" ry="${eh}" fill="#fff" stroke="${OL}" stroke-width="${LW}"/>
              <circle cx="${x + sx * 2}" cy="${y + 8 * s}" r="${11 * s}" fill="${c.iris}"/><circle cx="${x + sx * 2}" cy="${y + 8 * s}" r="${6 * s}" fill="${OL}"/>
              <path d="M${x - ew - 3} ${y - 2 * s} L${x + ew + 3} ${y - 2 * s} L${x + ew + 3} ${y - eh - 4} L${x - ew - 3} ${y - eh - 4}Z" fill="${c.skin}"/>
              <path d="M${x - ew - 2} ${y - 2 * s} Q${x} ${y + 4 * s} ${x + ew + 2} ${y - 2 * s}" stroke="${OL}" stroke-width="${LW}" fill="none" stroke-linecap="round"/>`;
    } else {
      const pr = mood === 'shock' ? 7 : 12, px = mood === 'angry' ? -sx * 4 : (mood === 'sad' ? sx * 2 : 3);
      out += `<ellipse cx="${x}" cy="${y}" rx="${ew}" ry="${eh}" fill="#fff" stroke="${OL}" stroke-width="${LW}"/>
              <circle cx="${x + px * s}" cy="${y + 3 * s}" r="${pr * s + 4 * s}" fill="${c.iris}"/>
              <circle cx="${x + px * s}" cy="${y + 3 * s}" r="${pr * s * .55 + 2 * s}" fill="${OL}"/>
              <circle cx="${x + px * s - 5 * s}" cy="${y - 5 * s}" r="${4.5 * s}" fill="#fff"/>`;
    }
    // brows
    const by = cy - 46 * s;
    const tilt = { angry: 14, sad: -12, shock: -4, smug: 6, joy: -3, calm: 0, shy: -8, tired: 4 }[mood] ?? 0;
    const lift = mood === 'shock' ? -12 * s : 0;
    out += `<path d="M${x - 22 * s} ${by + lift + sx * tilt * s * -.0 - (sx < 0 ? -tilt : tilt) * s * .0 + (sx * tilt < 0 ? 0 : 0)} " />`;
    const y1 = by + lift + (sx < 0 ? -tilt / 2 : tilt / 2) * s * -1, y2 = by + lift + (sx < 0 ? tilt / 2 : -tilt / 2) * s * -1;
    const inner = sx < 0 ? [x + 22 * s, y2] : [x - 22 * s, y1], outer = sx < 0 ? [x - 22 * s, y1] : [x + 22 * s, y2];
    const innerY = by + lift + tilt * s * .9, outerY = by + lift - tilt * s * .3;
    out += `<path d="M${outer[0]} ${outerY} Q${x} ${Math.min(innerY, outerY) - 6 * s} ${inner[0]} ${innerY}" stroke="${c.brow}" stroke-width="${9 * s}" fill="none" stroke-linecap="round"/>`;
  }
  // nose: little hook
  out += `<path d="M${cx + 2 * s} ${cy + 12 * s} q${8 * s} ${8 * s} ${-2 * s} ${13 * s}" stroke="${c.skinS}" stroke-width="${5 * s}" fill="none" stroke-linecap="round"/>`;
  // mouth
  const my = cy + 46 * s;
  const M = {
    calm: `<path d="M${cx - 18 * s} ${my} Q${cx} ${my + 12 * s} ${cx + 18 * s} ${my - 3 * s}" stroke="${OL}" stroke-width="${LW}" fill="none" stroke-linecap="round"/>`,
    joy: `<path d="M${cx - 30 * s} ${my - 6 * s} Q${cx} ${my - 4 * s} ${cx + 30 * s} ${my - 6 * s} Q${cx + 22 * s} ${my + 30 * s} ${cx} ${my + 30 * s} Q${cx - 22 * s} ${my + 30 * s} ${cx - 30 * s} ${my - 6 * s}Z" fill="#7a2338" stroke="${OL}" stroke-width="${LW}" stroke-linejoin="round"/>
          <path d="M${cx - 13 * s} ${my + 22 * s} Q${cx} ${my + 12 * s} ${cx + 13 * s} ${my + 22 * s} Q${cx} ${my + 30 * s} ${cx - 13 * s} ${my + 22 * s}Z" fill="#ff8a8a"/>
          <path d="M${cx - 24 * s} ${my - 4 * s} L${cx + 24 * s} ${my - 4 * s} L${cx + 20 * s} ${my + 4 * s} L${cx - 20 * s} ${my + 4 * s}Z" fill="#fff"/>`,
    shock: `<ellipse cx="${cx}" cy="${my + 8 * s}" rx="${13 * s}" ry="${19 * s}" fill="#7a2338" stroke="${OL}" stroke-width="${LW}"/>`,
    angry: `<path d="M${cx - 24 * s} ${my + 10 * s} Q${cx} ${my - 8 * s} ${cx + 24 * s} ${my + 10 * s} Z" fill="#7a2338" stroke="${OL}" stroke-width="${LW}" stroke-linejoin="round"/>
            <path d="M${cx - 16 * s} ${my + 4 * s} L${cx + 16 * s} ${my + 4 * s}" stroke="#fff" stroke-width="${5 * s}"/>`,
    sad: `<path d="M${cx - 20 * s} ${my + 8 * s} Q${cx} ${my - 8 * s} ${cx + 20 * s} ${my + 8 * s}" stroke="${OL}" stroke-width="${LW}" fill="none" stroke-linecap="round"/>`,
    smug: `<path d="M${cx - 20 * s} ${my + 2 * s} Q${cx + 6 * s} ${my + 8 * s} ${cx + 24 * s} ${my - 12 * s}" stroke="${OL}" stroke-width="${LW}" fill="none" stroke-linecap="round"/>`,
    shy: `<path d="M${cx - 10 * s} ${my + 2 * s} q${5 * s} ${-6 * s} ${10 * s} 0 q${5 * s} ${6 * s} ${10 * s} 0" stroke="${OL}" stroke-width="${LW}" fill="none" stroke-linecap="round"/>`,
    tired: `<path d="M${cx - 16 * s} ${my + 4 * s} L${cx + 16 * s} ${my + 2 * s}" stroke="${OL}" stroke-width="${LW}" stroke-linecap="round"/>`,
  };
  out += M[mood] || M.calm;
  if (mood === 'shock' || mood === 'sad') out += `<path d="M${cx + 92 * s} ${cy - 50 * s} q${12 * s} ${20 * s} 0 ${30 * s} q${-12 * s} ${-10 * s} 0 ${-30 * s}Z" fill="#9fd8ff" stroke="${OL}" stroke-width="${3.5 * s}"/>`;
  if (mood === 'angry') out += `<g stroke="#e8344a" stroke-width="${6 * s}" stroke-linecap="round" fill="none"><path d="M${cx + 70 * s} ${cy - 92 * s} l${12 * s} ${12 * s} M${cx + 92 * s} ${cy - 92 * s} l${-12 * s} ${12 * s} M${cx + 66 * s} ${cy - 76 * s} l${-6 * s} ${8 * s} M${cx + 96 * s} ${cy - 76 * s} l${6 * s} ${8 * s}"/></g>`;
  return out;
}

// ---------- HEAD: soft "chestnut" shape (wider cheeks, flat top) ----------
function headPath(cx, cy, s) {
  const w = 108 * s, t = cy - 96 * s, b = cy + 88 * s;
  return `M${cx - w * .82} ${t + 20 * s} Q${cx - w * .9} ${t} ${cx - w * .4} ${t - 4 * s} L${cx + w * .4} ${t - 4 * s} Q${cx + w * .9} ${t} ${cx + w * .82} ${t + 20 * s}
          Q${cx + w * 1.06} ${cy + 20 * s} ${cx + w * .78} ${b - 22 * s} Q${cx + w * .5} ${b + 4 * s} ${cx} ${b} Q${cx - w * .5} ${b + 4 * s} ${cx - w * .78} ${b - 22 * s} Q${cx - w * 1.06} ${cy + 20 * s} ${cx - w * .82} ${t + 20 * s}Z`;
}
function ear(cx, cy, s, sx, c) {
  const x = cx + sx * 112 * s;
  return shaded(`M${x - 14 * s} ${cy - 10 * s} a${15 * s} ${20 * s} 0 1 0 ${28 * s} 0 a${15 * s} ${20 * s} 0 1 0 ${-28 * s} 0Z`, c.skin, c.skinS, { dx: 4, dy: 3 });
}

// ---------- HAIR STYLES ----------
const HAIR = {
  flick: (cx, cy, s) => `M${cx - 100 * s} ${cy - 40 * s} Q${cx - 112 * s} ${cy - 120 * s} ${cx - 40 * s} ${cy - 128 * s} Q${cx - 10 * s} ${cy - 175 * s} ${cx + 40 * s} ${cy - 150 * s} Q${cx + 30 * s} ${cy - 135 * s} ${cx + 50 * s} ${cy - 128 * s} Q${cx + 112 * s} ${cy - 120 * s} ${cx + 100 * s} ${cy - 40 * s} Q${cx + 90 * s} ${cy - 75 * s} ${cx + 55 * s} ${cy - 82 * s} Q${cx + 20 * s} ${cy - 60 * s} ${cx - 10 * s} ${cy - 84 * s} Q${cx - 40 * s} ${cy - 62 * s} ${cx - 62 * s} ${cy - 84 * s} Q${cx - 90 * s} ${cy - 72 * s} ${cx - 100 * s} ${cy - 40 * s}Z`,
  bob: (cx, cy, s) => `M${cx - 118 * s} ${cy + 40 * s} Q${cx - 130 * s} ${cy - 130 * s} ${cx} ${cy - 132 * s} Q${cx + 130 * s} ${cy - 130 * s} ${cx + 118 * s} ${cy + 40 * s} L${cx + 92 * s} ${cy + 40 * s} Q${cx + 96 * s} ${cy - 40 * s} ${cx + 70 * s} ${cy - 70 * s} Q${cx + 10 * s} ${cy - 58 * s} ${cx - 30 * s} ${cy - 92 * s} Q${cx - 60 * s} ${cy - 60 * s} ${cx - 92 * s} ${cy - 50 * s} Q${cx - 96 * s} ${cy - 10 * s} ${cx - 92 * s} ${cy + 40 * s}Z`,
  buzz: (cx, cy, s) => `M${cx - 96 * s} ${cy - 50 * s} Q${cx - 100 * s} ${cy - 112 * s} ${cx} ${cy - 112 * s} Q${cx + 100 * s} ${cy - 112 * s} ${cx + 96 * s} ${cy - 50 * s} Q${cx + 60 * s} ${cy - 80 * s} ${cx} ${cy - 78 * s} Q${cx - 60 * s} ${cy - 80 * s} ${cx - 96 * s} ${cy - 50 * s}Z`,
};

// ---------- FULL CHARACTER ----------
function character(o) {
  const c = o.c, s = o.s ?? 1, X = o.x, G = o.y; // G = ground
  let out = `<ellipse cx="${X}" cy="${G + 4}" rx="${95 * s}" ry="${14 * s}" fill="rgba(40,30,70,.22)"/>`;
  const hipY = G - 175 * s, shY = G - 330 * s, hx = 34 * s;
  // legs
  const L = o.legs ?? [[0, 0], [0, 0]];
  for (const [i, sx] of [[0, -1], [1, 1]]) {
    out += limb([[X + sx * hx, hipY], [X + sx * hx + L[i][0] * s, G - 30 * s + L[i][1] * s]], c.pants, 30 * s, c.pantsS);
  }
  // shoes
  for (const [i, sx] of [[0, -1], [1, 1]]) {
    const fx = X + sx * hx + L[i][0] * s + sx * 10 * s, fy = G - 14 * s + L[i][1] * s;
    out += shaded(`M${fx - 34 * s} ${fy + 12 * s} Q${fx - 36 * s} ${fy - 22 * s} ${fx - 4 * s} ${fy - 22 * s} Q${fx + 20 * s} ${fy - 22 * s} ${fx + 36 * s} ${fy - 2 * s} Q${fx + 42 * s} ${fy + 12 * s} ${fx + 30 * s} ${fy + 14 * s}Z`, c.shoe, c.shoeS, { dx: 6, dy: 5 });
    out += `<path d="M${fx - 33 * s} ${fy + 6 * s} L${fx + 36 * s} ${fy + 6 * s}" stroke="${c.sole}" stroke-width="${8 * s}"/>`;
  }
  // back arm (drawn before torso)
  const A = o.arms;
  const arm = (sx, a) => {
    const sx0 = X + sx * 70 * s, sy0 = shY + 28 * s;
    const el = [sx0 + sx * a[0] * s, sy0 + a[1] * s], hd = [sx0 + sx * a[2] * s, sy0 + a[3] * s];
    return limb([[sx0, sy0], el, hd], c.top, 32 * s, c.topS) + hand(hd[0], hd[1], c.skin, c.skinS, 18 * s, a[4]);
  };
  // torso: hoodie / jacket
  const tw = 78 * s, bw = 86 * s;
  const torso = `M${X - tw} ${shY + 18 * s} Q${X - tw} ${shY - 4 * s} ${X - tw + 30 * s} ${shY - 4 * s} L${X + tw - 30 * s} ${shY - 4 * s} Q${X + tw} ${shY - 4 * s} ${X + tw} ${shY + 18 * s} L${X + bw} ${hipY + 8 * s} Q${X + bw} ${hipY + 26 * s} ${X + bw - 20 * s} ${hipY + 26 * s} L${X - bw + 20 * s} ${hipY + 26 * s} Q${X - bw} ${hipY + 26 * s} ${X - bw} ${hipY + 8 * s}Z`;
  out += arm(-1, A[0]);
  out += shaded(torso, c.top, c.topS, { dx: 20, dy: 6 });
  // waistband
  out += `<path d="M${X - bw + 4 * s} ${hipY + 4 * s} L${X + bw - 4 * s} ${hipY + 4 * s}" stroke="${c.topS}" stroke-width="${12 * s}"/>`;
  if (o.outfit === 'hoodie') {
    out += `<path d="M${X - 44 * s} ${hipY - 44 * s} L${X + 44 * s} ${hipY - 44 * s} L${X + 52 * s} ${hipY - 4 * s} L${X - 52 * s} ${hipY - 4 * s}Z" fill="${c.topS}" stroke="${OL}" stroke-width="${4 * s}" stroke-linejoin="round"/>`;
    out += `<path d="M${X - 50 * s} ${shY - 2 * s} Q${X} ${shY + 40 * s} ${X + 50 * s} ${shY - 2 * s}" stroke="${OL}" stroke-width="${4 * s}" fill="${c.topS}"/>`;
    out += `<path d="M${X - 14 * s} ${shY + 16 * s} l${-4 * s} ${46 * s} M${X + 14 * s} ${shY + 16 * s} l${4 * s} ${40 * s}" stroke="${c.accent}" stroke-width="${6 * s}" stroke-linecap="round"/>`;
    out += `<circle cx="${X - 18 * s}" cy="${shY + 64 * s}" r="${6 * s}" fill="${c.accent}" stroke="${OL}" stroke-width="3"/><circle cx="${X + 18 * s}" cy="${shY + 58 * s}" r="${6 * s}" fill="${c.accent}" stroke="${OL}" stroke-width="3"/>`;
    // signature: bolt patch
    out += `<path d="M${X + 46 * s} ${shY + 40 * s} l${-14 * s} ${22 * s} l${12 * s} 0 l${-8 * s} ${20 * s} l${22 * s} ${-28 * s} l${-12 * s} 0 l${8 * s} ${-14 * s}Z" fill="${c.accent}" stroke="${OL}" stroke-width="${3 * s}" stroke-linejoin="round"/>`;
  }
  if (o.outfit === 'jacket') {
    out += `<path d="M${X} ${shY} L${X} ${hipY + 24 * s}" stroke="${OL}" stroke-width="${4 * s}"/>`;
    out += `<path d="M${X - 40 * s} ${shY - 2 * s} L${X} ${shY + 50 * s} L${X + 40 * s} ${shY - 2 * s}" fill="${c.accent}" stroke="${OL}" stroke-width="${4 * s}" stroke-linejoin="round"/>`;
    out += `<path d="M${X - 40 * s} ${shY - 2 * s} L${X - 18 * s} ${shY + 50 * s} M${X + 40 * s} ${shY - 2 * s} L${X + 18 * s} ${shY + 50 * s}" stroke="${OL}" stroke-width="${4 * s}"/>`;
    out += `<rect x="${X - 66 * s}" y="${hipY - 52 * s}" width="${34 * s}" height="${26 * s}" rx="${4 * s}" fill="${c.topS}" stroke="${OL}" stroke-width="${3.5 * s}"/>`;
    out += `<circle cx="${X - 50 * s}" cy="${shY + 50 * s}" r="${12 * s}" fill="#ffd34d" stroke="${OL}" stroke-width="${3 * s}"/><path d="M${X - 55 * s} ${shY + 50 * s} l${4 * s} ${4 * s} l${7 * s} ${-8 * s}" stroke="${OL}" stroke-width="${3 * s}" fill="none"/>`;
  }
  if (o.outfit === 'track') {
    out += `<path d="M${X - 30 * s} ${shY - 2 * s} L${X - 30 * s} ${shY + 26 * s} L${X + 30 * s} ${shY + 26 * s} L${X + 30 * s} ${shY - 2 * s}" fill="${c.topS}" stroke="${OL}" stroke-width="${4 * s}" stroke-linejoin="round"/>`;
    out += `<path d="M${X} ${shY + 26 * s} L${X} ${hipY + 24 * s}" stroke="${c.accent}" stroke-width="${5 * s}"/>`;
    out += `<path d="M${X - tw + 6 * s} ${shY + 24 * s} L${X - bw + 8 * s} ${hipY} M${X + tw - 6 * s} ${shY + 24 * s} L${X + bw - 8 * s} ${hipY}" stroke="${c.accent}" stroke-width="${8 * s}"/>`;
  }
  // neck
  out += shaded(`M${X - 18 * s} ${shY + 4 * s} L${X - 18 * s} ${shY - 26 * s} L${X + 18 * s} ${shY - 26 * s} L${X + 18 * s} ${shY + 4 * s}Z`, c.skin, c.skinS, { dx: 10, dy: 0, lw: 4 });
  out += arm(1, A[1]);
  // head
  const hcx = X + (o.lean ?? 0) * s, hcy = shY - 110 * s;
  out += head(hcx, hcy, s, o.mood ?? 'calm', c, o.hair, o.extra);
  return out;
}
function head(hcx, hcy, s, mood, c, hair, extra) {
  let out = '';
  if (hair === 'bob') out += shaded(HAIR.bob(hcx, hcy, s), c.hair, c.hairS, { dx: 12, dy: 8 });
  out += ear(hcx, hcy, s, -1, c) + ear(hcx, hcy, s, 1, c);
  out += shaded(headPath(hcx, hcy, s), c.skin, c.skinS, { dx: 18, dy: 12 });
  if (hair === 'flick') out += shaded(HAIR.flick(hcx, hcy, s), c.hair, c.hairS, { dx: 10, dy: 8 });
  if (hair === 'buzz') out += shaded(HAIR.buzz(hcx, hcy, s), c.hair, c.hairS, { dx: 8, dy: 6 });
  if (hair === 'bob') {
    out += shaded(`M${hcx - 92 * s} ${hcy - 50 * s} Q${hcx - 60 * s} ${hcy - 128 * s} ${hcx + 30 * s} ${hcy - 120 * s} Q${hcx + 80 * s} ${hcy - 110 * s} ${hcx + 92 * s} ${hcy - 60 * s} Q${hcx + 40 * s} ${hcy - 70 * s} ${hcx - 20 * s} ${hcy - 90 * s} Q${hcx - 50 * s} ${hcy - 60 * s} ${hcx - 92 * s} ${hcy - 50 * s}Z`, c.hair, c.hairS, { dx: 6, dy: 6 });
    out += `<g transform="translate(${hcx + 70 * s},${hcy - 92 * s}) rotate(-30)"><rect x="${-24 * s}" y="${-9 * s}" width="${48 * s}" height="${18 * s}" rx="${9 * s}" fill="${c.accent}" stroke="${OL}" stroke-width="${4 * s}"/><circle cx="0" cy="0" r="${5 * s}" fill="#fff"/></g>`;
  }
  if (extra === 'cap') {
    out += shaded(`M${hcx - 98 * s} ${hcy - 58 * s} Q${hcx - 96 * s} ${hcy - 136 * s} ${hcx} ${hcy - 138 * s} Q${hcx + 96 * s} ${hcy - 136 * s} ${hcx + 98 * s} ${hcy - 58 * s}Z`, c.capC, c.capS, { dx: 8, dy: 8 });
    out += shaded(`M${hcx - 100 * s} ${hcy - 60 * s} L${hcx + 150 * s} ${hcy - 64 * s} Q${hcx + 160 * s} ${hcy - 50 * s} ${hcx + 140 * s} ${hcy - 46 * s} L${hcx - 100 * s} ${hcy - 50 * s}Z`, c.capS, c.capS, { dx: 0, dy: 0 });
    out += `<circle cx="${hcx - 10 * s}" cy="${hcy - 104 * s}" r="${14 * s}" fill="${c.accent}" stroke="${OL}" stroke-width="${3.5 * s}"/>`;
  }
  out += face(hcx, hcy, s, mood, c);
  return out;
}

const PAL = {
  hero: { skin: '#f2b98f', skinS: '#d98e6c', blush: '#ff7f7f', iris: '#3f7fd6', brow: '#3a2418', hair: '#4a2d22', hairS: '#2e1a14',
          top: '#ffb23e', topS: '#e0862a', accent: '#2f6fe0', pants: '#3a4a7a', pantsS: '#2a365c', shoe: '#ffffff', shoeS: '#c9d2e8', sole: '#ff5a5f' },
  girl: { skin: '#a8734f', skinS: '#80553a', blush: '#ff7a8c', iris: '#2b9d7a', brow: '#1e120d', hair: '#1f1b2e', hairS: '#0f0d18',
          top: '#3fbfa5', topS: '#2a8f7c', accent: '#ff5f8f', pants: '#f4e6cf', pantsS: '#cdb795', shoe: '#ff5f8f', shoeS: '#c93f6a', sole: '#ffffff' },
  rival: { skin: '#f6d2b8', skinS: '#dba98a', blush: '#ff9a8a', iris: '#8a4fd1', brow: '#9a6a2a', hair: '#e8c26a', hairS: '#b58e3c',
           top: '#e8434f', topS: '#b32e3a', accent: '#ffffff', pants: '#e8434f', pantsS: '#b32e3a', shoe: '#22243f', shoeS: '#121328', sole: '#ffffff',
           capC: '#22243f', capS: '#121328' },
};
module.exports = { character, head, PAL, OL };
