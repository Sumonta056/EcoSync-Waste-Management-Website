const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransferEntryScheme = new Schema({
  stsmanagername: {
    type: String,
    required: true,
  },
  wardno: {
    type: String,
    required: true,
  },
  siteno: {
    type: String,
    required: true,
  },
  vehicleregno: {
    type: String,
    required: true,
  },
  wastevolume: {
    type: String,
    required: true,
  },
  arrivaltime: {
    type: String,
    required: true,
  },
  departuretime: {
    type: String,
    required: true,
  },
  currentdate: {
    type: String,
    required: true,
  },
});

const TransferEntry = mongoose.model("TransferEntry", TransferEntryScheme);
module.exports = TransferEntry;
