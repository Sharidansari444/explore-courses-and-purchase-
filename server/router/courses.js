const express = require("express");
const router = express.Router();
const course = require("../controllers/course");
const upload = require("../middlewares/multer");


router.route("/createcourse").post( upload.single("thumbnail"),  course.Createcourse)
// router.route("/:id").patch(course.UpdateCourse)
router.route("/:id").delete(course.RemoveCourse)
router.route("/:id").post( upload.single("lecture"), course.Addlecture)
router.route("/allcourse").get(course.allcourse)

module.exports = router