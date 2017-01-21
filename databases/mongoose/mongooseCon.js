var uri = 'mongodb//localhost:27017/test'

var mongoose = require('mongoose');
mongoose.connect(uri);

var db = mongoose.connection;

db.once('open', function(callback){
    console.log('yey');
});

var schemaUsr = mongoose.Schema({user:String});

exports.User = mongoose.model('User', schemaUsr);


User.findOne({user:'test'}, function(err, user){
    user = "test2";
    user.save(function(){
        //res.end();
    });
})
