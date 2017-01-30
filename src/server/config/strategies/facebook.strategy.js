let passport = require('passport');
let FacebookStrategy = require('passport-facebook').Strategy;


module.exports = () => {
    passport.use(new FacebookStrategy({
            clientID: 'fcid',
            clientSecret: 'fscrt',
            callbackURL: 'http://localhost:5000/auth/facebook/callbackCall'
        },
        function(accessToken, refreshToken, profile, done) {
            let user = {};
            user.email = profile.emails[0].value;
            //user.image = profile._json.image.url;
            user.displayName = profile.displayName;

            user.facebook = {};
            user.facebook.id = profile.id;
            user.facebook.token = accessToken;

            done(null, user);
        }
    ));
};

