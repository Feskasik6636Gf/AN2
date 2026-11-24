// random real characters for crowds
const {HAIR,OUT,ACC,AGE}=require('./bean.js');const S=require('./stage.js');
let seed=77;const r=()=>{seed=(seed*16807)%2147483647;return (seed-1)/2147483646};const pick=a=>a[Math.floor(r()*a.length)];
const sh=(h,k)=>{const n=parseInt(h.slice(1),16);let R=n>>16,g=n>>8&255,b=n&255;const f=v=>Math.max(0,Math.min(255,Math.round(k>0?v+(255-v)*k:v*(1+k))));return '#'+[f(R),f(g),f(b)].map(v=>v.toString(16).padStart(2,'0')).join('');};
const TOPS=['#e8434f','#3a6ab0','#ffd24a','#5aa86a','#6a5af0','#f08a3a','#2fb59a','#ff7fb0','#efe6dc','#3a3a48','#8a6ad8','#e8a040'];
const PANTS=['#2a2a3a','#3a4a6a','#2a2426','#4a3a2a','#5a6a8a','#f0e2c8'];
const HC=['#3a2418','#1a1214','#6e3c22','#8e3a22','#e8c070','#c04a2a','#5a3a2a'];
function randomChar(o={}){const girl=r()<.5,top=pick(TOPS),pants=pick(PANTS),hc=pick(HC);
 const hairs=girl?[c=>HAIR.bun2(c,sh(c,.35),sh(c,-.35)),c=>HAIR.long(c,sh(c,.35)),c=>HAIR.pony(c,sh(c,.35)),c=>HAIR.buns(c,sh(c,.35)),c=>HAIR.braids(c,sh(c,.35))]:[c=>HAIR.messy(c,sh(c,.35),sh(c,-.35)),c=>HAIR.swoop(c,sh(c,.35)),c=>HAIR.spiky(c,sh(c,.35)),c=>HAIR.cap(pick(TOPS),'#22243f'),c=>HAIR.beanie(pick(TOPS),'#fff')];
 const out=pick([OUT.hoodie2,OUT.tee,OUT.hoodie,OUT.puffer,OUT.varsity]);
 const age=o.age??AGE.y18;
 return {c:{top,topL:sh(top,.3),topS:sh(top,-.28),pants,pantsL:sh(pants,.25),pantsS:sh(pants,-.35),shoe:pick(['#f2f0ec','#2a2a30','#e8434f']),sole:'#f2f0ec',acc:sh(top,-.45),trim:'#f6efe0'},
  outfit:out,fig:girl?'girl':pick(['boy','boy','slim','chubby']),...age,baggy:r()<.4,
  h:{mood:pick(['calm','joy','smug','shock','calm','joy']),hair:pick(hairs)(hc),shape:girl?'egg':pick(['round','chin','oval']),lashes:girl,eyeS:.86,blushA:.6,backHair:hc},
  arms:[[6,0,16,0,0],[6,0,16,0,0]],legs:[-4,4],back:!!o.back,backpack:r()<.4?pick(TOPS):null};}
function crowdReal(C,x0,x1,z0,z1,n,o={}){const items=[];for(let i=0;i<n;i++)items.push([x0+r()*(x1-x0),z0+r()*(z1-z0)]);items.sort((a,b)=>b[1]-a[1]);
 return items.map(([x,z])=>{const ch=randomChar(o);let s=S.actor(C,x,z,{...ch,rim:o.rim??'#ffd59a',cast:o.cast??[1,.15]});if(o.blurFar&&z>o.blurFar)s=S.blurG(Math.min(6,(z-o.blurFar)*.25),s);return s;}).join('');}
// big blurred foreground heads (over-shoulder / audience)
function fgHeads(C,list,blur=14){return S.blurG(blur,list.map(([x,z,back])=>S.actor(C,x,z,{...randomChar({back}),rim:'#ffd59a',cast:[0,0]})).join(''));}
module.exports={randomChar,crowdReal,fgHeads};
