const mongoose = require('mongoose');
const app = require('./server');
const config = require('./src/config');


// connecting to mongodb

console.log("connecting to mongodb");

mongoose.connect (config.DB_URL)
    .then (()=>{
        console.log('connected to mongodb');
        app.listen(3001,()=>{
            console.log(`server listening at port 3001`);
        })
    })
   
