const S=require('./stage.js');const {SETS}=require('./sets.js');const {FX}=require('./fx.js');const A=require('./anim.js');
const {HAIR,OUT,AGE}=require('./bean.js');const {chromium}=require('playwright');const fs=require('fs');
const W=1920,H=1080,FPS=30;
const TC={top:'#e3232c',topL:'#ff5a5a',topS:'#a8121b',pants:'#2a2426',pantsL:'#4a4244',pantsS:'#141012',shoe:'#e3232c',sole:'#f6f2ec',toe:'#f6f2ec',lace:'#f6f2ec'};
const st=SETS.hallway();const C=st.C;const X=0,Z=4.4;
const [fx,fy]=C.P(X,0,Z);const hgt=C.k(Z)*C.PH;const ctx={W,H,fx,fy,hx:fx,hy:fy-hgt*.86,bx:fx,by:fy-hgt*.5};
const tema=(t)=>({c:TC,outfit:OUT.hoodie2,baggy:true,backpack:'#2fb59a',...AGE.y18,rim:st.rim,cast:st.cast,h:{mood:'calm',hair:HAIR.messy('#6e3c22','#b8703e','#4a2414'),shape:'chin',eyeS:.82,blushA:.5,blink:A.blink(t)},arms:[[6,0,16,0,0],[6,0,16,0,0]],legs:[-6,6]});
const PAD=.35;
(async()=>{fs.mkdirSync('out/fxdemo',{recursive:true});const b=await chromium.launch();const p=await b.newPage({viewport:{width:W,height:H}});
 // static bg (without character) as png
 await p.setContent(`<body style="margin:0"><svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">${st.bg}</svg></body>`);await p.screenshot({path:'out/fxdemo_bg.png'});
 const bg64=fs.readFileSync('out/fxdemo_bg.png').toString('base64');
 await p.setContent(`<body style="margin:0;overflow:hidden;background:#000"><div id="cam" style="position:absolute;inset:0;transform-origin:0 0"><img id="bg" src="data:image/png;base64,${bg64}" style="position:absolute;left:0;top:0;width:${W}px;height:${H}px;transform-origin:${ctx.hx}px ${ctx.hy}px"><div id="ch" style="position:absolute;inset:0"></div></div><div id="ov" style="position:absolute;inset:0"></div><div id="lb" style="position:absolute;left:40px;bottom:36px;font:bold 44px DejaVu Sans;color:#fff;background:rgba(13,11,18,.75);padding:10px 26px;border-radius:16px"></div></body>`);
 const timeline=[];let fi=0,t0=0;const only=process.argv[2]?+process.argv[2]:null;
 for(const [i,e] of FX.entries()){if(only!=null&&i>=only)break;const dur=e.dur+PAD;timeline.push({start:t0,sfx:e.sfx});
  const n=Math.round(dur*FPS);
  for(let k=0;k<n;k++){const t=k/FPS;const r=t<e.dur?e.draw(t,ctx):{};const cam=r.cam||{};
   const sc=cam.scale||1,ox=cam.ox??W/2,oy=cam.oy??H/2;const tr=`translate(${(cam.dx||0)+ox*(1-sc)}px,${(cam.dy||0)+oy*(1-sc)}px) scale(${sc})`;
   const filt=`${cam.blur?`blur(${cam.blur}px) `:''}${cam.sat!=null?`saturate(${cam.sat})`:''}`||'none';
   const chs=`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">${S.actor(C,X,Z,tema(t0+t))}</svg>`;
   const ovs=`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">${r.over||''}${S.grade(...st.grade)}</svg>`;
   await p.evaluate(([tr,filt,chs,ovs,lab,bgs])=>{const c=document.getElementById('cam');c.style.transform=tr;c.style.filter=filt;document.getElementById('bg').style.transform=bgs;document.getElementById('ch').innerHTML=chs;document.getElementById('ov').innerHTML=ovs;document.getElementById('lb').textContent=lab;},[tr,filt,chs,ovs,`${i+1}. ${e.name}`,cam.bgScale?`scale(${cam.bgScale})`:'none']);
   await p.screenshot({path:`out/fxdemo/f${String(fi++).padStart(5,'0')}.png`});}
  t0+=dur;}
 fs.writeFileSync('out/fxdemo_timeline.json',JSON.stringify({total:t0,timeline}));await b.close();console.log('frames',fi,'sec',t0.toFixed(1));})();
