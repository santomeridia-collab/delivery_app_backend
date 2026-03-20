const express = require("express");
const router = express.Router();
const { getProfile, updateProfile } = require("./users.controller");
const { protect } = require("../../middlewares/authMiddleware");

router.get("/profile", protect, getProfile);
router.patch("/profile", protect, updateProfile);

module.exports = router;
