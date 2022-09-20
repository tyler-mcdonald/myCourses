"use strict";
const express = require("express");
const morgan = require("morgan");
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");
const userRoutes = require("./routes/users");
const courseRoutes = require("./routes/courses");
const cors = require("cors");

/** Test connection to database */
try {
  sequelize.authenticate();
  console.log("Connection to database successful");
} catch (error) {
  console.log("Connection to database failed...", error);
}

/** Enable global error logging */
const enableGlobalErrorLogging =
  process.env.ENABLE_GLOBAL_ERROR_LOGGING === "true";

// Create express app
const app = express();

// Parse incoming requests
app.use(express.json());

app.use(cors());

// HTTP request logging
app.use(morgan("dev"));

// Routes
app.use("/api", userRoutes);
app.use("/api", courseRoutes);

/** GET root route */
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the REST API project!",
  });
});

/** 404 error handler */
app.use((req, res) => {
  res.status(404).json({
    message: "Route Not Found",
  });
});

/** Global error handler */
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

/** Set the port */
app.set("port", process.env.PORT || 5000);

/** Listen on port */
const server = app.listen(app.get("port"), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
