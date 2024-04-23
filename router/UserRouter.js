const express = require("express");

const router = express.Router();

const {
  createUsersValidator,
  updateEmailValidator,
  cheangePasswordValidator,
} = require("../utils/validator/userValidator");

const {
  createUsers,
  getAllUsers,
  getUserById,
  updatePass,
  updateEmail,
} = require("../service/UserService");

router.route("/").post(createUsersValidator, createUsers);
router.route("/:id").get(getUserById).put(updateEmailValidator, updateEmail);
router.route("/get/resulte").get(getAllUsers);
//cheange password

router.route("/cheangepassword/:id").put(cheangePasswordValidator, updatePass);

module.exports = router;
