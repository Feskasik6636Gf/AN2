// Самопроверка окружения и движка:  node doctor.js [--fix]
// Проверяет всё, что нужно для рендера, и говорит что делать, если чего-то не хватает.
const fs=require('fs'),path=require('path'),cp=require('child_process');
const here=__dirname,sfxDir=path.join(here,'..','sfx');
const rows=[];const add=(name,ok,info,fix)=>rows.push({name,ok,info,fix});
const run=(c)=>{try{return cp.execSync(c,{stdio:['ignore','pipe','ignore'],timeout:60000}).toString().trim();}catch(e){return null;}};

// node
const nv=+process.versions.node.split('.')[0];add('Node.js',nv>=18,'v'+process.versions.node,'установи Node 18+');
// modules
let pw=null;try{pw=require('playwright');add('playwright',true,'модуль найден');}catch(e){add('playwright',false,'не установлен','cd engine && npm install --no-audit --no-fund');}
try{require('three');add('three',true,'модуль найден');}catch(e){add('three',false,'не установлен','cd engine && npm install --no-audit --no-fund');}
// ffmpeg
const ff=run('ffmpeg -version');add('ffmpeg',!!ff,ff?ff.split('\n')[0].slice(0,40):'не найден','sudo apt-get install -y ffmpeg');
add('ffprobe',!!run('ffprobe -version'),'','sudo apt-get install -y ffmpeg');
// python
const py=run('python3 -c "import sys;print(sys.version.split()[0])"');add('Python 3',!!py,py||'не найден','установи Python 3.9+');
for(const [m,pipn,req] of [['numpy','numpy',true],['PIL','pillow',true],['faster_whisper','faster-whisper',false]]){
  const ok=run(`python3 -c "import ${m}"`)!==null;add('python: '+m,ok||!req,ok?'установлен':(req?'не установлен':'не установлен (нужен только для расшифровки озвучки)'),'pip install '+pipn);}
// fonts
const fonts=['/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'];add('шрифт DejaVu',fonts.some(f=>fs.existsSync(f)),'','sudo apt-get install -y fonts-dejavu-core');
// browser launch
(async()=>{
 if(pw){let ok=false,info='';const exe=process.env.PW_CHROMIUM||(fs.existsSync('/opt/pw-browsers/chromium')?'/opt/pw-browsers/chromium':undefined);
  try{const b=await pw.chromium.launch(exe?{executablePath:exe,args:['--no-sandbox']}:{});const p=await b.newPage();await p.setContent('<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"/>');await b.close();ok=true;info=exe?'Chromium: '+exe:'Chromium (playwright)';}catch(e){info=String(e.message).split('\n')[0].slice(0,70);}
  add('браузер (Chromium)',ok,info,'cd engine && npx playwright install --with-deps chromium  (или PW_CHROMIUM=/путь/к/chromium)');}
 // sfx
 let n=0;try{n=fs.readdirSync(sfxDir).filter(f=>f.endsWith('.wav')).length;}catch(e){}
 if(n<70&&process.argv.includes('--fix')){run(`python3 "${path.join(here,'sfx.py')}" "${sfxDir}"`);try{n=fs.readdirSync(sfxDir).filter(f=>f.endsWith('.wav')).length;}catch(e){}}
 add('звуки (sfx/)',n>=70,n+' файлов','python3 engine/sfx.py sfx   (или node engine/doctor.js --fix)');
 // engine: all locations / characters build
 try{const D=require('./director.js'),CH=require('./chars.js');let bad=[];
  for(const k of Object.keys(D.LOC)){try{const sh={set:k,dur:1,actors:[{id:'a',char:'tema',at:[0,5]}]};const B=D.buildShot(sh);D.frameLayers(sh,B,.5);if(!B.amb)bad.push(k+':нет фона');}catch(e){bad.push(k+':'+e.message.slice(0,30));}}
  add('локации ('+Object.keys(D.LOC).length+')',bad.length===0,bad.length?bad.slice(0,4).join(', '):'все строятся','см. engine/detail.js');
  let badc=[];for(const k of Object.keys(CH.REG)){try{CH.get(k);}catch(e){badc.push(k);}}
  add('персонажи ('+(CH.C.length+CH.KIDS.length)+')',badc.length===0,badc.length?badc.slice(0,5).join(', '):CH.C.length+' взрослых + '+CH.KIDS.length+' детей','см. engine/chars.js');
  add('эффекты',Object.keys(D.FXI).length>=58,Object.keys(D.FXI).length+' шт.','');
 }catch(e){add('движок',false,String(e.message).slice(0,80),'переустанови плагин');}
 const w=Math.max(...rows.map(r=>r.name.length));let bad=0;
 console.log('\n=== IYA2D doctor ===');
 for(const r of rows){console.log((r.ok?'OK   ':'FAIL ')+r.name.padEnd(w+2)+(r.info||''));if(!r.ok){bad++;if(r.fix)console.log('     → '+r.fix);}}
 console.log(bad?`\nПроблем: ${bad}. Исправь и запусти снова.`:'\nВсё готово к работе.');process.exit(bad?1:0);
})();
