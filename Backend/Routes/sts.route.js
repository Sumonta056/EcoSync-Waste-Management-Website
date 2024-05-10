const express = require("express");
const router = express.Router();

const Sts = require("../Models/Sts.model.js");

router.get("/", async (req, res, next) => {
  try {
    const result = await Sts.find({}, {});
    res.send(result);
  } catch (err) {
    console.log(err.message);
  }
});

router.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    let sts = req.body;
    const newSts = new Sts(sts);
    console.log(newSts);
    const result = await newSts.save();
    res.send(result);
  } catch (err) {
    console.log(err);
  }
});

// GET a specific sts's details
router.get("/:stsId", async (req, res, next) => {
  try {
    const sts = await Sts.findById(req.params.stsId);
    if (!sts) {
      return res.send("Sts not found");
    }
    console.log(sts);
    res.send(sts);
  } catch (err) {
    console.log(err.message);
    res.send("Internal Server Error");
  }
});

router.get("/value/:userId", async (req, res) => {
  const { userId } = req.params;
  console.log(userId);

  try {
    const sts = await Sts.find({ managerId: userId }, "wardno gpscoords");
    if (!sts.length) {
      return res.send("No Sts found");
    }
    console.log(sts);
    res.send(sts);
  } catch (err) {
    console.log(err.message);
    res.send("Internal Server Error");
  }
});

router.put("/:stsId", async (req, res, next) => {
  try {
    const sts = await Sts.findById(req.params.stsId);
    if (!sts) {
      return res.send("Sts not found");
    }

    sts.set({
      email: req.body.email || sts.email,
      name: req.body.name || sts.name,
      phone: req.body.phone || sts.phone,
      role: req.body.role || sts.role, // Ensure role is updated correctly
    });
    //console.log("1st:" sts);
    const updatedSts = await sts.save();
    console.log(updatedSts);
    res.send(updatedSts);
  } catch (err) {
    console.log(err.message);
    res.send("Internal Server Error");
  }
});

// DELETE method for deleting a sts (System Admin access)
router.delete("/:stsId", async (req, res, next) => {
  try {
    const sts = await Sts.findById(req.params.stsId);
    if (!sts) {
      return res.send("Sts not found");
    }

    // Use deleteOne() to delete the sts
    await Sts.deleteOne({ _id: req.params.stsId });
    res.send("Sts deleted successfully");
  } catch (err) {
    console.error(err.message);
    res.send("Internal Server Error");
  }
});

module.exports = router;
