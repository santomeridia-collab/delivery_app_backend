exports.sendOtp = (req, res) => {
  const { phone } = req.body;

  res.json({
    message: "OTP sent successfully",
    phone: phone
  });
};

exports.verifyOtp = (req, res) => {
  const { phone, otp } = req.body;

  res.json({
    message: "OTP verified successfully",
    phone: phone
  });
};