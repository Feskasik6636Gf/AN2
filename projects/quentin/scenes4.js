const {S,P,q,a,bub,th,tag,ttl,mv,cam,Q}=require('./h.js');
// ---------- THE CARD 461.9 ----------
S(461.92,{set:'bedroom',camera:{move:'push'},actors:[q(0,4.5,{moods:[[461.9,'worry'],[464,'wow']],gestures:[[461.9,'idle'],[463.5,'point']]},'coat')],texts:[ttl(462,463.6,'AGE 290',{y:190,size:100})],neon:false});
S(466.28,{insert:{type:'note',lines:['DR. IMANI OKAFOR','555-0143','(yellow · brittle)'],cross:false},camera:{move:'push'}});
S(469.3,{set:'bedroom',camera:{zoom:[1.8,2.2],follow:'q',bgBlur:3},actors:[q(0,4.5,{moods:[[469.3,'sad']],gestures:[[469.3,'think']]},'coat')],texts:[th(469.5,471.7,'older than I feel','q')],neon:false});
S(472.08,{insert:{type:'phone',mode:'call',caller:'DR. OKAFOR',title:'calling…'},camera:{move:'push'}});
S(473.24,{set:'bedroom',camera:{zoom:[1.7,2.1],follow:'q',bgBlur:3},actors:[q(0,4.5,{moods:[[473.2,'sad']],gestures:[[473.2,'phone']]},'coat')],texts:[tag(473.5,475.4,'DISCONNECTED · 200 YEARS',{actor:'q',dx:170,dy:-80})],neon:false});
S(475.76,{set:'bedroom',camera:{move:'hold'},actors:[q(0,4.5,{moods:[[475.8,'smug']],gestures:[[475.8,'shrug']]},'coat')]});
S(476.84,{set:'streetDay',camera:{move:'track',follow:'q'},actors:[q(-3,6,{moods:[[476.9,'worry']],moves:[mv(476.9,479.4,2.4,6)],autoFace:true},'coat')]});
S(479.56,{set:'library',camera:{move:'pull'},actors:[q(0,4.6,{moods:[[479.6,'wow']]},'coat')],texts:[ttl(479.6,480.9,'A MUSEUM NOW',{y:180,size:90})],neon:false});
S(481.02,{set:'library',camera:{move:'panR'},actors:[q(-1.4,4.6,{moods:[[481,'wow']],moves:[mv(481,484,1.4,4.6)]},'coat')],texts:[tag(482,484.6,'GLASS CASE',{xy:[1250,500]})]});
S(482.94,{set:()=>Q.notebook(),camera:{zoom:[1,1.2],focus:[960,720]},sfx:[[483.2,'sparkle',.4]]});
S(485.54,{set:()=>Q.notebook(),camera:{zoom:[1.5,1.9],focus:[1180,740]},texts:[tag(485.8,486.7,'HER HANDWRITING: TINY',{xy:[1100,560]})]});
S(486.72,{set:()=>Q.notebook(),camera:{zoom:[1.9,2.3],focus:[1180,760]},texts:[ttl(486.8,489.4,'ONE LINE · YOUR NAME',{y:150,size:70})]});
S(489.88,{insert:{type:'note',lines:['"IF HE\'S STILL OUT THERE,','TELL HIM IT WASN\'T A CURSE."'],cross:false},camera:{move:'push'}});
S(492.46,{set:'library',camera:{zoom:[1.9,2.3],follow:'q',bgBlur:3},actors:[q(0,4.6,{moods:[[492.5,'wow'],[493,'love']]},'coat')],texts:[ttl(492.5,493.4,'IT WAS A JOB',{y:170,size:80})],neon:false});
S(493.56,{set:()=>Q.notebook(),camera:{zoom:[1.2,1.5],focus:[1000,740]},texts:[ttl(493.6,494.8,'SOMEONE HAS TO REMEMBER',{y:150,size:62})]});
S(495.2,{set:'library',camera:{move:'pull'},actors:[q(0,4.6,{moods:[[495.2,'sad']],gestures:[[495.2,'book']]},'coat')],texts:[tag(496,498,'A VERY LONG TIME',{xy:[900,300]})]});
S(498.54,{set:'library',camera:{zoom:[1.8,2.2],follow:'q',bgBlur:3},actors:[q(0,4.6,{moods:[[498.6,'smug']],reacts:[[498.7,'nod']]},'coat')],texts:[ttl(498.6,499.3,'THEN YOU BEGIN',{y:160,size:70})],neon:false});
// ---------- THE WALK 499.7 ----------
S(499.68,{set:'road',camera:{move:'track',follow:'q'},actors:[q(-5,6,{moods:[[499.7,'joy']],moves:[mv(499.7,501.5,4,6)],autoFace:true},'pack')],texts:[tag(500,501.6,'BACKPACK',{actor:'q',dx:-150,dy:-120})]});
S(501.96,{set:'harbor',camera:{zoom:[1.3,1.7],follow:'q'},actors:[q(-1,6,{moods:[[502,'smug']],gestures:[[502,'book']]},'pack'),a('fisher',1.4,6.1,{moods:[[502,'joy']],gestures:[[502,'wave']]})],texts:[tag(502.2,503.2,'LEARN EVERY NAME',{actor:'q',dx:-60,dy:-190})]});
S(503.42,{set:()=>Q.graveyard({tone:'night',rows:5}),camera:{move:'panR'},actors:[q(-2.4,5.6,{moods:[[503.4,'calm']],moves:[mv(503.4,505,-.6,5.6)]},'pack')],texts:[tag(503.6,504.9,'GRAVES NOBODY VISITS',{actor:'q',dx:150,dy:-150})]});
S(505.28,{set:()=>Q.graveyard({tone:'night',rows:5}),camera:{zoom:[1.5,1.9],follow:'q'},actors:[q(-.6,5.6,{moods:[[505.3,'love']],gestures:[[505.3,'pray'],[508,'talk']],talk:[[505.5,507.6],[508,510]]},'pack')],texts:[bub(505.28,509,'Margaret Hale. Tomas Brun. Iko…','q')]});
S(510.52,{set:'harbor',camera:{zoom:[1.5,1.9],follow:'fisher'},actors:[a('fisher',0,6,{moods:[[510.5,'smug']],gestures:[[510.5,'flex']]})],texts:[tag(510.6,511.3,'A FISHERMAN',{actor:'fisher',dx:150,dy:-170})],neon:false});
S(511.38,{set:'ceoOffice',camera:{zoom:[1.5,1.9],follow:'queen'},actors:[a('queen',0,4.7,{moods:[[511.4,'smug']],gestures:[[511.4,'idle']]})],texts:[tag(511.5,512.2,'A QUEEN',{actor:'queen',dx:150,dy:-170})],neon:false});
S(512.24,{set:'musicRoom',camera:{move:'push'},actors:[a('choir',0,4.6,{moods:[[512.3,'joy']],gestures:[[512.3,'talk']],talk:[[512.3,515.5]]}),a('choir',-1.4,4.8,{id:'choir2',moods:[[512.3,'joy']],talk:[[512.3,515.5]]})],texts:[tag(513,515.7,'A CHOIR THAT WAS NEVER RECORDED',{xy:[1100,300]})],fx:[[513,'sparkles',{target:'choir'}]]});
S(515.72,{set:'parkSunset',camera:{zoom:[1.2,1.5],follow:'q'},actors:[q(0,5.4,{moods:[[515.8,'smug']],gestures:[[515.8,'hips']]},'pack')],fx:[[516,'godRays']],texts:[tag(516.2,519.6,'NO HUMAN HAS EVER BEEN THIS',{xy:[1000,300]})]});
S(520.22,{set:'parkSunset',camera:{zoom:[1.8,2.3],follow:'q',bgBlur:3},actors:[q(0,5.4,{moods:[[520.2,'wow']]},'pack')],texts:[ttl(520.3,521.5,'EYEWITNESS TO EVERYTHING',{y:170,size:58})],neon:false});
S(522.08,{set:'cafeInside',camera:{move:'push'},actors:[q(-.8,4.5,{moods:[[524,'wink']],gestures:[[522.1,'idle']],talk:[[523.7,524.9]]},'pack'),a('elena',1,4.6,{moods:[[522.1,'wow']],talk:[[522.1,523.7]]})],texts:[bub(523.74,525,"I'm a historian.",'q')]});
S(525.44,{set:'cafeInside',camera:{zoom:[1.9,2.3],follow:'q',bgBlur:3},actors:[q(-.8,4.5,{moods:[[525.4,'wink']],gestures:[[525.4,'shrug']]},'pack')],neon:false});
// ---------- METHUSELAH 526 ----------
S(526.58,{set:'forest',camera:{move:'pull'},actors:[q(0,5,{moods:[[526.6,'wow']]},'pack')],texts:[ttl(526.6,528.2,'AGE 200',{y:190,size:90}),tag(530.7,534.2,'METHUSELAH · 4,800 YEARS',{xy:[1250,300]})],neon:false});
S(534.68,{set:'forest',camera:{zoom:[1.6,2],follow:'q'},actors:[q(0,5,{moods:[[534.7,'love']],gestures:[[534.7,'hug']]},'pack')]});
S(536.08,{set:'forest',camera:{zoom:[2,2.4],follow:'q',bgBlur:3},actors:[q(0,5,{moods:[[536.1,'love']],gestures:[[536.1,'hug']]},'pack')],texts:[tag(536.4,538.4,'ROUGH · WARM · ALMOST ALIVE',{actor:'q',dx:150,dy:-60})],neon:false});
S(539.1,{set:'forest',camera:{move:'pull'},actors:[q(0,5,{moods:[[539.1,'joy']],gestures:[[539.1,'cheer']]},'pack')],fx:[[540,'sparkles',{target:'q'}]],texts:[tag(541.1,543,'A PEER',{actor:'q',dx:150,dy:-170})]});
S(543.42,{set:'forest',camera:{zoom:[1.8,2.3],follow:'q',bgBlur:3},actors:[q(0,5,{moods:[[543.4,'smug']],gestures:[[543.4,'pocket']]},'pack')],texts:[tag(544,546.4,'ONE SEED',{actor:'q',dx:150,dy:-30})],neon:false});
S(547.08,{set:'forest',camera:{move:'punch',follow:'q'},actors:[q(0,5,{moods:[[547.1,'smug']],gestures:[[547.1,'pocket']]},'pack')],texts:[ttl(547.1,547.9,'REMEMBER THAT SEED',{y:150,size:64})],neon:false});
// ---------- PYRAMID 548 ----------
S(548.44,{set:'desert',camera:{move:'pull'},actors:[q(0,5,{moods:[[548.5,'wow']]},'pack')],fx:[[549,'godRays']],texts:[ttl(548.5,550,'1,000 YEARS',{y:190,size:80})],neon:false});
S(552.26,{set:'desert',camera:{zoom:[1.4,1.8],follow:'q'},actors:[q(0,5,{moods:[[552.3,'shock']],gestures:[[552.3,'shrug']]},'pack')],texts:[tag(552.5,555.6,'PYRAMID: ONLY 4,500',{xy:[1150,330]})]});
S(556.0,{insert:{type:'timeline',from:'4,500 YEARS AGO',marks:[[.15,'PYRAMID BUILT','#c87a4a'],[.55,'YOU: 1,000','#ffd24a'],[.95,'YOU: 4,500','#e5262d']],span:[.15,.95],spanLabel:'OLDER THAN THE BUILDERS'},camera:{move:'push'}});
// ---------- 10,000 ----------
S(560.48,{set:'bedroom',camera:{zoom:[1.8,2.3],follow:'q',bgBlur:3},actors:[q(0,4.5,{moods:[[560.5,'sad']],gestures:[[560.5,'think']]},'coat')],texts:[th(560.6,564.5,'mom\'s voice … ?','q')],neon:false});
S(565.02,{set:'bedroom',camera:{move:'pull'},actors:[q(0,4.5,{moods:[[565,'worry']],gestures:[[565,'facepalm']]},'coat')],texts:[tag(565.4,567.6,'MEMORY GOES FIRST',{actor:'q',dx:150,dy:-170})]});
S(568.32,{insert:{type:'note',lines:['NOTE TO SELF:','YOUR NAME IS QUENTIN.','YOU HAD A SISTER.'],cross:false},camera:{move:'push'}});
S(570.28,{set:'bedroom',camera:{zoom:[1.6,2],follow:'q'},actors:[q(0,4.5,{moods:[[570.3,'calm']],gestures:[[570.3,'phone']]},'coat')],texts:[tag(570.4,571.3,'RECORDER',{actor:'q',dx:150,dy:-30})],neon:false});
S(571.76,{set:()=>Q.watch(),camera:{zoom:[1.2,1.6],focus:[960,540]},texts:[tag(572.2,575.6,'STILL TICKING',{xy:[1260,540]})],sfx:[[572,'clockTick',.8],[573,'clockTick',.8],[574,'clockTick',.8]]});
S(576.32,{set:'bedroom',camera:{zoom:[1.9,2.3],follow:'q',bgBlur:3},actors:[q(0,4.5,{moods:[[576.3,'love']],gestures:[[576.3,'idle']]},'coat')],texts:[th(576.4,577.4,'Grandpa\'s watch','q')],neon:false});
S(577.56,{set:()=>Q.watch({wound:true}),camera:{zoom:[1.3,1.1],focus:[960,540]},texts:[tag(577.8,578.8,'WIND IT EVERY MORNING',{xy:[1300,320]})],sfx:[[578,'clockTick',.8]]});
S(579.44,{set:'bedroom',camera:{zoom:[1.7,2.2],follow:'q'},actors:[q(0,4.5,{moods:[[579.5,'sad']],gestures:[[579.5,'pocket']]},'coat')],texts:[tag(579.8,582.2,'YOUR FIRST DAY: THIS',{actor:'q',dx:160,dy:-60})],neon:false});
// ---------- 100,000 ----------
S(582.58,{set:'desert',camera:{move:'pull'},actors:[q(0,5,{moods:[[582.6,'sad']]},'ragged')],texts:[ttl(582.6,584.2,'100,000 YEARS',{y:190,size:80})],neon:false});
S(587.04,{set:'desert',camera:{move:'panR'},actors:[q(-1,5,{moods:[[587,'worry']]},'ragged')],texts:[tag(587.2,588.3,'CITIES: DUST',{xy:[1300,400]})]});
S(588.94,{set:'mountains',camera:{move:'push'},actors:[q(0,5,{moods:[[588.9,'tired']]},'ragged')],texts:[tag(589.1,590.4,'COUNTRIES: SOIL',{xy:[1300,400]})]});
S(591.06,{set:'spaceStation',camera:{move:'pull'},actors:[q(-1.6,4.6,{moods:[[591.1,'shock']]},'ragged'),a('future',1.2,4.7,{moods:[[591.1,'calm']]})],texts:[tag(591.2,592.4,'HUMANS: SOMETHING ELSE',{xy:[1100,300]})]});
S(592.74,{set:'spaceStation',camera:{move:'push'},actors:[a('future',-1.6,4.6,{moods:[[592.8,'calm']]}),a('future',0,4.7,{id:'f2',moods:[[592.8,'smug']]}),a('future',1.6,4.6,{id:'f3',moods:[[592.8,'calm']]})],texts:[tag(593,594.2,'A NEW KIND OF PEOPLE',{xy:[1000,300]})]});
S(594.12,{set:'spaceStation',camera:{zoom:[1.8,2.2],follow:'future',bgBlur:3},actors:[a('future',0,4.6,{moods:[[594.2,'calm']]})],texts:[tag(594.3,596.4,'TALLER · THINNER',{actor:'future',dx:150,dy:-170})],neon:false});
S(597.02,{set:'spaceStation',camera:{move:'pull'},actors:[a('future',-1.4,4.6,{moods:[[597,'wow']],gestures:[[597,'point']]}),a('future',1.2,4.7,{id:'f2',moods:[[597,'wow']],gestures:[[597,'point']]}),q(0,4.9,{moods:[[597,'shy']]},'ragged')],texts:[tag(597.3,599,'A MYTH',{actor:'q',dx:150,dy:-170})]});
S(599.44,{set:'spaceStation',camera:{zoom:[1.8,2.3],follow:'q',bgBlur:3},actors:[q(0,4.8,{moods:[[599.5,'sad']]},'ragged')],texts:[tag(599.6,601.2,'THE OLDEST STORY',{actor:'q',dx:150,dy:-120})],neon:false});
