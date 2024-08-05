const mongoose  = require("mongoose")

const paymentSchema = new mongoose.Schema({
    razorpay_payment_id:{
        type:String,
        require:true
    },
    razorpay_order_id :{
        type:String,
        require:true
    },
    razorpay_signature :{
        type:String,
        require:true
    }
},{
    date : {
        type :Date,
        default : Date.now
    }
})

const Payment  = new mongoose.model("Payment",paymentSchema)

module.exports = Payment