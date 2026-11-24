const {head,body,HAIR,OUT,ACC,OL}=require('./bean.js');const {chromium}=require('playwright');
const W=2400,H=1500;
const P=(top,topL,topS,pants,pantsL,shoe,sole,extra={})=>({top,topL,topS,pants,pantsL,shoe,sole,acc:'#2f7ae0',...extra});
const cast=[
 {n:'МИР',r:'главный герой',c:P('#ff9a3c','#ffc070','#d8702a','#2c3a66','#5a6aa0','#f6f2ec','#e0485a'),o:'hoodie',h:{mood:'joy',hair:HAIR.swoop('#3a2418','#7a4a30')}},
 {n:'КИРА',r:'хитрая подруга',c:P('#2fb59a','#6ad8bf','#1f8a74','#f0e2c8','#fff','#ff6f91','#fff',{acc:'#ffe2a8',trim:'#f6efe0'}),o:'varsity',h:{mood:'smug',hair:HAIR.buns('#6a3a2a','#a8684a')}},
 {n:'БРУНО',r:'простак',c:P('#4a6fd0','#7a98ff','#3452a0','#2a2a3a','#55556a','#3a2a20','#c99a5a',{shirt:'#f2e8d8',shirtS:'#e04a5a'}),o:'overall',h:{mood:'shock',hair:HAIR.beanie('#e0485a','#ff8a8a')},wide:1.15},
 {n:'ЛЕЯ',r:'отличница',c:P('#8a6ad8','#b49aff','#6448b0','#3a3050','#6a5a8a','#2a2438','#fff',{acc:'#ffd24a'}),o:'tee',h:{mood:'calm',hair:HAIR.braids('#2a1a14','#5a3a2a'),acc:ACC.glasses}},
 {n:'ДЖЕЙ',r:'спортсмен',c:P('#f2f0ec','#ffffff','#cfcac2','#e8434f','#ff7a84','#f2f0ec','#e8434f',{acc:'#e8434f'}),o:'tee',h:{mood:'smug',hair:HAIR.cap('#e8434f','#22243f')},wide:1.2,legL:1.08},
 {n:'НОВА',r:'блогерша',c:P('#ff7fb0','#ffb0d0','#d85a8a','#f2e8ff','#fff','#ffffff','#ff7fb0'),o:'dress',h:{mood:'love',hair:HAIR.pony('#f2c46a','#fff0b0'),acc:ACC.bow}},
 {n:'ТОБИ',r:'геймер',c:P('#3a3a48','#5a5a6a','#24242e','#6a7a5a','#8a9a7a','#e0e0e0','#6a5af0',{acc:'#6a5af0'}),o:'hoodie',h:{mood:'tired',hair:HAIR.spiky('#2a6ad8','#7ab0ff'),acc:ACC.headphones}},
 {n:'МАМА',r:'мама героя',c:P('#5aa86a','#8ad09a','#3f7a4c','#3a3040','#5a5060','#a84a3a','#fff',{acc:'#fff4e0'}),o:'apron',h:{mood:'calm',hair:HAIR.long('#3a2418','#7a4a30')},s:1.08,legL:1.12},
 {n:'ДИРЕКТОР',r:'строгий взрослый',c:P('#2a3a5a','#4a5a7a','#1a2840','#2a3a5a','#4a5a7a','#1a1410','#4a3a2a',{shirt:'#f4f0e8',acc:'#c8303a'}),o:'suit',h:{mood:'angry',hair:HAIR.bald('#c8c4bc','#fff'),acc:ACC.mustache},s:1.1,legL:1.15,wide:1.12},
 {n:'ЗЕД',r:'новенький',c:P('#e8c040','#ffe07a','#b8902a','#2a2a30','#555','#2a2a30','#e8c040'),o:'puffer',h:{mood:'shy',hairBack:HAIR.afro('#2a1a14','#5a3a2a')},wide:1.1},
];
const rim='#ffd59a';
let s=`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f3e4d0"/><stop offset="1" stop-color="#e2c4a2"/></linearGradient>
<radialGradient id="vg" cx=".5" cy=".5" r=".75"><stop offset=".6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#2a1420" stop-opacity=".35"/></radialGradient>
<filter id="gr"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="4"/><feColorMatrix values="0 0 0 0 .5 0 0 0 0 .5 0 0 0 0 .5 0 0 0 .06 0"/></filter></defs>
<rect width="${W}" height="${H}" fill="url(#bg)"/>
<text x="60" y="90" font-family="DejaVu Sans" font-weight="bold" font-size="52" fill="${OL}">КАСТ — 10 персонажей</text>`;
const pos=(i)=>{const row=i<5?0:1, col=i%5; return [260+col*470, row?1360:700];};
// back row first
[...cast.keys()].sort((a,b)=>(b>=5)-(a>=5)).forEach(i=>{});
for(const i of [5,6,7,8,9,0,1,2,3,4]){const ch=cast[i],[x,y]=pos(i);
 s+=body({x,y,s:(ch.s??1)*1.0,c:ch.c,outfit:OUT[ch.o],rim,wide:ch.wide,legL:ch.legL,cast:[1.4,.2],h:ch.h,arms:[[6,0,16,0,0],[6,0,16,0,0]],legs:[-4,4]});
}
for(let i=0;i<10;i++){const [x,y]=pos(i),ch=cast[i];
 s+=`<g transform="translate(${x},${y+50})"><rect x="-120" y="-30" width="240" height="72" rx="16" fill="#fff" opacity=".85" stroke="${OL}" stroke-width="2.5"/>
  <text y="2" text-anchor="middle" font-family="DejaVu Sans" font-weight="bold" font-size="28" fill="${OL}">${ch.n}</text>
  <text y="32" text-anchor="middle" font-family="DejaVu Sans" font-size="21" fill="#6a5a6a">${ch.r}</text></g>`;}
s+=`<rect width="${W}" height="${H}" fill="url(#vg)"/><rect width="${W}" height="${H}" filter="url(#gr)"/></svg>`;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:W,height:H}});await p.setContent(`<body style="margin:0">${s}</body>`);await p.screenshot({path:'out/cast10.png'});await b.close();console.log('ok')})();
