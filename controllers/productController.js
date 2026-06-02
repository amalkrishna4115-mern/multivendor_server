const Product = require("../models/Product");


// ADD PRODUCT
const addProduct = async (req, res) => {
  try {

    const {
      name,
      price,
      image,
      description,
    } = req.body;

    const product = await Product.create({
      name,
      price,
      image,
      description,

      // vendor id from token
      vendorId: req.user.id,
    });

    res.status(201).json(product);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// GET PRODUCTS
const getProducts = async (req, res) => {
  try {

    const products = await Product.find();

    res.json(products);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


module.exports = {
  addProduct,
  getProducts,
};