

const errormiddleware = (err,req,res,next)=>{
    console.log(err)
     const status = err.status || 500
     const message = err.message || "BACKEND ERROR"
     const extradetails = err.extradetails || "BACKEND FROM ERROR"

     return res.status(status).json({message,extradetails})
    
}



module.exports= errormiddleware