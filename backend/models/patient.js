const mongoose = require("mongoose");

const patientSchema = mongoose.Schema({
  dot: { type: String,
  trim: true },
  fever: {type: String, trim: true},
  gender: {type: String, required: false, trime: true},
  // food: { type: String, required: true },

});

module.exports = mongoose.model("Patient", patientSchema);