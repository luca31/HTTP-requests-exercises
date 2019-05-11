'use strict'
const express = require('express')
const app = express()

let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public',express.static('public'));
app.set('view engine', 'ejs');


let es = [{
  consegna: "Elimina i numeri maggiori di 30.",
  dati: [56,45,74,57,45,65,6,76,5,45,7,6,15,7,57,46,45,2,7,75,46],
  risultato: []
}, {
  consegna: "Somma tutti i numeri all'ultimo della lista (compreso).",
  dati: [43,66,95,86,5,26,8,6,45,6,7,51,7,67,57,7,34,50,59],
  risultato: []
}, {
  consegna: "Ordina le stringe in ordine alfabetico e dopo sostituisci la prima lettera con 5.",
  dati: ["apple", "samsung", "google", "android", "mac"],
  risultato: ["5ndroid", "5pple", "5oogle", "5ac", "5amsung"]
}, {
  consegna: "Ripeti la stringa alla chiave \"testo\" tante volte quanto è indicato alla chiave \"numero\".",
  dati: {testo: "ciao mare ", numero:5},
  risultato: "ciao mare ciao mare ciao mare ciao mare ciao mare "
}, {
  consegna: "Invia una lista con i primi 5 numeri divisibili per il numero dato e maggiori di 9999",
  dati: 23,
  risultato: [1012, 1035, 1058, 1081, 1104]
}]


for(let x in es[0].dati){
  if(es[0].dati[x] <= 30){es[0].risultato.push(es[0].dati[x])}
}
for(let x in es[1].dati){
  es[1].risultato.push(es[1].dati[x] + es[1].dati[es[1].dati.length-1])
}


let progress = {
  signed:false,
  es:{}
}


app.get('/', (req,res) => {
  res.render("index", {req:req, host: req.headers.host, numEs:es.length})
})


app.get('/voto', (req,res) => {
  res.render("voto", {req:req, host: req.headers.host, progress:progress, numEs:es.length})
})


app.post('/accreditamento', (req,res) => {
  if(req.body.nome) {progress.signed = req.body.nome}
  res.send({
    "message":req.body.nome?"Ottimo lavoro!":"Riprova"
  })
})


for(let x in es){
  app.get(`/esercizi/${parseInt(x)+1}`, (req, res) => {
    if(req.headers["x-data"] == "True"){
      res.send({
        "consegna": es[x].consegna,
        "data": es[x].dati
      })
    } else {
      res.status(403)
      res.send({
        "consegna": es[x].consegna
      })
    }
  })

  app.post(`/esercizi/${parseInt(x)+1}`, (req, res) => {
    if(!progress.signed) {
      res.status(403)
      res.send({
        "message": "Devi prima eseguire l'accreditamento"
      })
    }
    else if(JSON.stringify(req.body.data) == JSON.stringify(es[x].risultato)){
      progress.es[x] = true
      res.send({
        "message": "Ottimo lavoro!"
      })
    } else {
      res.status(403)
      res.send({
        "message": "Riprova"
      })
    }
  })
}

app.all('*', (req, res) => {
  res.status(404)
  res.send({
    "message":"Richiesta non valida"
  })
})

module.exports = app