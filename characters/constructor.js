const {head,body,HAIR,OUT,ACC,AGE,OL}=require('./bean.js');const {chromium}=require('playwright');
const W=2400,H=1600;
const P=(top,topL,topS,pants,pantsL,shoe,sole,extra={})=>({top,topL,topS,pants,pantsL,shoe,sole,acc:'#2f7ae0',...extra});
const MIR=P('#ff9a3c','#ffc070','#d8702a','#2c3a66','#5a6aa0','#f6f2ec','#e0485a');
const hairBoy=HAIR.swoop('#3a2418','#7a4a30');
const lab=(x,y,a,b)=>`<g transform="translate(${x},${y})"><rect x="-130" y="-28" width="260" height="70" rx="16" fill="#fff" opacity=".88" stroke="${OL}" stroke-width="2.5"/><text y="4" text-anchor="middle" font-family="DejaVu Sans" font-weight="bold" font-size="27" fill="${OL}">${a}</text><text y="32" text-anchor="middle" font-family="DejaVu Sans" font-size="20" fill="#6a5a6a">${b}</text></g>`;
let s=`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f3e4d0"/><stop offset="1" stop-color="#e2c4a2"/></linearGradient>
<filter id="gr"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="4"/><feColorMatrix values="0 0 0 0 .5 0 0 0 0 .5 0 0 0 0 .5 0 0 0 .06 0"/></filter></defs><rect width="${W}" height="${H}" fill="url(#bg)"/>
<text x="60" y="80" font-family="DejaVu Sans" font-weight="bold" font-size="46" fill="${OL}">КОНСТРУКТОР: возраст</text>
<text x="1240" y="80" font-family="DejaVu Sans" font-weight="bold" font-size="46" fill="${OL}">КОНСТРУКТОР: роли под любую тему</text>
<path d="M1180,40 L1180,1560" stroke="${OL}" stroke-width="2" opacity=".2"/>`;
const ages=[['kid','ребёнок','smug'],['teen','подросток','joy'],['adult','взрослый','calm'],['elder','пожилой','tired']];
const G1=720,G2=1420;
ages.forEach(([k,t,m],i)=>{const a=AGE[k],x=180+i*270;const isE=k==='elder';
 s+=body({x,y:G1,...a,c:isE?P('#7a8aa0','#a0b0c8','#56667a','#4a4440','#6a6460','#5a3a2a','#2a1a10'):MIR,outfit:OUT.hoodie,rim:'#ffd59a',cast:[1.4,.2],h:{mood:m,hair:isE?HAIR.swoop('#c9c6c0','#f2f0ec'):hairBoy,acc:isE?ACC.glasses:null},arms:[[6,0,16,0,0],[6,0,16,0,0]],legs:[-4,4]});
 s+=lab(x,G1+50,t,k==='kid'?'6–10 лет':k==='teen'?'13–18':k==='adult'?'20–45':'60+');});
// female ages
const NOVA=P('#2fb59a','#6ad8bf','#1f8a74','#f0e2c8','#fff','#ff6f91','#fff');
ages.forEach(([k,t,m],i)=>{const a=AGE[k],x=180+i*270;const isE=k==='elder';
 s+=body({x,y:G2,...a,c:isE?P('#b06a8a','#d090b0','#8a4a6a','#3a3040','#5a5060','#5a3a2a','#fff'):NOVA,outfit:k==='adult'?OUT.tee:OUT.dress,rim:'#ffd59a',cast:[1.4,.2],h:{mood:m,hair:isE?HAIR.buns('#d8d4ce','#fff'):k==='kid'?HAIR.braids('#6a3a2a','#a8684a'):HAIR.long('#6a3a2a','#a8684a'),acc:isE?ACC.glasses:null},arms:[[6,0,16,0,0],[6,0,16,0,0]],legs:[-4,4]});
 s+=lab(x,G2+50,t,'');});
const A=AGE.adult;
const roles=[
 ['ВРАЧ','больница',P('#f4f6f8','#fff','#cfd6de','#4a8ab0','#7ab0d0','#f2f2f2','#4a8ab0',{shirt:'#7ab0e0',acc:'#e04a4a'}),'labcoat',HAIR.swoop('#2a1a14','#5a3a2a'),'calm',ACC.glasses],
 ['ПОЛИЦЕЙСКИЙ','закон',P('#2a4a8a','#4a6ab0','#1a3266','#1a2a4a','#3a4a6a','#1a1410','#1a1410'),'police',HAIR.policeCap('#1a2a4a','#2a3a5a'),'angry'],
 ['СОЛДАТ','армия',P('#6a7a4a','#8a9a62','#4a5634','#5a6a3e','#7a8a5a','#3a2a1a','#2a1a0a',{vest:'#5a5a3a'}),'army',HAIR.helmet('#5a6a3e','#7a8a5a'),'smug'],
 ['СТРОИТЕЛЬ','стройка',P('#3a6ab0','#5a8ad0','#2a4a80','#3a4a6a','#5a6a8a','#8a5a2a','#3a2a1a'),'hivis',HAIR.hardhat('#ffb020','#ffd060'),'joy'],
 ['ПОВАР','кухня',P('#f6f4f0','#fff','#d8d4cc','#2a2a30','#4a4a50','#1a1a20','#fff'),'chef',HAIR.chefHat('#fff','#fff'),'joy',ACC.mustache],
 ['БИЗНЕСМЕН','офис, деньги',P('#2a2a34','#4a4a56','#1a1a22','#2a2a34','#4a4a56','#1a1410','#4a3a2a',{shirt:'#f4f0e8',acc:'#2f7ae0'}),'suit',HAIR.swoop('#1a1214','#4a3a3a'),'smug'],
 ['УЧЁНАЯ','лаборатория',P('#f4f6f8','#fff','#cfd6de','#3a3050','#5a5070','#ff6f91','#fff',{shirt:'#ff9ab0',acc:'#6a5af0'}),'labcoat',HAIR.pony('#e8a040','#ffd080'),'shock',ACC.glasses],
 ['ЗВЕЗДА','шоу, слава',P('#1a1a22','#3a3a48','#0a0a12','#1a1a22','#3a3a48','#fff','#ffd24a',{acc:'#ffd24a'}),'tee',HAIR.spiky('#ffd24a','#fff0a0'),'smug'],
];
roles.forEach(([n,r,c,o,h,m,acc],i)=>{const col=i%4,row=Math.floor(i/4),x=1350+col*270,y=row?G2:G1;
 s+=body({x,y,...A,c,outfit:OUT[o],rim:'#ffd59a',cast:[1.4,.2],h:{mood:m,hair:h,acc},arms:[[6,0,16,0,0],[6,0,16,0,0]],legs:[-4,4]});
 s+=lab(x,y+50,n,r);});
s+=`<rect width="${W}" height="${H}" filter="url(#gr)"/></svg>`;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:W,height:H}});await p.setContent(`<body style="margin:0">${s}</body>`);await p.screenshot({path:'out/constructor.png'});await b.close();console.log('ok')})();
