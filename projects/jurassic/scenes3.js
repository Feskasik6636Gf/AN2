const {S}=require('./dsl.js');
const {T,U,NED,MAL,HAM,GRANT,TIM,LEX,ARN,GEN,ELL}=require('./cast.js');
const MON=(on=0,w=6,n=5,o={})=>({id:'mon',k:'monitors',at:[0,10.4],w,n,onAt:on,...o});

// ---------- GIVING THE CAN BACK (266-290s) ----------
S(266.5,{set:'hallway',transIn:'whip',camera:{zoom:[1,1.2],follow:'u'},
 actors:[U([-1.4,6],{moves:[{t0:266.5,t1:269.2,to:[.2,5]}],moods:[[266.5,'smug']],gestures:[[266.5,'cheer']]})],
 fx:[[266.8,'sparkles',{target:'u'}],[268.6,'speedLines']],texts:[T(266.6,269.4,'WHAT NO MOVIE HERO DOES',{size:62})]});
S(269.7,{set:'office',camera:{zoom:[1,1.3],pan:[[-60,0],[60,0]]},
 actors:[U([-3,5.6],{moves:[{t0:269.7,t1:272,to:[.6,5.4]}],moods:[[269.7,'calm']],gestures:[[269.7,'crossed']]})],
 things:[MON(0,7,6,{cols:['#3aff8a','#ffd24a','#8ad8ff']})],
 fx:[[270.4,'dustRun',{target:'u'}]],texts:[T(269.8,271.3,'BACK TO THE CONTROL ROOM',{size:60})]});
S(271.2,{set:'office',camera:{zoom:[1.4,2.0],follow:'u'},
 actors:[U([.6,4.8],{moods:[[271.2,'sad']],gestures:[[271.2,'fists']]})],
 fx:[[272,'sweat',{target:'u'}],[272.9,'gloom',{target:'u'}]],texts:[T(271.3,273.8,'THE ONE THING YOU SWORE YOU WOULDN\'T',{size:48})]});
S(273.96,{set:'office',camera:{zoom:[2.4,2.8],focus:[960,740]},
 things:[{id:'can',k:'can',at:[0,4.6],Y:.8,scale:6}],
 fx:[[274.3,'arrowPoint',{target:'can'}],[274.8,'sparkles',{target:'can'}]],texts:[T(274,275.8,'GIVE THE CAN BACK',{size:80})]});
S(275.86,{set:'scienceLab',camera:{zoom:[1.8,2.6],focus:[960,720]},
 things:[{id:'can',k:'can',at:[0,4.6],Y:.8,scale:6}],
 fx:[[276.4,'bubbles',{target:'can'}],[276.9,'exclaim',{target:'can'}],[277.4,'glow'].slice(0,0).length?[277.4,'sparkles']:[277.4,'sparkles',{target:'can'}]],texts:[T(276,278.5,'THE REAL CAN · REAL EMBRYOS',{size:56})]});
S(278.78,{set:'hallway',camera:{zoom:[1,1.3],follow:'u'},
 actors:[U([-1.4,5],{moves:[{t0:278.8,t1:280.3,to:[-.2,5]}],gestures:[[278.8,'canp']],moods:[[278.8,'calm']]}),NED([1.6,5.4],{moods:[[278.8,'tired']],moves:[{t0:278.8,t1:280.3,to:[.8,5.4]}]})],
 fx:[[280,'exclaim',{target:'ned'}]],texts:[T(278.9,280.4,'IN THE HALLWAY',{size:70})]});
S(280.38,{set:'hallway',camera:{zoom:[1.5,2.1],follow:'u',bgBlur:3},
 actors:[U([-.2,4.8],{moods:[[280.4,'sad']],gestures:[[280.4,'canp']]})],
 fx:[[281.0,'sweat',{target:'u'}],[281.8,'gloom',{target:'u'}]],texts:[T(280.5,282.8,'THE WORST SENTENCE OF YOUR LIFE',{size:56,color:'#ff4a3a'})]});
S(282.96,{set:'hallway',camera:{zoom:[2.0,2.6],follow:'u',bgBlur:4},
 actors:[U([-.2,4.6],{moods:[[283,'sad']],talk:[[283,283.7]],gestures:[[283,'canp']]})],
 fx:[[283.4,'zoomPunch',{target:'u'}]],texts:[[283,284.1,'bubble','You drop this.',{actor:'u'}]]});
S(284.16,{set:'hallway',camera:{zoom:[1.6,2.4],follow:'ned'},
 actors:[NED([.8,4.8],{moods:[[284.2,'shock']],gestures:[[284.2,'canp']]}),U([-1.4,5.2],{moods:[[284.2,'sad']]})],
 fx:[[284.4,'freeze'],[285.0,'dizzy',{target:'ned'}]],texts:[]});
S(285.82,{set:'hallway',camera:{zoom:[2.2,2.8],follow:'ned',bgBlur:4},
 actors:[NED([.8,4.6],{moods:[[285.8,'smug']],gestures:[[285.8,'canp']]})],
 fx:[[286.2,'sparkles',{target:'ned'}],[286.6,'anger',{target:'ned'}]],texts:[T(285.9,287.2,'AND HE SMILES',{size:84})]});
S(287.28,{set:'hallway',camera:{zoom:[1.2,1.7],follow:'ned'},
 actors:[NED([.8,5],{moods:[[287.3,'smug']],moves:[{t0:287.3,t1:288.6,to:[2.4,5.6]}],gestures:[[287.3,'canp']]}),U([-1.2,5.2],{moods:[[287.3,'angry']],gestures:[[287.3,'point']]})],
 fx:[[287.6,'cross',{target:'ned'}],[288.0,'zoomPunch',{target:'ned'}]],texts:[[287.4,288.6,'bubble','Wrong time to smile, Dennis.',{actor:'u'}]]});

// ---------- 1:30 POWER DIES (289-310s) ----------
S(289.5,{set:'office',camera:{zoom:[1,1.2],follow:'u'},
 actors:[U([0,5.4],{moods:[[289.5,'shock']]})],things:[MON(0,7,6,{offAt:290.6,cols:['#3aff8a','#ffd24a']})],
 fx:[[289.8,'timer'],[290.6,'flash'],[290.7,'shake']],texts:[T(289.6,291.4,'1:30 — POWER DIES',{size:78,color:'#ff4a3a'})]});
S(291.56,{set:'forest',camera:{zoom:[1,1.3],pan:[[-80,0],[80,0]]},
 things:[{id:'fe',k:'fence',at:[0,10],w:16,h:4,offAt:292.4},{id:'fe2',k:'fence',at:[0,16],w:20,h:4,offAt:293}],
 fx:[[292.4,'lightning'],[293.0,'flash']],texts:[T(291.7,293.8,'THE FENCES GO DARK',{size:72})]});
S(293.94,{set:'office',camera:{zoom:[1.3,2.0],follow:'u',handheld:true},
 actors:[U([0,4.8],{moods:[[293.9,'shock']],gestures:[[293.9,'fists']]})],things:[MON(0,7,6,{offAt:294})],
 fx:[[294.4,'sweat',{target:'u'}],[295,'dizzy',{target:'u'}],[295.2,'shake']],texts:[T(294,295.8,'HANDS SHAKING',{size:76})]});
S(296.24,{set:'rainyNight',camera:{zoom:[1,1.2],pan:[[-70,0],[70,0]]},
 things:[{id:'j1',k:'jeep',at:[-3,9],moves:[{t0:296.3,t1:297.3,to:[0,9]}]},{id:'j2',k:'jeep',at:[-9,9],moves:[{t0:296.3,t1:297.9,to:[-4,9]}]}],
 fx:[[297.2,'freeze'],[297.4,'shake']],texts:[T(296.3,298.4,'TOUR CARS STOP DEAD',{size:70})]});
S(298.68,{set:'rainyNight',camera:{zoom:[1.2,1.8],follow:'u'},
 actors:[U([0,5],{moods:[[298.7,'shock']],gestures:[[298.7,'point']]})],
 fx:[[298.8,'rain'],[299.2,'lightning']],texts:[]});
S(299.82,{set:'rainyNight',camera:{zoom:[1,1.4],focus:[960,460]},
 things:[{id:'fe',k:'fence',at:[0,12],w:16,h:4,offAt:300}],
 fx:[[300,'rain'],[300.3,'lightning'],[301,'shake']],texts:[T(299.9,301.3,'A STORM ROLLS IN',{size:72})]});
S(301.38,{set:'rainyNight',camera:{zoom:[1,1.5],follow:'rex'},
 things:[{id:'fe',k:'fence',at:[0,10],w:18,h:4,offAt:300},{id:'rex',k:'trex',at:[0,20],flip:true,mouth:[[302.4,303.4]]}],
 fx:[[301.6,'rain'],[302.6,'exclaim',{target:'rex'}]],texts:[T(301.5,303.5,'THE T-REX FENCE GOES QUIET',{size:56})]});
S(304.08,{set:'rainyNight',camera:{zoom:[1.4,2.2],follow:'u'},
 actors:[U([0,4.8],{moods:[[304.1,'shock']],gestures:[[304.1,'handsFace']]})],
 fx:[[304.4,'rain'],[304.6,'dollyZoom',{target:'u'}],[305.2,'question',{target:'u'}]],texts:[T(304.2,306.1,'YOU KNOW WHAT HAPPENS NEXT',{size:56})]});

// ---------- THE PADDOCK (306-340s) ----------
S(306.28,{set:'rainyNight',camera:{zoom:[2.0,3.0],focus:[960,740]},
 things:[{id:'cup',k:'cup',at:[0,4.6],Y:.7,scale:2.2,pulses:[306.8,307.5,308.2]}],
 fx:[[306.8,'rain'],[307.0,'shockwave',{target:'cup'}],[307.6,'shake']],texts:[T(306.4,308.8,'A CUP OF WATER · A RIPPLE · TWO RINGS',{size:50})]});
S(309.5,{set:'cinema',camera:{zoom:[1,1.2],follow:'u'},
 actors:[U([0,5.4],{pose:'back',moods:[[309.5,'calm']]})],
 fx:[[310,'cross'],[310.6,'flash']],texts:[T(309.6,311.8,'BUT NOT FROM ROW NINE',{size:70})]});
S(311.94,{set:'rainyNight',transIn:'flash',camera:{zoom:[1.2,1.6],follow:'u'},
 actors:[U([-3,5.6],{moves:[{t0:311.9,t1:312.5,to:[0,5.6]}],moods:[[311.9,'angry']],gestures:[[311.9,'fists']]})],
 fx:[[312,'dustRun',{target:'u'}],[312.2,'speedLines']],texts:[T(312,313,'YOU\'RE RUNNING',{size:84})]});
S(312.72,{set:'rainyNight',camera:{zoom:[1,1.25],follow:'u'},
 actors:[U([-3,5.4],{moves:[{t0:312.7,t1:314.6,to:[2.4,5.4]}],moods:[[312.7,'angry']]})],
 things:[{id:'fe',k:'fence',at:[0,12],w:18,h:4,offAt:300},{id:'j',k:'jeep',at:[4.6,9],flip:true}],
 fx:[[313,'rain'],[313.2,'dustRun',{target:'u'}]],texts:[T(312.8,314.8,'YOU REACH THE PADDOCK FIRST',{size:56})]});
S(315.16,{set:'rainyNight',camera:{zoom:[1.5,2.0],follow:'tim'},
 things:[{id:'j',k:'jeep',at:[0,7],scale:1.6}],
 actors:[TIM([-1,4.6],{moods:[[315.2,'shock']],gestures:[[315.2,'handsFace']]}),LEX([1,4.6],{moods:[[315.2,'shock']],gestures:[[315.2,'handsFace']]})],
 fx:[[315.6,'rain'],[316,'exclaim',{target:'tim'}],[316.2,'exclaim',{target:'lex'}]],texts:[]});
S(317.74,{set:'rainyNight',camera:{zoom:[1.8,2.4],follow:'gen'},
 actors:[GEN([0,4.6],{moods:[[317.7,'shock']],gestures:[[317.7,'handsFace']],moves:[{t0:318.6,t1:321,to:[3.6,4.6]}]})],
 fx:[[318.4,'exclaim',{target:'gen'}],[319,'speedLines'],[320,'sweat',{target:'gen'}]],texts:[T(317.8,321,'THE LAWYER — FIRST TO LEAVE',{size:56})]});
S(321.6,{set:'rainyNight',camera:{zoom:[1.2,1.8],follow:'tim'},
 actors:[TIM([-1,4.6],{moods:[[321.6,'shock']],gestures:[[321.6,'cheer']],talk:[[321.6,322.4]]}),LEX([1,4.6],{moods:[[321.6,'shock']],gestures:[[321.6,'cheer']],talk:[[321.6,322.4]]})],
 fx:[[321.8,'shake'],[322,'sweat',{target:'tim'}]],texts:[[321.7,322.6,'bubble','AAAAH!',{actor:'tim'}]]});
S(323.04,{set:'rainyNight',camera:{zoom:[1,1.6],follow:'rex'},
 things:[{id:'fe',k:'fence',at:[0,14],w:16,h:4,offAt:300,fallAt:324.4,gapX:0},{id:'rex',k:'trex',at:[0,20],flip:true,moves:[{t0:323,t1:326,to:[0,13.5]}],mouth:[[324,325.8]]}],
 fx:[[323.4,'lightning'],[324.5,'shake'],[324.7,'explosion',{target:'rex'}]],texts:[T(323.1,325.9,'THE T-REX STEPS THROUGH',{size:66,color:'#ff4a3a'})]});
S(326.48,{set:'rainyNight',camera:{zoom:[1,1.3],follow:'rex'},
 actors:[U([-3.4,5.4],{moods:[[326.5,'shock']]})],
 things:[{id:'rex',k:'trex',at:[1,12],flip:true,mouth:[[326.5,329]]}],
 fx:[[327,'arrowPoint',{target:'rex'}],[327.6,'sparkles',{target:'rex'}]],texts:[T(326.6,329.6,'20 FEET TALL · TEETH LIKE BANANAS',{size:52,color:'#ffd24a'})]});
S(329.86,{set:'rainyNight',camera:{zoom:[1.6,2.4],follow:'rex'},
 things:[{id:'rex',k:'trex',at:[1,9],flip:true,mouth:[[330,332.4]]}],
 fx:[[330.2,'shockwave',{target:'rex'}],[330.8,'zoomPunch',{target:'rex'}]],texts:[T(329.9,332.5,'A SECRET FROM THE REAL FILM CREW',{size:52})]});
S(332.84,{set:'rainyNight',camera:{zoom:[1,1.3],focus:[960,520]},
 things:[{id:'rex',k:'trex',at:[1,11],flip:true,mouth:[[332.9,334.1]]}],
 fx:[[333.2,'question',{target:'rex'}]],texts:[T(332.9,334.5,'THE ROAR ISN\'T ONE ANIMAL',{size:62})]});
S(334.58,{set:'farm',transIn:'flash',camera:{zoom:[1,1.2],pan:[[-70,0],[70,0]]},
 things:[{id:'g',k:'goat',at:[-2.6,5.6],scale:1.4},{id:'r',k:'raptor',at:[0,6],flip:true,scale:.9,tilt:8},{id:'t',k:'goat',at:[2.4,6],scale:1.3}],
 fx:[[335,'sparkles'],[336,'sparkles'],[337,'sparkles']],texts:[[334.7,336.2,'label','BABY ELEPHANT',{actor:'g'}],[336,337.7,'label','TIGER',{actor:'r'}],T(334.7,337.8,'ELEPHANT + TIGER + ALLIGATOR',{size:54})]});
S(338.12,{set:'rainyNight',camera:{zoom:[1.4,2.2],follow:'rex'},
 things:[{id:'rex',k:'trex',at:[2,10],flip:true,mouth:[[338.2,340]]}],actors:[U([-2,4.8],{moods:[[338.1,'shock']]})],
 fx:[[338.6,'sweat',{target:'u'}],[339.2,'shake']],texts:[T(338.2,340.4,'HOW GOOD IS THAT MIX?',{size:62})]});

// ---------- THE FLARE (340-366s) ----------
S(340.52,{set:'rainyNight',camera:{zoom:[1.6,2.2],follow:'u'},
 actors:[U([0,4.8],{moods:[[340.5,'angry']],gestures:[[341,'flare']]})],
 fx:[[340.9,'sparkles',{target:'u'}],[341.3,'fire',{target:'u'}].slice(0,0).length?[341.3,'sparkles']:[341.3,'exclaim',{target:'u'}]],texts:[T(340.6,342.2,'YOU GRAB A FLARE',{size:78,color:'#ff9a3c'})]});
S(342.64,{set:'rainyNight',camera:{zoom:[1,1.3],follow:'u'},
 actors:[U([-2.4,5.4],{moves:[{t0:342.6,t1:343.8,to:[0,5]}],gestures:[[342.6,'flare']],moods:[[342.6,'angry']]})],
 fx:[[343,'rain'],[343.2,'dustRun',{target:'u'}]],texts:[T(342.7,344,'YOU STEP INTO THE RAIN',{size:62})]});
S(343.88,{set:'rainyNight',camera:{zoom:[1.2,2.2],follow:'u'},
 actors:[U([0,4.8],{moods:[[343.9,'angry']],gestures:[[343.9,'flare']],talk:[[344.4,346.4]]})],
 things:[{id:'rex',k:'trex',at:[3,14],flip:true,mouth:[[343.9,346]]}],
 fx:[[344.4,'speedLines'],[345,'zoomPunch',{target:'u'}],[345.4,'shake']],texts:[[344.4,346.4,'bubble','HEY! OVER HERE!',{actor:'u'}]]});
S(346.82,{set:'forest',camera:{zoom:[1.1,1.7],follow:'u'},
 actors:[U([-.4,4.8],{moods:[[346.8,'angry']],gestures:[[346.8,'cheer'],[347.8,'point']]})],
 fx:[[347.6,'speedLines'],[348,'impactStar',{target:'u'}],[348.6,'fireworks']],texts:[T(346.9,349,'THROW IT AS FAR AS YOU CAN!',{size:54})]});
S(349.48,{set:'forest',camera:{zoom:[1,1.5],follow:'rex'},
 things:[{id:'rex',k:'trex',at:[3,14],flip:false,moves:[{t0:349.5,t1:350.7,to:[2,14]}],mouth:[[349.5,350.7]]}],
 fx:[[349.8,'shockwave',{target:'rex'}],[350.3,'exclaim',{target:'rex'}]],texts:[T(349.6,350.8,'THE T-REX TURNS',{size:84,color:'#ff4a3a'})]});
S(351.2,{set:'forest',camera:{zoom:[1,1.4],pan:[[-60,0],[60,0]]},
 things:[{id:'rex',k:'trex',at:[-5,13],moves:[{t0:351.2,t1:352.8,to:[4,13]}],mouth:[[351.2,352.8]]}],
 fx:[[351.4,'speedLines'],[351.8,'shake'],[352.4,'dustRun']],texts:[T(351.3,352.9,'LIKE A FREIGHT TRAIN',{size:70})]});
S(352.98,{set:'forest',camera:{zoom:[1,1.3],follow:'u'},
 actors:[U([2.6,5.6],{moves:[{t0:353,t1:355.5,to:[-3,5.2]}],moods:[[353,'shock']]})],
 things:[{id:'rex',k:'trex',at:[8,14],flip:true,moves:[{t0:353,t1:357,to:[-4,14]}],mouth:[[353,357]]}],
 fx:[[353.4,'dustRun',{target:'u'}],[354.4,'speedLines'],[355.6,'sweat',{target:'u'}]],texts:[T(353.1,355.4,'STRAIGHT INTO THE JUNGLE',{size:56})]});
S(355.52,{set:'forest',camera:{zoom:[1.2,1.8],follow:'u'},
 actors:[U([-3,5.2],{moves:[{t0:355.5,t1:357.5,to:[1,5.2]}],moods:[[355.5,'shock']]})],
 things:[{id:'rex',k:'trex',at:[-8,15],moves:[{t0:355.5,t1:357.6,to:[-2,15]}],mouth:[[355.5,357.5]]}],
 fx:[[356,'dustRun',{target:'u'}],[356.6,'shake']],texts:[T(355.6,357.6,'AND THE ANIMAL FOLLOWS',{size:62})]});
S(357.7,{set:'forest',camera:{zoom:[1.6,2.4],follow:'u',bgBlur:4,handheld:true},
 actors:[U([0,4.6],{moods:[[357.7,'tired']],moves:[{t0:357.7,t1:360.6,to:[1,4.6]}]})],
 fx:[[358.4,'sweat',{target:'u'}],[359.2,'dizzy',{target:'u'}],[360.0,'steam',{target:'u'}]],texts:[T(357.8,360.8,'SIX MINUTES OF MUD & BREATHING',{size:54})]});
S(360.96,{set:'forest',camera:{zoom:[2,2.8],focus:[960,740]},
 actors:[U([0,4.6],{moods:[[361,'shock']],gestures:[[361,'flare']]})],
 fx:[[361.6,'smokePuff',{target:'u'}],[362.2,'cross',{target:'u'}]],texts:[T(361.1,363,'THE FLARE DIES',{size:78,color:'#ff4a3a'})]});
S(363.56,{set:'forest',camera:{zoom:[1,1.3],follow:'rex'},
 things:[{id:'rex',k:'trex',at:[0,14],moves:[{t0:363.6,t1:366.2,to:[6,14]}],mouth:[[363.6,364.6]]}],
 actors:[U([-2.6,5.2],{moods:[[363.6,'shock']],gestures:[[363.6,'handsFace']]})],
 fx:[[364.2,'steam',{target:'rex'}],[365,'smokePuff']],texts:[T(363.7,366.4,'IT HUFFS AND WALKS AWAY',{size:60})]});

// ---------- AFTERMATH (366-405s) ----------
S(366.88,{set:'hallway',camera:{zoom:[1.4,2.0],follow:'gen'},
 actors:[GEN([0,4.8],{moods:[[366.9,'shock']],gestures:[[366.9,'handsFace']]})],
 fx:[[367.4,'sweat',{target:'gen'}],[368,'zzz',{target:'gen'}].slice(0,0).length?[368,'question',{target:'gen'}]:[368,'question',{target:'gen'}]],texts:[T(367,369.2,'GENNARO — IN THE BATHROOM?',{size:56})]});
S(369.46,{set:'rainyNight',camera:{zoom:[1.2,1.8],follow:'gen'},
 things:[{id:'j',k:'jeep',at:[0,7],scale:1.5}],actors:[GEN([.4,4.6],{moods:[[369.5,'shock']],gestures:[[369.5,'fists']]})],
 fx:[[370,'sweat',{target:'gen'}],[370.4,'dizzy',{target:'gen'}]],texts:[T(369.6,370.9,'HE\'S IN THE CAR, HOLDING ON',{size:52})]});
S(371.18,{set:'rainyNight',camera:{zoom:[1.4,1.8],follow:'tim'},
 actors:[TIM([-.8,4.6],{moods:[[371.2,'joy']],gestures:[[371.2,'cheer']]}),LEX([.8,4.6],{moods:[[371.2,'joy']],gestures:[[371.2,'cheer']]})],
 fx:[[371.5,'hearts',{target:'lex'}],[371.8,'sparkles',{target:'tim'}]],texts:[T(371.3,372.3,'THE KIDS ARE ALIVE',{size:76,color:'#3aff8a'})]});
S(372.44,{set:'rainyNight',camera:{zoom:[1,1.35],pan:[[-60,0],[60,0]]},
 things:[{id:'j',k:'jeep',at:[0,7],scale:1.6,rot:-8,noShadow:false}],
 fx:[[372.8,'smokePuff'],[373.2,'dizzy'],[373.6,'smokePuff']],texts:[T(372.5,373.9,'THE CAR IS A WRECK',{size:76})]});
S(373.94,{set:'rainyNight',camera:{zoom:[1.8,2.4],follow:'u',handheld:true},
 actors:[U([0,4.6],{moods:[[374,'shock']],gestures:[[374,'handsFace']]})],
 fx:[[374.2,'shake'],[374.4,'sweat',{target:'u'}]],texts:[T(374,375.2,'YOU ARE SHAKING',{size:80})]});
S(375.36,{set:'forest',camera:{zoom:[1.2,1.8],follow:'u'},
 actors:[U([-.4,5],{moods:[[375.4,'tired']]}),GRANT([1.4,5.2],{moves:[{t0:375.4,t1:376.6,to:[.4,5.2]}],gestures:[[376.6,'wave']],moods:[[375.4,'calm']]})],
 fx:[[376.8,'sparkles',{target:'u'}],[377,'check',{target:'u'}]],texts:[T(375.5,378,'DR. GRANT FINDS YOU',{size:70})]});
S(378.64,{set:'forest',camera:{zoom:[1.4,2.0],follow:'grant',bgBlur:3},
 actors:[GRANT([.4,4.8],{moods:[[378.6,'calm']],talk:[[378.64,381.4]],gestures:[[378.6,'talk']]}),U([-1.2,5],{moods:[[378.6,'tired'],[380.6,'joy']]})],
 fx:[[380.6,'hearts',{target:'u'}],[380.8,'sparkles',{target:'u'}]],texts:[[378.7,381.5,'bubble','You\'re the intern, unpaid. I\'ll put in a word.',{actor:'grant'}]]});
S(381.62,{set:'forest',camera:{zoom:[1,1.3],pan:[[-70,0],[70,0]]},
 actors:[U([-1.6,5.2],{moves:[{t0:381.6,t1:384.5,to:[2,5.2]}],moods:[[381.6,'tired']]}),GRANT([-3,5.6],{moves:[{t0:381.6,t1:384.5,to:[.4,5.6]}]}),TIM([-4.4,5.8],{moves:[{t0:381.6,t1:384.5,to:[-1,5.8]}]})],
 fx:[[382,'rain'],[383.6,'godRays']],texts:[T(381.7,384.6,'THAT NIGHT THE GROUP HEADS BACK',{size:54})]});
S(385.2,{set:'forest',camera:{zoom:[1.2,1.7],follow:'u'},
 actors:[U([0,5],{moods:[[385.2,'love']],gestures:[[385.2,'cheer']]}),TIM([-1.8,5.4],{moods:[[385.2,'joy']]}),LEX([1.8,5.4],{moods:[[385.2,'joy']]}),GRANT([-3.2,5.8],{moods:[[385.2,'calm']]})],
 fx:[[385.6,'hearts',{target:'u'}],[386,'sparkles']],texts:[T(385.3,386.6,'THE PEOPLE YOU SAVED',{size:64})]});
S(386.52,{set:'forest',camera:{zoom:[1,1.5],follow:'grant'},
 actors:[GRANT([-2.2,5],{moves:[{t0:386.5,t1:389.8,to:[2.2,5]}],moods:[[386.5,'angry']],gestures:[[386.5,'crossed']]}),TIM([-2.2,5.4],{moves:[{t0:386.5,t1:389.8,to:[2.2,5.4]}],moods:[[386.5,'sad']]})],
 fx:[[387.2,'anger',{target:'grant'}],[388.4,'sweat',{target:'grant'}]],texts:[T(386.6,389.9,'GRANT HATES KIDS… CARRIES TIM ACROSS THE FOREST',{size:46})]});
S(390.26,{set:'forest',camera:{zoom:[1.8,2.4],follow:'lex',bgBlur:4},
 actors:[LEX([0,4.6],{moods:[[390.3,'sad']],gestures:[[390.3,'talk']],talk:[[392.9,394]]}),U([-1.6,5],{moods:[[390.3,'calm']]})],
 fx:[[392.4,'question',{target:'lex'}],[393,'gloom',{target:'lex'}]],texts:[[392.8,394.2,'bubble','Why does everyone keep leaving?',{actor:'lex'}]]});
S(394.42,{set:'forest',camera:{zoom:[1.2,1.8],follow:'lex'},
 actors:[LEX([0,4.8],{moods:[[394.4,'calm']],gestures:[[394.4,'laptop']]})],
 fx:[[395,'sparkles',{target:'lex'}],[396.2,'bulb',{target:'lex'}]],texts:[T(394.5,396.8,'LEX, AGE 11',{size:80})]});
S(397.1,{set:'forest',camera:{zoom:[1.6,2.4],follow:'lex'},
 actors:[LEX([0,4.6],{moods:[[397.1,'smug']],gestures:[[397.1,'laptop']]})],
 fx:[[397.8,'typewriter',{text:'HACKER BRAIN'}],[399.6,'sparkles',{target:'lex'}]],texts:[]});
S(400.42,{set:'forest',camera:{zoom:[1.8,2.2],follow:'lex',bgBlur:4},
 actors:[LEX([.4,4.6],{moods:[[400.4,'sad']],gestures:[[400.4,'crossed']]}),U([-1.4,5],{moods:[[400.4,'sad']],gestures:[[400.4,'pocket']]})],
 fx:[[401.6,'arrowPoint',{target:'u'}],[402.8,'sweat',{target:'u'}]],texts:[T(400.5,404.4,'LOOKS AT YOU LIKE YOU\'RE THE LAST ADULT',{size:46})]});

// ---------- THE KITCHEN (405-438s) ----------
S(405.16,{set:'kitchen',transIn:'fade',camera:{zoom:[1,1.2],follow:'u'},
 actors:[U([-1.4,5.4],{pose:'floor',moods:[[405.2,'tired']]}),TIM([.4,5.6],{pose:'floor',moods:[[405.2,'tired']]}),LEX([1.8,5.4],{pose:'floor',moods:[[405.2,'calm']]})],
 fx:[[405.6,'zzz',{target:'tim'}],[406.2,'sparkles']],texts:[T(405.3,408.6,'THE FLOOR OF A HALF-WRECKED KITCHEN',{size:48})]});
S(409.24,{set:'kitchen',camera:{zoom:[1.6,2.2],follow:'tim'},
 actors:[TIM([0,4.8],{pose:'floor',moods:[[409.3,'joy']],gestures:[[409.3,'sandwich']]})],
 fx:[[410,'sparkles',{target:'tim'}],[410.8,'hearts',{target:'tim'}]],texts:[T(409.4,412.8,'BEST MEAL OF HIS LIFE',{size:62})]});
S(413.34,{set:'kitchen',camera:{zoom:[1.2,2.0],follow:'lex'},
 actors:[LEX([0,4.8],{pose:'floor',moods:[[413.3,'calm']],gestures:[[413.3,'laptop']]})],
 fx:[[414,'typewriter',{text:'rebuilding the security map…'}]],texts:[]});
S(416.24,{set:'kitchen',camera:{zoom:[2.2,2.8],focus:[960,820]},
 actors:[LEX([0,4.6],{pose:'floor',gestures:[[416.2,'laptop']],moods:[[416.2,'smug']]})],
 fx:[[416.5,'sparkles',{target:'lex'}],[416.9,'check',{target:'lex'}]],texts:[T(416.3,417.5,'TAPPING FAST',{size:80})]});
S(417.34,{set:'kitchen',camera:{zoom:[1.2,1.8],follow:'lex'},
 actors:[LEX([.2,4.8],{pose:'floor',moods:[[417.4,'smug']],gestures:[[417.4,'laptop']],talk:[[417.4,419]]}),U([-1.6,5.2],{pose:'floor',moods:[[417.4,'calm']]})],
 fx:[[418.2,'bulb',{target:'lex'}]],texts:[[417.5,419.2,'bubble','The system runs on a program I know!',{actor:'lex'}]]});
S(421.1,{set:'kitchen',camera:{zoom:[1.6,2.2],follow:'u'},
 actors:[U([-.2,4.8],{moods:[[421.1,'smug']],gestures:[[421.1,'shrug']]})],
 fx:[[421.5,'sparkles',{target:'u'}]],texts:[[421.2,422.1,'bubble','Of course she has.',{actor:'u'}]]});
S(422.38,{set:'kitchen',camera:{zoom:[1.4,2.0],follow:'lex'},
 actors:[LEX([.4,4.8],{moods:[[422.4,'sad']],talk:[[422.4,425.3]],gestures:[[422.4,'talk']]})],
 fx:[[424.2,'question',{target:'lex'}]],texts:[[422.5,425.4,'bubble','Are the dinosaurs scared of anything?',{actor:'lex'}]]});
S(425.82,{set:'kitchen',camera:{zoom:[1.8,2.4],follow:'u',bgBlur:3},
 actors:[U([-.4,4.6],{moods:[[425.8,'sad']],talk:[[426.2,427.6]],gestures:[[425.8,'shrug']]})],
 fx:[[426.2,'gloom',{target:'u'}]],texts:[[425.9,427.7,'bubble','I… don\'t know.',{actor:'u'}]]});
S(427.92,{set:'kitchen',camera:{zoom:[1.4,2.2],pan:[[-30,0],[30,0]]},
 actors:[U([-1.2,5],{moods:[[427.9,'sad']],gestures:[[427.9,'shrug']]}),LEX([1.2,5],{moods:[[427.9,'calm']]})],
 fx:[[428.2,'question',{target:'u'}],[428.4,'gloom']],texts:[T(428,428.8,'NOBODY DOES',{size:84})]});
S(428.58,{set:'scienceLab',camera:{zoom:[1,1.3],pan:[[40,0],[-40,0]]},
 actors:[ELL([-1.4,5],{moods:[[428.6,'calm']],gestures:[[428.6,'clip']]})],
 things:[{id:'r',k:'raptor',at:[2.4,6],flip:true,scale:1.1,tilt:6}],
 fx:[[430,'question',{target:'r'}],[431,'sparkles',{target:'r'}]],texts:[T(428.7,431.8,'MADE IN A LAB · NOBODY ASKED THEM',{size:52})]});
S(432,{set:'kitchen',camera:{zoom:[1.8,2.4],follow:'lex',bgBlur:4},
 actors:[LEX([0,4.6],{moods:[[432,'sad']],gestures:[[432,'crossed']]})],
 fx:[[432.5,'gloom',{target:'lex'}],[433,'tears',{target:'lex'}]],texts:[T(432.1,433.1,'SHE GOES QUIET',{size:78})]});
S(433.26,{set:'kitchen',camera:{zoom:[1.2,1.8],follow:'lex'},
 actors:[LEX([0,4.8],{moods:[[433.3,'sad']],talk:[[435.96,438]],gestures:[[433.3,'idle']]})],
 fx:[[434,'dizzy',{target:'lex'}]],texts:[T(433.4,435.7,'THEN SHE SAYS SOMETHING YOU\'LL NEVER FORGET',{size:44})]});
S(435.96,{set:'kitchen',camera:{zoom:[2.2,2.8],follow:'lex',bgBlur:5},
 actors:[LEX([0,4.6],{moods:[[436,'sad']],talk:[[436,438]],gestures:[[436,'idle']]})],
 fx:[[436.4,'zoomPunch',{target:'lex'}],[437.4,'tears',{target:'lex'}]],texts:[[436,438.6,'bubble','That\'s the saddest part of the whole movie.',{actor:'lex'}]]});
