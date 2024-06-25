const express = require("express");
const router = express.Router();
const hello = require("../controllers/auth-controller")
const { signupSchema,loginSchema } = require("../validator/auth_validator")
const validate = require("../middlewares/validate-middleware")
const isLoggedIn = require("../middlewares/user-middleware")
router.route("/").get(hello.home);

router.route("/signup").post(validate(signupSchema), hello.signup)

router.route("/login").post(validate(loginSchema), hello.login)
router.route("/user").get(isLoggedIn, hello.user)
router.route("/forgetpassword").post(hello.changepassword)
router.route("/resetpassword/:id/:token").get(hello.ResetPassword)
router.route("/:id/:token").post(hello.sendpassword)


module.exports = router;