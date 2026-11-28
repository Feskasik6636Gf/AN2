// Cast for "Quentin forever"
const HERO={age:17,fig:'boy',shape:'round',hair:'messy',hairCol:'#3a2418',outfit:'hoodie',top:'#f0a020',pants:'#33384a',shoe:'#f2f0ec'};
const V={
 hood:{},
 suit:{outfit:'suit',top:'#22242c',pants:'#22242c',shoe:'#14141a'},
 disg:{acc:'beard+glasses',outfit:'shirt',top:'#6a8ab0'},
 glass:{acc:'glasses'},
 coat:{outfit:'coat',top:'#8a5a2a',acc:'scarf',bag:'#6a4a2a'},
 pack:{outfit:'hoodie',top:'#f0a020',bag:'#7a5a32',acc:'stubble'},
 ragged:{outfit:'hoodie',top:'#c88a20',bag:'#7a5a32',acc:'stubble',hair:'dreads'},
 ship:{outfit:'tracksuit',top:'#f0a020',pants:'#33384a'},
};
const CAST={
 q:(v='hood')=>({...HERO,...V[v]}),
 mia:{age:14,fig:'girl',shape:'round',hair:'pony',hairCol:'#7a4a2a',outfit:'dress',top:'#ff8fb8',pants:'#ff8fb8',shoe:'#fff',acc:'freckles'},
 mia68:{age:68,fig:'girl',shape:'round',hair:'bun2',hairCol:'#c8c8cc',outfit:'cardigan',top:'#d86a7a',pants:'#5a4a5a',shoe:'#8a6a5a',acc:'glasses'},
 mia90:{age:88,fig:'girl',shape:'round',hair:'bun2',hairCol:'#f0f0f0',outfit:'cardigan',top:'#a86ad0',pants:'#5a4a5a',shoe:'#8a6a5a',cane:true},
 mia7:{age:7,fig:'girl',shape:'round',hair:'pony',hairCol:'#7a4a2a',outfit:'dress',top:'#ffb0d0',pants:'#ffb0d0',shoe:'#fff'},
 danny:{age:17,fig:'chubby',shape:'wide',hair:'spiky',hairCol:'#2a1a10',outfit:'tee',top:'#3a8af0',pants:'#4a4a5a',shoe:'#f2f0ec'},
 danny30:{age:30,fig:'chubby',shape:'wide',hair:'messy',hairCol:'#2a1a10',outfit:'shirt',top:'#3a8af0',pants:'#4a4a5a',shoe:'#3a2a20',acc:'stubble'},
 danny71:{age:71,fig:'slim',shape:'wide',hair:'balding',hairCol:'#e8e8e8',outfit:'cardigan',top:'#3a8af0',pants:'#4a4a5a',shoe:'#3a2a20',acc:'glasses'},
 grandpa:{age:76,fig:'slim',shape:'oval',hair:'balding',hairCol:'#d8d8d8',outfit:'cardigan',top:'#7a8aa8',pants:'#5a5a5a',shoe:'#3a2a20',acc:'glasses+mustache',cane:true},
 priya:{age:17,fig:'girl',shape:'egg',hair:'long',hairCol:'#1a1210',outfit:'dress',top:'#e0508a',pants:'#3a3a4a',shoe:'#fff'},
 priya30:{age:30,fig:'girl',shape:'egg',hair:'long',hairCol:'#1a1210',outfit:'dress',top:'#e0508a',pants:'#3a3a4a',shoe:'#fff'},
 lucy7:{age:7,fig:'girl',shape:'round',hair:'pony',hairCol:'#2a1a10',outfit:'dress',top:'#ffd24a',pants:'#3a3a4a',shoe:'#fff'},
 lucy:{age:60,fig:'girl',shape:'egg',hair:'bob',hairCol:'#b0b0b8',outfit:'coat',top:'#2a2a34',pants:'#2a2a34',shoe:'#14141a'},
 okafor:{age:42,fig:'girl',shape:'egg',hair:'bun2',hairCol:'#2a1a14',outfit:'labcoat',top:'#f2f2f2',pants:'#2a2a34',shoe:'#2a2a34',acc:'glasses'},
 driver:{age:45,fig:'chubby',shape:'wide',hair:'cap',hairCol:'#3a2a1a',outfit:'hivis',top:'#d8e03a',pants:'#3a3a4a',shoe:'#2a2a2a'},
 clerk:{age:35,fig:'slim',shape:'oval',hair:'quiff',hairCol:'#3a2a1a',outfit:'shirt',top:'#e8e8f0',pants:'#2a2a34',shoe:'#2a2a2a'},
 mom:{age:38,fig:'girl',shape:'egg',hair:'pony',hairCol:'#8a5a2a',outfit:'dress',top:'#6ac0a0',pants:'#4a4a5a',shoe:'#fff'},
 elena:{age:30,fig:'girl',shape:'egg',hair:'pixie',hairCol:'#c05a2a',outfit:'sweater',top:'#e85a5a',pants:'#3a3a4a',shoe:'#fff'},
 amara:{age:28,fig:'girl',shape:'oval',hair:'braids',hairCol:'#1a1210',outfit:'offshoulder',top:'#3ab0a0',pants:'#3a3a4a',shoe:'#fff'},
 june:{age:34,fig:'girl',shape:'round',hair:'afro',hairCol:'#1a1210',outfit:'turtleneck',top:'#e8a02a',pants:'#3a3a4a',shoe:'#fff'},
 speaker:{age:88,fig:'slim',shape:'oval',hair:'bald',hairCol:'#e8e8e8',outfit:'shirt',top:'#a8683a',pants:'#5a4a3a',shoe:'#3a2a20',acc:'mustache',cane:true},
 fisher:{age:50,fig:'muscle',shape:'square',hair:'cap',hairCol:'#3a2a1a',outfit:'raincoat',top:'#e8c82a',pants:'#3a4a5a',shoe:'#2a2a2a',acc:'beard'},
 queen:{age:55,fig:'girl',shape:'egg',hair:'bun2',hairCol:'#4a3a2a',outfit:'dress',top:'#8a2a8a',pants:'#8a2a8a',shoe:'#c8a040',acc:'earrings'},
 choir:{age:10,fig:'girl',shape:'round',hair:'braids',hairCol:'#3a2a1a',outfit:'dress',top:'#f0f0f0',pants:'#f0f0f0',shoe:'#fff'},
 future:{age:30,fig:'slim',shape:'oval',hair:'bald',hairCol:'#cfe0ff',outfit:'tracksuit',top:'#6a8ad0',pants:'#6a8ad0',shoe:'#cfd8ff',acc:'monocle',s:1.5},
};
const A=(id,key,at,o={})=>({id,char:typeof CAST[key]==='function'?CAST[key]():CAST[key],at,...o});
const Q=(at,o={},v='hood')=>({id:'q',char:CAST.q(v),at,...o});
const cam=(z0,z1,o={})=>({camera:{zoom:[z0,z1],...o}});
module.exports={CAST,A,Q,cam};
