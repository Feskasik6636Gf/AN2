const {L2}=require('./sets2.js');const S=require('./stage.js');const {HAIR,OUT,AGE}=require('./bean.js');const {chromium}=require('playwright');
const TEMA={c:{top:'#e3232c',topL:'#ff5a5a',topS:'#a8121b',pants:'#2a2426',pantsL:'#4a4244',pantsS:'#141012',shoe:'#e3232c',sole:'#f6f2ec',toe:'#f6f2ec',lace:'#f6f2ec'},outfit:OUT.hoodie2,baggy:true,...AGE.y18,
 h:{mood:'joy',hair:HAIR.messy('#6e3c22','#b8703e','#4a2414'),shape:'chin',eyeS:.82,blushA:.5},arms:[[10,0,20,0,0],[30,-70,60,-170,-20]],legs:[-6,6]};
const AYA={c:{top:'#efe6dc',topL:'#fffaf4',topS:'#cdbfb2',pants:'#2a2426',pantsL:'#4a4244',pantsS:'#141012',shoe:'#f7f5f2',sole:'#d8d2cc'},outfit:OUT.offshoulder,fig:'girl',baggy:true,chunky:true,...AGE.y18,
 h:{mood:'smug',hair:HAIR.bun2('#8e3a22','#c4683e','#5e2012'),lashes:true,shape:'egg',eyeS:.88,blushA:.7},arms:[[20,10,-82,-54,0],[20,20,-70,-40,0]],armsOver:'both',legs:[-5,5]};
const keys=process.argv.slice(2).length?process.argv.slice(2):Object.keys(L2);
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:S.W,height:S.H}});
 for(const k of keys){try{const st=L2[k]();const C=st.C;const cast=[[TEMA,st.spots[0]],[AYA,st.spots[1]]].sort((a,b)=>b[1][1]-a[1][1]);
  let svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${S.W}" height="${S.H}" viewBox="0 0 ${S.W} ${S.H}">`+st.bg;
  for(const [ch,[X,Z]] of cast) svg+=S.actor(C,X,Z,{...ch,rim:st.rim,cast:st.cast});
  svg+=st.fg+S.grade(...st.grade)+'</svg>';
  await p.setContent(`<body style="margin:0">${svg}</body>`);await p.screenshot({path:`out/l2_${k}.png`});console.log('ok',k);}catch(e){console.log('ERR',k,e.message);}}
 await b.close();})();
