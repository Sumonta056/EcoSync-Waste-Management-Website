const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserScheme = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model("User", UserScheme);
module.exports = Product;
