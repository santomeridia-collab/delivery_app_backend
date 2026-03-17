const express = require("express");
const cors = require("cors");
const authroutes = require(".//src//modules//auth//auth.routes");
const vendorroutes = require(".//src//modules//vendors//vendors.routes");
const productroutes = require(".//src//modules//products//products.routes");
const orderroutes = require(".//src//modules//orders//orders.routes");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth",authroutes);
app.use("/api/vendors",vendorroutes);
app.use("/api/products",productroutes);
app.use("/api/orders", orderroutes);
app.get("/", (req, res) => {
  res.send("Backend running successfully");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});