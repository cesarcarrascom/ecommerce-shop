require("dotenv").config();
require("express-async-errors");
const cors = require("cors");
const mongoose = require("mongoose");

const express = require("express");
const app = express();

// Authentication
const {
  isAuthenticatedAndAuthorized,
  isAuthenticated,
} = require("./middleware/authentication");

// Routers
const userRouter = require("./User/userRoutes");
const authRouter = require("./Auth/authRoutes");
const productRouter = require("./Product/productRoutes");
const cartRouter = require("./Cart/cartRoutes");
const orderRouter = require("./Order/orderRoutes");
const stripeRouter = require("./Stripe/stripeRoutes");

app.use(express.json());
app.use(cors());

// routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/checkout", stripeRouter);

// Middlewares & Extra packages

// DB Connect & Server listen
const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
