const bcrypt = require("bcrypt");
const { model } = require("mongoose");

const hashPassword = async (password) => {
  try {
    const saltround = 10;
    const hashedPassword = await dcrypt.hash(password, saltround);
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
};

const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

module.exports = { hashPassword, comparePassword };
