const Order =
  require("../models/Order");

const Product =
  require("../models/Product");


// USER ORDERS
const getUserOrders =
  async (req, res) => {

    try {

      const orders =
        await Order.find({

          userId:
            req.user.id,

        })

        .populate(
          "products.productId"
        );


      res.json(orders);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          error.message,
      });
    }
};


// VENDOR ORDERS
const getVendorOrders =
  async (req, res) => {

    try {

      // VENDOR PRODUCTS
      const vendorProducts =
        await Product.find({

          vendorId:
            req.user.id,

        });


      // IDS
      const vendorProductIds =
        vendorProducts.map(

          (product) =>

            product._id.toString()
        );


      // ALL ORDERS
      const orders =
        await Order.find()

        .populate(
          "products.productId"
        )

        .populate("userId");


      // FILTER ONLY VENDOR PRODUCTS
     const vendorOrders = [];

orders.forEach((order) => {

  order.products.forEach((item) => {

    if (
      item.productId &&
      vendorProductIds.includes(
        item.productId._id.toString()
      )
    ) {

      vendorOrders.push({

        orderId: order._id,

        buyerName:
          order.userId?.name,

        buyerEmail:
          order.userId?.email,

        productName:
          item.productId?.name,

        productImage:
          item.productId?.image,

        quantity:
          item.quantity,

        price:
          item.productId?.price,

        total:
          item.quantity *
          item.productId?.price,

        status:
          order.orderStatus,

        date:
          order.createdAt,

      });
    }
  });
});

res.json(vendorOrders);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          error.message,
      });
    }
};


module.exports = {

  getUserOrders,

  getVendorOrders,
};