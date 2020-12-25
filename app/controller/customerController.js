const Customer = require("../models/Customer.js");

const mongoose = require("mongoose");

//Create and save a new customer
exports.create = (req, res) => {
  //Validate request
  if (!req.body.name) {
    return res.status(400).send({ message: "Customer name can not be empty" });
  }

  if (!validateEmail(req.body.email)) {
    return res.status(400).send({ message: "Email is not in valid format" });
  }

  if (!validatePhone(req.body.phone)) {
    return res.status(400).send({ message: "Phone cannot contains letters" });
  }

  //Create a Customer
  const customer = new Customer({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name || "Unnamed Customer",
    email: req.body.email,
    phone: req.body.phone,
    birthdate: req.body.birthdate,
  });

  //Create customer in the DB
  customer
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the new Customer.",
      });
    });
};

//Retrive and return all customer from the DB
exports.findAll = (req, res) => {
  Customer.find()
    .then((customer) => {
      res.send(customer);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while retrieving customer.",
      });
    });
};

//Find a single customer with a customerId
exports.findeOne = (req, res) => {
  Customer.findById(req.params.customerId)
    .then((customer) => {
      if (!customer) {
        return res.status(404).send({
          message: "Customer not found with id" + req.params.customerId,
        });
      }
      res.send(customer);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Customer not found with id" + req.params.customerId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving customer with id" + req.params.customerId,
      });
    });
};

//Update a product identified by the productId in the request
exports.update = (req, res) => {
  //Validate request
  if (!req.body.customerId) {
    return res.status(404).send({
      message: "Customer can not be empty",
    });
  }

  //Finde Customer and update it with the request body
  Customer.findByIdAndUpdate(
    req.params.customerId,
    {
      name: req.body.name || "Unnamed Customer",
      email: req.body.email,
      phone: req.body.phone,
      birthdate: req.body.birthdate,
    },
    { new: true }
  )
    .then((customer) => {
      if (!customer) {
        return res.status(404).send({
          message: "Customer not found with id" + req.params.customerId,
        });
      }
      res.send(customer);
    })
    .catch((err) => {
      if (err.kind === "OjectId") {
        return res.status(404).send({
          message: "Customer not found with id" + req.params.customerId,
        });
      }
      return res.status(500).send({
        message: "Error updating product with id" + req.params.customerId,
      });
    });
};

//Delete a customer with the specified cutomerId in the request
exports.delete = (req, res) => {
  Customer.findByIdAndRemove(req.params.customerId)
    .then((customer) => {
      if (!customer) {
        return res.status(404).send({
          message: "Customer not found with id" + req.params.customerId,
        });
      }
      res.send({ mesage: "Customer deleted successfully" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          messae: "Customer not found by id" + req.params.customerId,
        });
      }
      return res.status(500).send({
        message: "Could not delete customer with id" + req.params.customerId,
      });
    });
};

//helpers
function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function validatePhone(phone) {
  var reg = /^\d+$/;
  return reg.test(phone);
}
