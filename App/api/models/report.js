// models/report.js
const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true
  },
  issueType: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    required: true
  },
  anonymous: {
    type: String,
  },
  userId: { // Add this line
    type: String,
  },
});

module.exports = mongoose.model('Report', reportSchema);