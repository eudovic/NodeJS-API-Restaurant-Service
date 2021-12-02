var express = require('express');
const path = require('path');
var cors = require('cors');
var routes = require('./routes/ApiRoutes');
const app = express();
app.use(cors());
const port = 3337

 app.use(express.static(path.join(__dirname, '../modogarcom/out/')));

app.use(express.json());
app.use(routes);

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '../modogarcom/out/index.html'));
  });  

app.listen(port, () => {
    console.log(`Modo Garçom App listening at http://localhost:${port}`)
})