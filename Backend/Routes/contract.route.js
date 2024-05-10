const express = require("express");
const router = express.Router();

const Contract = require("../Models/Contract.model.js");


router.post("/", async (req, res, next) => {
  try {
    let contract = req.body;
    const newContract = new Contract(contract);
    console.log(newContract);
    const result = await newContract.save();
    res.status(201).send(result);
  } catch (err) {
    console.log(err);
  }
});

