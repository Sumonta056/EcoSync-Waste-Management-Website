const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserScheme = new Schema({
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  name: {
    type: String,
  },
  phone: {
    type: Number,
  },
  role: {
    type: String,
    default: "UNASSIGNED",
  },
});

const User = mongoose.model("User", UserScheme);
module.exports = User;
