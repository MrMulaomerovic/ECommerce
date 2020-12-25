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
    useUnifiedTopology: true,
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

const productRoute = require("./app/routes/productsRoute");
const customerRoute = require("./app/routes/customerRoute");
const orderRoute = require("./app/routes/orderRoute");
const shipmentRoute = require("./app/routes/shipmentRoute");

app.use("/products", productRoute);
app.use("/customers", customerRoute);
app.use("/orders", orderRoute);
app.use("/shipments", shipmentRoute);

//listen for request
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
