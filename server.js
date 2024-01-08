const express = require('express');
const app = express();
const cors = require('cors');
const userRouter = require('./src/controllers/user');

// adding middlewares

app.use(express.json());
app.use(cors());

app.get ('/',(request,response)=>{
    response.status(200).json({ message : "Welcome" });
})

app.use('/users',userRouter);

module.exports =  app ;