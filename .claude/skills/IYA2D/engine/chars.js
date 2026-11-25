// Character registry: built-in cast + constructor. Usage: CH.get('tema') / CH.make({...})
const {HAIR,OUT,ACC,AGE}=require('./bean.js');
const sh=(h,k)=>{const n=parseInt(h.slice(1),16);let r=n>>16,g=n>>8&255,b=n&255;const f=v=>Math.max(0,Math.min(255,Math.round(k>0?v+(255-v)*k:v*(1+k))));return '#'+[f(r),f(g),f(b)].map(v=>v.toString(16).padStart(2,'0')).join('');};
const pal=(top,pants,shoe,ex={})=>({top,topL:sh(top,.3),topS:sh(top,-.28),pants,pantsL:sh(pants,.25),pantsS:sh(pants,-.35),shoe,sole:ex.sole??'#f2f0ec',acc:ex.acc??sh(top,-.45),shirt:ex.shirt??'#f4f0e8',shirtS:ex.shirtS??'#e04a5a',trim:ex.trim??'#f6efe0',vest:ex.vest??'#5a5a3a',toe:ex.toe,lace:ex.lace,...ex});
const hc=(c)=>[c,sh(c,.35),sh(c,-.35)];
const H={swoop:c=>HAIR.swoop(c,sh(c,.35)),buns:c=>HAIR.buns(c,sh(c,.35)),beanie:c=>HAIR.beanie(c,sh(c,.4)),pony:c=>HAIR.pony(c,sh(c,.4)),cap:c=>HAIR.cap(c,sh(c,-.4)),braids:c=>HAIR.braids(c,sh(c,.35)),spiky:c=>HAIR.spiky(c,sh(c,.4)),bald:c=>HAIR.bald(c,sh(c,.3)),long:c=>HAIR.long(c,sh(c,.35)),messy:c=>HAIR.messy(...hc(c)),bun2:c=>HAIR.bun2(...hc(c)),police:c=>HAIR.policeCap(c,sh(c,.2)),hard:c=>HAIR.hardhat(c,sh(c,.3)),helmet:c=>HAIR.helmet(c,sh(c,.25)),chef:c=>HAIR.chefHat('#fff','#fff')};
const BR='#3a2418',BK='#1a1214',BL='#e8c070',RD='#a8442a',GR='#c9c6c0',WH='#ecebe6',AU='#8e3a22';
const C=[
 ['Тёма',18,'boy','round','messy','#6e3c22','hoodie2',pal('#e3232c','#2a2426','#e3232c',{toe:'#f6f2ec',lace:'#f6f2ec'}),null,'smug',{baggy:1}],
 ['Ая',18,'girl','egg','bun2',AU,'offshoulder',pal('#efe6dc','#2a2426','#f7f5f2'),null,'joy',{baggy:1,lashes:1,chunky:1}],
 ['Мир',12,'boy','round','swoop',BR,'hoodie',pal('#ff9a3c','#2c3a66','#f6f2ec',{acc:'#2f7ae0'}),null,'joy'],
 ['Кира',13,'girl','egg','buns','#6a3a2a','varsity',pal('#2fb59a','#f0e2c8','#ff6f91',{acc:'#ffe2a8'}),null,'smug',{lashes:1}],
 ['Бруно',11,'chubby','wide','beanie','#e0485a','overall',pal('#4a6fd0','#2a2a3a','#3a2a20'),null,'shock'],
 ['Лея',10,'girl','round','braids','#2a1a14','tee',pal('#8a6ad8','#3a3050','#2a2438',{acc:'#ffd24a'}),'glasses','calm',{lashes:1}],
 ['Тоби',15,'slim','oval','spiky','#2a6ad8','hoodie',pal('#3a3a48','#6a7a5a','#e0e0e0',{acc:'#6a5af0'}),'headphones','tired'],
 ['Нова',16,'girl','egg','pony',BL,'dress',pal('#ff7fb0','#f2e8ff','#ffffff'),'bow','love',{lashes:1}],
 ['Зед',13,'boy','round',null,null,'puffer',pal('#e8c040','#2a2a30','#2a2a30'),null,'shy',{afro:'#2a1a14'}],
 ['Джей',17,'muscle','square','cap','#e8434f','tee',pal('#f2f0ec','#e8434f','#f2f0ec',{acc:'#e8434f'}),null,'smug'],
 ['Сэм',10,'boy','round','spiky','#d0703a','tee',pal('#5ac06a','#3a4a6a','#ff6a3a'),null,'joy'],
 ['Лили',11,'girl','round','pony','#c04a2a','overall',pal('#ff9ab0','#5a7ad0','#fff',{shirt:'#fff',shirtS:'#ff9ab0'}),null,'joy',{lashes:1}],
 ['Ник',16,'slim','oval','swoop',BK,'varsity',pal('#2a3a6a','#2a2a30','#f2f0ec',{acc:'#e8c040',trim:'#e8c040'}),null,'calm'],
 ['Мия',15,'girl','egg','long',BK,'hoodie',pal('#b49aff','#2a2a30','#f2f0ec',{acc:'#fff'}),null,'sad',{lashes:1}],
 ['Макс',18,'boy','chin','swoop',RD,'puffer',pal('#3a6ab0','#2a2a30','#2a2a30'),null,'smug'],
 ['Дана',19,'girl','egg','bun2',BK,'tee',pal('#f2f0ec','#3a4a6a','#f2f0ec',{acc:'#e3232c'}),null,'smug',{lashes:1}],
 ['Арт',21,'boy','square','messy',BK,'hoodie2',pal('#2a2a34','#4a4a56','#f2f0ec'),'headphones','calm'],
 ['Роза',22,'girl','oval','long',RD,'dress',pal('#e04a5a','#2a2a30','#2a2a30'),null,'love',{lashes:1}],
 ['Гоша',23,'chubby','wide','beanie','#5aa86a','hoodie',pal('#e8a040','#4a3a2a','#3a2a20'),null,'joy'],
 ['Ева',24,'girl','egg','pony','#5a3a2a','labcoat',pal('#f4f6f8','#3a3050','#ff6f91',{shirt:'#ff9ab0',acc:'#6a5af0'}),'glasses','shock',{lashes:1}],
 ['Рэй',25,'muscle','chin','spiky',BK,'tee',pal('#1a1a22','#3a3a48','#ffd24a',{acc:'#ffd24a'}),null,'smug'],
 ['Оля',26,'girl','oval','bun2','#c9862f','suit',pal('#3a3a48','#3a3a48','#1a1410',{acc:'#e3232c'}),null,'calm',{lashes:1}],
 ['Пит',27,'slim','oval','cap','#5a8ae0','hivis',pal('#3a6ab0','#3a4a6a','#8a5a2a'),null,'tired'],
 ['Стас',28,'boy','square','police','#1a2a4a','police',pal('#2a4a8a','#1a2a4a','#1a1410'),null,'angry'],
 ['Лиза',29,'girl','egg','long','#c04a2a','apron',pal('#5aa86a','#3a3040','#a84a3a',{acc:'#fff4e0'}),null,'joy',{lashes:1}],
 ['Дэн',30,'muscle','square','helmet','#5a6a3e','army',pal('#6a7a4a','#5a6a3e','#3a2a1a',{vest:'#5a5a3a'}),null,'smug'],
 ['Вика',31,'girl','egg','buns',BK,'tee',pal('#ffd24a','#2a2a30','#f2f0ec',{acc:'#e3232c'}),null,'joy',{lashes:1}],
 ['Кен',32,'boy','chin','swoop',BK,'suit',pal('#2a2a34','#2a2a34','#1a1410',{acc:'#2f7ae0'}),null,'smug'],
 ['Хлоя',33,'girl','oval','long',BL,'labcoat',pal('#f4f6f8','#4a8ab0','#f2f2f2',{shirt:'#7ab0e0',acc:'#e04a4a'}),null,'calm',{lashes:1}],
 ['Марк',34,'boy','square','chef','#fff','chef',pal('#f6f4f0','#2a2a30','#1a1a20'),'mustache','joy'],
 ['Тим',35,'chubby','wide','hard','#ffb020','hivis',pal('#3a6ab0','#3a4a6a','#8a5a2a'),null,'joy'],
 ['Алиса',36,'girl','egg','pony',BK,'police',pal('#2a4a8a','#1a2a4a','#1a1410'),null,'angry',{lashes:1}],
 ['Игорь',37,'boy','chin','swoop',BR,'labcoat',pal('#f4f6f8','#4a8ab0','#f2f2f2',{shirt:'#7ab0e0',acc:'#e04a4a'}),'glasses','calm'],
 ['Нина',38,'girl','oval','bun2',BR,'apron',pal('#e8a040','#3a3040','#a84a3a',{acc:'#fff4e0'}),null,'smug',{lashes:1}],
 ['Борис',39,'muscle','square','bald',BK,'tee',pal('#3a3a48','#2a2a30','#1a1a20',{acc:'#e3232c'}),null,'angry'],
 ['Юля',40,'girl','egg','long','#8e3a22','suit',pal('#6a2a4a','#2a2a30','#1a1410',{acc:'#ffd24a'}),null,'smug',{lashes:1}],
 ['Олег',42,'chubby','wide','swoop',BR,'overall',pal('#3a6ab0','#2a2a3a','#3a2a20',{shirt:'#f2e8d8',shirtS:'#5aa86a'}),null,'tired'],
 ['Мама Тёмы',41,'girl','egg','long',BR,'apron',pal('#5aa86a','#3a3040','#a84a3a',{acc:'#fff4e0'}),null,'calm',{lashes:1}],
 ['Папа Тёмы',43,'boy','chin','swoop',BR,'tee',pal('#3a6ab0','#2a2a3a','#3a2a20',{acc:'#3a6ab0'}),null,'joy'],
 ['Вера',45,'girl','oval','bun2',GR,'dress',pal('#7a5ad0','#2a2a30','#2a2a30'),'glasses','calm',{lashes:1}],
 ['Артур',46,'boy','chin','swoop',GR,'suit',pal('#2a3a5a','#2a3a5a','#1a1410',{acc:'#c8303a'}),null,'smug'],
 ['Гена',48,'chubby','wide','bald',GR,'hivis',pal('#3a6ab0','#3a4a6a','#8a5a2a'),'mustache','joy'],
 ['Елена',50,'girl','egg','bun2',GR,'labcoat',pal('#f4f6f8','#3a3050','#f2f2f2',{shirt:'#5aa86a',acc:'#e04a4a'}),'glasses','calm',{lashes:1}],
 ['Директор',52,'chubby','wide','bald','#c8c4bc','suit',pal('#2a3a5a','#2a3a5a','#1a1410',{acc:'#c8303a'}),'mustache','angry'],
 ['Генерал',54,'muscle','square','police','#4a5a3a','army',pal('#6a7a4a','#5a6a3e','#3a2a1a',{vest:'#4a5a3a'}),'mustache','angry'],
 ['Бабуля',58,'girl','round','buns',WH,'dress',pal('#b06a8a','#3a3040','#5a3a2a'),'glasses','joy',{lashes:1}],
 ['Дедуля',60,'boy','chin','bald',WH,'puffer',pal('#7a8aa0','#4a4440','#5a3a2a'),'glasses','tired'],
 ['Профессор',57,'slim','oval','spiky',WH,'labcoat',pal('#f4f6f8','#3a3a48','#2a2a30',{shirt:'#c8303a',acc:'#6a5af0'}),'glasses','shock'],
 ['Шеф Луи',55,'chubby','wide','chef','#fff','chef',pal('#f6f4f0','#2a2a30','#1a1a20'),'mustache','smug'],
 ['Миллиардер',59,'boy','chin','swoop',GR,'suit',pal('#1a1a22','#1a1a22','#1a1410',{acc:'#ffd24a',shirt:'#f4f0e8'}),null,'smug'],
];
const ageP=a=>a<=12?AGE.kid:a===18?AGE.y18:a<=18?AGE.teen:a<50?AGE.adult:AGE.elder;
const slug=s=>s.toLowerCase().replace(/ё/g,'е').replace(/\s+/g,'_');
const TR={'тема':'tema','ая':'aya','мир':'mir','кира':'kira','бруно':'bruno','лея':'leya','тоби':'tobi','нова':'nova','зед':'zed','джей':'jay'};
function fromRow(c){const [n,age,fig,shape,hair,hcol,out,p,acc,mood,ex={}]=c;const y18=age===18;
 return {name:n,age,...ageP(age),fig,c:p,outfit:OUT[out],baggy:!!ex.baggy,chunky:!!ex.chunky,
  h:{mood,shape:y18&&fig==='boy'?'chin':shape,eyeS:y18?(fig==='girl'?.88:.82):1,blushA:y18?.6:1,hair:hair?H[hair](hcol):null,acc:acc?ACC[acc]:null,lashes:!!ex.lashes,
   hairBack:ex.afro?HAIR.afro(ex.afro,sh(ex.afro,.35)):null,backHair:hcol&&hcol!=='#fff'?hcol:(ex.afro||'#2a2238')},
  arms:[[6,0,16,0,0],[6,0,16,0,0]],legs:[-5,5]};}
const REG={};C.forEach((c,i)=>{const o=fromRow(c);REG[slug(c[0])]=o;REG['c'+(i+1)]=o;if(TR[slug(c[0])])REG[TR[slug(c[0])]]=o;});
// signature tweaks for the two leads
REG.tema.backpack='#2fb59a';
REG.aya.armsOverDefault='both';
function get(k){const o=REG[k]||REG[slug(k)];if(!o)throw new Error('unknown character '+k);return {...o,h:{...o.h},arms:o.arms.map(a=>[...a]),legs:[...o.legs]};}
// constructor: make({age:30, fig:'boy', shape:'chin', hair:'swoop', hairCol:'#3a2418', outfit:'suit', top:'#2a2a34', pants:'#2a2a34', shoe:'#1a1410', acc:'glasses', mood:'calm', lashes:false})
function make(o){return fromRow([o.name||'NPC',o.age??25,o.fig||'boy',o.shape||'round',o.hair||'swoop',o.hairCol||'#3a2418',o.outfit||'tee',pal(o.top||'#3a6ab0',o.pants||'#2a2a3a',o.shoe||'#f2f0ec',o.pal||{}),o.acc||null,o.mood||'calm',{lashes:o.fig==='girl'||o.lashes,baggy:o.baggy,afro:o.afro}]);}
const list=()=>C.map((c,i)=>`${i+1}. ${c[0]} (${c[1]}) -> '${TR[slug(c[0])]||slug(c[0])}'`);
module.exports={get,make,list,REG,pal,sh,H};
