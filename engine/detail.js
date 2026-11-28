// IYA2D detail kit: reusable materials and props for DETAILED locations.
// Every builder works in metres through the stage camera C (one perspective), returns SVG.
// Rule: no large single-colour areas — every surface = base gradient + texture + mid detail + small props + light/shadow.
const S=require('./stage.js');const {poly,shade,blurG,glow,f}=S;
const W=1920,H=1080,OL='#3a2c3a';
let seed=1;const rnd=()=>{seed=(seed*16807)%2147483647;return (seed-1)/2147483646;};const srand=v=>{seed=v||1;};
const R=(a,b)=>a+(b-a)*rnd();
let nid=0;const id=p=>p+'d'+(nid++).toString(36);
const P=(C,X,Y,Z)=>C.P(X,Y,Z);
const pts=a=>a.map(p=>f(p[0])+','+f(p[1])).join(' ');

// ---------- texture overlays (noise clipped to a shape) ----------
function noise(d,{freq=.9,oct=3,op=.18,dark='#000',seedN=3,clipD}={}){const fi=id('nz'),ci=id('nc');
 return `<defs><filter id="${fi}" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="${freq}" numOctaves="${oct}" seed="${seedN}"/><feColorMatrix values="0 0 0 0 ${dark==='#000'?0:1} 0 0 0 0 ${dark==='#000'?0:1} 0 0 0 0 ${dark==='#000'?0:1} 0 0 0 1.4 -.55"/></filter><clipPath id="${ci}"><path d="${clipD??d}"/></clipPath></defs><g clip-path="url(#${ci})" opacity="${op}"><rect width="${W}" height="${H}" filter="url(#${fi})"/></g>`;}
const quadD=(C,a)=>'M'+a.map(p=>{const q=P(C,...p);return f(q[0])+','+f(q[1]);}).join(' L')+'Z';
const floorQ=(C,x0,x1,z0,z1,Y=0)=>[[x0,Y,z0],[x1,Y,z0],[x1,Y,z1],[x0,Y,z1]];
// depth-graded fill for a ground quad: near colour -> far colour (atmospheric)
function groundGrad(C,q,near,far){const g=id('gg');const yN=P(C,...q[0])[1],yF=P(C,...q[2])[1];
 return `<defs><linearGradient id="${g}" gradientUnits="userSpaceOnUse" x1="0" y1="${f(yN)}" x2="0" y2="${f(yF)}"><stop offset="0" stop-color="${near}"/><stop offset="1" stop-color="${far}"/></linearGradient></defs><path d="${quadD(C,q)}" fill="url(#${g})"/>`;}

// ---------- sky ----------
function sky(C,{top='#6fb6ef',bottom='#fbe9cf',sun=null,clouds=7,cloudCol='#ffffff'}={}){const g=id('sk');let s=`<defs><linearGradient id="${g}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${top}"/><stop offset="${f(C.Hz/H)}" stop-color="${bottom}"/><stop offset="1" stop-color="${bottom}"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#${g})"/>`;
 s+=noise(`M0,0 L${W},0 L${W},${f(C.Hz)} L0,${f(C.Hz)}Z`,{freq:.01,oct:3,op:.07,dark:'#fff'});
 if(sun){s+=glow(sun[0],sun[1],420,'#fff4c8',.55)+glow(sun[0],sun[1],160,'#ffffff',.7)+`<circle cx="${sun[0]}" cy="${sun[1]}" r="46" fill="#fffbea"/>`;}
 for(let i=0;i<clouds;i++){const cx=R(80,W-80),cy=R(60,C.Hz*.62),w=R(160,380),hh=w*R(.22,.32);let c='';
  const n=5+Math.floor(rnd()*4);for(let k=0;k<n;k++){const bx=cx-w/2+w*(k+.5)/n,br=hh*R(.55,1)*(1-Math.abs(k-(n-1)/2)/n*.8);c+=`<circle cx="${f(bx)}" cy="${f(cy-br*.35)}" r="${f(br)}"/>`;}
  s+=`<g opacity="${f(R(.65,.92))}"><g fill="${shade(cloudCol,-.12)}" transform="translate(0,${f(hh*.18)})">${c}<rect x="${f(cx-w/2)}" y="${f(cy-hh*.3)}" width="${f(w)}" height="${f(hh*.55)}" rx="${f(hh*.27)}"/></g><g fill="${cloudCol}">${c}</g></g>`;}
 {const hz=id('hz');s+=`<defs><linearGradient id="${hz}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${bottom}" stop-opacity="0"/><stop offset="1" stop-color="${bottom}" stop-opacity=".8"/></linearGradient></defs><rect y="${f(C.Hz-120)}" width="${W}" height="125" fill="url(#${hz})"/>`;}
 return s;}
// distant hills with atmospheric perspective; layers far->near
function hills(C,layers=[['#a8c6c8',.08,40],['#8fb79a',.14,26],['#79a86e',.2,18]],{trees=true}={}){let s='';
 layers.forEach(([col,amp,z],li)=>{const base=C.Hz+4;let d=`M0,${H} L0,${f(base)}`;const n=9;const ys=[];
  for(let i=0;i<=n;i++){const x=i/n*W,y=base-amp*C.U*4/z*(0.45+.55*Math.sin(i*1.7+li*2.1)**2)-R(0,8);ys.push([x,y]);}
  d+=` L${f(ys[0][0])},${f(ys[0][1])}`;for(let i=1;i<ys.length;i++){const [x0,y0]=ys[i-1],[x1,y1]=ys[i];d+=` Q${f((x0+x1)/2)},${f(Math.min(y0,y1)-6)} ${f(x1)},${f(y1)}`;}d+=` L${W},${H}Z`;
  s+=`<path d="${d}" fill="${col}"/>`+noise(d,{freq:.02+li*.01,oct:2,op:.12});
  if(trees&&li>0)for(let i=0;i<26;i++){const x=R(0,W);let y=base;for(let k=1;k<ys.length;k++)if(ys[k][0]>=x){const t=(x-ys[k-1][0])/(ys[k][0]-ys[k-1][0]);y=ys[k-1][1]+(ys[k][1]-ys[k-1][1])*t;break;}
   const r=R(6,12)*(1+li*.4);s+=`<circle cx="${f(x)}" cy="${f(y-r*.4)}" r="${f(r)}" fill="${shade(col,-.22)}"/><circle cx="${f(x-r*.3)}" cy="${f(y-r*.65)}" r="${f(r*.55)}" fill="${shade(col,-.05)}"/>`;}});
 return s;}

// ---------- grass field ----------
function grass(C,x0,x1,z0,z1,{near='#7fb04e',far='#b9d08a',tufts=260,flowers=40,patches=40}={}){const q=floorQ(C,x0,x1,z0,z1);let s=groundGrad(C,q,near,far);const d=quadD(C,q);
 s+=noise(d,{freq:.02,oct:2,op:.1})+noise(d,{freq:.5,oct:2,op:.08});
 for(let i=0;i<patches;i++){const X=R(x0,x1),Z=R(z0,Math.min(z1,z0+30)),[x,y]=P(C,X,0,Z),k=C.k(Z);s+=`<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(R(40,140)*k)}" ry="${f(R(8,26)*k)}" fill="${shade(near,R(-.18,.14))}" opacity=".55"/>`;}
 for(let i=0;i<tufts;i++){const Z=z0+Math.pow(rnd(),1.8)*Math.min(14,z1-z0),X=R(x0,x1),[x,y]=P(C,X,0,Z),k=C.k(Z)*C.U/100;if(x<-20||x>W+20)continue;const h=R(10,22)*k,c=shade(near,R(-.3,.05));
  let t='';for(let b=0;b<7;b++){const a=R(-.6,.6);t+=`M${f(x+b*2.2*k-4*k)},${f(y)} q${f(a*h*.4)},${f(-h*.6)} ${f(a*h)},${f(-h)}`;}s+=`<path d="${t}" stroke="${c}" stroke-width="${f(Math.max(1,1.6*k))}" fill="none" stroke-linecap="round"/>`;}
 const FC=['#fff6e0','#ffd24a','#ff8fb0','#b9a0ff'];for(let i=0;i<flowers;i++){const Z=z0+Math.pow(rnd(),1.5)*Math.min(12,z1-z0),X=R(x0,x1),[x,y]=P(C,X,.05,Z),k=C.k(Z)*C.U/100;s+=`<circle cx="${f(x)}" cy="${f(y)}" r="${f(Math.max(1.2,2.6*k))}" fill="${FC[i%4]}"/>`;}
 return s;}
function dirt(C,x0,x1,z0,z1,{col='#b99668',ruts=true}={}){const q=floorQ(C,x0,x1,z0,z1);let s=groundGrad(C,q,shade(col,-.08),shade(col,.18));const d=quadD(C,q);s+=noise(d,{freq:.08,oct:3,op:.3})+noise(d,{freq:.8,oct:2,op:.12});
 if(ruts)for(const xx of [x0+(x1-x0)*.28,x0+(x1-x0)*.72]){const a=P(C,xx,0,z0),b=P(C,xx,0,z1);s+=`<path d="M${f(a[0])},${f(a[1])} L${f(b[0])},${f(b[1])}" stroke="${shade(col,-.25)}" stroke-width="${f(22*C.k(z0))}" stroke-linecap="round" opacity=".35"/>`;}
 for(let i=0;i<90;i++){const Z=R(z0,Math.min(z1,z0+18)),X=R(x0,x1),[x,y]=P(C,X,0,Z),k=C.k(Z);s+=`<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(R(2,6)*k)}" ry="${f(R(1.2,3)*k)}" fill="${shade(col,R(-.35,.2))}"/>`;}
 return s;}

// ---------- road ----------
function road(C,x0,x1,z0,z1,{lanes=2,col='#5a5b63'}={}){const q=floorQ(C,x0,x1,z0,z1);let s=groundGrad(C,q,shade(col,-.06),shade(col,.22));const d=quadD(C,q);
 s+=noise(d,{freq:.9,oct:2,op:.22})+noise(d,{freq:.04,oct:3,op:.18});
 // repair patches, oil stains, tyre wear
 for(let i=0;i<7;i++){const Z=R(z0+.5,z0+22),X=R(x0+.5,x1-1.5),w=R(.8,2.2),l=R(.6,2);s+=poly([P(C,X,0,Z),P(C,X+w,0,Z),P(C,X+w,0,Z+l),P(C,X,0,Z+l)].map(p=>p),shade(col,R(-.12,.08)),'none',0,'opacity=".7"');}
 for(let i=0;i<6;i++){const Z=R(z0+.5,z0+14),X=R(x0+.4,x1-.4),[x,y]=P(C,X,0,Z),k=C.k(Z);s+=`<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(R(30,70)*k)}" ry="${f(R(6,12)*k)}" fill="#2a2a30" opacity=".35"/>`;}
 const lw=(x1-x0)/lanes;for(let l=0;l<lanes;l++){for(const off of [.3,.7]){const X=x0+lw*(l+off),a=P(C,X,0,z0),b=P(C,X,0,z1);s+=`<path d="M${f(a[0])},${f(a[1])} L${f(b[0])},${f(b[1])}" stroke="#2c2c33" stroke-width="${f(26*C.k(z0))}" opacity=".18"/>`;}}
 // cracks
 for(let i=0;i<10;i++){const Z=R(z0+.3,z0+10),X=R(x0+.3,x1-.3);let [x,y]=P(C,X,0,Z);const k=C.k(Z);let c=`M${f(x)},${f(y)}`;for(let j=0;j<5;j++){x+=R(-24,24)*k;y+=R(-5,5)*k;c+=` L${f(x)},${f(y)}`;}s+=`<path d="${c}" stroke="#2a2a30" stroke-width="${f(Math.max(1,2*k))}" fill="none" opacity=".55"/>`;}
 // markings: edge lines + dashed centre lines (perspective-correct dashes)
 for(const X of [x0+.18,x1-.18]){s+=poly([P(C,X-.07,0,z0),P(C,X+.07,0,z0),P(C,X+.07,0,z1),P(C,X-.07,0,z1)],'#ece8dc','none',0,'opacity=".9"');}
 for(let l=1;l<lanes;l++){const X=x0+lw*l;for(let Z=z0+.2;Z<z1;Z+=6){s+=poly([P(C,X-.07,.001,Z),P(C,X+.07,.001,Z),P(C,X+.07,.001,Z+3),P(C,X-.07,.001,Z+3)],l===lanes/2?'#f2c43a':'#ece8dc','none',0);}}
 s+=noise(d,{freq:1.4,oct:1,op:.12});
 // manhole + drain
 {const Z=z0+3.2,X=x0+lw*.5;const [x,y]=P(C,X,0,Z),k=C.k(Z)*C.U;s+=`<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(.36*k)}" ry="${f(.36*k*.22)}" fill="#3a3a40" stroke="#26262c" stroke-width="2"/><ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(.27*k)}" ry="${f(.27*k*.22)}" fill="none" stroke="#6a6a72" stroke-width="1.5"/>`;}
 // puddle with sky reflection
 {const Z=z0+5.5,X=x1-lw*.6;const [x,y]=P(C,X,0,Z),k=C.k(Z)*C.U;s+=`<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(.9*k)}" ry="${f(.9*k*.16)}" fill="#9ec4e6" opacity=".55"/><ellipse cx="${f(x-.2*k)}" cy="${f(y-.03*k)}" rx="${f(.4*k)}" ry="${f(.04*k)}" fill="#fff" opacity=".45"/>`;}
 return s;}
// curb (top + front face) and sidewalk with tiles
function curb(C,X,z0,z1,side=1,{h=.15,col='#c9c4ba'}={}){let s='';const x2=X+side*.25;
 s+=poly([P(C,X,h,z0),P(C,x2,h,z0),P(C,x2,h,z1),P(C,X,h,z1)],shade(col,.12),'none',0);
 s+=poly([P(C,X,0,z0),P(C,X,h,z0),P(C,X,h,z1),P(C,X,0,z1)],shade(col,-.22),'none',0);
 for(let Z=z0;Z<z1;Z+=1){const a=P(C,X,0,Z),b=P(C,X,h,Z);s+=`<path d="M${f(a[0])},${f(a[1])} L${f(b[0])},${f(b[1])}" stroke="${shade(col,-.4)}" stroke-width="1" opacity=".6"/>`;}
 return s;}
function sidewalk(C,x0,x1,z0,z1,{h=.15,col='#d8d2c6',tile=.6}={}){const q=floorQ(C,x0,x1,z0,z1,h);let s=groundGrad(C,q,shade(col,-.04),shade(col,.12));const d=quadD(C,q);s+=noise(d,{freq:.6,oct:2,op:.12});
 for(let X=x0;X<=x1+1e-6;X+=tile){const a=P(C,X,h,z0),b=P(C,X,h,z1);s+=`<path d="M${f(a[0])},${f(a[1])} L${f(b[0])},${f(b[1])}" stroke="${shade(col,-.28)}" stroke-width="1.2" opacity=".7"/>`;}
 for(let Z=z0;Z<=z1;Z+=tile){if(C.k(Z)<.04)break;const a=P(C,x0,h,Z),b=P(C,x1,h,Z);s+=`<path d="M${f(a[0])},${f(a[1])} L${f(b[0])},${f(b[1])}" stroke="${shade(col,-.28)}" stroke-width="${f(Math.max(.6,1.4*C.k(Z)))}" opacity=".7"/>`;}
 for(let i=0;i<14;i++){const Z=R(z0,z0+10),X=R(x0,x1),[x,y]=P(C,X,h,Z),k=C.k(Z);s+=`<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(R(10,30)*k)}" ry="${f(R(3,7)*k)}" fill="${shade(col,-.15)}" opacity=".5"/>`;}
 return s;}

// ---------- materials on vertical planes ----------
// vertical wood planks on a back wall (facing camera) at depth Z
function planksBack(C,Z,x0,x1,y0,y1,col,{w=.22,gap=true}={}){let s=S.rectBack(C,Z,x0,x1,y0,y1,col,'#2a1a1a',2);
 for(let X=x0,i=0;X<x1-1e-6;X+=w,i++){const c=shade(col,((i*37)%7-3)*.03);s+=poly([P(C,X,y0,Z),P(C,Math.min(x1,X+w),y0,Z),P(C,Math.min(x1,X+w),y1,Z),P(C,X,y1,Z)],c,'none',0);
  const a=P(C,X,y0,Z),b=P(C,X,y1,Z);s+=`<path d="M${f(a[0])},${f(a[1])} L${f(b[0])},${f(b[1])}" stroke="${shade(col,-.45)}" stroke-width="${f(2.2*C.k(Z))}"/>`;
  for(let g=0;g<3;g++){const gx=X+w*R(.2,.8),gy0=R(y0,y1-1),gy1=gy0+R(.6,1.6);const p0=P(C,gx,gy0,Z),p1=P(C,gx+R(-.02,.02),Math.min(y1,gy1),Z);s+=`<path d="M${f(p0[0])},${f(p0[1])} Q${f(p0[0]+R(-3,3))},${f((p0[1]+p1[1])/2)} ${f(p1[0])},${f(p1[1])}" stroke="${shade(col,-.3)}" stroke-width="1" opacity=".55" fill="none"/>`;}
  if(rnd()<.3){const [kx,ky]=P(C,X+w*.5,R(y0+.3,y1-.3),Z);s+=`<ellipse cx="${f(kx)}" cy="${f(ky)}" rx="${f(3*C.k(Z))}" ry="${f(5*C.k(Z))}" fill="${shade(col,-.5)}" opacity=".6"/>`;}
  for(const ny of [y0+.25,y1-.25]){const [nx,ny2]=P(C,X+w*.5,ny,Z);s+=`<circle cx="${f(nx)}" cy="${f(ny2)}" r="${f(Math.max(.8,1.6*C.k(Z)))}" fill="#2a2228"/>`;}}
 const d='M'+pts([P(C,x0,y0,Z),P(C,x1,y0,Z),P(C,x1,y1,Z),P(C,x0,y1,Z)]).replace(/ /g,' L')+'Z';
 s+=noise(d,{freq:.25,oct:3,op:.2});
 // grime at the bottom
 const g=id('gr');const yb=P(C,0,y0,Z)[1],yt=P(C,0,y0+1,Z)[1];s+=`<defs><linearGradient id="${g}" gradientUnits="userSpaceOnUse" x1="0" y1="${f(yb)}" x2="0" y2="${f(yt)}"><stop offset="0" stop-color="#2a1a10" stop-opacity=".45"/><stop offset="1" stop-color="#2a1a10" stop-opacity="0"/></linearGradient></defs>${poly([P(C,x0,y0,Z),P(C,x1,y0,Z),P(C,x1,y0+1,Z),P(C,x0,y0+1,Z)],`url(#${g})`,'none',0)}`;
 return s;}
function planksSide(C,X,z0,z1,y0,y1,col,{w=.22}={}){let s=S.rectSide(C,X,z0,z1,y0,y1,col,'#2a1a1a',2);
 for(let Y=y0,i=0;Y<y1;Y+=w,i++){s+=poly([P(C,X,Y,z0),P(C,X,Y,z1),P(C,X,Math.min(y1,Y+w),z1),P(C,X,Math.min(y1,Y+w),z0)],shade(col,((i*29)%5-2)*.035),'none',0);const a=P(C,X,Y,z0),b=P(C,X,Y,z1);s+=`<path d="M${f(a[0])},${f(a[1])} L${f(b[0])},${f(b[1])}" stroke="${shade(col,-.45)}" stroke-width="1.6"/>`;}
 const d='M'+pts([P(C,X,y0,z0),P(C,X,y0,z1),P(C,X,y1,z1),P(C,X,y1,z0)]).replace(/ /g,' L')+'Z';return s+noise(d,{freq:.25,oct:3,op:.2});}

// ---------- trees ----------
function tree(C,X,Z,{h=6,crown=['#3f7a3a','#5a9a48','#86c05c'],trunk='#6a4a32',light=[-1,-1]}={}){const k=C.k(Z)*C.U;const [x,y]=P(C,X,0,Z);let s='';
 // cast shadow on ground
 s+=blurG(6*C.k(Z),`<ellipse cx="${f(x+h*.25*k)}" cy="${f(y+2)}" rx="${f(h*.42*k)}" ry="${f(h*.07*k)}" fill="#1a2a10" opacity=".35"/>`);
 const tw=.22*k*(h/6),th=h*.45*k;
 s+=`<path d="M${f(x-tw)},${f(y)} C${f(x-tw*.7)},${f(y-th*.5)} ${f(x-tw*.5)},${f(y-th)} ${f(x-tw*.35)},${f(y-th*1.1)} L${f(x+tw*.35)},${f(y-th*1.1)} C${f(x+tw*.5)},${f(y-th)} ${f(x+tw*.7)},${f(y-th*.5)} ${f(x+tw)},${f(y)}Z" fill="${trunk}" stroke="${OL}" stroke-width="${f(Math.max(1,2*C.k(Z)))}"/>`;
 s+=`<path d="M${f(x+tw*.2)},${f(y)} L${f(x+tw*.15)},${f(y-th)}" stroke="${shade(trunk,-.35)}" stroke-width="${f(tw*.5)}" opacity=".5"/>`;
 for(let i=0;i<5;i++){const yy=y-th*R(.2,.9);s+=`<path d="M${f(x-tw*.5)},${f(yy)} q${f(tw*.4)},${f(-tw*.3)} ${f(tw*.8)},0" stroke="${shade(trunk,-.4)}" stroke-width="1.2" fill="none" opacity=".6"/>`;}
 for(const sx of [-1,1])s+=`<path d="M${f(x)},${f(y-th*.8)} q${f(sx*tw*2)},${f(-th*.15)} ${f(sx*tw*3.2)},${f(-th*.5)}" stroke="${trunk}" stroke-width="${f(tw*.5)}" fill="none" stroke-linecap="round"/>`;
 // crown: three tones of overlapping blobs (dark back, mid, light front-left)
 const cx=x,cy=y-th*1.05-h*.28*k,cr=h*.33*k;const blobs=[];for(let i=0;i<14;i++){const a=rnd()*Math.PI*2,r=cr*Math.sqrt(rnd())*.8;blobs.push([cx+Math.cos(a)*r*1.1,cy+Math.sin(a)*r*.85,cr*R(.38,.6)]);}
 s+=`<g stroke="${OL}" stroke-width="${f(Math.max(1,2.2*C.k(Z)))}">`+blobs.map(([bx,by,br])=>`<circle cx="${f(bx)}" cy="${f(by)}" r="${f(br)}" fill="${crown[0]}"/>`).join('')+`</g>`;
 s+=blobs.map(([bx,by,br])=>`<circle cx="${f(bx)}" cy="${f(by)}" r="${f(br)}" fill="${crown[0]}"/>`).join('');
 s+=blobs.map(([bx,by,br])=>`<circle cx="${f(bx+light[0]*br*.18)}" cy="${f(by+light[1]*br*.2)}" r="${f(br*.82)}" fill="${crown[1]}"/>`).join('');
 s+=blobs.filter((b,i)=>b[0]<cx+cr*.2&&b[1]<cy+cr*.2).map(([bx,by,br])=>`<circle cx="${f(bx+light[0]*br*.35)}" cy="${f(by+light[1]*br*.38)}" r="${f(br*.45)}" fill="${crown[2]}" opacity=".9"/>`).join('');
 for(let i=0;i<26;i++){const a=rnd()*Math.PI*2,r=cr*.95*Math.sqrt(rnd());s+=`<path d="M${f(cx+Math.cos(a)*r)},${f(cy+Math.sin(a)*r*.85)} l${f(3*C.k(Z))},${f(-2*C.k(Z))}" stroke="${shade(crown[0],-.35)}" stroke-width="1.4" opacity=".6"/>`;}
 return s;}
function bush(C,X,Z,{w=1.2,col=['#3f7a3a','#5a9a48','#86c05c']}={}){const k=C.k(Z)*C.U;const [x,y]=P(C,X,0,Z);let s=blurG(4*C.k(Z),`<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(w*.6*k)}" ry="${f(w*.1*k)}" fill="#1a2a10" opacity=".35"/>`);
 const bl=[];for(let i=0;i<7;i++)bl.push([x+R(-.45,.45)*w*k,y-R(.15,.45)*w*k,R(.18,.3)*w*k]);
 s+=bl.map(([a,b,r])=>`<circle cx="${f(a)}" cy="${f(b)}" r="${f(r)}" fill="${col[0]}" stroke="${OL}" stroke-width="1.4"/>`).join('')+bl.map(([a,b,r])=>`<circle cx="${f(a)}" cy="${f(b)}" r="${f(r)}" fill="${col[0]}"/>`).join('')+bl.map(([a,b,r])=>`<circle cx="${f(a-r*.2)}" cy="${f(b-r*.25)}" r="${f(r*.7)}" fill="${col[1]}"/>`).join('')+bl.slice(0,3).map(([a,b,r])=>`<circle cx="${f(a-r*.35)}" cy="${f(b-r*.4)}" r="${f(r*.35)}" fill="${col[2]}"/>`).join('');
 return s;}

// ---------- fence (posts + rails, perspective) ----------
function fenceZ(C,X,z0,z1,{h=1.1,step=2,col='#efe6d6'}={}){let s='';for(let Z=z1;Z>=z0;Z-=step){const a=P(C,X,0,Z),b=P(C,X,h,Z),k=C.k(Z)*C.U;s+=`<rect x="${f(a[0]-.06*k)}" y="${f(b[1])}" width="${f(.12*k)}" height="${f(a[1]-b[1])}" fill="${col}" stroke="${OL}" stroke-width="${f(Math.max(.8,1.6*C.k(Z)))}"/><rect x="${f(a[0]-.06*k)}" y="${f(b[1])}" width="${f(.04*k)}" height="${f(a[1]-b[1])}" fill="${shade(col,-.2)}"/><path d="M${f(a[0]-.08*k)},${f(b[1])} L${f(a[0])},${f(b[1]-.06*k)} L${f(a[0]+.08*k)},${f(b[1])}" fill="${col}" stroke="${OL}" stroke-width="1"/>`;}
 for(const yy of [h*.35,h*.75]){s+=poly([P(C,X,yy,z0),P(C,X,yy,z1),P(C,X,yy+.1,z1),P(C,X,yy+.1,z0)],col,OL,1.2)+poly([P(C,X,yy,z0),P(C,X,yy,z1),P(C,X,yy+.03,z1),P(C,X,yy+.03,z0)],shade(col,-.22),'none',0);}
 return s;}
function fenceX(C,Z,x0,x1,{h=1.1,step=2,col='#efe6d6'}={}){let s='';for(const yy of [h*.35,h*.75])s+=S.rectBack(C,Z,x0,x1,yy,yy+.1,col,OL,1.2);
 for(let X=x0;X<=x1;X+=step){s+=S.rectBack(C,Z-.02,X-.06,X+.06,0,h,col,OL,1.4)+S.rectBack(C,Z-.021,X+.02,X+.06,0,h,shade(col,-.2),'none',0);}return s;}

// ---------- poles with sagging wires ----------
function poles(C,X,zs,{h=7}={}){let s='';const tops=[];for(const Z of zs){const a=P(C,X,0,Z),b=P(C,X,h,Z),k=C.k(Z)*C.U;s+=`<rect x="${f(a[0]-.1*k)}" y="${f(b[1])}" width="${f(.2*k)}" height="${f(a[1]-b[1])}" fill="#6a4e3a" stroke="${OL}" stroke-width="1.4"/><rect x="${f(a[0]-.05*k)}" y="${f(b[1])}" width="${f(.05*k)}" height="${f(a[1]-b[1])}" fill="#8a6a50"/>`;
  const c=P(C,X,h-.4,Z);s+=`<rect x="${f(c[0]-.9*k)}" y="${f(c[1])}" width="${f(1.8*k)}" height="${f(.12*k)}" fill="#5a4030" stroke="${OL}" stroke-width="1"/>`;tops.push(Z);}
 for(let i=0;i<tops.length-1;i++)for(const dx of [-.8,0,.8]){const a=P(C,X+dx,h-.35,tops[i]),b=P(C,X+dx,h-.35,tops[i+1]);const m=[(a[0]+b[0])/2,(a[1]+b[1])/2+Math.abs(a[0]-b[0])*.06+18*C.k(tops[i])];s+=`<path d="M${f(a[0])},${f(a[1])} Q${f(m[0])},${f(m[1])} ${f(b[0])},${f(b[1])}" stroke="#2a2a30" stroke-width="1.4" fill="none" opacity=".8"/>`;}
 return s;}

// ---------- props ----------
function hayBale(C,X,Z,{r=.65}={}){const [x,y]=P(C,X,0,Z),k=C.k(Z)*C.U,R0=r*k;let s=blurG(4*C.k(Z),`<ellipse cx="${f(x+R0*.3)}" cy="${f(y)}" rx="${f(R0*1.4)}" ry="${f(R0*.25)}" fill="#3a2a10" opacity=".4"/>`);
 s+=`<rect x="${f(x-R0*1.1)}" y="${f(y-R0*2)}" width="${f(R0*1.4)}" height="${f(R0*2)}" fill="#c8a04a" stroke="${OL}" stroke-width="1.6"/>`;
 for(let i=0;i<9;i++){const yy=y-R0*2*rnd();s+=`<path d="M${f(x-R0*1.1)},${f(yy)} l${f(R0*1.4)},${f(R(-3,3))}" stroke="#a07a2a" stroke-width="1.2" opacity=".7"/>`;}
 s+=`<ellipse cx="${f(x+R0*.3)}" cy="${f(y-R0)}" rx="${f(R0*.75)}" ry="${f(R0)}" fill="#e2bc62" stroke="${OL}" stroke-width="1.8"/>`;
 let sp='';for(let a=0;a<Math.PI*8;a+=.3){const rr=a/(Math.PI*8)*R0*.9;sp+=(a?'L':'M')+f(x+R0*.3+Math.cos(a)*rr*.75)+','+f(y-R0+Math.sin(a)*rr);}s+=`<path d="${sp}" stroke="#b08a3a" stroke-width="1.4" fill="none"/>`;
 for(let i=0;i<10;i++){const a=rnd()*6.28;s+=`<path d="M${f(x+R0*.3+Math.cos(a)*R0*.72)},${f(y-R0+Math.sin(a)*R0*.95)} l${f(Math.cos(a)*6)},${f(Math.sin(a)*6)}" stroke="#d8b050" stroke-width="1.4"/>`;}
 return s;}
function cropRows(C,x0,x1,z0,z1,{step=.9,col='#5a9a3a',soil='#8a6a48'}={}){let s=dirt(C,x0,x1,z0,z1,{col:soil,ruts:false});
 for(let X=x0+step/2;X<x1;X+=step){for(let Z=z1;Z>=z0;Z-=.6){const [x,y]=P(C,X,0,Z),k=C.k(Z)*C.U;if(k<6)continue;const r=.22*k;s+=`<path d="M${f(x)},${f(y)} q${f(-r)},${f(-r*1.4)} ${f(-r*.3)},${f(-r*2)} M${f(x)},${f(y)} q${f(r)},${f(-r*1.4)} ${f(r*.3)},${f(-r*2)} M${f(x)},${f(y)} l0,${f(-r*2.2)}" stroke="${shade(col,R(-.15,.1))}" stroke-width="${f(Math.max(1,r*.35))}" stroke-linecap="round" fill="none"/>`;}}
 return s;}
function car(C,X,Z,{col='#d8443a',dir=1}={}){const k=C.k(Z)*C.U;const [x,y]=P(C,X,0,Z);const L=4.2*k,Hh=1.45*k;let s=blurG(6*C.k(Z),`<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(L*.55)}" ry="${f(.25*k)}" fill="#101014" opacity=".55"/>`);
 const g=id('cb');s+=`<defs><linearGradient id="${g}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${shade(col,.25)}"/><stop offset=".55" stop-color="${col}"/><stop offset="1" stop-color="${shade(col,-.35)}"/></linearGradient></defs>`;
 s+=`<g transform="translate(${f(x)},${f(y)}) scale(${dir},1)"><path d="M${f(-L/2)},${f(-.35*k)} L${f(-L/2)},${f(-.75*k)} Q${f(-L/2+.1*k)},${f(-.9*k)} ${f(-L*.3)},${f(-.92*k)} L${f(-L*.18)},${f(-Hh)} L${f(L*.2)},${f(-Hh)} L${f(L*.33)},${f(-.92*k)} Q${f(L/2)},${f(-.88*k)} ${f(L/2)},${f(-.6*k)} L${f(L/2)},${f(-.35*k)}Z" fill="url(#${g})" stroke="${OL}" stroke-width="2.2"/>`;
 s+=`<path d="M${f(-L*.16)},${f(-Hh+.06*k)} L${f(-L*.27)},${f(-.95*k)} L${f(-.04*k)},${f(-.95*k)} L${f(-.04*k)},${f(-Hh+.06*k)}Z M${f(.04*k)},${f(-Hh+.06*k)} L${f(.04*k)},${f(-.95*k)} L${f(L*.3)},${f(-.95*k)} L${f(L*.18)},${f(-Hh+.06*k)}Z" fill="#3a5a78" stroke="${OL}" stroke-width="1.6"/><path d="M${f(-L*.2)},${f(-1.32*k)} L${f(-L*.08)},${f(-1.32*k)} L${f(-L*.2)},${f(-1.02*k)}Z" fill="#bfe0ff" opacity=".6"/>`;
 s+=`<path d="M${f(-L*.02)},${f(-.92*k)} L${f(-L*.02)},${f(-.4*k)} M${f(L*.28)},${f(-.9*k)} L${f(L*.28)},${f(-.42*k)}" stroke="${shade(col,-.45)}" stroke-width="1.4"/><rect x="${f(L*.06)}" y="${f(-.8*k)}" width="${f(.25*k)}" height="${f(.05*k)}" rx="2" fill="#ddd"/>`;
 s+=`<path d="M${f(-L/2+.05*k)},${f(-.68*k)} L${f(L/2-.05*k)},${f(-.62*k)}" stroke="#fff" stroke-width="2" opacity=".35"/><rect x="${f(L/2-.2*k)}" y="${f(-.72*k)}" width="${f(.18*k)}" height="${f(.12*k)}" rx="3" fill="#fff6c8" stroke="${OL}" stroke-width="1.2"/><rect x="${f(-L/2+.02*k)}" y="${f(-.72*k)}" width="${f(.14*k)}" height="${f(.12*k)}" rx="3" fill="#e5262d" stroke="${OL}" stroke-width="1.2"/>`;
 for(const wx of [-L*.3,L*.3])s+=`<circle cx="${f(wx)}" cy="${f(-.33*k)}" r="${f(.34*k)}" fill="#1e1e24" stroke="${OL}" stroke-width="2"/><circle cx="${f(wx)}" cy="${f(-.33*k)}" r="${f(.2*k)}" fill="#a8aab2"/><circle cx="${f(wx)}" cy="${f(-.33*k)}" r="${f(.07*k)}" fill="#5a5c64"/>`+[0,1,2,3,4].map(i=>{const a=i*1.2566;return `<path d="M${f(wx)},${f(-.33*k)} l${f(Math.cos(a)*.18*k)},${f(Math.sin(a)*.18*k)}" stroke="#6a6c74" stroke-width="1.6"/>`;}).join('');
 return s+'</g>';}
function carRear(C,X,Z,{col='#3a6ab0'}={}){const [x,y]=P(C,X,0,Z),k=C.k(Z)*C.U,w=1.8*k,h=1.45*k;const g=id('cr');let s=blurG(5*C.k(Z),`<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(w*.62)}" ry="${f(.18*k)}" fill="#101014" opacity=".6"/>`);
 s+=`<defs><linearGradient id="${g}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${shade(col,.25)}"/><stop offset=".6" stop-color="${col}"/><stop offset="1" stop-color="${shade(col,-.4)}"/></linearGradient></defs>`;
 for(const sx of [-1,1])s+=`<rect x="${f(x+sx*w*.36-.13*k)}" y="${f(y-.42*k)}" width="${f(.26*k)}" height="${f(.42*k)}" rx="${f(.06*k)}" fill="#1e1e24" stroke="${OL}" stroke-width="1.6"/>`;
 s+=`<path d="M${f(x-w/2)},${f(y-.3*k)} L${f(x-w/2)},${f(y-.85*k)} Q${f(x-w/2)},${f(y-.95*k)} ${f(x-w*.4)},${f(y-.97*k)} L${f(x-w*.32)},${f(y-h)} L${f(x+w*.32)},${f(y-h)} L${f(x+w*.4)},${f(y-.97*k)} Q${f(x+w/2)},${f(y-.95*k)} ${f(x+w/2)},${f(y-.85*k)} L${f(x+w/2)},${f(y-.3*k)}Z" fill="url(#${g})" stroke="${OL}" stroke-width="2"/>`;
 s+=`<path d="M${f(x-w*.3)},${f(y-h+.06*k)} L${f(x+w*.3)},${f(y-h+.06*k)} L${f(x+w*.37)},${f(y-1.0*k)} L${f(x-w*.37)},${f(y-1.0*k)}Z" fill="#2e4a66" stroke="${OL}" stroke-width="1.4"/><path d="M${f(x-w*.22)},${f(y-h+.1*k)} L${f(x-w*.05)},${f(y-h+.1*k)} L${f(x-w*.2)},${f(y-1.04*k)} L${f(x-w*.32)},${f(y-1.04*k)}Z" fill="#a8d0f0" opacity=".45"/>`;
 for(const sx of [-1,1])s+=`<rect x="${f(x+sx*w*.36-.16*k)}" y="${f(y-.82*k)}" width="${f(.32*k)}" height="${f(.14*k)}" rx="${f(.04*k)}" fill="#e5262d" stroke="${OL}" stroke-width="1.2"/><rect x="${f(x+sx*w*.36-.13*k)}" y="${f(y-.8*k)}" width="${f(.1*k)}" height="${f(.05*k)}" fill="#ff9a9a"/>`;
 s+=`<rect x="${f(x-.26*k)}" y="${f(y-.66*k)}" width="${f(.52*k)}" height="${f(.13*k)}" rx="3" fill="#f2f0e8" stroke="${OL}" stroke-width="1.2"/><text x="${f(x)}" y="${f(y-.56*k)}" text-anchor="middle" font-family="DejaVu Sans Mono" font-weight="bold" font-size="${f(.09*k)}" fill="#223">IYA 2D</text><rect x="${f(x-w*.48)}" y="${f(y-.4*k)}" width="${f(w*.96)}" height="${f(.12*k)}" rx="4" fill="#2a2a30" stroke="${OL}" stroke-width="1.2"/><path d="M${f(x-w*.46)},${f(y-.9*k)} L${f(x+w*.46)},${f(y-.9*k)}" stroke="#fff" stroke-width="2" opacity=".3"/>`;
 return s;}
function lamp(C,X,Z,{h=5,on=false}={}){const [x,y]=P(C,X,0,Z),t=P(C,X,h,Z),k=C.k(Z)*C.U;let s=`<rect x="${f(x-.06*k)}" y="${f(t[1])}" width="${f(.12*k)}" height="${f(y-t[1])}" fill="#3a3c44" stroke="${OL}" stroke-width="1.2"/><rect x="${f(x-.12*k)}" y="${f(y-.5*k)}" width="${f(.24*k)}" height="${f(.5*k)}" fill="#2e3038" stroke="${OL}" stroke-width="1.2"/><path d="M${f(x)},${f(t[1])} q${f(.4*k)},${f(-.2*k)} ${f(.8*k)},${f(.05*k)}" stroke="#3a3c44" stroke-width="${f(.08*k)}" fill="none"/><path d="M${f(x+.6*k)},${f(t[1])} l${f(.4*k)},0 l${f(-.08*k)},${f(.18*k)} l${f(-.24*k)},0Z" fill="#3a3c44" stroke="${OL}" stroke-width="1.2"/>`;
 if(on)s+=glow(x+.8*k,t[1]+.25*k,1.6*k,'#ffe7a0',.6);return s;}
function sign(C,X,Z,{txt='STOP',col='#d8303a',h=2.4}={}){const [x,y]=P(C,X,0,Z),t=P(C,X,h,Z),k=C.k(Z)*C.U,r=.38*k;let s=`<rect x="${f(x-.04*k)}" y="${f(t[1])}" width="${f(.08*k)}" height="${f(y-t[1])}" fill="#8a8c94" stroke="${OL}" stroke-width="1"/>`;
 let d='';for(let i=0;i<8;i++){const a=Math.PI/8+i*Math.PI/4;d+=(i?'L':'M')+f(x+Math.cos(a)*r)+','+f(t[1]+Math.sin(a)*r);}s+=`<path d="${d}Z" fill="${col}" stroke="#fff" stroke-width="${f(.04*k)}"/><path d="${d}Z" fill="none" stroke="${OL}" stroke-width="1.2"/><text x="${f(x)}" y="${f(t[1]+r*.22)}" text-anchor="middle" font-family="DejaVu Sans" font-weight="bold" font-size="${f(r*.55)}" fill="#fff">${txt}</text>`;return s;}
function hydrant(C,X,Z){const [x,y]=P(C,X,0,Z),k=C.k(Z)*C.U;return blurG(3*C.k(Z),`<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(.25*k)}" ry="${f(.05*k)}" fill="#000" opacity=".4"/>`)+`<rect x="${f(x-.13*k)}" y="${f(y-.7*k)}" width="${f(.26*k)}" height="${f(.7*k)}" rx="${f(.05*k)}" fill="#d8303a" stroke="${OL}" stroke-width="1.6"/><rect x="${f(x-.13*k)}" y="${f(y-.7*k)}" width="${f(.08*k)}" height="${f(.7*k)}" fill="#f05a5a"/><ellipse cx="${f(x)}" cy="${f(y-.72*k)}" rx="${f(.16*k)}" ry="${f(.08*k)}" fill="#b82028" stroke="${OL}" stroke-width="1.4"/><rect x="${f(x-.22*k)}" y="${f(y-.48*k)}" width="${f(.44*k)}" height="${f(.1*k)}" rx="4" fill="#c02830" stroke="${OL}" stroke-width="1.4"/>`;}
function trashBin(C,X,Z){const [x,y]=P(C,X,0,Z),k=C.k(Z)*C.U;return blurG(3*C.k(Z),`<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(.32*k)}" ry="${f(.06*k)}" fill="#000" opacity=".4"/>`)+`<path d="M${f(x-.28*k)},${f(y-.95*k)} L${f(x+.28*k)},${f(y-.95*k)} L${f(x+.24*k)},${f(y)} L${f(x-.24*k)},${f(y)}Z" fill="#3a6a4a" stroke="${OL}" stroke-width="1.6"/>`+[-.14,0,.14].map(o=>`<path d="M${f(x+o*k)},${f(y-.88*k)} L${f(x+o*.9*k)},${f(y-.06*k)}" stroke="#2a4a34" stroke-width="2"/>`).join('')+`<rect x="${f(x-.32*k)}" y="${f(y-1.02*k)}" width="${f(.64*k)}" height="${f(.1*k)}" rx="4" fill="#2e5a3e" stroke="${OL}" stroke-width="1.6"/>`;}
function mailbox(C,X,Z,{col='#3a5aa8'}={}){const [x,y]=P(C,X,0,Z),k=C.k(Z)*C.U;return `<rect x="${f(x-.04*k)}" y="${f(y-1.05*k)}" width="${f(.08*k)}" height="${f(1.05*k)}" fill="#6a4e3a" stroke="${OL}" stroke-width="1.2"/><path d="M${f(x-.25*k)},${f(y-1.05*k)} L${f(x-.25*k)},${f(y-1.3*k)} Q${f(x)},${f(y-1.48*k)} ${f(x+.25*k)},${f(y-1.3*k)} L${f(x+.25*k)},${f(y-1.05*k)}Z" fill="${col}" stroke="${OL}" stroke-width="1.6"/><rect x="${f(x+.22*k)}" y="${f(y-1.42*k)}" width="${f(.04*k)}" height="${f(.2*k)}" fill="#e5262d"/>`;}
// cow (side view, spotted)
function cow(C,X,Z,{dir=1}={}){const [x,y]=P(C,X,0,Z),k=C.k(Z)*C.U/100;let s=blurG(4*C.k(Z),`<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(110*k)}" ry="${f(14*k)}" fill="#1a2a10" opacity=".35"/>`);
 s+=`<g transform="translate(${f(x)},${f(y)}) scale(${f(k*dir)},${f(k)})" stroke="${OL}" stroke-width="3">`+[-62,-40,40,62].map(l=>`<rect x="${l-7}" y="-62" width="14" height="62" rx="4" fill="#efe9e0"/><rect x="${l-8}" y="-10" width="16" height="10" fill="#3a2a2a"/>`).join('')+
 `<path d="M-90,-70 Q-95,-130 -50,-135 L60,-135 Q100,-130 95,-75 Q95,-55 70,-55 L-65,-55 Q-90,-55 -90,-70Z" fill="#f6f2ea"/><path d="M-40,-133 q20,30 0,55 q-25,-10 -30,-40Z M30,-130 q35,10 25,45 q-30,5 -40,-20Z" fill="#2a2228" stroke="none"/><path d="M-55,-58 q10,10 25,0" fill="#ffb0c0"/>`+
 `<path d="M90,-120 Q140,-140 150,-100 Q155,-70 130,-62 Q100,-62 95,-85Z" fill="#f6f2ea"/><ellipse cx="140" cy="-72" rx="18" ry="13" fill="#ffb8c4"/><circle cx="130" cy="-106" r="5" fill="${OL}"/><path d="M108,-130 l-10,-14 M132,-136 l6,-16" stroke-width="5" stroke-linecap="round"/><path d="M-90,-110 q-25,10 -22,50" fill="none" stroke-width="4"/></g>`;
 return s;}
function chicken(C,X,Z,{dir=1}={}){const [x,y]=P(C,X,0,Z),k=C.k(Z)*C.U/100*.62;return `<g transform="translate(${f(x)},${f(y)}) scale(${f(k*dir)},${f(k)})" stroke="${OL}" stroke-width="2.5"><path d="M-6,0 l0,-14 M6,0 l0,-14" stroke="#e8a030" stroke-width="3"/><path d="M-26,-22 Q-30,-50 0,-50 Q14,-62 22,-52 Q28,-40 18,-30 Q10,-14 -10,-14 Q-26,-14 -26,-22Z" fill="#fff8ee"/><path d="M14,-60 q3,-8 8,-2 q4,-6 6,2" fill="#e5262d"/><path d="M26,-48 l8,3 l-8,3Z" fill="#f2b030"/><circle cx="18" cy="-50" r="2.4" fill="${OL}" stroke="none"/><path d="M-12,-34 q8,6 18,0" fill="none" stroke="#d8cfc0"/></g>`;}
function barn(C,X,Z,{w=9,d=8,h=5.2,col='#a8382c',roof='#5a3a34',trim='#f4ede0'}={}){const x0=X-w/2,x1=X+w/2,z0=Z,z1=Z+d;let s='';
 const shadow=poly([P(C,x0,0,z0),P(C,x1,0,z0),P(C,x1+4,0,z0-1.6),P(C,x0+4,0,z0-1.6)],'#1a2a10','none',0,'opacity=".3"');s+=blurG(8,shadow);
 if(x1<0)s+=planksSide(C,x1,z0,z1,0,h,shade(col,-.25));if(x0>0)s+=planksSide(C,x0,z0,z1,0,h,shade(col,-.25));
 // gable roof side faces
 const rp=h+3.2;
 const sideX=x1<0?x1:x0>0?x0:null;if(sideX!==null){const ex=sideX+(sideX<0?.3:-.3);const rq=[P(C,ex,h-.1,z0-.1),P(C,X,rp,z0-.1),P(C,X,rp,z1),P(C,ex,h-.1,z1)];s+=poly(rq,roof,OL,2);
  for(let i=1;i<8;i++){const t=i/8,Xr=ex+(X-ex)*t,Yr=h-.1+(rp-h+.1)*t,a=P(C,Xr,Yr,z0-.1),b=P(C,Xr,Yr,z1);s+=`<path d="M${f(a[0])},${f(a[1])} L${f(b[0])},${f(b[1])}" stroke="${shade(roof,-.35)}" stroke-width="1.3"/>`;}
  s+=noise('M'+rq.map(p=>f(p[0])+','+f(p[1])).join(' L')+'Z',{freq:.2,oct:3,op:.22});}
 s+=planksBack(C,z0,x0,x1,0,h,col);
 s+=poly([P(C,x0-.3,h,z0-.05),P(C,X,rp,z0-.05),P(C,x1+.3,h,z0-.05)],col,OL,2.4);
 s+=planksBack(C,z0-.04,x0+.5,x1-.5,h,h+.01,col,{}).slice(0,0);
 // gable planks + loft door
 for(let i=1;i<9;i++){const X2=x0+(x1-x0)*i/9;const top=h+(rp-h)*(1-Math.abs(X2-X)/(w/2+.3));const a=P(C,X2,h,z0-.05),b=P(C,X2,top,z0-.05);s+=`<path d="M${f(a[0])},${f(a[1])} L${f(b[0])},${f(b[1])}" stroke="${shade(col,-.4)}" stroke-width="1.6"/>`;}
 s+=S.rectBack(C,z0-.06,X-.9,X+.9,h+.3,h+2,'#3a1e1a',OL,2)+S.rectBack(C,z0-.07,X-.9,X+.9,h+.3,h+2,'none',trim,5);
 s+=poly([P(C,x0-.45,h-.05,z0-.08),P(C,X,rp+.25,z0-.08),P(C,X,rp+.05,z0-.08),P(C,x0-.25,h-.25,z0-.08)],trim,OL,1.6)+poly([P(C,x1+.45,h-.05,z0-.08),P(C,X,rp+.25,z0-.08),P(C,X,rp+.05,z0-.08),P(C,x1+.25,h-.25,z0-.08)],trim,OL,1.6);
 // big doors with X-braces and trim
 const dx0=X-1.6,dx1=X+1.6,dh=3.4;s+=S.rectBack(C,z0-.06,dx0,dx1,0,dh,'#5a1e18',OL,2);for(const [a,b] of [[dx0,X],[X,dx1]]){s+=planksBack(C,z0-.07,a+.1,b-.1,.1,dh-.1,'#a8382c',{w:.2});
  const p1=P(C,a+.1,.1,z0-.08),p2=P(C,b-.1,dh-.1,z0-.08),p3=P(C,a+.1,dh-.1,z0-.08),p4=P(C,b-.1,.1,z0-.08);s+=`<path d="M${f(p1[0])},${f(p1[1])} L${f(p2[0])},${f(p2[1])} M${f(p3[0])},${f(p3[1])} L${f(p4[0])},${f(p4[1])}" stroke="${trim}" stroke-width="${f(.16*C.k(Z)*C.U)}"/>`;
  s+=S.rectBack(C,z0-.08,a+.05,b-.05,.05,dh-.05,'none',trim,f(.12*C.k(Z)*C.U));}
 s+=S.rectBack(C,z0-.09,X-.04,X+.04,0,dh,OL,'none',0);
 for(const wx of [x0+1.2,x1-1.2]){s+=S.rectBack(C,z0-.06,wx-.55,wx+.55,2.2,3.4,'#2a3a4a',OL,2)+S.rectBack(C,z0-.065,wx-.55,wx+.55,2.2,3.4,'none',trim,4);const a=P(C,wx,2.2,z0-.07),b=P(C,wx,3.4,z0-.07);s+=`<path d="M${f(a[0])},${f(a[1])} L${f(b[0])},${f(b[1])}" stroke="${trim}" stroke-width="3"/>`+poly([P(C,wx-.45,3.3,z0-.07),P(C,wx-.15,3.3,z0-.07),P(C,wx-.45,2.6,z0-.07)],'#9ec4e6','none',0,'opacity=".5"');}
 // weather vane + lamp
 const v=P(C,X,rp+.25,z0);const kk=C.k(Z)*C.U;s+=`<path d="M${f(v[0])},${f(v[1])} l0,${f(-.9*kk)}" stroke="${OL}" stroke-width="2"/><path d="M${f(v[0]-.35*kk)},${f(v[1]-.7*kk)} l${f(.7*kk)},0 l${f(-.1*kk)},${f(-.12*kk)}" stroke="${OL}" stroke-width="2" fill="none"/>`;
 s+=lamp(C,X,z0-.1,{h:dh+.5}).slice(0,0);
 return s;}
function silo(C,X,Z,{r=1.5,h=10,col='#c8ccd2'}={}){const [x,y]=P(C,X,0,Z),t=P(C,X,h,Z),k=C.k(Z)*C.U,R0=r*k;const g=id('sl');let s=`<defs><linearGradient id="${g}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${shade(col,.25)}"/><stop offset=".35" stop-color="${col}"/><stop offset="1" stop-color="${shade(col,-.4)}"/></linearGradient></defs>`;
 s+=`<rect x="${f(x-R0)}" y="${f(t[1])}" width="${f(2*R0)}" height="${f(y-t[1])}" fill="url(#${g})" stroke="${OL}" stroke-width="2"/>`;for(let i=1;i<12;i++){const yy=y-(y-t[1])*i/12;s+=`<path d="M${f(x-R0)},${f(yy)} Q${f(x)},${f(yy+R0*.18)} ${f(x+R0)},${f(yy)}" stroke="${shade(col,-.3)}" stroke-width="1.4" fill="none"/>`;}
 s+=`<path d="M${f(x-R0)},${f(t[1])} Q${f(x-R0)},${f(t[1]-R0*1.1)} ${f(x)},${f(t[1]-R0*1.15)} Q${f(x+R0)},${f(t[1]-R0*1.1)} ${f(x+R0)},${f(t[1])}Z" fill="${shade(col,-.1)}" stroke="${OL}" stroke-width="2"/><path d="M${f(x+R0*.4)},${f(t[1]-R0*.4)} L${f(x+R0*.4)},${f(y)}" stroke="#5a5c64" stroke-width="${f(.06*k)}"/>`;
 for(let yy=y-.4*k;yy>t[1];yy-=.35*k)s+=`<path d="M${f(x+R0*.32)},${f(yy)} l${f(.16*k)},0" stroke="#5a5c64" stroke-width="1.4"/>`;
 return s;}
function tractor(C,X,Z,{col='#3a8a3a',dir=1}={}){const [x,y]=P(C,X,0,Z),k=C.k(Z)*C.U;let s=blurG(5*C.k(Z),`<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(2*k)}" ry="${f(.22*k)}" fill="#000" opacity=".45"/>`);
 s+=`<g transform="translate(${f(x)},${f(y)}) scale(${dir},1)" stroke="${OL}" stroke-width="2.2"><rect x="${f(-1.5*k)}" y="${f(-1.5*k)}" width="${f(2.6*k)}" height="${f(.8*k)}" rx="${f(.1*k)}" fill="${col}"/><rect x="${f(-1.5*k)}" y="${f(-1.5*k)}" width="${f(2.6*k)}" height="${f(.15*k)}" fill="${shade(col,.25)}" stroke="none"/>`+
 `<path d="M${f(-1.4*k)},${f(-1.5*k)} L${f(-1.4*k)},${f(-2.7*k)} L${f(-.3*k)},${f(-2.7*k)} L${f(-.2*k)},${f(-1.5*k)}" fill="#9ec4e6" fill-opacity=".55"/><rect x="${f(-1.5*k)}" y="${f(-2.8*k)}" width="${f(1.4*k)}" height="${f(.14*k)}" fill="${col}"/><rect x="${f(.6*k)}" y="${f(-2.3*k)}" width="${f(.1*k)}" height="${f(.8*k)}" fill="#3a3a40"/>`+
 [0,1,2].map(i=>`<rect x="${f(.15*k+i*.25*k)}" y="${f(-1.35*k)}" width="${f(.12*k)}" height="${f(.5*k)}" fill="${shade(col,-.3)}" stroke="none"/>`).join('')+
 `<circle cx="${f(-.9*k)}" cy="${f(-.85*k)}" r="${f(.85*k)}" fill="#25252a"/><circle cx="${f(-.9*k)}" cy="${f(-.85*k)}" r="${f(.45*k)}" fill="#e8c040"/><circle cx="${f(.8*k)}" cy="${f(-.5*k)}" r="${f(.5*k)}" fill="#25252a"/><circle cx="${f(.8*k)}" cy="${f(-.5*k)}" r="${f(.26*k)}" fill="#e8c040"/>`+
 Array.from({length:12},(_,i)=>{const a=i*Math.PI/6;return `<path d="M${f(-.9*k+Math.cos(a)*.7*k)},${f(-.85*k+Math.sin(a)*.7*k)} l${f(Math.cos(a)*.15*k)},${f(Math.sin(a)*.15*k)}" stroke-width="${f(.08*k)}"/>`;}).join('')+`</g>`;return s;}
function trough(C,X,Z){const b={x0:X-1,x1:X+1,y0:0,y1:.6,z0:Z,z1:Z+.6};return S.box(C,b,{front:'#8a9098'})+(()=>{const [a,c]=[P(C,X-.95,.58,Z+.05),P(C,X+.95,.58,Z+.05)];return `<path d="M${f(a[0])},${f(a[1])} L${f(c[0])},${f(c[1])}" stroke="#7ab8e0" stroke-width="${f(.08*C.k(Z)*C.U)}"/>`;})();}

// house builder

// house whose facade faces the road: facade on side plane X=X0, body extends to X0+side*depth (side=-1 left of road, +1 right)
function house(C,X0,z0,z1,{side=-1,h=3.2,depth=7,col='#e8dcc4',roof='#7a4a3e',trim='#fbf8f2',door='#3a5a8a',porch=true,seedH=1,lit=false,snow=false}={}){srand(seedH*977);let s='';const Xb=X0+side*depth,zf=z0;
 // front gable end (faces camera)
 const xa=Math.min(X0,Xb),xb=Math.max(X0,Xb),mid=(xa+xb)/2,rp=h+2.6;
 s+=poly([P(C,xa,0,zf),P(C,xb,0,zf),P(C,xb,h,zf),P(C,mid,rp,zf),P(C,xa,h,zf)],shade(col,-.18),OL,2);
 for(let Y=.25;Y<rp;Y+=.25){const w=Y<h?1:Math.max(0,1-(Y-h)/(rp-h));const a=P(C,mid-(xb-xa)/2*w,Y,zf),b=P(C,mid+(xb-xa)/2*w,Y,zf);s+=`<path d="M${f(a[0])},${f(a[1])} L${f(b[0])},${f(b[1])}" stroke="${shade(col,-.32)}" stroke-width="1" opacity=".7"/>`;}
 {const gx=mid,gk=C.k(zf)*C.U;const a=P(C,gx,h+1.1,zf-.01);s+=`<path d="M${f(a[0]-.35*gk)},${f(a[1]+.3*gk)} L${f(a[0])},${f(a[1]-.25*gk)} L${f(a[0]+.35*gk)},${f(a[1]+.3*gk)}Z" fill="#d8d0c0" stroke="${OL}" stroke-width="1.4"/>`+[0,1,2].map(i=>`<path d="M${f(a[0]-.2*gk+i*.12*gk)},${f(a[1]+.22*gk)} l0,${f(-.25*gk+Math.abs(1-i)*.12*gk)}" stroke="#8a8070" stroke-width="1.4"/>`).join('');
  s+=S.rectBack(C,zf-.01,gx-.55,gx+.55,1.1,2.3,trim,OL,1.6)+S.rectBack(C,zf-.02,gx-.47,gx+.47,1.18,2.22,'#6a8aaa',OL,1.2)+poly([P(C,gx-.4,2.15,zf-.03),P(C,gx-.15,2.15,zf-.03),P(C,gx-.4,1.6,zf-.03)],'#fff','none',0,'opacity=".5"');
  const dp=side<0?xb-.15:xa+.15;s+=S.rectBack(C,zf-.02,dp-.06,dp+.06,0,h,'#d8d4cc',OL,1.2);
  const g2=id('gs');const yb=P(C,0,0,zf)[1],yt=P(C,0,rp,zf)[1];s+=`<defs><linearGradient id="${g2}" gradientUnits="userSpaceOnUse" x1="0" y1="${f(yt)}" x2="0" y2="${f(yb)}"><stop offset="0" stop-color="#000" stop-opacity=".18"/><stop offset=".5" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#2a1a10" stop-opacity=".25"/></linearGradient></defs>`+poly([P(C,xa,0,zf-.03),P(C,xb,0,zf-.03),P(C,xb,h,zf-.03),P(C,mid,rp,zf-.03),P(C,xa,h,zf-.03)],`url(#${g2})`,'none',0);}
 // facade with horizontal siding
 s+=S.rectSide(C,X0,z0,z1,0,h,col,OL,2);
 for(let Y=.2;Y<h;Y+=.2){const a=P(C,X0,Y,z0),b=P(C,X0,Y,z1);s+=`<path d="M${f(a[0])},${f(a[1])} L${f(b[0])},${f(b[1])}" stroke="${shade(col,-.2)}" stroke-width="${f(Math.max(.7,1.2*C.k(z0)))}"/>`;}
 s+=noise('M'+[P(C,X0,0,z0),P(C,X0,0,z1),P(C,X0,h,z1),P(C,X0,h,z0)].map(p=>f(p[0])+','+f(p[1])).join(' L')+'Z',{freq:.3,oct:2,op:.12});
 // foundation strip
 s+=S.rectSide(C,X0+side*.01,z0,z1,0,.4,'#9a948a',OL,1.4);
 // windows: frame, glass gradient, reflection, mullions, sill, shutters
 const L=z1-z0;const nW=Math.max(2,Math.floor(L/2.6));for(let i=0;i<nW;i++){const zc=z0+L*(i+.5)/nW;if(Math.abs(zc-(z0+L*.5))<.9&&porch)continue;const w0=zc-.55,w1=zc+.55,y0=1.1,y1=2.4,Xw=X0-side*.02;
  s+=S.rectSide(C,Xw,w0-.18,w0-.02,y0,y1,shade(door,.1),OL,1.2)+S.rectSide(C,Xw,w1+.02,w1+.18,y0,y1,shade(door,.1),OL,1.2);
  s+=S.rectSide(C,Xw,w0,w1,y0,y1,trim,OL,1.6);const g=id('wg');const a=P(C,Xw,y1,w0),b=P(C,Xw,y0,w0);
  s+=`<defs><linearGradient id="${g}" gradientUnits="userSpaceOnUse" x1="0" y1="${f(a[1])}" x2="0" y2="${f(b[1])}"><stop offset="0" stop-color="${lit?'#fff0b0':'#cfe6f6'}"/><stop offset="1" stop-color="${lit?'#e8a040':'#5a7a9a'}"/></linearGradient></defs>`+S.rectSide(C,Xw,w0+.08,w1-.08,y0+.08,y1-.08,`url(#${g})`,OL,1.2);
  s+=poly([P(C,Xw,y1-.12,w0+.15),P(C,Xw,y1-.12,w0+.35),P(C,Xw,y0+.5,w0+.15)],'#fff','none',0,'opacity=".55"');
  const m1=P(C,Xw,y0+.08,zc),m2=P(C,Xw,y1-.08,zc),m3=P(C,Xw,(y0+y1)/2,w0+.08),m4=P(C,Xw,(y0+y1)/2,w1-.08);s+=`<path d="M${f(m1[0])},${f(m1[1])} L${f(m2[0])},${f(m2[1])} M${f(m3[0])},${f(m3[1])} L${f(m4[0])},${f(m4[1])}" stroke="${trim}" stroke-width="${f(Math.max(1.4,3*C.k(zc)))}"/>`;
  s+=poly([P(C,Xw,y0-.02,w0-.1),P(C,Xw-side*.12,y0-.02,w0-.1),P(C,Xw-side*.12,y0-.02,w1+.1),P(C,Xw,y0-.02,w1+.1)],shade(trim,-.1),OL,1.2)+S.rectSide(C,Xw,w0-.1,w1+.1,y0-.12,y0-.02,shade(trim,-.15),OL,1.2);
  if(rnd()<.6)s+=S.rectSide(C,Xw-side*.05,w0-.05,w1+.05,y0-.42,y0-.12,'#7a4a2a',OL,1.2)+[0,1,2,3].map(j=>{const [x,y]=P(C,Xw-side*.08,y0-.08,w0+.1+j*.3);return `<circle cx="${f(x)}" cy="${f(y)}" r="${f(Math.max(1.5,5*C.k(zc)))}" fill="${['#ff6a8a','#ffd24a','#fff','#ff8a4a'][j]}" stroke="${OL}" stroke-width="1"/>`;}).join('');}
 // door + porch
 if(porch){const zc=z0+L*.5,d0=zc-.5,d1=zc+.5,Xd=X0-side*.02;s+=S.rectSide(C,Xd,d0-.12,d1+.12,0,2.35,trim,OL,1.6)+S.rectSide(C,Xd,d0,d1,.1,2.2,door,OL,1.6);
  for(const [p0,p1] of [[.3,1],[1.2,2]]){s+=S.rectSide(C,Xd-side*.005,d0+.12,d1-.12,p0,p1,shade(door,-.15),OL,1);}const kn=P(C,Xd,1.1,d1-.15);s+=`<circle cx="${f(kn[0])}" cy="${f(kn[1])}" r="${f(Math.max(1.5,5*C.k(zc)))}" fill="#e8c040" stroke="${OL}" stroke-width="1"/>`;
  s+=S.box(C,{x0:Math.min(X0,X0-side*1.3),x1:Math.max(X0,X0-side*1.3),y0:0,y1:.35,z0:d0-.6,z1:d1+.6},{front:'#b8aea0'});
  for(const pz of [d0-.5,d1+.5]){const a=P(C,X0-side*1.2,.35,pz),b=P(C,X0-side*1.2,2.6,pz),k=C.k(pz)*C.U;s+=`<rect x="${f(a[0]-.06*k)}" y="${f(b[1])}" width="${f(.12*k)}" height="${f(a[1]-b[1])}" fill="${trim}" stroke="${OL}" stroke-width="1.4"/>`;}
  s+=poly([P(C,X0,2.6,d0-.7),P(C,X0-side*1.35,2.5,d0-.7),P(C,X0-side*1.35,2.5,d1+.7),P(C,X0,2.6,d1+.7)],shade(roof,.1),OL,1.6);}
 // roof plane facing the road with shingle rows
 const rq=[P(C,X0+side*-.4,h-.05,z0-.3),P(C,mid,rp,z0-.3),P(C,mid,rp,z1+.3),P(C,X0+side*-.4,h-.05,z1+.3)];s+=poly(rq,roof,OL,2.2);
 for(let i=1;i<9;i++){const t=i/9,Xr=X0+side*-.4+(mid-(X0+side*-.4))*t,Yr=h-.05+(rp-h+.05)*t;const a=P(C,Xr,Yr,z0-.3),b=P(C,Xr,Yr,z1+.3);s+=`<path d="M${f(a[0])},${f(a[1])} L${f(b[0])},${f(b[1])}" stroke="${shade(roof,-.35)}" stroke-width="1.3"/>`;
  for(let zz=z0-.3+(i%2)*.25;zz<z1+.3;zz+=.5){const c=P(C,Xr,Yr,zz),e=P(C,Xr-(mid-X0)/9,Yr-(rp-h)/9,zz);s+=`<path d="M${f(c[0])},${f(c[1])} L${f(e[0])},${f(e[1])}" stroke="${shade(roof,-.3)}" stroke-width=".8" opacity=".6"/>`;}}
 s+=noise('M'+rq.map(p=>f(p[0])+','+f(p[1])).join(' L')+'Z',{freq:.15,oct:3,op:.2});
 if(snow){s+=poly([rq[0],rq[1],rq[2],rq[3]].map((p,i)=>[p[0],p[1]+(i===0||i===3?-4:0)]),'#f4f6fc','none',0,'opacity=".92"');}
 // gable trim + chimney
 s+=`<path d="M${f(P(C,xa-.2,h-.1,zf-.32)[0])},${f(P(C,xa-.2,h-.1,zf-.32)[1])} L${f(P(C,mid,rp+.1,zf-.32)[0])},${f(P(C,mid,rp+.1,zf-.32)[1])} L${f(P(C,xb+.2,h-.1,zf-.32)[0])},${f(P(C,xb+.2,h-.1,zf-.32)[1])}" stroke="${trim}" stroke-width="${f(.14*C.k(zf)*C.U)}" fill="none" stroke-linejoin="round"/>`;
 const cz=z0+L*.7,cx=(mid+X0)/2;s+=S.box(C,{x0:cx-.35,x1:cx+.35,y0:h+1.2,y1:rp+1,z0:cz,z1:cz+.7},{front:'#a85a44'});
 return s;}

module.exports={house,carRear,srand,rnd,R,noise,sky,hills,grass,dirt,road,curb,sidewalk,planksBack,planksSide,tree,bush,fenceZ,fenceX,poles,hayBale,cropRows,car,lamp,sign,hydrant,trashBin,mailbox,cow,chicken,barn,silo,tractor,trough,groundGrad};
