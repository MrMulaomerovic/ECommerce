const Shipment = require("../models/Shipment.js");

const mongoose = require("mongoose");

//Create and save a new shipment
exports.create = (req, res) => {
  //Create a Shipment
  const shipment = new Shipment({
    _id: mongoose.Types.ObjectId(),
    senderAddress: req.body.senderAddress,
    deliveryAddress: req.body.deliveryAddress,
    order: req.body.order,
    createdAt: new Date(),
    deliveredAt: new Date(),
  });

  //Create shipment in the DB
  shipment
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the new Shipment.",
      });
    });
};

//Retrive and return all shipment from the DB
exports.findAll = (req, res) => {
  Shipment.find()
    .then((shipment) => {
      res.send(shipment);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while retrieving shipment.",
      });
    });
};

//Find a single shipment with a customerId
exports.findeOne = (req, res) => {
  Shipment.findById(req.params.shipmentId)
    .then((shipment) => {
      if (!shipment) {
        return res.status(404).send({
          message: "Shipment not found with id" + req.params.shipmentId,
        });
      }
      res.send(shipment);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Shipment not found with id" + req.params.shipmentId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving shipment with id" + req.params.shipmentId,
      });
    });
};

//Update a shipment identified by the shipmentId in the request
exports.update = (req, res) => {
  //Validate request
  if (!req.body.shipmentId) {
    return res.status(404).send({
      message: "Shipment can not be empty",
    });
  }

  //Finde order and update it with the request body
  Shipment.findByIdAndUpdate(
    req.params.shipmentId,
    {
      senderaddress: req.body.senderaddress,
      deliveryaddress: req.body.deliveryaddress,
      created_at: (req.body.created_at = javascript.now()),
      delivered_at: (req.body.delivered_at = javascript.now()),
    },
    { new: true }
  )
    .then((shipment) => {
      if (!shipment) {
        return res.status(404).send({
          message: "Shipment not found with id" + req.params.shipmentId,
        });
      }
      res.send(shipment);
    })
    .catch((err) => {
      if (err.kind === "OjectId") {
        return res.status(404).send({
          message: "Shipment not found with id" + req.params.shipmentId,
        });
      }
      return res.status(500).send({
        message: "Error updating shipment with id" + req.params.shipmentId,
      });
    });
};

//Delete a shipment with the specified shipmentId in the request
exports.delete = (req, res) => {
  Shipment.findByIdAndRemove(req.params.shipmentId)
    .then((shipment) => {
      if (!shipment) {
        return res.status(404).send({
          message: "Shipment not found with id" + req.params.shipmentId,
        });
      }
      res.send({ mesage: "Shipment deleted successfully" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          messae: "Shipment not found by id" + req.params.shipmentId,
        });
      }
      return res.status(500).send({
        message: "Could not delete shipment with id" + req.params.shipmentId,
      });
    });
};
