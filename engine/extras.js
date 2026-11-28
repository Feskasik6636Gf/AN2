// IYA2D extras: word-synced bubbles, thought bubbles, neon names, pointer tags,
// subscribe CTA, full-screen inserts (phone, tv, counter, timeline, note, map) and the alarm strobe.
const W=1920,H=1080,OL='#0d0b12',FONT='DejaVu Sans';
const f=v=>(+v).toFixed(1);
const cl=(v,a,b)=>Math.max(a,Math.min(b,v));
const ease=t=>{t=cl(t,0,1);return t*t*(3-2*t);};
const out3=t=>1-Math.pow(1-cl(t,0,1),3);
const back=t=>{t=cl(t,0,1);const c=1.6;return 1+(c+1)*Math.pow(t-1,3)+c*Math.pow(t-1,2);};
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
let UID=0;const uid=p=>p+'x'+(++UID).toString(36);
// DejaVu Sans Bold average advance ≈ 0.63 em (caps ≈ 0.72 em)
// measured in Chromium: DejaVu Sans Bold advance per glyph (em)
const tw=(s,size)=>{let w=0;for(const ch of String(s))w+=/[А-ЯЁ]/.test(ch)?.87:/[а-яё]/.test(ch)?.74:/[A-Z]/.test(ch)?.76:/[0-9]/.test(ch)?.70:/[il.,:;!'| ]/.test(ch)?.37:.64;return w*size;};
function wrap(words,size,maxW){const lines=[[]];let cur=0;for(const w of words){const ww=tw(w+' ',size);if(cur+ww>maxW&&lines[lines.length-1].length){lines.push([]);cur=0;}lines[lines.length-1].push(w);cur+=ww;}return lines;}

// ---------- word reveal ----------
// how many of `n` words are visible at local time d (seconds since t0).
// voiceWords: words from words.json that fall inside the bubble window (global times) -> exact sync.
function revealCount(n,d,dur,voiceWords,gt0){
 if(voiceWords&&voiceWords.length){const M=voiceWords.length;let k=0;for(const w of voiceWords) if(gt0+d>=w.start-.02)k++;return Math.min(n,Math.round(k*n/M));}
 const span=Math.max(.15*n,Math.min(dur*.6,.33*n));return Math.min(n,Math.floor(d/span*n)+1);}

// ---------- speech bubble (white box, thin outline, tail) ----------
function speech(c,str,d,dur,shown,o={}){
 const size=o.size??34, words=String(str).split(/\s+/).filter(Boolean), lines=wrap(words,size,o.maxW??560);
 const lw=Math.max(...lines.map(l=>tw(l.join(' '),size))), bw=Math.max(150,lw+56), bh=lines.length*size*1.22+34;
 let x=c.hx+(o.dx??(c.hx>W*.62?-bw*.55:bw*.25)), y=c.hy-(o.dy??170);
 x=cl(x,bw/2+30,W-bw/2-30);y=cl(y,bh+30,H-60);
 const sc=d<.14?.86+.14*back(d/.14):1, tx=cl(c.hx-x,-bw/2+30,bw/2-40);
 let k=0,tl='';lines.forEach((l,i)=>{const vis=l.map(w=>(k++<shown)?esc(w):'').filter(Boolean).join(' ');
  tl+=`<text x="${f(-bw/2+28)}" y="${f(-bh+28+size*.8+i*size*1.22)}" font-family="${FONT}" font-weight="bold" font-size="${size}" fill="#111">${vis}</text>`;});
 return `<g transform="translate(${f(x)},${f(y)}) scale(${sc.toFixed(3)})"><g filter="url(#xshadow)"><path d="M${f(-bw/2+14)},${f(-bh)} H${f(bw/2-14)} Q${f(bw/2)},${f(-bh)} ${f(bw/2)},${f(-bh+14)} V-14 Q${f(bw/2)},0 ${f(bw/2-14)},0 H${f(tx+16)} L${f(tx-4)},34 L${f(tx-8)},0 H${f(-bw/2+14)} Q${f(-bw/2)},0 ${f(-bw/2)},-14 V${f(-bh+14)} Q${f(-bw/2)},${f(-bh)} ${f(-bw/2+14)},${f(-bh)}Z" fill="#fff" stroke="${OL}" stroke-width="3"/></g>${tl}</g>`;}

// ---------- thought bubble: cloud + lavender rings around the head ----------
function cloudPath(w,h){const n=Math.max(6,Math.round(w/52));let d='';const rx=w/2,ry=h/2;
 for(let i=0;i<n;i++){const a0=i/n*2*Math.PI,a1=(i+1)/n*2*Math.PI,am=(a0+a1)/2;
  const p=a=>[rx*Math.cos(a),ry*Math.sin(a)];const [x0,y0]=p(a0),[x1,y1]=p(a1);const bulge=1.32;
  if(!i)d+=`M${f(x0)},${f(y0)}`;d+=` Q${f(rx*bulge*Math.cos(am))},${f(ry*bulge*Math.sin(am))} ${f(x1)},${f(y1)}`;}
 return d+'Z';}
function thought(c,str,d,dur,shown,o={}){
 const col=o.color??'#a98cff';let s='';
 // rings around the head
 const R=(c.hr??70)*1.25;
 for(let i=0;i<3;i++){const ph=((d+i*.45)%1.35)/1.35;const r=R*(1+ph*.9),op=(1-ph)*.75;
  s+=`<circle cx="${f(c.hx)}" cy="${f(c.hy)}" r="${f(r)}" fill="none" stroke="${col}" stroke-width="${f(7-4*ph)}" opacity="${op.toFixed(2)}"/>`;}
 s+=`<circle cx="${f(c.hx)}" cy="${f(c.hy)}" r="${f(R)}" fill="none" stroke="#fff" stroke-width="3" opacity=".55"/>`;
 for(const sx of [-1,1]){const a=d*2.2;s+=`<path d="M${f(c.hx+sx*R*1.15)},${f(c.hy-R*.55)} a${f(R*.5)},${f(R*.5)} 0 0 ${sx>0?1:0} ${f(sx*R*.25)},${f(R*.6)}" stroke="${col}" stroke-width="6" fill="none" stroke-linecap="round" opacity="${(.45+.35*Math.sin(a)).toFixed(2)}"/>`;}
 if(d<.25)s+=`<circle cx="${f(c.hx)}" cy="${f(c.hy)}" r="${f(R*1.6)}" fill="#fff" opacity="${(.5*(1-d/.25)).toFixed(2)}" filter="url(#xglow)"/>`;
 if(!str)return s;
 const size=o.size??30,words=String(str).split(/\s+/).filter(Boolean),lines=wrap(words,size,o.maxW??420);
 const lw=Math.max(...lines.map(l=>tw(l.join(' '),size))),bw=Math.max(150,lw+70),bh=lines.length*size*1.2+48;
 let x=c.hx+(o.dx??(c.hx>W*.6?-R*2.1:-R*1.6)),y=c.hy-(o.dy??R*1.9);x=cl(x,bw/2+40,W-bw/2-40);y=cl(y,bh/2+40,H-bh/2-40);
 const sc=d<.16?.8+.2*back(d/.16):1;let k=0,tl='';
 lines.forEach((l,i)=>{const vis=l.map(w=>(k++<shown)?esc(w):'').filter(Boolean).join(' ');
  tl+=`<text x="0" y="${f(-bh/2+30+size*.75+i*size*1.2)}" text-anchor="middle" font-family="${FONT}" font-weight="bold" font-size="${size}" fill="#111">${vis.toUpperCase()}</text>`;});
 s+=`<circle cx="${f((x+c.hx)/2+10)}" cy="${f((y+bh/2+c.hy-R)/2)}" r="9" fill="#fff" stroke="${OL}" stroke-width="2.5"/><circle cx="${f(x+(c.hx-x)*.25)}" cy="${f(y+bh/2+8)}" r="14" fill="#fff" stroke="${OL}" stroke-width="2.5"/>`;
 s+=`<g transform="translate(${f(x)},${f(y)}) scale(${sc.toFixed(3)})"><path d="${cloudPath(bw,bh)}" fill="#fff" stroke="${OL}" stroke-width="3"/>${tl}</g>`;
 return s;}

// ---------- neon name above the head (letters light up one by one) ----------
function neon(c,str,d,o={}){const col=o.color??'#ff4fa8',size=o.size??64,n=[...str].length,per=o.per??.09;
 const lit=Math.min(n,Math.floor(d/per)+1),txt=[...str].slice(0,lit).join('');const w=tw(str,size)+60,y=c.hy-(o.dy??(c.hr??70)*1.9);
 const fl=d<n*per+.25?(.75+.25*Math.sin(d*60)):1;
 return `<g opacity="${fl.toFixed(2)}"><ellipse cx="${f(c.hx)}" cy="${f(y-size*.3)}" rx="${f(w*.62)}" ry="${f(size*.75)}" fill="${col}" opacity=".18" filter="url(#xglow)"/>
  <text x="${f(c.hx-tw(str,size)/2)}" y="${f(y)}" font-family="${FONT}" font-weight="bold" font-size="${size}" fill="none" stroke="${col}" stroke-width="10" opacity=".55" filter="url(#xglow)">${esc(txt)}</text>
  <text x="${f(c.hx-tw(str,size)/2)}" y="${f(y)}" font-family="${FONT}" font-weight="bold" font-size="${size}" fill="#ffd6ec" stroke="${col}" stroke-width="3">${esc(txt)}</text></g>`;}

// ---------- pointer tag ("FUSE 3: DEAD") ----------
function tag(px,py,str,d,o={}){const size=o.size??26,w=tw(str,size)*.95+34,h=size+20;const lx=px+(o.dx??110),ly=py+(o.dy??-90);
 const k=out3(d/.25);const ex=px+(lx-px)*k,ey=py+(ly-py)*k;
 return `<circle cx="${f(px)}" cy="${f(py)}" r="${f(7*k)}" fill="${o.color??'#ff5fae'}" stroke="#fff" stroke-width="2"/><path d="M${f(px)},${f(py)} L${f(ex)},${f(ey)}" stroke="${o.color??'#ff5fae'}" stroke-width="3"/>
 <g transform="translate(${f(lx)},${f(ly)}) scale(${(.6+.4*k).toFixed(3)})" opacity="${k.toFixed(2)}"><rect x="${f(o.dx<0?-w:0)}" y="${f(-h/2)}" width="${f(w)}" height="${f(h)}" rx="6" fill="#1e1a2e" stroke="${o.color??'#ff5fae'}" stroke-width="2.5"/>
 <text x="${f((o.dx<0?-w:0)+17)}" y="${f(size*.36)}" font-family="DejaVu Sans Mono" font-weight="bold" font-size="${size}" fill="#fff">${esc(str.toUpperCase())}</text></g>`;}

// ---------- subscribe CTA (bottom-right, cursor clicks) ----------
function cta(d,o={}){const name=esc(o.name??'IYA2D'),dur=o.dur??5;if(d<0||d>dur)return '';
 const a=out3(d/.25)*(1-ease((d-dur+.35)/.35)),x=W-560,y=H-150+(1-a)*40;const clicked=d>1.9;
 const cx=x+430+(1-ease((d-.6)/1.1))*260,cy=y+46+(1-ease((d-.6)/1.1))*120,press=d>1.8&&d<2.0?.9:1;
 return `<g opacity="${a.toFixed(2)}"><rect x="${x}" y="${y}" width="520" height="92" rx="20" fill="#111015" stroke="#2a2833" stroke-width="2"/>
 <circle cx="${x+50}" cy="${y+46}" r="32" fill="#ffd24a" stroke="${OL}" stroke-width="3"/><circle cx="${x+40}" cy="${y+40}" r="6" fill="${OL}"/><circle cx="${x+60}" cy="${y+40}" r="6" fill="${OL}"/><path d="M${x+38},${y+58} q12,10 24,0" stroke="${OL}" stroke-width="4" fill="none"/>
 <text x="${x+96}" y="${y+44}" font-family="${FONT}" font-weight="bold" font-size="28" fill="#fff">${name}</text><text x="${x+96}" y="${y+72}" font-family="${FONT}" font-size="18" fill="#9a98a6">@${name.toLowerCase()}</text>
 <path d="M${x+300},${y+56} v-16 h8 l8,-14 q6,0 5,8 l-2,8 h14 q6,0 5,7 l-4,14 q-1,5 -7,5 h-27z" fill="#fff"/>
 <rect x="${x+345}" y="${y+25}" width="${clicked?150:140}" height="42" rx="21" fill="${clicked?'#3a3842':'#e5262d'}" transform="scale(${press}) " /><text x="${x+(clicked?420:415)}" y="${y+53}" text-anchor="middle" font-family="${FONT}" font-weight="bold" font-size="18" fill="#fff">${clicked?'ПОДПИСАН ✓':'ПОДПИСАТЬСЯ'}</text>
 <path d="M${x+500},${y+36} q0,-12 -8,-12 q-8,0 -8,12 v10 l-4,6 h24 l-4,-6z" fill="${d>2.6?'#ffd24a':'#fff'}"/>
 ${d<2.6?`<path transform="translate(${f(cx)},${f(cy)}) scale(${press})" d="M0,0 L0,34 L9,26 L16,40 L22,37 L15,23 L27,23Z" fill="#fff" stroke="#000" stroke-width="2.5"/>`:''}</g>`;}

// ---------- alarm strobe (2 Hz red pulse) ----------
function alarm(d,o={}){const v=Math.max(0,Math.sin(d*Math.PI*2*(o.hz??2)));return `<rect width="${W}" height="${H}" fill="${o.color??'#ff1a2a'}" opacity="${(v*(o.amp??.28)).toFixed(3)}" style="mix-blend-mode:multiply"/><rect width="${W}" height="${H}" fill="url(#xvig)" opacity="${(v*.6).toFixed(3)}"/>`;}

// ---------- full-screen inserts ----------
const mitten=(x,y,s=1)=>`<g transform="translate(${f(x)},${f(y)}) scale(${s})"><ellipse rx="46" ry="40" fill="#231d30" stroke="${OL}" stroke-width="4"/><ellipse cx="-14" cy="-14" rx="16" ry="10" fill="#5a4a72" opacity=".6"/></g>`;
const INS={
 // {type:'phone', mode:'chat'|'call'|'feed', title, msgs:[[t,'text','me'|'them']], caller}
 phone(o,d){const x=W/2,y=H/2+30,pw=470,ph=860;let s=`<rect width="${W}" height="${H}" fill="${o.bg??'#5a6a8a'}"/><rect width="${W}" height="${H}" fill="url(#xvig)"/>`;
  s+=`<g transform="translate(${x},${y+(1-out3(d/.35))*120}) rotate(-3)"><rect x="${-pw/2-14}" y="${-ph/2-14}" width="${pw+28}" height="${ph+28}" rx="58" fill="#15141b" stroke="${OL}" stroke-width="5"/><rect x="${-pw/2}" y="${-ph/2}" width="${pw}" height="${ph}" rx="46" fill="${o.mode==='call'?'#1e2b3a':'#f4f2ef'}"/><rect x="-60" y="${-ph/2+16}" width="120" height="30" rx="15" fill="#15141b"/>`;
  if(o.mode==='call'){const p=(d%1.4)/1.4;s+=`<circle cy="-120" r="${f(90+60*p)}" fill="none" stroke="#6ad08a" stroke-width="4" opacity="${(1-p).toFixed(2)}"/><circle cy="-120" r="90" fill="#3a4a6a"/><text y="-104" text-anchor="middle" font-family="${FONT}" font-weight="bold" font-size="64" fill="#fff">${esc((o.caller??'?')[0])}</text><text y="40" text-anchor="middle" font-family="${FONT}" font-weight="bold" font-size="48" fill="#fff">${esc(o.caller??'Unknown')}</text><text y="90" text-anchor="middle" font-family="${FONT}" font-size="26" fill="#9ab">входящий вызов…</text><circle cx="-110" cy="300" r="46" fill="#e5262d"/><circle cx="110" cy="300" r="46" fill="#3ac05a"/>`;}
  else{s+=`<rect x="${-pw/2}" y="${-ph/2+60}" width="${pw}" height="80" fill="#fff"/><text x="${-pw/2+30}" y="${-ph/2+112}" font-family="${FONT}" font-weight="bold" font-size="30" fill="#111">${esc(o.title??'Чат')}</text>`;
   let yy=-ph/2+190;for(const [t0,str,who] of o.msgs??[]){if(d<t0)break;const me=who==='me',w=Math.min(400,tw(str,30)+44),k=out3((d-t0)/.2);
    s+=`<g transform="translate(${me?pw/2-24-w:-pw/2+24},${f(yy)}) scale(${(.7+.3*k).toFixed(3)})" opacity="${k.toFixed(2)}"><rect width="${f(w)}" height="64" rx="24" fill="${me?'#3a8af0':'#e2e0dc'}"/><text x="22" y="43" font-family="${FONT}" font-weight="bold" font-size="30" fill="${me?'#fff':'#111'}">${esc(str)}</text></g>`;yy+=82;}}
  s+=`</g>`+mitten(x+pw/2-10,y+ph/2-40,1.3)+mitten(x-pw/2+20,y+ph/2-80,1.2);return s;},
 // {type:'tv', title:'THE MOM WHO LISTENS', ticker:'...', live:true}
 tv(o,d){let s=`<defs><linearGradient id="xtvb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a2a6a"/><stop offset="1" stop-color="#0c1440"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#xtvb)"/>`;
  for(let i=0;i<14;i++){const a=-1.2+i*.18+Math.sin(d*.6+i)*.03;s+=`<path d="M${W/2},${H+60} L${f(W/2+Math.cos(a)*2400)},${f(H+60+Math.sin(a)*2400)} L${f(W/2+Math.cos(a+.05)*2400)},${f(H+60+Math.sin(a+.05)*2400)}Z" fill="#fff" opacity=".04"/>`;}
  const lines=wrap(String(o.title??'BREAKING').toUpperCase().split(' '),120,1500);
  lines.forEach((l,i)=>{const y=420+i*140-(lines.length-1)*70;s+=`<text x="${W/2}" y="${y}" text-anchor="middle" font-family="${FONT}" font-weight="bold" font-size="120" fill="#f2c64a" stroke="#7a4a10" stroke-width="5" paint-order="stroke" transform="scale(${(1+.03*ease(d/4)).toFixed(3)})" transform-origin="${W/2} ${y}">${esc(l.join(' '))}</text>`;});
  if(o.live!==false)s+=`<rect x="${W-300}" y="80" width="170" height="64" rx="10" fill="#e5262d" opacity="${(.75+.25*Math.sin(d*6)).toFixed(2)}"/><circle cx="${W-268}" cy="112" r="11" fill="#fff"/><text x="${W-245}" y="126" font-family="${FONT}" font-weight="bold" font-size="40" fill="#fff">LIVE</text>`;
  if(o.ticker){const tx=W-((d*220)%(tw(o.ticker,34)+W));s+=`<rect y="${H-110}" width="${W}" height="70" fill="#0a0e26" opacity=".9"/><rect y="${H-110}" width="260" height="70" fill="#e5262d"/><text x="130" y="${H-63}" text-anchor="middle" font-family="${FONT}" font-weight="bold" font-size="30" fill="#fff">${esc(o.channel??'CHANNEL 6')}</text><g clip-path="url(#xtick)"><text x="${f(tx)}" y="${H-63}" font-family="${FONT}" font-weight="bold" font-size="34" fill="#fff">${esc(o.ticker)}</text></g><defs><clipPath id="xtick"><rect x="260" y="${H-110}" width="${W-260}" height="70"/></clipPath></defs>`;}
  return s;},
 // {type:'counter', from:0, to:37565404, label:'ПРОСМОТРОВ', prefix:'', icon:'play'|'money'|null, dur:2}
 counter(o,d){const k=out3(d/(o.dur??2)),v=Math.round((o.from??0)+((o.to??1000)-(o.from??0))*k);const str=(o.prefix??'')+v.toLocaleString('en-US')+(o.suffix??'');
  let s=`<rect width="${W}" height="${H}" fill="${o.bg??'#13204a'}"/><rect width="${W}" height="${H}" fill="url(#xvig)"/>`;
  if(o.icon==='play')s+=`<circle cx="${W/2}" cy="330" r="62" fill="#f2c64a"/><path d="M${W/2-18},300 L${W/2+30},330 L${W/2-18},360Z" fill="#13204a"/>`;
  if(o.icon==='money')s+=`<text x="${W/2}" y="370" text-anchor="middle" font-family="${FONT}" font-weight="bold" font-size="120" fill="#6ad08a">$</text>`;
  const sc=k<1?1:1+.04*Math.sin(Math.min(1,(d-(o.dur??2))/.3)*Math.PI);
  s+=`<text x="${W/2}" y="590" text-anchor="middle" font-family="${FONT}" font-weight="bold" font-size="170" fill="#f2c64a" transform="scale(${sc.toFixed(3)})" transform-origin="${W/2} 540">${esc(str)}</text>`;
  if(o.label)s+=`<text x="${W/2}" y="700" text-anchor="middle" font-family="${FONT}" font-weight="bold" font-size="60" fill="#e8ecff" letter-spacing="8">${esc(o.label.toUpperCase())}</text>`;return s;},
 // {type:'timeline', from:'TODAY', marks:[[0.3,'DAY 452','#e5262d'],[0.9,'DAY 731','#3a8af0']], span:[0.3,0.9], spanLabel:'279 DAYS'}
 timeline(o,d){let s=`<rect width="${W}" height="${H}" fill="${o.bg??'#1c2430'}"/><rect width="${W}" height="${H}" fill="url(#xvig)"/>`;const x0=300,x1=W-300,y=H/2,k=out3(d/.8);
  s+=`<path d="M${x0},${y} L${f(x0+(x1-x0)*k)},${y}" stroke="#e8e8ee" stroke-width="10" stroke-linecap="round"/>`;
  for(let i=0;i<=10;i++){const x=x0+(x1-x0)*i/10;if(i/10<=k)s+=`<path d="M${f(x)},${y-14} L${f(x)},${y+14}" stroke="#9aa" stroke-width="4"/>`;}
  s+=`<circle cx="${x0+40}" cy="${y}" r="16" fill="#fff" stroke="#111" stroke-width="5"/><text x="${x0+40}" y="${y-40}" text-anchor="middle" font-family="${FONT}" font-weight="bold" font-size="32" fill="#fff">${esc(o.from??'СЕГОДНЯ')}</text>`;
  if(o.span&&d>.9){const a=x0+(x1-x0)*o.span[0],b=x0+(x1-x0)*o.span[0]+(x1-x0)*(o.span[1]-o.span[0])*out3((d-.9)/.8);s+=`<rect x="${f(a)}" y="${y-60}" width="${f(b-a)}" height="120" fill="#e5262d" opacity=".25"/>`;if(o.spanLabel&&d>1.6)s+=`<text x="${f((a+x0+(x1-x0)*o.span[1])/2)}" y="${y+120}" text-anchor="middle" font-family="${FONT}" font-weight="bold" font-size="64" fill="#fff">${esc(o.spanLabel)}</text>`;}
  (o.marks??[]).forEach(([p,l,c],i)=>{const t0=.5+i*.4;if(d<t0)return;const x=x0+(x1-x0)*p,kk=back((d-t0)/.3);s+=`<path d="M${f(x)},${y-70} L${f(x)},${y+70}" stroke="${c??'#fff'}" stroke-width="5"/><g transform="translate(${f(x)},${y-110}) scale(${kk.toFixed(3)})"><rect x="${f(-tw(l,30)/2-16)}" y="-26" width="${f(tw(l,30)+32)}" height="52" rx="8" fill="${c??'#3a8af0'}"/><text y="11" text-anchor="middle" font-family="${FONT}" font-weight="bold" font-size="30" fill="#fff">${esc(l)}</text></g>`;});
  return s;},
 // {type:'note', lines:['SHE HATES','MUSHROOMS'], cross:true, bg:'#9ab0c8'}
 note(o,d){let s=`<rect width="${W}" height="${H}" fill="${o.bg??'#a8b8c8'}"/><rect width="${W}" height="${H}" fill="url(#xvig)"/>`;const k=out3(d/.35);
  s+=`<g transform="translate(${W/2},${H/2+(1-k)*80}) rotate(${-4+2*k})"><rect x="-430" y="-300" width="860" height="600" fill="#000" opacity=".18" transform="translate(14,18)"/><rect x="-430" y="-300" width="860" height="600" fill="#fbfaf6" stroke="${OL}" stroke-width="4"/>`;
  for(let i=0;i<11;i++)s+=`<path d="M-430,${-230+i*50} H430" stroke="#a9c4ea" stroke-width="2"/>`;s+=`<path d="M-340,-300 V300" stroke="#e8a0a0" stroke-width="3"/>`;
  const L=o.lines??['...'];const per=(o.write??1.2)/L.length;L.forEach((l,i)=>{const n=Math.floor(cl((d-.3-i*per)/per,0,1)*l.length);if(n>0)s+=`<text x="-300" y="${-180+i*90}" font-family="DejaVu Serif" font-style="italic" font-weight="bold" font-size="72" fill="#3a3a4a" transform="rotate(-2)">${esc(l.slice(0,n))}</text>`;});
  if(o.cross&&d>1.6){const c=out3((d-1.6)/.4);s+=`<path d="M120,60 l${f(220*c)},${f(180*c)} M340,60 l${f(-220*c)},${f(180*c)}" stroke="#d82a2a" stroke-width="16" stroke-linecap="round"/>`;}
  return s+'</g>';},
 // {type:'map', dots:60, label:'61 БУНКЕР', seed:3}
 map(o,d){let s=`<rect width="${W}" height="${H}" fill="#0f1a3a"/><rect width="${W}" height="${H}" fill="url(#xvig)"/>`;
  s+=`<path d="M380,330 C520,250 760,280 960,260 C1180,240 1400,250 1540,330 C1600,420 1560,560 1460,640 C1360,720 1260,700 1160,780 C1060,850 900,790 780,760 C620,720 460,700 400,600 C350,520 330,420 380,330Z" fill="#1e3a7a" stroke="#6aa0ff" stroke-width="4" transform="scale(${(1+.05*ease(d/5)).toFixed(3)})" transform-origin="${W/2} ${H/2}"/>`;
  let sd=o.seed??7;const r=()=>{sd=(sd*16807)%2147483647;return sd/2147483647;};const n=o.dots??50;
  for(let i=0;i<n;i++){const x=440+r()*1080,y=300+r()*440,t0=.3+i*(1.6/n);if(d<t0)continue;const k=back((d-t0)/.25);s+=`<circle cx="${f(x)}" cy="${f(y)}" r="${f(16*k)}" fill="#fff" opacity=".15"/><circle cx="${f(x)}" cy="${f(y)}" r="${f(6*k)}" fill="#fff"/>`;}
  if(o.label)s+=`<rect x="80" y="${H-170}" width="${f(tw(o.label,44)+50)}" height="80" rx="12" fill="#0a1028" stroke="#6aa0ff" stroke-width="2"/><text x="105" y="${H-115}" font-family="${FONT}" font-weight="bold" font-size="44" fill="#fff">${esc(o.label)}</text>`;
  return s;},
};
const DEFS=`<defs><filter id="xglow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="14"/></filter><filter id="xshadow" x="-10%" y="-10%" width="130%" height="140%"><feDropShadow dx="0" dy="6" stdDeviation="6" flood-color="#000" flood-opacity=".25"/></filter><radialGradient id="xvig" cx=".5" cy=".5" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".55"/></radialGradient></defs>`;
module.exports={speech,thought,neon,tag,cta,alarm,INS,DEFS,revealCount,tw,wrap};
