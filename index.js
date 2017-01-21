var express = require('express');
var engines = require('consolidate');
var bodyParser = require('body-parser');


var app = express();
app.engine('hbs', engines.handlebars);

app.set('views','./views');
app.set('view engine','hbs');

//route in other files
var userRouter = require('./routing/username');
app.use("/:user", userRouter);

app.use(bodyParser.urlencoded({externded:true}));
app.put('/:username',function(req,res){
    var username = req.params.username;
    res.end();
})

app.delete('/:username',verifyUser,function(req,res){
    res.sendStatus(200);
})


function verifyUser(req,res,next){
    //next();
    //next('route');
    //res.redirect('');
}


var server = app.listen(5000, function(){
    console.log("Server running");
});