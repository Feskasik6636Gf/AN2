import json,wave,numpy as np,sys
SR=44100;tl=json.load(open(sys.argv[1]));out=sys.argv[2];sdir=sys.argv[3]
y=np.zeros(int((tl['total']+1)*SR))
for seg in tl['timeline']:
    for off,name in seg['sfx']:
        w=wave.open(f'{sdir}/{name}.wav');x=np.frombuffer(w.readframes(w.getnframes()),np.int16)/32768
        k=int((seg['start']+off)*SR);L=min(len(x),len(y)-k);y[k:k+L]+=x[:L]*.8
y=y/max(1,np.abs(y).max()/.95)
with wave.open(out,'w') as w: w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes((y*32767).astype(np.int16).tobytes())
print('ok',len(y)/SR)
