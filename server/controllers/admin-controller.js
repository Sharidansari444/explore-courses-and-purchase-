const User = require("../models/userModel")
const Usercontact = require("../models/contact-model")

const getalluser = async (req,res) =>{
     try {
        const user = await User.find({}, {password :0})
         console.log(user)
         res.status(200).json({user})
     } catch (error) {
        console.log(error)
        res.status(404).json({messgae:"all user not find "})
     }
}

const getUserById = async (req,res,next) =>{
   try {
      const id = req.params.id
    const data =  await User.findOne({_id:id}, {password :0})
     res.status(200).json({message: data})
   } catch (error) {
      next(error)
   }
}

const updataUserById = async (req,res,next) =>{
   try {
      const id = req.params.id
      const updateuserdata = req.body
      const updated =  await User.updateOne({_id:id},{$set: updateuserdata})
      return  res.status(200).json({ updated})

   } catch (error) {
      next(error)
   }
}

const deleteuserid = async (req,res,next)=>{
    try {
      const id = req.params.id
      await User.deleteOne({_id : id})
    return  res.status(200).json({message:" User Delete successfully "})
    } catch (error) {
      next(error)
    }
}

const allcontact = async (req,res)=>{
   try {
      const contacts = await Usercontact.find()
      console.log(contacts)
      if(!contacts || contacts.length === 0 ){

       return res.status(404).json({message : "No contact" })
      }
      return res.status(200).json({message:contacts})
   } catch (error) {
      console.log(error)
      next(error)
   }
}


const deleteContactID = async (req,res,next)=>{
 try {
   const id = req.params.id
   
   await Usercontact.deleteOne({_id : id})
   res.status(200).json({message :"Contact Delete Successfully"})
   
 } catch (error) {
   next(error)
 }

}

module.exports = {getalluser,allcontact, deleteuserid,getUserById , updataUserById ,deleteContactID }