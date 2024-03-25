const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransferScheme = new Schema({
  vehicleNo: {
    type: String,
    required: true,
  },
  stsId: {
    type: String,
    required: true,
  },
  wasteVolume: {
    type: String,
    required: true,
  },
  arrivalTime: {
    type: String,
    required: true,
  },
  departureTime: {
    type: String,
    required: true,
  },
});

const Transfer = mongoose.model("Transfer", TransferScheme);
module.exports = Transfer;
