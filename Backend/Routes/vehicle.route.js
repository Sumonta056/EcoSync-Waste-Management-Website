const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");

const Vehicle = require("../Models/Vehicle.model.js");

router.get("/", async (req, res, next) => {
  try {
    const result = await Vehicle.find({}, {});
    res.send(result);
  } catch (err) {
    console.log(err.message);
  }
});

router.post("/", async (req, res, next) => {
  try {
    let vehicle = req.body;
    const newVehicle = new Vehicle(vehicle);
    console.log(newVehicle);
    const result = await newVehicle.save();
    res.send({ success: true, data: result });
  } catch (err) {
    console.error(err);
    res.send({ success: false, error: "Failed to add vehicle entry" });
  }
});

// GET a specific vehicle's details
router.get("/:vehicleId", async (req, res, next) => {
  try {
    const vehicle = await Vehicle.findById(req.params.vehicleId);
    if (!vehicle) {
      return res.send("Vehicle not found");
    }
    console.log(vehicle);
    res.send(vehicle);
  } catch (err) {
    console.log(err.message);
    res.send("Internal Server Error");
  }
});

// PUT method for updating a vehicle's details (restricted to own details or System Admin access)
router.put("/:vehicleId", async (req, res, next) => {
  try {
    const vehicle = await Vehicle.findById(req.params.vehicleId);
    if (!vehicle) {
      return res.send("Vehicle not found");
    }

    // Update vehicle's details, excluding the password field
    vehicle.set({
      number: req.body.number,
      type: req.body.type,
      capacity: req.body.capacity,
    });

    const updatedVehicle = await vehicle.save();
    res.send(updatedVehicle);
  } catch (err) {
    console.log(err.message);
    res.send("Internal Server Error");
  }
});

// DELETE method for deleting a vehicle (System Admin access)
router.delete("/:vehicleId", async (req, res, next) => {
  try {
    const vehicle = await Vehicle.findById(req.params.vehicleId);
    if (!vehicle) {
      return res.send("Vehicle not found");
    }

    // Use deleteOne() to delete the vehicle
    await Vehicle.deleteOne({ _id: req.params.vehicleId });
    res.send("Vehicle deleted successfully");
  } catch (err) {
    console.error(err.message);
    res.send("Internal Server Error");
  }
});

module.exports = router;
