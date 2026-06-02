const Cart = require("../models/Cart");

const Product = require("../models/Product");


// ADD TO CART
const addToCart = async (req, res) => {

  try {

    const {
      productId,
      quantity,
    } = req.body;


    const cartItem =
      await Cart.create({

        userId: req.user.id,

        productId,

        quantity,
      });


    res.json(cartItem);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


// USER CART
const getUserCart = async (
  req,
  res
) => {

  try {

   const cartItems = await Cart.find({
  userId: req.user.id,
}).populate("productId");

const validItems = cartItems.filter(
  (item) => item.productId
);

res.json(validItems);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


// VENDOR CART / ORDERS
const getVendorCart = async (
  req,
  res
) => {

  try {

    // FIND VENDOR PRODUCTS
    const products =
      await Product.find({

        vendorId: req.user.id,

      });


    // GET PRODUCT IDS
    const productIds =
      products.map(

        (product) =>
          product._id
      );


    // FIND CART ITEMS
    const cartItems =
      await Cart.find({

        productId: {
          $in: productIds,
        },

      })

        .populate("productId")

        .populate("userId");


    res.json(cartItems);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

// REMOVE CART ITEM
const removeCartItem = async (
  req,
  res
) => {

  try {

    await Cart.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
        "Item Removed",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {

  addToCart,

  getUserCart,

  getVendorCart,

  removeCartItem,
};