const path = require("path")
const multer = require("multer")

const upload = multer({
    dest : "uploads/",
    limits: {fileSize : 100 * 1024 * 1024},
    storage : multer.diskStorage({
        destination : "uploads/",
        filename: (_req ,file, cd)=>{
            cd(null , file.originalname);

        }

    }),

    fileFilter: (_req,file,cd)=>{
        let ext = path.extname(file.originalname);
        if(
            ext !== ".jpg" &&
            ext !== ".jpeg" &&
            ext !== ".png" &&
            ext !== ".mp4" &&
            ext !== ".wepg" 
            
        ){
            cd(new Error(`Unsupported file type ${ext}`), false)
            return

        }
        cd(null ,true)
    }
})

module.exports = upload