// Director: turns a project (list of shots) into frames + audio events.
const S=require('./stage.js');const {f}=S;
const {SETS}=require('./sets.js');const {L2}=require('./sets2.js');
const A=require('./anim.js');const {FX}=require('./fx.js');const CH=require('./chars.js');
const {HP}=require('./props.js');const P3=require('./props3d.js');const {crowdReal,fgHeads}=require('./crowd.js');
const W=1920,H=1080;
const LOC={...SETS,...L2};
// extra sets built from props3d
LOC.busStop=()=>{const C=S.Cam({vx:960,PH:620});const sky=`<defs><linearGradient id="skyb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8ac0e8"/><stop offset="1" stop-color="#e8f0f4"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#skyb)"/>`;
 let bg=sky+S.blurG(2.2,P3.porchHouse(C,-12,34,9,'#9ab0c8','#4a4a5a')+P3.porchHouse(C,0,36,8,'#c8b0a0','#5a3a3a')+P3.porchHouse(C,12,34,9,'#a8c0b0','#3a4a4a')+P3.autumnTree(C,-8,30,1.3)+P3.autumnTree(C,7,28,1.4));
 bg+=S.rectFloor(C,-80,80,1,60,'#7aa860','none',0)+S.rectFloor(C,-80,80,18,24,'#6a6a76','none',0)+S.rectFloor(C,-80,80,15.6,18,'#d8d0c0','none',0)+S.rectFloor(C,-.8,.8,1,15.6,'#d8d0c0','none',0)+P3.leaves(C,-10,10,1.5,15,140);
 return {C,bg,fg:'',spots:[[-.8,6],[.8,6.2]],rim:'#ffd59a',cast:[-1,.2],grade:['#fff0d8',.45],amb:'ambStreet'};};
LOC.nightSuburb=()=>{const C=S.Cam({vx:960,PH:520});let bg=`<defs><linearGradient id="skyn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#14183a"/><stop offset="1" stop-color="#4a3a6a"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#skyn)"/>`;
 bg+=S.rectFloor(C,-80,80,1,60,'#2a3a2a','none',0)+S.rectFloor(C,-80,80,9,14,'#3a3a46','none',0)+S.rectFloor(C,-80,80,6.6,9,'#5a5a66','none',0);
 bg+=P3.porchHouse(C,-9,18,9,'#5a6a9a','#2a2a3a',true)+P3.porchHouse(C,3,19,8,'#7a5a6a','#2a2a3a',true)+P3.autumnTree(C,-3.6,16,1.3,['#8a5a3a','#a86a3a','#6a4a2a'])+P3.porchHouse(C,14,18,8,'#5a7a6a','#2a2a3a',true)+P3.stringLights(C,[[-6,3.4,10],[-2,2.9,10],[2,3.2,10],[6,2.8,10]],28);
 return {C,bg,fg:'',spots:[[-.7,7.4],[.5,7.6]],rim:'#8ab0ff',cast:[1,.16],grade:['#8ab0ff',.6,'#1a1a4a'],amb:'ambNight'};};
LOC.assembly=()=>{const C=S.Cam({vx:960,PH:560});let bg=S.rectFloor(C,-8,8,1,16,'#c8a878','none',0)+S.rectBack(C,16,-8,8,0,6,'#e8d8c0')+S.rectSide(C,-8,1,16,0,6,'#dccab0')+S.rectSide(C,8,1,16,0,6,'#dccab0')+S.poly([C.P(-8,6,1),C.P(8,6,1),C.P(8,6,16),C.P(-8,6,16)],'#f2ece0');
 bg+=S.box(C,{x0:-4,x1:4,y0:0,y1:.9,z0:13,z1:16},{front:'#8a5a3a',top:'#a8784e'})+S.rectBack(C,16,-2.6,2.6,2.6,5,'#2a3a6a')+S.rectBack(C,15.99,-2.3,2.3,2.8,4.8,'#3a5a9a');
 return {C,bg,fg:'',spots:[[0,14.2],[1,14.4]],rim:'#ffd59a',cast:[1,.15],grade:['#fff0d8',.55],amb:'ambCrowd'};};
const AMB={classroom:'ambSchool',hallway:'ambSchool',cafeteria:'ambCrowd',schoolGym:'ambCrowd',library:'ambRoom',bedroom:'ambNight',kitchen:'ambRoom',office:'ambOffice',meetingRoom:'ambOffice',ceoOffice:'ambOffice',streetDay:'ambStreet',cityNight:'ambNight',parkSunset:'ambNature',forest:'ambNature',rainyNight:'ambRain',mall:'ambCrowd',concertStage:'ambCrowd',nightclub:'ambCrowd',airport:'ambCrowd',stadium:'ambCrowd',carnival:'ambCrowd',schoolYard:'ambStreet',beach:'ambNature',farm:'ambNature',mountains:'ambNature',suburbs:'ambStreet',snowStreet:'ambStreet'};
const SCREEN=new Set(['flash','speedLines','slowmo','counter','statBar','wordSlam','typewriter','stamp','underline','glitchText','chapter','notification','likes','progressBar','nameTag','timer','confetti','fireworks','rain','lightning','snowfall','bubbles','vhsRewind','coinRain','billRain']);
const FXI=Object.fromEntries(FX.map(e=>[e.id,e]));
// gestures -> arm params [left,right] (+flags)
const G={
 idle:{arms:[[6,0,16,0,0],[6,0,16,0,0]]},
 wave:{arms:[[6,0,16,0,0],null],wave:1},
 handsFace:{arms:[[20,-30,-10,-100,0],[20,-30,-10,-100,0]]},
 cheer:{arms:[[30,-90,40,-200,-20],[30,-90,40,-200,20]]},
 point:{arms:[[6,0,16,0,0],[30,-40,80,-70,-60]]},
 phone:{arms:[[6,0,16,0,0],[20,-30,-10,-110,-10]],prop:'phone',side:1},
 money:{arms:[[6,0,16,0,0],[30,-40,40,-100,-10]],prop:'money',side:1},
 coffee:{arms:[[10,0,30,-30,0],[6,0,16,0,0]],prop:'coffee',side:-1},
 book:{arms:[[6,0,16,0,0],[30,-30,20,-90,0]],prop:'book',side:1},
 shrug:{arms:[[30,-20,60,-60,30],[30,-20,60,-60,-30]]},
 think:{arms:[[6,0,16,0,0],[20,-40,-34,-128,0]]},
 facepalm:{arms:[[6,0,16,0,0],[20,-40,-46,-150,0]]},
 crossed:{arms:[[20,10,-82,-54,0],[20,20,-70,-40,0]],over:'both'},
 pocket:{arms:[[10,-10,-30,-20,0],[10,-10,-30,-20,0]],pocket:1},
 talk:{arms:[[6,0,16,0,0],null],talkHand:1},
 fists:{arms:[[20,-20,-20,-80,0],[20,-20,-20,-80,0]]},
};
const ease=A.ease,lerp=A.lerp;
const lerpArm=(a,b,k)=>a.map((v,i)=>lerp(v,b[i],k));
function armsAt(gs,t,lt){ // gs:[[t,'name']]
 let cur='idle',prev='idle',tc=-9;for(const [tt,g] of gs) if(t>=tt){prev=cur;cur=g;tc=tt;}
 const res=(name)=>{const g=G[name]||G.idle;return [g.arms[0]||G.idle.arms[0],g.arms[1]||(g.wave?A.wave(lt):g.talkHand?[10,-10,30+Math.sin(lt*6)*14,-60+Math.sin(lt*4)*10,0]:G.idle.arms[1])];};
 const k=ease((t-tc)/.2);const a=res(prev),b=res(cur);
 return {arms:[lerpArm(a[0],b[0],k),lerpArm(a[1],b[1],k)],g:G[cur]||G.idle};}
function stepAt(list,t,def){let v=def;for(const [tt,x] of list||[]) if(t>=tt)v=x;return v;}
function actorState(a,t){ // position + walk
 let X=a.at[0],Z=a.at[1],walking=null,dist=0;
 for(const m of a.moves||[]){const len=Math.hypot(m.to[0]-X,m.to[1]-Z);
  if(t>=m.t1){dist+=len;X=m.to[0];Z=m.to[1];continue;}
  if(t>m.t0){const k=ease((t-m.t0)/(m.t1-m.t0));const nx=lerp(X,m.to[0],k),nz=lerp(Z,m.to[1],k);dist+=len*k;walking={k};X=nx;Z=nz;}
  break;}
 return {X,Z,walking,phase:dist/1.4};}
function buildShot(shot){const st=(typeof shot.set==='function'?shot.set:LOC[shot.set])();
 const actors=(shot.actors||[]).map(a=>({...a,base:typeof a.char==='string'?CH.get(a.char):CH.make(a.char)}));
 let bgStatic=st.bg;if(shot.crowd){const c=shot.crowd;bgStatic+=crowdReal(st.C,c.x[0],c.x[1],c.z[0],c.z[1],c.n||20,{blurFar:c.blurFar,back:c.back,rim:st.rim,cast:st.cast});}
 return {st,actors,bgStatic,fgStatic:st.fg+(shot.fgHeads?fgHeads(st.C,shot.fgHeads,shot.fgBlur??12):''),gradeSvg:S.grade(...st.grade),amb:shot.amb??st.amb??AMB[shot.set]};}
function headOf(C,s,base){const [fx,fy]=C.P(s.X,base.Y??0,s.Z);const hgt=C.k(s.Z)*C.PH*((base.s??1.08)/1.08)*(base.legL?1:1);return {fx,fy,hx:fx,hy:fy-hgt*.84,bx:fx,by:fy-hgt*.5,W,H};}
function frameLayers(shot,B,t){const C=B.st.C;let act='',world='',screen='',camFx={dx:0,dy:0,scale:1,blur:0,sat:null};
 const ctxs={};
 // actors (far first)
 const states=B.actors.map(a=>({a,s:actorState(a,t)})).sort((p,q)=>q.s.Z-p.s.Z);
 for(const {a,s} of states){const b=a.base;const mood=stepAt(a.moods,t,b.h.mood);const ag=armsAt(a.gestures||[],t,t);
  let legs=b.legs,lift=[0,0],bob=0,arms=ag.arms;
  if(s.walking){const w=A.walk(s.phase*2,1);legs=w.legs;lift=w.lift;bob=w.bob;if(!(a.gestures||[]).some(g=>g[0]<=t&&g[1]!=='idle'))arms=w.arms;}
  const pose=stepAt(a.poses,t,a.pose);const g=ag.g;
  const o={...b,arms,legs,lift,Y:a.Y??0,rim:B.st.rim,cast:B.st.cast,back:pose==='back',sit:pose==='sit'?'chair':pose==='floor'?'floor':undefined,lie:pose==='lie'?1:undefined,
   pocket:g.pocket,armsOver:g.over||(arms===b.arms?b.armsOverDefault:undefined),
   prop:(g.prop||a.prop)?{side:g.side||a.propSide||1,svg:HP[g.prop||a.prop]}:null,
   h:{...b.h,mood,blink:A.blink(t,a.id.length*.37),talk:A.talk(t,a.talk||[]),look:a.look??0}};
  const lastMood=(a.moods||[]).filter(m=>m[0]<=t).pop();
  act+=A.animActor(C,s.X,s.Z,o,{bob,sq:lastMood?A.pop(t,lastMood[0],1.2):[1,1],br:A.breathe(t,a.id.length)});
  ctxs[a.id]=headOf(C,s,o);}
 const defCtx=ctxs[(shot.actors||[])[0]?.id]||{W,H,fx:W/2,fy:900,hx:W/2,hy:400,bx:W/2,by:650};
 // fx
 for(const [t0,id,opt={}] of shot.fx||[]){const e=FXI[id];if(!e)continue;const d=t-t0;if(d<0||d>e.dur)continue;const r=e.draw(d,ctxs[opt.target]||defCtx);
  if(r.over){if(SCREEN.has(id))screen+=r.over;else world+=r.over;}
  if(r.cam){camFx.dx+=r.cam.dx||0;camFx.dy+=r.cam.dy||0;if(r.cam.scale){camFx.scale*=r.cam.scale;camFx.ox=r.cam.ox;camFx.oy=r.cam.oy;}camFx.blur=Math.max(camFx.blur,r.cam.blur||0);if(r.cam.sat!=null)camFx.sat=r.cam.sat;}}
 // texts
 for(const tx of shot.texts||[]){const [t0,t1,kind,str,opt={}]=tx;if(t<t0||t>t1)continue;const d=t-t0;
  if(kind==='bubble'){const c=ctxs[opt.actor]||defCtx;const sc=A.ease(d/.18)*(1+.15*Math.sin(Math.min(1,d/.18)*Math.PI));const w=Math.max(220,str.length*20+60);
   world+=`<g transform="translate(${f(c.hx+(opt.dx??0))},${f(c.hy-150+(opt.dy??0))}) scale(${sc.toFixed(3)})"><path d="M${-w/2},-50 Q${-w/2},-95 ${-w/2+45},-95 L${w/2-45},-95 Q${w/2},-95 ${w/2},-50 Q${w/2},-5 ${w/2-45},-5 L20,-5 L-10,35 L-10,-5 L${-w/2+45},-5 Q${-w/2},-5 ${-w/2},-50Z" fill="#fff" stroke="#0d0b12" stroke-width="4"/><text y="-38" text-anchor="middle" font-family="DejaVu Sans" font-weight="bold" font-size="36" fill="#0d0b12">${str}</text></g>`;}
  if(kind==='caption'){screen+=`<text x="${W/2}" y="${H-70}" text-anchor="middle" font-family="DejaVu Sans" font-weight="bold" font-size="54" fill="#fff" stroke="#0d0b12" stroke-width="8" paint-order="stroke">${str}</text>`;}
  if(kind==='title'){const sc=A.ease(d/.25)*(1+.2*Math.sin(Math.min(1,d/.25)*Math.PI));screen+=`<g transform="translate(${W/2},${opt.y??220}) scale(${sc.toFixed(3)}) rotate(${opt.rot??-3})"><text text-anchor="middle" font-family="DejaVu Sans" font-weight="bold" font-size="${opt.size??110}" fill="${opt.color??'#ffd24a'}" stroke="#0d0b12" stroke-width="7" paint-order="stroke">${str}</text></g>`;}
  if(kind==='label'){const c=ctxs[opt.actor]||defCtx;world+=`<g transform="translate(${f(c.hx+90)},${f(c.hy-120)})"><path d="M0,0 L-50,60" stroke="#fff" stroke-width="4"/><rect x="-6" y="-44" width="${str.length*22+30}" height="48" rx="10" fill="#e3232c" stroke="#0d0b12" stroke-width="3"/><text x="${(str.length*22+30)/2-6}" y="-11" text-anchor="middle" font-family="DejaVu Sans" font-weight="bold" font-size="30" fill="#fff">${str}</text></g>`;}}
 // camera
 const cam=shot.camera||{};const D=shot.dur;const k=cam.ease==='linear'?t/D:ease(t/D);
 const z=lerp(...(cam.zoom||[1,1.06]),k)*camFx.scale;
 let fcx=W/2,fcy=H*.5;if(cam.follow&&ctxs[cam.follow]){fcx=ctxs[cam.follow].hx;fcy=lerp(ctxs[cam.follow].hy,ctxs[cam.follow].by,.35);}else if(cam.focus){fcx=cam.focus[0];fcy=cam.focus[1];}
 if(camFx.ox!=null&&camFx.scale!==1){fcx=camFx.ox;fcy=camFx.oy;}
 const pan=cam.pan?[lerp(cam.pan[0][0],cam.pan[1][0],k),lerp(cam.pan[0][1],cam.pan[1][1],k)]:[0,0];
 const hand=cam.handheld===false?[0,0]:[Math.sin(t*1.3)*3+Math.sin(t*2.9)*2,Math.cos(t*1.1)*2.5];
 // keep frame filled: clamp so scaled scene covers screen
 const tx=camFx.dx+pan[0]+hand[0], ty=camFx.dy+pan[1]+hand[1];
 const camT=`translate(${f(fcx+tx)},${f(fcy+ty)}) scale(${z.toFixed(4)}) translate(${f(-fcx)},${f(-fcy)})`;
 // transitions
 let trans='';const ti=shot.transIn;if(ti==='fade'&&t<.35)trans=`<rect width="${W}" height="${H}" fill="#000" opacity="${(1-t/.35).toFixed(3)}"/>`;
 if(ti==='flash'&&t<.3)trans=`<rect width="${W}" height="${H}" fill="#fff" opacity="${(1-t/.3).toFixed(3)}"/>`;
 const blur=(ti==='whip'&&t<.25)?(1-t/.25)*24:camFx.blur;const wx=(ti==='whip'&&t<.25)?(1-ease(t/.25))*-500:0;
 return {camT:wx?`translate(${f(wx)},0) `+camT:camT,act,world,screen:screen+trans,filter:`${blur?`blur(${blur.toFixed(1)}px) `:''}${camFx.sat!=null?`saturate(${camFx.sat})`:''}`||'none',bgBlur:cam.bgBlur||0};}
// audio events for a shot (local times)
function shotEvents(shot,B){const ev=[];
 for(const [t0,id] of shot.fx||[]){const e=FXI[id];if(e)for(const [o,s] of e.sfx)ev.push([t0+o,s,.8]);}
 for(const [t,id,v] of shot.sfx||[])ev.push([t,id,v??.8]);
 if(shot.transIn==='whip')ev.push([0,'whooshCut',.7]);if(shot.transIn==='flash')ev.push([0,'flash',.6]);
 for(const a of shot.actors||[]){let last=-1;for(let t=0;t<shot.dur;t+=1/60){const s=actorState({...a,base:null},t);if(!s.walking)continue;const st=Math.floor(s.phase*2);if(st!==last){if(last>=0)ev.push([t,st%2?'step':'stepHeel',.45]);last=st;}}}
 for(const tx of shot.texts||[]) if(tx[2]==='bubble'||tx[2]==='title')ev.push([tx[0],'pop',.5]);
 return ev;}
function timeline(project){let t=0;const out=[];for(const sh of project.shots){out.push({shot:sh,start:t});t+=sh.dur;}return {items:out,total:t};}
// word-by-word subtitles from transcription: project.captions={words:[{start,end,word}], group:4, style:'pop'}
function captionsAt(project,t){const cp=project.captions;if(!cp||!cp.words)return '';const g=cp.group||4;const ws=cp.words;
 let gi=-1;for(let i=0;i<ws.length;i+=g){const a=ws[i].start,b=ws[Math.min(ws.length-1,i+g-1)].end+.15;if(t>=a&&t<=b){gi=i;break;}}
 if(gi<0)return '';const grp=ws.slice(gi,gi+g);let x=0;const parts=grp.map(w=>{const on=t>=w.start&&t<=w.end+.05;return `<tspan fill="${on?'#ffd24a':'#ffffff'}">${w.word.replace(/&/g,'&amp;').replace(/</g,'&lt;')} </tspan>`;}).join('');
 const d=t-grp[0].start;const sc=d<.12?.85+.15*(d/.12):1;
 return `<g transform="translate(${W/2},${H-80}) scale(${sc.toFixed(3)})"><text text-anchor="middle" font-family="DejaVu Sans" font-weight="bold" font-size="58" stroke="#0d0b12" stroke-width="9" paint-order="stroke">${parts}</text></g>`;}
module.exports={captionsAt,LOC,G,buildShot,frameLayers,shotEvents,timeline,W,H};
