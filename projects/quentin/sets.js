// Custom detailed sets for "Quentin forever": graveyard, cake (lit/out), watch macro, notebook macro, green planet, deep space, red giant.
const E='../../engine/';
const S=require(E+'stage.js');const Dt=require(E+'detail.js');const D2=require(E+'detail2.js');const D4=require(E+'detail4.js');
const {W,H,poly,glow,blurG,shade,f}=S;const cam=(PH=470,vx=960)=>S.Cam({vx,PH});
const R=Dt.R,rnd=Dt.rnd;
const FONT='DejaVu Sans';
let gid=0;const G=p=>p+'_q'+(gid++);
const lin=(c0,c1,y0=0,y1=1)=>{const i=G('lg');return {defs:`<defs><linearGradient id="${i}" x1="0" y1="${y0}" x2="0" y2="${y1}"><stop offset="0" stop-color="${c0}"/><stop offset="1" stop-color="${c1}"/></linearGradient></defs>`,ref:`url(#${i})`};};
const rad=(c0,c1,a0=1,a1=0)=>{const i=G('rg');return {defs:`<defs><radialGradient id="${i}"><stop offset="0" stop-color="${c0}" stop-opacity="${a0}"/><stop offset="1" stop-color="${c1}" stop-opacity="${a1}"/></radialGradient></defs>`,ref:`url(#${i})`};};
const bgRect=(c0,c1)=>{const g=lin(c0,c1);return g.defs+`<rect width="${W}" height="${H}" fill="${g.ref}"/>`;};

// ---------- gravestone / graveyard ----------
function stone(C,X,Z,{h=1,w=.6,col='#9a9aa4',kind='arch',moss=true,name=''}={}){const [x,y]=C.P(X,0,Z),k=C.k(Z)*C.U;const hw=w*k/2,hh=h*k;let s='';
 s+=`<ellipse cx="${f(x+.1*k)}" cy="${f(y)}" rx="${f(hw*1.4)}" ry="${f(.07*k)}" fill="#0d0b12" opacity=".3"/>`;
 if(kind==='cross'){const t=.12*k;s+=`<path d="M${f(x-t/2)},${f(y)} V${f(y-hh)} H${f(x-hw)} V${f(y-hh-t)} H${f(x-t/2)} V${f(y-hh-hw*1.6)} H${f(x+t/2)} V${f(y-hh-t)} H${f(x+hw)} V${f(y-hh)} H${f(x+t/2)} V${f(y)}Z" fill="${col}" stroke="#2a2430" stroke-width="2"/>`;}
 else if(kind==='angel'){s+=`<rect x="${f(x-hw*1.1)}" y="${f(y-.18*k)}" width="${f(hw*2.2)}" height="${f(.18*k)}" fill="${shade(col,-.1)}" stroke="#2a2430" stroke-width="2"/><rect x="${f(x-hw*.8)}" y="${f(y-hh*.7)}" width="${f(hw*1.6)}" height="${f(hh*.55)}" fill="${col}" stroke="#2a2430" stroke-width="2"/><ellipse cx="${f(x)}" cy="${f(y-hh*.9)}" rx="${f(hw*.45)}" ry="${f(hh*.2)}" fill="${shade(col,.15)}" stroke="#2a2430" stroke-width="2"/><path d="M${f(x-hw*1.6)},${f(y-hh*.7)} q${f(hw*.6)},${f(-hh*.5)} ${f(hw*1.1)},${f(-hh*.15)} M${f(x+hw*1.6)},${f(y-hh*.7)} q${f(-hw*.6)},${f(-hh*.5)} ${f(-hw*1.1)},${f(-hh*.15)}" stroke="${shade(col,.2)}" stroke-width="${f(.07*k)}" fill="none" stroke-linecap="round"/>`;}
 else s+=`<path d="M${f(x-hw)},${f(y)} V${f(y-hh+hw)} Q${f(x-hw)},${f(y-hh)} ${f(x)},${f(y-hh)} Q${f(x+hw)},${f(y-hh)} ${f(x+hw)},${f(y-hh+hw)} V${f(y)}Z" fill="${col}" stroke="#2a2430" stroke-width="2"/><path d="M${f(x+hw*.55)},${f(y)} V${f(y-hh+hw)} Q${f(x+hw*.55)},${f(y-hh*.96)} ${f(x)},${f(y-hh*.98)} Q${f(x+hw)},${f(y-hh)} ${f(x+hw)},${f(y-hh+hw)} V${f(y)}Z" fill="#000" opacity=".16"/>`;
 if(kind!=='cross'&&kind!=='angel'){s+=`<path d="M${f(x-hw*.45)},${f(y-hh*.62)} h${f(hw*.9)} M${f(x-hw*.45)},${f(y-hh*.5)} h${f(hw*.9)} M${f(x-hw*.3)},${f(y-hh*.38)} h${f(hw*.6)}" stroke="#2a2430" stroke-width="${f(Math.max(1.2,.025*k))}" opacity=".55"/>`;}
 if(moss)s+=`<path d="M${f(x-hw)},${f(y)} q${f(hw*.4)},${f(-hh*.25)} ${f(hw*.7)},${f(-.05*k)} t${f(hw*1.3)},${f(.05*k)}" fill="#5a7a48" opacity=".55"/>`;
 return s;}
function graveyard({tone='dusk',rain=false,rows=3,seed=5,fresh=false}={}){const C=cam(470);Dt.srand(seed);let bg='';
 const night=tone==='night';
 if(night)bg+=D2.nightSky(C,{moon:[1450,140]});
 else bg+=Dt.sky(C,tone==='dusk'?{top:'#5a4a7a',bottom:'#f0b890',sun:[1400,300],clouds:4}:tone==='gray'?{top:'#8a94a4',bottom:'#d4d8de',clouds:5,cloudCol:'#c8ced6'}:{top:'#7ab8e8',bottom:'#f4ecd8',sun:[420,150],clouds:4});
 bg+=Dt.hills(C,night?[['#2a3050',.06,50],['#222844',.1,34]]:tone==='gray'?[['#a0aab4',.06,50],['#8a9aa0',.1,34]]:[['#8a7aa0',.06,50],['#6a7a80',.1,34]]);
 bg+=Dt.grass(C,-60,60,1,90,night?{near:'#2a4430',far:'#3a4a48',tufts:300,flowers:0}:tone==='gray'?{near:'#5a7a58',far:'#8a9a88',tufts:260,flowers:0}:{near:'#5a7a48',far:'#9a9a78',tufts:300,flowers:6});
 bg+=Dt.dirt(C,-1.1,1.1,1,60,{col:night?'#4a4440':'#8a7a62'});
 for(const [x,z] of [[-9,30],[-5,38],[7,34],[12,28],[-13,26],[3,46]])bg+=D4.pine(C,x,z,{h:R(7,10),col:night?'#1e3a30':tone==='gray'?'#3a5a48':'#2a4a38'});
 bg+=Dt.fenceX(C,52,-30,30,{h:1.3,col:night?'#2a2a34':'#3a3a44'});
 const kinds=['arch','arch','cross','arch','angel','arch'];
 const list=[];for(let r=0;r<rows;r++){const z=7+r*5.5;for(let i=0;i<9;i++){const x=-15+i*3.7+R(-.5,.5);if(Math.abs(x)<1.5)continue;list.push([x,z+R(-.4,.4),kinds[Math.floor(rnd()*kinds.length)]]);}}
 list.sort((a,b)=>b[1]-a[1]);
 for(const [x,z,k] of list)bg+=stone(C,x,z,{h:R(.8,1.5),w:R(.55,.8),kind:k,col:night?'#6a6a7c':tone==='gray'?'#a0a4ac':'#a8a4ae'});
 if(fresh){const [x,y]=C.P(2.6,0,6),k=C.k(6)*C.U;bg+=`<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(.9*k)}" ry="${f(.22*k)}" fill="#4a3426"/><ellipse cx="${f(x)}" cy="${f(y-.04*k)}" rx="${f(.8*k)}" ry="${f(.16*k)}" fill="#5e442f"/>`+stone(C,2.6,6.3,{h:1.1,w:.7,kind:'arch',col:'#b0aab4',moss:false});for(let i=0;i<14;i++){const [fx,fy]=C.P(2.6+R(-.7,.7),0,5.9+R(-.1,.4));bg+=`<circle cx="${f(fx)}" cy="${f(fy-4)}" r="${f(.05*k)}" fill="${['#e8e0f0','#f0c0d0','#fff4a8'][i%3]}"/>`;}}
 for(const [x,z] of [[-3.4,6],[3.8,7.4]]){const [px,py]=C.P(x,0,z),k=C.k(z)*C.U;for(let i=0;i<5;i++)bg+=`<circle cx="${f(px+R(-.2,.2)*k)}" cy="${f(py-R(.03,.12)*k)}" r="${f(.05*k)}" fill="${['#e8e0f0','#f0c0d0','#fff4a8','#ff9ab0'][i%4]}" stroke="#2a2430" stroke-width="1"/>`;}
 if(night||tone==='dusk'){bg+=D2.nightSky?'':'';bg+=Dt.lamp(C,-6,12,{h:3.4,on:night});}
 if(tone==='dusk'){const g=rad('#ffb878','#ffb878',.35,0);bg+=g.defs+`<ellipse cx="1400" cy="${f(C.Hz)}" rx="700" ry="260" fill="${g.ref}"/>`;}
 if(rain)bg+=D4.rain?D4.rain(C):'';
 return {C,bg,fg:'',spots:[[-.6,5],[.7,5.2]],rim:night?'#8ab0ff':tone==='gray'?'#d8e0f0':'#ffc890',cast:[1,.2],grade:night?['#8ab0ff',.5,'#10183a']:tone==='gray'?['#d8e4f0',.5,'#2a3a4a',.12]:['#ffc890',.5,'#3a1a2a'],amb:rain?'ambRain':'ambNature'};}

// ---------- cake macro ----------
function cake({out=false,n=17}={}){const C=cam(470);Dt.srand(11);let bg=bgRect('#2a1a24','#4a2a30');
 // blurred party background: string lights, balloons, shelves
 let back='';for(let i=0;i<26;i++){const x=R(40,1880),y=R(60,520),r=R(14,34);back+=`<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="${['#ffd24a','#ff7a9a','#6ad0e8','#a0e070','#ffb060'][i%5]}" opacity="${f(R(.35,.75))}"/>`;}
 back+=`<path d="M0,120 Q480,260 960,120 T1920,120" stroke="#ffe8a0" stroke-width="4" fill="none" opacity=".6"/>`;
 bg+=blurG(14,back);
 // table
 bg+=`<rect x="0" y="720" width="${W}" height="${H-720}" fill="#6a3f2a"/><rect x="0" y="720" width="${W}" height="14" fill="#8a5a3a"/>`;
 for(let i=0;i<30;i++)bg+=`<path d="M${f(R(0,W))},${f(R(735,H))} h${f(R(80,300))}" stroke="#4a2a1c" stroke-width="2" opacity=".35"/>`;
 // tablecloth runner
 bg+=`<path d="M300,740 H1620 L1700,${H} H220Z" fill="#f0e6d8"/><path d="M300,740 H1620" stroke="#d8c8b4" stroke-width="3"/>`;
 // cake: plate, 3 layers
 bg+=`<ellipse cx="960" cy="905" rx="520" ry="70" fill="#0d0b12" opacity=".35"/><ellipse cx="960" cy="885" rx="480" ry="62" fill="#f4f0ea" stroke="#2a2430" stroke-width="3"/>`;
 const layer=(cx,y,w,h,c1,c2)=>{const g=lin(c1,c2);return g.defs+`<path d="M${cx-w},${y} V${y-h} A${w},${w*.2} 0 0 1 ${cx+w},${y-h} V${y} A${w},${w*.2} 0 0 1 ${cx-w},${y}Z" fill="${g.ref}" stroke="#2a2430" stroke-width="3"/><ellipse cx="${cx}" cy="${y-h}" rx="${w}" ry="${w*.2}" fill="${shade(c1,.2)}" stroke="#2a2430" stroke-width="3"/>`;};
 bg+=layer(960,880,420,150,'#f2a8c0','#e08aa8')+layer(960,730,330,130,'#f8d0dc','#eeb0c4')+layer(960,600,230,110,'#fff0f4','#f4d4de');
 // icing drips + sprinkles
 for(const [cx,y,w,h] of [[960,880,420,150],[960,730,330,130]]){const top=y-h;for(let i=0;i<14;i++){const x=cx-w+30+i*(2*w-60)/13,l=R(18,56);bg+=`<path d="M${f(x-14)},${f(top+w*.15)} q14,${f(l)} 28,0Z" fill="#fff6f8" stroke="#2a2430" stroke-width="2"/>`;}for(let i=0;i<40;i++)bg+=`<rect x="${f(cx+R(-w,w)*.9)}" y="${f(top+R(18,h-14))}" width="10" height="3.5" rx="1.5" fill="${['#ffd24a','#6ad0e8','#a0e070','#ff6a8a'][i%4]}" transform="rotate(${f(R(0,180))} ${f(cx)} ${f(top+30)})"/>`;}
 // writing
 bg+=`<text x="960" y="822" text-anchor="middle" font-family="${FONT}" font-weight="bold" font-size="46" fill="#c8486a" stroke="#fff6f8" stroke-width="1">HAPPY BIRTHDAY</text>`;
 // candles on top layer
 const top=600-110;const cs=['#6ad0e8','#ffd24a','#ff7a9a','#a0e070','#ffb060','#c0a0ff'];
 for(let i=0;i<n;i++){const t=i/(n-1);const x=960-190+t*380+ R(-5,5);const y=top+Math.sin(t*Math.PI)*18-10+ (i%2?10:0);const h=R(70,96);
  bg+=`<rect x="${f(x-6)}" y="${f(y-h)}" width="12" height="${f(h)}" fill="${cs[i%6]}" stroke="#2a2430" stroke-width="2"/><path d="M${f(x-6)},${f(y-h+16)} l12,-8 M${f(x-6)},${f(y-h+32)} l12,-8" stroke="#fff" stroke-width="2.5" opacity=".6"/><path d="M${f(x)},${f(y-h)} v-8" stroke="#2a2430" stroke-width="2"/>`;
  if(!out){const g=rad('#ffcf70','#ff9a30',.7,0);bg+=g.defs+`<circle cx="${f(x)}" cy="${f(y-h-24)}" r="38" fill="${g.ref}"/><path d="M${f(x)},${f(y-h-10)} q-12,-14 0,-34 q12,20 0,34Z" fill="#ffd54a" stroke="#d86a1a" stroke-width="2"/><path d="M${f(x)},${f(y-h-10)} q-5,-8 0,-18 q5,10 0,18Z" fill="#fff4c0"/>`;}
  else bg+=`<path d="M${f(x)},${f(y-h-10)} q${f(R(-18,-6))},-30 ${f(R(-8,8))},-60 q${f(R(10,24))},-24 ${f(R(-10,10))},-52" stroke="#d8d4d8" stroke-width="5" fill="none" opacity="${f(R(.35,.65))}" stroke-linecap="round"/><circle cx="${f(x)}" cy="${f(y-h-8)}" r="3.5" fill="#ff7a1a"/>`;}
 if(!out){const g=rad('#ffb050','#ffb050',.45,0);bg+=g.defs+`<ellipse cx="960" cy="360" rx="560" ry="380" fill="${g.ref}"/>`;}
 return {C,bg,fg:'',spots:[[0,5]],rim:'#ffd59a',cast:[1,.15],grade:out?['#c8a080',.62,'#1a0a10',.2]:['#ffcf90',.5,'#3a1a10'],amb:'ambRoom'};}

// ---------- silver watch macro ----------
function watch({stopped=false,hour=10.1,min=8.6,wound=false}={}){const C=cam(470);Dt.srand(23);let bg=bgRect('#1a1520','#2a2028');
 // wooden desk
 bg+=`<rect y="560" width="${W}" height="${H-560}" fill="#5a3826"/>`;for(let i=0;i<42;i++)bg+=`<path d="M${f(R(0,W))},${f(R(570,H))} h${f(R(120,420))}" stroke="#3a2418" stroke-width="2.4" opacity=".4"/>`;
 bg+=blurG(18,`<ellipse cx="960" cy="1010" rx="560" ry="46" fill="#000" opacity=".5"/>`);
 const cx=960,cy=530,r=330;
 // chain
 let ch='';for(let i=0;i<22;i++){const a=-Math.PI/2+(i-11)*.12;const x=cx+Math.cos(a)*(r+30)*1.02-(i-11)*10,y=cy-r-60-Math.abs(i-11)*-14-Math.sin(i/21*Math.PI)*60;ch+=`<ellipse cx="${f(x)}" cy="${f(y)}" rx="16" ry="9" fill="none" stroke="#b8bcc8" stroke-width="5" transform="rotate(${(i%2)*90} ${f(x)} ${f(y)})"/>`;}
 bg+=ch;
 // crown + ring
 bg+=`<rect x="${cx-34}" y="${cy-r-64}" width="68" height="64" rx="10" fill="#c8ccd6" stroke="#2a2430" stroke-width="4"/><circle cx="${cx}" cy="${cy-r-86}" r="40" fill="none" stroke="#b8bcc8" stroke-width="14"/><circle cx="${cx}" cy="${cy-r-86}" r="40" fill="none" stroke="#2a2430" stroke-width="2.5"/>`;
 // case
 const mg=lin('#f4f6fa','#8a90a0');bg+=mg.defs+`<circle cx="${cx}" cy="${cy}" r="${r+26}" fill="${mg.ref}" stroke="#2a2430" stroke-width="5"/><circle cx="${cx}" cy="${cy}" r="${r+8}" fill="#dfe3ec" stroke="#6a7080" stroke-width="3"/><circle cx="${cx}" cy="${cy}" r="${r}" fill="#fbf7ea" stroke="#2a2430" stroke-width="4"/>`;
 // engraving ring + minute ticks
 for(let i=0;i<60;i++){const a=i/60*Math.PI*2,l=i%5?12:28;bg+=`<path d="M${f(cx+Math.sin(a)*(r-10))},${f(cy-Math.cos(a)*(r-10))} L${f(cx+Math.sin(a)*(r-10-l))},${f(cy-Math.cos(a)*(r-10-l))}" stroke="#2a2430" stroke-width="${i%5?2:5}"/>`;}
 const rom=['XII','I','II','III','IIII','V','VI','VII','VIII','IX','X','XI'];
 for(let i=0;i<12;i++){const a=i/12*Math.PI*2;bg+=`<text x="${f(cx+Math.sin(a)*(r-70))}" y="${f(cy-Math.cos(a)*(r-70)+14)}" text-anchor="middle" font-family="serif" font-weight="bold" font-size="40" fill="#2a2430">${rom[i]}</text>`;}
 bg+=`<circle cx="${cx}" cy="${cy+110}" r="62" fill="#f1ecdc" stroke="#2a2430" stroke-width="3"/>`+[0,1,2,3,4,5,6,7].map(i=>`<path d="M${f(cx+Math.sin(i*.785)*50)},${f(cy+110-Math.cos(i*.785)*50)} L${f(cx+Math.sin(i*.785)*58)},${f(cy+110-Math.cos(i*.785)*58)}" stroke="#2a2430" stroke-width="2"/>`).join('')+`<path d="M${cx},${cy+110} L${cx+18},${cy+80}" stroke="#2a2430" stroke-width="3"/>`;
 bg+=`<text x="${cx}" y="${cy-110}" text-anchor="middle" font-family="serif" font-style="italic" font-size="30" fill="#6a5a48">for Quentin</text>`;
 // hands
 const ha=hour/12*Math.PI*2,ma=min/60*Math.PI*2;
 bg+=`<path d="M${cx},${cy} L${f(cx+Math.sin(ha)*r*.52)},${f(cy-Math.cos(ha)*r*.52)}" stroke="#2a2430" stroke-width="18" stroke-linecap="round"/><path d="M${cx},${cy} L${f(cx+Math.sin(ma)*r*.8)},${f(cy-Math.cos(ma)*r*.8)}" stroke="#2a2430" stroke-width="11" stroke-linecap="round"/><circle cx="${cx}" cy="${cy}" r="18" fill="#c8a040" stroke="#2a2430" stroke-width="3"/>`;
 if(!stopped)bg+=`<path d="M${cx},${cy} L${f(cx+Math.sin(2.2)*r*.86)},${f(cy-Math.cos(2.2)*r*.86)}" stroke="#d8302c" stroke-width="4" stroke-linecap="round"/>`;
 // glass glare
 const gg=rad('#ffffff','#ffffff',.38,0);bg+=gg.defs+`<ellipse cx="${cx-120}" cy="${cy-150}" rx="190" ry="110" fill="${gg.ref}" transform="rotate(-28 ${cx-120} ${cy-150})"/>`;
 if(wound){bg+=`<path d="M${cx+r+60},${cy-40} q60,-40 40,-110" stroke="#ffd24a" stroke-width="5" fill="none" stroke-dasharray="10 12"/>`;}
 const wg=rad('#ffcf70','#ffcf70',.22,0);bg+=wg.defs+`<ellipse cx="960" cy="520" rx="760" ry="520" fill="${wg.ref}"/>`;
 return {C,bg,fg:'',spots:[[0,5]],rim:'#ffd59a',cast:[1,.15],grade:['#ffcf90',.55,'#2a1a10',.12],amb:stopped?null:'ambRoom'};}

// ---------- notebook in a glass case (museum) ----------
function notebook({}={}){const C=cam(470);Dt.srand(31);let bg=bgRect('#0d0e18','#1a1a2a');
 bg+=blurG(10,[0,1,2,3,4].map(i=>`<rect x="${120+i*380}" y="80" width="260" height="440" fill="#26283c" opacity=".7"/>`).join(''));
 bg+=`<rect y="660" width="${W}" height="${H-660}" fill="#14131c"/><rect y="660" width="${W}" height="10" fill="#2a2838"/>`;
 // pedestal
 bg+=`<path d="M300,700 H1620 L1680,${H} H240Z" fill="#2a2a38" stroke="#0d0b12" stroke-width="4"/>`;
 // red velvet + notebook
 bg+=`<path d="M420,700 H1500 L1560,820 H360Z" fill="#6a1a2a" stroke="#2a0a14" stroke-width="3"/>`;
 const pg=lin('#f4ecd6','#d8c8a0');
 bg+=pg.defs+`<path d="M520,690 L950,650 L950,820 L480,850Z" fill="${pg.ref}" stroke="#4a3a28" stroke-width="3"/><path d="M970,650 L1400,690 L1440,850 L970,820Z" fill="${pg.ref}" stroke="#4a3a28" stroke-width="3"/><path d="M958,650 V822" stroke="#4a3a28" stroke-width="6"/>`;
 for(let i=0;i<9;i++){bg+=`<path d="M${f(1010+i*8)},${f(690+i*14)} q${f(R(30,60))},${f(-6)} ${f(R(120,300))},${f(R(-2,6))}" stroke="#3a3048" stroke-width="3" fill="none" stroke-linecap="round" opacity=".8"/>`;}
 for(let i=0;i<7;i++)bg+=`<path d="M${f(560+i*6)},${f(700+i*16)} q${f(R(30,60))},${f(-6)} ${f(R(110,250))},${f(R(-6,2))}" stroke="#6a5a78" stroke-width="2.5" fill="none" opacity=".5"/>`;
 bg+=`<path d="M1010,820 q60,-30 40,-60" stroke="#2a2048" stroke-width="4" fill="none"/>`;
 // glass case (translucent) with reflections
 bg+=`<path d="M360,820 L330,560 H1590 L1560,820Z" fill="#9ac8ff" opacity=".12" stroke="#c8e0ff" stroke-width="4"/><path d="M360,560 L560,430 H1360 L1560,560Z" fill="#9ac8ff" opacity=".1" stroke="#c8e0ff" stroke-width="3"/>`;
 for(const x of [520,780,1040]) bg+=`<path d="M${x},560 l60,260" stroke="#fff" stroke-width="10" opacity=".08"/>`;
 // spotlight
 const sp=rad('#fff4d0','#fff4d0',.5,0);bg+=sp.defs+`<ellipse cx="960" cy="720" rx="720" ry="300" fill="${sp.ref}"/><path d="M820,0 L1100,0 L1500,760 L420,760Z" fill="#fff4d0" opacity=".08"/>`;
 bg+=`<rect x="760" y="900" width="400" height="90" rx="8" fill="#b89a50" stroke="#2a2430" stroke-width="3"/><text x="960" y="950" text-anchor="middle" font-family="${FONT}" font-weight="bold" font-size="28" fill="#2a2430">DR. OKAFOR · FIELD NOTES</text><text x="960" y="980" text-anchor="middle" font-family="${FONT}" font-size="20" fill="#2a2430">Museum of Science</text>`;
 return {C,bg,fg:'',spots:[[0,5]],rim:'#ffe8c0',cast:[1,.15],grade:['#c8d0ff',.6,'#0a0a1a',.18],amb:'ambRoom'};}

// ---------- alien green planet with seed / sprout / tree ----------
function greenPlanet({stage=0}={}){const C=cam(470);Dt.srand(41);let bg='';
 const g=lin('#2a2a6a','#f0b8a0');bg+=g.defs+`<rect width="${W}" height="${H}" fill="${g.ref}"/>`;
 for(let i=0;i<170;i++)bg+=`<circle cx="${f(R(0,W))}" cy="${f(R(0,C.Hz*.8))}" r="${f(R(.6,2))}" fill="#fff" opacity="${f(R(.3,.9))}"/>`;
 const m1=rad('#fff4e0','#fff4e0',.35,0);bg+=m1.defs+`<circle cx="1480" cy="210" r="150" fill="${m1.ref}"/><circle cx="1480" cy="210" r="86" fill="#f8ead8" stroke="#8a7a8a" stroke-width="2"/><circle cx="1456" cy="190" r="16" fill="#d8c8c0"/><circle cx="1500" cy="236" r="10" fill="#d8c8c0"/><circle cx="420" cy="300" r="44" fill="#c8d8f0" stroke="#6a7a9a" stroke-width="2"/><path d="M380,300 q40,-20 80,0" stroke="#9ab0d8" stroke-width="6" fill="none"/>`;
 bg+=Dt.hills(C,[['#6a8a9a',.08,50],['#5a9a78',.12,34],['#4a9a5a',.16,24]],{trees:false});
 bg+=Dt.grass(C,-60,60,1,90,{near:'#4aa056',far:'#8ac080',tufts:520,flowers:90});
 // alien flora
 for(const [x,z] of [[-6,14],[7,18],[-9,22],[11,26],[-3,30],[4,36]]){const [px,py]=C.P(x,0,z),k=C.k(z)*C.U;bg+=`<path d="M${f(px)},${f(py)} q${f(-.2*k)},${f(-.9*k)} ${f(.1*k)},${f(-1.6*k)}" stroke="#2a8a7a" stroke-width="${f(.1*k)}" fill="none" stroke-linecap="round"/><circle cx="${f(px+.1*k)}" cy="${f(py-1.65*k)}" r="${f(.28*k)}" fill="#c070e0" stroke="#4a2a6a" stroke-width="2"/><circle cx="${f(px+.1*k)}" cy="${f(py-1.65*k)}" r="${f(.12*k)}" fill="#ffe8a0"/>`;}
 bg+=Dt.dirt(C,-.5,.5,3,5.6,{col:'#6a4a32'});
 const [sx,sy]=C.P(0,0,5.4),k=C.k(5.4)*C.U;
 bg+=`<ellipse cx="${f(sx)}" cy="${f(sy)}" rx="${f(.5*k)}" ry="${f(.1*k)}" fill="#5a3a26"/>`;
 if(stage===2)bg+=`<path d="M${f(sx)},${f(sy)} q${f(.02*k)},${f(-.2*k)} ${f(-.02*k)},${f(-.36*k)}" stroke="#58c04a" stroke-width="${f(.03*k)}" fill="none" stroke-linecap="round"/><path d="M${f(sx)},${f(sy-.3*k)} q${f(-.2*k)},${f(-.12*k)} ${f(-.22*k)},${f(.04*k)} q${f(.16*k)},${f(.04*k)} ${f(.22*k)},${f(-.04*k)}Z" fill="#78d85a" stroke="#2a5a2a" stroke-width="2"/><path d="M${f(sx)},${f(sy-.34*k)} q${f(.2*k)},${f(-.14*k)} ${f(.24*k)},${f(.02*k)} q${f(-.16*k)},${f(.06*k)} ${f(-.24*k)},${f(-.02*k)}Z" fill="#8ae86a" stroke="#2a5a2a" stroke-width="2"/>`;
 if(stage===3){bg+=Dt.tree(C,0,5.4,{h:2.6,crown:['#3f7a3a','#5aa048','#86c05c'],trunk:'#6a4a32'});}
 return {C,bg,fg:'',spots:[[-1.6,5.2],[1.4,5.4]],rim:'#ffd0b0',cast:[1,.2],grade:['#ffd0b0',.45,'#2a1a4a',.1],amb:'ambNature'};}

// ---------- deep space: Earth dot & ship ----------
function deepSpace({dot=1,ship=true,nebula='#5a3a9a'}={}){const C=cam(470);Dt.srand(51);let bg=bgRect('#04040e','#0a0a22');
 const nb=rad(nebula,nebula,.5,0);bg+=nb.defs+`<ellipse cx="1300" cy="360" rx="800" ry="360" fill="${nb.ref}" transform="rotate(-18 1300 360)"/><ellipse cx="420" cy="760" rx="520" ry="240" fill="${rad('#2a6a9a','#2a6a9a',.35,0).ref}"/>`;
 bg+=rad('#2a6a9a','#2a6a9a',.35,0).defs;
 for(let i=0;i<420;i++){const r=rnd()<.06?R(1.8,3):R(.5,1.5);bg+=`<circle cx="${f(R(0,W))}" cy="${f(R(0,H))}" r="${f(r)}" fill="${['#fff','#cfe0ff','#ffe8c0'][i%3]}" opacity="${f(R(.25,1))}"/>`;}
 const ex=520,ey=380,er=22*dot;const eg=rad('#8ac8ff','#8ac8ff',.55,0);
 bg+=eg.defs+`<circle cx="${ex}" cy="${ey}" r="${f(er*4)}" fill="${eg.ref}"/><circle cx="${ex}" cy="${ey}" r="${f(er)}" fill="#3a78d0"/><path d="M${f(ex-er*.8)},${f(ey-er*.3)} q${f(er*.5)},${f(-er*.6)} ${f(er*1.2)},${f(-er*.2)}" stroke="#f4faff" stroke-width="${f(er*.28)}" fill="none" stroke-linecap="round"/><path d="M${f(ex-er*.3)},${f(ey+er*.4)} q${f(er*.5)},${f(-er*.2)} ${f(er*.9)},${f(er*.1)}" stroke="#f4faff" stroke-width="${f(er*.22)}" fill="none" stroke-linecap="round"/>`;
 if(ship){// cockpit frame
  bg+=`<path d="M0,0 H${W} V${H} H0Z M180,150 Q960,60 1740,150 L1840,880 Q960,960 80,880Z" fill="#14161e" fill-rule="evenodd"/><path d="M180,150 Q960,60 1740,150 L1840,880 Q960,960 80,880Z" fill="none" stroke="#3a3e50" stroke-width="10"/><path d="M180,150 Q960,60 1740,150" stroke="#6a7090" stroke-width="3" fill="none"/>`;
  bg+=`<rect y="900" width="${W}" height="${H-900}" fill="#1c1e2a"/>`;for(let i=0;i<22;i++){bg+=`<rect x="${120+i*80}" y="930" width="46" height="28" rx="5" fill="${['#2fd07a','#ffd24a','#ff5a5a','#4ab0ff'][i%4]}" opacity=".85"/>`;}
  bg+=`<path d="M0,900 H${W}" stroke="#4a4e68" stroke-width="5"/>`;}
 return {C,bg,fg:'',spots:[[-.6,6],[.7,6.2]],rim:'#8ab0ff',cast:[1,.15],grade:['#8ab0ff',.55,'#050522',.12],amb:'ambNight'};}

// ---------- red giant: swollen sun over burned earth ----------
function redGiant({boil=false}={}){const C=cam(470);Dt.srand(61);const g=lin(boil?'#8a3a2a':'#5a1410','#ff9a40');let bg=g.defs+`<rect width="${W}" height="${H}" fill="${g.ref}"/>`;
 const sg=rad('#ffe0a0','#ff5a1a',1,0);bg+=sg.defs+`<circle cx="960" cy="${f(C.Hz)}" r="900" fill="${sg.ref}"/>`;
 const sun=lin('#fff0b0','#ff6a20');bg+=sun.defs+`<circle cx="960" cy="${f(C.Hz+80)}" r="560" fill="${sun.ref}" stroke="#a82a10" stroke-width="6"/>`;
 for(let i=0;i<26;i++){const a=R(0,Math.PI*2),rr=R(60,500);bg+=`<circle cx="${f(960+Math.cos(a)*rr)}" cy="${f(C.Hz+80+Math.sin(a)*rr*.8)}" r="${f(R(14,60))}" fill="#ffb040" opacity=".25"/>`;}
 // ground
 const gg=lin('#3a1a14','#1a0a08');bg+=gg.defs+`<rect y="${f(C.Hz)}" width="${W}" height="${H-C.Hz}" fill="${gg.ref}"/>`;
 for(let i=0;i<60;i++){const [x,y]=C.P(R(-20,20),0,R(2,40));bg+=`<path d="M${f(x)},${f(y)} l${f(R(-60,60))},${f(R(-6,18))}" stroke="#ff7a20" stroke-width="${f(R(1,3))}" opacity=".7"/>`;}
 if(boil){const [x0,y0]=C.P(-30,0,8),[x1,y1]=C.P(30,0,40);bg+=`<path d="M0,${f(C.Hz+4)} H${W} V${H} H0Z" fill="#3a7aa8" opacity=".5"/>`;for(let i=0;i<40;i++){const x=R(0,W),y=R(C.Hz,H);bg+=`<path d="M${f(x)},${f(y)} q${f(R(-30,30))},${f(-60)} ${f(R(-30,30))},${f(-130)}" stroke="#f4f4f4" stroke-width="${f(R(4,12))}" fill="none" opacity="${f(R(.15,.4))}" stroke-linecap="round"/>`;}}
 for(const [x,z] of [[-5,6],[5,8],[-9,12]]){const [px,py]=C.P(x,0,z),k=C.k(z)*C.U;bg+=`<path d="M${f(px)},${f(py)} v${f(-1.6*k)} m0,${f(.5*k)} l${f(-.5*k)},${f(-.4*k)} m${f(.5*k)},${f(.4*k)} l${f(.4*k)},${f(-.3*k)}" stroke="#1a0a08" stroke-width="${f(.09*k)}" fill="none" stroke-linecap="round"/>`;}
 return {C,bg,fg:'',spots:[[-.6,5],[.7,5.2]],rim:'#ff9a50',cast:[-1,.25],grade:['#ff9a50',.6,'#4a0a00',.16],amb:'ambNight'};}

const grain=(a=.3)=>{const i=G('gn');return `<defs><filter id="${i}" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".035" numOctaves="4" seed="9"/><feColorMatrix values="0 0 0 0 .5  0 0 0 0 .5  0 0 0 0 .5  0 0 0 ${a*1.6} 0"/></filter></defs><rect width="${W}" height="${H}" filter="url(#${i})"/>`;};
const wrap=(fn,a)=>(o)=>{const r=fn(o);r.bg+=grain(a);return r;};
module.exports={graveyard,cake:wrap(cake,.12),watch:wrap(watch,.13),notebook:wrap(notebook,.13),greenPlanet:wrap(greenPlanet,.15),deepSpace:wrap(deepSpace,.2),redGiant:wrap(redGiant,.14)};
