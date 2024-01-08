const mongoose = require('mongoose');

const userSchema =new mongoose.Schema ({
    username : {
        type : String ,
        require
    },
    email : {
        type : String,
        require
    },
    password : {
        type : String,
        require
    },
    randomString : {
        type : mongoose.Schema.Types.String,
        ref : 'User' 
    }

});

module.exports = mongoose.model('User' , userSchema , 'users');