// "Бобы" — original characters for the What-If niche (dark glossy heads), SVG
let seed=21;const rnd=()=>{seed=(seed*16807)%2147483647;return (seed-1)/2147483646};
const OL='#0d0b12';
let n=0;const uid=p=>p+(n++);

function headPath(x,y,rw,rh,shape){
 const S={round:[2,1,1],oval:[2,.92,.92],wide:[2.2,1.04,1.1],square:[3.2,1,1],egg:[2.1,.86,1.08],chin:[2.2,1.02,.82],bean:[2.4,1.06,.96]}[shape||'round'];
 const [p,tw,bwf]=S; let d='';
 for(let i=0;i<=72;i++){const a=i/72*Math.PI*2, c=Math.cos(a), sn=Math.sin(a);
  const ex=Math.sign(c)*Math.pow(Math.abs(c),2/p), ey=Math.sign(sn)*Math.pow(Math.abs(sn),2/p);
  let w=ey<0?tw:bwf; if(shape==='chin'&&ey>0) w=bwf+ (1-bwf)*(1-ey*ey)*.9;
  const yy=y+ey*rh*(shape==='oval'?1.1:shape==='wide'?.94:1), xx=x+ex*rw*w;
  d+=(i?'L':'M')+xx.toFixed(1)+','+yy.toFixed(1);}
 return d+'Z';}
function head(x,y,o){ // x,y = head centre; o.s scale
 const s=o.s??1, rw=82*s, rh=74*s, g=uid('hg'), sp=uid('sp'), rim=o.rim??'#ffb27a';
 let out=`<defs>
  <radialGradient id="${g}" cx=".36" cy=".3" r=".85"><stop offset="0" stop-color="${o.skinL??'#4a3f5e'}"/><stop offset=".55" stop-color="${o.skin??'#231d30'}"/><stop offset="1" stop-color="${o.skinD??'#0f0c16'}"/></radialGradient>
  <radialGradient id="${sp}" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>`;
 if(o.hairBack) out+=o.hairBack(x,y,s);
 const HP=headPath(x,y,rw,rh,o.shape), hc=uid('hc');
 if(o.ears!==false) for(const sx of [-1,1]){const ex2=x+sx*rw*(o.shape==='wide'?1.12:o.shape==='egg'||o.shape==='oval'?.94:1.0), ey2=y+6*s;
  out+=`<ellipse cx="${ex2}" cy="${ey2}" rx="${15*s}" ry="${21*s}" fill="${sx>0?'#1a1424':'#3a3048'}" stroke="${OL}" stroke-width="${2.6*s}"/><path d="M${ex2+sx*-2*s},${ey2-10*s} q${sx*7*s},${10*s} 0,${20*s}" stroke="#5a4a6a" stroke-width="${2.4*s}" fill="none"/>`;}
 out+=`<defs><clipPath id="${hc}"><path d="${HP}"/></clipPath></defs>`;
 out+=`<g clip-path="url(#${hc})">
  <path d="${HP}" fill="${rim}" opacity=".9"/>
  <path d="${HP}" fill="url(#${g})" transform="translate(${-7*s},${-2*s})"/>
  <ellipse cx="${x+rw*.5}" cy="${y+rh*.55}" rx="${rw*.85}" ry="${rh*.8}" fill="#07050c" opacity=".25"/>
  <path d="${HP}" fill="none" stroke="${o.bounce??'#8a6a9a'}" stroke-width="${10*s}" transform="translate(0,${-6*s})" opacity=".3"/>
  <path d="${HP}" fill="none" stroke="${o.key??'#ffe0b0'}" stroke-width="${7*s}" transform="translate(${6*s},${4*s})" opacity=".16"/>
 </g>`;
 out+=`<path d="${HP}" fill="none" stroke="${OL}" stroke-width="${3*s}" stroke-linejoin="round"/>`;
 // specular
 out+=`<ellipse cx="${x-rw*.42}" cy="${y-rh*.52}" rx="${rw*.32}" ry="${rh*.18}" fill="url(#${sp})" transform="rotate(-24 ${x-rw*.42} ${y-rh*.52})"/>`;
 // face
 if(o.back){const bc=o.backHair;if(bc){const bcl=uid('bk');out+=`<defs><clipPath id="${bcl}"><path d="${HP}" transform="translate(${x*(1-1.06)},${y*(1-1.06)}) scale(1.06)"/></clipPath></defs><g clip-path="url(#${bcl})"><path d="M${x-rw*1.2},${y-rh*1.3} L${x+rw*1.2},${y-rh*1.3} L${x+rw*1.2},${y+rh*.2} ${[...Array(9)].map((_,i)=>`Q${x+rw*(1-i*.25+.12)},${y+rh*(.5+(i%2)*.12)} ${x+rw*(1-(i+1)*.25)},${y+rh*.3}`).join(' ')} L${x-rw*1.2},${y+rh*.2}Z" fill="${bc}" stroke="${OL}" stroke-width="${2.6*s}"/>
   <path d="M${x-rw*.5},${y-rh*.6} q${rw*.2},${rh*.5} ${rw*.05},${rh*.9} M${x+rw*.1},${y-rh*.7} q${rw*.15},${rh*.5} ${-rw*.05},${rh*.95} M${x+rw*.55},${y-rh*.5} q${-rw*.1},${rh*.5} ${rw*.05},${rh*.8}" stroke="${OL}" stroke-width="${2*s}" fill="none" opacity=".45"/>
   <path d="M${x-rw*.6},${y-rh*.75} C${x-rw*.3},${y-rh*.95} ${x+rw*.2},${y-rh*.95} ${x+rw*.5},${y-rh*.8}" stroke="#fff" stroke-width="${5*s}" fill="none" opacity=".22" stroke-linecap="round"/></g>`;}
  if(o.hat) out+=o.hat(x,y,s);return out;}
 const m=o.mood??'calm', ex=30*s, ey=y+(-4)*s, lk=(o.look??0)*s;
 // blush
 out+=`<ellipse cx="${x-50*s}" cy="${y+22*s}" rx="${13*s}" ry="${7*s}" fill="#ff7a8a" opacity="${(m==='shy'?.75:.42)*(o.blushA??1)}"/><ellipse cx="${x+50*s}" cy="${y+22*s}" rx="${13*s}" ry="${7*s}" fill="#ff7a8a" opacity="${(m==='shy'?.75:.42)*(o.blushA??1)}"/>`;
 for(const sx of [-1,1]){const cx=x+sx*ex;
  if(m==='love'){out+=`<path transform="translate(${cx},${ey}) scale(${s})" d="M0,20 C-30,0 -22,-24 0,-8 C22,-24 30,0 0,20Z" fill="#ff5f7e" stroke="${OL}" stroke-width="2.6"/><ellipse cx="${cx-8*s}" cy="${ey-8*s}" rx="${5*s}" ry="${3.5*s}" fill="#fff" opacity=".8"/>`;}
  else if(m==='joy'){out+=`<path d="M${cx-15*s},${ey+4*s} Q${cx},${ey-18*s} ${cx+15*s},${ey+4*s}" stroke="#fff" stroke-width="${6*s}" fill="none" stroke-linecap="round"/>`;}
  else{
   const es=o.eyeS??1; const ry=(m==='shock'?25:22)*s*es, rx=(m==='shock'?19:17)*s*es, pr=(m==='shock'?6:8.5)*s*es;
   const ec=uid('ec');out+=`<defs><clipPath id="${ec}"><ellipse cx="${cx}" cy="${ey}" rx="${rx}" ry="${ry}"/></clipPath></defs><ellipse cx="${cx}" cy="${ey}" rx="${rx}" ry="${ry}" fill="#fbf7f2"/><g clip-path="url(#${ec})">`;
   const py=ey+(m==='sad'?4:1)*s+(m==='smug'?7*s:0);
   out+=`<circle cx="${cx+lk+(m==='angry'?-sx*3*s:0)}" cy="${py}" r="${pr}" fill="${OL}"/><circle cx="${cx+lk-3*s}" cy="${py-4*s}" r="${2.6*s}" fill="#fff"/>`;
   if(m==='smug'||m==='tired'||m==='angry'){ // lid
    const ly=m==='angry'?ey-ry*.25:ey-ry*.1;
    out+=`<path d="M${cx-rx-2},${ly+(m==='angry'?sx*6*s:0)} L${cx+rx+2},${ly-(m==='angry'?sx*6*s:0)} L${cx+rx+2},${ey-ry-3} L${cx-rx-2},${ey-ry-3}Z" fill="#2a2238"/>
          <path d="M${cx-rx},${ly+(m==='angry'?sx*6*s:0)} L${cx+rx},${ly-(m==='angry'?sx*6*s:0)}" stroke="${OL}" stroke-width="${3*s}" stroke-linecap="round"/>`;}
   out+=`</g><ellipse cx="${cx}" cy="${ey}" rx="${rx}" ry="${ry}" fill="none" stroke="${OL}" stroke-width="${2.4*s}"/>`;
   if(o.lashes){const lc=o.lashCol??'#f3e4d6';const ly=(m==='smug'||m==='tired')?ey-ry*.15:ey-ry*.55;
    out+=`<path d="M${cx+sx*rx*.85},${ly} l${sx*11*s},${-7*s} M${cx+sx*rx*.45},${ly-ry*.32} l${sx*8*s},${-10*s}" stroke="${lc}" stroke-width="${3.6*s}" stroke-linecap="round"/>`;}
  }
  if(o.lashes&&(m==='joy')) out+=`<path d="M${cx+sx*15*s},${ey+4*s} l${sx*9*s},${-6*s}" stroke="${o.lashCol??'#f3e4d6'}" stroke-width="${3.4*s}" stroke-linecap="round"/>`;
  // floating light brows (signature)
  const tilt={angry:9,sad:-8,shock:-2,smug:4,joy:-2,calm:0,shy:-6,tired:3}[m]??0, by=ey-(m==='shock'?36:31)*s;
  out+=`<path d="M${cx-13*s},${by+(sx<0?-tilt:tilt)*s*.0+(sx>0?tilt:-tilt)*s*-.0} " />`;
  const inY=by+tilt*s, outY=by-tilt*s*.4;
  const ix=cx-sx*12*s, oxp=cx+sx*12*s;
  out+=`<path d="M${oxp},${outY} Q${cx},${Math.min(inY,outY)-5*s} ${ix},${inY}" stroke="${o.brow??'#e9dccb'}" stroke-width="${5*s}" fill="none" stroke-linecap="round" opacity=".92"/>`;
 }
 if(o.nose!==false) out+=`<path d="M${x+3*s},${y+10*s} q${7*s},${6*s} ${-1*s},${11*s}" stroke="#8a7aa0" stroke-width="${3*s}" fill="none" stroke-linecap="round" opacity=".7"/>`;
 const my=y+30*s;
 const MO={
  calm:`<path d="M${x-14*s},${my} Q${x},${my+9*s} ${x+14*s},${my-1*s}" stroke="#fff" stroke-width="${3.6*s}" fill="none" stroke-linecap="round"/>`,
  love:`<path d="M${x-18*s},${my-4*s} Q${x},${my-2*s} ${x+18*s},${my-4*s} Q${x+12*s},${my+16*s} ${x},${my+16*s} Q${x-12*s},${my+16*s} ${x-18*s},${my-4*s}Z" fill="#fff"/>`,
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
 if(o.acc) out+=o.acc(x,y,s);
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

const FIG={boy:{sh:60,wa:56,hip:62,leg:24,arm:24},girl:{sh:50,wa:42,hip:58,leg:20,arm:20,bust:1},chubby:{sh:62,wa:80,hip:72,leg:30,arm:28,belly:1},muscle:{sh:84,wa:56,hip:58,leg:28,arm:32,pecs:1},slim:{sh:52,wa:46,hip:50,leg:19,arm:19}};
function body(o){ if(o.lie){const {lie,...r}=o;const s=o.s??1;return `<g transform="rotate(${lie>0?-90:90} ${o.x} ${o.y-8*s}) translate(0,${-40*s})">${bodyCore({...r,cast:[0,0]})}</g>`;} return bodyCore(o);}
function bodyCore(o){ // full character, feet at (X,G)
 const s=o.s??1, X=o.x, G=o.y, c=o.c; let out='';
 const F={...FIG[o.fig||'boy']}; const wf=o.wide??1; F.sh*=wf;F.wa*=wf;F.hip*=wf;
 const blur=uid('bl');
 const cs=o.cast??[1.6,.28]; const b2=uid('b2');
 out+=`<defs><filter id="${blur}"><feGaussianBlur stdDeviation="${5*s}"/></filter><filter id="${b2}"><feGaussianBlur stdDeviation="${9*s}"/></filter></defs>`;
 out+=`<g opacity=".32" filter="url(#${b2})"><path d="M${X-40*s},${G} L${X+40*s},${G} L${X+40*s+330*s*cs[1]*cs[0]},${G-14*s+330*s*cs[1]*.25} L${X+330*s*cs[1]*cs[0]-60*s},${G-14*s+330*s*cs[1]*.25}Z" fill="#3a1e2a"/><ellipse cx="${X+330*s*cs[1]*cs[0]-10*s}" cy="${G-16*s+330*s*cs[1]*.25}" rx="${80*s}" ry="${22*s}" fill="#3a1e2a"/></g>`;
 out+=`<ellipse cx="${X}" cy="${G+2*s}" rx="${62*s}" ry="${9*s}" fill="#1a0e18" opacity=".5" filter="url(#${blur})"/>`;
 // legs
 const SIT=o.sit, hipY=SIT==='floor'?G-30*s:SIT==='chair'?G-120*s*(o.legL??1)*.62:G-120*s*(o.legL??1), L=o.legs??[0,0];
 const lgid=uid('lg');
 out+=`<defs><linearGradient id="${lgid}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${c.pantsL}"/><stop offset=".45" stop-color="${c.pants}"/><stop offset="1" stop-color="${c.pantsS??c.pants}"/></linearGradient></defs>`;
 let FLEGS='';
 if(SIT==='floor'){ // cross-legged
  const out0=out;out='';const lw=F.leg*s*(o.baggy?1.05:.9);
  for(const sx of [1,-1]) out+=`<path d="M${X-sx*F.hip*.3*s},${hipY} C${X-sx*F.hip*.3*s},${G+6*s} ${X+sx*F.hip*1.5*s},${G+10*s} ${X+sx*F.hip*1.6*s},${G-12*s}" stroke="${OL}" stroke-width="${lw*1.25+6*s}" fill="none" stroke-linecap="round"/><path d="M${X-sx*F.hip*.3*s},${hipY} C${X-sx*F.hip*.3*s},${G+6*s} ${X+sx*F.hip*1.5*s},${G+10*s} ${X+sx*F.hip*1.6*s},${G-12*s}" stroke="url(#${lgid})" stroke-width="${lw*1.25}" fill="none" stroke-linecap="round"/>`;
  for(const sx of [-1,1]) out+=`<g transform="translate(${X+sx*F.hip*1.7*s},${G-8*s}) scale(${-sx*s},${s})"><path d="M-28,8 C-30,-18 4,-20 18,-10 C30,-4 32,8 22,10Z" fill="${c.shoe}" stroke="${OL}" stroke-width="2.4"/><path d="M-27,4 L27,4" stroke="${c.sole}" stroke-width="5"/></g>`;
  FLEGS=out;out=out0;
 } else {
 for(const [i,sx] of [[0,-1],[1,1]]){
  const lx=X+sx*(F.hip*.4)*s, fx0=X+sx*(F.hip*.42)*s+L[i]*s, lw=F.leg*s, bw2=o.baggy?lw*1.5:lw*.95;
  if(SIT==='chair') out+=`<ellipse cx="${lx}" cy="${hipY+12*s}" rx="${lw*.85}" ry="${lw*.6}" fill="${c.pants}" stroke="${OL}" stroke-width="${2.6*s}"/>`;
  const LP=`M${lx-lw*.55},${hipY-6*s} L${lx+lw*.55},${hipY-6*s} L${fx0+bw2*.55},${G-16*s} L${fx0-bw2*.55},${G-16*s}Z`;
  out+=`<path d="${LP}" fill="url(#${lgid})" stroke="${OL}" stroke-width="${2.6*s}" stroke-linejoin="round"/>`;
  if(o.baggy) out+=`<path d="M${fx0-bw2*.4},${G-40*s} q${bw2*.4},${8*s} ${bw2*.8},0 M${fx0-bw2*.2},${G-70*s} q${bw2*.3},${10*s} ${bw2*.6},${-4*s}" stroke="${c.pantsS??OL}" stroke-width="${2.4*s}" fill="none" opacity=".8"/>`;
  out+=`<path d="M${lx+sx*lw*.1},${hipY+20*s} L${fx0+sx*bw2*.1},${G-30*s}" stroke="${OL}" stroke-width="${1.6*s}" opacity=".3"/>`;
  const fx=fx0+sx*6*s, fy=G-8*s, sw=o.chunky?1.15:1;
  out+=`<g transform="translate(${fx},${fy}) scale(${sw*s})"><path d="M-28,8 C-30,-18 4,-20 18,-10 C30,-4 32,8 22,10Z" fill="${c.shoe}" stroke="${OL}" stroke-width="2.4"/>
   ${c.toe?`<path d="M6,-14 C24,-10 32,0 30,8 L10,8 C12,0 10,-8 6,-14Z" fill="${c.toe}" stroke="${OL}" stroke-width="2"/>`:''}
   <path d="M-27,4 L27,4" stroke="${c.sole}" stroke-width="5"/><path d="M-20,-12 C-12,-16 -2,-16 6,-12" stroke="#fff" stroke-width="3" opacity=".45" fill="none"/>
   ${c.lace?`<path d="M-10,-14 l8,6 M-2,-16 l8,6" stroke="${c.lace}" stroke-width="2.4"/>`:''}</g>`;
 }
 }
 // torso
 const sh=hipY-112*s*(o.torsoL??1), tw=F.sh*s, bw=F.hip*s, ww=F.wa*s, wy=sh+(hipY-sh)*.62;
 const T=`M${X-tw},${sh+28*s} C${X-tw},${sh} ${X-tw+26*s},${sh-6*s} ${X},${sh-6*s} C${X+tw-26*s},${sh-6*s} ${X+tw},${sh} ${X+tw},${sh+28*s} C${X+tw},${sh+50*s} ${X+ww},${wy-24*s} ${X+ww},${wy} C${X+ww},${wy+18*s} ${X+bw},${hipY-4*s} ${X+bw},${hipY+8*s} C${X+bw},${hipY+20*s} ${X+bw-12*s},${hipY+22*s} ${X+bw-24*s},${hipY+22*s} L${X-bw+24*s},${hipY+22*s} C${X-bw+12*s},${hipY+22*s} ${X-bw},${hipY+20*s} ${X-bw},${hipY+8*s} C${X-bw},${hipY-4*s} ${X-ww},${wy+18*s} ${X-ww},${wy} C${X-ww},${wy-24*s} ${X-tw},${sh+50*s} ${X-tw},${sh+28*s}Z`;
 const tg=uid('tg'), tc=uid('tc');
 out+=`<defs><linearGradient id="${tg}" x1="0" y1="0" x2="1" y2=".3"><stop offset="0" stop-color="${c.topL}"/><stop offset=".5" stop-color="${c.top}"/><stop offset="1" stop-color="${c.topS}"/></linearGradient><clipPath id="${tc}"><path d="${T}"/></clipPath></defs>`;
 // back arm
 const A=o.arms??[[0,0],[0,0]];
 const AW=F.arm*s;const arm=(sx,a)=>{const x0=X+sx*(tw-8*s), y0=sh+24*s, ex=x0+sx*(14+a[0])*s, ey=y0+(52*(o.torsoL??1)+a[1])*s, hx=x0+sx*(10+a[2])*s, hy=y0+(100*(o.torsoL??1)+a[3])*s;
  return `<path d="M${x0},${y0} Q${ex},${ey} ${hx},${hy}" stroke="${OL}" stroke-width="${AW+6*s}" fill="none" stroke-linecap="round"/><path d="M${x0},${y0} Q${ex},${ey} ${hx},${hy}" stroke="${c.top}" stroke-width="${AW}" fill="none" stroke-linecap="round"/>
   <path d="M${x0-sx*4*s},${y0+6*s} Q${ex-sx*4*s},${ey} ${hx-sx*3*s},${hy-10*s}" stroke="${sx<0?c.topL:c.topS}" stroke-width="${6*s}" fill="none" stroke-linecap="round" opacity=".7"/>
   <path d="M${hx-12*s},${hy-8*s} L${hx+12*s},${hy-8*s}" stroke="${c.cuff??c.topS}" stroke-width="${10*s}" stroke-linecap="round"/>
   ${o.pocket?'':mitten(hx,hy+8*s,s,a[4]??0,o.skinHand??'#231d30','#6a5a80')}${o.prop&&o.prop.side===sx?o.prop.svg(hx,hy+8*s,s):''}`;};
 out+=arm(-1,A[0]);
 const ao=uid('ao');
 out+=`<defs><radialGradient id="${ao}" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#1a0e20" stop-opacity=".55"/><stop offset="1" stop-color="#1a0e20" stop-opacity="0"/></radialGradient></defs>`;
 out+=`<path d="${T}" fill="url(#${tg})"/><g clip-path="url(#${tc})">${o.outfit&&!o.back?o.outfit(X,sh,hipY,s,c):o.back?`<path d="M${X-46*s},${sh-4*s} C${X-40*s},${sh+50*s} ${X+40*s},${sh+50*s} ${X+46*s},${sh-4*s}" fill="${c.topS}" stroke="${OL}" stroke-width="${2.4*s}"/><rect x="${X-90*s}" y="${hipY}" width="${180*s}" height="${30*s}" fill="${c.topS}"/>`:''}
  <path d="M${X+tw*.35},${sh} C${X+tw*.6},${sh+60*s} ${X+bw*.5},${hipY-30*s} ${X+bw*.55},${hipY+30*s} L${X+bw+20*s},${hipY+30*s} L${X+tw+20*s},${sh-10*s}Z" fill="#3a4a9a" opacity=".22"/>
  <path d="M${X-tw*.6},${sh+70*s} q${10*s},${20*s} ${4*s},${44*s} M${X+tw*.45},${sh+80*s} q${-8*s},${18*s} ${-2*s},${40*s} M${X-20*s},${hipY-6*s} q${16*s},${-8*s} ${34*s},0" stroke="#1a0e20" stroke-width="${2.2*s}" fill="none" opacity=".35" stroke-linecap="round"/>
  <ellipse cx="${X+(o.lean??0)*s}" cy="${sh+6*s}" rx="${78*s}" ry="${30*s}" fill="url(#${ao})"/>
  ${F.bust?`<path d="M${X-36*s},${sh+52*s} q${18*s},${16*s} ${34*s},${4*s} M${X+2*s},${sh+56*s} q${18*s},${12*s} ${34*s},${-4*s}" stroke="#1a0e20" stroke-width="${2.4*s}" fill="none" opacity=".35"/>`:''}
  ${F.belly?`<ellipse cx="${X+10*s}" cy="${wy+10*s}" rx="${ww*.8}" ry="${36*s}" fill="#fff" opacity=".1"/><path d="M${X-ww*.7},${wy+30*s} q${ww*.7},${24*s} ${ww*1.4},0" stroke="#1a0e20" stroke-width="${2.4*s}" fill="none" opacity=".35"/>`:''}
  ${F.pecs?`<path d="M${X-46*s},${sh+60*s} q${22*s},${14*s} ${44*s},0 q${22*s},${14*s} ${44*s},0 M${X},${sh+40*s} L${X},${sh+80*s}" stroke="#1a0e20" stroke-width="${2.6*s}" fill="none" opacity=".35"/>`:''}
  <path d="M${X-tw+10*s},${sh+20*s} C${X-ww},${wy-30*s} ${X-ww+4*s},${wy} ${X-bw+10*s},${hipY}" stroke="#fff" stroke-width="${6*s}" fill="none" opacity=".14" stroke-linecap="round"/></g><path d="${T}" fill="none" stroke="${OL}" stroke-width="${2.8*s}"/>`;
 out+=`<path d="M${X+tw-4*s},${sh+24*s} C${X+tw-4*s},${sh+50*s} ${X+ww-4*s},${wy-24*s} ${X+ww-4*s},${wy} C${X+ww-4*s},${wy+18*s} ${X+bw-4*s},${hipY-4*s} ${X+bw-4*s},${hipY+8*s}" stroke="${o.rim??'#ffb27a'}" stroke-width="${4*s}" fill="none" opacity=".8" stroke-linecap="round"/>`;
 if(o.backpack&&!o.back) for(const sx of [-1,1]) out+=`<path d="M${X+sx*tw*.55},${sh-4*s} C${X+sx*tw*.7},${sh+40*s} ${X+sx*tw*.62},${sh+90*s} ${X+sx*tw*.5},${sh+110*s}" stroke="${OL}" stroke-width="${12*s}" fill="none"/><path d="M${X+sx*tw*.55},${sh-4*s} C${X+sx*tw*.7},${sh+40*s} ${X+sx*tw*.62},${sh+90*s} ${X+sx*tw*.5},${sh+110*s}" stroke="${o.backpack}" stroke-width="${8*s}" fill="none"/>`;
 if(o.backpack&&o.back) out+=`<rect x="${X-tw*.62}" y="${sh+14*s}" width="${tw*1.24}" height="${(hipY-sh)*.8}" rx="${18*s}" fill="${o.backpack}" stroke="${OL}" stroke-width="${2.6*s}"/><rect x="${X-tw*.42}" y="${sh+(hipY-sh)*.48}" width="${tw*.84}" height="${(hipY-sh)*.34}" rx="${10*s}" fill="#000" opacity=".15" stroke="${OL}" stroke-width="${2*s}"/><path d="M${X-tw*.5},${sh+30*s} L${X+tw*.5},${sh+30*s}" stroke="#fff" stroke-width="${4*s}" opacity=".25"/>`;
 out+=FLEGS;
 const ra=arm(1,A[1]);
 if(!o.armsOver) out+=ra;
 const NK=(o.neck??0)*s;
 if(NK) out+=`<path d="M${X-14*s},${sh+4*s} L${X-13*s},${sh-NK-10*s} L${X+13*s},${sh-NK-10*s} L${X+14*s},${sh+4*s}Z" fill="#2a2238" stroke="${OL}" stroke-width="${2.4*s}"/><path d="M${X+4*s},${sh-NK} L${X+6*s},${sh}" stroke="#4a3a5a" stroke-width="${3*s}"/>`;
 out+=head(X+(o.lean??0)*s,sh-NK-62*s*(o.headS??1),{...o.h,s:s*(o.headS??1),rim:o.rim,back:o.back});
 if(o.armsOver) out+=(o.armsOver==='both'?arm(-1,A[0]):'')+ra;
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

// ---- extra hair ----
Object.assign(HAIR,{
 afro:(c,cL)=>(x,y,s)=>{let o='';for(let i=0;i<16;i++){const a=i/16*Math.PI*2;if(Math.sin(a)>.55)continue;o+=`<circle cx="${x+Math.cos(a)*84*s}" cy="${y-30*s+Math.sin(a)*70*s}" r="${30*s}" fill="${c}" stroke="${OL}" stroke-width="${2.6*s}"/>`;}
  return o+`<ellipse cx="${x}" cy="${y-40*s}" rx="${90*s}" ry="${64*s}" fill="${c}"/><path d="M${x-80*s},${y-10*s} C${x-60*s},${y-50*s} ${x+60*s},${y-50*s} ${x+80*s},${y-10*s} L${x+80*s},${y-60*s} L${x-80*s},${y-60*s}Z" fill="${c}"/>
  <path d="M${x-40*s},${y-86*s} q${12*s},${-10*s} ${24*s},0 M${x+10*s},${y-94*s} q${12*s},${-10*s} ${24*s},0" stroke="${cL}" stroke-width="${4*s}" fill="none" stroke-linecap="round"/>`;},
 pony:(c,cL)=>(x,y,s)=>`<path d="M${x+60*s},${y-50*s} C${x+150*s},${y-60*s} ${x+150*s},${y+50*s} ${x+110*s},${y+90*s} C${x+120*s},${y+30*s} ${x+100*s},${y-10*s} ${x+60*s},${y-20*s}Z" fill="${c}" stroke="${OL}" stroke-width="${2.6*s}"/>
  <path d="M${x-80*s},${y-14*s} C${x-90*s},${y-90*s} ${x-30*s},${y-104*s} ${x+10*s},${y-102*s} C${x+60*s},${y-100*s} ${x+90*s},${y-70*s} ${x+80*s},${y-14*s} C${x+60*s},${y-50*s} ${x+20*s},${y-62*s} ${x-20*s},${y-56*s} C${x-50*s},${y-50*s} ${x-70*s},${y-36*s} ${x-80*s},${y-14*s}Z" fill="${c}" stroke="${OL}" stroke-width="${2.6*s}"/>
  <circle cx="${x+70*s}" cy="${y-44*s}" r="${11*s}" fill="#ffd24a" stroke="${OL}" stroke-width="${2.4*s}"/>
  <path d="M${x-50*s},${y-80*s} C${x-20*s},${y-98*s} ${x+30*s},${y-96*s} ${x+60*s},${y-74*s}" stroke="${cL}" stroke-width="${4*s}" fill="none" stroke-linecap="round"/>`,
 cap:(c,cL)=>(x,y,s)=>`<path d="M${x-82*s},${y-20*s} C${x-84*s},${y-96*s} ${x+84*s},${y-96*s} ${x+82*s},${y-20*s}Z" fill="${c}" stroke="${OL}" stroke-width="${2.6*s}"/>
  <path d="M${x-30*s},${y-24*s} C${x-60*s},${y-28*s} ${x-150*s},${y-22*s} ${x-150*s},${y-8*s} C${x-140*s},${y+2*s} ${x-60*s},${y-8*s} ${x-30*s},${y-10*s}Z" fill="${cL}" stroke="${OL}" stroke-width="${2.6*s}"/>
  <circle cx="${x}" cy="${y-88*s}" r="${7*s}" fill="${cL}" stroke="${OL}" stroke-width="${2*s}"/><path d="M${x-20*s},${y-80*s} C${x},${y-90*s} ${x+30*s},${y-84*s} ${x+50*s},${y-66*s}" stroke="#fff" stroke-width="${3*s}" fill="none" opacity=".4"/>`,
 braids:(c,cL)=>(x,y,s)=>[-1,1].map(sx=>{let o='';for(let k=0;k<4;k++)o+=`<ellipse cx="${x+sx*86*s}" cy="${y+(4+k*26)*s}" rx="${15*s}" ry="${15*s}" fill="${c}" stroke="${OL}" stroke-width="${2.4*s}"/>`;return o+`<circle cx="${x+sx*86*s}" cy="${y+112*s}" r="${7*s}" fill="#ff6f91" stroke="${OL}" stroke-width="${2*s}"/>`;}).join('')+
  `<path d="M${x-82*s},${y-6*s} C${x-90*s},${y-92*s} ${x+90*s},${y-92*s} ${x+82*s},${y-6*s} C${x+60*s},${y-46*s} ${x+10*s},${y-60*s} ${x},${y-60*s} C${x-10*s},${y-60*s} ${x-60*s},${y-46*s} ${x-82*s},${y-6*s}Z" fill="${c}" stroke="${OL}" stroke-width="${2.6*s}"/>
  <path d="M${x},${y-80*s} L${x},${y-60*s}" stroke="${OL}" stroke-width="${2.4*s}"/><path d="M${x-50*s},${y-70*s} C${x-30*s},${y-84*s} ${x-10*s},${y-84*s} ${x-4*s},${y-80*s}" stroke="${cL}" stroke-width="${4*s}" fill="none" stroke-linecap="round"/>`,
 spiky:(c,cL)=>(x,y,s)=>{let o=`<path d="M${x-82*s},${y-14*s}`;const pts=[[-90,-50],[-80,-90],[-50,-80],[-40,-130],[-10,-96],[10,-140],[30,-98],[60,-124],[64,-82],[96,-80],[82,-14]];for(const [a,b] of pts)o+=` L${x+a*s},${y+b*s}`;
  return o+` C${x+50*s},${y-50*s} ${x-50*s},${y-50*s} ${x-82*s},${y-14*s}Z" fill="${c}" stroke="${OL}" stroke-width="${2.6*s}" stroke-linejoin="round"/><path d="M${x-30*s},${y-88*s} L${x-14*s},${y-70*s} M${x+20*s},${y-92*s} L${x+26*s},${y-70*s}" stroke="${cL}" stroke-width="${4*s}" stroke-linecap="round"/>`;},
 bald:(c,cL)=>(x,y,s)=>`<path d="M${x-84*s},${y-10*s} C${x-90*s},${y+30*s} ${x-70*s},${y+40*s} ${x-60*s},${y+20*s} M${x+84*s},${y-10*s} C${x+90*s},${y+30*s} ${x+70*s},${y+40*s} ${x+60*s},${y+20*s}" stroke="${c}" stroke-width="${16*s}" fill="none" stroke-linecap="round"/>
  <path d="M${x-40*s},${y+50*s} C${x-20*s},${y+44*s} ${x+20*s},${y+44*s} ${x+40*s},${y+50*s} C${x+30*s},${y+62*s} ${x-30*s},${y+62*s} ${x-40*s},${y+50*s}Z" fill="${c}" stroke="${OL}" stroke-width="${2.2*s}"/>`,
 long:(c,cL)=>(x,y,s)=>`<path d="M${x-84*s},${y-10*s} C${x-100*s},${y-100*s} ${x+100*s},${y-100*s} ${x+84*s},${y-10*s} L${x+92*s},${y+110*s} L${x+56*s},${y+100*s} L${x+62*s},${y-20*s} C${x+30*s},${y-56*s} ${x-30*s},${y-56*s} ${x-62*s},${y-20*s} L${x-56*s},${y+100*s} L${x-92*s},${y+110*s}Z" fill="${c}" stroke="${OL}" stroke-width="${2.6*s}" stroke-linejoin="round"/>
  <path d="M${x-50*s},${y-76*s} C${x-20*s},${y-90*s} ${x+30*s},${y-88*s} ${x+60*s},${y-70*s}" stroke="${cL}" stroke-width="${4*s}" fill="none" stroke-linecap="round"/>`,
});
const ACC={
 glasses:(x,y,s)=>`<g fill="none" stroke="#f2c94c" stroke-width="${4*s}"><circle cx="${x-30*s}" cy="${y-4*s}" r="${26*s}"/><circle cx="${x+30*s}" cy="${y-4*s}" r="${26*s}"/><path d="M${x-4*s},${y-6*s} L${x+4*s},${y-6*s}"/></g>`,
 headphones:(x,y,s)=>`<path d="M${x-84*s},${y} C${x-90*s},${y-110*s} ${x+90*s},${y-110*s} ${x+84*s},${y}" stroke="${OL}" stroke-width="${14*s}" fill="none"/><path d="M${x-84*s},${y} C${x-90*s},${y-110*s} ${x+90*s},${y-110*s} ${x+84*s},${y}" stroke="#6a5af0" stroke-width="${8*s}" fill="none"/>
  ${[-1,1].map(sx=>`<rect x="${x+sx*84*s-16*s}" y="${y-22*s}" width="${32*s}" height="${46*s}" rx="${12*s}" fill="#6a5af0" stroke="${OL}" stroke-width="${2.6*s}"/>`).join('')}`,
 mustache:(x,y,s)=>`<path d="M${x},${y+20*s} C${x-14*s},${y+12*s} ${x-34*s},${y+14*s} ${x-40*s},${y+26*s} C${x-24*s},${y+30*s} ${x-10*s},${y+28*s} ${x},${y+22*s} C${x+10*s},${y+28*s} ${x+24*s},${y+30*s} ${x+40*s},${y+26*s} C${x+34*s},${y+14*s} ${x+14*s},${y+12*s} ${x},${y+20*s}Z" fill="#d8d4cc" stroke="${OL}" stroke-width="${2*s}"/>`,
 bow:(x,y,s)=>`<g transform="translate(${x+54*s},${y-70*s}) rotate(18)"><path d="M0,0 L${-26*s},${-16*s} L${-26*s},${16*s}Z M0,0 L${26*s},${-16*s} L${26*s},${16*s}Z" fill="#ff6f91" stroke="${OL}" stroke-width="${2.4*s}"/><circle r="${7*s}" fill="#ff9fb5" stroke="${OL}" stroke-width="${2*s}"/></g>`,
};
// ---- extra outfits ----
Object.assign(OUT,{
 tee:(X,sh,hip,s,c)=>`<path d="M${X-30*s},${sh-4*s} Q${X},${sh+18*s} ${X+30*s},${sh-4*s}" fill="none" stroke="${OL}" stroke-width="${2.4*s}"/>
  <circle cx="${X}" cy="${sh+60*s}" r="${24*s}" fill="${c.acc}" stroke="${OL}" stroke-width="${2.2*s}"/><path d="M${X-10*s},${sh+60*s} l${8*s},${8*s} l${14*s},${-16*s}" stroke="#fff" stroke-width="${4*s}" fill="none"/>`,
 suit:(X,sh,hip,s,c)=>`<path d="M${X-24*s},${sh-6*s} L${X},${sh+60*s} L${X+24*s},${sh-6*s}Z" fill="${c.shirt}" stroke="${OL}" stroke-width="${2*s}"/>
  <path d="M${X},${sh+4*s} L${X-8*s},${sh+16*s} L${X},${sh+64*s} L${X+8*s},${sh+16*s}Z" fill="${c.acc}" stroke="${OL}" stroke-width="${1.8*s}"/>
  <path d="M${X-24*s},${sh-6*s} L${X-40*s},${sh+20*s} L${X-8*s},${sh+80*s} M${X+24*s},${sh-6*s} L${X+40*s},${sh+20*s} L${X+8*s},${sh+80*s}" stroke="${OL}" stroke-width="${2.4*s}" fill="none"/>
  <circle cx="${X}" cy="${sh+96*s}" r="${4*s}" fill="${OL}"/>`,
 puffer:(X,sh,hip,s,c)=>[0,1,2,3].map(i=>`<path d="M${X-80*s},${sh+20*s+i*28*s} Q${X},${sh+30*s+i*28*s} ${X+80*s},${sh+20*s+i*28*s}" stroke="${c.topS}" stroke-width="${3*s}" fill="none"/>`).join('')+
  `<path d="M${X},${sh-6*s} L${X},${hip+30*s}" stroke="${OL}" stroke-width="${2.4*s}"/><rect x="${X-34*s}" y="${sh-14*s}" width="${68*s}" height="${22*s}" rx="${10*s}" fill="${c.topL}" stroke="${OL}" stroke-width="${2.4*s}"/>`,
 apron:(X,sh,hip,s,c)=>`<path d="M${X-40*s},${sh+20*s} L${X+40*s},${sh+20*s} L${X+50*s},${hip+30*s} L${X-50*s},${hip+30*s}Z" fill="${c.acc}" stroke="${OL}" stroke-width="${2.2*s}"/>
  <path d="M${X-40*s},${sh+22*s} L${X-50*s},${sh-6*s} M${X+40*s},${sh+22*s} L${X+50*s},${sh-6*s}" stroke="${c.acc}" stroke-width="${6*s}"/><rect x="${X-22*s}" y="${sh+64*s}" width="${44*s}" height="${30*s}" rx="${5*s}" fill="none" stroke="${OL}" stroke-width="${2*s}"/>`,
 dress:(X,sh,hip,s,c)=>`<rect x="${X-90*s}" y="${hip-20*s}" width="${180*s}" height="${60*s}" fill="${c.topS}"/><path d="M${X-80*s},${hip-20*s} L${X+80*s},${hip-20*s}" stroke="${OL}" stroke-width="${2*s}"/>
  ${[0,1,2,3,4].map(i=>`<circle cx="${X-40*s+i*20*s}" cy="${sh+50*s}" r="${5*s}" fill="#fff" opacity=".8"/>`).join('')}`,
});

Object.assign(OUT,{
 labcoat:(X,sh,hip,s,c)=>`<rect x="${X-90*s}" y="${sh-20*s}" width="${180*s}" height="${400*s}" fill="#f4f6f8"/><path d="M${X+40*s},${sh} C${X+70*s},${sh+80*s} ${X+70*s},${hip} ${X+70*s},${hip+40*s} L${X+100*s},${hip+40*s} L${X+100*s},${sh}Z" fill="#cfd6de"/>
  <path d="M${X-26*s},${sh-6*s} L${X},${sh+56*s} L${X+26*s},${sh-6*s}Z" fill="${c.shirt??'#7ab0e0'}" stroke="${OL}" stroke-width="${2*s}"/>
  <path d="M${X-26*s},${sh-6*s} L${X-44*s},${sh+24*s} L${X-6*s},${sh+80*s} L${X-6*s},${hip+40*s} M${X+26*s},${sh-6*s} L${X+44*s},${sh+24*s} L${X+6*s},${sh+80*s} L${X+6*s},${hip+40*s}" stroke="${OL}" stroke-width="${2.4*s}" fill="none"/>
  <rect x="${X+20*s}" y="${sh+40*s}" width="${30*s}" height="${24*s}" fill="none" stroke="${OL}" stroke-width="${2*s}"/><path d="M${X+26*s},${sh+36*s} L${X+26*s},${sh+52*s} M${X+36*s},${sh+34*s} L${X+36*s},${sh+52*s}" stroke="${c.acc}" stroke-width="${3*s}"/>
  <path d="M${X-50*s},${sh+20*s} C${X-70*s},${sh+60*s} ${X-40*s},${sh+90*s} ${X-20*s},${sh+80*s}" stroke="#5a6a7a" stroke-width="${4*s}" fill="none"/><circle cx="${X-18*s}" cy="${sh+82*s}" r="${7*s}" fill="#8a9aaa" stroke="${OL}" stroke-width="${2*s}"/>`,
 police:(X,sh,hip,s,c)=>`<path d="M${X-24*s},${sh-6*s} L${X},${sh+20*s} L${X+24*s},${sh-6*s}" fill="none" stroke="${OL}" stroke-width="${2.4*s}"/><path d="M${X},${sh+20*s} L${X},${hip+30*s}" stroke="${OL}" stroke-width="${2*s}"/>
  ${[0,1,2].map(i=>`<circle cx="${X+8*s}" cy="${sh+40*s+i*24*s}" r="${3.5*s}" fill="#e8d070"/>`).join('')}
  <path d="M${X-36*s},${sh+40*s} l${10*s},${-12*s} l${10*s},${12*s} l${-4*s},${16*s} l${-12*s},0Z" fill="#e8d070" stroke="${OL}" stroke-width="${1.8*s}"/>
  <rect x="${X-90*s}" y="${hip-6*s}" width="${180*s}" height="${18*s}" fill="#1a1a22"/><rect x="${X-10*s}" y="${hip-8*s}" width="${20*s}" height="${22*s}" rx="${3*s}" fill="#c9c9d0" stroke="${OL}" stroke-width="${1.6*s}"/>`,
 hivis:(X,sh,hip,s,c)=>`<path d="M${X-60*s},${sh} L${X-30*s},${sh} L${X},${sh+40*s} L${X+30*s},${sh} L${X+60*s},${sh} L${X+70*s},${hip+30*s} L${X-70*s},${hip+30*s}Z" fill="#c8f03a" stroke="${OL}" stroke-width="${2.2*s}"/>
  <path d="M${X-66*s},${sh+80*s} L${X+66*s},${sh+80*s} M${X-68*s},${hip-10*s} L${X+68*s},${hip-10*s}" stroke="#e8eef2" stroke-width="${10*s}"/><path d="M${X-66*s},${sh+80*s} L${X+66*s},${sh+80*s} M${X-68*s},${hip-10*s} L${X+68*s},${hip-10*s}" stroke="${OL}" stroke-width="${1.4*s}" opacity=".5"/>`,
 army:(X,sh,hip,s,c)=>{let o='';for(let i=0;i<26;i++){o+=`<ellipse cx="${X-80*s+((i*53)%160)*s}" cy="${sh+((i*37)%220)*s}" rx="${16*s}" ry="${9*s}" fill="${i%2?c.topS:c.topL}" opacity=".8" transform="rotate(${i*23} ${X-80*s+((i*53)%160)*s} ${sh+((i*37)%220)*s})"/>`;}
  return o+`<rect x="${X-56*s}" y="${sh+20*s}" width="${112*s}" height="${130*s}" rx="${10*s}" fill="${c.vest}" stroke="${OL}" stroke-width="${2.4*s}"/>${[0,1,2].map(i=>`<rect x="${X-48*s+i*34*s}" y="${sh+90*s}" width="${28*s}" height="${40*s}" rx="${4*s}" fill="${c.vest}" stroke="${OL}" stroke-width="${2*s}"/>`).join('')}`;},
 chef:(X,sh,hip,s,c)=>`<rect x="${X-90*s}" y="${sh-20*s}" width="${180*s}" height="${400*s}" fill="#f6f4f0"/>${[0,1].map(r=>[0,1,2].map(i=>`<circle cx="${X+(r?14:-14)*s}" cy="${sh+30*s+i*30*s}" r="${5*s}" fill="#2a2a30"/>`).join('')).join('')}
  <path d="M${X-40*s},${sh-4*s} L${X+40*s},${sh-4*s} L${X+40*s},${sh+14*s} L${X-40*s},${sh+14*s}Z" fill="#e04a4a" stroke="${OL}" stroke-width="${2*s}"/>`,
});
Object.assign(HAIR,{
 policeCap:(c,cL)=>(x,y,s)=>`<path d="M${x-86*s},${y-30*s} C${x-90*s},${y-110*s} ${x+90*s},${y-110*s} ${x+86*s},${y-30*s}Z" fill="${c}" stroke="${OL}" stroke-width="${2.6*s}"/><rect x="${x-88*s}" y="${y-44*s}" width="${176*s}" height="${18*s}" fill="#1a1a22" stroke="${OL}" stroke-width="${2*s}"/>
  <path d="M${x-70*s},${y-26*s} C${x-30*s},${y-6*s} ${x+30*s},${y-6*s} ${x+70*s},${y-26*s}" fill="#1a1a22" stroke="${OL}" stroke-width="${2.4*s}"/><path d="M${x},${y-90*s} l${10*s},${12*s} l${-10*s},${14*s} l${-10*s},${-14*s}Z" fill="#e8d070" stroke="${OL}" stroke-width="${1.8*s}"/>`,
 hardhat:(c,cL)=>(x,y,s)=>`<path d="M${x-80*s},${y-34*s} C${x-80*s},${y-120*s} ${x+80*s},${y-120*s} ${x+80*s},${y-34*s}Z" fill="${c}" stroke="${OL}" stroke-width="${2.6*s}"/><rect x="${x-100*s}" y="${y-44*s}" width="${200*s}" height="${18*s}" rx="${8*s}" fill="${c}" stroke="${OL}" stroke-width="${2.4*s}"/><path d="M${x},${y-110*s} L${x},${y-44*s}" stroke="${cL}" stroke-width="${10*s}"/>`,
 helmet:(c,cL)=>(x,y,s)=>`<path d="M${x-94*s},${y-14*s} C${x-100*s},${y-120*s} ${x+100*s},${y-120*s} ${x+94*s},${y-14*s} C${x+60*s},${y-30*s} ${x-60*s},${y-30*s} ${x-94*s},${y-14*s}Z" fill="${c}" stroke="${OL}" stroke-width="${2.6*s}"/>${[0,1,2,3,4].map(i=>`<ellipse cx="${x-50*s+i*25*s}" cy="${y-70*s+(i%2)*14*s}" rx="${12*s}" ry="${7*s}" fill="${cL}" opacity=".8"/>`).join('')}`,
 chefHat:(c,cL)=>(x,y,s)=>`<rect x="${x-60*s}" y="${y-110*s}" width="${120*s}" height="${70*s}" fill="#fff" stroke="${OL}" stroke-width="${2.6*s}"/>${[-40,0,40].map(dx=>`<circle cx="${x+dx*s}" cy="${y-120*s}" r="${36*s}" fill="#fff" stroke="${OL}" stroke-width="${2.6*s}"/>`).join('')}<rect x="${x-58*s}" y="${y-100*s}" width="${116*s}" height="${40*s}" fill="#fff"/><path d="M${x-60*s},${y-60*s} L${x+60*s},${y-60*s}" stroke="#ddd" stroke-width="${3*s}"/>`,
 grey:(c,cL)=>HAIR.swoop('#c9c6c0','#f2f0ec'),
});
function tuft(x,y,a,L,w,b,fill,s){const r=a*Math.PI/180,dx=Math.cos(r),dy=Math.sin(r),px=-dy,py=dx;
 const tx=x+dx*L+px*b,ty=y+dy*L+py*b,f=v=>v.toFixed(1);
 const a1=[x+px*w/2+dx*L*.4+px*b*.3,y+py*w/2+dy*L*.4+py*b*.3],a2=[x-px*w/2+dx*L*.45+px*b*.8,y-py*w/2+dy*L*.45+py*b*.8];
 return `<path d="M${f(x+px*w/2)},${f(y+py*w/2)} Q${f(a1[0]+px*w*.2)},${f(a1[1]+py*w*.2)} ${f(tx)},${f(ty)} Q${f(a2[0])},${f(a2[1])} ${f(x-px*w/2)},${f(y-py*w/2)}Z" fill="${fill}" stroke="${OL}" stroke-width="${2.6*s}" stroke-linejoin="round"/>`;}
HAIR.messyOld=(c,cL,cS)=>(x,y,s)=>{let o='';const T=(dx,dy,a,L,w,b,col)=>o+=tuft(x+dx*s,y+dy*s,a,L*s,w*s,b*s,col||c,s);
 // back volume
 [[-70,-40,200,60,56,-24],[-80,0,150,60,50,-26],[70,-40,-20,60,56,24],[80,0,30,60,50,26],[-50,-80,-150,62,60,-24],[50,-84,-30,62,60,24],[0,-96,-90,56,70,22],[-30,-92,-120,56,56,-20],[30,-92,-60,56,56,20]].forEach(t=>T(...t,cS||c));
 o+=`<path d="M${x-86*s},${y-6*s} C${x-96*s},${y-100*s} ${x+96*s},${y-100*s} ${x+86*s},${y-6*s} C${x+70*s},${y-40*s} ${x+30*s},${y-56*s} ${x},${y-54*s} C${x-30*s},${y-56*s} ${x-70*s},${y-40*s} ${x-86*s},${y-6*s}Z" fill="${c}"/>`;
 // front fringe tufts falling over forehead
 [[-74,-56,120,50,40,-18],[-48,-70,104,58,44,16],[-18,-74,96,56,46,-16],[14,-74,84,58,46,18],[44,-68,72,52,42,-16],[70,-54,58,46,36,16],[-86,-30,130,40,30,-14],[86,-30,50,40,30,14]].forEach(t=>T(...t));
 // top messy flicks + ahoge
 [[-40,-96,-130,40,30,-20],[10,-104,-80,46,28,22],[44,-96,-40,38,28,18],[-10,-110,-105,58,16,30]].forEach(t=>T(...t));
 o+=`<path d="M${x-60*s},${y-82*s} C${x-30*s},${y-100*s} ${x+20*s},${y-100*s} ${x+60*s},${y-80*s}" stroke="${cL}" stroke-width="${4.5*s}" fill="none" stroke-linecap="round" opacity=".9"/>
  <path d="M${x-36*s},${y-54*s} q${4*s},${-14*s} ${-2*s},${-26*s} M${x+8*s},${y-50*s} q${-4*s},${-14*s} ${4*s},${-28*s} M${x+46*s},${y-50*s} q${4*s},${-12*s} ${-4*s},${-24*s}" stroke="${cS||OL}" stroke-width="${2.6*s}" fill="none" stroke-linecap="round" opacity=".7"/>`;
 return o;};
// fluffy curly mop: back mass of scalloped curls + front cap with curl fringe
HAIR.messyBack=(c,cL,cS)=>(x,y,s)=>{let o='';const cx=x,cy=y-22*s;
 const ring=[];for(let i=0;i<=10;i++){const a=(188+i*16.4)*Math.PI/180;ring.push([cx+Math.cos(a)*80*s,cy-6*s+Math.sin(a)*70*s,24+((i*7)%3)*4]);}
 for(const [px,py,r] of ring) o+=`<circle cx="${px}" cy="${py}" r="${r*s}" fill="${cS}" stroke="${OL}" stroke-width="${2.8*s}"/>`;
 o+=`<ellipse cx="${cx}" cy="${cy-10*s}" rx="${84*s}" ry="${66*s}" fill="${cS}"/>`;
 return o;};
HAIR.messy=(c,cL,cS)=>(x,y,s)=>{let o='';
 // cap: top of head covered, bottom edge = curl fringe
 const fr=[[-88,-20],[-68,-40],[-44,-30],[-20,-48],[6,-34],[30,-50],[54,-36],[74,-46],[88,-22]];
 let d=`M${x-90*s},${y-20*s} C${x-100*s},${y-112*s} ${x+100*s},${y-112*s} ${x+90*s},${y-20*s}`;
 for(let i=fr.length-1;i>0;i--){const [x1,y1]=fr[i],[x0,y0]=fr[i-1];const mx=(x1+x0)/2,my=Math.max(y1,y0)+10;
  d+=` Q${x+mx*s+8*s},${y+my*s} ${x+x0*s},${y+y0*s}`;}
 o+=`<path d="${d}Z" fill="${c}" stroke="${OL}" stroke-width="${2.8*s}" stroke-linejoin="round"/>`;
 // curl hooks on fringe tips
 for(let i=1;i<fr.length-1;i++){const [fx,fy]=fr[i];const sx=i%2?1:-1;
  o+=`<path d="M${x+fx*s-sx*10*s},${y+(fy+8)*s} q${sx*12*s},${14*s} ${sx*22*s},${2*s}" stroke="${OL}" stroke-width="${2.4*s}" fill="none" stroke-linecap="round"/>`;}
 // top volume bumps
 [[-56,-78,26],[-20,-92,28],[20,-92,28],[56,-78,26]].forEach(([dx,dy,r])=>o+=`<path d="M${x+(dx-r)*s},${y+(dy+8)*s} A${r*s} ${r*s} 0 0 1 ${x+(dx+r)*s},${y+(dy+8)*s}" fill="${c}" stroke="${OL}" stroke-width="${2.8*s}"/>`);
 o+=`<path d="M${x-80*s},${y-60*s} C${x-60*s},${y-92*s} ${x+60*s},${y-92*s} ${x+80*s},${y-60*s} L${x+80*s},${y-40*s} L${x-80*s},${y-40*s}Z" fill="${c}"/>`;
 // ahoge flick
 o+=`<path d="M${x-4*s},${y-110*s} C${x+10*s},${y-150*s} ${x+44*s},${y-150*s} ${x+40*s},${y-124*s}" stroke="${OL}" stroke-width="${9*s}" fill="none" stroke-linecap="round"/><path d="M${x-4*s},${y-110*s} C${x+10*s},${y-150*s} ${x+44*s},${y-150*s} ${x+40*s},${y-124*s}" stroke="${c}" stroke-width="${4.5*s}" fill="none" stroke-linecap="round"/>`;
 // strand lines + highlights
 o+=`<path d="M${x-62*s},${y-40*s} q${-6*s},${-22*s} ${4*s},${-40*s} M${x-22*s},${y-36*s} q${-4*s},${-26*s} ${8*s},${-48*s} M${x+24*s},${y-36*s} q${6*s},${-24*s} ${-4*s},${-46*s} M${x+62*s},${y-40*s} q${6*s},${-20*s} ${-4*s},${-38*s}" stroke="${cS}" stroke-width="${2.8*s}" fill="none" stroke-linecap="round"/>
  <path d="M${x-58*s},${y-76*s} C${x-30*s},${y-96*s} ${x+10*s},${y-98*s} ${x+40*s},${y-88*s}" stroke="${cL}" stroke-width="${5*s}" fill="none" stroke-linecap="round" opacity=".9"/>
  <path d="M${x-40*s},${y-60*s} q${10*s},${-8*s} ${22*s},${-6*s} M${x+16*s},${y-66*s} q${10*s},${-4*s} ${20*s},${2*s}" stroke="${cL}" stroke-width="${3*s}" fill="none" stroke-linecap="round" opacity=".7"/>`;
 return o;};
OUT.hoodie2=(X,sh,hip,s,c)=>`<path d="M${X-46*s},${sh-4*s} C${X-40*s},${sh+40*s} ${X+40*s},${sh+40*s} ${X+46*s},${sh-4*s} C${X+30*s},${sh+14*s} ${X-30*s},${sh+14*s} ${X-46*s},${sh-4*s}Z" fill="${c.topS}" stroke="${OL}" stroke-width="${2.4*s}"/>
  <path d="M${X-14*s},${sh+22*s} C${X-16*s},${sh+40*s} ${X-12*s},${sh+56*s} ${X-16*s},${sh+70*s} M${X+14*s},${sh+22*s} C${X+12*s},${sh+40*s} ${X+16*s},${sh+52*s} ${X+12*s},${sh+64*s}" stroke="${OL}" stroke-width="${8*s}" fill="none" stroke-linecap="round"/>
  <path d="M${X-14*s},${sh+22*s} C${X-16*s},${sh+40*s} ${X-12*s},${sh+56*s} ${X-16*s},${sh+70*s} M${X+14*s},${sh+22*s} C${X+12*s},${sh+40*s} ${X+16*s},${sh+52*s} ${X+12*s},${sh+64*s}" stroke="#f4f0ea" stroke-width="${4.4*s}" fill="none" stroke-linecap="round"/>
  <path d="M${X-50*s},${hip-40*s} C${X-20*s},${hip-46*s} ${X+20*s},${hip-46*s} ${X+50*s},${hip-40*s} L${X+56*s},${hip+2*s} L${X-56*s},${hip+2*s}Z" fill="${c.topS}" stroke="${OL}" stroke-width="${2.2*s}" opacity=".95"/>
  <rect x="${X-90*s}" y="${hip}" width="${180*s}" height="${30*s}" fill="${c.topS}"/><path d="M${X-90*s},${hip} L${X+90*s},${hip}" stroke="${OL}" stroke-width="${2*s}"/>`;
OUT.offshoulder=(X,sh,hip,s,c)=>`<rect x="${X-120*s}" y="${sh-20*s}" width="${240*s}" height="${46*s}" fill="#2a2238"/>
  <path d="M${X-40*s},${sh+6*s} q${18*s},${8*s} ${34*s},${2*s} M${X+40*s},${sh+6*s} q${-18*s},${8*s} ${-34*s},${2*s}" stroke="#6a5a80" stroke-width="${2.4*s}" fill="none"/>
  <path d="M${X-110*s},${sh+26*s} C${X-40*s},${sh+40*s} ${X+40*s},${sh+40*s} ${X+110*s},${sh+26*s} L${X+110*s},${sh+50*s} C${X+40*s},${sh+64*s} ${X-40*s},${sh+64*s} ${X-110*s},${sh+50*s}Z" fill="${c.topL}" stroke="${OL}" stroke-width="${2.4*s}"/>
  ${[...Array(14)].map((_,i)=>`<path d="M${X-96*s+i*14*s},${sh+32*s+Math.sin(i/13*Math.PI)*12*s} l0,${20*s}" stroke="${c.topS}" stroke-width="${2*s}"/>`).join('')}
  <path d="M${X-50*s},${sh+90*s} q${6*s},${30*s} 0,${60*s} M${X+44*s},${sh+96*s} q${-6*s},${26*s} 0,${54*s}" stroke="${c.topS}" stroke-width="${2.4*s}" fill="none"/>
  <rect x="${X-100*s}" y="${hip-6*s}" width="${200*s}" height="${36*s}" fill="${c.topS}"/>${[...Array(14)].map((_,i)=>`<path d="M${X-92*s+i*14*s},${hip-4*s} l0,${30*s}" stroke="${c.topL}" stroke-width="${2*s}"/>`).join('')}<path d="M${X-100*s},${hip-6*s} L${X+100*s},${hip-6*s}" stroke="${OL}" stroke-width="${2*s}"/>`;
HAIR.bun=(c,cL,cS)=>(x,y,s)=>{let o='';const T=(dx,dy,a,L,w,b,col)=>o+=tuft(x+dx*s,y+dy*s,a,L*s,w*s,b*s,col||c,s);
 // bun on top (behind front hair): fluffy circle with flyaways
 o+=`<path d="M${x-20*s},${y-148*s} q${-10*s},${-18*s} ${4*s},${-24*s} M${x+18*s},${y-150*s} q${14*s},${-14*s} ${24*s},${-4*s} M${x-40*s},${y-126*s} q${-18*s},${-6*s} ${-22*s},${8*s}" stroke="${OL}" stroke-width="${2.4*s}" fill="none" stroke-linecap="round"/>`;
 o+=`<circle cx="${x}" cy="${y-112*s}" r="${40*s}" fill="${c}" stroke="${OL}" stroke-width="${2.8*s}"/>
  <path d="M${x-26*s},${y-118*s} C${x-14*s},${y-140*s} ${x+16*s},${y-140*s} ${x+26*s},${y-120*s} M${x-22*s},${y-100*s} C${x-6*s},${y-114*s} ${x+12*s},${y-112*s} ${x+24*s},${y-98*s}" stroke="${cS}" stroke-width="${3*s}" fill="none" stroke-linecap="round"/>
  <path d="M${x-20*s},${y-132*s} C${x-8*s},${y-144*s} ${x+8*s},${y-144*s} ${x+16*s},${y-134*s}" stroke="${cL}" stroke-width="${4*s}" fill="none" stroke-linecap="round"/>`;
 // cap
 o+=`<path d="M${x-88*s},${y-14*s} C${x-98*s},${y-108*s} ${x+98*s},${y-108*s} ${x+88*s},${y-14*s} C${x+60*s},${y-50*s} ${x-60*s},${y-50*s} ${x-88*s},${y-14*s}Z" fill="${c}" stroke="${OL}" stroke-width="${2.8*s}"/>`;
 // side locks framing face (down to cheeks)
 [[-78,-34,96,62,38,-10],[78,-34,84,62,38,10]].forEach(t=>T(...t));
 // fringe wisps
 [[-48,-62,108,36,44,-10],[-14,-70,94,34,46,10],[20,-70,84,34,46,-10],[52,-62,72,34,42,10]].forEach(t=>T(...t));
 // flyaways
 o+=`<path d="M${x-70*s},${y-80*s} q${-20*s},${-10*s} ${-30*s},${4*s} M${x+72*s},${y-80*s} q${22*s},${-8*s} ${30*s},${8*s} M${x-40*s},${y-96*s} q${-8*s},${-16*s} ${-22*s},${-16*s}" stroke="${OL}" stroke-width="${2.2*s}" fill="none" stroke-linecap="round"/>
  <path d="M${x-50*s},${y-66*s} C${x-26*s},${y-82*s} ${x+18*s},${y-84*s} ${x+50*s},${y-68*s}" stroke="${cL}" stroke-width="${4.5*s}" fill="none" stroke-linecap="round" opacity=".9"/>
  <path d="M${x-30*s},${y-50*s} q${-4*s},${-14*s} ${2*s},${-26*s} M${x+28*s},${y-50*s} q${4*s},${-14*s} ${-2*s},${-26*s}" stroke="${cS}" stroke-width="${2.6*s}" fill="none" stroke-linecap="round"/>
  <g transform="translate(${x-58*s},${y-56*s}) rotate(-30)"><rect x="${-18*s}" y="${-7*s}" width="${36*s}" height="${14*s}" rx="${4*s}" fill="#e3232c" stroke="${OL}" stroke-width="${2.4*s}"/><rect x="${-8*s}" y="${-2*s}" width="${16*s}" height="${4*s}" rx="${2*s}" fill="#ff8a8a"/></g>`;
 return o;};
HAIR.bun2=(c,cL,cS)=>(x,y,s)=>{const P=(d)=>d.replace(/(-?\d+\.?\d*),(-?\d+\.?\d*)/g,(m,a,b)=>`${(x+a*s).toFixed(1)},${(y+b*s).toFixed(1)}`);
 const st=`stroke="${OL}" stroke-width="${2.8*s}" stroke-linejoin="round"`;let o='';
 // messy bun: three loops + band
 o+=`<path d="${P('M-44,-96 C-70,-120 -50,-160 -14,-150 C-6,-176 40,-176 44,-146 C76,-148 80,-104 46,-94 Z')}" fill="${c}" ${st}/>`;
 o+=`<path d="${P('M-30,-110 C-36,-134 -14,-146 2,-134 M10,-140 C24,-156 44,-146 40,-124 M-10,-104 C0,-124 24,-124 30,-108')}" stroke="${cS}" stroke-width="${3*s}" fill="none" stroke-linecap="round"/>`;
 o+=`<path d="${P('M-18,-150 C-4,-164 18,-164 30,-152')}" stroke="${cL}" stroke-width="${4*s}" fill="none" stroke-linecap="round"/>`;
 o+=`<path d="${P('M-24,-160 C-36,-176 -30,-190 -18,-188 M34,-162 C44,-178 60,-172 56,-160')}" stroke="${OL}" stroke-width="${2.4*s}" fill="none" stroke-linecap="round"/>`;
 // cap of hair over skull with soft wavy fringe (rounded scallops)
 o+=`<path d="${P('M-88,-10 C-100,-80 -60,-108 0,-108 C60,-108 100,-80 88,-10 C78,-30 70,-40 58,-44 C54,-30 44,-26 34,-30 C30,-48 18,-56 4,-56 C2,-42 -10,-34 -22,-38 C-24,-52 -36,-58 -50,-56 C-52,-42 -64,-34 -74,-38 C-80,-30 -84,-20 -88,-10Z')}" fill="${c}" ${st}/>`;
 // side curtain locks hugging face, ending in soft curl
 o+=`<path d="${P('M-74,-40 C-96,-10 -98,30 -86,52 C-80,62 -66,62 -66,50 C-70,46 -76,46 -76,40 C-82,10 -76,-16 -60,-36Z')}" fill="${c}" ${st}/>`;
 o+=`<path d="${P('M74,-40 C96,-10 98,30 86,52 C80,62 66,62 66,50 C70,46 76,46 76,40 C82,10 76,-16 60,-36Z')}" fill="${c}" ${st}/>`;
 // strand lines + shine
 o+=`<path d="${P('M-50,-90 C-30,-100 0,-102 30,-96 M-70,-30 C-80,0 -80,24 -76,36 M70,-30 C80,0 80,24 76,36 M-36,-70 C-30,-80 -20,-86 -8,-88 M20,-86 C34,-84 46,-76 54,-66')}" stroke="${cS}" stroke-width="${2.6*s}" fill="none" stroke-linecap="round"/>`;
 o+=`<path d="${P('M-56,-80 C-30,-98 20,-100 54,-82')}" stroke="${cL}" stroke-width="${5*s}" fill="none" stroke-linecap="round" opacity=".9"/>`;
 // a couple of soft flyaways
 o+=`<path d="${P('M-80,-70 C-96,-80 -104,-72 -100,-62 M82,-72 C96,-84 106,-76 102,-64')}" stroke="${OL}" stroke-width="${2.2*s}" fill="none" stroke-linecap="round"/>`;
 // clip
 o+=`<g transform="translate(${x-56*s},${y-62*s}) rotate(-28)"><rect x="${-18*s}" y="${-7*s}" width="${36*s}" height="${14*s}" rx="${5*s}" fill="#e3232c" stroke="${OL}" stroke-width="${2.4*s}"/><rect x="${-9*s}" y="${-2*s}" width="${18*s}" height="${4*s}" rx="${2*s}" fill="#ff8a8a"/></g>`;
 return o;};
const AGE={y18:{s:1.08,headS:.7,legL:1.55,torsoL:1.18,neck:16},kid:{s:.82,headS:1.05,legL:.85,wide:.95},teen:{s:1,headS:.92,legL:1.12,wide:1},adult:{s:1.08,headS:.84,legL:1.32,wide:1.08},elder:{s:1.02,headS:.86,legL:1.18,wide:1.12}};
module.exports={head,body,HAIR,OUT,ACC,AGE,OL,rnd};
