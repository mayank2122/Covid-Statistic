let mongoose = require('mongoose');
const { tallySchema } = require('./schema')

const mongoURI = "mongodb://localhost:27017/coviddata"

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log("database connected"); })
    .catch((err)=>console.log(err))
const collection_connection =new mongoose.model('collection_connection', tallySchema)
export default collection_connection;