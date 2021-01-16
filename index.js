const express = require('express');
const dataStore = require('nedb');
 
const app = express();
app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

const database  = new dataStore('database.db');
database.loadDatabase();

app.post('/api', (request, response) => {
  const data = request.body;
  const ts = Date.now();
  data.timestamp = ts;
  database.insert(data);
  response.json(data)
});

app.post('/cautare', (request, response) =>{
  const data = request.body;
  database.find({"text": data.text}, function(err, docs){
    if(docs[0] == undefined)
      response.json("CODUL NU ESTE VALID!");
    else{
      database.remove({"text": data.text}, {});
      response.json("CODUL ESTE VALID SI A FOST STERS!");
    }
  })
});