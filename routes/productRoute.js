const express = require("express");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");
const {
  createProdductController,
} = require("../controllers/productController");

const router = express.Router();

//create product route
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  createProdductController
);

module.exports = router;
