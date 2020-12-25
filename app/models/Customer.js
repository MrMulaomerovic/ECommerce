const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  birthdate: Date,
});

module.exports = mongoose.model("Customer", CustomerSchema);
