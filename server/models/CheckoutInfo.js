// models/CheckoutInfo.js
const mongoose = require("mongoose");

const checkoutSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  addressLine1: String,
  addressLine2: String,
  city: String,
  state: String,
  postalCode: String,
  country: String,
}, { timestamps: true });

module.exports = mongoose.model("CheckoutInfo", checkoutSchema);
