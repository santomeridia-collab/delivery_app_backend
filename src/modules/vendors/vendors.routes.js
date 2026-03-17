const express = require("express");
const router = express.Router();

const vendorController = require("./vendors.controller");

router.get("/", vendorController.getVendors);

module.exports = router;