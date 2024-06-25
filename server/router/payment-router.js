const express = require("express")
const router = express.Router()
const isLoggedIn = require("../middlewares/user-middleware")
// const Adminmiddleware = require("../middlewares/Admin-middleware")
const paymentconroller  = require("../controllers/payment-controller")

router.route("/razorpay-key").get(isLoggedIn, paymentconroller.getRozorpayApiKey)
router.route("/subscribe").get( isLoggedIn, paymentconroller.buysubscribe)
router.route("/veriy").post( isLoggedIn,paymentconroller.verifysubscription)
router.route("/unsubscribe").post(isLoggedIn, paymentconroller.canclesubscription)
router.route("/allpayments").get(isLoggedIn,  paymentconroller.allpayment)

module.exports = router