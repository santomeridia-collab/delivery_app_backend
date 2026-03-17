const express = require("express");
const router = express.Router();

const productController = require("./products.controller");

router.get("/:vendorId", productController.getProducts);

module.exports = router;