const express = require("express");
const router = express.Router();

const orderController = require("./orders.controller");

// CREATE ORDER
router.post("/", orderController.createOrder);

// GET ALL ORDERS
router.get("/", orderController.getAllOrders);

// GET ORDER BY ID
router.get("/:id", orderController.getOrderById);

// UPDATE ORDER
router.patch("/:id", orderController.updateOrder);

module.exports = router;