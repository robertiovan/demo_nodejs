let passport = require('passport');
let TwitterStrategy = require('passport-twitter').Strategy;

module.exports = () => {
    passport.use(new TwitterStrategy({
            consumerKey:'ckey',
            consumerSecret:'cscrt',
            callbackURL:'http://localhost:5000/auth/twitter/callbackCall',
            passReqToCallback:true
        },
        function(token, tokenSecret, profile, done) {
            let user = {};

            user.image = profile._json.image.url;
            user.displayName = profile.displayName;

            user.twitter = {};
            user.twitter.id = profile.id;
            user.twitter.token = token;

            done(null, user);
        }));
};
