let path = require('path');
let bodyParser = require('body-parser');
let passport = require('passport');
let passportAuth = require('./config/passport');
let express = require('express');
let app = express();
let session = require('express-session');
let cookieParser = require('cookie-parser');
let mongoose = require('mongoose');
let db = mongoose.connect('mongodb://localhost/socialAgg');

let port = process.env.PORT || 5050;

app.use('/client',express.static(path.join(__dirname, '../../src/client')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

app.use(session({
    secret:'secret-pass-etc',
    resave: true,
    saveUninitialized: true}));

passportAuth(app);

/* jshint -W033*/
let bookRouter = require('./routes/book-routes')('inject-data');
let authRouter = require('./routes/auth-routes')('inject-data');
let userRouter = require('./routes/user-routes')('inject-data');
app.use('/api/books', bookRouter);
app.use('/auth', authRouter);
app.use('/user', userRouter);

app.listen(port, (err) => {
    console.log('Server running!!!!!');
});

console.log('Environment is : ' + process.env.NODE_PATH);





