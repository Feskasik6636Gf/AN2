// Detailed locations, batch 2 (standard: references/detail.md)
const S=require('./stage.js');const Dt=require('./detail.js');const D2=require('./detail2.js');const D3=require('./detail3.js');
const {PL}=D2;const {crowdReal}=require('./crowd.js');const L5={};const cam=(PH=470,vx=960)=>S.Cam({vx,PH});

// ---------- home gym ----------
L5.homeGym=()=>{Dt.srand(91);const C=cam(470);const RW=3.8,Zb=8.5,Hc=2.8;
 let bg=D2.room(C,{RW,Zb,Hc,wall:(C,M,a,b,c,d)=>D2.plaster(C,M,a,b,c,d,{col:'#5a6470'}),side:(C,M,a,b,c,d)=>D2.brick(C,M,a,b,c,d,{col:'#6a6e78',mortar:'#4a4e58',grime:.2}),
  floor:(C,a,b,c,d)=>D2.tileFloor(C,a,b,c,d,{col:'#2e3036',col2:'#26282e',t:.6}),ceil:'#4a4e58',base:'#2a2a30'});
 bg+=D3.mirrorWall(C,Zb-.02,-3.2,1.2,.3,2.3)+D3.poster(C,Zb-.02,2.3,1.1,{w:.8,h:1.1})+D2.frame(C,Zb-.02,3.2,1.6,{w:.5,h:.4,col:'#111'});
 for(let z=1.5;z<Zb;z+=2.2){const [x,y]=C.P(0,Hc-.02,z),k=C.k(z)*C.U;bg+=`<rect x="${x-.9*k}" y="${y-.02*k}" width="${1.8*k}" height="${.08*k}" fill="#f6f8ff"/>`+S.glow(x,y+.1*k,1.2*k,'#e8f0ff',.35);}
 bg+=D2.windowBack(C,Zb-.01,2.4,2.25,{w:1.2,h:.4,sky:['#9ac8e8','#e8f0f0'],frame:'#8a8e96'}).slice(0,0);
 bg+=D3.dumbbellRack(C,-1.4,7.3)+D3.treadmill(C,2.6,5.6)+D3.bench(C,-.2,4.6,{col:'#c8303a'});
 bg+=D3.yogaMat(C,-3.3,-2.5,3.2,5,'#5ab08a')+D3.kettlebell(C,-2.9,6.2)+D3.kettlebell(C,-2.6,6.3,'#c8303a')+D3.kettlebell(C,-2.3,6.25,'#3a6ab0');
 {const [x,y]=C.P(3.2,0,7.4),k=C.k(7.4)*C.U;bg+=`<path d="M${x},${y-.05*k} L${x},${y-1.9*k}" stroke="#2a2a30" stroke-width="3"/><path d="M${x-.15*k},${y-1.9*k} L${x+.15*k},${y-1.9*k}" stroke="#2a2a30" stroke-width="4"/><ellipse cx="${x}" cy="${y-1.1*k}" rx="${.2*k}" ry="${.55*k}" fill="#c8303a" stroke="#1a1a1e" stroke-width="2"/><rect x="${x-.2*k}" y="${y-.9*k}" width="${.4*k}" height="${.1*k}" fill="#1a1a1e"/>`;}
 {const [x,y]=C.P(-3.5,0,3.8),k=C.k(3.8)*C.U;bg+=`<path d="M${x},${y} L${x-.05*k},${y-.6*k}" stroke="#d8d8e0" stroke-width="${.08*k}"/><rect x="${x-.08*k}" y="${y-.85*k}" width="${.12*k}" height="${.3*k}" rx="4" fill="#5ab0ff" opacity=".8"/>`;}
 bg+=D2.plant(C,3.3,3.4,{h:1})+D2.rug(C,1,2.6,1.6,3,{col:'#3a3a44',col2:'#ffd24a'});
 return {C,bg,fg:'',spots:[[-.6,3.6],[.8,3.8]],rim:'#e8f0ff',cast:[1,.15],grade:['#e8f0ff',.42],amb:'ambRoom'};};

// ---------- carnival (night) ----------
L5.carnival=()=>{Dt.srand(101);const C=cam(470);let bg=D2.nightSky(C,{top:'#140c3a',bottom:'#6a2a6a',stars:140,moon:null});
 bg+=D2.skyline(C,{n:14,col:'#24183e',base:C.Hz+10});
 bg+=D3.ferrisWheel(C,6,40,{r:9,t:.2});
 bg+=Dt.dirt(C,-30,30,1,80,{col:'#6a5040',ruts:false});
 for(let i=0;i<120;i++){const X=Dt.R(-12,12),Z=1+Math.pow(Dt.rnd(),1.6)*20,[x,y]=C.P(X,0,Z),k=C.k(Z);bg+=`<rect x="${x}" y="${y}" width="${5*k*1.5}" height="${3*k*1.5}" fill="${['#ff5fae','#ffd24a','#5ab0ff','#fff'][i%4]}" opacity=".7" transform="rotate(${Dt.R(0,90)} ${x} ${y})"/>`;}
 bg+=D3.stripedTent(C,-9,26,{w:5,h:3,a:'#3a6ab0',b:'#f6efe0',sign:'GAMES'})+D3.stripedTent(C,9,22,{w:4,h:2.8,a:'#8a3ac0',b:'#ffd24a',sign:'CANDY'});
 bg+=D3.bulbString(C,[-11,3.4,24],[-2,4,30],18)+D3.bulbString(C,[2,4,30],[10,3.2,20],18)+D3.bulbString(C,[-6,2.8,12],[6,2.8,12],20);
 bg+=D3.stripedTent(C,-5.2,10,{w:3.2,h:2.4,a:'#e5262d',b:'#f6efe0',sign:'POPCORN'})+D3.stripedTent(C,5.4,12,{w:3,h:2.4,a:'#2a9a5a',b:'#f6efe0',sign:'HOT DOGS'});
 bg+=D3.balloonCart(C,2.2,8)+Dt.trashBin(C,-2.6,7)+D2.crate(C,-3.2,6.5,{col:'#a8845a'})+Dt.lamp(C,-3.4,14,{h:4,on:true})+Dt.lamp(C,3.6,16,{h:4,on:true});
 bg+=crowdReal(C,-8,8,13,24,30,{blurFar:20,rim:'#ffb0e0',cast:[1,.12]});
 return {C,bg,fg:'',spots:[[-.6,5.4],[.7,5.6]],rim:'#ffb0e0',cast:[1,.15],grade:['#ffb0e0',.45,'#2a0a3a'],amb:'ambCrowd'};};

// ---------- nightclub ----------
L5.nightclub=()=>{Dt.srand(111);const C=cam(450);const RW=6,Zb=12,Hc=3.6;
 let bg=D2.room(C,{RW,Zb,Hc,wall:(C,M,a,b,c,d)=>D2.brick(C,M,a,b,c,d,{col:'#2a2032',mortar:'#140e1a',grime:.2}),floor:(C,a,b,c,d)=>D2.concreteFloor(C,a,b,c,d,{col:'#1e1a24'}),ceil:'#120e18'});
 bg+=D2.ledScreen(C,Zb-.05,-3,3,1.6,3.3,{a:'#2a0a6a',b:'#ff3fa0',txt:'IYA2D'});
 bg+=D3.danceFloor(C,-3.6,3.6,3.4,10);
 bg+=D3.djBooth(C,0,10.6)+D2.speakerStack(C,-4.4,10.2,{n:2})+D2.speakerStack(C,4.4,10.2,{n:2});
 bg+=D2.truss(C,Zb-1,-5.5,5.5,3.1).replace(/#9aa0a8/g,'#4a4466');
 bg+=D3.laser(C,-4.5,3.2,Zb-1,[0.5,0.75,1,1.25,2.4],'#3aff8a')+D3.laser(C,4.5,3.2,Zb-1,[2.6,2.35,2.1,1.85,.7],'#ff3fa0');
 for(const [x,c,tx] of [[-3,'#5ab0ff',-1.5],[0,'#b48aff',0],[3,'#ff5fae',1.5]])bg+=D2.beam(C,x,3.1,Zb-1,tx,6,{col:c,w:1});
 bg+=D3.discoBall(C,0,3,6.5);
 // side bar with bottles + neon
 bg+=D2.shelf(C,0,0,0,{}).slice(0,0);
 {const q=[C.P(-RW,0,4),C.P(-RW,0,8),C.P(-RW,2.4,8),C.P(-RW,2.4,4)];bg+=D2.neon(C,-RW+.02,2.7,6,'BAR',{col:'#5ab0ff',size:.5,plane:'side',side:1});
  bg+=S.box(C,{x0:-RW,x1:-RW+.8,y0:0,y1:1.1,z0:4,z1:8},{front:'#2a2030',top:'#5a4a6a'});for(let z=4.3;z<8;z+=.3){const [x,y]=C.P(-RW+.4,1.12,z),k=C.k(z)*C.U;bg+=`<rect x="${x-.03*k}" y="${y-.28*k}" width="${.06*k}" height="${.28*k}" fill="${['#3a8a5a','#c84a3a','#e8c070','#5ab0ff'][Math.floor(z*3)%4]}" opacity=".85"/>`+S.glow(x,y-.1*k,.15*k,'#5ab0ff',.5);}}
 bg+=crowdReal(C,-3.6,3.6,6.2,10,22,{back:true,rim:'#ff5fae',cast:[0,.1]});
 {let g='';for(let z=4;z<Zb;z+=1.4){const p=C.P(-RW,Hc,z),q=C.P(RW,Hc,z);g+=`<path d="M${p[0]},${p[1]} L${q[0]},${q[1]}" stroke="#2a2236" stroke-width="${6*C.k(z)}"/>`;}bg+=g;}
 for(const x of [-RW+.05,RW-.05])for(let z=3;z<Zb;z+=1.6){const [px,py]=C.P(x,2.6,z);bg+=S.glow(px,py,70*C.k(z)*1.6,x<0?'#5ab0ff':'#ff3fa0',.55)+`<rect x="${px-6*C.k(z)}" y="${py-4*C.k(z)}" width="${12*C.k(z)}" height="${8*C.k(z)}" fill="#fff" opacity=".85"/>`;}
 bg+=S.dust([C.P(-6,3.4,10),C.P(6,3.4,10),C.P(6,0,4),C.P(-6,0,4)],120,'#e8d8ff');
 return {C,bg,fg:'',spots:[[-.6,3],[.7,3.2]],rim:'#ff5fae',cast:[0,.1],grade:['#b48aff',.45,'#1a0a2a'],amb:'ambCrowd'};};

// ---------- dining room, evening ----------
L5.diningEvening=()=>{Dt.srand(121);const C=cam(470);const RW=4.2,Zb=8,Hc=2.9;
 const wall=(C,M,a,b,c,d)=>D2.wallpaper(C,M,a,b,1,d,{col:'#c87a4a',stripe:'#d88a5a',w:.22})+D3.panelWall(C,M,a,b,0,1,{col:'#f0e2c8',step:.8})+S.poly(D2.quad(C,M,a,b,.98,1.06),'#e8d4b4','#5a3a20',1);
 let bg=D2.room(C,{RW,Zb,Hc,wall,floor:(C,a,b,c,d)=>D2.woodFloor(C,a,b,c,d,{col:'#7a4a2a'}),ceil:'#f0dcc0',base:'#f0e2c8'});
 bg+=D2.windowBack(C,Zb-.02,0,1.05,{w:2,h:1.5,sky:['#e87a5a','#ffcf8a'],curtains:'#7a2a3a',lit:'#ffb070'});
 {const a=C.P(-1,1.1,Zb),b=C.P(1,1.1,Zb),c=C.P(1.6,0,Zb-3.2),d=C.P(-.6,0,Zb-3.2);bg+=`<path d="M${a[0]},${a[1]} L${b[0]},${b[1]} L${c[0]},${c[1]} L${d[0]},${d[1]}Z" fill="#ffb070" opacity=".1"/>`;}
 bg+=D3.cabinet(C,Zb-.02,-3,{w:1.5,h:2})+D2.frame(C,Zb-.02,2.6,1.4,{w:.9,h:.7,col:'#8a6a3a'})+D2.plant(C,3.6,7.2,{h:1.2});
 bg+=D2.rug(C,-2.2,2.2,3.2,6.6,{col:'#7a2a2a',col2:'#e8c070'});
 for(const x of [-.8,0,.8])bg+=D2.chair(C,x,6.1,{col:'#5a2e18'});
 bg+=D3.diningTable(C,0,4.6,{w:2.6,d:1.2});
 bg+=D3.chandelier(C,0,2.3,5.2);
 for(const x of [-RW,RW]){const sc=C.P(x,1.9,4.2);bg+=S.glow(sc[0],sc[1],60,'#ffc070',.7)+`<circle cx="${sc[0]}" cy="${sc[1]}" r="6" fill="#ffe8a0"/>`;}
 bg+=D2.frame(C,0,0,0,{}).slice(0,0);
 return {C,bg,fg:'',spots:[[-1.6,3.6],[1.6,3.8]],rim:'#ffc890',cast:[-1,.18],grade:['#ffcf90',.42,'#3a1a10'],amb:'ambRoom'};};

// ---------- harbour ----------
L5.harbor=()=>{Dt.srand(131);const C=cam(470);let bg=Dt.sky(C,{top:'#6aa8e0',bottom:'#ffe2b8',sun:[1250,250],clouds:6});
 bg+=Dt.hills(C,[['#9ab8c8',.06,60],['#86a8b0',.09,40]],{trees:false});
 bg+=D3.sea(C,-80,80,1,120,{sun:4});
 bg+=D3.lighthouse(C,-26,60)+D3.crane(C,24,55)+D3.boat(C,14,40,{col:'#f6f2ec',stripe:'#e5262d',L:10,dir:-1})+D3.boat(C,-9,26,{col:'#3a6ab0',stripe:'#f6f2ec',L:7,mast:false});
 for(let i=0;i<6;i++)bg+=D3.gull(C,Dt.R(-12,12),Dt.R(6,12),Dt.R(20,50));
 bg+=D3.pier(C,-2.6,2.6,1,34);
 bg+=D3.boat(C,6,12,{col:'#e8e4dc',stripe:'#3a8a5a',L:6.5,dir:-1});
 for(const z of [6,12,20])bg+=D3.bollard(C,-2.3,.6,z)+D3.bollard(C,2.3,.6,z+3);
 {const up=s=>`<g transform="translate(0,${C.P(0,.6,8)[1]-C.P(0,0,8)[1]})">${s}</g>`;bg+=up(D2.crate(C,1.6,8,{col:'#a8845a'})+D2.crate(C,1.7,8.6,{w:.5,h:.4})+D2.trashBag(C,-1.8,7).slice(0,0)+Dt.lamp(C,-2.2,10,{h:4})+Dt.lamp(C,2.2,22,{h:4}));}
 {const [x,y]=C.P(-1.4,.6,5),k=C.k(5)*C.U;bg+=`<ellipse cx="${x}" cy="${y-.15*k}" rx="${.35*k}" ry="${.12*k}" fill="none" stroke="#c8a86a" stroke-width="${.06*k}"/><ellipse cx="${x}" cy="${y-.2*k}" rx="${.25*k}" ry="${.08*k}" fill="none" stroke="#b8985a" stroke-width="${.05*k}"/>`;}
 {const [x,y]=C.P(1.8,.6,5.4),k=C.k(5.4)*C.U;bg+=`<circle cx="${x}" cy="${y-.35*k}" r="${.32*k}" fill="none" stroke="#e5262d" stroke-width="${.12*k}"/><circle cx="${x}" cy="${y-.35*k}" r="${.32*k}" fill="none" stroke="#fff" stroke-width="${.12*k}" stroke-dasharray="${.25*k} ${.25*k}"/>`;}
 return {C,bg,fg:'',spots:[[-.7,6],[.7,6.2]],rim:'#ffd9a0',cast:[-1,.22],grade:['#fff0d8',.4],amb:'ambNature'};};

// ---------- courtroom ----------
L5.courtroom=()=>{Dt.srand(141);const C=cam(460);const RW=5,Zb=11,Hc=3.8;
 const wall=(C,M,a,b,c,d)=>D3.panelWall(C,M,a,b,0,2.2,{col:'#7a4628',step:1})+D2.plaster(C,M,a,b,2.2,d,{col:'#e8dcc4'})+S.poly(D2.quad(C,M,a,b,2.18,2.3),'#5a2e18','#2a1408',1);
 let bg=D2.room(C,{RW,Zb,Hc,wall,floor:(C,a,b,c,d)=>D2.woodFloor(C,a,b,c,d,{col:'#6a3a20',w:.14}),ceil:'#e8dcc4',base:'#4a2410'});
 for(const x of [-RW,RW])for(const z of [3.5,7.5]){const q=[C.P(x,2.4,z-.6),C.P(x,2.4,z+.6),C.P(x,3.5,z+.6),C.P(x,3.5,z-.6)];bg+=S.poly(q,'#f0e8d8','#3a2a1a',2)+S.poly([C.P(x,2.48,z-.52),C.P(x,2.48,z+.52),C.P(x,3.42,z+.52),C.P(x,3.42,z-.52)],'#9ac8e8','#000',1.2);}
 // seal above the bench, flags, clock
 {const [x,y]=C.P(0,3,Zb-.02),k=C.k(Zb)*C.U;bg+=`<circle cx="${x}" cy="${y}" r="${.5*k}" fill="#c8a050" stroke="#3a2a10" stroke-width="2"/><circle cx="${x}" cy="${y}" r="${.42*k}" fill="#2a3a6a" stroke="#e8c878" stroke-width="2"/><path d="M${x-.2*k},${y+.1*k} L${x},${y-.22*k} L${x+.2*k},${y+.1*k}Z" fill="#e8c878"/><text x="${x}" y="${y+.3*k}" text-anchor="middle" font-family="DejaVu Serif" font-size="${.08*k}" fill="#e8c878">JUSTICE</text>`;}
 bg+=D3.flag(C,Zb-.3,-3.4)+D3.flag(C,Zb-.3,3.4,{cols:['#c8303a','#f6f2ec','#3a5aa8']});
 {const [x,y]=C.P(-4,2.9,Zb-.02),k=C.k(Zb)*C.U;bg+=`<circle cx="${x}" cy="${y}" r="${.22*k}" fill="#f6f2ec" stroke="#3a2a1a" stroke-width="3"/><path d="M${x},${y} L${x},${y-.15*k} M${x},${y} L${x+.1*k},${y}" stroke="#111" stroke-width="2"/>`;}
 bg+=D3.judgeBench(C,Zb-1.4,{w:4.4,h:1.5});
 // witness stand + jury box
 bg+=S.box(C,{x0:2.6,x1:3.6,y0:0,y1:1.1,z0:8.4,z1:9.2},{front:'#6a3a1e',top:'#8a5a34'})+D2.micStand(C,3.1,9,{h:1.35});
 bg+=S.box(C,{x0:-RW,x1:-3.2,y0:0,y1:1,z0:5,z1:9},{front:'#6a3a1e',top:'#8a5a34'})+D2.chair(C,-4.4,6.2,{col:'#3a2a20'})+D2.chair(C,-4.4,7.4,{col:'#3a2a20'});
 // counsel tables + rail + gallery pews
 for(const x of [-1.6,1.6]){bg+=S.table(C,x-.9,x+.9,6,6.8,.76,'#7a4a2a','#4a2a1a');const [a,b]=C.P(x-.3,.78,6.4),k=C.k(6.4)*C.U;bg+=`<rect x="${a-.15*k}" y="${b-.02*k}" width="${.3*k}" height="${.04*k}" fill="#fff" transform="rotate(-8 ${a} ${b})"/><rect x="${a+.2*k}" y="${b-.08*k}" width="${.2*k}" height="${.08*k}" fill="#3a2a1a"/>`+D2.chair(C,x-.4,6.9,{col:'#2a1a12'})+D2.chair(C,x+.4,6.9,{col:'#2a1a12'});}
 bg+=D3.railing(C,5,-RW,-.6)+D3.railing(C,5,.6,RW);
 for(const z of [3.6,2.4])bg+=D3.pew(C,-RW+.2,-.8,z)+D3.pew(C,.8,RW-.2,z);
 for(let z=2;z<Zb;z+=2.6)bg+=D2.pendant(C,-2,3,z,{col:'#c8a050',light:'#fff2d0'})+D2.pendant(C,2,3,z,{col:'#c8a050',light:'#fff2d0'});
 return {C,bg,fg:'',spots:[[-.6,4.6],[.7,4.8]],rim:'#ffe2b0',cast:[1,.15],grade:['#fff0d8',.42],amb:'ambOffice'};};
module.exports={L5};
