const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContractorScheme = new Schema({
  companyName: {
    type: String,
    required: true,
  },
 
  registrationDate: {
    type: String,
    required: true,
  },
  companyTIN: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  workForceSize:{
    type: String,
    required: true,
  },
  paymentPerTon:{
    type: String,
    required: true,
  },
  wastePerDay:{
    type: String,
    required: true,
  },
  contractDuration:{
    type: String,
    required: true,
  },
  collectionArea:{
    type: String,
    required: true,
  },
  wardno:{
    type: String,
    required: true,
  },
  managername:{
    type: String,
    required: true,
  },
});

const Contractor = mongoose.model("Contractor", ContractorScheme);
module.exports = Contractor;
