const router = require("express").Router();

const {
  isAuthenticated,
  isAuthorized,
  authorizeRoles,
} = require("../middleware/authentication");

const {
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
  getUserStats,
} = require("./userController");

router.get("/", isAuthenticated, authorizeRoles("admin"), getAllUsers);

router
  .route("/:id")
  .get(isAuthenticated, isAuthorized, getUser)
  .put(isAuthenticated, isAuthorized, updateUser)
  .delete(isAuthenticated, isAuthorized, deleteUser);

router.get("/stats", isAuthenticated, authorizeRoles("admin"), getUserStats);

module.exports = router;
