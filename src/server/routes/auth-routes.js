let express = require('express');
let passport = require('passport');
//http://www.restapitutorial.com/lessons/httpmethods.html

let routesToAccess = (config)=> {
    let authRouter = express.Router();

    authRouter.use('/google/callbackCall', (req, res, next)=> {
        next();
    });

    authRouter.route('/google/callbackCall')
        .all((req, res, next)=> {
            next();
        })
        .get(passport.authenticate('google', {failureRedirect: '/error'}),
        function(req, res) {
            // Successful authentication, redirect home.
            res.redirect('/user');
        });

    authRouter.route('/google')
        .get(passport.authenticate('google',{
            scope: ['profile','email']
        }));

    authRouter.route('/twitter/callbackCall')
        .get(passport.authenticate('twitter', {failureRedirect: '/error'}),
            function(req, res) {
                // Successful authentication, redirect home.
                res.redirect('/user');
            });

    authRouter.route('/twitter')
        .get(passport.authenticate('twitter'));

    authRouter.route('/facebook')
        .get(passport.authenticate('facebook',{
            scope:['email']
        }));

    authRouter.route('/facebook/callbackCall')
        .get(passport.authenticate('twitter', {failureRedirect: '/error'}),
            function(req, res) {
                // Successful authentication, redirect home.
                res.redirect('/user');
            });

    authRouter.route('/local')
        .post(passport.authenticate('local', {failureRedirect: '/error'}),
            function(req, res) {
                // Successful authentication, redirect home.
                res.redirect('/user');
            });

    return authRouter;
};

module.exports = routesToAccess;
