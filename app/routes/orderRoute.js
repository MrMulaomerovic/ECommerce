const express = require("express");
const router = express.Router();

const orders = require("../controller/orderController");

//Create a new order
router.post("", orders.create);

//Retrive all orders
router.get("", orders.findAll);

//Retrive a single order with orderId
router.get("/:orderId", orders.findeOne);

//Update a order with orderId
router.put("/:orderId", orders.update);

//Delete a order with orderId
router.delete("/:orderId", orders.delete);

module.exports = router;
