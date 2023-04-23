const express = require("express");
const {
  registerController,
  loginController,
  testController,
} = require("../controllers/authController");
const { request } = require("http");
const { requireSignin, isAdmin } = require("../middlewares/authMiddleware");
// create router object
const route = express.Router();
// routing
//Register || Method post
route.post("/register", registerController);

// Login || method Post

route.post("/login", loginController);

route.get("/test", requireSignin, isAdmin, testController);

module.exports = route;
