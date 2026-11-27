const {S}=require('./dsl.js');
const {T,U,NED,MAL,HAM,GRANT,TIM,LEX,ARN,GEN,ELL}=require('./cast.js');

// ---------- THE HELIPAD (574-636s) ----------
S(574.16,{set:'airport',camera:{zoom:[1.2,1.8],follow:'ham'},
 actors:[HAM([0,5],{moods:[[574.2,'sad']],gestures:[[574.2,'icecream']]})],
 things:[{id:'hel',k:'heli',at:[3.4,12],Y:.1,scale:1.1}],
 fx:[[574.8,'spotlight',{target:'ham'}],[576.4,'sweat',{target:'ham'}]],texts:[T(574.3,577.9,'HAMMOND AT THE EDGE OF THE PAD',{size:56})]});
S(576.06,{set:'airport',camera:{zoom:[2.2,2.8],focus:[960,660]},
 actors:[HAM([0,4.6],{moods:[[576.1,'sad']],gestures:[[576.1,'icecream']]})],
 fx:[[576.8,'drip'].slice(0,0).length?[576.8,'sweat']:[576.8,'sweat',{target:'ham'}],[577.2,'sparkles',{target:'ham'}]],texts:[T(576.2,577.9,'A HALF-MELTED ICE CREAM',{size:62})]});
S(578.2,{set:'airport',camera:{zoom:[1,1.15],pan:[[-40,0],[40,0]]},
 actors:[HAM([0,5.4],{moods:[[578.2,'calm']],gestures:[[578.2,'icecream']]})],
 fx:[[578.6,'vhsRewind'],[579.4,'freeze']],texts:[T(578.3,579.8,'A SHOT YOU\'VE SEEN 100 TIMES',{size:52})]});
S(580.58,{set:'airport',camera:{zoom:[1.6,1.0],follow:'ham'},
 actors:[HAM([0,5],{moods:[[580.6,'calm']],gestures:[[580.6,'idle'],[581.6,'point']],look:-5})],
 fx:[[581.8,'arrowPoint',{target:'ham'}],[582.4,'godRays']],texts:[T(580.7,584.2,'IN THE FILM: HE LOOKS AT THE SKY. THE CAMERA PULLS AWAY.',{size:42})]});
S(584.74,{set:'airport',camera:{zoom:[1.2,1.8],follow:'ham'},
 actors:[HAM([0,4.8],{moods:[[584.8,'sad']],gestures:[[584.8,'idle']]})],
 fx:[[585.2,'gloom',{target:'ham'}]],texts:[T(584.8,586.2,'IN THE FILM IT\'S SAD',{size:68})]});
S(586.72,{set:'airport',camera:{zoom:[1.8,2.6],follow:'ham',bgBlur:4},
 actors:[HAM([0,4.6],{moods:[[586.7,'sad']],gestures:[[586.7,'idle']]})],
 fx:[[587,'zoomPunch',{target:'ham'}],[587.4,'tears',{target:'ham'}]],texts:[T(586.8,588.2,'HERE IT\'S REAL',{size:84,color:'#ffd24a'})]});
S(588.76,{set:'airport',camera:{zoom:[1.2,1.6],follow:'u'},
 actors:[U([-1.6,5.2],{moods:[[588.8,'sad']]}),HAM([1.2,5],{moods:[[588.8,'sad']],look:5,gestures:[[588.8,'icecream']]})],
 fx:[[589.2,'cross',{target:'ham'}]],texts:[T(588.9,590,'HE DOESN\'T LOOK AT YOU',{size:62})]});
S(590.1,{set:'airport',camera:{zoom:[2,2.6],follow:'ham',bgBlur:4},
 actors:[HAM([0,4.6],{moods:[[590.2,'sad']],talk:[[590.2,592.3]],gestures:[[590.2,'icecream']]})],
 fx:[[591,'sparkles',{target:'ham'}]],texts:[[590.2,592.4,'bubble','Spared no expense…',{actor:'ham'}]]});
S(592.72,{set:'airport',camera:{zoom:[2.4,3],follow:'ham',bgBlur:5},
 actors:[HAM([0,4.6],{moods:[[592.7,'sad']],talk:[[592.7,593.5]]})],
 fx:[[592.9,'gloom',{target:'ham'}],[593.4,'zoomPunch',{target:'ham'}]],texts:[[592.8,593.6,'bubble','Spared no expense.',{actor:'ham'}]]});
S(594.18,{set:'airport',camera:{zoom:[1,1.3],follow:'u'},
 actors:[U([-2,5.4],{moves:[{t0:594.2,t1:596.6,to:[-.2,5.2]}],moods:[[594.2,'calm']],gestures:[[594.2,'fists']]}),HAM([1.4,5.2],{moods:[[594.2,'sad']]})],
 fx:[[595,'dustRun',{target:'u'}],[596,'sparkles',{target:'u'}]],texts:[T(594.3,596.9,'THE THING NO CHARACTER EVER DOES',{size:52})]});
S(597.82,{set:'airport',camera:{zoom:[1.8,2.4],follow:'u',bgBlur:3},
 actors:[U([-.2,4.6],{moods:[[597.8,'sad']],talk:[[597.9,598.8]],gestures:[[597.8,'talk']]})],
 fx:[[598.2,'zoomPunch',{target:'u'}]],texts:[T(597.9,599.1,'YOU TELL HIM THE TRUTH',{size:70})]});
S(599.32,{set:'airport',camera:{zoom:[1.2,1.8],follow:'u'},
 actors:[U([-.6,5],{moods:[[599.3,'sad']],talk:[[599.3,601]],gestures:[[599.3,'talk']]}),HAM([1.4,5.2],{moods:[[599.3,'shock']]})],
 fx:[[600.2,'cross',{target:'ham'}]],texts:[T(599.4,601.3,'THE PARK COULD NEVER BE SAVED',{size:54,color:'#ff4a3a'})]});
S(601.38,{set:'airport',camera:{zoom:[1.4,2.2],follow:'u'},
 actors:[U([-.6,4.8],{moods:[[601.4,'calm']],talk:[[601.4,603.4]],gestures:[[601.4,'talk']]})],
 things:[{id:'can',k:'can',at:[1.4,5],Y:.8,scale:3}],
 fx:[[602.2,'cross',{target:'can'}],[603,'sparkles',{target:'u'}]],texts:[T(601.5,603.6,'THE MISTAKE WASN\'T A SHAVING CAN',{size:50})]});
S(603.98,{set:'airport',camera:{zoom:[1.6,2.4],follow:'u',bgBlur:4},
 actors:[U([-.4,4.6],{moods:[[604,'sad']],talk:[[604,606]],gestures:[[604,'fists']]})],
 things:[{id:'g',k:'goat',at:[2.4,5.4],scale:1.2}],
 fx:[[604.8,'zoomPunch',{target:'u'}],[605.4,'bulb',{target:'u'}]],texts:[T(604.1,606.2,'IT WAS BELIEVING YOU CAN CONTROL SOMETHING ALIVE',{size:42})]});
S(606.98,{set:'airport',camera:{zoom:[1.6,2.2],follow:'ham'},
 actors:[HAM([0,4.8],{moods:[[607,'sad']],gestures:[[607,'idle']]})],
 fx:[[607.6,'dizzy',{target:'ham'}],[608.2,'gloom',{target:'ham'}]],texts:[T(607.1,608.7,'HE DOESN\'T ANSWER FOR A LONG TIME',{size:46})]});
S(609.04,{set:'airport',camera:{zoom:[1.8,2.4],follow:'ham',bgBlur:4},
 actors:[HAM([0,4.6],{moods:[[609,'sad'],[610.2,'love']],gestures:[[609,'idle']]})],
 fx:[[610,'sparkles',{target:'ham'}],[610.6,'hearts',{target:'ham'}]],texts:[T(609.1,611,'THEN HE SAYS SOMETHING NEW',{size:62})]});
S(611.82,{set:'airport',camera:{zoom:[2,2.7],follow:'ham',bgBlur:5},
 actors:[HAM([0,4.6],{moods:[[611.8,'love']],talk:[[611.9,614]],gestures:[[611.9,'talk']]})],
 fx:[[612.4,'hearts',{target:'ham'}],[613.6,'sparkles',{target:'ham'}]],texts:[[611.9,614.2,'bubble','My granddaughter told me the same thing last night.',{actor:'ham',dy:-20}]]});
S(614.42,{set:'airport',camera:{zoom:[1.2,1.8],follow:'ham'},
 actors:[HAM([0,5],{moods:[[614.4,'calm']],gestures:[[614.4,'papers']]})],
 things:[{id:'hel',k:'heli',at:[3.4,11],Y:.1,scale:1.2}],
 fx:[[615,'stamp',{text:'SIGNED'}],[615.1,'shake'],[616,'speedLines']],texts:[T(614.5,617.3,'HE SIGNS THE SHUTDOWN PAPERS',{size:60})]});
S(617.46,{set:'airport',camera:{zoom:[1.4,2.2],follow:'ham',handheld:true},
 actors:[HAM([0,4.8],{moods:[[617.5,'calm']],gestures:[[617.5,'papers']]})],
 things:[{id:'hel',k:'heli',at:[0,9],Y:3.4,scale:1.3}],
 fx:[[617.6,'speedLines'],[618.4,'dustRun'],[619.4,'speedLines']],texts:[T(617.6,620.3,'BLADES ROARING OVERHEAD',{size:62})]});
S(620.94,{set:'airport',camera:{zoom:[1,1.3],follow:'u'},
 actors:[U([0,5.4],{moods:[[620.9,'calm']],gestures:[[620.9,'crossed']]})],
 fx:[[621.2,'stamp',{text:'CLOSED'}],[621.3,'shake']],texts:[T(621,621.9,'THE PARK CLOSES',{size:86,color:'#ff4a3a'})]});
S(622.44,{set:'farm',camera:{zoom:[1,1.3],pan:[[-70,0],[70,0]]},
 things:[{id:'r',k:'raptor',at:[-2.4,8],tilt:6},{id:'rex',k:'trex',at:[3,20],flip:true,mouth:[[623,623.8]]},{id:'g',k:'goat',at:[0,5.6],scale:1.1}],
 fx:[[622.8,'sparkles']],texts:[T(622.5,624,'THE ANIMALS STAY ON THE ISLAND',{size:54})]});
S(624.1,{set:'farm',camera:{zoom:[1.4,2.0],focus:[960,600]},
 things:[{id:'gt',k:'gate',at:[0,6],w:4,h:3,drop:[624.2,624.8],ring:[624.9]},{id:'fe',k:'fence',at:[0,12],w:14,h:4}],
 fx:[[624.3,'whipPan'],[624.9,'shake'],[624.9,'impactStar']],texts:[T(624.2,625.4,'THE DOORS ARE LOCKED',{size:70})]});
S(625.48,{set:'forest',camera:{zoom:[1,1.3],follow:'u'},
 actors:[U([0,5.2],{moods:[[625.5,'joy']],gestures:[[625.5,'cheer']]})],
 fx:[[625.8,'godRays'],[626.2,'sparkles',{target:'u'}]],texts:[T(625.6,628.2,'THE STORY ENDS AS IT WAS SUPPOSED TO',{size:50})]});
S(628.78,{set:'forest',camera:{zoom:[1.4,2.0],follow:'u'},
 actors:[U([0,4.8],{moods:[[628.8,'joy']],gestures:[[628.8,'cheer']]})],
 fx:[[629,'check',{target:'u'}],[629.3,'confetti']],texts:[T(628.9,629.8,'NOBODY DIES',{size:90,color:'#3aff8a'})]});
S(630.46,{set:'forest',camera:{zoom:[1,1.4],follow:'g'},
 things:[{id:'g',k:'goat',at:[1.6,5.4],scale:1.6}],actors:[U([-1.4,5],{moods:[[630.5,'love']],gestures:[[630.5,'point']]})],
 fx:[[631,'hearts',{target:'g'}],[631.2,'check',{target:'g'}]],texts:[T(630.5,631.5,'NOBODY GETS EATEN',{size:80})]});
S(631.64,{set:'office',camera:{zoom:[1.2,1.7],follow:'arn'},
 actors:[ARN([0,5],{moods:[[631.7,'joy']],gestures:[[631.7,'cheer']],talk:[[632,635.2]]}),GRANT([-2,5.4],{moods:[[631.7,'joy']]}),ELL([2,5.4],{moods:[[631.7,'joy']]})],
 fx:[[632.4,'hearts',{target:'arn'}],[633.6,'sparkles',{target:'arn'}]],texts:[T(631.8,635.4,'ARNOLD LIVES — TELLS EVERYONE ABOUT THE BRAVEST INTERN',{size:42})]});
S(636.1,{set:'airport',transIn:'fade',camera:{zoom:[1,1.3],follow:'u'},
 actors:[U([-1.2,5.2],{moves:[{t0:636.1,t1:638,to:[.6,5]}],moods:[[636.1,'calm']]}),LEX([-2.8,5.4],{moves:[{t0:636.1,t1:638,to:[-.8,5.2]}],moods:[[636.1,'sad']]})],
 things:[{id:'hel',k:'heli',at:[3.6,11],Y:.1,scale:1.3}],
 fx:[[636.6,'hearts',{target:'lex'}],[637.2,'sparkles']],texts:[T(636.2,638.1,'YOU HOLD LEX\'S HAND ON THE LADDER',{size:52})]});
S(638.08,{set:'beach',camera:{zoom:[1,1.5],pan:[[0,0],[0,-60]]},
 actors:[LEX([0,5],{moods:[[638.1,'sad']],look:-5,pose:'back'})],
 things:[{id:'hel',k:'heli',at:[0,16],Y:4,scale:1,moves:[{t0:638.1,t1:640.6,to:[2,19]}]}],
 fx:[[638.8,'godRays'],[639.6,'gloom',{target:'lex'}]],texts:[T(638.2,640.7,'SHE LOOKS BACK AT THE ISLAND',{size:56})]});
S(641.22,{set:'beach',camera:{zoom:[1.8,2.4],follow:'lex',bgBlur:4},
 actors:[LEX([0,4.6],{moods:[[641.2,'sad']],talk:[[641.3,642.2]],gestures:[[641.3,'idle']]})],
 fx:[[641.6,'question',{target:'lex'}],[642.2,'tears',{target:'lex'}]],texts:[[641.3,642.4,'bubble','Do they have friends?',{actor:'lex'}]]});
S(643.26,{set:'beach',camera:{zoom:[1.6,2.4],follow:'u'},
 actors:[U([0,4.6],{moods:[[643.3,'sad']],gestures:[[643.3,'shrug']]})],
 fx:[[643.7,'sweat',{target:'u'}],[644,'question',{target:'u'}]],texts:[]});
S(644.4,{set:'beach',camera:{zoom:[1.8,2.4],follow:'u',bgBlur:4},
 actors:[U([0,4.6],{moods:[[644.4,'love']],talk:[[644.5,645.2]],gestures:[[644.4,'idle']]})],
 fx:[[644.6,'hearts',{target:'u'}],[645,'sparkles',{target:'u'}]],texts:[[644.5,645.4,'bubble','…Yeah.',{actor:'u'}]]});
S(645.72,{set:'harbor',camera:{zoom:[1,1.3],pan:[[0,0],[0,-40]]},
 things:[{id:'hel',k:'heli',at:[0,14],Y:4.6,scale:.8,moves:[{t0:645.7,t1:648.5,to:[3,22]}]}],
 fx:[[646,'sparkles'],[647.6,'godRays']],texts:[T(645.8,648.6,'THE ISLAND TURNS INTO A GREEN DOT',{size:52,color:'#3aff8a'})]});
S(648.94,{set:'harbor',camera:{zoom:[1.2,1.8],focus:[960,420],handheld:true},
 things:[{id:'hel',k:'heli',at:[0,10],Y:3,scale:1.2}],
 fx:[[649.2,'shake'],[649.6,'speedLines']],texts:[T(649,650.3,'THE HELICOPTER SHAKES',{size:64})]});
S(650.46,{set:'harbor',camera:{zoom:[1,1.5],focus:[960,380]},
 things:[{id:'hel',k:'heli',at:[0,12],Y:3.4,scale:1}],
 fx:[[650.5,'godRays'],[651,'flash']],texts:[T(650.6,651.6,'THE SKY BRIGHTENS',{size:72})]});
S(651.78,{set:'harbor',camera:{zoom:[1.4,2.2],follow:'u'},
 actors:[U([0,4.8],{moods:[[651.8,'calm']],gestures:[[651.8,'idle']]})],
 fx:[[652,'freeze'],[652.4,'vhsRewind']],texts:[T(651.9,653,'THE SOUND FADES OUT',{size:70})]});
S(653.04,{set:'harbor',camera:{zoom:[1,1.4],follow:'u'},
 actors:[U([0,5],{moods:[[653,'love']]})],
 fx:[[653.1,'sparkles'],[653.6,'hearts',{target:'u'}]],texts:[T(653.1,654.1,'MUSIC BEGINS…',{size:80,color:'#ffd24a'})]});

// ---------- BACK TO ROW NINE (654-696s) ----------
S(654.22,{set:'cinema',transIn:'flash',camera:{zoom:[1.2,1.6],follow:'u'},
 actors:[U([0,5.2],{pose:'back',moods:[[654.2,'shock']]})],
 fx:[[654.4,'spotlight',{target:'u'}],[654.8,'sparkles',{target:'u'}]],texts:[T(654.3,656.3,'THEN YOUR SEAT LIGHTS UP',{size:64})]});
S(656.5,{set:'cinema',camera:{zoom:[1,1.3],focus:[960,620]},
 actors:[U([0,5.2],{pose:'back',moods:[[656.5,'calm']]})],
 fx:[[656.8,'check',{target:'u'}]],texts:[T(656.6,657.4,'ROW NINE',{size:88})]});
S(657.44,{set:'cinema',camera:{zoom:[1,1.3],pan:[[-70,0],[70,0]]},
 actors:[U([0,5.4],{pose:'back',moods:[[657.4,'calm']]})],
 fx:[[657.8,'godRays']],texts:[T(657.5,658.5,'THE THEATER IS EMPTY',{size:68})]});
S(658.62,{set:'cinema',camera:{zoom:[1,1.2],focus:[960,380]},
 actors:[U([0,5.8],{pose:'back'})],
 fx:[[658.9,'typewriter',{text:'ROLLING CREDITS'}]],texts:[]});
S(660.42,{set:'cinema',camera:{zoom:[1.8,2.6],focus:[1020,740]},
 things:[{id:'cup',k:'cup',at:[.9,5],Y:.7,scale:2.2,pulses:[]}],actors:[U([-1.2,5.2],{pose:'back'})],
 fx:[[661.4,'check'],[662.6,'sparkles']],texts:[T(660.5,663,'THE CUP IS STILL PERFECTLY STILL',{size:50})]});
S(663.54,{set:'cinema',camera:{zoom:[1.6,2.2],follow:'u'},
 actors:[U([0,4.8],{moods:[[663.5,'calm']],gestures:[[663.5,'popcorn']]})],
 fx:[[664,'sparkles',{target:'u'}],[664.4,'check',{target:'u'}]],texts:[T(663.6,664.8,'THE POPCORN IS DRY',{size:72})]});
S(665.1,{set:'cinema',camera:{zoom:[1.8,2.4],follow:'u',bgBlur:4},
 actors:[U([0,4.6],{moods:[[665.1,'joy']],gestures:[[665.1,'cheer']],talk:[[665.2,666.4]]})],
 fx:[[665.4,'sparkles',{target:'u'}],[665.8,'zoomPunch',{target:'u'}]],texts:[[665.2,666.6,'bubble','Ha!',{actor:'u'}]]});
S(667.08,{set:'cinema',camera:{zoom:[1.2,1.6],follow:'u'},
 actors:[U([0,5],{moods:[[667.1,'smug']],gestures:[[667.1,'shrug']]})],
 fx:[[667.6,'sparkles',{target:'u'}]],texts:[T(667.2,668.3,'IT WAS ALL JUST A MOVIE',{size:62})]});
S(668.5,{set:'cinema',camera:{zoom:[1.8,2.4],follow:'u'},
 actors:[U([0,4.6],{moods:[[668.5,'smug']],gestures:[[668.5,'crossed']]})],
 fx:[[668.8,'sparkles',{target:'u'}]],texts:[[668.6,669.4,'bubble','Of course it was.',{actor:'u'}]]});
S(670,{set:'cinema',camera:{zoom:[1,1.5],focus:[960,400]},
 actors:[U([0,5.6],{pose:'back',moods:[[670,'calm']]})],
 fx:[[670.4,'spotlight',{target:'u'}]],texts:[T(670.1,671.4,'THEN YOU READ THE CREDITS',{size:62})]});
S(671.6,{set:'cinema',camera:{zoom:[1.2,2.0],focus:[960,380]},
 actors:[U([0,5.6],{pose:'back'})],
 fx:[[672,'typewriter',{text:'SOUND DESIGNER · CATERER'}]],texts:[]});
S(673.98,{set:'cinema',camera:{zoom:[1.4,2.2],focus:[960,380]},
 actors:[U([0,5.6],{pose:'back',moods:[[674,'shock']]})],
 fx:[[674.2,'exclaim',{target:'u'}],[674.4,'dollyZoom',{target:'u'}]],texts:[T(674.1,675.2,'THERE\'S A NEW LINE',{size:72,color:'#ffd24a'})]});
S(675.42,{set:'cinema',camera:{zoom:[1.8,2.6],focus:[960,360]},
 actors:[U([0,5.6],{pose:'back'})],
 fx:[[675.8,'typewriter',{text:'UNPAID INTERN: YOU'}],[677,'sparkles'],[677,'godRays']],texts:[]});
S(677.7,{set:'cinema',camera:{zoom:[2.2,3],focus:[960,360]},
 actors:[U([0,5.8],{pose:'back',moods:[[677.7,'shock']]})],
 fx:[[678.4,'arrowPoint',{target:'u'}],[678.8,'sparkles']],texts:[T(677.8,679.4,'IN TINY LETTERS…',{size:70})]});
S(680.12,{set:'cinema',camera:{zoom:[1.4,2.0],follow:'u'},
 actors:[U([0,5],{moods:[[680.1,'shock']],gestures:[[680.1,'handsFace']]})],
 fx:[[680.6,'question',{target:'u'}],[681.4,'counter',{to:40,pre:'0 / ',post:''}],[681.6,'sweat',{target:'u'}]],texts:[T(680.2,682.3,'NOT THERE THE PREVIOUS 40 TIMES',{size:50})]});
S(682.4,{set:'cinema',camera:{zoom:[1,1.5],focus:[960,400]},
 actors:[U([0,5.8],{pose:'back',moods:[[682.4,'shock']]})],
 fx:[[683,'typewriter',{text:'DIRECTED BY SOMEONE NOT FINISHED'}],[684.2,'shake']],texts:[]});
S(685.44,{set:'cinema',camera:{zoom:[1.2,2.0],follow:'u'},
 actors:[U([0,5],{moods:[[685.4,'shock']],look:-3})],
 things:[{id:'tk',k:'ticket',at:[.4,4.6],y0:3,fall:1.6,dur:2.2,scale:3}],
 fx:[[686,'sparkles',{target:'tk'}],[686.6,'arrowPoint',{target:'tk'}]],texts:[T(685.5,687.6,'A PIECE OF PAPER FLOATS DOWN',{size:54})]});
S(687.94,{set:'cinema',camera:{zoom:[2.2,3],focus:[960,730]},
 things:[{id:'tk',k:'ticket',at:[0,4.6],y0:1.2,fall:0,dur:1,scale:6}],
 fx:[[688.4,'sparkles',{target:'tk'}],[688.8,'question',{target:'tk'}]],texts:[T(688,689.1,'A TICKET. BLANK.',{size:76})]});
S(689.26,{set:'cinema',camera:{zoom:[2.6,3.2],focus:[960,730]},
 things:[{id:'tk',k:'ticket',at:[0,4.6],y0:1.2,fall:0,dur:1,scale:6}],
 fx:[[689.6,'sparkles',{target:'tk'}]],texts:[T(689.3,690.2,'ONE WORD AT THE TOP',{size:70})]});
S(690.26,{set:'cinema',camera:{zoom:[2.6,3.4],focus:[960,730]},
 things:[{id:'tk',k:'ticket',at:[0,4.6],y0:1.2,fall:0,dur:1,scale:6}],
 fx:[[690.4,'wordSlam',{text:'NEXT',color:'#ffd24a',size:190}],[690.5,'shake'],[691.4,'confetti']],texts:[]});
S(693.14,{set:'cinema',camera:{zoom:[1.6,2.4],follow:'g'},
 things:[{id:'g',k:'goat',at:[.2,5],Y:.6,scale:1.8}],actors:[U([-1.6,5.2],{moods:[[693.2,'love']],gestures:[[693.2,'point']]})],
 fx:[[694,'hearts',{target:'g'}],[694.4,'sparkles',{target:'g'}]],texts:[T(693.3,695,'A STUFFED GOAT: KEVIN',{size:66})]});

// ---------- THE TRUTH ABOUT STORIES (695-736s) ----------
S(695.84,{set:'cinema',camera:{zoom:[1,1.4],follow:'u'},
 actors:[U([-1.2,5],{moods:[[695.9,'smug']],gestures:[[695.9,'think']]})],
 things:[{id:'g',k:'goat',at:[1.2,5.2],Y:.6,scale:1.4}],
 fx:[[696.4,'bulb',{target:'u'}],[696.8,'spotlight',{target:'u'}]],texts:[T(695.9,697.5,'THE TRUTH ABOUT STORIES',{size:70})]});
S(697.8,{set:'rainyNight',camera:{zoom:[1.2,1.8],follow:'rex'},
 things:[{id:'rex',k:'trex',at:[0,15],flip:true,mouth:[[698,699.8]]}],actors:[U([-2.4,5],{moods:[[697.8,'shock']]})],
 fx:[[698.4,'lightning'],[698.8,'shake']],texts:[T(697.9,699.9,'THEY ONLY WORK BECAUSE SOMETHING GOES WRONG',{size:44})]});
S(700.54,{set:'cinema',camera:{zoom:[1,1.4],pan:[[-60,0],[60,0]]},
 actors:[U([0,5.4],{pose:'back',moods:[[700.5,'calm']]})],
 fx:[[701,'vhsRewind'],[701.8,'sparkles']],texts:[T(700.6,702.6,'EVERY MOVIE YOU LOVE IS BUILT ON A MISTAKE',{size:46})]});
S(703.24,{set:'forest',camera:{zoom:[1,1.3],follow:'u'},
 actors:[U([0,5.2],{moods:[[703.2,'sad']],gestures:[[703.2,'handsFace']]})],
 fx:[[703.4,'gloom',{target:'u'}]],texts:[T(703.3,704,'A LOSS',{size:84})]});
S(703.9,{set:'rainyNight',camera:{zoom:[1,1.3],focus:[960,500]},
 actors:[U([0,5.2],{moods:[[703.9,'shock']],gestures:[[703.9,'fists']]})],
 fx:[[704.1,'rain'],[704.3,'lightning']],texts:[T(704,704.8,'A STORM',{size:84})]});
S(704.7,{set:'office',camera:{zoom:[1.2,1.8],follow:'ned'},
 actors:[NED([0,5],{moods:[[704.7,'smug']],gestures:[[704.7,'canp']]})],
 fx:[[705,'cross',{target:'ned'}],[705.3,'sparkles',{target:'ned'}]],texts:[T(704.8,706,'A BAD DECISION',{size:76,color:'#ff4a3a'})]});
S(705.92,{set:'cinema',camera:{zoom:[1.2,1.8],follow:'u'},
 actors:[U([0,5],{moods:[[705.9,'love']],gestures:[[705.9,'popcorn']]})],
 fx:[[706.4,'hearts',{target:'u'}],[707,'sparkles',{target:'u'}]],texts:[T(706,708.2,'YOUR FAVORITE MOVIE… IS YOUR FAVORITE',{size:46})]});
S(708.48,{set:'cinema',camera:{zoom:[1.6,2.2],follow:'u'},
 actors:[U([0,4.8],{moods:[[708.5,'sad']],gestures:[[708.5,'handsFace']]})],
 fx:[[709.2,'tears',{target:'u'}],[709.6,'gloom',{target:'u'}]],texts:[T(708.6,710.3,'…BECAUSE SOMEONE SUFFERED THROUGH IT',{size:46})]});
S(710.5,{set:'forest',camera:{zoom:[1,1.3],pan:[[-70,0],[70,0]]},
 actors:[U([-1.8,5.2],{moves:[{t0:710.5,t1:712.6,to:[1.2,5.2]}],moods:[[710.5,'smug']],gestures:[[710.5,'cheer']]})],
 things:[{id:'g',k:'goat',at:[2.8,6],scale:1.2}],
 fx:[[711,'sparkles'],[711.8,'godRays']],texts:[T(710.6,712.7,'YOU COULD FIX EVERYTHING',{size:68})]});
S(713.48,{set:'forest',camera:{zoom:[1.2,1.8],follow:'u'},
 actors:[U([1.2,5],{moods:[[713.5,'shock']],gestures:[[713.5,'handsFace']]})],
 fx:[[714,'glitch'].slice(0,0).length?[714,'flash']:[714,'vhsRewind'],[714.8,'dizzy',{target:'u'}]],texts:[T(713.6,715.7,'BUT THE STORY DISAPPEARS',{size:64,color:'#ff4a3a'})]});
S(716.24,{set:'cinema',camera:{zoom:[1,1.5],follow:'u'},
 actors:[U([0,5.2],{moods:[[716.2,'sad']],gestures:[[716.2,'idle']]})],
 fx:[[716.6,'gloom',{target:'u'}],[717.2,'dizzy',{target:'u'}]],texts:[T(716.3,717.8,'AND EVERYTHING YOU LOVED WITH IT',{size:50})]});
S(718.54,{set:'forest',camera:{zoom:[1,1.3],follow:'u'},
 actors:[U([-1,5],{moves:[{t0:718.5,t1:720.2,to:[.8,5]}],moods:[[718.5,'calm']],gestures:[[718.5,'flare']]}),TIM([2.4,5.4],{moods:[[718.5,'joy']]}),LEX([3.6,5.4],{moods:[[718.5,'joy']]})],
 fx:[[719,'sparkles',{target:'u'}],[719.6,'hearts']],texts:[T(718.6,720.2,'YOU WALKED IN TO SAVE THEM',{size:62})]});
S(720.38,{set:'cinema',camera:{zoom:[1.2,1.8],follow:'u'},
 actors:[U([0,5],{moods:[[720.4,'sad'],[722,'love']],gestures:[[720.4,'idle']]})],
 fx:[[721,'bulb',{target:'u'}],[722,'hearts',{target:'u'}]],texts:[T(720.5,723.1,'YOU WALKED OUT UNDERSTANDING WHY THEY NEEDED TO BE HURT',{size:40})]});
S(723.82,{set:'cinema',camera:{zoom:[1.4,2.0],follow:'u'},
 actors:[U([0,4.8],{moods:[[723.8,'joy']],gestures:[[723.8,'cheer']]})],
 fx:[[724.4,'confetti'],[725,'sparkles',{target:'u'}]],texts:[T(723.9,726.6,'NOT BAD FOR AN INTERN WHO JUST WANTED TO TOUCH A DINOSAUR',{size:38})]});

// ---------- FINAL QUESTION ----------
S(727.34,{set:'cinema',camera:{zoom:[1,1.5],follow:'u'},
 actors:[U([0,5.2],{moods:[[727.3,'smug']],gestures:[[727.3,'point']]})],
 fx:[[727.8,'spotlight',{target:'u'}],[728.6,'question',{target:'u'}]],texts:[T(727.4,730.2,'IF YOU COULD LIVE INSIDE YOUR FAVORITE MOVIE…',{size:42})]});
S(730.7,{set:'cinema',camera:{zoom:[1.4,2.0],follow:'u'},
 actors:[U([0,4.8],{moods:[[730.7,'think']].map(x=>[x[0],'smug']),gestures:[[730.7,'think']]})],
 things:[{id:'cup',k:'cup',at:[1.4,5],Y:.7,scale:1.8,pulses:[732.4]}],
 fx:[[731.2,'bulb',{target:'u'}],[732.4,'shockwave',{target:'cup'}]],texts:[T(730.8,733,'FIX THE ENDING… OR LEAVE IT ALONE?',{size:48,color:'#ffd24a'})]});
S(733.94,{set:'cinema',camera:{zoom:[1.2,1.0],follow:'u'},
 actors:[U([0,5],{moods:[[733.9,'joy']],gestures:[[733.9,'cheer']]})],
 things:[{id:'g',k:'goat',at:[1.6,5.4],Y:.6,scale:1.2},{id:'cup',k:'cup',at:[-1.6,5],Y:.7,scale:1.8,pulses:[734.4,734.9]}],
 fx:[[734.2,'likes'],[734.6,'sparkles',{target:'u'}],[735,'fireworks']],texts:[T(734,736,'WHICH MOVIE ARE YOU PICKING?',{size:54,color:'#ffd24a'})]});
