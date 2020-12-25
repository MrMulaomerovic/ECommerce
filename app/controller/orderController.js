const Order = require("../models/Order.js");

const mongoose = require("mongoose");

//Create and save a new order
exports.create = (req, res) => {
  //Create a Order
  const order = new Order({
    _id: mongoose.Types.ObjectId(),
    createdAt: new Date(),
    cost: req.body.cost,
    deliveryAddress: req.body.deliveryaddress,
    customer: req.body.customerId,
    products: req.body.productIds,
  });

  //Create order in the DB
  order
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the new Order.",
      });
    });
};

//Retrive and return all order from the DB
exports.findAll = (req, res) => {
  Order.find()
    .then((order) => {
      res.send(order);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while retrieving order.",
      });
    });
};

//Find a single order with a orderId
exports.findeOne = (req, res) => {
  Order.findById(req.params.orderId)
    .then((order) => {
      if (!order) {
        return res.status(404).send({
          message: "Order not found with id" + req.params.orderId,
        });
      }
      res.send(order);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Order not found with id" + req.params.orderId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving order with id" + req.params.orderId,
      });
    });
};

//Update a order identified by the orderId in the request
exports.update = (req, res) => {
  //Validate request
  if (!req.body.orderId) {
    return res.status(404).send({
      message: "Order can not be empty",
    });
  }

  //Finde order and update it with the request body
  Order.findByIdAndUpdate(
    req.params.orderId,
    {
      createdat: req.body.createdat,
      cost: req.body.cost,
      deliveryaddress: req.body.deliveryaddress,
    },
    { new: true }
  )
    .then((order) => {
      if (!order) {
        return res.status(404).send({
          message: "Order not found with id" + req.params.orderId,
        });
      }
      res.send(order);
    })
    .catch((err) => {
      if (err.kind === "OjectId") {
        return res.status(404).send({
          message: "Order not found with id" + req.params.orderId,
        });
      }
      return res.status(500).send({
        message: "Error updating order with id" + req.params.orderId,
      });
    });
};

//Delete a order with the specified orderId in the request
exports.delete = (req, res) => {
  Order.findByIdAndRemove(req.params.orderId)
    .then((order) => {
      if (!order) {
        return res.status(404).send({
          message: "Order not found with id" + req.params.orderId,
        });
      }
      res.send({ mesage: "Order deleted successfully" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          messae: "Order not found by id" + req.params.orderId,
        });
      }
      return res.status(500).send({
        message: "Could not delete order with id" + req.params.orderId,
      });
    });
};
