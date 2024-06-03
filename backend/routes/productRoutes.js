const express = require("express");
const { protect, admin } = require("./../middleware/authMiddleware");
const router = express.Router();
const {
  getAllProducts,
  getProductById,
} = require("./../controllers/productController");

router.route("/").get(getAllProducts);

router.route("/:id").get(getProductById);

module.exports = router;
