const Vendor = require("../../models/Vendor");

exports.getVendors = async (req, res, next) => {
  try {
    const filter = { isActive: true, isApproved: true };
    if (req.query.type) filter.vendorType = req.query.type;
    const vendors = await Vendor.find(filter);
    res.json({ data: vendors });
  } catch (err) { next(err); }
};

exports.getVendorById = async (req, res, next) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) return res.status(404).json({ message: "Vendor not found" });
    res.json({ data: vendor });
  } catch (err) { next(err); }
};

exports.createVendor = async (req, res, next) => {
  try {
    // Only customers can register as vendors
    if (req.user.role !== "customer") {
      return res.status(403).json({ message: "Only customers can register as vendors" });
    }
    
    // Check if user already has a vendor profile
    const existingVendor = await Vendor.findOne({ userId: req.user.id });
    if (existingVendor) {
      return res.status(400).json({ message: "User already has a vendor profile" });
    }
    
    const vendor = await Vendor.create({ ...req.body, userId: req.user.id });
    res.status(201).json({ message: "Vendor registered, awaiting approval", data: vendor });
  } catch (err) { next(err); }
};

exports.getMyOrders = async (req, res, next) => {
  try {
    const Order = require("../../models/Order");
    const vendor = await Vendor.findOne({ userId: req.user.id });
    if (!vendor) return res.status(404).json({ message: "Vendor not found" });
    const orders = await Order.find({ vendorId: vendor._id }).populate("customerId", "name phone");
    res.json({ data: orders });
  } catch (err) { next(err); }
};

exports.updateOrderStatus = async (req, res, next) => {
  try {
    const Order = require("../../models/Order");
    const { status } = req.params;
    const validStatuses = ["confirmed", "preparing", "ready"];
    if (!validStatuses.includes(status)) return res.status(400).json({ message: "Invalid status" });

    const order = await Order.findByIdAndUpdate(req.params.id, { orderStatus: status }, { new: true });
    if (!order) return res.status(404).json({ message: "Order not found" });

    const { getIO } = require("../../config/socket");
    getIO().to(`user_${order.customerId}`).emit(`order_status_update_${order._id}`, { status });

    res.json({ message: "Order status updated", data: order });
  } catch (err) { next(err); }
};

exports.addProduct = async (req, res, next) => {
  try {
    const Product = require("../../models/Product");
    const vendor = await Vendor.findOne({ userId: req.user.id });
    if (!vendor) return res.status(404).json({ message: "Vendor not found" });
    const product = await Product.create({ ...req.body, vendorId: vendor._id });
    res.status(201).json({ message: "Product added", data: product });
  } catch (err) { next(err); }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const Product = require("../../models/Product");
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product updated", data: product });
  } catch (err) { next(err); }
};
