const {neckOf,head,HAIR,INK,rnd}=require('./portrait.js');const {chromium}=require('playwright');
const W=1600,H=900;

// ---------- clothing (3/4 torso, shoulders wider on near side) ----------
const TORSO=`M-40,236 C-110,244 -200,262 -236,320 C-262,362 -276,470 -282,640 L330,640 C326,470 312,360 284,316 C250,262 180,236 120,226Z`;
function torso(id,c,o){
 let s=`<defs><clipPath id="tc${id}"><path d="${TORSO}"/></clipPath>
  <linearGradient id="cl${id}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${c.clothL}"/><stop offset=".55" stop-color="${c.cloth}"/><stop offset="1" stop-color="${c.clothS}"/></linearGradient></defs>
  <g clip-path="url(#tc${id})"><path d="${TORSO}" fill="url(#cl${id})"/>
   <path d="M150,230 C220,300 240,420 250,640 L360,640 L360,220Z" fill="${c.clothS}" opacity=".8"/>
   ${o.outfit(c,id)}
  </g>
  <path d="${TORSO}" fill="none" stroke="${INK}" stroke-width="3.2"/>
  <path d="M120,228 C180,236 250,262 284,316 C312,360 326,470 330,640" stroke="${o.rim}" stroke-width="5" fill="none" opacity=".95"/>
  <path d="M-40,238 C-110,246 -198,264 -234,322" stroke="${o.rim2??o.rim}" stroke-width="3" fill="none" opacity=".5"/>`;
 return s;
}
const fold=(d,c,a=.55)=>`<path d="${d}" stroke="${c.clothD}" stroke-width="2.4" fill="none" opacity="${a}" stroke-linecap="round"/>`;
const OUT={
 // hero: weathered field jacket with high collar & rope sling
 field:(c,id)=>`
  <path d="M-48,232 C-30,200 20,186 80,190 C120,192 140,204 150,226 C120,214 80,212 40,216 C0,220 -26,228 -48,232Z" fill="${c.collar}" stroke="${INK}" stroke-width="2.6"/>
  <path d="M-48,232 C-40,280 -10,320 30,340 L40,640" stroke="${INK}" stroke-width="3" fill="none"/>
  <path d="M30,340 C70,318 110,290 150,226" stroke="${INK}" stroke-width="2.6" fill="none"/>
  <path d="M-46,236 C-38,280 -8,318 30,338 C14,300 6,270 0,236Z" fill="${c.clothD}" opacity=".5"/>
  ${fold('M-200,340 C-170,380 -160,430 -170,480',c)}${fold('M-120,300 C-100,340 -96,380 -104,420',c,.4)}${fold('M200,330 C214,380 216,430 206,470',c)}
  <rect x="-210" y="440" width="120" height="96" rx="10" fill="${c.clothS}" stroke="${INK}" stroke-width="2.4"/>
  <path d="M-210,462 L-90,462" stroke="${INK}" stroke-width="2"/><path d="M-204,470 L-96,470" stroke="${c.clothL}" stroke-width="1.6" stroke-dasharray="5 4"/>
  <path d="M-150,462 L-150,480" stroke="${INK}" stroke-width="2.4"/><circle cx="-150" cy="484" r="5" fill="#b9935a" stroke="${INK}" stroke-width="1.6"/>
  <path d="M-250,350 C-120,300 60,420 190,640" stroke="${c.strap}" stroke-width="30" fill="none"/>
  <path d="M-250,350 C-120,300 60,420 190,640" stroke="${INK}" stroke-width="34" fill="none" opacity=".0"/>
  <path d="M-250,336 C-120,286 66,406 204,640 M-250,364 C-120,314 50,434 176,640" stroke="${INK}" stroke-width="2.4" fill="none"/>
  <path d="M-240,350 C-120,302 56,420 186,632" stroke="${c.strapL}" stroke-width="3" fill="none" stroke-dasharray="10 8" opacity=".8"/>
  <g transform="translate(-40,392) rotate(28)"><rect x="-26" y="-18" width="52" height="36" rx="6" fill="#8a8f96" stroke="${INK}" stroke-width="2.4"/><rect x="-14" y="-8" width="28" height="16" rx="3" fill="#5d6268"/></g>
  <g transform="translate(130,300)"><path d="M-22,-16 L22,-16 L18,18 L0,26 L-18,18Z" fill="${c.patch}" stroke="${INK}" stroke-width="2.2"/><path d="M-10,8 L0,-8 L10,8" stroke="#f4ecd8" stroke-width="3" fill="none"/></g>`,
 // female: knit turtleneck + leather jacket
 leather:(c,id)=>`
  <path d="M-30,236 C-20,200 20,184 70,184 C110,184 136,196 146,226 L140,280 C100,290 40,292 -20,280Z" fill="${c.knit}" stroke="${INK}" stroke-width="2.6"/>
  ${[0,1,2,3,4].map(i=>`<path d="M${-24+i*2},${246+i*8} C20,${236+i*8} 90,${236+i*8} 140,${246+i*8}" stroke="${c.knitD}" stroke-width="2" fill="none"/>`).join('')}
  <path d="M-20,280 C40,292 100,290 140,280 L150,640 L-30,640Z" fill="${c.knit}"/>
  ${[...Array(9)].map((_,i)=>`<path d="M${-10+i*18},290 L${-14+i*18},640" stroke="${c.knitD}" stroke-width="2" opacity=".6"/>`).join('')}
  <path d="M-40,240 L-140,280 L-70,420 L-40,640 L-20,640 L-30,320Z" fill="${c.cloth}" stroke="${INK}" stroke-width="2.6"/>
  <path d="M150,226 L250,270 L180,410 L170,640 L150,640 L156,300Z" fill="${c.clothS}" stroke="${INK}" stroke-width="2.6"/>
  <path d="M-140,280 L-100,262 L-90,300Z M250,270 L210,256 L204,294Z" fill="${c.clothD}" stroke="${INK}" stroke-width="2"/>
  <path d="M-40,240 L-70,420 M150,226 L180,410" stroke="#fff" stroke-width="2" opacity=".15"/>
  ${fold('M-200,360 C-180,400 -176,450 -186,500',c)}${fold('M240,340 C256,390 256,450 244,500',c)}
  <path d="M-230,330 C-210,320 -190,330 -180,350" stroke="#fff" stroke-width="5" opacity=".18" fill="none"/>
  <circle cx="-110" cy="470" r="7" fill="#c9b27a" stroke="${INK}" stroke-width="2"/><circle cx="-104" cy="540" r="7" fill="#c9b27a" stroke="${INK}" stroke-width="2"/>`,
 // villain: high-collar coat, silver chain
 coat:(c,id)=>`
  <path d="M-30,226 C-20,190 20,176 70,176 C120,176 146,190 156,220 L150,640 L-30,640Z" fill="${c.under}" stroke="${INK}" stroke-width="2.6"/>
  <path d="M-60,236 L-170,250 L-110,420 L-60,640 L-30,640 L-40,300Z" fill="${c.cloth}" stroke="${INK}" stroke-width="2.6"/>
  <path d="M170,220 L280,262 L210,420 L170,640 L150,640 L160,300Z" fill="${c.clothS}" stroke="${INK}" stroke-width="2.6"/>
  <path d="M-170,250 L-150,200 L-60,236Z M280,262 L270,206 L170,220Z" fill="${c.cloth}" stroke="${INK}" stroke-width="2.4"/>
  <path d="M-110,420 C-60,380 60,380 210,420" stroke="#c9ccd4" stroke-width="3" fill="none" stroke-dasharray="6 3"/>
  <circle cx="50" cy="398" r="12" fill="#d8dbe2" stroke="${INK}" stroke-width="2"/>
  ${fold('M-220,360 C-200,410 -196,470 -206,520',c)}${fold('M250,360 C262,410 262,470 252,520',c)}`,
};

// ---------- backgrounds: painted scenes with depth ----------
const bg={
 ridge:`<defs><linearGradient id="sk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1e2a4a"/><stop offset=".55" stop-color="#6a4a6a"/><stop offset="1" stop-color="#f09a5a"/></linearGradient></defs>
  <rect width="1600" height="900" fill="url(#sk)"/>
  <circle cx="1180" cy="520" r="90" fill="#ffd08a"/><circle cx="1180" cy="520" r="200" fill="#ffb060" opacity=".25"/>
  <path d="M0,560 L160,420 L300,500 L470,360 L640,520 L820,400 L1000,520 L1180,430 L1380,540 L1600,450 L1600,900 L0,900Z" fill="#3a3352"/>
  <path d="M470,360 L520,420 L490,430 L540,480 L430,420Z M820,400 L860,450 L830,452 L880,500 L780,440Z" fill="#c9b8d8" opacity=".6"/>
  <path d="M0,660 L240,560 L520,640 L760,580 L1060,660 L1320,600 L1600,680 L1600,900 L0,900Z" fill="#241f38"/>
  <path d="M0,760 L1600,720 L1600,900 L0,900Z" fill="#171427"/>
  ${[...Array(40)].map(()=>`<circle cx="${rnd()*1600}" cy="${rnd()*300}" r="${rnd()*1.6+.4}" fill="#fff" opacity="${rnd()*.6}"/>`).join('')}`,
 bar:`<rect width="1600" height="900" fill="#1c1418"/>
  ${[...Array(6)].map((_,i)=>`<rect x="${i*280+20}" y="120" width="220" height="12" fill="#5a3a2a"/>${[...Array(9)].map((_,j)=>`<rect x="${i*280+30+j*23}" y="${70-((i+j)%3)*10}" width="14" height="${50+((i+j)%3)*10}" rx="4" fill="${['#2f8f6a','#c9862f','#8a2f3a','#e0c070','#3a6a9a'][(i*3+j)%5]}" opacity=".85"/>`).join('')}`).join('')}
  ${[...Array(6)].map((_,i)=>`<rect x="${i*280+20}" y="300" width="220" height="12" fill="#5a3a2a"/>${[...Array(9)].map((_,j)=>`<rect x="${i*280+30+j*23}" y="${250-((i+j)%3)*10}" width="14" height="${50+((i+j)%3)*10}" rx="4" fill="${['#c9862f','#3a6a9a','#2f8f6a','#8a2f3a','#e0c070'][(i*2+j)%5]}" opacity=".85"/>`).join('')}`).join('')}
  <rect y="560" width="1600" height="340" fill="#3a2418"/><rect y="560" width="1600" height="24" fill="#6a4228"/>
  ${[...Array(12)].map((_,i)=>`<circle cx="${80+i*130}" cy="${30}" r="10" fill="#ffcf7a"/><circle cx="${80+i*130}" cy="30" r="40" fill="#ffb060" opacity=".2"/>`).join('')}
  <circle cx="300" cy="480" r="160" fill="#ff4fa0" opacity=".12"/>`,
 office:`<rect width="1600" height="900" fill="#14121a"/>
  ${[...Array(10)].map((_,i)=>`<rect x="${100+i*150}" y="60" width="110" height="560" fill="#1f2438"/><rect x="${100+i*150}" y="60" width="110" height="560" fill="#7ea0ff" opacity="${.05+((i*7)%5)*.03}"/>`).join('')}
  ${[...Array(60)].map(()=>`<rect x="${100+Math.floor(rnd()*10)*150+10+rnd()*80}" y="${80+rnd()*520}" width="8" height="5" fill="#ffd890" opacity="${rnd()*.9}"/>`).join('')}
  <rect y="600" width="1600" height="300" fill="#0f0d14"/><rect x="900" y="600" width="600" height="40" fill="#3a2a22"/>
  <circle cx="1350" cy="560" r="50" fill="#ffb760" opacity=".9"/><circle cx="1350" cy="560" r="160" fill="#ffb760" opacity=".15"/>`,
};

function frame(f){const id='p'+Math.floor(rnd()*1e9);
 return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
 <defs><filter id="bb${id}"><feGaussianBlur stdDeviation="${f.blur??8}"/></filter>
  <filter id="gr${id}"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="7"/><feColorMatrix values="0 0 0 0 .5 0 0 0 0 .5 0 0 0 0 .5 0 0 0 .1 0"/></filter>
  <radialGradient id="vg${id}" cx=".5" cy=".5" r=".75"><stop offset=".5" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#07050a" stop-opacity=".75"/></radialGradient>
  <radialGradient id="kl${id}" cx="${f.kx??.3}" cy="${f.ky??.3}" r=".6"><stop offset="0" stop-color="${f.key}" stop-opacity=".22"/><stop offset="1" stop-color="${f.key}" stop-opacity="0"/></radialGradient>
 </defs>
 <g filter="url(#bb${id})">${f.bg}</g>
 <g transform="translate(${f.x??780},${f.y??360}) scale(${f.s??1.35})">
   ${neckOf(f.c)}<g transform="translate(0,-58)">${torso(id,f.c,f)}</g>
   ${head(id,f.c,f)}
   ${f.acc?f.acc(f.c):''}
 </g>
 <rect width="${W}" height="${H}" fill="url(#kl${id})" style="mix-blend-mode:screen"/>
 ${f.particles??''}
 <rect width="${W}" height="${H}" fill="url(#vg${id})"/>
 <rect width="${W}" height="${H}" filter="url(#gr${id})" opacity=".9"/>
</svg>`;}

const HERO={skin:'#e0a983',skinL:'#f0c3a0',skinS:'#b8785a',skinD:'#7e4a38',blush:'#e8806a',lip:'#b86a5e',iris:'#4f8a7a',irisL:'#9fd8c0',brow:'#3b2a22',hair:'#3b2a22',hairL:'#7a563e',hairD:'#1e140f',stub:'#3b2a22',scar:'#f0c0aa',
 cloth:'#6a6f4a',clothL:'#8a8f62',clothS:'#4a4e34',clothD:'#33361f',collar:'#4a4e34',strap:'#7a4a2a',strapL:'#c99a6a',patch:'#d0683a'};
const NIKA={skin:'#c9865e',skinL:'#e0a47c',skinS:'#9c6040',skinD:'#6a3c2a',blush:'#e86a6a',lip:'#a8424a',iris:'#5a3a22',irisL:'#c9903a',brow:'#1e1414',hair:'#1e1418',hairL:'#5a3a4a',hairD:'#0a0608',stub:'#000',
 cloth:'#2a2226',clothL:'#4a3a40',clothS:'#18121a',clothD:'#000',knit:'#c9a882',knitD:'#a8865e'};
const GRAF={skin:'#ead0bc',skinL:'#f8e4d4',skinS:'#c9a28a',skinD:'#8f6a5a',blush:'#d89080',lip:'#a8706a',iris:'#7ab8e0',irisL:'#d0f0ff',brow:'#9a9aa2',hair:'#c2c4cc',hairL:'#f0f2f6',hairD:'#8a8c94',stub:'#999',
 cloth:'#26242e',clothL:'#3a3846',clothS:'#16141c',clothD:'#000',under:'#111014'};

const sparks=[...Array(70)].map(()=>`<circle cx="${rnd()*1600}" cy="${rnd()*900}" r="${rnd()*2.4+.6}" fill="#ffd8b0" opacity="${rnd()*.6}"/>`).join('');
const frames=[
 {name:'yar',bg:bg.ridge,c:HERO,outfit:OUT.field,rim:'#ffb070',key:'#9ab0ff',kx:.2,hair:HAIR.tousle,stubble:true,mouth:'neutral',browTilt:3,look:-3,scar:'M-12,-46 L4,-16',particles:sparks},
 {name:'nika',bg:bg.bar,c:NIKA,outfit:OUT.leather,rim:'#ff5fb0',key:'#ffcf8a',kx:.25,hair:HAIR.wavy,hairBack:HAIR.wavyBack,freckles:true,female:true,lashes:true,mouth:'smirk',browTilt:-2,look:-4},
 {name:'graf',bg:bg.office,c:GRAF,outfit:OUT.coat,rim:'#ffb760',key:'#7ea0ff',kx:.2,hair:HAIR.slick,mouth:'neutral',browTilt:5,open:.72,bags:true,look:-5},
];
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:W,height:H}});
 for(const f of frames){await p.setContent(`<body style="margin:0;background:#000">${frame(f)}</body>`);await p.screenshot({path:`out/pt_${f.name}.png`});console.log('ok',f.name);}
 await b.close();})();
