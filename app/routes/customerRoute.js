const express = require("express");
const router = express.Router();

const customers = require("../controller/customerController");

//Create a new customer
router.post("", customers.create);

//Retrive all customers
router.get("", customers.findAll);

//Retrive a single customer with customerId
router.get("/:customerId", customers.findeOne);

//Update a customer with customerId
router.put("/:customerId", customers.update);

//Delete a customer with customerId
router.delete("/:customerId", customers.delete);

module.exports = router;
