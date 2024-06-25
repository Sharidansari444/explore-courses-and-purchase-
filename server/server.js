require("dotenv").config()
const express = require("express");
var cors = require('cors')

const app = express();
const authRouter = require("./router/auth-router")
const contactRouter = require("./router/contact-router")
const adminrouter = require("./router/admin-router")
const paymentRoute = require("./router/payment-router")
require("./utils/db")
const errormiddleware = require("./middlewares/error-middleware");
const  courcedata = require("./router/cources");

const corsOptions = {
    origin:"http://localhost:5173",
    methods:" GET , PUT , POST , DELETE , UPDATE ,  HEAD , PATCH",
    credentials: true,
   
}
app.use(cors(corsOptions))
app.use(express.json());
app.use("/api/auth", authRouter)
    
app.use("/api/form", contactRouter)
app.use("/api/data", courcedata)
app.use("/api/v1" , paymentRoute)
app.use(errormiddleware)


// let's admin use admin api 

app.use("/api/admin", adminrouter )

// let's all user contact 




const PORT = 5000;

app.listen(PORT, ()=>{
    console.log("server run on port 5000")
})


