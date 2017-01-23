let express = require("express");
let app = express();

app.use("/client",express.static('../client'));

app.listen(5000, (err)=>{
    console.log("Server running!!!");
});

app.get('/yo-man', (req, res, next)=>{
    res.send('Response from API');
});



