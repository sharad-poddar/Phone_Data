const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
// const PhoneModel = require('./02_mongo.js');
const PhoneModel = require('./models/phone.js');

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
    PhoneModel.find({}).then(data=>{
        res.json(data)
    })
})


// data sending on specific id
app.get('/api/data/:id',(req, res, next)=>{
    const id = req.params.id;

    PhoneModel.findById(id).then(result=>{
        if(result == null){
            // sending with status code 404
            res.status(404).json('Not Found')
        }else{
            res.send(result);
        }
    })
    .catch((error)=>{
        // console.log(error);
        // sending res with status of 500 and not showing anything
        //res.status(500).end()
        // 400 status code for bad requests
        // res.status(400).json({error: "malfunctionated Id"});

        // passing the error to middleware
        next(error);
    })
})


// POST the data to server
app.post('/api/data',(req, res, next)=>{
    // Handeld in moongoose Validator
    // if(!req.body.name || !req.body.phone || req.body.name==''){
    //     return res.status(400).end();
    // }

    const same_name_data = data.find(e=>e.name == req.body.name);
    if(same_name_data){
        return res.status(400).send(`<div>
            <h2>Error</h2>    
            <p>please add some unique name<p>
        </div>`);
    }

    const phone_data = new PhoneModel({
        id: data.length+1,
        name: req.body.name,
        phone: req.body.phone
    })

    phone_data.save().then(result=>{
        console.log(result, "saved to backened");
        // the data send back to frontend with toJson format
        res.json(result);
    }).catch(error => next(error));
})


// DELETE the any specific id 
app.delete('/api/data/:id',(req, res, next)=>{
    const id = req.params.id;

    PhoneModel.findByIdAndDelete(id).then(result=>{
        console.log(result);
        console.log('node has been deleted!')
        res.status(204).end()
    }).catch(error => next(error));
})

// Update any phone number
app.put('/api/data/:id',(req, res, next)=>{
    const body = req.body;

    const data = {
        id: body.id,
        name: body.name,
        phone: body.phone
    }

    // the event handler receives the original document without the modifications. 
    // We added the optional { new: true } parameter, which will cause our event 
    // handler to be called with the new modified document instead of the original.
    PhoneModel.findByIdAndUpdate(req.params.id, data, {new: true, runValidators: true, context: 'query'}).then((result)=>{
        console.log(result);
        res.json(result);
    }).catch(error=>next(error))
})


// user defined middleware
app.use((req, res)=>{
    res.status(404).json({"error": "unknown content"});
})

// middleware to handel all errors
app.use((error, req, res, next)=>{
    console.log(error);
    console.log(error.message);
    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    }
    if(error.name === 'ValidationError'){
        return response.status(400).json({ error: error.message })
    }
    next(error);
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