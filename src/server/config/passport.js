
let passport = require('passport');
let googleStrategy = require('./strategies/google.strategy');
let twitterStrategy = require('./strategies/twitter.strategy');
let facebookStrategy = require('./strategies/facebook.strategy');
let localStrategy = require('./strategies/local.strategy');

module.exports = (app)=> {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    localStrategy();
    googleStrategy();
    twitterStrategy();
    facebookStrategy();
};

