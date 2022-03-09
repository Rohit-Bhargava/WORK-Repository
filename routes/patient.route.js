const express = require("express");
const app = express();
const patientRoute = express.Router();

// Student model
let Patient = require("../model/Patient");

// Add Student
patientRoute.route("/add-patient").post((req, res, next) => {
  Patient.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get all student
patientRoute.route("/").get((req, res) => {
  Patient.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get single student
patientRoute.route("/read-patient/:id").get((req, res) => {
  Patient.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Update student
patientRoute.route("/update-patient/:id").put((req, res, next) => {
  Patient.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error);
        console.log(error);
      } else {
        res.json(data);
        console.log("Patient successfully updated!");
      }
    }
  );
});

// Delete student
patientRoute.route("/delete-patient/:id").delete((req, res, next) => {
  Patient.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

module.exports = patientRoute;
