"use strict";
let express = require('express');
//http://www.restapitutorial.com/lessons/httpmethods.html

let routesToAccess = (config)=>{

    let bookRouter = express.Router();
    let bookController = require("../controllers/book-controler")(config);
    //Middleware
    bookRouter.use("/:bookid",(req, res, next)=>{
        //noinspection JSUnresolvedVariable
        let bookId = req.params.bookid;
        req.book = {id:bookId, name:"book1", author:"auth"};
        next();
    });

    bookRouter.route("/")
        .get(bookController.list)
        .post(bookController.post);

    bookRouter.route("/:bookid")
        .get(bookController.getById)
        .put(bookController.updateAllById)
        .patch(bookController.updateById)
        .delete(bookController.deleteById);

    return bookRouter;
};

module.exports = routesToAccess;
