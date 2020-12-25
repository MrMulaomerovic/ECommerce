const mongoose = require("mongoose");

const ShipmentSchema = new mongoose.Schema({
  senderAddress: String,
  deliveryAddress: String,
  createdAt: Date,
  deliveredAt: Date,
  order: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
});

module.exports = mongoose.model("Shipment", ShipmentSchema);
