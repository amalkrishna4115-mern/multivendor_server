const express = require("express");
const protect = require(
  "../middleware/authMiddleware"
);
const router = express.Router();

const multer = require("multer");

const Product = require("../models/Product");


// STORAGE
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + "-" + file.originalname
    );
  },
});

const upload = multer({
  storage: storage,
});



// ADD PRODUCT
router.post(
  "/add",
  protect,
  upload.single("image"),
  async (req, res) => {
    try {

      const User = require("../models/User");

    const vendor = await User.findById(req.body.vendorId);

console.log("Vendor ID:", req.body.vendorId);
console.log("Vendor:", vendor);

if (!vendor || !vendor.isApproved) {
  return res.status(403).json({
    message: "You are not eligible for sales. Wait for admin approval.",
  });
}
      const {
        vendorId,
        name,
        price,
        description,
        category,
      } = req.body;

      const newProduct = new Product({
        vendorId,
        name,
        price,
        description,
        category,
        image: req.file.filename,
      });

      await newProduct.save();

      res.status(201).json({
        success: true,
        product: newProduct,
      });

    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: error.message,
      });
    }
  }
);

// GET PRODUCTS
// router.get("/", async (req, res) => {

//   try {

//     const products =
//       await Product.find();

//     res.json(products);

//   } catch (error) {

//     res.status(500).json({
//       message: "Server Error",
//     });
//   }
// });

router.get("/", async (req, res) => {

  try {

    const vendorId =
      req.query.vendorId;

    let products;


    // VENDOR PRODUCTS
    if (vendorId) {

      products =
        await Product.find({
          vendorId: vendorId,
        });

    }

    // ALL PRODUCTS FOR HOME PAGE
    else {

      products =
        await Product.find();

    }


    res.json(products);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});



// DELETE PRODUCT
router.delete(
  "/:id",

  async (req, res) => {

    try {

      await Product.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Product Deleted",
      });

    } catch (error) {

      res.status(500).json({
        message: "Server Error",
      });
    }
  }
);

// UPDATE PRODUCT
router.put(
  "/update/:id",

  upload.single("image"),

  async (req, res) => {

    try {

      const {
        name,
        price,
        description,
      } = req.body;


      let updatedData = {

        name,
        price,
        description,
      };


      // IF NEW IMAGE UPLOADED
      if (req.file) {

        updatedData.image =
          req.file.filename;
      }


      const updatedProduct =
        await Product.findByIdAndUpdate(

          req.params.id,

          updatedData,

          {
            new: true,
          }
        );


      res.json({
        message:
          "Product Updated",
        product: updatedProduct,
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