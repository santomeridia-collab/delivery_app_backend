const express = require("express");
const router = express.Router();
const c = require("./admin.controller");
const { protect } = require("../../middlewares/authMiddleware");
const { role } = require("../../middlewares/roleMiddleware");

router.use(protect, role("admin"));

router.get("/dashboard", c.getDashboard);
router.get("/users", c.getUsers);
router.patch("/approve-vendor/:id", c.approveVendor);
router.get("/orders", c.getAllOrders);

module.exports = router;
