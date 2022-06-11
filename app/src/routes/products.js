const express = require("express");
const productSchema = require("..//models/product");
// const UserController = require("../controllers/user");

// Llamamos al router
const api = express.Router();

// Create product
api.post("/products", (req, res) => {
  const product = productSchema(req.body);
  product
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get all products
api.get("/products", (req, res) => {
  productSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get a product
api.get("/products/:id", (req, res) => {
  const { id } = req.params;
  productSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// update a product
api.put("/products/:id", (req, res) => {
  const { id } = req.params;
  const { name, price, image } = req.body;
  productSchema
    .updateOne({ _id: id }, { $set: { name, price, image } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// delete a product
api.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  productSchema
    .remove({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = api;
