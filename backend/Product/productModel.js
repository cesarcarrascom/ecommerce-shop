const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Product name must be provided."],
    },
    description: {
      type: String,
      required: [true, "Product description must be provided."],
    },
    image: {
      type: String,
      default:
        "https://media.istockphoto.com/photos/box-package-delivery-cardboard-carton-picture-id1298116064?b=1&k=20&m=1298116064&s=170667a&w=0&h=dg7a4G08KPrxF6nSV5Siu6SOsPlU4MGAcYkXKwqD1WI=",
    },
    price: {
      type: Number,
      required: [true, "Product price must be provided."],
    },
    categories: {
      type: Array,
    },
    size: { type: Array },
    color: { type: Array },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
