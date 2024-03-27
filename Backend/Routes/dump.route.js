const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");

const Dump = require("../Models/Dump.model.js");

router.get("/", async (req, res, next) => {
  try {
    const result = await Dump.find({}, {});
    res.send(result);
  } catch (err) {
    console.log(err.message);
  }
});

router.post("/", async (req, res, next) => {
  try {
    let dump = req.body;
    const newDump = new Dump(dump);
    console.log(newDump);
    const result = await newDump.save();
    res.send(result);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
