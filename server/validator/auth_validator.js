const  {z} = require("zod")

const loginSchema  = z.object({
    email: z
    .string({required_error:"email is require"})
    .trim()
    .email({message :"Invalid email address"})
    .min(3,{message:"email must be 3 carecter"})
    .max(255,{message:"name must not be more than 255 carecter"}),

    password: z
    .string({required_error:"password is require"})
    .trim()
    .min(7,{message:"password must be 6 carecter"})
    .max(255,{message:"name must not be more than 255 carecter"}),
})


// email and password property acces signupdata with the help of loginschema.extend

//  use .extend can be allow to the all my property can be acces 
const signupSchema = loginSchema.extend({
    name: z
    .string({required_error:"name is require"})
    .trim()
    .min(4,{message:"name must be 4 carecter"})
    .max(255,{message:"name must not be more than 255 carecter"}),


   
}) 

const contactschema  = z.object({
    message: z
    .string({required_error:"message is require"})
    .trim()
    .min(10,{message:"please field the message input minimum 10 carector"})
    .max(255,{message:"message must not be more than 255 carecter"}),

  
})


module.exports= {signupSchema , loginSchema ,contactschema}