const router = require("express").Router();
const {
  isAuthenticatedAndAuthorized,
  isAuthenticatedAndAdmin,
} = require("../middleware/authentication");

const {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("./productController");

router.get("/", getAllProducts);
router.post("/", isAuthenticatedAndAuthorized, createProduct);
router.get("/:id", getProduct);
router.put("/:id", isAuthenticatedAndAuthorized, updateProduct);
router.delete("/:id", isAuthenticatedAndAuthorized, deleteProduct);

module.exports = router;
