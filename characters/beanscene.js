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
  <rect x="1790" y="250" width="130" height="380" fill="#8fb8d8" stroke="${L}" stroke-width="2"/><path d="M1855,250 L1855,630" stroke="${L}" stroke-width="2"/>${[0,1].map(i=>`<rect x="${1806+i*65}" y="270" width="34" height="6" fill="${L}" opacity=".5"/><rect x="${1806+i*65}" y="286" width="34" height="6" fill="${L}" opacity=".5"/>`).join('')}
  <path d="M400,470 C380,420 420,380 440,420 C450,370 500,380 480,430 C520,410 530,460 490,470Z" fill="#5aa86a" stroke="${L}" stroke-width="2"/><path d="M420,470 L500,470 L490,540 L430,540Z" fill="#d07a4a" stroke="${L}" stroke-width="2"/>
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
 for(let i=0;i<90;i++){const tt=rnd(),x=150+tt*900+rnd()*260,y=180+tt*860;s+=`<circle cx="${x}" cy="${y}" r="${rnd()*2.6+.8}" fill="#fff8e0" opacity="${rnd()*.7+.2}"/>`;}
 // back desks (mid ground, slight blur)
 let desks='';for(const [x,y,sc,bg] of [[700,690,.7,'#e05a6a'],[1000,690,.7,''],[1300,690,.7,'#5a8ae0'],[1600,690,.7,'#f0b040']]){desks+=desk(x,y,sc,bg);}
 s+=`<g filter="url(#b1)" opacity=".95">${desks}</g>`;
 return s;
}
function desk(x,y,s,bag){return `<g transform="translate(${x},${y}) scale(${s})">${bag?`<path d="M-60,-70 C-60,-100 10,-100 10,-70 L14,0 L-64,0Z" fill="${bag}" stroke="${L}" stroke-width="2.5"/><rect x="-50" y="-50" width="50" height="30" rx="6" fill="#000" opacity=".15"/>`:''}<rect x="40" y="-14" width="50" height="14" fill="#f4ead8" stroke="${L}" stroke-width="2"/>
 <path d="M-110,0 L110,0 L130,30 L-130,30Z" fill="#d9a46a" stroke="${L}" stroke-width="2.5"/><rect x="-130" y="30" width="260" height="14" fill="#b9844e" stroke="${L}" stroke-width="2"/>
 <path d="M-120,44 L-120,170 M120,44 L120,170" stroke="#7a8a9a" stroke-width="8"/><path d="M-120,44 L-120,170 M120,44 L120,170" stroke="${L}" stroke-width="1" opacity=".0"/></g>`;}
function fgDesk(){return `<g filter="url(#b3)"><path d="M-40,940 L520,960 L560,1080 L-40,1080Z" fill="#c8915a"/><path d="M-40,955 L520,975" stroke="#8a5434" stroke-width="10"/></g>
 `;}

// ---------- characters ----------
const MIR={top:'#ff9a3c',topL:'#ffc070',topS:'#d8702a',acc:'#2f7ae0',pants:'#2c3a66',pantsL:'#5a6aa0',shoe:'#f6f2ec',sole:'#e0485a'};
const KIRA={top:'#2fb59a',topL:'#6ad8bf',topS:'#1f8a74',acc:'#ffe2a8',trim:'#f6efe0',pants:'#f0e2c8',pantsL:'#fff',shoe:'#ff6f91',sole:'#fff'};
const BRUNO={top:'#4a6fd0',topL:'#7a98ff',topS:'#3452a0',shirt:'#f2e8d8',shirtS:'#e04a5a',pants:'#2a2a3a',pantsL:'#55556a',shoe:'#3a2a20',sole:'#c99a5a'};

function scene(){
 let s=`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">`;
 s+=classroom();
 // mid-ground pair (smaller = farther), whispering, looking at hero
 s+=body({x:540,y:860,s:.95,c:BRUNO,outfit:OUT.overall,cast:[1.8,.3],h:{mood:'smug',look:8,hair:HAIR.beanie('#e0485a','#ff8a8a')},arms:[[10,0,24,-20,-20],[10,0,24,-20,20]],legs:[-4,4],lean:6});
 s+=body({x:700,y:870,s:.97,c:KIRA,outfit:OUT.varsity,cast:[1.8,.3],h:{mood:'smug',look:8,hair:HAIR.buns('#6a3a2a','#a8684a')},arms:[[-30,-50,-58,-128,-40],[6,0,22,-10,10]],legs:[-4,6],lean:-14});
 // whisper bubble
 s+=`<g transform="translate(560,470)"><path d="M0,0 C0,-40 200,-40 200,0 C200,34 120,40 70,36 L40,62 L44,34 C10,30 0,20 0,0Z" fill="#fff" stroke="${OL}" stroke-width="3"/><text x="100" y="12" text-anchor="middle" font-family="DejaVu Sans" font-style="italic" font-size="30" fill="${OL}">пс-с-с…</text></g>`;
 // hero foreground, phone glow
 s+=body({x:1240,y:1060,s:1.5,c:MIR,outfit:OUT.hoodie,cast:[1.4,.26],h:{mood:'joy',look:-4,hair:HAIR.swoop('#3a2418','#7a4a30')},arms:[[10,0,20,0,0],[24,-20,14,-62,-10]],legs:[-6,8]});
 s+=`<g transform="translate(1352,742) rotate(-14)"><rect x="-34" y="-58" width="68" height="116" rx="12" fill="#1a1a24" stroke="${OL}" stroke-width="3"/><rect x="-28" y="-50" width="56" height="98" rx="7" fill="#bff0d0"/><text x="0" y="6" text-anchor="middle" font-family="DejaVu Sans" font-weight="bold" font-size="17" fill="#1f8a4a">+$1,000</text></g>
  <circle cx="1352" cy="742" r="120" fill="#9fffc0" opacity=".12"/>`;
 // floating counter
 s+=`<g transform="translate(1330,360) rotate(-6)"><text font-family="DejaVu Sans" font-weight="bold" font-size="84" fill="#4ad07a" stroke="${OL}" stroke-width="3.5">+$1,000</text>
  ${[[-20,-60],[340,-40],[300,40],[-40,30]].map(([x,y])=>`<path d="M${x},${y-14} L${x+4},${y-4} L${x+14},${y} L${x+4},${y+4} L${x},${y+14} L${x-4},${y+4} L${x-14},${y} L${x-4},${y-4}Z" fill="#fff6a8"/>`).join('')}</g>`;
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
