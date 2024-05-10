const express = require("express");
const router = express.Router();

const Contractor = require("../Models/Contractor.model.js");

router.get("/", async (req, res, next) => {
  try {
    const result = await Contractor.find({}, {});
    res.send(result);
  } catch (err) {
    console.log(err.message);
  }
});

router.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    let contractor = req.body;
    const newContractor = new Contractor(contractor);
    console.log(newContractor);
    const result = await newContractor.save();
    res.send(result);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;

