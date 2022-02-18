// const { Router } = require("express");
const express = require("express");
const multer = require("multer");
// const employee = require("../models/employee");

const Employee = require("../models/employee");

const router = express.Router();

const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg"
  };

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const isValid = MIME_TYPE_MAP[file.mimetype];
      let error = new Error("Invalid mime type");
      if (isValid) {
        error = null;
      }
      cb(error, "backend/images");
    },
    filename: (req, file, cb) => {
      const name = file.originalname
        .toLowerCase()
        .split(" ")
        .join("-");
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, name + "-" + Date.now() + "." + ext);
    }
  });

  router.post(
      "",
      multer({storage: storage}).single("image"),
      (req, res, next) => {
        const url = req.protocol + "://" + req.get("host");
        const employee = new Employee({
          name: req.body.name,
          department: req.body.department,
          email: req.body.email,
          imagePath: url + "/images/" + req.file.filename
        });
        employee.save().then(createdEmployee => {
          res.status(201).json({
            message: "Employee added successfully",
            employee: {
              ...createdEmployee,
              id: createdEmployee._id
            }
          });
        });
      }
  );

  router.put(
    "/:id",
    multer({ storage: storage }).single("image"),
    (req, res, next) => {
      let imagePath = req.body.imagePath;
      if (req.file) {
        const url = req.protocol + "://" + req.get("host");
        imagePath = url + "/images/" + req.file.filename
      }
      const employee = new Employee({
        _id: req.body.id,
        name: req.body.name,
        department: req.body.department,
        email: req.body.email,
        imagePath: imagePath
      });
      console.log(employee);
      Employee.updateOne({ _id: req.params.id }, employee).then(result => {
        res.status(200).json({ message: "Update successful!" });
      });
    }
  );

  router.get("", (req, res, next) => {
    Employee.find().then(documents => {
      res.status(200).json({
        message: "Posts fetched successfully!",
        employees: documents
      });
    });
  });

  router.get("/:id", (req, res, next) => {
    Employee.findById(req.params.id).then(employee => {
      if (employee) {
        res.status(200).json(employee);
      } else {
        res.status(404).json({ message: "Employee not found!" });
      }
    });
  });

  router.delete('/:id', (req, res) => {
    Employee.findByIdAndRemove(req.params.id).then(result => {
      console.log(result);
      res.status(200).json({ message: "Employee deleted!" });
    }).catch(
      console.log('error!')
    )
  });

  module.exports = router;