const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployeeScheme = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  dateOfHire: {
    type: String,
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  paymentPerHour: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  collectRoute: {
    type: String,
    required: true,
  },
});

const Employee = mongoose.model("Employee", EmployeeScheme);
module.exports = Employee;
