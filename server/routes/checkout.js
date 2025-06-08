// routes/checkout.js
const express = require("express");
const router = express.Router();
const CheckoutInfo = require("../models/CheckoutInfo"); // Create this model

router.post("/", async (req, res) => {
  try {
    const info = new CheckoutInfo(req.body);
    await info.save();
    res.status(200).json({ message: "Checkout info saved" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

module.exports = router;
