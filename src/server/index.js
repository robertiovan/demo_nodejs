let express = require('express');
let app = express();
let port = process.env.PORT || 5050;

let path = require('path');
app.use('/client',express.static(path.join(__dirname, '../../src/client')));

/* jshint -W033*/
let bookRouter = require('./routes/book-routes')('inject-data');
app.use('/api/books', bookRouter);

app.listen(port, (err) => {
    console.log('Server running!!!!!');
});

console.log('Environment is : ' + process.env.NODE_PATH);





