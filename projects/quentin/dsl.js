// DSL: scenes authored with ABSOLUTE voice times (s). A scene lasts until the next scene starts (cut 0.1s before the phrase).
const WORDS=require('./words.json');
const TOTAL=WORDS.duration;
const scenes=[];
const DROP=[66.58,73.18,88.18,96.02,100.34,109.16,118.08,119.2,311.32,315.7,328.12,329.48,345.9,348.7,362.22,386.42,388.5,417.14];
const S=(t0,spec)=>{if(DROP.some(d=>Math.abs(d-t0)<.011))return;scenes.push({t0,spec});};
// hero age through-object (neon above the hero's head)
const AGES=[[0,'17'],[155.5,'30'],[198,'40'],[202,'50'],[205,'51'],[305,'72'],[359.6,'90'],[362,'110'],[395,'300 YEARS'],[461,'290'],[526,'200'],[547.9,'1,000'],[560.3,'10,000'],[582.4,'100,000'],[601.4,'1 MILLION'],[609.7,'10 MILLION'],[610.8,'100 MILLION'],[632.9,'1 BILLION'],[635.7,'5 BILLION'],[644.8,'5 BILLION+']];
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
function build(){
 const sorted=[...scenes].sort((a,b)=>a.t0-b.t0);const shots=[];
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
