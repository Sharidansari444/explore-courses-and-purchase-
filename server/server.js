require("dotenv").config()
const express = require("express");
var cors = require('cors')
const cloudinary = require("cloudinary")

const app = express();
const authRouter = require("./router/auth-router")
const contactRouter = require("./router/contact-router")
const adminrouter = require("./router/admin-router")
const paymentRoute = require("./router/payment-router")
require("./utils/db")
const errormiddleware = require("./middlewares/error-middleware");
const  coursedata = require("./router/courses");
const BASE_URL  = process.env.BASE_URL 

const corsOptions = {
    origin: `${BASE_URL}`,
    methods:" GET , PUT , POST , DELETE , UPDATE ,  HEAD , PATCH",
    credentials: true,
   
}
app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use("/api/auth", authRouter)
    
app.use("/api/form", contactRouter)
app.use("/api/course", coursedata)
app.use("/api/v1" , paymentRoute)
app.use(errormiddleware)


// let's admin use admin api 

app.use("/api/admin", adminrouter )

// let's all user contact 




const PORT = process.env.PORT|| 5000;


cloudinary.v2.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


app.listen(PORT, ()=>{
    console.log("server run on port 5000")
})


