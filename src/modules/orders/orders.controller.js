let orders = [];

// CREATE ORDER
const createOrder = (req, res) => {
  const { customerId, vendorId, items } = req.body;

  if (!customerId || !vendorId || !items) {
    return res.status(400).json({
      message: "All fields are required"
    });
  }

  const newOrder = {
    orderId: Math.floor(Math.random() * 1000),
    customerId,
    vendorId,
    items,
    status: "pending"
  };

  orders.push(newOrder);

  res.json({
    message: "Order created successfully",
    data: newOrder
  });
};

// GET ALL ORDERS
const getAllOrders = (req, res) => {
  res.json(orders);
};

// GET ORDER BY ID
const getOrderById = (req, res) => {
  const id = parseInt(req.params.id);

  const order = orders.find(o => o.orderId === id);

  if (!order) {
    return res.status(404).json({
      message: "Order not found"
    });
  }

  res.json(order);
};

// UPDATE ORDER
const updateOrder = (req, res) => {
  const id = parseInt(req.params.id);

  const order = orders.find(o => o.orderId === id);

  if (!order) {
    return res.status(404).json({
      message: "Order not found"
    });
  }

  order.status = req.body.status || order.status;

  res.json({
    message: "Order updated successfully",
    data: order
  });
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder
};