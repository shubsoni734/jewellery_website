const express = require("express");
const registerController = require("../controllers/authController");

// create router object
const route = express.Router();

//for inset data create post api
route.post("/register", registerController);

module.exports = route;
