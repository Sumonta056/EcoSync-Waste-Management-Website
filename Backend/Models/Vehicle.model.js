const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VehicleScheme = new Schema({
  number: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  capacity: {
    type: String,
    required: true,
  },
  stsManager: {
    type: String,
    required: true,
  },
});

const Vehicle = mongoose.model("Vehicle", VehicleScheme);
module.exports = Vehicle;
