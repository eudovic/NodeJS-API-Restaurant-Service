var express = require('express')
var routes = require('./routes/ApiRoutes')
const app = express()
const port = 3333

app.use(express.json());
app.use(routes);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})