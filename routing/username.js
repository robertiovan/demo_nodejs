var express = require('express');

var router = express.Router({mergeParams:true});

router.use(function(req,res,next){
	next();
})

router.route('/').all(function(req,res){

}).get(function(req,res){

});

//sau

router.all('/', function(err, req, res, next){

})

router.get('/', function(req, res, next){

})

router.put('/',function(req, res, next){

});

module.exports = router;


