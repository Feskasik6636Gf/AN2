const fs=require('fs');const D=require('./dsl.js');
for(const f of fs.readdirSync(__dirname).filter(n=>/^scenes\d+\.js$/.test(n)).sort())require('./'+f);
module.exports={title:'quentin',fps:30,voice:'voice.mp3',words:D.WORDS.words,
 music:[[0,12,'mystery'],[56,80,'tense'],[305,360,'sad'],[461,500,'sad'],[600,650,'epic'],[690,D.TOTAL,'sad']],
 shots:D.build()};
