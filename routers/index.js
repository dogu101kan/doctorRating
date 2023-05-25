const express = require("express");
const auth = require("./auth"); // middleware eklendi
const user = require("./user");
const doctor = require("./doctor");

const router = express.Router();

// /api


router.use("/auth", auth);
router.use("/users", user);
router.use("/doctor", doctor);


module.exports = router;


