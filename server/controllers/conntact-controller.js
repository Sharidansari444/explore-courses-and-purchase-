
const Contact = require("../models/contact-model")

const contactForm = async (req,res)=>{
try {
       const response = req.body
       console.log(response)
       const data = await Contact.create(response)
        return res.json({message:data})
} catch (error) {
    console.log("Contact Error")
}
}   

module.exports= contactForm