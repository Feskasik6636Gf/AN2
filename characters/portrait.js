// Stylized semi-real portrait renderer (3/4 view), original characters
const {chromium}=require('playwright');
const INK='#1a1418';
let seed=9;const rnd=()=>{seed=(seed*16807)%2147483647;return (seed-1)/2147483646};

// --- 3/4 head facing viewer-left. units: eye line y=0
const HEAD_M=`M-46,-150 C0,-182 92,-176 124,-118 C144,-78 142,-18 124,24 C114,62 98,96 72,122 C50,144 8,164 -30,170 C-48,172 -58,162 -61,148 C-64,132 -66,120 -70,108 C-76,84 -82,44 -85,12 C-88,-18 -90,-42 -88,-62 C-86,-100 -74,-138 -46,-150Z`;

const HEAD_F=`M-46,-150 C0,-182 92,-176 124,-118 C144,-78 140,-18 120,20 C104,60 80,100 46,130 C22,150 -10,160 -34,162 C-50,162 -56,152 -58,140 C-62,126 -65,116 -69,106 C-76,82 -82,44 -85,12 C-88,-18 -90,-42 -88,-62 C-86,-100 -74,-138 -46,-150Z`;
function defsCommon(id,c,HEAD){return `
 <linearGradient id="skinG${id}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${c.skinL}"/><stop offset=".55" stop-color="${c.skin}"/><stop offset="1" stop-color="${c.skinS}"/></linearGradient>
 <radialGradient id="cheek${id}" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="${c.blush}" stop-opacity=".45"/><stop offset="1" stop-color="${c.blush}" stop-opacity="0"/></radialGradient>
 <radialGradient id="ao${id}" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="${c.skinD}" stop-opacity=".55"/><stop offset="1" stop-color="${c.skinD}" stop-opacity="0"/></radialGradient>
 <filter id="soft${id}" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="5"/></filter>
 <filter id="soft2${id}" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="2"/></filter>
 <clipPath id="hc${id}"><path d="${HEAD}"/></clipPath>`;}

function eye(x,y,w,c,o,far){
 const op=o.open??1, h=far?7:9;
 const up=`M${x-w},${y+3} C${x-w*.5},${y-h*1.25*op} ${x+w*.45},${y-h*1.35*op} ${x+w},${y-2}`;
 const lo=`C${x+w*.5},${y+h*.7} ${x-w*.4},${y+h*.8} ${x-w},${y+3}Z`;
 const id='e'+Math.floor(rnd()*1e9);
 const lx=x+(o.look??-3)*(far?.7:1);
 return `<defs><clipPath id="${id}"><path d="${up} ${lo}"/></clipPath></defs>
 <path d="${up} ${lo}" fill="#efe6dc"/>
 <g clip-path="url(#${id})">
   <circle cx="${lx}" cy="${y-1}" r="${far?6.5:8.2}" fill="${c.iris}"/>
   <circle cx="${lx}" cy="${y-1}" r="${far?6.5:8.2}" fill="none" stroke="${INK}" stroke-width="1.3" opacity=".7"/>
   <circle cx="${lx}" cy="${y-1}" r="${far?2.8:3.6}" fill="#120c10"/>
   <path d="M${lx-7},${y+2} A8 8 0 0 0 ${lx+7},${y+2}" stroke="${c.irisL}" stroke-width="2" fill="none" opacity=".8"/>
   <circle cx="${lx-2.6}" cy="${y-4}" r="2" fill="#fff"/>
   <path d="${up} L${x+w},${y-20} L${x-w},${y-20}Z" fill="${c.skinD}" opacity=".35"/>
 </g>
 <path d="${up}" stroke="${INK}" stroke-width="${far?2.6:3.2}" fill="none" stroke-linecap="round"/>
 <path d="M${x-w*.7},${y-h*1.55} C${x-w*.2},${y-h*2.1} ${x+w*.4},${y-h*2.05} ${x+w*.95},${y-h*1.1}" stroke="${c.skinD}" stroke-width="1.6" fill="none" opacity=".75"/>
 <path d="M${x-w+5},${y+6} C${x-w*.3},${y+h*.95} ${x+w*.3},${y+h*.95} ${x+w-4},${y+4}" stroke="${c.skinD}" stroke-width="1.4" fill="none" opacity=".7"/>
 ${o.lashes?`<path d="M${x+w-2},${y-3} l7,-5 M${x+w-7},${y-7} l5,-7" stroke="${INK}" stroke-width="2.4" stroke-linecap="round"/><path d="${up}" stroke="${INK}" stroke-width="5" fill="none" stroke-linecap="round"/>`:''}
 ${o.bags?`<path d="M${x-w*.6},${y+h*1.7} C${x-w*.1},${y+h*2.1} ${x+w*.4},${y+h*1.9} ${x+w*.75},${y+h*1.2}" stroke="${c.skinD}" stroke-width="1.3" fill="none" opacity=".55"/>`:''}`;
}

function head(id,c,o){
 const HEAD=o.female?HEAD_F:HEAD_M;
 let s=`<defs>${defsCommon(id,c,HEAD)}</defs>`;
 // back hair / hood behind head
 if(o.hairBack) s+=o.hairBack(c);
 // skin volume
 s+=`<g clip-path="url(#hc${id})">
   <path d="${HEAD}" fill="url(#skinG${id})"/>
   <!-- hard cel shadow: side plane of face/skull -->
   <path d="M16,-190 C34,-120 22,-70 36,-30 C46,0 40,40 54,70 C48,104 30,130 10,150 L-20,190 L200,190 L200,-190Z" fill="${c.skinS}" opacity=".85"/>
   <!-- under-jaw core -->
   <path d="M-60,140 C-20,150 40,130 90,90 L140,200 L-80,200Z" fill="${c.skinD}" opacity=".35"/>
   <!-- eye sockets AO -->
   <ellipse cx="-54" cy="-6" rx="22" ry="16" fill="url(#ao${id})" opacity=".8"/>
   <ellipse cx="2" cy="-6" rx="30" ry="20" fill="url(#ao${id})" opacity=".7"/>
   <!-- cheek warmth -->
   <ellipse cx="-38" cy="46" rx="30" ry="18" fill="url(#cheek${id})"/>
   <ellipse cx="24" cy="44" rx="34" ry="22" fill="url(#cheek${id})"/>
   <!-- forehead highlight -->
   <ellipse cx="-34" cy="-90" rx="34" ry="20" fill="#fff" opacity=".13" filter="url(#soft${id})"/>
   <!-- cheekbone highlight -->
   <path d="M-76,28 C-70,16 -56,12 -46,18" stroke="#fff" stroke-width="6" opacity=".18" filter="url(#soft2${id})" fill="none"/>
   ${o.stubble?stub(c):''}
   ${o.freckles?fr(c):''}
   <!-- rim light from back -->
   <path d="${HEAD}" fill="none" stroke="${o.rim}" stroke-width="9" transform="translate(-5,0)" opacity=".0"/>
 </g>`;
 s+=`<path d="M124,-118 C144,-78 142,-18 124,24 C114,62 98,96 72,122" stroke="${o.rim}" stroke-width="5" fill="none" opacity=".95" clip-path="url(#hc${id})"/>`;
 s+=`<path d="${HEAD}" fill="none" stroke="${INK}" stroke-width="3.2" stroke-linejoin="round"/>`;

 s+=`<path d="M96,-14 C122,-26 134,6 128,34 C124,56 108,66 94,58 Z" fill="${c.skinS}" stroke="${INK}" stroke-width="3"/>
     <path d="M102,0 C116,-2 120,20 114,38 C110,46 104,48 102,44" stroke="${c.skinD}" stroke-width="3" fill="none"/>`;
 // jaw plane line + cheekbone
 s+=`<path d="M30,60 C40,90 46,110 50,128" stroke="${c.skinD}" stroke-width="2" fill="none" opacity=".55"/>
     <path d="M-6,30 C10,40 26,40 40,34" stroke="${c.skinD}" stroke-width="1.6" fill="none" opacity=".45"/>`;
 // brows
 const bt=o.browTilt??0, by=-30+(o.browY??0);
 s+=`<path d="M-90,${by+2-bt*.2} C-82,${by-8} -72,${by-9} -58,${by-4+bt} C-70,${by-2} -82,${by+2} -88,${by+6}Z" fill="${c.brow}" stroke="${INK}" stroke-width="1.5"/>
     <path d="M-36,${by-2+bt} C-22,${by-12} 6,${by-16} 34,${by-8-bt*.3} C14,${by-6} -12,${by-4} -34,${by+5+bt}Z" fill="${c.brow}" stroke="${INK}" stroke-width="1.5"/>`;
 // eyes
 s+=eye(-68,0,13,c,o,true)+eye(-2,0,22,c,o,false);
 // nose
 s+=`<path d="M-48,-6 C-56,16 -70,38 -88,56 C-92,62 -86,68 -76,66 C-70,70 -62,70 -56,66" fill="${c.skin}" stroke="none"/>
     <path d="M-48,-6 C-52,18 -58,40 -66,58 L-50,62 C-44,44 -42,22 -42,4Z" fill="${c.skinS}" opacity=".6"/>
     <path d="M-48,-6 C-56,16 -70,38 -88,56 C-92,62 -86,68 -76,66" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
     <path d="M-66,66 C-60,70 -52,70 -46,64" fill="none" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/>
     <path d="M-42,58 C-38,62 -40,68 -46,70" fill="none" stroke="${c.skinD}" stroke-width="2.4" stroke-linecap="round"/>
     <path d="M-60,6 C-62,22 -70,38 -80,50" stroke="#fff" stroke-width="3" opacity=".3" fill="none" stroke-linecap="round"/>`;
 // nasolabial
 s+=`<path d="M-28,72 C-18,84 -16,96 -20,108" stroke="${c.skinD}" stroke-width="2" fill="none" opacity=".6"/>`;
 // mouth
 const m=o.mouth??'neutral';
 if(m==='neutral'||m==='smirk'){const e=m==='smirk'?-8:0;
  s+=`<path d="M-74,98 C-60,94 -50,92 -40,96 C-30,92 -14,94 -2,${98+e}" fill="none" stroke="${INK}" stroke-width="2.8" stroke-linecap="round"/>
      <path d="M-70,99 C-56,104 -30,104 -8,${100+e}" fill="none" stroke="${c.lip}" stroke-width="3" opacity=".7"/>
      <path d="M-66,104 C-52,${o.female?120:114} -30,${o.female?120:114} -16,106 C-30,110 -52,110 -66,104Z" fill="${c.lip}" opacity=".9"/>${o.female?`<path d="M-72,98 C-60,90 -50,88 -40,94 C-30,88 -16,90 -4,96 C-30,100 -50,100 -72,98Z" fill="${c.lip}"/>`:''}
      <path d="M-56,120 C-46,124 -34,124 -26,118" stroke="${c.skinD}" stroke-width="2" fill="none" opacity=".6"/>`;}
 if(m==='talk') s+=`<path d="M-74,96 C-50,90 -20,92 -4,96 C-12,118 -60,122 -74,96Z" fill="#3b1a20" stroke="${INK}" stroke-width="2.6"/><path d="M-68,97 L-10,97 L-14,103 L-64,103Z" fill="#efe8df"/><path d="M-62,112 C-46,118 -26,116 -14,108" stroke="${c.lip}" stroke-width="4" fill="none"/>`;
 if(o.scar) s+=`<path d="${o.scar}" stroke="${c.scar}" stroke-width="5" fill="none" stroke-linecap="round"/><path d="${o.scar}" stroke="${INK}" stroke-width="1" fill="none" opacity=".5"/>`;
 // hair front
 if(o.hair) s+=o.hair(c,id);
 return s;
}
function neckOf(c){
 // neck
 let s2='';
 s2+=`<path d="M-6,120 C0,160 -6,200 -16,260 L130,260 C120,200 116,150 118,80Z" fill="${c.skinS}" stroke="${INK}" stroke-width="3"/>
     <path d="M8,118 C40,150 80,150 108,110 L108,96 C80,130 40,136 8,118Z" fill="${c.skinD}" opacity=".6"/>
     <path d="M40,160 C46,190 44,220 40,250" stroke="${c.skinD}" stroke-width="2" fill="none" opacity=".6"/>`;
 return s2;}
function stub(c){let s='';for(let i=0;i<650;i++){const x=-80+rnd()*190,y=50+rnd()*130;
 const inJaw=(y>58)&&!(x<-20&&y<120&&y>88)&&!(x<-60&&y<88);if(!inJaw)continue;
 s+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(.6+rnd()*.9).toFixed(2)}" fill="${c.stub}" opacity="${(.25+rnd()*.35).toFixed(2)}"/>`;}return s;}
function fr(c){let s='';for(let i=0;i<60;i++){const x=-70+rnd()*110,y=10+rnd()*40;s+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(1+rnd()*1.4).toFixed(2)}" fill="${c.skinD}" opacity=".45"/>`;}return s;}

// ---------- hair styles (strand groups with highlights) ----------
function strands(path,c,n,dir){let s='';for(let i=0;i<n;i++){s+=path(i,n);}return s;}
const HAIR={
 // tousled short (hero)
 tousle:(c,id)=>`
  <path d="M-92,-60 C-104,-110 -84,-168 -20,-186 C40,-200 110,-180 136,-120 C150,-86 146,-40 132,-6 C128,-40 120,-62 108,-76 C110,-56 104,-40 96,-30 C92,-60 80,-84 60,-96 C56,-80 46,-70 34,-64 C36,-84 28,-100 14,-110 C4,-92 -14,-80 -34,-74 C-28,-92 -32,-104 -42,-112 C-52,-94 -68,-80 -92,-60Z" fill="${c.hair}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
  <path d="M-60,-150 C-30,-176 30,-182 80,-160 M-40,-130 C-10,-160 50,-160 100,-130 M-70,-120 C-50,-148 -10,-156 20,-150 M40,-150 C80,-150 110,-120 120,-90" stroke="${c.hairL}" stroke-width="3" fill="none" stroke-linecap="round" opacity=".9"/>
  <path d="M-20,-176 C20,-188 70,-180 100,-160" stroke="#fff" stroke-width="4" opacity=".25" fill="none" stroke-linecap="round"/>
  <path d="M96,-30 C104,-10 108,0 110,10 M132,-6 C134,10 132,20 128,30" stroke="${c.hair}" stroke-width="7" stroke-linecap="round"/>
  <path d="M60,-96 C66,-110 70,-130 64,-150 M14,-110 C20,-126 18,-146 8,-160" stroke="${c.hairD}" stroke-width="2.4" fill="none" opacity=".7"/>`,
 // long wavy with side part (female)
 wavy:(c,id)=>`
  <path d="M-86,-70 C-100,-140 -50,-196 20,-192 C90,-188 148,-140 142,-60 C140,-20 134,10 126,34 C112,4 102,-36 88,-66 C66,-100 30,-124 -10,-122 C-40,-112 -70,-90 -86,-70Z" fill="${c.hair}" stroke="${INK}" stroke-width="3"/>
  <path d="M30,-140 C-20,-130 -70,-110 -94,-60 C-100,-40 -98,-20 -92,0 C-86,-30 -74,-56 -50,-74 C-60,-56 -62,-40 -58,-26 C-46,-60 -20,-88 20,-104 C10,-90 6,-76 8,-62 C26,-90 50,-108 80,-118Z" fill="${c.hair}" stroke="${INK}" stroke-width="2.8" stroke-linejoin="round"/>
  <path d="M10,-126 C-30,-110 -66,-84 -84,-40 M40,-124 C0,-110 -30,-86 -46,-56" stroke="${c.hairL}" stroke-width="2.6" fill="none" opacity=".9"/>
  <path d="M-50,-160 C-10,-186 60,-184 110,-150 M-30,-140 C10,-160 70,-160 120,-120 M20,-180 C60,-176 100,-156 124,-120" stroke="${c.hairL}" stroke-width="3" fill="none" opacity=".9" stroke-linecap="round"/>
  <path d="M0,-178 C40,-184 80,-170 104,-150" stroke="#fff" stroke-width="5" opacity=".25" fill="none" stroke-linecap="round"/>`,
 wavyBack:c=>`<path d="M120,-110 C170,-60 176,40 160,140 C150,200 170,250 190,290 L40,300 C60,250 90,220 100,170 C116,100 130,40 128,-20Z" fill="${c.hair}" stroke="${INK}" stroke-width="3"/>
  <path d="M140,-40 C158,20 156,90 140,160 C136,200 150,240 166,270 M126,10 C134,70 126,130 112,180" stroke="${c.hairL}" stroke-width="3" fill="none" opacity=".8"/>`,
 slick:(c,id)=>`
  <path d="M-90,-64 C-104,-136 -60,-190 10,-192 C80,-194 140,-160 142,-90 C144,-50 136,-10 128,20 C116,0 104,-30 92,-60 C70,-96 20,-118 -40,-112 C-64,-100 -82,-84 -90,-64Z" fill="${c.hair}" stroke="${INK}" stroke-width="3"/>
  <path d="M-70,-120 C-30,-160 40,-170 110,-140 M-60,-104 C-20,-138 50,-148 120,-116 M-40,-140 C0,-172 60,-178 120,-150 M-20,-112 C20,-132 80,-130 128,-96" stroke="${c.hairL}" stroke-width="2.2" fill="none" opacity=".9"/>
  <path d="M-10,-170 C40,-182 90,-170 120,-146" stroke="#fff" stroke-width="4" opacity=".3" fill="none" stroke-linecap="round"/>`,
};

module.exports={neckOf,head,HAIR,INK,rnd};
