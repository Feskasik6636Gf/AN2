# Audio mix (voice-led, stereo): voice + music (only where project.music says, ducked) + ambience beds (J-cut: next
# location is heard 0.35 s before its picture) + SFX events panned to the actor's side -> build/mix.wav (stereo)
# python mix.py <projectDir>
import json,wave,os,sys,subprocess,numpy as np
SR=44100
proj=sys.argv[1]; build=os.path.join(proj,'build'); here=os.path.dirname(os.path.abspath(__file__))
E=json.load(open(os.path.join(build,'events.json'))); total=E['total']; n=int((total+.5)*SR)
sfxdir=os.path.join(here,'..','sfx')
def load(p):
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
voice=np.zeros(n); music=np.zeros(n); amb=np.zeros(n); fxL=np.zeros(n); fxR=np.zeros(n)
if E.get('voice'):
    put(voice,load(os.path.join(proj,E['voice'])),E.get('voiceOffset',0),1.0)
for e in E['events']:
    t,name,vol=e[0],e[1],e[2]; pan=e[3] if len(e)>3 else 0.0
    if os.path.exists(os.path.join(sfxdir,name+'.wav')):
        a=(pan+1)*np.pi/4  # equal-power pan
        put(fxL,sfx(name),t,vol*np.cos(a)*1.414); put(fxR,sfx(name),t,vol*np.sin(a)*1.414)
# merge consecutive beds of the same ambience so there is no fade dip / noise swell at every cut
_m=[]
for t0,t1,name in E['amb']:
    if _m and _m[-1][2]==name and name and abs(_m[-1][1]-t0)<.6: _m[-1][1]=t1
    else: _m.append([t0,t1,name])
E['amb']=_m
prev=None
for t0,t1,name in E['amb']:
    if not name: prev=None; continue
    lead=.35 if (prev is not None and prev!=name and t0>.35) else 0.0   # J-cut
    s0=t0-lead; b=sfx(name); seg=np.zeros(int((t1-s0)*SR)+1)
    for k in range(0,len(seg),len(b)-SR//2): put(seg,b,k/SR,1)
    fl=min(len(seg)//2,int(.25*SR)); seg[:fl]*=np.linspace(0,1,fl); seg[-fl:]*=np.linspace(1,0,fl)
    put(amb,seg,s0,1); prev=name
for m in E.get('music',[]):
    t0,t1,mood=m[0],m[1],m[2]
    tmp=os.path.join(build,f'music_{mood}_{int(t0*10)}.wav')
    subprocess.run([sys.executable,os.path.join(here,'music.py'),mood,str(t1-t0),tmp,str(int(t0)+1)],check=True,capture_output=True)
    mu=load(tmp); fl=min(len(mu)//2,int(.8*SR)); mu[:fl]*=np.linspace(0,1,fl); mu[-fl:]*=np.linspace(1,0,fl)
    put(music,mu,t0,1)
if np.abs(voice).max()>0:
    w=int(.05*SR); ve=np.sqrt(np.convolve(voice**2,np.ones(w)/w,'same')); act=np.clip(ve/0.02,0,1)
    sm=np.convolve(act,np.ones(int(.3*SR))/int(.3*SR),'same'); duck=1-.65*sm
else: duck=np.ones(n)
bed=music*.14*duck+amb*.18*(1-.35*(1-duck))
L=voice+bed+fxL*.6; R=voice+bed+fxR*.6
y=np.stack([L,R],1)
rms=np.sqrt((y**2).mean())+1e-9; y=y*min(3,.1/rms)          # loudness to the reference (~ -20 dB RMS)
y=np.tanh(y*1.2)/np.tanh(1.2)                              # soft limiter
y=y/(np.abs(y).max()+1e-9)*0.708                            # peak -3 dBFS like the reference
out=os.path.join(build,'mix.wav')
with wave.open(out,'w') as w: w.setnchannels(2);w.setsampwidth(2);w.setframerate(SR);w.writeframes((y*32767).astype(np.int16).tobytes())
print('mix',out,round(total,2),'stereo')
