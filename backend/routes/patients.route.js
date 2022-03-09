// const { Router } = require("express");
const express = require("express");

const app = express()
const Patient = require("../models/patient");

const patientRoute = express.Router();
 
// Get all patient
patientRoute.route("/add-patient").post((req, res, next) => {
  Patient.create(req.body,(error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  })
});

//get all patient
patientRoute.route("/").get((req, res) => {
  Patient.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get single patient
patientRoute.route("/read/:id").get((req, res) => {
  Patient.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  })
})


  module.exports = patientRoute