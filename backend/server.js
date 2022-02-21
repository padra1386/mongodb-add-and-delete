const express = require("express");
var cors = require("cors");
const mongoose = require("mongoose");
const colors = require("colors");
const connectDB = require("./config/db");
const allowCrossDomain = require("./middleware/corsMiddleware");

const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");

const port = process.env.PORT;

connectDB();

const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", require("./routes/goalRoutes"));

app.use(cors());

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running in port:  ${port}`);
});
