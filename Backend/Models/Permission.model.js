const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PermissionSchema = new Schema({
  roleId: {
    type: Number,
    required: true,
  },
  permissionName: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
});

const Permission = mongoose.model("Permission", PermissionSchema);
module.exports = Permission;
