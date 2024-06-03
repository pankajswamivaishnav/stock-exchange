const express = require("express");
const connectDB = require("./config/db/connection");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();

// Connect to database
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/api", require("./routes/orders"));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
