const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  shopName: { type: String, required: true },
  vendorType: { type: String, enum: ["restaurant", "medical"], required: true },
  address: { type: String },
  latitude: { type: Number },
  longitude: { type: Number },
  phone: { type: String },
  isApproved: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model("Vendor", vendorSchema);
