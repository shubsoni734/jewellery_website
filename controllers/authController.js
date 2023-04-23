const { hashPassword, comparePassword } = require("../helpers/authHelper");
const userModel = require("../models/userModules");
const jwt = require("jsonwebtoken");
const { route, post } = require("../routes/authRoute");
const { model } = require("mongoose");
const { send } = require("process");
const { log } = require("console");
const requireSignin = require("../middlewares/authMiddleware");

const registerController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    // validation
    if (!name) {
      return res.send({ error: "name is required" });
    }
    if (!email) {
      return res.send({ error: "emails is required" });
    }
    if (!password) {
      return res.send({ error: "password is required" });
    }
    if (!address) {
      return res.send({ error: "address is required" });
    }
    if (!phone) {
      return res.send({ error: "phone munber is required" });
    }

    //   check user is availabe or not
    const existingUser = await userModel.findOne({ email });
    //   check existing user
    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "user already register",
      });
    }

    //   register user
    //   convert password in hash format
    const hashedPassword = await hashPassword(password);

    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
    }).save();
    // user.name = name;
    // user.email = email;
    // user.password = hashedPassword;
    // user.phone = phone;
    // user.address = address;
    // await user.save();

    console.log(user);

    res.status(201).send({
      success: true,
      message: "User register Succesfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in login",
      error,
    });
  }
};

// Login Route
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid Email and Password",
      });
    }
    //   check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email Not Register",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invlid Password",
      });
    }

    //   create Token

    const Token = await jwt.sign({ _id: user._id }, process.env.jwt_secret, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "Login SuccesFully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      Token,
    });
  } catch (error) {
    console.log(error);
    res.status(500),
      send({
        susccess: false,
        message: "Error in login",
        error,
      });
  }
};

const testController = async (req, res) => {
  res.send("test is process");
};

module.exports.registerController = registerController;
module.exports.loginController = loginController;
module.exports.testController = testController;
