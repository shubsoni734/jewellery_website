const express = require("express");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");
const createCategoryController = require("../controllers/categoryControllers");

const router = express.Router();

router.post(
  "create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

module.exports = router;
