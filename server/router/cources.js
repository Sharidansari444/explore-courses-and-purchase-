const express = require("express");
const router = express.Router();
const courceroute = require("../controllers/cource");
const isLoggedIn = require("../middlewares/user-middleware");

router.route("/cource").get(isLoggedIn,  courceroute)

module.exports= router