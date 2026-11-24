const {body,HAIR,OUT,AGE,OL}=require('./bean.js');const {HP}=require('./props.js');const {chromium}=require('playwright');
const W=2600,H=1100;
const TC={top:'#e3232c',topL:'#ff5a5a',topS:'#a8121b',pants:'#2a2426',pantsL:'#4a4244',pantsS:'#141012',shoe:'#e3232c',sole:'#f6f2ec',toe:'#f6f2ec',lace:'#f6f2ec'};
const T={c:TC,outfit:OUT.hoodie2,baggy:true,...AGE.y18,rim:'#ffd59a',cast:[1.2,.2]};
const hd=m=>({mood:m,hair:HAIR.messy('#6e3c22','#b8703e','#4a2414'),shape:'chin',eyeS:.82,blushA:.5,backHair:'#6e3c22'});
const lab=(x,t)=>`<text x="${x}" y="${H-40}" text-anchor="middle" font-family="DejaVu Sans" font-weight="bold" font-size="28" fill="${OL}">${t}</text>`;
let s=`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><rect width="${W}" height="${H}" fill="#efe2d0"/><rect y="${H-120}" width="${W}" height="120" fill="#e2cdb2"/>`;
const G=H-130, sc=1.15;
s+=body({...T,x:180,y:G,s:sc,h:hd('joy'),backpack:'#2fb59a',arms:[[6,0,16,0,0],[6,0,16,0,0]]})+lab(180,'с рюкзаком');
s+=body({...T,x:470,y:G,s:sc,h:hd('calm'),backpack:'#2fb59a',back:true,arms:[[6,0,16,0,0],[6,0,16,0,0]]})+lab(470,'со спины');
s+=body({...T,x:760,y:G,s:sc,h:hd('smug'),prop:{side:1,svg:HP.money},arms:[[6,0,16,0,0],[30,-40,40,-100,-10]]})+lab(760,'с деньгами');
s+=body({...T,x:1050,y:G,s:sc,h:hd('shock'),prop:{side:1,svg:HP.phone},arms:[[6,0,16,0,0],[20,-30,-10,-110,-10]]})+lab(1050,'с телефоном');
// chair
s+=`<rect x="1230" y="${G-330}" width="180" height="200" rx="10" fill="#8a5a3a" stroke="${OL}" stroke-width="2.4"/><rect x="1220" y="${G-140}" width="200" height="18" fill="#8a5a3a" stroke="${OL}" stroke-width="2.4"/><rect x="1228" y="${G-122}" width="12" height="122" fill="#5a3a2a"/><rect x="1400" y="${G-122}" width="12" height="122" fill="#5a3a2a"/>`;
s+=body({...T,x:1320,y:G,s:sc,h:hd('tired'),sit:'chair',prop:{side:-1,svg:HP.coffee},arms:[[10,0,30,-30,0],[6,0,16,0,0]]})+lab(1320,'сидит на стуле');
s+=body({...T,x:1620,y:G,s:sc,h:hd('sad'),sit:'floor',arms:[[10,-10,40,-50,0],[10,-10,40,-50,0]]})+lab(1620,'сидит на полу');
s+=body({...T,x:2480,y:G-6,s:sc,h:hd('tired'),lie:1,arms:[[6,0,16,0,0],[6,0,16,0,0]]})+lab(2280,'лежит');
s+='</svg>';
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:W,height:H}});await p.setContent(`<body style="margin:0">${s}</body>`);await p.screenshot({path:'out/poses.png'});await b.close();console.log('ok')})();
