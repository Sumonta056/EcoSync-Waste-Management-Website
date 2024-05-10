const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransportEntryScheme = new Schema({
  collectiondate: {
    type: String,
    required: true,
  },
  collectiontime: {
    type: String,
    required: true,
  },
  wasteamount: {
    type: String,
    required: true,
  },
  vehicleregno: {
    type: String,
    required: true,
  },
  contractorid: {
    type: String,
    required: true,
  },
  wastetype: {
    type: String,
    required: true,
  },
  wardno: {
    type: String,
    required: true,
  },
  vehicleregno: {
    type: String,
    required: true,
  },
});

const TransportEntry = mongoose.model("TransportEntry", TransportEntryScheme);
module.exports = TransportEntry;
