const express = require('express');
const router = express.Router();

require('../db/conn');
const User = require('../model/userSchema');

router.get('/' , (req , res)=>{
    res.send("this is hello from router");
})

router.post('/register' ,(req,res) =>{
 const {name,email,phone , work,password,cpassword} = req.body;
   // console.log(req.body); //forsending the body of output
//    console.log(name); //for name call
//    console.log(email); //for email call
if(!name||!email||!phone ||! work||!password||!cpassword){
    return res.status(422).json({error :"plz fill the all regarding fields"})
}

//search in database thta email is macthed or not
User.findOne({email:email}).then((userExist) =>{
    if(userExist){
        return res.status(422).json({error:"email already exist"})
    }
    //email not matched means new user is here
    //new user
    const user = new User({name,email,phone , work,password,cpassword});
    //then save the new user
    user.save().then(()=>{
        res.status(201).json({message:"data created successfully"})
    }).catch(() =>{
        res.status(500).json({error :"failed to register"})
    })
}).catch( err => { console.log(err) });

   //res.json({message : req.body}) //postmen get the data
  
})

module.exports = router;