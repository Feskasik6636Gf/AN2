# Procedural background music by mood (original). python music.py <mood> <seconds> <out.wav>
import numpy as np, wave, sys
SR=44100
MOODS={
 'upbeat': dict(bpm=112,key=60,prog=[0,7,9,5],minor=False,drums=1,arp=1),
 'chill':  dict(bpm=84, key=57,prog=[0,5,9,7],minor=False,drums=.5,arp=1),
 'tense':  dict(bpm=96, key=50,prog=[0,0,8,7],minor=True, drums=.8,arp=2),
 'sad':    dict(bpm=70, key=57,prog=[0,8,3,10],minor=True,drums=0, arp=1),
 'epic':   dict(bpm=100,key=50,prog=[0,8,3,10],minor=True,drums=1.2,arp=2),
 'mystery':dict(bpm=78, key=52,prog=[0,1,0,8],minor=True,drums=.3,arp=3),
 'comedy': dict(bpm=124,key=62,prog=[0,5,7,0],minor=False,drums=.9,arp=4),
 'romantic':dict(bpm=76,key=60,prog=[0,9,5,7],minor=False,drums=.2,arp=1),
}
def mtof(m): return 440*2**((m-69)/12)
def tone(f,d,kind='sine'):
    t=np.arange(int(SR*d))/SR
    if kind=='sine': return np.sin(2*np.pi*f*t)
    if kind=='tri': return 2*np.abs(2*((f*t)%1)-1)-1
    if kind=='saw': return sum(np.sin(2*np.pi*f*k*t)/k for k in range(1,7))*.6
    if kind=='pluck': return (np.sin(2*np.pi*f*t)+.4*np.sin(4*np.pi*f*t)+.15*np.sin(6*np.pi*f*t))*np.exp(-t*7)
def env(n,a=.01,r=.2):
    t=np.arange(n)/SR; d=n/SR; return np.minimum(1,t/a)*np.minimum(1,np.maximum(0,(d-t)/r))
def lpf(x,fc):
    X=np.fft.rfft(x); fr=np.fft.rfftfreq(len(x),1/SR); X*=1/(1+(fr/fc)**4); return np.fft.irfft(X,len(x))
def chord(root,minor):
    third=3 if minor else 4; return [root,root+third,root+7,root+12]
def render(mood,secs,seed=1):
    m=MOODS[mood]; rng=np.random.default_rng(seed)
    beat=60/m['bpm']; bar=beat*4; n=int(SR*(secs+2)); y=np.zeros(n)
    def put(x,t,g=1):
        k=int(t*SR); L=min(len(x),n-k)
        if L>0: y[k:k+L]+=x[:L]*g
    t=0; bi=0
    scale=[0,2,3,5,7,8,10] if m['minor'] else [0,2,4,5,7,9,11]
    while t<secs+bar:
        deg=m['prog'][bi%len(m['prog'])]; root=m['key']+deg
        minor=m['minor'] if deg in (0,5,7,8,3,10) else (not m['minor'])
        if not m['minor'] and deg in (9,2,4): minor=True
        notes=chord(root,minor)
        # pad
        for nn in notes[:3]:
            p=tone(mtof(nn),bar,'saw'); put(lpf(p,1400)*env(len(p),.3,.4),t,.05)
        # bass
        for b in range(4 if m['drums']>0 else 2):
            d=beat*(1 if m['drums']>0 else 2); put(tone(mtof(root-24),d*.9,'tri')*env(int(d*.9*SR),.01,.1),t+b*d,.22)
        # arp / melody
        if m['arp']:
            steps=8 if m['arp'] in (1,2) else 6
            for s in range(steps):
                nn=notes[(s*(1 if m['arp']!=3 else 2))%len(notes)]+12
                if m['arp']==4 and s%2: nn+=scale[s%7]-0
                put(tone(mtof(nn),beat*1.2,'pluck'),t+s*bar/steps,.09)
        # drums
        if m['drums']>0:
            for b in range(4):
                tb=t+b*beat; d=m['drums']
                if b%2==0:  # kick
                    kt=np.arange(int(.25*SR))/SR; put(np.sin(2*np.pi*np.cumsum(120*np.exp(-kt*18)+45)/SR)*np.exp(-kt*12),tb,.35*d)
                else:       # snare/clap
                    nz=rng.uniform(-1,1,int(.18*SR)); put(lpf(nz,5000)*np.exp(-np.arange(len(nz))/SR*20),tb,.12*d)
                for h in range(2):  # hats
                    nz=rng.uniform(-1,1,int(.04*SR)); put(nz*np.exp(-np.arange(len(nz))/SR*80),tb+h*beat/2,.05*d)
        t+=bar; bi+=1
    y=y[:int(secs*SR)]
    fo=int(2*SR); y[-fo:]*=np.linspace(1,0,fo); y[:int(.5*SR)]*=np.linspace(0,1,int(.5*SR))
    return y/max(1e-9,np.abs(y).max())*.8
if __name__=='__main__':
    mood,secs,out=sys.argv[1],float(sys.argv[2]),sys.argv[3]
    y=render(mood,secs,int(sys.argv[4]) if len(sys.argv)>4 else 1)
    with wave.open(out,'w') as w: w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes((y*32767).astype(np.int16).tobytes())
    print('ok',out)
