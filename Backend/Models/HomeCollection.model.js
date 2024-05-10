const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HomeCollectionEntryScheme = new Schema({
  area: {
    type: String,
    required: true,
  },
  starttime: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  nooflaborers: {
    type: String,
    required: true,
  },
  noofvans: {
    type: String,
    required: true,
  },
  expectedweight: {
    type: String,
    required: true,
  },
});

const HomeCollectionEntry = mongoose.model("HomeCollectionEntry", HomeCollectionEntryScheme);
module.exports = HomeCollectionEntry;
