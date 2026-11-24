const {head,bust,fullBody}=require('./chibi.js');const {chromium}=require('playwright');
const W=2304,H=1536;
let s=`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><rect width="${W}" height="${H}" fill="#e9e8ec"/>`;
s+=fullBody(250,300,1.08);
const em=['smug','shock','panic','love','laugh','cry','angry','side','tired','calm'];
em.forEach((m,i)=>{const col=i%5,row=Math.floor(i/5);s+=bust(640+col*350,330+row*640,.95,m);});
s+='</svg>';
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:W,height:H}});
await p.setContent(`<body style="margin:0">${s}</body>`);await p.screenshot({path:'out/chibi_sheet.png'});await b.close();console.log('ok')})();
