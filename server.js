const express = require("express");
const bodyParser = require("body-parser");

//create express app
const app = express();

//parse request
app.use(bodyParser.urlencoded({ extended: true }));

//parse request of content-type - application/json
app.use(bodyParser.json());

// Configuring the database
const dbConfig = require("./config/database.config.js");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

//define a simple route
app.get("/", (req, res) => {
  res.json({ mesage: "Welcome to ECommerce application." });
});

//Require products routes
require("./app/routes/ecommerce.routes.js")(app);

//Require customer routes
require("./app/customers/ecommerce.routes.js")(app);

//Require products routes
require("./app/orders/ecommerce.routes.js")(app);

//Require products routes
require("./app/shipment/ecommerce.routes.js")(app);

//listen for request
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
