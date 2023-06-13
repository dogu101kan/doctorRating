const express = require("express");
const router = express.Router(); // Bu bir middleware dir.
const { register, getUser, login, logout, forgotPassword, resetPassword} = require("../controllers/auth");
const {getAccesToRoute} = require("../middlewares/authorization/auth");
const profileImageUpload = require("../middlewares/libraries/profileImageUpload");


// api/auth/register
router.post("/register", register);
router.post("/login", login);
router.get("/logout", getAccesToRoute, logout);
router.get("/profile", getAccesToRoute, getUser);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword", resetPassword);



module.exports = router; // dışa aktardık

