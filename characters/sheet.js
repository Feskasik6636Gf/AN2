const {character,head,PAL,OL}=require('./toon.js');const {chromium}=require('playwright');
const W=2400,H=1500;
let s=`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<defs><radialGradient id="bg" cx=".5" cy=".35" r=".8"><stop offset="0" stop-color="#fff4e4"/><stop offset="1" stop-color="#f1dcc4"/></radialGradient></defs>
<rect width="${W}" height="${H}" fill="url(#bg)"/>
<text x="60" y="80" font-family="Arial Black,Arial" font-weight="900" font-size="46" fill="${OL}">ПЕРСОНАЖИ — черновик v2</text>
<text x="60" y="122" font-family="Arial" font-size="26" fill="#6a5a7a">формат «What if»-человечков · свой дизайн: голова-«каштан», цветные глаза, индиго-контур, cel-тень + один источник света слева-сверху</text>`;
const G=900;
s+=character({x:420,y:G,c:PAL.girl,outfit:'jacket',hair:'bob',mood:'smug',arms:[[26,60,10,120],[40,40,90,-10,true]],legs:[[-8,0],[10,0]],lean:-6});
s+=character({x:1200,y:G,s:1.08,c:PAL.hero,outfit:'hoodie',hair:'flick',mood:'joy',arms:[[30,70,14,130],[60,-30,90,-130,true]],legs:[[-14,0],[16,0]]});
s+=character({x:1980,y:G,c:PAL.rival,outfit:'track',hair:'buzz',extra:'cap',mood:'angry',arms:[[34,40,0,96],[34,40,0,96]],legs:[[-22,0],[22,0]],lean:8});
const lab=(x,n,t)=>`<text x="${x}" y="${G+70}" text-anchor="middle" font-family="Arial Black,Arial" font-size="38" fill="${OL}">${n}</text><text x="${x}" y="${G+106}" text-anchor="middle" font-family="Arial" font-size="24" fill="#6a5a7a">${t}</text>`;
s+=lab(420,'НИКА','умная, язвит · куртка + бирюза')+lab(1200,'ТИМ (главный)','«ты» из ролика · худи с молнией')+lab(1980,'БОРЗ','соперник · спорткостюм + кепка');
// emotions row
const moods=[['calm','спокоен'],['joy','радость'],['shock','шок'],['angry','злость'],['sad','грусть'],['smug','хитрый'],['shy','смущён'],['tired','устал']];
s+=`<rect x="40" y="1060" width="${W-80}" height="410" rx="28" fill="#ffffff" opacity=".55"/>`;
s+=`<text x="70" y="1105" font-family="Arial Black,Arial" font-size="30" fill="${OL}">Эмоции Тима</text>`;
moods.forEach(([m,t],i)=>{const x=200+i*290;s+=`<g>${head(x,1270,.82,m,PAL.hero,'flick')}</g><text x="${x}" y="1445" text-anchor="middle" font-family="Arial" font-size="26" fill="#6a5a7a">${t}</text>`;});
s+='</svg>';
require('fs').writeFileSync('out/sheet.svg',s);
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:W,height:H}});await p.setContent(`<body style="margin:0">${s}</body>`);await p.screenshot({path:'out/characters_v2.png'});await b.close();})();
