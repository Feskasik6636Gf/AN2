const fs=require('fs');const D=require('./dsl.js');
for(const f of fs.readdirSync(__dirname).filter(n=>/^scenes\d+\.js$/.test(n)).sort())require('./'+f);
module.exports={title:'walter',fps:30,voice:'voice.mp3',words:D.WORDS.words,
 music:[[0,12,'mystery'],[136,160,'tense'],[330,380,'tense'],[455,490,'tense'],[560,620,'sad'],[688,D.TOTAL,'sad']],
 shots:D.build()};
