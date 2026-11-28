// Detailed locations, batch 3: streets, nature, sport (standard: references/detail.md)
const S=require('./stage.js');const Dt=require('./detail.js');const D2=require('./detail2.js');const D3=require('./detail3.js');const D4=require('./detail4.js');
const {PL}=D2;const {crowdReal}=require('./crowd.js');const L6={};const cam=(PH=470,vx=960)=>S.Cam({vx,PH});
const glowAt=(C,X,Y,Z,r,c,a)=>{const [x,y]=C.P(X,Y,Z);return S.glow(x,y,r*C.k(Z)*C.U,c,a);};

// shared suburban street: day / night / snow
function street(C,{night=false,snow=false,wet=false,seed=1}={}){Dt.srand(seed);let bg='';
 bg+=night?D2.nightSky(C,{moon:[1500,120]}):Dt.sky(C,{top:snow?'#b8c8dc':'#69b0ec',bottom:snow?'#eef2f8':'#fdeccf',sun:snow?null:[380,160],clouds:snow?3:6,cloudCol:snow?'#e8eef6':'#ffffff'});
 bg+=Dt.hills(C,night?[['#2a3050',.06,50],['#222844',.1,34]]:snow?[['#dde6f0',.06,50],['#c8d4e2',.1,34]]:[['#b5cdd2',.06,50],['#9cbfa6',.1,34]]);
 const gr=snow?{near:'#eef2f8',far:'#dfe6ef',tufts:0,flowers:0}:night?{near:'#2e4a30',far:'#3a4a48',tufts:180,flowers:0}:{tufts:180,flowers:30};
 bg+=Dt.grass(C,-60,-5.6,1,90,gr)+Dt.grass(C,5.6,60,1,90,gr);
 bg+=Dt.road(C,-3.6,3.6,1,140,{lanes:2,col:night||wet?'#3a3a44':snow?'#6a6e78':'#5a5b63'});
 bg+=Dt.curb(C,-3.6,1,140,-1)+Dt.curb(C,3.6,1,140,1)+Dt.sidewalk(C,-5.6,-3.85,1,140,{col:snow?'#eef2f8':'#d8d2c6'})+Dt.sidewalk(C,3.85,5.6,1,140,{col:snow?'#eef2f8':'#d8d2c6'});
 if(snow){for(const [a,b] of [[-3.6,-2.2],[2.2,3.6]])bg+=D2.quad?S.poly(D2.quad(C,PL.floor(.01),a,b,1,140),'#f2f5fa','none',0,'opacity=".85"'):'';}
 bg+=Dt.poles(C,6.3,[110,70,45,30]);
 for(const [z,col,roof,door,sd] of [[62,'#d8e0e8','#5a5a6a','#a83a3a',5],[40,'#f0dcc0','#7a4a3e','#3a6a5a',4],[24,'#cfe0d0','#6a4a3a','#8a3a5a',3]]){bg+=Dt.house(C,-10.5,z,z+9,{side:-1,col,roof,door,seedH:sd,lit:night,snow});bg+=Dt.house(C,10.5,z+4,z+13,{side:1,col:col==='#d8e0e8'?'#f2e2cc':'#d8e4f0',roof,door,seedH:sd+10,lit:night,snow});}
 for(const z of [70,50,32,18]){bg+=snow?D4.pine(C,-7.6,z,{h:6,snow:true})+D4.pine(C,7.6,z+6,{h:6,snow:true}):Dt.tree(C,-7.6,z,{h:6.5,crown:night?['#1e3a24','#2a4a30','#3a5a3a']:undefined})+Dt.tree(C,7.6,z+6,{h:6.5,crown:night?['#1e3a24','#2a4a30','#3a5a3a']:undefined});}
 bg+=Dt.lamp(C,-4.9,26,{on:night})+Dt.lamp(C,-4.9,52,{on:night})+Dt.lamp(C,4.9,40,{on:night});
 if(night)for(const z of [26,52])bg+=glowAt(C,-4.1,0,z,2.5,'#ffe8a0',.25);
 return bg;}
L6.nightSuburb=()=>{const C=cam(470);let bg=street(C,{night:true,seed:3});bg+=Dt.carRear(C,1.8,30,{col:'#e2b040'}).replace(/#e5262d/g,'#ff2a2a')+glowAt(C,1.3,.75,30,.6,'#ff3a3a',.7)+glowAt(C,2.3,.75,30,.6,'#ff3a3a',.7);
 bg+=Dt.mailbox(C,-6.2,12)+Dt.bush(C,-7.5,10,{w:1.6,col:['#1e3a24','#2a4a30','#3a5a3a']})+Dt.hydrant(C,4.4,8)+Dt.trashBin(C,-4.6,7);
 return {C,bg,fg:'',spots:[[-4.6,6],[4.6,6.2]],rim:'#8ab0ff',cast:[1,.16],grade:['#8ab0ff',.45,'#1a1a4a'],amb:'ambNight'};};
L6.snowStreet=()=>{const C=cam(470);let bg=street(C,{snow:true,seed:7});bg+=D4.snowman(C,-6.8,9)+Dt.carRear(C,-1.8,24,{col:'#c8303a'})+Dt.mailbox(C,6.3,12)+D4.snowfall(260);
 return {C,bg,fg:'',spots:[[-4.6,6],[4.6,6.2]],rim:'#e8f0ff',cast:[1,.12],grade:['#e8f0ff',.4],amb:'ambStreet'};};
L6.rainyNight=()=>{const C=cam(470);Dt.srand(19);let bg=D2.nightSky(C,{top:'#141a2a',bottom:'#2a3448',stars:0,moon:null});
 bg+=Dt.road(C,-4,4,1,140,{lanes:2,col:'#2a2c34'})+Dt.curb(C,-4,1,140,-1)+Dt.curb(C,4,1,140,1)+Dt.sidewalk(C,-7,-4.25,1,140,{col:'#4a4e58'})+Dt.sidewalk(C,4.25,7,1,140,{col:'#4a4e58'});
 bg+=D4.facadeSide(C,-7,1,80,{h:14,col:'#5a4a50',lit:true,shop:{name:'DINER',col:'#2a2a34'},awning:'#3a6ab0'})+D4.facadeSide(C,7,1,80,{h:16,col:'#4a4a5a',lit:true,shop:{name:'BOOKS',col:'#2a2a34'},awning:'#8a2a3a'});
 for(const z of [12,30,55])bg+=Dt.lamp(C,-5.2,z,{on:true})+glowAt(C,-4.3,0,z,3,'#ffd890',.3);
 for(let i=0;i<14;i++){const z=Dt.R(4,40),x=Dt.R(-3.6,3.6);const [px,py]=C.P(x,0,z),k=C.k(z)*C.U;bg+=`<ellipse cx="${px}" cy="${py}" rx="${Dt.R(.4,1.2)*k}" ry="${Dt.R(.04,.1)*k}" fill="${['#ffd890','#ff5a5a','#8ab0ff'][i%3]}" opacity=".35"/>`;}
 bg+=Dt.carRear(C,-1.9,20,{col:'#3a5a8a'})+glowAt(C,-2.6,.75,20,.8,'#ff3a3a',.7)+glowAt(C,-1.2,.75,20,.8,'#ff3a3a',.7)+D2.puddle(C,1.5,7,{w:2.2,col:'#ffd890',col2:'#ff5a5a'})+D2.puddle(C,-2,11,{w:1.6,col:'#8ab0ff',col2:'#ffd890'});
 bg+=D4.trafficLight(C,4.6,14,{on:'red'})+D4.rain(320);
 return {C,bg,fg:'',spots:[[-.6,6],[.7,6.2]],rim:'#8ab0ff',cast:[1,.16],grade:['#8ab0ff',.45,'#101a3a'],amb:'ambRain'};};
L6.streetDay=()=>{const C=cam(470);Dt.srand(29);let bg=Dt.sky(C,{sun:[1500,140],clouds:5});
 bg+=Dt.road(C,-4,4,1,140,{lanes:2})+Dt.curb(C,-4,1,140,-1)+Dt.curb(C,4,1,140,1)+Dt.sidewalk(C,-7,-4.25,1,140)+Dt.sidewalk(C,4.25,7,1,140);
 bg+=D4.facadeSide(C,-7,1,40,{h:14,col:'#c88a6a',shop:{name:'CAFE',col:'#3a3a48'},awning:'#3a8a5a'})+D4.facadeSide(C,-7,40,90,{h:18,col:'#d8c8a8',shop:{name:'BANK',col:'#3a3a48'},awning:'#3a6ab0'})+D4.facadeSide(C,7,1,45,{h:16,col:'#a8b8c8',shop:{name:'SHOP',col:'#3a3a48'},awning:'#e5262d'})+D4.facadeSide(C,7,45,90,{h:20,col:'#c8a888',shop:{name:'PIZZA',col:'#3a3a48'},awning:'#e8a030'});
 bg+=D4.crosswalk(C,-4,4,10,13)+D4.trafficLight(C,4.8,13.5,{on:'green'})+D4.trafficLight(C,-4.8,13.5,{on:'green'});
 for(const z of [20,42])bg+=Dt.tree(C,-5.4,z,{h:6})+Dt.tree(C,5.4,z+8,{h:6});
 bg+=Dt.carRear(C,1.9,26,{col:'#e2b040'})+Dt.carRear(C,-1.9,40,{col:'#3a6ab0'})+Dt.hydrant(C,4.7,7)+Dt.trashBin(C,-4.8,8)+Dt.lamp(C,-5.3,18)+D4.bench2(C,5.8,9,{w:1.4}).slice(0,0);
 bg+=crowdReal(C,-6.6,-4.6,9,30,7,{rim:'#ffd59a'})+crowdReal(C,4.6,6.6,9,30,7,{rim:'#ffd59a'});
 return {C,bg,fg:'',spots:[[-.6,6],[.7,6.2]],rim:'#ffd59a',cast:[-1,.2],grade:['#fff0d8',.4],amb:'ambStreet'};};
L6.cityNight=()=>{const C=cam(470);Dt.srand(39);let bg=D2.nightSky(C,{top:'#0a0c24',bottom:'#3a2a5a',moon:[300,110]})+D2.skyline(C,{n:20,col:'#1e1c3a',base:C.Hz+10});
 bg+=Dt.road(C,-4,4,1,140,{lanes:2,col:'#2e2e38'})+Dt.curb(C,-4,1,140,-1)+Dt.curb(C,4,1,140,1)+Dt.sidewalk(C,-7,-4.25,1,140,{col:'#4a4a56'})+Dt.sidewalk(C,4.25,7,1,140,{col:'#4a4a56'});
 bg+=D4.facadeSide(C,-7,1,90,{h:30,col:'#4a3a4a',lit:true,shop:{name:'CAFE',col:'#2a2230'},awning:'#c83a8a'})+D4.facadeSide(C,7,1,90,{h:34,col:'#3a3a52',lit:true,shop:{name:'24/7',col:'#2a2230'},awning:'#3a8af0'});
 bg+=D2.neon(C,-6.95,4.6,10,'OPEN',{col:'#ff3fa0',size:.5,plane:'side',side:1})+D2.neon(C,6.95,4.8,16,'HOTEL',{col:'#5ab0ff',size:.6,plane:'side',side:-1});
 for(const z of [10,28,50])bg+=Dt.lamp(C,-5.3,z,{on:true})+glowAt(C,-4.4,0,z,3,'#ffd890',.3);
 bg+=Dt.carRear(C,1.9,22,{col:'#c8303a'})+glowAt(C,1.2,.75,22,.8,'#ff3a3a',.7)+glowAt(C,2.6,.75,22,.8,'#ff3a3a',.7)+Dt.carRear(C,-1.9,45,{col:'#e8e4dc'});
 bg+=crowdReal(C,-6.6,-4.6,8,30,6,{rim:'#ff7ac0'})+crowdReal(C,4.6,6.6,8,30,6,{rim:'#8ab0ff'});
 return {C,bg,fg:'',spots:[[-.6,6],[.7,6.2]],rim:'#ff7ac0',cast:[1,.16],grade:['#8ab0ff',.45,'#1a1a4a'],amb:'ambNight'};};
L6.busStop=()=>{const C=cam(470);let bg=street(C,{seed:11});bg+=D4.busShelter(C,-6.6,7.5);
 bg+=Dt.trashBin(C,-4.6,6.4)+Dt.hydrant(C,4.4,8)+Dt.carRear(C,1.8,34,{col:'#e2b040'});return {C,bg,fg:'',spots:[[-4.4,6],[-3.2,6.2]],rim:'#ffd9a0',cast:[1,.22],grade:['#fff0d8',.42],amb:'ambStreet'};};
L6.parkingLot=()=>{const C=cam(470);Dt.srand(49);let bg=Dt.sky(C,{sun:[1500,160],clouds:5})+D4.facadeSide(C,-30,10,90,{h:12,col:'#b8b0a0'}).slice(0,0);
 bg+=Dt.hills(C,[['#b5cdd2',.06,50]]);bg+=D2.concrete(C,PL.back(40),-30,30,0,8,{col:'#c8c4b8',panel:3})+S.poly(D2.quad(C,PL.back(39.9),-20,20,1,2.5),'#3a3a48','none',0)+D4.txtAt(C,0,6,39.8,'IYA MALL',{size:1.4,col:'#e5262d'});
 for(let x=-24;x<24;x+=3.2)bg+=S.poly(D2.quad(C,PL.back(39.8),x,x+2.2,3,5.4),'#a8c8dc','#555',1.4);
 bg+=Dt.road(C,-30,30,1,40,{lanes:1,col:'#55565e'}).replace(/#ece8dc|#f2c43a/g,'#55565e');
 for(let X=-12;X<=12;X+=2.6){for(const z0 of [8,22])bg+=S.poly(D2.quad(C,PL.floor(.002),X-.06,X+.06,z0,z0+5),'#f2eee4','none',0);}
 bg+=S.poly(D2.quad(C,PL.floor(.002),-12,12,14,14.12),'#f2eee4','none',0);
 const cols=['#c8303a','#3a6ab0','#e8e4dc','#2a2a30','#e2b040','#3a8a5a'];let i=0;for(const z of [27,13])for(let X=-10.7;X<=10.7;X+=2.6){if(Dt.rnd()<.25){i++;continue;}bg+=Dt.carRear(C,X,z,{col:cols[i++%cols.length]});}
 for(const x of [-8,8])bg+=Dt.lamp(C,x,18,{h:6})+Dt.lamp(C,x,34,{h:6});bg+=Dt.trashBin(C,-3,6)+D2.puddle(C,2,7,{w:1.6,col:'#9ec4e6',col2:'#cfe2f0'});
 return {C,bg,fg:'',spots:[[-.6,5],[.7,5.2]],rim:'#ffd9a0',cast:[-1,.2],grade:['#fff0d8',.42],amb:'ambStreet'};};
L6.gasStation=()=>{const C=cam(470);Dt.srand(59);let bg=Dt.sky(C,{top:'#2a3a7a',bottom:'#f8a86a',sun:[1600,520],clouds:4,cloudCol:'#ffc8a0'});
 bg+=Dt.hills(C,[['#6a5a7a',.06,50],['#5a4a6a',.1,34]],{trees:false});bg+=Dt.grass(C,-60,60,1,90,{near:'#5a7a3a',far:'#8a8a5a',tufts:120,flowers:0});
 bg+=Dt.road(C,-40,40,24,34,{lanes:2}).replace(/#f2c43a/g,'#f2c43a');bg+=Dt.dirt(C,-12,12,1,24,{col:'#7a7a80',ruts:false});
 // store
 bg+=S.box(C,{x0:-6,x1:6,y0:0,y1:3.6,z0:18,z1:23},{front:'#e8e0d0'})+S.poly(D2.quad(C,PL.back(17.99),-5.5,5.5,.2,2.6),'#ffe8b0','#2a2a30',2)+D4.txtAt(C,0,3.05,17.98,'MINI MART',{size:.45,col:'#e5262d'});
 for(let x=-5;x<5.4;x+=1.4)bg+=S.poly(D2.quad(C,PL.back(17.98),x,x+.05,.2,2.6),'#2a2a30','none',0);bg+=glowAt(C,0,1.4,17.9,5,'#ffe8b0',.3);
 bg+=D4.canopy(C,-6,6,8,14,{h:4.6})+D4.gasPump(C,-2.5,10.5)+D4.gasPump(C,2.5,10.5)+Dt.car(C,-.2,11.6,{col:'#3a6ab0',dir:1});
 {const [x,y]=C.P(9,0,12),k=C.k(12)*C.U;bg+=`<rect x="${x-.08*k}" y="${y-6*k}" width="${.16*k}" height="${6*k}" fill="#5a5e66"/><rect x="${x-1.1*k}" y="${y-7.8*k}" width="${2.2*k}" height="${2*k}" rx="6" fill="#1e1a2e" stroke="#e5262d" stroke-width="3"/><text x="${x}" y="${y-7*k}" text-anchor="middle" font-family="DejaVu Sans Mono" font-weight="bold" font-size="${.55*k}" fill="#ffd24a">3.49</text><text x="${x}" y="${y-6.25*k}" text-anchor="middle" font-family="DejaVu Sans Mono" font-weight="bold" font-size="${.55*k}" fill="#3aff8a">3.89</text>`;}
 bg+=D2.puddle(C,1,6,{w:1.4,col:'#2a2a30',col2:'#8a5aa0'})+Dt.trashBin(C,-4.5,8)+Dt.tree(C,-12,20,{h:6})+Dt.tree(C,13,26,{h:6});
 return {C,bg,fg:'',spots:[[-.6,6],[.7,6.2]],rim:'#ffb07a',cast:[-1,.24],grade:['#ffc890',.42,'#3a1a3a'],amb:'ambStreet'};};
L6.moon=()=>{const C=cam(470);Dt.srand(69);let bg=D2.nightSky(C,{top:'#02030a',bottom:'#0a0c1a',stars:420,moon:null,clouds:false});
 {const ex=1450,ey=190;bg+=S.glow(ex,ey,220,'#6ab0ff',.4)+`<circle cx="${ex}" cy="${ey}" r="110" fill="#2a6ab0"/><path d="M${ex-60},${ey-50} q40,-20 60,10 q20,30 -10,50 q-40,10 -50,-20Z M${ex+20},${ey+20} q40,-10 50,20 q-10,40 -40,30Z" fill="#3a9a5a"/><path d="M${ex-90},${ey+10} q60,-30 140,-10" stroke="#fff" stroke-width="10" opacity=".55" fill="none"/><circle cx="${ex+40}" cy="${ey+40}" r="110" fill="#000" opacity=".35" transform="translate(-40,-40)" clip-path="none"/>`;}
 const q=D2.quad(C,PL.floor(0),-60,60,1,120);bg+=Dt.groundGrad(C,[[-60,0,1],[60,0,1],[60,0,120],[-60,0,120]],'#a8a8b0','#6a6a72')+Dt.noise('M'+q.map(p=>p.join(',')).join(' L')+'Z',{freq:.06,oct:3,op:.25})+Dt.noise('M'+q.map(p=>p.join(',')).join(' L')+'Z',{freq:.9,oct:2,op:.18});
 for(const [x,z,r] of [[-6,24,3],[8,40,5],[-14,60,6],[3,14,1.4],[-3,9,.9],[12,18,2],[20,70,8]])bg+=D4.crater(C,x,z,{r});
 for(let i=0;i<70;i++)bg+=D4.crater(C,Dt.R(-20,20),Dt.R(3,60),{r:Dt.R(.2,.9)});
 for(let i=0;i<500;i++){const [x,y]=C.P(Dt.R(-25,25),0,1+Math.pow(Dt.rnd(),1.5)*40),k=C.k(6);bg+=`<circle cx="${x}" cy="${y}" r="${Dt.R(.6,2.2)}" fill="${Dt.rnd()<.5?'#5a5a62':'#c8c8d0'}" opacity=".6"/>`;}
 for(let i=0;i<30;i++)bg+=D4.rock(C,Dt.R(-12,12),Dt.R(3,30),{s:Dt.R(.2,.6),col:'#8a8a92'});
 // lander + flag + footprints
 {const [x,y]=C.P(5,0,16),k=C.k(16)*C.U;bg+=`<path d="M${x-1.4*k},${y} L${x-.8*k},${y-1.2*k} M${x+1.4*k},${y} L${x+.8*k},${y-1.2*k}" stroke="#c8ccd4" stroke-width="${.08*k}"/><rect x="${x-1*k}" y="${y-2*k}" width="${2*k}" height="${1*k}" fill="#e8c040" stroke="#1a1a20" stroke-width="2"/><path d="M${x-.8*k},${y-2*k} L${x-.6*k},${y-3*k} L${x+.6*k},${y-3*k} L${x+.8*k},${y-2*k}Z" fill="#c8ccd4" stroke="#1a1a20" stroke-width="2"/><rect x="${x-.25*k}" y="${y-2.7*k}" width="${.5*k}" height="${.35*k}" fill="#2a3a5a"/><path d="M${x},${y-3*k} l0,${-.6*k}" stroke="#c8ccd4" stroke-width="2"/><circle cx="${x}" cy="${y-3.65*k}" r="${.12*k}" fill="#c8ccd4"/>`;}
 {const [x,y]=C.P(-2.5,0,10),k=C.k(10)*C.U;bg+=`<path d="M${x},${y} L${x},${y-1.8*k}" stroke="#d8d8e0" stroke-width="3"/><rect x="${x}" y="${y-1.8*k}" width="${.9*k}" height="${.55*k}" fill="#3a6ab0"/>`+[0,1,2,3].map(i=>`<rect x="${x}" y="${y-(1.8-.14*i)*k}" width="${.9*k}" height="${.07*k}" fill="${i%2?'#fff':'#e5262d'}"/>`).join('')+`<rect x="${x}" y="${y-1.8*k}" width="${.35*k}" height="${.28*k}" fill="#2a4a8a"/>`;}
 for(let i=0;i<10;i++){const [x,y]=C.P(-1+i*.18*(i%2?1:-1)*.2+i*.05,0,4+i*.7),k=C.k(4+i*.7)*C.U;bg+=`<ellipse cx="${x+(i%2?.12:-.12)*k}" cy="${y}" rx="${.08*k}" ry="${.03*k}" fill="#5a5a62"/>`;}
 return {C,bg,fg:'',spots:[[-.6,6],[.7,6.2]],rim:'#c8d8ff',cast:[1,.25],grade:['#c8d8ff',.4,'#0a0a2a'],amb:'ambNight'};};
L6.forest=()=>{const C=cam(470);Dt.srand(79);let bg=Dt.sky(C,{top:'#8ac0d8',bottom:'#e8f0d8',sun:[1300,120],clouds:2});
 bg+=Dt.hills(C,[['#8aa890',.08,50],['#6a9070',.12,34]]);bg+=Dt.grass(C,-60,60,1,90,{near:'#5a8a3a',far:'#8aa870',tufts:700,flowers:40});bg+=Dt.dirt(C,-1,1,1,40,{col:'#8a6a48'});
 const trees=[];for(let i=0;i<46;i++){const z=Dt.R(6,60),x=(Dt.rnd()<.5?-1:1)*Dt.R(1.8,22);trees.push([x,z]);}trees.sort((a,b)=>b[1]-a[1]);
 for(const [x,z] of trees){const fog=Math.min(.6,(z-6)/80);const t=Dt.rnd()<.4?D4.pine(C,x,z,{h:Dt.R(7,11),col:'#2e5a3a'}):Dt.tree(C,x,z,{h:Dt.R(7,10),crown:['#2e6a34','#3e8a42','#6ab05a']});bg+=t+(fog>.05?`<g opacity="${fog}">${S.poly(D2.quad(C,PL.back(z-.1),x-4,x+4,0,10),'#d8e8d8','none',0)}</g>`.replace(/<g opacity="[^"]*">.*<\/g>/,''):'');}
 for(let i=0;i<6;i++){const a=C.P(-8+i*4,12,30),b=C.P(-12+i*5,0,6);bg+=`<path d="M${a[0]-20},${a[1]} L${a[0]+20},${a[1]} L${b[0]+120},${b[1]} L${b[0]-60},${b[1]}Z" fill="#fff8d0" opacity=".08"/>`;}
 bg+=D4.log(C,-3.4,7,{l:2.4})+D4.mushroom(C,-2.2,6.6)+D4.mushroom(C,-2,6.9)+D4.fern(C,2.6,6)+D4.fern(C,-4.6,5.4)+D4.fern(C,3.6,8)+D4.rock(C,3,5.2,{s:.8})+Dt.bush(C,4.6,6.5,{w:1.6})+Dt.bush(C,-5.6,9,{w:1.8});
 return {C,bg,fg:'',spots:[[-.6,5],[.7,5.2]],rim:'#ffe8a0',cast:[1,.2],grade:['#f0ffd8',.42],amb:'ambNature'};};
L6.mountains=()=>{const C=cam(470);Dt.srand(89);let bg=Dt.sky(C,{top:'#4a90d8',bottom:'#e8f0f8',sun:[1500,130],clouds:5});
 bg+=D4.mountains(C);bg+=Dt.grass(C,-60,60,1,90,{near:'#6a9a48',far:'#9ab878',tufts:600,flowers:120});bg+=Dt.dirt(C,-.9,.9,1,40,{col:'#a88a60'});
 for(const [x,z] of [[-9,40],[-6,28],[-12,22],[8,34],[11,24],[14,46],[-16,50],[6,50]])bg+=D4.pine(C,x,z,{h:Dt.R(6,9)});
 bg+=D3.sea(C,4,26,30,44,{near:'#4a8ab0',far:'#8ac0d8'}).slice(0,0);bg+=D4.rock(C,-3,7,{s:1.2})+D4.rock(C,3.4,9,{s:.9})+D4.rock(C,2.6,6,{s:.5})+D4.fern(C,-4.2,6);
 {const [x,y]=C.P(-2.6,0,12),k=C.k(12)*C.U;bg+=`<rect x="${x-.05*k}" y="${y-1.4*k}" width="${.1*k}" height="${1.4*k}" fill="#6a4a2a"/><path d="M${x},${y-1.3*k} l${1*k},${.05*k} l${-.1*k},${.25*k} l${-.9*k},0Z" fill="#c8a060" stroke="#2a1a10" stroke-width="1.4"/><text x="${x+.45*k}" y="${y-1.13*k}" text-anchor="middle" font-family="DejaVu Sans" font-weight="bold" font-size="${.14*k}" fill="#2a1a10">PEAK 3km</text>`;}
 return {C,bg,fg:'',spots:[[-.6,5],[.7,5.2]],rim:'#ffe8c0',cast:[-1,.2],grade:['#f0f8ff',.4],amb:'ambNature'};};
L6.desert=()=>{const C=cam(470);Dt.srand(99);let bg=Dt.sky(C,{top:'#5aa0e0',bottom:'#ffe8c0',sun:[1450,130],clouds:1});
 {const base=C.Hz+4;for(const [x0,w,h] of [[-80,520,240],[900,400,180],[1400,560,260]]){bg+=`<path d="M${x0},${base} L${x0+w*.1},${base-h} L${x0+w*.9},${base-h} L${x0+w},${base}Z" fill="#c87a4a" stroke="#8a4a2a" stroke-width="1.4"/><path d="M${x0+w*.1},${base-h} L${x0+w*.9},${base-h} L${x0+w*.88},${base-h+14} L${x0+w*.12},${base-h+14}Z" fill="#e89a6a"/>`;for(let i=1;i<5;i++)bg+=`<path d="M${x0+w*.1-i*4},${base-h+i*h/5} L${x0+w*.9+i*4},${base-h+i*h/5}" stroke="#a85a3a" stroke-width="2" opacity=".6"/>`;}}
 bg+=D4.dunes(C);for(const [x,z] of [[-5,9],[6,14],[-9,22],[10,30],[2,40]])bg+=D4.cactus(C,x,z,{h:Dt.R(1.8,3)});
 for(let i=0;i<30;i++)bg+=D4.rock(C,Dt.R(-12,12),Dt.R(3,30),{s:Dt.R(.2,.8),col:'#b8805a'});for(let i=0;i<300;i++){const [x,y]=C.P(Dt.R(-14,14),0,1+Math.pow(Dt.rnd(),1.6)*30);bg+=`<circle cx="${x}" cy="${y}" r="${Dt.R(.6,1.8)}" fill="${Dt.rnd()<.5?'#c89a60':'#fff0c8'}" opacity=".6"/>`;}
 {const [x,y]=C.P(2.4,0,6),k=C.k(6)*C.U;bg+=`<ellipse cx="${x}" cy="${y-.12*k}" rx="${.25*k}" ry="${.15*k}" fill="#f2ecd8" stroke="#3a2a1a" stroke-width="1.4"/><circle cx="${x-.08*k}" cy="${y-.15*k}" r="${.05*k}" fill="#3a2a1a"/><circle cx="${x+.08*k}" cy="${y-.15*k}" r="${.05*k}" fill="#3a2a1a"/><path d="M${x-.25*k},${y-.2*k} q${-.3*k},${-.3*k} ${-.4*k},${-.05*k} M${x+.25*k},${y-.2*k} q${.3*k},${-.3*k} ${.4*k},${-.05*k}" stroke="#f2ecd8" stroke-width="${.05*k}" fill="none"/>`;}
 {let tw='';for(let i=0;i<3;i++){const [x,y]=C.P(-2+i*2,0,9+i*3),k=C.k(9)*C.U;tw+=`<circle cx="${x}" cy="${y-.3*k}" r="${.3*k}" fill="none" stroke="#a88a5a" stroke-width="2" opacity=".7"/>`;}bg+=tw;}
 return {C,bg,fg:'',spots:[[-.6,5],[.7,5.2]],rim:'#ffd090',cast:[-1,.25],grade:['#fff0c8',.42],amb:'ambNature'};};
L6.beach=()=>{const C=cam(470);Dt.srand(109);let bg=Dt.sky(C,{top:'#4aa8e8',bottom:'#e8f6ff',sun:[1500,130],clouds:4});
 bg+=D3.sea(C,-80,80,14,140,{near:'#2a8ab8',far:'#8ad0e8',sun:6});
 {for(let i=0;i<3;i++){const z=12+i*.6,a=C.P(-80,0,z),b=C.P(80,0,z);bg+=`<path d="M${a[0]},${a[1]} ${Array.from({length:30},(_,j)=>`Q${a[0]+(b[0]-a[0])*(j+.5)/30},${a[1]+(j%2?6:-6)} ${a[0]+(b[0]-a[0])*(j+1)/30},${a[1]}`).join(' ')}" stroke="#fff" stroke-width="${4-i}" fill="none" opacity="${.9-i*.25}"/>`;}}
 bg+=Dt.groundGrad(C,[[-80,0,1],[80,0,1],[80,0,12],[-80,0,12]],'#e8c890','#f2dcb0')+Dt.noise('M'+D2.quad(C,PL.floor(0),-80,80,1,12).map(p=>p.join(',')).join(' L')+'Z',{freq:.7,oct:2,op:.2});
 bg+=S.poly(D2.quad(C,PL.floor(.001),-80,80,10,12),'#c8a870','none',0,'opacity=".55"');
 for(let i=0;i<60;i++){const [x,y]=C.P(Dt.R(-10,10),0,Dt.R(2,11)),k=C.k(6);bg+=`<ellipse cx="${x}" cy="${y}" rx="${Dt.R(2,5)*k*2}" ry="${Dt.R(1,2)*k*2}" fill="${['#f6f0e0','#e8a0a0','#c8a070'][i%3]}" opacity=".7"/>`;}
 bg+=D4.palm(C,-7,9,{h:6.5})+D4.palm(C,8,11,{h:7})+D4.palm(C,-10,13,{h:6});
 {for(const [x,z,c] of [[-3,7,'#e5262d'],[4,8,'#3a8af0']]){const [px,py]=C.P(x,0,z),t=C.P(x,2.3,z),k=C.k(z)*C.U;bg+=`<path d="M${px},${py} L${t[0]},${t[1]}" stroke="#f2f0ec" stroke-width="${.05*k}"/><path d="M${t[0]-1.2*k},${t[1]+.5*k} Q${t[0]},${t[1]-.3*k} ${t[0]+1.2*k},${t[1]+.5*k}Z" fill="${c}" stroke="#2a2030" stroke-width="1.6"/>`+[0,1,2].map(i=>`<path d="M${t[0]},${t[1]-.1*k} L${t[0]-1.2*k+i*1.2*k},${t[1]+.5*k}" stroke="#fff" stroke-width="2" opacity=".6"/>`).join('');bg+=S.poly(D2.quad(C,PL.floor(.01),x-.4,x+.6,z-1.2,z-.1),c==='#e5262d'?'#ffd24a':'#ff8ab0','#2a2030',1.2);}}
 {const [x,y]=C.P(1.5,0,5),k=C.k(5)*C.U;bg+=`<rect x="${x-.35*k}" y="${y-.25*k}" width="${.7*k}" height="${.25*k}" fill="#e8c890" stroke="#2a2030" stroke-width="1.2"/><rect x="${x-.2*k}" y="${y-.5*k}" width="${.4*k}" height="${.25*k}" fill="#e8c890" stroke="#2a2030" stroke-width="1.2"/><rect x="${x-.08*k}" y="${y-.7*k}" width="${.16*k}" height="${.2*k}" fill="#e8c890" stroke="#2a2030" stroke-width="1.2"/><path d="M${x},${y-.7*k} l0,${-.25*k} l${.15*k},${.06*k} l${-.15*k},${.06*k}" fill="#e5262d" stroke="#2a2030" stroke-width="1"/>`;}
 {const [x,y]=C.P(10,0,18),k=C.k(18)*C.U;bg+=`<path d="M${x-.6*k},${y} L${x-.4*k},${y-2.4*k} M${x+.6*k},${y} L${x+.4*k},${y-2.4*k}" stroke="#f2f0ec" stroke-width="${.12*k}"/><rect x="${x-.7*k}" y="${y-3.4*k}" width="${1.4*k}" height="${1*k}" fill="#e5262d" stroke="#2a2030" stroke-width="2"/><path d="M${x-.9*k},${y-3.4*k} L${x},${y-4*k} L${x+.9*k},${y-3.4*k}Z" fill="#f2f0ec" stroke="#2a2030" stroke-width="2"/>`;}
 for(let i=0;i<4;i++)bg+=D3.gull(C,Dt.R(-8,8),Dt.R(7,10),Dt.R(20,40));
 return {C,bg,fg:'',spots:[[-.6,5],[.7,5.2]],rim:'#fff0c8',cast:[-1,.22],grade:['#fff8e0',.38],amb:'ambNature'};};
L6.parkSunset=()=>{const C=cam(470);Dt.srand(119);let bg=Dt.sky(C,{top:'#4a5aa8',bottom:'#ffb07a',sun:[960,C.Hz-40],clouds:5,cloudCol:'#ffc8a8'});
 bg+=Dt.hills(C,[['#8a6a8a',.06,50],['#6a6a7a',.1,34]]);bg+=Dt.grass(C,-60,60,1,90,{near:'#5a8a3a',far:'#a8a070',tufts:500,flowers:60});
 bg+=Dt.dirt(C,-1.1,1.1,1,50,{col:'#c8a878',ruts:false})+D4.pond(C,7,12,{w:7,d:4});
 for(const [x,z,h] of [[-8,20,7],[-12,34,8],[9,30,7],[13,46,8],[-5,48,6],[4,56,6]])bg+=Dt.tree(C,x,z,{h,crown:['#3a6a3a','#5a8a44','#a8b060']});
 for(const z of [10,22,38])bg+=Dt.lamp(C,-2,z,{on:true,h:4});bg+=D4.bench2(C,-3.2,8.5)+D4.bench2(C,3.2,16)+Dt.trashBin(C,-2.6,11)+Dt.bush(C,-5,7,{w:1.6})+D4.fern(C,4.2,6)+Dt.sign(C,2,7).slice(0,0);
 for(let i=0;i<4;i++)bg+=D3.gull(C,Dt.R(-6,6),Dt.R(10,14),Dt.R(30,50));
 return {C,bg,fg:'',spots:[[-.6,5],[.7,5.2]],rim:'#ffb07a',cast:[1,.26],grade:['#ffc890',.42,'#3a1a2a'],amb:'ambNature'};};
L6.playground=()=>{const C=cam(470);Dt.srand(129);let bg=Dt.sky(C,{sun:[1500,140],clouds:5});bg+=Dt.hills(C);bg+=Dt.grass(C,-60,60,1,90,{tufts:500,flowers:60});
 bg+=Dt.dirt(C,-7,7,3,18,{col:'#c89a6a',ruts:false});for(let i=0;i<200;i++){const [x,y]=C.P(Dt.R(-7,7),0,Dt.R(3,18)),k=C.k(6);bg+=`<rect x="${x}" y="${y}" width="${Dt.R(3,8)*k*1.5}" height="${2*k}" fill="#8a5a3a" opacity=".6" transform="rotate(${Dt.R(0,180)} ${x} ${y})"/>`;}
 bg+=D4.swingSet(C,-3,12)+D4.slide(C,3.5,10)+D4.sandbox(C,-.5,6);
 {for(let i=0;i<4;i++){const z=14+i*.01;bg+=S.box(C,{x0:-1+i*.5,x1:-.6+i*.5,y0:0,y1:.6+i*.4,z0:z,z1:z+.4},{front:['#e5262d','#3a8af0','#ffd24a','#3ac06a'][i]});}}
 bg+=Dt.fenceX(C,20,-12,12,{step:1.5})+D4.bench2(C,-6,8)+Dt.trashBin(C,5.6,6)+Dt.tree(C,-9,16,{h:7})+Dt.tree(C,9,18,{h:7})+Dt.tree(C,-14,26,{h:8});
 bg+=D4.facadeSide(C,-30,30,60,{h:8}).slice(0,0)+Dt.house(C,-14,30,38,{seedH:2})+Dt.house(C,14,32,40,{side:1,seedH:9,col:'#e8d0d8'});
 return {C,bg,fg:'',spots:[[-.6,5],[.7,5.2]],rim:'#ffd9a0',cast:[-1,.22],grade:['#fff0d8',.4],amb:'ambNature'};};
L6.schoolYard=()=>{const C=cam(470);Dt.srand(139);let bg=Dt.sky(C,{sun:[1500,140],clouds:5});
 bg+=D2.brick(C,PL.back(22),-16,16,0,9,{col:'#b85a3a',mortar:'#8a3a2a',grime:.15,bh:.1,bw:.3});
 for(const y0 of [1.2,4.6])for(let x=-14;x<14;x+=2.4){if(y0<3&&Math.abs(x+.6)<1.6)continue;bg+=D2.windowBack(C,21.98,x+.6,y0,{w:1.5,h:2,frame:'#f2eee6',sky:['#a8d0e8','#e8f2f6']});}
 bg+=D2.door(C,21.97,0,{w:2,h:2.6,col:'#3a5a8a',frame:'#f2eee6'})+S.box(C,{x0:-1.6,x1:1.6,y0:2.8,y1:3.5,z0:21.5,z1:21.95},{front:'#f2eee6'},{noAO:1})+D4.txtAt(C,0,3,21.48,'IYA SCHOOL',{size:.4,col:'#2a3a6a'});
 {const [x,y]=C.P(6,0,16),k=C.k(16)*C.U;bg+=`<path d="M${x},${y} L${x},${y-8*k}" stroke="#c8ccd4" stroke-width="${.1*k}"/><path d="M${x},${y-8*k} q${.8*k},${.2*k} ${1.6*k},0 l0,${1*k} q${-.8*k},${.2*k} ${-1.6*k},0Z" fill="#3a5aa8" stroke="#2a2030" stroke-width="1.4"/>`;}
 bg+=Dt.road(C,-30,30,1,22,{lanes:1,col:'#6a6a72'}).replace(/#ece8dc|#f2c43a/g,'#6a6a72');
 for(let i=0;i<8;i++){const z=6+i*.6;bg+=S.poly(D2.quad(C,PL.floor(.002),-4.5+(i%2)*.3,-3.9+(i%2)*.3,z,z+.55),'none','#f6f2ec',2)+D4.txtAt(C,-4.2+(i%2)*.3,.01,z+.3,String(i+1),{size:.25,col:'#f6f2ec'});}
 for(let x=2;x<4.5;x+=.35)bg+=Dt.lamp?S.poly(D2.quad(C,PL.back(12),x,x+.04,0,.8),'#3a3a44','none',0):'';bg+=S.box(C,{x0:2,x1:4.5,y0:.75,y1:.8,z0:12,z1:12.1},{front:'#3a3a44'},{noAO:1});
 bg+=Dt.tree(C,-10,18,{h:7})+Dt.tree(C,11,17,{h:7})+Dt.fenceZ(C,-14,2,22,{step:2,col:'#9aa0a8'})+D4.bench2(C,-7,10)+Dt.trashBin(C,7.2,8)+D4.hoop(C,9,14);
 bg+=crowdReal(C,-8,8,13,20,12,{rim:'#ffd59a'});
 return {C,bg,fg:'',spots:[[-.6,6],[.7,6.2]],rim:'#ffd9a0',cast:[-1,.22],grade:['#fff0d8',.4],amb:'ambStreet'};};
L6.basketball=()=>{const C=cam(470);Dt.srand(149);let bg=Dt.sky(C,{sun:[400,150],clouds:5});
 bg+=D4.facadeSide(C,-18,10,60,{h:20,col:'#a8a0c0'})+D4.facadeSide(C,18,10,60,{h:24,col:'#c8a8a0'});
 const cq=[[-8,0,2],[8,0,2],[8,0,26],[-8,0,26]];bg+=Dt.groundGrad(C,cq,'#c86a3a','#d8885a')+Dt.noise('M'+cq.map(p=>C.P(...p).join(',')).join(' L')+'Z',{freq:.5,oct:2,op:.12});
 bg+=Dt.noise('M'+cq.map(p=>C.P(...p).join(',')).join(' L')+'Z',{freq:.04,oct:3,op:.25});for(let i=0;i<14;i++){const z=Dt.R(3,20),x=Dt.R(-7,7);let [px,py]=C.P(x,0,z);const k=C.k(z);let d=`M${px},${py}`;for(let j=0;j<5;j++){px+=Dt.R(-30,30)*k;py+=Dt.R(-6,6)*k;d+=` L${px},${py}`;}bg+=`<path d="${d}" stroke="#8a3a1a" stroke-width="${Math.max(1,2*k)}" fill="none" opacity=".5"/>`;}
 for(let z=3;z<26;z+=1.2){const a=C.P(-8,.001,z),b=C.P(8,.001,z+.6);bg+=`<path d="M${a[0]},${a[1]} L${b[0]},${b[1]}" stroke="#5a2a10" stroke-width="${3*C.k(z)}" opacity=".12"/>`;}
 {let d='';for(let i=0;i<=24;i++){const a=Math.PI*i/24,x=Math.cos(a)*6.7,z=25.5-Math.sin(a)*6.7;d+=(i?' L':'M')+C.P(x,.002,z).join(',');}bg+=`<path d="${d}" stroke="#f6f2ec" stroke-width="3" fill="none"/>`;}
 bg+=S.poly(D2.quad(C,PL.floor(.002),-8,8,2,26),'none','#f6f2ec',3)+S.poly(D2.quad(C,PL.floor(.002),-2.4,2.4,19,26),'#3a6ab0','#f6f2ec',3);
 {const [x,y]=C.P(0,.002,14),k=C.k(14)*C.U;bg+=`<ellipse cx="${x}" cy="${y}" rx="${1.8*k}" ry="${.4*k}" fill="none" stroke="#f6f2ec" stroke-width="3"/>`;const a=C.P(-8,.002,14),b=C.P(8,.002,14);bg+=`<path d="M${a[0]},${a[1]} L${b[0]},${b[1]}" stroke="#f6f2ec" stroke-width="3"/>`;}
 bg+=D4.chainFence(C,26.5,-10,10,{h:3.5})+D4.hoop(C,0,25.6)+D4.chainFence(C,0,0,0).slice(0,0);
 for(const x of [-9.5,9.5])for(let z=4;z<26;z+=2.5)bg+=S.poly([C.P(x,0,z),C.P(x,0,z+2.5),C.P(x,3.5,z+2.5),C.P(x,3.5,z)],'none','#9aa0a8',1.2,'opacity=".5"');
 bg+=D4.bench2(C,-6.5,5,{w:2})+Dt.trashBin(C,6.6,5)+crowdReal(C,-7,7,16,22,6,{rim:'#ffd59a'});
 {const [x,y]=C.P(1.8,0,7),k=C.k(7)*C.U;bg+=`<circle cx="${x}" cy="${y-.12*k}" r="${.12*k}" fill="#e86a2a" stroke="#2a2030" stroke-width="1.4"/><path d="M${x-.12*k},${y-.12*k} L${x+.12*k},${y-.12*k} M${x},${y-.24*k} L${x},${y}" stroke="#2a2030" stroke-width="1.2"/>`;}
 return {C,bg,fg:'',spots:[[-.6,6],[.7,6.2]],rim:'#ffd9a0',cast:[1,.22],grade:['#fff0d8',.4],amb:'ambStreet'};};
L6.stadium=()=>{const C=cam(420);Dt.srand(159);let bg=D2.nightSky(C,{top:'#0e1638',bottom:'#3a4a7a',stars:80,moon:null});
 bg+=D4.bleachers(C,30,-40,40,{rows:12,col:'#5a6a8a',people:.95});for(const x of [-41,41])for(let i=0;i<10;i++){const z=4+i*2.6;bg+=S.box(C,{x0:x-(x<0?6:0),x1:x+(x>0?6:0),y0:0,y1:1+i*.3,z0:z,z1:z+2.4},{front:'#4a5a7a'},{noAO:1});}for(const x of [-30,30])bg+=D4.floodlight(C,x,38,{h:22});
 const fq=[[-40,0,2],[40,0,2],[40,0,34],[-40,0,34]];bg+=Dt.groundGrad(C,fq,'#3a8a3a','#5aa04a');for(let z=2;z<34;z+=3)bg+=S.poly(D2.quad(C,PL.floor(.001),-40,40,z,z+1.5),'#000','none',0,'opacity=".1"');for(let x=-40;x<40;x+=4)bg+=S.poly(D2.quad(C,PL.floor(.0012),x,x+2,2,34),'#fff','none',0,'opacity=".05"');bg+=Dt.noise('M'+fq.map(p=>C.P(...p).join(',')).join(' L')+'Z',{freq:.5,oct:2,op:.16});
 bg+=S.box(C,{x0:-34,x1:34,y0:0,y1:.9,z0:33,z1:33.3},{front:'#1e2a5a'},{noAO:1});for(let x=-32;x<32;x+=8)bg+=S.poly(D2.quad(C,PL.back(32.99),x,x+7,.1,.8),['#e5262d','#ffd24a','#3a8af0','#3ac06a'][Math.abs(Math.round(x/8))%4],'#111',1)+D4.txtAt(C,x+3.5,.3,32.98,['IYA2D','WHAT IF','GOAL!','2D'][Math.abs(Math.round(x/8))%4],{size:.4,col:'#fff'});
 bg+=S.glow(960,330,900,'#c8d8ff',.25);
 bg+=S.poly(D2.quad(C,PL.floor(.002),-30,30,4,32),'none','#f6f2ec',3);{const a=C.P(0,.002,4),b=C.P(0,.002,32);bg+=`<path d="M${a[0]},${a[1]} L${b[0]},${b[1]}" stroke="#f6f2ec" stroke-width="3"/>`;const [x,y]=C.P(0,.002,16),k=C.k(16)*C.U;bg+=`<ellipse cx="${x}" cy="${y}" rx="${4*k}" ry="${.9*k}" fill="none" stroke="#f6f2ec" stroke-width="3"/>`;}
 {const [x,y]=C.P(0,9,34),k=C.k(34)*C.U;bg+=`<rect x="${x-4*k}" y="${y-2.4*k}" width="${8*k}" height="${2.4*k}" fill="#111" stroke="#3a3a44" stroke-width="4"/><text x="${x-2*k}" y="${y-.8*k}" text-anchor="middle" font-family="DejaVu Sans Mono" font-weight="bold" font-size="${1.2*k}" fill="#ffd24a">2</text><text x="${x}" y="${y-.8*k}" text-anchor="middle" font-family="DejaVu Sans Mono" font-weight="bold" font-size="${.8*k}" fill="#e5262d">:</text><text x="${x+2*k}" y="${y-.8*k}" text-anchor="middle" font-family="DejaVu Sans Mono" font-weight="bold" font-size="${1.2*k}" fill="#ffd24a">1</text><text x="${x}" y="${y-1.9*k}" text-anchor="middle" font-family="DejaVu Sans" font-weight="bold" font-size="${.35*k}" fill="#fff">HOME · AWAY</text>`;}
 for(const x of [-20,20]){const [px,py]=C.P(x,0,30),k=C.k(30)*C.U;bg+=`<rect x="${px-3.66*k}" y="${py-2.44*k}" width="${7.32*k}" height="${2.44*k}" fill="none" stroke="#f6f2ec" stroke-width="3"/>`;}
 {const tq=[[-40,0,1],[40,0,1],[40,0,3.2],[-40,0,3.2]];bg+=Dt.groundGrad(C,tq,'#b8483a','#c8583a')+Dt.noise('M'+tq.map(p=>C.P(...p).join(',')).join(' L')+'Z',{freq:.6,oct:2,op:.22});for(const z of [1.5,2,2.5,3])bg+=S.poly(D2.quad(C,PL.floor(.002),-40,40,z,z+.04),'#f6f2ec','none',0);for(let x=-6;x<=6;x+=3)bg+=D4.txtAt(C,x,.002,1.75,String(Math.abs(x/3)+1),{size:.35,col:'#f6f2ec'});}
 return {C,bg,fg:'',spots:[[-.6,5],[.7,5.2]],rim:'#e8f0ff',cast:[0,.12],grade:['#e8f0ff',.4,'#0a1a3a'],amb:'ambCrowd'};};
L6.bridge=()=>{const C=cam(470);Dt.srand(169);let bg=Dt.sky(C,{top:'#4a5aa8',bottom:'#ffb07a',sun:[1400,C.Hz-60],clouds:5,cloudCol:'#ffc8a8'});
 bg+=Dt.hills(C,[['#7a6a8a',.06,60],['#6a5a7a',.08,40]],{trees:false})+D2.skyline(C,{n:12,col:'#4a3a5a',win:'#ffd890',base:C.Hz+2}).replace(/opacity="[^"]*"/g,'opacity=".25"');
 bg+=D3.sea(C,-80,80,1,140,{near:'#3a5a8a',far:'#d8a888',sun:3});
 bg+=Dt.road(C,-4,4,1,140,{lanes:2})+Dt.curb(C,-4,1,140,-1)+Dt.curb(C,4,1,140,1)+Dt.sidewalk(C,-5.5,-4.25,1,140)+Dt.sidewalk(C,4.25,5.5,1,140);
 for(const x of [-5.6,5.6]){bg+=S.box(C,{x0:x-.1,x1:x+.1,y0:0,y1:1.1,z0:1,z1:140},{front:'#c83a2a'},{noAO:1});}
 for(const z of [30,90]){for(const x of [-6.5,6.5])bg+=S.box(C,{x0:x-.6,x1:x+.6,y0:0,y1:26,z0:z,z1:z+1.2},{front:'#c83a2a'});bg+=S.box(C,{x0:-7,x1:7,y0:22,y1:23.5,z0:z,z1:z+1.2},{front:'#a8301e'},{noAO:1})+S.box(C,{x0:-7,x1:7,y0:14,y1:15,z0:z,z1:z+1.2},{front:'#a8301e'},{noAO:1});}
 for(const x of [-6.5,6.5]){let d='';const pts=[];for(let z=1;z<=140;z+=2){const t=z<30?(30-z)/29:z<90?Math.abs(z-60)/30:(z-90)/50;const y=4+21*Math.pow(t,1.6);pts.push([z,y]);d+=(d?' L':'M')+C.P(x,y,z).join(',');}bg+=`<path d="${d}" stroke="#c83a2a" stroke-width="5" fill="none"/>`;for(const [z,y] of pts)if(z%4===1)bg+=`<path d="M${C.P(x,y,z).join(',')} L${C.P(x*.86,1.1,z).join(',')}" stroke="#c83a2a" stroke-width="1.6"/>`;}
 bg+=Dt.carRear(C,1.9,24,{col:'#e2b040'})+Dt.carRear(C,-1.9,46,{col:'#3a6ab0'})+Dt.lamp(C,-5,16)+Dt.lamp(C,5,30);for(let i=0;i<5;i++)bg+=D3.gull(C,Dt.R(-10,10),Dt.R(6,12),Dt.R(20,40));
 return {C,bg,fg:'',spots:[[-4.8,6],[4.8,6.2]],rim:'#ffb07a',cast:[1,.26],grade:['#ffc890',.42,'#3a1a2a'],amb:'ambStreet'};};
module.exports={L6};
