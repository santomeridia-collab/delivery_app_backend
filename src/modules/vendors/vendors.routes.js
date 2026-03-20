const express = require("express");
const router = express.Router();
const c = require("./vendors.controller");
const { protect } = require("../../middlewares/authMiddleware");
const { role } = require("../../middlewares/roleMiddleware");

// Public
router.get("/", c.getVendors);
router.get("/:id", c.getVendorById);

// Vendor protected
router.post("/register", protect, c.createVendor);
router.get("/my/orders", protect, role("vendor"), c.getMyOrders);
router.patch("/order/:id/:status", protect, role("vendor"), c.updateOrderStatus);
router.post("/product", protect, role("vendor"), c.addProduct);
router.patch("/product/:id", protect, role("vendor"), c.updateProduct);

module.exports = router;
