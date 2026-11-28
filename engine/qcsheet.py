# contact sheets: 3 frames (10/50/90%) per shot, 4 shots per row
import sys,glob,os
from PIL import Image,ImageDraw,ImageFont
build,n=sys.argv[1],int(sys.argv[2])
fs=sorted(glob.glob(os.path.join(build,'qc_tmp','f*.png')))
font=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',22) if os.path.exists('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf') else None
import numpy as np
skip=set(int(x) for x in sys.argv[3].split(',') if x) if len(sys.argv)>3 else set()
flat=[]
for i,f in enumerate(fs):
    if i%3==1 and i//3 not in skip:
        g=np.asarray(Image.open(f).convert('L').resize((480,270)),np.float32)
        B=g[:264,:480].reshape(22,12,40,12).transpose(0,2,1,3).reshape(-1,144);flat.append((i//3+1,(B.std(1)<2.0).mean()*100))
bad=[(k,v) for k,v in flat if v>30]
rep='\n=== Детализация кадра (доля плоских участков одной заливки) ===\n'+('\n'.join(f'WARN  шот {k}: {v:.0f}% плоского — дорисуй фактуру, предметы, свет/тень (цель ≤ 20%)' for k,v in bad) if bad else 'OK    все шоты детализированы (≤ 30% плоского)')+(f"\nсредняя плоскость {sum(v for _,v in flat)/max(1,len(flat)):.0f}%" if flat else '')
print(rep);open(os.path.join(build,'report.txt'),'a').write(rep+'\n')
tiles=[]
for i,f in enumerate(fs):
    im=Image.open(f).convert('RGB').resize((480,270));d=ImageDraw.Draw(im);d.rectangle((0,0,150,30),fill=(0,0,0));d.text((6,3),f'шот {i//3+1} · {[10,50,90][i%3]}%',fill=(255,220,80),font=font);tiles.append(im)
per=8  # shots per sheet
for s in range(0,n,per):
    rows=tiles[s*3:(s+per)*3]; h=((len(rows)+2)//3)
    sheet=Image.new('RGB',(1440,270*h),(0,0,0))
    for k,im in enumerate(rows): sheet.paste(im,((k%3)*480,(k//3)*270))
    out=os.path.join(build,f'qc_{s//per+1:02d}.jpg');sheet.save(out,quality=85);print(out)
for f in fs: os.remove(f)
