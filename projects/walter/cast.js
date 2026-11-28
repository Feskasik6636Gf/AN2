// Cast for the Walter White story
const HERO={age:50,fig:'slim',shape:'oval',hair:'balding',hairCol:'#8a8478',outfit:'shirt',top:'#7a8a5a',pants:'#8a7a5a',shoe:'#3a2a20',acc:'glasses+goatee'};
const V={
 baby:{age:2,fig:'boy',shape:'round',hair:'messy',hairCol:'#c8a868',outfit:'tee',top:'#f0f0f0',pants:'#f0f0f0',shoe:'#fff',acc:''},
 kid:{age:10,fig:'boy',shape:'round',hair:'messy',hairCol:'#c8a868',outfit:'tee',top:'#7a9ad0',pants:'#4a4a5a',shoe:'#fff',acc:'glasses'},
 young:{age:22,fig:'slim',shape:'oval',hair:'messy',hairCol:'#c8a868',outfit:'labcoat',top:'#f4f4f4',pants:'#4a4a5a',shoe:'#3a2a20',acc:'glasses'},
 teach:{},
 wash:{outfit:'apron',top:'#3a8ac0',pants:'#4a4a5a'},
 resp:{outfit:'tee',top:'#f4f0e8',pants:'#e8d8b8',shoe:'#f4f4f4',acc:'mask+glasses'},
 hat:{outfit:'coat',top:'#22242c',pants:'#22242c',shoe:'#14141a',hair:'fedora',hairCol:'#1a1a22',acc:'sunglasses+goatee'},
 hatold:{outfit:'coat',top:'#22242c',pants:'#22242c',hair:'fedora',hairCol:'#1a1a22',acc:'glasses+goatee'},
 sick:{outfit:'shirt',top:'#9aaa7a',acc:'glasses+goatee'},
 cabin:{outfit:'coat',top:'#8a5a2a',pants:'#4a4a3a',hair:'beanie',hairCol:'#2a2a2a',acc:'beard+glasses'},
 bald:{outfit:'shirt',top:'#7a8a5a',hair:'bald',acc:'glasses+goatee'},
};
const CAST={
 q:(v='teach')=>({...HERO,...(V[v]||{})}),
 skyler:{age:40,fig:'girl',shape:'egg',hair:'bob',hairCol:'#e8d8a0',outfit:'dress',top:'#8ab0c8',pants:'#4a4a5a',shoe:'#e8e8e8'},
 flynn:{age:15,fig:'boy',shape:'round',hair:'swoop',hairCol:'#4a3a2a',outfit:'tee',top:'#3a8ac0',pants:'#4a4a5a',shoe:'#f2f0ec'},
 holly:{age:1,fig:'girl',shape:'round',hair:'pony',hairCol:'#e8d8a0',outfit:'dress',top:'#ffd0e0',pants:'#ffd0e0',shoe:'#fff'},
 hank:{age:45,fig:'muscle',shape:'square',hair:'quiff',hairCol:'#2a1a10',outfit:'hawaiian',top:'#e8a02a',pants:'#8a7a5a',shoe:'#3a2a20',acc:'goatee'},
 jesse:{age:24,fig:'slim',shape:'wide',hair:'beanie',hairCol:'#2a2a2a',outfit:'hoodie',top:'#c0402a',pants:'#3a3a4a',shoe:'#f2f0ec',acc:'stubble'},
 elliot:{age:50,fig:'boy',shape:'oval',hair:'swoop',hairCol:'#6a5a4a',outfit:'suit',top:'#2a3040',pants:'#2a3040',shoe:'#14141a',acc:'glasses'},
 gretchen:{age:48,fig:'girl',shape:'egg',hair:'long',hairCol:'#e8d8a0',outfit:'dress',top:'#4a8ab0',pants:'#4a8ab0',shoe:'#e8e8e8'},
 emilio:{age:28,fig:'slim',shape:'square',hair:'spiky',hairCol:'#1a1210',outfit:'tracksuit',top:'#2a8a4a',pants:'#2a8a4a',shoe:'#fff',acc:'goatee'},
 crazy8:{age:30,fig:'chubby',shape:'wide',hair:'bald',hairCol:'#1a1210',outfit:'jersey',top:'#8a2a2a',pants:'#3a3a4a',shoe:'#fff',acc:'stubble'},
 tuco:{age:36,fig:'muscle',shape:'square',hair:'bandana',hairCol:'#c82a2a',outfit:'jersey',top:'#f4f4f4',pants:'#3a3a4a',shoe:'#2a2a2a',acc:'goatee'},
 saul:{age:48,fig:'chubby',shape:'wide',hair:'quiff',hairCol:'#4a3a2a',outfit:'suit',top:'#8a5ad0',pants:'#8a5ad0',shoe:'#f4f4f4'},
 mike:{age:62,fig:'slim',shape:'square',hair:'cap',hairCol:'#b0b0b0',outfit:'shirt',top:'#6a6a7a',pants:'#3a3a3a',shoe:'#2a2a2a'},
 gus:{age:52,fig:'slim',shape:'oval',hair:'swoop',hairCol:'#5a3a2a',outfit:'suit',top:'#e8e0c8',pants:'#4a4a3a',shoe:'#2a2a2a',acc:'glasses'},
 jane:{age:25,fig:'girl',shape:'egg',hair:'pixie',hairCol:'#c05a2a',outfit:'tee',top:'#f4f4f4',pants:'#3a3a4a',shoe:'#fff'},
 hector:{age:80,fig:'slim',shape:'oval',hair:'balding',hairCol:'#e0e0e0',outfit:'shirt',top:'#a8683a',pants:'#5a4a3a',shoe:'#2a2a2a',acc:'mustache'},
 doctor:{age:45,fig:'girl',shape:'egg',hair:'bun2',hairCol:'#2a1a14',outfit:'labcoat',top:'#f2f2f2',pants:'#2a2a34',shoe:'#2a2a34',acc:'glasses'},
 student:{age:17,fig:'boy',shape:'round',hair:'cap',hairCol:'#3a2a1a',outfit:'tee',top:'#c8402a',pants:'#3a4a7a',shoe:'#fff'},
 stu2:{age:16,fig:'girl',shape:'round',hair:'long',hairCol:'#6a4a2a',outfit:'tee',top:'#ff7fb0',pants:'#3a4a7a',shoe:'#fff'},
 controller:{age:46,fig:'chubby',shape:'wide',hair:'balding',hairCol:'#6a6a6a',outfit:'shirt',top:'#e8e8f0',pants:'#2a2a34',shoe:'#2a2a2a',acc:'glasses'},
 hitman:{age:35,fig:'muscle',shape:'square',hair:'bald',hairCol:'#1a1a1a',outfit:'suit',top:'#14141a',pants:'#14141a',shoe:'#14141a',acc:'sunglasses'},
 hitman2:{age:38,fig:'slim',shape:'square',hair:'bald',hairCol:'#1a1a1a',outfit:'suit',top:'#14141a',pants:'#14141a',shoe:'#14141a',acc:'sunglasses'},
 stranger:{age:40,fig:'chubby',shape:'wide',hair:'cap',hairCol:'#3a3a3a',outfit:'shirt',top:'#aa8a5a',pants:'#4a4a4a',shoe:'#2a2a2a'},
 guard:{age:30,fig:'muscle',shape:'square',hair:'bald',hairCol:'#1a1a1a',outfit:'army',top:'#4a5a3a',pants:'#4a5a3a',shoe:'#2a2a2a'},
 boy:{age:12,fig:'boy',shape:'round',hair:'messy',hairCol:'#5a3a2a',outfit:'tee',top:'#3a8a5a',pants:'#4a4a5a',shoe:'#fff'},
 clerk:{age:35,fig:'slim',shape:'oval',hair:'quiff',hairCol:'#3a2a1a',outfit:'shirt',top:'#e8e8f0',pants:'#2a2a34',shoe:'#2a2a2a'},
};
const A=(id,key,at,o={})=>({id,char:typeof CAST[key]==='function'?CAST[key]():CAST[key],at,...o});
const Q=(at,o={},v='teach')=>({id:'q',char:CAST.q(v),at,...o});
const cam=(z0,z1,o={})=>({camera:{zoom:[z0,z1],...o}});
module.exports={CAST,A,Q,cam};
