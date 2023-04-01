const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080
const router = require('./Routes/CovidStatistics');
// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
const {collection_connection} = require('./connector')

app.use(router);



app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;
