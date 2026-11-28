// Quality report: compares a project with the reference corridors (knowledge base). node render.js <dir> --report
const D=require('./director.js');
function report(project,TL){const items=TL.items,total=TL.total,n=items.length,L=items.map(i=>i.shot.dur);
 const words=project.words||(project.captions&&project.captions.words)||null;
 const R=[];const add=(name,val,ok,goal)=>R.push({name,val,ok,goal});
 const asl=total/n;add('Средняя длина шота',asl.toFixed(2)+' с',asl>=2.3&&asl<=4,'2.8–3.4 с');
 const short=L.filter(x=>x<1).length/n,long=L.filter(x=>x>6).length/n;
 add('Шоты < 1 с',(short*100).toFixed(1)+'%',short<=.06,'≤ 3%');add('Шоты > 6 с',(long*100).toFixed(1)+'%',long<=.03,'≤ 1%');
 const perMin=[];for(let m=0;m*60<total;m++)perMin.push(items.filter(i=>i.start>=m*60&&i.start<(m+1)*60).length*Math.min(1,60/Math.max(1,Math.min(60,total-m*60))));
 add('Склеек в минуту',perMin.map(v=>Math.round(v)).join(' / '),perMin.every((v,i)=>i===perMin.length-1&&total-i*60<30||(v>=12&&v<=28)),'16–24, начало быстрее');
 const still=items.filter(({shot})=>{const c=shot.camera||{};return c.move==='hold'||(c.zoom&&Math.abs(c.zoom[1]-c.zoom[0])<.015&&!c.pan&&!c.follow);}).length/n;
 add('Шоты без движения камеры',(still*100).toFixed(0)+'%',still<=.2,'≤ 15%');
 const moves={};items.forEach(({shot})=>{const m=(shot.camera||{}).move??((shot.camera||{}).zoom?'custom':'push');moves[m]=(moves[m]||0)+1;});
 const top=Math.max(...Object.values(moves))/n;add('Разнообразие камеры',Object.entries(moves).map(([k,v])=>k+':'+v).join(' '),top<=.8||n<6,'не больше 80% одного движения');
 const trans=items.filter(i=>i.shot.transIn).length/Math.max(1,n-1);add('Переходы (не склейка)',(trans*100).toFixed(1)+'%',trans<=.05,'≤ 2%');
 const loud=[];items.forEach(({shot,start})=>(shot.fx||[]).forEach(([t,id])=>{if(D.LOUD.has(id))loud.push({t:start+t,shot});}));
 const perShot=Math.max(0,...items.map(({shot})=>(shot.fx||[]).filter(([,id])=>D.LOUD.has(id)).length));
 add('«Громкие» эффекты',`${loud.length} (${(loud.length/(total/60)).toFixed(1)}/мин, макс ${perShot} на шот)`,perShot<=1&&loud.length/(total/60)<=4,'≤ 1 на шот, ≤ 4/мин');
 if(words){const off=items.slice(1).map(({start})=>{let b=1e9;for(const w of words){const d=w.start-start;if(Math.abs(d)<Math.abs(b))b=d;}return b*30;});
  const bad=off.filter(o=>o<-6||o>6).length;add('Склейка у начала слова',`${n-1-bad}/${n-1} в пределах ±6 кадров`,bad/(Math.max(1,n-1))<=.15,'склейка за 0–3 кадра до слова');}
 const mus=(project.music||[]).reduce((a,[t0,t1])=>a+(t1-t0),0)/total;add('Доля музыки',(mus*100).toFixed(0)+'%',mus<=.5,'только эмоциональные части');
 add('Нижние субтитры',project.captions?'включены':'выключены',!project.captions||project.captions.force===true,'выключены (текст в пузырях)');
 add('Плашка подписки',project.cta?'есть':'нет',!!project.cta||total<90,'≈2:10 и в конце');
 const ins=items.filter(i=>i.shot.insert).length;add('Вставки (телефон/ТВ/счётчик…)',String(ins),ins>=Math.floor(total/90)||total<60,'≥ 1 на 1.5 мин');
 return R;}
function print(R){let s='\n=== IYA2D отчёт качества ===\n';for(const r of R)s+=`${r.ok?'OK  ':'WARN'}  ${r.name}: ${r.val}   (цель: ${r.goal})\n`;s+=`Итог: ${R.filter(r=>r.ok).length}/${R.length} в норме\n`;return s;}
module.exports={report,print};
