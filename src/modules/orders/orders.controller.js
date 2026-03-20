const Order = require("../../models/Order");

const calcServiceCharge = (subtotal) => (subtotal < 500 ? subtotal * 0.10 : 0);

exports.createOrder = async (req, res, next) => {
  try {
    const { vendorId, items, paymentType } = req.body;
    if (!vendorId || !items || !items.length) {
      return res.status(400).json({ message: "vendorId and items required" });
    }
    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const serviceCharge = calcServiceCharge(subtotal);
    const totalAmount = subtotal + serviceCharge;
    const order = await Order.create({
      customerId: req.user.id,
      vendorId,
      items,
      subtotal,
      serviceCharge,
      totalAmount,
      paymentType: paymentType || "COD",
    });
    res.status(201).json({ message: "Order placed", data: order });
  } catch (err) {
    next(err);
  }
};

exports.getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate("vendorId", "shopName address");
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json({ data: order });
  } catch (err) {
    next(err);
  }
};

exports.getOrderHistory = async (req, res, next) => {
  try {
    const orders = await Order.find({ customerId: req.user.id })
      .populate("vendorId", "shopName")
      .sort({ createdAt: -1 });
    res.json({ data: orders });
  } catch (err) {
    next(err);
  }
};
