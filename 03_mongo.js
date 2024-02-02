const mongoose = require('mongoose');

if(process.argv.length<=0){
    console.log('Enter the element!');
    process.exit(1);
}

const password = process.argv[2];
const id = process.argv[3];
const name = process.argv[4];
const phone_number = process.argv[5];

const url = `mongodb+srv://sharad:${password}@cluster0.at9thxi.mongodb.net/contact_details?retryWrites=true&w=majority`
mongoose.set('strictQuery', false);
mongoose.connect(url);

const schema = new mongoose.Schema({
    id: Number,
    name: String,
    phone: Number
})

const PhoneModel = mongoose.model('phone', schema);

const phone = new PhoneModel({
    id: id,
    name: name,
    phone: phone_number
})

phone.save().then(result=>{
    console.log('saved in dbase');
    console.log(result);
    mongoose.connection.close();
})
