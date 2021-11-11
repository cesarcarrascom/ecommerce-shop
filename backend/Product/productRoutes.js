const router = require("express").Router();
const { isAuthenticated } = require("../middleware/authentication");

const {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("./productController");

router.route("/").get(getAllProducts).post(isAuthenticated, createProduct);
router
  .route("/:id")
  .get(getProduct)
  .put(isAuthenticated, updateProduct)
  .delete(isAuthenticated, deleteProduct);

module.exports = router;
