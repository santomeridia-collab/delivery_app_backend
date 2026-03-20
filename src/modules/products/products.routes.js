const express = require("express");
const router = express.Router();
const { getProducts, getProductById } = require("./products.controller");

router.get("/vendor/:vendorId", getProducts);
router.get("/:id", getProductById);

module.exports = router;
