var uri = 'mongodb//localhost:27017/test'

var MongoClient = require('mongodb').MongoClient;

MongoClient.connect(uri, function(err,db){

    db.collection('users').insertMany([{user:'test'}],function(err, results){
        console.log('yey');
    })

    db.collection('users').find().each(function(err, doc){
        console.dir(doc);
        db.close();
    })

    //db.close();
})