const express = require("express");
const router = express.Router();
const hello = require("../controllers/auth-controller")
const { loginSchema, signupSchema } = require("../validator/auth_validator")
const validate = require("../middlewares/validate-middleware")
const upload = require("../middlewares/multer");
const isLoggedIn = require("../middlewares/user-middleware");
router.route("/").get(hello.home);

router.route("/signup" ).post( upload.single("avatar"), hello.signup)

router.route("/login").post(validate(loginSchema), hello.login)
router.route("/user").get(isLoggedIn, hello.user)
router.route("/forgetpassword").post(hello.changepassword)
router.route("/resetpassword/:id/:token").get(hello.ResetPassword)
router.route("/:id/:token").post(hello.sendpassword)
// router.route("/avtaruser").post(hello.avtar)


module.exports = router;