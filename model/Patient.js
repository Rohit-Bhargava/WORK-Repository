const mongoose = require("mongoose");

const patientSchema = mongoose.Schema({

  fever: {
    type: String,
  },
  
  gender: {
    type: String,
  },
  dot: {
    type: Date,
  },
});

module.exports = mongoose.model("Diseased", patientSchema);




