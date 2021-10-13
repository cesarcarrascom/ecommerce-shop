const Cart = require("./cartModel");
const { StatusCodes } = require("http-status-codes");

const createCart = async (req, res) => {
  const newCart = new Cart(req.body);

  try {
    const savedCart = await newCart.save();
    res.status(StatusCodes.CREATED).json({ savedCart });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const updateCart = async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(StatusCodes.OK).json({ updatedCart });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};

const deleteCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(StatusCodes.OK).json({ msg: "Cart has ben deleted..." });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const getUserCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.id });
    res.status(StatusCodes.OK).json({ cart });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(StatusCodes.OK).json({ carts });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

module.exports = {
  createCart,
  updateCart,
  deleteCart,
  getUserCart,
  getAllCarts,
};
