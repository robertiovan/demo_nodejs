let express = require('express');
var passport = require('passport');
//http://www.restapitutorial.com/lessons/httpmethods.html

let routesToAccess = (config)=> {
    let authRouter = express.Router();

    authRouter.route('/google/callback')
        .get(passport.authenticate('google', {
            sucessRedirect:'/users/',
            failure:'/error/'
        }));
    authRouter.route('/google')
        .get(passport.authenticate('google',{
            scope: ['profile','email']
        }));
    return authRouter;
};

module.exports = routesToAccess;
