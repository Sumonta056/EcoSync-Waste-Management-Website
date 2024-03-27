const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
  roleId: {
    type: Number,
    required: true,
    unique: true,
  },
  roleName: {
    type: String,
    required: true,
  },
});

const Role = mongoose.model("Role", RoleSchema);
module.exports = Role;
