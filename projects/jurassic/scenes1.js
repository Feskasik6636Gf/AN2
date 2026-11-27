const {S}=require('./dsl.js');
const {T,U,NED,MAL,HAM,GRANT,TIM,LEX,ARN,GEN,ELL,cam}=require('./cast.js');

// ---------- COLD OPEN (0-11s): the brightest moments of the film ----------
S(0,{set:'forest',camera:{zoom:[1,1.12],follow:'u'},
 actors:[U([-3.2,5.4],{moves:[{t0:0,t1:2.8,to:[2.4,5.6]}],moods:[[0,'shock']],gestures:[[0,'flare']]}),
         TIM([-1,4.6],{moves:[{t0:0,t1:2.8,to:[3.6,4.8]}],moods:[[0,'shock']]})],
 things:[{id:'rex',k:'trex',at:[-8,19],moves:[{t0:0,t1:2.9,to:[-1,16]}],mouth:[[0.3,2.8]]}],
 fx:[[.2,'dustRun',{target:'u'}],[1.2,'shake'],[2.0,'speedLines']],texts:[]});
S(3.1,{set:'rainyNight',camera:{zoom:[1.5,1.0],focus:[1100,520]},
 things:[{id:'rex',k:'trex',at:[3,13],mouth:[[3.1,5.0]],flip:true,headUp:.4}],
 actors:[U([-1.8,5],{moods:[[3.1,'shock']],gestures:[[3.1,'flare']]})],
 fx:[[3.2,'lightning'],[3.4,'shake'],[3.5,'zoomPunch',{target:'rex'}]],texts:[T(3.2,5.5,'T-REX',{color:'#ff4a3a'})]});
S(4.4,{set:'basement',camera:{zoom:[1,1.2],follow:'u'},
 actors:[U([-2.4,5],{moves:[{t0:4.4,t1:5.8,to:[-.8,5]}],moods:[[4.4,'smug']],gestures:[[4.4,'point']]})],
 things:[{id:'r1',k:'raptor',at:[3.2,6],flip:true,tilt:10,mouth:[[4.4,5.8]]},{id:'r2',k:'raptor',at:[1.2,9],flip:true,moves:[{t0:4.4,t1:5.7,to:[3.4,8.4]}]}],
 fx:[[4.6,'exclaim',{target:'u'}],[5.2,'whipPan']]});
S(5.92,{set:'cinema',transIn:'flash',camera:{zoom:[1,1.15],follow:'u'},
 actors:[U([0,5],{moods:[[5.92,'shock'],[7.0,'sad']],gestures:[[5.92,'handsFace']]})],
 fx:[[6.1,'zoomPunch',{target:'u'}],[7.1,'explosion',{target:'u'}],[7.3,'gloom',{target:'u'}]],
 texts:[T(6.0,7.9,'THE GREATEST MOVIE EVER MADE',{y:150,size:70})]});

// ---------- THE CUP (8.2-11s) ----------
S(8.2,{set:'cinema',camera:{zoom:[1.4,2.4],focus:[960,720]},things:[{id:'cup',k:'cup',at:[0,4.6],Y:.7,scale:2.2,pulses:[9.7,10.15]}],
 actors:[],fx:[[9.7,'shockwave',{target:'cup'}],[8.5,'godRays']],texts:[T(8.4,10.6,'A RIPPLE IN A CUP',{y:160,size:80})]});

// ---------- ROW NINE (11-30s) ----------
S(11.36,{set:'cinema',camera:{zoom:[1,1.1],follow:'u'},
 actors:[U([-3.4,6.5],{moves:[{t0:11.4,t1:12.9,to:[-.6,5.2]}],gestures:[[11.4,'popcorn']],moods:[[11.4,'joy']]})],
 fx:[[11.6,'sparkles',{target:'u'}]],texts:[T(11.5,13.2,'ROW 9 · SEAT 12',{y:140,size:90,color:'#fff'})]});
S(13.38,{set:'cinema',camera:{zoom:[1.1,1.5],follow:'u'},
 actors:[U([-.6,5.2],{pose:'back',gestures:[[13.38,'popcorn'],[14.8,'cheer']],moods:[[13.4,'smug']]})],
 fx:[[13.5,'counter',{to:40,pre:'',post:'th TIME'}],[15.0,'confetti']],texts:[]});
S(16.0,{set:'cinema',camera:{zoom:[2.0,2.4],follow:'u',bgBlur:3},
 actors:[U([-.6,5.2],{moods:[[16,'joy'],[17.2,'smug']],talk:[[16.0,18.5]],gestures:[[16,'talk'],[17.4,'point']]})],
 fx:[[16.6,'sparkles',{target:'u'}],[17.4,'speedLines'],[18.0,'shake']],texts:[[16.0,18.5,'bubble','…I know every line!',{actor:'u'}]]});
S(19.34,{set:'cinema',camera:{zoom:[1,1.2],pan:[[0,0],[0,-40]]},
 actors:[U([-.6,5.2],{pose:'back',moods:[[19.3,'calm'],[20.3,'shock']]})],
 things:[{id:'rex',k:'trex',at:[1.2,22],Y:1.4,scale:.5,flip:true,moves:[{t0:19.4,t1:21.0,to:[0,22]}]}],
 fx:[[20.2,'shake'],[20.3,'impactStar',{target:'rex'}]]});
S(21.04,{set:'cinema',camera:{zoom:[1.6,2.6],focus:[960,740]},
 things:[{id:'cup',k:'cup',at:[0,4.6],Y:.7,scale:2.2,pulses:[21.4,22.0,22.6]}],
 fx:[[21.4,'shockwave',{target:'cup'}],[22.2,'shake']],texts:[]});
S(23.76,{set:'cinema',camera:{zoom:[2.2,3.2],focus:[960,740]},
 things:[{id:'cup',k:'cup',at:[0,4.6],Y:.7,scale:2.2,pulses:[24.0,24.35]}],
 fx:[[24.0,'sparkles',{target:'cup'}]],texts:[T(23.9,25.2,'TWO PERFECT RINGS',{y:160,size:80})]});
S(25.4,{set:'cinema',camera:{zoom:[1.2,2.0],focus:[1040,680]},
 actors:[U([-.4,5.2],{pose:'back',moods:[[25.4,'calm'],[26.4,'shock']]})],
 things:[{id:'cup',k:'cup',at:[.9,5],Y:.7,scale:2,pulses:[25.6,26.0,26.5]}],
 fx:[[26.4,'exclaim',{target:'u'}],[26.5,'zoomPunch',{target:'cup'}]]});
S(27.62,{set:'cinema',camera:{zoom:[1.4,2.2],follow:'u'},
 actors:[U([-.4,5.2],{moods:[[27.6,'shock']],gestures:[[27.6,'popcorn']]})],
 fx:[[28.2,'sweat',{target:'u'}],[29.0,'question',{target:'u'}],[28.0,'rain']],texts:[]});
S(30.2,{set:'cinema',camera:{zoom:[1,1.15],follow:'u'},
 actors:[U([-.4,5.2],{moods:[[30.2,'shock']],gestures:[[30.2,'cheer']]})],
 fx:[[30.3,'rain'],[30.9,'lightning'],[30.9,'zoomPunch',{target:'u'}]],texts:[T(30.3,31.8,'IT\'S RAINING INSIDE',{y:140,size:80,color:'#8ad8ff'})]});
S(32.26,{set:'cinema',camera:{zoom:[1,1.2],pan:[[40,0],[-40,0]]},
 actors:[U([0,5.4],{moods:[[32.3,'shock']],gestures:[[32.3,'handsFace']]})],
 fx:[[32.3,'dizzy',{target:'u'}],[33.2,'flash'],[33.4,'whipPan']],texts:[T(32.4,34.0,'THE SEATS ARE GONE',{y:150,size:78})]});
S(34.56,{set:'forest',transIn:'flash',camera:{zoom:[2.4,2.8],focus:[900,930]},
 actors:[U([0,4.6],{moods:[[34.6,'shock']]})],fx:[[35.0,'smokePuff',{target:'u'}]],texts:[]});
S(36.26,{set:'forest',camera:{zoom:[1.0,1.25],pan:[[-60,0],[60,20]]},
 actors:[U([0,5.6],{pose:'back',moods:[[36.3,'shock']]})],
 things:[{id:'tr',k:'jeep',at:[3.8,13],moves:[{t0:36.3,t1:38,to:[-3,13]}],flip:true}],
 fx:[[36.5,'godRays'],[36.9,'sparkles',{target:'u'}]]});
S(37.52,{set:'forest',camera:{zoom:[2.4,2.9],follow:'u',bgBlur:4},
 actors:[U([0,4.6],{moods:[[37.5,'question']].map(x=>[x[0],'shock']),gestures:[[37.5,'point']]})],
 fx:[[38.0,'arrowPoint',{target:'u'}],[38.4,'exclaim',{target:'u'}]]});
S(39.76,{set:'forest',camera:{zoom:[1.6,1.9],follow:'u'},
 actors:[U([0,4.6],{moods:[[39.8,'tired']],gestures:[[39.8,'shrug']]})],
 fx:[[40.0,'stamp',{text:'UNPAID'}],[40.1,'shake']],texts:[T(39.9,41.2,'INTERN',{y:200,size:110,color:'#ffd24a'})]});
S(41.5,{set:'forest',camera:{zoom:[1,1.15],follow:'u'},
 actors:[U([-1.4,5.2],{moods:[[41.5,'joy']],gestures:[[41.5,'cheer']]})],
 things:[{id:'tr',k:'jeep',at:[5,11],moves:[{t0:41.5,t1:43,to:[-5,11]}],flip:true}],
 fx:[[41.7,'fireworks'],[42.0,'godRays'],[42.0,'sparkles',{target:'u'}]],texts:[T(41.6,43.2,'WELCOME TO YOUR FAVORITE MOVIE',{y:150,size:62})]});

// ---------- THE RULES (43-60s) ----------
S(43.2,{set:'forest',camera:{zoom:[1.3,1.0],follow:'u'},
 actors:[U([0,4.6],{moods:[[43.2,'smug']],gestures:[[43.2,'point']]})],fx:[[43.4,'chapter',{sub:'THE RULES',text:'HOW IT WORKS',size:100}]]});
S(44.36,{set:'harbor',camera:{zoom:[1,1.12],pan:[[-50,0],[50,0]]},
 actors:[U([-1.2,5.4],{gestures:[[44.4,'clip']],moods:[[44.4,'calm']],moves:[{t0:44.4,t1:46.2,to:[.4,5.2]}]})],
 things:[{id:'hel',k:'heli',at:[-4,14],Y:3.2,moves:[{t0:44.4,t1:46.3,to:[1.5,14]}],scale:1}],
 fx:[[45.0,'speedLines']],texts:[[44.5,46.3,'label','FILM = AS FILMED',{actor:'u'}]]});
S(46.3,{set:'airport',camera:{zoom:[1,1.2],follow:'u'},
 actors:[U([-.6,5],{moods:[[46.3,'joy']],gestures:[[46.3,'wave']]})],
 things:[{id:'hel',k:'heli',at:[2.4,10],Y:.1,scale:.9}],
 fx:[[47.0,'sparkles'],[47.3,'godRays']],texts:[T(46.4,48.1,'LANDING → SUNRISE',{y:150,size:72})]});
S(48.72,{set:'forest',camera:{zoom:[1,1.3],follow:'u'},
 actors:[U([0,5],{moods:[[48.7,'calm']],gestures:[[48.7,'crossed']]})],
 things:[{id:'tr',k:'jeep',at:[5,12],moves:[{t0:48.7,t1:51,to:[-5,12]}],flip:true}],
 fx:[[49.0,'timer'],[49.5,'sparkles']],texts:[T(48.8,52.0,'ABOUT 30 HOURS',{y:150,size:84})]});
S(50.3,{set:'forest',camera:{zoom:[1.8,1.5],follow:'u',bgBlur:3},
 actors:[U([0,4.6],{moods:[[50.3,'smug']],gestures:[[50.3,'point']]})],
 fx:[[50.6,'check',{target:'u'}]],texts:[T(50.4,52.5,'TOUCH NOTHING = NOTHING CHANGES',{y:140,size:56})]});
S(52.7,{set:'forest',camera:{zoom:[1.2,1.8],follow:'u'},
 actors:[U([0,5],{moods:[[52.7,'shock']],gestures:[[52.7,'point']]})],
 things:[{id:'g',k:'goat',at:[1.6,6],scale:1.2}],
 fx:[[53.5,'dollyZoom',{target:'u'}],[54.2,'zoomPunch',{target:'u'}]],texts:[T(52.8,55.5,'TOUCH SOMETHING = STORY MOVES',{y:140,size:56,color:'#ffd24a'})]});
S(55.64,{set:'forest',camera:{zoom:[1.3,2.2],follow:'u',bgBlur:3},
 actors:[U([0,4.6],{moods:[[55.7,'shock'],[57.2,'sad']],gestures:[[55.7,'handsFace']]})],
 fx:[[56.0,'gloom',{target:'u'}],[56.8,'question',{target:'u'}],[56.9,'sweat',{target:'u'}]],texts:[]});
S(58.58,{set:'forest',camera:{zoom:[1.8,1.2],follow:'u'},
 actors:[U([0,4.6],{moods:[[58.6,'smug']],gestures:[[58.6,'cheer']]})],
 fx:[[58.9,'sparkles',{target:'u'}],[59.3,'exclaim',{target:'u'}]],texts:[[58.7,60.4,'bubble','Great. Very reassuring.',{actor:'u'}]]});
S(61.2,{set:'forest',camera:{zoom:[1,1.15],follow:'u'},
 actors:[U([-1,5],{moves:[{t0:61.2,t1:64,to:[.6,5]}],gestures:[[61.2,'clip']],moods:[[61.2,'joy']]})],
 fx:[[62.0,'sparkles',{target:'u'}],[63.2,'hearts',{target:'u'}]],texts:[T(61.3,64.2,'HOLDING A CLIPBOARD',{y:150,size:72})]});
S(64.87,{set:'forest',camera:{zoom:[1.8,2.2],follow:'u',bgBlur:3},
 actors:[U([.6,4.6],{moods:[[64.9,'smug']],gestures:[[64.9,'think']]})],
 fx:[[65.6,'bulb',{target:'u'}],[66.2,'sparkles',{target:'u'}]],texts:[T(65.0,67.1,'YOU KNOW SOMETHING NOBODY KNOWS',{y:140,size:54})]});

// ---------- NEDRY PLAN (67-100s) ----------
S(67.68,{set:'office',transIn:'whip',camera:{zoom:[1,1.12],pan:[[-40,0],[40,0]]},
 actors:[NED([0,7],{moods:[[67.7,'smug']],gestures:[[67.7,'laptop']],poses:[[67.7,'back']]})],
 things:[{id:'mon',k:'monitors',at:[0,10.4],w:6,n:5,onAt:67.8,cols:['#3aff8a','#ffd24a','#ff4a3a']}],
 fx:[[69.0,'timer']],texts:[[67.8,70.8,'label','1:30 PM',{actor:'ned'}]]});
S(69.78,{set:'office',camera:{zoom:[1.1,1.6],follow:'ned'},
 actors:[NED([0,6],{moods:[[69.8,'smug']],gestures:[[69.8,'laptop']]})],
 things:[{id:'mon',k:'monitors',at:[0,10.4],w:6,n:5,onAt:67.8,offAt:72.0,cols:['#3aff8a','#ffd24a']}],
 fx:[[71.8,'glitchText'].slice(0,0).length?[71.8,'flash']:[71.8,'flash'],[72.0,'shake']],texts:[T(70.0,72.8,'PARK SECURITY: OFFLINE',{y:150,size:62,color:'#ff4a3a'})]});
S(73.26,{set:'office',camera:{zoom:[1.5,2.0],follow:'ned'},
 actors:[NED([0,5],{moods:[[73.3,'smug'],[74.8,'joy']],gestures:[[73.3,'money']]})],
 fx:[[73.7,'billRain'],[74.4,'moneyPop',{target:'ned'}]],texts:[T(73.4,75.9,'STEAL DINOSAUR EMBRYOS',{y:150,size:62})]});
S(76.16,{set:'office',camera:{zoom:[2.2,2.6],focus:[960,720]},
 actors:[NED([0,5],{moods:[[76.2,'smug']]})],
 things:[{id:'can',k:'can',at:[0.6,4.9],Y:.8,scale:5}],
 fx:[[76.9,'arrowPoint',{target:'can'}],[77.6,'sparkles',{target:'can'}]],texts:[T(76.3,78.6,'FAKE SHAVING CREAM CAN',{y:150,size:62})]});
S(78.82,{set:'office',camera:{zoom:[1,1.2],pan:[[-30,0],[30,0]]},
 actors:[],things:[{id:'mon',k:'monitors',at:[0,9],w:7,n:6,onAt:67,offAt:79.5},{id:'fe',k:'fence',at:[0,14],w:12,offAt:79.6,h:4}],
 fx:[[79.5,'flash'],[79.6,'shake'],[80.4,'lightning']],texts:[T(78.9,81.6,'POWER OUT = FENCES OUT',{y:150,size:62,color:'#ff4a3a'})]});
S(82.22,{set:'rainyNight',camera:{zoom:[1,1.2],follow:'u'},
 actors:[U([0,5],{moods:[[82.2,'sad']],gestures:[[82.2,'handsFace']]})],
 things:[{id:'jp',k:'jeep',at:[3.6,11],flip:true}],
 fx:[[82.6,'gloom',{target:'u'}],[83.2,'rain']],texts:[T(82.4,84.3,'FOUR PEOPLE DIE',{y:150,size:88,color:'#ff4a3a'})]});
S(84.32,{set:'rainyNight',camera:{zoom:[1.6,2.2],follow:'u',bgBlur:3},
 actors:[U([0,4.6],{moods:[[84.3,'angry'],[86.0,'smug']],gestures:[[84.3,'fists']]})],
 fx:[[84.8,'counter',{to:40,pre:'',post:' TIMES'}],[85.6,'zoomPunch',{target:'u'}],[86.0,'steam',{target:'u'}]],texts:[T(86.3,87.3,'NOT TODAY',{y:150,size:100,color:'#ffd24a'})]});

S(87.5,{set:'office',transIn:'whip',camera:{zoom:[1,1.15],pan:[[60,0],[-60,0]]},
 actors:[U([-3,5.4],{moves:[{t0:87.5,t1:89.0,to:[-1.4,5.4]}],gestures:[[87.5,'clip']],moods:[[87.5,'smug']]}),NED([1.6,6],{moods:[[87.5,'tired']],gestures:[[87.5,'laptop']]})],
 things:[{id:'mon',k:'monitors',at:[0,10.4],w:6,n:5,onAt:67}],
 fx:[[88.2,'sparkles',{target:'u'}]],texts:[T(87.6,89.2,'THE CONTROL ROOM',{y:150,size:70})]});
S(89.18,{set:'office',camera:{zoom:[1.5,2.0],follow:'ned'},
 actors:[NED([1.2,5],{moods:[[89.2,'tired']],gestures:[[89.2,'sandwich']]})],
 fx:[[90.4,'sweat',{target:'ned'}],[90.0,'sparkles',{target:'ned'}]],texts:[T(89.4,91.6,'STAINED SHIRT · CANDY',{y:150,size:60})]});
S(92.16,{set:'office',camera:{zoom:[1.2,1.7],follow:'ned',handheld:true},
 actors:[NED([1.2,5],{moods:[[92.2,'shock']],gestures:[[92.2,'laptop']]})],
 things:[{id:'mon',k:'monitors',at:[0,10],w:6,n:5,onAt:67}],
 fx:[[93.0,'typewriter'].slice(0,0).length?[93,'shake']:[93,'sweat',{target:'ned'}],[93.2,'speedLines']],texts:[[92.3,94.0,'bubble','typing… fast… too fast…',{actor:'ned'}]]});
S(94.06,{set:'office',camera:{zoom:[2.4,2.8],focus:[1250,760]},
 things:[{id:'can',k:'can',at:[1.3,4.4],Y:.8,scale:5}],
 actors:[NED([2.2,5],{pose:'back'})],fx:[[94.6,'arrowPoint',{target:'can'}],[95.2,'sparkles',{target:'can'}]],texts:[T(94.2,96.1,'A RED CAN OF BARBASOL',{y:150,size:58})]});
S(96.46,{set:'office',camera:{zoom:[1,1.2],follow:'u'},
 actors:[U([-3.2,5.4],{moves:[{t0:96.5,t1:98.4,to:[-.2,5.2]}],moods:[[96.5,'joy']],gestures:[[96.5,'wave']]}),NED([1.8,5.6],{moods:[[96.5,'shock']],gestures:[[96.5,'laptop']]})],
 fx:[[98.4,'exclaim',{target:'ned'}],[99.0,'sparkles',{target:'u'}]],texts:[]});
S(99.8,{set:'office',camera:{zoom:[1.4,1.9],follow:'u'},
 actors:[U([-.2,5],{moods:[[99.8,'joy']],gestures:[[99.8,'point']]}),NED([1.8,5.6],{moods:[[99.8,'shock']]})],
 fx:[[100.4,'question',{target:'u'}]],texts:[T(100.0,101.8,'THE MOST DANGEROUS QUESTION',{y:150,size:62,color:'#ff4a3a'})]});
S(101.9,{set:'office',camera:{zoom:[2.0,2.6],follow:'u',bgBlur:3},
 actors:[U([-.2,4.8],{moods:[[101.9,'joy']],talk:[[101.9,103.3],[103.7,104.3]],gestures:[[101.9,'talk']]})],
 fx:[[102.0,'sparkles',{target:'u'}]],texts:[[101.9,104.4,'bubble','Is that shaving cream? Can I borrow some?',{actor:'u'}]]});
S(104.82,{set:'office',camera:{zoom:[1.2,2.4],follow:'ned'},
 actors:[NED([1.4,5],{moods:[[104.8,'shock']],gestures:[[104.8,'handsFace']]})],
 fx:[[104.9,'freeze'],[105.1,'dizzy',{target:'ned'}],[105.8,'sweat',{target:'ned'}]],texts:[T(104.9,106.0,'HE FREEZES',{y:150,size:88})]});
S(105.8,{set:'office',camera:{zoom:[2.0,2.6],follow:'ned'},
 actors:[NED([1.4,4.8],{moods:[[105.8,'shock'],[106.6,'sad']]})],
 fx:[[106.0,'gloom',{target:'ned'}],[106.2,'tears',{target:'ned'}]],texts:[]});
S(107.5,{set:'office',camera:{zoom:[1,1.25],pan:[[-70,0],[70,0]]},
 actors:[NED([2.2,5.2],{moves:[{t0:107.5,t1:108.6,to:[-.6,5.2]}],gestures:[[107.5,'canp']],moods:[[107.5,'shock']]}),U([-2,5.6],{moves:[{t0:107.8,t1:109.3,to:[1,5.6]}],moods:[[107.8,'smug']]})],
 fx:[[108.0,'speedLines'],[108.6,'smokePuff',{target:'ned'}],[109.0,'impactStar',{target:'u'}]],texts:[T(107.6,109.4,'THE SCRAMBLE',{y:150,size:84})]});
S(109.42,{set:'office',camera:{zoom:[1.3,2.0],follow:'u'},
 actors:[U([.4,5],{gestures:[[109.4,'canp'],[110.8,'cheer']],moods:[[109.4,'smug'],[111.0,'joy']]})],
 things:[{id:'can',k:'can',at:[-1.6,5],Y:.8,scale:5}],
 fx:[[110.2,'whipPan'],[110.8,'check',{target:'u'}],[111.0,'sparkles',{target:'u'}]],texts:[T(109.6,112.0,'SWAP!',{y:160,size:110,color:'#ffd24a'})]});
S(112.38,{set:'office',camera:{zoom:[2.2,2.8],focus:[960,740]},
 things:[{id:'can',k:'can',at:[0,4.6],Y:.8,scale:6}],
 fx:[[112.6,'arrowPoint',{target:'can'}],[113.3,'sparkles',{target:'can'}]],texts:[T(112.5,114.4,'REMEMBER THAT CAN',{y:160,size:80,color:'#e3232c'})]});

// ---------- THE DOCKS (115-132s) ----------
S(115.26,{set:'harbor',transIn:'whip',camera:{zoom:[1,1.15],follow:'ned'},
 actors:[NED([-3,5.4],{moves:[{t0:115.3,t1:117,to:[1,5.4]}],gestures:[[115.3,'canp']],moods:[[115.3,'tired']]})],
 fx:[[115.6,'sweat',{target:'ned'}],[116.2,'dustRun',{target:'ned'}]],texts:[T(115.4,117.2,'NEDRY → THE DOCKS',{y:150,size:70})]});
S(117.64,{set:'harbor',camera:{zoom:[1,1.2],pan:[[40,0],[-40,0]]},
 actors:[NED([-1.8,5],{gestures:[[117.7,'canp']],moods:[[117.7,'smug']]}),GEN([1.8,5.2],{moods:[[117.7,'calm'],[119.2,'angry']],gestures:[[118.0,'crossed']]})],
 fx:[[118.6,'check',{target:'ned'}],[119.4,'cross',{target:'gen'}]],texts:[T(117.8,119.7,'A CAN OF SHAVING CREAM',{y:150,size:64})]});
S(120.14,{set:'harbor',camera:{zoom:[1.6,2.2],follow:'gen'},
 actors:[GEN([1.2,4.8],{moods:[[120.1,'angry']],gestures:[[120.1,'fists']]}),NED([-1.8,5],{moods:[[120.1,'shock']]})],
 fx:[[120.6,'anger',{target:'gen'}],[121.0,'steam',{target:'gen'}]],texts:[T(120.3,121.5,'NOT AMUSED',{y:150,size:84,color:'#ff4a3a'})]});
S(121.5,{set:'harbor',camera:{zoom:[1,1.1],focus:[960,500]},
 actors:[GEN([2.4,5.4],{moods:[[121.5,'angry']]})],fx:[[121.9,'question']],texts:[T(121.7,123.9,'NEDRY NEVER COMES BACK',{y:150,size:62})]});

// ---------- CONGRATULATIONS (123.94-132s): everything stays on ----------
S(123.94,{set:'office',camera:{zoom:[1,1.2],pan:[[-50,0],[50,0]]},
 actors:[U([0,5.6],{moods:[[123.9,'joy']],gestures:[[123.9,'cheer']]})],
 things:[{id:'mon',k:'monitors',at:[0,10.2],w:6,n:5,onAt:67}],
 fx:[[124.2,'check',{target:'u'}],[124.5,'sparkles',{target:'u'}]],texts:[T(124.0,125.7,'SECURITY: ON',{y:150,size:84,color:'#3aff8a'})]});
S(126.08,{set:'forest',camera:{zoom:[1,1.15],pan:[[80,0],[-80,0]]},
 things:[{id:'fe',k:'fence',at:[0,10],w:14,h:4}],actors:[U([-1.4,5.2],{moods:[[126.1,'joy']],gestures:[[126.1,'wave']]})],
 fx:[[126.2,'sparkles'],[126.9,'check',{target:'u'}]],texts:[T(126.2,128.2,'FENCES: ON',{y:150,size:84,color:'#3aff8a'})]});
S(127.44,{set:'forest',camera:{zoom:[1,1.3],follow:'u'},
 actors:[U([0,5],{moods:[[127.4,'joy']],gestures:[[127.4,'cheer']]})],
 fx:[[127.5,'godRays'],[128.4,'sparkles',{target:'u'}]],texts:[T(127.6,128.9,'LIGHTS: ON',{y:150,size:84,color:'#ffd24a'})]});
S(129.0,{set:'forest',camera:{zoom:[1.2,2.0],follow:'u'},
 actors:[U([0,4.8],{moods:[[129.0,'joy']],gestures:[[129.0,'cheer']]})],
 fx:[[129.1,'confetti'],[129.4,'fireworks'],[129.4,'zoomPunch',{target:'u'}]],texts:[T(129.2,131.7,'CONGRATULATIONS',{y:150,size:96,color:'#ffd24a'})]});
S(130.32,{set:'forest',camera:{zoom:[1.8,1.1],follow:'u'},
 actors:[U([0,4.8],{moods:[[130.3,'smug']],gestures:[[130.3,'crossed']]})],
 fx:[[130.8,'stamp',{text:'CANCELED'}],[130.9,'shake']],texts:[]});
