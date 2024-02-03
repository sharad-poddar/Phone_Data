const mongoose = require('mongoose');

const password = process.argv[2];

mongoose.set('strictQuery', false);
const url = `mongodb+srv://sharad:${password}@cluster0.at9thxi.mongodb.net/contact_details?retryWrites=true&w=majority`

console.log('conncting to url', url);
mongoose.connect(url).then(result => {
    console.log('connected to mongo db');
}).catch(error=>{
    console.log('unable to connect', error);
})

const schema = new mongoose.Schema({
    id: Number,
    name: String,
    number: Number,
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