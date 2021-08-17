const express = require('express');
const router = express.Router();

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
        const loginExistP = await User.findOne({password : password});
        if(!loginExistE || !loginExistP){
            return res.json({error:"invalid credencials"})
        }
        if(loginExistE && loginExistP){
            res.status(201).json({message:"login successfully"})
        }
        

    }catch(err){
        console.log(err);
    }


})

module.exports = router;