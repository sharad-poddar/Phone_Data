const mongoose = require('mongoose');
require('dotenv').config();

mongoose.set('strictQuery', false);
const url = process.env.API_URL

console.log('conncting to url', url);
mongoose.connect(url).then(result => {
    console.log('connected to mongo db');
}).catch(error=>{
    console.log('unable to connect', error);
})

const schema = new mongoose.Schema({
    id: Number,
    name: String,
    phone: Number,
})
  
// setting the schema to json
schema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

module.exports = mongoose.model('phone', schema);