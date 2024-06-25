const express = require("express");
const router = express.Router();
// const {contactschema} = require("../validator/auth_validator")
const  contactForm = require("../controllers/conntact-controller")
// const validate = require("../middlewares/validate-middleware")
router.route("/contact").post(contactForm)
module.exports = router;