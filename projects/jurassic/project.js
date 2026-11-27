const fs=require('fs'),path=require('path');
const D=require('./dsl.js');
for(const f of fs.readdirSync(__dirname).filter(n=>/^scenes\d+\.js$/.test(n)).sort())require('./'+f);
module.exports={title:'jurassic',fps:30,voice:'voice.mp3',
 music:[[0,45,'mystery'],[45,130,'upbeat'],[130,D.TOTAL,'epic']],
 shots:D.build()};
