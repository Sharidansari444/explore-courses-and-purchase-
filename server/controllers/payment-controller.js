const User = require("../models/userModel");
const Payment = require("../models/payment-model")
const instance = require("../razorpay")
const crypto = require("crypto")
const getRozorpayApiKey = (req, res, next) => {
    try {
        return res.status(200).json({
            success: true,
            message: "Razorpay api key",
            key: process.env.RAZORPAY_KEY_ID
        })

    } catch (error) {
        next(error)
    }
}
const buysubscribe = async (req, res, next) => {
    try {
        const { id } = req.user
        // console.log(id)
        const user = await User.findById(id)
        console.log(user)
        // res.status(200).json({message:"user subscribe successull"})

        if (!user) {
            return res.json({ message: "unauthorized please login" })
        }
        if (user.isAdmin === true) {
            return res.json({ message: "admin can not access thid page" })
        }
        const plan_id = process.env.RAZORPAY_PLAN_ID || "plan_NfPVng5oV1qPTs"
        
        const subscription = await instance.subscriptions.create({
            plan_id,
            customer_notify: 1,
            total_count: 12

        })
        // console.log(subscription)

        user.subscription.id = subscription.id
        user.subscription.status = subscription.status
        console.log(subscription.id)
        await user.save()
        return res.status(200).json({
            success: true,
            message: "you have subscribe successfully",
            subscription
        })

    } catch (error) {
        next("subscription error", error)
    }

}
const verifysubscription = async (req, res, next) => {
    const { id } = req.user
    const { razorpay_payment_id, razorpay_subscription_id, razorpay_signature } = req.body
    const user = await User.findById(id)
    if (!user) {
        return res.json({ message: "unauthorized please login" })
    }
    const subscriptionID = user.subscription.id
    console.log(subscriptionID)
    const generated_signature = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET)
        .update(`${razorpay_payment_id} | ${subscriptionID}  utf-8`)
        .digest('hex')
    if (generated_signature !== razorpay_signature) {
        return res.status(500).json({
            message: "Payment not verify please try again"
        })
    }

    await Payment.create({
        razorpay_payment_id,
        razorpay_subscription_id,
        razorpay_signature
    })

    user.subscription.status = 'active'

    await user.save()
    return res.status(200).json({
        success: true,
        message: "Payment verifyed successfully"
    })

}
const canclesubscription = async (req, res, next) => {
    try {
        const { id } = req.user
        // console.log(id)
        const user = await User.findById(id)
        console.log(user)
        // res.status(200).json({message:"user subscribe successull"})

        if (!user) {
            return res.json({ message: "unauthorized please login" })
        }
        if (user.isAdmin === true) {
            return res.json({ message: "admin can not access thid page" })
        }

        const subscriptionId = user.subscription.id

        const subscription = await instance.subscriptions.cancel(subscriptionId)

        user.subscription.status = subscription.status

        await user.save()

    } catch (error) {
        next("error from cancel subscription", error)
    }

}
const allpayment =  async(req, res, next) => {
    try {
       const {count } = req.query;
       const subscription = await instance.subscriptions.all({
        count : count || 10
       })
    
       res.status(200).json({
        success:true,
        message:"all paments",
        subscription
       })

    } catch (error) {
     next("All subscription payment error",  error)
    }
}

module.exports = { getRozorpayApiKey, buysubscribe, verifysubscription, canclesubscription, allpayment }