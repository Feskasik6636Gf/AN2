// node render.js <projectDir> [--from N --to M] [--qc] [--events]
// frames -> <projectDir>/build/frames/fXXXXX.png ; --events writes build/events.json ; --qc writes contact sheets
const path=require('path');const fs=require('fs');const {chromium}=require('playwright');
const D=require('./director.js');const {W,H}=D;
const args=process.argv.slice(2);const dir=path.resolve(args[0]);const opt=k=>{const i=args.indexOf(k);return i>=0?args[i+1]:null;};
const project=require(path.join(dir,'project.js'));const FPS=project.fps||30;
const TL=D.timeline(project);const N=Math.round(TL.total*FPS);
const build=path.join(dir,'build');fs.mkdirSync(path.join(build,'frames'),{recursive:true});
if(args.includes('--events')){
 const ev=[],amb=[];for(const {shot,start} of TL.items){const B={};for(const e of D.shotEvents(shot,B))ev.push([+(start+e[0]).toFixed(3),e[1],e[2]]);
  const st=typeof shot.set==='string'?shot.set:null;amb.push([start,start+shot.dur,shot.amb??(D.LOC[st]?(D.LOC[st]().amb):null)??null]);}
 // amb from built shot (cheap enough)
 for(let i=0;i<TL.items.length;i++){const B=D.buildShot(TL.items[i].shot);amb[i][2]=B.amb||null;}
 fs.writeFileSync(path.join(build,'events.json'),JSON.stringify({total:TL.total,fps:FPS,frames:N,events:ev,amb,music:project.music||[],voice:project.voice||null,voiceOffset:project.voiceOffset||0},null,1));
 console.log('events',ev.length,'total',TL.total.toFixed(2),'frames',N);process.exit(0);}
const from=+(opt('--from')??0),to=Math.min(N,+(opt('--to')??N));
const qc=args.includes('--qc');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:W,height:H}});
 await p.setContent(`<body style="margin:0;overflow:hidden;background:#000"><svg id="root" xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><g id="cam"><g id="bg"></g><g id="act"></g><g id="fg"></g><g id="world"></g></g><g id="grade"></g><g id="screen"></g></svg></body>`);
 let cur=-1,B=null;const frames=[];
 if(qc){for(const [i,it] of TL.items.entries())for(const fr of [.1,.5,.9])frames.push(Math.round((it.start+it.shot.dur*fr)*FPS));}
 else for(let i=from;i<to;i++)frames.push(i);
 for(const fi of frames){const t=fi/FPS;let si=TL.items.findIndex(it=>t>=it.start&&t<it.start+it.shot.dur);if(si<0)si=TL.items.length-1;const it=TL.items[si];
  if(si!==cur){B=D.buildShot(it.shot);cur=si;await p.evaluate(([bg,fg,gr])=>{document.getElementById('bg').innerHTML=bg;document.getElementById('fg').innerHTML=fg;document.getElementById('grade').innerHTML=gr;},[B.bgStatic,B.fgStatic,B.gradeSvg]);}
  const L=D.frameLayers(it.shot,B,t-it.start);L.screen+=D.captionsAt(project,t);
  await p.evaluate(([camT,act,world,screen,filt,bgBlur])=>{const c=document.getElementById('cam');c.setAttribute('transform',camT);c.style.filter=filt;document.getElementById('bg').style.filter=bgBlur?`blur(${bgBlur}px)`:'none';document.getElementById('act').innerHTML=act;document.getElementById('world').innerHTML=world;document.getElementById('screen').innerHTML=screen;},[L.camT,L.act,L.world,L.screen,L.filter,L.bgBlur]);
  await p.screenshot({path:path.join(build,qc?'qc_tmp':'frames',`f${String(fi).padStart(5,'0')}.png`).replace(/qc_tmp/,()=>{fs.mkdirSync(path.join(build,'qc_tmp'),{recursive:true});return 'qc_tmp';})});}
 await b.close();
 if(qc){const {execSync}=require('child_process');execSync(`python3 ${path.join(__dirname,'qcsheet.py')} ${build} ${TL.items.length}`,{stdio:'inherit'});}
 console.log('rendered',frames.length);})();
