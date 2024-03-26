const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../Models/User.model.js");

router.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    const { id } = req.body;
    const user = await User.findOne({ _id: id });
    console.log(user);
    if (!user) {
      return res.json({ message: "User not found" });
    }
    res.send(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

router.put("/", async (req, res, next) => {
  try {
    const { _id, ...updatedData } = req.body;
    console.log(updatedData);
    const user = await User.findOneAndUpdate({ _id: _id }, updatedData, {
      new: true,
    });
    if (!user) {
      console.log("done");
      return res.status(404).json({ message: "doneNOT" });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
