require("dotenv").config();
require("express-async-errors");

// Express Server
const express = require("express");
const app = express();

// Rest of packages
const cors = require("cors");
const mongoose = require("mongoose");
const rateLimiter = require("express-rate-limit");
const helmet = require("helmet");

// Routers
const userRouter = require("./User/userRoutes");
const authRouter = require("./Auth/authRoutes");
const productRouter = require("./Product/productRoutes");
const cartRouter = require("./Cart/cartRoutes");
const orderRouter = require("./Order/orderRoutes");
const stripeRouter = require("./Stripe/stripeRoutes");

// Middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/checkout", stripeRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

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
