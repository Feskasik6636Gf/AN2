// DSL: scenes are authored with ABSOLUTE voice times (seconds). Each scene lasts until the next scene starts.
// S(t0, shotSpec)  -> scene starting at t0 (a bit earlier, for anticipation).  Times inside spec are absolute.
const WORDS=require('./words.json');
const TOTAL=WORDS.duration;
const scenes=[];
const S=(t0,spec)=>{scenes.push({t0,spec});};
const num=(x)=>typeof x==='number';
// convert absolute time fields into shot-relative ones
function rel(spec,t0,dur){
 const R=x=>+(x-t0).toFixed(3);
 const o={...spec};
 const mapPair=(arr)=>arr&&arr.map(p=>[R(p[0]),...p.slice(1)]);
 const mapSpan=(arr)=>arr&&arr.map(p=>[R(p[0]),R(p[1])]);
 if(o.fx)o.fx=o.fx.map(e=>[R(e[0]),...e.slice(1)]);
 if(o.sfx)o.sfx=o.sfx.map(e=>[R(e[0]),...e.slice(1)]);
 if(o.texts)o.texts=o.texts.map(e=>[R(e[0]),R(Math.min(e[1],t0+dur)),...e.slice(2)]);
 const act=a=>{const b={...a};if(b.moods)b.moods=mapPair(b.moods);if(b.gestures)b.gestures=mapPair(b.gestures);if(b.poses)b.poses=mapPair(b.poses);
  if(b.talk)b.talk=mapSpan(b.talk);if(b.moves)b.moves=b.moves.map(m=>({...m,t0:R(m.t0),t1:R(m.t1)}));return b;};
 if(o.actors)o.actors=o.actors.map(act);
 if(o.things)o.things=o.things.map(a=>{const b=act(a);
  if(b.mouth)b.mouth=mapSpan(b.mouth);if(b.pulses)b.pulses=b.pulses.map(R);if(b.drop)b.drop=b.drop.map(R);
  for(const k of ['onAt','offAt','fallAt'])if(num(b[k]))b[k]=R(b[k]);if(b.ring)b.ring=b.ring.map(R);return b;});
 return o;}
function build(){
 const sorted=[...scenes].sort((a,b)=>a.t0-b.t0);
 const shots=[];
 for(let i=0;i<sorted.length;i++){
  const t0=i===0?0:Math.max(0,sorted[i].t0-.1);
  const t1=i+1<sorted.length?Math.max(0,sorted[i+1].t0-.1):TOTAL;
  const dur=+(t1-t0).toFixed(3);
  if(dur<=0.05)continue;
  shots.push({dur,...rel(sorted[i].spec,t0,dur)});}
 // fix rounding so total matches voice
 const sum=shots.reduce((s,x)=>s+x.dur,0);shots[shots.length-1].dur=+(shots[shots.length-1].dur+TOTAL-sum).toFixed(3);
 return shots;}
module.exports={S,build,TOTAL,WORDS};
