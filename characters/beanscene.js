const {head,body,HAIR,OUT,OL,rnd}=require('./bean.js');const {chromium}=require('playwright');
const W=1920,H=1080;
const L='#4a3a48'; // line colour for environment
// ---------- classroom set (illustrated flat, thin lines, perspective) ----------
function classroom(){
 let s=`<defs>
  <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e9d8c4"/><stop offset="1" stop-color="#f4e6d2"/></linearGradient>
  <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c58a5a"/><stop offset="1" stop-color="#a86c44"/></linearGradient>
  <linearGradient id="beam" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff4d6" stop-opacity=".55"/><stop offset="1" stop-color="#fff4d6" stop-opacity="0"/></linearGradient>
  <linearGradient id="win" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9fd4f0"/><stop offset="1" stop-color="#ffe2b8"/></linearGradient>
  <filter id="b1"><feGaussianBlur stdDeviation="2.2"/></filter><filter id="b2"><feGaussianBlur stdDeviation="14"/></filter><filter id="b3"><feGaussianBlur stdDeviation="30"/></filter>
 </defs>`;
 s+=`<rect width="${W}" height="${H}" fill="url(#wall)"/>`;
 // ceiling strip + lights
 s+=`<path d="M0,0 L1920,0 L1920,70 L0,110Z" fill="#f6efe4" stroke="${L}" stroke-width="1.5"/>`;
 // back wall elements (blurred a bit = depth)
 let bw=`<rect x="0" y="560" width="1920" height="70" fill="#5fa8a0" stroke="${L}" stroke-width="1.5"/>
  <rect x="560" y="210" width="820" height="300" rx="6" fill="#2f5a4a" stroke="${L}" stroke-width="3"/><rect x="560" y="500" width="820" height="16" fill="#b98a5a" stroke="${L}" stroke-width="1.5"/>
  <text x="620" y="290" font-family="Comic Sans MS, Arial" font-size="40" fill="#e8f0e0" opacity=".85">What if...?</text>
  <path d="M620,330 L900,330 M620,370 L820,370 M1000,300 C1060,260 1120,340 1180,290" stroke="#e8f0e0" stroke-width="4" opacity=".6" fill="none"/>
  <circle cx="1490" cy="190" r="40" fill="#fff" stroke="${L}" stroke-width="3"/><path d="M1490,190 L1490,166 M1490,190 L1506,198" stroke="${L}" stroke-width="3"/>
  ${[...Array(5)].map((_,i)=>`<rect x="${1450+i*70}" y="300" width="56" height="74" fill="${['#ffcf5a','#7ac8ff','#ff8aa0','#9ae0a0','#c8a0ff'][i]}" stroke="${L}" stroke-width="1.5" transform="rotate(${(i%2?3:-3)} ${1478+i*70} 337)"/>`).join('')}
  <rect x="1460" y="420" width="300" height="140" fill="#c9a272" stroke="${L}" stroke-width="2"/>${[...Array(4)].map((_,i)=>`<rect x="${1475+i*70}" y="436" width="54" height="40" fill="${['#e06a5a','#5a8ae0','#e0c05a','#5ac0a0'][i]}" stroke="${L}" stroke-width="1"/>`).join('')}`;
 s+=`<g filter="url(#b1)">${bw}</g>`;
 // windows left wall (perspective)
 s+=`<path d="M0,110 L330,70 L330,640 L0,720Z" fill="#e2cdb6" stroke="${L}" stroke-width="1.5"/>`;
 for(const [x1,x2] of [[30,140],[180,290]]){const y1=110-(x1/330)*40+40, y2=110-(x2/330)*40+40, b1=720-(x1/330)*80-200, b2=720-(x2/330)*80-200;
  s+=`<path d="M${x1},${y1} L${x2},${y2} L${x2},${b2} L${x1},${b1}Z" fill="url(#win)" stroke="${L}" stroke-width="3"/><path d="M${(x1+x2)/2},${(y1+y2)/2} L${(x1+x2)/2},${(b1+b2)/2}" stroke="${L}" stroke-width="2.5"/>`;}
 // floor
 s+=`<path d="M0,720 L330,640 L1920,630 L1920,1080 L0,1080Z" fill="url(#floor)"/>`;
 for(let i=0;i<14;i++){const y=640+i*i*3.2+i*8; s+=`<path d="M${330-i*30},${y} L1920,${y-2}" stroke="#8a5434" stroke-width="1.4" opacity=".45"/>`;}
 for(let i=0;i<22;i++){const x=330+i*80; s+=`<path d="M${x},638 L${x-(i-6)*60},1080" stroke="#8a5434" stroke-width="1.2" opacity=".3"/>`;}
 // light beams through windows
 s+=`<path d="M140,160 L290,140 L1300,1080 L700,1080Z" fill="url(#beam)" opacity=".7" filter="url(#b2)"/>`;
 s+=`<path d="M30,180 L140,165 L760,1080 L250,1080Z" fill="url(#beam)" opacity=".5" filter="url(#b2)"/>`;
 // back desks (mid ground, slight blur)
 let desks='';for(const [x,y,sc] of [[700,690,.7],[1000,690,.7],[1300,690,.7],[1600,690,.7]]){desks+=desk(x,y,sc);}
 s+=`<g filter="url(#b1)" opacity=".95">${desks}</g>`;
 return s;
}
function desk(x,y,s){return `<g transform="translate(${x},${y}) scale(${s})">
 <path d="M-110,0 L110,0 L130,30 L-130,30Z" fill="#d9a46a" stroke="${L}" stroke-width="2.5"/><rect x="-130" y="30" width="260" height="14" fill="#b9844e" stroke="${L}" stroke-width="2"/>
 <path d="M-120,44 L-120,170 M120,44 L120,170" stroke="#7a8a9a" stroke-width="8"/><path d="M-120,44 L-120,170 M120,44 L120,170" stroke="${L}" stroke-width="1" opacity=".0"/></g>`;}
function fgDesk(){return `<g filter="url(#b3)"><path d="M1560,960 L1920,940 L1920,1080 L1520,1080Z" fill="#c8915a"/><path d="M1540,975 L1920,955" stroke="#8a5434" stroke-width="10"/></g>
 <g filter="url(#b3)"><circle cx="160" cy="1000" r="150" fill="#2a2032"/><path d="M40,880 C80,820 240,820 280,880" fill="#3a2a40"/></g>`;}

// ---------- characters ----------
const MIR={top:'#ff9a3c',topL:'#ffc070',topS:'#d8702a',acc:'#2f7ae0',pants:'#2c3a66',pantsL:'#5a6aa0',shoe:'#f6f2ec',sole:'#e0485a'};
const KIRA={top:'#2fb59a',topL:'#6ad8bf',topS:'#1f8a74',acc:'#ffe2a8',trim:'#f6efe0',pants:'#f0e2c8',pantsL:'#fff',shoe:'#ff6f91',sole:'#fff'};
const BRUNO={top:'#4a6fd0',topL:'#7a98ff',topS:'#3452a0',shirt:'#f2e8d8',shirtS:'#e04a5a',pants:'#2a2a3a',pantsL:'#55556a',shoe:'#3a2a20',sole:'#c99a5a'};

function scene(){
 let s=`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">`;
 s+=classroom();
 s+=body({x:600,y:960,s:1.15,c:KIRA,outfit:OUT.varsity,rim:'#ffd59a',h:{mood:'smug',look:4,hair:HAIR.buns('#6a3a2a','#a8684a')},arms:[[6,0,26,-30,-20],[-30,-50,-24,-110,40]],legs:[-4,6]});
 s+=body({x:1380,y:980,s:1.2,c:BRUNO,outfit:OUT.overall,rim:'#ffd59a',h:{mood:'shock',look:-5,hair:HAIR.beanie('#e0485a','#ff8a8a')},arms:[[30,-40,50,-120,-30],[30,-40,50,-120,30]],legs:[-10,10]});
 s+=body({x:980,y:1010,s:1.32,c:MIR,outfit:OUT.hoodie,rim:'#ffd59a',h:{mood:'joy',hair:HAIR.swoop('#3a2418','#7a4a30')},arms:[[10,0,20,0,0],[40,-60,70,-150,-20]],legs:[-6,8]});
 // money gag
 s+=`<g transform="translate(1110,300) rotate(-8)"><text font-family="DejaVu Sans" font-weight="bold" font-size="76" fill="#4ad07a" stroke="${OL}" stroke-width="3">+$1,000</text></g>`;
 s+=fgDesk();
 // grade: warm haze, bloom, vignette, grain
 s+=`<defs><radialGradient id="vg" cx=".5" cy=".5" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#1a0e14" stop-opacity=".55"/></radialGradient>
  <linearGradient id="haze" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff1d8" stop-opacity=".28"/><stop offset=".6" stop-color="#fff1d8" stop-opacity="0"/></linearGradient>
  <filter id="gr"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="4"/><feColorMatrix values="0 0 0 0 .5 0 0 0 0 .5 0 0 0 0 .5 0 0 0 .07 0"/></filter></defs>
  <rect width="${W}" height="${H}" fill="url(#haze)"/><rect width="${W}" height="${H}" fill="url(#vg)"/><rect width="${W}" height="${H}" filter="url(#gr)"/>`;
 return s+'</svg>';
}
function sheet(){
 let s=`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><rect width="${W}" height="${H}" fill="#f3e7d8"/>
 <text x="60" y="80" font-family="DejaVu Sans" font-weight="bold" font-size="42" fill="${OL}">«Бобы» — эмоции главного героя (Мир)</text>`;
 const moods=[['calm','спокоен'],['joy','радость'],['shock','шок'],['angry','злость'],['sad','грусть'],['smug','хитрый'],['shy','смущён'],['tired','устал']];
 moods.forEach(([m,t],i)=>{const x=220+(i%4)*490, y=330+Math.floor(i/4)*420;
  s+=head(x,y,{s:1.55,mood:m,hair:HAIR.swoop('#3a2418','#7a4a30'),rim:'#ffb27a'});
  s+=`<text x="${x}" y="${y+170}" text-anchor="middle" font-family="Arial" font-size="34" fill="#5a4a5a">${t}</text>`;});
 return s+'</svg>';
}
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:W,height:H}});
 await p.setContent(`<body style="margin:0">${scene()}</body>`);await p.screenshot({path:'out/bean_scene.png'});
 await p.setContent(`<body style="margin:0">${sheet()}</body>`);await p.screenshot({path:'out/bean_emotions.png'});
 await b.close();console.log('ok');})();
