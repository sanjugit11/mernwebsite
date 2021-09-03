const express = require('express');
const router = express.Router();
const bcript = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('../db/conn');
const User = require('../model/userSchema');

router.get('/' , (req , res)=>{
    res.send("this is hello from router");
})

router.post('/register' ,async(req,res) =>{
    const {name,email,phone , work,password,cpassword} = req.body;
 
    if(!name||!email||!phone ||! work||!password||!cpassword){
    return res.status(422).json({error :"plz fill the all regarding fields"})
}
try{
    const userExist = await User.findOne({email:email})
    if(userExist){
        return res.status(422).json({error:"email already exist"})
    }
    //email not matched means new user is here
    //new user
    const user = new User({name,email,phone , work,password,cpassword});
   //becript the passowrd

    //then save the new user
    await user.save();
    res.status(201).json({message:"data created successfully"});

}catch(err){
    console.log(err);
}
});

//login credencials
router.post('/login' ,async(req , res) =>{
    const{email, password} = req.body ;
    if(!email || !password){
        return res.status(400).json({error:"plz fill the filled properly"})
    }

    try{
     
        const loginExistE = await User.findOne({email:email});
        if(!loginExistE){
            return res.json({error:"invalid email credencials"})
        }
        const loginExistP =await bcript.compare(password , loginExistE.password)
            console.log(loginExistP,"this is login p ");  //true if user is avilable

        //to generateauth token call if  user is true    
         const token = await loginExistE.generateAuthToken();
         console.log(token);

         //cookies store for a time
         res.cookie("jwtoken" ,token ,{
             expires:new Date(Date.now() + 86400000 ),
             httpOnly:true
         }) ;
         
        if(!loginExistP){
            return res.json({error:"invalid password credencials"})
        }else{
            res.status(201).json({message:"login successfully"})
        }
        
    }catch(err){
        console.log(err);
    }

})

module.exports = router;