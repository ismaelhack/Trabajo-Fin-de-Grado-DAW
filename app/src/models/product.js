const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = Schema({
  name: String,
  price: Number,
  nick: String,
  email: String,
  password: String,
  role: String,
  image: String,
});

module.exports = mongoose.model("Product", productSchema);
