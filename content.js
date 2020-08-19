const readlineSync = require('readline-sync');
const fs = require('fs');

const formatter = require('./formatter.js');

const examples = { python: formatter.python(fs.readFileSync('./examples/example.py', 'utf8')) }
const languages = require('./data/languages.json');
let ex = require('./data/ex.json');

const index = readlineSync.keyInSelect(Object.keys(languages), 'Which language?', {cancel:false});
const lang = languages[Object.keys(languages)[index]];
console.log('\n' + lang.selection + '\n');

for(let x in languages['English']){
  if(lang[x]==undefined) lang[x] = languages['English'][x];
};

for(let x in ex){
  ex[x].task = ex[x][`task_${lang.abbr}`] || ex[x]['task_en'] || ex[x]['task_it'];
};

let progress = {
  signed:false,
  ex:{}
};

module.exports = {
  ex: ex,
  lang: lang,
  progress: progress,
  examples: examples
};