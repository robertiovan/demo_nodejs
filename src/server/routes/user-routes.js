let express = require('express');


let routesToAccess = (config) => {
    let userRouter = express.Router();

    userRouter.use('/', (req, res, next)=> {
        if (!req.user) {
            res.status(401);
            res.send('Unauthorized');
        }
        next();
    });

    userRouter.route('/').get((req, res) => {
        let user = req.user;
        res.json(req.user);
    });
    return userRouter;
};

module.exports = routesToAccess;
