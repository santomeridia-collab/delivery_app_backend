const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true },
  riderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      name: String,
      price: Number,
      quantity: Number,
    },
  ],
  subtotal: { type: Number, required: true },
  serviceCharge: { type: Number, default: 0 },
  totalAmount: { type: Number, required: true },
  paymentType: { type: String, enum: ["COD", "UPI", "CARD"], default: "COD" },
  paymentStatus: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
  razorpayOrderId: { type: String },
  orderStatus: {
    type: String,
    enum: ["pending", "confirmed", "preparing", "ready", "picked", "delivered", "cancelled"],
    default: "pending",
  },
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
