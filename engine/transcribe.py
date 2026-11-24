# Word-level timestamps for the user's voiceover. python transcribe.py <audio> <out.json> [model=small] [lang=ru]
import sys,json,subprocess,numpy as np
from faster_whisper import WhisperModel
audio,out=sys.argv[1],sys.argv[2];model=sys.argv[3] if len(sys.argv)>3 else 'small';lang=sys.argv[4] if len(sys.argv)>4 else None
m=WhisperModel(model,device='cpu',compute_type='int8')
raw=subprocess.run(['ffmpeg','-v','error','-i',audio,'-ac','1','-ar','16000','-f','f32le','-'],capture_output=True,check=True).stdout
pcm=np.frombuffer(raw,np.float32)
segs,info=m.transcribe(pcm,language=lang,word_timestamps=True,vad_filter=True)
S=[];Wd=[]
for s in segs:
    S.append({'start':round(s.start,2),'end':round(s.end,2),'text':s.text.strip()})
    for w in s.words: Wd.append({'start':round(w.start,2),'end':round(w.end,2),'word':w.word.strip()})
json.dump({'language':info.language,'duration':round(info.duration,2),'segments':S,'words':Wd},open(out,'w'),ensure_ascii=False,indent=1)
print('segments',len(S),'words',len(Wd),'dur',round(info.duration,2))
for s in S: print(f"[{s['start']:6.2f}-{s['end']:6.2f}] {s['text']}")
