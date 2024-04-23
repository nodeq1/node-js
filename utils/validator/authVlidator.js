const { check } = require("express-validator");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const {
  validatorSigninMiddleware,
  validatorLoginMiddleware,
  validatorConfirmationMiddleware
} = require("../../middleware/validatorMiddleware");
const bcrypt = require("bcryptjs");
const User = require("../../models/UserModels");
const confirm = require("../../models/confirmModels");

exports.authSingInValidator = [
  check("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("Invalid Email Address")
    .custom(async (val) => {
      await User.findOne({ email: val }).then((user) => {
        if (user) {
          return Promise.reject(new Error("E-email already in user"));
        }
      });
    }),

  check("password")
    .notEmpty()
    .withMessage("passowrd required")
    .isLength({ min: 6 })
    .withMessage("Too short password"),



  validatorSigninMiddleware,
];

exports.authLogInValidator = [
  check("email")
    .notEmpty()
    .withMessage("email required")
    .isEmail()
    .withMessage("Invalid Email Address")
    .custom(async (val) => {
      await User.findOne({ email: val }).then((user) => {
        if (!user) {
          return Promise.reject(new Error("Incorrect email "));
        }
      });
    }),

  check("password").custom(async (val, { req }) => {
    const users = await User.findOne({ email: req.body.email });

    if (!users || !(await bcrypt.compare(req.body.password, users.password))) {
      return Promise.reject(new Error("Incorrect E-email or  password  "));
    }
  }),

  validatorLoginMiddleware,
];
exports.authConfirmationValidator = [
  check("confirm")
  .custom(async (val) => {
    await confirm.findOne({ confirm: val }).then((user) => {
      if (!user) {
        return Promise.reject(new Error("The confirmation code is incorrect."));
      }
    });

  }),

  validatorConfirmationMiddleware,
];
