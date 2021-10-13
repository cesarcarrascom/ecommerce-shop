const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "User can not be empty."],
    },
    products: [
      {
        productId: { type: String },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    amount: {
      type: Number,
      required: [true, "Order amount can not be empty."],
    },
    address: {
      type: Object,
      required: [true, "Order Address can not be empty."],
    },
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
