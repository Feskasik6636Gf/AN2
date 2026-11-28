// Custom sets: interpreter booth, UN-style hall, wall clock, planet of talking bubbles
const E='../../engine/';
const S=require(E+'stage.js');const Dt=require(E+'detail.js');const D2=require(E+'detail2.js');const D4=require(E+'detail4.js');
const {W,H,poly,glow,blurG,shade,f}=S;const cam=(PH=470,vx=960)=>S.Cam({PH,vx});
const R=Dt.R,rnd=Dt.rnd;const FONT='DejaVu Sans';
let gid=0;const G=p=>p+'_l'+(gid++);
const lin=(c0,c1)=>{const i=G('lg');return {defs:`<defs><linearGradient id="${i}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c0}"/><stop offset="1" stop-color="${c1}"/></linearGradient></defs>`,ref:`url(#${i})`};};
const rad=(c0,a0=1,a1=0)=>{const i=G('rg');return {defs:`<defs><radialGradient id="${i}"><stop offset="0" stop-color="${c0}" stop-opacity="${a0}"/><stop offset="1" stop-color="${c0}" stop-opacity="${a1}"/></radialGradient></defs>`,ref:`url(#${i})`};};
const bgRect=(c0,c1)=>{const g=lin(c0,c1);return g.defs+`<rect width="${W}" height="${H}" fill="${g.ref}"/>`;};
const grain=(a=.14)=>{const i=G('gn');return `<defs><filter id="${i}" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".035" numOctaves="4" seed="9"/><feColorMatrix values="0 0 0 0 .5  0 0 0 0 .5  0 0 0 0 .5  0 0 0 ${a*1.6} 0"/></filter></defs><rect width="${W}" height="${H}" filter="url(#${i})"/>`;};
const wrap=(fn,a)=>(o)=>{const r=fn(o);r.bg+=grain(a);return r;};
const ret=(C,bg,o={})=>({C,bg,fg:'',spots:[[-.6,4.4],[.7,4.6]],rim:'#ffd59a',cast:[1,.15],grade:['#fff0d8',.5],amb:'ambRoom',...o});

// ---------- big hall (seen from the floor / from the booth window) ----------
function hallBack(C,{dim=0}={}){let bg='';
 const wl=lin('#2a4a78','#16294a');bg+=wl.defs+`<rect y="0" width="${W}" height="620" fill="${wl.ref}"/>`;
 for(let i=0;i<14;i++)bg+=`<rect x="${i*140+10}" y="40" width="100" height="440" fill="#1e3a66" stroke="#0e1a30" stroke-width="3" opacity=".6"/>`;
 // gold dais wall with emblem
 bg+=`<rect x="560" y="120" width="800" height="360" fill="#c8a84a" stroke="#5a4418" stroke-width="5"/><rect x="590" y="150" width="740" height="300" fill="#e4c86a" stroke="#8a6a22" stroke-width="3"/>`;
 bg+=`<circle cx="960" cy="300" r="110" fill="#3a78c8" stroke="#1a3a6a" stroke-width="6"/>`+[0,1,2,3].map(i=>`<ellipse cx="960" cy="300" rx="${110-i*26}" ry="110" fill="none" stroke="#bfe0ff" stroke-width="3"/>`).join('')+`<path d="M850,300 H1070 M960,190 V410" stroke="#bfe0ff" stroke-width="3"/>`;
 // flags
 const fl=['#c8402a','#2a8a4a','#e8c82a','#3a58c8','#f4f4f4','#8a2a8a','#2a8aa8','#e88a2a'];
 for(let i=0;i<8;i++){const x=120+i*230;bg+=`<path d="M${x},480 V250" stroke="#8a8a92" stroke-width="6"/><path d="M${x},250 h90 v60 h-90Z" fill="${fl[i]}" stroke="#2a2a34" stroke-width="3"/>`;}
 bg+=`<rect y="620" width="${W}" height="${H-620}" fill="#6a5a4a"/>`;
 for(let r=0;r<5;r++){const y=640+r*60,n=9+r;for(let i=0;i<n;i++){const x=120+i*(W-240)/(n-1);bg+=`<rect x="${f(x-38)}" y="${y}" width="76" height="44" rx="8" fill="#2a3a6a" stroke="#0e1a30" stroke-width="3"/><rect x="${f(x-30)}" y="${y+8}" width="60" height="10" fill="#4a68a8"/>`;}}
 if(dim)bg+=`<rect width="${W}" height="${H}" fill="#0a1428" opacity="${dim}"/>`;
 return bg;}
function unHall(){const C=cam(470);Dt.srand(121);let bg=hallBack(C);
 // long table in the middle
 bg+=S.table(C,-3.4,3.4,3.6,5.2,.76,'#8a5a3a','#5a3a22');
 for(const x of [-2.6,-1.2,.2,1.6,2.8])bg+=`<rect x="${f(960+x*268*0.95-30)}" y="${f(640)}" width="60" height="70" rx="6" fill="#1a1a22" opacity=".0"/>`;
 return ret(C,bg,{amb:'ambCrowd',grade:['#e8f0ff',.5,'#0a1a3a',.1]});}

// ---------- interpreter booth: foam walls, desk, mic, window onto the hall ----------
function booth(){const C=cam(470);Dt.srand(131);let bg='';
 const wl=lin('#3a3a44','#26262e');bg+=wl.defs+`<rect width="${W}" height="${H}" fill="${wl.ref}"/>`;
 // foam panels
 for(let i=0;i<12;i++)for(let j=0;j<4;j++){bg+=`<rect x="${i*170-10}" y="${j*140}" width="160" height="130" rx="10" fill="#34343e" stroke="#1a1a22" stroke-width="3"/><path d="M${i*170+20},${j*140+30} l30,20 l30,-20 l30,20 l30,-20" stroke="#4a4a56" stroke-width="3" fill="none"/>`;}
 // window onto the hall (glass)
 bg+=`<rect x="300" y="110" width="1320" height="520" fill="#14223e" stroke="#9aa4b8" stroke-width="14"/>`;
 bg+=`<g clip-path="inset(0)">`+blurG(4,`<g transform="translate(300,110) scale(.69,.8)">${hallBack(C)}</g>`)+`</g>`;
 const gl=lin('#ffffff','#9ac0ff');bg+=gl.defs+`<path d="M300,110 H760 L420,630 H300Z" fill="${gl.ref}" opacity=".12"/><path d="M1000,110 H1120 L780,630 H660Z" fill="${gl.ref}" opacity=".08"/>`;
 // desk + console
 const dk=lin('#6a4a32','#3a2418');bg+=dk.defs+`<rect y="760" width="${W}" height="${H-760}" fill="${dk.ref}"/><rect y="760" width="${W}" height="14" fill="#8a6a4a"/>`;
 for(let i=0;i<30;i++)bg+=`<path d="M${f(R(0,W))},${f(R(780,H))} h${f(R(80,260))}" stroke="#2a1a10" stroke-width="2" opacity=".4"/>`;
 bg+=`<rect x="1180" y="690" width="520" height="90" rx="12" fill="#2a2a34" stroke="#0e0e14" stroke-width="4"/>`;
 for(let i=0;i<14;i++)bg+=`<rect x="${1200+i*35}" y="${705+(i%3)*10}" width="22" height="${32-(i%3)*6}" rx="4" fill="${['#2fd07a','#ffd24a','#ff5a5a','#4ab0ff'][i%4]}" opacity=".9"/>`;
 // mic
 bg+=`<rect x="1000" y="700" width="14" height="80" fill="#7a7a86" stroke="#14141a" stroke-width="3"/><path d="M1007,700 q-40,-10 -60,-60" stroke="#7a7a86" stroke-width="10" fill="none" stroke-linecap="round"/><ellipse cx="940" cy="632" rx="22" ry="30" fill="#2a2a34" stroke="#0e0e14" stroke-width="4"/>`;
 // ON AIR sign
 bg+=`<rect x="160" y="150" width="120" height="50" rx="8" fill="#c82a2a" stroke="#4a0a0a" stroke-width="4"/><text x="220" y="185" text-anchor="middle" font-family="${FONT}" font-weight="bold" font-size="28" fill="#fff">ON AIR</text>`;
 const glow2=rad('#ff5a5a',.35,0);bg+=glow2.defs+`<circle cx="220" cy="175" r="120" fill="${glow2.ref}"/>`;
 return ret(C,bg,{spots:[[0,4.4]],grade:['#d8e0ff',.55,'#0a0a1a',.1]});}

// ---------- wall clock macro ----------
function clock({h=8,m=59,s=30,digital=true}={}){const C=cam(470);Dt.srand(141);let bg=bgRect('#d8d0c0','#a8a090');
 for(let i=0;i<20;i++)bg+=`<path d="M0,${i*60+20} H${W}" stroke="#b8b0a0" stroke-width="2" opacity=".5"/>`;
 const cx=960,cy=520,r=380;
 bg+=`<circle cx="${cx}" cy="${cy}" r="${r+34}" fill="#1a1a22" stroke="#0a0a10" stroke-width="6"/><circle cx="${cx}" cy="${cy}" r="${r}" fill="#f6f2e8" stroke="#2a2a30" stroke-width="5"/>`;
 for(let i=0;i<60;i++){const a=i/60*Math.PI*2,l=i%5?14:36;bg+=`<path d="M${f(cx+Math.sin(a)*(r-14))},${f(cy-Math.cos(a)*(r-14))} L${f(cx+Math.sin(a)*(r-14-l))},${f(cy-Math.cos(a)*(r-14-l))}" stroke="#1a1a22" stroke-width="${i%5?3:8}"/>`;}
 for(let i=1;i<=12;i++){const a=i/12*Math.PI*2;bg+=`<text x="${f(cx+Math.sin(a)*(r-86))}" y="${f(cy-Math.cos(a)*(r-86)+20)}" text-anchor="middle" font-family="${FONT}" font-weight="bold" font-size="56" fill="#1a1a22">${i}</text>`;}
 const ha=((h%12)+m/60)/12*Math.PI*2,ma=(m+s/60)/60*Math.PI*2,sa=s/60*Math.PI*2;
 bg+=`<path d="M${cx},${cy} L${f(cx+Math.sin(ha)*r*.5)},${f(cy-Math.cos(ha)*r*.5)}" stroke="#1a1a22" stroke-width="22" stroke-linecap="round"/><path d="M${cx},${cy} L${f(cx+Math.sin(ma)*r*.78)},${f(cy-Math.cos(ma)*r*.78)}" stroke="#1a1a22" stroke-width="14" stroke-linecap="round"/><path d="M${cx},${cy} L${f(cx+Math.sin(sa)*r*.85)},${f(cy-Math.cos(sa)*r*.85)}" stroke="#d8302c" stroke-width="5" stroke-linecap="round"/><circle cx="${cx}" cy="${cy}" r="18" fill="#d8302c"/>`;
 if(digital)bg+=`<rect x="760" y="930" width="400" height="110" rx="14" fill="#0a0a10" stroke="#3a3a44" stroke-width="5"/><text x="960" y="1010" text-anchor="middle" font-family="${FONT}" font-weight="bold" font-size="84" fill="#ff5a3a">${h}:${String(m).padStart(2,'0')}</text>`;
 const g2=rad('#ffffff',.25,0);bg+=g2.defs+`<ellipse cx="${cx-100}" cy="${cy-160}" rx="240" ry="140" fill="${g2.ref}"/>`;
 return ret(C,bg,{grade:['#fff0d8',.5]});}

// ---------- the planet of talking bubbles ----------
function earth({mode='many'}={}){const C=cam(470);Dt.srand(151);let bg=bgRect('#04040e','#0a0a22');
 for(let i=0;i<260;i++)bg+=`<circle cx="${f(R(0,W))}" cy="${f(R(0,H))}" r="${f(R(.5,1.8))}" fill="#fff" opacity="${f(R(.25,1))}"/>`;
 const cx=960,cy=560,r=360;
 const gl=rad('#6ab8ff',.5,0);bg+=gl.defs+`<circle cx="${cx}" cy="${cy}" r="${r*1.5}" fill="${gl.ref}"/>`;
 const sp=lin('#4a98e8','#1a4a98');bg+=sp.defs+`<circle cx="${cx}" cy="${cy}" r="${r}" fill="${sp.ref}" stroke="#0a2a5a" stroke-width="5"/>`;
 // continents
 const land=[[-130,-170,150,90],[60,-130,120,80],[-170,20,110,120],[40,60,190,130],[130,-20,90,70],[-60,200,120,60],[200,150,80,60]];
 for(const [x,y,w,h] of land)bg+=`<ellipse cx="${cx+x}" cy="${cy+y}" rx="${w}" ry="${h}" fill="#5ab05a" stroke="#2a6a2a" stroke-width="3" opacity=".95"/>`;
 for(let i=0;i<10;i++){const a=R(0,6.28),d=R(40,300);bg+=`<ellipse cx="${f(cx+Math.cos(a)*d)}" cy="${f(cy+Math.sin(a)*d*.9)}" rx="${f(R(40,110))}" ry="${f(R(10,24))}" fill="#fff" opacity="${f(R(.35,.7))}"/>`;}
 const sh=rad('#000000',0,.6);bg+=sh.defs+`<circle cx="${cx+70}" cy="${cy+40}" r="${r}" fill="${sh.ref}"/>`;
 // bubbles around
 const words={many:['Hola','Hello','Bonjour','Ciao','Privet','Danke','Salam','Merci','Ola','Hej','Salut','Namaste'],one:Array(12).fill('Hello'),none:Array(12).fill('...')};
 const cols=['#ffd24a','#6ad0ff','#ff7a9a','#a0e070','#ffb060','#c0a0ff'];
 const ws=words[mode]||words.many;
 for(let i=0;i<ws.length;i++){const a=i/ws.length*Math.PI*2+.2,rr=r+R(110,200);const x=cx+Math.cos(a)*rr*1.25,y=cy+Math.sin(a)*rr*.8;const w=Math.max(100,ws[i].length*28+40);
  bg+=`<g transform="translate(${f(x)},${f(y)}) rotate(${f(R(-8,8))})"><rect x="${-w/2}" y="-34" width="${w}" height="64" rx="26" fill="${mode==='one'?'#6ad0ff':mode==='none'?'#3a3a44':cols[i%6]}" stroke="#0e0e14" stroke-width="4"/><path d="M-10,28 l-14,22 l34,-20Z" fill="${mode==='one'?'#6ad0ff':mode==='none'?'#3a3a44':cols[i%6]}" stroke="#0e0e14" stroke-width="4"/><text x="0" y="12" text-anchor="middle" font-family="${FONT}" font-weight="bold" font-size="34" fill="${mode==='none'?'#8a8a96':'#14141a'}">${ws[i]}</text></g>`;}
 return ret(C,bg,{amb:'ambNight',grade:['#8ab0ff',.5,'#050522',.1]});}

module.exports={unHall:wrap(unHall,.2),booth:wrap(booth,.2),clock:wrap(clock,.3),earth:wrap(earth,.22)};
