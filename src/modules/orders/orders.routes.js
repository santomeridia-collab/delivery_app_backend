const express = require("express");
const router = express.Router();

const orderController = require("./orders.controller");

router.post("/", orderController.createOrder);

module.exports = router;