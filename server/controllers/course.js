const Card = require("../models/course-module")
const cloudinary = require("cloudinary")
// const fs = require("fs/promises")


const Createcourse = async (req, res) => {



    const { title, description, category, createdBy } = req.body
    
        if (!title || !description || !category || !createdBy) {
            return res.status(400).json({ message: " please fill the all inputs", })
        }
    
        const course = await Card.create({
            title,
            description,
            category,
            createdBy,
            thumbnail: {
                public_id: "Example public_id",
                secure_url: "example"
            }
    
        })
    
        if (!course) {
            return res.status(400).json({ message: " course could't be created ", })
        }
        console.log(req.file)
    try {
        
        if (req.file) {
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folders: 'lms',
            });
            console.log(result)
            if (result) {
                course.thumbnail.public_id = result.public_id,
                course.thumbnail.secure_url = result.secure_url
                // fs.rm(`uploads/${req.file.filename}`)
            }
            await course.save()
        
        
            }
    } catch (error) {
        console.log(error)
        
    }
    
    

    

    res.status(200).json({
        message: "course created successfully",
        success: true,
        course,
    })


}

// const UpdateCourse = async (req, res, next) => {
//     try {
//         const { id } = req.params

//         const update = await Card.findByIdAndUpdate(id, {
//             $set: req.body  
//         },
//             {
//                 runValidators: true
//             }
//         )
//         console.log(update)
//         if (!update) {
//             return res.status(500).json({ message: "course id not found" })
//         }

//         res.status(200).json({
//             message: "update course id successfully",
//             update
//         })

//     } catch (error) {
//         console.log(error, "UpdatecCourse id problem")
//     }

// }

const RemoveCourse = async( req,res, next ) =>{
    try {
        const {id}   = req.params
        const Courseremove = await Card.findById(id);

        if(!Courseremove){
            return res.status(400).json({message : " Don't remove course try again "})
        }
        await Card.findByIdAndDelete(id)
        res.status(200).json({message:"Course remove Successfuly",
            success : true,
            Courseremove ,
        })
    } catch (error) {
        next(error)
    }
}
 
const Addlecture = async (req,res,nex) =>{
   
    const {title , description} = req.body
    const {id} = req.params

    if(!title || !description){
        res.json({message :"please enter the title and description input"})
    }
   
    const course = await Card.findById(id)
    if(!course){
        res.json({message : " course id not found"})
    }
    const lecturedata = {
        title,
        description,
        lecture : {
            public_id : "",
            secure_url : ""
         }

    }
    console.log(lecturedata)
    if(!lecturedata){
        return res.status(400).json({message:" Lectures are not added "})
    }
    console.log(req.file)
   if(req.file){
      try {
        const uploadOptions = {
            folder: "lms",
            resource_type: "video", // Important: for video files, use resource_type 'video'
            // width: 250,
            // height: 250,
            // gravity: 'faces',
            // crop: 'fill'
          };
        const lectureadded = await cloudinary.v2.uploader.upload(req.file.path,uploadOptions)
        console.log(lectureadded)
        if(lectureadded){
            lecturedata.lecture.public_id = lectureadded.public_id,
            lecturedata.lecture.secure_url = lectureadded.secure_url
            
        }
      } catch (error) {
       return res.json({message :  "lecture not added"})
      }

   }
   course.lectures.push(lecturedata)
   course.numbersOfLectures = course.lectures.length
   await course.save()

    return res.json({message:"lecture added successfull",
    course
   })





}

const allcourse  = async (req,res)=>{
    try {
        const allcourse = await Card.find()
        console.log(allcourse)
      return  res.status(200).json({message:"fatch tha all course " , allcourse})
        
    } catch (error) {
         res.status(400).json({message:"can not find the all course"}) 
    }

}



module.exports = { Createcourse ,RemoveCourse ,Addlecture , allcourse }