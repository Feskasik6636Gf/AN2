const fs=require('fs');const D=require('./dsl.js');
for(const f of fs.readdirSync(__dirname).filter(n=>/^scenes\d+\.js$/.test(n)).sort())require('./'+f);
module.exports={title:'language',fps:30,voice:'voice.mp3',words:D.WORDS.words,
 music:[[0,10,'mystery'],[89,115,'epic'],[330,380,'tense'],[420,500,'sad'],[560,620,'sad'],[660,D.TOTAL,'epic']],
 shots:D.build()};
