require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
var fs = require("fs");
port = process.env.PORT || 1881;
const routes = require("./routes/products");

// routes
var pathAPI = "";
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});
app.get("/display/:image", (req, res) => {
  let file = req.params.image;
  console.log(pathAPI + "/display/" + file);
  let path_file = "../products/" + file;
  fs.access(path_file, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).send({
        status: "error",
        message: "La imagen no existe !!!",
      });
    } else {
      return res.sendFile(path.resolve(path_file));
    }
  });
});

app.post(pathAPI, (req, res) => {
  console.log("Registering post " + pathAPI + "...");
  var newProduct = req.body;

  products
    .find({
      name: newProduct["name"],
      price: newProduct["price"],
      description: newProduct["description"],
    })
    .toArray((err, productsArray) => {
      if (err) console.log("Error: " + err);

      if (
        newProduct == "" ||
        newProduct.name == null ||
        newProduct.description == null ||
        newProduct.price == null ||
        newProduct.image == null
      ) {
        res.sendStatus(400, "Bad Request");
      } else if (productsArray.length == 0) {
        products.insert(newProduct);
        console.log("Request accepted, creating new resource in database.");
        res.sendStatus(201, "Created");
      } else {
        console.log("Error: Resource already exists in the database.");
        res.sendStatus(409, "Conflict");
      }
    });
});

app.delete(pathAPI + "/:uuid", (req, res) => {
  var uuid = req.params.uuid;

  console.log("Registering delete " + pathAPI + "/" + uuid);

  products.find({ uuid: uuid }).toArray((err, productsArray) => {
    if (err) {
      console.log("Error: " + err);
    }
    if (productsArray.length > 0) {
      products.remove(productsArray[0]);
      res.sendStatus(200);
    } else {
      res.sendStatus(404, "Resource not found");
    }
  });
});

// middleware
app.use(express.json());
app.use("/api", routes);

// mongodb connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to mongo atlas"))
  .catch((error) => console.log(error));

app.listen(port, () => {
  console.log("Servidor corriendo en http://localhost:" + port);
});
