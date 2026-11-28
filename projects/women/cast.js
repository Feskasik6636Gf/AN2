// Cast for the all-women story
const HERO={age:26,fig:'girl',shape:'egg',hair:'pony',hairCol:'#4a2a1a',outfit:'labcoat',top:'#f4f4f4',pants:'#3a4a5a',shoe:'#f2f0ec',acc:'glasses'};
const V={lab:{},home:{outfit:'hoodie',top:'#6a8ad0',acc:'glasses'},coat:{outfit:'coat',top:'#8a5a3a',pants:'#3a3a4a',acc:'glasses'},tired:{outfit:'hoodie',top:'#6a8ad0'}};
const CAST={
 q:(v='lab')=>({...HERO,...(V[v]||{})}),
 dad:{age:58,fig:'girl',shape:'oval',hair:'bob',hairCol:'#b0b0b0',outfit:'cardigan',top:'#8a6a4a',pants:'#4a4a5a',shoe:'#4a3a2a',acc:'glasses'},
 anchor:{age:38,fig:'girl',shape:'egg',hair:'bob',hairCol:'#2a1a14',outfit:'suit',top:'#c8402a',pants:'#c8402a',shoe:'#14141a',acc:'earrings'},
 anchor2:{age:44,fig:'girl',shape:'wide',hair:'bun2',hairCol:'#6a4a2a',outfit:'suit',top:'#2a5a9a',pants:'#2a5a9a',shoe:'#14141a'},
 voss:{age:45,fig:'girl',shape:'egg',hair:'bun2',hairCol:'#1a1210',outfit:'labcoat',top:'#f2f2f2',pants:'#2a2a34',shoe:'#2a2a34',acc:'glasses'},
 caldwell:{age:56,fig:'girl',shape:'square',hair:'bob',hairCol:'#8a8a8a',outfit:'suit',top:'#3a3a44',pants:'#3a3a44',shoe:'#14141a',acc:'glasses'},
 roz:{age:46,fig:'muscle',shape:'square',hair:'bandana',hairCol:'#c82a2a',outfit:'overall',top:'#4a6a9a',pants:'#4a6a9a',shoe:'#3a2a20',acc:'freckles'},
 worker:{age:35,fig:'girl',shape:'round',hair:'cap',hairCol:'#3a2a1a',outfit:'hivis',top:'#d8e03a',pants:'#3a3a4a',shoe:'#2a2a2a'},
 nurse:{age:44,fig:'girl',shape:'round',hair:'pony',hairCol:'#5a3a2a',outfit:'scrubs',top:'#6ac0a0',pants:'#6ac0a0',shoe:'#fff'},
 doc:{age:40,fig:'girl',shape:'egg',hair:'long',hairCol:'#4a3a2a',outfit:'scrubs',top:'#4a8ac0',pants:'#4a8ac0',shoe:'#fff',acc:'mask'},
 lifter:{age:32,fig:'muscle',shape:'square',hair:'long',hairCol:'#c8a060',outfit:'tee',top:'#f4f4f4',pants:'#3a3a4a',shoe:'#fff'},
 woman1:{age:30,fig:'girl',shape:'egg',hair:'long',hairCol:'#5a3a2a',outfit:'dress',top:'#e0508a',pants:'#e0508a',shoe:'#fff'},
 woman2:{age:52,fig:'girl',shape:'round',hair:'afro',hairCol:'#1a1210',outfit:'sweater',top:'#e8a02a',pants:'#3a3a4a',shoe:'#fff'},
 woman3:{age:24,fig:'girl',shape:'oval',hair:'braids',hairCol:'#1a1210',outfit:'tee',top:'#3ab0a0',pants:'#3a3a4a',shoe:'#fff'},
 guard:{age:40,fig:'girl',shape:'square',hair:'cap',hairCol:'#3a3a3a',outfit:'police',top:'#2a3a5a',pants:'#2a3a5a',shoe:'#14141a'},
 baby:{age:1,fig:'boy',shape:'round',hair:'bald',hairCol:'#c8a868',outfit:'tee',top:'#cfe8ff',pants:'#cfe8ff',shoe:'#fff'},
 driver:{age:48,fig:'girl',shape:'wide',hair:'bun2',hairCol:'#5a4a3a',outfit:'shirt',top:'#aa8a5a',pants:'#4a4a4a',shoe:'#2a2a2a'},
 stranger:{age:36,fig:'girl',shape:'round',hair:'long',hairCol:'#2a1a10',outfit:'coat',top:'#6a6a7a',pants:'#3a3a3a',shoe:'#2a2a2a'},
};
const A=(id,key,at,o={})=>({id,char:typeof CAST[key]==='function'?CAST[key]():CAST[key],at,...o});
const Q=(at,o={},v='lab')=>({id:'q',char:CAST.q(v),at,...o});
module.exports={CAST,A,Q,cam:(z0,z1,o={})=>({camera:{zoom:[z0,z1],...o}})};
