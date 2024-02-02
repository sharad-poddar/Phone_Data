const mongoose = require('mongoose');

if(process.argv.length<=0){
    console.log('Enter the element!');
    process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://sharad:${password}@cluster0.at9thxi.mongodb.net/contact_details?retryWrites=true&w=majority`
mongoose.set('strictQuery', false);
mongoose.connect(url);

const schema = new mongoose.Schema({
    id: Number,
    name: String,
    phone: Number
})

schema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

const PhoneModel = mongoose.model('phone', schema);

module.exports = PhoneModel;