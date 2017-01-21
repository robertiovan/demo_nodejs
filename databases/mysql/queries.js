var sql = require('mssql');

function query1(){
	var sqlReq = new sql.Request();
	sqlReq.query('select * from books',function(err,recordset){
		console.loq(recordset)
	})
}

function query2(){
	var sqlReq = new sql.Request();
	var ps = new sql.PreparedStatement();
	ps.input('id', sql.Int);
	ps.prepare('select * from books where id = @id', function(err){
		ps.execute({id:1},function(err, recordset){
			console.log(recordset[0]);
		})
	})
}


//module.export.query1 = query1;
//module.export.query2 = query2;