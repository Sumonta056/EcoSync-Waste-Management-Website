const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");

const Transfer = require("../Models/Transfer.model.js");

router.get("/", async (req, res, next) => {
  try {
    const result = await Transfer.find({}, {});
    res.send(result);
  } catch (err) {
    console.log(err.message);
  }
});

router.post("/", async (req, res, next) => {
  try {
    let transfer = req.body;
    const newTransfer = new Transfer(transfer);
    console.log(newTransfer);
    const result = await newTransfer.save();
    res.send(result);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
