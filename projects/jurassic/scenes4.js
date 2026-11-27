const {S}=require('./dsl.js');
const {T,U,NED,MAL,HAM,GRANT,TIM,LEX,ARN,GEN,ELL}=require('./cast.js');
const MON=(on=0,w=6,n=5,o={})=>({id:'mon',k:'monitors',at:[0,10.4],w,n,onAt:on,...o});

// ---------- ARNOLD (438-480s) ----------
S(438.88,{set:'office',transIn:'whip',camera:{zoom:[1.2,1.8],follow:'arn'},
 actors:[ARN([0,5],{moods:[[438.9,'tired']],gestures:[[438.9,'radio']]}),U([-1.8,5.4],{moods:[[438.9,'calm']]})],
 things:[MON(0,7,6,{cols:['#3aff8a','#ffd24a']})],
 fx:[[439.2,'alert']].slice(0,0).concat([[439.4,'exclaim',{target:'arn'}]]),texts:[T(439,441.2,'THE RADIO CRACKLES',{size:72})]});
S(441.64,{set:'office',camera:{zoom:[1.4,2.0],follow:'arn'},
 actors:[ARN([0,5],{moods:[[441.7,'joy']],gestures:[[441.7,'radio']]})],
 fx:[[442,'nameTag',{name:'RAY ARNOLD',sub:'CHIEF ENGINEER'}],[442.2,'sparkles',{target:'arn'}]],texts:[]});
S(444.22,{set:'office',camera:{zoom:[1,1.3],pan:[[-50,0],[50,0]]},
 actors:[ARN([0,5],{moods:[[444.2,'smug']],gestures:[[444.4,'sandwich'],[445.6,'talk']],talk:[[444.2,446.3]]})],
 things:[MON(0,7,6,{cols:['#3aff8a','#ffd24a','#8ad8ff']})],
 fx:[[444.8,'smokePuff',{target:'arn'}],[445.6,'smokePuff',{target:'arn'}]],texts:[T(444.3,446.4,'CHAIN-SMOKING · CHAIN-TALKING',{size:58})]});
S(446.36,{set:'office',camera:{zoom:[1.8,2.4],follow:'arn',bgBlur:3},
 actors:[ARN([0,4.6],{moods:[[446.4,'love']],gestures:[[446.4,'crossed']]})],
 fx:[[447,'hearts',{target:'arn'}],[447.6,'sweat',{target:'arn'}]],texts:[T(446.5,448.2,'BAD BACK · GOOD HEART',{size:70})]});
S(448.48,{set:'office',camera:{zoom:[1.2,1.8],follow:'arn'},
 actors:[ARN([0,5],{moods:[[448.5,'smug']],gestures:[[448.5,'point']]})],
 fx:[[449.4,'arrowPoint',{target:'arn'}],[450,'sparkles',{target:'arn'}]],texts:[T(448.6,450.8,'THE MOST FAMOUS LINE',{size:74})]});
S(451.38,{set:'office',camera:{zoom:[2.2,2.8],follow:'arn',bgBlur:4},
 actors:[ARN([0,4.6],{moods:[[451.4,'smug']],talk:[[451.4,452.4]],gestures:[[451.4,'fists']]})],
 fx:[[451.6,'wordSlam',{text:'BUTTS',color:'#ffd24a',size:150}],[451.7,'shake']],texts:[[451.4,452.5,'bubble','Hold on to your butts.',{actor:'arn'}]]});
S(452.76,{set:'office',camera:{zoom:[1,1.4],follow:'arn'},
 actors:[ARN([0,5],{moods:[[452.8,'smug']],gestures:[[452.8,'think']]})],
 fx:[[453,'bulb',{target:'arn'}]],texts:[T(452.9,453.9,'HE HAS A PLAN',{size:80})]});
S(453.86,{set:'office',camera:{zoom:[1.2,1.8],follow:'arn'},
 actors:[ARN([0,5],{moods:[[453.9,'calm']],gestures:[[453.9,'point']]})],
 things:[MON(0,8,5,{offAt:455.7,cols:['#ff4a3a','#ffd24a']})],
 fx:[[454.4,'cross'],[455.7,'flash']],texts:[T(454,457.8,'REBOOT THE SYSTEM — BY HAND',{size:60})]});
S(457.68,{set:'garage',camera:{zoom:[1,1.3],pan:[[-80,0],[80,0]]},
 actors:[U([-2,5.4],{moves:[{t0:457.7,t1:460.7,to:[1.6,5.4]}],moods:[[457.7,'calm']],gestures:[[457.7,'flare']]})],
 fx:[[458.6,'rain'],[459.2,'lightning']],texts:[T(457.8,460.9,'A MAINTENANCE SHED · A LONG WALK IN THE DARK',{size:46})]});
S(461.28,{set:'garage',camera:{zoom:[1.6,2.2],follow:'u'},
 actors:[U([0,4.8],{moods:[[461.3,'shock']],gestures:[[461.3,'handsFace']]})],
 fx:[[461.8,'question',{target:'u'}],[462.6,'sweat',{target:'u'}]],texts:[T(461.4,462.9,'AND YOU KNOW WHAT\'S IN THE SHED',{size:52})]});
S(462.86,{set:'garage',camera:{zoom:[1,1.4],follow:'r1'},
 things:[{id:'r1',k:'raptor',at:[-1,8],flip:true,tilt:8,mouth:[[463,465.5]]},{id:'r2',k:'raptor',at:[2,9]},{id:'r3',k:'raptor',at:[3.6,8],flip:true,tilt:-8}],
 actors:[U([-3.2,5],{moods:[[462.9,'shock']]})],
 fx:[[463.4,'shake'],[464.2,'exclaim',{target:'u'}],[465,'lightning']],texts:[T(462.9,465.6,'RAPTORS',{size:96,color:'#ff4a3a'})]});
S(465.96,{set:'garage',camera:{zoom:[1.4,2.0],follow:'arn'},
 actors:[ARN([0,5],{moods:[[466,'sad']],gestures:[[466,'radio']]})],
 fx:[[466.6,'gloom',{target:'arn'}],[467.2,'cross',{target:'arn'}]],texts:[T(466,467.5,'ARNOLD DIES OFF-CAMERA',{size:60,color:'#ff4a3a'})]});
S(467.6,{set:'garage',camera:{zoom:[1.8,2.6],focus:[960,760]},
 things:[{id:'can',k:'can',at:[0,4.6],Y:0,scale:5}],
 fx:[[468.2,'exclaim'],[468.8,'cross']],texts:[T(467.7,469.2,'ONLY AN ARM LEFT BEHIND',{size:60})]});
S(469.5,{set:'garage',camera:{zoom:[1.4,1.8],follow:'u'},
 actors:[U([0,4.8],{moods:[[469.5,'angry']],gestures:[[469.5,'fists']]})],
 fx:[[469.9,'anger',{target:'u'}],[470.3,'zoomPunch',{target:'u'}]],texts:[T(469.6,470.9,'NO WAY YOU LET THAT HAPPEN',{size:52,color:'#ffd24a'})]});
S(471.22,{set:'office',camera:{zoom:[1.2,1.6],follow:'u'},
 actors:[U([-1.2,5],{moods:[[471.2,'smug']],talk:[[471.3,472]],gestures:[[471.3,'point']]}),ARN([1.4,5.2],{moods:[[471.2,'shock']],gestures:[[471.2,'radio']]})],
 fx:[[471.5,'exclaim',{target:'arn'}]],texts:[[471.3,472.2,'bubble','I\'ll go.',{actor:'u'}]]});
S(472.54,{set:'office',camera:{zoom:[1.8,2.2],follow:'arn'},
 actors:[ARN([1.2,4.8],{moods:[[472.6,'angry']],gestures:[[472.6,'crossed']],talk:[[472.6,473]]})],
 fx:[[472.7,'cross',{target:'arn'}]],texts:[[472.6,473.5,'bubble','No.',{actor:'arn'}]]});
S(473.76,{set:'office',camera:{zoom:[1.4,2.0],follow:'u'},
 actors:[U([-1.2,4.8],{moods:[[473.8,'smug']],gestures:[[473.8,'clip']],talk:[[474,476.2]]}),ARN([1.4,5.2],{moods:[[473.8,'shock']]})],
 fx:[[474.6,'stamp',{text:'JOB'}],[474.7,'shake']],texts:[[473.9,476.4,'bubble','It\'s my job. Unpaid intern job.',{actor:'u'}]]});
S(476.62,{set:'office',camera:{zoom:[1.2,1.8],follow:'arn'},
 actors:[ARN([1.2,5],{moods:[[476.6,'joy']],gestures:[[476.6,'cheer']]}),U([-1.4,5],{moods:[[476.6,'smug']]})],
 fx:[[477.2,'sparkles',{target:'arn'}],[478.4,'sweat',{target:'arn'}],[478.2,'hearts',{target:'arn'}]],texts:[T(476.7,479.4,'HE LAUGHS… ALMOST LETS YOU',{size:56})]});

// ---------- RAPTOR FUN FACTS (479-496s) ----------
S(479.84,{set:'scienceLab',camera:{zoom:[1,1.3],follow:'ell'},
 actors:[ELL([-1.6,5],{moods:[[479.8,'smug']],gestures:[[479.8,'clip']]})],
 fx:[[480.2,'bulb',{target:'ell'}]],texts:[T(479.9,481.2,'HERE\'S SOMETHING STRANGE',{size:64})]});
S(481.32,{set:'scienceLab',camera:{zoom:[1.2,1.6],follow:'ell'},
 actors:[ELL([-2,5],{moods:[[481.3,'calm']],gestures:[[481.3,'point']]})],
 things:[{id:'r',k:'raptor',at:[2,6],flip:true,scale:1,tilt:4}],
 fx:[[482.4,'cross',{target:'r'}]],texts:[T(481.4,484,'MOVIE RAPTORS ≠ REAL VELOCIRAPTORS',{size:52})]});
S(484.24,{set:'scienceLab',camera:{zoom:[1.6,2.4],follow:'g'},
 things:[{id:'g',k:'goat',at:[0,4.6],scale:.6}],actors:[ELL([-2,5],{moods:[[484.3,'joy']],gestures:[[484.3,'point']]})],
 fx:[[485,'sparkles',{target:'g'}],[485.6,'arrowPoint',{target:'g'}]],texts:[T(484.3,486.5,'THE REAL ONES: SIZE OF A TURKEY',{size:52})]});
S(486.7,{set:'scienceLab',camera:{zoom:[1,1.3],follow:'r'},
 things:[{id:'r',k:'raptor',at:[0,8],scale:1.5,flip:true,mouth:[[487,489.5]]}],
 actors:[ELL([-3,5],{moods:[[486.7,'shock']]})],
 fx:[[487.4,'zoomPunch',{target:'r'}],[488.4,'sparkles',{target:'r'}]],texts:[T(486.8,489.9,'THE MOVIE ONES ≈ DEINONYCHUS',{size:52})]});
S(490.18,{set:'scienceLab',camera:{zoom:[1,1.4],follow:'r'},
 things:[{id:'r',k:'raptor',at:[0,7],scale:1.8,flip:true,mouth:[[490.2,492.4]]}],
 actors:[U([-2.4,5],{moods:[[490.2,'shock']],gestures:[[490.2,'point']]})],
 fx:[[490.8,'arrowPoint',{target:'r'}],[491.6,'exclaim',{target:'u'}]],texts:[T(490.3,492.6,'SIX FEET · VERY BAD NEWS',{size:62,color:'#ff4a3a'})]});
S(493,{set:'scienceLab',camera:{zoom:[1.8,2.4],follow:'u'},
 actors:[U([0,4.6],{moods:[[493,'tired']],gestures:[[493,'shrug']]})],
 fx:[[493.6,'sweat',{target:'u'}],[494,'dizzy',{target:'u'}]],texts:[[493.1,494.6,'bubble','…I won\'t bring that up.',{actor:'u'}]]});

// ---------- THE SHED (495-550s) ----------
S(495.18,{set:'garage',transIn:'whip',camera:{zoom:[1.1,1.5],follow:'u'},
 actors:[U([-2,5.4],{moves:[{t0:495.2,t1:496.7,to:[-.2,5.2]}],moods:[[495.2,'shock']],gestures:[[495.2,'flare']]})],
 fx:[[495.6,'rain'],[496.4,'sweat',{target:'u'}]],texts:[T(495.3,496.9,'THE SHED DOOR: HALF OPEN',{size:62})]});
S(497.22,{set:'garage',camera:{zoom:[1,1.3],focus:[960,420]},
 actors:[U([0,5.2],{moods:[[497.2,'shock']]})],
 fx:[[497.6,'flash'],[498,'flash'],[498.5,'flash']],texts:[T(497.3,499.1,'A DIM EMERGENCY LIGHT FLICKERS',{size:52})]});
S(499.58,{set:'basement',camera:{zoom:[1.2,1.8],follow:'u'},
 actors:[U([0,5],{moods:[[499.6,'shock']],gestures:[[499.6,'handsFace']]})],
 things:[{id:'r',k:'raptor',at:[3.6,12],flip:true,tilt:6}],
 fx:[[500.2,'question',{target:'u'}],[500.8,'sweat',{target:'u'}]],texts:[T(499.7,501.3,'A SOUND LIKE A TORTOISE BREATHING',{size:50})]});
S(501.74,{set:'beach',camera:{zoom:[1,1.2],pan:[[-50,0],[50,0]]},
 things:[{id:'g',k:'goat',at:[-1.6,6],scale:1.2},{id:'g2',k:'goat',at:[1.6,6.6],scale:1.2}],
 fx:[[502.4,'hearts',{target:'g'}],[503.4,'sparkles']],texts:[T(501.8,505,'THAT\'S HOW THEY MADE THE SOUND',{size:54})]});
S(505.4,{set:'beach',camera:{zoom:[1.2,1.8],follow:'g'},
 things:[{id:'g',k:'goat',at:[-1,5],scale:1.8},{id:'g2',k:'goat',at:[1,5.2],scale:1.8}],
 fx:[[506,'hearts'],[506.4,'confetti']],texts:[T(505.5,507,'THEY RECORDED TORTOISES MATING',{size:52})]});
S(507.34,{set:'garage',camera:{zoom:[1.6,2.2],follow:'u'},
 actors:[U([0,4.6],{moods:[[507.4,'tired']],gestures:[[507.4,'facepalm']]})],
 fx:[[508,'sweat',{target:'u'}],[508.6,'dizzy',{target:'u'}]],texts:[[507.4,509,'bubble','Great fun fact. Great timing.',{actor:'u'}]]});
S(509.38,{set:'garage',camera:{zoom:[1.2,1.8],follow:'u'},
 actors:[U([0,4.8],{moods:[[509.4,'angry']],gestures:[[509.4,'fists']]})],
 fx:[[509.8,'cross',{target:'u'}],[510.2,'steam',{target:'u'}]],texts:[]});
S(511.08,{set:'garage',camera:{zoom:[1.4,2.2],focus:[960,600]},
 actors:[U([-1.2,5],{moods:[[511.1,'smug']],gestures:[[511.4,'point']]})],
 things:[{id:'mon',k:'monitors',at:[1.6,9],w:2,n:1,onAt:512.2,offAt:511.9,cols:['#3aff8a']}],
 fx:[[511.6,'arrowPoint',{target:'u'}],[512.2,'flash'],[512.3,'shake']],texts:[T(511.2,512.7,'YOU FLIP THE BREAKER',{size:70})]});
S(512.58,{set:'basement',camera:{zoom:[1,1.4],pan:[[-70,0],[70,0]]},
 actors:[U([-2,5.4],{moves:[{t0:512.6,t1:514,to:[1,5.4]}],moods:[[512.6,'calm']]})],
 fx:[[512.8,'godRays'],[513,'flash']],texts:[T(512.7,514,'LIGHTS COME UP IN THE TUNNEL',{size:56})]});
S(514.04,{set:'basement',camera:{zoom:[1.4,2.0],follow:'u'},
 actors:[U([0,4.8],{moods:[[514.1,'shock']]})],
 things:[{id:'r',k:'raptor',at:[2.6,7],flip:true,tilt:0,mouth:[[514.2,515.2]]}],
 fx:[[514.4,'exclaim',{target:'u'}],[514.8,'shake']],texts:[T(514.1,515.4,'SOMETHING HISSES BEHIND YOU',{size:54})]});
S(515.91,{set:'basement',camera:{zoom:[1.8,2.6],follow:'u',bgBlur:4},
 actors:[U([0,4.6],{moods:[[515.9,'shock']],look:-5})],
 fx:[[516.4,'sweat',{target:'u'}],[517,'dizzy',{target:'u'}]],texts:[T(516,517.8,'YOU TURN VERY SLOWLY',{size:70})]});
S(518.38,{set:'basement',camera:{zoom:[1.4,2.4],follow:'r'},
 things:[{id:'r',k:'raptor',at:[1.4,5.8],scale:1.4,flip:true,tilt:20}],
 fx:[[518.8,'question',{target:'r'}],[519.2,'zoomPunch',{target:'r'}]],texts:[T(518.5,519.8,'IT TILTS ITS HEAD',{size:72})]});
S(520.06,{set:'basement',camera:{zoom:[1.8,2.8],follow:'r'},
 things:[{id:'r',k:'raptor',at:[1.4,5.4],scale:1.6,flip:true,tilt:-14,mouth:[[520.1,520.9]]}],
 fx:[[520.4,'sparkles',{target:'r'}],[520.6,'exclaim',{target:'u'}]],texts:[T(520.2,521.2,'IT CLICKS ITS THROAT',{size:68})]});
S(521.38,{set:'basement',camera:{zoom:[1,1.4],follow:'r'},
 things:[{id:'r',k:'raptor',at:[2,6.4],scale:1.3,flip:true,tilt:6,moves:[{t0:521.4,t1:524,to:[1,5.6]}]}],
 actors:[U([-1.4,5],{moods:[[521.4,'shock']]})],
 fx:[[522,'bulb',{target:'r'}],[523,'arrowPoint',{target:'u'}]],texts:[T(521.5,524.2,'SMARTER THAN THE MOVIE SHOWS',{size:52})]});
S(524.58,{set:'basement',camera:{zoom:[1.4,2.0],follow:'r'},
 things:[{id:'r',k:'raptor',at:[1.2,5.6],scale:1.4,flip:true,tilt:10}],
 actors:[U([-1.4,5.2],{moods:[[524.6,'shock']]})],
 fx:[[525,'arrowPoint',{target:'u'}],[525.8,'arrowPoint',{target:'u'}],[526.4,'arrowPoint',{target:'u'}]],texts:[T(524.7,526.9,'YOUR HANDS · YOUR EXITS · YOUR SHOES',{size:50})]});
S(527.64,{set:'basement',camera:{zoom:[1,1.3],pan:[[-50,0],[50,0]]},
 things:[{id:'r1',k:'raptor',at:[-3,9],flip:true},{id:'r2',k:'raptor',at:[0,11]},{id:'r3',k:'raptor',at:[3.4,9],flip:true}],
 actors:[U([0,5],{moods:[[527.7,'shock']]})],
 fx:[[528.4,'exclaim',{target:'u'}]],texts:[T(527.7,529.6,'THEY HUNT IN PACKS',{size:78})]});
S(530.08,{set:'basement',camera:{zoom:[1.2,1.8],follow:'u'},
 actors:[U([0,4.8],{moods:[[530.1,'shock'],[531,'think']].map(x=>[x[0],'shock']),gestures:[[530.1,'think']]})],
 things:[{id:'r',k:'raptor',at:[2.6,7],flip:true,tilt:12}],
 fx:[[530.6,'bulb',{target:'r'}],[531.2,'timer']],texts:[T(530.2,531.4,'THEY ALSO MAKE PLANS',{size:70})]});
S(531.56,{set:'basement',camera:{zoom:[1,1.5],follow:'u'},
 actors:[U([0,5],{moods:[[531.6,'shock']],gestures:[[531.6,'handsFace']]})],
 things:[{id:'r',k:'raptor',at:[2.6,6.4],flip:true,moves:[{t0:531.6,t1:533.4,to:[1,5.6]}]}],
 fx:[[531.8,'counter',{to:4,pre:'',post:' SECONDS'}],[532.8,'shake']],texts:[]});
S(533.48,{set:'basement',camera:{zoom:[1.4,1.8],follow:'u'},
 actors:[U([0,4.8],{moods:[[533.5,'smug']],gestures:[[533.5,'laptop']]})],
 fx:[[534.2,'bulb',{target:'u'}],[534.6,'sparkles',{target:'u'}]],texts:[T(533.6,535.2,'WHAT LEX SHOWED YOU',{size:64})]});
S(535.08,{set:'kitchen',camera:{zoom:[1.4,1.8],follow:'lex'},
 actors:[LEX([0,4.8],{pose:'floor',moods:[[535.1,'smug']],gestures:[[535.1,'laptop']]})],
 fx:[[535.6,'sparkles',{target:'lex'}]],texts:[T(535.2,536.6,'ON THAT LAPTOP AN HOUR AGO',{size:52})]});
S(536.96,{set:'basement',camera:{zoom:[1.4,2.0],follow:'u'},
 actors:[U([0,4.8],{moods:[[537,'smug']],moves:[{t0:537,t1:538.2,to:[-.8,5.2]}]})],
 things:[{id:'r',k:'raptor',at:[2.2,6],flip:true,tilt:8}],
 fx:[[537.4,'dustRun',{target:'u'}],[538,'sparkles',{target:'u'}]],texts:[T(537.1,538.4,'STEP BACK · SMILE',{size:72})]});
S(538.72,{set:'garage',camera:{zoom:[1.2,2.0],follow:'u'},
 actors:[U([-1,5],{moods:[[538.7,'smug']],gestures:[[539.4,'point']]})],
 things:[{id:'btn',k:'can',at:[1.8,9],Y:1.2,scale:4}],
 fx:[[539.6,'arrowPoint',{target:'btn'}],[540.2,'zoomPunch',{target:'u'}]],texts:[T(538.8,540.8,'THE BIG RED BUTTON',{size:78,color:'#ff4a3a'})]});
S(540.84,{set:'garage',camera:{zoom:[1,1.3],follow:'r'},
 actors:[U([-2.4,5.4],{moods:[[540.9,'smug']],gestures:[[540.9,'point']]})],
 things:[{id:'gt',k:'gate',at:[0,7],w:5,h:3.2,drop:[541.5,541.9],ring:[542,542.6]},{id:'r',k:'raptor',at:[1.6,9],flip:false,moves:[{t0:540.9,t1:541.8,to:[0,8.2]}],mouth:[[541,542]]}],
 fx:[[541.4,'speedLines'],[541.9,'impactStar'],[542.1,'shake'],[542.2,'shockwave']],texts:[T(540.9,543,'THE LOADING DOORS RELEASE',{size:56})]});
S(542.4,{set:'garage',camera:{zoom:[1.2,1.8],focus:[960,600]},
 things:[{id:'gt',k:'gate',at:[0,7],w:5,h:3.2,drop:[-1,0],ring:[542.6,543.4,544]}],
 fx:[[542.6,'impactStar'],[542.7,'shake'],[543.4,'shockwave'],[544,'dizzy']],texts:[T(542.5,545.6,'A STEEL GATE SLAMS DOWN',{size:70})]});
S(545.88,{set:'garage',camera:{zoom:[1.2,2.0],focus:[960,620]},
 things:[{id:'gt',k:'gate',at:[0,7],w:5,h:3.2,drop:[-1,0],ring:[546.2,547,548]},{id:'r',k:'raptor',at:[0,9],flip:true,tilt:-20,mouth:[[546,548]]}],
 fx:[[546.2,'shake'],[546.3,'explosion'],[547,'shake'],[548,'speedLines']],texts:[T(545.9,548.2,'THE ANIMAL SLAMS INTO IT',{size:62})]});
S(548.36,{set:'garage',camera:{zoom:[1,1.4],follow:'u'},
 actors:[U([0,5.2],{moods:[[548.4,'shock']],gestures:[[548.4,'cheer']]})],
 things:[{id:'gt',k:'gate',at:[0,7],w:5,h:3.2,drop:[-1,0],ring:[548.6,549.2]}],
 fx:[[548.6,'shockwave'],[549,'dizzy'],[549.2,'check',{target:'u'}]],texts:[T(548.5,549.7,'THE WHOLE ROOM RINGS',{size:70})]});

// ---------- POWER IS BACK (550-565s) ----------
S(550.3,{set:'office',transIn:'flash',camera:{zoom:[1,1.3],pan:[[-60,0],[60,0]]},
 things:[MON(550.5,8,6,{cols:['#3aff8a','#ffd24a','#8ad8ff']})],actors:[U([0,5.6],{moods:[[550.3,'joy']],gestures:[[550.3,'cheer']]})],
 fx:[[550.6,'check',{target:'u'}],[551,'sparkles',{target:'u'}]],texts:[T(550.4,551.8,'THE POWER IS BACK',{size:76,color:'#3aff8a'})]});
S(551.66,{set:'office',camera:{zoom:[1.4,2.0],follow:'u'},
 actors:[U([0,4.8],{moods:[[551.7,'joy']],gestures:[[551.7,'wave']]})],
 fx:[[551.9,'check',{target:'u'}],[552.3,'sparkles',{target:'u'}]],texts:[T(551.8,553,'THE LOCK SYSTEM IS ON',{size:66})]});
S(553.34,{set:'office',camera:{zoom:[1,1.4],focus:[960,430]},
 things:[MON(553.4,9,7,{cols:['#3aff8a','#8ad8ff','#ffd24a']})],actors:[],
 fx:[[553.6,'sparkles'],[554,'sparkles']],texts:[T(553.4,554.7,'SCREENS COME ALIVE',{size:78})]});
S(554.84,{set:'office',camera:{zoom:[1.2,1.8],follow:'arn'},
 actors:[ARN([0,4.8],{moods:[[554.8,'shock'],[556,'joy']],gestures:[[554.8,'radio']]})],
 things:[MON(0,8,6,{cols:['#3aff8a','#ffd24a']})],
 fx:[[555.4,'exclaim',{target:'arn'}],[556.4,'hearts',{target:'arn'}]],texts:[T(554.9,556.7,'ARNOLD IS ALIVE',{size:80,color:'#3aff8a'})]});
S(557.2,{set:'office',camera:{zoom:[1,1.5],follow:'arn'},
 actors:[ARN([0,5],{moods:[[557.2,'shock']],gestures:[[557.2,'crossed']]})],
 things:[MON(0,9,7,{cols:['#3aff8a','#8ad8ff']})],
 fx:[[557.6,'arrowPoint',{target:'arn'}]],texts:[T(557.3,559.7,'STARING AT THE MONITORS',{size:66})]});
S(560.26,{set:'office',camera:{zoom:[2,2.8],follow:'arn',bgBlur:4},
 actors:[ARN([0,4.6],{moods:[[560.3,'shock']],talk:[[560.5,561.7]]})],
 fx:[[560.8,'wordSlam',{text:'WHOA',color:'#ffd24a',size:170}],[560.9,'shake']],texts:[]});
S(562.82,{set:'airport',transIn:'fade',camera:{zoom:[1,1.2],pan:[[60,0],[-60,0]]},
 actors:[U([-1,5.4],{moods:[[562.8,'tired']],gestures:[[562.8,'coffee']]}),GRANT([1.2,5.4],{moods:[[562.8,'calm']]}),TIM([-2.6,5.6],{moods:[[562.8,'joy']]}),LEX([2.8,5.6],{moods:[[562.8,'joy']]})],
 fx:[[563.4,'godRays'],[564,'sparkles']],texts:[T(562.9,565.1,'BY MORNING, THE SURVIVORS GATHER',{size:54})]});
S(565.88,{set:'airport',camera:{zoom:[1.2,1.7],follow:'u'},
 actors:[U([-.2,5],{moods:[[565.9,'shock']],gestures:[[565.9,'point']]}),GRANT([1.6,5.4],{moods:[[565.9,'calm']]}),LEX([-2,5.4],{moods:[[565.9,'calm']]})],
 fx:[[566.4,'counter',{to:7,pre:'',post:' SURVIVORS'}],[567,'sparkles']],texts:[T(565.9,567.6,'SEVEN PEOPLE… AND THE INTERN',{size:52})]});
S(567.54,{set:'airport',camera:{zoom:[1,1.5],focus:[960,430]},
 actors:[U([0,5.6],{moods:[[567.5,'joy']],gestures:[[567.5,'cheer']]})],
 fx:[[567.8,'godRays'],[568,'sparkles',{target:'u'}]],texts:[T(567.6,568.9,'THE SUN COMES UP',{size:80,color:'#ffd24a'})]});
S(568.88,{set:'airport',camera:{zoom:[1,1.3],pan:[[-60,0],[60,0]]},
 things:[{id:'hel',k:'heli',at:[-6,14],Y:.1,moves:[{t0:568.9,t1:570.7,to:[1,12]}],scale:1.2}],
 fx:[[569,'speedLines'],[570,'dustRun']],texts:[T(568.9,570.8,'A HELICOPTER IS WAITING',{size:64})]});
S(570.8,{set:'airport',camera:{zoom:[1.4,1.8],follow:'u'},
 actors:[U([-1.8,5],{moods:[[570.8,'calm']],gestures:[[570.8,'radio']]})],
 things:[{id:'hel',k:'heli',at:[2.4,11],Y:.1,scale:1.2}],
 fx:[[571.4,'timer'],[573,'sparkles']],texts:[T(570.9,573.9,'RADIO: IT LEAVES IN 10 MINUTES',{size:54})]});
