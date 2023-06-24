const express = require("express");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");
const {
  createProdductController,
  getProductsController,
  getSingleProductController,
  getPhotoController,
  deleteProductController,
  updateProductController,
} = require("../controllers/productController");
const formidable = require("express-formidable");

const router = express.Router();

//create product route
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProdductController
);

//get product route
router.get("/get-products", getProductsController);

//get single product route
router.get("/getSingle-products/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", getPhotoController);

// dlelete product
router.delete("/delete-product/:pid", deleteProductController);
//update product
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

module.exports = router;
