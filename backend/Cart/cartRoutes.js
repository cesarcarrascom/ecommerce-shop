const router = require("express").Router();

const {
  authorizeRoles,
  isAuthenticated,
} = require("../middleware/authentication");

const {
  createCart,
  updateCart,
  deleteCart,
  getUserCart,
  getAllCarts,
} = require("./cartController");

router
  .route("/")
  .get(isAuthenticated, authorizeRoles("admin"), getAllCarts)
  .post(isAuthenticated, createCart);

router
  .route("/:id")
  .get(isAuthenticated, getUserCart)
  .put(isAuthenticated, updateCart)
  .delete(isAuthenticated, deleteCart);

module.exports = router;
