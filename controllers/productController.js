const { default: slugify } = require("slugify");
const productModel = require("../models/productModel");
const fs = require("fs");
const { log } = require("console");
const createProdductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //alidation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const products = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating product",
    });
  }
};

//get all product controller
const getProductsController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      countTotal: products.length,
      message: "ALl Products",
      products,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Erorr in getting products",
      error: error.message,
    });
  }
};

//get single product controll
const getSingleProductController = async (req, res) => {
  try {
    const { slug } = req.params;
    const products = await productModel
      .findOne({ slug })
      .populate("category")
      .select("-photo");
    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      products,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while getitng single product",
      error,
    });
  }
};

//get product photo
const getPhotoController = async (req, res) => {
  try {
    const { pid } = req.params;
    const products = await productModel.findById(pid).select("photo");
    if (products.photo.data) {
      res.set("Content-type", products.photo.contentType);
      return res.status(200).send(products.photo.data);
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error While Getting Photo",
      error,
    });
  }
};

//delete product
const deleteProductController = async (req, res) => {
  try {
    const { pid } = req.params;
    const products = await productModel.findByIdAndDelete(pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product Deleted successfully",
      products,
    });
  } catch (error) {
    res.status(401).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};

//update products
const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is required" });
      case !price:
        return res.status(500).send({ error: "Price is required" });
      case !category:
        return res.status(500).send({ error: "Category is required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is required" });
      case photo && photo.size > 1000000:
        return res.status(500).send({ error: "Image size should be less" });
    }
    const { pid } = req.params;
    const products = await productModel.findByIdAndUpdate(
      pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(200).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in updating Product",
      error,
    });
  }
};

//filter product controllers
const filterProductController = async (req, res) => {
  try {
    res.status(200).send({
      success: true,
      message: "Product Filtering SuccessFully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while filtering Products",
      error,
    });
  }
};
module.exports.createProdductController = createProdductController;
module.exports.getProductsController = getProductsController;
module.exports.getSingleProductController = getSingleProductController;
module.exports.getPhotoController = getPhotoController;
module.exports.deleteProductController = deleteProductController;
module.exports.updateProductController = updateProductController;
module.exports.filterProductController = filterProductController;
