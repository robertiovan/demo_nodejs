let bookController = (config)=>{

    let post = (req,res)=>{
        if(req.body.author){
            res.status(400);
            res.send('Title is required');
        }
        else{
            res.status(201);
            res.send({__id:"book_id",name:"book1", author:"auth"});
        }
    };
    let list = (req,res)=>{
        res.status(200).json([{name:"book1", author:"auth"},{name:"book2", author:"auth2"}]);
    };
    let getById = (req,res)=>{
        res.status(200).json(req.book);
    };
    let updateById = (req,res)=>{
        for(let k in req.body){
            if(req.book.hasOwnProperty(k))
                req.book[k] = req.body[k];
        }
        res.json(req.book);
    };
    let updateAllById = (req,res)=>{
        res.json({name:"book1", author:"auth"});
    };
    let deleteById = (req,res)=>{
        res.status(204);
    };

    return {

        post:post,
        list:list,
        getById:getById,
        updateById:updateById,
        updateAllById:updateAllById,
        deleteById:deleteById
    };
};
module.exports = bookController;