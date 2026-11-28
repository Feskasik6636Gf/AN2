// Detailed locations built with detail.js (standard: references/detail.md)
const S=require('./stage.js');const Dt=require('./detail.js');
const L3={};
L3.farm=()=>{Dt.srand(11);const C=S.Cam({vx:960,PH:470});let bg='';
 bg+=Dt.sky(C,{top:'#5fa8e8',bottom:'#fbe6c4',sun:[1500,150],clouds:8});
 bg+=Dt.hills(C);
 bg+=Dt.grass(C,-60,60,1,90,{near:'#7aae48',far:'#b8cf86',tufts:900,flowers:90});
 bg+=Dt.cropRows(C,3.5,26,30,70);
 bg+=Dt.dirt(C,-1.3,1.3,1,60);
 // far -> near objects
 bg+=Dt.poles(C,16,[70,45,28,18]);
 bg+=Dt.tree(C,22,40,{h:8})+Dt.tree(C,-24,46,{h:9})+Dt.tree(C,-16,52,{h:7});
 bg+=Dt.tractor(C,9,34,{col:'#3a8a3a',dir:-1});
 bg+=Dt.silo(C,-4.2,27)+Dt.barn(C,-10,22,{w:9,d:8});
 bg+=Dt.hayBale(C,-5.5,19)+Dt.hayBale(C,-4.2,20.5);
 bg+=Dt.tree(C,13,22,{h:7.5});
 bg+=Dt.fenceZ(C,-2.3,4,26,{step:2})+Dt.fenceZ(C,2.3,4,26,{step:2});
 bg+=Dt.trough(C,6.5,15)+Dt.cow(C,9,16,{dir:-1})+Dt.cow(C,5.8,12.5,{dir:1});
 bg+=Dt.hayBale(C,7.2,8.2,{r:.6})+Dt.bush(C,-4.2,8,{w:1.4})+Dt.bush(C,10,9,{w:1.8});
 bg+=Dt.chicken(C,-3.4,7.2,{dir:1})+Dt.chicken(C,-2.9,6.4,{dir:-1})+Dt.chicken(C,-3.8,6,{dir:1});
 bg+=Dt.mailbox(C,3.1,5.2,{col:'#c8382c'});
 return {C,bg,fg:'',spots:[[-.6,6],[.7,6.2]],rim:'#ffd9a0',cast:[1,.22],grade:['#fff0d8',.42],amb:'ambNature'};};
L3.road=()=>{Dt.srand(23);const C=S.Cam({vx:960,PH:470});let bg='';
 bg+=Dt.sky(C,{top:'#69b0ec',bottom:'#fdeccf',sun:[380,160],clouds:7});
 bg+=Dt.hills(C,[['#b5cdd2',.06,50],['#9cbfa6',.1,34]]);
 bg+=Dt.grass(C,-60,-5.6,1,90,{tufts:180,flowers:30})+Dt.grass(C,5.6,60,1,90,{tufts:180,flowers:30});
 bg+=Dt.road(C,-3.6,3.6,1,140,{lanes:2});
 bg+=Dt.curb(C,-3.6,1,140,-1)+Dt.curb(C,3.6,1,140,1);
 bg+=Dt.sidewalk(C,-5.6,-3.85,1,140)+Dt.sidewalk(C,3.85,5.6,1,140);
 bg+=Dt.poles(C,6.3,[110,70,45,30]);
 // houses, far -> near
 for(const [z,col,roof,door,sd] of [[62,'#d8e0e8','#5a5a6a','#a83a3a',5],[40,'#f0dcc0','#7a4a3e','#3a6a5a',4],[24,'#cfe0d0','#6a4a3a','#8a3a5a',3]]){bg+=Dt.house(C,-10.5,z,z+9,{side:-1,col,roof,door,seedH:sd});bg+=Dt.house(C,10.5,z+4,z+13,{side:1,col:col==='#d8e0e8'?'#f2e2cc':'#d8e4f0',roof,door,seedH:sd+10});}
 for(const z of [70,50,32,18]){bg+=Dt.tree(C,-7.6,z,{h:6.5})+Dt.tree(C,7.6,z+6,{h:6.5});}
 bg+=Dt.lamp(C,-4.9,26)+Dt.lamp(C,4.9,40,{}).replace('scale(1','scale(-1');
 bg+=Dt.carRear(C,1.8,34,{col:'#e2b040'})+Dt.carRear(C,-1.8,19,{col:'#3a6ab0'});
 bg+=Dt.mailbox(C,-6.2,12)+Dt.bush(C,-7.5,10,{w:1.6})+Dt.bush(C,7.3,11,{w:1.5});
 bg+=Dt.hydrant(C,4.4,8)+Dt.trashBin(C,-4.6,7)+Dt.sign(C,5.2,10);
 return {C,bg,fg:'',spots:[[-4.6,6],[4.6,6.2]],rim:'#ffd9a0',cast:[1,.22],grade:['#fff0d8',.42],amb:'ambStreet'};};
module.exports={L3};
