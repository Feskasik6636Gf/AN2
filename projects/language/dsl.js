// DSL: scenes authored with ABSOLUTE voice times (s). A scene lasts until the next scene starts (cut 0.1s before the phrase).
const WORDS=require('./words.json');
const TOTAL=WORDS.duration;
const scenes=[];
const DROP=[];
const S=(t0,spec)=>{if(DROP.some(d=>Math.abs(d-t0)<.011))return;scenes.push({t0,spec});};
// hero age through-object (neon above the hero's head)
const AGES=[[0,'INTERPRETER'],[149,'DAY 1'],[381,'DAY 3'],[392,'DAY 4'],[552.6,'END OF WEEK'],[584,'MOON NOISE']];
const ageAt=t=>{let a='17';for(const [tt,v] of AGES)if(t>=tt)a=v;return a;};
const CYC=['push','push','pull','push','panR','push','panL','push','pull','push','push','panR','push','hold','pull','push','panL','push'];
const num=x=>typeof x==='number';
function rel(spec,t0,dur){
 const R=x=>+(x-t0).toFixed(3);const o={...spec};
 const mapPair=a=>a&&a.map(p=>[R(p[0]),...p.slice(1)]);const mapSpan=a=>a&&a.map(p=>[R(p[0]),R(p[1])]);
 if(o.fx)o.fx=o.fx.map(e=>[R(e[0]),...e.slice(1)]);
 if(o.sfx)o.sfx=o.sfx.map(e=>[R(e[0]),...e.slice(1)]);
 if(o.texts)o.texts=o.texts.map(e=>[R(e[0]),R(Math.min(e[1],t0+dur)),...e.slice(2)]);
 if(o.actors)o.actors=o.actors.map(a=>{const b={...a};
  for(const k of ['moods','gestures','poses','reacts','facing'])if(b[k])b[k]=mapPair(b[k]);
  if(b.talk)b.talk=mapSpan(b.talk);if(b.moves)b.moves=b.moves.map(m=>({...m,t0:R(m.t0),t1:R(m.t1)}));return b;});
 return o;}
let idx=0;
const MAXPM=26;
function thin(sorted){
 for(let guard=0;guard<400;guard++){
  const per={};sorted.forEach((s,i)=>{const m=Math.floor(s.t0/60);(per[m]=per[m]||[]).push(i);});
  let worst=null;for(const m in per)if(per[m].length>MAXPM&&(m<Math.floor(TOTAL/60)))worst=m;
  if(worst===null)break;
  let best=-1,bs=1e9;
  for(const i of per[worst]){if(i===0)continue;const sp=sorted[i].spec;const dur=(i+1<sorted.length?sorted[i+1].t0:TOTAL)-sorted[i].t0;
   const tx=sp.texts||[];const sc=dur+(tx.some(x=>x[2]==='bubble')?6:0)+(tx.some(x=>x[2]==='title')?1.2:0)+(sp.insert?4:0)+(tx.some(x=>x[2]==='thought')?2:0);
   if(sc<bs){bs=sc;best=i;}}
  if(best<0)break;sorted.splice(best,1);}
 return sorted;}
function build(){
 const sorted=thin([...scenes].sort((a,b)=>a.t0-b.t0));const shots=[];
 for(let i=0;i<sorted.length;i++){
  const t0=i===0?0:Math.max(0,sorted[i].t0-.1);
  const t1=i+1<sorted.length?Math.max(0,sorted[i+1].t0-.1):TOTAL;
  const dur=+(t1-t0).toFixed(3);if(dur<=0.05)continue;
  const sp=sorted[i].spec;const o={dur,...rel(sp,t0,dur)};
  if(!o.camera)o.camera={move:CYC[idx%CYC.length]};
  idx++;
  const hasQ=(o.actors||[]).some(a=>a.id==='q');
  const loud=(o.texts||[]).some(x=>['bubble','thought','title'].includes(x[2]));
  const zoomed=o.camera.zoom&&Math.max(...o.camera.zoom)>1.75;
  if(hasQ&&!loud&&!zoomed&&sp.neon!==false&&!o.insert){
   o.texts=[...(o.texts||[]),[0,dur,'neon',ageAt(t0+dur/2),{actor:'q',color:'#ffd24a',since:0,quiet:true}]];}
  delete o.neon;
  shots.push(o);}
 const sum=shots.reduce((s,x)=>s+x.dur,0);shots[shots.length-1].dur=+(shots[shots.length-1].dur+TOTAL-sum).toFixed(3);
 return shots;}
module.exports={S,build,TOTAL,WORDS,ageAt};
