const mongoose = require("mongoose");

const riderLocationSchema = new mongoose.Schema({
  riderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  latitude: { type: Number },
  longitude: { type: Number },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("RiderLocation", riderLocationSchema);
