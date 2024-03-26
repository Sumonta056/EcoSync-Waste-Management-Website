const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StsScheme = new Schema({
  wardno: {
    type: String,
    required: true,
  },
  managerId: {
    type: String,
    required: true,
  },
  capacity: {
    type: String,
    required: true,
  },
  gpscoords: {
    type: String,
    required: true,
  },
});

const STS = mongoose.model("STS", StsScheme);
module.exports = STS;
