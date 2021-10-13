const router = require("express").Router();
const {
  isAuthenticatedAndAuthorized,
  isAuthenticatedAndAdmin,
} = require("../middleware/authentication");

const {
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
  getUserStats,
} = require("./userController");

router.put("/:id", isAuthenticatedAndAuthorized, updateUser);
router.delete("/:id", isAuthenticatedAndAuthorized, deleteUser);
router.get("/", isAuthenticatedAndAdmin, getAllUsers);
router.get("/stats", isAuthenticatedAndAdmin, getUserStats);
router.get("/:id", isAuthenticatedAndAdmin, getUser);

module.exports = router;
