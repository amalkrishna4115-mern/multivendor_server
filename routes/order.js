const express = require("express");

const router = express.Router();

const Order = require("../models/Order");
const protect = require(
  "../middleware/authMiddleware"
);

// CREATE ORDER
router.post("/create", protect, async (req, res) => {

  try {

    const {
     
      products,
      totalAmount,
      shippingAddress,
      paymentMethod,
    } = req.body;


    const newOrder = new Order({
      userId: req.user.id,
      products,
      totalAmount,
      shippingAddress,
      paymentMethod,
    });


    await newOrder.save();


    res.status(201).json({
      message: "Order Placed Successfully",
      order: newOrder,
    });

  } catch (error) {
  console.log("ORDER ERROR:", error);

  res.status(500).json({
    message: error.message,
  });
}
});


// GET ALL ORDERS
router.get("/", async (req, res) => {

  try {

    const orders = await Order.find();

    res.json(orders);

  } catch (error) {

    res.status(500).json({
      message: "Server Error",
    });
  }
});
// ___________________________________


const {

  getUserOrders,

  getVendorOrders,

} = require(
  "../controllers/orderController"
);


// USER ORDERS
router.get(

  "/user",

  protect,

  getUserOrders
);


// VENDOR ORDERS
router.get(

  "/vendor",

  protect,

  getVendorOrders
);

// +++++++++++++++++++++++++
// DELETE ALL ORDERS
router.delete(

  "/clear",

  async (req, res) => {

    try {

      await Order.deleteMany();

      res.json({
        message:
          "All Orders Deleted",
      });

    } catch (error) {

      res.status(500).json({
        message:
          "Server Error",
      });
    }
  }
);


// CANCEL ORDER
router.put(
  "/cancel/:id",

  async (req, res) => {

    try {

      const updatedOrder =
        await Order.findByIdAndUpdate(

          req.params.id,

          {
            orderStatus: "Cancelled",
          },

          {
            new: true,
          }
        );


      res.json({
        message:
          "Order Cancelled",

        order: updatedOrder,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Server Error",
      });
    }
  }
);
module.exports = router;