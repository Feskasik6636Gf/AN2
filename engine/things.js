// Things: animated non-human objects (dinosaurs, goat, jeep, helicopter, cup, gate, fence, monitors, ...).
// Same projection as characters: place with at:[X,Z] on the floor; sizes in meters.
// shot.things:[{id,k:'trex',at:[X,Z],moves:[{t0,t1,to:[X,Z]}],flip:false,scale:1,mouth:[[t0,t1]],head:[dx,dy]}]
const S=require('./stage.js');const {f}=S;
const A=require('./anim.js');
const OL='#0d0b12';
const sh=S.shade;
const sw=(w)=>`stroke="${OL}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke"`;
const P=(pts)=>pts.map(p=>f(p[0])+','+f(p[1])).join(' L');
// limb: black outline stroke + colored stroke on top, in local meters (stroke width in meters via scale -> px set by u)
function limb(pts,col,wm,u){const d='M'+P(pts);return `<path d="${d}" fill="none" stroke="${OL}" stroke-width="${f(wm*u+5)}" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke"/><path d="${d}" fill="none" stroke="${col}" stroke-width="${f(wm*u)}" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>`;}
const eye=(x,y,r,iris='#ffd24a')=>`<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" ${sw(2)}/><circle cx="${x+r*.2}" cy="${y}" r="${r*.62}" fill="${iris}"/><circle cx="${x+r*.28}" cy="${y}" r="${r*.3}" fill="${OL}"/>`;
const open=(spans,t)=>{for(const [a,b] of spans||[]) if(t>=a&&t<=b)return .35+.65*Math.abs(Math.sin((t-a)*7));return 0;};

// ---- T-REX (facing +x, 1 unit = 1 m; body ~12 m long, 5.5 m tall) ----
function trex(t,o,u){const c=o.col||'#5f8a3a',dk=sh(c,-.35),lt=sh(c,.45),ph=o.cyc||0,walk=o.walking?1:0;
 const sg=Math.sin(ph*Math.PI*2),cg=Math.cos(ph*Math.PI*2);const bob=walk?-Math.abs(cg)*.18:Math.sin(t*2)*.04;
 const jaw=o.jaw??open(o.mouth,t);const hd=o.headUp??0;
 const leg=(s,front)=>{const k=front?1:-1,sx=s*k;const hip=[0,-2.5],kn=[.55+sx*.7,-1.35],an=[.1+sx*1.1,-.55-Math.max(0,sx)*.5],ft=[.75+sx*1.1,-.05-Math.max(0,sx)*.55];
  return limb([hip,kn,an,ft],front?c:dk,.95,u)+limb([ft,[ft[0]+.9,ft[1]]],front?c:dk,.5,u);};
 let g=`<g transform="translate(0,${f(bob)})">`;
 g+=leg(sg,false);
 // tail
 g+=`<path d="M-1.2,-3.6 C-3,-4 -4.5,-3.6 -6.2,-2.6 C-4.6,-2.5 -3,-2.3 -1.2,-2.3Z" fill="${c}" ${sw(3)}/>`;
 // body + neck + head
 const hy=-hd;
 g+=`<path d="M-1.4,-3.9 C0,-4.4 1.2,-4.5 1.9,-4.8 C2.3,-5.2 2.5,${f(-5.7+hy)} 2.9,${f(-5.8+hy)} L3.9,${f(-5.8+hy)} C4.7,${f(-5.7+hy)} 5.3,${f(-5.3+hy)} 5.4,${f(-4.9+hy)} L5.2,${f(-4.7+hy)} L3.2,${f(-4.6+hy)} C2.6,-4.1 2.1,-3.4 1.4,-2.9 C.5,-2.3 -.6,-2.1 -1.4,-2.2 C-2,-2.4 -2.4,-3 -2,-3.6Z" fill="${c}" ${sw(3)}/>`;
 g+=`<path d="M-1.2,-2.4 C0,-2.1 .9,-2.4 1.5,-3 C1.9,-3.4 2.3,-3.9 2.6,${f(-4.5+hy*.6)} C2.2,-3.7 1.4,-3 .6,-2.7 C-.2,-2.5 -.8,-2.5 -1.2,-2.4Z" fill="${lt}" opacity=".9"/>`;
 g+=`<path d="M-1,-4.2 l.15,.5 l.3,-.45 l.25,.5 l.3,-.4 M.6,-4.45 l.1,.5 l.3,-.4 l.25,.45" fill="none" stroke="${dk}" stroke-width="2" vector-effect="non-scaling-stroke"/>`;
 // lower jaw
 const ja=jaw*38;g+=`<g transform="translate(3,${f(-4.55+hy)}) rotate(${f(ja)})"><path d="M0,0 L2.3,.05 L2.25,.22 L.1,.42 C-.1,.4 -.2,.2 0,0Z" fill="${sh(c,-.1)}" ${sw(2.6)}/>${[.4,.85,1.3,1.75].map(x=>`<path d="M${x},0 l.1,-.2 l.1,.2Z" fill="#fff" stroke="${OL}" stroke-width="1" vector-effect="non-scaling-stroke"/>`).join('')}</g>`;
 g+=[3.4,3.85,4.3,4.75].map(x=>`<path d="M${x},${f(-4.6+hy)} l.1,.28 l.1,-.28Z" fill="#fff" stroke="${OL}" stroke-width="1" vector-effect="non-scaling-stroke"/>`).join('');
 g+=eye(3.55,-5.35+hy,.2)+`<path d="M3.2,${f(-5.65+hy)} L3.95,${f(-5.45+hy)}" stroke="${OL}" stroke-width="3" vector-effect="non-scaling-stroke"/><circle cx="5.1" cy="${f(-5.2+hy)}" r=".05" fill="${OL}"/>`;
 // tiny arms
 g+=limb([[1.6,-3.5],[2.1,-3.0],[2.5,-3.15]],c,.28,u);
 g+=leg(sg,true)+`</g>`;
 return g;}

// ---- RAPTOR (facing +x, ~1.9 m tall head, 3.5 m long) ----
function raptor(t,o,u){const c=o.col||'#5a7a6a',dk=sh(c,-.4),st=o.stripe||'#e08a2a',ph=o.cyc||0,walk=o.walking?1:0;
 const sg=Math.sin(ph*Math.PI*2),cg=Math.cos(ph*Math.PI*2);const bob=walk?-Math.abs(cg)*.07:Math.sin(t*3)*.02;
 const tilt=o.tilt??0,jaw=o.jaw??open(o.mouth,t);const crouch=o.crouch??0;
 const leg=(s,front)=>{const sx=s,hip=[.1,-1.0+crouch*.3],kn=[.35+sx*.35,-.55],an=[-.05+sx*.55,-.3-Math.max(0,sx)*.2],ft=[.2+sx*.55,-.02-Math.max(0,sx)*.25];
  return limb([hip,kn,an,ft],front?c:dk,.32,u)+limb([ft,[ft[0]+.35,ft[1]]],front?c:dk,.14,u)+`<path d="M${f(ft[0])},${f(ft[1]-.05)} q.15,-.2 .25,-.38" stroke="#fff" stroke-width="3" fill="none" vector-effect="non-scaling-stroke"/>`;};
 let g=`<g transform="translate(0,${f(bob)})">${leg(sg,false)}`;
 g+=`<path d="M-.7,-1.2 C-1.6,-1.35 -2.4,-1.2 -3.3,-.9 C-2.4,-.85 -1.6,-.8 -.7,-.85Z" fill="${c}" ${sw(2.6)}/>`;
 g+=`<path d="M-.8,-1.15 C-.2,-1.5 .5,-1.5 .9,-1.45 C1.1,-1.65 1.2,-1.95 1.3,-2.05 L1.45,-2.05 C1.8,-2.1 2.05,-1.95 2.1,-1.85 L2.0,-1.75 L1.6,-1.72 C1.4,-1.5 1.1,-1.15 .7,-.95 C.3,-.8 -.4,-.8 -.8,-.9Z" fill="${c}" ${sw(2.6)}/>`;
 g+=[ -.4,-.05,.3].map(x=>`<path d="M${x},-1.4 l.12,.25" stroke="${st}" stroke-width="5" stroke-linecap="round" vector-effect="non-scaling-stroke"/>`).join('')+`<path d="M-1.6,-1.1 l.1,.2 M-2.2,-1.05 l.1,.18" stroke="${st}" stroke-width="5" stroke-linecap="round" vector-effect="non-scaling-stroke"/>`;
 g+=`<g transform="translate(1.7,-1.75) rotate(${f(tilt)}) translate(-1.7,1.75)">`;
 g+=`<g transform="translate(1.7,-1.72) rotate(${f(jaw*30)})"><path d="M0,0 L.4,0 L.38,.07 L0,.1Z" fill="${dk}" ${sw(2)}/></g>`;
 g+=eye(1.58,-1.95,.065)+`<path d="M1.5,-2.03 L1.7,-1.97" stroke="${OL}" stroke-width="2" vector-effect="non-scaling-stroke"/></g>`;
 g+=limb([[.9,-1.15],[1.25,-1.0],[1.5,-1.1]],c,.1,u)+`<path d="M1.5,-1.1 l.12,-.04 M1.5,-1.1 l.12,.04" stroke="#fff" stroke-width="3" vector-effect="non-scaling-stroke"/>`;
 g+=leg(sg,true)+`</g>`;return g;}

// ---- GOAT ----
function goat(t,o,u){const c=o.col||'#f2ede0',dk='#8a7a64',chew=Math.sin(t*9)*.5+.5,ph=o.cyc||0,bob=o.walking?-Math.abs(Math.cos(ph*6.28))*.03:0,s=Math.sin(ph*6.28);
 const leg=(x,sp)=>limb([[x,-.5],[x+sp*.12,-.25],[x+sp*.18,0]],dk,.07,u);
 let g=`<g transform="translate(0,${f(bob)})">${leg(.35,s)}${leg(-.35,-s)}`;
 g+=`<ellipse cx="0" cy="-.62" rx=".5" ry=".28" fill="${c}" ${sw(2.6)}/>`;
 g+=`<path d="M.42,-.7 C.55,-.85 .62,-.95 .7,-.98 L.9,-.95 C1,-.92 1,-.82 .92,-.78 L.82,-.74 C.75,-.66 .6,-.62 .5,-.55Z" fill="${c}" ${sw(2.4)}/>`;
 g+=`<path d="M.72,-.98 q-.05,-.25 .05,-.32 M.78,-.98 q.1,-.22 .2,-.25" stroke="#c8b898" stroke-width="5" fill="none" stroke-linecap="round" vector-effect="non-scaling-stroke"/>`;
 g+=`<path d="M.86,-.76 q.02,.12 -.04,.2" stroke="${dk}" stroke-width="3" fill="none" vector-effect="non-scaling-stroke"/>`;
 g+=`<circle cx=".8" cy="-.88" r=".03" fill="${OL}"/><path d="M-.5,-.7 q-.12,-.05 -.14,.05" stroke="${OL}" stroke-width="2.6" fill="none" vector-effect="non-scaling-stroke"/>`;
 g+=`<path d="M.92,${f(-.82+chew*.03)} l.06,0" stroke="${OL}" stroke-width="3" vector-effect="non-scaling-stroke"/></g>`;return g;}

// ---- JEEP (tour car, side view facing +x) ----
function jeep(t,o,u){const ph=(o.cyc||0)*2,c=o.col||'#e8c23a';
 const wh=x=>`<g transform="translate(${x},-.42)"><circle r=".42" fill="#1a1a22" ${sw(3)}/><circle r=".2" fill="#9a9aa8"/><path d="M0,0 L${f(Math.cos(ph*6.28)*.2)},${f(Math.sin(ph*6.28)*.2)}" stroke="${OL}" stroke-width="2" vector-effect="non-scaling-stroke"/></g>`;
 let g=`<g transform="translate(0,${f(o.walking?Math.sin(t*14)*.015:0)})">`;
 g+=`<path d="M-2.1,-.55 L-2.1,-1.25 L-1.5,-1.3 L-1.2,-2.0 L.5,-2.0 L.7,-1.3 L2.1,-1.2 L2.2,-.55Z" fill="${c}" ${sw(3)}/>`;
 g+=`<path d="M-1.1,-1.95 L-1.35,-1.35 L.6,-1.35 L.4,-1.95Z" fill="#8ad8ff" ${sw(2.2)}/>`;
 g+=`<path d="M-2.05,-.8 L2.1,-.8" stroke="${sh(c,-.35)}" stroke-width="3" vector-effect="non-scaling-stroke"/><rect x="-2.2" y="-.75" width=".12" height=".2" fill="#e3232c"/><rect x="2" y="-.95" width=".18" height=".22" rx=".05" fill="#fff6c0" ${sw(1.5)}/>`;
 g+=`<path d="M-1,-2.0 L-1,-2.3 L.2,-2.3 L.2,-2.0" fill="none" ${sw(2.6)}/>`+wh(-1.3)+wh(1.3)+`</g>`;return g;}

// ---- HELICOPTER (side view facing +x) ----
function heli(t,o,u){const c=o.col||'#e8e8ec',a=t*70;
 let g=`<path d="M-2.4,-2.6 L-4.6,-3.0 L-4.7,-2.5 L-2.5,-2.0Z" fill="${sh(c,-.15)}" ${sw(3)}/>`;
 g+=`<path d="M-2.8,-1.2 C-3,-2.6 -1.6,-3.3 0,-3.3 C1.5,-3.3 2.8,-2.6 3,-1.8 C3.1,-1.2 2.2,-1 1.5,-1Z" fill="${c}" ${sw(3)}/>`;
 g+=`<path d="M.8,-3.1 C2,-3.1 2.8,-2.5 2.9,-2 L.8,-2Z" fill="#8ad8ff" ${sw(2.2)}/><path d="M-2.4,-1.6 L1.4,-1.6" stroke="#e3232c" stroke-width="5" vector-effect="non-scaling-stroke"/>`;
 g+=`<path d="M0,-3.3 L0,-3.7" ${sw(4)}/><ellipse cx="0" cy="-3.75" rx="${f(4+Math.abs(Math.cos(a))*.6)}" ry=".07" fill="#2a2a34" opacity=".75"/><ellipse cx="0" cy="-3.75" rx="${f(3.2*Math.abs(Math.sin(a)))}" ry=".1" fill="#2a2a34" ${sw(2)}/>`;
 g+=`<path d="M-1.5,-1 L-1.6,-.5 M1.2,-1 L1.3,-.5 M-2,-.5 L2,-.5" fill="none" ${sw(3.5)}/>`;return g;}

// ---- CUP of water with ripples (rings pulse at times in o.pulses) ----
function cup(t,o,u){let g=`<path d="M-.18,-.35 L.18,-.35 L.14,0 L-.14,0Z" fill="#f4efe6" ${sw(2.6)}/><path d="M-.15,-.3 L.15,-.3 L.13,-.22 L-.13,-.22Z" fill="#e3232c"/>`;
 g+=`<ellipse cx="0" cy="-.35" rx=".18" ry=".045" fill="#8ad8ff" ${sw(2)}/>`;
 for(const p of o.pulses||[]){const d=t-p;if(d<0||d>1.4)continue;for(let i=0;i<2;i++){const r=(d-i*.22);if(r<0)continue;g+=`<ellipse cx="0" cy="-.35" rx="${f(.05+r*.11)}" ry="${f((.05+r*.11)*.25)}" fill="none" stroke="#fff" stroke-width="2.4" opacity="${f(Math.max(0,1-r/1.1))}" vector-effect="non-scaling-stroke"/>`;}}
 const sk=o.shiver;if(sk)for(const p of sk){}
 return g;}

// ---- GATE: steel loading gate, width o.w (m), height o.h; drops between o.drop[0],o.drop[1] ----
function gate(t,o,u){const w=o.w||3,h=o.h||3,[a,b]=o.drop||[0,.3];const k=A.ease((t-a)/(b-a));const top=-h-.2+(h+.2)*k*1;
 let g=`<rect x="${-w/2-.2}" y="${-h-.3}" width=".2" height="${h+.3}" fill="#6a6a78" ${sw(2.6)}/><rect x="${w/2}" y="${-h-.3}" width=".2" height="${h+.3}" fill="#6a6a78" ${sw(2.6)}/><rect x="${-w/2-.2}" y="${-h-.35}" width="${w+.4}" height=".2" fill="#8a8a98" ${sw(2.6)}/>`;
 const y0=-h-.15,y1=y0+(h+.15)*k;if(k>0){g+=`<rect x="${-w/2}" y="${f(y0)}" width="${w}" height="${f(y1-y0)}" fill="#8e96a4" ${sw(3)}/>`;for(let i=1;i<6;i++)g+=`<path d="M${-w/2},${f(y0+(y1-y0)*i/6)} L${w/2},${f(y0+(y1-y0)*i/6)}" stroke="#5a6270" stroke-width="2" vector-effect="non-scaling-stroke"/>`;
  g+=`<path d="M${-w/2},${f(y1-.05)} L${w/2},${f(y1-.05)}" stroke="#ffd24a" stroke-width="7" stroke-dasharray="14 10" vector-effect="non-scaling-stroke"/>`;}
 const sh2=o.ring?.map(r=>{const d=t-r;return d>=0&&d<.9?`<rect x="${-w/2}" y="${-h}" width="${w}" height="${h}" fill="none" stroke="#fff" stroke-width="${f(8*(1-d/.9))}" opacity="${f(1-d/.9)}" transform="scale(${f(1+d*.08)}) translate(0,${f(d*.1)})" vector-effect="non-scaling-stroke"/>`:'';}).join('')||'';
 return g+sh2;}

// ---- FENCE: electric fence, o.w wide; on until o.offAt (then dark); o.fallAt (broken) ----
function fence(t,o,u){const w=o.w||10,h=o.h||4,on=o.offAt==null||t<o.offAt,fall=o.fallAt!=null&&t>=o.fallAt;let g='';const n=Math.round(w/1.5);
 const flick=on?1:(o.offAt!=null&&t-o.offAt<.5&&Math.sin(t*50)>0?1:0);
 for(let i=0;i<=n;i++){const x=-w/2+i*w/n;g+=`<rect x="${f(x-.07)}" y="${-h}" width=".14" height="${h}" fill="#5a5a68" ${sw(2.4)}/>`;g+=`<circle cx="${f(x)}" cy="${-h-.12}" r=".1" fill="${flick?'#ffd24a':'#3a3a44'}" ${sw(1.5)}/>`;}
 if(fall&&o.gapX!=null){const gx=o.gapX;g+=`<rect x="${f(gx-1.6)}" y="${-h-.2}" width="3.2" height="${h+.3}" fill="#2a3a22" opacity=".0"/>`;}
 for(let j=1;j<=5;j++){const y=-h*j/5.4;const cut=fall&&o.gapX!=null;if(!cut)g+=`<path d="M${-w/2},${f(y)} L${w/2},${f(y)}" stroke="${flick?'#ffe680':'#4a4a56'}" stroke-width="${flick?3:2}" vector-effect="non-scaling-stroke"/>`;else g+=`<path d="M${-w/2},${f(y)} L${f(o.gapX-1.4)},${f(y+Math.sin(t*6+j)*.1)} M${f(o.gapX+1.4)},${f(y+.3)} L${w/2},${f(y)}" stroke="#4a4a56" stroke-width="2" vector-effect="non-scaling-stroke"/>`;}
 return g;}

// ---- MONITORS: wall of screens (o.w m wide), on from o.onAt, off until then; flicker random ----
function monitors(t,o,u){const w=o.w||5,n=o.n||4,on=(o.onAt==null||t>=o.onAt)&&(o.offAt==null||t<o.offAt);let g=`<rect x="${-w/2-.2}" y="-2.1" width="${w+.4}" height="1.75" rx=".1" fill="#2a2a36" ${sw(3)}/>`;
 for(let i=0;i<n;i++){const x=-w/2+i*(w/n)+.05,ww=w/n-.12;const col=on?(o.cols?.[i%o.cols.length]||'#3aff8a'):'#14141c';const fl=on&&Math.sin(t*20+i*3)>.94?.5:1;
  g+=`<rect x="${f(x)}" y="-2.0" width="${f(ww)}" height="1.5" rx=".05" fill="${col}" opacity="${fl}" ${sw(2)}/>`;
  if(on){for(let r=0;r<4;r++)g+=`<path d="M${f(x+.08)},${f(-1.8+r*.3)} l${f((ww-.2)*(.4+.5*A.noise(t*3+i*9+r)))},0" stroke="#0d3a24" stroke-width="3" vector-effect="non-scaling-stroke"/>`;}}
 return g;}

// ---- CAN of Barbasol-style shaving cream (red can) ----
function can(t,o,u){return `<rect x="-.07" y="-.22" width=".14" height=".22" rx=".02" fill="#e3232c" ${sw(2.2)}/><rect x="-.07" y="-.15" width=".14" height=".06" fill="#fff"/><rect x="-.05" y="-.26" width=".1" height=".05" fill="#9aa0aa" ${sw(1.6)}/>`;}

// ---- TICKET (blank, floating) ----
function ticket(t,o,u){const y=-(o.y0??1.6)+(o.fall??0)*A.ease(t/(o.dur||3)),r=Math.sin(t*2.2)*14;return `<g transform="translate(0,${f(y)}) rotate(${f(r)})"><rect x="-.3" y="-.18" width=".6" height=".36" rx=".04" fill="#f6efd8" ${sw(2.6)}/><path d="M-.12,-.18 L-.12,.18" stroke="#c8b888" stroke-width="2" stroke-dasharray="5 4" vector-effect="non-scaling-stroke"/></g>`;}

// ---- Dinosaur footprint / shadow effect: ground shadow ellipse under big things handled by caller ----
const KINDS={trex,raptor,goat,jeep,heli,cup,gate,fence,monitors,can,ticket};
// size/height hints (m) for head targets (camera follow, fx)
const HEAD={trex:[3.5,-5.4],raptor:[1.5,-1.95],goat:[.8,-.9],jeep:[0,-1.6],heli:[0,-3],cup:[0,-.3],gate:[0,-2],fence:[0,-2],monitors:[0,-1.2],can:[0,-.1],ticket:[0,-1.6]};
function draw(C,k,X,Z,t,o){const fn=KINDS[k];if(!fn)throw new Error('unknown thing '+k);const [fx,fy]=C.P(X,o.Y??0,Z);const u=C.U*C.k(Z)*(o.scale??1);
 const fl=o.flip?-1:1;const shadow=o.noShadow?'':`<ellipse cx="0" cy="0" rx="${f(({trex:4,raptor:1.4,goat:.6,jeep:2.2,heli:2.6,gate:1.6,fence:0,monitors:0,cup:.2,can:.1,ticket:0}[k]??1)*u)}" ry="${f(({trex:.9,raptor:.3,goat:.15,jeep:.4,heli:.5,gate:.3}[k]??.1)*u)}" fill="#0d0b12" opacity=".28" transform="translate(${f((k==='trex'?1:0)*u*fl)},0)"/>`;
 const rot=o.rot?` rotate(${f(o.rot)})`:'';
 const body=fn(t,o,u);
 return `<g transform="translate(${f(fx)},${f(fy)})">${shadow}<g transform="scale(${f(u*fl)},${f(u)})${rot}">${body}</g></g>`;}
function headPt(C,k,X,Z,o){const [hx,hy]=o.head||HEAD[k]||[0,-1];const fl=o.flip?-1:1,s=o.scale??1;return C.P(X+hx*fl*s,(o.Y??0)-hy*s,Z);}
module.exports={draw,headPt,KINDS,HEAD};
