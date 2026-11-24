// render characters to transparent PNG sprites (feet at bottom)
const {body,HAIR,OUT,AGE}=require('./bean.js');const {HP}=require('./props.js');const {chromium}=require('playwright');
const TC={top:'#e3232c',topL:'#ff5a5a',topS:'#a8121b',pants:'#2a2426',pantsL:'#4a4244',pantsS:'#141012',shoe:'#e3232c',sole:'#f6f2ec',toe:'#f6f2ec',lace:'#f6f2ec'};
const AC={top:'#efe6dc',topL:'#fffaf4',topS:'#cdbfb2',pants:'#2a2426',pantsL:'#4a4244',pantsS:'#141012',shoe:'#f7f5f2',sole:'#d8d2cc'};
const T=(m,ex={})=>({c:TC,outfit:OUT.hoodie2,baggy:true,...AGE.y18,h:{mood:m,hair:HAIR.messy('#6e3c22','#b8703e','#4a2414'),shape:'chin',eyeS:.82,blushA:.5,backHair:'#6e3c22'},arms:[[6,0,16,0,0],[6,0,16,0,0]],legs:[-6,6],...ex});
const A=(m,ex={})=>({c:AC,outfit:OUT.offshoulder,fig:'girl',baggy:true,chunky:true,...AGE.y18,h:{mood:m,hair:HAIR.bun2('#8e3a22','#c4683e','#5e2012'),lashes:true,shape:'egg',eyeS:.88,blushA:.7,backHair:'#8e3a22'},arms:[[20,10,-82,-54,0],[20,20,-70,-40,0]],armsOver:'both',legs:[-5,5],...ex});
const list={tema_joy:T('joy',{arms:[[10,0,20,0,0],[30,-70,60,-170,-20]],backpack:'#2fb59a'}),tema_back:T('calm',{back:true,backpack:'#2fb59a'}),aya_smug:A('smug'),aya_phone:A('joy',{prop:{side:-1,svg:HP.phone},arms:[[20,-30,-20,-110,0],[20,20,-70,-40,0]],armsOver:false})};
const W=900,H=1500;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:W,height:H}});
 for(const [k,o] of Object.entries(list)){const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">${body({...o,x:W/2,y:H-30,s:2,rim:'#ffd59a',cast:[0,0]})}</svg>`;
  await p.setContent(`<body style="margin:0;background:transparent">${svg}</body>`);await p.screenshot({path:`out/spr_${k}.png`,omitBackground:true});}
 await b.close();console.log('ok')})();
