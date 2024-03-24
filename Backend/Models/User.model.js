const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserScheme = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    default: "unassigned",
  },
});

const User = mongoose.model("User", UserScheme);
module.exports = User;
