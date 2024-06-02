const express = require("express");
const router = express.Router();
const {
  placeOrder,
  getPendingOrders,
  getCompletedOrders,
} = require("../controller/orderController");

// Routes
router.post("/order", placeOrder);
router.get("/pending-orders", getPendingOrders);
router.get("/completed-orders", getCompletedOrders);

module.exports = router;
