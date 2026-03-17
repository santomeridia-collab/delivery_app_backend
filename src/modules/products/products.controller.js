exports.getProducts = (req, res) => {
  const vendorId = req.params.vendorId;

  res.json({
    message: "Products fetched successfully",
    vendorId: vendorId
  });
};