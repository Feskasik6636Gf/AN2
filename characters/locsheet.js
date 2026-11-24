const {LOC,CAST,GRADE,grade,W,H}=require('./locations.js');const {body,HAIR,OUT,ACC,AGE,OL}=require('./bean.js');const {chromium}=require('playwright');
const TEMA={c:{top:'#e3232c',topL:'#ff5a5a',topS:'#a8121b',pants:'#2a2426',pantsL:'#4a4244',pantsS:'#141012',shoe:'#e3232c',sole:'#f6f2ec',toe:'#f6f2ec',lace:'#f6f2ec'},outfit:OUT.hoodie2,baggy:true,...AGE.y18};
const AYA={c:{top:'#efe6dc',topL:'#fffaf4',topS:'#cdbfb2',pants:'#2a2426',pantsL:'#4a4244',pantsS:'#141012',shoe:'#f7f5f2',sole:'#d8d2cc'},outfit:OUT.offshoulder,fig:'girl',baggy:true,chunky:true,...AGE.y18};
const th=m=>({mood:m,hair:HAIR.messy('#6e3c22','#b8703e','#4a2414'),shape:'chin',eyeS:.82,blushA:.5});
const ah=m=>({mood:m,hair:HAIR.bun2('#8e3a22','#c4683e','#5e2012'),lashes:true,shape:'egg',eyeS:.88,blushA:.7});
const rimOf={bedroomNight:'#9aa8ff',cityNight:'#ff8ad8',parkSunset:'#ffc080',streetDay:'#fff0c0'};
const names={bedroomNight:'Спальня, ночь',kitchen:'Кухня, утро',hallway:'Школьный коридор',classroom:'Класс',streetDay:'Улица, день',cityNight:'Город, ночь, неон',office:'Офис',parkSunset:'Парк, закат'};
function scene(k){let s=`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">`+LOC[k]();
 const rim=rimOf[k]||'#ffd59a', cs=CAST[k];
 s+=body({x:760,y:1000,...TEMA,s:1.25,rim,cast:cs,h:th('joy'),arms:[[10,0,20,0,0],[30,-70,60,-170,-20]],legs:[-6,6]});
 s+=body({x:1150,y:1010,...AYA,s:1.25,rim,cast:cs,h:ah('smug'),arms:[[20,10,-82,-54,0],[20,20,-70,-40,0]],armsOver:'both',legs:[-5,5]});
 const g=GRADE[k];s+=grade(g[0],g[1],g[2]);
 return s+'</svg>';}
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:W,height:H}});
 const keys=Object.keys(LOC);for(const k of keys){await p.setContent(`<body style="margin:0">${scene(k)}</body>`);await p.screenshot({path:`out/loc_${k}.png`});}
 await b.close();
 const fs=require('fs');fs.writeFileSync('out/locnames.json',JSON.stringify(keys.map(k=>[k,names[k]])));console.log('ok')})();
