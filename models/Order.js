const mongoose =
  require("mongoose");

const orderSchema =
  new mongoose.Schema(

    {

      // USER
      userId: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true,
      },


      // PRODUCTS
     products: [
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    productName: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    quantity: {
      type: Number,
      default: 1,
    },
  },
],


      // TOTAL PRICE
      totalAmount: {

        type: Number,

        required: true,
      },


      // ADDRESS
      shippingAddress: {

        type: String,
      },


      // PAYMENT
      paymentMethod: {

        type: String,
      },


      // STATUS
      orderStatus: {

        type: String,

        default: "Pending",
      },

    },

    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Order",
    orderSchema
  );