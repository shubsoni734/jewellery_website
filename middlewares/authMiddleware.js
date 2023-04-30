const jwt = require("jsonwebtoken");
const userModules = require("../models/userModules");

const requireSignin = async (req, res, next) => {
  try {
    // console.log("middleware is runing");
    var decoded = jwt.verify(req.headers.valid, process.env.jwt_secret);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    console.log(error);
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await userModules.findById(req.user._id);
    console.log(user.role);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "you are not a Admin.",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(501).send({
      success: false,
      message: "Error in admn Middle Ware",
    });
  }
};
module.exports.requireSignin = requireSignin;
module.exports.isAdmin = isAdmin;
