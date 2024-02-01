const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config();

const app = express();

// taking the data from 'dist production build by frontend'
app.use(express.static('dist'))
app.use(cors());
// express.json() used to get body of any req
app.use(express.json());
app.use(morgan('tiny'));

const data = [
    {
        id: 1,
        name: 'Rahul',
        phone: '123456789'
    },{
        id: 2,
        name: 'naman',
        phone: '178900000'
    },{
        id: 3,
        name: 'arman',
        phone: '120000089'
    }
]

// Data was tranfered in form of string
app.get('/',(req, res)=>{
    res.send('<p>welcome to Phone Diary</p>');
})

app.get('/info', (req, res)=>{
    res.send(`
        <div>
            <h2>developed by Sharad Poddar</h2>
            <p>Learning Full Stack Development</p>
            <p>Phone No: +910000111192</p>
        </div>
    `)
})

// data comes in json format
app.get('/api/data',(req, res)=>{
    res.json(data);
})

// data sending on specific id
app.get('/api/data/:id',(req, res)=>{
    const id = req.params.id;

    if(data.length == 0){
        res.send('<p>No data is available currently!</p>')
    }

    const content = data.find(e=>e.id == id);

    if(!content){
        res.status(404).end();
    }else{
        res.json(content);
    }
})

// POST the data to server
app.post('/api/data',(req, res)=>{
    if(!req.body.name || !req.body.phone || req.body.name==''){
        return res.status(400).end();
    }

    const same_name_data = data.find(e=>e.name == req.body.name);
    if(same_name_data){
        return res.status(400).send(`<div>
            <h2>Error</h2>    
            <p>please add some unique name<p>
        </div>`);
    }

    const phone_data = {
        id: data.length+1,
        name: req.body.name,
        phone: req.body.phone
    }

    data.push(phone_data);
    console.log(data);
    res.status(200).json(data);
})

// DELETE the any specific id 
app.delete('/api/data/:id',(req, res)=>{
    const id = req.params.id;
    const newData = data.filter(e=>id != e.id);
    console.log(newData);
    res.send('<p>deleted</p>')
})


// user defined middleware
app.use((req, res)=>{
    res.status(404).json({"error": "unknown content"});
})


const PORT = 4000 || process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`server is listening at PORT ${PORT}`);
})


// when we doing with dist network gets HTML page and assets from dist
// React code fetches the data from baseURL or https://localhost:4000/api/data
// Unlike when running the app in a development environment, everything is now in 
/*
    the same node/express-backend that runs in localhost:4000. When the browser goes 
    to the page, the file index.html is rendered. That causes the browser to fetch the 
    production version of the React app. Once it starts to run, it fetches the json-data 
    from the address localhost:3001/api/notes.
*/
//Our application saves the notes to a variable. If the application crashes or is restarted, all of the data will disappear.