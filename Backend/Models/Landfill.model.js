const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LandfillScheme = new Schema({
  managerId: {
    type: String,
    required: true,
  },
  capacity: {
    type: String,
    required: true,
  },
  timespan: {
    type: String,
    required: true,
  },
  gpscoords: {
    type: String,
    required: true,
  },
});

const Landfill = mongoose.model("Landfill", LandfillScheme);
module.exports = Landfill;
