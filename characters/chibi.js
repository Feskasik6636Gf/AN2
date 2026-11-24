// Chibi/anime character sheet generator (SVG) — original character "Тёма"
const OL='#1a1214';
let seed=3;const rnd=()=>{seed=(seed*16807)%2147483647;return (seed-1)/2147483646};
const setSeed=v=>{seed=v};
let n=0;const uid=p=>p+(n++);
const C={skin:'#fdd8bf',skinS:'#f3b297',skinD:'#e08f78',blush:'#ff8f8f',
 hair:'#8a4a26',hairS:'#5a2c16',hairL:'#c07a44',iris:'#6a3a1e',irisL:'#b8743e',
 top:'#e3232c',topS:'#a8121b',topL:'#ff5a5a',str:'#f4f1ea',pants:'#2a2220',pantsS:'#171210',shoe:'#e3232c',shoeS:'#a8121b',shoeA:'#f6f3ee'};

// tapered curved lock: root (x,y), angle deg, length, width, bend
function lock(x,y,a,L,w,b,fill,sw=3.2){
 const r=a*Math.PI/180, dx=Math.cos(r), dy=Math.sin(r), px=-dy, py=dx;
 const tx=x+dx*L+px*b, ty=y+dy*L+py*b;
 const l1x=x+px*w/2, l1y=y+py*w/2, l2x=x-px*w/2, l2y=y-py*w/2;
 const c1x=x+dx*L*.55+px*(w*.45+b*.9), c1y=y+dy*L*.55+py*(w*.45+b*.9);
 const c2x=x+dx*L*.55-px*(w*.25-b*.9), c2y=y+dy*L*.55-py*(w*.25-b*.9);
 return `<path d="M${l1x.toFixed(1)},${l1y.toFixed(1)} Q${c1x.toFixed(1)},${c1y.toFixed(1)} ${tx.toFixed(1)},${ty.toFixed(1)} Q${c2x.toFixed(1)},${c2y.toFixed(1)} ${l2x.toFixed(1)},${l2y.toFixed(1)}Z" fill="${fill}" stroke="${OL}" stroke-width="${sw}" stroke-linejoin="round"/>`;
}

const FACE=`M-98,-46 C-104,18 -86,66 -44,90 C-22,103 22,103 44,90 C86,66 104,18 98,-46 C92,-96 -92,-96 -98,-46Z`;

function hairBack(){setSeed(41);let s='';
 // fluffy outer silhouette: wide curved tufts with curled tips
 for(let i=0;i<20;i++){const t=i/19, a=175+t*190; const r=a*Math.PI/180;
  const R=112, x=Math.cos(r)*R, y=Math.sin(r)*R*.92-36;
  if(y>30)continue;
  s+=lock(x*.8,y*.8,a+(i%2?18:-14),40+rnd()*22,60,(i%2?1:-1)*(16+rnd()*10),C.hair,4);}
 s+=`<path d="M-126,34 C-146,-84 -72,-162 0,-164 C72,-162 146,-84 126,34 C118,-20 98,-52 68,-64 L-68,-64 C-98,-52 -118,-20 -126,34Z" fill="${C.hair}"/>`;
 s+=lock(-108,-36,100,84,46,-22,C.hair,4)+lock(108,-36,80,84,46,22,C.hair,4)+lock(-100,0,112,56,34,-18,C.hair,4)+lock(100,0,68,56,34,18,C.hair,4);
 return s;}
function hairFront(){setSeed(77);let s='';
 const roots=[[-96,-80,108,62,-1],[-72,-104,100,82,1],[-40,-116,92,92,-1],[-6,-120,86,90,1],[28,-118,94,88,-1],[60,-104,80,80,1],[88,-82,70,62,-1]];
 for(const [x,y,a,L,d] of roots) s+=lock(x,y,a+(rnd()-.5)*10,L+rnd()*8,56,d*(18+rnd()*8),C.hair,4);
 // top fluff + ahoge curl
 s+=lock(-50,-146,-130,40,44,-16,C.hair,4)+lock(40,-148,-50,40,44,16,C.hair,4)+lock(-6,-160,-100,46,40,-18,C.hair,4);
 s+=`<path d="M6,-196 C30,-236 70,-226 60,-200 C52,-184 30,-192 40,-206" stroke="${OL}" stroke-width="10" fill="none" stroke-linecap="round"/><path d="M6,-196 C30,-236 70,-226 60,-200 C52,-184 30,-192 40,-206" stroke="${C.hair}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
 // shading + highlights (wavy strand lines)
 s+=`<path d="M-70,-112 C-40,-136 10,-140 56,-128" stroke="${C.hairL}" stroke-width="6" fill="none" stroke-linecap="round" opacity=".85"/>
  <path d="M-70,-132 q10,-10 22,-6 M-30,-146 q14,-8 26,-4 M20,-146 q14,-4 24,2 M60,-136 q12,0 18,8" stroke="#e0a066" stroke-width="3.4" fill="none" stroke-linecap="round"/>
  <path d="M-66,-60 q10,-24 4,-46 M-30,-44 q8,-30 0,-56 M8,-46 q-6,-28 4,-58 M44,-54 q8,-24 -2,-44 M76,-62 q-4,-18 6,-34" stroke="${C.hairS}" stroke-width="3.4" fill="none" stroke-linecap="round"/>`;
 return s;}
function eyes(m,lk=0){let s='';
 for(const sx of [-1,1]){const x=sx*44, y=14, id=uid('ec');
  if(m==='laugh'||m==='cry'){ // closed ^ ^ / crying arcs
   s+= m==='laugh'?`<path d="M${x-24},${y+8} Q${x},${y-20} ${x+24},${y+8}" stroke="${OL}" stroke-width="7" fill="none" stroke-linecap="round"/>`
     :`<path d="M${x-24},${y-2} Q${x},${y+14} ${x+24},${y-2}" stroke="${OL}" stroke-width="7" fill="none" stroke-linecap="round"/>
       <path d="M${x-10},${y+8} C${x-14},${y+50} ${x-6},${y+70} ${x-12},${y+96} L${x+10},${y+96} C${x+6},${y+66} ${x+14},${y+44} ${x+8},${y+8}Z" fill="#7fc9ff" stroke="${OL}" stroke-width="3" opacity=".95"/>`;
   continue;}
  if(m==='love'){s+=`<path d="M${x},${y+30} C${x-44},${y} ${x-30},${y-32} ${x},${y-12} C${x+30},${y-32} ${x+44},${y} ${x},${y+30}Z" fill="#ff5f7e" stroke="${OL}" stroke-width="4"/><ellipse cx="${x-12}" cy="${y-8}" rx="7" ry="5" fill="#fff" opacity=".8"/>`;continue;}
  const big=m==='shock'||m==='panic';
  const rx=big?30:27, ry=big?36:33;
  s+=`<defs><clipPath id="${id}"><ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}"/></clipPath></defs>`;
  s+=`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#fff"/>`;
  s+=`<g clip-path="url(#${id})">`;
  if(big){s+=`<circle cx="${x+lk}" cy="${y}" r="6" fill="${OL}"/>`;}
  else{const ix=x+lk+(m==='smug'||m==='side'?sx*0+9:0), iy=y+4;
   const ig=uid('ig');
   s+=`<defs><linearGradient id="${ig}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a140a"/><stop offset=".55" stop-color="${C.iris}"/><stop offset="1" stop-color="${C.irisL}"/></linearGradient></defs>
    <ellipse cx="${ix}" cy="${iy}" rx="20" ry="27" fill="url(#${ig})" stroke="${OL}" stroke-width="2"/>
    <ellipse cx="${ix}" cy="${iy+2}" rx="10" ry="14" fill="#1a0c06"/>
    <ellipse cx="${ix-8}" cy="${iy-10}" rx="7.5" ry="9" fill="#fff"/><circle cx="${ix+8}" cy="${iy+12}" r="3.5" fill="#fff"/>`;}
  // eyelid shadow / half lids
  if(m==='smug'||m==='side'||m==='angry'||m==='tired'){const ly=m==='angry'?y-8:y-6, tilt=m==='angry'?-sx*12:0;
   s+=`<path d="M${x-40},${ly-tilt} L${x+40},${ly+tilt} L${x+40},${y-50} L${x-40},${y-50}Z" fill="${C.skin}"/>`;}
  s+=`</g>`;
  // lash line (thick) + wing + lower lid
  const top=(m==='smug'||m==='side'||m==='tired')?y-6:(m==='angry'?y-8:y-ry+2);
  const tl=m==='angry'?-sx*12:0;
  if(m==='smug'||m==='side'||m==='tired'||m==='angry') s+=`<path d="M${x-rx-2},${top-tl} L${x+rx+2},${top+tl}" stroke="${OL}" stroke-width="7" stroke-linecap="round"/>`;
  else s+=`<path d="M${x-rx-3},${y-6} C${x-rx+2},${y-ry-6} ${x+rx-2},${y-ry-6} ${x+rx+3},${y-8}" stroke="${OL}" stroke-width="7" fill="none" stroke-linecap="round"/>
           <path d="M${x+sx*(rx+2)},${y-10} l${sx*9},-8" stroke="${OL}" stroke-width="5" stroke-linecap="round"/>`;
  s+=`<path d="M${x-rx+8},${y+ry-2} Q${x},${y+ry+4} ${x+rx-8},${y+ry-2}" stroke="${OL}" stroke-width="2.6" fill="none" opacity=".75"/>`;
 }
 return s;}
function brows(m){const t={angry:16,shock:-14,panic:-16,sad:-14,cry:-14,smug:4,side:2,laugh:-6,love:-8,calm:0,tired:6}[m]??0;
 const by=m==='shock'||m==='panic'?-44:-34;let s='';
 for(const sx of [-1,1]){const xi=sx*18, xo=sx*68; const yi=by+t, yo=by-t*.4;
  s+=`<path d="M${xo},${yo} Q${sx*44},${Math.min(yi,yo)-8} ${xi},${yi}" stroke="${C.hairS}" stroke-width="9" fill="none" stroke-linecap="round"/>`;}
 return s;}
function mouth(m){const y=64;
 const M={
  calm:`<path d="M-12,${y} Q0,${y+8} 14,${y-2}" stroke="${OL}" stroke-width="4" fill="none" stroke-linecap="round"/>`,
  smug:`<path d="M-16,${y+2} Q4,${y+10} 22,${y-6}" stroke="${OL}" stroke-width="4" fill="none" stroke-linecap="round"/>`,
  side:`<path d="M-4,${y+4} Q8,${y+2} 14,${y-2}" stroke="${OL}" stroke-width="4" fill="none" stroke-linecap="round"/>`,
  tired:`<path d="M-10,${y+2} L10,${y+2}" stroke="${OL}" stroke-width="4" stroke-linecap="round"/>`,
  shock:`<path d="M-20,${y+4} Q0,${y-14} 20,${y+4} Q22,${y+34} 0,${y+34} Q-22,${y+34} -20,${y+4}Z" fill="#8a1f2e" stroke="${OL}" stroke-width="4"/><path d="M-12,${y+26} Q0,${y+16} 12,${y+26} Q0,${y+32} -12,${y+26}Z" fill="#ff7a88"/>`,
  panic:`<path d="M-26,${y+14} Q-12,${y-6} 0,${y+4} Q14,${y-8} 26,${y+12} Q20,${y+30} 0,${y+28} Q-20,${y+32} -26,${y+14}Z" fill="#8a1f2e" stroke="${OL}" stroke-width="4"/><path d="M-18,${y+10} L18,${y+8}" stroke="#fff" stroke-width="5"/>`,
  laugh:`<path d="M-34,${y-6} Q0,${y-2} 34,${y-6} Q28,${y+40} 0,${y+40} Q-28,${y+40} -34,${y-6}Z" fill="#8a1f2e" stroke="${OL}" stroke-width="4"/><path d="M-30,${y-4} Q0,${y} 30,${y-4} L26,${y+6} Q0,${y+8} -26,${y+6}Z" fill="#fff"/><path d="M-16,${y+32} Q0,${y+18} 16,${y+32} Q0,${y+40} -16,${y+32}Z" fill="#ff7a88"/>`,
  love:`<path d="M-26,${y-4} Q0,${y} 26,${y-4} Q20,${y+30} 0,${y+30} Q-20,${y+30} -26,${y-4}Z" fill="#8a1f2e" stroke="${OL}" stroke-width="4"/><path d="M-12,${y+22} Q0,${y+12} 12,${y+22} Q0,${y+30} -12,${y+22}Z" fill="#ff7a88"/>`,
  cry:`<path d="M-30,${y+20} Q-16,${y-10} 0,${y-6} Q16,${y-10} 30,${y+20} Q14,${y+40} 0,${y+38} Q-14,${y+40} -30,${y+20}Z" fill="#8a1f2e" stroke="${OL}" stroke-width="4"/><path d="M-14,${y+28} Q0,${y+18} 14,${y+28} Q0,${y+36} -14,${y+28}Z" fill="#ff7a88"/>`,
  angry:`<path d="M-22,${y+4} L22,${y+4} L18,${y+20} L-18,${y+20}Z" fill="#fff" stroke="${OL}" stroke-width="4" stroke-linejoin="round"/><path d="M-20,${y+12} L20,${y+12} M-8,${y+4} L-8,${y+20} M6,${y+4} L6,${y+20}" stroke="${OL}" stroke-width="2.4"/>`,
 };return M[m]||M.calm;}
function fx(m){ // emotion icons
 const F={
  panic:`<path d="M118,-40 q14,22 0,34 q-14,-12 0,-34Z M-132,20 q12,18 0,28 q-12,-10 0,-28Z" fill="#7fc9ff" stroke="${OL}" stroke-width="3"/>`,
  shock:`<path d="M120,-120 l26,-30 M134,-96 l40,-12 M108,-140 l4,-38" stroke="${OL}" stroke-width="7" stroke-linecap="round"/>`,
  love:[[-150,-30,1],[140,-10,.8],[-120,60,.6],[150,70,.7]].map(([x,y,k])=>`<path transform="translate(${x},${y}) scale(${k})" d="M0,22 C-30,0 -22,-22 0,-8 C22,-22 30,0 0,22Z" fill="#ff6a8a" stroke="${OL}" stroke-width="3"/>`).join(''),
  angry:`<g transform="translate(64,-118)"><path d="M-22,-6 Q-10,-8 -6,-22 M6,-22 Q10,-8 22,-6 M22,6 Q10,8 6,22 M-6,22 Q-10,8 -22,6" stroke="#e8202e" stroke-width="7" fill="none" stroke-linecap="round"/></g><path d="M134,40 q20,-10 34,4 q-6,18 -26,14 q-18,-4 -8,-18Z" fill="#fff" stroke="${OL}" stroke-width="3"/>`,
  laugh:`<path d="M-140,-40 l-30,-14 M-136,-10 l-36,4 M140,-40 l30,-14 M136,-10 l36,4" stroke="#ffb020" stroke-width="7" stroke-linecap="round"/>`,
  tired:`<text x="110" y="-110" font-family="DejaVu Sans" font-weight="bold" font-size="54" fill="#6a4ad0" stroke="${OL}" stroke-width="2.5">Z</text><text x="150" y="-150" font-family="DejaVu Sans" font-weight="bold" font-size="40" fill="#6a4ad0" stroke="${OL}" stroke-width="2">z</text>`,
  smug:`<path d="M130,-90 l6,16 l16,6 l-16,6 l-6,16 l-6,-16 l-16,-6 l16,-6Z" fill="#ffd040" stroke="${OL}" stroke-width="2.5"/>`,
  side:`<path d="M120,30 c30,-10 40,20 20,26 c-26,8 -30,-24 -6,-28 c16,-2 20,12 10,16" stroke="${OL}" stroke-width="3.5" fill="none"/>`,
 };return F[m]||'';}

function head(x,y,s,m='calm',lk=0){
 let o=`<g transform="translate(${x},${y}) scale(${s})">`;
 o+=hairBack();
 // ears
 for(const sx of [-1,1]) o+=`<path d="M${sx*94},-4 C${sx*124},-20 ${sx*130},34 ${sx*92},38Z" fill="${C.skin}" stroke="${OL}" stroke-width="4"/><path d="M${sx*102},6 C${sx*116},4 ${sx*114},24 ${sx*100},26" stroke="${C.skinD}" stroke-width="3" fill="none"/>`;
 const fc=uid('fc');
 o+=`<defs><clipPath id="${fc}"><path d="${FACE}"/></clipPath></defs><path d="${FACE}" fill="${C.skin}"/>`;
 // hair shadow on face + cheek blush hatching
 o+=`<g clip-path="url(#${fc})"><path d="M-120,-40 C-80,-10 -50,-30 -30,-10 C-10,-30 20,-24 40,-10 C60,-30 90,-14 120,-36 L120,-120 L-120,-120Z" fill="${C.skinS}"/>
   <path d="M60,40 C80,60 90,80 100,100 L120,120 L120,20Z" fill="${C.skinS}" opacity=".6"/></g>`;
 const bl=m==='love'||m==='side'||m==='cry'?.9:.55;
 o+=`<ellipse cx="-58" cy="50" rx="22" ry="11" fill="${C.blush}" opacity="${bl*.7}"/><ellipse cx="58" cy="50" rx="22" ry="11" fill="${C.blush}" opacity="${bl*.7}"/>
  <path d="M-70,46 l-6,10 M-60,46 l-6,10 M-50,46 l-6,10 M70,46 l-6,10 M60,46 l-6,10 M50,46 l-6,10" stroke="${C.skinD}" stroke-width="2.4" stroke-linecap="round" opacity="${bl}"/>`;
 o+=`<path d="${FACE}" fill="none" stroke="${OL}" stroke-width="4.5"/>`;
 o+=eyes(m,lk)+brows(m);
 o+=`<path d="M4,38 q5,4 0,7" stroke="${C.skinD}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
 o+=mouth(m);
 o+=hairFront();
 o+=fx(m);
 return o+'</g>';}

// hoodie bust
function bust(x,y,s,m,arms){let o=`<g transform="translate(${x},${y}) scale(${s})">`;
 o+=`<path d="M-150,320 C-160,220 -140,150 -60,124 L60,124 C140,150 160,220 150,320Z" fill="${C.top}" stroke="${OL}" stroke-width="4.5"/>
  <path d="M60,124 C120,146 150,200 150,320 L110,320 C116,240 100,170 50,140Z" fill="${C.topS}"/>
  <path d="M-36,96 L36,96 L40,140 L-40,140Z" fill="${C.skinS}" stroke="${OL}" stroke-width="4"/>
  <path d="M-100,136 C-80,104 80,104 100,136 C80,176 40,190 0,190 C-40,190 -80,176 -100,136Z" fill="${C.top}" stroke="${OL}" stroke-width="4.5"/>
  <path d="M-62,140 C-40,160 40,160 62,140" stroke="${C.topS}" stroke-width="6" fill="none"/>
  <path d="M-22,170 L-26,260 M22,170 L26,250" stroke="${OL}" stroke-width="11" stroke-linecap="round"/><path d="M-22,170 L-26,260 M22,170 L26,250" stroke="${C.str}" stroke-width="6" stroke-linecap="round"/>
  <path d="M-110,230 C-90,240 -80,270 -84,320 M110,230 C90,240 80,270 84,320" stroke="${C.topS}" stroke-width="4" fill="none"/>`;
 if(arms)o+=arms;
 o+='</g>';o+=head(x,y,s,m);return o;}

// full body front
function fullBody(x,y,s){let o=`<g transform="translate(${x},${y}) scale(${s})">`;
 o+=`<ellipse cx="0" cy="560" rx="130" ry="16" fill="#000" opacity=".15"/><path d="M-34,90 L34,90 L38,140 L-38,140Z" fill="${C.skinS}" stroke="${OL}" stroke-width="4"/>`;
 // legs baggy
 for(const sx of [-1,1]) o+=`<path d="M${sx*12},330 L${sx*82},330 L${sx*92},520 L${sx*18},520Z" fill="${C.pants}" stroke="${OL}" stroke-width="4.5" stroke-linejoin="round"/><path d="M${sx*60},360 L${sx*70},500" stroke="${C.pantsS}" stroke-width="4"/>
   <path d="M${sx*14},512 C${sx*10},490 ${sx*90},488 ${sx*104},520 C${sx*112},548 ${sx*96},556 ${sx*60},556 L${sx*8},556 C${sx*2},540 ${sx*6},524 ${sx*14},512Z" fill="${C.shoe}" stroke="${OL}" stroke-width="4.5"/>
   <path d="M${sx*8},546 L${sx*104},546" stroke="${C.shoeA}" stroke-width="6"/><path d="M${sx*30},516 l${sx*20},-6 M${sx*36},526 l${sx*22},-6" stroke="${OL}" stroke-width="3"/>`;
 // torso hoodie
 o+=`<path d="M-100,150 C-114,220 -112,300 -106,350 L106,350 C112,300 114,220 100,150 C80,128 -80,128 -100,150Z" fill="${C.top}" stroke="${OL}" stroke-width="4.5"/>
  <path d="M60,136 C100,150 112,220 106,350 L72,350 C90,260 84,180 40,140Z" fill="${C.topS}"/>
  <rect x="-106" y="324" width="212" height="30" rx="12" fill="${C.topS}" stroke="${OL}" stroke-width="4"/>
  <path d="M-62,250 L62,250 L74,320 L-74,320Z" fill="${C.topS}" stroke="${OL}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M-90,140 C-70,110 70,110 90,140 C70,176 40,188 0,188 C-40,188 -70,176 -90,140Z" fill="${C.top}" stroke="${OL}" stroke-width="4.5"/>
  <path d="M-20,170 L-24,250 M20,170 L24,240" stroke="${OL}" stroke-width="11" stroke-linecap="round"/><path d="M-20,170 L-24,250 M20,170 L24,240" stroke="${C.str}" stroke-width="6" stroke-linecap="round"/>`;
 // arms into pocket
 for(const sx of [-1,1]) o+=`<path d="M${sx*96},160 C${sx*128},210 ${sx*120},262 ${sx*70},286" stroke="${OL}" stroke-width="58" fill="none" stroke-linecap="round"/><path d="M${sx*96},160 C${sx*128},210 ${sx*120},262 ${sx*70},286" stroke="${C.top}" stroke-width="48" fill="none" stroke-linecap="round"/>
   <path d="M${sx*110},204 C${sx*118},236 ${sx*108},260 ${sx*88},274" stroke="${C.topS}" stroke-width="8" fill="none" stroke-linecap="round"/>`;
 o+=`<path d="M-70,264 L70,264" stroke="${OL}" stroke-width="4"/>`;
 o+='</g>';
 o+=head(x,y-6*s,s*.98,'smug');
 return o;}

module.exports={head,bust,fullBody,C,OL};
