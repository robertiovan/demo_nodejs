let should = require("should");
let sinon = require("sinon");

describe('Book controller tests : ',()=>{
    "use strict";
    describe('Post tests : ',()=>{
       it('Should not allow an empty title on post.',()=>{
          let req ={
              body:{
                  author:'John'
              }
          };
          let res = {
              status: sinon.spy(),
              send: sinon.spy()
          };
          let bookController = require('./book-controler')("config");
          bookController.post(req,res);

          res.status.calledWith(400).should.equal(true,'Bad status' + res.status.args[0][0]);
          res.send.calledWith('Title is required').should.equal(true);
       });
    });
});
