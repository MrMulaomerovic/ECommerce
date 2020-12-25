const express = require("express");
const router = express.Router();

const shipments = require("../controller/shipmentController");

//Create a new shipment
router.post("", shipments.create);

//Retrive all shipments
router.get("", shipments.findAll);

//Retrive a single shipment with shipmentId
router.get("/:shipmentId", shipments.findeOne);

//Update a shipment with shipmentId
router.put("/:shipmentId", shipments.update);

//Delete a shipment with shipmentId
router.delete("/:shipmentId", shipments.delete);

module.exports = router;
