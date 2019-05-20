'use strict'
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const content = require('./content.js');

let {ex, lang, progress} = content;
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public',express.static('public'));
app.set('view engine', 'ejs');
app.set('views', __dirname+`/views_${lang.abbr}`);


app.get('/', (req,res) => {
  res.render("index", {req:req, host:'http://'+req.headers.host, ex:ex});
});


app.get('/grade', (req,res) => {
  res.render("grade", {req:req, host:'http://'+req.headers.host, ex:ex, progress:progress});
});


app.post('/signup', (req,res) => {
  if(req.body.name) progress.signed = req.body.name;
  res.send({
    'message':req.body.name?lang.ok:lang.retry
  });
});


for(let x in ex){
  app.get(`/ex/${parseInt(x)+1}`, (req, res) => {
    if(req.headers['x-data'] == 'True'){
      res.send({
        'task': ex[x].task,
        'data': ex[x].data
      });
    } else {
      res.status(403);
      res.send({
        'task': ex[x].task
      });
    };
  });

  app.post(`/ex/${parseInt(x)+1}`, (req, res) => {
    if(!progress.signed) {
      res.status(403);
      res.send({
        'message': lang.reqSignup
      });
    } else if (JSON.stringify(req.body.data) == JSON.stringify(ex[x].result)){
      progress.ex[x] = true;
      res.send({
        'message': lang.ok
      });
    } else {
      res.status(403);
      res.send({
        'message': lang.retry
      });
    };
  });
};


app.all('*', (req, res) => {
  res.status(404);
  res.send({
    'message': lang.notFound
  });
});


app.listen(port, () => console.log(`${lang.listening} ${port}.`));
