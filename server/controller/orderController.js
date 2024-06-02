const Order = require("../config/models/order");
const CompletedOrder = require("../config/models/CompletedOrder");
// Place a new order
const placeOrder = async (req, res) => {
  const { isBuyer, qty, price } = req.body;

  if (!qty || !price) {
    return res.status(400).json({ msg: "Quantity and price are required" });
  }

  if (isBuyer) {
    // Matching logic for buyers
    let remainingQty = qty;
    const matchingSellers = await Order.find({
      sellerPrice: { $lte: price }, // $lte instead of $le
    }).sort({ sellerPrice: 1 });

    for (let seller of matchingSellers) {
      if (remainingQty <= 0) break;

      if (remainingQty >= seller.sellerQty) {
        await CompletedOrder.create({
          price: parseFloat(seller.sellerPrice), // Parse sellerPrice as a float
          qty: Number(seller.sellerQty),
        });
        remainingQty -= seller.sellerQty;
        await Order.findByIdAndDelete(seller._id);
      } else {
        await CompletedOrder.create({
          price: parseFloat(seller.sellerPrice), // Parse sellerPrice as a float
          qty: Number(remainingQty),
        });
        await Order.findByIdAndUpdate(seller._id, {
          sellerQty: seller.sellerQty - remainingQty,
        });
        remainingQty = 0;
      }
    }

    if (remainingQty > 0) {
      await Order.create({
        buyerQty: Number(remainingQty),
        buyerPrice: Number(price),
        sellerPrice: parseFloat(price) + 1, // Parse and add 1 to price
        sellerQty: 0,
      });
    }
  } else {
    // Matching logic for sellers
    let remainingQty = qty;
    const matchingBuyers = await Order.find({
      buyerPrice: { $gte: price }, // $gte instead of $ge
    }).sort({ buyerPrice: -1 });

    for (let buyer of matchingBuyers) {
      if (remainingQty <= 0) break;

      if (remainingQty >= buyer.buyerQty) {
        await CompletedOrder.create({
          price: Number(buyer.buyerPrice),
          qty: Number(buyer.buyerQty),
        });
        remainingQty -= buyer.buyerQty;
        await Order.findByIdAndDelete(buyer._id);
      } else {
        await CompletedOrder.create({
          price: Number(buyer.buyerPrice),
          qty: Number(remainingQty),
        });
        await Order.findByIdAndUpdate(buyer._id, {
          buyerQty: buyer.buyerQty - remainingQty,
        });
        remainingQty = 0;
      }
    }

    if (remainingQty > 0) {
      await Order.create({
        buyerQty: 0,
        buyerPrice: Number(price) - 1, // Parse and subtract 1 from price
        sellerPrice: parseFloat(price), // Parse sellerPrice as a float
        sellerQty: Number(remainingQty),
      });
    }
  }

  res.status(201).json({ msg: "Order placed successfully" });
};

// Get all pending orders
const getPendingOrders = async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
};

// Get all completed orders
const getCompletedOrders = async (req, res) => {
  const completedOrders = await CompletedOrder.find();
  res.json(completedOrders);
};

module.exports = { placeOrder, getPendingOrders, getCompletedOrders };
