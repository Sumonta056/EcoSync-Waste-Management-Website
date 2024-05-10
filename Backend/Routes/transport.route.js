const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");

const Transport = require("../Models/Transport.model.js");

router.get("/", async (req, res, next) => {
  try {
    const result = await Transport.find({}, {});
    res.send(result);
  } catch (err) {
    console.log(err.message);
  }
});

router.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    let transport = req.body;
    const newTransport = new Transport(transport);
    console.log(newTransport);
    const result = await newTransport.save();
    res.send(result);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
