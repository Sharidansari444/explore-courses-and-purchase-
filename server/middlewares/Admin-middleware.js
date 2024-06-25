const Adminmiddleware = (req,res,next) =>{
    try {
        console.log(req.user)
        const AdminRol = req.user.isAdmin
        if(!AdminRol){
           return res.status(403).json({message : "you are note seen Admin page"})
        }
        // res.status(200).json({msg :req.user})
        next()
    } catch (error) {
        console.log(error)
    }
}

module.exports = Adminmiddleware