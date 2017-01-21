var sql = require('mssql');

var config = {
	user:'userName',
	password:'pass',
	server:'myserver',
	database:'db',
	options:{encrypt:true}
};

sql.connect(config, function(err){
	console.log(err);
})