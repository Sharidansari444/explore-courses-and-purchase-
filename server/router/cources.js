const express = require("express");
const router = express.Router();
const courceroute = require("../controllers/cource");

router.route("/cource").get(courceroute)

module.exports = router