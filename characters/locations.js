// Location library — illustrated sets for the Beans style (1920x1080)
const {body,HAIR,OUT,ACC,AGE,OL,rnd}=require('./bean.js');
const W=1920,H=1080,L='#4a3a48';
let n=0;const id=p=>p+'_'+(n++);
const blur=(d,inner)=>{const f=id('bf');return `<defs><filter id="${f}" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="${d}"/></filter></defs><g filter="url(#${f})">${inner}</g>`;};
const lg=(c1,c2,vert=true)=>{const g=id('lg');return [g,`<defs><linearGradient id="${g}" x1="0" y1="0" x2="${vert?0:1}" y2="${vert?1:0}"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs>`];};
const glow=(x,y,r,c,a=.35)=>{const g=id('gl');return `<defs><radialGradient id="${g}"><stop offset="0" stop-color="${c}" stop-opacity="${a}"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient></defs><circle cx="${x}" cy="${y}" r="${r}" fill="url(#${g})"/>`;};
const beam=(pts,c='#fff4d6',a=.5)=>{const [g,d]=lg(c,c+'00');return d+blur(14,`<path d="${pts}" fill="${c}" opacity="${a}"/>`);};
const dust=(x0,y0,x1,y1,nn=60,c='#fff8e0')=>{let s='';for(let i=0;i<nn;i++){const t=rnd();s+=`<circle cx="${x0+(x1-x0)*t+rnd()*200-100}" cy="${y0+(y1-y0)*t}" r="${rnd()*2.4+.7}" fill="${c}" opacity="${rnd()*.6+.2}"/>`;}return s;};
const floorBoards=(y0,c1,c2,line)=>{const [g,d]=lg(c1,c2);let s=d+`<rect y="${y0}" width="${W}" height="${H-y0}" fill="url(#${g})"/>`;
 for(let i=0;i<12;i++){const y=y0+i*i*3.4+i*6;s+=`<path d="M0,${y} L${W},${y}" stroke="${line}" stroke-width="1.3" opacity=".4"/>`;}
 for(let i=-6;i<30;i++){const x=i*90;s+=`<path d="M${x},${y0} L${W/2+(x-W/2)*3},${H}" stroke="${line}" stroke-width="1.1" opacity=".25"/>`;}return s;};
const tiles=(y0,c1,c2,line)=>{const [g,d]=lg(c1,c2);let s=d+`<rect y="${y0}" width="${W}" height="${H-y0}" fill="url(#${g})"/>`;
 for(let i=0;i<9;i++){const y=y0+i*i*5+i*10;s+=`<path d="M0,${y} L${W},${y}" stroke="${line}" stroke-width="1.6" opacity=".5"/>`;}
 for(let i=-10;i<30;i++){const x=i*110;s+=`<path d="M${x},${y0} L${W/2+(x-W/2)*3.2},${H}" stroke="${line}" stroke-width="1.6" opacity=".5"/>`;}return s;};
const win=(x,y,w,h,sky,frame='#f4ece0')=>{const [g,d]=lg(sky[0],sky[1]);return d+`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#${g})" stroke="${L}" stroke-width="3"/><path d="M${x+w/2},${y} L${x+w/2},${y+h} M${x},${y+h/2} L${x+w},${y+h/2}" stroke="${frame}" stroke-width="8"/><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="${frame}" stroke-width="10"/><rect x="${x-14}" y="${y+h}" width="${w+28}" height="14" fill="${frame}" stroke="${L}" stroke-width="2"/>`;};
const plant=(x,y,s=1)=>`<g transform="translate(${x},${y}) scale(${s})"><path d="M0,0 C-30,-60 -60,-70 -70,-110 C-30,-100 -10,-60 0,-20 C4,-80 30,-120 50,-130 C46,-90 20,-50 6,-10 C30,-50 70,-60 90,-50 C60,-30 30,-10 8,4Z" fill="#5aa86a" stroke="${L}" stroke-width="2.5"/><path d="M-36,0 L36,0 L28,70 L-28,70Z" fill="#d07a4a" stroke="${L}" stroke-width="2.5"/></g>`;
function grade(warm='#fff1d8',vig=.5,tint=null){const v=id('vg'),h=id('hz'),gr=id('gr');
 return `<defs><radialGradient id="${v}" cx=".5" cy=".5" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#140a12" stop-opacity="${vig}"/></radialGradient>
 <linearGradient id="${h}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${warm}" stop-opacity=".22"/><stop offset=".6" stop-color="${warm}" stop-opacity="0"/></linearGradient>
 <filter id="${gr}"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="4"/><feColorMatrix values="0 0 0 0 .5 0 0 0 0 .5 0 0 0 0 .5 0 0 0 .07 0"/></filter></defs>
 ${tint?`<rect width="${W}" height="${H}" fill="${tint}" opacity=".18"/>`:''}<rect width="${W}" height="${H}" fill="url(#${h})"/><rect width="${W}" height="${H}" fill="url(#${v})"/><rect width="${W}" height="${H}" filter="url(#${gr})"/>`;}

// ---------------- LOCATIONS ----------------
const LOC={};
LOC.bedroomNight=()=>{let s=`<rect width="${W}" height="${H}" fill="#3a3a6a"/>`;const [g,d]=lg('#4a4a80','#2e2e58');s+=d+`<rect width="${W}" height="680" fill="url(#${g})"/>`;
 let bg=win(1180,170,420,330,['#1a1e48','#3a3a80'])+`<circle cx="1480" cy="250" r="34" fill="#fff6d8"/>${[...Array(18)].map(()=>`<circle cx="${1190+rnd()*400}" cy="${180+rnd()*300}" r="${rnd()*1.8+.5}" fill="#fff"/>`).join('')}`;
 bg+=`<rect x="220" y="160" width="230" height="300" fill="#e8434f" stroke="${L}" stroke-width="3"/><circle cx="335" cy="300" r="70" fill="#ffb020" stroke="${L}" stroke-width="3"/><path d="M265,300 L405,300 M335,230 L335,370" stroke="${L}" stroke-width="3"/>`;
 bg+=`<rect x="600" y="380" width="300" height="20" fill="#7a5a4a" stroke="${L}" stroke-width="2"/>${[0,1,2,3,4].map(i=>`<rect x="${612+i*30}" y="${330-(i%3)*10}" width="24" height="${50+(i%3)*10}" fill="${['#5aa86a','#e8434f','#ffd24a','#6a5af0','#3a6ab0'][i]}" stroke="${L}" stroke-width="1.5"/>`).join('')}`;
 s+=blur(2,bg);
 s+=floorBoards(680,'#5a4a6a','#3a2e4a','#2a2038');
 // bed
 s+=`<path d="M1380,640 L1900,640 L1940,900 L1320,900Z" fill="#6a7ad0" stroke="${L}" stroke-width="3"/><path d="M1320,900 L1940,900 L1940,960 L1320,960Z" fill="#4a5ab0" stroke="${L}" stroke-width="3"/><rect x="1420" y="560" width="200" height="90" rx="30" fill="#f2f0ea" stroke="${L}" stroke-width="3"/>
  <path d="M1380,560 L1380,960 M1400,500 L1400,640" stroke="#5a3a2a" stroke-width="22"/>`;
 // desk lamp + glow
 s+=`<rect x="200" y="620" width="380" height="24" fill="#8a6a4a" stroke="${L}" stroke-width="3"/><path d="M220,644 L220,900 M560,644 L560,900" stroke="#6a4a3a" stroke-width="14"/>
  <path d="M480,620 L500,540 L460,500" stroke="${L}" stroke-width="6" fill="none"/><path d="M430,470 L500,470 L480,510 L450,510Z" fill="#ffd24a" stroke="${L}" stroke-width="3"/><rect x="250" y="560" width="140" height="60" rx="6" fill="#2a2a3a" stroke="${L}" stroke-width="3"/><rect x="258" y="568" width="124" height="44" fill="#7ad0ff"/>`;
 s+=glow(470,560,360,'#ffb060',.45)+glow(320,590,200,'#7ad0ff',.25);
 s+=beam(`M1180,170 L1600,170 L1300,1080 L700,1080Z`,'#9aa8ff',.18);
 return s;};
LOC.kitchen=()=>{const [g,d]=lg('#f4e6d2','#ead6bc');let s=d+`<rect width="${W}" height="${H}" fill="url(#${g})"/>`;
 let bg=`${[...Array(7)].map((_,i)=>`<rect x="${80+i*180}" y="170" width="160" height="200" rx="6" fill="#3fa79a" stroke="${L}" stroke-width="2.5"/><circle cx="${210+i*180}" cy="270" r="5" fill="${L}"/>`).join('')}
  <rect x="60" y="470" width="1400" height="30" fill="#e8d8c0" stroke="${L}" stroke-width="2"/>${[...Array(7)].map((_,i)=>`<rect x="${80+i*180}" y="500" width="160" height="200" rx="6" fill="#3fa79a" stroke="${L}" stroke-width="2.5"/>`).join('')}
  <rect x="60" y="380" width="1400" height="90" fill="#f8f2e8"/>${[...Array(28)].map((_,i)=>`<path d="M${60+i*50},380 L${60+i*50},470" stroke="#d8ccb8" stroke-width="1.5"/>`).join('')}
  <path d="M700,470 L700,430 C700,410 740,410 740,430" stroke="#8a8a96" stroke-width="7" fill="none"/>
  <rect x="1500" y="140" width="260" height="560" rx="10" fill="#e8eef2" stroke="${L}" stroke-width="3"/><path d="M1500,360 L1760,360 M1740,200 L1740,320 M1740,400 L1740,520" stroke="${L}" stroke-width="4"/>
  <circle cx="1300" cy="110" r="36" fill="#fff" stroke="${L}" stroke-width="3"/><path d="M1300,110 L1300,88 M1300,110 L1316,118" stroke="${L}" stroke-width="3"/>
  ${[0,1,2].map(i=>`<circle cx="${300+i*40}" cy="455" r="14" fill="${['#e8434f','#ffb020','#5aa86a'][i]}" stroke="${L}" stroke-width="2"/>`).join('')}`;
 s+=blur(2.5,bg)+tiles(700,'#e8dcc8','#d4c2a6','#b8a48a');
 s+=glow(1100,250,600,'#fff2c8',.35)+beam(`M0,0 L500,0 L1200,1080 L300,1080Z`,'#fff4d6',.28)+dust(200,100,900,1000,70);
 // table foreground
 s+=`<path d="M300,800 L1400,800 L1460,880 L240,880Z" fill="#c8915a" stroke="${L}" stroke-width="3"/><rect x="240" y="880" width="1220" height="26" fill="#a8723e" stroke="${L}" stroke-width="2.5"/>
  ${[400,700,1000,1250].map(x=>`<ellipse cx="${x}" cy="825" rx="66" ry="18" fill="#fff" stroke="${L}" stroke-width="2.5"/><ellipse cx="${x}" cy="820" rx="34" ry="9" fill="#c8703a"/>`).join('')}`;
 return s;};
LOC.hallway=()=>{const [g,d]=lg('#e6eef6','#d6e0ea');let s=d+`<rect width="${W}" height="${H}" fill="url(#${g})"/>`;
 let bg=`<path d="M0,0 L1920,0 L1200,300 L720,300Z" fill="#f4f6f8" stroke="${L}" stroke-width="2"/>${[0,1,2,3].map(i=>`<rect x="${760+i*110}" y="${40+i*70}" width="${400-i*90}" height="16" fill="#fffbe8" opacity=".9"/>`).join('')}
  <rect x="720" y="300" width="480" height="340" fill="#cfe0ee" stroke="${L}" stroke-width="2"/><rect x="900" y="380" width="120" height="260" fill="#8ab0d0" stroke="${L}" stroke-width="2"/>`;
 // lockers left/right in perspective
 for(let i=0;i<9;i++){const t=i/9,x0=0+t*720,x1=(i+1)/9*720,y0=0+t*300*.8+120*(1-t)*0,yb=1080-t*440;
  bg+=`<path d="M${x0},${120+t*200} L${x1},${120+(i+1)/9*200} L${x1},${1080-(i+1)/9*440} L${x0},${yb}Z" fill="${i%2?'#3a6ab0':'#4a7ac0'}" stroke="${L}" stroke-width="2.5"/>`;
  const X0=W-x0,X1=W-x1;bg+=`<path d="M${X0},${120+t*200} L${X1},${120+(i+1)/9*200} L${X1},${1080-(i+1)/9*440} L${X0},${yb}Z" fill="${i%2?'#3a6ab0':'#4a7ac0'}" stroke="${L}" stroke-width="2.5"/>`;}
 s+=blur(1.6,bg);
 s+=`<path d="M0,1080 L720,640 L1200,640 L1920,1080Z" fill="#e8dcc8"/>`;for(let i=0;i<10;i++){const t=i/10;s+=`<path d="M${720-t*720*1.2},${640+t*500} L${1200+t*720*1.2},${640+t*500}" stroke="#c8b89a" stroke-width="1.5"/>`;}
 s+=`<path d="M860,640 L1060,640 L1260,1080 L660,1080Z" fill="#ffd24a" opacity=".22"/>`+glow(960,200,700,'#fffbe8',.4);
 return s;};
LOC.classroom=()=>{const [g,d]=lg('#e9d8c4','#f4e6d2');let s=d+`<rect width="${W}" height="${H}" fill="url(#${g})"/>`;
 let bw=`<rect x="0" y="560" width="1920" height="70" fill="#5fa8a0" stroke="${L}" stroke-width="1.5"/><rect x="560" y="210" width="820" height="300" rx="6" fill="#2f5a4a" stroke="${L}" stroke-width="3"/><rect x="560" y="500" width="820" height="16" fill="#b98a5a" stroke="${L}" stroke-width="1.5"/>
  <circle cx="1490" cy="190" r="40" fill="#fff" stroke="${L}" stroke-width="3"/><path d="M1490,190 L1490,166 M1490,190 L1506,198" stroke="${L}" stroke-width="3"/>
  ${[...Array(5)].map((_,i)=>`<rect x="${1450+i*70}" y="300" width="56" height="74" fill="${['#ffcf5a','#7ac8ff','#ff8aa0','#9ae0a0','#c8a0ff'][i]}" stroke="${L}" stroke-width="1.5"/>`).join('')}`;
 s+=blur(2,bw)+`<path d="M0,110 L330,70 L330,640 L0,720Z" fill="#e2cdb6" stroke="${L}" stroke-width="1.5"/>`+win(40,170,250,330,['#9fd4f0','#ffe2b8'],'#f4ece0');
 s+=floorBoards(630,'#c58a5a','#a86c44','#8a5434');
 s+=beam(`M140,160 L290,140 L1300,1080 L700,1080Z`)+dust(150,180,1050,1040,90);
 s+=blur(1.5,[700,1000,1300,1600].map(x=>`<g transform="translate(${x},700) scale(.7)"><path d="M-110,0 L110,0 L130,30 L-130,30Z" fill="#d9a46a" stroke="${L}" stroke-width="2.5"/><path d="M-120,30 L-120,170 M120,30 L120,170" stroke="#7a8a9a" stroke-width="8"/></g>`).join(''));
 return s;};
LOC.streetDay=()=>{const [g,d]=lg('#8fd0ff','#fff0d8');let s=d+`<rect width="${W}" height="${H}" fill="url(#${g})"/>`;
 s+=`<ellipse cx="300" cy="160" rx="160" ry="40" fill="#fff" opacity=".8"/><ellipse cx="1500" cy="120" rx="200" ry="44" fill="#fff" opacity=".7"/>`;
 let far=[[0,300,260,'#c8a0d8'],[250,240,220,'#ffd0a0'],[460,330,240,'#a0d0c8'],[700,260,200,'#ffb0b0'],[1180,280,250,'#b0c8ff'],[1430,220,230,'#ffe0a0'],[1660,300,260,'#c8e0a0']].map(([x,y,w,c])=>`<rect x="${x}" y="${y}" width="${w}" height="${640-y}" fill="${c}" stroke="${L}" stroke-width="2.5"/>${[...Array(12)].map((_,k)=>`<rect x="${x+20+(k%3)*(w-40)/3}" y="${y+30+Math.floor(k/3)*70}" width="${(w-80)/3}" height="40" fill="#e8f4ff" stroke="${L}" stroke-width="1.5" opacity=".9"/>`).join('')}`).join('');
 s+=blur(2.4,far);
 s+=`<rect x="0" y="640" width="${W}" height="80" fill="#d8c8b0" stroke="${L}" stroke-width="2"/>${[...Array(20)].map((_,i)=>`<path d="M${i*100},640 L${i*100-30},720" stroke="#b8a890" stroke-width="2"/>`).join('')}
  <rect x="0" y="720" width="${W}" height="360" fill="#5a5a66"/><rect x="0" y="720" width="${W}" height="14" fill="#8a8a96"/>${[...Array(8)].map((_,i)=>`<rect x="${i*260+40}" y="880" width="140" height="14" fill="#f2f0ea"/>`).join('')}`;
 s+=`<g><path d="M1650,640 L1650,330" stroke="#3a3a48" stroke-width="12"/><path d="M1650,330 C1650,300 1700,300 1720,310" stroke="#3a3a48" stroke-width="10" fill="none"/><ellipse cx="1724" cy="316" rx="22" ry="10" fill="#ffe8a0" stroke="${L}" stroke-width="2"/></g>`;
 s+=`<g transform="translate(200,640)"><rect x="-10" y="-200" width="20" height="200" fill="#6a4a3a"/><circle cx="0" cy="-240" r="90" fill="#5aa86a" stroke="${L}" stroke-width="2.5"/><circle cx="-50" cy="-200" r="60" fill="#4a9a5a" stroke="${L}" stroke-width="2.5"/><circle cx="50" cy="-210" r="64" fill="#6ab87a" stroke="${L}" stroke-width="2.5"/></g>`;
 s+=glow(1600,80,500,'#fff6c8',.5);
 return s;};
LOC.cityNight=()=>{let s=`<rect width="${W}" height="${H}" fill="#151530"/>`;const [g,d]=lg('#1a1a40','#4a2a5a');s+=d+`<rect width="${W}" height="700" fill="url(#${g})"/>`;
 let far='';for(let i=0;i<16;i++){const x=i*125,h=200+((i*73)%260),c=['#24244a','#2c2450','#1e2a4a'][i%3];far+=`<rect x="${x}" y="${640-h}" width="120" height="${h}" fill="${c}"/>`;for(let k=0;k<14;k++)if((k*7+i)%3)far+=`<rect x="${x+14+(k%3)*34}" y="${640-h+20+Math.floor(k/3)*40}" width="20" height="14" fill="${(k+i)%4?'#ffd890':'#7ad0ff'}" opacity=".8"/>`;}
 s+=blur(3,far);
 s+=`<rect x="0" y="640" width="${W}" height="440" fill="#1e1a2e"/>`;
 for(let i=0;i<8;i++)s+=`<rect x="${i*260+40}" y="880" width="140" height="10" fill="#4a4a60"/>`;
 // neon signs
 s+=`<rect x="120" y="380" width="360" height="260" fill="#2a2240" stroke="${L}" stroke-width="3"/><text x="300" y="470" text-anchor="middle" font-family="DejaVu Sans" font-weight="bold" font-size="64" fill="#ff5fa8">CAFE</text>`+glow(300,450,260,'#ff5fa8',.45);
 s+=`<rect x="1420" y="400" width="380" height="240" fill="#22263e" stroke="${L}" stroke-width="3"/><text x="1610" y="500" text-anchor="middle" font-family="DejaVu Sans" font-weight="bold" font-size="56" fill="#5ff0ff">24/7</text>`+glow(1610,480,260,'#5ff0ff',.4);
 // wet reflections
 s+=blur(8,`<rect x="240" y="700" width="120" height="300" fill="#ff5fa8" opacity=".25"/><rect x="1560" y="700" width="100" height="300" fill="#5ff0ff" opacity=".22"/>`);
 s+=`<g><path d="M960,640 L960,300" stroke="#3a3a50" stroke-width="12"/><ellipse cx="960" cy="296" rx="30" ry="12" fill="#ffe8a0"/></g>`+glow(960,300,380,'#ffd890',.4)+beam(`M930,300 L990,300 L1180,1000 L740,1000Z`,'#ffe8a0',.2);
 return s;};
LOC.office=()=>{const [g,d]=lg('#dfe6ee','#c8d2de');let s=d+`<rect width="${W}" height="${H}" fill="url(#${g})"/>`;
 let bg=`${[0,1,2,3].map(i=>win(120+i*440,120,380,420,['#a8d8ff','#e8f4ff'],'#d8dee6')).join('')}`+[0,1,2,3].map(i=>`<g opacity=".5">${[...Array(6)].map((_,k)=>`<rect x="${140+i*440+k*58}" y="${300+((k*37+i*11)%120)}" width="44" height="${240-((k*37+i*11)%120)}" fill="#8aa8c8"/>`).join('')}</g>`).join('');
 s+=blur(2.2,bg)+`<rect y="600" width="${W}" height="480" fill="#8a96a8"/>`;for(let i=0;i<10;i++)s+=`<path d="M0,${600+i*i*5} L${W},${600+i*i*5}" stroke="#7a8698" stroke-width="2"/>`;
 // desks with monitors
 s+=blur(1.2,[[300,640],[900,640],[1500,640]].map(([x,y])=>`<path d="M${x-200},${y} L${x+200},${y} L${x+220},${y+30} L${x-220},${y+30}Z" fill="#f2f0ea" stroke="${L}" stroke-width="2.5"/><rect x="${x-70}" y="${y-110}" width="140" height="90" rx="6" fill="#2a2a3a" stroke="${L}" stroke-width="2.5"/><rect x="${x-62}" y="${y-102}" width="124" height="74" fill="#7ab0ff"/><rect x="${x-8}" y="${y-20}" width="16" height="20" fill="#3a3a48"/>`).join(''));
 s+=plant(1820,760,1.2)+glow(960,0,900,'#ffffff',.3);
 return s;};
LOC.parkSunset=()=>{const [g,d]=lg('#ff9a6a','#ffd8a0');let s=d+`<rect width="${W}" height="${H}" fill="url(#${g})"/>`;
 s+=`<circle cx="1380" cy="520" r="110" fill="#fff0c0"/>`+glow(1380,520,520,'#ffe0a0',.6);
 s+=blur(3,`<path d="M0,560 C300,480 600,540 900,500 C1200,460 1500,540 1920,490 L1920,700 L0,700Z" fill="#c86a7a"/><path d="M0,620 C400,560 800,640 1200,580 C1500,540 1700,600 1920,570 L1920,760 L0,760Z" fill="#8a5a8a"/>`);
 s+=`<path d="M0,680 C500,640 1300,660 1920,640 L1920,1080 L0,1080Z" fill="#6aa86a"/><path d="M0,760 C600,720 1300,740 1920,720 L1920,1080 L0,1080Z" fill="#5a985a"/>
  <path d="M700,1080 C800,900 900,780 980,700 L1080,700 C1060,800 1100,950 1260,1080Z" fill="#e8c890" opacity=".9"/>`;
 for(const [x,y,sc] of [[180,700,1.4],[1700,690,1.2],[560,680,.8]]) s+=`<g transform="translate(${x},${y}) scale(${sc})"><rect x="-10" y="-160" width="20" height="160" fill="#5a3a3a"/><circle cx="0" cy="-200" r="80" fill="#3a6a4a" stroke="${L}" stroke-width="2.5"/><circle cx="-46" cy="-160" r="54" fill="#2f5a3e" stroke="${L}" stroke-width="2.5"/><circle cx="46" cy="-170" r="58" fill="#4a7a52" stroke="${L}" stroke-width="2.5"/></g>`;
 s+=`<g transform="translate(1250,780)"><rect x="-120" y="-40" width="240" height="18" rx="4" fill="#8a5a3a" stroke="${L}" stroke-width="2.5"/><rect x="-120" y="-80" width="240" height="14" rx="4" fill="#8a5a3a" stroke="${L}" stroke-width="2.5"/><path d="M-100,-22 L-100,20 M100,-22 L100,20" stroke="#3a3a40" stroke-width="8"/></g>`;
 s+=dust(800,400,1800,900,50,'#fff0c0');
 return s;};

// shadows direction per location (cast): [len, skew]
const CAST={bedroomNight:[1.2,.2],kitchen:[1.6,.28],hallway:[1,.18],classroom:[1.6,.28],streetDay:[-1.2,.22],cityNight:[1,.18],office:[1,.2],parkSunset:[-1.8,.3]};
const GRADE={bedroomNight:['#9aa8ff',.6,'#2a2a6a'],kitchen:['#fff1d8',.45],hallway:['#ffffff',.4],classroom:['#fff1d8',.5],streetDay:['#fff6d8',.35],cityNight:['#ff8ad8',.65,'#2a1a5a'],office:['#ffffff',.4],parkSunset:['#ffd0a0',.5,'#ff7a4a']};
module.exports={LOC,CAST,GRADE,grade,W,H,blur,glow,beam,dust};
