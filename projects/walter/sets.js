// Custom detailed sets for the Walter White story
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
const ret=(C,bg,o={})=>({C,bg,fg:'',spots:[[-.6,5],[.7,5.2]],rim:'#ffd59a',cast:[1,.15],grade:['#ffcf90',.5],amb:'ambRoom',...o});

// ---------- desert with the RV ----------
function rvDesert({night=false,barrels=false}={}){const base=LOC.desert();const C=base.C;let bg=base.bg;
 if(barrels){for(const [x,z] of [[-3.4,7],[-2.4,8.2],[2.6,7.4],[3.8,9],[-5,10],[5.4,11]]){const [px,py]=C.P(x,0,z),k=C.k(z)*C.U;bg+=`<ellipse cx="${f(px)}" cy="${f(py)}" rx="${f(.4*k)}" ry="${f(.08*k)}" fill="#000" opacity=".3"/><path d="M${f(px-.36*k)},${f(py)} V${f(py-.9*k)} Q${f(px)},${f(py-.98*k)} ${f(px+.36*k)},${f(py-.9*k)} V${f(py)}Z" fill="#3a6a9a" stroke="#1a2a3a" stroke-width="2.4"/><ellipse cx="${f(px)}" cy="${f(py-.9*k)}" rx="${f(.36*k)}" ry="${f(.07*k)}" fill="#5a8aba" stroke="#1a2a3a" stroke-width="2"/>`+[.25,.6].map(h=>`<path d="M${f(px-.36*k)},${f(py-h*k)} q${f(.36*k)},${f(.08*k)} ${f(.72*k)},0" stroke="#1a2a3a" stroke-width="2" fill="none"/>`).join('');}}
 else{const C2=C;const body=S.box(C2,{x0:-4.6,x1:-.4,y0:.5,y1:2.6,z0:9,z1:12},{front:'#e8e0cc',top:'#f4eedc',side:'#c8c0a8'});
  bg+=body+S.box(C2,{x0:-.4,x1:.9,y0:.5,y1:1.9,z0:9,z1:11},{front:'#d8d0bc',top:'#e8e0cc',side:'#b8b098'},{noAO:1});
  bg+=S.rectBack(C2,8.99,-4.2,-1.4,1.4,2.2,'#6a8aa8')+S.rectBack(C2,8.99,-.2,.7,1.1,1.8,'#6a8aa8')+S.rectBack(C2,8.98,-4.6,-.4,.9,1.15,'#c4452a')+S.rectBack(C2,8.98,-4.6,-.4,.7,.85,'#e8a02a');
  bg+=S.rectBack(C2,8.97,-1.3,-.6,.55,2,'#8a7a62')+S.rectBack(C2,8.96,-1.22,-.68,1.4,1.9,'#6a8aa8');
  for(const x of [-3.6,-1.6,.2]){const [px,py]=C.P(x,0,9),k=C.k(9)*C.U;bg+=`<ellipse cx="${f(px)}" cy="${f(py-.28*k)}" rx="${f(.32*k)}" ry="${f(.32*k)}" fill="#1a1a1e" stroke="#000" stroke-width="3"/><ellipse cx="${f(px)}" cy="${f(py-.28*k)}" rx="${f(.14*k)}" ry="${f(.14*k)}" fill="#8a8a92"/>`;}
  bg+=`<ellipse cx="${f(C.P(-2.4,0,9.4)[0])}" cy="${f(C.P(-2.4,0,9.4)[1])}" rx="${f(2.8*C.k(9.4)*C.U)}" ry="${f(.2*C.k(9.4)*C.U)}" fill="#000" opacity=".25"/>`;}
 if(night){bg+=`<rect width="${W}" height="${H}" fill="#0a1030" opacity=".55"/>`;}
 return {...base,bg};}

// ---------- blue crystal macro ----------
function crystal(){const C=cam(470);Dt.srand(71);let bg=bgRect('#14181c','#2a2e34');
 bg+=blurG(12,[0,1,2,3,4].map(i=>`<rect x="${60+i*380}" y="${60+i%2*60}" width="200" height="300" fill="#3a4a58" opacity=".5"/>`).join(''));
 bg+=`<rect y="720" width="${W}" height="${H-720}" fill="#9aa4ac"/><rect y="720" width="${W}" height="12" fill="#c8d0d6"/>`;for(let i=0;i<30;i++)bg+=`<path d="M${f(R(0,W))},${f(R(740,H))} h${f(R(60,200))}" stroke="#7a848c" stroke-width="2" opacity=".5"/>`;
 const gl=rad('#5ad0ff',.7,0);bg+=gl.defs+`<ellipse cx="960" cy="700" rx="820" ry="420" fill="${gl.ref}"/>`;
 const shard=(x,y,w,h,rot)=>{const g=lin('#bff0ff','#2a8ad8');return g.defs+`<g transform="rotate(${rot} ${x} ${y})"><path d="M${x},${y} L${x-w*.5},${y-h*.55} L${x-w*.15},${y-h} L${x+w*.35},${y-h*.8} L${x+w*.5},${y-h*.3}Z" fill="${g.ref}" stroke="#0a3a6a" stroke-width="3"/><path d="M${x-w*.15},${y-h} L${x+w*.05},${y-h*.4} L${x},${y}M${x+w*.35},${y-h*.8} L${x+w*.05},${y-h*.4}" stroke="#e8faff" stroke-width="3" fill="none" opacity=".8"/></g>`;};
 for(let i=0;i<22;i++)bg+=shard(R(560,1360),R(780,900),R(70,160),R(120,300),R(-40,40));
 bg+=`<path d="M560,740 H1360 L1420,900 H500Z" fill="#c0c8d0" opacity=".25"/>`;
 for(let i=0;i<40;i++)bg+=`<path d="M${f(R(560,1360))},${f(R(520,880))} l6,-12 l6,12 l-6,12Z" fill="#fff" opacity="${f(R(.3,.9))}"/>`;
 return ret(C,bg,{grade:['#9ad8ff',.55,'#0a1a2a',.1]});}

// ---------- pool with burned pink teddy bear ----------
function pool(){const C=cam(470);Dt.srand(81);let bg=bgRect('#6ab0e0','#bfe0f0');
 bg+=blurG(10,`<rect x="0" y="260" width="${W}" height="220" fill="#d8c8a8"/><rect x="300" y="160" width="500" height="320" fill="#c8a888"/><rect x="1100" y="200" width="420" height="280" fill="#b89878"/>`);
 const w=lin('#3ab0d8','#0a6a9a');bg+=w.defs+`<rect y="480" width="${W}" height="${H-480}" fill="${w.ref}"/>`;
 for(let i=0;i<40;i++){const y=R(500,H);bg+=`<path d="M${f(R(-100,W))},${f(y)} q40,-14 80,0 t80,0 t80,0" stroke="#e8faff" stroke-width="${f(R(2,5))}" fill="none" opacity="${f(R(.25,.6))}"/>`;}
 bg+=`<rect y="470" width="${W}" height="24" fill="#e8e0d0"/><path d="M0,494 H${W}" stroke="#a8a090" stroke-width="3"/>`;
 // debris floating
 for(const [x,y,r,c] of [[420,720,40,'#e8e8e8'],[1500,640,30,'#3a3a3a'],[1380,860,36,'#d8d8d8'],[540,900,28,'#2a2a2a']])bg+=`<path d="M${x-r},${y} l${r*.8},${-r*.5} l${r*1.2},${r*.2} l${-r*.5},${r*.7}Z" fill="${c}" stroke="#1a1a1e" stroke-width="3" transform="rotate(${f(R(-30,30))} ${x} ${y})"/>`;
 // teddy bear
 const bx=960,by=760;
 bg+=`<ellipse cx="${bx}" cy="${by+170}" rx="300" ry="40" fill="#0a4a6a" opacity=".5"/>`;
 bg+=`<ellipse cx="${bx-170}" cy="${by-40}" rx="58" ry="80" fill="#e8a0bc" stroke="#3a1a24" stroke-width="5" transform="rotate(-40 ${bx-170} ${by-40})"/><ellipse cx="${bx+170}" cy="${by+20}" rx="58" ry="80" fill="#e8a0bc" stroke="#3a1a24" stroke-width="5" transform="rotate(50 ${bx+170} ${by+20})"/>`;
 bg+=`<ellipse cx="${bx}" cy="${by+40}" rx="190" ry="150" fill="#f0a8c4" stroke="#3a1a24" stroke-width="6"/><ellipse cx="${bx}" cy="${by+70}" rx="110" ry="90" fill="#f8c8d8" stroke="#3a1a24" stroke-width="4"/>`;
 bg+=`<circle cx="${bx}" cy="${by-150}" r="130" fill="#f0a8c4" stroke="#3a1a24" stroke-width="6"/><circle cx="${bx-100}" cy="${by-250}" r="50" fill="#f0a8c4" stroke="#3a1a24" stroke-width="6"/><circle cx="${bx+100}" cy="${by-250}" r="50" fill="#e08aa8" stroke="#3a1a24" stroke-width="6"/><circle cx="${bx-100}" cy="${by-250}" r="26" fill="#f8c8d8"/>`;
 bg+=`<ellipse cx="${bx}" cy="${by-120}" rx="62" ry="48" fill="#f8c8d8" stroke="#3a1a24" stroke-width="4"/><ellipse cx="${bx}" cy="${by-132}" rx="20" ry="14" fill="#2a1a20"/>`;
 bg+=`<circle cx="${bx-48}" cy="${by-180}" r="16" fill="#1a1a1e"/><circle cx="${bx+50}" cy="${by-182}" r="16" fill="#1a1a1e"/><path d="M${bx+30},${by-196} l40,32 M${bx+70},${by-196} l-40,32" stroke="#e8e0e8" stroke-width="6"/>`;
 // burn marks
 for(const [x,y,rx,ry] of [[bx-120,by-210,70,50],[bx+90,by+30,80,60],[bx-60,by+110,60,36],[bx+150,by-60,50,40]])bg+=`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#1a1412" opacity=".8"/><ellipse cx="${x}" cy="${y}" rx="${rx*.6}" ry="${ry*.6}" fill="#000" opacity=".7"/>`;
 for(let i=0;i<14;i++)bg+=`<path d="M${f(bx+R(-180,180))},${f(by+R(-260,100))} q${f(R(-10,10))},${f(-50)} ${f(R(-18,18))},${f(-110)}" stroke="#7a7a82" stroke-width="${f(R(4,10))}" fill="none" opacity=".35" stroke-linecap="round"/>`;
 return ret(C,bg,{grade:['#d8e8f0',.5,'#2a2030',.1]});}

// ---------- two planes colliding ----------
function planes({after=false}={}){const C=cam(470);Dt.srand(91);let bg=bgRect('#3a7ac8','#d8e8f4');
 for(let i=0;i<9;i++){const x=R(0,W),y=R(80,520),r=R(80,200);bg+=`<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(r)}" ry="${f(r*.4)}" fill="#fff" opacity="${f(R(.5,.9))}"/>`;}
 const plane=(x,y,s,rot,col)=>`<g transform="translate(${x},${y}) rotate(${rot}) scale(${s})"><path d="M-300,0 Q-300,-40 -240,-44 H200 Q320,-30 340,0 Q320,26 200,30 H-240 Q-300,28 -300,0Z" fill="${col}" stroke="#2a2a34" stroke-width="5"/><path d="M-60,-30 L-200,-200 L-120,-200 L60,-30Z" fill="${shade(col,-.12)}" stroke="#2a2a34" stroke-width="5"/><path d="M-60,26 L-200,190 L-120,190 L60,26Z" fill="${shade(col,-.2)}" stroke="#2a2a34" stroke-width="5"/><path d="M-290,-40 L-330,-150 L-250,-150 L-200,-44Z" fill="#c8402a" stroke="#2a2a34" stroke-width="5"/>`+[0,1,2,3,4,5,6].map(i=>`<rect x="${60+i*34}" y="-24" width="20" height="16" rx="4" fill="#4a6a8a"/>`).join('')+`</g>`;
 if(!after){bg+=plane(620,360,.8,-12,'#f4f4f4')+plane(1280,470,.8,160,'#dfe8f4');
  const ex=rad('#ffd060',.9,0);bg+=ex.defs+`<circle cx="960" cy="420" r="280" fill="${ex.ref}"/><circle cx="960" cy="420" r="90" fill="#fff4c0"/><circle cx="960" cy="420" r="150" fill="#ff8a2a" opacity=".6"/>`;
  for(let i=0;i<26;i++){const a=R(0,Math.PI*2),r=R(100,400);bg+=`<path d="M${f(960+Math.cos(a)*r)},${f(420+Math.sin(a)*r)} l${f(R(-20,20))},${f(R(10,50))} l8,-14Z" fill="${['#f4f4f4','#8a8a92','#c8402a','#2a2a30'][i%4]}" stroke="#1a1a1e" stroke-width="2"/>`;}}
 else{for(let i=0;i<60;i++){const x=R(300,1700),y=R(60,900);bg+=`<path d="M${f(x)},${f(y)} l${f(R(10,40))},${f(R(-6,18))} l${f(R(-22,6))},${f(R(14,36))}Z" fill="${['#f4f4f4','#8a8a92','#c8402a','#2a2a30','#e8a02a'][i%5]}" stroke="#1a1a1e" stroke-width="2" opacity=".9"/>`;if(i%6===0)bg+=`<path d="M${f(x)},${f(y)} q${f(R(-20,20))},${f(-80)} ${f(R(-30,30))},${f(-190)}" stroke="#4a4a52" stroke-width="${f(R(8,18))}" fill="none" opacity=".45" stroke-linecap="round"/>`;}}
 bg+=`<rect y="860" width="${W}" height="${H-860}" fill="#5a6a5a"/>`;for(let i=0;i<14;i++)bg+=`<rect x="${i*150+R(-20,20)}" y="${f(R(780,840))}" width="${f(R(90,140))}" height="120" fill="${['#a8a0b0','#c0b8a8','#8a98a8'][i%3]}" stroke="#2a2a34" stroke-width="3"/>`;
 return ret(C,bg,{amb:'ambNight',grade:['#fff0d8',.45]});}

// ---------- stacks of cash ----------
function cash({n=9}={}){const C=cam(470);Dt.srand(101);let bg=bgRect('#2a2a30','#4a4a52');
 bg+=blurG(10,`<rect x="0" y="160" width="${W}" height="520" fill="#3a3a44"/>`);
 bg+=`<rect y="760" width="${W}" height="${H-760}" fill="#6a6a72"/><rect y="760" width="${W}" height="10" fill="#8a8a92"/>`;for(let i=0;i<24;i++)bg+=`<path d="M${f(R(0,W))},${f(R(780,H))} h${f(R(80,240))}" stroke="#4a4a52" stroke-width="2" opacity=".5"/>`;
 const stack=(x,y,w,h)=>{const g=lin('#8ac08a','#4a8a50');return g.defs+`<rect x="${x}" y="${y-h}" width="${w}" height="${h}" fill="${g.ref}" stroke="#1a3a20" stroke-width="3"/><rect x="${x}" y="${y-h*.62}" width="${w}" height="${h*.16}" fill="#e8dcb0" stroke="#1a3a20" stroke-width="2"/><ellipse cx="${x+w/2}" cy="${y-h*.5}" rx="${w*.14}" ry="${h*.1}" fill="none" stroke="#1a3a20" stroke-width="2"/>`+[1,2,3,4].map(i=>`<path d="M${x},${y-h*i/5} H${x+w}" stroke="#2a5a30" stroke-width="2" opacity=".6"/>`).join('');};
 const rows=[[760,3],[860,4],[980,5]];
 for(const [y,m] of rows)for(let i=0;i<n*m/3;i++){const x=60+i*(W-160)/(n*m/3-1)+R(-14,14);bg+=stack(x,y+R(-8,8),R(90,130),R(80,130));}
 const gl=rad('#9affa0',.25,0);bg+=gl.defs+`<ellipse cx="960" cy="760" rx="900" ry="360" fill="${gl.ref}"/>`;
 return ret(C,bg,{grade:['#e0ffe0',.55,'#0a1a0a',.1]});}

// ---------- train crossing the desert ----------
function train(){const base=LOC.desert();const C=base.C;let bg=base.bg;
 const col=['#6a6a72','#8a3a2a','#3a5a7a','#8a8a92'];
 for(let i=0;i<9;i++){const x0=-12+i*3.2;bg+=S.box(C,{x0,x1:x0+3,y0:.6,y1:2.6,z0:10,z1:12},{front:col[i%4],top:shade(col[i%4],.2),side:shade(col[i%4],-.2)});for(const x of [x0+.5,x0+2.5]){const [px,py]=C.P(x,0,10),k=C.k(10)*C.U;bg+=`<ellipse cx="${f(px)}" cy="${f(py-.3*k)}" rx="${f(.3*k)}" ry="${f(.3*k)}" fill="#1a1a1e"/>`;}bg+=S.rectBack(C,9.99,x0+.2,x0+2.8,1.3,1.5,'#e8e0cc');}
 const [rx,ry]=C.P(0,0,9.4);bg+=`<path d="M0,${f(ry)} H${W}" stroke="#4a3a2a" stroke-width="5"/>`;
 return {...base,bg};}
module.exports={train:wrap(train,.06),graveyard:require('../quentin/sets.js').graveyard,rvDesert:wrap(rvDesert,.06),crystal:wrap(crystal,.13),pool:wrap(pool,.12),planes:wrap(planes,.1),cash:wrap(cash,.13)};
