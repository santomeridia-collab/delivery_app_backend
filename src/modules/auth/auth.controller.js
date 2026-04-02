const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const { JWT_SECRET } = require("../../config/env");

const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

exports.sendOtp = async (req, res, next) => {
  try {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ message: "Phone required" });
    
    // Validate phone number format
    if (!/^[6-9]\d{9}$/.test(phone)) {
      return res.status(400).json({ message: "Phone number must be 10 digits and start with 6-9" });
    }

    const otp = generateOtp();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

    await User.findOneAndUpdate({ phone }, { otp, otpExpiry }, { upsert: true, new: true });

    // TODO: Send OTP via SMS (Twilio)
    console.log(`OTP for ${phone}: ${otp}`);

    res.json({ message: "OTP sent", phone });
  } catch (err) { next(err); }
};

exports.verifyOtp = async (req, res, next) => {
  try {
    const { phone, otp } = req.body;
    if (!phone || !otp) return res.status(400).json({ message: "Phone and OTP required" });

    const user = await User.findOne({ phone });
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.otp !== otp) return res.status(400).json({ message: "Invalid OTP" });
    if (user.otpExpiry < new Date()) return res.status(400).json({ message: "OTP expired" });

    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    const token = jwt.sign(
      { id: user._id, phone: user.phone, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ message: "Login successful", token, user: { id: user._id, phone: user.phone, role: user.role } });
  } catch (err) { next(err); }
};
