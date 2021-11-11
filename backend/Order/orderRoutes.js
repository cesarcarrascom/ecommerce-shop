const router = require("express").Router();

const {
  isAuthorized,
  authorizeRoles,
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

router
  .route("/")
  .get(isAuthenticated, authorizeRoles("admin"), getAllOrders)
  .post(isAuthenticated, createOrder);

router
  .route("/:id")
  .get(isAuthorized, getUserOrder)
  .put(isAuthenticated, authorizeRoles("admin"), updateOrder)
  .delete(isAuthenticated, authorizeRoles("admin"), deleteOrder);

router.get(
  "/income",
  isAuthenticated,
  authorizeRoles("admin"),
  getMonthlyIncome
);
module.exports = router;
