const express = require("express");
const router = express.Router();
const c = require("./delivery.controller");
const { protect } = require("../../middlewares/authMiddleware");
const { role } = require("../../middlewares/roleMiddleware");

router.use(protect, role("rider"));

router.get("/available-orders", c.getAvailableOrders);
router.patch("/order/:id/accept", c.acceptOrder);
router.patch("/order/:id/:status", c.updateDeliveryStatus);
router.post("/location", c.updateLocation);

module.exports = router;
