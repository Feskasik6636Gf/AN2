# IYA2D — справочник движка

Все пути от корня репозитория. Движок: `engine/`, звуки: `sfx/`, проекты: `projects/<slug>/`.

## Проект `projects/<slug>/project.js`
```js
module.exports={
 title:'slug', fps:30,
 voice:'voice.wav',            // озвучка пользователя (любой формат, ffmpeg читает), null = без голоса
 voiceOffset:0,                // сдвиг голоса, сек
 captions:{words:require('./words.json').words, group:4},  // субтитры по словам (необязательно)
 music:[[0,30,'comedy'],[30,60,'tense']],   // [t0,t1,mood] глобальное время
 shots:[ /* шоты по порядку, у каждого dur (сек) */ ]
};
```
Сумма `dur` всех шотов = длина ролика. Шоты стыкуются по фразам озвучки (тайминги из `words.json`).

## Шот
```js
{dur:3.2, set:'hallway',            // локация (см. список) или функция ()=>({C,bg,fg,spots,rim,cast,grade,amb})
 transIn:'whip'|'flash'|'fade',      // переход на входе (по умолчанию жёсткая склейка)
 camera:{zoom:[1,1.08], follow:'tema' | focus:[x,y], pan:[[dx0,dy0],[dx1,dy1]], bgBlur:3, ease:'inout'|'linear', handheld:true},
 actors:[{id:'tema', char:'tema' | {age,fig,shape,hair,hairCol,outfit,top,pants,shoe,acc,mood},
   at:[X,Z],                          // точка на полу, метры (X влево-вправо, Z вглубь; 4–6 = передний план)
   Y:0,                               // высота пола (сцена/подиум)
   moves:[{t0:0,t1:2.4,to:[X,Z]}],    // ходьба (шаг подстроен под скорость — без скольжения)
   moods:[[0,'calm'],[1.2,'shock']],  // эмоции во времени (смена с «подпрыгиванием»)
   gestures:[[0,'phone'],[1.5,'wave']],// жесты во времени (плавный переход 0.2с)
   talk:[[0.5,2.1]],                  // рот говорит (ставить по таймингам слов этой реплики)
   pose:'back'|'sit'|'floor'|'lie', poses:[[t,'sit']],
   prop:'phone'|'money'|'coffee'|'book', look:-4 }],
 crowd:{x:[-5,5],z:[6,12],n:20,blurFar:10,back:false},   // массовка из настоящих персонажей
 fgHeads:[[-3,2.4],[1,2.6,true]], fgBlur:12,              // размытые головы на переднем плане (через плечо/зрители)
 fx:[[0.6,'zoomPunch',{target:'tema'}],[0.7,'exclaim',{target:'tema'}]],  // эффекты + их звук автоматически
 texts:[[t0,t1,'bubble','Текст',{actor:'aya'}],[t0,t1,'title','НИКОГДА',{y:220,color:'#ffd24a'}],[t0,t1,'caption','...'],[t0,t1,'label','ТЁМА',{actor:'tema'}]],
 sfx:[[1.0,'cash',0.8]],               // доп. звуки
 amb:'ambSchool'                       // фон (по умолчанию берётся по локации)
}
```
Шаги, поп текста, звуки эффектов и переходов добавляются автоматически.

## Локации (72)
classroom, bedroom, kitchen, hallway, office, streetDay, cityNight, parkSunset, livingRoom, bathroom, teenRoomDay, garage, attic, basement, diningEvening, homeGym, cafeteria, schoolGym, library, principalOffice, nurseRoom, scienceLab, musicRoom, lockerRoom, hospitalRoom, hospitalHall, supermarket, convenience, cafeInside, restaurant, fastFood, mall, cinema, bank, policeStation, jailCell, courtroom, meetingRoom, ceoOffice, studio, concertStage, nightclub, barbershop, pharmacy, hotelLobby, airport, subway, recordStore, schoolYard, basketball, beach, forest, desert, snowStreet, rainyNight, suburbs, parkingLot, gasStation, rooftopNight, bridge, farm, mountains, playground, stadium, carnival, harbor, alley, moon, spaceStation, busStop, nightSuburb, assembly

Новую локацию строить на `stage.js` (метры, одна перспектива) по образцу `sets.js`/`sets2.js`, вернуть `{C,bg,fg,spots,rim,cast,grade,amb}` и добавить в `LOC` в `director.js`.

## Персонажи
Готовые (`char:'tema'` и т.д.; также `c1..c50`):
1. Тёма (18) -> 'tema'
2. Ая (18) -> 'aya'
3. Мир (12) -> 'mir'
4. Кира (13) -> 'kira'
5. Бруно (11) -> 'bruno'
6. Лея (10) -> 'leya'
7. Тоби (15) -> 'tobi'
8. Нова (16) -> 'nova'
9. Зед (13) -> 'zed'
10. Джей (17) -> 'jay'
11. Сэм (10) -> 'сэм'
12. Лили (11) -> 'лили'
13. Ник (16) -> 'ник'
14. Мия (15) -> 'мия'
15. Макс (18) -> 'макс'
16. Дана (19) -> 'дана'
17. Арт (21) -> 'арт'
18. Роза (22) -> 'роза'
19. Гоша (23) -> 'гоша'
20. Ева (24) -> 'ева'
21. Рэй (25) -> 'рэй'
22. Оля (26) -> 'оля'
23. Пит (27) -> 'пит'
24. Стас (28) -> 'стас'
25. Лиза (29) -> 'лиза'
26. Дэн (30) -> 'дэн'
27. Вика (31) -> 'вика'
28. Кен (32) -> 'кен'
29. Хлоя (33) -> 'хлоя'
30. Марк (34) -> 'марк'
31. Тим (35) -> 'тим'
32. Алиса (36) -> 'алиса'
33. Игорь (37) -> 'игорь'
34. Нина (38) -> 'нина'
35. Борис (39) -> 'борис'
36. Юля (40) -> 'юля'
37. Олег (42) -> 'олег'
38. Мама Тёмы (41) -> 'мама_темы'
39. Папа Тёмы (43) -> 'папа_темы'
40. Вера (45) -> 'вера'
41. Артур (46) -> 'артур'
42. Гена (48) -> 'гена'
43. Елена (50) -> 'елена'
44. Директор (52) -> 'директор'
45. Генерал (54) -> 'генерал'
46. Бабуля (58) -> 'бабуля'
47. Дедуля (60) -> 'дедуля'
48. Профессор (57) -> 'профессор'
49. Шеф Луи (55) -> 'шеф_луи'
50. Миллиардер (59) -> 'миллиардер'

Конструктор: `char:{age:35,fig:'boy'|'girl'|'chubby'|'muscle'|'slim',shape:'round'|'egg'|'square'|'wide'|'oval'|'chin',hair:'swoop'|'messy'|'bun2'|'long'|'pony'|'buns'|'braids'|'spiky'|'beanie'|'cap'|'bald'|'police'|'hard'|'helmet'|'chef',hairCol:'#3a2418',outfit:'hoodie'|'hoodie2'|'tee'|'suit'|'varsity'|'overall'|'puffer'|'apron'|'dress'|'labcoat'|'police'|'hivis'|'army'|'chef'|'offshoulder',top:'#hex',pants:'#hex',shoe:'#hex',acc:'glasses'|'headphones'|'mustache'|'bow'}`.
Главные герои: **Тёма** (`tema`, 18, красное худи, рюкзак) и **Ая** (`aya`, 18, светлый свитер, пучок, красная заколка).

## Эмоции
calm, joy, shock, angry, sad, smug, shy, tired, love

## Жесты
idle, wave, handsFace, cheer, point, phone, money, coffee, book, shrug, think, facepalm, crossed, pocket, talk, fists

## Эффекты (57) — `fx:[[t,'id',{target}]]`
`flash` — Вспышка (1с)
`shake` — Тряска камеры (1с)
`zoomPunch` — Зум-удар (1с)
`shockwave` — Ударная волна (1с)
`speedLines` — Линии скорости (1.2с)
`impactStar` — Звезда удара (1с)
`whipPan` — Хлыст-переход (1с)
`dollyZoom` — Вертиго-зум (1.4с)
`slowmo` — Слоу-мо (1.4с)
`freeze` — Стоп-кадр (1.2с)
`sweat` — Капля пота (1.2с)
`anger` — Знак злости (1с)
`hearts` — Сердечки (1.4с)
`sparkles` — Блёстки (1.2с)
`question` — Знак вопроса (1с)
`exclaim` — Восклицание (1с)
`zzz` — Сон Zzz (1.6с)
`tears` — Слёзы ручьём (1.4с)
`bulb` — Лампочка-идея (1.2с)
`dizzy` — Головокружение (1.4с)
`steam` — Пар из ушей (1.2с)
`blushPulse` — Смущение (1.2с)
`gloom` — Тучка уныния (1.6с)
`moneyPop` — +$1,000 (1.2с)
`coinRain` — Дождь монет (1.6с)
`billRain` — Дождь купюр (1.8с)
`counter` — Счётчик-барабан (1.8с)
`statBar` — Растущий график (1.8с)
`priceTag` — Ценник (1.2с)
`wordSlam` — Слово-удар (1.2с)
`typewriter` — Печатная машинка (1.8с)
`stamp` — Штамп (1.2с)
`underline` — Маркер-подчёркивание (1.4с)
`glitchText` — Глитч-текст (1.2с)
`chapter` — Заставка главы (1.8с)
`notification` — Уведомление (1.4с)
`likes` — Лайки (1.6с)
`progressBar` — Прогресс-бар (1.6с)
`check` — Галочка (1с)
`cross` — Крестик (1с)
`arrowPoint` — Стрелка-указатель (1.2с)
`nameTag` — Подпись-плашка (1.4с)
`mapPin` — Метка на карте (1.4с)
`timer` — Таймер (1.8с)
`confetti` — Конфетти (1.8с)
`fireworks` — Фейерверк (1.8с)
`explosion` — Взрыв (1.4с)
`smokePuff` — Облако дыма (1.4с)
`dustRun` — Пыль от бега (1.2с)
`rain` — Дождь (1.6с)
`lightning` — Молния (1.2с)
`fire` — Огонь (1.6с)
`snowfall` — Снегопад (1.6с)
`spotlight` — Прожектор (1.4с)
`godRays` — Лучи света (1.6с)
`bubbles` — Пузыри (1.6с)
`vhsRewind` — VHS-перемотка (1.4с)


## Звуки (`sfx/`)
alert ambCrowd ambNature ambNight ambOffice ambRain ambRoom ambSchool ambStreet angry billsFlutter boing boom boomSoft bubbles cash clockTick coins counterTick cry ding dizzy drip explosion fail fire flash freeze fwBang fwLaunch glitch gloom heavenly likes loading loveChime marker notif party pinDrop pointer poof pop punch punchZoom rain rewind riser shy skid slam slowmo snore sparkle spotOn stamp steam step stepHeel success swipe thud thunder typing vertigo whip whooshCut whooshLong whooshSoft wind 

## Музыка (настроения)
upbeat, chill, tense, sad, epic, mystery, comedy, romantic — генерируется `engine/music.py`, приглушается под голос.

## 3D
`engine/hall3d.html` — пример 3D-сцены (three.js, toon-материалы, DOF, спрайты персонажей из `engine/sprites.js`). Использовать для «вау»-пролётов: рендер кадров `?shot=...&t=...`, вставлять как отдельный шот-видео (кадры → mp4 → склейка). Основной ролик — 2D-движок.

## Команды
```bash
cd engine
node render.js ../projects/<slug> --events      # тайминг/звуковые события
node render.js ../projects/<slug> --qc          # контакт-листы build/qc_XX.jpg (10/50/90% каждого шота)
node render.js ../projects/<slug> --from 0 --to 90   # локальный рендер кусочка
python3 mix.py ../projects/<slug>                # звук → build/mix.wav
python3 transcribe.py <voice> ../projects/<slug>/words.json small ru   # тайминги слов
```
