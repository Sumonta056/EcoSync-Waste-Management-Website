const express = require("express");
const router = express.Router();
const Permission = require("../Models/Permission.model.js");
const Role = require("../Models/Role.model.js");

router.get("/roles", async (req, res, next) => {
  try {
    const roles = await Role.find({}).sort({ roleId: 1 });
    res.json(roles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/roles", async (req, res, next) => {
  const { roleId, roleName } = req.body;

  try {
    let role = new Role({
      roleId,
      roleName,
    });

    role = await role.save();

    res.json(role);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/permissions", async (req, res, next) => {
  try {
    const permissions = await Permission.find({});
    res.json(permissions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/permissions", async (req, res, next) => {
  const { roleId, permissionName, status } = req.body;

  try {
    let permission = new Permission({
      roleId,
      permissionName,
      status,
    });

    permission = await permission.save();

    res.json(permission);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/roles/:roleId/permissions", async (req, res, next) => {
  const { permissionName, status } = req.body;
  const { roleId } = req.params;

  try {
    let permission = await Permission.findOneAndUpdate(
      { roleId, permissionName }, // find a document with this data
      { status }, // update the status
      { new: true, upsert: true } // options: return updated one, create one if none match
    );

    res.json(permission);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/roles/:roleId/permissions", async (req, res, next) => {
  const { roleId } = req.params;

  try {
    const permissions = await Permission.find({ roleId, status: true }).sort({ roleId: 1 });
    res.json(permissions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
