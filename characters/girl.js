const {head,body,HAIR,OUT,AGE,OL}=require('./bean.js');const {chromium}=require('playwright');
const W=2400,H=1600;
const GIRL={top:'#efe6dc',topL:'#fffaf4',topS:'#cdbfb2',pants:'#2a2426',pantsL:'#4a4244',pantsS:'#141012',shoe:'#f7f5f2',sole:'#d8d2cc',toe:'#ffffff',lace:'#d8d2cc'};
const hr=HAIR.bun2('#8e3a22','#c4683e','#5e2012');
const base={...AGE.y18,fig:'girl',c:GIRL,outfit:OUT.offshoulder,baggy:true,chunky:true,rim:'#ffd59a',cast:[1.4,.2],legs:[-6,6]};
const H0=(m)=>({mood:m,hair:hr,lashes:true,shape:'egg',eyeS:.88,blushA:.7});
const lab=(x,y,a)=>`<text x="${x}" y="${y}" text-anchor="middle" font-family="DejaVu Sans" font-weight="bold" font-size="28" fill="${OL}">${a}</text>`;
const fx={love:(x,y)=>[[-120,-40,1],[110,-70,.8],[130,10,.6],[-130,40,.7]].map(([a,b,k])=>`<path transform="translate(${x+a},${y+b}) scale(${k})" d="M0,22 C-30,0 -22,-22 0,-8 C22,-22 30,0 0,22Z" fill="#ff6a8a" stroke="${OL}" stroke-width="3"/>`).join(''),
 shock:(x,y)=>`<text x="${x+90}" y="${y-60}" font-family="DejaVu Sans" font-weight="bold" font-size="80" fill="#e3232c" stroke="${OL}" stroke-width="3">!!</text>`,
 angry:(x,y)=>`<g transform="translate(${x+90},${y-80})"><path d="M-22,-6 Q-10,-8 -6,-22 M6,-22 Q10,-8 22,-6 M22,6 Q10,8 6,22 M-6,22 Q-10,8 -22,6" stroke="#e8202e" stroke-width="7" fill="none" stroke-linecap="round"/></g>`,
 tired:(x,y)=>`<text x="${x+90}" y="${y-70}" font-family="DejaVu Sans" font-weight="bold" font-size="56" fill="#6a4ad0" stroke="${OL}" stroke-width="2.5">Zz</text>`,
 joy:(x,y)=>`<path d="M${x+110},${y-80} l26,-26 M${x+124},${y-50} l34,-10 M${x+100},${y-104} l4,-34" stroke="#ffb020" stroke-width="7" stroke-linecap="round"/>`,
 smug:(x,y)=>`<path transform="translate(${x-120},${y+10})" d="M0,-16 L5,-5 L16,0 L5,5 L0,16 L-5,5 L-16,0 L-5,-5Z" fill="#ffd040" stroke="${OL}" stroke-width="2.5"/>`,
 sad:(x,y)=>``,shy:(x,y)=>`<path d="M${x-130},${y+30} c-20,-30 20,-40 20,-10 c0,20 -30,20 -24,0" stroke="${OL}" stroke-width="3.5" fill="none"/>`};
let s=`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f3e4d0"/><stop offset="1" stop-color="#e2c4a2"/></linearGradient>
<filter id="gr"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="4"/><feColorMatrix values="0 0 0 0 .5 0 0 0 0 .5 0 0 0 0 .5 0 0 0 .06 0"/></filter></defs><rect width="${W}" height="${H}" fill="url(#bg)"/>
<text x="60" y="80" font-family="DejaVu Sans" font-weight="bold" font-size="46" fill="${OL}">ДЕВУШКА — в нашем стиле</text>`;
// full body: hands clasped in front
s+=body({...base,x:300,y:1400,s:1.35,h:H0('calm'),arms:[[10,0,-20,6,0],[10,0,-20,6,0]],armsOver:'both'});
s+=lab(300,1460,'спокойна');
// emotions as waist-up crops
const em=[['love','влюблена',[[40,-30,8,-168,30],[40,-30,8,-168,-30]],'both'],['smug','довольна',[[20,10,-82,-54,0],[20,20,-70,-40,0]],'both'],['shock','шок',[[30,10,-34,-90,0],[30,10,-34,-90,0]],'both'],['angry','злится',[[6,0,16,0,0],[6,0,16,0,0]]],
 ['tired','сонная',[[6,0,16,0,0],[30,-40,-42,-174,-20]],'right'],['shy','обиделась',[[20,10,-82,-54,0],[20,20,-70,-40,0]],'both'],['joy','смеётся',[[20,10,-82,-54,0],[20,20,-70,-40,0]],'both'],['sad','грустит',[[6,0,16,0,0],[6,0,16,0,0]]]];
em.forEach(([m,t,arms,over],i)=>{const col=i%4,row=Math.floor(i/4);const cx=800+col*400,cy=140+row*720;
 const inner=body({...base,x:200,y:1000,s:1.6,h:H0(m),arms,armsOver:over==='both'?'both':over?true:false,cast:[0,0]});
 s+=`<svg x="${cx-200}" y="${cy}" width="400" height="560" viewBox="0 150 400 560" overflow="hidden">${inner}${(fx[m]||(()=>''))(200,430)}</svg>`;
 s+=`<text x="${cx}" y="${cy+600}" text-anchor="middle" font-family="DejaVu Sans" font-weight="bold" font-size="28" fill="${OL}">${t}</text>`;});
s+=`<rect width="${W}" height="${H}" filter="url(#gr)"/></svg>`;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:W,height:H}});await p.setContent(`<body style="margin:0">${s}</body>`);await p.screenshot({path:'out/girl_bean.png'});await b.close();console.log('ok')})();
