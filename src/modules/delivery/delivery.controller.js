const Order = require("../../models/Order");
const RiderLocation = require("../../models/RiderLocation");

exports.getAvailableOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ orderStatus: "ready", riderId: null }).populate("vendorId", "shopName address");
    res.json({ data: orders });
  } catch (err) { next(err); }
};

exports.acceptOrder = async (req, res, next) => {
  try {
    const order = await Order.findOneAndUpdate(
      { _id: req.params.id, orderStatus: "ready", riderId: null },
      { riderId: req.user.id, orderStatus: "picked" },
      { new: true }
    );
    if (!order) return res.status(400).json({ message: "Order not available" });

    const { getIO } = require("../../config/socket");
    getIO().to(`user_${order.customerId}`).emit(`order_status_update_${order._id}`, { status: "picked" });
    getIO().to(`user_${order.customerId}`).emit(`rider_assigned_${order._id}`, { riderId: req.user.id });

    res.json({ message: "Order accepted", data: order });
  } catch (err) { next(err); }
};

exports.updateDeliveryStatus = async (req, res, next) => {
  try {
    const { status } = req.params;
    const validStatuses = ["picked", "delivered"];
    if (!validStatuses.includes(status)) return res.status(400).json({ message: "Invalid status" });

    const order = await Order.findOneAndUpdate(
      { _id: req.params.id, riderId: req.user.id },
      { orderStatus: status },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: "Order not found" });

    const { getIO } = require("../../config/socket");
    getIO().to(`user_${order.customerId}`).emit(`order_status_update_${order._id}`, { status });

    res.json({ message: `Order marked as ${status}`, data: order });
  } catch (err) { next(err); }
};

exports.updateLocation = async (req, res, next) => {
  try {
    const { latitude, longitude } = req.body;
    await RiderLocation.findOneAndUpdate(
      { riderId: req.user.id },
      { latitude, longitude, updatedAt: new Date() },
      { upsert: true }
    );
    res.json({ message: "Location updated" });
  } catch (err) { next(err); }
};
