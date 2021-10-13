const router = require("express").Router();

const {
  isAuthenticatedAndAuthorized,
  isAuthenticatedAndAdmin,
  isAuthenticated,
} = require("../middleware/authentication");

const {
  createCart,
  updateCart,
  deleteCart,
  getUserCart,
  getAllCarts,
} = require("./cartController");

router.get("/", isAuthenticatedAndAdmin, getAllCarts);
router.post("/", isAuthenticated, createCart);
router.put("/:id", isAuthenticatedAndAuthorized, updateCart);
router.delete("/:id", isAuthenticatedAndAuthorized, deleteCart);
router.get("/:id", isAuthenticatedAndAuthorized, getUserCart);

module.exports = router;
