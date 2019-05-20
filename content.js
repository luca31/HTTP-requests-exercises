const readlineSync = require('readline-sync');

const languages = require('./languages.json');
let ex = require('./ex.json');

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
  progress: progress
};