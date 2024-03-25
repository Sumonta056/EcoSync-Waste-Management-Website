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
    if (transfer.password) {
      const hashedPassword = bcryptjs.hashSync(transfer.password, 10);
      transfer.password = hashedPassword;
    }
    const newTransfer = new Transfer(transfer);
    console.log(newTransfer);
    const result = await newTransfer.save();
    res.send(result);
  } catch (err) {
    console.log(err);
  }
});

// GET a specific transfer's details
router.get("/:transferId", async (req, res, next) => {
  try {
    const transfer = await Transfer.findById(req.params.transferId);
    if (!transfer) {
      return res.send("Transfer not found");
    }
    console.log(transfer);
    res.send(transfer);
  } catch (err) {
    console.log(err.message);
    res.send("Internal Server Error");
  }
});

// PUT method for updating a transfer's details (restricted to own details or System Admin access)
router.put("/:transferId", async (req, res, next) => {
  try {
    const transfer = await Transfer.findById(req.params.transferId);
    if (!transfer) {
      return res.send("Transfer not found");
    }

    // Update transfer's details, excluding the password field
    transfer.set({
      email: req.body.email,
      name: req.body.name,
      phone: req.body.phone,
      role: req.body.role,
    });

    const updatedTransfer = await transfer.save();
    res.send(updatedTransfer);
  } catch (err) {
    console.log(err.message);
    res.send("Internal Server Error");
  }
});

// DELETE method for deleting a transfer (System Admin access)
router.delete("/:transferId", async (req, res, next) => {
  try {
    const transfer = await Transfer.findById(req.params.transferId);
    if (!transfer) {
      return res.send("Transfer not found");
    }

    // Use deleteOne() to delete the transfer
    await Transfer.deleteOne({ _id: req.params.transferId });
    res.send("Transfer deleted successfully");
  } catch (err) {
    console.error(err.message);
    res.send("Internal Server Error");
  }
});


module.exports = router;
