const fs=require('fs');const D=require('./dsl.js');
for(const f of fs.readdirSync(__dirname).filter(n=>/^scenes\d+\.js$/.test(n)).sort())require('./'+f);
module.exports={title:'women',fps:30,voice:'voice.mp3',words:D.WORDS.words,
 music:[[0,10,'mystery'],[201,274,'tense'],[395,480,'epic'],[498,560,'sad'],[595,D.TOTAL,'epic']],
 shots:D.build()};
