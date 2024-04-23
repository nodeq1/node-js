const asyncHandler = require("express-async-handler");

const bcrypt = require("bcryptjs");

const User = require("../models/UserModels");

exports.createUsers = asyncHandler(async (req, res) => {
  await User.create(req.body)
    .then((result) => {
      res.json({ data: result });
    })
    .catch((err) => {
      res.json(err);
    });
});

exports.getAllUsers = asyncHandler(async (req, res) => {
  await User.find(req.body)
    .then((resulte) => {
      // res.json({data:resulte})
      res.render("resultes.ejs",{arr:resulte})
    })
    .catch((err) => {
      res.json(`errors in get all users ${err}`);
    });
});

exports.getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await User.findById(id)
    .then((result) => {
      res.json({ data: result });
    })
    .catch((err) => {
      res.json(`errors in get user by id ${err}`);
    });
});
exports.updatePass = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndUpdate(
    id,
    { password: await bcrypt.hash(req.body.password, 12) },
    { new: true }
  )
    .then((result) => {
      res.json({ data: result });
    })
    .catch((err) => {
      res.json(`errors in get user by id ${err}`);
    });
});
exports.updateEmail = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { email } = req.body;
  await User.findByIdAndUpdate(
    id,
    { email:email},
    { new: true }
  )
    .then((result) => {
      res.json({ data: result });
    })
    .catch((err) => {
      res.json(`errors in get user by id ${err}`);
    });
});
