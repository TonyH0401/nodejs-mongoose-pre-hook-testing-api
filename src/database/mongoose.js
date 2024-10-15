// --------------------------
// Section: Package Requirements
// --------------------------
require("dotenv").config();
const mongoose = require("mongoose");
const chalk = require("chalk");

// --------------------------
// Section: Environment Variables
// --------------------------
const mongodb_uri = process.env.MONGODB_URI;
const mongodb_server_name = process.env.MONGODB_SERVER_NAME;

// --------------------------
// Section: MongoDB Options
// --------------------------
const mongodb_options = { useNewUrlParser: true, useUnifiedTopology: true };

// --------------------------
// Section: Connect to MongoDB
// --------------------------
const mongodb_conn = mongoose.createConnection(
  mongodb_uri + mongodb_server_name,
  mongodb_options
);
mongodb_conn.on("connected", () => {
  console.log(
    chalk.whiteBright.bgGreen.bold("> API 1 connected 💾 to MongoDB!")
  );
});
mongodb_conn.on("error", (err) => {
  console.error(
    chalk.whiteBright.bgRed.bold("> API 1 connect with error: ", err)
  );
});
mongodb_conn.on("disconnected", () => {
  console.log("> API 1 disconnected from MongoDB!");
});

// --------------------------
// Section: Exports
// --------------------------
module.exports = { mongodb_conn };
