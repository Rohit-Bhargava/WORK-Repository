const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const patientRoutes = require("./routes/patient.route");

const app = express();

mongoose
  .connect("mongodb://localhost:27017/Madical", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  express.static(
    path.join(__dirname, "dist/MadicalForm/Patients")
  )
);

app.use((req, res, next) => {
  // request.setHeader('Content-Type', 'application/json');
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

// // PORT
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log("Connected to port " + port);
});

app.use("/api", patientRoutes);


