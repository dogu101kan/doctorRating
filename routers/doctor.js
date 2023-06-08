const express = require("express");
const { getAllDoctors, createNewDoctor, getSingleDoctor } = require("../controllers/doctor");
const { checkDoctorExist, checkUserExist } = require("../middlewares/database/databaseErrorHelpers");
const { getAccesToRoute } = require("../middlewares/authorization/auth");
const comment = require("./comment");
const Doctor = require("../models/Doctor");

const doctorQueryMiddleware = require("../middlewares/query/doctorQueryMiddleware");
//const doctorImageUpload = require("../middlewares/libraries/albumImageUpload");


const router = express.Router();



router.get("/", doctorQueryMiddleware(Doctor), getAllDoctors);
router.get("/:id", checkDoctorExist, getSingleDoctor);
router.post("/adddoctor", getAccesToRoute, createNewDoctor); // admin accessi eklenmesi gerekiyor. Şmdilik eklemedik


router.use("/:id/comments", checkDoctorExist, comment);


module.exports = router;