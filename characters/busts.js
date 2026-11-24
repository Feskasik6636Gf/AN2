const {head,bust,HAIR,OUT,INK}=require('./bust.js');const {chromium}=require('playwright');
const W=1600,H=900;
function frame(o){
 const bid='b'+Math.random().toString(36).slice(2);
 return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
 <defs>
  <filter id="blur${bid}"><feGaussianBlur stdDeviation="9"/></filter>
  <filter id="grain${bid}"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="3"/><feColorMatrix values="0 0 0 0 .5  0 0 0 0 .5  0 0 0 0 .5  0 0 0 .09 0"/></filter>
  <radialGradient id="vig${bid}" cx=".5" cy=".5" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#0b0710" stop-opacity=".7"/></radialGradient>
  <radialGradient id="glow${bid}" cx="${o.glowX??.5}" cy="${o.glowY??.45}" r=".5"><stop offset="0" stop-color="${o.rim}" stop-opacity=".55"/><stop offset="1" stop-color="${o.rim}" stop-opacity="0"/></radialGradient>
 </defs>
 <g filter="url(#blur${bid})">${o.bg}</g>
 <rect width="${W}" height="${H}" fill="url(#glow${bid})"/>
 <g transform="translate(${o.x??800},${o.y??400}) scale(${o.s??1.25})">
   ${bust({c:o.c,outfit:OUT[o.outfit],rim:o.rim,lightR:o.lightR})}
   ${head({...o.h,c:o.c,rim:o.rim,lightR:o.lightR})}
   ${HAIR[o.hair](o.c)}
   ${o.extra?o.extra(o.c):''}
 </g>
 ${o.tag?`<g transform="translate(${o.tagX??1080},${o.tagY??200}) rotate(-6)"><text font-family="Arial Black,Arial" font-weight="900" font-size="50" fill="#fff" stroke="${INK}" stroke-width="2">${o.tag}</text><text y="34" font-family="Georgia" font-style="italic" font-size="26" fill="#fff">${o.sub}</text></g>`:''}
 <rect width="${W}" height="${H}" fill="url(#vig${bid})"/>
 <rect width="${W}" height="${H}" filter="url(#grain${bid})"/>
</svg>`;}

// ---------- backgrounds (painted, then blurred) ----------
const bgStorm=`<rect width="1600" height="900" fill="#2b3550"/><rect y="0" width="1600" height="500" fill="#3c4a6e"/>
 <path d="M0,520 L220,300 L380,420 L560,240 L760,440 L980,260 L1180,420 L1380,280 L1600,400 L1600,900 L0,900Z" fill="#1f2840"/>
 <path d="M0,620 L300,500 L620,600 L900,520 L1300,620 L1600,540 L1600,900 L0,900Z" fill="#e9eef7"/>
 <path d="M0,700 L1600,660 L1600,900 L0,900Z" fill="#cdd6e6"/>
 <circle cx="1240" cy="360" r="70" fill="#ff8a3a"/><rect x="1180" y="420" width="120" height="200" fill="#ff7a2a" opacity=".6"/>`;
const bgLab=`<rect width="1600" height="900" fill="#0f2a2c"/>${[...Array(9)].map((_,i)=>`<rect x="${i*190-40}" y="120" width="150" height="100" rx="8" fill="#1d5a55"/><rect x="${i*190-30}" y="130" width="130" height="80" fill="#3fd0b0" opacity=".35"/>`).join('')}
 <rect y="560" width="1600" height="340" fill="#0a1c1e"/><rect x="200" y="300" width="1200" height="40" fill="#35c9a7" opacity=".5"/>
 <circle cx="300" cy="460" r="40" fill="#ff4f7a" opacity=".7"/><circle cx="1350" cy="430" r="30" fill="#ffd24a" opacity=".7"/>`;
const bgOffice=`<rect width="1600" height="900" fill="#1a1620"/>${[...Array(12)].map((_,i)=>`<rect x="${i*140}" y="0" width="60" height="900" fill="#241d2c"/>`).join('')}
 <rect x="0" y="0" width="1600" height="900" fill="#9a1f2a" opacity=".22"/>
 <rect x="1000" y="140" width="500" height="380" fill="#2c3048"/><circle cx="1250" cy="330" r="120" fill="none" stroke="#c9a24a" stroke-width="14"/><path d="M1250,230 L1250,430 M1150,330 L1350,330" stroke="#c9a24a" stroke-width="10"/>
 <path d="M200,640 L700,640 L740,900 L160,900Z" fill="#3a2418"/><circle cx="320" cy="560" r="44" fill="#ffcf73"/><rect x="300" y="600" width="40" height="40" fill="#5a4a2a"/>`;

const HERO={skin:'#d9a07a',skinS:'#b9785a',skinD:'#8c5340',iris:'#5a8f6a',brow:'#3a2a20',hair:'#3a2a20',hairS:'#2a1d16',hairL:'#6b4a36',stub:'#3a2a20',scar:'#e8b8a0',
 cloth:'#e8632b',clothS:'#b8461b',collar:'#2a2e3a',band:'#d8dde6',patch:'#c62f2f'};
const MED={skin:'#8a5a3e',skinS:'#6c432d',skinD:'#4c2c1e',iris:'#3a2618',brow:'#1a1210',hair:'#1a1416',hairS:'#3a3036',hairL:'#5a4a52',stub:'#000',
 cloth:'#4e5b3a',clothS:'#3a442a',rib:'#c9752f',under:'#e8e2d4',patch:'#f2c94c'};
const VIL={skin:'#e6c1a6',skinS:'#c79a80',skinD:'#93685a',iris:'#5ab0d8',brow:'#8a8a90',hair:'#b9bcc4',hairS:'#8a8d96',hairL:'#e6e8ee',stub:'#888',
 cloth:'#2a2832',clothS:'#1a1820',under:'#141218',underS:'#2a2830',lapel:'#34313e',lapelS:'#24222c'};

const goggles=c=>`<g transform="translate(0,-150)"><path d="M-80,10 C-60,-4 60,-4 80,10" stroke="#2a2a2a" stroke-width="14" fill="none"/>
 ${[-1,1].map(sx=>`<ellipse cx="${sx*34}" cy="0" rx="34" ry="22" fill="#ffb347" stroke="${INK}" stroke-width="5"/><ellipse cx="${sx*34-8}" cy="-6" rx="12" ry="6" fill="#fff" opacity=".6"/>`).join('')}</g>`;
const headset=c=>`<path d="M-84,-40 C-90,-150 90,-150 84,-40" stroke="#2c2c30" stroke-width="10" fill="none"/>
 <rect x="-102" y="-46" width="30" height="60" rx="12" fill="#3a3a40" stroke="${INK}" stroke-width="3"/><rect x="72" y="-46" width="30" height="60" rx="12" fill="#3a3a40" stroke="${INK}" stroke-width="3"/>
 <path d="M-90,14 C-80,60 -50,80 -20,80" stroke="#2c2c30" stroke-width="5" fill="none"/><circle cx="-18" cy="80" r="6" fill="#2c2c30"/>
 <g transform="translate(0,-4)">${[-1,1].map(sx=>`<circle cx="${sx*34}" cy="-8" r="26" fill="none" stroke="#c9a24a" stroke-width="4"/>`).join('')}<path d="M-8,-10 L8,-10" stroke="#c9a24a" stroke-width="4"/></g>`;
const pin=c=>``;

const frames=[
 {name:'hero',bg:bgStorm,rim:'#ff9a4a',c:HERO,outfit:'shell',hair:'crop',h:{stubble:true,mouth:'grim',browTilt:4,scar:'M42,-60 L28,-20 M30,-46 L40,-42',bags:false},extra:goggles,tag:'ЯР',sub:'горный спасатель',glowX:.75},
 {name:'medic',bg:bgLab,rim:'#3fe0c0',c:MED,outfit:'bomber',hair:'undercut',h:{mouth:'smirk',browTilt:-2,look:3},extra:headset,tag:'ВЕСТА',sub:'медик и связист',lightR:true,glowX:.3,tagX:240},
 {name:'villain',bg:bgOffice,rim:'#ff4a4a',c:VIL,outfit:'coat',hair:'slick',h:{mouth:'neutral',browTilt:6,eyeOpen:.7,bags:true,lines:true,look:-2},tag:'ГРАФ',sub:'тот, кто платит',glowX:.62},
];
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:W,height:H}});
 for(const f of frames){await p.setContent(`<body style="margin:0;background:#000">${frame(f)}</body>`);await p.screenshot({path:`out/bust_${f.name}.png`});console.log('ok',f.name);}
 await b.close();})();
