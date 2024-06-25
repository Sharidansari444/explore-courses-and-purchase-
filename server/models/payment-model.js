const mongoose  = require("mongoose")

const paymentSchema = new mongoose.Schema({
    razorpay_payment_id :{
        type:String,
        require:true
    },
    razorpay_subscription_id :{
        type:String,
        require:true
    },
    razorpay_signature :{
        type:String,
        require:true
    }



},{
    timestamps:true
})

const Payment  = new mongoose.model("Payment",paymentSchema)

module.exports = Payment