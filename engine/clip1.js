// Test clip: hallway — Tema walks in, Aya talks, shock -> +$1,000 -> joy & wave
const S=require('./stage.js');const {W,H,f}=S;const {SETS}=require('./sets.js');
const A=require('./anim.js');const {HAIR,OUT,AGE}=require('./bean.js');const {HP}=require('./props.js');const {chromium}=require('playwright');
const fs=require('fs');
const TC={top:'#e3232c',topL:'#ff5a5a',topS:'#a8121b',pants:'#2a2426',pantsL:'#4a4244',pantsS:'#141012',shoe:'#e3232c',sole:'#f6f2ec',toe:'#f6f2ec',lace:'#f6f2ec'};
const AC={top:'#efe6dc',topL:'#fffaf4',topS:'#cdbfb2',pants:'#2a2426',pantsL:'#4a4244',pantsS:'#141012',shoe:'#f7f5f2',sole:'#d8d2cc'};
const tHair=HAIR.messy('#6e3c22','#b8703e','#4a2414'), aHair=HAIR.bun2('#8e3a22','#c4683e','#5e2012');
const st=SETS.hallway();const C=st.C;const BG=st.bg;
const FPS=30,DUR=7;
const money=`<text x="0" y="0" text-anchor="middle" font-family="DejaVu Sans" font-weight="bold" font-size="96" fill="#4ad07a" stroke="#0d0b12" stroke-width="4">+$1,000</text>${[[-230,-60],[220,-70],[250,20],[-250,10]].map(([x,y])=>`<path d="M${x},${y-16} L${x+5},${y-5} L${x+16},${y} L${x+5},${y+5} L${x},${y+16} L${x-5},${y+5} L${x-16},${y} L${x-5},${y-5}Z" fill="#fff6a8" stroke="#0d0b12" stroke-width="2"/>`).join('')}`;
const bang=`<text x="0" y="0" text-anchor="middle" font-family="DejaVu Sans" font-weight="bold" font-size="90" fill="#e3232c" stroke="#0d0b12" stroke-width="3">!!</text>`;
const bubble=(txt)=>`<path d="M-210,-60 C-210,-110 210,-110 210,-60 L210,0 C210,40 60,46 10,42 L-20,80 L-10,40 C-150,40 -210,30 -210,0Z" fill="#fff" stroke="#0d0b12" stroke-width="4"/><text x="0" y="-18" text-anchor="middle" font-family="DejaVu Sans" font-weight="bold" font-size="34" fill="#0d0b12">${txt}</text>`;
function frame(t){
 // ---- Tema
 const walkEnd=2.2, x0=-2.6, x1=-.6;
 const wk=A.ease(t/walkEnd), X=A.lerp(x0,x1,t<walkEnd?t/walkEnd:1);
 let tm=t<3.1?'calm':t<4.3?'shock':'joy';
 let tp={legs:[-6,6],lift:[0,0],arms:[[6,0,16,0,0],[6,0,16,0,0]],bob:0};
 if(t<walkEnd){tp=A.walk(t*1.7,1);}
 let prop=null;
 if(t>=4.3){tp.arms=[[6,0,16,0,0],A.wave(t)];}
 if(t>=3.1&&t<4.3){tp.arms=[[20,-30,-10,-100,0],[20,-30,-10,-100,0]];}
 const tema={c:TC,outfit:OUT.hoodie2,baggy:true,backpack:'#2fb59a',...AGE.y18,rim:st.rim,cast:st.cast,
  h:{mood:tm,hair:tHair,shape:'chin',eyeS:.82,blushA:.5,blink:A.blink(t,0),talk:A.talk(t,[[5.2,6.4]]),look:t<3.1?3:0},arms:tp.arms,legs:tp.legs,lift:tp.lift};
 const sqT=t<4.3?A.pop(t,3.1,1.4):A.pop(t,4.3,1.2);
 // ---- Aya
 const am=t<3.1?'smug':t<4.3?'smug':'joy';
 const aya={c:AC,outfit:OUT.offshoulder,fig:'girl',baggy:true,chunky:true,...AGE.y18,rim:st.rim,cast:st.cast,
  h:{mood:am,hair:aHair,lashes:true,shape:'egg',eyeS:.88,blushA:.7,blink:A.blink(t,.7),talk:A.talk(t,[[2.3,3.0]]),look:-3},
  arms:[[20,-30,-20,-110,0],[20,20,-70,-40,0]],armsOver:false,prop:{side:-1,svg:HP.phone},legs:[-5,5]};
 let svg=BG;
 svg+=A.animActor(C,.7,5.0,aya,{br:A.breathe(t,1),sq:A.pop(t,4.3,.8)});
 svg+=A.animActor(C,X,4.6,tema,{bob:tp.bob,sq:sqT,br:A.breathe(t)});
 svg+=st.fg;
 // overlays
 if(t>=2.3&&t<3.1) svg+=A.popIn(t,2.3,bubble('Слышала про него?'),1240,330,.25);
 if(t>=3.1&&t<4.3) svg+=A.popIn(t,3.1,bang,880,250,.2);
 if(t>=4.3) svg+=A.popIn(t,4.3,money,960,200,.35);
 if(t>=5.2&&t<6.6) svg+=A.popIn(t,5.2,bubble('Серьёзно?!'),700,300,.25);
 // camera: slow push-in + micro shake on shock
 const z=1+.08*A.ease(t/DUR), sh=(t>3.1&&t<3.35)?Math.sin(t*90)*6:0;
 return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><g transform="translate(${960+sh},560) scale(${z.toFixed(4)}) translate(-960,-560)">${svg}</g>${S.grade(...st.grade)}</svg>`;}
(async()=>{fs.mkdirSync('out/clip1',{recursive:true});const b=await chromium.launch();const p=await b.newPage({viewport:{width:W,height:H}});
 const only=process.argv[2]?process.argv[2].split(',').map(Number):null;
 const N=Math.round(DUR*FPS);for(let i=0;i<N;i++){if(only&&!only.includes(i))continue;await p.setContent(`<body style="margin:0">${frame(i/FPS)}</body>`);await p.screenshot({path:`out/clip1/f${String(i).padStart(4,'0')}.png`});}
 await b.close();console.log('ok')})();
