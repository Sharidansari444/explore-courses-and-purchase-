const User = require("../models/userModel")
const jwt = require("jsonwebtoken")


const usermiddleware = async (req,res,next)=>{
   const token  = req.header("Authorization")
//    console.log(token)
//    res.send("helo")
   if(!token){
    return res.status(401).json({
        message:"Unauthrization http, token not provided"
    })
   }
//    console.log(token)
   
    const jwtToken = token.replace("Bearer","").trim()
    // console.log("token auth from middleware",jwtToken)
      
    try {
        // es jagah pe token ko verify kiya ja rha hai and compare bhi karaya ja rha hai jwt ke secret key se
        const isverified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY)
        // console.log(isverified)
        // yha pe projection ka use kiya hu jisse me chahta hu ki mujhe password nhi chahiye yaa mujhe sirf email chahiye es liye hm projection ka use krte hai aur ye  store data me se data ko find kr ke deta hai
        const userdata = await User.findOne({email:isverified.email}, {password:0} )
        
        // now i am create a custom data than we can use where ever. req.user  is a stor all data from userdata
        
        req.user = userdata
        req.token = token;
        req.userID =  userdata._id 
        

      
       next();

        
    } catch (error) {
         res.status(400).json({message :" unauthrizaed invalid token"})
    }
   
 
}

module.exports = usermiddleware