let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;

let User = require('../../models/userModel');
let uuidV4 = require('uuid/v4');

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField:'username',
        passwordField:'password'
    }, (username, password, done) => {

        let query = {'local.username':username};
        User.findOne(query,(error, user)=> {
            if (user) {
                console.log('found user');
                done(null, user._doc);
            } else {
                let user = new User();
                user.displayName = username;
                user.localauth = {};
                user.localauth.id = uuidV4();
                user.save();

                done(null, user);
            }
        });
    }));
};
