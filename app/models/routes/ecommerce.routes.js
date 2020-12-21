module.exports = (app) => {
  const products = require("../controller/ecommerce.controller.js");

  //Create a new product
  app.post("/products", products.create);

  //Retrive all products
  app.get("/products", products.findAll);

  //Retrive a single product with productID
  app.get("/products/:productId", products.findeOne);

  //Update a product with productID
  app.put("/products/:productId", products.update);

  //Delete a product with productId
  app.delete("/products/:productId", products.delete);
};

module.exports = (app) => {
  const customers = require("../controller/ecommerce.controller.js");

  //Create a new customer
  app.post("/customers", customers.create);

  //Retrive all customers
  app.get("/customers", customers.findAll);

  //Retrive a single customer with customerId
  app.get("/customers/:customerId", customers.findeOne);

  //Update a customer with customerId
  app.put("/customers/:customerId", customers.update);

  //Delete a customer with customerId
  app.delete("/customers/:customerId", customers.delete);
};

module.exports = (app) => {
  const orders = require("../controller/ecommerce.controller.js");

  //Create a new customer
  app.post("/orders", orders.create);

  //Retrive all orders
  app.get("/orders", orders.findAll);

  //Retrive a single customer with customerId
  app.get("/orders/:customerId", orders.findeOne);

  //Update a customer with customerId
  app.put("/orders/:customerId", orders.update);

  //Delete a customer with customerId
  app.delete("/orders/:customerId", orders.delete);
};
