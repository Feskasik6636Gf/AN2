// Detailed sets built on stage.js (meters). Each set returns {bg, fg, cam, spots, rim, cast, grade}
const S=require('./stage.js');const {Cam,poly,line,blurG,glow,shade,rectBack,rectSide,rectFloor,box,table,bill,grade,dust,W,H,L,id,f}=S;
const {rnd}=require('./bean.js');

function room(C,o){const {RW,Zb,Zn=1.1,CH=2.9}=o;let s='';
 // ceiling
 s+=poly([C.P(-RW,CH,Zn),C.P(RW,CH,Zn),C.P(RW,CH,Zb),C.P(-RW,CH,Zb)],o.ceil??'#f6f0e6');
 s+=rectSide(C,-RW,Zn,Zb,0,CH,o.wallL??o.wall);s+=rectSide(C,RW,Zn,Zb,0,CH,o.wallR??shade(o.wall,-.06));
 s+=rectBack(C,Zb,-RW,RW,0,CH,o.wallB??shade(o.wall,.04));
 // floor
 s+=rectFloor(C,-RW,RW,Zn,Zb,o.floor);
 if(o.planks){for(let x=-RW;x<=RW;x+=o.planks) s+=line(C.P(x,0,Zn),C.P(x,0,Zb),o.floorLine,1.6,.55);
  for(let z=Zb;z>Zn;z-=1.1) for(let x=-RW+((z*7)%1)*o.planks;x<RW;x+=o.planks*2.3) s+=line(C.P(x,0,z),C.P(x+o.planks,0,z),o.floorLine,1.4,.45);}
 if(o.tiles){for(let x=-RW;x<=RW;x+=o.tiles) s+=line(C.P(x,0,Zn),C.P(x,0,Zb),o.floorLine,1.6,.6);for(let z=Zb;z>Zn;z-=o.tiles) s+=line(C.P(-RW,0,z),C.P(RW,0,z),o.floorLine,1.6,.6);}
 if(o.lights!==false) for(let z=Zn+1.5;z<Zb;z+=2.6) for(const x of (o.lightX??[-RW/2,RW/2])) s+=poly([C.P(x-.5,CH-.01,z),C.P(x+.5,CH-.01,z),C.P(x+.5,CH-.01,z+.35),C.P(x-.5,CH-.01,z+.35)],'#fffbe8','#d8d4c8',1.4);
 // baseboards
 const bb=o.base??shade(o.wall,-.25);
 s+=rectBack(C,Zb,-RW,RW,0,.1,bb);s+=rectSide(C,-RW,Zn,Zb,0,.1,bb);s+=rectSide(C,RW,Zn,Zb,0,.1,bb);
 return s;}
function winBack(C,Z,x0,x1,y0,y1,sky,frame='#f6efe4'){const g=id('sk');const a=C.P(x0,y1,Z),b=C.P(x1,y0,Z);
 let s=`<defs><linearGradient id="${g}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky[0]}"/><stop offset="1" stop-color="${sky[1]}"/></linearGradient></defs>`;
 s+=rectBack(C,Z,x0-.08,x1+.08,y0-.08,y1+.08,frame);s+=rectBack(C,Z,x0,x1,y0,y1,`url(#${g})`);
 if(sky[2]) s+=sky[2](a,b);
 const xm=(x0+x1)/2,ym=(y0+y1)/2;s+=line(C.P(xm,y0,Z),C.P(xm,y1,Z),frame,6*C.k(Z));s+=line(C.P(x0,ym,Z),C.P(x1,ym,Z),frame,6*C.k(Z));
 s+=rectBack(C,Z,x0-.14,x1+.14,y0-.12,y0-.04,shade(frame,-.08));return s;}
function winSide(C,X,z0,z1,y0,y1,sky,frame='#f6efe4'){const g=id('sk');let s=`<defs><linearGradient id="${g}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky[0]}"/><stop offset="1" stop-color="${sky[1]}"/></linearGradient></defs>`;
 s+=rectSide(C,X,z0-.08,z1+.08,y0-.08,y1+.08,frame)+rectSide(C,X,z0,z1,y0,y1,`url(#${g})`);const zm=(z0+z1)/2;s+=line(C.P(X,y0,zm),C.P(X,y1,zm),frame,7*C.k(zm));s+=line(C.P(X,(y0+y1)/2,z0),C.P(X,(y0+y1)/2,z1),frame,6*C.k(zm));return s;}
const poster=(C,Z,x0,x1,y0,y1,c,inner='')=>rectBack(C,Z,x0,x1,y0,y1,c)+inner;
function door(C,Z,x0,x1,col,open=0){let s=rectBack(C,Z,x0-.06,x1+.06,0,2.16,shade(col,.4));s+=rectBack(C,Z,x0,x1,0,2.1,col);
 s+=rectBack(C,Z,x0+.12,x1-.12,1.2,1.9,shade(col,.15))+rectBack(C,Z,x0+.12,x1-.12,.2,1.05,shade(col,.15));const [kx,ky]=C.P(x1-.12,1.0,Z);s+=`<circle cx="${f(kx)}" cy="${f(ky)}" r="${6*C.k(Z)}" fill="#e8c860" stroke="${L}" stroke-width="2"/>`;return s;}
function shelf(C,Z,x0,x1,y,books){let s=rectBack(C,Z,x0,x1,y-.04,y,'#8a5a3a');let x=x0+.04;const cols=['#e8434f','#3a6ab0','#ffd24a','#5aa86a','#6a5af0','#f08a3a','#2fb59a'];
 for(let i=0;i<books;i++){const w=.04+rnd()*.03,h=.18+rnd()*.1;if(x+w>x1-.04)break;s+=rectBack(C,Z,x,x+w,y,y+h,cols[i%7],L,1.4);x+=w+.005;}return s;}
function clock(C,Z,x,y,r){const [cx,cy]=C.P(x,y,Z);const R=r*C.U*C.k(Z);return `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(R)}" fill="#fff" stroke="${L}" stroke-width="3"/><path d="M${f(cx)},${f(cy)} L${f(cx)},${f(cy-R*.6)} M${f(cx)},${f(cy)} L${f(cx+R*.45)},${f(cy+R*.2)}" stroke="${L}" stroke-width="3"/>`;}
function plantProp(C,X,Z,h=1){const pot={x0:X-.18*h,x1:X+.18*h,y0:0,y1:.35*h,z0:Z-.18*h,z1:Z+.18*h};let s=box(C,pot,{front:'#d07a4a'});
 const [x,y]=C.P(X,.35*h,Z);const k=C.k(Z)*C.U/100*h;s+=`<g transform="translate(${f(x)},${f(y)}) scale(${k.toFixed(3)})"><path d="M0,0 C-20,-40 -50,-50 -60,-90 C-20,-80 -6,-50 0,-14 C4,-70 26,-110 46,-118 C40,-80 18,-46 6,-8 C26,-44 62,-52 80,-40 C54,-22 28,-6 8,4Z" fill="#5aa86a" stroke="${L}" stroke-width="2.5"/><path d="M-20,-50 C-10,-30 0,-14 0,0 M30,-80 C20,-50 8,-20 4,0" stroke="#3a7a4a" stroke-width="2" fill="none"/></g>`;return s;}
function beamFromWindow(C,winPts,floorPts,c='#fff4d6',a=.35){return blurG(16,poly([...winPts,...floorPts],c,'none',0,`opacity="${a}"`));}

// ---------------- SETS ----------------
const SETS={};
SETS.classroom=()=>{const C=Cam({vx:900});const RW=4.2,Zb=12;let bg=room(C,{RW,Zb,wall:'#eadbc6',wallL:'#e2cfb8',floor:'#c58a5a',floorLine:'#8a5434',planks:.5});
 // wainscot stripe
 bg+=rectBack(C,Zb,-RW,RW,.1,1.0,'#5fa8a0')+rectSide(C,RW,1.1,Zb,.1,1.0,'#58a098');
 bg+=winSide(C,-RW,3,5.2,1.0,2.4,['#9fd4f0','#ffe2b8'])+winSide(C,-RW,6.2,8.4,1.0,2.4,['#9fd4f0','#ffe2b8'])+winSide(C,-RW,9.4,11.2,1.0,2.4,['#9fd4f0','#ffe2b8']);
 // board + tray + teacher desk
 bg+=rectBack(C,Zb,-2.2,2.2,1.0,2.3,'#2f5a4a')+rectBack(C,Zb,-2.3,2.3,.94,1.0,'#b98a5a');
 const [tx,ty]=C.P(-1.9,2.05,Zb);bg+=`<text x="${f(tx)}" y="${f(ty)}" font-family="Comic Sans MS, DejaVu Sans" font-size="${30*C.k(Zb)*3}" fill="#e8f0e0" opacity=".9">What if...?</text>`;
 bg+=line(C.P(-1.9,1.6,Zb),C.P(-.2,1.6,Zb),'#e8f0e0',3,.6)+line(C.P(-1.9,1.4,Zb),C.P(-.8,1.4,Zb),'#e8f0e0',3,.6)+`<path d="M${f(C.P(.4,1.7,Zb)[0])},${f(C.P(.4,1.7,Zb)[1])} q30,-30 60,0 t60,0 t60,0" stroke="#e8f0e0" stroke-width="3" fill="none" opacity=".6"/>`;
 bg+=clock(C,Zb,2.9,2.4,.18);
 bg+=[...Array(5)].map((_,i)=>poster(C,Zb,2.6+i*.32,2.86+i*.32,1.3,1.66,['#ffcf5a','#7ac8ff','#ff8aa0','#9ae0a0','#c8a0ff'][i])).join('');
 bg+=shelf(C,Zb,-4.1,-2.6,1.4,22)+shelf(C,Zb,-4.1,-2.6,1.9,20);
 bg+=rectSide(C,RW,7,9,1.2,2.0,'#c9a272')+[0,1,2].map(i=>rectSide(C,RW,7.1+i*.62,7.6+i*.62,1.3,1.9,['#e06a5a','#5a8ae0','#e0c05a'][i],L,1.4)).join('');
 bg+=door(C,Zb,3.0,3.9,'#8fb8d8');
 bg+=box(C,{x0:3.6,x1:3.95,y0:0,y1:.45,z0:5,z1:5.35},{front:'#5a8ae0'});
 for(let z=3;z<11;z+=.6){bg+=line(C.P(RW,1.45,z),C.P(RW-.08,1.45,z),'#8a8a96',3*C.k(z));if(Math.floor(z*10)%3==0)bg+=rectSide(C,RW-.01,z-.15,z+.15,1.0,1.42,['#e8434f','#ffb020','#5aa86a','#6a5af0'][Math.floor(z)%4],L,1.4);}
 const [gx,gy]=C.P(1.4,.95,10.4);bg+=`<circle cx="${f(gx)}" cy="${f(gy)}" r="${f(.16*C.U*C.k(10.4))}" fill="#4a9ad8" stroke="${L}" stroke-width="2"/><path d="M${f(gx-8)},${f(gy-6)} q6,-8 14,-2 q4,8 -4,12 q-8,2 -10,-10Z" fill="#5aa86a"/>`;
 bg+=table(C,-.9,.9,10.2,11,.78,'#c9935a','#7a5a3a');
 // student desks rows
 let mid='';for(const z of [9,7.6]) for(const x of [-3,-1.2,.6,2.4]) mid+=table(C,x,x+1.1,z,z+.55,.74,'#d9a46a','#8a9aaa')+box(C,{x0:x+.3,x1:x+.8,y0:0,y1:.45,z0:z+.65,z1:z+1.05},{front:'#3a6ab0'});
 bg+=mid;
 // light
 bg+=beamFromWindow(C,[C.P(-RW,2.4,3),C.P(-RW,2.4,5.2)],[C.P(.6,0,6.4),C.P(-1.2,0,3.2)])+beamFromWindow(C,[C.P(-RW,2.4,6.2),C.P(-RW,2.4,8.4)],[C.P(1.4,0,10.2),C.P(-.4,0,7.2)],'#fff4d6',.25);
 bg+=dust([C.P(-RW,2.4,3),C.P(-RW,2.4,5.2),C.P(.6,0,6.4),C.P(-1.2,0,3.2)],80);
 // foreground desk (blurred)
 const fg=blurG(10,table(C,-3.6,-2.2,2.2,2.8,.74,'#d9a46a','#8a9aaa')+box(C,{x0:2.4,x1:3.4,y0:0,y1:1.1,z0:2.0,z1:2.4},{front:'#4a7ac0'}));
 return {C,bg,fg,spots:[[-1,4.6],[.6,4.4],[2.2,6.2],[-2.4,6.4]],rim:'#ffd59a',cast:[1.5,.26],grade:['#fff1d8',.5]};};

SETS.bedroom=()=>{const C=Cam({vx:980});const RW=3,Zb=8.5;let bg=room(C,{RW,Zb,lights:false,wall:'#4a4a86',wallL:'#424278',floor:'#5a4a6a',floorLine:'#2a2038',planks:.32,ceil:'#3a3a6a',base:'#2a2a50'});
 bg+=winBack(C,Zb,.6,2.2,1.0,2.2,['#141a40','#3a3a80',(a,b)=>`<circle cx="${f(b[0]-40)}" cy="${f(a[1]+40)}" r="22" fill="#fff6d8"/>`+[...Array(14)].map(()=>`<circle cx="${f(a[0]+rnd()*(b[0]-a[0]))}" cy="${f(a[1]+rnd()*(b[1]-a[1]))}" r="${(rnd()*1.6+.5).toFixed(1)}" fill="#fff"/>`).join('')],'#d8d4e8');
 // curtains
 bg+=rectBack(C,Zb,.3,.62,.8,2.4,'#8a5ab0')+rectBack(C,Zb,2.18,2.5,.8,2.4,'#8a5ab0');
 bg+=poster(C,Zb,-2.6,-1.6,1.2,2.4,'#e8434f')+`<circle cx="${f(C.P(-2.1,1.8,Zb)[0])}" cy="${f(C.P(-2.1,1.8,Zb)[1])}" r="${f(.3*C.U*C.k(Zb))}" fill="#ffb020" stroke="${L}" stroke-width="2.5"/>`;
 bg+=shelf(C,Zb,-1.3,-.3,1.7,12);
 // fairy lights
 for(let i=0;i<22;i++){const x=-2.9+i*.27,[px,py]=C.P(x,2.55-Math.sin(i/21*Math.PI)*.2,Zb);bg+=`<circle cx="${f(px)}" cy="${f(py)}" r="4" fill="#ffd890"/>`+glow(px,py,18,'#ffd890',.6);}
 // desk + laptop + lamp along left wall
 bg+=table(C,-2.9,-1.9,4.8,6.8,.76,'#8a6a4a','#5a4a3a');
 bg+=box(C,{x0:-2.7,x1:-2.2,y0:.76,y1:.78,z0:5.3,z1:5.8},{front:'#2a2a3a'},{noAO:1})+rectSide(C,-2.5,5.3,5.8,.78,1.12,'#7ad0ff');
 const [lx,ly]=C.P(-2.6,1.2,6.4);bg+=box(C,{x0:-2.7,x1:-2.5,y0:.76,y1:1.15,z0:6.3,z1:6.5},{front:'#ffd24a'},{noAO:1})+glow(lx,ly,320,'#ffb060',.5)+glow(C.P(-2.5,1,5.5)[0],C.P(-2.5,1,5.5)[1],160,'#7ad0ff',.3);
 // bed right
 bg+=box(C,{x0:1.0,x1:2.9,y0:0,y1:1.1,z0:8.3,z1:8.45},{front:'#5a3a2a'},{noAO:1})+box(C,{x0:1.0,x1:2.9,y0:0,y1:.45,z0:5.2,z1:8.3},{front:'#5a3a2a'});
 bg+=box(C,{x0:1.05,x1:2.85,y0:.45,y1:.62,z0:5.25,z1:8.2},{front:'#6a7ad0',top:'#7a8ae0'},{noAO:1})+box(C,{x0:1.2,x1:2.7,y0:.62,y1:.8,z0:7.6,z1:8.1},{front:'#f2f0ea'},{noAO:1})+box(C,{x0:1.05,x1:2.85,y0:.63,y1:.7,z0:5.25,z1:6.6},{front:'#e8434f',top:'#ff6a6a'},{noAO:1});
 // rug
 bg+=rectFloor(C,-1.2,.8,4.4,6.6,'#c86a8a','#7a3a5a',2)+rectFloor(C,-1.0,.6,4.6,6.4,'none','#f2c0d0',2);
 bg+=beamFromWindow(C,[C.P(.6,2.2,Zb),C.P(2.2,2.2,Zb)],[C.P(1.4,0,4),C.P(-.4,0,4.6)],'#9aa8ff',.22);
 const fg=blurG(9,box(C,{x0:-3,x1:-2,y0:0,y1:.9,z0:2.2,z1:2.7},{front:'#6a4a8a'}));
 return {C,bg,fg,spots:[[-.6,4.6],[.4,5.2]],rim:'#9aa8ff',cast:[1.2,.2],grade:['#9aa8ff',.6,'#2a2a6a']};};

SETS.kitchen=()=>{const C=Cam({vx:960});const RW=3.4,Zb=8;let bg=room(C,{RW,Zb,wall:'#f4e6d2',wallL:'#eedcc4',floor:'#e8dcc8',floorLine:'#b8a48a',tiles:.6});
 // counters back wall
 bg+=rectBack(C,Zb,-3.3,1.6,.9,1.5,'#f8f2e8')+[...Array(24)].map((_,i)=>line(C.P(-3.3+i*.2,.9,Zb),C.P(-3.3+i*.2,1.5,Zb),'#d8ccb8',1.4)).join('');
 for(let i=0;i<6;i++) bg+=rectBack(C,Zb,-3.3+i*.82,-2.52+i*.82,1.5,2.3,'#3fa79a')+`<circle cx="${f(C.P(-2.6+i*.82,1.62,Zb)[0])}" cy="${f(C.P(-2.6+i*.82,1.62,Zb)[1])}" r="3" fill="${L}"/>`;
 bg+=box(C,{x0:-3.3,x1:1.6,y0:0,y1:.9,z0:7.4,z1:8},{front:'#3fa79a',top:'#e8d8c0'});
 for(let i=0;i<6;i++) bg+=rectBack(C,7.4,-3.25+i*.82,-2.55+i*.82,.08,.82,'#4ab0a2')+line(C.P(-2.65+i*.82,.75,7.4),C.P(-2.65+i*.82,.6,7.4),'#2a6a62',3);
 // sink, kettle, fruit
 bg+=rectFloor(C,-1.2,-.4,7.5,7.9,'#c8ccd4',L,2,.905)+line(C.P(-.8,.9,7.9),C.P(-.8,1.2,7.9),'#8a8a96',5)+line(C.P(-.8,1.2,7.9),C.P(-.7,1.2,7.7),'#8a8a96',5);
 bg+=box(C,{x0:.4,x1:.65,y0:.9,y1:1.15,z0:7.6,z1:7.8},{front:'#e8434f'},{noAO:1});
 for(const [x,c] of [[-2.4,'#e8434f'],[-2.25,'#ffb020'],[-2.1,'#5aa86a']]){const [px,py]=C.P(x,.95,7.6);bg+=`<circle cx="${f(px)}" cy="${f(py)}" r="${f(.07*C.U*C.k(7.6))}" fill="${c}" stroke="${L}" stroke-width="2"/>`;}
 // fridge
 bg+=box(C,{x0:2.0,x1:3.0,y0:0,y1:2.0,z0:7.2,z1:7.9},{front:'#e8eef2'})+line(C.P(2.0,1.3,7.2),C.P(3.0,1.3,7.2),L,2.4)+line(C.P(2.85,1.4,7.2),C.P(2.85,1.8,7.2),L,4)+line(C.P(2.85,.6,7.2),C.P(2.85,1.1,7.2),L,4);
 bg+=[0,1,2].map(i=>rectBack(C,7.19,2.2+i*.18,2.34+i*.18,1.55,1.7,['#ffd24a','#7ac8ff','#ff8aa0'][i],L,1.2)).join('');
 bg+=clock(C,Zb,.4,2.5,.16);
 // window left wall
 bg+=winSide(C,-RW,3.2,5.6,1.0,2.3,['#a8dcff','#fff0d0']);
 bg+=beamFromWindow(C,[C.P(-RW,2.3,3.2),C.P(-RW,2.3,5.6)],[C.P(1.6,0,7),C.P(-.2,0,3.6)],'#fff4d6',.32)+dust([C.P(-RW,2.3,3.2),C.P(-RW,2.3,5.6),C.P(1.6,0,7),C.P(-.2,0,3.6)],70);
 // dining table mid
 const tbl=table(C,-1.6,1.4,5.6,6.6,.76,'#c8915a','#8a5a3a')+[-1.1,-.1,.9].map(x=>{const [px,py]=C.P(x,.77,6.1);const r=.16*C.U*C.k(6.1);return `<ellipse cx="${f(px)}" cy="${f(py)}" rx="${f(r)}" ry="${f(r*.35)}" fill="#fff" stroke="${L}" stroke-width="2"/><ellipse cx="${f(px)}" cy="${f(py-1)}" rx="${f(r*.55)}" ry="${f(r*.18)}" fill="#c8703a"/>`;}).join('');
 bg+=tbl+glow(...C.P(0,2.8,6),500,'#fff2c8',.3);
 const fg=blurG(10,box(C,{x0:-3.4,x1:-2.4,y0:0,y1:.95,z0:2.1,z1:2.6},{front:'#c8915a'})+plantProp(C,2.9,2.4,1.2));
 return {C,bg,fg,spots:[[-.7,4.6],[.7,4.8]],rim:'#ffe0b0',cast:[1.5,.28],grade:['#fff1d8',.45]};};

SETS.hallway=()=>{const C=Cam({vx:960});const RW=2.2,Zb=22;let bg=room(C,{RW,Zb,wall:'#dfe8f0',floor:'#e8dcc8',floorLine:'#c8b89a',tiles:.8,ceil:'#f4f6f8',CH:3});
 for(let z=3;z<Zb;z+=2.6) bg+=poly([C.P(-.5,2.99,z),C.P(.5,2.99,z),C.P(.5,2.99,z+1.2),C.P(-.5,2.99,z+1.2)],'#fffbe8','#d8d8d0',1.5)+glow(...C.P(0,2.9,z+.6),140*C.k(z),'#fffbe8',.5);
 // lockers both sides
 for(const X of [-RW,RW]) for(let z=2;z<Zb-1;z+=.42){const c=Math.floor(z/.42)%2?'#3a6ab0':'#4a7ac0';bg+=rectSide(C,X,z,z+.42,.1,1.9,c);bg+=line(C.P(X,1.6,z+.08),C.P(X,1.6,z+.34),'#1e3a6a',2*C.k(z)+1)+line(C.P(X,1.5,z+.08),C.P(X,1.5,z+.34),'#1e3a6a',2*C.k(z)+1);}
 for(const X of [-RW,RW]) for(let z=4;z<Zb-2;z+=5.2) bg+=rectSide(C,X,z,z+.5,1.95,2.5,['#ffcf5a','#ff8aa0','#9ae0a0','#7ac8ff'][Math.floor(z)%4],L,1.6);
 bg+=door(C,Zb,-.5,.5,'#8ab0d0')+rectBack(C,Zb,-1.6,-.9,1.4,2.0,'#2f5a4a')+rectBack(C,Zb,.9,1.6,1.6,2.0,'#e8434f');
 bg+=rectFloor(C,-.6,.6,1.1,Zb,'#ffd24a','none',0).replace('fill="#ffd24a"','fill="#ffd24a" opacity=".18"');
 // trophy case + bench
 bg+=box(C,{x0:1.6,x1:2.15,y0:0,y1:.45,z0:7,z1:8.6},{front:'#8a5a3a'});
 const fg=blurG(9,box(C,{x0:-2.2,x1:-1.6,y0:0,y1:1.9,z0:1.6,z1:2.4},{front:'#3a6ab0'}));
 return {C,bg,fg,spots:[[-.6,4.4],[.6,4.6],[.2,9]],rim:'#ffffff',cast:[.8,.14],grade:['#ffffff',.4]};};

SETS.office=()=>{const C=Cam({vx:960});const RW=4.5,Zb=11;let bg=room(C,{RW,Zb,wall:'#dfe6ee',floor:'#8a96a8',floorLine:'#7a8698',tiles:.9,ceil:'#eef2f6'});
 for(let i=0;i<4;i++) bg+=winBack(C,Zb,-4+i*2.05,-2.3+i*2.05,.6,2.6,['#a8d8ff','#e8f4ff',(a,b)=>[...Array(5)].map((_,k)=>{const x=a[0]+(k+.3)*(b[0]-a[0])/5,h=(b[1]-a[1])*(.3+((k*37+i*11)%50)/100);return `<rect x="${f(x)}" y="${f(b[1]-h)}" width="${f((b[0]-a[0])/7)}" height="${f(h)}" fill="#8aa8c8" opacity=".6"/>`;}).join('')],'#d8dee6');
 for(let z=2;z<Zb;z+=2.4) for(const x of [-2.4,1.2]) bg+=poly([C.P(x,2.89,z),C.P(x+1.2,2.89,z),C.P(x+1.2,2.89,z+.5),C.P(x,2.89,z+.5)],'#fff','#ccd',1.2);
 // desks with monitors and chairs
 let mid='';for(const [x,z] of [[-3.6,8.6],[-.9,8.6],[1.8,8.6],[-3.6,6.4],[1.8,6.4]]){mid+=table(C,x,x+1.8,z,z+.8,.75,'#f2f0ea','#6a6a76');
  mid+=box(C,{x0:x+.6,x1:x+1.2,y0:.76,y1:1.15,z0:z+.4,z1:z+.44},{front:'#2a2a3a'},{noAO:1})+rectBack(C,z+.399,x+.64,x+1.16,.8,1.11,'#7ab0ff');
  mid+=box(C,{x0:x+.6,x1:x+1.1,y0:0,y1:.48,z0:z-.5,z1:z-.05},{front:'#3a3a48'})+box(C,{x0:x+.6,x1:x+1.1,y0:.48,y1:1.0,z0:z-.55,z1:z-.45},{front:'#3a3a48'},{noAO:1});}
 bg+=mid+plantProp(C,4.1,10,1.3)+plantProp(C,-4.1,10,1.1)+glow(960,0,900,'#ffffff',.3);
 const fg=blurG(10,plantProp(C,3.4,2.3,1.6));
 return {C,bg,fg,spots:[[-.4,4.4],[.8,4.6]],rim:'#ffffff',cast:[1,.18],grade:['#ffffff',.4]};};

// -------- outdoor --------
function ground(C,col,z0=1,z1=60){return rectFloor(C,-80,80,z0,z1,col,'none',0);}
function bldg(C,x0,x1,z0,z1,h,col,winCol='#e8f4ff',lit=null){let s=box(C,{x0,x1,y0:0,y1:h,z0,z1},{front:col,side:shade(col,-.15)});
 const fz=z0;for(let y=.9;y<h-.6;y+=1.1) for(let x=x0+.4;x<x1-.6;x+=1.1){const on=lit?((x*7+y*13)%3<1.4):1;s+=rectBack(C,fz-.001,x,x+.6,y,y+.7,lit?(on?lit:'#2a2a48'):winCol,L,1.2);}
 // side windows
 const sx=x1<0?x1:(x0>0?x0:null);if(sx!==null) for(let y=.9;y<h-.6;y+=1.1) for(let z=z0+.4;z<z1-.6;z+=1.4){const on=lit?((z*7+y*13)%3<1.4):1;s+=rectSide(C,sx,z,z+.7,y,y+.7,lit?(on?lit:'#2a2a48'):shade(winCol,-.08),L,1.2);}
 return s;}
function tree(C,X,Z,h=1){const [x,y]=C.P(X,0,Z);const k=C.k(Z)*C.U/100*h;return blurG(Z>14?1.5:0,`<g transform="translate(${f(x)},${f(y)}) scale(${k.toFixed(3)})"><ellipse cx="30" cy="0" rx="90" ry="18" fill="#1a0e18" opacity=".25"/><rect x="-12" y="-230" width="24" height="230" fill="#6a4a3a" stroke="${L}" stroke-width="2"/><circle cx="0" cy="-300" r="110" fill="#5aa86a" stroke="${L}" stroke-width="2.5"/><circle cx="-70" cy="-240" r="72" fill="#4a9a5a" stroke="${L}" stroke-width="2.5"/><circle cx="70" cy="-250" r="78" fill="#6ab87a" stroke="${L}" stroke-width="2.5"/><circle cx="-20" cy="-330" r="50" fill="#7ac88a" opacity=".6"/></g>`);}
function lamp(C,X,Z,lit=false){let s=box(C,{x0:X-.05,x1:X+.05,y0:0,y1:4,z0:Z-.05,z1:Z+.05},{front:'#3a3a48'});const [x,y]=C.P(X+.4*Math.sign(-X||1),4,Z);s+=line(C.P(X,4,Z),C.P(X+.5*Math.sign(-X||1),4.05,Z),'#3a3a48',5*C.k(Z));s+=`<ellipse cx="${f(x)}" cy="${f(y+4)}" rx="${f(14*C.k(Z))}" ry="${f(6*C.k(Z))}" fill="#ffe8a0" stroke="${L}" stroke-width="1.5"/>`;if(lit)s+=glow(x,y,260*C.k(Z),'#ffd890',.5);return s;}

SETS.streetDay=()=>{const C=Cam({vx:1500,PH:470});const g=id('sky');let bg=`<defs><linearGradient id="${g}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7cc4ff"/><stop offset="1" stop-color="#fff0d8"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#${g})"/>`;
 bg+=`<ellipse cx="300" cy="160" rx="160" ry="40" fill="#fff" opacity=".85"/><ellipse cx="1500" cy="120" rx="220" ry="46" fill="#fff" opacity=".75"/>`+glow(1650,90,480,'#fff6c8',.55);
 bg+=ground(C,'#8a8a96');
 // road center, sidewalks both sides at |X|>3
 bg+=rectFloor(C,-80,-3.2,1,60,'#d8c8b0','none',0)+rectFloor(C,3.2,80,1,60,'#d8c8b0','none',0);
 bg+=rectFloor(C,-3.2,3.2,1,60,'#5a5a66','none',0)+rectFloor(C,-3.4,-3.2,1,60,'#c8c0b4','none',0)+rectFloor(C,3.2,3.4,1,60,'#c8c0b4','none',0);
 for(let z=2;z<60;z+=3) bg+=rectFloor(C,-.08,.08,z,z+1.4,'#f2f0ea','none',0);
 for(let z=1;z<60;z+=.9) bg+=line(C.P(-9,0,z),C.P(-3.4,0,z),'#b8a890',1.2,.6)+line(C.P(3.4,0,z),C.P(9,0,z),'#b8a890',1.2,.6);
 // crosswalk
 for(let x=-3;x<3;x+=.6) bg+=rectFloor(C,x,x+.35,9,10.6,'#f2f0ea','none',0);
 // buildings both sides
 const cols=['#c8a0d8','#ffd0a0','#a0d0c8','#ffb0b0','#b0c8ff','#ffe0a0','#c8e0a0'];let mid='';
 for(let i=0;i<7;i++){const z=6+i*6,h=8+((i*5)%4)*3;mid+=bldg(C,-16,-8,z,z+5.6,h,cols[i%7])+bldg(C,8,16,z+2,z+7.6,h+2,cols[(i+3)%7]);}
 // shop with awning left near
 bg+=blurG(1.2,mid);
 bg+=tree(C,-6,8,1.2)+tree(C,6.2,12,1.1)+tree(C,-6,18,1.1)+lamp(C,4,7)+lamp(C,-4,15);
 // car on road
 bg+=box(C,{x0:-2.6,x1:-.8,y0:.3,y1:1.0,z0:14,z1:18},{front:'#e8434f'})+box(C,{x0:-2.4,x1:-1.0,y0:1.0,y1:1.5,z0:15,z1:17},{front:'#bfe6ff',top:'#e8434f'},{noAO:1});
 // bench + bin on sidewalk
 bg+=box(C,{x0:-6.2,x1:-4.6,y0:.4,y1:.48,z0:5.6,z1:6},{front:'#8a5a3a'})+box(C,{x0:4.4,x1:4.8,y0:0,y1:.9,z0:5.4,z1:5.8},{front:'#5aa86a'});
 const fg=blurG(10,lamp(C,-4.2,2.4));
 return {C,bg,fg,spots:[[-4.4,5.2],[-3.9,6.2],[-6.4,13]],rim:'#fff0c0',cast:[-1.2,.22],grade:['#fff6d8',.35]};};

SETS.cityNight=()=>{const C=Cam({vx:1500,PH:470});let bg=`<rect width="${W}" height="${H}" fill="#151530"/>`;const g=id('sky');bg+=`<defs><linearGradient id="${g}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#14143a"/><stop offset="1" stop-color="#5a2a6a"/></linearGradient></defs><rect width="${W}" height="${C.Hz+10}" fill="url(#${g})"/>`;
 bg+=ground(C,'#1e1a2e')+rectFloor(C,-80,-3.2,1,60,'#2a2440','none',0)+rectFloor(C,3.2,80,1,60,'#2a2440','none',0);
 for(let z=2;z<60;z+=3) bg+=rectFloor(C,-.08,.08,z,z+1.4,'#5a5a76','none',0);
 let mid='';for(let i=0;i<7;i++){const z=6+i*6,h=10+((i*5)%4)*4;mid+=bldg(C,-16,-8,z,z+5.6,h,['#24244a','#2c2450','#1e2a4a'][i%3],'#2a2a48','#ffd890')+bldg(C,8,16,z+2,z+7.6,h+3,['#2c2450','#1e2a4a','#24244a'][i%3],'#2a2a48','#7ad0ff');}
 bg+=blurG(1.4,mid);
 // neon shop fronts near
 const sign=(X,z,txt,c,side)=>{const [x,y]=C.P(X,3.2,z);const k=C.k(z);return `<text x="${f(x)}" y="${f(y)}" text-anchor="${side<0?'start':'end'}" font-family="DejaVu Sans" font-weight="bold" font-size="${f(90*k)}" fill="${c}" transform="skewY(${side*-8})">${txt}</text>`+glow(x+side*-80*k,y-30*k,300*k,c,.5);};
 bg+=box(C,{x0:-9,x1:-7.6,y0:0,y1:4.4,z0:5,z1:10},{front:'#2a2240'})+rectSide(C,-7.6,5.6,9.4,.2,2.6,'#ffcf8a')+[6.2,7.4,8.6].map(z=>rectSide(C,-7.61,z-.25,z+.25,.2,.9,'#8a5a3a',L,1.6)+rectSide(C,-7.61,z-.08,z+.08,.9,1.3,'#f2f0ea',L,1.4)).join('')+line(C.P(-7.6,.2,7.0),C.P(-7.6,2.6,7.0),'#f6efe4',6)+line(C.P(-7.6,.2,8.0),C.P(-7.6,2.6,8.0),'#f6efe4',6)+rectSide(C,-7.6,5.6,9.4,2.6,3.0,'#e8434f')+sign(-7.6,6.2,'CAFE','#ff5fa8',-1);
 bg+=box(C,{x0:7.6,x1:9,y0:0,y1:4.4,z0:6,z1:11},{front:'#22263e'})+rectSide(C,7.6,6.6,10.4,.2,2.6,'#9ae8ff')+sign(7.6,7,'24/7','#5ff0ff',1);
 bg+=lamp(C,3.8,8,true)+lamp(C,-3.8,16,true)+lamp(C,3.8,24,true);
 bg+=blurG(10,`<rect x="${f(C.P(-6,0,6)[0])}" y="${f(C.P(-6,0,6)[1])}" width="140" height="300" fill="#ff5fa8" opacity=".22"/><rect x="${f(C.P(6,0,7)[0]-140)}" y="${f(C.P(6,0,7)[1])}" width="120" height="300" fill="#5ff0ff" opacity=".2"/>`);
 const fg=blurG(10,lamp(C,4.2,2.6,true));
 return {C,bg,fg,spots:[[-4.4,5.2],[-3.9,6.2],[-6.6,13]],rim:'#ff8ad8',cast:[1,.16],grade:['#ff8ad8',.65,'#2a1a5a']};};

SETS.parkSunset=()=>{const C=Cam({vx:960,PH:470});const g=id('sky');let bg=`<defs><linearGradient id="${g}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff8a6a"/><stop offset="1" stop-color="#ffd8a0"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#${g})"/>`;
 bg+=`<circle cx="1380" cy="${f(C.Hz-40)}" r="110" fill="#fff0c0"/>`+glow(1380,C.Hz-40,560,'#ffe0a0',.6);
 bg+=blurG(3,`<path d="M0,${f(C.Hz+10)} C300,${f(C.Hz-70)} 600,${f(C.Hz-20)} 900,${f(C.Hz-50)} C1200,${f(C.Hz-90)} 1500,${f(C.Hz-20)} 1920,${f(C.Hz-60)} L1920,${f(C.Hz+40)} L0,${f(C.Hz+40)}Z" fill="#b86a7a"/>`);
 bg+=ground(C,'#6aa86a',1,80);
 for(let i=0;i<60;i++){const X=(rnd()-.5)*30,Z=3+rnd()*30;const [x,y]=C.P(X,0,Z);bg+=`<path d="M${f(x)},${f(y)} l${f(-3*C.k(Z))},${f(-10*C.k(Z))} M${f(x)},${f(y)} l${f(3*C.k(Z))},${f(-12*C.k(Z))}" stroke="#4a8a4a" stroke-width="2"/>`;}
 // curved path
 let path=[];for(let z=1;z<=40;z+=.5){path.push([Math.sin(z*.18)*1.6-.6,z]);}
 bg+=poly([...path.map(([x,z])=>C.P(x-1,0,z)),...path.reverse().map(([x,z])=>C.P(x+1,0,z))],'#e8c890','#c8a870',2);
 // pond
 bg+=`<ellipse cx="${f(C.P(6,0,16)[0])}" cy="${f(C.P(6,0,16)[1])}" rx="${f(4*C.U*C.k(16))}" ry="${f(.9*C.U*C.k(16))}" fill="#7ab0d8" stroke="${L}" stroke-width="2"/>`;
 const trees=[[-6,10,1.3],[-4.5,18,1.2],[5,9,1.2],[7,22,1.1],[-9,26,1.2],[2,30,1]];
 bg+=trees.sort((a,b)=>b[1]-a[1]).map(t=>tree(C,...t)).join('');
 bg+=box(C,{x0:2.4,x1:4.0,y0:.42,y1:.5,z0:6.6,z1:7.0},{front:'#8a5a3a'})+box(C,{x0:2.4,x1:4.0,y0:.6,y1:.9,z0:7.0,z1:7.06},{front:'#8a5a3a'},{noAO:1})+box(C,{x0:2.5,x1:2.6,y0:0,y1:.42,z0:6.7,z1:6.9},{front:'#3a3a40'},{noAO:1})+box(C,{x0:3.8,x1:3.9,y0:0,y1:.42,z0:6.7,z1:6.9},{front:'#3a3a40'},{noAO:1});
 bg+=lamp(C,-2.4,8,true);
 bg+=dust([[600,300],[1800,300],[1800,800],[600,800]],50,'#fff0c0');
 const fg=blurG(10,tree(C,-3.6,2.2,1.1));
 return {C,bg,fg,spots:[[-.8,4.8],[.4,5.2]],rim:'#ffc080',cast:[-1.8,.3],grade:['#ffd0a0',.5,'#ff7a4a']};};

module.exports={SETS,room,winBack,winSide,poster,door,shelf,clock,plantProp,beamFromWindow,ground,bldg,tree,lamp};
