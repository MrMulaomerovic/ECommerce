const Product = require("../models/Products.js");

const mongoose = require("mongoose");

//Create and save a new product
exports.create = (req, res) => {
  //Validate request
  if (!req.body.name) {
    return res.status(400).send({ message: "Product name can not be empty" });
  }

  //Create a product
  const product = new Product({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name || "Unnamed Product",
    price: req.body.price,
    quantity: req.body.quantity,
    vendor: req.body.vendor,
  });

  //Save product in the DB
  product
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Product.",
      });
    });
};

//Retrive and return all products from the DB
exports.findAll = (req, res) => {
  Product.find()
    .then((product) => {
      res.send(product);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while retrieving product.",
      });
    });
};

//Find a single product with a productId
exports.findeOne = (req, res) => {
  Product.findById(req.params.productId)
    .then((product) => {
      if (!product) {
        return res.status(404).send({
          message: "Product not found with id" + req.params.productId,
        });
      }
      res.send(product);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Product not found with id" + req.params.productId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving product with id" + req.params.productId,
      });
    });
};

//Update a product identified by the productId in the request
exports.update = (req, res) => {
  //Validate request
  if (!req.body.product) {
    return res.status(404).send({
      message: "Product can not be empty",
    });
  }

  //Finde product and update it with the request body
  Product.findByIdAndUpdate(
    req.params.productId,
    {
      name: req.body.name || "Unnamed Product",
      quantity: req.body.quantity,
      vendor: req.body.vendor,
    },
    { new: true }
  )
    .then((product) => {
      if (!product) {
        return res.status(404).send({
          message: "Product not found with id" + req.params.productId,
        });
      }
      res.send(product);
    })
    .catch((err) => {
      if (err.kind === "OjectId") {
        return res.status(404).send({
          message: "product not found with id" + req.params.productId,
        });
      }
      return res.status(500).send({
        message: "Error updating product with id" + req.params.productId,
      });
    });
};

//Delete a product with the specified productId in the request
exports.delete = (req, res) => {
  Product.findByIdAndRemove(req.params.productId)
    .then((product) => {
      if (!product) {
        return res.status(404).send({
          message: "Product not found with id" + req.params.productId,
        });
      }
      res.send({ mesage: "Product deleted successfully" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          messae: "Product not found by id" + req.params.productId,
        });
      }
      return res.status(500).send({
        message: "Could not delete product with id" + req.params.productId,
      });
    });
};
