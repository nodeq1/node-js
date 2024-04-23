const express = require("express");

const router = express.Router();

const {authSingInValidator,authLogInValidator,authConfirmationValidator} = require("../utils/validator/authVlidator")

const {singUp,login,confirmation,logout} = require("../service/authServices")

router.route("/signin").post(authSingInValidator,singUp);
router.route("/login").post(authLogInValidator,login);
router.route("/confirm").post(authConfirmationValidator,confirmation);
router.route("/logout").post(logout);

module.exports = router