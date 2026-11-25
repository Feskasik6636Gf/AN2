// world props on stage engine: bus, autumn trees, leaves, porch houses, hedges, string lights
const S=require('./stage.js');const {poly,line,blurG,glow,shade,rectBack,rectSide,rectFloor,box,f,L}=S;
let sd=5;const r=()=>{sd=(sd*16807)%2147483647;return (sd-1)/2147483646};
const AUT=['#e8803a','#d85a2a','#f2a640','#c84a2a','#e8b048'];
function autumnTree(C,X,Z,h=1,cols=AUT){const [x,y]=C.P(X,0,Z);const k=C.k(Z)*C.U/100*h;let blobs='';
 for(let i=0;i<34;i++){const a=r()*6.28,d=Math.sqrt(r())*110;blobs+=`<circle cx="${f(Math.cos(a)*d*1.15)}" cy="${f(-330+Math.sin(a)*d*.85)}" r="${f(26+r()*30)}" fill="${cols[i%cols.length]}" opacity="${(.55+r()*.45).toFixed(2)}"/>`;}
 return `<g transform="translate(${f(x)},${f(y)}) scale(${k.toFixed(3)})"><ellipse cx="40" cy="0" rx="120" ry="20" fill="#1a0e18" opacity=".2"/><path d="M-14,0 L-10,-250 L-60,-330 M-10,-250 L40,-340 M-8,-200 L-80,-270" stroke="#5a3a2a" stroke-width="18" stroke-linecap="round" fill="none"/><path d="M-60,-330 L-90,-380 M40,-340 L70,-400 M-80,-270 L-120,-300" stroke="#5a3a2a" stroke-width="7" stroke-linecap="round"/>${blobs}</g>`;}
function leaves(C,x0,x1,z0,z1,n=80,cols=AUT){let s='';for(let i=0;i<n;i++){const X=x0+r()*(x1-x0),Z=z0+r()*(z1-z0);const [x,y]=C.P(X,0,Z);const k=C.k(Z);s+=`<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(9*k*(.7+r()*.6))}" ry="${f(4*k)}" fill="${cols[i%cols.length]}" opacity=".9"/>`;}return s;}
function fallingLeaves(n=26,cols=AUT){let s='';for(let i=0;i<n;i++){const x=r()*1920,y=r()*900,rot=r()*180;s+=`<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(7+r()*6)}" ry="4" fill="${cols[i%cols.length]}" transform="rotate(${rot.toFixed(0)} ${f(x)} ${f(y)})"/>`;}return s;}
function hedge(C,x0,x1,z0,z1,h=1.2){let s=box(C,{x0,x1,y0:0,y1:h,z0,z1},{front:'#4a8a4a',top:'#5a9a5a'});const n=Math.round((x1-x0)/.5);
 for(let i=0;i<n;i++){const [px,py]=C.P(x0+.25+i*.5,h,z0);s+=`<circle cx="${f(px)}" cy="${f(py)}" r="${f(.26*C.U*C.k(z0))}" fill="#5a9a5a" stroke="${L}" stroke-width="1.6"/>`;}
 for(let i=0;i<n*3;i++){const [px,py]=C.P(x0+r()*(x1-x0),r()*h,z0);s+=`<circle cx="${f(px)}" cy="${f(py)}" r="${f(.06*C.U*C.k(z0)*(1+r()))}" fill="#3a7a3a" opacity=".6"/>`;}
 return s;}
// school bus, side facing camera (long axis along X), with kids in windows
function bus(C,x0,Z,kids=true,headFn=null){const x1=x0+10,y0=.45,y1=3.1;let s='';
 s+=box(C,{x0,x1,y0,y1,z0:Z,z1:Z+2.5},{front:'#f2b030',top:'#e8a020',side:'#d89418'});
 s+=box(C,{x0:x1,x1:x1+1.6,y0,y1:1.9,z0:Z+.1,z1:Z+2.4},{front:'#f2b030',top:'#e8a020'},{noAO:1});
 s+=rectBack(C,Z-.001,x0,x1,1.15,1.22,'#1a1a22')+rectBack(C,Z-.001,x0,x1,.85,.9,'#1a1a22');
 const nW=8;for(let i=0;i<nW;i++){const wx0=x0+.4+i*1.12,wx1=wx0+.92;s+=rectBack(C,Z-.002,wx0,wx1,1.5,2.6,'#3a4a5a');
  if(kids&&headFn) s+=headFn(C,(wx0+wx1)/2,1.95,Z-.003,i);
  s+=rectBack(C,Z-.004,wx0,wx1,1.5,2.6,'#bfe6ff',L,2.4).replace('fill="#bfe6ff"','fill="#bfe6ff" fill-opacity=".25"')+line(C.P(wx0,2.05,Z-.005),C.P(wx1,2.05,Z-.005),'#d8a020',4*C.k(Z));}
 s+=rectBack(C,Z-.002,x1-.95,x1-.1,.5,2.7,'#2a3a4a')+line(C.P(x1-.52,.5,Z-.003),C.P(x1-.52,2.7,Z-.003),'#d8a020',3);
 for(const wx of [x0+1.6,x1-1.4]){const [cx,cy]=C.P(wx,.45,Z-.01);const R=.48*C.U*C.k(Z);s+=`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(R)}" fill="#1a1a22" stroke="${L}" stroke-width="2"/><circle cx="${f(cx)}" cy="${f(cy)}" r="${f(R*.45)}" fill="#c8ccd4"/>`;}
 s+=rectBack(C,Z-.002,x0+.1,x0+.6,2.75,2.95,'#e8434f')+rectBack(C,Z-.002,x1+1.3,x1+1.55,1.2,1.5,'#fff6c8');
 return s;}
// porch house facing camera
function porchHouse(C,xc,Z,w=7,col='#7a9ac8',roof='#3a3a4a',lit=false,stories=2){const x0=xc-w/2,x1=xc+w/2,h=stories*2.8;let s='';
 s+=box(C,{x0,x1,y0:0,y1:h,z0:Z,z1:Z+6},{front:col,side:shade(col,-.15)});
 s+=poly([C.P(x0-.3,h,Z-.2),C.P(x1+.3,h,Z-.2),C.P(x1-1,h+1.8,Z+1.5),C.P(x0+1,h+1.8,Z+1.5)],roof);
 s+=box(C,{x0:x1-1.6,x1:x1-1,y0:h,y1:h+2.4,z0:Z+2,z1:Z+2.6},{front:'#8a4a3a'},{noAO:1});
 for(let st=0;st<stories;st++) for(let i=0;i<4;i++){if(st===0&&(i===1))continue;const wx=x0+.6+i*(w-1.2)/4;const wc=lit?(i%2?'#ffd890':'#ffe8a8'):'#bfe6ff';
  s+=rectBack(C,Z-.002,wx,wx+.9,st*2.8+.9,st*2.8+2.1,wc,L,2)+line(C.P(wx+.45,st*2.8+.9,Z-.003),C.P(wx+.45,st*2.8+2.1,Z-.003),'#f2f0ea',3*C.k(Z))+rectBack(C,Z-.002,wx-.12,wx,st*2.8+.9,st*2.8+2.1,'#2a3a5a')+rectBack(C,Z-.002,wx+.9,wx+1.02,st*2.8+.9,st*2.8+2.1,'#2a3a5a');
  if(lit)s+=glow(...C.P(wx+.45,st*2.8+1.5,Z),90*C.k(Z)*4,'#ffd890',.35);}
 const dx=x0+.6+(w-1.2)/4;s+=rectBack(C,Z-.002,dx+.1,dx+.9,0,2.1,'#8a3a2a');
 // porch roof + steps
 s+=box(C,{x0:x0+.2,x1:x0+3,y0:2.3,y1:2.45,z0:Z-1.4,z1:Z},{front:'#f2f0ea'},{noAO:1})+[x0+.3,x0+2.8].map(x=>box(C,{x0:x-.06,x1:x+.06,y0:0,y1:2.3,z0:Z-1.35,z1:Z-1.25},{front:'#f2f0ea'},{noAO:1})).join('');
 s+=box(C,{x0:dx,x1:dx+1.0,y0:0,y1:.2,z0:Z-.8,z1:Z},{front:'#c8ccd4'},{noAO:1});
 if(lit)s+=glow(...C.P(dx+.5,2.2,Z-.5),160*C.k(Z)*3,'#ffd890',.45);
 return s;}
function stringLights(C,pts,n=24,col='#ffd890'){let s='';const P=pts.map(p=>C.P(...p));
 s+=`<path d="M${P.map(p=>f(p[0])+','+f(p[1])).join(' L')}" stroke="#2a2a30" stroke-width="2" fill="none"/>`;
 for(let i=0;i<n;i++){const t=i/(n-1)*(P.length-1),k=Math.min(P.length-2,Math.floor(t)),u=t-k;const x=P[k][0]+(P[k+1][0]-P[k][0])*u,y=P[k][1]+(P[k+1][1]-P[k][1])*u+Math.sin(u*Math.PI)*14;
  const c=[col,'#ff8ad8','#8ad8ff','#a8ff8a'][i%4];s+=`<circle cx="${f(x)}" cy="${f(y)}" r="4" fill="${c}"/>`+glow(x,y,30,c,.6);}
 return s;}
function bokeh(n=30,cols=['#ffd890','#ff8ad8','#8ad8ff'],y0=0,y1=600){let s='';for(let i=0;i<n;i++){const c=cols[i%cols.length];s+=`<circle cx="${f(r()*1920)}" cy="${f(y0+r()*(y1-y0))}" r="${f(14+r()*30)}" fill="${c}" opacity="${(.15+r()*.3).toFixed(2)}"/>`;}return blurG(3,s);}
module.exports={autumnTree,leaves,fallingLeaves,hedge,bus,porchHouse,stringLights,bokeh,AUT};
