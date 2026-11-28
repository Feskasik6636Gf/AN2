// Detailed locations, batch 1 (standard: references/detail.md)
const S=require('./stage.js');const Dt=require('./detail.js');const D2=require('./detail2.js');
const {PL}=D2;const L4={};
const cam=(PH=470,vx=960)=>S.Cam({vx,PH});

// ---------- night alley ----------
L4.alley=()=>{Dt.srand(31);const C=cam(470);let bg=D2.nightSky(C,{top:'#0c0e26',bottom:'#3a2a4e',stars:120,moon:[960,90]});
 bg+=D2.skyline(C,{n:10,col:'#1c1a32',base:C.Hz-10});
 bg+=Dt.road(C,-3,3,1,40,{lanes:1,col:'#2e2e36'}).replace(/#ece8dc|#f2c43a/g,'#3a3a44');
 // walls
 bg+=D2.brick(C,PL.side(-3),1,40,0,9,{col:'#6a3a34',mortar:'#3a2226',grime:.45})+D2.brick(C,PL.side(3),1,40,0,9,{col:'#5a3a3e',mortar:'#33222a',grime:.45});
 bg+=D2.brick(C,PL.back(40),-3,3,0,9,{col:'#4a3036'});
 bg+=D2.pipeSide(C,-2.95,7,40,3.2)+D2.pipeSide(C,2.95,9,40,4.1,{col:'#6a7078'})+D2.pipeV(C,-2.9,9,0,8,{r:.07})+D2.pipeV(C,2.9,14,0,8,{r:.05});
 bg+=D2.fireEscape(C,-3,14,20,[2.8,5.4])+D2.fireEscape(C,3,24,30,[3,5.6]);
 bg+=D2.graffitiSide(C,3,10,1.4,'IYA',{col:'#3ad0e0',size:1})+D2.graffitiSide(C,-3,16,1.2,'WHAT IF',{col:'#ffd24a',size:.8});
 // back door with light and sign
 bg+=D2.door(C,39.9,0,{col:'#3a4a5a',frame:'#6a6a72',light:true})+D2.bulb(C,0,2.6,39.8,{fl:2.4});
 bg+=D2.neon(C,2.92,3.2,12,'BAR',{col:'#ff3fa0',size:.5,plane:'side',side:-1});
 for(const [z,y] of [[12,6.2],[20,6.8],[30,6.4]]){const p=C.P(-3,y,z),q=C.P(3,y-.4,z+1);bg+=`<path d="M${p[0]},${p[1]} Q${(p[0]+q[0])/2},${(p[1]+q[1])/2+40*C.k(z)} ${q[0]},${q[1]}" stroke="#121218" stroke-width="2" fill="none"/>`;}
 bg+=D2.stringLights(C,[-3,4.6,24],[3,4.4,26],{n:14,sag:.5});
 bg+=D2.acUnit(C,-2.4,3.6,18)+D2.acUnit(C,2.4,2.4,9);
 bg+=D2.dumpster(C,-1.9,11)+D2.trashBag(C,-.6,10.6)+D2.trashBag(C,-.9,9.8,{r:.3,col:'#1e2a3a'})+D2.crate(C,2.1,15)+D2.crate(C,2.2,14.4,{w:.5,h:.4});
 bg+=D2.steam(C,.8,16,{h:2.2})+D2.puddle(C,.5,7.5,{w:2})+D2.puddle(C,-1.2,13,{w:1.4,col:'#5ab0ff',col2:'#ff4fa8'});
 bg+=D2.trashBag(C,2.4,6.2,{r:.32})+D2.crate(C,-2.3,5.6,{w:.55,h:.45,col:'#a88660'});
 return {C,bg,fg:'',spots:[[-.6,6],[.7,6.2]],rim:'#ff7ac0',cast:[-1,.18],grade:['#8ab0ff',.45,'#1a1a4a'],amb:'ambNight'};};

// ---------- rooftop at night ----------
L4.rooftopNight=()=>{Dt.srand(41);const C=cam(470);let bg=D2.nightSky(C,{moon:[1450,140]});
 bg+=D2.skyline(C,{n:34,col:'#1e1c3a',base:C.Hz+40});
 bg+=D2.concreteFloor(C,-14,14,1,22,{col:'#4a4a56'});
 // parapet
 const M=PL.back(22);bg+=D2.concrete(C,M,-14,14,0,1.1,{col:'#5a5a66'})+D2.quad?S.box(C,{x0:-14,x1:14,y0:1.1,y1:1.2,z0:21.9,z1:22.3},{front:'#7a7a86'},{noAO:1}):'';
 bg+=D2.concrete(C,PL.side(-9),1,22,0,1.1,{col:'#555562'})+S.box(C,{x0:-9.3,x1:-9,y0:1.1,y1:1.2,z0:1,z1:22},{front:'#7a7a86'},{noAO:1});
 bg+=D2.waterTank(C,-6,17)+D2.vent(C,4,15)+D2.vent(C,5.2,15.4)+D2.acUnit(C,7,0,12).replace(/^/,'');
 bg+=S.box(C,{x0:-7.5,x1:-4.5,y0:0,y1:2.6,z0:9,z1:12},{front:'#6a6a78'})+D2.door(C,8.99,-6,{col:'#3a3a48',frame:'#8a8a96',light:true})+D2.bulb(C,-6,2.4,8.9,{fl:2});
 bg+=D2.stringLights(C,[-7.5,2.6,9],[6,2.4,14],{n:22,sag:.6})+D2.stringLights(C,[6,2.4,14],[9,2.2,5],{n:12,sag:.4});
 // antenna + pipes + gravel patches
 {const [x,y]=C.P(9,0,18),t=C.P(9,5,18);bg+=`<path d="M${x},${y} L${t[0]},${t[1]}" stroke="#2a2a34" stroke-width="3"/><circle cx="${t[0]}" cy="${t[1]}" r="5" fill="#ff4a4a"/>`+S.glow(t[0],t[1],30,'#ff4a4a',.6);}
 bg+=D2.pipeBack(C,21.8,-13,13,.4,{r:.05})+D2.crate(C,3,7,{col:'#7a6a5a'})+D2.chair(C,1.6,6.5,{col:'#c84a3a'})+D2.chair(C,2.6,7.2,{col:'#3a7ab8'});
 bg+=D2.plant(C,-2.8,6,{h:.9})+D2.plant(C,-3.4,7,{h:1.1});
 for(let i=0;i<260;i++){const X=Dt.R(-9,14),Z=1+Math.pow(Dt.rnd(),1.6)*14,[x,y]=C.P(X,0,Z),k=C.k(Z);bg+=`<ellipse cx="${x}" cy="${y}" rx="${(2+Dt.rnd()*4)*k*1.5}" ry="${(1+Dt.rnd()*2)*k*1.5}" fill="${['#3a3a44','#6a6a76','#2a2a32'][i%3]}"/>`;}
 bg+=D2.puddle(C,-1.5,5,{w:1.8,col:'#ffd890',col2:'#8ab0ff'})+D2.puddle(C,4.5,9,{w:1.2,col:'#8ab0ff',col2:'#ffd890'});
 {const a=C.P(-4.5,.05,9),b=C.P(7,.05,12.2);bg+=`<path d="M${a[0]},${a[1]} C${a[0]+200},${a[1]+60} ${b[0]-300},${b[1]+80} ${b[0]},${b[1]}" stroke="#15151a" stroke-width="5" fill="none"/>`;}
 bg+=S.box(C,{x0:-1,x1:1,y0:0,y1:.35,z0:13,z1:15},{front:'#6a6a78'})+S.poly([C.P(-.9,.36,13.1),C.P(.9,.36,13.1),C.P(.9,.36,14.9),C.P(-.9,.36,14.9)],'#8ab0d8','#2a2a34',1.4);
 return {C,bg,fg:'',spots:[[-.6,6],[.7,6.2]],rim:'#8ab0ff',cast:[1,.16],grade:['#8ab0ff',.45,'#1a1a4a'],amb:'ambNight'};};

// ---------- recording studio ----------
L4.studio=()=>{Dt.srand(51);const C=cam(470);const RW=3.6,Zb=8.5,Hc=3;let bg=D2.room(C,{RW,Zb,Hc,wall:(C,M,a,b,c,d)=>D2.foam(C,M,a,b,c,d,{col:'#3a3650'}),floor:(C,a,b,c,d)=>D2.woodFloor(C,a,b,c,d,{col:'#5a3a2a'}),ceil:'#2a2836',base:'#1a1820'});
 // control-room window into the booth
 const M=PL.back(Zb-.01);bg+=D2.quad?S.poly(D2.quad(C,M,-1.6,1.6,1,2.3),'#141830','#111',4):''; {const g='stw';const a=C.P(0,2.2,Zb),b=C.P(0,1.1,Zb);bg+=`<defs><linearGradient id="${g}" gradientUnits="userSpaceOnUse" x1="0" y1="${a[1]}" x2="0" y2="${b[1]}"><stop offset="0" stop-color="#5a6aa0"/><stop offset="1" stop-color="#2a3050"/></linearGradient></defs>`+S.poly(D2.quad(C,M,-1.5,1.5,1.1,2.2),`url(#${g})`,'#000',2);
  bg+=S.glow(C.P(0,1.9,Zb)[0],C.P(0,1.9,Zb)[1],120,'#ffd890',.4)+S.poly(D2.quad(C,M,-1.4,-.6,1.95,2.15),'#fff','none',0,'opacity=".12"');}
 for(const x of [-3.55,3.55])for(let i=0;i<3;i++){const z=2.2+i*1.9;bg+=D2.foam(C,PL.side(x),z,z+1.2,1.6,2.6,{col:'#6a3a5a',cell:.3});}
 bg+=D2.frame(C,Zb-.05,-2.6,1.4,{w:.6,h:.85,col:'#111'})+D2.frame(C,Zb-.05,2.6,1.4,{w:.6,h:.85,col:'#111'});
 bg+=S.box(C,{x0:2.4,x1:3.1,y0:0,y1:1.3,z0:3.2,z1:3.8},{front:'#1e1e24'})+(()=>{let r='';const Mr=PL.back(3.19);for(let i=0;i<5;i++){r+=S.poly(D2.quad(C,Mr,2.45,3.05,.1+i*.24,.3+i*.24),'#2a2a32','#000',1);const [x,y]=C.P(2.55,.2+i*.24,3.18);r+=`<circle cx="${x}" cy="${y}" r="3" fill="${['#5aff8a','#ff5a5a','#5ab0ff'][i%3]}"/>`+S.glow(x,y,10,['#5aff8a','#ff5a5a','#5ab0ff'][i%3],.6);}return r;})();

 bg+=D2.micStand(C,.3,Zb+.5,{h:1.6}).slice(0,0)+D2.bulb(C,0,2.9,Zb-.2,{col:'#ff5a5a',cone:false})+D2.neon(C,0,2.55,Zb-.02,'ON AIR',{col:'#ff3a3a',size:.22});
 // mixing desk
 bg+=S.box(C,{x0:-1.6,x1:1.6,y0:0,y1:.8,z0:5.6,z1:6.4},{front:'#2a2830'});
 {const q=[C.P(-1.6,.8,5.6),C.P(1.6,.8,5.6),C.P(1.5,1.05,6.4),C.P(-1.5,1.05,6.4)];bg+=S.poly(q,'#3a3842','#111',2);
  for(let i=0;i<24;i++){const u=-1.45+i*.125;const a=C.P(u,.83,5.75),b=C.P(u,.98,6.2);bg+=`<path d="M${a[0]},${a[1]} L${b[0]},${b[1]}" stroke="#1a1a20" stroke-width="2"/>`;const kk=C.P(u,.86+Dt.rnd()*.08,5.75+Dt.rnd()*.3);bg+=`<rect x="${kk[0]-4}" y="${kk[1]-3}" width="8" height="5" rx="1" fill="${['#e8e8e8','#ff5a5a','#5ab0ff','#ffd24a'][i%4]}"/>`;}}
 bg+=D2.speakerStack(C,-2.3,5.8,{n:1}).replace(/0,y1:0.73/,'')+D2.speakerStack(C,2.3,5.8,{n:1});
 bg+=D2.rug(C,-2,2,2.5,5.4,{col:'#4a2a3a',col2:'#c89a50'})+(()=>{let r='';for(let x=-1.6;x<1.7;x+=.4)for(let z=2.8;z<5.2;z+=.4){const [a,b]=C.P(x,.01,z);const q=C.k(z)*C.U/60;r+=`<path d="M${a},${b-4*q} l${8*q},${4*q} l${-8*q},${4*q} l${-8*q},${-4*q}Z" fill="#c89a50" opacity=".45"/>`;}return r;})()+D2.chair(C,0,4.6,{col:'#1e1e24'});
 // guitar on stand + cables + plant + lamp
 {const [x,y]=C.P(-3,0,7),k=C.k(7)*C.U;bg+=`<path d="M${x-.15*k},${y} L${x},${y-.4*k} L${x+.15*k},${y}" stroke="#222" stroke-width="3" fill="none"/><ellipse cx="${x}" cy="${y-.55*k}" rx="${.2*k}" ry="${.26*k}" fill="#c86a2a" stroke="#1a1010" stroke-width="2"/><ellipse cx="${x}" cy="${y-.9*k}" rx="${.15*k}" ry="${.18*k}" fill="#c86a2a" stroke="#1a1010" stroke-width="2"/><circle cx="${x}" cy="${y-.78*k}" r="${.05*k}" fill="#1a1010"/><rect x="${x-.025*k}" y="${y-1.7*k}" width="${.05*k}" height="${.75*k}" fill="#3a2414"/>`;}
 bg+=D2.plant(C,2.9,7.4,{h:1.2})+D2.pendant(C,-1,2.2,5,{light:'#ffc890'})+D2.pendant(C,1,2.2,5,{light:'#ffc890'});
 {let c='';for(let i=0;i<5;i++){const a=C.P(-1+i*.5,0,6.45),b=C.P(-2.4+i*.3,0,5.2+i*.3);c+=`<path d="M${a[0]},${a[1]} Q${(a[0]+b[0])/2},${a[1]+30} ${b[0]},${b[1]}" stroke="#141418" stroke-width="3" fill="none"/>`;}bg+=c;}
 return {C,bg,fg:'',spots:[[-.6,4],[.7,4.2]],rim:'#ff9ac0',cast:[1,.15],grade:['#ffb8d8',.42,'#2a1a3a'],amb:'ambRoom'};};

// ---------- restaurant ----------
L4.restaurant=()=>{Dt.srand(61);const C=cam(450);const RW=5,Zb=12,Hc=3.4;
 const wall=(C,M,a,b,c,d)=>D2.wallpaper(C,M,a,b,1.1,d,{col:'#5a2e3a',stripe:'#6e3a48'})+D2.plaster(C,M,a,b,0,1.1,{col:'#4a2a1e'})+S.poly(D2.quad(C,M,a,b,1.05,1.15),'#7a4a2a','#2a1a10',1);
 let bg=D2.room(C,{RW,Zb,Hc,wall,floor:(C,a,b,c,d)=>D2.woodFloor(C,a,b,c,d,{col:'#6a3e24',w:.16}),ceil:'#3a2228',base:'#3a2014'});
 for(let z=1.5;z<Zb;z+=1.6)bg+=S.poly([C.P(-RW,Hc,z),C.P(RW,Hc,z),C.P(RW,Hc-.22,z),C.P(-RW,Hc-.22,z)],'#5a3420','#1a0e08',1.4)+S.poly([C.P(-RW,Hc-.22,z),C.P(RW,Hc-.22,z),C.P(RW,Hc-.22,z+.25),C.P(-RW,Hc-.22,z+.25)],'#7a4a2a','none',0);
 for(const x of [-RW,RW])for(const z of [4,8]){const q=[C.P(x,1.4,z-.6),C.P(x,1.4,z+.6),C.P(x,2.6,z+.6),C.P(x,2.6,z-.6)];bg+=S.poly(q,'#e8dcc4','#2a1a10',2)+S.poly([C.P(x,1.5,z-.5),C.P(x,1.5,z+.5),C.P(x,2.5,z+.5),C.P(x,2.5,z-.5)],'#1a2a4a','#000',1.2);
  for(const [a,b] of [[z-.75,z-.45],[z+.45,z+.75]])bg+=S.poly([C.P(x,1.2,a),C.P(x,1.2,b),C.P(x,2.8,b),C.P(x,2.8,a)],'#8a2a2a','#2a0a0a',1.4);
  const sc=C.P(x,2.1,z+1.2);bg+=S.glow(sc[0],sc[1],60*C.k(z),'#ffc070',.7)+`<circle cx="${sc[0]}" cy="${sc[1]}" r="${7*C.k(z)}" fill="#ffe8a0"/>`;}
 // bar on the back wall: shelves with bottles + counter
 bg+=D2.shelf(C,Zb-.05,-2.4,2.4,{h:2.6,levels:4,col:'#5a3420',items:'bottle'}).replace(/#3a2014|#2e1a12/g,'')+D2.neon(C,0,2.95,Zb-.06,'TRATTORIA',{col:'#ffb04a',size:.34});
 bg+=S.box(C,{x0:-2.6,x1:2.6,y0:0,y1:1.1,z0:10.6,z1:11.3},{front:'#4a2a18',top:'#8a5a34'})+D2.pipeBack(C,10.59,-2.6,2.6,.15,{col:'#c8a050',r:.03});
 for(const x of [-2,-1,0,1,2])bg+=D2.chair(C,x,10,{col:'#7a2a2a',back:false});
 bg+=D2.frame(C,Zb-.05,-4,1.8,{w:.8,h:.6})+D2.frame(C,Zb-.05,4,1.8,{w:.8,h:.6});
 bg+=D2.windowBack(C,Zb-.02,-3.95,1.4,{w:.9,h:1.1}).slice(0,0);
 for(const z of [8.5,5.6,2.4])for(const x of (z<3?[-3.6,3.6]:[-3,0,3])){bg+=D2.chair(C,x-.45,z+.9)+D2.chair(C,x+.45,z+.9)+D2.dinerTable(C,x,z)+D2.pendant(C,x,2.1,z+.4,{col:'#2a3a2a'});}
 bg+=D2.plant(C,-4.4,10.5,{h:1.4})+D2.plant(C,4.4,10.5,{h:1.4})+D2.plant(C,4.5,3.4,{h:1.2});
 return {C,bg,fg:'',spots:[[-1.2,4],[1.2,4.2]],rim:'#ffc890',cast:[1,.15],grade:['#ffd0a0',.4,'#3a1a10'],amb:'ambCrowd'};};

// ---------- basement ----------
L4.basement=()=>{Dt.srand(71);const C=cam(470);const RW=3.8,Zb=9,Hc=2.6;
 let bg=D2.room(C,{RW,Zb,Hc,wall:(C,M,a,b,c,d)=>D2.concrete(C,M,a,b,c,d,{col:'#7a7a80'}),floor:(C,a,b,c,d)=>D2.concreteFloor(C,a,b,c,d,{col:'#5e6066'}),ceil:'#4a4a52'});
 // joists + pipes on the ceiling
 for(let z=1.5;z<Zb;z+=1.2)bg+=S.poly([C.P(-RW,Hc,z),C.P(RW,Hc,z),C.P(RW,Hc-.18,z),C.P(-RW,Hc-.18,z)],'#7a5a3e','#2a1a10',1.4);
 bg+=D2.pipeSide(C,-RW+.1,3.5,Zb,2.3,{col:'#b86a3a',r:.04})+D2.pipeSide(C,-RW+.1,3.5,Zb,2.15,{col:'#9aa0a8',r:.05})+D2.pipeBack(C,Zb-.05,-RW,RW,2.25,{col:'#b86a3a',r:.04});
 // small high window with light beam
 bg+=D2.windowBack(C,Zb-.01,1.6,1.9,{w:.9,h:.45,sky:['#9ac8e8','#e8f0f0'],frame:'#9a9890'});
 {const a=C.P(1.15,1.9,Zb),b=C.P(2.05,1.9,Zb),c=C.P(1.5,0,Zb-3.4),d=C.P(2.9,0,Zb-3.4);bg+=`<path d="M${a[0]},${a[1]} L${b[0]},${b[1]} L${d[0]},${d[1]} L${c[0]},${c[1]}Z" fill="#fff6d8" opacity=".12"/>`+S.dust([a,b,d,c],50);}
 // water heater, boiler, washer, shelves, boxes, stairs
 {const [x,y]=C.P(-2.8,0,7.8),k=C.k(7.8)*C.U;bg+=`<rect x="${x-.3*k}" y="${y-1.5*k}" width="${.6*k}" height="${1.5*k}" rx="${.25*k}" fill="#d8d8d0" stroke="#2a2a30" stroke-width="2"/><rect x="${x-.3*k}" y="${y-1.5*k}" width="${.15*k}" height="${1.5*k}" rx="${.1*k}" fill="#fff" opacity=".35"/><rect x="${x-.08*k}" y="${y-.5*k}" width="${.16*k}" height="${.12*k}" fill="#5a5a60"/><circle cx="${x+.12*k}" cy="${y-1.1*k}" r="${.05*k}" fill="#ff5a3a"/>`;}
 bg+=D2.pipeV(C,-2.8,7.8,1.5,2.4,{col:'#b86a3a',r:.04});
 bg+=S.box(C,{x0:-1.9,x1:-1.2,y0:0,y1:.9,z0:8.2,z1:8.85},{front:'#ececec'})+(()=>{const [x,y]=C.P(-1.55,.48,8.19),k=C.k(8.2)*C.U;return `<circle cx="${x}" cy="${y}" r="${.22*k}" fill="#4a5a6a" stroke="#2a2a30" stroke-width="3"/><circle cx="${x-.07*k}" cy="${y-.07*k}" r="${.06*k}" fill="#fff" opacity=".4"/>`;})();
 bg+=D2.shelf(C,Zb-.05,-.6,1,{h:1.8,levels:3,col:'#8a7050'});
 bg+=D2.crate(C,2.6,7.4,{w:.7,h:.5})+D2.crate(C,2.65,7.45,{w:.6,h:.4}).replace(/y0:0/,'')+D2.crate(C,3.1,6.2,{w:.5,h:.45,col:'#a8845a'});
 for(let i=0;i<7;i++){const z=4.2+i*.35,y0=i*.32;bg+=S.box(C,{x0:RW-1.1,x1:RW-.05,y0:y0,y1:y0+.06,z0:z,z1:z+.32},{front:'#8a6a48'},{noAO:1});}
 bg+=S.poly([C.P(RW-1.1,0,4.2),C.P(RW-1.1,2.24,6.6),C.P(RW-1.1,2.24,6.7),C.P(RW-1.1,0,4.35)],'#6a4a30','#2a1a10',1.4);
 bg+=D2.bulb(C,-.3,2.3,5.5,{fl:3.4})+D2.trashBag(C,-3,5.2,{col:'#3a3a40',r:.3});
 return {C,bg,fg:'',spots:[[-.6,5],[.7,5.2]],rim:'#ffe2a0',cast:[1,.15],grade:['#ffe8c0',.45,'#1a1410'],amb:'ambRoom'};};

// ---------- concert stage (view from the crowd) ----------
L4.concertStage=()=>{Dt.srand(81);const C=cam(420);let bg=`<rect width="1920" height="1080" fill="#0e0a1a"/>`;
 const Zs=12;
 bg+=S.glow(960,330,900,'#5a2aa8',.55)+S.glow(960,500,500,'#ff3fa0',.25);
 for(let i=0;i<9;i++){const x=-12+i*3;const a=C.P(x,12,Zs+6),b=C.P(x*1.6,12,2);bg+=`<path d="M${a[0]},${a[1]} L${b[0]},${b[1]}" stroke="#2a2240" stroke-width="3"/>`;}
 for(let z=4;z<Zs+6;z+=2.5)bg+=D2.truss(C,z,-14,14,11.5).replace(/#9aa0a8/g,'#3a3256');
 for(const [x,c] of [[-10,'#5ab0ff'],[-6,'#ff5fae'],[6,'#ff5fae'],[10,'#5ab0ff']])bg+=D2.beam(C,x,11.4,Zs-2,x*.2,Zs-4,{col:c,w:2.4});
 for(const x of [-9,9]){for(let y=0;y<7;y+=.5){const a=C.P(x-.3,y,Zs-1),b=C.P(x+.3,y+.5,Zs-1);bg+=`<path d="M${a[0]},${a[1]} L${b[0]},${b[1]} M${b[0]},${a[1]} L${a[0]},${b[1]}" stroke="#4a4466" stroke-width="2"/>`;}const t=C.P(x,7,Zs-1);bg+=S.glow(t[0],t[1],120,'#ffffff',.5)+`<circle cx="${t[0]}" cy="${t[1]}" r="14" fill="#fff"/>`;}
 bg+=D2.ledScreen(C,Zs+3,-5,5,2.4,6.2,{a:'#3a1a8a',b:'#ff3fa0',txt:'IYA2D'});
 bg+=D2.truss(C,Zs+2,-7,7,7)+D2.truss(C,Zs+.2,-7,7,6.6);
 for(const [x,c,tx] of [[-6,'#b48aff',-2],[-3,'#5ab0ff',0],[0,'#ff5fae',1],[3,'#5ab0ff',-1],[6,'#b48aff',2]])bg+=D2.beam(C,x,6.6,Zs+.2,tx,Zs-3,{col:c,w:.9});
 // stage platform (wood planks) with front face
 bg+=D2.woodFloor(C,-8,8,Zs-1.5,Zs+4,{col:'#2e2228',w:.3,Y:1.2});
 bg+=S.rectBack(C,Zs-1.5,-8,8,0,1.2,'#1a141e','#000',2)+D2.pipeBack(C,Zs-1.51,-8,8,1.12,{col:'#3a3a44',r:.03});
 bg+=D2.speakerStack(C,-6.6,Zs-1.4,{n:3}).replace(/y0:0/,'')+D2.speakerStack(C,6.6,Zs-1.4,{n:3});
 // band gear on the stage (Y=1.2)
 const up=s=>`<g transform="translate(0,${(C.P(0,0,Zs+1.5)[1]-C.P(0,1.2,Zs+1.5)[1])*-1})">${s}</g>`;
 bg+=up(D2.drumKit(C,0,Zs+2.2)+D2.amp(C,-2.6,Zs+1.6)+D2.amp(C,2.6,Zs+1.6)+D2.micStand(C,-1.2,Zs+.4)+D2.micStand(C,1.4,Zs+.6));
 bg+=S.blurG(1.5,`<rect width="1920" height="1080" fill="#b48aff" opacity=".07"/>`);
 // haze + crowd silhouettes
 bg+=S.dust([C.P(-8,6,Zs),C.P(8,6,Zs),C.P(8,0,Zs-4),C.P(-8,0,Zs-4)],140,'#e8d8ff');
 bg+=D2.crowdBack(C,-12,12,7,Zs-2.2,90,{lit:'#ff6ab0'})+D2.crowdBack(C,-6,6,4.6,7,22,{lit:'#5ab0ff'})+D2.crowdBack(C,-3.5,3.5,2.4,4.4,12,{lit:'#ff6ab0'});
 for(let i=0;i<80;i++){const x=Dt.R(0,1920),y=Dt.R(0,700);bg+=`<rect x="${x}" y="${y}" width="6" height="10" fill="${['#ff5fae','#ffd24a','#5ab0ff','#fff'][i%4]}" transform="rotate(${Dt.R(0,90)} ${x} ${y})" opacity=".8"/>`;}
 return {C,bg,fg:'',spots:[[-.6,4.6],[.7,4.8]],rim:'#ff6ab0',cast:[0,.1],grade:['#b48aff',.45,'#1a0a2a'],amb:'ambCrowd'};};
module.exports={L4};
