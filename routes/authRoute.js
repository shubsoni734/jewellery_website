const express = require("express");
const {
  registerController,
  loginController,
} = require("../controllers/authController");

// create router object
const route = express.Router();
// routing
//Register || Method post
route.post("/register", registerController);

// Login || method Post

route.post("/login", loginController);

module.exports = route;
