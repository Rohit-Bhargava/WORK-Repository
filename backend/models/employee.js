const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
  name: { type: String, required: true },
  department: { type: String, required: true },
  email: {type: String, required: true},
  imagePath: { type: String, required: true }
});

module.exports = mongoose.model("Employee", employeeSchema);