const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  quantity: Number,
  price: { type: Number, required: true },
  vendor: String,
});

module.exports = mongoose.model("Product", ProductSchema);
