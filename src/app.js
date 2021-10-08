var express = require('express');
var cors = require('cors');
var routes = require('./routes/ApiRoutes');
const app = express();
app.use(cors({

    origin: 'http://localhost:3000'
    
}));
const port = 3337

app.use(express.json());
app.use(routes);

app.listen(port, () => {
    console.log(`Modo Garçom App listening at http://localhost:${port}`)
})