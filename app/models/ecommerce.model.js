const mongoose = require("mongoose");

const EcommerceShema = mongoose.Schema({
  name: String,
  quantity: String,
  vendor: String,
});

module.export = mongoose.model("ecommerce", EcommerceShema);
