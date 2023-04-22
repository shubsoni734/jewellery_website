const { hashPassword } = require("../helpers/authHelper");
const uerModel = require("../models/userModules");
const checkout = require("../routes/authRoute");

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
    //   check

    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "user already register",
      });
    }
    //   register user

    const hashedPassword = await hashPassword(password);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in login",
      error,
    });
  }
};

module.exports = registerController;
