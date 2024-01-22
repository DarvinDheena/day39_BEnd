const mongoose = require('mongoose');

const userSchema =new mongoose.Schema ({
    username : {
        type : String ,
        require : true 
    },
    email : {
        type : String,
        require : true 
    },
    password : {
        type : String,
        require
    },
    randomString : {
        type : mongoose.Schema.Types.String,
        ref : 'User' 
    }

},{
    timestamps : true
});

module.exports = mongoose.model('User' , userSchema , 'users');