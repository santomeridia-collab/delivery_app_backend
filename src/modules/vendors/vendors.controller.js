exports.getVendors = (req, res) => {
  const type = req.query.type;

  res.json({
    message: "Vendors list fetched",
    type: type
  });
};