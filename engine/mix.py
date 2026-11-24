# Audio mix: voice + music (ducked) + ambience beds + SFX events -> build/mix.wav
# python mix.py <projectDir>
import json,wave,os,sys,subprocess,numpy as np
SR=44100
proj=sys.argv[1]; build=os.path.join(proj,'build'); here=os.path.dirname(os.path.abspath(__file__))
E=json.load(open(os.path.join(build,'events.json'))); total=E['total']; n=int((total+.5)*SR)
sfxdir=os.path.join(here,'..','sfx')
def load(p):
    # any format -> mono 44.1k via ffmpeg
    raw=subprocess.run(['ffmpeg','-v','error','-i',p,'-ac','1','-ar',str(SR),'-f','s16le','-'],capture_output=True).stdout
    return np.frombuffer(raw,np.int16).astype(np.float64)/32768
cache={}
def sfx(name):
    if name not in cache: cache[name]=load(os.path.join(sfxdir,name+'.wav'))
    return cache[name]
def put(y,x,t,g):
    k=int(t*SR)
    if k<0: x=x[-k:]; k=0
    L=min(len(x),len(y)-k)
    if L>0: y[k:k+L]+=x[:L]*g
voice=np.zeros(n); music=np.zeros(n); amb=np.zeros(n); fx=np.zeros(n)
if E.get('voice'):
    vp=os.path.join(proj,E['voice']); v=load(vp); put(voice,v,E.get('voiceOffset',0),1.0)
for t,name,vol in E['events']:
    if os.path.exists(os.path.join(sfxdir,name+'.wav')): put(fx,sfx(name),t,vol)
for t0,t1,name in E['amb']:
    if not name: continue
    b=sfx(name); seg=np.zeros(int((t1-t0)*SR)+1)
    for k in range(0,len(seg),len(b)-SR//2): put(seg,b,k/SR,1)
    fl=min(len(seg)//2,int(.25*SR)); seg[:fl]*=np.linspace(0,1,fl); seg[-fl:]*=np.linspace(1,0,fl)
    put(amb,seg,t0,1)
for m in E.get('music',[]):
    t0,t1,mood=m[0],m[1],m[2]
    tmp=os.path.join(build,f'music_{mood}_{int(t0*10)}.wav')
    subprocess.run([sys.executable,os.path.join(here,'music.py'),mood,str(t1-t0),tmp,str(int(t0)+1)],check=True,capture_output=True)
    put(music,load(tmp),t0,1)
# ducking: music/amb lower while voice is active
if np.abs(voice).max()>0:
    w=int(.05*SR); ve=np.sqrt(np.convolve(voice**2,np.ones(w)/w,'same')); act=np.clip(ve/0.02,0,1)
    sm=np.convolve(act,np.ones(int(.3*SR))/int(.3*SR),'same'); duck=1-.6*sm
else: duck=np.ones(n)
y=voice*1.0+music*.22*duck+amb*.35*(1-.3*(1-duck))+fx*.7
peak=np.abs(y).max()+1e-9; y=y/peak*.95 if peak>.95 else y
# loudness normalize-ish to ~-16 LUFS approx via RMS target
rms=np.sqrt((y**2).mean())+1e-9; y=np.clip(y*min(3,.12/rms),-1,1)
out=os.path.join(build,'mix.wav')
with wave.open(out,'w') as w: w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes((y*32767).astype(np.int16).tobytes())
print('mix',out,round(total,2))
