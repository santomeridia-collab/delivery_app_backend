let io;

module.exports = {
  init: (httpServer) => {
    const { Server } = require("socket.io");
    io = new Server(httpServer, {
      cors: { origin: "*" },
    });

    io.on("connection", (socket) => {
      const { userId, role } = socket.handshake.query;

      if (userId) socket.join(`user_${userId}`);
      if (role) socket.join(`role_${role}`);

      // Rider sends live location
      socket.on("rider_location_update", ({ orderId, latitude, longitude }) => {
        io.to(`track_order_${orderId}`).emit(`track_order_${orderId}`, { latitude, longitude });
      });

      // Customer joins order tracking room
      socket.on("track_order", ({ orderId }) => {
        socket.join(`track_order_${orderId}`);
      });

      socket.on("disconnect", () => {});
    });

    return io;
  },
  getIO: () => {
    if (!io) throw new Error("Socket.io not initialized");
    return io;
  },
};
