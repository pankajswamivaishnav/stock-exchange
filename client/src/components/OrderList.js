// src/OrderList.js
import React from "react";

const OrderList = ({ fetchOrders, completedOrders, pendingOrders }) => {
  return (
    <div>
      <h2>Pending Orders</h2>
      <ul>
        {pendingOrders.map((order) => (
          <li key={order._id}>
            Buyer Qty: {order.buyerQty}, Buyer Price: {order.buyerPrice}, Seller
            Price: {order.sellerPrice}, Seller Qty: {order.sellerQty}
          </li>
        ))}
      </ul>
      <h2>Completed Orders</h2>
      <ul>
        {completedOrders.map((order) => (
          <li key={order._id}>
            Price: {order.price}, Qty: {order.qty}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
