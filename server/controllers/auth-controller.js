const User = require("../models/userModel");
const bcrypt = require('bcrypt');   
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer")
// Home page logic..


const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{  
        user :"sharidansari111@gmail.com",
        pass:"qryjehazjjodwpzk"   
        
    }
})

const home = async (req, res) => {
    try {

        res.send("welcome to Home page  again 😊 ")
       
    } catch (error) {
        console.log("home page not found 😴")
    }
}
// *==================
// signup logic
// *===================

const signup = async (req, res,next) => {
 
    try {
        // console.log(req.body)
        const { name, email, password } = req.body
        // console.log(email)

        const userExist = await User.findOne({ email })

        if(userExist) {
            return res.status(400).json({message:"user alreadyExist"})
        }
        // hash the password
        
        // const  saltRound = 10; 
        // const hash_password = await bcrypt.hash(password, saltRound);
       const create =  await User.create({
          name, 
          email,
          password
         })

       
        res.json({
               msg: "Token generate succesfull" ,
               token :await create.generateToken(),
               userId : create._id.toString()} )

    } catch (error) {
    //    res.status(500).json("internal server error")
    // console.log(error)
    next(error)
    }
}
// *==================
//  login route
// *===================

const login = async (req,res)=>{
     const {email ,password} = req.body
    try {
        const userExist = await User.findOne({email})
        // console.log(userExist)
    if(!userExist){
        return res.status(400).json({ message : " Not valid email address "})
    }
    // const user = await bcrypt.compare(password, userExist.password);
    const user  = await userExist.comparepassword(password);

    if(user){
        res.status(200).json({
        msg: "Login succesfull" ,
        token :await userExist.generateToken(),
        userId : userExist._id.toString()
        })
    }else{
        res.send(401).json({message:"invalid email and password"})
    }

    } catch (error) {
        console.log(error)
       
    }

     
}
// *==================
// to send user - logic
// *===================

const user = (req,res)=>{
    try {
        const userdata = req.user
      return  res.status(200).json( {userdata })
    } catch (error) {
        console.log("user verify error" )
    }
}


const changepassword = async(req,res)=>{
    const {email} = req.body;

    if(!email){
    res.status(400).json({message:"Email is not found"})
    }
    try {
        const userfind = await User.findOne({email:email})
        const token  = jwt.sign({_id:userfind._id},process.env.JWT_SECRET_KEY,{
            expiresIn :"120s"
        })
        // console.log(token)
        const setusertoken = await User.findByIdAndUpdate({_id:userfind.id},{verifytoken:token},{new :true})
       if(setusertoken){
        const mailOptions = {
                from:"sharidansari111@gmail.com",
                to: email,  
                subject:"Sending email For password reset",
                text:`this link valide for 2 MINUTS http://localhost:5173/Resetpassword/${userfind.id}/${setusertoken.verifytoken}`
        }
        transporter.sendMail(mailOptions , (error,info)=>{
            if(error){
               console.log("error",error);
               res.status(401).json({ status:401 ,message:"Email not send"})
            }else{
               console.log("Email send", info.response)
               res.status(201).json({status:200 ,message:"Email send succesfully"})
            }
          })
       
       }
      

    } catch (error) {
        res.status(401).json({message:"Email is not find"})
    }
}

const ResetPassword =  async(req,res) =>{
    const {id,token} = req.params;
 try {
    const validuser = await User.findOne({_id:id,verifytoken:token})
    const verifyToken = jwt.verify(token,process.env.JWT_SECRET_KEY)

    if(validuser && verifyToken._id){
        res.status(201).json({message:validuser})
    }else{
        res.status(401).json({status:401, message:"user not exist "})
    }

    
 } catch (error) {
     res.json({error})
 }
}   

const sendpassword =async(req,res)=>{
    const {id,token} = req.params;
    const {password} = req.body
    try {
    const validuserpassword = await User.findOne({_id:id,verifytoken:token})
    const verifyTokenpassword = jwt.verify(token,process.env.JWT_SECRET_KEY)

    if (validuserpassword && verifyTokenpassword._id) {
        const salRound = await bcrypt.genSalt(10);
        const newpassword = await bcrypt.hash(password,salRound)
        const setnewpassword = await User.findByIdAndUpdate({_id:id},{password:newpassword})
        setnewpassword.save()
        res.status(201).json({status:201, message:"user axist succefully"})
      }
    } catch (error) {   
        res.status(401).json({status:401, message:"user not exist from send password "})
    }
  
}

module.exports = { home, signup, login,user,changepassword, ResetPassword, sendpassword }