const express = require("express");
const router = express.Router();
const { createOrder, getOrderById, getOrderHistory } = require("./orders.controller");
const { protect } = require("../../middlewares/authMiddleware");

router.post("/", protect, createOrder);
router.get("/history", protect, getOrderHistory);
router.get("/:id", protect, getOrderById);

module.exports = router;
