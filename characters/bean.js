// "Бобы" — original characters for the What-If niche (dark glossy heads), SVG
let seed=21;const rnd=()=>{seed=(seed*16807)%2147483647;return (seed-1)/2147483646};
const OL='#0d0b12';
let n=0;const uid=p=>p+(n++);

function head(x,y,o){ // x,y = head centre; o.s scale
 const s=o.s??1, rw=82*s, rh=74*s, g=uid('hg'), sp=uid('sp'), rim=o.rim??'#ffb27a';
 let out=`<defs>
  <radialGradient id="${g}" cx=".36" cy=".3" r=".85"><stop offset="0" stop-color="${o.skinL??'#4a3f5e'}"/><stop offset=".55" stop-color="${o.skin??'#231d30'}"/><stop offset="1" stop-color="${o.skinD??'#0f0c16'}"/></radialGradient>
  <radialGradient id="${sp}" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>`;
 if(o.hairBack) out+=o.hairBack(x,y,s);
 out+=`<ellipse cx="${x}" cy="${y}" rx="${rw}" ry="${rh}" fill="url(#${g})" stroke="${OL}" stroke-width="${3*s}"/>`;
 // rim light (right) + bounce (bottom)
 out+=`<path d="M${x+rw*.55},${y-rh*.78} A${rw} ${rh} 0 0 1 ${x+rw*.62},${y+rh*.74}" stroke="${rim}" stroke-width="${4.5*s}" fill="none" opacity=".85" stroke-linecap="round"/>`;
 out+=`<path d="M${x-rw*.5},${y+rh*.84} A${rw} ${rh} 0 0 0 ${x+rw*.3},${y+rh*.96}" stroke="${o.bounce??'#7a5a8a'}" stroke-width="${3*s}" fill="none" opacity=".5"/>`;
 // specular
 out+=`<ellipse cx="${x-rw*.42}" cy="${y-rh*.52}" rx="${rw*.32}" ry="${rh*.18}" fill="url(#${sp})" transform="rotate(-24 ${x-rw*.42} ${y-rh*.52})"/>`;
 // face
 const m=o.mood??'calm', ex=30*s, ey=y+(-4)*s, lk=(o.look??0)*s;
 // blush
 out+=`<ellipse cx="${x-50*s}" cy="${y+22*s}" rx="${13*s}" ry="${7*s}" fill="#ff7a8a" opacity="${m==='shy'?.75:.42}"/><ellipse cx="${x+50*s}" cy="${y+22*s}" rx="${13*s}" ry="${7*s}" fill="#ff7a8a" opacity="${m==='shy'?.75:.42}"/>`;
 for(const sx of [-1,1]){const cx=x+sx*ex;
  if(m==='joy'){out+=`<path d="M${cx-15*s},${ey+4*s} Q${cx},${ey-18*s} ${cx+15*s},${ey+4*s}" stroke="#fff" stroke-width="${6*s}" fill="none" stroke-linecap="round"/>`;}
  else{
   const ry=(m==='shock'?25:22)*s, rx=(m==='shock'?19:17)*s, pr=(m==='shock'?6:8.5)*s;
   const ec=uid('ec');out+=`<defs><clipPath id="${ec}"><ellipse cx="${cx}" cy="${ey}" rx="${rx}" ry="${ry}"/></clipPath></defs><ellipse cx="${cx}" cy="${ey}" rx="${rx}" ry="${ry}" fill="#fbf7f2"/><g clip-path="url(#${ec})">`;
   const py=ey+(m==='sad'?4:1)*s+(m==='smug'?7*s:0);
   out+=`<circle cx="${cx+lk+(m==='angry'?-sx*3*s:0)}" cy="${py}" r="${pr}" fill="${OL}"/><circle cx="${cx+lk-3*s}" cy="${py-4*s}" r="${2.6*s}" fill="#fff"/>`;
   if(m==='smug'||m==='tired'||m==='angry'){ // lid
    const ly=m==='angry'?ey-ry*.25:ey-ry*.1;
    out+=`<path d="M${cx-rx-2},${ly+(m==='angry'?sx*6*s:0)} L${cx+rx+2},${ly-(m==='angry'?sx*6*s:0)} L${cx+rx+2},${ey-ry-3} L${cx-rx-2},${ey-ry-3}Z" fill="#2a2238"/>
          <path d="M${cx-rx},${ly+(m==='angry'?sx*6*s:0)} L${cx+rx},${ly-(m==='angry'?sx*6*s:0)}" stroke="${OL}" stroke-width="${3*s}" stroke-linecap="round"/>`;}
   out+=`</g><ellipse cx="${cx}" cy="${ey}" rx="${rx}" ry="${ry}" fill="none" stroke="${OL}" stroke-width="${2.4*s}"/>`;
  }
  // floating light brows (signature)
  const tilt={angry:9,sad:-8,shock:-2,smug:4,joy:-2,calm:0,shy:-6,tired:3}[m]??0, by=ey-(m==='shock'?36:31)*s;
  out+=`<path d="M${cx-13*s},${by+(sx<0?-tilt:tilt)*s*.0+(sx>0?tilt:-tilt)*s*-.0} " />`;
  const inY=by+tilt*s, outY=by-tilt*s*.4;
  const ix=cx-sx*12*s, oxp=cx+sx*12*s;
  out+=`<path d="M${oxp},${outY} Q${cx},${Math.min(inY,outY)-5*s} ${ix},${inY}" stroke="${o.brow??'#e9dccb'}" stroke-width="${5*s}" fill="none" stroke-linecap="round" opacity=".92"/>`;
 }
 const my=y+28*s;
 const MO={
  calm:`<path d="M${x-14*s},${my} Q${x},${my+9*s} ${x+14*s},${my-1*s}" stroke="#fff" stroke-width="${3.6*s}" fill="none" stroke-linecap="round"/>`,
  joy:`<path d="M${x-22*s},${my-4*s} Q${x},${my-2*s} ${x+22*s},${my-4*s} Q${x+16*s},${my+20*s} ${x},${my+20*s} Q${x-16*s},${my+20*s} ${x-22*s},${my-4*s}Z" fill="#fff"/><path d="M${x-10*s},${my+14*s} Q${x},${my+8*s} ${x+10*s},${my+14*s} Q${x},${my+19*s} ${x-10*s},${my+14*s}Z" fill="#ff8a9a"/>`,
  shock:`<ellipse cx="${x}" cy="${my+4*s}" rx="${9*s}" ry="${13*s}" fill="#fff"/><ellipse cx="${x}" cy="${my+7*s}" rx="${5*s}" ry="${7*s}" fill="#ff8a9a"/>`,
  angry:`<path d="M${x-16*s},${my+6*s} Q${x},${my-6*s} ${x+16*s},${my+6*s}" stroke="#fff" stroke-width="${3.6*s}" fill="none" stroke-linecap="round"/>`,
  sad:`<path d="M${x-14*s},${my+6*s} Q${x},${my-4*s} ${x+14*s},${my+6*s}" stroke="#fff" stroke-width="${3.6*s}" fill="none" stroke-linecap="round"/>`,
  smug:`<path d="M${x-14*s},${my+2*s} Q${x+4*s},${my+6*s} ${x+18*s},${my-8*s}" stroke="#fff" stroke-width="${3.6*s}" fill="none" stroke-linecap="round"/>`,
  shy:`<path d="M${x-8*s},${my+2*s} q${4*s},${-5*s} ${8*s},0 q${4*s},${5*s} ${8*s},0" stroke="#fff" stroke-width="${3.2*s}" fill="none" stroke-linecap="round"/>`,
  tired:`<path d="M${x-11*s},${my+3*s} L${x+11*s},${my+2*s}" stroke="#fff" stroke-width="${3.4*s}" stroke-linecap="round"/>`,
 };out+=MO[m]||MO.calm;
 if(m==='shock'||m==='sad')out+=`<path d="M${x+72*s},${y-40*s} q${10*s},${16*s} 0,${24*s} q${-10*s},${-8*s} 0,${-24*s}Z" fill="#a8dcff" stroke="${OL}" stroke-width="${2*s}"/>`;
 if(o.hair) out+=o.hair(x,y,s);
 return out;
}

// hair pieces (sit on top like caps, glossy)
const HAIR={
 swoop:(c,cL)=>(x,y,s)=>`<path d="M${x-80*s},${y-16*s} C${x-96*s},${y-86*s} ${x-30*s},${y-110*s} ${x+20*s},${y-104*s} C${x+70*s},${y-100*s} ${x+96*s},${y-64*s} ${x+80*s},${y-14*s} C${x+70*s},${y-44*s} ${x+46*s},${y-58*s} ${x+18*s},${y-52*s} C${x+28*s},${y-64*s} ${x+26*s},${y-72*s} ${x+18*s},${y-78*s} C${x-4*s},${y-54*s} ${x-44*s},${y-50*s} ${x-80*s},${y-16*s}Z" fill="${c}" stroke="${OL}" stroke-width="${2.6*s}" stroke-linejoin="round"/>
  <path d="M${x-50*s},${y-74*s} C${x-20*s},${y-96*s} ${x+30*s},${y-96*s} ${x+60*s},${y-70*s}" stroke="${cL}" stroke-width="${4*s}" fill="none" stroke-linecap="round" opacity=".8"/>`,
 buns:(c,cL)=>(x,y,s)=>[-1,1].map(sx=>`<circle cx="${x+sx*62*s}" cy="${y-62*s}" r="${26*s}" fill="${c}" stroke="${OL}" stroke-width="${2.6*s}"/><path d="M${x+sx*62*s-12*s},${y-74*s} q${12*s},${-8*s} ${22*s},${2*s}" stroke="${cL}" stroke-width="${3*s}" fill="none" opacity=".8"/>`).join('')+
  `<path d="M${x-78*s},${y-20*s} C${x-80*s},${y-80*s} ${x-30*s},${y-96*s} ${x},${y-96*s} C${x+30*s},${y-96*s} ${x+80*s},${y-80*s} ${x+78*s},${y-20*s} C${x+60*s},${y-50*s} ${x+30*s},${y-58*s} ${x},${y-56*s} C${x-30*s},${y-58*s} ${x-60*s},${y-50*s} ${x-78*s},${y-20*s}Z" fill="${c}" stroke="${OL}" stroke-width="${2.6*s}"/>
  <path d="M${x-40*s},${y-80*s} C${x-10*s},${y-92*s} ${x+30*s},${y-90*s} ${x+50*s},${y-76*s}" stroke="${cL}" stroke-width="${3.5*s}" fill="none" opacity=".8"/>`,
 beanie:(c,cL)=>(x,y,s)=>`<path d="M${x-82*s},${y-12*s} C${x-90*s},${y-90*s} ${x-30*s},${y-118*s} ${x},${y-118*s} C${x+30*s},${y-118*s} ${x+90*s},${y-90*s} ${x+82*s},${y-12*s}Z" fill="${c}" stroke="${OL}" stroke-width="${2.6*s}"/>
  ${[...Array(9)].map((_,i)=>`<path d="M${x-64*s+i*16*s},${y-24*s} L${x-56*s+i*14*s},${y-96*s}" stroke="${cL}" stroke-width="${2*s}" opacity=".5"/>`).join('')}
  <rect x="${x-86*s}" y="${y-34*s}" width="${172*s}" height="${26*s}" rx="${12*s}" fill="${cL}" stroke="${OL}" stroke-width="${2.6*s}"/>
  <circle cx="${x+10*s}" cy="${y-124*s}" r="${16*s}" fill="${cL}" stroke="${OL}" stroke-width="${2.4*s}"/>`,
};

function mitten(x,y,s,rot,col,colL){return `<g transform="translate(${x},${y}) rotate(${rot})">
 <path d="M${-15*s},${-8*s} C${-16*s},${-26*s} ${16*s},${-26*s} ${15*s},${-8*s} L${15*s},${12*s} C${15*s},${24*s} ${-15*s},${24*s} ${-15*s},${12*s}Z" fill="${col}" stroke="${OL}" stroke-width="${2.4*s}"/>
 <path d="M${-15*s},${2*s} C${-28*s},${-2*s} ${-30*s},${-16*s} ${-20*s},${-18*s} C${-14*s},${-18*s} ${-12*s},${-10*s} ${-12*s},${-4*s}" fill="${col}" stroke="${OL}" stroke-width="${2.4*s}"/>
 <ellipse cx="${-4*s}" cy="${-12*s}" rx="${6*s}" ry="${4*s}" fill="${colL}" opacity=".6"/></g>`;}

function body(o){ // full character, feet at (X,G)
 const s=o.s??1, X=o.x, G=o.y, c=o.c; let out='';
 const blur=uid('bl');
 out+=`<defs><filter id="${blur}"><feGaussianBlur stdDeviation="${6*s}"/></filter></defs><ellipse cx="${X}" cy="${G+2*s}" rx="${70*s}" ry="${11*s}" fill="#2a1a30" opacity=".35" filter="url(#${blur})"/>`;
 // legs
 const hipY=G-120*s, L=o.legs??[0,0];
 for(const [i,sx] of [[0,-1],[1,1]]){
  out+=`<path d="M${X+sx*22*s},${hipY} L${X+sx*24*s+L[i]*s},${G-14*s}" stroke="${OL}" stroke-width="${30*s}" stroke-linecap="round"/><path d="M${X+sx*22*s},${hipY} L${X+sx*24*s+L[i]*s},${G-14*s}" stroke="${c.pants}" stroke-width="${24*s}" stroke-linecap="round"/>
       <path d="M${X+sx*22*s-5*s},${hipY+10*s} L${X+sx*24*s+L[i]*s-5*s},${G-24*s}" stroke="${c.pantsL}" stroke-width="${5*s}" stroke-linecap="round" opacity=".5"/>`;
  const fx=X+sx*26*s+L[i]*s+sx*6*s, fy=G-8*s;
  out+=`<path d="M${fx-26*s},${fy+8*s} C${fx-28*s},${fy-16*s} ${fx+4*s},${fy-18*s} ${fx+16*s},${fy-8*s} C${fx+28*s},${fy-2*s} ${fx+28*s},${fy+8*s} ${fx+20*s},${fy+9*s}Z" fill="${c.shoe}" stroke="${OL}" stroke-width="${2.4*s}"/>
       <path d="M${fx-25*s},${fy+4*s} L${fx+24*s},${fy+4*s}" stroke="${c.sole}" stroke-width="${5*s}"/>`;
 }
 // torso
 const sh=G-232*s, tw=60*s, bw=64*s;
 const T=`M${X-tw},${sh+30*s} C${X-tw},${sh} ${X-tw+24*s},${sh-6*s} ${X},${sh-6*s} C${X+tw-24*s},${sh-6*s} ${X+tw},${sh} ${X+tw},${sh+30*s} L${X+bw},${hipY+6*s} C${X+bw},${hipY+20*s} ${X+bw-10*s},${hipY+22*s} ${X+bw-22*s},${hipY+22*s} L${X-bw+22*s},${hipY+22*s} C${X-bw+10*s},${hipY+22*s} ${X-bw},${hipY+20*s} ${X-bw},${hipY+6*s}Z`;
 const tg=uid('tg'), tc=uid('tc');
 out+=`<defs><linearGradient id="${tg}" x1="0" y1="0" x2="1" y2=".3"><stop offset="0" stop-color="${c.topL}"/><stop offset=".5" stop-color="${c.top}"/><stop offset="1" stop-color="${c.topS}"/></linearGradient><clipPath id="${tc}"><path d="${T}"/></clipPath></defs>`;
 // back arm
 const A=o.arms??[[0,0],[0,0]];
 const arm=(sx,a)=>{const x0=X+sx*(tw-8*s), y0=sh+24*s, ex=x0+sx*(14+a[0])*s, ey=y0+(52+a[1])*s, hx=x0+sx*(10+a[2])*s, hy=y0+(100+a[3])*s;
  return `<path d="M${x0},${y0} Q${ex},${ey} ${hx},${hy}" stroke="${OL}" stroke-width="${30*s}" fill="none" stroke-linecap="round"/><path d="M${x0},${y0} Q${ex},${ey} ${hx},${hy}" stroke="${c.top}" stroke-width="${24*s}" fill="none" stroke-linecap="round"/>
   <path d="M${x0-sx*4*s},${y0+6*s} Q${ex-sx*4*s},${ey} ${hx-sx*3*s},${hy-10*s}" stroke="${sx<0?c.topL:c.topS}" stroke-width="${6*s}" fill="none" stroke-linecap="round" opacity=".7"/>
   <path d="M${hx-12*s},${hy-8*s} L${hx+12*s},${hy-8*s}" stroke="${c.cuff??c.topS}" stroke-width="${10*s}" stroke-linecap="round"/>
   ${mitten(hx,hy+8*s,s,a[4]??0,o.skinHand??'#231d30','#6a5a80')}`;};
 out+=arm(-1,A[0]);
 out+=`<path d="${T}" fill="url(#${tg})"/><g clip-path="url(#${tc})">${o.outfit?o.outfit(X,sh,hipY,s,c):''}</g><path d="${T}" fill="none" stroke="${OL}" stroke-width="${2.8*s}"/>`;
 out+=`<path d="M${X+tw-4*s},${sh+20*s} L${X+bw-4*s},${hipY+4*s}" stroke="${o.rim??'#ffb27a'}" stroke-width="${4*s}" opacity=".8" stroke-linecap="round"/>`;
 out+=arm(1,A[1]);
 // head sits on collar
 out+=head(X+(o.lean??0)*s,sh-66*s,{...o.h,s:s*(o.headS??1),rim:o.rim});
 return out;
}

// outfits
const OUT={
 hoodie:(X,sh,hip,s,c)=>`<path d="M${X-40*s},${sh-2*s} Q${X},${sh+34*s} ${X+40*s},${sh-2*s}" fill="${c.topS}" stroke="${OL}" stroke-width="${2.4*s}"/>
  <path d="M${X-12*s},${sh+16*s} l${-3*s},${44*s} M${X+12*s},${sh+16*s} l${3*s},${38*s}" stroke="${c.acc}" stroke-width="${5*s}" stroke-linecap="round"/>
  <path d="M${X-38*s},${hip-36*s} L${X+38*s},${hip-36*s} L${X+44*s},${hip-2*s} L${X-44*s},${hip-2*s}Z" fill="${c.topS}" stroke="${OL}" stroke-width="${2.2*s}" opacity=".9"/>
  <rect x="${X-70*s}" y="${hip-2*s}" width="${140*s}" height="${30*s}" fill="${c.topS}"/>
  <g transform="translate(${X+30*s},${sh+46*s})"><circle r="${11*s}" fill="${c.acc}" stroke="${OL}" stroke-width="${2*s}"/><path d="M${-5*s},${2*s} L0,${-5*s} L${5*s},${2*s}" stroke="#fff" stroke-width="${2.4*s}" fill="none"/></g>`,
 varsity:(X,sh,hip,s,c)=>`<rect x="${X-14*s}" y="${sh-6*s}" width="${28*s}" height="${300*s}" fill="${c.acc}"/>
  <path d="M${X},${sh+10*s} L${X},${hip+20*s}" stroke="${OL}" stroke-width="${2*s}"/>
  ${[0,1,2,3].map(i=>`<circle cx="${X-20*s}" cy="${sh+30*s+i*22*s}" r="${3.4*s}" fill="#fff" stroke="${OL}" stroke-width="${1.4*s}"/>`).join('')}
  <path d="M${X-40*s},${sh} L${X-14*s},${sh+40*s} L${X-14*s},${sh-6*s}Z M${X+40*s},${sh} L${X+14*s},${sh+40*s} L${X+14*s},${sh-6*s}Z" fill="${c.trim}" stroke="${OL}" stroke-width="${2*s}"/>
  <rect x="${X-70*s}" y="${hip-4*s}" width="${140*s}" height="${30*s}" fill="${c.trim}"/>
  <text x="${X+36*s}" y="${sh+66*s}" font-family="DejaVu Sans" font-weight="bold" font-size="${30*s}" fill="${c.trim}" stroke="${OL}" stroke-width="${1.6*s}" text-anchor="middle">K</text>`,
 overall:(X,sh,hip,s,c)=>`<rect x="${X-70*s}" y="${sh-20*s}" width="${140*s}" height="${70*s}" fill="${c.shirt}"/>
  ${[0,1,2].map(i=>`<rect x="${X-70*s}" y="${sh-10*s+i*20*s}" width="${140*s}" height="${8*s}" fill="${c.shirtS}"/>`).join('')}
  <path d="M${X-44*s},${sh+44*s} L${X+44*s},${sh+44*s} L${X+70*s},${hip+30*s} L${X-70*s},${hip+30*s}Z" fill="${c.top}" stroke="${OL}" stroke-width="${2.2*s}"/>
  <path d="M${X-40*s},${sh+46*s} L${X-50*s},${sh-6*s} M${X+40*s},${sh+46*s} L${X+50*s},${sh-6*s}" stroke="${c.top}" stroke-width="${12*s}"/>
  <circle cx="${X-38*s}" cy="${sh+50*s}" r="${5*s}" fill="#f2d37a" stroke="${OL}" stroke-width="${1.6*s}"/><circle cx="${X+38*s}" cy="${sh+50*s}" r="${5*s}" fill="#f2d37a" stroke="${OL}" stroke-width="${1.6*s}"/>
  <rect x="${X-20*s}" y="${sh+62*s}" width="${40*s}" height="${30*s}" rx="${4*s}" fill="${c.topS}" stroke="${OL}" stroke-width="${2*s}"/>`,
};
module.exports={head,body,HAIR,OUT,OL,rnd};
