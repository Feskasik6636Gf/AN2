const {S}=require('./dsl.js');
const {T,U,NED,MAL,HAM,GRANT,TIM,LEX,ARN,GEN,ELL}=require('./cast.js');
const MON=(on=0,w=6,n=5,o={})=>({id:'mon',k:'monitors',at:[0,10.4],w,n,onAt:on,...o});

// ---------- THE TOUR THAT NEVER HAPPENS (132-166s) ----------
S(132.24,{set:'office',camera:{zoom:[1,1.15],pan:[[40,0],[-40,0]]},
 actors:[U([-1.5,5.4],{moods:[[132.2,'smug']],gestures:[[132.2,'crossed']]}),ELL([1.6,5.8],{moods:[[132.2,'calm']],gestures:[[132.2,'clip']]})],
 things:[MON(0,7,6,{cols:['#3aff8a','#8ad8ff']})],crowd:{x:[-4,4],z:[7,9],n:4,blurFar:6},
 fx:[[132.8,'sparkles',{target:'u'}]],texts:[T(132.4,134.6,'THE FUNNY PART',{size:80})]});
S(134.74,{set:'office',camera:{zoom:[1.4,1.1],follow:'u'},
 actors:[U([-1,5],{pose:'back',moods:[[134.8,'smug']]})],
 things:[MON(0,8,3,{cols:['#8ad8ff','#3aff8a','#ffd24a'],at:[0,8]})],
 fx:[[135.2,'spotlight',{target:'u'}]],texts:[[135.0,136.6,'label','VISITOR CENTER',{actor:'u'}]]});
S(136.76,{set:'forest',camera:{zoom:[1,1.1],pan:[[-120,0],[120,0]]},
 things:[{id:'j1',k:'jeep',at:[-5,9],moves:[{t0:136.8,t1:139,to:[5,9]}]},{id:'j2',k:'jeep',at:[-11,9],moves:[{t0:136.8,t1:139,to:[-1,9]}]},{id:'g',k:'goat',at:[3,6],scale:1.1}],
 fx:[[137.0,'dustRun'],[138.3,'sparkles']],texts:[]});
S(139.1,{set:'forest',camera:{zoom:[1.5,1.9],follow:'tim'},
 actors:[TIM([-.8,4.6],{moods:[[139.1,'tired']],gestures:[[139.1,'crossed']]}),LEX([.8,4.8],{moods:[[139.1,'tired']],gestures:[[139.1,'laptop']]})],
 fx:[[139.6,'zzz',{target:'tim'}]],texts:[[139.2,141.2,'bubble','So bored…',{actor:'tim'}]]});
S(141.4,{set:'forest',camera:{zoom:[1.6,2.0],follow:'grant'},
 actors:[GRANT([0,4.6],{moods:[[141.4,'tired']],gestures:[[141.4,'facepalm']]})],
 fx:[[141.8,'zzz',{target:'grant'}],[142.1,'sweat',{target:'grant'}]],texts:[T(141.5,142.9,'DR. GRANT: BORED',{size:70})]});
S(142.4,{set:'forest',camera:{zoom:[1.1,1.7],follow:'mal'},
 actors:[MAL([-.2,4.8],{moods:[[142.4,'smug']],gestures:[[142.4,'drink']],poses:[[142.4,'back']].slice(0,0)})],
 things:[{id:'j',k:'jeep',at:[2.8,8],moves:[{t0:142.4,t1:145.2,to:[0,8]}]}],
 fx:[[143.2,'sparkles',{target:'mal'}]],texts:[[142.6,145.2,'bubble','Is this a cooking show?',{actor:'mal'}]]});
S(145.48,{set:'farm',camera:{zoom:[1,1.15],pan:[[-70,0],[70,0]]},
 things:[{id:'fe',k:'fence',at:[0,12],w:16,h:4},{id:'cup',k:'cup',at:[0,4.8],Y:.7,scale:1.4,pulses:[]}],
 fx:[[146.3,'question'],[146.8,'sweat']],texts:[T(145.6,147.6,'THE BIG PADDOCK: EMPTY',{size:66})]});
S(147.9,{set:'farm',camera:{zoom:[1.2,1.6],focus:[960,520]},
 things:[{id:'fe',k:'fence',at:[0,10],w:14,h:4}],actors:[U([-1.8,5],{moods:[[147.9,'smug']],gestures:[[147.9,'pocket']]})],
 fx:[[148.4,'cross'],[148.9,'question',{target:'u'}]],texts:[T(148.0,149.5,'NO T-REX',{size:84,color:'#ff4a3a'})]});
S(149.5,{set:'farm',camera:{zoom:[1,1.2],pan:[[60,0],[-60,0]]},
 things:[{id:'fe',k:'fence',at:[0,9],w:18,h:4}],
 actors:[U([0,5],{moods:[[149.5,'calm']],gestures:[[149.5,'crossed']]})],
 fx:[[150.2,'cross',{target:'u'}],[151.0,'check',{target:'u'}],[152.0,'sparkles',{target:'u'}]],texts:[T(149.6,152.8,'NO STORM · NO SCREAM · NO BROKEN FENCE',{size:50})]});
S(153.56,{set:'farm',camera:{zoom:[1.4,2.0],follow:'g'},
 things:[{id:'g',k:'goat',at:[0,5],scale:2.2}],actors:[],
 fx:[[154.2,'arrowPoint',{target:'g'}]],texts:[[153.7,155.3,'label','A GOAT TIED TO A POST',{actor:'g'}]]});
S(155.58,{set:'farm',camera:{zoom:[1.8,2.4],follow:'g'},
 things:[{id:'g',k:'goat',at:[0,4.8],scale:2.6}],
 fx:[[155.8,'exclaim',{target:'g'}],[156.1,'sparkles',{target:'g'}]],texts:[T(155.7,157.2,'REMEMBER THAT GOAT',{size:76})]});
S(156.8,{set:'rainyNight',camera:{zoom:[1,1.3],follow:'g'},
 things:[{id:'g',k:'goat',at:[-2,6],scale:1.6},{id:'rex',k:'trex',at:[4,15],flip:true,mouth:[[157.2,158.4]]}],
 fx:[[157.2,'lightning'],[157.4,'shake'],[157.5,'dizzy',{target:'g'}]],texts:[T(156.9,158.4,'IT\'S IN THE MOVIE TO BE EATEN',{size:56,color:'#ff4a3a'})]});
S(158.56,{set:'farm',transIn:'flash',camera:{zoom:[1.2,2.2],follow:'g'},
 things:[{id:'g',k:'goat',at:[0,4.8],scale:2.4}],
 fx:[[159.2,'hearts',{target:'g'}],[159.6,'sparkles',{target:'g'}]],texts:[T(158.7,160.5,'THIS TIME IT JUST CHEWS',{size:72})]});
S(160.7,{set:'farm',camera:{zoom:[1.2,1.7],follow:'u'},
 actors:[U([-1.4,4.8],{moods:[[160.7,'love']],gestures:[[160.7,'point']]})],
 things:[{id:'g',k:'goat',at:[1.2,5],scale:1.6}],
 fx:[[161.0,'nameTag',{name:'KEVIN',sub:'THE GOAT • SURVIVOR'}],[161.1,'hearts',{target:'g'}]],texts:[]});
S(161.88,{set:'diningEvening',transIn:'fade',camera:{zoom:[1,1.15],pan:[[-60,0],[60,0]]},
 crowd:{x:[-4,4],z:[6.5,10],n:10,blurFar:6},
 actors:[U([-1.8,5],{moods:[[161.9,'joy']],gestures:[[161.9,'drink']]}),LEX([1.4,5.2],{moods:[[161.9,'joy']]})],
 fx:[[162.4,'sparkles'],[163.5,'hearts']],texts:[T(162.0,164.6,'GUESTS: RELAXED & SMILING',{size:66})]});
S(164.98,{set:'diningEvening',camera:{zoom:[1,1.3],follow:'u'},
 actors:[U([0,5],{moods:[[165,'joy']],gestures:[[165,'cheer']]}),TIM([-1.8,5.2],{moods:[[165,'joy']],gestures:[[165,'cheer']]}),LEX([1.8,5.2],{moods:[[165,'joy']],gestures:[[165,'cheer']]})],
 fx:[[165.2,'confetti'],[165.4,'check',{target:'u'}]],texts:[T(165.1,166.5,'EVERYONE IS ALIVE',{size:76,color:'#3aff8a'})]});
S(166.34,{set:'diningEvening',camera:{zoom:[1.2,1.6],pan:[[-60,0],[60,0]]},
 crowd:{x:[-4,4],z:[6,9],n:8,blurFar:5},
 actors:[GRANT([-1.2,4.8],{moods:[[166.3,'joy']],gestures:[[166.3,'sandwich']]}),TIM([1.2,5],{moods:[[166.3,'joy']],gestures:[[166.3,'sandwich']]})],
 fx:[[166.8,'sparkles'],[167.2,'hearts',{target:'tim'}]],texts:[T(166.4,167.7,'EVERYONE HAS DINNER',{size:72})]});
S(167.8,{set:'diningEvening',camera:{zoom:[1,1.6],follow:'ham'},
 actors:[HAM([0,5],{moods:[[167.8,'joy']],gestures:[[168.2,'drink']]})],crowd:{x:[-4,4],z:[7,10],n:8,blurFar:6},
 fx:[[168.4,'spotlight',{target:'ham'}],[169.0,'sparkles',{target:'ham'}]],texts:[[167.9,170.8,'label','JOHN HAMMOND',{actor:'ham'}]]});
S(171.26,{set:'diningEvening',camera:{zoom:[1.8,2.4],follow:'ham',bgBlur:3},
 actors:[HAM([0,4.6],{moods:[[171.3,'love']],gestures:[[171.3,'drink']]})],
 fx:[[171.8,'hearts',{target:'ham'}],[172.4,'sparkles',{target:'ham'}]],texts:[T(171.4,173.3,'OLD · KIND · PROUD',{size:76})]});
S(173.56,{set:'diningEvening',camera:{zoom:[1.1,1.9],follow:'ham'},
 actors:[HAM([0,5],{moods:[[173.6,'sad'],[175.4,'joy']],gestures:[[173.6,'pocket']],moves:[{t0:173.6,t1:176.3,to:[.8,5]}]})],
 fx:[[174.0,'counter',{to:1000000,pre:'$',post:'s'}],[175.2,'billRain']],texts:[T(173.7,176.4,'YEARS AND MILLIONS',{size:70})]});
S(176.76,{set:'diningEvening',camera:{zoom:[1,1.2],pan:[[40,0],[-40,0]]},
 actors:[HAM([0,5],{moods:[[176.8,'joy']],gestures:[[176.8,'cheer']]})],crowd:{x:[-4,4],z:[6.5,9],n:10,blurFar:6},
 fx:[[177.2,'godRays'],[177.6,'fireworks']],texts:[T(176.9,178.9,'FINALLY GETTING WHAT HE WANTED',{size:56})]});
S(179.12,{set:'diningEvening',camera:{zoom:[1.4,2.0],follow:'ham'},
 actors:[HAM([0,4.8],{moods:[[179.1,'joy']],gestures:[[179.1,'papers']]})],
 fx:[[179.6,'stamp',{text:'A+'}],[179.7,'shake'],[180.0,'sparkles',{target:'ham'}]],texts:[T(179.2,180.8,'A PERFECT REVIEW',{size:80,color:'#ffd24a'})]});
S(180.9,{set:'diningEvening',camera:{zoom:[1.2,1.8],follow:'ham'},
 actors:[HAM([0,4.8],{moods:[[180.9,'smug']],gestures:[[180.9,'papers']]}),GEN([-1.8,5],{moods:[[180.9,'smug']],gestures:[[180.9,'papers']]})],
 fx:[[181.4,'check',{target:'ham'}]],texts:[T(181,182.2,'THE INVESTORS SIGN',{size:72})]});
S(182.22,{set:'diningEvening',camera:{zoom:[1,1.25],pan:[[-60,0],[60,0]]},
 crowd:{x:[-4,4],z:[6,8.5],n:12,blurFar:5},actors:[ELL([-1.4,4.8],{moods:[[182.2,'joy']],gestures:[[182.2,'phone']]})],
 fx:[[182.6,'notification'].slice(0,0).length?[182.6,'sparkles']:[182.6,'sparkles'],[183.0,'likes']],texts:[T(182.3,183.8,'THE PRESS IS ON ITS WAY',{size:66})]});
S(183.78,{set:'streetDay',camera:{zoom:[1,1.2],follow:'u'},
 actors:[U([-1.4,5],{moods:[[183.8,'joy']],gestures:[[183.8,'wave']]})],things:[{id:'j',k:'jeep',at:[5,10],moves:[{t0:183.8,t1:185.8,to:[-5,10]}],flip:true}],
 fx:[[184.2,'timer'],[185.2,'confetti']],texts:[T(183.9,185.9,'OPENING IN 6 MONTHS',{size:72})]});

// ---------- THE BALCONY / MALCOLM (186-224s) ----------
S(186.26,{set:'rooftopNight',transIn:'fade',camera:{zoom:[1,1.2],follow:'u'},
 actors:[U([-1.6,5.2],{moves:[{t0:186.3,t1:187.8,to:[0,5.2]}],moods:[[186.3,'joy']],gestures:[[186.3,'cheer']]})],
 fx:[[187.2,'sparkles',{target:'u'}],[187.8,'hearts',{target:'u'}]],texts:[T(186.4,188.2,'YOU WALK OUT, GRINNING',{size:70})]});
S(188.32,{set:'rooftopNight',camera:{zoom:[1.6,2.2],follow:'u',bgBlur:3},
 actors:[U([0,4.6],{moods:[[188.3,'smug']],gestures:[[188.3,'fists']]})],
 fx:[[188.8,'check',{target:'u'}]],texts:[T(188.4,190,'NO ONE DIED. YOU DID IT!',{size:70,color:'#3aff8a'})]});
S(190.38,{set:'rooftopNight',camera:{zoom:[1,1.2],pan:[[50,0],[-50,0]]},
 actors:[U([-1,5.2],{moods:[[190.4,'joy']],gestures:[[190.4,'cheer']]}),MAL([3.4,5.4],{moves:[{t0:190.4,t1:192.6,to:[1.2,5.4]}],gestures:[[190.4,'drink']],moods:[[190.4,'smug']]})],
 fx:[[190.8,'exclaim',{target:'mal'}]],texts:[]});
S(193.9,{set:'rooftopNight',camera:{zoom:[1.8,2.4],follow:'mal',bgBlur:3},
 actors:[MAL([1.2,4.6],{moods:[[193.9,'smug']],gestures:[[193.9,'drink']]})],
 fx:[[194.6,'sparkles',{target:'mal'}],[195.2,'spotlight',{target:'mal'}]],texts:[T(194,196,'BLACK SHIRT · MESSY HAIR',{size:62})]});
S(196.22,{set:'rooftopNight',camera:{zoom:[1.2,1.6],follow:'mal'},
 actors:[MAL([.4,5],{moods:[[196.2,'smug']],gestures:[[196.2,'drink']]})],
 fx:[[196.4,'nameTag',{name:'DR. MALCOLM',sub:'MATHEMATICIAN • CHAOS'}],[196.5,'sparkles',{target:'mal'}]],texts:[]});
S(197.84,{set:'rooftopNight',camera:{zoom:[1,1.5],pan:[[-40,0],[40,-20]]},
 actors:[MAL([.8,5],{moods:[[197.8,'think']].map(x=>[x[0],'calm']),gestures:[[198,'think']]})],
 fx:[[198.4,'bulb',{target:'mal'}],[199.4,'dizzy',{target:'mal'}]],texts:[T(198,200.4,'THE CHAOS GUY',{size:76})]});
S(201.06,{set:'rooftopNight',camera:{zoom:[1.6,2.6],follow:'mal',bgBlur:3},
 actors:[MAL([.8,4.6],{moods:[[201.1,'calm']],gestures:[[201.1,'drink']]}),U([-1.4,5],{moods:[[201.1,'joy'],[202.6,'shock']]})],
 fx:[[202.0,'question',{target:'u'}],[202.6,'sweat',{target:'u'}]],texts:[]});
S(203.2,{set:'rooftopNight',camera:{zoom:[1.8,2.6],follow:'mal',bgBlur:4},
 actors:[MAL([.4,4.6],{moods:[[203.2,'smug']],talk:[[203.2,204.8]],gestures:[[203.2,'talk']]})],
 fx:[[204.2,'zoomPunch',{target:'mal'}]],texts:[[203.2,205,'bubble','You stopped the accident, didn\'t you?',{actor:'mal'}]]});
S(205.26,{set:'rooftopNight',camera:{zoom:[2.2,2.8],follow:'u',bgBlur:4},
 actors:[U([-.4,4.6],{moods:[[205.3,'joy'],[205.9,'sad']]})],
 fx:[[205.9,'sweat',{target:'u'}],[206.0,'gloom',{target:'u'}]],texts:[T(205.4,206.8,'YOUR SMILE SLIPS',{size:76})]});
S(207.28,{set:'rooftopNight',camera:{zoom:[1.2,1.7],follow:'mal'},
 actors:[MAL([.8,5],{moods:[[207.3,'smug']],talk:[[207.3,208.5],[208.9,209.9]],gestures:[[207.3,'talk']]}),U([-1.6,5.2],{moods:[[207.3,'sad']]})],
 fx:[[209.0,'dizzy',{target:'u'}]],texts:[[207.3,210.4,'bubble','I\'ve been waiting for it all day. I\'m almost disappointed.',{actor:'mal',dy:-20}]]});
S(210.54,{set:'rooftopNight',camera:{zoom:[2.4,2.0],follow:'mal'},
 actors:[MAL([.6,4.6],{moods:[[210.5,'calm']],gestures:[[210.5,'drink']]})],
 fx:[[211.0,'bubbles',{target:'mal'}],[211.2,'sparkles',{target:'mal'}]],texts:[]});
S(212.14,{set:'rooftopNight',camera:{zoom:[1.2,2.2],follow:'mal'},
 actors:[MAL([.4,5],{moods:[[212.1,'smug']],talk:[[212.1,213.3]],gestures:[[212.1,'talk']]})],
 fx:[[213.0,'question',{target:'mal'}]],texts:[[212.2,213.5,'bubble','You know what that accident was?',{actor:'mal'}]]});
S(213.62,{set:'rooftopNight',camera:{zoom:[1,1.3],pan:[[0,0],[0,-30]]},
 actors:[MAL([.8,5.2],{talk:[[213.6,216.6]],gestures:[[213.6,'talk']],moods:[[213.6,'angry']]}),U([-1.6,5.4],{moods:[[213.6,'shock']]})],
 things:[{id:'fe',k:'fence',at:[0,14],w:12,h:4,offAt:216}],
 fx:[[215.0,'lightning'],[216.0,'shake'],[216.2,'flash']],texts:[T(213.8,217,'THE ONLY THING THAT COULD SHUT IT DOWN',{size:50,color:'#ff4a3a'})]});

// ---------- COMMENT BREAK (217-224s) ----------
S(217.38,{set:'rooftopNight',camera:{zoom:[1,1.15],follow:'u'},
 actors:[U([0,5],{moods:[[217.4,'smug']],gestures:[[217.4,'point']]})],
 fx:[[217.6,'freeze'],[218.0,'speedLines']],texts:[T(217.5,218.5,'QUICK PAUSE',{size:84})]});
S(218.46,{set:'cinema',transIn:'whip',camera:{zoom:[1.2,1.6],follow:'u'},
 actors:[U([0,5],{moods:[[218.5,'joy']],gestures:[[218.5,'popcorn']]})],
 fx:[[218.8,'question',{target:'u'}],[219.2,'bulb',{target:'u'}]],texts:[T(218.6,220,'WHICH MOVIE NEXT?',{size:84,color:'#ffd24a'})]});
S(220.1,{set:'cinema',camera:{zoom:[1.4,1.1],follow:'u'},
 actors:[U([0,5],{moods:[[220.1,'joy']],gestures:[[220.1,'phone']]})],
 fx:[[220.6,'likes'],[220.8,'arrowPoint',{target:'u'}]],texts:[T(220.2,221.4,'DROP A NAME BELOW',{size:78})]});
S(221.52,{set:'cinema',camera:{zoom:[1.2,1.6],follow:'u'},
 actors:[U([0,5],{moods:[[221.5,'love']],gestures:[[221.5,'cheer']]})],
 fx:[[221.8,'hearts',{target:'u'}],[222.2,'likes'],[222.6,'confetti']],texts:[T(221.6,223,'MOST LIKED GETS LIVED IN',{size:62})]});
S(223.12,{set:'rooftopNight',transIn:'whip',camera:{zoom:[1.6,2.0],follow:'u'},
 actors:[U([0,4.6],{moods:[[223.1,'shock']],gestures:[[223.1,'think']]})],
 fx:[[223.5,'dizzy',{target:'u'}],[223.8,'question',{target:'u'}]],texts:[T(223.2,224.2,'LET THAT SINK IN',{size:78})]});

// ---------- PARK SUCCEEDS = PROBLEM (224-262s) ----------
S(224.38,{set:'rainyNight',camera:{zoom:[1,1.2],follow:'rex'},
 things:[{id:'rex',k:'trex',at:[0,16],mouth:[[224.4,226]]}],actors:[],
 fx:[[224.8,'lightning'],[225.4,'shake']],texts:[T(224.5,226.2,'MOVIE: THE PARK FAILS IN ONE NIGHT',{size:52})]});
S(226.34,{set:'streetDay',camera:{zoom:[1,1.2],pan:[[40,0],[-40,0]]},
 things:[{id:'fe',k:'fence',at:[0,14],w:14,h:4},{id:'j',k:'jeep',at:[-4,9],moves:[{t0:226.3,t1:229,to:[4,9]}]}],
 actors:[U([-1.8,5],{moods:[[226.3,'smug']],gestures:[[226.3,'cheer']]})],
 fx:[[227.0,'cross'],[228.0,'check',{target:'u'}]],texts:[T(226.4,228,'NOBODY EVER OPENS IT',{size:70})]});
S(229.8,{set:'streetDay',camera:{zoom:[1,1.2],follow:'u'},crowd:{x:[-5,5],z:[6,12],n:20,blurFar:8},
 actors:[U([0,5],{moods:[[229.8,'joy']],gestures:[[229.8,'cheer']]})],
 fx:[[230.2,'fireworks'],[230.4,'godRays']],texts:[T(229.9,231.3,'HERE IT WORKS',{size:90,color:'#3aff8a'})]});
S(231.34,{set:'farm',camera:{zoom:[1,1.2],pan:[[-80,0],[80,0]]},
 things:[{id:'g1',k:'goat',at:[-3,6]},{id:'g2',k:'goat',at:[-1.2,7],moves:[{t0:231.4,t1:233,to:[-.4,7]}]},{id:'g3',k:'goat',at:[1.4,6.2]},{id:'g4',k:'goat',at:[3,7.4]},{id:'r',k:'raptor',at:[4.4,9],flip:true,tilt:8}],
 fx:[[231.8,'counter',{to:400,pre:'+',post:' MORE'}],[232.4,'sparkles']],texts:[T(231.4,233.3,'HUNDREDS OF ANIMALS, BRED IN SECRET',{size:52})]});
S(232.78,{set:'streetDay',camera:{zoom:[1,1.3],focus:[960,560]},crowd:{x:[-6,6],z:[5.5,12],n:26,blurFar:8},
 actors:[U([0,4.8],{moods:[[232.8,'shock']],gestures:[[232.8,'handsFace']]})],
 fx:[[233.4,'counter',{to:5000,pre:'',post:' GUESTS / WEEK'}],[234.4,'billRain']],texts:[]});
S(235.56,{set:'rooftopNight',camera:{zoom:[1.5,2.0],follow:'mal'},
 actors:[MAL([.6,4.8],{moods:[[235.6,'calm']],talk:[[235.6,236.6]],gestures:[[235.6,'drink']]}),U([-1.6,5.2],{moods:[[235.6,'shock']]})],
 fx:[[236.0,'sparkles',{target:'mal'}]],texts:[[235.7,237,'bubble','Calm… very calm…',{actor:'mal'}]]});
S(237.22,{set:'rooftopNight',camera:{zoom:[1,1.4],follow:'mal'},
 actors:[MAL([.4,5],{talk:[[237.2,240.4]],gestures:[[237.2,'talk']],moods:[[237.2,'calm']]})],
 fx:[[238.0,'bulb',{target:'mal'}],[239.4,'dizzy',{target:'mal'}]],texts:[T(237.4,240.6,'SYSTEMS LIKE THIS DON\'T STAY STABLE',{size:52})]});
S(240.96,{set:'rooftopNight',camera:{zoom:[1.6,2.2],follow:'mal'},
 actors:[MAL([.4,4.6],{moods:[[241,'angry']],gestures:[[241,'fists']]})],
 fx:[[241.4,'cross',{target:'mal'}],[241.8,'shake']],texts:[T(241.1,242.5,'THEY DON\'T BREAK ONCE',{size:70})]});
S(242.64,{set:'rooftopNight',camera:{zoom:[1,1.25],pan:[[-50,0],[50,0]]},
 things:[{id:'fe',k:'fence',at:[0,13],w:14,h:4,offAt:244.3,fallAt:244.4,gapX:2}],
 actors:[MAL([.6,5],{talk:[[242.6,245.7]],gestures:[[242.6,'talk']]}),U([-1.6,5.2],{moods:[[242.6,'shock']]})],
 fx:[[244.4,'explosion'],[244.5,'shake']],texts:[T(242.8,245.8,'THEY BREAK WHEN THEY\'RE TOO BIG TO HIDE',{size:48,color:'#ff4a3a'})]});
S(246.38,{set:'rooftopNight',camera:{zoom:[1.8,2.4],follow:'mal'},
 actors:[MAL([.4,4.6],{moods:[[246.4,'smug']],gestures:[[246.4,'think']]})],
 fx:[[246.8,'question',{target:'mal'}]],texts:[T(246.5,247.5,'THINK ABOUT IT',{size:84})]});
S(247.58,{set:'scienceLab',camera:{zoom:[1,1.2],pan:[[-60,0],[60,0]]},
 actors:[ELL([-1.2,5],{moods:[[247.6,'calm']],gestures:[[247.6,'think']]})],
 things:[{id:'g',k:'goat',at:[1.6,5.6],scale:1}],
 fx:[[248.4,'bulb',{target:'ell'}],[249.2,'sparkles']],texts:[T(247.7,249.6,'ANCIENT DNA',{size:80,color:'#8ad8ff'})]});
S(249.5,{set:'scienceLab',camera:{zoom:[1.2,1.8],follow:'ell'},
 actors:[ELL([0,4.8],{moods:[[249.5,'shock']],gestures:[[249.5,'handsFace']]})],
 things:[{id:'bird',k:'goat',at:[1.9,5.4],scale:.7}],
 fx:[[250.3,'bubbles'],[251.0,'sparkles',{target:'ell'}]],texts:[T(249.6,252.3,'GAPS FILLED WITH FROG GENES',{size:58})]});
S(252.84,{set:'scienceLab',camera:{zoom:[1.4,2.0],follow:'ell'},
 actors:[ELL([0,4.8],{moods:[[252.8,'smug']],gestures:[[252.8,'clip']]})],
 fx:[[253.6,'check',{target:'ell'}]],texts:[T(252.9,255.4,'EVERY DINOSAUR: FEMALE',{size:66,color:'#ff7fb0'})]});
S(255.58,{set:'farm',camera:{zoom:[1.6,2.4],focus:[960,740]},
 things:[{id:'egg',k:'can',at:[0,4.6],Y:0,scale:6}],
 fx:[[256.0,'exclaim'],[256.3,'cross']],texts:[T(255.7,256.7,'THEY FOUND EGGS ANYWAY',{size:60,color:'#ff4a3a'})]});
S(256.6,{set:'farm',camera:{zoom:[1,1.3],follow:'u'},
 actors:[U([0,5],{moods:[[256.6,'shock']],gestures:[[256.6,'handsFace']]})],
 things:[{id:'r',k:'raptor',at:[3.4,8],flip:true,moves:[{t0:256.6,t1:258.6,to:[1.4,7]}]}],
 fx:[[257.4,'exclaim',{target:'u'}],[258.0,'sweat',{target:'u'}]],texts:[T(256.7,258.8,'NEVER UNDER CONTROL',{size:70})]});
S(259.28,{set:'farm',camera:{zoom:[1.2,1.8],follow:'u'},
 actors:[U([0,4.8],{moods:[[259.3,'sad']],gestures:[[259.3,'shrug']]})],
 fx:[[260.0,'sparkles',{target:'u'}],[260.6,'gloom',{target:'u'}]],texts:[T(259.4,261.7,'LUCK RUNS OUT',{size:84,color:'#ffd24a'})]});
S(262.18,{set:'rooftopNight',camera:{zoom:[1.8,2.2],follow:'u'},
 actors:[U([0,4.6],{moods:[[262.2,'sad']],gestures:[[262.2,'handsFace']]})],
 fx:[[262.8,'tears',{target:'u'}],[263.0,'cross',{target:'u'}]],texts:[T(262.3,263.9,'YOU DIDN\'T SAVE THEM',{size:78,color:'#ff4a3a'})]});
S(263.98,{set:'rooftopNight',camera:{zoom:[1.2,1.8],pan:[[0,0],[0,-30]]},
 actors:[U([0,5],{moods:[[264,'shock']],gestures:[[264,'fists']]})],
 things:[{id:'fe',k:'fence',at:[0,14],w:14,h:4,offAt:265}],
 fx:[[264.4,'timer'],[265,'lightning']],texts:[T(264.1,266,'YOU GAVE THE DISASTER TIME TO GROW',{size:50})]});
