const express = require('express');
var cors = require("cors");
const swagger = require("../src/helpers/swagger");
const swaggerUI = require("swagger-ui-express");
require("dotenv").config();
require("./config/db-connection");
const globalErrorController = require("./helpers/error-handler");
const appRouter = require("./routes/index");
const path = require("path");
const { requestLoggerMiddleware } = require("./config/logMiddleware");
const fs = require("fs");
// const sequelize = require('./config/db-connection');
const db = require("../models");
require('../models/index');
const targetDirectory = 'logs';

const app = express();

app.disable("x-powered-by");
app.use(cors());

// Setting up swagger 
app.get("/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});
app.use(
  "/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(swagger, { explorer: true })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Check whether app is running or not 
app.get("/healthy", (req, res) => {
  return res.status(200).send("healthy");
});

// Writing Log
if (!fs.existsSync(targetDirectory)) {
  fs.mkdirSync(targetDirectory);
}
app.use(requestLoggerMiddleware());


app.use("/",appRouter);
app.use((err, req, res, next) => {
  // console.log(err,"Dddddd");
  if (err.name === 'AuthenticationError') {
    // Customize the unauthorized error message here
    const customErrorMessage = 'access token expired';
    return res.status(401).json({ error: customErrorMessage });
  }

  // Handle other errors
  next(err);
});
app.use(globalErrorController);

db.sequelize.sync().then(() => {
  console.log('Syncedsuccessfully!');
}).catch((error) => {
  console.error('Unable to sync : ', error);
});
module.exports = app;