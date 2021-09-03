const mongoose = require("mongoose");
const bcript = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    email:{
        type : String,
        require: true
    },
    phone:{
        type : Number,
        require: true
    },
    work:{
        type: String,
        require: true
    },
    password:{
        type : String,
        require: true
    },
    cpassword:{
        type : String,
        require: true
    },
    tokens: [
        {
        token:{
            type : String,
            require: true
             }
        }
    ]
})
//hashing the password
userSchema.pre('save', async function(next){
    console.log("hi from inside passowrd");
    if(this.isModified('password')){
        this.password = await bcript.hash(this.password , 12);
        this.cpassword = await bcript.hash(this.password , 12);
    }
    next();
})

//add the token in the database if user is true
userSchema.methods.generateAuthToken = async function () {
   try {
       let token = jwt.sign({_id:this._id},process.env.SECRET_KEY);  //sign is for generate token
       this.tokens = this.tokens.concat({token , token});
       await this.save();

       return token;
   } catch (error) {
       console.log(error)
   }
}

//send the data to the database
const User = mongoose.model('REGISTRATION', userSchema);

module.exports = User ;