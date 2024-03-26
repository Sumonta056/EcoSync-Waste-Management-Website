const express = require("express");
const router = express.Router();

const Landfill = require("../Models/Landfill.model.js");

router.get("/", async (req, res, next) => {
  try {
    const result = await Landfill.find({}, {});
    res.send(result);
  } catch (err) {
    console.log(err.message);
  }
});

router.post("/", async (req, res, next) => {
  try {
    let landfill = req.body;
    const newLandfill = new Landfill(landfill);
    console.log(newLandfill);
    const result = await newLandfill.save();
    res.send(result);
  } catch (err) {
    console.log(err);
  }
});

// GET a specific landfill's details
router.get("/:landfillId", async (req, res, next) => {
  try {
    const landfill = await Landfill.findById(req.params.landfillId);
    if (!landfill) {
      return res.send("Landfill not found");
    }
    console.log(landfill);
    res.send(landfill);
  } catch (err) {
    console.log(err.message);
    res.send("Internal Server Error");
  }
});

router.put("/:landfillId", async (req, res, next) => {
  try {
    const landfill = await Landfill.findById(req.params.landfillId);
    if (!landfill) {
      return res.send("Landfill not found");
    }

    landfill.set({
      email: req.body.email || landfill.email,
      name: req.body.name || landfill.name,
      phone: req.body.phone || landfill.phone,
      role: req.body.role || landfill.role, // Ensure role is updated correctly
    });
    //console.log("1st:" landfill);
    const updatedLandfill = await landfill.save();
    console.log(updatedLandfill);
    res.send(updatedLandfill);
  } catch (err) {
    console.log(err.message);
    res.send("Internal Server Error");
  }
});


// DELETE method for deleting a landfill (System Admin access)
router.delete("/:landfillId", async (req, res, next) => {
  try {
    const landfill = await Landfill.findById(req.params.landfillId);
    if (!landfill) {
      return res.send("Landfill not found");
    }

    // Use deleteOne() to delete the landfill
    await Landfill.deleteOne({ _id: req.params.landfillId });
    res.send("Landfill deleted successfully");
  } catch (err) {
    console.error(err.message);
    res.send("Internal Server Error");
  }
});


module.exports = router;
