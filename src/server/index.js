let passport = require('passport');
let express = require('express');
let session = require('express-session');
let GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
let app = express();
let port = process.env.PORT || 5050;

let path = require('path');
app.use('/client',express.static(path.join(__dirname, '../../src/client')));

app.use(session({secret:'secret-pass-etc'}));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});
passport.use(new GoogleStrategy({
    clientID:'382917333030-m2o5nc2mcu9t1h55luqo3k310h352ijr.apps.googleusercontent.com',
    clientSecret:'U2O7BeUeOmbBJzxAvLJdQ4j_',
    callbackURL:'http://localhost:5000/auth/google/callback'},
    function(req, accessToken, refreshToken, profile, done) {
        done(null, profile);
    })
);

/* jshint -W033*/
let bookRouter = require('./routes/book-routes')('inject-data');
let authRouter = require('./routes/auth-routes')('inject-data');
app.use('/api/books', bookRouter);
app.use('/auth', authRouter);

app.listen(port, (err) => {
    console.log('Server running!!!!!');
});

console.log('Environment is : ' + process.env.NODE_PATH);





