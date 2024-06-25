const express = require("express")
const router = express.Router()
const isLoggedIn = require("../middlewares/user-middleware")
const admin = require("../controllers/admin-controller")
const Adminmiddleware = require("../middlewares/Admin-middleware")

router.route("/User").get( isLoggedIn, Adminmiddleware, admin.getalluser)
router.route("/User/:id").get(isLoggedIn,Adminmiddleware, admin.getUserById)
router.route("/User/update/:id").patch(isLoggedIn,Adminmiddleware,admin.updataUserById)
router.route("/User/Delete/:id").delete(isLoggedIn, Adminmiddleware, admin.deleteuserid )
router.route("/adminContact").get(isLoggedIn, Adminmiddleware,admin.allcontact)
router.route("/adminContact/delete/:id").delete(isLoggedIn,Adminmiddleware,admin.deleteContactID)

module.exports  = router