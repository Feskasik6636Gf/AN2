// Custom sets: cryo room, tank nine macro, florist truck road, nitrogen plant
const E='../../engine/';
const S=require(E+'stage.js');const Dt=require(E+'detail.js');const D2=require(E+'detail2.js');const D4=require(E+'detail4.js');
const {LOC}=require(E+'director.js');
const {W,H,poly,glow,blurG,shade,f}=S;const cam=(PH=470,vx=960)=>S.Cam({PH,vx});
const R=Dt.R,rnd=Dt.rnd;const FONT='DejaVu Sans';
let gid=0;const G=p=>p+'_w'+(gid++);
const lin=(c0,c1)=>{const i=G('lg');return {defs:`<defs><linearGradient id="${i}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c0}"/><stop offset="1" stop-color="${c1}"/></linearGradient></defs>`,ref:`url(#${i})`};};
const rad=(c0,a0=1,a1=0)=>{const i=G('rg');return {defs:`<defs><radialGradient id="${i}"><stop offset="0" stop-color="${c0}" stop-opacity="${a0}"/><stop offset="1" stop-color="${c0}" stop-opacity="${a1}"/></radialGradient></defs>`,ref:`url(#${i})`};};
const bgRect=(c0,c1)=>{const g=lin(c0,c1);return g.defs+`<rect width="${W}" height="${H}" fill="${g.ref}"/>`;};
const grain=(a=.14)=>{const i=G('gn');return `<defs><filter id="${i}" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".035" numOctaves="4" seed="9"/><feColorMatrix values="0 0 0 0 .5  0 0 0 0 .5  0 0 0 0 .5  0 0 0 ${a*1.6} 0"/></filter></defs><rect width="${W}" height="${H}" filter="url(#${i})"/>`;};
const wrap=(fn,a)=>(o)=>{const r=fn(o);r.bg+=grain(a);return r;};
const ret=(C,bg,o={})=>({C,bg,fg:'',spots:[[-.6,4.4],[.7,4.6]],rim:'#bfe0ff',cast:[1,.15],grade:['#e0f0ff',.5],amb:'ambRoom',...o});

// ---------- the cold room full of silver tanks ----------
function cryo({alarm=false}={}){const C=cam(470);Dt.srand(201);let bg=bgRect('#dfe9f0','#b8c8d4');
 for(let i=0;i<14;i++)for(let j=0;j<5;j++)bg+=`<rect x="${i*140-10}" y="${j*110}" width="136" height="104" fill="#e8f0f6" stroke="#9ab0c0" stroke-width="3"/>`;
 // ceiling lights
 for(let i=0;i<4;i++){const g=rad('#ffffff',.9,0);bg+=g.defs+`<rect x="${200+i*440}" y="30" width="260" height="26" rx="8" fill="#fff" stroke="#9ab0c0" stroke-width="3"/><ellipse cx="${330+i*440}" cy="80" rx="300" ry="120" fill="${g.ref}" opacity=".5"/>`;}
 // floor
 const fl=lin('#9aa8b4','#6a7884');bg+=fl.defs+`<rect y="640" width="${W}" height="${H-640}" fill="${fl.ref}"/>`;
 for(let i=0;i<20;i++)bg+=`<path d="M${i*110-40},640 L${i*220-960},${H}" stroke="#7a8894" stroke-width="2" opacity=".6"/>`;
 for(let j=0;j<6;j++)bg+=`<path d="M0,${690+j*70} H${W}" stroke="#7a8894" stroke-width="2" opacity=".6"/>`;
 // silver tanks in rows
 const tank=(x,y,s)=>{const w=120*s,h=200*s;const g=lin('#f4f8fc','#7a8a98');return `<ellipse cx="${x}" cy="${y}" rx="${w*.6}" ry="${w*.12}" fill="#000" opacity=".3"/>`+g.defs+`<path d="M${x-w/2},${y} V${y-h} A${w/2},${w*.18} 0 0 1 ${x+w/2},${y-h} V${y} A${w/2},${w*.18} 0 0 1 ${x-w/2},${y}Z" fill="${g.ref}" stroke="#2a3a48" stroke-width="3"/><ellipse cx="${x}" cy="${y-h}" rx="${w/2}" ry="${w*.18}" fill="#dfe8f0" stroke="#2a3a48" stroke-width="3"/><ellipse cx="${x}" cy="${y-h}" rx="${w*.3}" ry="${w*.1}" fill="#8a9aa8" stroke="#2a3a48" stroke-width="2"/><rect x="${x-w*.28}" y="${y-h*.6}" width="${w*.56}" height="${h*.16}" fill="#fffbe8" stroke="#2a3a48" stroke-width="2"/><circle cx="${x+w*.28}" cy="${y-h*.88}" r="${w*.08}" fill="#2fd07a" stroke="#14281c" stroke-width="2"/><path d="M${x-w/2},${y-h*.35} h${w}" stroke="#bfe0ff" stroke-width="${w*.08}" opacity=".6"/>`;};
 const rows=[[690,.7,7],[790,1,6],[920,1.4,5]];
 for(const [y,s,n] of rows)for(let i=0;i<n;i++){const x=120+i*(W-240)/(n-1);bg+=tank(x,y,s);}
 // cold fog
 for(let i=0;i<14;i++){const g=rad('#e8f4ff',.6,0);bg+=g.defs+`<ellipse cx="${f(R(0,W))}" cy="${f(R(640,H))}" rx="${f(R(160,380))}" ry="${f(R(40,90))}" fill="${g.ref}"/>`;}
 // warning sign + door
 bg+=`<rect x="1640" y="200" width="150" height="260" fill="#8aa0b4" stroke="#2a3a48" stroke-width="5"/><rect x="1660" y="220" width="110" height="140" fill="#bfe0ff" stroke="#2a3a48" stroke-width="3"/><rect x="60" y="240" width="170" height="90" rx="6" fill="#f6e03a" stroke="#14141a" stroke-width="4"/><text x="145" y="278" text-anchor="middle" font-family="${FONT}" font-weight="bold" font-size="26" fill="#14141a">-196°C</text><text x="145" y="312" text-anchor="middle" font-family="${FONT}" font-weight="bold" font-size="20" fill="#14141a">LIQUID N₂</text>`;
 if(alarm)bg+=`<rect width="${W}" height="${H}" fill="#ff2a2a" opacity=".12"/>`;
 return ret(C,bg,{spots:[[0,4.6]],grade:['#d8ecff',.55,'#0a2a4a',.1]});}

// ---------- tank nine: the oldest tank, open, with vials ----------
function tank9(){const C=cam(470);Dt.srand(211);let bg=bgRect('#2a3a4a','#101a26');
 const gl=rad('#9ad8ff',.55,0);bg+=gl.defs+`<ellipse cx="960" cy="560" rx="860" ry="520" fill="${gl.ref}"/>`;
 // tank body (front, big)
 const g=lin('#d8e0e8','#5a6a78');
 bg+=g.defs+`<path d="M360,1040 V300 Q360,230 960,230 Q1560,230 1560,300 V1040Z" fill="${g.ref}" stroke="#14202c" stroke-width="8"/>`;
 bg+=`<ellipse cx="960" cy="300" rx="600" ry="90" fill="#1a2a38" stroke="#14202c" stroke-width="6"/><ellipse cx="960" cy="290" rx="520" ry="62" fill="#0a141c"/>`;
 // vial rack sticking out
 for(let i=0;i<11;i++){const x=520+i*88;bg+=`<rect x="${x}" y="${230+(i%2)*10}" width="30" height="90" rx="10" fill="#e8f4ff" stroke="#14202c" stroke-width="3" opacity=".95"/><rect x="${x+4}" y="${250+(i%2)*10}" width="22" height="40" fill="${['#6ad0ff','#ffd24a','#ff7a9a','#a0e070'][i%4]}" opacity=".8"/>`;}
 // frost
 for(let i=0;i<40;i++)bg+=`<circle cx="${f(R(380,1540))}" cy="${f(R(260,1000))}" r="${f(R(2,9))}" fill="#fff" opacity="${f(R(.3,.8))}"/>`;
 for(let i=0;i<16;i++){const g2=rad('#e8f4ff',.6,0);bg+=g2.defs+`<ellipse cx="${f(R(400,1520))}" cy="${f(R(240,320))}" rx="${f(R(120,240))}" ry="${f(R(30,60))}" fill="${g2.ref}"/>`;}
 // label: cracked
 bg+=`<g transform="rotate(-2 960 700)"><rect x="700" y="560" width="520" height="300" rx="10" fill="#f4ecd0" stroke="#3a2a18" stroke-width="5"/><path d="M760,560 L800,640 L760,720 L830,860 M1100,560 L1060,660 L1140,760 L1090,860" stroke="#4a3a28" stroke-width="3" fill="none"/><text x="960" y="700" text-anchor="middle" font-family="${FONT}" font-weight="bold" font-size="150" fill="#2a2018">9</text><text x="960" y="790" text-anchor="middle" font-family="${FONT}" font-size="36" fill="#6a5a48">TANK · 1999</text></g>`;
 bg+=`<circle cx="1330" cy="520" r="54" fill="#e8402a" stroke="#14141a" stroke-width="5"/><text x="1330" y="536" text-anchor="middle" font-family="${FONT}" font-weight="bold" font-size="40" fill="#fff">!</text>`;
 return ret(C,bg,{spots:[[0,4.6]],grade:['#bfe8ff',.6,'#04101c',.12]});}

// ---------- florist delivery van on an empty highway ----------
function truck({dead=false}={}){const base=LOC.road();const C=base.C;let bg=base.bg;
 const body=S.box(C,{x0:-3.2,x1:.6,y0:.5,y1:2.8,z0:7,z1:9.6},{front:'#e8f0d8',top:'#f4f8e8',side:'#c8d0b8'});
 bg+=body+S.box(C,{x0:.6,x1:2,y0:.5,y1:1.9,z0:7,z1:9},{front:'#c8d8e8',top:'#dde8f2',side:'#a8b8c8'},{noAO:1});
 bg+=S.rectBack(C,6.99,.8,1.9,1,1.7,'#6a8aa8')+S.rectBack(C,6.98,-3,.4,1.2,2.4,'#7ac070');
 for(let i=0;i<6;i++){const [x,y]=C.P(-2.6+i*.55,1.8,6.97),k=C.k(7)*C.U;bg+=`<circle cx="${f(x)}" cy="${f(y)}" r="${f(.16*k)}" fill="${['#ff7a9a','#ffd24a','#fff','#c0a0ff','#ff9a4a','#6ad0e8'][i%6]}" stroke="#2a3a2a" stroke-width="2"/>`;}
 for(const x of [-2.4,-.3,1.2]){const [px,py]=C.P(x,0,7),k=C.k(7)*C.U;bg+=`<ellipse cx="${f(px)}" cy="${f(py-.3*k)}" rx="${f(.34*k)}" ry="${f(.34*k)}" fill="#1a1a1e" stroke="#000" stroke-width="3"/><ellipse cx="${f(px)}" cy="${f(py-.3*k)}" rx="${f(.14*k)}" ry="${f(.14*k)}" fill="#8a8a92"/>`;}
 if(dead){const [px,py]=C.P(1.2,2.1,7),k=C.k(7)*C.U;for(let i=0;i<6;i++)bg+=`<path d="M${f(px+R(-.3,.3)*k)},${f(py)} q${f(R(-20,20))},${f(-70)} ${f(R(-30,30))},${f(-160)}" stroke="#d8d8de" stroke-width="${f(R(8,18))}" fill="none" opacity=".5" stroke-linecap="round"/>`;}
 return {...base,bg};}

// ---------- liquid nitrogen plant ----------
function plant(){const C=cam(470);Dt.srand(221);let bg=bgRect('#6a98c8','#e8d8c0');
 bg+=blurG(8,`<rect x="0" y="380" width="${W}" height="200" fill="#a8a098"/>`);
 bg+=`<rect y="580" width="${W}" height="${H-580}" fill="#7a7a82"/>`;
 for(let i=0;i<24;i++)bg+=`<path d="M${f(R(0,W))},${f(R(600,H))} h${f(R(60,200))}" stroke="#5a5a62" stroke-width="2" opacity=".5"/>`;
 // big white tanks
 const bt=(x,y,w,h)=>{const g=lin('#ffffff','#a8b4c0');return g.defs+`<path d="M${x},${y} V${y-h} A${w/2},${w*.22} 0 0 1 ${x+w},${y-h} V${y} A${w/2},${w*.22} 0 0 1 ${x},${y}Z" fill="${g.ref}" stroke="#2a3a48" stroke-width="5"/><ellipse cx="${x+w/2}" cy="${y-h}" rx="${w/2}" ry="${w*.22}" fill="#e8f0f6" stroke="#2a3a48" stroke-width="4"/><text x="${x+w/2}" y="${y-h*.5}" text-anchor="middle" font-family="${FONT}" font-weight="bold" font-size="${w*.2}" fill="#2a5a9a">N₂</text><path d="M${x},${y-h*.2} h${w}" stroke="#2a5a9a" stroke-width="6" opacity=".6"/>`;};
 bg+=bt(120,620,300,420)+bt(480,640,260,360)+bt(1380,620,320,440);
 // pipes
 for(const [x0,y0,x1,y1] of [[420,420,480,520],[740,480,980,440],[980,440,1380,420]])bg+=`<path d="M${x0},${y0} L${x1},${y1}" stroke="#8a98a8" stroke-width="22" stroke-linecap="round"/><path d="M${x0},${y0-6} L${x1},${y1-6}" stroke="#d8e4f0" stroke-width="6" stroke-linecap="round"/>`;
 // loading dock
 bg+=`<rect x="780" y="640" width="460" height="260" fill="#9a9aa2" stroke="#2a2a32" stroke-width="5"/><rect x="800" y="660" width="420" height="40" fill="#f6e03a" stroke="#14141a" stroke-width="3"/>`;
 for(let i=0;i<9;i++)bg+=`<path d="M${800+i*48},660 l24,40" stroke="#14141a" stroke-width="10"/>`;
 // steam
 for(let i=0;i<12;i++){const g=rad('#ffffff',.6,0);bg+=g.defs+`<ellipse cx="${f(R(100,1800))}" cy="${f(R(300,640))}" rx="${f(R(80,200))}" ry="${f(R(40,100))}" fill="${g.ref}"/>`;}
 return ret(C,bg,{amb:'ambOffice',spots:[[0,4.6]],grade:['#fff0d8',.5,'#1a2a3a',.08]});}

module.exports={cryo:wrap(cryo,.18),tank9:wrap(tank9,.16),truck:wrap(truck,.06),plant:wrap(plant,.3)};
