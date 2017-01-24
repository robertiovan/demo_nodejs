let express = require("express");
let app = express();

app.use("/client",express.static('../client'));

let bookRouter = require('./routes/book-routes')("inject-data");
app.use('/api/books', bookRouter);

app.listen(5000, (err)=>{
    console.log("Server running!!!!");
});

console.log("Environment is : " + process.env.ENV);



