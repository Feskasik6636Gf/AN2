// Director: turns a project (list of shots) into frames + audio events.
const S=require('./stage.js');const {f}=S;
const {SETS}=require('./sets.js');const {L2}=require('./sets2.js');
const A=require('./anim.js');const {FX}=require('./fx.js');const CH=require('./chars.js');
const {HP}=require('./props.js');const P3=require('./props3d.js');const {crowdReal,fgHeads}=require('./crowd.js');
const X=require('./extras.js');
const W=1920,H=1080;let CUR={words:null,total:0};
const {L3}=require('./sets3.js');const {L4}=require('./sets4.js');const {L5}=require('./sets5.js');const {L6}=require('./sets6.js');const {L7}=require('./sets7.js');
const LOC={...SETS,...L2,...L3,...L4,...L5,...L6};LOC.suburbs=L3.road; // detailed versions replace the flat ones
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
Object.assign(LOC,L3,L4,L5,L6,L7);LOC.suburbs=L3.road; // detailed versions always win over legacy sets defined above
const AMB={classroom:'ambSchool',hallway:'ambSchool',cafeteria:'ambCrowd',schoolGym:'ambCrowd',library:'ambRoom',bedroom:'ambNight',kitchen:'ambRoom',office:'ambOffice',meetingRoom:'ambOffice',ceoOffice:'ambOffice',streetDay:'ambStreet',cityNight:'ambNight',parkSunset:'ambNature',forest:'ambNature',rainyNight:'ambRain',mall:'ambCrowd',concertStage:'ambCrowd',nightclub:'ambCrowd',airport:'ambCrowd',stadium:'ambCrowd',carnival:'ambCrowd',schoolYard:'ambStreet',beach:'ambNature',farm:'ambNature',mountains:'ambNature',suburbs:'ambStreet',snowStreet:'ambStreet',lockerRoom:'ambSchool',hospitalRoom:'ambRoom',hospitalHall:'ambOffice',supermarket:'ambCrowd',convenience:'ambRoom',cafeInside:'ambCrowd',restaurant:'ambCrowd',fastFood:'ambCrowd',cinema:'ambRoom',bank:'ambOffice',policeStation:'ambOffice',jailCell:'ambRoom',courtroom:'ambOffice',studio:'ambRoom',barbershop:'ambRoom',pharmacy:'ambRoom',hotelLobby:'ambOffice',subway:'ambCrowd',recordStore:'ambRoom',basketball:'ambStreet',desert:'ambNature',parkingLot:'ambStreet',gasStation:'ambStreet',rooftopNight:'ambNight',bridge:'ambStreet',playground:'ambNature',harbor:'ambNature',alley:'ambNight',moon:'ambNight',spaceStation:'ambOffice',busStop:'ambStreet',nightSuburb:'ambNight',assembly:'ambCrowd',bathroom:'ambRoom',teenRoomDay:'ambRoom',garage:'ambRoom',attic:'ambRoom',basement:'ambRoom',diningEvening:'ambRoom',homeGym:'ambRoom',principalOffice:'ambOffice',nurseRoom:'ambRoom',scienceLab:'ambSchool',musicRoom:'ambSchool',livingRoom:'ambRoom'};
const SCREEN=new Set(['flash','speedLines','slowmo','counter','statBar','wordSlam','typewriter','stamp','underline','glitchText','chapter','notification','likes','progressBar','nameTag','timer','confetti','fireworks','rain','lightning','snowfall','bubbles','vhsRewind','coinRain','billRain']);
const FXI=Object.fromEntries(FX.map(e=>[e.id,e]));
FXI.alarm={id:'alarm',name:'Тревога (строб 2 Гц)',dur:3,sfx:[[0,'alert'],[1,'alert'],[2,'alert']],draw:(d,c,o)=>({over:X.alarm(d,o)})};SCREEN.add('alarm');
const LOUD=new Set(['shake','flash','zoomPunch','wordSlam','explosion','lightning','whipPan','impactStar','shockwave','dollyZoom','glitchText','fireworks']);
// gestures -> arm params [left,right] (+flags)
const G={
 idle:{arms:[[6,0,16,0,0],[6,0,16,0,0]]},
 wave:{arms:[[6,0,16,0,0],null],wave:1,handR:'open'},
 handsFace:{arms:[[20,-30,-10,-100,0],[20,-30,-10,-100,0]],hand:'open'},
 cheer:{arms:[[30,-90,40,-200,-20],[30,-90,40,-200,20]],hand:'fist'},
 point:{arms:[[6,0,16,0,0],[30,-40,80,-70,-60]],handR:'point'},
 phone:{arms:[[6,0,16,0,0],[20,-30,-10,-110,-10]],prop:'phone',side:1,handR:'grip'},
 money:{arms:[[6,0,16,0,0],[30,-40,40,-100,-10]],prop:'money',side:1,handR:'grip'},
 coffee:{arms:[[10,0,30,-30,0],[6,0,16,0,0]],prop:'coffee',side:-1,handL:'grip'},
 book:{arms:[[6,0,16,0,0],[30,-30,20,-90,0]],prop:'book',side:1,handR:'grip'},
 shrug:{arms:[[30,-20,60,-60,30],[30,-20,60,-60,-30]],hand:'open'},
 think:{arms:[[6,0,16,0,0],[20,-40,-34,-128,0]],handR:'fist'},
 facepalm:{arms:[[6,0,16,0,0],[20,-40,-46,-150,0]],handR:'flat'},
 crossed:{arms:[[20,10,-82,-54,0],[20,20,-70,-40,0]],over:'both',hand:'grip'},
 pocket:{arms:[[10,-10,-30,-20,0],[10,-10,-30,-20,0]],pocket:1},
 talk:{arms:[[6,0,16,0,0],null],talkHand:1},
 fists:{arms:[[20,-20,-20,-80,0],[20,-20,-20,-80,0]],hand:'fist'},
 clap:{dyn:t=>{const o=Math.abs(Math.sin(t*13))*14;return [[22,-16,-50-o,-72,0],[22,-16,-50-o,-72,0]];},hand:'flat'},
 salute:{arms:[[6,0,16,0,0],[20,-60,-22,-175,-10]],handR:'flat'},
 thumbsUp:{arms:[[6,0,16,0,0],[34,-30,38,-100,0]],handR:'thumb'},
 hips:{arms:[[48,-8,-4,-24,0],[48,-8,-4,-24,0]],hand:'fist'},
 flex:{arms:[[40,-70,30,-112,-20],[40,-70,30,-112,20]],hand:'fist'},
 pray:{arms:[[20,-26,-64,-84,0],[20,-26,-64,-84,0]],hand:'flat'},
 hug:{arms:[[28,0,-62,-50,0],[28,0,-62,-50,0]],hand:'open'},
 hugOpen:{arms:[[44,-26,64,-76,20],[44,-26,64,-76,-20]],hand:'open'},
 wipe:{dyn:t=>[[6,0,16,0,0],[20,-60,-24+Math.sin(t*11)*9,-172,0]],handR:'flat'},
 blowkiss:{dyn:t=>{const k=(Math.sin(t*3)+1)/2;return [[6,0,16,0,0],[20-14*k+34*k,-50,-36+k*80,-150+k*20,-20*k]];},handR:'open'},
 wave2:{dyn:t=>[A.wave(t+.4).map((v,i)=>i===2||i===4?v:v),A.wave(t)].map((a,i)=>i===0?[a[0],a[1],a[2],a[3],-a[4]]:a),hand:'open'},
 dance:{dyn:t=>A.dance(t).arms,hand:'open'},
 punch:{dyn:t=>{const k=Math.max(0,Math.sin(t*9));return [[20,-20,-20,-80,0],[24+20*k,-30,-14+90*k,-86+16*k,-50*k]];},hand:'fist'},
};
const ease=A.ease,lerp=A.lerp;
const lerpArm=(a,b,k)=>a.map((v,i)=>lerp(v,b[i],k));
function armsAt(gs,t,lt){ // gs:[[t,'name']]
 let cur='idle',prev='idle',tc=-9;for(const [tt,g] of gs) if(t>=tt){prev=cur;cur=g;tc=tt;}
  const res=(name)=>{const g=G[name]||G.idle;if(g.dyn)return g.dyn(lt);return [g.arms[0]||G.idle.arms[0],g.arms[1]||(g.wave?A.wave(lt):g.talkHand?[10,-10,30+Math.sin(lt*6)*14,-60+Math.sin(lt*4)*10,0]:G.idle.arms[1])];};
 const k=ease((t-tc)/.2);const a=res(prev),b=res(cur);
 const gg=G[cur]||G.idle;return {arms:[lerpArm(a[0],b[0],k),lerpArm(a[1],b[1],k)],g:gg,hands:[gg.handL||gg.hand||'relax',gg.handR||gg.hand||'relax']};}
function stepAt(list,t,def){let v=def;for(const [tt,x] of list||[]) if(t>=tt)v=x;return v;}
function actorState(a,t){ // position + walk
 let X=a.at[0],Z=a.at[1],walking=null,dist=0;
 for(const m of a.moves||[]){const len=Math.hypot(m.to[0]-X,m.to[1]-Z);
  if(t>=m.t1){dist+=len;X=m.to[0];Z=m.to[1];continue;}
  if(t>m.t0){const k=ease((t-m.t0)/(m.t1-m.t0));const nx=lerp(X,m.to[0],k),nz=lerp(Z,m.to[1],k);dist+=len*k;walking={k,run:!!m.run,dir:Math.sign(m.to[0]-X)||1};X=nx;Z=nz;}
  break;}
 const rr=(a.moves||[]).some(m=>m.run&&t>m.t0&&t<m.t1);return {X,Z,walking,phase:dist/(rr?2.2:1.4)};}
function buildShot(shot){const st=shot.insert?{C:S.Cam({vx:960,PH:620}),bg:'',fg:'',spots:[],rim:'#ffd59a',cast:[1,.15],grade:['#fff1d8',.3],amb:null}:(typeof shot.set==='function'?shot.set:LOC[shot.set])();
 const actors=(shot.actors||[]).map(a=>({...a,base:typeof a.char==='string'?CH.get(a.char):CH.make(a.char)}));
 let bgStatic=st.bg;if(shot.crowd){const c=shot.crowd;bgStatic+=crowdReal(st.C,c.x[0],c.x[1],c.z[0],c.z[1],c.n||20,{blurFar:c.blurFar,back:c.back,rim:st.rim,cast:st.cast});}
 return {st,actors,bgStatic,fgStatic:st.fg+(shot.fgHeads?fgHeads(st.C,shot.fgHeads,shot.fgBlur??12):''),gradeSvg:S.grade(...st.grade),amb:shot.amb??st.amb??AMB[shot.set]??(shot.insert?null:'ambRoom')};}
function headOf(C,s,base){const [fx,fy]=C.P(s.X,base.Y??0,s.Z);const u=C.k(s.Z)*C.PH/470*((base.s??1.08)/1.08);const hS=base.headS??1,hip=120*(base.legL??1),top=hip+112*(base.torsoL??1)+(base.neck??0);
 const sit=base.sit?hip*(base.sit==='floor'?.75:.38):0;return {fx,fy,hx:fx+(base.lean??0)*u,hy:fy-u*(top+62*hS-(base.stoop??0)-sit),hr:u*78*hS,bx:fx,by:fy-u*(hip+56-sit),W,H};}
function frameLayers(shot,B,t){const C=B.st.C;let act='',world='',screen='',camFx={dx:0,dy:0,scale:1,blur:0,sat:null};
 const ctxs={};
 // actors (far first)
 const states=B.actors.map(a=>({a,s:actorState(a,t)})).sort((p,q)=>q.s.Z-p.s.Z);
 for(const {a,s} of states){const b=a.base;const mood=stepAt(a.moods,t,b.h.mood);const ag=armsAt(a.gestures||[],t,t);
  let legs=b.legs,lift=[0,0],bob=0,arms=ag.arms;
  const pose=stepAt(a.poses,t,a.pose);let extra={};
  if(s.walking){const w=s.walking.run?A.run(s.phase*2,1):A.walk(s.phase*2,1);legs=w.legs;lift=w.lift;bob=w.bob;if(!(a.gestures||[]).some(g=>g[0]<=t&&g[1]!=='idle'))arms=w.arms;if(s.walking.run)extra.rot=7*s.walking.dir;}
  else if(pose==='dance'){const w=A.dance(t,a.id.length);legs=w.legs;lift=w.lift;bob=w.bob;arms=w.arms;extra.sq=w.sq;extra.headBob=w.headBob;extra.dx=w.dx;ag.hands=['open','open'];}
  const g=ag.g;
  const o={...b,arms,legs,lift,hands:ag.hands,Y:a.Y??0,rim:B.st.rim,cast:B.st.cast,back:pose==='back',sit:pose==='sit'?'chair':pose==='floor'?'floor':undefined,lie:pose==='lie'?1:undefined,
   pocket:g.pocket,armsOver:g.over||(arms===b.arms?b.armsOverDefault:undefined),
   prop:(g.prop||a.prop)?{side:g.side||a.propSide||1,svg:HP[g.prop||a.prop]}:null,
   headBob:(extra.headBob??0)+(A.talk(t,a.talk||[])>.3?Math.sin(t*9)*1.2:0),
   h:{...b.h,mood,blink:A.blink(t,a.id.length*.37),talk:A.talk(t,a.talk||[]),look:(a.look??0)+Math.round((A.noise(Math.floor(t/1.4)+a.id.length*3.1)-.5)*7),browBop:A.talk(t,a.talk||[])>.55?-2.4:0}};
  const lastMood=(a.moods||[]).filter(m=>m[0]<=t).pop();let sq=extra.sq||(lastMood?A.pop(t,lastMood[0],1.2):[1,1]),dxr=extra.dx||0,rot=extra.rot||0,spin=1;
  for(const [rt,rk] of a.reacts||[]){const d=t-rt;if(d<0)continue;
   if(rk==='jump'&&d<.55){const p=d/.55;bob+=p<.18?8*Math.sin(p/.18*Math.PI):-46*Math.sin((p-.18)/.82*Math.PI);sq=p<.18?[1.06,.92]:[.96,1.06];}
   if(rk==='flinch'&&d<.35){dxr+=Math.sin(d*70)*6*(1-d/.35);sq=[1.04,.95];}
   if(rk==='slump'){const k=A.ease(d/.4);sq=[1+.03*k,1-.05*k];bob+=6*k;}
   if(rk==='nod'&&d<.8)bob+=Math.max(0,Math.sin(d*Math.PI*2.5))*7;
   if(rk==='lean'&&d<1.2)dxr+=Math.sin(Math.min(1,d/.3)*Math.PI/2)*10*(1-Math.max(0,(d-.8)/.4));
   if(rk==='jumpHigh'&&d<.8){const p=d/.8;bob+=-92*Math.sin(p*Math.PI);if(p>.1&&p<.9){legs=[-12,12];lift=[34*Math.sin(p*Math.PI),34*Math.sin(p*Math.PI)];}sq=p<.15?[1.08,.9]:p>.85?[1.07,.92]:[.95,1.06];}
   if(rk==='spin'&&d<.7){spin=Math.cos(d/.7*Math.PI*2);}
   if(rk==='bow'&&d<1.1){const p=Math.sin(d/1.1*Math.PI);sq=[1,1-.07*p];bob+=8*p;o.headBob=(o.headBob||0)+10*p;o.stoop=(o.stoop||0)+14*p;}
   if(rk==='laughShake'&&d<1.6){const p=Math.min(1,d/.2)*Math.min(1,(1.6-d)/.3);bob+=-Math.abs(Math.sin(d*22))*6*p;dxr+=Math.sin(d*40)*1.6*p;o.headBob=(o.headBob||0)+Math.sin(d*22)*3*p;}
   if(rk==='tremble'&&d<1.5){dxr+=Math.sin(d*85)*2.2*Math.min(1,(1.5-d)/.3);}
   if(rk==='fall'||rk==='getup'){const dur=rk==='fall'?.45:.7;const p=A.ease(d/dur);const base=rk==='fall'?p:1-p;if(rk==='getup'&&d>dur)continue;rot+=(a.fallDir||1)*82*base;bob+=rk==='fall'&&d<dur?-Math.sin(p*Math.PI)*18:0;}}
  // facing: [[t,-1|1]] with a quick turn (edge-on squeeze); autoFace turns towards the walking direction
  let fc=1;{const fl=a.facing||(a.flip?[[0,-1]]:[]);let cur=1,prevF=1,tc=-9;for(const [ft,fv] of fl)if(t>=ft){prevF=cur;cur=fv;tc=ft;}const k=A.ease((t-tc)/.22);fc=prevF===cur?cur:Math.cos(Math.PI*(prevF===1?k:1-k)*1);if(prevF!==cur&&Math.abs(fc)<.12)fc=.12*Math.sign(cur);if(a.autoFace&&s.walking)fc=s.walking.dir;}
  fc*=spin;const [afx,afy]=C.P(s.X,o.Y??0,s.Z);
  const g0=A.animActor(C,s.X,s.Z,o,{bob,sq,br:A.breathe(t,a.id.length)});
  const tr=[];if(dxr)tr.push(`translate(${f(dxr)},0)`);if(rot)tr.push(`rotate(${rot.toFixed(1)} ${f(afx)} ${f(afy)})`);if(fc!==1)tr.push(`translate(${f(afx)},0) scale(${fc.toFixed(3)},1) translate(${f(-afx)},0)`);
  act+=tr.length?`<g transform="${tr.join(' ')}">${g0}</g>`:g0;
  ctxs[a.id]=headOf(C,s,o);}
 if(shot.insert&&X.INS[shot.insert.type])act=X.INS[shot.insert.type](shot.insert,t)+act;
 const defCtx=ctxs[(shot.actors||[])[0]?.id]||{W,H,fx:W/2,fy:900,hx:W/2,hy:400,bx:W/2,by:650};
 // fx
 for(const [t0,id,opt={}] of shot.fx||[]){const e=FXI[id];if(!e)continue;const d=t-t0;if(d<0||d>(opt.dur??e.dur))continue;const r=e.draw(d,ctxs[opt.target]||defCtx,opt);
  if(r.over){if(SCREEN.has(id))screen+=r.over;else world+=r.over;}
  if(r.cam){camFx.dx+=r.cam.dx||0;camFx.dy+=r.cam.dy||0;if(r.cam.scale){camFx.scale*=r.cam.scale;camFx.ox=r.cam.ox;camFx.oy=r.cam.oy;}camFx.blur=Math.max(camFx.blur,r.cam.blur||0);if(r.cam.sat!=null)camFx.sat=r.cam.sat;}}
 // texts
 for(const tx of shot.texts||[]){const [t0,t1,kind,str,opt={}]=tx;if(t<t0||t>t1)continue;const d=t-t0;
  const n=String(str).split(/\s+/).filter(Boolean).length,gt0=(shot._start??0)+t0,vw=CUR.words?CUR.words.filter(w=>w.start>=gt0-.15&&w.start<(shot._start??0)+t1):null;
  const shown=opt.sync===false?n:X.revealCount(n,d,t1-t0,vw&&vw.length?vw:null,gt0);
  if(kind==='bubble'){world+=X.speech(ctxs[opt.actor]||defCtx,str,d,t1-t0,shown,opt);}
  if(kind==='thought'){world+=X.thought(ctxs[opt.actor]||defCtx,str,d,t1-t0,shown,opt);}
  if(kind==='neon'){world+=X.neon(ctxs[opt.actor]||defCtx,str,(shot._start??0)+t-(opt.since??gt0),opt);}
  if(kind==='tag'){let px,py;if(opt.at){[px,py]=C.P(...opt.at);}else if(opt.actor&&ctxs[opt.actor]){px=ctxs[opt.actor].bx;py=ctxs[opt.actor].by;}else{[px,py]=opt.xy??[W/2,H/2];}world+=X.tag(px,py,str,d,opt);}
  if(kind==='caption'){screen+=`<text x="${W/2}" y="${H-70}" text-anchor="middle" font-family="DejaVu Sans" font-weight="bold" font-size="54" fill="#fff" stroke="#0d0b12" stroke-width="8" paint-order="stroke">${str}</text>`;}
  if(kind==='title'){const sc=A.ease(d/.25)*(1+.2*Math.sin(Math.min(1,d/.25)*Math.PI));screen+=`<g transform="translate(${W/2},${opt.y??220}) scale(${sc.toFixed(3)}) rotate(${opt.rot??-3})"><text text-anchor="middle" font-family="DejaVu Sans" font-weight="bold" font-size="${opt.size??110}" fill="${opt.color??'#ffd24a'}" stroke="#0d0b12" stroke-width="7" paint-order="stroke">${str}</text></g>`;}
  if(kind==='label'){const c=ctxs[opt.actor]||defCtx;world+=`<g transform="translate(${f(c.hx+90)},${f(c.hy-120)})"><path d="M0,0 L-50,60" stroke="#fff" stroke-width="4"/><rect x="-6" y="-44" width="${str.length*22+30}" height="48" rx="10" fill="#e3232c" stroke="#0d0b12" stroke-width="3"/><text x="${(str.length*22+30)/2-6}" y="-11" text-anchor="middle" font-family="DejaVu Sans" font-weight="bold" font-size="30" fill="#fff">${str}</text></g>`;}}
 // camera
 const cam=shot.camera||{};const D=shot.dur;const k=cam.ease==='linear'?t/D:ease(t/D);
 const amt=Math.max(.04,Math.min(.14,.03*D)),mv=cam.move??'push';
 const Z0=cam.zoom||(mv==='pull'?[1+amt*1.2,1]:mv==='hold'?[1.02,1.02]:mv==='punch'?[1,1+Math.min(.25,amt*2.2)]:mv==='track'?[1.12,1.12+amt*.5]:[1,1+amt]);
 const z=Math.max(1,lerp(...Z0,k)*camFx.scale);
 let fcx=W/2,fcy=H*.5;if(cam.follow&&ctxs[cam.follow]){fcx=ctxs[cam.follow].hx;fcy=lerp(ctxs[cam.follow].hy,ctxs[cam.follow].by,.35);}else if(cam.focus){fcx=cam.focus[0];fcy=cam.focus[1];}
 if(camFx.ox!=null&&camFx.scale!==1){fcx=camFx.ox;fcy=camFx.oy;}
 const PAN=cam.pan||(mv==='panL'?[[90,0],[-90,0]]:mv==='panR'?[[-90,0],[90,0]]:null);const pan=PAN?[lerp(PAN[0][0],PAN[1][0],k),lerp(PAN[0][1],PAN[1][1],k)]:[0,0];
 const hand=cam.handheld===false?[0,0]:[Math.sin(t*1.3)*3+Math.sin(t*2.9)*2,Math.cos(t*1.1)*2.5];
 // keep frame filled: clamp so scaled scene covers screen
 const tx=camFx.dx+pan[0]+hand[0], ty=camFx.dy+pan[1]+hand[1];
 let ax=fcx+tx-z*fcx,ay=fcy+ty-z*fcy;ax=Math.min(0,Math.max(W-z*W,ax));ay=Math.min(0,Math.max(H-z*H,ay)); // never show past the set edge
 const camT=`translate(${f(ax)},${f(ay)}) scale(${z.toFixed(4)})`;
 // transitions
 let trans='';const ti=shot.transIn;if(ti==='fade'&&t<.35)trans=`<rect width="${W}" height="${H}" fill="#000" opacity="${(1-t/.35).toFixed(3)}"/>`;
 if(ti==='flash'&&t<.3)trans=`<rect width="${W}" height="${H}" fill="#fff" opacity="${(1-t/.3).toFixed(3)}"/>`;
 let blur=(ti==='whip'&&t<.25)?(1-t/.25)*24:camFx.blur;if(cam.focusIn&&t<.7)blur=Math.max(blur,(1-ease(t/.7))*14);const wx=(ti==='whip'&&t<.25)?(1-ease(t/.25))*-500:0;
 return {camT:wx?`translate(${f(wx)},0) `+camT:camT,act,world,screen:X.DEFS+screen+trans,filter:`${blur?`blur(${blur.toFixed(1)}px) `:''}${camFx.sat!=null?`saturate(${camFx.sat})`:''}`||'none',bgBlur:cam.bgBlur||0};}
// audio events for a shot (local times)
const panOf=(shot,id)=>{const a=(shot.actors||[]).find(x=>x.id===id);return a?Math.max(-.8,Math.min(.8,a.at[0]/5)):0;};
function shotEvents(shot,B){const ev=[];
 for(const [t0,id,opt={}] of shot.fx||[]){const e=FXI[id];if(e)for(const [o,s] of e.sfx)if(o<=(opt.dur??e.dur))ev.push([t0+o,s,.8,panOf(shot,opt.target)]);}
 for(const [t,id,v] of shot.sfx||[])ev.push([t,id,v??.8]);
 if(shot.transIn==='whip')ev.push([0,'whooshCut',.7]);if(shot.transIn==='flash')ev.push([0,'flash',.6]);
 for(const a of shot.actors||[]){let last=-1;for(let t=0;t<shot.dur;t+=1/60){const s=actorState({...a,base:null},t);if(!s.walking)continue;const st=Math.floor(s.phase*2);if(st!==last){if(last>=0)ev.push([t,st%2?'step':'stepHeel',.45,Math.max(-.8,Math.min(.8,s.X/5))]);last=st;}}}
 for(const tx of shot.texts||[]){const k=tx[2],pn=panOf(shot,tx[4]?.actor);if(k==='bubble'||k==='title')ev.push([tx[0],'pop',.5,pn]);if(k==='thought')ev.push([tx[0],'whooshSoft',.55,pn],[tx[0]+.05,'sparkle',.35,pn]);if(k==='neon')ev.push([tx[0],'spotOn',.5,pn]);if(k==='tag')ev.push([tx[0],'pointer',.45,0]);}
 if(shot.insert)ev.push([0,'whooshSoft',.45,0]);
 return ev;}
function timeline(project){const words=project.words||(project.captions&&project.captions.words)||null;const sh=project.shots;
 // shot.w = index of the phrase's first word in words.json -> the cut lands 2 frames before that word
 const st=[0];for(let i=1;i<sh.length;i++){const w=sh[i].w;st.push(words&&w!=null&&words[w]?Math.max(st[i-1]+.2,words[w].start-2/30):st[i-1]+(sh[i-1].dur??3));}
 const out=[];let t=0;for(let i=0;i<sh.length;i++){const end=i<sh.length-1?st[i+1]:st[i]+(sh[i].dur??(words?Math.max(1,words[words.length-1].end+.6-st[i]):3));
  sh[i].dur=+(end-st[i]).toFixed(4);sh[i]._start=st[i];out.push({shot:sh[i],start:st[i]});t=end;}
 CUR={words,total:t,project};return {items:out,total:t};}
// global overlay: subscribe CTA (project.cta={name:'Канал',at:[130,-18]} ; negative = from the end)
function overlayAt(project,t){const c=project.cta;if(!c)return '';let s='';for(const a of c.at??[130,-18]){const t0=a<0?CUR.total+a:a;if(t0>0&&t0<CUR.total)s+=X.cta(t-t0,c);}return s;}
function ctaEvents(project){const c=project.cta;if(!c)return [];const ev=[];for(const a of c.at??[130,-18]){const t0=a<0?CUR.total+a:a;if(t0>0&&t0<CUR.total)ev.push([t0,'pop',.5,.6],[t0+1.85,'ding',.5,.6]);}return ev;}
// word-by-word subtitles from transcription: project.captions={words:[{start,end,word}], group:4, style:'pop'}
function captionsAt(project,t){const cp=project.captions;if(!cp||!cp.words)return '';const g=cp.group||4;const ws=cp.words;
 let gi=-1;for(let i=0;i<ws.length;i+=g){const a=ws[i].start,b=ws[Math.min(ws.length-1,i+g-1)].end+.15;if(t>=a&&t<=b){gi=i;break;}}
 if(gi<0)return '';const grp=ws.slice(gi,gi+g);let x=0;const parts=grp.map(w=>{const on=t>=w.start&&t<=w.end+.05;return `<tspan fill="${on?'#ffd24a':'#ffffff'}">${w.word.replace(/&/g,'&amp;').replace(/</g,'&lt;')} </tspan>`;}).join('');
 const d=t-grp[0].start;const sc=d<.12?.85+.15*(d/.12):1;
 return `<g transform="translate(${W/2},${H-80}) scale(${sc.toFixed(3)})"><text text-anchor="middle" font-family="DejaVu Sans" font-weight="bold" font-size="58" stroke="#0d0b12" stroke-width="9" paint-order="stroke">${parts}</text></g>`;}
module.exports={captionsAt,overlayAt,ctaEvents,LOC,G,FXI,LOUD,AMB,buildShot,frameLayers,shotEvents,timeline,W,H};
