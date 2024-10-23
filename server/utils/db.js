
const mongoose = require("mongoose");
const MONGOOS =process.env.MONGOOS

mongoose.connect(`${MONGOOS}/serverproject`)
.then(() => console.log("db connected!"))
.catch((err) => console.log("error",err));

