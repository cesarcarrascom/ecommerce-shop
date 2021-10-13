const router = require("express").Router();

const {
  isAuthenticatedAndAuthorized,
  isAuthenticatedAndAdmin,
  isAuthenticated,
} = require("../middleware/authentication");

const {
  createOrder,
  updateOrder,
  deleteOrder,
  getUserOrder,
  getAllOrders,
  getMonthlyIncome,
} = require("./orderController");

router.post("/", isAuthenticated, createOrder);
router.put("/:id", isAuthenticatedAndAdmin, updateOrder);
router.delete("/:id", isAuthenticatedAndAdmin, deleteOrder);
router.get("/", isAuthenticatedAndAdmin, getAllOrders);
router.get("/income", isAuthenticatedAndAdmin, getMonthlyIncome);
router.get("/:id", isAuthenticatedAndAuthorized, getUserOrder);

module.exports = router;
