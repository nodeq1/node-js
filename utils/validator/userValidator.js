const { check } = require("express-validator");
const { validatorLoginMiddleware } = require("../../middleware/validatorMiddleware");
const bcrypt = require("bcryptjs");
const User = require("../../models/UserModels");

exports.createUsersValidator = [
  check("email")
    .notEmpty()
    .withMessage("email required")
    .isEmail()
    .withMessage("Invalid Email Address")
    .custom(async(val) => {
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
    validatorLoginMiddleware
];

exports.updateEmailValidator = [
  check("email")
    .notEmpty()
    .withMessage("email required")
    .isEmail()
    .withMessage("Invalid Email Address")
    .custom(async(val) => {
      await User.findOne({ email: val }).then((user) => {
        if (user) {
          return Promise.reject(new Error("E-email already in user"));
        }
      });
    }),
    validatorLoginMiddleware
];

exports.cheangePasswordValidator = [
  check("currentpassword")
    .notEmpty()
    .withMessage("you must enter your current password"),
  check("passwordconfirm")
    .notEmpty()
    .withMessage("you must enter the password confirm"),
  check("password")
    .notEmpty()
    .withMessage("you must enter new password")
    .custom(async (vall, { req }) => {
      const user = await User.findById(req.params.id);
      if (!user) {
        throw new Error("there is no user for is id");
      }
      const isCorrectPassword = await bcrypt.compare(
        req.body.currentpassword,
        user.password
      );
      if (!isCorrectPassword) {
        throw new Error("Incorrect current password");
      }

      if (vall !== req.body.passwordconfirm) {
        throw new Error("password confirmation incorrect");
      }

      return true;
    }),
    validatorLoginMiddleware,
];
