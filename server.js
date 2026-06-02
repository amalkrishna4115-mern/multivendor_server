const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const authRoutes = require("./routes/auth");
const orderRoutes = require("./routes/order");
const productRoutes = require("./routes/product");
const cartRoutes = require( "./routes/cartRoutes");
const adminRoutes = require("./routes/adminRoutes");

const path = require("path");

const app = express();


// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
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


// Server
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});