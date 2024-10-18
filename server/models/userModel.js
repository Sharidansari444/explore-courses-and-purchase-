const mongoose = require("mongoose")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");



const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true

    },
    email:{
        type:String,
        require:true,
       

    },
    password:{
        type:String,
        require:true

    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    razorpay_order_id:{
        status:String,
        id:String,
    },
    verifytoken:{
        type:String
    },
    avatar :{
       public_id:{
       type: String,
       require:true

       },
       secure_url :{
        type: String,
        require:true
       }
      
    }

});


 userSchema.pre('save' , async function (next) {
    const user = this;
    if(!user.isModified("password")){
        next();
    }

    try {
         const salRound = await bcrypt.genSalt(10);
         const hash_password = await bcrypt.hash(user.password,salRound)
         
           user.password = hash_password

    } catch (error) {
        console.log("password bcript error")
    }
})
// compare the password
userSchema.methods.comparepassword = async function(password){
    return bcrypt.compare(password, this.password);
}

// hash the password
userSchema.methods.generateToken = async function(){
    try {
        return jwt.sign(
            {
                useId : this._id.toString(),
                email: this.email,
                isAdmin : this.isAdmin
            },
             process.env.JWT_SECRET_KEY,
            {       
                expiresIn : "30d"
            }
        )
    } catch (error) {
        console.log(error)
    }
}

// define the model or the  collection name

const User = new mongoose.model("User", userSchema);

module.exports = User;