const {S}=require('./dsl.js');
const C=require('./cast.js');const Q=require('./sets.js');
const {A,Q:HQ,cam}=C;
// screen coords for PH=470 sets (vx=960)
const P=(X,Y,Z,PH=470)=>{const U=PH/1.75,k=4/Z,Hz=1000-1.6*U;return [Math.round(960+X*U*k),Math.round(Hz+(1.6-Y)*U*k)];};
const q=(x,z,o={},v='work')=>HQ([x,z],o,v);
const a=(key,x,z,o={})=>A(key,key,[x,z],o);
const bub=(t0,t1,txt,actor,o={})=>[t0,t1,'bubble',txt,{actor,...o}];
const th=(t0,t1,txt,actor,o={})=>[t0,t1,'thought',txt,{actor,...o}];
const tag=(t0,t1,txt,o={})=>{if(o.xy&&o.dx===undefined){const w=String(txt).length*14.8+34;const cx=o.xy[0];o={...o,xy:[Math.max(40,Math.min(1880-w-110,cx-w/2-110)),o.xy[1]]};}return [t0,t1,'tag',txt,o];};
const ttl=(t0,t1,txt,o={})=>[t0,t1,'title',txt,{y:230,size:84,...o}];
const mv=(t0,t1,x,z,o={})=>({t0,t1,to:[x,z],...o});
module.exports={S,P,q,a,A,bub,th,tag,ttl,mv,cam,Q,C};
// walter helpers
const S2=require('./dsl.js').S;
const cuS=(t0,set,actor,mood,texts=[],o={})=>S2(t0,{set,camera:{zoom:[1.8,2.3],follow:actor.id,bgBlur:3,...(o.cam||{})},actors:[{...actor,moods:[[t0,mood]],...(o.act||{})}],texts,neon:false,fx:o.fx||[]});
module.exports.cuS=cuS;
