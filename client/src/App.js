// src/App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import OrderForm from "./components/OrderForm";
import OrderList from "./components/OrderList";

function App() {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);

  const fetchOrders = async () => {
    const pendingRes = await axios.get(
      "https://stock-exchange-omub.onrender.com/api/pending-orders"
    );
    const completedRes = await axios.get(
      "https://stock-exchange-omub.onrender.com/api/completed-orders"
    );
    setPendingOrders(pendingRes.data);
    setCompletedOrders(completedRes.data);
  };
  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Order Matching System</h1>
      </header>
      <main>
        <OrderForm
          fetchOrders={fetchOrders}
          completedOrders={completedOrders}
          pendingOrders={pendingOrders}
        />
        <OrderList
          fetchOrders={fetchOrders}
          completedOrders={completedOrders}
          pendingOrders={pendingOrders}
        />
      </main>
    </div>
  );
}

export default App;
