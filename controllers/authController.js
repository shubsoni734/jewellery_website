const { hashPassword, comparePassword } = require("../helpers/authHelper");
const userModel = require("../models/userModules");

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

module.exports = registerController;
