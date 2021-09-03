const express = require("express");
const app = express();
const dotenv = require('dotenv');
dotenv.config({path: './config.env'})

//for the database connections
require('./db/conn');

//for understanding the JSON file
app.use(express.json())

// for the routers
app.use(require('./router/auth'))

// runnning port
const port = process.env.PORT;

const middleware = (req , res , next) =>{
    
    console.log("this is middleware");
    next();
}


app.get("/",(req,res) =>{
    res.send("hello from express");
})
app.get("/about",middleware ,(req,res) =>{
    res.send("hello from express middleware");
})



app.listen(port ,() =>{
    console.log(`the sever is running on ${port}`)
})


// mongodb+srv://mern:<password>@cluster0.y5749.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
