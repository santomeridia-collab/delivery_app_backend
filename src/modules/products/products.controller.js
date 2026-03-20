const Product = require("../../models/Product");

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ vendorId: req.params.vendorId, isAvailable: true });
    res.json({ data: products });
  } catch (err) { next(err); }
};

exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ data: product });
  } catch (err) { next(err); }
};
