const path = require("path");
const express = require("express");
const morgan = require("morgan");
const app = express();
const jwt = require("jsonwebtoken");

// Logging middleware
app.use(morgan("dev"));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Check requests for a token and attach the decoded id to the request
// app.use((req, res, next) => {
//   const auth = req.headers.authorization;
//   const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;

//   try {
//     req.user = jwt.verify(token, process.env.JWT);
//   } catch {
//     req.user = null;
//   }

//   next();
// });

// Backend routes
app.use("/auth", require("./auth"));
app.use("/api", require("./api/authenticate"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});

// Default to 404 if no other route matched
app.use((req, res) => {
  res.status(404).send("Not found.");
});

module.exports = app;