const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

console.log(
  "Cloudinary Config:",
  process.env.CLOUDINARY_CLOUD_NAME,
  process.env.CLOUDINARY_API_KEY ? "API_KEY_OK" : "NO_API_KEY",
  process.env.CLOUDINARY_API_SECRET ? "SECRET_OK" : "NO_SECRET"
);

const authRoutes = require("./routes/auth");
const orderRoutes = require("./routes/order");
const productRoutes = require("./routes/product");
const cartRoutes = require( "./routes/cartRoutes");
const adminRoutes = require("./routes/adminRoutes");



const app = express();


// Middleware
app.use(cors());
app.use(express.json());

app.use(
  "/api/products",
  productRoutes
);
app.use(
  "/api/cart",
  cartRoutes
);

app.use("/api/admin", adminRoutes);
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);


// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

  app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:");
  console.error(err);
  console.error(err.stack);

  res.status(500).json({
    message: err.message,
  });
});


// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});