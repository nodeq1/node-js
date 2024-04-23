const asyncHandler = require("express-async-handler");
const express = require("express");
const session = require('express-session');
const app = express();
app.use(express.json());

const dotenv = require("dotenv");

dotenv.config({ path: "config.env" });
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set('env', 'development');

const methodOverride = require("method-override");

app.use(methodOverride("_method"));

app.use(session({
  secret: 'ghaithproject-prokin-123212123233222',
  resave: false,
  saveUninitialized: true,
}));

const User = require("./models/UserModels")

//DataBase
const DataBase = require("./config/dataBase");
DataBase();

//Users
const userRoute = require("./router/UserRouter");

app.use("/user", userRoute);

//singUp
const authRouter = require("./router/authRouter");
const { render } = require("ejs");
app.use("/", authRouter);

app.get("/", (req, res) => {
  res.render("singin.ejs");
});
app.get("/login", (req, res) => {
  res.render("login.ejs");
});
app.get("/confirm", (req, res) => {
  res.render("confirm.ejs");
});
app.get("/home", (req, res) => {
  res.render("home.ejs")
});
app.get("user/admin/resulte", (req, res) => {
  res.render("resultes.ejs")
});

const port = process.env.PORT ||3001;

app.listen(port, () => {
  console.log("app is run");
});
