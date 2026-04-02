const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String },
  phone: { 
    type: String, 
    required: true, 
    unique: true,
    validate: {
      validator: function(v) {
        return /^[6-9]\d{9}$/.test(v);
      },
      message: 'Phone number must be 10 digits and start with 6-9'
    }
  },
  role: { type: String, enum: ["customer", "rider", "vendor", "admin"], default: "customer" },
  otp: { type: String },
  otpExpiry: { type: Date },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
