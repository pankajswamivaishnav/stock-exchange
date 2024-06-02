// src/OrderForm.js
import React, { useState } from "react";
import axios from "axios";

const OrderForm = ({ fetchOrders, completedOrders, pendingOrders }) => {
  const [isBuyer, setIsBuyer] = useState(true);
  const [qty, setQty] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const order = { isBuyer, qty: parseInt(qty), price: parseFloat(price) };
    await axios.post("http://localhost:8000/api/order", order);
    setQty("");
    setPrice("");
    fetchOrders(); // Fetch the updated orders after placing a new order
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Order Type:
        <select
          value={isBuyer ? "buyer" : "seller"}
          onChange={(e) => setIsBuyer(e.target.value === "buyer")}
        >
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
        </select>
      </label>
      <label>
        Quantity:
        <input
          type="number"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
          required
        />
      </label>
      <label>
        Price:
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </label>
      <button type="submit">Place Order</button>
    </form>
  );
};

export default OrderForm;
