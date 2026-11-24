const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const [shot,out,...ts]=process.argv.slice(2);
for(const t of (ts.length?ts:[0])){const p=await b.newPage({viewport:{width:1920,height:1080}});p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto(`http://127.0.0.1:8765/hall3d.html?shot=${shot}&t=${t}`);await p.waitForFunction(()=>window.__done,null,{timeout:600000});
await p.locator('canvas').screenshot({path:`${out}_${t}.png`});await p.close();console.log('ok',t);}
await b.close();})();
