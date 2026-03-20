const express = require("express");
const router = express.Router();
const { createPaymentOrder, verifyPayment } = require("./payments.controller");
const { protect } = require("../../middlewares/authMiddleware");

router.post("/create/:orderId", protect, createPaymentOrder);
router.post("/verify", protect, verifyPayment);

module.exports = router;
