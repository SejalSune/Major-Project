const mongoose = require('mongoose');
const express=require("express");
const router=express.Router();
const passport = require('passport');
const {saveredirectUrl}=require("../middleware.js");
const UserController=require("../controllers/User.js")

router.route("/signup")
.get(UserController.SignUPform)
.post(UserController.GiveSignupform );

router.route("/login")
.get(UserController.GetLogin)
.post(saveredirectUrl,passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), UserController.GiveLogin);

router.get("/logout",UserController.Logout);

module.exports=router;