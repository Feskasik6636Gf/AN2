// Stage engine: one-point perspective in meters. Characters & props share one scale.
const {body,OL,rnd}=require('./bean.js');
const W=1920,H=1080,L='#4a3a48';
let n=0;const id=p=>p+'_'+(n++);
// camera: eye height 1.6m, stage line Z=4m at screen y=1000, person 1.75m = PH px at Z=4
function Cam(o={}){const PH=o.PH??600, Zs=4, U=PH/1.75, ey=1.6, vx=o.vx??W/2;
 const Hz=1000-ey*U; // horizon
 const P=(X,Y,Z)=>{const k=Zs/Z;return [vx+X*U*k, Hz+(ey-Y)*U*k];};
 const k=Z=>Zs/Z;
 return {P,k,U,Hz,PH,vx,ey,Zs};}
const f=v=>v.toFixed(1);
const poly=(pts,fill,st=L,sw=2.4,extra='')=>`<path d="M${pts.map(p=>f(p[0])+','+f(p[1])).join(' L')}Z" fill="${fill}" stroke="${st}" stroke-width="${sw}" stroke-linejoin="round" ${extra}/>`;
const line=(a,b,c,w=2,op=1)=>`<path d="M${f(a[0])},${f(a[1])} L${f(b[0])},${f(b[1])}" stroke="${c}" stroke-width="${w}" opacity="${op}" stroke-linecap="round"/>`;
const blurG=(d,inner)=>{const i=id('bf');return `<defs><filter id="${i}" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="${d}"/></filter></defs><g filter="url(#${i})">${inner}</g>`;};
const glow=(x,y,r,c,a=.35)=>{const g=id('gl');return `<defs><radialGradient id="${g}"><stop offset="0" stop-color="${c}" stop-opacity="${a}"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient></defs><circle cx="${f(x)}" cy="${f(y)}" r="${r}" fill="url(#${g})"/>`;};
const shade=(c,k)=>{const n=parseInt(c.slice(1),16);let r=n>>16,g=n>>8&255,b=n&255;const q=v=>Math.max(0,Math.min(255,Math.round(k>0?v+(255-v)*k:v*(1+k))));return '#'+[q(r),q(g),q(b)].map(v=>v.toString(16).padStart(2,'0')).join('');};

// planes
const rectBack=(C,Z,x0,x1,y0,y1,fill,st=L,sw=2.4)=>poly([C.P(x0,y0,Z),C.P(x1,y0,Z),C.P(x1,y1,Z),C.P(x0,y1,Z)],fill,st,sw);
const rectSide=(C,X,z0,z1,y0,y1,fill,st=L,sw=2.4)=>poly([C.P(X,y0,z0),C.P(X,y0,z1),C.P(X,y1,z1),C.P(X,y1,z0)],fill,st,sw);
const rectFloor=(C,x0,x1,z0,z1,fill,st=L,sw=2,Y=0)=>poly([C.P(x0,Y,z0),C.P(x1,Y,z0),C.P(x1,Y,z1),C.P(x0,Y,z1)],fill,st,sw);
// box with visible faces + contact AO
function box(C,b,col,opt={}){const {x0,x1,y0,y1,z0,z1}=b;let s='';
 if(!opt.noAO) s+=blurG(6*C.k(z0),rectFloor(C,x0-.05,x1+.05,z0-.04,z1+.04,'#1a0e18','none',0,0.001).replace('fill="#1a0e18"','fill="#1a0e18" opacity=".35"'));
 const top=col.top??shade(col.front,.18), side=col.side??shade(col.front,-.2);
 if(y1<C.ey) s+=poly([C.P(x0,y1,z0),C.P(x1,y1,z0),C.P(x1,y1,z1),C.P(x0,y1,z1)],top);
 if(y0>C.ey) s+=poly([C.P(x0,y0,z0),C.P(x1,y0,z0),C.P(x1,y0,z1),C.P(x0,y0,z1)],shade(col.front,-.3));
 if(x1<0) s+=rectSide(C,x1,z0,z1,y0,y1,side);
 if(x0>0) s+=rectSide(C,x0,z0,z1,y0,y1,side);
 s+=rectBack(C,z0,x0,x1,y0,y1,col.front);
 if(opt.front) s+=opt.front(C,b);
 return s;}
// table: top slab + 4 legs
function table(C,x0,x1,z0,z1,h,col,leg){let s='';const th=.05;
 for(const [lx,lz] of [[x0+.06,z1-.06],[x1-.06,z1-.06]]) s+=box(C,{x0:lx-.03,x1:lx+.03,y0:0,y1:h-th,z0:lz-.03,z1:lz+.03},{front:leg},{noAO:1});
 s+=blurG(5*C.k(z0),rectFloor(C,x0,x1,z0,z1,'#1a0e18','none',0,0.001).replace('fill="#1a0e18"','fill="#1a0e18" opacity=".25"'));
 for(const [lx,lz] of [[x0+.06,z0+.06],[x1-.06,z0+.06]]) s+=box(C,{x0:lx-.03,x1:lx+.03,y0:0,y1:h-th,z0:lz-.03,z1:lz+.03},{front:leg},{noAO:1});
 s+=box(C,{x0,x1,y0:h-th,y1:h,z0,z1},{front:shade(col,-.1),top:col},{noAO:1});
 return s;}
// billboard (flat prop facing camera) drawn in local px at Z
function bill(C,X,Z,inner,scale=1){const [x,y]=C.P(X,0,Z);const k=C.k(Z)*C.U/100*scale;return `<g transform="translate(${f(x)},${f(y)}) scale(${k.toFixed(3)})">${inner}</g>`;}
// character placement on floor: X,Z meters
const BODYH=470; // px height of y18 body at s=1
function actor(C,X,Z,o){const [x,y]=C.P(X,o.Y??0,Z);const k=C.k(Z);const rel=(o.s??1.08)/1.08;
 const s=k*C.PH/BODYH*rel;return body({...o,x,y,s});}
// grade overlay
function grade(warm='#fff1d8',vig=.5,tint=null,ta=.16){const v=id('vg'),h=id('hz'),gr=id('gr');
 return `<defs><radialGradient id="${v}" cx=".5" cy=".5" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#140a12" stop-opacity="${vig}"/></radialGradient>
 <linearGradient id="${h}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${warm}" stop-opacity=".2"/><stop offset=".6" stop-color="${warm}" stop-opacity="0"/></linearGradient>
 <filter id="${gr}"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="4"/><feColorMatrix values="0 0 0 0 .5 0 0 0 0 .5 0 0 0 0 .5 0 0 0 .07 0"/></filter></defs>
 ${tint?`<rect width="${W}" height="${H}" fill="${tint}" opacity="${ta}"/>`:''}<rect width="${W}" height="${H}" fill="url(#${h})"/><rect width="${W}" height="${H}" fill="url(#${v})"/><rect width="${W}" height="${H}" filter="url(#${gr})"/>`;}
const dust=(pts,nn=60,c='#fff8e0')=>{let s='';const [a,b,cc,d]=pts;for(let i=0;i<nn;i++){const t=rnd(),u=rnd();const x=a[0]+(b[0]-a[0])*u+(d[0]-a[0])*t+(cc[0]-b[0]-d[0]+a[0])*u*t,y=a[1]+(b[1]-a[1])*u+(d[1]-a[1])*t+(cc[1]-b[1]-d[1]+a[1])*u*t;s+=`<circle cx="${f(x)}" cy="${f(y)}" r="${(rnd()*2.4+.7).toFixed(1)}" fill="${c}" opacity="${(rnd()*.6+.2).toFixed(2)}"/>`;}return s;};
module.exports={Cam,poly,line,blurG,glow,shade,rectBack,rectSide,rectFloor,box,table,bill,actor,grade,dust,W,H,L,id,f};
