const Product = require("../models/ecommerce.model.js");

//Create and save a new product
exports.create = (req, res) => {
  //Validate request
  if (!req.body.name) {
    return res.status(400).send({ message: "Product name can not be empty" });
  }

  //Create a product
  const product = new Product(
    {
      name: req.body.name || "Unnamed Product",
      quantity: req.body.quantity,
      vendor: req.body.vendor,
    },
    {
      timestamp: true,
    }
  );

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

const Customer = require("../models/ecommerce.model.js");

//Create and save a new customer
exports.create = (req, res) => {
  //Validate request
  if (!req.body.name) {
    return res.status(400).send({ message: "Customer name can not be empty" });
  }

  //Create a Customer
  const customer = new Customer(
    {
      name: req.body.name || "Unnamed Customer",
      email: req.body.email,
      phone: req.body.phone,
      birthdate: req.body.birthdate,
    },
    {
      timestamp: true,
    }
  );

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

const Order = require("../models/ecommerce.model.js");

//Create and save a new order
exports.create = (req, res) => {
  //Validate request
  if (!req.body.name) {
    return res.status(400).send({ message: "Order name can not be empty" });
  }

  //Create a Order
  const order = new Order(
    {
      createdat: (req.body.createdat = javascript.now()),
      cost: req.body.cost,
      deliveryaddress: req.body.deliveryaddress,
    },
    {
      timestamp: true,
    }
  );

  //Create order in the DB
  order
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the new Oredr.",
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

//Find a single order with a customerId
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
      createdat: (req.body.createdat = javascript.now()),
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

const Shipment = require("../models/ecommerce.model.js");

//Create and save a new shipment
exports.create = (req, res) => {
  //Validate request
  if (!req.body.name) {
    return res.status(400).send({ message: "Shipment name can not be empty" });
  }

  //Create a Order
  const shipment = new Shipment(
    {
      senderaddress: req.body.senderaddres,
      deliveryaddress: req.body.deliveryaddress,
      createdat: (req.body.createdat = javascript.now()),
      deliveredat: (req.body.deliveredat = javascript.now()),
    },
    {
      timestamp: true,
    }
  );

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
  Shipment.findById(req.params.orderId)
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
      createdat: (req.body.createdat = javascript.now()),
      deliveredat: (req.body.deliveredat = javascript.now()),
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
