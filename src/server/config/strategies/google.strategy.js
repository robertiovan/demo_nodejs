let passport = require('passport');
let GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

let User = require('../../models/userModel');

module.exports = () => {
    passport.use(new GoogleStrategy({
            clientID:'382917333030-m2o5nc2mcu9t1h55luqo3k310h352ijr.apps.googleusercontent.com',
            clientSecret:'U2O7BeUeOmbBJzxAvLJdQ4j_',
            callbackURL:'http://localhost:5000/auth/google/callbackCall',
            passReqToCallback: true},
        function(req, accessToken, refreshToken, profile, done) {

            let query = {'google.id':profile.id};

            User.findOne(query,(error, user)=> {
                if (user) {
                    console.log('found user');
                    done(null, user._doc);
                } else {
                    let user = new User();
                    user.email = profile.emails[0].value;
                    user.image = profile._json.image.url;
                    user.displayName = profile.displayName;
                    user.google = {};
                    user.google.id = profile.id;
                    user.google.token = accessToken;
                    user.save();
                    done(null, user);
                }
            });
        })
    );
};
