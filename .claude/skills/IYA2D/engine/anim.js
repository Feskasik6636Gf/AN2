// Animation layer: time-based pose generators for bean characters
const S=require('./stage.js');const {f}=S;
const ease=t=>t<0?0:t>1?1:t*t*(3-2*t);
const lerp=(a,b,t)=>a+(b-a)*t;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
// deterministic pseudo-noise
const hn=x=>{const s=Math.sin(x*127.1)*43758.5453;return s-Math.floor(s);};
const noise=x=>{const i=Math.floor(x),u=x-i;return lerp(hn(i),hn(i+1),u*u*(3-2*u));};

// blink: returns 0..1 (1 = closed) — every ~2.5-4s, 0.13s long
function blink(t,seed=0){const per=3.1+seed*.37;const ph=((t+seed*1.3)%per);return ph<.13?1:0;}
// talk: mouth opening 0..1 while speaking in [t0,t1]
function talk(t,spans){for(const [a,b] of spans) if(t>=a&&t<=b){const v=Math.abs(Math.sin((t-a)*Math.PI*6.5))*(.45+.55*noise(t*9));return clamp(v,0,1)*ease((t-a)/.08)*ease((b-t)/.08);}return 0;}
// walk cycle in front/3-4 view: phase in cycles
function walk(phase,amp=1){const s=Math.sin(phase*Math.PI*2);return {legs:[s*12*amp,-s*12*amp],lift:[Math.max(0,s)*16*amp,Math.max(0,-s)*16*amp],
 arms:[[6,0,16-s*14*amp,-Math.max(0,-s)*8,0],[6,0,16+s*14*amp,-Math.max(0,s)*8,0]],bob:-Math.abs(Math.cos(phase*Math.PI*2))*7*amp};}
// wave gesture
function wave(t){const w=Math.sin(t*Math.PI*5);return [30,-70,60+w*22,-170,-20+w*18];}
// emotion pop (squash & stretch) after change at tc
function pop(t,tc,str=1){const d=t-tc;if(d<0||d>.4)return [1,1];const k=Math.exp(-d*9)*Math.cos(d*28)*.1*str;return [1-k,1+k];}
// idle breathing
const breathe=(t,seed=0)=>1+Math.sin(t*2.4+seed)*.008;
// place animated actor with bob/squash
function animActor(C,X,Z,o,{bob=0,sq=[1,1],br=1}={}){const [fx,fy]=C.P(X,o.Y??0,Z);const k=C.k(Z)*C.PH/470;
 const sx=sq[0],sy=sq[1]*br;return `<g transform="translate(${f(fx)},${f(fy+bob*k)}) scale(${sx.toFixed(4)},${sy.toFixed(4)}) translate(${f(-fx)},${f(-fy)})">${S.actor(C,X,Z,o)}</g>`;}
// pop-in text/graphic
function popIn(t,t0,inner,x,y,dur=.35){const d=t-t0;if(d<0)return '';const sc=d<dur?ease(d/dur)*(1+.25*Math.sin(ease(d/dur)*Math.PI)):1;const fl=Math.sin(d*3)*3;return `<g transform="translate(${x},${y+fl}) scale(${sc.toFixed(3)})">${inner}</g>`;}
module.exports={ease,lerp,clamp,noise,blink,talk,walk,wave,pop,breathe,animActor,popIn};
