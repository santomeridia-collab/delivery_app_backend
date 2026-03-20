const User = require("../../models/User");
const Vendor = require("../../models/Vendor");
const Order = require("../../models/Order");

exports.getDashboard = async (req, res, next) => {
  try {
    const [totalUsers, totalVendors, totalOrders, pendingVendors] = await Promise.all([
      User.countDocuments(),
      Vendor.countDocuments({ isApproved: true }),
      Order.countDocuments(),
      Vendor.countDocuments({ isApproved: false }),
    ]);
    res.json({ data: { totalUsers, totalVendors, totalOrders, pendingVendors } });
  } catch (err) { next(err); }
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-otp -otpExpiry");
    res.json({ data: users });
  } catch (err) { next(err); }
};

exports.approveVendor = async (req, res, next) => {
  try {
    const vendor = await Vendor.findByIdAndUpdate(req.params.id, { isApproved: true }, { new: true });
    if (!vendor) return res.status(404).json({ message: "Vendor not found" });
    res.json({ message: "Vendor approved", data: vendor });
  } catch (err) { next(err); }
};

exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate("customerId", "name phone")
      .populate("vendorId", "shopName")
      .populate("riderId", "name phone")
      .sort({ createdAt: -1 });
    res.json({ data: orders });
  } catch (err) { next(err); }
};
