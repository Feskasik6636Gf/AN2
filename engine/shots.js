// demo shots using everything: poses, crowds, fg blur, close-ups, new props
const S=require('./stage.js');const {Cam,poly,line,blurG,glow,shade,rectBack,rectSide,rectFloor,box,table,actor,grade,W,H,L,f}=S;
const {SETS}=require('./sets.js');const {L2}=require('./sets2.js');
const P3=require('./props3d.js');const {randomChar,crowdReal,fgHeads}=require('./crowd.js');
const {body,head,HAIR,OUT,AGE}=require('./bean.js');const {HP}=require('./props.js');const {chromium}=require('playwright');
const TC={top:'#e3232c',topL:'#ff5a5a',topS:'#a8121b',pants:'#2a2426',pantsL:'#4a4244',pantsS:'#141012',shoe:'#e3232c',sole:'#f6f2ec',toe:'#f6f2ec',lace:'#f6f2ec'};
const TEMA=(m,ex={})=>({c:TC,outfit:OUT.hoodie2,baggy:true,...AGE.y18,h:{mood:m,hair:HAIR.messy('#6e3c22','#b8703e','#4a2414'),shape:'chin',eyeS:.82,blushA:.5,backHair:'#6e3c22'},arms:[[6,0,16,0,0],[6,0,16,0,0]],legs:[-6,6],...ex});
const AC={top:'#efe6dc',topL:'#fffaf4',topS:'#cdbfb2',pants:'#2a2426',pantsL:'#4a4244',pantsS:'#141012',shoe:'#f7f5f2',sole:'#d8d2cc'};
const AYA=(m,ex={})=>({c:AC,outfit:OUT.offshoulder,fig:'girl',baggy:true,chunky:true,...AGE.y18,h:{mood:m,hair:HAIR.bun2('#8e3a22','#c4683e','#5e2012'),lashes:true,shape:'egg',eyeS:.88,blushA:.7,backHair:'#8e3a22'},arms:[[20,10,-82,-54,0],[20,20,-70,-40,0]],armsOver:'both',legs:[-5,5],...ex});
const sky=(c1,c2)=>`<defs><linearGradient id="skyg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#skyg)"/>`;
const SH={};
// 1. autumn bus stop: hero hides behind hedge (back view), bus full of kids
SH.busHide=()=>{const C=Cam({vx:960,PH:620});let s=sky('#8ac0e8','#e8f0f4');
 s+=blurG(2.2,P3.porchHouse(C,-12,34,9,'#9ab0c8','#4a4a5a',false)+P3.porchHouse(C,0,36,8,'#c8b0a0','#5a3a3a')+P3.porchHouse(C,12,34,9,'#a8c0b0','#3a4a4a')+P3.autumnTree(C,-8,30,1.3)+P3.autumnTree(C,7,28,1.4));
 s+=rectFloor(C,-80,80,1,60,'#7aa860','none',0)+rectFloor(C,-80,80,18,24,'#6a6a76','none',0)+rectFloor(C,-80,80,15.6,18,'#d8d0c0','none',0)+rectFloor(C,-.8,.8,1,15.6,'#d8d0c0','none',0);
 const kid=(C,x,y,z,i)=>{const ch=randomChar({age:AGE.kid});const [px,py]=C.P(x,y,z);return head(px,py,{...ch.h,s:C.k(z)*C.U/100*.42,rim:'#ffd59a'});};
 s+=P3.bus(C,-6.5,14,true,kid)+P3.leaves(C,-10,10,1.5,15,140);
 s+=P3.hedge(C,-3.4,3.4,7.4,8.2,1.05);
 s+=actor(C,.1,6.2,TEMA('calm',{back:true,backpack:'#2fb59a',sit:'floor'}));
 s+=P3.fallingLeaves(18)+grade('#fff0d8',.45);return s;};
// 2. over-the-shoulder in hallway: big blurred back-of-head fg, Aya talks
SH.overShoulder=()=>{const st=SETS.hallway();const C=st.C;let s=blurG(2,st.bg);
 s+=actor(C,.4,6.8,AYA('smug',{prop:{side:-1,svg:HP.phone},arms:[[20,-30,-20,-110,0],[20,20,-70,-40,0]],armsOver:false}));
 s+=blurG(10,actor(C,-.9,2.0,TEMA('calm',{back:true,backpack:'#2fb59a'})));
 s+=grade('#ffffff',.5);return s;};
// 3. assembly: crowd of real characters, blurred front rows, hero far on stage
SH.assembly=()=>{const C=Cam({vx:960,PH:560});let s=room(C);s+=crowdReal(C,-5,5,5.5,10,26,{blurFar:9});
 s+=actor(C,0,14.2,TEMA('shock',{Y:.9,prop:{side:1,svg:HP.money},arms:[[6,0,16,0,0],[30,-40,40,-100,-10]]}));
 s+=fgHeads(C,[[-3.4,2.6],[-1.6,2.2],[.6,2.4],[2.6,2.3],[4,2.8],[-.6,3.2],[1.6,3.4]],12);
 s+=grade('#fff0d8',.55);return s;};
function room(C){let s=rectFloor(C,-8,8,1,16,'#c8a878','none',0)+rectBack(C,16,-8,8,0,6,'#e8d8c0')+rectSide(C,-8,1,16,0,6,'#dccab0')+rectSide(C,8,1,16,0,6,'#dccab0')+poly([C.P(-8,6,1),C.P(8,6,1),C.P(8,6,16),C.P(-8,6,16)],'#f2ece0');
 s+=box(C,{x0:-4,x1:4,y0:0,y1:.9,z0:13,z1:16},{front:'#8a5a3a',top:'#a8784e'})+rectBack(C,16,-2.6,2.6,2.6,5,'#2a3a6a')+rectBack(C,15.99,-2.3,2.3,2.8,4.8,'#3a5a9a');
 for(const x of [-5.6,5.6]) s+=rectBack(C,16,x-.6,x+.6,1.6,3.4,'#8a96a8')+rectBack(C,16,x-.4,x+.4,3.6,3.9,'#5aa86a');
 const [cx,cy]=C.P(0,5.4,16);s+=`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(.3*C.U*C.k(16))}" fill="#fff" stroke="${L}" stroke-width="3"/>`;
 s+=rectFloor(C,-3.8,3.8,13,13.05,'none','#5a3a2a',2,.91);return s;}
// 4. close-up with blurred background (kitchen)
SH.closeUp=()=>{const st=SETS.kitchen();const C=Cam({vx:960,PH:1700});let s=blurG(7,st.bg);
 s+=`<g transform="translate(0,1000)">`+actor(C,-.05,4,TEMA('love',{prop:{side:1,svg:HP.phone},arms:[[6,0,16,0,0],[20,-30,-10,-110,-10]]}))+'</g>';
 s+=grade('#fff1d8',.55);return s;};
// 5. night suburb: porch houses lit, string lights, couple walking
SH.nightSuburb=()=>{const C=Cam({vx:960,PH:520});let s=sky('#14183a','#4a3a6a');
 for(let i=0;i<70;i++)s+=`<circle cx="${f(Math.random()*W)}" cy="${f(Math.random()*C.Hz)}" r="1.4" fill="#fff" opacity=".7"/>`;
 s+=rectFloor(C,-80,80,1,60,'#2a3a2a','none',0)+rectFloor(C,-80,80,9,14,'#3a3a46','none',0)+rectFloor(C,-80,80,6.6,9,'#5a5a66','none',0);
 s+=P3.porchHouse(C,-9,18,9,'#5a6a9a','#2a2a3a',true)+P3.porchHouse(C,3,19,8,'#7a5a6a','#2a2a3a',true)+P3.autumnTree(C,-3.6,16,1.3,['#8a5a3a','#a86a3a','#6a4a2a'])+P3.porchHouse(C,14,18,8,'#5a7a6a','#2a2a3a',true);
 s+=P3.stringLights(C,[[-6,3.4,10],[-2,2.9,10],[2,3.2,10],[6,2.8,10]],28);
 s+=actor(C,-.7,7.4,TEMA('joy'))+actor(C,.5,7.6,AYA('shy'));
 s+=P3.bokeh(16,['#ffd890','#ff8ad8'],700,1050)+grade('#8ab0ff',.6,'#1a1a4a');return s;};
// 6. hero lying on floor at home (living room) + friends sitting
SH.livingLazy=()=>{const st=L2.livingRoom();const C=st.C;let s=st.bg;
 s+=actor(C,-1.6,5.4,TEMA('tired',{lie:1}))+actor(C,.9,5.8,AYA('joy',{sit:'floor'}));
 s+=st.fg+grade('#fff1d8',.5);return s;};
module.exports={SH};
if(require.main===module)(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:W,height:H}});
 for(const k of (process.argv.slice(2).length?process.argv.slice(2):Object.keys(SH))){const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${SH[k]()}</svg>`;
  await p.setContent(`<body style="margin:0">${svg}</body>`);await p.screenshot({path:`out/shot_${k}.png`});console.log('ok',k);}
 await b.close();})();
