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

// One smarter way of validating the format of the data before it is stored 
// in the database is to use the validation functionality available in Mongoose.
const schema = new mongoose.Schema({
    id: Number,
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    // this required, minLength is built in mongoose
    phone:{
        type: Number,
        // this is the minimum value, here we can't define minLength, maxLength
        min: 999999999,
        required: true
    }    
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