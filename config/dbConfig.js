const mongoose = require("mongoose");
require("dotenv").config();

const mongoUrl = process.env.mongo_url;
if (!mongoUrl) {
  throw new Error(
    "Missing mongo_url environment variable. Please set it in your .env file."
  );
}
mongoose.connect(mongoUrl);

const connection = mongoose.connection;
connection.on("error", console.error.bind(console, "Connection error:"));

connection.on("open", () => {
  console.log("MongoDB database connection established successfully");
});

module.exports = connection;
