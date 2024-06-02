const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  buyerQty: { type: Number, required: true },
  buyerPrice: { type: Number, required: true },
  sellerPrice: { type: Number, required: true },
  sellerQty: { type: Number, required: true },
});

module.exports = mongoose.model("Order", OrderSchema);
