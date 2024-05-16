const asyncHandler = require("./../middleware/asyncHandler");
const AppError = require("./../middleware/AppError");
const Product = require("./../models/productModel");

// @desc Fetch all products
// @route GET /api/products
// @access Public
exports.getAllProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find();
  if (!products) {
    return next(new AppError("There are no products to display", 404));
  }
  res.send(products);
});

// @desc Fetch a product
// @route GET /api/products/:id
// @access Public
exports.getProductById = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new AppError("Resource not found", 404));
  }
  return res.json(product);
});
