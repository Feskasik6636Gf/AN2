# Procedural SFX library (original, synthesized). Writes 44.1kHz mono WAVs.
import numpy as np, wave, os, sys
SR=44100
rng=np.random.default_rng(7)
def T(d): return np.arange(int(SR*d))/SR
def env(n,a=.005,r=.2,shape=4):
    t=np.arange(n)/SR; d=n/SR; e=np.minimum(1,t/max(a,1e-4))*np.exp(-np.maximum(0,t-a)*shape/max(r,1e-3)); return e
def adsr(n,a=.01,d=.1,s=.6,r=.1):
    t=np.arange(n)/SR;L=n/SR;e=np.where(t<a,t/a,np.where(t<a+d,1-(1-s)*(t-a)/d,s));rel=np.clip((L-t)/r,0,1);return e*rel
def sine(f,d,ph=0):
    t=T(d); f=np.broadcast_to(f,t.shape) if np.ndim(f) else f
    return np.sin(2*np.pi*np.cumsum(np.full(len(t),f) if np.ndim(f)==0 else f)/SR+ph)
def sweep(f0,f1,d,kind='exp'):
    t=T(d); fr=f0*(f1/f0)**(t/d) if kind=='exp' else f0+(f1-f0)*t/d
    return np.sin(2*np.pi*np.cumsum(fr)/SR)
def sq(f,d): return np.sign(sine(f,d))
def noise(d): return rng.uniform(-1,1,int(SR*d))
def lp(x,fc):
    a=np.exp(-2*np.pi*fc/SR); y=np.zeros_like(x); s=0.
    for i in range(len(x)): s=(1-a)*x[i]+a*s; y[i]=s
    return y
def lpf(x,fc):  # fast fft lowpass
    X=np.fft.rfft(x); fr=np.fft.rfftfreq(len(x),1/SR); X*=1/(1+(fr/fc)**4); return np.fft.irfft(X,len(x))
def hpf(x,fc):
    X=np.fft.rfft(x); fr=np.fft.rfftfreq(len(x),1/SR); X*=1/(1+(fc/np.maximum(fr,1))**4); return np.fft.irfft(X,len(x))
def bpf(x,lo,hi): return hpf(lpf(x,hi),lo)
def sweep_filter(x,f0,f1):  # time-varying lowpass via chunks
    out=np.zeros_like(x); n=len(x); ch=1024
    for i in range(0,n,ch):
        fc=f0*(f1/f0)**(i/n); seg=x[max(0,i-ch):i+ch*2]; y=lpf(seg,fc); off=i-max(0,i-ch); out[i:i+ch]=y[off:off+ch][:len(out[i:i+ch])]
    return out
def mix(*parts,d=None):
    n=max(len(p[1])+int(p[0]*SR) for p in parts) if d is None else int(d*SR); y=np.zeros(n)
    for o,x,*g in parts:
        k=int(o*SR); g=g[0] if g else 1; L=min(len(x),n-k); y[k:k+L]+=x[:L]*g
    return y
def bell(f,d,decay=1.6,harm=((1,1),(2.76,.5),(5.4,.25),(8.9,.12))):
    t=T(d); return sum(a*np.sin(2*np.pi*f*h*t)*np.exp(-t*decay*h**.5) for h,a in harm)
def pluck(f,d): t=T(d); return (sq(f,d)*.4+sine(f,d))*np.exp(-t*9)
def norm(x,peak=.89):
    m=np.max(np.abs(x))+1e-9; return x/m*peak
def fade(x,fi=.002,fo=.02):
    n=len(x); a=int(fi*SR); b=int(fo*SR); e=np.ones(n)
    if a: e[:a]=np.linspace(0,1,a)
    if b: e[-b:]=np.minimum(e[-b:],np.linspace(1,0,b))
    return x*e
S={}
def reg(name):
    def d(fn): S[name]=fn; return fn
    return d
# ---------- impacts ----------
@reg('flash')
def _(): n=noise(.5); return lpf(hpf(n,2000),12000)*env(len(n),.002,.35,5)+sweep(3000,6000,.5)*env(int(.5*SR),.001,.2,6)*.2
@reg('thud')
def _(): d=.6; return sweep(120,40,d)*env(int(d*SR),.002,.3,5)+lpf(noise(d),400)*env(int(d*SR),.001,.08,6)*.8
@reg('punchZoom')
def _(): d=.5; return mix((0,sweep(200,900,.12)*env(int(.12*SR),.003,.12,2)*.5),(0.1,sweep(110,50,.4)*env(int(.4*SR),.001,.25,5)),(0.1,lpf(noise(.15),2500)*env(int(.15*SR),.001,.05,6)*.7))
@reg('boom')
def _(): d=1.4; t=T(d); return sweep(70,28,d)*np.exp(-t*3)+lpf(noise(d),300)*np.exp(-t*4)*1.2+lpf(noise(d),1500)*np.exp(-t*18)*.6
@reg('boomSoft')
def _(): d=1.2; t=T(d); return sweep(90,40,d)*np.exp(-t*3.5)*.8+lpf(noise(d),200)*np.exp(-t*5)*.5
@reg('punch')
def _(): d=.35; return mix((0,lpf(noise(.06),3000)*env(int(.06*SR),.001,.03,4)),(0.01,sweep(180,60,.3)*env(int(.3*SR),.001,.15,5)*1.2))
@reg('slam')
def _(): d=.7; t=T(d); return sweep(150,40,d)*np.exp(-t*6)*1.3+lpf(noise(d),900)*np.exp(-t*10)+bpf(noise(d),2000,5000)*np.exp(-t*30)*.4
@reg('explosion')
def _(): d=2.0; t=T(d); n=noise(d); return lpf(n,500)*np.exp(-t*1.8)*1.6+lpf(n,3000)*np.exp(-t*7)*.6+sweep(60,25,d)*np.exp(-t*2)*1.2
@reg('stamp')
def _(): d=.5; return mix((0,lpf(noise(.04),5000)*env(int(.04*SR),.001,.02,4)),(0.005,sweep(160,70,.25)*env(int(.25*SR),.001,.12,5)*1.2),(0.03,bpf(noise(.3),300,1200)*env(int(.3*SR),.001,.15,5)*.5))
# ---------- whooshes ----------
def whoosh(d,f0,f1,amp=1):
    n=noise(d); y=sweep_filter(n,f0,f1); t=T(d); e=np.sin(np.pi*np.clip(t/d,0,1))**1.5; return y*e*amp
@reg('whooshLong')
def _(): return whoosh(1.0,300,5000)
@reg('whooshSoft')
def _(): return whoosh(.8,200,1800)
@reg('whip')
def _(): return whoosh(.35,600,9000,1.4)
@reg('swipe')
def _(): return whoosh(.28,800,7000)
@reg('vertigo')
def _(): d=1.4; t=T(d); return (sweep(80,320,d)*.5+sweep(81,330,d)*.5)*np.sin(np.pi*t/d)+whoosh(d,200,3000)*.5
@reg('slowmo')
def _(): d=1.3; t=T(d); return sweep(400,90,d)*np.exp(-t*1.2)*.6+lpf(noise(d),300)*np.sin(np.pi*t/d)*.6
@reg('freeze')
def _(): d=.9; t=T(d); return bell(2400,d,3)*.4+hpf(noise(d),5000)*np.exp(-t*8)*.6+sine(1200,d)*np.exp(-t*10)*.3
@reg('rewind')
def _(): d=1.3; t=T(d); base=sweep(900,2200,d); return base*(0.5+0.5*np.sign(np.sin(2*np.pi*14*t)))*.35+bpf(noise(d),1000,4000)*.3
# ---------- cartoon / emotion ----------
@reg('drip')
def _(): d=.35; t=T(d); return sweep(800,2200,d)*np.exp(-t*12)
@reg('angry')
def _(): d=.6; t=T(d); return (sq(110,d)*.5+sq(113,d)*.5)*np.exp(-t*3)*.5*(0.6+0.4*np.sign(np.sin(2*np.pi*18*t)))
@reg('loveChime')
def _(): return mix(*[(i*.09,bell(f,.9,2.5)*.6) for i,f in enumerate([1046,1318,1568,2093])])
@reg('sparkle')
def _(): parts=[(rng.uniform(0,.8),bell(rng.uniform(2500,5000),.5,6)*.4) for _ in range(12)]; return mix(*parts,d=1.2)
@reg('boing')
def _(): d=.7; t=T(d); f=300+180*np.sin(2*np.pi*9*t)*np.exp(-t*4); return np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-t*4)
@reg('alert')
def _(): return mix((0,sine(1400,.12)*env(int(.12*SR),.002,.1,2)),(0.15,sine(1800,.18)*env(int(.18*SR),.002,.15,2)))
@reg('snore')
def _(): d=1.6; t=T(d); return lpf(noise(d),400)*(np.sin(np.pi*np.clip(t/.9,0,1))**2)
@reg('cry')
def _(): d=1.3; t=T(d); f=600+120*np.sin(2*np.pi*5*t)-200*t; return np.sin(2*np.pi*np.cumsum(f)/SR)*np.sin(np.pi*t/d)*.6
@reg('ding')
def _(): return bell(1760,1.2,2)
@reg('dizzy')
def _(): d=1.4; t=T(d); f=900+400*np.sin(2*np.pi*3*t); return np.sin(2*np.pi*np.cumsum(f)/SR)*.4*np.sin(np.pi*t/d)+mix(*[(i*.2,bell(2400+i*200,.3,8)*.3) for i in range(6)],d=d)
@reg('steam')
def _(): d=1.1; t=T(d); return hpf(noise(d),3000)*np.sin(np.pi*t/d)**.5*.7+sweep(1800,2600,d)*.15*np.sin(np.pi*t/d)
@reg('shy')
def _(): return mix((0,sweep(500,900,.25)*env(int(.25*SR),.01,.2,2)*.6),(0.25,sweep(600,1100,.25)*env(int(.25*SR),.01,.2,2)*.5))
@reg('gloom')
def _(): d=1.5; t=T(d); return (sine(220,d)+sine(207,d)*.8+sine(165,d)*.6)*np.exp(-t*1.2)*.4*np.minimum(1,t*8)
# ---------- money / ui ----------
@reg('cash')
def _(): return mix((0,bell(2093,.7,4)*.6),(0.08,bell(2637,.9,3)*.6),(0.0,bpf(noise(.25),2000,7000)*env(int(.25*SR),.001,.2,4)*.5),(0.2,mix(*[(i*.04,pluck(rng.uniform(3000,4500),.08)*.25) for i in range(8)])))
def coin(): return mix((0,sq(1975,.06)*env(int(.06*SR),.001,.05,3)*.3),(0.06,sq(2637,.25)*env(int(.25*SR),.001,.2,4)*.3))
@reg('coins')
def _(): return mix(*[(rng.uniform(0,1.3),coin()) for _ in range(14)],d=1.6)
@reg('billsFlutter')
def _(): d=1.6; t=T(d); return bpf(noise(d),1500,6000)*(0.5+0.5*np.abs(np.sin(2*np.pi*11*t)))*.5*np.sin(np.pi*t/d)
@reg('counterTick')
def _(): return mix(*[(i*.05,pluck(2000+i*20,.04)*.4) for i in range(30)],d=1.6)
@reg('riser')
def _(): d=1.6; t=T(d); return (sweep(150,900,d)+sweep(152,905,d))*.3*(t/d)+whoosh(d,200,6000)*.4*(t/d)
@reg('pop')
def _(): d=.15; return sweep(1200,300,d)*env(int(d*SR),.001,.08,3)
@reg('typing')
def _(): return mix(*[(i*.09+rng.uniform(0,.03),bpf(noise(.03),1500,6000)*env(int(.03*SR),.001,.02,4)*.8) for i in range(14)],(1.3,bell(3200,.4,6)*.3),d=1.8)
@reg('marker')
def _(): d=.8; t=T(d); return bpf(noise(d),2500,8000)*np.sin(np.pi*np.clip(t/.7,0,1))*.6
@reg('glitch')
def _():
    d=.9; x=np.zeros(int(d*SR))
    for i in range(12):
        k=int(rng.uniform(0,d-.06)*SR); L=int(rng.uniform(.02,.08)*SR); f=rng.uniform(200,3000); x[k:k+L]+=np.sign(np.sin(2*np.pi*f*np.arange(L)/SR))*.5
    return np.round(x*4)/4
@reg('notif')
def _(): return mix((0,bell(1568,.4,4)*.6),(0.11,bell(2093,.7,3)*.6))
@reg('likes')
def _(): return mix(*[(i*.08,pop_like(900+i*60)) for i in range(14)],d=1.6)
def pop_like(f): d=.09; return sweep(f*1.6,f,d)*env(int(d*SR),.001,.06,3)*.45
@reg('loading')
def _(): return mix(*[(i*.12,sine(880,.05)*env(int(.05*SR),.002,.04,3)*.4) for i in range(11)],d=1.4)
@reg('success')
def _(): return mix((0,bell(1046,.5,3)*.5),(0.1,bell(1318,.5,3)*.5),(0.2,bell(1568,.9,2.5)*.6))
@reg('fail')
def _(): return mix((0,sq(220,.22)*env(int(.22*SR),.003,.2,1.5)*.35),(0.24,sq(165,.4)*env(int(.4*SR),.003,.35,2)*.35))
@reg('pointer')
def _(): return mix((0,sweep(600,1200,.1)*env(int(.1*SR),.002,.08,2)*.5),(0.12,sine(1500,.12)*env(int(.12*SR),.002,.1,3)*.4))
@reg('pinDrop')
def _(): return mix((0,whoosh(.35,800,4000)*.6),(0.38,sweep(300,120,.25)*env(int(.25*SR),.001,.15,4)),(0.38,bell(1600,.4,6)*.25))
@reg('clockTick')
def _(): return mix(*[(i*.25,bpf(noise(.02),2500,7000)*env(int(.02*SR),.001,.015,3)*(1 if i%2 else .7)) for i in range(8)],d=1.9)
# ---------- environment ----------
@reg('party')
def _(): return mix((0,bpf(noise(.3),1000,6000)*env(int(.3*SR),.001,.2,4)),(0.02,sweep(400,2000,.3)*env(int(.3*SR),.001,.25,3)*.4),(0.1,mix(*[(rng.uniform(0,1.2),pluck(rng.uniform(1500,3500),.1)*.2) for _ in range(20)],d=1.4)))
@reg('fwLaunch')
def _(): d=.5; return whoosh(d,1000,8000)*.6+sweep(600,2400,d)*.2*np.linspace(1,0,int(d*SR))
@reg('fwBang')
def _(): d=1.3; t=T(d); return lpf(noise(d),2000)*np.exp(-t*6)*1.2+mix(*[(rng.uniform(.1,1.1),bpf(noise(.03),3000,9000)*.3) for _ in range(30)],d=d)
@reg('poof')
def _(): d=.7; t=T(d); return lpf(noise(d),1200)*env(int(d*SR),.01,.4,4)+sweep(300,120,d)*np.exp(-t*8)*.3
@reg('skid')
def _(): d=.9; t=T(d); return bpf(noise(d),800,3000)*np.sin(np.pi*t/d)*.7+sweep(1200,600,d)*.15*np.sin(np.pi*t/d)
@reg('rain')
def _(): d=2.0; n=noise(d); t=T(d); drops=mix(*[(rng.uniform(0,1.9),bpf(noise(.01),2000,8000)*.3) for _ in range(80)],d=d); return lpf(n,4000)*.35*np.minimum(1,t*3)+drops
@reg('thunder')
def _(): d=2.0; t=T(d); return lpf(noise(d),180)*np.exp(-t*1.4)*2+bpf(noise(d),500,3000)*np.exp(-t*12)*.8
@reg('fire')
def _(): d=2.0; t=T(d); crack=mix(*[(rng.uniform(0,1.9),bpf(noise(.015),1500,6000)*rng.uniform(.2,.6)) for _ in range(40)],d=d); return lpf(noise(d),600)*.6+crack
@reg('wind')
def _(): d=2.0; t=T(d); return sweep_filter(noise(d),300,1200)*(0.6+0.4*np.sin(2*np.pi*.7*t))*.8
@reg('spotOn')
def _(): return mix((0,lpf(noise(.05),3000)*env(int(.05*SR),.001,.03,4)),(0.02,sweep(60,55,.8)*env(int(.8*SR),.01,.6,2)*.4))
@reg('heavenly')
def _(): d=1.8; t=T(d); ch=sum(sine(f,d) for f in (523,659,784,1046))*.18; return ch*np.minimum(1,t*2)*np.minimum(1,(d-t)*3)
@reg('bubbles')
def _(): return mix(*[(rng.uniform(0,1.4),sweep(rng.uniform(300,600),rng.uniform(900,1600),.06)*env(int(.06*SR),.002,.05,3)*.4) for _ in range(20)],d=1.6)

if __name__=='__main__':
    out=sys.argv[1]; os.makedirs(out,exist_ok=True)
    for k,fn in S.items():
        x=fade(norm(fn().astype(np.float64)))
        y=(x*32767).astype(np.int16)
        with wave.open(f'{out}/{k}.wav','w') as w: w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes(y.tobytes())
    print(len(S))
