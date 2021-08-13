const express = require("express");
const app = express();
const mongoose = require('mongoose');

const port = 3000;
const DB = 'mongodb+srv://mern:mern123@cluster0.y5749.mongodb.net/mernweb?retryWrites=true&w=majority';

mongoose.connect(DB , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() =>{
    console.log('mongoose connected');
}).catch((err) =>{
    console.log(err);
})



const middleware = (req , res , next) =>{
    
    console.log("this is middleware");
    next();
}

app.get("/",(req,res) =>{
    res.send("hello from express");
})


app.get("/about",middleware,(req,res) =>{
    res.send("hello from express");
})

app.listen(port ,() =>{
    console.log(`the sever is running on ${port}`)
})


// mongodb+srv://mern:<password>@cluster0.y5749.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
