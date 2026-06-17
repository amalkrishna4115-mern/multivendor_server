const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");

// Dashboard Stats
router.get("/stats", async (req, res) => {

  try {

    const totalUsers = await User.countDocuments({
      role: "user",
    });

    const totalVendors = await User.countDocuments({
      role: "vendor",
    });

    const totalOrders = await Order.countDocuments();

    const totalProducts = await Product.countDocuments();

    res.json({
      totalUsers,
      totalVendors,
      totalOrders,
      totalProducts,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

// Vendors List
router.get("/vendors", async (req, res) => {

  try {

    const vendors = await User.find({
      role: "vendor",
    });

    res.json(vendors);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

// Approve Vendor
router.put("/vendor/approve/:id", async (req, res) => {
  try {
    console.log("Approve Route Hit");
    console.log("ID:", req.params.id);

    const vendor = await User.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    );

    console.log("Updated Vendor:", vendor);

    res.json(vendor);

  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});


// Reject Vendor
router.put("/vendor/reject/:id", async (req, res) => {
  try {

    const vendor = await User.findByIdAndUpdate(
      req.params.id,
      {
        isApproved: false,
      },
      { new: true }
    );

    res.json(vendor);

  } catch (error) {

    res.status(500).json(error);
  }
});

// Delete Vendor
router.delete("/vendor/:id", async (req, res) => {
  try {
    const vendorId = req.params.id;

    await Product.deleteMany({
      vendorId: vendorId,
    });

    await User.findByIdAndDelete(vendorId);

    res.json({
      success: true,
      message: "Vendor Deleted",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

// Delete Any Product (Admin)
router.delete("/product/:id", async (req, res) => {
  try {

    await Product.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Product Deleted Successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

router.get("/products", async (req, res) => {
  try {

    const products = await Product.find();

    res.json(products);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

module.exports = router;