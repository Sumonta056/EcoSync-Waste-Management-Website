const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContractScheme = new Schema({
  companyName: {
    type: String,
    required: true,
  },
  contractID: {
    type: String,
    required: true,
  },
  registrationID: {
    type: String,
    required: true,
  },
  registrationDate: {
    type: Date,
    required: true,
  },
  companyTIN: {
    type: Number,
    required: true,
  },
  workForceSize:{
    type: Number,
    required: true,
  },
  paymentPerTon:{
    type: Number,
    required: true,
  },
  wastePerDay:{
    type: Number,
    required: true,
  },
  contractDuration:{
    type: Number,
    required: true,
  },
  collectionArea:{
    type: String,
    required: true,
  },
  designatedSTS:{
    type: Number,
    required: true,
  },
});

const Contract = mongoose.model("Contract", ContractScheme);
module.exports = Contract;
