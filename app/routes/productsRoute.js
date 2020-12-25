const express = require("express");
const router = express.Router();

const products = require("../controller/productController");

//Create a new product
router.post("", products.create);

//Retrive all products
router.get("", products.findAll);

//Retrive a single product with productID
router.get("/:productId", products.findeOne);

//Update a product with productID
router.put("/:productId", products.update);

//Delete a product with productId
router.delete("/:productId", products.delete);

module.exports = router;
