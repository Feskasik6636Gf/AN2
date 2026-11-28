// IYA2D detail kit 2: interiors, night city, stage. Same rules as detail.js (six layers, metres, one perspective).
const S=require('./stage.js');const {poly,shade,blurG,glow,f}=S;const Dt=require('./detail.js');const {noise,R,rnd}=Dt;
const W=1920,H=1080,OL='#2a2030';
let nid=0;const id=p=>p+'e'+(nid++).toString(36);
const P=(C,X,Y,Z)=>C.P(X,Y,Z);
const dQ=a=>'M'+a.map(p=>f(p[0])+','+f(p[1])).join(' L')+'Z';
const ln=(a,b,c,w,op=1)=>`<path d="M${f(a[0])},${f(a[1])} L${f(b[0])},${f(b[1])}" stroke="${c}" stroke-width="${f(w)}" opacity="${op}" stroke-linecap="round"/>`;

// ---------- planes: map (u,v) -> world ----------
// back wall at Z: u=X, v=Y ; side wall at X: u=Z, v=Y ; floor at Y: u=X, v=Z ; ceiling same at Y=h
const PL={back:(Z)=>(u,v)=>[u,v,Z],side:(X)=>(u,v)=>[X,v,u],floor:(Y=0)=>(u,v)=>[u,Y,v]};
function quad(C,M,u0,u1,v0,v1){return [P(C,...M(u0,v0)),P(C,...M(u1,v0)),P(C,...M(u1,v1)),P(C,...M(u0,v1))];}
function gradFill(C,q,c0,c1,vert=true){const g=id('pg');const a=q[0],b=q[2];return `<defs><linearGradient id="${g}" gradientUnits="userSpaceOnUse" x1="${f(vert?0:a[0])}" y1="${f(vert?a[1]:0)}" x2="${f(vert?0:b[0])}" y2="${f(vert?b[1]:0)}"><stop offset="0" stop-color="${c0}"/><stop offset="1" stop-color="${c1}"/></linearGradient></defs>${poly(q,`url(#${g})`,'none',0)}`;}

// ---------- wall materials ----------
function brick(C,M,u0,u1,v0,v1,{col='#8a4a3a',mortar='#5a3a34',bw=.25,bh=.075,grime=.35}={}){const q=quad(C,M,u0,u1,v0,v1);let s=gradFill(C,q,shade(col,-.08),shade(col,.06));
 for(let v=v0,r=0;v<v1;v+=bh,r++){const a=P(C,...M(u0,v)),b=P(C,...M(u1,v));s+=ln(a,b,mortar,1.1,.8);
  for(let u=u0+(r%2?bw/2:0);u<u1;u+=bw){const c=P(C,...M(u,v)),d=P(C,...M(u,Math.min(v1,v+bh)));s+=ln(c,d,mortar,1,.7);
   if(rnd()<.18)s+=poly(quad(C,M,u,Math.min(u1,u+bw),v,Math.min(v1,v+bh)),shade(col,R(-.25,.15)),'none',0,'opacity=".7"');}}
 const d=dQ(q);s+=noise(d,{freq:.5,oct:2,op:.18})+noise(d,{freq:.03,oct:3,op:grime});
 return s;}
function plaster(C,M,u0,u1,v0,v1,{col='#e8dccb',op=.14}={}){const q=quad(C,M,u0,u1,v0,v1);return gradFill(C,q,shade(col,-.05),shade(col,.05))+noise(dQ(q),{freq:.06,oct:3,op})+noise(dQ(q),{freq:.9,oct:1,op:.06});}
function concrete(C,M,u0,u1,v0,v1,{col='#8a8e94',panel=1.5}={}){const q=quad(C,M,u0,u1,v0,v1);let s=gradFill(C,q,shade(col,-.08),shade(col,.08))+noise(dQ(q),{freq:.04,oct:4,op:.3})+noise(dQ(q),{freq:.8,oct:2,op:.12});
 for(let u=u0+panel;u<u1;u+=panel)s+=ln(P(C,...M(u,v0)),P(C,...M(u,v1)),shade(col,-.35),1.2,.6);
 for(let i=0;i<8;i++){const u=R(u0,u1),v=R(v0,v1*.6);const a=P(C,...M(u,v)),b=P(C,...M(u+R(-.05,.05),v-R(.4,1.2)));s+=ln(a,b,'#3a3020',R(4,9)*C.k(M(u,v)[2]||5),.18);} // water stains
 return s;}
function wallpaper(C,M,u0,u1,v0,v1,{col='#5a3a4a',stripe='#6a4a5a',w=.18}={}){const q=quad(C,M,u0,u1,v0,v1);let s=gradFill(C,q,shade(col,-.06),shade(col,.06));
 for(let u=u0;u<u1;u+=w*2)s+=poly(quad(C,M,u,Math.min(u1,u+w),v0,v1),stripe,'none',0,'opacity=".55"');
 for(let u=u0+w/2;u<u1;u+=w*2)for(let v=v0+.2;v<v1;v+=.4){const [x,y]=P(C,...M(u,v));s+=`<circle cx="${f(x)}" cy="${f(y)}" r="${f(Math.max(1,3*C.k(M(u,v)[2]||5)))}" fill="${shade(stripe,.25)}" opacity=".6"/>`;}
 return s+noise(dQ(q),{freq:.05,oct:3,op:.12});}
function foam(C,M,u0,u1,v0,v1,{col='#3a3a4e',cell=.5}={}){let s='';for(let u=u0;u<u1-1e-6;u+=cell)for(let v=v0;v<v1-1e-6;v+=cell){const q=quad(C,M,u,u+cell,v,v+cell);s+=poly(q,shade(col,((Math.round(u/cell)+Math.round(v/cell))%2?.05:-.06)),shade(col,-.45),1);
  for(let k=1;k<4;k++){const ver=(Math.round(u/cell)+Math.round(v/cell))%2;const a=ver?P(C,...M(u+cell*k/4,v)):P(C,...M(u,v+cell*k/4)),b=ver?P(C,...M(u+cell*k/4,v+cell)):P(C,...M(u+cell,v+cell*k/4));s+=ln(a,b,shade(col,-.35),1.6,.8);}}
 return s;}
// ---------- floor materials ----------
function woodFloor(C,x0,x1,z0,z1,{col='#7a4e30',w=.18,Y=0}={}){const M=PL.floor(Y);const q=quad(C,M,x0,x1,z0,z1);let s=gradFill(C,q,shade(col,-.05),shade(col,.12));
 for(let u=x0,i=0;u<x1;u+=w,i++){s+=poly(quad(C,M,u,Math.min(x1,u+w),z0,z1),shade(col,((i*37)%7-3)*.025),'none',0);s+=ln(P(C,...M(u,z0)),P(C,...M(u,z1)),shade(col,-.4),1.2,.8);
  for(let z=z0+R(0,1.5);z<z1;z+=R(1.2,2.4)){if(C.k(z)<.12)break;s+=ln(P(C,...M(u,z)),P(C,...M(Math.min(x1,u+w),z)),shade(col,-.4),1.2,.7);}}
 s+=noise(dQ(q),{freq:.3,oct:2,op:.15});
 // glossy reflection streak
 return s+poly([P(C,-.6,Y,z0),P(C,.6,Y,z0),P(C,.3,Y,z1),P(C,-.3,Y,z1)],'#fff','none',0,'opacity=".06"');}
function tileFloor(C,x0,x1,z0,z1,{col='#d8d4cc',col2=null,t=.5,Y=0}={}){const M=PL.floor(Y);const q=quad(C,M,x0,x1,z0,z1);let s=gradFill(C,q,shade(col,-.06),shade(col,.08));
 if(col2)for(let u=x0,i=0;u<x1;u+=t,i++)for(let v=z0,j=0;v<Math.min(z1,z0+40);v+=t,j++)if((i+j)%2)s+=poly(quad(C,M,u,u+t,v,v+t),col2,'none',0);
 for(let u=x0;u<=x1+1e-6;u+=t)s+=ln(P(C,...M(u,z0)),P(C,...M(u,z1)),shade(col,-.3),1,.6);
 for(let v=z0;v<=z1;v+=t){if(C.k(v)<.1)break;s+=ln(P(C,...M(x0,v)),P(C,...M(x1,v)),shade(col,-.3),Math.max(.6,1.3*C.k(v)),.6);}
 return s+noise(dQ(q),{freq:.5,oct:2,op:.1})+noise(dQ(q),{freq:.04,oct:3,op:.12});}
function concreteFloor(C,x0,x1,z0,z1,{col='#6a6e74',Y=0}={}){const M=PL.floor(Y);const q=quad(C,M,x0,x1,z0,z1);let s=gradFill(C,q,shade(col,-.06),shade(col,.1))+noise(dQ(q),{freq:.04,oct:4,op:.28})+noise(dQ(q),{freq:.9,oct:2,op:.12});
 for(let z=z0+2;z<z1;z+=3)s+=ln(P(C,...M(x0,z)),P(C,...M(x1,z)),shade(col,-.3),1.2,.6);
 for(let i=0;i<5;i++){const [x,y]=P(C,R(x0,x1),Y,R(z0+.5,z0+6));const k=C.k(4);s+=`<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(R(30,90)*k)}" ry="${f(R(8,18)*k)}" fill="#2a2a30" opacity=".22"/>`;}
 return s;}
// ---------- room shell ----------
// o: {RW (half width), Zb (back wall), Hc (ceiling), wall:fn(C,M,u0,u1,v0,v1), side:fn, floor:fn(C,x0,x1,z0,z1), ceil:'#col', base:'#col' (baseboard)}
function room(C,o){const RW=o.RW,Zb=o.Zb,Hc=o.Hc??3,Z0=.5;let s='';
 s+=(o.floor??((C,a,b,c,d)=>woodFloor(C,a,b,c,d)))(C,-RW,RW,Z0,Zb);
 const cq=[P(C,-RW,Hc,Z0),P(C,RW,Hc,Z0),P(C,RW,Hc,Zb),P(C,-RW,Hc,Zb)];s+=gradFill(C,cq,shade(o.ceil??'#e8e4dc',-.15),o.ceil??'#e8e4dc')+noise(dQ(cq),{freq:.05,oct:3,op:(parseInt((o.ceil??'#e8e4dc').slice(1,3),16)>150?.07:.2)})+noise(dQ(cq),{freq:.7,oct:1,op:.08});
 {const dark=parseInt((o.ceil??'#e8e4dc').slice(1,3),16)<120;if(dark)s+=noise(dQ(cq),{freq:.03,oct:3,op:.12,dark:'#fff'});
  if(o.ceilGrid??dark){const st=o.ceilGrid===true||o.ceilGrid==null?1.2:o.ceilGrid;for(let x=-RW+st;x<RW;x+=st)s+=ln(P(C,x,Hc,Z0),P(C,x,Hc,Zb),shade(o.ceil??'#e8e4dc',dark?.25:-.15),1.4,.8);for(let z=Z0+st;z<Zb;z+=st)s+=ln(P(C,-RW,Hc,z),P(C,RW,Hc,z),shade(o.ceil??'#e8e4dc',dark?.25:-.15),1.4,.8);
   for(let x=-RW+st/2;x<RW;x+=st*2)for(let z=Z0+st*1.5;z<Zb;z+=st*2){const [px,py]=P(C,x,Hc-.01,z),k=C.k(z)*C.U;s+=`<ellipse cx="${f(px)}" cy="${f(py)}" rx="${f(.12*k)}" ry="${f(.03*k)}" fill="#fff6d8"/>`+glow(px,py+.05*k,.5*k,'#ffe8b0',.35);}}}
 const wl=o.side??o.wall;s+=wl(C,PL.side(-RW),Z0,Zb,0,Hc)+wl(C,PL.side(RW),Z0,Zb,0,Hc);s+=o.wall(C,PL.back(Zb),-RW,RW,0,Hc);
 // corner ambient occlusion
 const ao=(a,b,w)=>ln(a,b,'#140a14',w,.18);s+=ao(P(C,-RW,0,Zb),P(C,-RW,Hc,Zb),10)+ao(P(C,RW,0,Zb),P(C,RW,Hc,Zb),10)+ao(P(C,-RW,0,Zb),P(C,RW,0,Zb),8)+ao(P(C,-RW,Hc,Zb),P(C,RW,Hc,Zb),8)+ao(P(C,-RW,0,Z0),P(C,-RW,0,Zb),14)+ao(P(C,RW,0,Z0),P(C,RW,0,Zb),14);
 if(o.base){const b=o.base;s+=poly([P(C,-RW,0,Zb),P(C,RW,0,Zb),P(C,RW,.12,Zb),P(C,-RW,.12,Zb)],b,OL,1)+poly([P(C,-RW,0,Z0),P(C,-RW,0,Zb),P(C,-RW,.12,Zb),P(C,-RW,.12,Z0)],shade(b,-.1),OL,1)+poly([P(C,RW,0,Z0),P(C,RW,0,Zb),P(C,RW,.12,Zb),P(C,RW,.12,Z0)],shade(b,-.15),OL,1);}
 return s;}

// ---------- light ----------
function bulb(C,X,Y,Z,{col='#ffe2a0',cone=true,fl=3}={}){const [x,y]=P(C,X,Y,Z),k=C.k(Z)*C.U;let s='';
 if(cone){const g=id('cn');const [fx0,fy]=P(C,X-fl*.55,0,Z),[fx1]=P(C,X+fl*.55,0,Z);s+=`<defs><linearGradient id="${g}" gradientUnits="userSpaceOnUse" x1="0" y1="${f(y)}" x2="0" y2="${f(fy)}"><stop offset="0" stop-color="${col}" stop-opacity=".38"/><stop offset="1" stop-color="${col}" stop-opacity="0"/></linearGradient></defs><path d="M${f(x-.06*k)},${f(y)} L${f(x+.06*k)},${f(y)} L${f(fx1)},${f(fy)} L${f(fx0)},${f(fy)}Z" fill="url(#${g})"/>`;
  const [cx,cy]=P(C,X,0,Z);s+=`<ellipse cx="${f(cx)}" cy="${f(cy)}" rx="${f(fl*.55*k)}" ry="${f(fl*.12*k)}" fill="${col}" opacity=".22"/>`;}
 s+=glow(x,y,.9*k,col,.6)+`<path d="M${f(x)},${f(y)} L${f(x)},${f(P(C,X,Y+.6,Z)[1])}" stroke="#2a2228" stroke-width="1.4"/><circle cx="${f(x)}" cy="${f(y+.05*k)}" r="${f(.07*k)}" fill="#fffbe8" stroke="${OL}" stroke-width="1"/>`;return s;}
function pendant(C,X,Y,Z,{col='#2a3a3a',light='#ffd890'}={}){const [x,y]=P(C,X,Y,Z),k=C.k(Z)*C.U,top=P(C,X,Y+1,Z);return `<path d="M${f(x)},${f(top[1])} L${f(x)},${f(y)}" stroke="#222" stroke-width="1.4"/>`+glow(x,y+.15*k,1.3*k,light,.45)+`<path d="M${f(x-.05*k)},${f(y)} L${f(x+.05*k)},${f(y)} L${f(x+.24*k)},${f(y+.2*k)} L${f(x-.24*k)},${f(y+.2*k)}Z" fill="${col}" stroke="${OL}" stroke-width="1.4"/><ellipse cx="${f(x)}" cy="${f(y+.2*k)}" rx="${f(.22*k)}" ry="${f(.04*k)}" fill="#fff6d0"/>`;}
function neon(C,X,Y,Z,txt,{col='#ff3fa0',size=.4,plane='back',side=1}={}){const [x,y]=P(C,X,Y,Z),k=C.k(Z)*C.U;const fs=size*k;const g=id('ng');
 const tf=plane==='side'?`transform="translate(${f(x)},${f(y)}) skewY(${side*-18}) scale(${f(.55)},1)"`:`transform="translate(${f(x)},${f(y)})"`;
 return `<defs><filter id="${g}" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="${f(fs*.18)}"/></filter></defs><g ${tf}><rect x="${f(-txt.length*fs*.36)}" y="${f(-fs*.95)}" width="${f(txt.length*fs*.72)}" height="${f(fs*1.25)}" rx="${f(fs*.2)}" fill="#1a1020" stroke="#3a2a3a" stroke-width="2"/><text text-anchor="middle" font-family="DejaVu Sans" font-weight="bold" font-size="${f(fs)}" fill="none" stroke="${col}" stroke-width="${f(fs*.18)}" filter="url(#${g})">${txt}</text><text text-anchor="middle" font-family="DejaVu Sans" font-weight="bold" font-size="${f(fs)}" fill="#fff" stroke="${col}" stroke-width="${f(fs*.04)}">${txt}</text></g>`+glow(x,y-fs*.3,fs*2.2,col,.35);}
function stringLights(C,a,b,{n=16,sag=.35,col=['#ffd86a','#ff8a6a','#8ae0ff','#ffd86a']}={}){const pa=P(C,...a),pb=P(C,...b);let s='';const mid=[(pa[0]+pb[0])/2,(pa[1]+pb[1])/2+sag*C.k((a[2]+b[2])/2)*C.U];s+=`<path d="M${f(pa[0])},${f(pa[1])} Q${f(mid[0])},${f(mid[1])} ${f(pb[0])},${f(pb[1])}" stroke="#1a1a1e" stroke-width="1.5" fill="none"/>`;
 for(let i=1;i<n;i++){const t=i/n,x=(1-t)**2*pa[0]+2*(1-t)*t*mid[0]+t*t*pb[0],y=(1-t)**2*pa[1]+2*(1-t)*t*mid[1]+t*t*pb[1],c=col[i%col.length],r=Math.max(2,6*C.k((a[2]+b[2])/2));s+=glow(x,y+r,r*4,c,.5)+`<circle cx="${f(x)}" cy="${f(y+r)}" r="${f(r)}" fill="${c}"/>`;}return s;}
// ---------- pipes along a wall ----------
function pipeBack(C,Z,x0,x1,Y,{r=.06,col='#8a8e96'}={}){const a=P(C,x0,Y,Z),b=P(C,x1,Y,Z),k=C.k(Z)*C.U;let s=ln(a,b,OL,2*r*k+3)+ln(a,b,col,2*r*k)+ln([a[0],a[1]-r*k*.4],[b[0],b[1]-r*k*.4],shade(col,.4),r*k*.5,.8);
 for(let X=x0+.8;X<x1;X+=1.4){const c=P(C,X,Y,Z);s+=`<rect x="${f(c[0]-.04*k)}" y="${f(c[1]-r*k*1.3)}" width="${f(.08*k)}" height="${f(r*k*2.6)}" fill="${shade(col,-.25)}" stroke="${OL}" stroke-width="1"/>`;}return s;}
function pipeSide(C,X,z0,z1,Y,{r=.06,col='#8a8e96'}={}){const a=P(C,X,Y,z0),b=P(C,X,Y,z1);return ln(a,b,OL,2*r*C.k(z0)*C.U+3)+ln(a,b,col,2*r*C.k(z0)*C.U)+ln([a[0],a[1]-r*C.k(z0)*C.U*.4],[b[0],b[1]-r*C.k(z1)*C.U*.4],shade(col,.4),r*C.k(z0)*C.U*.5,.8);}
function pipeV(C,X,Z,y0,y1,{r=.06,col='#8a8e96'}={}){const a=P(C,X,y0,Z),b=P(C,X,y1,Z),k=C.k(Z)*C.U;return ln(a,b,OL,2*r*k+3)+ln(a,b,col,2*r*k)+ln([a[0]-r*k*.4,a[1]],[b[0]-r*k*.4,b[1]],shade(col,.4),r*k*.5,.8);}

// ---------- furniture & props ----------
function door(C,Z,X,{w=.95,h=2.1,col='#5a3a2a',frame='#e8e0d0',light=false}={}){let s='';const M=PL.back(Z);s+=poly(quad(C,M,X-w/2-.1,X+w/2+.1,0,h+.1),frame,OL,1.6);s+=poly(quad(C,M,X-w/2,X+w/2,0,h),col,OL,1.6);
 for(const [v0,v1] of [[.2,.95],[1.15,1.9]])for(const [u0,u1] of [[X-w/2+.1,X-.04],[X+.04,X+w/2-.1]])s+=poly(quad(C,M,u0,u1,v0,v1),shade(col,-.12),OL,1)+ln(P(C,u0,v1,Z),P(C,u1,v1,Z),shade(col,.25),1.5,.7);
 const kn=P(C,X+w/2-.12,1,Z);s+=`<circle cx="${f(kn[0])}" cy="${f(kn[1])}" r="${f(Math.max(2,.04*C.k(Z)*C.U))}" fill="#d8b860" stroke="${OL}" stroke-width="1"/>`;
 if(light)s+=poly(quad(C,PL.floor(0),X-w/2,X+w/2,Z-1.6,Z),'#ffe2a0','none',0,'opacity=".18"')+poly(quad(C,M,X-w/2,X+w/2,h,h+.02),'#ffe2a0','none',0);return s;}
function shelf(C,Z,x0,x1,{h=2,levels=4,col='#6a5a4a',items='mixed'}={}){const M=PL.back(Z);let s=Dt.R?'':'';s+=poly(quad(C,M,x0,x1,0,h),shade(col,-.35),OL,1.6);
 const C1=['#d84a3a','#3a7ab8','#e8c040','#4aa86a','#8a5ad0','#e88a3a','#f0f0e8','#3a3a48'];
 for(let i=0;i<=levels;i++){const v=i*h/levels;s+=poly(quad(C,M,x0,x1,v,v+.04),col,OL,1);if(i===levels)break;
  let u=x0+.05;while(u<x1-.1){const kind=items==='mixed'?['box','book','bottle','can','jar'][Math.floor(rnd()*5)]:items;const c=C1[Math.floor(rnd()*C1.length)];
   if(kind==='book'){const w=R(.03,.06),hh=R(.18,.3)*h/levels*2.6;s+=poly(quad(C,M,u,u+w,v+.04,v+.04+Math.min(hh,h/levels-.06)),c,OL,.8);u+=w;}
   else if(kind==='box'){const w=R(.18,.32),hh=Math.min(R(.15,.3),h/levels-.06);s+=poly(quad(C,M,u,u+w,v+.04,v+.04+hh),'#b8946a',OL,1)+ln(P(C,u+w/2,v+.04+hh,Z),P(C,u+w/2,v+.04+hh*.5,Z),'#d8c090',2);u+=w+.03;}
   else if(kind==='bottle'){const w=.06,hh=Math.min(.28,h/levels-.06);const a=P(C,u+w/2,v+.04,Z),b=P(C,u+w/2,v+.04+hh,Z),k=C.k(Z)*C.U;s+=`<rect x="${f(a[0]-w*k/2)}" y="${f(b[1]+hh*k*.35)}" width="${f(w*k)}" height="${f(a[1]-b[1]-hh*k*.35)}" rx="2" fill="${['#3a6a3a','#6a3a2a','#c8b070','#2a4a6a'][Math.floor(rnd()*4)]}" stroke="${OL}" stroke-width=".8"/><rect x="${f(a[0]-w*k*.18)}" y="${f(b[1])}" width="${f(w*k*.36)}" height="${f(hh*k*.38)}" fill="#3a3a3a"/><rect x="${f(a[0]-w*k*.3)}" y="${f(a[1]-hh*k*.45)}" width="${f(w*k*.6)}" height="${f(hh*k*.18)}" fill="#f2ecd8" opacity=".85"/>`;u+=w+.03;}
   else {const w=.09,hh=Math.min(.14,h/levels-.06);s+=poly(quad(C,M,u,u+w,v+.04,v+.04+hh),kind==='can'?'#b8bcc4':'#d8e8e0',OL,.8)+poly(quad(C,M,u,u+w,v+.04+hh*.3,v+.04+hh*.7),c,'none',0);u+=w+.02;}}}
 s+=noise(dQ(quad(C,M,x0,x1,0,h)),{freq:.4,oct:2,op:.1});return s;}
function crate(C,X,Z,{w=.6,h=.5,d=.5,col='#b8946a'}={}){let s=S.box(C,{x0:X-w/2,x1:X+w/2,y0:0,y1:h,z0:Z,z1:Z+d},{front:col});const M=PL.back(Z);s+=poly(quad(C,M,X-.05,X+.05,0,h),'#d8c08a','none',0,'opacity=".7"');s+=ln(P(C,X-w/2,h*.5,Z),P(C,X+w/2,h*.5,Z),shade(col,-.3),1);return s;}
function dumpster(C,X,Z,{col='#3a6a5a'}={}){const b={x0:X-1,x1:X+1,y0:.15,y1:1.25,z0:Z,z1:Z+1.2};let s=S.box(C,b,{front:col});const M=PL.back(Z);
 for(let u=X-.8;u<X+.9;u+=.4)s+=ln(P(C,u,.2,Z-.01),P(C,u,1.2,Z-.01),shade(col,-.3),2);s+=poly(quad(C,M,X-1.05,X+1.05,1.2,1.32),shade(col,-.2),OL,1.4)+noise(dQ(quad(C,M,X-1,X+1,.15,1.25)),{freq:.1,oct:3,op:.3});
 for(const wx of [X-.8,X+.8]){const [x,y]=P(C,wx,.08,Z);s+=`<circle cx="${f(x)}" cy="${f(y)}" r="${f(.08*C.k(Z)*C.U)}" fill="#1a1a1e"/>`;}
 const t=P(C,X-.3,1.3,Z);s+=`<text x="${f(t[0])}" y="${f(t[1]+.5*C.k(Z)*C.U)}" font-family="DejaVu Sans" font-weight="bold" font-size="${f(.18*C.k(Z)*C.U)}" fill="#e8e0c0" opacity=".7">WASTE</text>`;return s;}
function trashBag(C,X,Z,{col='#2a2a30',r=.35}={}){const [x,y]=P(C,X,0,Z),k=C.k(Z)*C.U;return blurG(3*C.k(Z),`<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(r*1.1*k)}" ry="${f(r*.25*k)}" fill="#000" opacity=".5"/>`)+`<path d="M${f(x-r*k)},${f(y)} Q${f(x-r*1.1*k)},${f(y-r*1.5*k)} ${f(x-.05*k)},${f(y-r*1.7*k)} L${f(x-.12*k)},${f(y-r*2.1*k)} L${f(x+.12*k)},${f(y-r*2.1*k)} L${f(x+.05*k)},${f(y-r*1.7*k)} Q${f(x+r*1.1*k)},${f(y-r*1.5*k)} ${f(x+r*k)},${f(y)}Z" fill="${col}" stroke="#000" stroke-width="1.4"/><path d="M${f(x-r*.5*k)},${f(y-r*1.2*k)} q${f(r*.2*k)},${f(r*.3*k)} ${f(r*.1*k)},${f(r*.8*k)}" stroke="#6a6a78" stroke-width="2" fill="none" opacity=".7"/>`;}
function acUnit(C,X,Y,Z,{side=0}={}){const b={x0:X-.45,x1:X+.45,y0:Y,y1:Y+.55,z0:Z,z1:Z+.45};let s=S.box(C,b,{front:'#c8ccd0'},{noAO:1});const M=PL.back(Z);for(let u=X-.38;u<X+.4;u+=.06)s+=ln(P(C,u,Y+.06,Z-.01),P(C,u,Y+.5,Z-.01),'#7a7e86',1.2);const [x,y]=P(C,X+.15,Y+.28,Z-.01),k=C.k(Z)*C.U;s+=`<circle cx="${f(x)}" cy="${f(y)}" r="${f(.2*k)}" fill="#5a5e66" stroke="${OL}" stroke-width="1"/>`;return s;}
function fireEscape(C,X,z0,z1,levels=[2.6,5.2],{col='#2e2e36'}={}){let s='';for(const Y of levels){s+=poly([P(C,X,Y,z0),P(C,X+(X<0?1:-1)*.9,Y,z0),P(C,X+(X<0?1:-1)*.9,Y,z1),P(C,X,Y,z1)],shade(col,.1),OL,1.2);
  for(let z=z0;z<=z1;z+=.35){const a=P(C,X+(X<0?1:-1)*.9,Y,z),b=P(C,X+(X<0?1:-1)*.9,Y+1,z);s+=ln(a,b,col,1.6);}s+=ln(P(C,X+(X<0?1:-1)*.9,Y+1,z0),P(C,X+(X<0?1:-1)*.9,Y+1,z1),col,3);}
 s+=ln(P(C,X+(X<0?1:-1)*.7,levels[0],z1-.2),P(C,X+(X<0?1:-1)*.7,levels[1],z0+.3),col,4);return s;}
function puddle(C,X,Z,{w=1.4,col='#ff4fa8',col2='#5ab0ff'}={}){const [x,y]=P(C,X,0,Z),k=C.k(Z)*C.U;const g=id('pd');return `<defs><linearGradient id="${g}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${col}" stop-opacity=".55"/><stop offset="1" stop-color="${col2}" stop-opacity=".4"/></linearGradient></defs><ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(w*k*.5)}" ry="${f(w*k*.07)}" fill="url(#${g})"/><ellipse cx="${f(x-w*k*.1)}" cy="${f(y-1)}" rx="${f(w*k*.2)}" ry="${f(w*k*.015)}" fill="#fff" opacity=".5"/>`;}
function steam(C,X,Z,{h=1.5}={}){const [x,y]=P(C,X,0,Z),k=C.k(Z)*C.U;let s='';for(let i=0;i<6;i++){const yy=y-i*h/6*k;s+=`<circle cx="${f(x+Math.sin(i*1.3)*.15*k)}" cy="${f(yy)}" r="${f((.15+i*.05)*k)}" fill="#fff" opacity="${f(.22-i*.03)}"/>`;}return blurG(6,s);}
function graffiti(C,Z,X,Y,txt,{col='#3ac0e0',size=.5}={}){const [x,y]=P(C,X,Y,Z),k=C.k(Z)*C.U;return `<text x="${f(x)}" y="${f(y)}" text-anchor="middle" font-family="DejaVu Sans" font-weight="bold" font-style="italic" font-size="${f(size*k)}" fill="${col}" stroke="#1a1a20" stroke-width="${f(size*k*.06)}" opacity=".85" transform="rotate(-6 ${f(x)} ${f(y)})">${txt}</text>`;}
function graffitiSide(C,X,z,Y,txt,{col='#ffd24a',size=.6}={}){const [x,y]=P(C,X,Y,z),k=C.k(z)*C.U,sg=X<0?1:-1;return `<g transform="translate(${f(x)},${f(y)}) skewY(${sg*24}) scale(${f(.5)},1)"><text text-anchor="middle" font-family="DejaVu Sans" font-weight="bold" font-style="italic" font-size="${f(size*k)}" fill="${col}" stroke="#1a1a20" stroke-width="${f(size*k*.06)}" opacity=".8">${txt}</text></g>`;}
function windowBack(C,Z,X,Y,{w=1.2,h=1.3,frame='#e8e0d0',sky=['#2a3a6a','#8a6aa0'],curtains=null,lit=false}={}){const M=PL.back(Z);const g=id('wn');const a=P(C,X,Y+h,Z),b=P(C,X,Y,Z);let s=`<defs><linearGradient id="${g}" gradientUnits="userSpaceOnUse" x1="0" y1="${f(a[1])}" x2="0" y2="${f(b[1])}"><stop offset="0" stop-color="${sky[0]}"/><stop offset="1" stop-color="${sky[1]}"/></linearGradient></defs>`;
 s+=poly(quad(C,M,X-w/2-.08,X+w/2+.08,Y-.08,Y+h+.08),frame,OL,1.6)+poly(quad(C,M,X-w/2,X+w/2,Y,Y+h),`url(#${g})`,OL,1.2);
 s+=ln(P(C,X,Y,Z),P(C,X,Y+h,Z),frame,Math.max(2,.05*C.k(Z)*C.U))+ln(P(C,X-w/2,Y+h/2,Z),P(C,X+w/2,Y+h/2,Z),frame,Math.max(2,.05*C.k(Z)*C.U));
 s+=poly(quad(C,M,X-w/2+.08,X-w/2+.3,Y+h*.55,Y+h-.08),'#fff','none',0,'opacity=".25"');
 s+=poly(quad(C,M,X-w/2-.15,X+w/2+.15,Y-.14,Y-.06),shade(frame,-.1),OL,1);
 if(curtains)for(const sx of [-1,1]){const u0=sx<0?X-w/2-.25:X+w/2-.05,u1=u0+.3;s+=poly(quad(C,M,u0,u1,Y-.3,Y+h+.25),curtains,OL,1.2);for(let u=u0+.07;u<u1;u+=.08)s+=ln(P(C,u,Y-.3,Z),P(C,u,Y+h+.25,Z),shade(curtains,-.3),1.4,.7);}
 if(lit){const [fx,fy]=P(C,X,0,Z-1.5),k=C.k(Z-1.5)*C.U;s+=`<ellipse cx="${f(fx)}" cy="${f(fy)}" rx="${f(w*k*.7)}" ry="${f(.35*k)}" fill="${lit}" opacity=".18"/>`;}
 return s;}
function frame(C,Z,X,Y,{w=.6,h=.45,col='#3a2a1a',art=null}={}){const M=PL.back(Z);const art2=art??['#e8a040','#5a8ab0','#c84a5a','#6ab06a'][Math.floor(rnd()*4)];let s=poly(quad(C,M,X-w/2,X+w/2,Y,Y+h),col,OL,1.4)+poly(quad(C,M,X-w/2+.05,X+w/2-.05,Y+.05,Y+h-.05),'#f0e8d8','none',0);
 s+=poly(quad(C,M,X-w/2+.08,X+w/2-.08,Y+.08,Y+h*.45),art2,'none',0)+`<circle cx="${f(P(C,X+w*.15,Y+h*.65,Z)[0])}" cy="${f(P(C,X+w*.15,Y+h*.65,Z)[1])}" r="${f(.06*C.k(Z)*C.U)}" fill="#f2c64a"/>`;return s;}
function plant(C,X,Z,{h=1}={}){const [x,y]=P(C,X,0,Z),k=C.k(Z)*C.U;let s=blurG(3*C.k(Z),`<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(.3*k)}" ry="${f(.06*k)}" fill="#000" opacity=".4"/>`)+`<path d="M${f(x-.2*k)},${f(y-.4*k)} L${f(x+.2*k)},${f(y-.4*k)} L${f(x+.15*k)},${f(y)} L${f(x-.15*k)},${f(y)}Z" fill="#c8704a" stroke="${OL}" stroke-width="1.4"/><rect x="${f(x-.22*k)}" y="${f(y-.46*k)}" width="${f(.44*k)}" height="${f(.08*k)}" fill="#b8603a" stroke="${OL}" stroke-width="1.2"/>`;
 for(let i=0;i<9;i++){const a=-Math.PI/2+R(-1.1,1.1),L=R(.4,.75)*h*k;const ex=x+Math.cos(a)*L,ey=y-.45*k+Math.sin(a)*L;s+=`<path d="M${f(x)},${f(y-.45*k)} Q${f((x+ex)/2+R(-10,10))},${f((y-.45*k+ey)/2-10)} ${f(ex)},${f(ey)}" stroke="#3a7a3a" stroke-width="1.6" fill="none"/><ellipse cx="${f(ex)}" cy="${f(ey)}" rx="${f(.12*k)}" ry="${f(.05*k)}" fill="${['#4a9a4a','#5aaa5a','#3a8a3a'][i%3]}" stroke="${OL}" stroke-width="1" transform="rotate(${f(a*57)} ${f(ex)} ${f(ey)})"/>`;}return s;}
function rug(C,x0,x1,z0,z1,{col='#8a2a3a',col2='#e8c070'}={}){const M=PL.floor(.005);let s=poly(quad(C,M,x0,x1,z0,z1),col,OL,1.4)+poly(quad(C,M,x0+.15,x1-.15,z0+.15,z1-.15),'none',col2,2);
 s+=poly(quad(C,M,x0+.3,x1-.3,z0+.3,z1-.3),shade(col,.1),'none',0)+noise(dQ(quad(C,M,x0,x1,z0,z1)),{freq:.6,oct:2,op:.15});
 for(let u=x0;u<x1;u+=.08){s+=ln(P(C,u,0,z0),P(C,u,0,z0-.08),col2,1.2,.8);}return s;}
// table with cloth + tableware (restaurant)
function dinerTable(C,X,Z,{w=1.2,d=.8,cloth='#f2ece0',candle=true}={}){let s=S.table(C,X-w/2,X+w/2,Z,Z+d,.75,cloth,'#3a2a1a');
 const M=PL.back(Z);s+=poly(quad(C,M,X-w/2-.03,X+w/2+.03,.45,.75),cloth,OL,1.4);for(let u=X-w/2+.1;u<X+w/2;u+=.15)s+=ln(P(C,u,.47,Z),P(C,u,.73,Z),shade(cloth,-.15),1.2,.8);
 for(const px of [X-w*.25,X+w*.25]){const [x,y]=P(C,px,.76,Z+d*.5),k=C.k(Z)*C.U;s+=`<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(.14*k)}" ry="${f(.04*k)}" fill="#fff" stroke="${OL}" stroke-width="1"/><ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(.08*k)}" ry="${f(.022*k)}" fill="${['#d8703a','#7ab04a','#e8c070'][Math.floor(rnd()*3)]}"/>`;
  const g=P(C,px+.12,.76,Z+d*.3);s+=`<path d="M${f(g[0]-.03*k)},${f(g[1]-.2*k)} L${f(g[0]+.03*k)},${f(g[1]-.2*k)} L${f(g[0]+.02*k)},${f(g[1]-.1*k)} L${f(g[0])},${f(g[1]-.09*k)} L${f(g[0])},${f(g[1])}" stroke="#d8e8f0" stroke-width="1.4" fill="#8a2a3a" fill-opacity=".6"/>`;}
 if(candle){const [x,y]=P(C,X,.76,Z+d*.5),k=C.k(Z)*C.U;s+=`<rect x="${f(x-.015*k)}" y="${f(y-.12*k)}" width="${f(.03*k)}" height="${f(.12*k)}" fill="#f2ecd8"/>`+glow(x,y-.15*k,.5*k,'#ffb050',.6)+`<ellipse cx="${f(x)}" cy="${f(y-.15*k)}" rx="${f(.012*k)}" ry="${f(.03*k)}" fill="#ffe080"/>`;}
 return s;}
function chair(C,X,Z,{col='#5a3a2a',back=true}={}){let s=S.box(C,{x0:X-.22,x1:X+.22,y0:.42,y1:.47,z0:Z,z1:Z+.42},{front:col},{noAO:1});for(const lx of [X-.19,X+.19])s+=S.box(C,{x0:lx-.02,x1:lx+.02,y0:0,y1:.42,z0:Z+.02,z1:Z+.06},{front:shade(col,-.2)},{noAO:1});
 if(back)s+=S.box(C,{x0:X-.22,x1:X+.22,y0:.47,y1:.95,z0:Z+.38,z1:Z+.42},{front:col},{noAO:1})+poly(quad(C,PL.back(Z+.379),X-.15,X+.15,.6,.85),shade(col,-.15),OL,1);return s;}
// ---------- stage ----------
function speakerStack(C,X,Z,{n=2}={}){let s='';for(let i=0;i<n;i++){const y0=i*.75;s+=S.box(C,{x0:X-.45,x1:X+.45,y0,y1:y0+.73,z0:Z,z1:Z+.6},{front:'#1e1e24'});const M=PL.back(Z);s+=poly(quad(C,M,X-.4,X+.4,y0+.05,y0+.68),'#2a2a32',OL,1)+noise(dQ(quad(C,M,X-.4,X+.4,y0+.05,y0+.68)),{freq:1.2,oct:1,op:.3});
  for(const [cy,r] of [[y0+.45,.17],[y0+.16,.08]]){const [x,y]=P(C,X,cy,Z-.01),k=C.k(Z)*C.U;s+=`<circle cx="${f(x)}" cy="${f(y)}" r="${f(r*k)}" fill="#111" stroke="#3a3a44" stroke-width="2"/><circle cx="${f(x)}" cy="${f(y)}" r="${f(r*.35*k)}" fill="#2a2a32"/><circle cx="${f(x-r*.3*k)}" cy="${f(y-r*.3*k)}" r="${f(r*.15*k)}" fill="#fff" opacity=".15"/>`;}}return s;}
function truss(C,Z,x0,x1,Y,{col='#9aa0a8'}={}){let s='';const a=P(C,x0,Y,Z),b=P(C,x1,Y,Z),c=P(C,x0,Y+.35,Z),d=P(C,x1,Y+.35,Z);s+=ln(a,b,col,3)+ln(c,d,col,3);for(let X=x0;X<x1;X+=.35){s+=ln(P(C,X,Y,Z),P(C,X+.35,Y+.35,Z),col,1.6)+ln(P(C,X,Y,Z),P(C,X,Y+.35,Z),col,1.4);}return s;}
function beam(C,X,Y,Z,tx,tz,{col='#b48aff',w=.6}={}){const a=P(C,X,Y,Z),b0=P(C,tx-w,0,tz),b1=P(C,tx+w,0,tz);const g=id('bm');return `<defs><linearGradient id="${g}" gradientUnits="userSpaceOnUse" x1="${f(a[0])}" y1="${f(a[1])}" x2="${f((b0[0]+b1[0])/2)}" y2="${f(b0[1])}"><stop offset="0" stop-color="${col}" stop-opacity=".55"/><stop offset="1" stop-color="${col}" stop-opacity="0"/></linearGradient></defs><path d="M${f(a[0])},${f(a[1])} L${f(b0[0])},${f(b0[1])} L${f(b1[0])},${f(b1[1])}Z" fill="url(#${g})"/>`+glow(a[0],a[1],30,col,.8)+`<circle cx="${f(a[0])}" cy="${f(a[1])}" r="7" fill="#fff"/>`;}
function drumKit(C,X,Z){let s='';const k=C.k(Z)*C.U;const [x,y]=P(C,X,0,Z);
 const drum=(dx,dy,r,h,c)=>{const cx=x+dx*k,cy=y-dy*k;return `<rect x="${f(cx-r*k)}" y="${f(cy-h*k)}" width="${f(2*r*k)}" height="${f(h*k)}" fill="${c}" stroke="${OL}" stroke-width="1.4"/><ellipse cx="${f(cx)}" cy="${f(cy-h*k)}" rx="${f(r*k)}" ry="${f(r*.3*k)}" fill="#e8e4dc" stroke="${OL}" stroke-width="1.4"/><ellipse cx="${f(cx)}" cy="${f(cy)}" rx="${f(r*k)}" ry="${f(r*.3*k)}" fill="${shade(c,-.3)}" stroke="${OL}" stroke-width="1.2"/>`;};
 s+=blurG(4,`<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(1*k)}" ry="${f(.15*k)}" fill="#000" opacity=".5"/>`);
 for(const [dx,yy,r] of [[-.8,1.1,.22],[.85,1.2,.24]]){s+=ln([x+dx*k,y],[x+dx*k,y-yy*k],'#aab',2)+`<ellipse cx="${f(x+dx*k)}" cy="${f(y-yy*k)}" rx="${f(r*k)}" ry="${f(r*.15*k)}" fill="#e2b84a" stroke="${OL}" stroke-width="1.2"/>`;}
 s+=`<circle cx="${f(x)}" cy="${f(y-.3*k)}" r="${f(.3*k)}" fill="#b8303a" stroke="${OL}" stroke-width="1.6"/><circle cx="${f(x)}" cy="${f(y-.3*k)}" r="${f(.23*k)}" fill="#f0ece0" stroke="${OL}" stroke-width="1"/><text x="${f(x)}" y="${f(y-.26*k)}" text-anchor="middle" font-family="DejaVu Sans" font-weight="bold" font-size="${f(.09*k)}" fill="#b8303a">IYA</text>`;
 s+=drum(-.35,.55,.15,.12,'#b8303a')+drum(.35,.58,.14,.12,'#b8303a')+drum(-.55,.0,.0,.0,'#000')+drum(.6,.3,.18,.3,'#b8303a');return s;}
function amp(C,X,Z){let s=S.box(C,{x0:X-.35,x1:X+.35,y0:0,y1:.6,z0:Z,z1:Z+.3},{front:'#2a2224'});const M=PL.back(Z);s+=poly(quad(C,M,X-.3,X+.3,.05,.42),'#3a3436',OL,1)+noise(dQ(quad(C,M,X-.3,X+.3,.05,.42)),{freq:1.2,oct:1,op:.3})+poly(quad(C,M,X-.32,X+.32,.46,.56),'#c8b070',OL,1);
 for(let i=0;i<5;i++){const [x,y]=P(C,X-.25+i*.12,.51,Z-.01);s+=`<circle cx="${f(x)}" cy="${f(y)}" r="${f(Math.max(1.4,.02*C.k(Z)*C.U))}" fill="#2a2a2a"/>`;}return s;}
function micStand(C,X,Z,{h=1.5}={}){const [x,y]=P(C,X,0,Z),t=P(C,X,h,Z),k=C.k(Z)*C.U;return ln([x-.2*k,y],[x,y-.08*k],'#2a2a2e',3)+ln([x+.2*k,y],[x,y-.08*k],'#2a2a2e',3)+ln([x,y],[x,t[1]],'#3a3a40',Math.max(2,.025*k))+`<ellipse cx="${f(x+.05*k)}" cy="${f(t[1]-.05*k)}" rx="${f(.05*k)}" ry="${f(.08*k)}" fill="#5a5a60" stroke="${OL}" stroke-width="1.2" transform="rotate(30 ${f(x+.05*k)} ${f(t[1]-.05*k)})"/>`;}
function ledScreen(C,Z,x0,x1,y0,y1,{a='#5a2aa8',b='#ff3fa0',txt=''}={}){const M=PL.back(Z);const q=quad(C,M,x0,x1,y0,y1);const g=id('ld');let s=`<defs><linearGradient id="${g}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs>`+poly(q,`url(#${g})`,'#111',4);
 for(let u=x0;u<x1;u+=.1)s+=ln(P(C,u,y0,Z),P(C,u,y1,Z),'#000',1,.25);for(let v=y0;v<y1;v+=.1)s+=ln(P(C,x0,v,Z),P(C,x1,v,Z),'#000',1,.25);
 if(txt){const [x,y]=P(C,(x0+x1)/2,(y0+y1)/2-.2,Z),k=C.k(Z)*C.U;s+=`<text x="${f(x)}" y="${f(y)}" text-anchor="middle" font-family="DejaVu Sans" font-weight="bold" font-size="${f(.7*k)}" fill="#fff" opacity=".9">${txt}</text>`;}return s+glow(P(C,(x0+x1)/2,(y0+y1)/2,Z)[0],P(C,(x0+x1)/2,(y0+y1)/2,Z)[1],(x1-x0)*C.k(Z)*C.U*.6,b,.25);}
// crowd silhouettes seen from behind with raised phones
function crowdBack(C,x0,x1,z0,z1,n,{lit='#ff6ab0'}={}){const cg=id('cg');let s=`<defs><linearGradient id="${cg}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${lit}" stop-opacity=".55"/><stop offset=".35" stop-color="${lit}" stop-opacity=".12"/><stop offset="1" stop-color="#000" stop-opacity=".35"/></linearGradient></defs>`;const HC=['#2a1a14','#5a3a24','#1a1a1a','#8a5a2a','#c84a3a','#3a6ab0','#e8c040'];const items=[];for(let i=0;i<n;i++)items.push([R(x0,x1),R(z0,z1)]);items.sort((a,b)=>b[1]-a[1]);
 for(const [X,Z] of items){const [x,y]=P(C,X,0,Z),k=C.k(Z)*C.U,hh=R(1.6,1.85),c=shade('#2a2238',R(-.2,.15));const ty=y-hh*k;
  s+=`<path d="M${f(x-.2*k)},${f(y)} L${f(x-.25*k)},${f(ty+.55*k)} Q${f(x-.27*k)},${f(ty+.36*k)} ${f(x-.12*k)},${f(ty+.32*k)} L${f(x+.12*k)},${f(ty+.32*k)} Q${f(x+.27*k)},${f(ty+.36*k)} ${f(x+.25*k)},${f(ty+.55*k)} L${f(x+.2*k)},${f(y)}Z" fill="${c}"/><path d="M${f(x-.25*k)},${f(ty+.5*k)} L${f(x-.27*k)},${f(ty+1.05*k)} M${f(x+.25*k)},${f(ty+.5*k)} L${f(x+.27*k)},${f(ty+1.05*k)}" stroke="${shade(c,-.3)}" stroke-width="${f(Math.max(1,.02*k))}"/><path d="M${f(x-.24*k)},${f(y)} L${f(x-.26*k)},${f(ty+.35*k)} Q${f(x)},${f(ty+.25*k)} ${f(x+.26*k)},${f(ty+.35*k)} L${f(x+.24*k)},${f(y)}Z" fill="url(#${cg})"/><circle cx="${f(x)}" cy="${f(ty+.12*k)}" r="${f(.13*k)}" fill="${c}"/>${rnd()<.6?`<path d="M${f(x-.14*k)},${f(ty+.1*k)} Q${f(x)},${f(ty-.08*k)} ${f(x+.14*k)},${f(ty+.1*k)}Z" fill="${HC[Math.floor(rnd()*HC.length)]}"/>`:''}<path d="M${f(x-.12*k)},${f(ty+.04*k)} Q${f(x)},${f(ty-.03*k)} ${f(x+.12*k)},${f(ty+.04*k)}" stroke="${lit}" stroke-width="${f(Math.max(1,.02*k))}" fill="none" opacity=".8"/><path d="M${f(x-.26*k)},${f(ty+.38*k)} Q${f(x)},${f(ty+.3*k)} ${f(x+.26*k)},${f(ty+.38*k)}" stroke="${lit}" stroke-width="${f(Math.max(1,.025*k))}" fill="none" opacity=".7"/>`;
  if(rnd()<.25){const sx=rnd()<.5?-1:1;s+=ln([x+sx*.2*k,ty+.4*k],[x+sx*.35*k,ty-.15*k],c,Math.max(2,.08*k))+`<rect x="${f(x+sx*.35*k-.04*k)}" y="${f(ty-.28*k)}" width="${f(.08*k)}" height="${f(.14*k)}" rx="2" fill="#bfe8ff"/>`+glow(x+sx*.35*k,ty-.2*k,.25*k,'#bfe8ff',.6);}}
 return s;}
// ---------- night city ----------
function skyline(C,{n=26,col='#1a1a34',win='#ffd890',base=null}={}){let s='';const by=base??C.Hz+20;for(let i=0;i<n;i++){const x=R(-40,W),w=R(60,170),h=R(80,380),c=shade(col,R(-.15,.2));s+=`<rect x="${f(x)}" y="${f(by-h)}" width="${f(w)}" height="${f(h+40)}" fill="${c}" stroke="#0e0e1e" stroke-width="1.4"/>`;
  if(rnd()<.35)s+=`<rect x="${f(x+w*.4)}" y="${f(by-h-R(10,40))}" width="3" height="${f(R(10,40))}" fill="#3a3a54"/><circle cx="${f(x+w*.4+1.5)}" cy="${f(by-h-R(10,40))}" r="2.5" fill="#ff4a4a"/>`;
  for(let yy=by-h+10;yy<by-6;yy+=14)for(let xx=x+7;xx<x+w-8;xx+=12)if(rnd()<.42)s+=`<rect x="${f(xx)}" y="${f(yy)}" width="6" height="8" fill="${rnd()<.8?win:'#9ac8ff'}" opacity="${f(R(.45,.95))}"/>`;}
 return s;}
function nightSky(C,{top='#0a0c24',bottom='#3a2a5a',stars=180,moon=[1500,150],clouds=true}={}){const g=id('ns');let s=`<defs><linearGradient id="${g}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${top}"/><stop offset="${f(C.Hz/H)}" stop-color="${bottom}"/><stop offset="1" stop-color="${bottom}"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#${g})"/>`;
 for(let i=0;i<stars;i++){const x=R(0,W),y=R(0,C.Hz*.95),r=R(.6,2.2);s+=`<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="#fff" opacity="${f(R(.3,1)*(1-y/C.Hz*.6))}"/>`;}
 {const mw=id('mw'),cl=id('cl');s+=`<defs><filter id="${mw}" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".004 .02" numOctaves="4" seed="7"/><feColorMatrix values="0 0 0 0 .8  0 0 0 0 .75  0 0 0 0 1  0 0 0 1.6 -.75"/></filter><linearGradient id="${cl}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity="1"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient><mask id="${cl}m"><rect width="${W}" height="${H}" fill="url(#${cl})"/></mask></defs><g mask="url(#${cl}m)" opacity=".55"><rect width="${W}" height="${f(C.Hz)}" filter="url(#${mw})"/></g>`;
  for(let i=0;i<120;i++){const t=rnd(),x=t*W,y=t*C.Hz*.9+R(-90,90);s+=`<circle cx="${f(x)}" cy="${f(y)}" r="${f(R(.5,1.6))}" fill="#fff" opacity="${f(R(.3,.9))}"/>`;}
  if(clouds)s+=noise(`M0,0 L${W},0 L${W},${f(C.Hz)} L0,${f(C.Hz)}Z`,{freq:.012,oct:3,op:.12,dark:'#fff'});}
 if(moon){s+=glow(moon[0],moon[1],260,'#c8d8ff',.35)+`<circle cx="${moon[0]}" cy="${moon[1]}" r="52" fill="#f2f0e2"/><circle cx="${moon[0]-14}" cy="${moon[1]-10}" r="9" fill="#d8d4c4"/><circle cx="${moon[0]+16}" cy="${moon[1]+14}" r="6" fill="#d8d4c4"/><circle cx="${moon[0]+6}" cy="${moon[1]-22}" r="4" fill="#d8d4c4"/>`;}
 return s;}
function waterTank(C,X,Z,{Y=0}={}){const [x,y]=P(C,X,Y,Z),k=C.k(Z)*C.U;let s='';for(const dx of [-.7,.7])s+=ln([x+dx*k,y],[x+dx*.8*k,y-2.2*k],'#3a2a24',Math.max(2,.08*k));s+=ln([x-.7*k,y-.8*k],[x+.7*k,y-1.6*k],'#3a2a24',2)+ln([x+.7*k,y-.8*k],[x-.7*k,y-1.6*k],'#3a2a24',2);
 s+=`<rect x="${f(x-.9*k)}" y="${f(y-4*k)}" width="${f(1.8*k)}" height="${f(1.8*k)}" fill="#6a4a36" stroke="${OL}" stroke-width="2"/>`;for(let i=1;i<9;i++)s+=ln([x-.9*k+i*.2*k,y-4*k],[x-.9*k+i*.2*k,y-2.2*k],'#4a3226',1.4);
 for(const yy of [2.5,3.2,3.8])s+=ln([x-.92*k,y-yy*k],[x+.92*k,y-yy*k],'#2a2a2e',Math.max(2,.05*k));
 s+=`<path d="M${f(x-1*k)},${f(y-4*k)} L${f(x)},${f(y-4.8*k)} L${f(x+1*k)},${f(y-4*k)}Z" fill="#4a3428" stroke="${OL}" stroke-width="2"/>`;return s;}
function vent(C,X,Z,{Y=0}={}){let s=S.box(C,{x0:X-.25,x1:X+.25,y0:Y,y1:Y+.7,z0:Z,z1:Z+.5},{front:'#8a8e96'});const [x,y]=P(C,X,Y+.9,Z+.25),k=C.k(Z)*C.U;s+=`<path d="M${f(x-.35*k)},${f(y+.1*k)} Q${f(x)},${f(y-.25*k)} ${f(x+.35*k)},${f(y+.1*k)}Z" fill="#9aa0a8" stroke="${OL}" stroke-width="1.4"/>`;return s;}

module.exports={PL,quad,gradFill,brick,plaster,concrete,wallpaper,foam,woodFloor,tileFloor,concreteFloor,room,bulb,pendant,neon,stringLights,pipeBack,pipeSide,pipeV,door,shelf,crate,dumpster,trashBag,acUnit,fireEscape,puddle,steam,graffiti,graffitiSide,windowBack,frame,plant,rug,dinerTable,chair,speakerStack,truss,beam,drumKit,amp,micStand,ledScreen,crowdBack,skyline,nightSky,waterTank,vent};
