const {head,body,HAIR,OUT,ACC,AGE,OL}=require('./bean.js');const {chromium}=require('playwright');
const W=2400,H=1600;
const HERO={top:'#e3232c',topL:'#ff5a5a',topS:'#a8121b',pants:'#2a2426',pantsL:'#4a4244',pantsS:'#141012',shoe:'#e3232c',sole:'#f6f2ec',toe:'#f6f2ec',lace:'#f6f2ec',acc:'#fff'};
const hh=HAIR.messy('#6e3c22','#b8703e','#4a2414'), hb=HAIR.messyBack('#6e3c22','#b8703e','#4a2414');
const lab=(x,y,a)=>`<text x="${x}" y="${y}" text-anchor="middle" font-family="DejaVu Sans" font-weight="bold" font-size="28" fill="${OL}">${a}</text>`;
let s=`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f3e4d0"/><stop offset="1" stop-color="#e2c4a2"/></linearGradient>
<filter id="gr"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="4"/><feColorMatrix values="0 0 0 0 .5 0 0 0 0 .5 0 0 0 0 .5 0 0 0 .06 0"/></filter></defs><rect width="${W}" height="${H}" fill="url(#bg)"/>
<text x="60" y="80" font-family="DejaVu Sans" font-weight="bold" font-size="46" fill="${OL}">ТВОЙ ГЕРОЙ — в нашем стиле</text>`;
const T={teen:AGE.teen};
s+=body({x:260,y:900,...AGE.teen,s:1.25,c:HERO,outfit:OUT.hoodie2,baggy:true,pocket:true,rim:'#ffd59a',cast:[1.4,.2],h:{mood:'smug',hair:hh,shape:'round'},arms:[[10,-10,-30,-20,0],[10,-10,-30,-20,0]],legs:[-8,8]});
s+=body({x:640,y:900,...AGE.teen,s:1.25,c:HERO,outfit:OUT.hoodie2,baggy:true,rim:'#ffd59a',cast:[1.4,.2],h:{mood:'joy',hair:hh},arms:[[10,0,20,0,0],[30,-70,60,-170,-20]],legs:[-8,8]});
s+=lab(260,960,'спокоен, руки в карманах')+lab(640,960,'привет!');
const em=[['smug','хитрый'],['shock','шок'],['love','влюблён'],['joy','радость'],['sad','грустит'],['angry','злится'],['shy','смущён'],['tired','устал']];
em.forEach(([m,t],i)=>{const col=i%4,row=Math.floor(i/4),x=1050+col*330,y=300+row*420;
 s+=head(x,y,{s:1.0,mood:m,hair:hh});s+=lab(x,y+170,t);});
// figures + head shapes demo
s+=`<text x="60" y="1060" font-family="DejaVu Sans" font-weight="bold" font-size="36" fill="${OL}">Фигуры тела и формы головы</text>`;
const P=(top,topL,topS,pants,pantsL)=>({top,topL,topS,pants,pantsL,pantsS:'#1a1420',shoe:'#f2f0ec',sole:'#555',acc:topS});
const figs=[['boy','парень','round',HAIR.swoop('#3a2418','#7a4a30'),P('#4a8ad0','#7ab0ff','#2a5a9a','#2a2a3a','#4a4a5a')],
 ['girl','девушка','egg',HAIR.long('#6a3a2a','#a8684a'),P('#ff7fb0','#ffb0d0','#d85a8a','#3a3050','#5a5070')],
 ['muscle','качок','square',HAIR.cap('#2a2a30','#e8434f'),P('#f2f0ec','#fff','#c9c4bc','#3a4a6a','#5a6a8a')],
 ['chubby','толстяк','wide',HAIR.beanie('#5aa86a','#8ad09a'),P('#e8a040','#ffc070','#b8782a','#4a3a2a','#6a5a4a')],
 ['slim','худой','oval',HAIR.spiky('#2a6ad8','#7ab0ff'),P('#6a5af0','#9a8aff','#4a3ab0','#2a2a30','#4a4a50')],
 ['boy','взрослый','chin',HAIR.swoop('#1a1214','#4a3a3a'),P('#2a2a34','#4a4a56','#1a1a22','#2a2a34','#4a4a56')]];
figs.forEach(([f,t,sh,hr,c],i)=>{const x=200+i*380,a=i===5?AGE.adult:AGE.teen;
 s+=body({x,y:1460,...a,fig:f,c,outfit:i===5?OUT.suit:OUT.tee,rim:'#ffd59a',cast:[1.4,.2],h:{mood:'calm',hair:hr,shape:sh},arms:[[6,0,16,0,0],[6,0,16,0,0]],legs:[-4,4]});
 s+=lab(x,1520,t)+`<text x="${x}" y="1552" text-anchor="middle" font-family="DejaVu Sans" font-size="20" fill="#6a5a6a">голова: ${sh}</text>`;});
s+=`<rect width="${W}" height="${H}" filter="url(#gr)"/></svg>`;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:W,height:H}});await p.setContent(`<body style="margin:0">${s}</body>`);await p.screenshot({path:'out/hero_sheet.png'});await b.close();console.log('ok')})();
