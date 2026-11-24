from PIL import Image,ImageDraw,ImageFont
import sys
f=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',24)
N={'livingRoom':'Гостиная','bathroom':'Ванная','teenRoomDay':'Комната подростка','garage':'Гараж','attic':'Чердак','basement':'Подвал','diningEvening':'Ужин вечером','homeGym':'Домашний зал',
'cafeteria':'Столовая','schoolGym':'Спортзал школы','library':'Библиотека','principalOffice':'Кабинет директора','nurseRoom':'Медпункт','scienceLab':'Лаборатория','musicRoom':'Музыкальный класс','lockerRoom':'Раздевалка',
'hospitalRoom':'Палата','hospitalHall':'Коридор больницы','supermarket':'Супермаркет','convenience':'Магазин у дома','cafeInside':'Кафе','restaurant':'Ресторан','fastFood':'Фастфуд','mall':'Торговый центр','cinema':'Кинотеатр','bank':'Банк','policeStation':'Полиция','jailCell':'Тюремная камера','courtroom':'Зал суда','meetingRoom':'Переговорка','ceoOffice':'Кабинет CEO','studio':'Студия звукозаписи','concertStage':'Концерт','nightclub':'Клуб','barbershop':'Барбершоп','pharmacy':'Аптека','hotelLobby':'Лобби отеля','airport':'Аэропорт','subway':'Метро','recordStore':'Музыкальный магазин',
'schoolYard':'Школьный двор','basketball':'Баскетбольная площадка','beach':'Пляж','forest':'Лес','desert':'Пустыня','snowStreet':'Зимняя улица','rainyNight':'Дождливая ночь','suburbs':'Пригород','parkingLot':'Парковка','gasStation':'Заправка ночью','rooftopNight':'Крыша ночью','bridge':'Мост','farm':'Ферма','mountains':'Горы','playground':'Детская площадка','stadium':'Стадион','carnival':'Ярмарка ночью','harbor':'Порт','alley':'Переулок','moon':'Луна','spaceStation':'Космостанция'}
ks=list(N.keys())
for s in range(0,len(ks),16):
    sheet=Image.new("RGB",(1920,1080))
    for i,k in enumerate(ks[s:s+16]):
        a=Image.open(f'out/l2_{k}.png').convert('RGB').resize((480,270));d=ImageDraw.Draw(a);n=f'{s+i+1}. {N[k]}'
        d.rounded_rectangle((8,8,24+d.textlength(n,font=f),42),8,fill=(255,255,255));d.text((16,11),n,font=f,fill=(20,14,24))
        sheet.paste(a,((i%4)*480,(i//4)*270))
    sheet.save(f'out/loc50_{s//16+1}.jpg',quality=86)
print(len(ks))
