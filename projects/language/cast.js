// Cast for the one-language story
const HERO={age:38,fig:'girl',shape:'egg',hair:'bob',hairCol:'#2a1a14',outfit:'suit',top:'#2a8a8a',pants:'#2a8a8a',shoe:'#2a2a2a',acc:'headphones'};
const V={work:{},free:{acc:''},coat:{acc:'',outfit:'coat',top:'#8a5a3a',pants:'#3a3a4a'},home:{acc:'',outfit:'sweater',top:'#c8a04a',pants:'#3a3a4a'}};
const P=(o)=>o;
const CAST={
 q:(v='work')=>({...HERO,...(V[v]||{})}),
 amb1:P({age:55,fig:'chubby',shape:'wide',hair:'balding',hairCol:'#8a8a8a',outfit:'suit',top:'#2a3a5a',pants:'#2a3a5a',shoe:'#14141a',acc:'goatee'}),
 amb2:P({age:50,fig:'girl',shape:'egg',hair:'bun2',hairCol:'#4a3a2a',outfit:'suit',top:'#8a2a4a',pants:'#8a2a4a',shoe:'#14141a',acc:'earrings'}),
 partner:P({age:33,fig:'slim',shape:'oval',hair:'quiff',hairCol:'#3a2a1a',outfit:'shirt',top:'#e8e8f0',pants:'#2a2a34',shoe:'#2a2a2a',acc:'headphones'}),
 driver:P({age:50,fig:'chubby',shape:'wide',hair:'cap',hairCol:'#3a3a3a',outfit:'shirt',top:'#e8e0c8',pants:'#3a3a4a',shoe:'#2a2a2a',acc:'mustache'}),
 tourist:P({age:28,fig:'slim',shape:'round',hair:'messy',hairCol:'#c8a868',outfit:'hawaiian',top:'#e86a4a',pants:'#c8b890',shoe:'#fff',bag:'#6a8a4a'}),
 shop:P({age:55,fig:'chubby',shape:'wide',hair:'bald',hairCol:'#aaa',outfit:'shirt',top:'#a8683a',pants:'#5a4a3a',shoe:'#2a2a2a',acc:'mustache'}),
 brazil:P({age:35,fig:'muscle',shape:'square',hair:'curly',hairCol:'#1a1210',outfit:'jersey',top:'#2a9a4a',pants:'#3a3a4a',shoe:'#fff',acc:'stubble'}),
 doctor:P({age:45,fig:'girl',shape:'egg',hair:'afro',hairCol:'#1a1210',outfit:'labcoat',top:'#f4f4f4',pants:'#2a2a34',shoe:'#2a2a34',acc:'glasses'}),
 patient:P({age:30,fig:'slim',shape:'round',hair:'bald',hairCol:'#1a1210',outfit:'tee',top:'#c8c8d0',pants:'#4a4a5a',shoe:'#8a6a4a'}),
 refugee:P({age:28,fig:'girl',shape:'egg',hair:'long',hairCol:'#2a1a14',outfit:'coat',top:'#6a7a5a',pants:'#3a3a3a',shoe:'#3a2a20',bag:'#8a6a4a',acc:'scarf'}),
 guard:P({age:30,fig:'muscle',shape:'square',hair:'bald',hairCol:'#1a1a1a',outfit:'army',top:'#4a5a3a',pants:'#4a5a3a',shoe:'#2a2a2a'}),
 madrid:P({age:15,fig:'girl',shape:'round',hair:'pony',hairCol:'#2a1a14',outfit:'tee',top:'#e0508a',pants:'#3a4a7a',shoe:'#fff'}),
 fan:P({age:17,fig:'girl',shape:'round',hair:'buns',hairCol:'#c05a8a',outfit:'hoodie',top:'#6a4ad0',pants:'#3a3a4a',shoe:'#fff'}),
 boss:P({age:52,fig:'chubby',shape:'wide',hair:'balding',hairCol:'#6a6a6a',outfit:'suit',top:'#3a3a44',pants:'#3a3a44',shoe:'#14141a'}),
 general:P({age:58,fig:'muscle',shape:'square',hair:'bald',hairCol:'#aaa',outfit:'army',top:'#5a6a3a',pants:'#5a6a3a',shoe:'#2a2a2a',acc:'mustache'}),
 teen:P({age:16,fig:'boy',shape:'round',hair:'cap',hairCol:'#3a2a1a',outfit:'hoodie',top:'#e8402a',pants:'#3a4a7a',shoe:'#fff',acc:'headphones'}),
 suitman:P({age:48,fig:'slim',shape:'oval',hair:'swoop',hairCol:'#3a3a3a',outfit:'suit',top:'#22242c',pants:'#22242c',shoe:'#14141a',acc:'glasses'}),
 woman:P({age:45,fig:'girl',shape:'egg',hair:'long',hairCol:'#6a4a2a',outfit:'dress',top:'#4a8ab0',pants:'#4a8ab0',shoe:'#fff'}),
 tetta:P({age:76,fig:'girl',shape:'oval',hair:'bun2',hairCol:'#e0e0e0',outfit:'cardigan',top:'#8a4a6a',pants:'#4a4a5a',shoe:'#5a4a3a',acc:'glasses',cane:true}),
 noor:P({age:5,fig:'girl',shape:'round',hair:'pony',hairCol:'#1a1210',outfit:'dress',top:'#8ab0f0',pants:'#8ab0f0',shoe:'#fff'}),
 reporter:P({age:30,fig:'girl',shape:'egg',hair:'pixie',hairCol:'#c05a2a',outfit:'coat',top:'#e84a4a',pants:'#3a3a4a',shoe:'#fff'}),
 mex:P({age:45,fig:'slim',shape:'oval',hair:'cap',hairCol:'#2a1a10',outfit:'tee',top:'#e8c82a',pants:'#3a3a4a',shoe:'#2a2a2a',acc:'mustache'}),
 seoul:P({age:19,fig:'girl',shape:'round',hair:'buns',hairCol:'#1a1210',outfit:'hoodie',top:'#f4a0c0',pants:'#3a3a4a',shoe:'#fff'}),
 fisher:P({age:52,fig:'muscle',shape:'square',hair:'beanie',hairCol:'#3a3a4a',outfit:'raincoat',top:'#e8c82a',pants:'#3a4a5a',shoe:'#2a2a2a',acc:'beard'}),
 voice:P({age:35,fig:'girl',shape:'egg',hair:'long',hairCol:'#3a2a1a',outfit:'suit',top:'#3a3a44',pants:'#3a3a44',shoe:'#14141a'}),
};
const A=(id,key,at,o={})=>({id,char:typeof CAST[key]==='function'?CAST[key]():CAST[key],at,...o});
const Q=(at,o={},v='work')=>({id:'q',char:CAST.q(v),at,...o});
module.exports={CAST,A,Q,cam:(z0,z1,o={})=>({camera:{zoom:[z0,z1],...o}})};
