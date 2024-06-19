const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const asyncWrap = require("../utliti/wrapAsync.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");

const userController = require("../controller/user.js");

router
.route("/signup")
.get(userController.renderSignUpForm)
.post(asyncWrap(userController.signUp));

router
.route("/login")
.get(userController.loginForm)
.post(
    saveRedirectUrl,
    passport.authenticate('local',
    { failureRedirect: '/login',failureFlash:true })
    ,userController.logIn);


router.get("/logout",userController.logOut)

module.exports = router;