require("dotenv").config();
const http = require("http");
const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");
const socketConfig = require("./src/config/socket");
const errorHandler = require("./src/middlewares/errorHandler");

const app = express();
const server = http.createServer(app);

// Init socket
socketConfig.init(server);

// Connect DB
connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth",     require("./src/modules/auth/auth.routes"));
app.use("/api/users",    require("./src/modules/users/users.routes"));
app.use("/api/vendors",  require("./src/modules/vendors/vendors.routes"));
app.use("/api/products", require("./src/modules/products/products.routes"));
app.use("/api/orders",   require("./src/modules/orders/orders.routes"));
app.use("/api/rider",    require("./src/modules/delivery/delivery.routes"));
app.use("/api/payments", require("./src/modules/payments/payments.routes"));
app.use("/api/admin",    require("./src/modules/admin/admin.routes"));

app.get("/", (req, res) => res.send("Backend running"));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
