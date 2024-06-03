const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://mongodb:mongodb9468@newecommercecluster.xez4vtt.mongodb.net/yourDatabaseNameHere?retryWrites=true&w=majority"
    );
    console.log("MongoDB connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
