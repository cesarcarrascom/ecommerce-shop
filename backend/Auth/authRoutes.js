const router = require("express").Router();
const { registerUser, loginUser, logoutUser } = require("./authController");
const { isAuthenticated } = require("../middleware/authentication");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", isAuthenticated, logoutUser);

module.exports = router;
