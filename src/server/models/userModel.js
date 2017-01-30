let mongoose = require('mongoose');
let schema = mongoose.Schema;

let userSchema = schema({
    displayName:{
        type:String
    },
    image:{
        type:String
    },
    email:{
        type:String
    },
    facebook:{
        type:Object
    },
    twitter:{
        type:Object
    },
    google:{
        type:Object
    },
    localauth:{
        type:Object
    }
});

module.exports = mongoose.model('User', userSchema);
