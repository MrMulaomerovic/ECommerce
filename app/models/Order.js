const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  createdAt: Date,
  cost: Number,
  deliveryAddress: String,
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

module.exports = mongoose.model("Order", OrderSchema);
