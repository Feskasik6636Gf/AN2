# contact sheets: 3 frames (10/50/90%) per shot, 4 shots per row
import sys,glob,os
from PIL import Image,ImageDraw,ImageFont
build,n=sys.argv[1],int(sys.argv[2])
fs=sorted(glob.glob(os.path.join(build,'qc_tmp','f*.png')))
font=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',22) if os.path.exists('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf') else None
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
