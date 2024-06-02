const mongoose = require("mongoose");

const CompletedOrderSchema = new mongoose.Schema({
  price: { type: Number, required: true },
  qty: { type: Number, required: true },
});

module.exports = mongoose.model("CompletedOrder", CompletedOrderSchema);
