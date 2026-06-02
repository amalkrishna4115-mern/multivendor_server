const express = require("express");

const router = express.Router();

const protect = require(
  "../middleware/authMiddleware"
);

const {

  addToCart,

  getUserCart,

  getVendorCart,

  removeCartItem,

} = require(
  "../controllers/cartController"
);


// ADD TO CART
router.post(

  "/add",

  protect,

  addToCart
);


// USER CART
router.get(

  "/user",

  protect,

  getUserCart
);


// VENDOR CART
router.get(

  "/vendor",

  protect,

  getVendorCart
);

// REMOVE CART ITEM
router.delete(

  "/remove/:id",

  protect,

  removeCartItem
);

module.exports = router;