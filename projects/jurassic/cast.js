// Cast + shorthand helpers for the Jurassic project
const mk=(o)=>({...o});
const CHAR={
 u:'tema', // the unpaid intern (red hoodie), "you"
 ned:{age:40,fig:'chubby',shape:'wide',hair:'messy',hairCol:'#5a3a2a',outfit:'tee',top:'#d8cfa8',pants:'#4a4a3a',shoe:'#3a2a20',acc:'glasses',mood:'tired'},
 mal:{age:40,fig:'slim',shape:'oval',hair:'messy',hairCol:'#1a1214',outfit:'tee',top:'#1a1a22',pants:'#2a2a30',shoe:'#1a1410',mood:'smug'},
 ham:{age:70,fig:'boy',shape:'chin',hair:'bald',hairCol:'#f2efe8',outfit:'suit',top:'#f2efe8',pants:'#f2efe8',shoe:'#8a6a4a',acc:'glasses',mood:'joy'},
 grant:{age:40,fig:'muscle',shape:'square',hair:'cap',hairCol:'#c8a060',outfit:'tee',top:'#6a8ab0',pants:'#8a7a5a',shoe:'#5a3a2a',mood:'calm'},
 tim:{age:11,fig:'boy',shape:'round',hair:'cap',hairCol:'#3a6ab0',outfit:'tee',top:'#e8e0c8',pants:'#4a5a8a',shoe:'#f2f0ec',mood:'shock'},
 lex:{age:12,fig:'girl',shape:'round',hair:'long',hairCol:'#6a4a2a',outfit:'tee',top:'#ff7fb0',pants:'#3a4a7a',shoe:'#f2f0ec',acc:'glasses',mood:'calm'},
 arn:{age:52,fig:'chubby',shape:'wide',hair:'messy',hairCol:'#a8a49c',outfit:'tee',top:'#e8e0d0',pants:'#3a3a44',shoe:'#3a2a20',acc:'glasses',mood:'tired'},
 gen:{age:42,fig:'boy',shape:'chin',hair:'swoop',hairCol:'#4a3a2a',outfit:'suit',top:'#2a2a34',pants:'#2a2a34',shoe:'#1a1410',acc:'glasses',mood:'shock'},
 ell:{age:32,fig:'girl',shape:'egg',hair:'pony',hairCol:'#8a5a2a',outfit:'tee',top:'#8ab0c8',pants:'#8a7a5a',shoe:'#5a3a2a',mood:'calm'},
};
const A=(id,at,o={})=>({id,char:CHAR[id]||id,at,...o});
const U=(at,o={})=>A('u',at,o);
const NED=(at,o={})=>A('ned',at,o);
const MAL=(at,o={})=>A('mal',at,o);
const HAM=(at,o={})=>A('ham',at,o);
const GRANT=(at,o={})=>A('grant',at,o);
const TIM=(at,o={})=>A('tim',at,o);
const LEX=(at,o={})=>A('lex',at,o);
const ARN=(at,o={})=>A('arn',at,o);
const GEN=(at,o={})=>A('gen',at,o);
const ELL=(at,o={})=>A('ell',at,o);
// camera presets
const cam=(z0,z1,o={})=>({camera:{zoom:[z0,z1],...o}});
const T=(a,b,str,o={})=>[a,b,'title',str,{...o,y:Math.max(o.y||0,235),size:Math.min(o.size||80,84)}];
module.exports={T,CHAR,A,U,NED,MAL,HAM,GRANT,TIM,LEX,ARN,GEN,ELL,cam};
